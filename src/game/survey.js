// ---------------------------------------------------------------------------
// Screens 3–5: the drone's view over the dark sea, the scan, five zones rising,
// the area hook.
//  3  "It is too dark…" → "Start the scanner…" (SCAN) → two sweeps across the sea;
//     the lights come up (and the plankton wake, cyan in the foam)
//  4  five zones rise, one after another, each in its own part of the sea → the
//     camera loops low round the field, each zone pulsing as it passes
//  5  sea and zones only; a slow, high glide, each zone glowing as the camera
//     passes; the four lines of the hook; the zones glow and the screen fades out
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { V, say, fx, fadeOut, cleanFx } from './common.js';
import { Ease, clamp, lerp, DEG } from '../engine/util.js';
import { tweens } from '../engine/tween.js';

const FIELD = V(36, 0, -92);           // the middle of the five sites

/** lights up, the five first islands up: the state after Screen 5 (a jump, a restart past it) */
export function prepare(G) {
  const P = G.planet;
  G.setWorld(P);
  for (const site of P.sites) site.islands.forEach((isl, k) => { if (k === site.first) isl.placeRisen(); else { isl.visible = false; isl.position.y = -2.2; } });
  lit(G, 1);
  if (!G.flow.sea) G.flow.sea = G.audio.loop('sea', { vol: 0.42 });
}
export function resetWorld(G) {
  const P = G.planet;
  for (const isl of P.allIslands) { isl.visible = false; isl.position.y = -2.2; isl.risen = false; isl.setState('idle'); }
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
  for (const isl of P.allIslands) { isl.visible = false; isl.position.y = -2.2; isl.setState('idle'); }
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

  /* ---- Screen 4: five zones rise, the camera whipping to each as it comes up out of the water */
  d.handheld(0.25);
  const order = [0, 2, 1, 3, 4];                      // near ones first, then out across the sea
  for (const [n, i] of order.entries()) {
    const site = P.sites[i], isl = site.islands[site.first], at = isl.position.clone().setY(0);
    const side = n % 2 ? 1 : -1, size = 9 + site.shape.area * 0.12;
    const cam = at.clone().add(V(side * size * 1.1, size * 0.9, size * 1.9));
    G.audio.play('whoosh', { dur: 0.45, from: -side * 0.7, to: side * 0.7, vol: 0.22 });
    await s.run(d.whip({ pos: cam, target: at.clone().add(V(0, 1.2, 0)), fov: 50, roll: side * 0.05 }, 0.5));
    riseIsland(G, isl);
    d.to({ pos: at.clone().add(V(side * size * 0.8, size * 0.62, size * 1.45)), target: at.clone().add(V(0, 2.2, 0)), fov: 48, roll: side * 0.02 }, 1.9, Ease.outCubic);
    await s.wait(1.55);
  }
  // all five, from high over the sea
  G.audio.play('whoosh', { dur: 1.1, vol: 0.26 });
  await s.run(d.to({ pos: V(-28, 70, 96), target: V(36, 0, -100), fov: 56, roll: 0 }, 1.8, Ease.inOutCubic));
  await s.wait(0.4);
  await say(s, G, 's4.found');
  // feed off: from here it is the mission's own camera
  feed.style.transition = 'opacity 1.2s ease'; feed.style.opacity = '0'; fx(G, 'feed', 0, 1.2, { real: true });
  const glide = loopGlide(G, 22);
  const pulse = pulseAsPassed(G, { glow: false });
  s.onKill(pulse);
  const lineP = say(s, G, 's4.shapes', { after: 0 });
  await s.run(glide);
  await lineP;
  pulse();
  feed.hidden = true; feed.style.transition = ''; f.feed = 0;

  /* ---- Screen 5: the area hook */
  highGlide(G, 26);
  const glow = pulseAsPassed(G, { glow: true });
  s.onKill(glow);
  await say(s, G, 's5.ships');
  await say(s, G, 's5.match');
  await say(s, G, 's5.need');
  await say(s, G, 's5.learn', { after: 0.4 });
  glow();
  for (const site of P.sites) { const isl = site.islands[site.first]; isl.setState('hot'); isl.pulse(); }
  A.play('zone.glow');
  await s.wait(1.0);
  await fadeOut(G, 1.0);
  d.stop();
  for (const site of P.sites) site.islands[site.first].setState('idle');
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
export function riseIsland(G, isl, { dur = 2.4, shake = 0.14 } = {}) {
  const P = G.planet, A = G.audio;
  const pos = isl.position.clone(); pos.y = 0;
  const v = pos.clone().project(G.camera);
  A.play('island.rise', { dur, pan: clamp(v.x * 0.8, -0.9, 0.9) });
  P.ocean.ripple(pos.x, pos.z, 0.9);
  isl.rise(dur);
  G.director.shake(shake);
  let pour = 0;
  const off = G.onFrame((dt) => {
    pour += dt;
    if (pour < dur + 1.6) P.pour(isl, pour < dur ? 1.4 : 0.5, dt);
    else off();
  });
  setTimeout(() => { P.splash(pos.x, pos.z, { count: 90, power: 1.3, radius: isl.verts.reduce((m, p) => Math.max(m, Math.hypot(p.x, p.y)), 0) * 0.8 }); A.play('splash', { vol: 0.32 }); P.ocean.ripple(pos.x, pos.z, 0.55); }, dur * 0.8 * 1000 / G.clock.scale);
  return isl;
}

/* a low loop round the island field, banking, each zone passing close by */
function loopGlide(G, dur) {
  const pts = [], tg = [];
  const R = 150, H = 8;
  for (let i = 0; i <= 8; i++) {
    const a = (-140 + i * 32) * DEG;
    pts.push(V(FIELD.x + Math.sin(a) * R * (i % 2 ? 0.78 : 0.92), H + (i % 2 ? 4 : 0) + (i === 0 ? 50 : 0), FIELD.z + Math.cos(a) * R * 0.82));
    tg.push(V(FIELD.x + Math.sin(a + 0.9) * 48, 2, FIELD.z + Math.cos(a + 0.9) * 44));
  }
  return G.director.path({ points: pts, target: tg, fov: [54, 46], roll: 'bank', bank: 1.4, dur, ease: Ease.inOutSine, blendIn: 0.08 });
}
/* Screen 5: a slow, high glide across the field */
function highGlide(G, dur) {
  const pts = [V(-130, 70, 40), V(-60, 52, -10), V(30, 46, -40), V(120, 50, -70), V(190, 62, -150)];
  const tg = [V(-62, 0, -60), V(-10, 0, -96), V(60, 0, -90), V(110, 0, -130), V(60, 0, -170)];
  return G.director.path({ points: pts, target: tg, fov: [50, 46], roll: 'bank', bank: 0.5, dur, ease: Ease.inOutSine, blendIn: 0.2, fromCurrent: false });
}
/* each zone pulses (or glows) as the camera's gaze passes over it */
function pulseAsPassed(G, { glow }) {
  const P = G.planet, A = G.audio, done = new Set();
  return G.onFrame(() => {
    const cam = G.camera, fwd = new THREE.Vector3(); cam.getWorldDirection(fwd);
    P.sites.forEach((site, i) => {
      const isl = site.islands[site.first]; if (!isl.visible || done.has(i)) return;
      const to = isl.position.clone().sub(cam.position), dist = to.length(); to.normalize();
      const a = Math.acos(clamp(to.dot(fwd), -1, 1));
      if (a < 0.2 && dist < 220) {
        done.add(i); isl.pulse(); if (glow) isl.setState('hot');
        const v = isl.position.clone().project(cam);
        A.play('zone.pulse', { i, pan: clamp(v.x, -0.8, 0.8) });
        if (glow) setTimeout(() => isl.setState('idle'), 2200);
      }
    });
  });
}
