// ---------------------------------------------------------------------------
// Screen 2: the cockpit, the trip to the water planet (the user's addition), the
// drone launch.
//   "Welcome, Space Commander!…" → steer the planet into the reticle (the stick)
//   → push the thrust lever: the hyperspace jump (build-up, snap, a beat of
//   silence, the reveal) → hold DESCEND: re-entry plasma, the cloud deck, the dark
//   sea → the LXD's lines → LAUNCH: the drone flies out, the feed glitches in.
// Nothing here can fail: every step waits for the player, with a hint if they wait.
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { V, say, fx, cleanFx } from './common.js';
import { Ease, clamp, damp, DEG, smoothstep, lerp } from '../engine/util.js';
import { tweens } from '../engine/tween.js';
import { t } from '../engine/i18n.js';

const P0 = new THREE.Vector3(0, 3.0, -12);      // the pilot's eye, in the command ship (space)
const HOVER = new THREE.Vector3(0, 46, 150);     // where the ship hovers over the sea (the planet)

export function resetWorld(G) {
  G.space.resetPlanet(); G.space.command.visible = true;
  G.ck.reset(); G.ck.show(false);
  const P = G.planet; P.drone.visible = false;
}

export async function run(s, G, flow) {
  const S = G.space, P = G.planet, d = G.director, A = G.audio, ck = G.ck, hud = G.hud;
  cleanFx(G); G.setWorld(S);
  S.resetPlanet(); S.command.visible = false; S.fleet.forEach((f) => (f.visible = true));
  S.dust.speed = 18; S.flyDir.set(0, 0, -1);
  ck.reset(); ck.show(true); hud.show(false);
  G.post.fx.flash = Math.max(G.post.fx.flash, 0.9); fx(G, 'flash', 0, 0.9, { real: true });
  A.music.play('cockpit', { fade: 2 });
  const hum = A.loop('hum', { vol: 0.14 }); const engine = A.loop('engine', { vol: 0.12, bus: 'amb' });
  engine.set('power', 0.25);
  s.onKill(() => { hum.stop(0.4); engine.stop(0.4); });
  A.play('ck.boot');

  // the view: the planet off to the left, a little low
  const toPlanet = S.oceanPlanet.position.clone().sub(P0).normalize();
  const pYaw = Math.atan2(-toPlanet.x, -toPlanet.z), pPitch = Math.asin(toPlanet.y);
  const look = { yaw: pYaw - 30 * DEG, pitch: pPitch + 10 * DEG, roll: 0, vyaw: 0 };
  const dirOf = (yaw, pitch, out = new THREE.Vector3()) => out.set(-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch));
  const lensShift = () => {
    const r = document.querySelector('.ck-canopy').getBoundingClientRect(), y = r.top + r.height * 0.46;
    d.shift(0, 0.5 - y / innerHeight);
  };
  lensShift(); const onResize = () => lensShift(); addEventListener('resize', onResize); s.onKill(() => removeEventListener('resize', onResize));
  let steer = false, fov = 55, drift = 0;
  const eye = P0.clone();                          // the pilot's eye: moves only on the way down to the sea
  d.cut({ pos: eye, target: eye.clone().add(dirOf(look.yaw, look.pitch).multiplyScalar(100)), fov, roll: 0 });
  const cam = d.follow((p, dt) => {
    drift += dt;
    if (steer) {
      const st = G.input.read();
      const want = -st.x * 32 * DEG;
      look.vyaw = damp(look.vyaw, want, 5, dt);
      look.yaw += look.vyaw * dt;
      look.pitch = clamp(look.pitch + st.y * 22 * DEG * dt, -40 * DEG, 40 * DEG);
    }
    look.roll = damp(look.roll, clamp(-look.vyaw * 0.35, -0.3, 0.3), 3, dt);
    p.pos.copy(eye).add(V(Math.sin(drift * 0.6) * 0.06, Math.sin(drift * 0.8) * 0.05, 0));
    dirOf(look.yaw, look.pitch, p.target).multiplyScalar(100).add(p.pos);
    p.fov = fov; p.roll = look.roll;
  }, 9, { lambdaTarget: 9, lambdaFov: 8 });
  d.handheld(0.12);

  await s.wait(0.9);
  await say(s, G, 's2.welcome');

  // the target
  const marker = G.onFrame(() => {
    const v = S.oceanPlanet.position.clone().project(G.camera);
    ck.placeMarker((v.x * 0.5 + 0.5) * innerWidth, (-v.y * 0.5 + 0.5) * innerHeight, v.z < 1, true);
  });
  s.onKill(marker);
  A.play('ck.chatter');
  ck.marker.hidden = false;
  await say(s, G, 's2.planet');
  ck.showReticle(true);
  G.input.enable(true); G.input.reveal({ demo: true }); G.input.used = false;
  steer = true;
  const sayAlign = say(s, G, 's2.align', { after: 0 });
  // locked: the planet inside the circle for half a second
  let inside = 0, idle = 0;
  await s.until((dt) => {
    const f = dirOf(look.yaw, look.pitch), a = Math.acos(clamp(f.dot(S.oceanPlanet.position.clone().sub(P0).normalize()), -1, 1)) / DEG;
    if (G.auto) { const pl2 = S.oceanPlanet.position.clone().sub(P0).normalize(); G.input.auto = { x: clamp(-(Math.atan2(-pl2.x, -pl2.z) - look.yaw) * 4, -1, 1), y: clamp((Math.asin(pl2.y) - look.pitch) * 4, -1, 1) }; }
    ck.lockState(a < 3.6 ? 'locked' : a < 9 ? 'near' : 'none');
    inside = a < 3.6 ? inside + dt : 0;
    if (G.input.read().mag === 0) { idle += dt; if (idle > 7 && hud.captionKey !== 'cap.steer') { hud.caption('cap.steer'); G.input.demo(true); } } else { idle = 0; }
    return inside > 0.5;
  });
  await sayAlign.catch(() => {});
  G.input.auto = null;
  hud.caption(null);
  steer = false; G.input.enable(false);
  A.play('ck.lock');
  ck.lockState('locked'); ck.status(t('ck.targetLocked'));
  marker(); ck.marker.hidden = true;
  // settle exactly on it
  const pl = S.oceanPlanet.position.clone().sub(P0).normalize(), ty = Math.atan2(-pl.x, -pl.z), tp = Math.asin(pl.y);
  tweens.add({ duration: 0.8, ease: Ease.outCubic, onUpdate: (e) => { look.yaw = lerp(look.yaw, ty, e); look.pitch = lerp(look.pitch, tp, e); } });
  await say(s, G, 's2.locked', { after: 0 });

  // the thrust lever
  ck.leverEnable(true);
  let lv = 0; ck.onLever = (v) => { lv = v; };
  const leverFx = G.onFrame((dt) => { S.dust.speed = 18 + lv * 120; engine.set('power', 0.25 + lv * 0.75, 0.2); fov = 55 - lv * 4; ck.speed((0.4 + lv * 9.2).toFixed(1)); if (lv > 0.2) d.trauma = Math.max(d.trauma, lv * 0.22); });
  s.onKill(leverFx);
  let idleL = 0;
  if (G.auto) setTimeout(() => ck._leverTap(), 1200);
  await s.until((dt) => { idleL += dt; if (idleL > 8 && lv < 0.1 && hud.captionKey !== 'cap.thrust') hud.caption('cap.thrust'); return lv >= 0.995; });
  hud.caption(null);
  leverFx(); ck.leverEnable(false); ck.leverDone(); ck.showReticle(false);
  ck.onLever = null;
  await warp(s, G, { look, dirOf, setFov: (f) => (fov = f), getFov: () => fov, engine });
  await say(s, G, 's2.arrive');

  // DESCEND (hold)
  await say(s, G, 's2.descend', { after: 0 });
  ck.showDescend(true);
  await descend(s, G, { look, dirOf, setFov: (f) => (fov = f), engine, eye });
  ck.showDescend(false);

  // over the dark sea: the LXD's lines and LAUNCH
  await say(s, G, 's2.safe');
  await say(s, G, 's2.drone', { after: 0.1 });
  const launchP = ck.showLaunch();
  await say(s, G, 's2.launch', { after: 0 });
  let waited = 0;
  const idleCap = G.onFrame((dt) => { waited += dt; if (waited > 6) { hud.caption('cap.launch'); idleCap(); } });
  s.onKill(idleCap); s.onKill(() => ck.hideLaunch());
  if (G.auto) setTimeout(() => ck.launch.click(), 1500);
  await s.run(launchP);
  idleCap(); hud.caption(null);
  await launchDrone(s, G, { cam });
  hum.stop(0.3); engine.stop(0.3);
}

/* -------------------------------------------------------------- the jump */
async function warp(s, G, { look, dirOf, setFov, getFov, engine }) {
  const S = G.space, d = G.director, A = G.audio, ck = G.ck, f = G.post.fx;
  ck.status(t('ck.hyperdrive')); A.play('ck.chatter');
  // build-up: the lens draws in, the dust lengthens, the whine climbs
  A.play('warp.charge', { dur: 1.5 });
  const t0 = getFov();
  tweens.add({ duration: 1.5, ease: Ease.inQuad, onUpdate: (e) => { setFov(t0 - e * 6); S.dust.speed = 140 + e * 260; d.trauma = Math.max(d.trauma, 0.15 + e * 0.35); f.ca = e * 0.004; } });
  await s.wait(1.5);
  // snap
  A.play('warp.jump'); d.punch(18);
  f.flash = 0.75; fx(G, 'flash', 0, 0.5, { real: true });
  const tunnel = A.loop('warp', { vol: 0.32 }); s.onKill(() => tunnel.stop(0.2));
  S.dust.u.uColA.value.set(0x9ff3ff); S.dust.u.uColB.value.set(0xff7ad8); S.dust.u.uWidth.value = 0.09;
  tweens.add({ duration: 0.55, ease: Ease.outExpo, onUpdate: (e) => { setFov(t0 - 6 + e * 56); S.dust.speed = 400 + e * 2400; f.zoomBlur = e * 0.2; f.ca = 0.004 + e * 0.01; } });
  const rumble = G.onFrame(() => { d.trauma = Math.max(d.trauma, 0.42); });
  s.onKill(rumble);
  await s.wait(1.9);
  // a beat of silence before the reveal
  tunnel.set('power', 0, 0.06); A.duckMusic(true); engine.set('power', 0, 0.05);
  await s.wait(0.55);
  rumble(); tunnel.stop(0.1);
  // the reveal: out of the light, the planet right there
  A.play('warp.exit');
  f.flash = 1; fx(G, 'flash', 0, 1.1, { real: true });
  const toward = dirOf(look.yaw, look.pitch);
  S.oceanPlanet.position.copy(P0).addScaledVector(toward, 2350).add(V(-260, 60, 0));
  const pl = S.oceanPlanet.position.clone().sub(P0).normalize();
  look.yaw = Math.atan2(-pl.x, -pl.z) - 4 * DEG; look.pitch = Math.asin(pl.y) + 6 * DEG;
  S.dust.speed = 26; S.dust.u.uWidth.value = 0.05; S.dust.u.uColA.value.set(0xbfe8ff); S.dust.u.uColB.value.set(0xff9ad8);
  f.zoomBlur = 0; f.ca = 0.003; fx(G, 'ca', 0, 1.2);
  setFov(84); tweens.add({ duration: 1.6, ease: Ease.outBack, onUpdate: (e) => setFov(84 - e * 30) });
  d.trauma = 0.3; A.duckMusic(false); engine.set('power', 0.3, 0.8);
  ck.status(t('ck.orbit')); ck.speed('0.2'); ck.alt('1200');
  await s.wait(1.2);
}

/* ------------------------------------------------------- down to the sea */
async function descend(s, G, { look, dirOf, setFov, engine, eye }) {
  const S = G.space, P = G.planet, d = G.director, A = G.audio, ck = G.ck, hud = G.hud, f = G.post.fx;
  const start = S.oceanPlanet.position.clone(), toward = start.clone().sub(P0).normalize(), d0 = start.distanceTo(P0);
  let prog = 0, idle = 0, switched = false, plasma = null, k = 0;
  const startYaw = look.yaw, startPitch = look.pitch;
  ck.status(t('ck.descent'));
  // the frame's real seconds: with a fixed 1/60 a tablet drawing 30 frames a second took twice as long to come down,
  // and the altimeter crawled
  await s.until((dt) => {
    if (G.auto) ck.held = true;
    const held = ck.held;
    if (held) { prog = Math.min(1, prog + dt / 5.2); idle = 0; if (!plasma) { plasma = A.loop('plasma', { vol: 0.42 }); s.onKill(() => plasma && plasma.stop(0.3)); } }
    else { idle += dt; if (idle > 4.5 && hud.captionKey !== 'cap.descend') { hud.caption('cap.descend', { cool: true }); ck.descend.classList.add('ready'); } }
    if (held) hud.caption(null);
    k = damp(k, held ? 1 : 0.35, 3, dt);
    if (!switched) {
      // the planet swells to fill the glass, the heat shield lights up
      const e = Ease.inCubic(Math.min(1, prog / 0.82));
      S.oceanPlanet.position.copy(P0).addScaledVector(toward, lerp(d0, 1000, e));
      look.yaw = lerp(startYaw, Math.atan2(-toward.x, -toward.z), Math.min(1, prog * 2)); look.pitch = lerp(startPitch, Math.asin(toward.y), Math.min(1, prog * 2));
      const pk = smoothstep(0.25, 0.75, prog) * k;
      ck.plasmaK(pk); if (plasma) plasma.set('power', 0.25 + pk * 0.75, 0.1);
      d.trauma = Math.max(d.trauma, pk * 0.45); setFov(54 + pk * 8);
      ck.alt(Math.round(lerp(1200, 60, prog / 0.82)).toString());
      if (prog >= 0.82) { switched = true; enterClouds(s, G); eye.set(HOVER.x, 340, HOVER.z + 40); d.base.pos.copy(eye); look.yaw = 0; look.pitch = -38 * DEG; }
    } else {
      // through the cloud deck to the sea
      const e = Ease.outCubic((prog - 0.82) / 0.18);
      const y = lerp(340, HOVER.y, e);
      eye.set(HOVER.x, y, HOVER.z + 40 * (1 - e));
      look.yaw = 0; look.pitch = lerp(-38 * DEG, -9 * DEG, e);
      const pk = (1 - e) * 0.6 * k; ck.plasmaK(pk); if (plasma) plasma.set('power', pk, 0.1);
      d.trauma = Math.max(d.trauma, pk * 0.3); setFov(56);
      ck.alt((lerp(60, 0.05, e)).toFixed(e > 0.9 ? 2 : 0));
      f.exposure = lerp(0.62, 0.42, e);
    }
    return prog >= 1;
  });
  hud.caption(null); if (G.auto) ck.held = false;
  if (plasma) plasma.stop(1.2); ck.plasmaK(0);
  ck.status(t('ck.hovering')); A.play('ck.chatter');
  engine.set('power', 0.18, 1.2);
  G.audio.music.play('planet', { fade: 3 });
}
function enterClouds(s, G) {
  const P = G.planet, A = G.audio, f = G.post.fx;
  A.play('atmos.break');
  f.flash = 1; f.flashColor.set(0xe9dcff); fx(G, 'flash', 0, 1.0, { real: true }).then(() => f.flashColor.set(0xffffff));
  G.setWorld(P);
  for (const site of P.sites) for (const isl of site.islands) { isl.visible = false; isl.position.y = -2.2; }
  P.ocean.uniforms.uAmp.value = 0.62; P.ocean.u.uBio.value = 0; P.ocean.u.uEnvI.value = 0.85;
  f.exposure = 0.62;
  if (!G.flow.sea) G.flow.sea = G.audio.loop('sea', { vol: 0.42 });
}

/* -------------------------------------------------------- the drone goes */
async function launchDrone(s, G, { cam }) {
  const P = G.planet, d = G.director, A = G.audio, ck = G.ck, f = G.post.fx, dr = P.drone;
  A.play('launch.prime');
  await s.wait(0.35);
  A.play('launch.fire'); d.punch(7); d.shake(0.35);
  const eye = d.base.pos.clone();
  dr.visible = true; dr.thrust = 1; dr.scale.setScalar(1);
  const fly = A.loop('drone', { vol: 0.08 }); G.flow.droneLoop = fly;
  const from = eye.clone().add(V(0.6, -2.2, -3.5));
  const pts = [from, eye.clone().add(V(2.5, -4.5, -16)), eye.clone().add(V(-3, -14, -44)), V(0, 26, 92)];
  const curve = new THREE.CatmullRomCurve3(pts);
  const tw = tweens.add({ duration: 2.2, ease: Ease.inOutSine, onUpdate: (e) => {
    curve.getPointAt(e, dr.position);
    dr.lookAt(curve.getPointAt(Math.min(1, e + 0.02)));
    dr.rotateY(Math.PI); dr.rotateZ(Math.sin(e * Math.PI) * Math.PI * 2 * Ease.inOutSine(e));   // a barrel roll on the way out
  } });
  await s.wait(1.5);
  // the feed cuts in
  A.play('glitch'); A.play('static', { dur: 0.5, vol: 0.14 });
  await fx(G, 'glitch', 1, 0.18, { real: true });
  tw.cancel();
  cam.finish(true);
  ck.show(false); d.shift(0, 0);
  G.flow.droneCut = true;
}
