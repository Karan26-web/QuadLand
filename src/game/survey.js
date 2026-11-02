// ---------------------------------------------------------------------------
// Screens 3–5: the drone's view over the dark sea, the scan, the zones rising,
// the area hook. Fifteen zones in five sets of three (the user's brief: the three
// sizes of each shape, kept together), each set in its own part of the sea.
//  3  "It is too dark…" → "Start the scanner…" (SCAN) → two sweeps across the sea;
//     the lights come up (and the plankton wake, cyan in the foam)
//  4  the five sets rise, one after another → the camera climbs to straight above
//     the field: every zone's sides trace on in light, then the sets glow one by
//     one → the camera loops low round the field, each set pulsing as it passes
//  5  sea and zones only; a slow, high glide, each set glowing as the camera
//     passes; the four lines of the hook; up over the field again, every zone
//     glows, and the screen fades out
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { V, say, fx, fadeOut, cleanFx, topView } from './common.js';
import { Ease, clamp, lerp, DEG } from '../engine/util.js';
import { tweens } from '../engine/tween.js';
import { TOP } from '../world/islands.js';

const FIELD = V(36, 0, -94);           // the middle of the five sets
const ORDER = [1, 0, 2, 3, 4];         // the sets as they rise: left to right across the field, back and front in turn

/** the whole field on the ground (for the view from above) */
function fieldBox(P) {
  const b = { minX: Infinity, maxX: -Infinity, minZ: Infinity, maxZ: -Infinity, y: TOP };
  for (const isl of P.allIslands) for (const v of isl.verts) {
    const x = isl.position.x + v.x, z = isl.position.z - v.y;
    b.minX = Math.min(b.minX, x); b.maxX = Math.max(b.maxX, x); b.minZ = Math.min(b.minZ, z); b.maxZ = Math.max(b.maxZ, z);
  }
  return b;
}

/** lights up, all fifteen zones up: the state after Screen 5 (a jump, a restart past it) */
export function prepare(G) {
  const P = G.planet;
  G.setWorld(P);
  for (const isl of P.allIslands) { isl.placeRisen(); isl.edges.off(); }
  P.clouds.visible = false;
  lit(G, 1);
  if (!G.flow.sea) G.flow.sea = G.audio.loop('sea', { vol: 0.42 });
}
export function resetWorld(G) {
  const P = G.planet;
  for (const isl of P.allIslands) { isl.visible = false; isl.position.y = -2.2; isl.risen = false; isl.setState('idle'); isl.edges.off(); }
  P.clouds.visible = true;
  P.ocean.u.uScan.value.w = 0; lit(G, 0);
  document.getElementById('feed').hidden = true; G.post.fx.feed = 0;
  if (G.flow.sea) { G.flow.sea.stop(0.5); G.flow.sea = null; }
}
/** how lit the night is: 0 = the dark the drone arrives in, 1 = after the scan */
function lit(G, k) {
  const P = G.planet;
  G.post.fx.exposure = lerp(0.24, 1.0, k);
  P.ocean.u.uEnvI.value = lerp(0.55, 1.0, k);
  P.ocean.u.uBio.value = lerp(0, 0.55, k);
  P.scene.environmentIntensity = lerp(0.5, 1.0, k);
  P.moonLight.intensity = lerp(0.9, 2.2, k);
  P.ocean.u.uSpecK.value = lerp(0.18, 1, k);
  P.hemi.intensity = lerp(0.5, 1.1, k);
}

export async function run(s, G, flow) {
  const P = G.planet, d = G.director, A = G.audio, hud = G.hud, f = G.post.fx;
  G.setWorld(P); G.ck.show(false); hud.show(false);
  cleanFx(G); f.glitch = 1;
  if (!flow.sea) flow.sea = A.loop('sea', { vol: 0.42 });
  for (const isl of P.allIslands) { isl.visible = false; isl.position.y = -2.2; isl.setState('idle'); isl.edges.off(); }
  P.clouds.visible = false;                            // the deck is above us now; the views from high up look down through it
  lit(G, 0);
  P.ocean.uniforms.uAmp.value = 0.7;
  for (const w of P.waves) w.centre.copy(FIELD);

  /* ---- Screen 3: the drone's camera */
  const feed = document.getElementById('feed'); feed.hidden = false; feed.style.opacity = '1';
  f.feed = 1; fx(G, 'glitch', 0, 0.6, { real: true });
  const dr = P.drone; dr.visible = false;
  const eye = V(0, 24, 92);
  d.cut({ pos: eye, target: V(0, 3, -40), fov: 58, roll: 0 });
  d.handheld(0.45);
  let t = 0;
  const altEl = document.getElementById('fdAlt');
  d.follow((p, dt) => { t += dt; p.pos.set(eye.x + Math.sin(t * 0.5) * 0.5, eye.y + Math.sin(t * 0.8) * 0.35, eye.z); p.target.set(Math.sin(t * 0.21) * 4, 3, -40); p.fov = 58; p.roll = Math.sin(t * 0.4) * 0.015; altEl.textContent = `ALT ${(eye.y + Math.sin(t * 0.8) * 0.35).toFixed(1)} m`; }, 4);
  await s.wait(0.9);
  await say(s, G, 's3.dark');
  await say(s, G, 's3.scan', { after: 0 });
  const btn = document.getElementById('btnScan'); btn.hidden = false; btn.classList.add('pulse');
  const offKey = G.input.on_('confirm', () => btn.click()); s.onKill(offKey); s.onKill(() => (btn.hidden = true));
  let waited = 0; const cap = G.onFrame((dt) => { waited += dt; if (waited > 7) { hud.caption('Press SCAN to start the scanner.', { cool: true }); cap(); } }); s.onKill(cap);
  if (G.auto) setTimeout(() => btn.click(), 1200);
  await s.event(btn, 'click');
  offKey(); cap(); hud.caption(null); btn.hidden = true;
  A.play('ui.click'); A.play('scan.start');
  await scan(s, G, eye);

  /* ---- Screen 4: five sets rise, the camera whipping to each as its three zones come up out of the water */
  d.handheld(0.25);
  // the drone's altimeter follows the camera from here (it climbs high over the field)
  const alt = G.onFrame(() => { altEl.textContent = `ALT ${G.camera.position.y.toFixed(1)} m`; }); s.onKill(alt);
  for (const [n, i] of ORDER.entries()) {
    const site = P.sites[i], c = site.centre, sp = site.spacing, side = n % 2 ? 1 : -1, size = sp * 1.55;
    const cam = c.clone().add(V(side * size * 0.95, size * 0.95, size * 1.75));
    G.audio.play('whoosh', { dur: 0.45, from: -side * 0.7, to: side * 0.7, vol: 0.22 });
    await s.run(d.whip({ pos: cam, target: c.clone().add(V(0, 1.2, -sp * 0.1)), fov: 50, roll: side * 0.05 }, 0.5));
    riseSet(G, site);
    d.to({ pos: c.clone().add(V(side * size * 0.7, size * 0.72, size * 1.4)), target: c.clone().add(V(0, 2.2, -sp * 0.1)), fov: 48, roll: side * 0.02 }, 2.0, Ease.outCubic);
    await s.wait(1.75);
  }
  // all fifteen, from straight above: every zone's sides trace on in light (one, two, three, four)
  G.audio.play('whoosh', { dur: 1.4, vol: 0.26 }); G.audio.play('riser', { dur: 2.4, vol: 0.12 });
  d.handheld(0.05);
  calm(G, 0.5, 2.4);                                   // a calmer sea from up there: no whitecaps over the outlines
  await s.run(d.to(topView(G, fieldBox(P)), 2.4, Ease.inOutCubic));
  for (const isl of P.allIslands) isl.edges.trace(1.4);
  A.play('edge.trace', { dur: 1.4 });
  await s.wait(1.0);
  await say(s, G, 's4.found');
  // "each set has a different shape": the sets light up one by one, left to right
  const shapesP = say(s, G, 's4.shapes', { after: 0 });
  for (const [n, i] of ORDER.entries()) {
    const site = P.sites[i], v = site.centre.clone().project(G.camera);
    for (const isl of site.islands) { isl.pulse(); isl.edges.flash(1); }
    A.play('zone.pulse', { i: n, pan: clamp(v.x * 0.8, -0.8, 0.8) });
    await s.wait(0.6);
  }
  await shapesP;
  await s.wait(0.4);
  // feed off: from here it is the mission's own camera
  feed.style.transition = 'opacity 1.2s ease'; feed.style.opacity = '0'; fx(G, 'feed', 0, 1.2, { real: true });
  for (const isl of P.allIslands) isl.edges.fade(0.5, 1.2);
  calm(G, 0.7, 2.0);
  d.handheld(0.25);
  const pulse = pulseAsPassed(G, { glow: false });
  s.onKill(pulse);
  await s.run(loopGlide(G, 12));
  pulse(); alt();
  feed.hidden = true; feed.style.transition = ''; f.feed = 0;

  /* ---- Screen 5: the area hook */
  highGlide(G, 16);                                   // about as long as the three lines
  const glow = pulseAsPassed(G, { glow: true });
  s.onKill(glow);
  await say(s, G, 's5.ships');
  await say(s, G, 's5.match');
  await say(s, G, 's5.need');
  // and at the last, the whole field from above again: all fifteen zones glow
  const learnP = say(s, G, 's5.learn', { after: 0.4 });
  d.handheld(0.05);
  calm(G, 0.5, 2.6);
  await s.run(d.to(topView(G, fieldBox(P)), 2.6, Ease.inOutCubic));
  glow();
  for (const isl of P.allIslands) { isl.setState('hot'); isl.pulse(); isl.edges.fade(1, 0.6); }
  A.play('zone.glow');
  await learnP;
  await s.wait(1.0);
  await fadeOut(G, 1.0);
  d.stop();
  for (const isl of P.allIslands) { isl.setState('idle'); isl.edges.off(); }
}

/* the scanner: two passes of a beam across the water, the lights rising on the second */
async function scan(s, G, eye) {
  const P = G.planet, A = G.audio, u = P.ocean.u.uScan.value;
  const label = document.getElementById('fdScan'), pct = label.querySelector('.fd-pct');
  label.hidden = false;
  u.set(eye.x, eye.z, -1.15, 1);
  P.ocean.u.uScanFan.value.set(1, 300);
  const pass = (from, to, dur, p0, p1) => {
    A.play('scan.sweep', { dur });
    return tweens.add({ duration: dur, ease: Ease.inOutSine, onUpdate: (e) => { u.z = lerp(from, to, e); pct.textContent = `${Math.round(lerp(p0, p1, e))}%`; } }).promise;
  };
  await s.run(pass(-1.15, 1.15, 2.4, 0, 50));
  A.play('scan.ping', { f: 1180 });
  A.play('lights.up');
  tweens.add({ duration: 2.8, ease: Ease.inOutSine, onUpdate: (e) => lit(G, e) });
  await s.run(pass(1.15, -1.15, 2.4, 50, 100));
  A.play('scan.ping', { f: 1480 });
  await s.run(tweens.add({ duration: 0.6, onUpdate: (e) => { u.w = 1 - e; } }).promise);
  u.w = 0; label.hidden = true;
}

/** an island comes up out of the sea: ripples, spray, water pouring off it, a rumble placed where it is */
export function riseIsland(G, isl, { dur = 2.4, shake = 0.14, rumble = true, ripple = 1 } = {}) {
  const P = G.planet, A = G.audio;
  const pos = isl.position.clone(); pos.y = 0;
  const v = pos.clone().project(G.camera);
  if (rumble) A.play('island.rise', { dur, pan: clamp(v.x * 0.8, -0.9, 0.9) });
  P.ocean.ripple(pos.x, pos.z, 0.9 * ripple);
  isl.rise(dur);
  G.director.shake(shake);
  let pour = 0;
  const off = G.onFrame((dt) => {
    pour += dt;
    if (pour < dur + 1.6) P.pour(isl, pour < dur ? 1.4 : 0.5, dt);
    else off();
  });
  setTimeout(() => { P.splash(pos.x, pos.z, { count: Math.round(90 * Math.max(ripple, 0.6)), power: 1.3, radius: isl.verts.reduce((m, p) => Math.max(m, Math.hypot(p.x, p.y)), 0) * 0.8 }); A.play('splash', { vol: 0.32 * Math.max(ripple, 0.6) }); P.ocean.ripple(pos.x, pos.z, 0.55 * ripple); }, dur * 0.8 * 1000 / G.clock.scale);
  return isl;
}

/** a set's three zones come up together, a beat apart (one rumble and one big ripple for the three) */
function riseSet(G, site) {
  site.islands.forEach((isl, k) => {
    if (!k) riseIsland(G, isl);
    else tweens.add({ duration: k * 0.22, onComplete: () => riseIsland(G, isl, { shake: 0.05, rumble: false, ripple: 0.4 }) });
  });
}
/** ease the swell to a height (the sea's amplitude) */
function calm(G, amp, dur) {
  const u = G.planet.ocean.uniforms.uAmp, from = u.value;
  tweens.add({ duration: dur, ease: Ease.inOutSine, onUpdate: (e) => { u.value = lerp(from, amp, e); } });
}

/* a low loop round the island field, banking, each set passing close by */
function loopGlide(G, dur) {
  const pts = [], tg = [];
  const R = 112, H = 8;
  for (let i = 0; i <= 8; i++) {
    const a = (-140 + i * 32) * DEG;
    pts.push(V(FIELD.x + Math.sin(a) * R * (i % 2 ? 0.8 : 0.94), H + (i % 2 ? 4 : 0) + (i === 0 ? 40 : 0), FIELD.z + Math.cos(a) * R * 0.7));
    tg.push(V(FIELD.x + Math.sin(a + 0.9) * 36, 2, FIELD.z + Math.cos(a + 0.9) * 26));
  }
  return G.director.path({ points: pts, target: tg, fov: [54, 46], roll: 'bank', bank: 1.4, dur, ease: Ease.inOutSine, blendIn: 0.08 });
}
/* Screen 5: a slow, high glide across the field, from the near left to the far right */
function highGlide(G, dur) {
  const pts = [V(-80, 60, 12), V(-24, 46, -28), V(36, 42, -48), V(96, 46, -66), V(150, 56, -116)];
  const tg = [V(-21, 0, -104), V(6, 0, -80), V(33, 0, -106), V(62, 0, -80), V(89, 0, -116)];
  return G.director.path({ points: pts, target: tg, fov: [50, 46], roll: 'bank', bank: 0.5, dur, ease: Ease.inOutSine, blendIn: 0.2, fromCurrent: false });
}
/* each set pulses (or glows) as the camera's gaze passes over it */
function pulseAsPassed(G, { glow }) {
  const P = G.planet, A = G.audio, done = new Set(), timers = [];
  const off = G.onFrame(() => {
    const cam = G.camera, fwd = new THREE.Vector3(); cam.getWorldDirection(fwd);
    P.sites.forEach((site, i) => {
      if (done.has(i) || !site.islands.some((isl) => isl.visible)) return;
      const at = site.centre.clone().setY(TOP), to = at.clone().sub(cam.position), dist = to.length(); to.normalize();
      const a = Math.acos(clamp(to.dot(fwd), -1, 1));
      if (a < 0.22 && dist < 220) {
        done.add(i);
        for (const isl of site.islands) { isl.pulse(); isl.edges.flash(0.5); if (glow) isl.setState('hot'); }
        const v = at.project(cam);
        A.play('zone.pulse', { i, pan: clamp(v.x, -0.8, 0.8) });
        if (glow) timers.push(setTimeout(() => site.islands.forEach((isl) => isl.setState('idle')), 2200));
      }
    });
  });
  return () => { off(); timers.forEach(clearTimeout); };
}
