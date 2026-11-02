// ---------------------------------------------------------------------------
// The introduction (the user's brief: "first we will introduce everything" with
// camera work crazier than Sector Escape's). No narration: picture, music, sound.
//   1 engine close-up: the honeycomb nozzles, the hull rumbling under the lens
//   2 pull back and bank along the hull; a banked flyby round the nose
//   3 whip pans, ship to ship: the five quad ships, each catching the light;
//     then they line up ahead of the commander and the camera rises straight
//     above them: each ship's four sides trace on in light, so its shape reads
//   4 the vertigo shot: the camera backs away while the lens closes in, so the
//     fleet holds its size and the ocean planet looms up behind it
//   5 the punch-in: down the spine of the ship and through the canopy glass
// Skip › cuts to the cockpit.
// ---------------------------------------------------------------------------
import { V, fx, topView } from './common.js';
import { Ease, clamp } from '../engine/util.js';
import { tweens } from '../engine/tween.js';
import { bounds } from '../world/shapes.js';
import { FORMATION } from '../world/space.js';

/** where the five line up for the view from above: abreast ahead of the commander's nose, square to trapezium */
function lineup(fleet, z = -34, y = 2, gap = 3.6) {
  const bs = fleet.map((sh) => bounds(sh.shape.verts));
  const total = bs.reduce((t, b) => t + b.w, 0) + gap * (bs.length - 1), deep = Math.max(...bs.map((b) => b.h));
  let x = -total / 2;
  const homes = bs.map((b) => { const h = V(x - b.minX, y, z + (b.minY + b.maxY) / 2); x += b.w + gap; return h; });
  return { homes, box: { minX: -total / 2, maxX: total / 2, minZ: z - deep / 2, maxZ: z + deep / 2, y: y + fleet[0].hullTop } };
}
/** glide every ship's formation point (it drifts round it) to new places; the tweens, to stop on Skip */
const regroup = (fleet, homes, dur) => fleet.map((sh, i) => {
  const from = sh.home.clone(), to = homes[i];
  return tweens.add({ duration: dur, ease: Ease.inOutCubic, onUpdate: (e) => sh.home.lerpVectors(from, to, e) });
});

export async function run(s, G) {
  const S = G.space, d = G.director, A = G.audio;
  G.setWorld(S);
  S.resetPlanet(); S.command.visible = true; S.command.thrust = 1;
  S.fleet.forEach((f) => { f.visible = true; f.thrust = 0.9; f.hover = 0.15; });
  S.dust.speed = 22;
  G.hud.skip(() => s.kill());
  const engine = A.loop('engine', { vol: 0.28 }); s.onKill(() => engine.stop(0.8));
  engine.set('power', 0.9);

  // 1 — the engine, very close
  d.handheld(0.9); d.shake(0.35);
  // up behind the right wing: the three pods' honeycomb nozzles blazing toward us (well outside their flames)
  await d.cut({ pos: V(7.5, 10.5, 22), target: V(1.5, 3.6, 10.5), fov: 56, roll: -0.14 });
  G.post.fx.ca = 0.004;
  await s.wait(1.4);
  // 2 — back and away along the hull, banking, then round the nose
  A.play('whoosh', { dur: 1.2, from: 0.6, to: -0.6, vol: 0.32 });
  fx(G, 'ca', 0, 1.6);
  d.handheld(0.2);
  await s.run(d.path({ points: [V(6, 14, 30), V(-14, 14, 32), V(-34, 7, 16)], target: V(0, 1, -2), fov: [56, 44], roll: 'bank', bank: 1.3, dur: 3.0, ease: Ease.inOutSine }));
  A.play('flyby', { dur: 2.6, from: -0.9, to: 0.9, vol: 0.42 });
  await s.run(d.path({ points: [V(-38, 2, -8), V(-14, -5, -44), V(24, 2, -46), V(40, 7, -24)], target: V(0, 1, -12), fov: [44, 40], roll: 'bank', bank: 1.6, dur: 3.4, ease: Ease.inOutSine, blendIn: 0.15 }));

  // 3 — the fleet, ship by ship
  const fleet = S.fleet;
  for (let i = 0; i < fleet.length; i++) {
    const sh = fleet[i], p = sh.position, out = V(Math.sign(p.x || 1) * 1, 0.25, -0.35).normalize();
    const dist = sh.size * 1.55 + 4;
    const cam = p.clone().addScaledVector(out, dist).add(V(0, 2.2, 0));
    A.play('whoosh', { dur: 0.42, from: -0.7, to: 0.7, vol: 0.24 });
    await s.run(d.whip({ pos: cam, target: p.clone(), fov: 42, roll: Math.sign(p.x || 1) * -0.08 }, 0.42));
    sh.setBeacons(0xffffff); A.play('zone.pulse', { i, pan: Math.max(-0.8, Math.min(0.8, p.x / 30)) });
    for (const b of sh.beacons) b.color.set(0xffd27a);
    await s.run(d.to({ pos: p.clone().addScaledVector(out, dist * 0.8).add(V(0, 1.6, 0)), target: p.clone(), fov: 40, roll: Math.sign(p.x || 1) * -0.03 }, 0.78, Ease.outCubic));
  }

  // … then the five line up ahead of the commander and the camera rises straight above them: one by one, each
  // ship's four sides trace on in light
  const formation = FORMATION.map((p) => V(...p)), line = lineup(fleet);
  let moving = regroup(fleet, line.homes, 2.4);
  s.onKill(() => { moving.forEach((t) => t.cancel()); fleet.forEach((sh, i) => { sh.home.copy(formation[i]); sh.edges.off(); }); });
  A.play('flyby', { dur: 2.4, from: -0.6, to: 0.6, vol: 0.3 }); A.play('whoosh', { dur: 1.6, vol: 0.28 });
  d.handheld(0.05);
  await s.run(d.to(topView(G, line.box, { margin: 0.1 }), 2.6, Ease.inOutCubic));
  for (const [i, sh] of fleet.entries()) {
    sh.edges.trace(0.75);
    A.play('edge.trace', { dur: 0.75, up: [0, 2, 4, 7, 9][i], pan: clamp(sh.home.x / 40, -0.8, 0.8) });
    await s.wait(0.5);
  }
  await s.wait(1.3);
  // back into formation, the light fading off their sides
  for (const sh of fleet) sh.edges.fade(0, 0.9);
  moving = regroup(fleet, formation, 2.2);

  // 4 — the vertigo shot: back away, close the lens; the planet looms behind the fleet
  A.play('riser', { dur: 3.6, vol: 0.16 });
  const subject = V(0, 2, -6), dir = V(0.12, 0.2, 1).normalize();
  d.handheld(0.2);
  await s.run(d.to({ pos: subject.clone().addScaledVector(dir, 46), target: subject, fov: 2 * Math.atan(38 / (2 * 46)) * 57.2958, roll: 0 }, 1.2, Ease.inOutCubic));
  await s.run(d.dolly({ subject, dir, size: 38, from: 46, to: 150, dur: 3.6, ease: Ease.inOutSine }));

  // 5 — down the spine and through the glass
  A.play('whoosh', { dur: 1.5, from: 0, to: 0, vol: 0.42 });
  d.shake(0.25);
  await s.run(d.path({ points: [V(0, 24, 52), V(0, 11, 14), V(0, 4.6, -5), V(0, 3.1, -10.4)], target: V(0, 2.0, -40), fov: [26, 82], roll: 0, dur: 1.9, ease: Ease.inQuart, blendIn: 0.25 }));
  A.play('impact', { vol: 0.35 });
  await fx(G, 'flash', 1, 0.12, { real: true });
  engine.stop(1.2);
}
