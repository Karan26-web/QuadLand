// ---------------------------------------------------------------------------
// The landing zones: ancient alien plates of exact quadrilateral shapes that
// rise out of the sea when the scanner wakes them.
//  * the TOP (pad + rim) is exactly the shape scaled to its area: it is the zone
//  * below the top the violet rock flares outward into the water
//  * a beacon on each corner (the ship's corner beacons lock onto these)
//  * the rim glows: idle (cool), hot (the ship is over it), good, bad
// The sea draws the foam where an island meets it (ocean.setIslands).
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { Tex } from './textures.js';
import { scaledVerts, threeShape, inset, toWorld, centroid } from './shapes.js';
import { glowSprite } from './ships.js';
import { Ease, mulberry32, damp } from '../engine/util.js';
import { tweens } from '../engine/tween.js';

export const TOP = 2.4;          // a risen island's top above the mean sea level
const DEPTH = 9;                 // how far its rock reaches down
const SUNK = -2.2;               // a sunk island's top, below the (opaque) sea

const COLORS = { idle: new THREE.Color(0x8ee8ff), hot: new THREE.Color(0xffb547), good: new THREE.Color(0x3dffa2), bad: new THREE.Color(0xff4d6d), off: new THREE.Color(0x1a1440) };

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
      const glow = glowSprite(COLORS.idle.getHex(), 1.1, 0.9); glow.position.y = 0.55; g.add(glow);
      this.add(g);
      return { g, cap, glow };
    });

    this.state = 'idle'; this.color = COLORS.off.clone(); this.want = COLORS.idle.clone(); this.glowK = 0.9; this.pulseT = 0;
    this.position.y = SUNK; this.visible = false;
    this.labelAnchor = new THREE.Vector3();
    this._t = Math.random() * 10;
  }
  /** world position of corner i on the top (for lock beams) */
  cornerWorld(i, out = new THREE.Vector3()) { this.beacons[i].g.getWorldPosition(out); out.y += 0.55; return out; }
  topWorld(out = new THREE.Vector3()) { this.getWorldPosition(out); return out; }
  setState(s) { this.state = s; this.want.copy(COLORS[s] || COLORS.idle); }
  pulse() { this.pulseT = 1; }
  rise(duration = 2.4, delay = 0) {
    this.visible = true; this.risen = true;
    return tweens.add({
      duration, delay, ease: Ease.outBack,
      onUpdate: (e) => { this.k = e; this.position.y = SUNK + (TOP - SUNK) * e; },
    }).promise;
  }
  sink(duration = 1.6) {
    this.risen = false;
    return tweens.add({ duration, ease: Ease.inCubic, onUpdate: (e) => { this.position.y = TOP + (SUNK - TOP) * e; }, onComplete: () => { this.visible = false; } }).promise;
  }
  placeRisen() { this.visible = true; this.risen = true; this.k = 1; this.position.y = TOP; }
  update(dt) {
    this._t += dt;
    this.color.lerp(this.want, 1 - Math.exp(-6 * dt));
    this.pulseT = Math.max(0, this.pulseT - dt * 0.8);
    const breathe = 0.85 + 0.15 * Math.sin(this._t * 2.2);
    const k = (this.state === 'hot' ? 1.6 : this.state === 'good' ? 2.2 : this.state === 'bad' ? 1.8 : 0.9) * breathe + this.pulseT * 2.5;
    this.rimMat.emissive.copy(this.color); this.rimMat.emissiveIntensity = damp(this.rimMat.emissiveIntensity, k, 6, dt);
    this.glowU.value.copy(this.color); this.glowKU.value = 0.45 + k * 0.35;
    this.padMat.emissiveIntensity = 0.35 + this.pulseT * 1.2 + (this.state === 'good' ? 0.6 : 0);
    for (const b of this.beacons) { b.cap.material.color.copy(this.color); b.glow.material.color.copy(this.color); b.glow.scale.setScalar(1.0 + 0.25 * Math.sin(this._t * 3) + this.pulseT); }
    // wet when it comes up; it dries off over a few seconds
    this.rockMat.roughness = damp(this.rockMat.roughness, this.position.y > 1 ? 0.62 : 0.15, 0.5, dt);
    this.getWorldPosition(this.labelAnchor); this.labelAnchor.y += 1.2;
  }
}
