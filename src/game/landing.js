// ---------------------------------------------------------------------------
// Screens 7–12: back to the mission, then five landings.
// Each landing (LXD): the camera descends to the set (its three islands, the three
// sizes, up since the survey: the user's brief); the ship flies in and hovers; its
// dimensions draw on; its rule is said; each island shows its area; the player
// flies the ship (stick / arrows / W A S D) and presses GO over an island.
//   exact      close-up touchdown in slow motion, confetti, the working as a hologram
//   too small  the overhang glows (hatched, warm): "+5 sq units over the edge";
//              the ship tips and slides into the sea; the drone tows it out; −1 heart
//   too large  the empty rim glows (dashed, cool): "5 sq units left empty"; the
//              ship crashes onto the rock (clang, boing, sparks); −1 heart
// A miss climbs a hint ladder (the idea of the mistake, then the working); with no
// hearts left the autopilot lands on the zone that fits (LXD). NEXT moves on.
// The LXD's review (2026-11-05) shaped the playing view: the areas are written on
// the zones, the dimensions read "5 units" and show only while the ship is still,
// the rule is spoken and not shown, and the view holds just this set, close.
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { V, say, fadeIn, cleanFx } from './common.js';
import { Ease, clamp, damp, lerp, DEG } from '../engine/util.js';
import { tweens } from '../engine/tween.js';
import { inside, threeShape, bounds } from '../world/shapes.js';
import { TOP } from '../world/islands.js';
import { Dims, ribbon } from '../world/dims.js';
import { riseIsland, prepare as surveyPrepare } from './survey.js';

const HOVER_Y = 9.2;          // the ship's height while the player flies it: from above, nearer the camera, it looks bigger
                              // than every island, so none matches it by eye (the numbers decide)
const STAND = 0.72;           // hull above the pad when its legs are down
const SPEED = 9;

/* ------------------------------------------------------------ world state */
export function resetWorld(G) {
  const P = G.planet;
  P.ships.forEach((sh) => { sh.visible = false; sh.rotation.set(0, 0, 0); sh.legK = 0; sh.hover = 1; sh.setBeacons(0xffffff); });
  P.sites.forEach((s) => { s.landed = false; });
  if (G.landingFx) G.landingFx.clear();
}
/** jump into landing k: the sets before it landed (down to their one island), the rest up and waiting */
export function prepare(G, flow, k) {
  surveyPrepare(G);
  const P = G.planet;
  P.sites.forEach((site, i) => {
    if (i < k) {
      site.islands.forEach((isl) => { if (isl.area === site.shape.area) { isl.placeRisen(); isl.setState('good'); } else { isl.visible = false; isl.position.y = -2.2; } });
      const isl = site.islands.find((x) => x.area === site.shape.area), sh = P.ships[i];
      sh.visible = true; sh.position.set(isl.position.x, TOP + STAND, isl.position.z); sh.legK = 1; sh.hover = 0; sh.thrust = 0; sh.bob = 0; sh.setBeacons(0x3dffa2);
      site.landed = true; flow.state.landed[i] = true;
    }
  });
}

/* ------------------------------------------------------------- the props */
class LandingFx {
  constructor(G) {
    this.G = G; const P = G.planet;
    // the ghost under the ship: where it would come down (never its size: the learner must not read the fit off it)
    this.reticle = new THREE.Mesh(new THREE.RingGeometry(0.75, 1.05, 48), new THREE.MeshBasicMaterial({ color: 0x8ee8ff, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.reticle.rotation.x = -Math.PI / 2; this.reticle.renderOrder = 7; this.reticle.visible = false;
    this.dot = new THREE.Mesh(new THREE.CircleGeometry(0.22, 24), this.reticle.material); this.dot.rotation.x = -Math.PI / 2; this.dot.renderOrder = 7; this.dot.visible = false;
    const beamGeo = new THREE.CylinderGeometry(0.05, 0.22, 1, 12, 1, true); beamGeo.translate(0, -0.5, 0);
    this.beam = new THREE.Mesh(beamGeo, new THREE.MeshBasicMaterial({ color: 0x5cf2ff, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    this.beam.visible = false; this.beam.renderOrder = 7;
    P.scene.add(this.reticle, this.dot, this.beam);
    this.locks = []; this.extra = [];
  }
  ghost(ship, groundY, on, hot) {
    this.reticle.visible = this.dot.visible = this.beam.visible = on;
    if (!on) return;
    this.reticle.position.set(ship.position.x, groundY + 0.06, ship.position.z); this.dot.position.copy(this.reticle.position);
    const s = 1 + Math.sin(performance.now() / 260) * 0.06; this.reticle.scale.setScalar(s);
    this.reticle.material.color.set(hot ? 0xffb547 : 0x8ee8ff);
    this.beam.position.set(ship.position.x, ship.position.y + ship.body.position.y, ship.position.z); this.beam.scale.set(1, ship.position.y - groundY, 1);
    this.beam.material.color.set(hot ? 0xffb547 : 0x5cf2ff);
  }
  /** four beams from the ship's corners to the island's */
  lockBeams(ship, isl, color = 0x5cf2ff) {
    this.clearLocks();
    const P = this.G.planet;
    for (let i = 0; i < 4; i++) {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1, 8, 1, true), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
      m.renderOrder = 8; m.userData = { i, ship, isl, k: 0 }; P.scene.add(m); this.locks.push(m);
    }
    this.updateLocks();
  }
  updateLocks() {
    const a = new THREE.Vector3(), b = new THREE.Vector3(), mid = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
    for (const m of this.locks) {
      const { i, ship, isl } = m.userData; m.userData.k = Math.min(1, m.userData.k + 0.08);
      ship.beacons[i].mesh.getWorldPosition(a); isl.cornerWorld(i, b);
      b.lerpVectors(a, b, m.userData.k);
      mid.addVectors(a, b).multiplyScalar(0.5); m.position.copy(mid);
      const d = b.clone().sub(a), len = d.length(); m.scale.set(1, Math.max(0.01, len), 1);
      m.quaternion.setFromUnitVectors(up, d.normalize());
    }
  }
  lockColor(c) { for (const m of this.locks) m.material.color.set(c); }
  clearLocks() { for (const m of this.locks) { m.removeFromParent(); m.geometry.dispose(); m.material.dispose(); } this.locks = []; }
  /** the difference between the ship's footprint and the island's top, drawn on the top's plane */
  difference(ship, isl, over) {
    this.clearExtra();
    const P = this.G.planet, shipV = ship.shape.verts, islV = isl.verts;
    const outer = over ? shipV : islV, inner = over ? islV : shipV;
    const sh = threeShape(outer); sh.holes.push(new THREE.Path(inner.slice().reverse().map((p) => new THREE.Vector2(p.x, p.y))));
    const g = new THREE.ShapeGeometry(sh); g.rotateX(-Math.PI / 2);
    const mat = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Color(over ? 0xff8a3d : 0x5cc8ff) }, uHatch: { value: over ? 1 : 0 }, uTime: { value: 0 }, uAlpha: { value: 0 } },
      vertexShader: 'varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }',
      fragmentShader: `uniform vec3 uColor; uniform float uHatch, uTime, uAlpha; varying vec3 vW;
        void main(){ float st = step(0.5, fract((vW.x + vW.z) * 1.4 - uTime * 0.7));
          float a = uHatch > 0.5 ? mix(0.22, 0.95, st) : 0.42 + 0.12 * sin(uTime * 5.0);
          gl_FragColor = vec4(uColor * (1.4 + st * uHatch), a * uAlpha); }`,
      transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    });
    const m = new THREE.Mesh(g, mat); m.renderOrder = 12;
    m.position.set(isl.position.x, TOP + 0.12, isl.position.z);
    P.scene.add(m); this.extra.push(m);
    // the edge that matters: dashed where the zone is empty, solid where the ship hangs over
    const edge = over ? islV : islV;
    for (let i = 0; i < edge.length; i++) {
      const r = ribbon(edge[i], edge[(i + 1) % edge.length], 0, 0.14, { color: over ? 0xffd27a : 0x9fe6ff, dash: over ? 0 : 0.5 });
      r.material.uniforms.uProgress.value = 1; r.position.copy(m.position); r.position.y += 0.02;
      P.scene.add(r); this.extra.push(r);
    }
    const t0 = performance.now();
    this.diffTick = this.G.onFrame(() => { mat.uniforms.uTime.value = (performance.now() - t0) / 1000; mat.uniforms.uAlpha.value = Math.min(1, mat.uniforms.uAlpha.value + 0.06); });
    return m;
  }
  clearExtra() { if (this.diffTick) { this.diffTick(); this.diffTick = null; } for (const m of this.extra) { m.removeFromParent(); m.geometry.dispose(); m.material.dispose(); } this.extra = []; }
  clear() { this.clearLocks(); this.clearExtra(); this.ghost(null, 0, false); }
}

/* ---------------------------------------------------------------- Screen 7 */
export async function back(s, G, flow) {
  const P = G.planet, d = G.director, A = G.audio;
  surveyPrepare(G);
  G.setWorld(P); cleanFx(G); G.post.fx.fade = 1;
  G.ck.show(false); document.getElementById('lesson').hidden = true;
  P.ocean.uniforms.uAmp.value = 0.62;
  for (const w of P.waves) w.centre.set(36, 0, -94);
  A.music.play('landing', { fade: 2.5 });
  d.cut({ pos: V(140, 80, 110), target: V(36, 0, -94), fov: 50, roll: 0 });
  d.handheld(0.15);
  fadeIn(G, 1.2);
  // round the near side of the field to the first set (the square's)
  const pathP = d.path({ points: [V(110, 70, 56), V(54, 58, 34), V(14, 46, 26)], target: V(6, 0, -66), fov: [50, 50], roll: 'bank', bank: 0.6, dur: 9, ease: Ease.inOutSine });
  if (!flow.state.lessonSkipped) await say(s, G, 's7.back');   // "Now you know how to find the area…": not after a skipped lesson
  await say(s, G, 's7.land', { after: 0 });
  await s.run(pathP);
}

/* ------------------------------------------------------------ Screens 8–12 */
export async function run(s, G, flow, k) {
  const P = G.planet, d = G.director, A = G.audio, hud = G.hud, st = flow.state;
  const site = P.sites[k], shape = site.shape, ship = P.ships[k];
  if (!G.landingFx) G.landingFx = new LandingFx(G);
  const L = G.landingFx;
  G.setWorld(P); cleanFx(G); G.ck.show(false);
  hud.show(true); hud.setHearts(3); st.hearts = 3; st.misses[k] = 0;
  hud.caption(null); hud.goShow(false);
  A.music.play('landing');

  const c = site.centre, sp = site.spacing;
  const play = playView(G, site, ship);
  d.shift(0, hudShift());                             // the field sits a little low: the top bar and the caption own the top
  s.onKill(() => d.shift(0, 0));
  // the camera descends to the zone (after NEXT: up and over from the last one)
  await s.run(d.path({ points: [c.clone().add(V(-sp * 1.4, sp * 2.6, sp * 3.2)), play.pos], target: [c.clone().add(V(0, 0, -sp * 0.6)), play.target], fov: [50, play.fov], roll: 'bank', bank: 0.8, dur: 2.6, ease: Ease.inOutCubic, blendIn: 0.1 }));

  // the set's three islands have been up since the survey; any that are not (a jump straight here) rise now
  const others = site.islands.filter((isl) => !isl.risen);
  for (const isl of others) { riseIsland(G, isl, { dur: 2.2, shake: 0.1 }); await s.wait(0.7); }
  await s.wait(others.length ? 1.6 : 0.5);

  // the ship flies in and hovers in the clear water among the three
  const hoverAt = startPoint(site, ship);
  ship.visible = true; ship.legK = 0; ship.hover = 1; ship.thrust = 1; ship.bob = 1; ship.rotation.set(0, 0, 0); ship.setBeacons(0xffffff);
  const from = c.clone().add(V(sp * 3.5, 60, sp * 5));
  ship.position.copy(from);
  const hoverLoop = A.loop('hover', { vol: 0.1 }); s.onKill(() => hoverLoop.stop(0.3));
  const arrive = new THREE.CatmullRomCurve3([from, c.clone().add(V(sp * 1.8, 26, sp * 2.4)), c.clone().add(V(-sp * 0.6, 12, sp * 0.9)), hoverAt]);
  A.play('ship.arrive', { dur: 2.6, from: 0.8, to: -0.1 });
  const flyIn = tweens.add({ duration: 3.0, ease: Ease.outCubic, onUpdate: (e) => {
    const p = arrive.getPointAt(e); ship.vel.copy(p).sub(ship.position).multiplyScalar(60); ship.position.copy(p);
    ship.thrust = 1 - e * 0.8;
  } });
  // the camera swings round to meet it
  d.handheld(0.3);
  d.follow((p) => { const sp2 = ship.position; p.pos.copy(sp2).add(V(-sp * 1.1, 4 + sp * 0.2, sp * 1.6)); p.target.copy(sp2); p.fov = 46; p.roll = 0.06; }, 2.6);
  const hereP = say(s, G, shape.vo.here, { after: 0 });
  await s.run(flyIn.promise);
  ship.vel.set(0, 0, 0); ship.thrust = 0.15;
  P.ocean.ripple(ship.position.x, ship.position.z, 0.35);
  await hereP;
  // a hero orbit round the hovering ship
  await s.run(d.orbit({ center: () => ship.position.clone(), radius: [sp * 1.5, sp * 1.1], height: [3, sp * 1.2], from: -35, to: 70, fov: [46, 42], dur: 3.2, ease: Ease.inOutSine }));
  if (shape.vo.extra) await say(s, G, shape.vo.extra);

  // its dimensions draw on (top-down over the ship)
  const dims = new Dims(ship, G.labels, `dim${k}`); flow.dims = dims;
  s.onKill(() => dims.dispose());
  const over = { pos: ship.position.clone().add(V(0, ship.size * 2.2 + 5, ship.size * 0.95 + 1.5)), target: ship.position.clone().add(V(0, 0, -0.2)), fov: 46 };
  await s.run(d.to(over, 1.3, Ease.inOutCubic));
  d.handheld(0.08); ship.bob = 0.25;
  await s.wait(0.2);
  await dims.drawAll({ dur: 0.6, sfx: (n) => A.play(n) }, 0.35, (t) => s.wait(t));
  await s.wait(0.3);
  await say(s, G, shape.vo.rule);                     // the rule is said (LXD), not shown: no formula on screen

  // up to straight above the set, which is all the view holds now; each island shows its area, written on it
  focus(G, site, true); s.onKill(() => focus(G, site, false));
  await s.run(d.to(play, 1.6, Ease.inOutCubic));
  document.body.classList.add('topview'); s.onKill(() => document.body.classList.remove('topview'));
  const order = site.islands.map((isl, i) => i).sort((a, b) => site.islands[a].position.x - site.islands[b].position.x);
  for (const i of order) {
    const isl = site.islands[i];
    isl.showArea(true); isl.pulse(); A.play('area.pop', { i });
    await s.wait(0.55);
  }
  await say(s, G, shape.vo.ask, { after: 0.1 });

  // fly and choose
  st.hearts = 3;
  for (;;) {
    const choice = await fly(s, G, flow, { site, ship, k, play, hoverLoop, first: k === 0 && st.misses[k] === 0 });
    const isl = choice;
    const exact = isl.area === shape.area;
    dims.hide(true);
    if (exact) { await landExact(s, G, { site, ship, isl, k, hoverLoop }); break; }
    const tooSmall = isl.area < shape.area;
    if (tooSmall) await landTooSmall(s, G, { site, ship, isl, k, hoverLoop }); else await landTooLarge(s, G, { site, ship, isl, k, hoverLoop });
    st.misses[k]++;
    const left = hud.loseHeart(); st.hearts = left;
    await say(s, G, tooSmall ? 'o.small' : 'o.large');
    await say(s, G, 'o.exact');
    L.clearExtra();
    await recover(s, G, { ship, site, isl, tooSmall, hoverLoop, play });
    if (left <= 0) {
      // the autopilot lands on the zone that fits (the caption says it, so the spoken line has no second copy below)
      hud.caption('Out of hearts! Autopilot will land on the zone that fits.', { cool: true });
      A.play('autopilot');
      await say(s, G, 'o.auto', { subtitle: false });
      const right = site.islands.find((x) => x.area === shape.area);
      await autopilot(s, G, { ship, isl: right });
      hud.caption(null);
      await landExact(s, G, { site, ship, isl: right, k, hoverLoop, auto: true });
      break;
    }
    dims.showAll();
    // the hint ladder: the idea of the mistake, then the working (said and shown once, in the caption; it stays up
    // while the player tries again)
    if (st.misses[k] === 1) {
      const id = `h.${shape.hint}.${isl.area}`;
      hud.caption(G.voice.text(id), { cool: true }); A.play('ui.hint');
      await say(s, G, id, { after: 0.4, subtitle: false });
    } else {
      hud.caption(G.voice.text(`w.${shape.hint}`), { cool: true }); A.play('ui.hint');
      for (const it of dims.items) G.labels.cls(it.id, 'alt', true);
      await say(s, G, `w.${shape.hint}`, { after: 0.4, subtitle: false });
    }
  }

  // after a landing: the decoys go back under, NEXT
  hoverLoop.stop(1); document.body.classList.remove('topview');
  st.landed[k] = true; site.landed = true;
  for (const isl of site.islands) if (isl.area !== shape.area) { isl.sink(1.8); P.ocean.ripple(isl.position.x, isl.position.z, 0.5); }
  if (shape.vo.after) await say(s, G, shape.vo.after);
  if (G.auto) setTimeout(() => hud._next(), 1500);
  await s.run(hud.next());
  G.labels.clear(true); dims.dispose(); flow.dims = null;
  hud.caption(null);
  d.shift(0, 0);
  // up and over toward the next zone
  A.play('whoosh', { dur: 0.9, vol: 0.3 });
  const up = d.current(); up.pos.add(V(0, 26, 14)); up.target.add(V(0, 8, -20)); up.roll = -0.2;
  await s.run(d.to(up, 1.1, Ease.inCubic));
}

/* ------------------------------------------------- the view from above */
const short = () => innerHeight < 560;                      // a phone on its side: less room for the HUD's text
/** where the ship waits: in the clear water between the back island and the front two, so from above it covers none
    of them (a set too tight for that: just in front of it) */
function startPoint(site, ship) {
  const isls = site.islands, zs = (isl) => isl.verts.map((v) => isl.position.z - v.y);
  const back = isls.reduce((m, x) => (x.position.z < m.position.z ? x : m));
  const zb = Math.max(...zs(back)), zf = Math.min(...isls.filter((x) => x !== back).flatMap(zs));
  const b = bounds(ship.shape.verts), depth = b.h * 1.22, midX = (b.minX + b.maxX) / 2, midY = (b.minY + b.maxY) / 2;
  const z = zf - zb > depth + 0.8 ? (zb + zf) / 2 : Math.max(...isls.flatMap(zs)) + 1.6 + depth / 2;
  return V(site.centre.x - midX, HOVER_Y, z + midY);         // its footprint's middle on that spot
}
/** every caption this landing can show: the controls, the hints for its two wrong islands, the working, the autopilot */
function captionsOf(G, site) {
  const h = site.shape.hint, wrong = site.islands.filter((isl) => isl.area !== site.shape.area);
  return ['Drag the joystick to fly the spaceship. Stop over a landing zone and press GO.', 'Out of hearts! Autopilot will land on the zone that fits.',
    G.voice.text(`w.${h}`), ...wrong.map((isl) => G.voice.text(`h.${h}.${isl.area}`))];
}
/** the part of the screen the HUD leaves the field (px): under the top bar and under the tallest caption this landing
    can show, above the one line the Ship AI says in this view (the ask: every hint is a caption now), both measured
    at this screen's size so neither ever covers a zone; and the bottom corners, where the stick and GO sit */
function freeRect(G, site) {
  const W = innerWidth, H = innerHeight, sh = short(), cap = G.hud.captionEl;
  let top = document.querySelector('.hud-top').getBoundingClientRect().bottom;
  const was = { hidden: cap.hidden, text: cap.textContent, cool: cap.classList.contains('cool') };
  cap.classList.add('cool');
  for (const t of captionsOf(G, site)) { cap.textContent = t; cap.hidden = false; top = Math.max(top, cap.offsetTop + cap.offsetHeight); }
  cap.textContent = was.text; cap.hidden = was.hidden; cap.classList.toggle('cool', was.cool);
  top += sh ? 8 : 14;
  const sub = document.getElementById('subLine'), keep = sub.textContent;
  sub.textContent = G.voice.text(site.shape.vo.ask);
  const subH = sub.offsetHeight; sub.textContent = keep;      // 0 with subtitles off: then the field may use the band
  const bottom = (parseFloat(getComputedStyle(document.getElementById('subs')).paddingBottom) || 20) + subH + (sh ? 10 : 16);
  const go = getComputedStyle(document.getElementById('btnGo')), corner = (parseFloat(go.height) || 100) + (parseFloat(go.bottom) || 30) + 14;
  return { top, bottom, left: Math.max(16, W * 0.03), right: Math.max(16, W * 0.03), corner: { w: Math.max(corner, 200), h: corner } };
}
/** the playing view: straight down over the set, so every island shows its true shape and none hides another. The
    camera's height and centre are solved so the three islands (their areas are written on them) and the waiting ship
    fill the free part of the screen, as large as it allows (the lens shift that keeps the field under the HUD is part
    of the sum) */
function playView(G, site, ship) {
  const W = innerWidth, H = innerHeight, fov = 40, tv = Math.tan((fov * DEG) / 2), free = freeRect(G, site);
  // what must show (world x, z)
  const pts = [];
  for (const isl of site.islands) for (const v of isl.verts) {   // each corner pushed out over the rock's lip and the beacon
    const l = Math.hypot(v.x, v.y) || 1;
    pts.push([isl.position.x + v.x * (1 + 0.9 / l), isl.position.z - v.y * (1 + 0.9 / l)]);
  }
  const st = startPoint(site, ship), b = bounds(ship.shape.verts);
  pts.push([st.x + b.minX, st.z - b.maxY], [st.x + b.maxX, st.z - b.minY]);
  const span = (ax) => { let lo = Infinity, hi = -Infinity; for (const p of pts) { lo = Math.min(lo, p[ax]); hi = Math.max(hi, p[ax]); } return [lo, hi]; };
  const [x0, x1] = span(0), [z0, z1] = span(1);
  // the largest scale (px per world unit at the islands' tops) at which it all fits, centred in the free part
  const solve = (bottom) => {
    const fw = W - free.left - free.right, fh = H - free.top - bottom;
    const k = Math.min(fw / (x1 - x0), fh / (z1 - z0));
    const left = free.left + (fw - (x1 - x0) * k) / 2, top = free.top + (fh - (z1 - z0) * k) / 2;
    return { k, box: [left, top, left + (x1 - x0) * k, top + (z1 - z0) * k] };
  };
  // above the subtitles; if that puts anything into a bottom corner (the stick, GO), above those too
  let f = solve(free.bottom);
  const [bx0, , bx1, by1] = f.box, cw = free.corner.w, ch = free.corner.h;
  if (by1 > H - ch && (bx0 < cw || bx1 > W - cw)) f = solve(Math.max(free.bottom, ch));
  // the world point under the screen's centre, given where the content's corner must land (and the lens shift)
  const { k, box } = f, shiftPx = -hudShift() * H;
  const cx = x0 + (W / 2 - box[0]) / k, cz = z0 + (H / 2 + shiftPx - box[1]) / k;
  const h = H / 2 / (k * tv);
  return { pos: V(cx, TOP + h, cz + h * 0.01), target: V(cx, TOP, cz), fov, roll: 0 };
}
/** the field sits a little low, clear of the HUD's top band (hearts, pause, the caption): more on a short screen */
const hudShift = () => -clamp(110 / innerHeight * 0.5, 0.04, 0.15);

/** The playing view holds only this set: the other sets (and the ships landed on them) step out of the picture, and the
    sea calms (little foam, no plankton sparkle, no glitter), so nothing but the three zones and the ship draws the eye
    (the LXD's review: "too much distractions in the screen"). Off again for the low shots, where the field is the
    scenery. */
function focus(G, site, on) {
  const P = G.planet, F = P.focusState || (P.focusState = { hidden: [], sea: null }), u = P.ocean.u;
  if (on && !F.sea) {
    const others = [...P.allIslands.filter((isl) => !site.islands.includes(isl)), ...P.ships.filter((sh, j) => P.sites[j] !== site)];
    for (const o of others) if (o.visible) { o.visible = false; F.hidden.push(o); }
    F.sea = { foam: u.uFoamK.value, lace: u.uLaceK.value, bio: u.uBio.value, spec: u.uSpecK.value };
    u.uFoamK.value = 0.12; u.uLaceK.value = 0.3; u.uBio.value = 0; u.uSpecK.value = 0.05;
  } else if (!on && F.sea) {
    for (const o of F.hidden) o.visible = true;
    F.hidden = [];
    u.uFoamK.value = F.sea.foam; u.uLaceK.value = F.sea.lace; u.uBio.value = F.sea.bio; u.uSpecK.value = F.sea.spec; F.sea = null;
  }
}

/* ------------------------------------------------------- flying the ship */
async function fly(s, G, flow, { site, ship, play, hoverLoop, first, k }) {
  const d = G.director, hud = G.hud, L = G.landingFx, input = G.input;
  ship.bob = 1; ship.hover = 1; ship.thrust = 0.15;
  input.enable(true); input.reveal({ demo: first }); input.used = false;
  hud.goShow(true); hud.goEnable(false);
  if (first) hud.caption('Drag the joystick to fly the spaceship. Stop over a landing zone and press GO.');
  let hot = null, idle = 0, still = 0, resolveGo;
  const goP = new Promise((r) => { resolveGo = r; });
  hud.onGo(() => { if (hot) resolveGo(hot); });
  const vel = new THREE.Vector3(), c = site.centre, lim = site.spacing * 1.55;
  d.to(play, 0.6, Ease.inOutCubic);                    // the map holds still while the ship flies over it
  d.handheld(0.03);
  // the autoplayer (playtests): fly to the island the plan names, press GO there
  const plan = (G.plan[k] || 'e')[flow.state.misses[k]] || 'e';
  const target = !G.auto ? null : plan === 's' ? site.islands.reduce((m, x) => (x.area < m.area ? x : m)) : plan === 'l' ? site.islands.reduce((m, x) => (x.area > m.area ? x : m)) : site.islands.find((x) => x.area === site.shape.area);
  const loop = G.onFrame((dt) => {
    if (target) { const dx = target.position.x - ship.position.x, dz = target.position.z - ship.position.z, m = Math.hypot(dx, dz); input.auto = m < 0.4 ? { x: 0, y: 0 } : { x: (dx / m) * Math.min(1, m / 4), y: (-dz / m) * Math.min(1, m / 4) }; if (hot === target && m < 1.2 && !hud.goEl.disabled) { input.auto = null; hud._go(); } }
    const st = input.read();
    vel.x = damp(vel.x, st.x * SPEED, 4, dt); vel.z = damp(vel.z, -st.y * SPEED, 4, dt);
    ship.position.x += vel.x * dt; ship.position.z += vel.z * dt; ship.position.y = damp(ship.position.y, HOVER_Y, 3, dt);
    const off = ship.position.clone().sub(c).setY(0), m = off.length();
    if (m > lim) { off.multiplyScalar(lim / m); ship.position.x = c.x + off.x; ship.position.z = c.z + off.z; vel.multiplyScalar(0.5); }
    ship.vel.copy(vel);
    hoverLoop.set('speed', Math.min(1, vel.length() / SPEED), 0.1);
    // its dimensions only while it is still (the LXD's review): they step away as soon as it moves
    if (flow.dims) { if (vel.length() > 0.8) { still = 0; flow.dims.setShown(false); } else if ((still += dt) > 0.25) flow.dims.setShown(true); }
    // which island is under the ship's centre
    let now = null;
    for (const isl of site.islands) if (isl.visible && isl.risen && inside(isl.verts, ship.position.x - isl.position.x, -(ship.position.z - isl.position.z))) now = isl;
    if (now !== hot) {
      if (hot) hot.setState('idle');
      hot = now;                                       // its written area turns amber with it (islands.js)
      if (hot) { hot.setState('hot'); G.audio.play('ck.beep', { f: 1320 }); }
      hud.goEnable(!!hot);
    }
    L.ghost(ship, hot ? TOP : 0.15, true, !!hot);
    if (st.mag === 0) { idle += dt; if (idle > 9 && !first) { hud.caption('Drag the joystick to fly the spaceship. Stop over a landing zone and press GO.'); input.demo(true); idle = -1e9; } } else idle = 0;
    if (input.used && first && hud.captionEl.textContent.startsWith('Drag') && vel.length() > 2) { /* keep the caption until they reach a zone */ }
    if (hot && first) hud.caption(null);
  });
  s.onKill(loop);
  const isl = await s.run(goP);
  loop(); input.auto = null; hud.goEnable(false); hud.goShow(false); hud.onGo(null); input.enable(false); hud.caption(null);
  L.ghost(ship, 0, false);
  ship.vel.set(0, 0, 0);
  return isl;
}

/* --------------------------------------------- over the island and down */
async function approach(s, G, { ship, isl }) {
  const d = G.director, L = G.landingFx;
  focus(G, G.planet.sites.find((st) => st.islands.includes(isl)), false);   // the low landing shots: the field is the scenery again
  const at = V(isl.position.x, HOVER_Y, isl.position.z);
  const from = ship.position.clone();
  await s.run(tweens.add({ duration: 0.75, ease: Ease.inOutCubic, onUpdate: (e) => { ship.position.lerpVectors(from, at, e); } }).promise);
  // the landing camera: low and close, swinging slowly round
  d.handheld(0.2);
  const R = ship.size * 1.9 + 4;
  d.orbit({ center: () => V(isl.position.x, TOP + 1.2, isl.position.z), radius: [R * 1.15, R], height: [R * 0.75, R * 0.42], from: 18, to: -14, fov: [44, 40], dur: 3.6, ease: Ease.inOutSine });
  L.lockBeams(ship, isl);
  for (let i = 0; i < 4; i++) { G.audio.play('lock.beam', { i, minGap: 0 }); await s.wait(0.12); }
  const off = G.onFrame(() => L.updateLocks()); s.onKill(off);
  return off;
}

async function landExact(s, G, { site, ship, isl, k, hoverLoop, auto = false }) {
  const P = G.planet, d = G.director, A = G.audio, L = G.landingFx, hud = G.hud, clock = G.clock;
  isl.setState('hot');
  const off = await approach(s, G, { ship, isl });
  L.lockColor(0x3dffa2); A.play('lock.ok'); ship.setBeacons(0x3dffa2); isl.setState('good');
  ship.legK = 0; tweens.add({ duration: 0.8, ease: Ease.outBack, onUpdate: (e) => { ship.legK = e; } });
  await s.wait(0.5);
  // down, the last metre in slow motion
  const y0 = ship.position.y, y1 = TOP + STAND;
  ship.bob = 0;
  await s.run(tweens.add({ duration: 1.5, ease: Ease.inOutSine, onUpdate: (e) => { ship.position.y = lerp(y0, y1 + 1.2, e); ship.hover = 1 - e * 0.3; } }).promise);
  clock.scale = 0.32;
  await s.run(tweens.add({ duration: 0.9, ease: Ease.outCubic, onUpdate: (e) => { ship.position.y = lerp(y1 + 1.2, y1, e); } }).promise);
  clock.scale = 1;
  off(); L.clearLocks();
  ship.hover = 0; ship.thrust = 0; hoverLoop.set('power', 0, 0.6);
  A.play('touchdown'); d.shake(0.22); d.punch(-4);
  // mist pushed out from under the hull, a ring on the water
  const v = isl.verts, pos = isl.position;
  P.mist.burst(26, (i) => { const a = v[i % 4], b = v[(i + 1) % 4], t = Math.random(), x = a.x + (b.x - a.x) * t, y = a.y + (b.y - a.y) * t;
    return { pos: V(pos.x + x, TOP + 0.3, pos.z - y), vel: V(x * 0.9, 0.6, -y * 0.9), life: 1.6, size: 1.6, sizeEnd: 4.5, color: 0xd8ccff, alpha: 0.4, alphaEnd: 0, drag: 1.4 }; });
  P.ocean.ripple(pos.x, pos.z, 0.6);
  for (let i = 0; i < 4; i++) { const b = isl.cornerWorld(i); P.glints.burst(8, () => ({ pos: b.clone(), vel: V((Math.random() - 0.5) * 3, Math.random() * 4, (Math.random() - 0.5) * 3), life: 0.8, size: 0.6, sizeEnd: 0, color: 0x3dffa2, alpha: 1, alphaEnd: 0, gravity: 3 })); }
  await s.wait(0.25);
  A.play('success'); A.play('confetti');
  P.confetti.burst(V(pos.x, TOP + 2, pos.z), 170, { speed: 8, up: 11, spread: 1.6 });
  // the fit, confirmed over the ship: its area is the zone's (an area, not a formula: the LXD's review)
  G.labels.add(`work-${k}`, `<div class="area-tag good"><b>${site.shape.area}</b><small>sq units ✓</small></div>`, { worldPos: () => V(pos.x, TOP + 3.6, pos.z), anchor: 'bottom' });
  // a hero shot: low, round the landed ship
  d.orbit({ center: V(pos.x, TOP + 1, pos.z), radius: ship.size * 2.1 + 4, height: [2.5, 4.5], from: -14, to: 40, fov: 40, dur: 6, ease: Ease.inOutSine });
  if (!auto) { await say(s, G, 'o.perfect'); await say(s, G, 'o.success'); }
  else { await say(s, G, 'o.perfect'); }
  hud.caption(null);
}

async function landTooSmall(s, G, { ship, isl, hoverLoop }) {
  const P = G.planet, d = G.director, A = G.audio, L = G.landingFx, clock = G.clock;
  const off = await approach(s, G, { ship, isl });
  ship.legK = 0; tweens.add({ duration: 0.8, ease: Ease.outBack, onUpdate: (e) => { ship.legK = e; } });
  const y0 = ship.position.y;
  await s.run(tweens.add({ duration: 1.3, ease: Ease.inOutSine, onUpdate: (e) => { ship.position.y = lerp(y0, TOP + STAND + 0.2, e); } }).promise);
  // freeze on the overhang: it does not fit
  L.lockColor(0xff4d6d); A.play('lock.fail'); ship.setBeacons(0xff4d6d); isl.setState('bad');
  clock.scale = 0.25;
  L.difference(ship, isl, true);
  const diff = ship.shape.area - isl.area;
  G.labels.add('diff', `<div class="area-tag bad"><b>+${diff}</b><small>sq units over the edge</small></div>`, { worldPos: () => V(isl.position.x + ship.size * 0.55, TOP + 1.4, isl.position.z + ship.size * 0.5), anchor: 'bottom' });
  await s.waitReal(1.8);
  clock.scale = 1; off(); L.clearLocks();
  // the cartoon moment: it hangs, wobbles, tips and slides into the sea
  A.play('creak', { dur: 1.2 });
  ship.bob = 0; ship.hover = 0.3; hoverLoop.set('power', 0.3, 0.3);
  const pivotX = isl.position.x + (isl.verts.reduce((m, p) => Math.max(m, p.x), 0));
  await s.run(tweens.add({ duration: 0.9, ease: Ease.inOutSine, onUpdate: (e) => { ship.rotation.z = -Math.sin(e * Math.PI * 3) * 0.06 * (1 - e) - e * 0.12; } }).promise);
  G.labels.remove('diff', true);
  A.play('slide');
  const start = ship.position.clone();
  await s.run(tweens.add({ duration: 1.0, ease: Ease.inQuad, onUpdate: (e) => {
    ship.rotation.z = -0.12 - e * 1.05; ship.position.x = start.x + e * (pivotX - start.x + ship.size * 0.55); ship.position.y = start.y - e * e * (start.y + 1.4);
  } }).promise);
  A.play('splash', { vol: 0.6 }); A.play('glug');
  P.splash(ship.position.x, ship.position.z, { count: 160, power: 1.6, radius: ship.size * 0.5 });
  P.ocean.ripple(ship.position.x, ship.position.z, 1.1);
  d.shake(0.45); ship.hover = 0; ship.thrust = 0; hoverLoop.set('power', 0, 0.2);
  await s.wait(0.8);
}

async function landTooLarge(s, G, { ship, isl, hoverLoop }) {
  const P = G.planet, d = G.director, A = G.audio, L = G.landingFx, clock = G.clock;
  const off = await approach(s, G, { ship, isl });
  const y0 = ship.position.y;
  await s.run(tweens.add({ duration: 1.1, ease: Ease.inOutSine, onUpdate: (e) => { ship.position.y = lerp(y0, TOP + STAND + 1.4, e); } }).promise);
  // the beams fall short of the zone's corners: no lock
  L.lockColor(0xff4d6d); A.play('lock.fail'); ship.setBeacons(0xff4d6d); isl.setState('bad');
  clock.scale = 0.25;
  L.difference(ship, isl, false);
  const diff = isl.area - ship.shape.area;
  G.labels.add('diff', `<div class="area-tag bad"><b>${diff}</b><small>sq units left empty</small></div>`, { worldPos: () => V(isl.position.x + isl.verts.reduce((m, p) => Math.max(m, p.x), 0) * 0.85, TOP + 0.8, isl.position.z + 1.5), anchor: 'bottom' });
  await s.waitReal(1.8);
  clock.scale = 1; off(); L.clearLocks();
  G.labels.remove('diff', true);
  // nothing to guide it down: the jets cut out and it drops onto the oversized rock
  ship.hover = 0; ship.bob = 0; hoverLoop.set('power', 0, 0.05);
  const yA = ship.position.y, yB = TOP + 0.35;
  await s.run(tweens.add({ duration: 0.38, ease: Ease.inQuad, onUpdate: (e) => { ship.position.y = lerp(yA, yB, e); } }).promise);
  A.play('crash'); A.play('clang'); setTimeout(() => A.play('boing'), 90);
  d.shake(0.7); d.punch(6);
  for (let i = 0; i < 4; i++) {
    const b = new THREE.Vector3(); ship.beacons[i].mesh.getWorldPosition(b);
    P.sparks.burst(14, () => ({ pos: b.clone().setY(TOP + 0.4), vel: V((Math.random() - 0.5) * 9, Math.random() * 7, (Math.random() - 0.5) * 9), life: 0.5 + Math.random() * 0.4, size: 0.5, sizeEnd: 0.1, color: 0xffc070, alpha: 1, alphaEnd: 0, gravity: 18, spin: 0 }));
  }
  A.play('sparks');
  // bounce, settle askew, smoke
  await s.run(tweens.add({ duration: 0.5, ease: Ease.outQuad, onUpdate: (e) => { ship.position.y = yB + Math.sin(e * Math.PI) * 1.1; ship.rotation.z = Math.sin(e * Math.PI) * 0.18; ship.rotation.x = -Math.sin(e * Math.PI) * 0.12; } }).promise);
  A.play('impact', { vol: 0.35 });
  tweens.add({ duration: 0.4, onUpdate: (e) => { ship.rotation.z = 0.09 * e; ship.rotation.x = -0.06 * e; } });
  const smoke = G.onFrame(() => { if (Math.random() < 0.5) P.smoke.spawn({ pos: ship.position.clone().add(V((Math.random() - 0.5) * ship.size * 0.6, 1, (Math.random() - 0.5) * ship.size * 0.4)), vel: V(0, 1.6, 0), life: 1.8, size: 1.2, sizeEnd: 3.4, color: 0x6a6080, alpha: 0.55, alphaEnd: 0, drag: 0.5 }); });
  s.onKill(smoke); setTimeout(smoke, 2600);
  await s.wait(0.9);
}

/** after a miss: the drone tows a wet ship out of the sea, or a dented one lifts off the rock; back to the hover */
async function recover(s, G, { ship, site, tooSmall, hoverLoop, play }) {
  const P = G.planet, d = G.director, A = G.audio, dr = P.drone;
  const home = startPoint(site, ship);
  if (tooSmall) {
    // the drone with a tractor beam
    dr.visible = true; dr.thrust = 1; dr.scale.setScalar(1.6);
    const above = ship.position.clone().add(V(0, 12, 0));
    dr.position.copy(above).add(V(-20, 10, 18)); dr.lookAt(above); dr.rotateY(Math.PI);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.6, ship.size * 0.45, 1, 20, 1, true), new THREE.MeshBasicMaterial({ color: 0x5cf2ff, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    beam.visible = false; P.scene.add(beam); s.onKill(() => beam.removeFromParent());
    const dFrom = dr.position.clone();
    await s.run(tweens.add({ duration: 1.0, ease: Ease.outCubic, onUpdate: (e) => dr.position.lerpVectors(dFrom, above, e) }).promise);
    const tr = A.loop('tractor'); A.play('rescue');
    beam.visible = true;
    const sFrom = ship.position.clone(), rFrom = ship.rotation.z;
    const drip = G.onFrame(() => { if (Math.random() < 0.7) P.spray.spawn({ pos: ship.position.clone().add(V((Math.random() - 0.5) * ship.size * 0.7, -0.2, (Math.random() - 0.5) * ship.size * 0.5)), vel: V(0, -1, 0), life: 0.9, size: 0.35, sizeEnd: 0.6, color: 0xd8d0ff, alpha: 0.8, alphaEnd: 0, gravity: 12, floor: -0.4 }); });
    await s.run(tweens.add({ duration: 2.0, ease: Ease.inOutSine, onUpdate: (e) => {
      ship.position.lerpVectors(sFrom, home, e); ship.rotation.z = lerp(rFrom, 0, Ease.outCubic(e));
      dr.position.set(ship.position.x, ship.position.y + 11 - e * 2, ship.position.z);
      beam.position.set(ship.position.x, (dr.position.y + ship.position.y) / 2, ship.position.z); beam.scale.set(1, dr.position.y - ship.position.y, 1);
    } }).promise);
    drip(); tr.stop(0.4); beam.removeFromParent();
    const dA = dr.position.clone();
    tweens.add({ duration: 1.2, ease: Ease.inCubic, onUpdate: (e) => dr.position.lerpVectors(dA, dA.clone().add(V(30, 25, -20)), e), onComplete: () => { dr.visible = false; } });
  } else {
    hoverLoop.set('power', 1, 0.3); ship.hover = 1; A.play('launch.prime');
    const from = ship.position.clone(), rz = ship.rotation.z, rx = ship.rotation.x;
    await s.run(tweens.add({ duration: 1.6, ease: Ease.inOutSine, onUpdate: (e) => {
      ship.position.lerpVectors(from, home, e); ship.position.x += Math.sin(e * 20) * 0.08 * (1 - e);
      ship.rotation.z = lerp(rz, 0, e); ship.rotation.x = lerp(rx, 0, e);
    } }).promise);
  }
  ship.setBeacons(0xffffff); ship.legK = 0; ship.hover = 1; ship.bob = 1; ship.thrust = 0.15; hoverLoop.set('power', 1, 0.4);
  for (const isl of site.islands) isl.setState('idle');
  focus(G, site, true);
  await s.run(d.to(play, 1.2, Ease.inOutCubic));
}

async function autopilot(s, G, { ship, isl }) {
  const from = ship.position.clone(), to = V(isl.position.x, HOVER_Y, isl.position.z);
  isl.setState('hot');
  await s.run(tweens.add({ duration: 1.6, ease: Ease.inOutCubic, onUpdate: (e) => { ship.position.lerpVectors(from, to, e); ship.vel.set((to.x - from.x) * 0.5, 0, (to.z - from.z) * 0.5).multiplyScalar(Math.sin(e * Math.PI)); } }).promise);
  ship.vel.set(0, 0, 0);
}

