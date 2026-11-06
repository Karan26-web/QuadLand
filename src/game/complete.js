// ---------------------------------------------------------------------------
// Screen 13: mission complete. The LXD's second review (2026-11-06): it shows on
// the water only, not flying. So it plays on the water planet: the five ships, each
// landed on its zone, stand in a gentle arc on the sea in the middle of the field
// (the sets step aside for it), the sea foaming round them, the ringed giant in the
// sky behind; each one's area rule on a card beneath it; "Mission complete!", a
// fanfare, confetti; "All five spaceships have landed safely…"; RESTART goes back
// to the cockpit.
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { V, say, fadeIn, fadeOut, cleanFx } from './common.js';
import { Ease } from '../engine/util.js';
import { SHAPES } from '../world/shapes.js';
import { Island, TOP } from '../world/islands.js';
import { QuadShip } from '../world/ships.js';
import { t } from '../engine/i18n.js';

const AT = V(36, 0, -94);      // the middle of the field
const STAND = 0.72;            // a landed hull above its pad

let built = null;
/** the five landed ships on their own zones, in the sea (their own copies: the sets keep their state for RESTART) */
function build(G) {
  if (built) return built;
  const P = G.planet, group = new THREE.Group(); group.name = 'finale';
  const items = SHAPES.map((shape, i) => {
    const x = AT.x + (i - 2) * 18, z = AT.z - (i - 2) * (i - 2) * 2.6, yaw = -(i - 2) * 0.12;
    const isl = new Island(shape, shape.area, { seed: 900 + i });
    isl.placeRisen(); isl.position.x = x; isl.position.z = z; isl.rotation.y = yaw; isl.setState('good');
    isl.padMat.roughness = 0.75; isl.padMat.envMapIntensity = 0.35; isl.rimMat.roughness = 0.7;   // satin (below)
    const sh = new QuadShip(shape);
    sh.position.set(x, TOP + STAND, z); sh.rotation.y = yaw;
    sh.legK = 1; sh.hover = 0; sh.thrust = 0; sh.bob = 0; sh.setBeacons(0x3dffa2);
    // satin finishes: seen low across the sea toward the moon, the glossy deck and top mirrored it (and the bright sky
    // round it) into a white blaze over a whole ship. The glass keeps a little shine
    sh.traverse((o) => {
      if (!o.isMesh) return;
      for (const m of [].concat(o.material)) {
        if (!m || !m.isMeshStandardMaterial) continue;
        if (o === sh.canopy) { m.envMapIntensity = 0.7; continue; }
        m.roughness = Math.max(m.roughness, 0.72); m.envMapIntensity = 0.4; if (m.isMeshPhysicalMaterial) m.clearcoat = 0;
      }
    });
    group.add(isl, sh);
    return { isl, sh, i, shape };
  });
  P.scene.add(group); group.visible = false;
  P.extras.push((dt) => { if (!group.visible) return; for (const it of items) { it.isl.update(dt); it.sh.update(dt); } });
  built = { group, items, islands: items.map((it) => it.isl) };
  return built;
}
/** a calm sea for the finale (as in the playing view, a little livelier): little foam, a faint plankton glow, and the
    moon's glitter low, so nothing on the water outshines the five (the moon's path was a white blaze over one ship) */
const CALM = { uFoamK: 0.3, uLaceK: 0.5, uBio: 0.12, uSpecK: 0.18 };
function calmSea(G, on) {
  const u = G.planet.ocean.u;
  if (on && !built.sea) { built.sea = {}; for (const k in CALM) { built.sea[k] = u[k].value; u[k].value = CALM[k]; } }
  else if (!on && built.sea) { for (const k in built.sea) u[k].value = built.sea[k]; built.sea = null; }
}
/** the finale off again (RESTART, or a restart from the pause menu) */
function clear(G) {
  if (!built) return;
  built.group.visible = false; G.planet.seaIslands = null; calmSea(G, false);
}

export async function run(s, G, flow) {
  const P = G.planet, d = G.director, A = G.audio, hud = G.hud;
  const F = build(G);
  await fadeOut(G, 0.9);
  hud.show(false); G.labels.clear(); G.input.enable(false);
  G.setWorld(P); cleanFx(G); G.post.fx.fade = 1;
  document.body.classList.remove('topview');
  // only the five on the sea: the sets and their ships step aside (RESTART puts every set back)
  for (const isl of P.allIslands) isl.visible = false;
  for (const sh of P.ships) sh.visible = false;
  F.group.visible = true; P.seaIslands = F.islands;
  s.onKill(() => clear(G));
  P.ocean.uniforms.uAmp.value = 0.55; calmSea(G, true);
  if (flow.sea) flow.sea.set('vol', 0.3, 1); else flow.sea = A.loop('sea', { vol: 0.3 });
  A.music.play('complete', { fade: 1.5 });
  // along the line, low over the water, then up and back to see all five. The line is wide and the FOV is vertical,
  // so the view of all five is framed by its width: it comes closer on a wide phone and pulls back on a narrower
  // screen (a tablet, a phone held upright) so no ship is cut off. At a laptop's 16:10, k = 1. On a phone held
  // upright the rule cards are wide for the screen, so it pulls back a little more to keep the outer two inside.
  const mid = AT.clone().add(V(0, TOP + 0.6, -3)), aspect = G.camera.aspect, k = THREE.MathUtils.clamp(1.6 / aspect, 0.74, 4) * (aspect < 0.65 ? 1.16 : 1);
  const at = (x, y, z) => AT.clone().add(V(x, y, z));
  d.cut({ pos: at(-62, 7, 22), target: at(-36, TOP, -8), fov: 44, roll: 0.08 });
  d.handheld(0.2);
  fadeIn(G, 1.2);
  const sweep = d.path({
    points: [at(-50, 7, 22), at(-24, 8, 22), at(8, 8, 24), at(30, 9, 22), at(14, 16, 40), mid.clone().add(V(0, 17, 50).multiplyScalar(k))],
    target: [at(-30, TOP, -8), at(-12, TOP, -4), at(10, TOP, -4), at(26, TOP, -8), at(6, TOP, -4), mid],
    fov: [44, 50], roll: 'bank', bank: 0.8, dur: 7.5, ease: Ease.inOutSine, blendIn: 0.1,
  });
  // the rules beneath, one by one as the camera passes: each card hangs from the front of its zone, over the water
  for (const it of F.items) {
    await s.wait(1.1);
    const front = Math.max(...it.isl.verts.map((v) => -v.y)) + 0.9, isl = it.isl;
    const card = `<div class="rule-tag${it.i % 2 ? ' low' : ''}"><b>${t(`shape.${it.shape.key}`).toUpperCase()}</b><span>${t(`rule.${it.shape.key}`)}</span></div>`;
    G.labels.add(`rule-${it.i}`, card, { worldPos: () => isl.localToWorld(V(0, 0.2, front)), anchor: 'top', offset: [0, 10] });
    A.play('zone.pulse', { i: it.i }); isl.pulse();
  }
  await s.run(sweep);
  // Mission complete!
  const cp = document.getElementById('complete'); cp.hidden = false;
  const title = cp.querySelector('.cp-title span'); title.style.animation = 'none'; void title.offsetWidth; title.style.animation = '';
  A.play('fanfare'); A.play('confetti'); d.punch(5);
  for (let n = 0; n < 3; n++) setTimeout(() => { P.confetti.burst(at((n - 1) * 24, 16, -2), 150, { speed: 10, up: 6, spread: 3, scale: 2.2 }); A.play('confetti'); }, n * 380);
  await s.wait(1.6);
  await say(s, G, 's13.done', { after: 1.0 });           // RESTART comes once the subtitle has gone: on a phone they share the foot
  const btn = document.getElementById('btnRestart'); btn.hidden = false;
  d.orbit({ center: mid, radius: 52 * k, height: 17 * k, from: 0, to: 14, fov: 50, dur: 40, ease: Ease.inOutSine });
  await s.event(btn, 'click');
  A.play('ui.confirm');
  btn.hidden = true; cp.hidden = true; G.labels.clear(true); clear(G);
  flow.restart();
}
