// ---------------------------------------------------------------------------
// The landing zones: ancient alien plates of exact quadrilateral shapes that
// rise out of the sea when the scanner wakes them.
//  * the TOP (pad + rim) is exactly the shape scaled to its area: it is the zone
//  * below the top the violet rock flares outward into the water
//  * a beacon on each corner (the ship's corner beacons lock onto these)
//  * the rim glows: idle (cool), hot (the ship is over it), good, bad
//  * its sides can trace on in light (edges), so the shape reads from far above
//  * its area is written on its pad (the LXD's review, 2026-11-05: "the area of
//    the landing zones should be within the land, not outside"), hidden until the
//    landing shows it: the survey keeps the LXD's "no labels"
// The sea draws the foam where an island meets it (ocean.setIslands).
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { Tex } from './textures.js';
import { scaledVerts, threeShape, inset, toWorld, centroid, inside } from './shapes.js';
import { glowSprite } from './ships.js';
import { EdgeGlow } from './edges.js';
import { Ease, mulberry32, damp } from '../engine/util.js';
import { tweens } from '../engine/tween.js';

export const TOP = 2.4;          // a risen island's top above the mean sea level
const DEPTH = 9;                 // how far its rock reaches down
const SUNK = -2.2;               // a sunk island's top, below the (opaque) sea

const COLORS = { idle: new THREE.Color(0x8ee8ff), hot: new THREE.Color(0xffb547), good: new THREE.Color(0x3dffa2), bad: new THREE.Color(0xff4d6d), off: new THREE.Color(0x1a1440) };

const WHITE = new THREE.Color(0xffffff), _c = new THREE.Color();

/** the area written on a pad: the number over "sq units", white with a dark edge (the zone's state tints it) */
function areaCanvas(area) {
  const H = 300, NUM = '800 190px "Exo 2", system-ui, sans-serif', UNIT = '800 62px Nunito, system-ui, sans-serif';
  const m = document.createElement('canvas').getContext('2d');
  m.font = NUM; const wn = m.measureText(String(area)).width; m.font = UNIT; const wu = m.measureText('sq units').width;
  const c = document.createElement('canvas'); c.width = Math.ceil(Math.max(wn, wu) + 48); c.height = H;
  const g = c.getContext('2d'), W = c.width;
  g.textAlign = 'center'; g.lineJoin = 'round'; g.strokeStyle = 'rgba(6, 4, 26, 0.6)';
  g.font = NUM; g.lineWidth = 16; g.strokeText(String(area), W / 2, 178); g.fillStyle = '#fff'; g.fillText(String(area), W / 2, 178);
  g.font = UNIT; g.lineWidth = 10; g.strokeText('sq units', W / 2, 268); g.fillText('sq units', W / 2, 268);
  return c;
}

function edgeNormals(v) {
  return v.map((a, i) => { const b = v[(i + 1) % v.length], dx = b.x - a.x, dy = b.y - a.y, l = Math.hypot(dx, dy); return { x: dy / l, y: -dx / l }; });
}

/** the rock: rings from the top outline down, each offset outward (rounded at the corners) and roughened */
function rockGeometry(verts, seed) {
  const r = mulberry32(seed), n = verts.length, normals = edgeNormals(verts);
  const ARC = 6, SEG = 0.45, LEVELS = 10;
  const ring = [];                                  // one base point + normal per perimeter sample
  for (let i = 0; i < n; i++) {
    const a = verts[i], b = verts[(i + 1) % n], nPrev = normals[(i - 1 + n) % n], nCur = normals[i];
    const a0 = Math.atan2(nPrev.y, nPrev.x); let a1 = Math.atan2(nCur.y, nCur.x);
    while (a1 < a0) a1 += Math.PI * 2;
    if (a1 - a0 > Math.PI) a1 -= Math.PI * 2;
    for (let k = 0; k <= ARC; k++) { const t = a0 + ((a1 - a0) * k) / ARC; ring.push({ p: a, n: { x: Math.cos(t), y: Math.sin(t) } }); }
    const len = Math.hypot(b.x - a.x, b.y - a.y), m = Math.max(1, Math.ceil(len / SEG));
    for (let k = 1; k < m; k++) { const t = k / m; ring.push({ p: { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }, n: nCur }); }
  }
  const N = ring.length, pos = [], uv = [], col = [], idx = [];
  const bumps = Array.from({ length: N }, () => r());
  let per = 0; const perim = [0];
  for (let i = 1; i <= N; i++) { const a = ring[i - 1].p, b = ring[i % N].p; per += Math.hypot(b.x - a.x, b.y - a.y) + 0.05; perim.push(per); }
  for (let j = 0; j <= LEVELS; j++) {
    const t = j / LEVELS, y = -t * DEPTH;
    const off = j === 0 ? 0 : 0.1 + Math.pow(t, 1.5) * 1.5;
    for (let i = 0; i <= N; i++) {
      const s = ring[i % N], k = i % N;
      const smooth = (bumps[k] + bumps[(k + 1) % N] + bumps[(k - 1 + N) % N]) / 3;
      const rough = j === 0 ? 0 : (smooth - 0.5) * (0.25 + t * 1.3) + Math.sin(k * 0.7 + j * 1.9) * 0.08 * t;
      const o = off + rough;
      pos.push(s.p.x + s.n.x * o, y + (j === 0 ? 0 : (r() - 0.5) * 0.25), -(s.p.y + s.n.y * o));
      uv.push(perim[i] / 3.2, -y / 3.2);
      const wet = j === 0 ? 1 : 0.92 - t * 0.5;
      col.push(wet, wet, wet);
    }
  }
  const W = N + 1;
  for (let j = 0; j < LEVELS; j++) for (let i = 0; i < N; i++) {
    const a = j * W + i, b = a + 1, c = a + W, d = c + 1;
    idx.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}

export class Island extends THREE.Group {
  constructor(shape, area, { seed = 1 } = {}) {
    super();
    this.shape = shape; this.area = area; this.name = `island-${shape.key}-${area}`;
    this.verts = scaledVerts(shape, area);
    this.risen = false; this.k = 0;

    const pad = Tex.pad().clone(); pad.needsUpdate = true; pad.repeat.set(0.26, 0.26);
    const padMat = new THREE.MeshStandardMaterial({ map: pad, color: 0xd8d0f0, roughness: 0.25, metalness: 0.2, emissiveMap: pad, emissive: 0x1a2a55, emissiveIntensity: 0.5 });
    const topGeo = new THREE.ShapeGeometry(threeShape(inset(this.verts, 0.32)));
    topGeo.rotateX(-Math.PI / 2);
    const top = new THREE.Mesh(topGeo, padMat); top.position.y = 0.0; this.add(top);
    this.padMat = padMat;

    // the rim: a raised frame round the pad whose light says what the zone is doing
    const rimShape = threeShape(this.verts); rimShape.holes.push(new THREE.Path(inset(this.verts, 0.32).slice().reverse().map((p) => new THREE.Vector2(p.x, p.y))));
    const rimGeo = new THREE.ExtrudeGeometry(rimShape, { depth: 0.14, bevelEnabled: false });
    rimGeo.rotateX(-Math.PI / 2); rimGeo.translate(0, -0.06, 0);
    this.rimMat = new THREE.MeshStandardMaterial({ color: 0x3a3060, roughness: 0.4, metalness: 0.4, emissive: COLORS.idle.clone(), emissiveIntensity: 0.9 });
    this.add(new THREE.Mesh(rimGeo, this.rimMat));
    this.edges = new EdgeGlow(this.verts, { y: 0.16, width: 0.9, line: 0.2 }); this.add(this.edges);

    const rockMat = new THREE.MeshStandardMaterial({ map: Tex.rock(), vertexColors: true, color: 0xf0e4ff, roughness: 0.55, metalness: 0.05, emissive: 0x1a0f3a, emissiveIntensity: 0.6 });
    this.rockMat = rockMat;
    // two glowing inlay bands just under the top: it is an ancient landing plate, not a rock (they take the rim's colour)
    this.glowU = { value: COLORS.idle.clone() }; this.glowKU = { value: 1 };
    rockMat.onBeforeCompile = (sh) => {
      sh.uniforms.uGlow = this.glowU; sh.uniforms.uGlowK = this.glowKU;
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying float vLy;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvLy = position.y;');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vLy;\nuniform vec3 uGlow; uniform float uGlowK;')
        .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += uGlow * uGlowK * (exp(-pow((vLy + 0.5) / 0.06, 2.0)) * 1.6 + exp(-pow((vLy + 1.25) / 0.045, 2.0)) * 0.8);');
    };
    rockMat.customProgramCacheKey = () => 'island-rock';
    this.add(new THREE.Mesh(rockGeometry(this.verts, seed), rockMat));

    // corner beacons, just outside each corner, on the rock's lip
    const c = centroid(this.verts);
    this.beacons = this.verts.map((v) => {
      const dx = v.x - c.x, dy = v.y - c.y, l = Math.hypot(dx, dy);
      const g = new THREE.Group(); toWorld({ x: v.x + (dx / l) * 0.42, y: v.y + (dy / l) * 0.42 }, -0.1, g.position);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.2, 0.55, 10), new THREE.MeshStandardMaterial({ color: 0x2a2346, roughness: 0.5 }));
      post.position.y = 0.2; g.add(post);
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), new THREE.MeshBasicMaterial({ color: COLORS.idle }));
      cap.position.y = 0.55; g.add(cap);
      const glow = glowSprite(COLORS.idle.getHex(), 0.6, 0.7); glow.position.y = 0.55; g.add(glow);
      this.add(g);
      return { g, cap, glow };
    });

    this.areaMark = null;                // built when first shown

    this.state = 'idle'; this.color = COLORS.off.clone(); this.want = COLORS.idle.clone(); this.glowK = 0.9; this.pulseT = 0;
    this.position.y = SUNK; this.visible = false;
    this.labelAnchor = new THREE.Vector3();
    this._t = Math.random() * 10;
  }
  /** world position of corner i on the top (for lock beams) */
  cornerWorld(i, out = new THREE.Vector3()) { this.beacons[i].g.getWorldPosition(out); out.y += 0.55; return out; }
  topWorld(out = new THREE.Vector3()) { this.getWorldPosition(out); return out; }
  setState(s) { this.state = s; this.want.copy(COLORS[s] || COLORS.idle); }
  /** write the area on the pad (pop: it springs up) or wipe it off */
  showArea(on = true, pop = true) {
    if (on && !this.areaMark) this._buildAreaMark();
    if (!this.areaMark) return;
    if (this._areaTw) { this._areaTw.cancel(); this._areaTw = null; }
    this.areaMark.visible = on; this.areaMark.scale.setScalar(1);
    if (on && pop) this._areaTw = tweens.add({ duration: 0.45, ease: Ease.outBack, onUpdate: (e) => this.areaMark.scale.setScalar(Math.max(0.001, e)) });
  }
  /** the largest block of text that fits on the pad, inside its coloured frame (the rhombus's middle is its widest) */
  _buildAreaMark() {
    const c = areaCanvas(this.area), aspect = c.width / c.height;
    const room = inset(this.verts, 0.75);
    const fits = (h) => { const w = h * aspect; return [[-1, -1], [1, -1], [1, 1], [-1, 1]].every(([x, y]) => inside(room, (x * w) / 2, (y * h) / 2)); };
    let lo = 0.2, hi = 2.3;
    for (let i = 0; i < 20; i++) { const m = (lo + hi) / 2; if (fits(m)) lo = m; else hi = m; }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
    const mat = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    const mark = new THREE.Mesh(new THREE.PlaneGeometry(lo * aspect, lo), mat);
    mark.rotation.x = -Math.PI / 2; mark.position.y = 0.03; mark.renderOrder = 3; mark.visible = false;
    this.add(mark); this.areaMark = mark;
  }
  pulse() { this.pulseT = 1; }
  rise(duration = 2.4, delay = 0) {
    this.visible = true; this.risen = true;
    return tweens.add({
      duration, delay, ease: Ease.outBack,
      onUpdate: (e) => { this.k = e; this.position.y = SUNK + (TOP - SUNK) * e; },
    }).promise;
  }
  sink(duration = 1.6) {
    this.risen = false; this.edges.off();
    return tweens.add({ duration, ease: Ease.inCubic, onUpdate: (e) => { this.position.y = TOP + (SUNK - TOP) * e; }, onComplete: () => { this.visible = false; } }).promise;
  }
  placeRisen() { this.visible = true; this.risen = true; this.k = 1; this.position.y = TOP; }
  update(dt) {
    this._t += dt;
    this.color.lerp(this.want, 1 - Math.exp(-6 * dt));
    this.pulseT = Math.max(0, this.pulseT - dt * 0.8);
    const breathe = 0.85 + 0.15 * Math.sin(this._t * 2.2);
    // the rim lights the zone's outline without flooding round it (the LXD's review: the light must not spread)
    const k = (this.state === 'hot' ? 1.0 : this.state === 'good' ? 1.3 : this.state === 'bad' ? 1.1 : 0.5) * breathe + this.pulseT * 1.6;
    this.rimMat.emissive.copy(this.color); this.rimMat.emissiveIntensity = damp(this.rimMat.emissiveIntensity, k, 6, dt);
    this.glowU.value.copy(this.color); this.glowKU.value = 0.2 + k * 0.25;
    this.padMat.emissiveIntensity = 0.35 + this.pulseT * 1.2 + (this.state === 'good' ? 0.6 : 0);
    for (const b of this.beacons) { b.cap.material.color.copy(this.color); b.glow.material.color.copy(this.color); b.glow.scale.setScalar(0.6 + 0.12 * Math.sin(this._t * 3) + this.pulseT * 0.6); }
    // the written area: near-white while idle, the state's colour when the ship is over it, lands or misses; kept just
    // under the bloom's threshold, so the digits stay sharp
    if (this.areaMark && this.areaMark.visible) this.areaMark.material.color.copy(_c.copy(this.color).lerp(WHITE, this.state === 'idle' ? 0.82 : 0.12)).multiplyScalar(0.86);
    // wet when it comes up; it dries off over a few seconds
    this.rockMat.roughness = damp(this.rockMat.roughness, this.position.y > 1 ? 0.62 : 0.15, 0.5, dt);
    this.getWorldPosition(this.labelAnchor); this.labelAnchor.y += 1.2;
  }
}
