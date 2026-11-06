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
// The LXD's review (2026-11-05) shaped the playing view: the areas are written on
// the zones, the dimensions read "5 units" and show only while the ship is still,
// and the view holds just this set, close.
// The second review (2026-11-06) made the misses a ladder, the same for every ship.
// The rule is no longer said before the first try. After each miss: the feedback
// line; the zones change places (their numbers go with them), so the next try is
// not a guess by where they stand; the question again; then a hint:
//   1st miss  "Look closely! The spacecraft is square shaped."
//   2nd miss  the rule: "Its area is side times side."
//   3rd miss  the working: "Here, multiply 5 with 5."
//   4th miss  the zone that fits turns green and is lit up
// Four hearts, one for each rung; a miss after the green zone brings the autopilot.
// No text may cover a zone or the ship: the ship's waiting spot and both views from
// above are solved with its numbers, its fire, the captions and the subtitles.
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { V, say, fadeIn, cleanFx } from './common.js';
import { Ease, clamp, damp, lerp, DEG } from '../engine/util.js';
import { tweens } from '../engine/tween.js';
import { inside, threeShape, bounds } from '../world/shapes.js';
import { TOP } from '../world/islands.js';
import { Dims, ribbon, dimLayout, dimTag } from '../world/dims.js';
import { riseIsland, prepare as surveyPrepare } from './survey.js';
import { t } from '../engine/i18n.js';

const HOVER_Y = 9.2;          // the ship's height while the player flies it: from above, nearer the camera, it looks bigger
                              // than every island, so none matches it by eye (the numbers decide)
const DH = HOVER_Y - TOP;     // that height above the zones' tops
const STAND = 0.72;           // hull above the pad when its legs are down
const SPEED = 9;
export const HEARTS = 4;      // one for each rung of the hint ladder

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
  hud.show(true); hud.setHearts(HEARTS, HEARTS); st.hearts = HEARTS; st.misses[k] = 0;
  hud.caption(null); hud.goShow(false);
  A.music.play('landing');

  const c = site.centre, sp = site.spacing;
  let play = playView(G, site, ship);
  d.shift(0, hudShift());                             // the field sits a little low: the top bar and the caption own the top
  s.onKill(() => d.shift(0, 0));
  // the camera descends to the zone (after NEXT: up and over from the last one)
  await s.run(d.path({ points: [c.clone().add(V(-sp * 1.4, sp * 2.6, sp * 3.2)), play.pos], target: [c.clone().add(V(0, 0, -sp * 0.6)), play.target], fov: [50, play.fov], roll: 'bank', bank: 0.8, dur: 2.6, ease: Ease.inOutCubic, blendIn: 0.1 }));

  // the set's three islands have been up since the survey; any that are not (a jump straight here) rise now
  const others = site.islands.filter((isl) => !isl.risen);
  for (const isl of others) { riseIsland(G, isl, { dur: 2.2, shake: 0.1 }); await s.wait(0.7); }
  await s.wait(others.length ? 1.6 : 0.5);

  // the ship flies in and hovers in the clear water among the three
  const hoverAt = play.shipAt;
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

  // its dimensions draw on (straight down over the ship, framed between the HUD and the subtitle line). The rule is not
  // said here: the second review keeps it for the second hint
  const dims = new Dims(ship, G.labels, `dim${k}`); flow.dims = dims;
  s.onKill(() => dims.dispose());
  await s.run(d.to(overView(G, ship), 1.3, Ease.inOutCubic));
  d.handheld(0.08); ship.bob = 0.25;
  await s.wait(0.2);
  await dims.drawAll({ dur: 0.6, sfx: (n) => A.play(n) }, 0.35, (t) => s.wait(t));
  await s.wait(1.1);

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

  // fly and choose; a miss climbs the hint ladder (the second review)
  const right = site.islands.find((x) => x.area === shape.area);
  for (;;) {
    const isl = await fly(s, G, flow, { site, ship, k, play, hoverLoop, first: k === 0 && st.misses[k] === 0 });
    dims.hide(true);
    if (isl.area === shape.area) { await landExact(s, G, { site, ship, isl, k, hoverLoop }); break; }
    const tooSmall = isl.area < shape.area;
    if (tooSmall) await landTooSmall(s, G, { site, ship, isl, k, hoverLoop }); else await landTooLarge(s, G, { site, ship, isl, k, hoverLoop });
    const miss = ++st.misses[k];
    st.hearts = hud.loseHeart();
    await say(s, G, tooSmall ? 'o.small' : 'o.large');                 // the feedback (LXD)
    L.clearExtra();
    await recover(s, G, { ship, site, tooSmall, hoverLoop, play, home: play.shipAt });
    if (miss > HEARTS) {
      // it missed even the zone lit green: the autopilot lands it there (the caption says so, so no second copy below)
      hud.caption('vo.o.auto', { cool: true });
      A.play('autopilot');
      await say(s, G, 'o.auto', { subtitle: false });
      await autopilot(s, G, { ship, isl: right });
      hud.caption(null);
      await landExact(s, G, { site, ship, isl: right, k, hoverLoop, auto: true });
      break;
    }
    // the zones change places (their numbers with them), the ship takes its new waiting spot, and the question again
    await shuffle(s, G, site);
    play = playView(G, site, ship);
    await settle(s, G, ship, play);
    await say(s, G, 'o.exact', { after: 0.2 });
    dims.showAll();
    // the rung (said and shown once, in the caption, which stays up while the player tries again): the shape, the
    // rule, the working; at the fourth the zone that fits turns green
    const id = miss <= 3 ? shape.vo.hints[miss - 1] : 'h.green';
    if (miss >= 4) { right.reveal(true); A.play('zone.glow'); }
    hud.caption(`vo.${id}`, { cool: true }); A.play('ui.hint');
    await say(s, G, id, { after: 0.4, subtitle: false });
  }
  if (right.revealed) { right.revealed = false; right.edges.fade(0, 0.8); }

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
/** every caption this landing can show (keys): the controls, the four rungs of the hint ladder, the autopilot */
function captionsOf(site) {
  return ['cap.fly', 'vo.o.auto', 'vo.h.green', ...site.shape.vo.hints.map((id) => `vo.${id}`)];
}
/** how much of the screen's foot the subtitle line takes for the tallest of these lines (px; with subtitles off, only
    the margin: the field may use the band) */
function subBand(G, ids) {
  const sub = document.getElementById('subLine'), keep = sub.textContent;
  let hh = 0;
  for (const id of ids) { sub.textContent = G.voice.text(id); hh = Math.max(hh, sub.offsetHeight); }
  sub.textContent = keep;
  return (parseFloat(getComputedStyle(document.getElementById('subs')).paddingBottom) || 20) + hh + (short() ? 10 : 16);
}
/** the part of the screen the HUD leaves the field (px): under the top bar and under the tallest caption this landing
    can show, above the lines the Ship AI says in this view (the ask, and the question again after a miss: every hint
    is a caption), all measured at this screen's size so none ever covers a zone; and the bottom corners, where the
    stick and GO sit */
function freeRect(G, site) {
  const W = innerWidth, sh = short(), cap = G.hud.captionEl;
  let top = document.querySelector('.hud-top').getBoundingClientRect().bottom;
  const was = { hidden: cap.hidden, text: cap.textContent, cool: cap.classList.contains('cool') };
  cap.classList.add('cool');
  for (const key of captionsOf(site)) { cap.textContent = t(key); cap.hidden = false; top = Math.max(top, cap.offsetTop + cap.offsetHeight); }
  cap.textContent = was.text; cap.hidden = was.hidden; cap.classList.toggle('cool', was.cool);
  top += sh ? 8 : 14;
  const bottom = subBand(G, [site.shape.vo.ask, 'o.exact']);
  const go = getComputedStyle(document.getElementById('btnGo')), corner = (parseFloat(go.height) || 100) + (parseFloat(go.bottom) || 30) + 14;
  return { top, bottom, left: Math.max(16, W * 0.03), right: Math.max(16, W * 0.03), corner: { w: Math.max(corner, 200), h: corner } };
}
/** the ship's dimension numbers as they will be drawn (px; topview: the playing view's smaller size), where each sits
    on the ship (plan) and which of its sides touches that point */
function labelBoxes(ship, topview) {
  const body = document.body, had = body.classList.contains('topview');
  body.classList.toggle('topview', topview);
  const probe = document.createElement('div'); probe.className = 'wlabel'; probe.style.visibility = 'hidden';
  document.getElementById('labels').appendChild(probe);
  const out = dimLayout(ship.shape).map((it) => {
    probe.innerHTML = dimTag(it.d.value); const e = probe.firstElementChild;
    return { at: it.labelAt, anchor: it.anchor, w: e.offsetWidth + 8, h: e.offsetHeight + 8 };
  });
  probe.remove(); body.classList.toggle('topview', had);
  return out;
}
/** a camera straight down (a hair off, so up the screen is -z) that fits world points (x, z) and labels (px boxes,
    anchored at world points) into the free part of the screen, as large as it allows (k: px per world unit on the
    points' plane, at most kMax), centred in it, with the HUD's lens shift. If that puts anything into a bottom corner
    (the stick, GO), it fits above those too */
function solveDown({ pts, labs = [], free, fov = 40, corner = null, kMax = 2000 }) {
  const W = innerWidth, H = innerHeight, tv = Math.tan((fov * DEG) / 2), shiftPx = -hudShift() * H;
  const box = (k) => {
    let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
    const grow = (a0, a1, b0, b1) => { x0 = Math.min(x0, a0); x1 = Math.max(x1, a1); z0 = Math.min(z0, b0); z1 = Math.max(z1, b1); };
    for (const [x, z] of pts) grow(x * k, x * k, z * k, z * k);
    for (const L of labs) {                                    // down the screen is +z
      const x = L.x * k, z = L.z * k;
      const [a0, a1] = L.anchor === 'left' ? [x, x + L.w] : L.anchor === 'right' ? [x - L.w, x] : [x - L.w / 2, x + L.w / 2];
      const [b0, b1] = L.anchor === 'bottom' ? [z - L.h, z] : L.anchor === 'top' ? [z, z + L.h] : [z - L.h / 2, z + L.h / 2];
      grow(a0, a1, b0, b1);
    }
    return { x0, x1, z0, z1 };
  };
  const fit = (bottom) => {
    const fw = W - free.left - free.right, fh = H - free.top - bottom;
    let lo = 0.01, hi = kMax;
    for (let i = 0; i < 48; i++) { const m = (lo + hi) / 2, b = box(m); if (b.x1 - b.x0 <= fw && b.z1 - b.z0 <= fh) lo = m; else hi = m; }
    const b = box(lo), left = free.left + (fw - (b.x1 - b.x0)) / 2, top = free.top + (fh - (b.z1 - b.z0)) / 2;
    return { k: lo, b, left, top, right: left + (b.x1 - b.x0), bottom: top + (b.z1 - b.z0) };
  };
  let f = fit(free.bottom);
  if (corner && f.bottom > H - corner.h && (f.left < corner.w || f.right > W - corner.w)) f = fit(Math.max(free.bottom, corner.h));
  // the world point at the view's centre, given where the content's corner must land
  const cx = (f.b.x0 - (f.left - W / 2)) / f.k, cz = (f.b.z0 - (f.top - H / 2 - shiftPx)) / f.k;
  return { k: f.k, cx, cz, h: H / 2 / (f.k * tv) };
}
/** the waiting ship as it looks from straight above, on the zones' plane, round its middle (plan: y up the screen).
    From up there it is nearer the camera than the zones, so it looks bigger, and so do the spaces between its parts:
    its hull, its idle fire behind it, and its dimension numbers (their px size: pxu px per unit on the zones' plane) */
function footprint(ship, labs, h, pxu) {
  const m1 = h / (h - DH - 0.9), m2 = h / (h - DH - ship.hullTop - 0.06), b = bounds(ship.shape.verts);
  const r = { x0: b.minX * m1, x1: b.maxX * m1, y0: (b.minY - 1.1) * m1, y1: b.maxY * m1 };
  for (const L of labs) {
    const x = L.at.x * m2, y = L.at.y * m2, w = L.w / pxu, hh = L.h / pxu;
    const [x0, x1] = L.anchor === 'left' ? [x, x + w] : L.anchor === 'right' ? [x - w, x] : [x - w / 2, x + w / 2];
    const [y0, y1] = L.anchor === 'bottom' ? [y, y + hh] : L.anchor === 'top' ? [y - hh, y] : [y - hh / 2, y + hh / 2];
    r.x0 = Math.min(r.x0, x0); r.x1 = Math.max(r.x1, x1); r.y0 = Math.min(r.y0, y0); r.y1 = Math.max(r.y1, y1);
  }
  return r;
}
/* the gap between a box and a convex polygon (world x, z), or -1 when they overlap */
const ptSeg = (px, pz, ax, az, bx, bz) => { const dx = bx - ax, dz = bz - az, t = clamp(((px - ax) * dx + (pz - az) * dz) / (dx * dx + dz * dz || 1), 0, 1); return Math.hypot(px - ax - dx * t, pz - az - dz * t); };
const cross = (ax, az, bx, bz, cx, cz) => (bx - ax) * (cz - az) - (bz - az) * (cx - ax);
function inPoly(poly, x, z) {
  let sgn = 0;
  for (let i = 0; i < poly.length; i++) { const a = poly[i], b = poly[(i + 1) % poly.length], c = cross(a.x, a.z, b.x, b.z, x, z); if (c) { if (sgn && Math.sign(c) !== sgn) return false; sgn = Math.sign(c); } }
  return true;
}
function segsCross(a, b, c, d) {
  const d1 = cross(c.x, c.z, d.x, d.z, a.x, a.z), d2 = cross(c.x, c.z, d.x, d.z, b.x, b.z), d3 = cross(a.x, a.z, b.x, b.z, c.x, c.z), d4 = cross(a.x, a.z, b.x, b.z, d.x, d.z);
  return d1 * d2 < 0 && d3 * d4 < 0;
}
function boxPolyGap(r, poly) {
  const cs = [{ x: r.x0, z: r.z0 }, { x: r.x1, z: r.z0 }, { x: r.x1, z: r.z1 }, { x: r.x0, z: r.z1 }];
  for (const p of poly) if (p.x >= r.x0 && p.x <= r.x1 && p.z >= r.z0 && p.z <= r.z1) return -1;
  for (const c of cs) if (inPoly(poly, c.x, c.z)) return -1;
  for (let i = 0; i < poly.length; i++) for (let j = 0; j < 4; j++) if (segsCross(poly[i], poly[(i + 1) % poly.length], cs[j], cs[(j + 1) % 4])) return -1;
  let g = Infinity;
  for (const p of poly) g = Math.min(g, Math.hypot(Math.max(r.x0 - p.x, 0, p.x - r.x1), Math.max(r.z0 - p.z, 0, p.z - r.z1)));
  for (const c of cs) for (let i = 0; i < poly.length; i++) { const a = poly[i], b = poly[(i + 1) % poly.length]; g = Math.min(g, ptSeg(c.x, c.z, a.x, a.z, b.x, b.z)); }
  return g;
}
/** where the ship waits, as seen from above (its middle, on the zones' plane): of the spots where the ship, its fire and
    its numbers keep `need` clear of every zone (past its rock's lip and its beacons), the one that lets the whole
    picture (the zones round `box`, and the ship) be drawn largest in a free area fw × fh px: in the gap in the middle
    of the set when it fits, else beside the set on a wide screen, above or below it on a tall one; nearer the middle
    breaks a tie. If no spot is clear, the clearest */
function findSpot(site, fp, need, box, fw, fh) {
  const polys = site.islands.map((isl) => isl.verts.map((v) => ({ x: isl.position.x + v.x, z: isl.position.z - v.y })));
  const mx = site.slots.reduce((a, p) => a + p.x, 0) / site.slots.length, mz = site.slots.reduce((a, p) => a + p.z, 0) / site.slots.length;
  const R = site.spacing * 1.3, step = 0.5;
  let best = null, bestK = -Infinity, clearest = null, most = -Infinity;
  for (let x = mx - R; x <= mx + R; x += step) for (let z = mz - R; z <= mz + R; z += step) {
    const r = { x0: x + fp.x0, x1: x + fp.x1, z0: z - fp.y1, z1: z - fp.y0 };
    const w = Math.max(box.x1, r.x1) - Math.min(box.x0, r.x0), h = Math.max(box.z1, r.z1) - Math.min(box.z0, r.z0);
    const k = Math.min(fw / w, fh / h) * (1 - 0.0004 * Math.hypot(x - mx, z - mz));   // the scale it allows; the middle wins a tie
    if (best && k <= bestK) continue;
    let clear = Infinity;
    for (const p of polys) { clear = Math.min(clear, boxPolyGap(r, p) - 0.9); if (clear < need && best) break; }
    if (clear >= need) { best = { x, z }; bestK = k; }
    if (!best && clear > most) { clearest = { x, z }; most = clear; }
  }
  return best || clearest;
}
/** the playing view: straight down over the set, so every island shows its true shape and none hides another. The
    camera's height and centre are solved with the ship's waiting spot, so the three islands (their areas are written
    on them) and the ship with its numbers fill the free part of the screen, as large as it allows, and the ship and its
    numbers cover no zone (the second review: no text over the zones or the ship). shipAt: where the ship waits */
function playView(G, site, ship) {
  const H = innerHeight, fov = 40, tv = Math.tan((fov * DEG) / 2), free = freeRect(G, site);
  const isl = [];
  for (const i of site.islands) for (const v of i.verts) {   // each corner pushed out over the rock's lip and the beacon
    const l = Math.hypot(v.x, v.y) || 1;
    isl.push([i.position.x + v.x * (1 + 0.9 / l), i.position.z - v.y * (1 + 0.9 / l)]);
  }
  const labs = labelBoxes(ship, true);
  const box = { x0: Math.min(...isl.map((p) => p[0])), x1: Math.max(...isl.map((p) => p[0])), z0: Math.min(...isl.map((p) => p[1])), z1: Math.max(...isl.map((p) => p[1])) };
  const fw = innerWidth - free.left - free.right, fh = H - free.top - free.bottom;
  let h = 60, f = null, q = null;
  for (let it = 0; it < 4; it++) {                           // the ship's look depends on the height, the height on the ship
    const pxu = H / 2 / (h * tv), fp = footprint(ship, labs, h, pxu);
    q = findSpot(site, fp, Math.max(0.5, 14 / pxu), box, fw, fh);
    f = solveDown({ pts: [...isl, [q.x + fp.x0, q.z - fp.y1], [q.x + fp.x1, q.z - fp.y0]], free, fov, corner: free.corner });
    h = f.h;
  }
  // the spot seen from above is the ship's own spot pushed out from the middle of the view: undo that
  const m1 = h / (h - DH - 0.9);
  const shipAt = V(f.cx + (q.x - f.cx) / m1, HOVER_Y, f.cz + (q.z - f.cz) / m1);
  return { pos: V(f.cx, TOP + h, f.cz + h * 0.01), target: V(f.cx, TOP, f.cz), fov, roll: 0, shipAt };
}
/** straight down over the waiting ship, close: the ship (its idle fire too) and its dimension numbers, framed between
    the HUD's top band and the subtitle line, so no line said here covers a number */
function overView(G, ship) {
  const W = innerWidth, sh = short(), P = ship.position, b = bounds(ship.shape.verts), y = P.y + ship.hullTop;
  const top = document.querySelector('.hud-top').getBoundingClientRect().bottom + (sh ? 8 : 16);
  const free = { top, bottom: subBand(G, [ship.shape.vo.here, ship.shape.vo.extra].filter(Boolean)), left: Math.max(24, W * 0.08), right: Math.max(24, W * 0.08) };
  const labs = labelBoxes(ship, false).map((L) => ({ x: P.x + L.at.x, z: P.z - L.at.y, w: L.w, h: L.h, anchor: L.anchor }));
  const f = solveDown({ pts: [[P.x + b.minX, P.z - b.maxY], [P.x + b.maxX, P.z - b.minY + 1.1]], labs, free, fov: 40, kMax: 64 });
  return { pos: V(f.cx, y + f.h, f.cz + f.h * 0.01), target: V(f.cx, y, f.cz), fov: 40, roll: 0 };
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
  if (first) hud.caption('cap.fly');
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
    if (st.mag === 0) { idle += dt; if (idle > 9 && !first) { if (!hud.captionKey) hud.caption('cap.fly'); input.demo(true); idle = -1e9; } } else idle = 0;   // a hint stays up
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
  G.labels.add(`work-${k}`, `<div class="area-tag good"><b>${site.shape.area}</b><small>${t('unit.sq')} ✓</small></div>`, { worldPos: () => V(pos.x, TOP + 3.6, pos.z), anchor: 'bottom' });
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
  G.labels.add('diff', `<div class="area-tag bad"><b>+${diff}</b><small>${t('tag.over')}</small></div>`, { worldPos: () => V(isl.position.x + ship.size * 0.55, TOP + 1.4, isl.position.z + ship.size * 0.5), anchor: 'bottom' });
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
  G.labels.add('diff', `<div class="area-tag bad"><b>${diff}</b><small>${t('tag.empty')}</small></div>`, { worldPos: () => V(isl.position.x + isl.verts.reduce((m, p) => Math.max(m, p.x), 0) * 0.85, TOP + 0.8, isl.position.z + 1.5), anchor: 'bottom' });
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

/** after a miss: the drone tows a wet ship out of the sea, or a dented one lifts off the rock; back to the hover at home */
async function recover(s, G, { ship, site, tooSmall, hoverLoop, play, home }) {
  const P = G.planet, d = G.director, A = G.audio, dr = P.drone;
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

/** the zones change places (the second review: after every miss, so the next try is not a guess by where they stand):
    all three go under together and come up again, each in another's place, its number with it */
async function shuffle(s, G, site) {
  const P = G.planet, A = G.audio, n = site.islands.length, turn = 1 + Math.floor(Math.random() * (n - 1));
  A.play('whoosh', { dur: 0.9, vol: 0.22 }); A.play('island.rise', { dur: 0.9 });
  for (const isl of site.islands) { isl.setState('idle'); isl.sink(0.85); P.ocean.ripple(isl.position.x, isl.position.z, 0.5); }
  G.director.shake(0.05);
  await s.wait(1.05);
  for (const isl of site.islands) { isl.slot = (isl.slot + turn) % n; isl.position.x = site.slots[isl.slot].x; isl.position.z = site.slots[isl.slot].z; }
  for (const [i, isl] of site.islands.entries()) {
    riseIsland(G, isl, { dur: 1.3, shake: i ? 0.03 : 0.07, rumble: i === 0, ripple: i ? 0.45 : 0.75 });
    await s.wait(0.2);
  }
  await s.wait(1.15);
}
/** after a shuffle: the ship glides to its new waiting spot (the fire pushing it) as the view settles on the new layout */
async function settle(s, G, ship, play) {
  const from = ship.position.clone(), to = play.shipAt, d = Math.hypot(to.x - from.x, to.z - from.z), dur = clamp(0.6 + d * 0.06, 0.8, 1.5);
  G.director.to(play, dur, Ease.inOutCubic);
  await s.run(tweens.add({ duration: dur, ease: Ease.inOutCubic, onUpdate: (e) => {
    ship.position.lerpVectors(from, to, e);
    ship.vel.set(to.x - from.x, 0, to.z - from.z).multiplyScalar((Math.sin(e * Math.PI) * 1.5) / dur);
  } }).promise);
  ship.vel.set(0, 0, 0);
}

async function autopilot(s, G, { ship, isl }) {
  const from = ship.position.clone(), to = V(isl.position.x, HOVER_Y, isl.position.z);
  isl.setState('hot');
  await s.run(tweens.add({ duration: 1.6, ease: Ease.inOutCubic, onUpdate: (e) => { ship.position.lerpVectors(from, to, e); ship.vel.set((to.x - from.x) * 0.5, 0, (to.z - from.z) * 0.5).multiplyScalar(Math.sin(e * Math.PI)); } }).promise);
  ship.vel.set(0, 0, 0);
}

