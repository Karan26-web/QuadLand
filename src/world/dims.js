// ---------------------------------------------------------------------------
// Dimension lines drawn onto a hovering ship (LXD screens 8–12): holographic
// ribbons on the hull's top, each growing like a pen stroke, its number popping
// up beside it.
//   edge    a dimension line just outside the edge, with extension lines and ticks
//   height  a dashed perpendicular to the base, with a right-angle mark
//   diag    a dashed diagonal
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { foot } from './shapes.js';
import { tweens } from '../engine/tween.js';
import { Ease } from '../engine/util.js';

const R_VERT = /* glsl */`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const R_FRAG = /* glsl */`
uniform vec3 uColor; uniform float uProgress, uDash, uLen, uAlpha;
varying vec2 vUv;
void main() {
  if (vUv.x > uProgress) discard;
  if (uDash > 0.0 && fract(vUv.x * uLen / uDash) > 0.58) discard;
  float edge = 1.0 - abs(vUv.y - 0.5) * 2.0;
  float core = smoothstep(0.0, 0.45, edge);
  gl_FragColor = vec4(uColor * (1.2 + core * 1.6), (0.35 + core * 0.65) * uAlpha);
}`;

export function ribbon(a, b, y, width, { color = 0x5cf2ff, dash = 0 } = {}) {
  const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1e-3, nx = -dy / len, ny = dx / len, w = width / 2;
  const P = [[a.x + nx * w, a.y + ny * w], [b.x + nx * w, b.y + ny * w], [a.x - nx * w, a.y - ny * w], [b.x - nx * w, b.y - ny * w]];
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(P.flatMap(([x, py]) => [x, y, -py]), 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute([0, 1, 1, 1, 0, 0, 1, 0], 2));
  g.setIndex([0, 2, 1, 1, 2, 3]);
  const m = new THREE.Mesh(g, new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(color) }, uProgress: { value: 0 }, uDash: { value: dash }, uLen: { value: len }, uAlpha: { value: 1 } },
    vertexShader: R_VERT, fragmentShader: R_FRAG, transparent: true, depthTest: false, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
  }));
  m.renderOrder = 20; m.frustumCulled = false;
  return m;
}
const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
const mul = (a, k) => ({ x: a.x * k, y: a.y * k });
const unit = (a) => { const l = Math.hypot(a.x, a.y) || 1; return { x: a.x / l, y: a.y / l }; };
const lerp2 = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

export class Dims {
  constructor(ship, labels, idPrefix = 'dim') {
    this.ship = ship; this.labels = labels; this.prefix = idPrefix;
    this.group = new THREE.Group(); this.group.name = 'dims'; ship.body.add(this.group);
    this.items = [];
    const v = ship.shape.verts, y = ship.hullTop + 0.06;
    ship.shape.dims.forEach((d, k) => {
      const parts = [], id = `${idPrefix}-${ship.shape.key}-${k}`;
      let labelAt;
      if (d.type === 'edge') {
        const a = v[d.i], b = v[d.j], dir = unit(sub(b, a)), n = { x: dir.y, y: -dir.x };   // outward for a counter-clockwise outline
        const off = 0.85, a2 = add(a, mul(n, off)), b2 = add(b, mul(n, off));
        parts.push(ribbon(a2, b2, y, 0.13));
        parts.push(ribbon(add(a, mul(n, 0.25)), add(a, mul(n, off + 0.3)), y, 0.07));
        parts.push(ribbon(add(b, mul(n, 0.25)), add(b, mul(n, off + 0.3)), y, 0.07));
        for (const [p, s] of [[a2, 1], [b2, -1]]) {
          const tip = add(p, mul(dir, 0.0)), back = add(p, mul(dir, 0.42 * s));
          parts.push(ribbon(tip, add(back, mul(n, 0.2)), y, 0.08)); parts.push(ribbon(tip, add(back, mul(n, -0.2)), y, 0.08));
        }
        labelAt = add(lerp2(a2, b2, 0.5), mul(n, 0.85));
      } else if (d.type === 'height') {
        const top = v[d.from], ba = v[d.base[0]], bb = v[d.base[1]], f = foot(top, ba, bb);
        parts.push(ribbon(top, f, y, 0.12, { color: 0xffd27a, dash: 0.42 }));
        const along = unit(sub(bb, ba)), up = unit(sub(top, f)), s = 0.5;
        const c1 = add(f, mul(along, s)), c2 = add(add(f, mul(along, s)), mul(up, s)), c3 = add(f, mul(up, s));
        parts.push(ribbon(c1, c2, y, 0.07, { color: 0xffffff })); parts.push(ribbon(c2, c3, y, 0.07, { color: 0xffffff }));
        labelAt = add(lerp2(top, f, 0.5), mul(along, 1.05));
      } else if (d.type === 'diag') {
        const a = v[d.i], b = v[d.j];
        parts.push(ribbon(a, b, y, 0.12, { color: 0xffd27a, dash: 0.42 }));
        // the two diagonals cross in the middle: one label up its far end on one side, the other out along its own on
        // the other, both clear of the side's label even from high above (the playing view)
        const dir = unit(sub(b, a)), n = { x: dir.y, y: -dir.x };
        labelAt = k === 0 ? sub(lerp2(a, b, 0.75), mul(n, 1.4)) : add(lerp2(a, b, 0.17), mul(n, 0.8));
      }
      for (const p of parts) { p.visible = false; this.group.add(p); }
      this.items.push({ d, parts, id, labelAt });
    });
  }
  _world(p) { const out = new THREE.Vector3(p.x, this.ship.hullTop + 0.06, -p.y); return this.ship.body.localToWorld(out); }
  /** draw the k-th dimension: the line grows, then its number pops up */
  async draw(k, { dur = 0.55, sfx = null } = {}) {
    const it = this.items[k]; if (!it) return;
    for (const p of it.parts) { p.visible = true; p.material.uniforms.uProgress.value = 0; }
    if (sfx) sfx('dim.draw');
    await tweens.add({ duration: dur, ease: Ease.inOutCubic, onUpdate: (e) => { for (const p of it.parts) p.material.uniforms.uProgress.value = e; } }).promise;
    const name = it.d.name;
    this.labels.add(it.id, `<div class="dim-tag"><i>${name}</i>${it.d.value}</div>`, { worldPos: () => this._world(it.labelAt) });
    if (sfx) sfx('dim.label');
  }
  async drawAll(opts = {}, gap = 0.25, wait = (s) => tweens.delay(s).promise) {
    for (let k = 0; k < this.items.length; k++) { await this.draw(k, opts); await wait(gap); }
  }
  /** show everything at once (a dev jump, a retry) */
  showAll() {
    this.items.forEach((it) => {
      for (const p of it.parts) { p.visible = true; p.material.uniforms.uProgress.value = 1; }
      if (!this.labels.get(it.id)) this.labels.add(it.id, `<div class="dim-tag"><i>${it.d.name}</i>${it.d.value}</div>`, { worldPos: () => this._world(it.labelAt) });
    });
  }
  setAlpha(a) { for (const it of this.items) for (const p of it.parts) p.material.uniforms.uAlpha.value = a; }
  hide(fade = true) {
    for (const it of this.items) { this.labels.remove(it.id, fade); for (const p of it.parts) p.visible = false; }
  }
  dispose() { this.hide(false); this.group.removeFromParent(); }
}
