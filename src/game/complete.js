// ---------------------------------------------------------------------------
// Screen 13: mission complete. Deep space; the five ships, each landed on its
// island, its area rule beneath it; "Mission complete!", a fanfare, confetti;
// "All five spaceships have landed safely…"; RESTART goes back to the cockpit.
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { V, say, fadeIn, fadeOut, cleanFx } from './common.js';
import { Ease } from '../engine/util.js';
import { SHAPES } from '../world/shapes.js';
import { Island } from '../world/islands.js';
import { QuadShip } from '../world/ships.js';
import { Confetti } from '../engine/fx.js';

let built = null;
function build(G) {
  if (built) return built;
  const S = G.space, group = new THREE.Group(); group.name = 'finale';
  const items = SHAPES.map((shape, i) => {
    const g = new THREE.Group();
    const isl = new Island(shape, shape.area, { seed: 900 + i }); isl.placeRisen(); isl.position.y = 0; isl.scale.y = 0.55; isl.setState('good');
    const sh = new QuadShip(shape); sh.position.y = 0.72; sh.legK = 1; sh.hover = 0; sh.thrust = 0; sh.bob = 0; sh.setBeacons(0x3dffa2);
    g.add(isl, sh); g.scale.setScalar(1.2);
    const x = (i - 2) * 17.5, z = -40 - (i - 2) * (i - 2) * 2.4;
    g.position.set(x, Math.sin(i * 1.3) * 1.2, z); g.rotation.y = -(i - 2) * 0.14; g.rotation.x = 0.12;
    g.userData = { isl, sh, base: g.position.clone(), i };
    group.add(g);
    return g;
  });
  const confetti = new Confetti(500);
  group.add(confetti.mesh);
  S.scene.add(group); group.visible = false;
  S.extras.push((dt) => {
    if (!group.visible) return;
    for (const g of items) { const { isl, sh, base, i } = g.userData; isl.update(dt); sh.update(dt); g.position.y = base.y + Math.sin(S.t * 0.7 + i) * 0.5; g.rotation.y += Math.sin(S.t * 0.3 + i) * 0.0006; }
    confetti.update(dt);
  });
  built = { group, items, confetti };
  return built;
}

export async function run(s, G, flow) {
  const S = G.space, d = G.director, A = G.audio, hud = G.hud;
  const F = build(G);
  await fadeOut(G, 0.9);
  hud.show(false); G.labels.clear(); G.input.enable(false);
  if (flow.sea) { flow.sea.stop(1); flow.sea = null; }
  G.setWorld(S); cleanFx(G); G.post.fx.fade = 1;
  S.command.visible = true; S.command.position.set(0, -30, -180); S.command.thrust = 0.6;
  S.fleet.forEach((f) => (f.visible = false));
  S.dust.speed = 4; F.group.visible = true;
  A.music.play('complete', { fade: 1.5 });
  // along the line, close, then back to see all five. The row is wide and the FOV is vertical, so the view of all five
  // is framed by its width: it comes closer on a wide phone and pulls back on a narrower screen (a tablet, a phone
  // held upright) so no ship is cut off. At a laptop's 16:10, k = 1.
  const mid = V(0, -4, -44), k = THREE.MathUtils.clamp(1.6 / G.camera.aspect, 0.74, 4);
  d.cut({ pos: V(-60, 6, -22), target: V(-38, 0, -46), fov: 44, roll: 0.1 });
  d.handheld(0.2);
  fadeIn(G, 1.2);
  const sweep = d.path({ points: [V(-34, 6, -16), V(-8, 7, -14), V(22, 6, -16), V(16, 16, 4), mid.clone().add(V(0, 25, 53).multiplyScalar(k))], target: [V(-21, -1, -48), V(0, -1, -42), V(21, -1, -48), V(6, -1, -42), mid], fov: [44, 52], roll: 'bank', bank: 0.8, dur: 7.5, ease: Ease.inOutSine, blendIn: 0.1 });
  // the rules beneath, one by one as the camera passes
  const ruleOf = (sh) => sh.rule.replace('diagonal 1', 'd₁').replace('diagonal 2', 'd₂').replace('(sum of the parallel sides)', '(a + b)');
  for (const g of F.items) {
    const { i } = g.userData, shape = SHAPES[i];
    await s.wait(1.1);
    G.labels.add(`rule-${i}`, `<div class="rule-tag"><b>${shape.name.toUpperCase()}</b><span>${ruleOf(shape)}</span></div>`, { worldPos: () => g.position.clone().add(V(0, -7.6, 0)), anchor: 'center' });
    A.play('zone.pulse', { i }); g.userData.isl.pulse();
  }
  await s.run(sweep);
  // Mission complete!
  const cp = document.getElementById('complete'); cp.hidden = false;
  const title = cp.querySelector('.cp-title span'); title.style.animation = 'none'; void title.offsetWidth; title.style.animation = '';
  A.play('fanfare'); A.play('confetti'); d.punch(5);
  for (let k = 0; k < 3; k++) setTimeout(() => { F.confetti.burst(V((k - 1) * 22, 18, -36), 160, { speed: 10, up: 6, spread: 3, scale: 2.4 }); A.play('confetti'); }, k * 380);
  await s.wait(1.6);
  await say(s, G, 's13.done', { after: 0.4 });
  const btn = document.getElementById('btnRestart'); btn.hidden = false;
  d.orbit({ center: mid, radius: 52 * k, height: 24 * k, from: 0, to: 14, fov: 52, dur: 40, ease: Ease.inOutSine });
  await s.event(btn, 'click');
  A.play('ui.confirm');
  btn.hidden = true; cp.hidden = true; G.labels.clear(true); F.group.visible = false; S.command.position.set(0, 0, 0);
  flow.restart();
}
