// ---------------------------------------------------------------------------
// Dimension lines drawn onto a hovering ship (LXD screens 8–12): holographic
// ribbons on the hull's top, each growing like a pen stroke, its number popping
// up beside it.
//   edge    a dimension line just outside the edge, with extension lines and ticks
//   height  a dashed perpendicular to the base, with a right-angle mark
//   diag    a dashed diagonal
// The LXD's review (2026-11-05): each number is written with its unit ("5 units"),
// with no name beside it ("side", "length"…): the drawing says which length it is.
// And the dimensions show only while the ship is still: in flight they step away.
// The second review (2026-11-06): the glow was too much for a label. The lines are
// now crisp ink like the ship's sides (no bloom), and the rhombus's diagonal
// numbers sit past the ends of their lines, outside the ship, not crowded on it.
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { foot } from './shapes.js';
import { tweens } from '../engine/tween.js';
import { Ease } from '../engine/util.js';
import { t } from '../engine/i18n.js';

const R_VERT = /* glsl */`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
// a sharp-edged, anti-aliased line through the strip's middle, never under about 1.5 screen pixels, kept under the
// bloom's threshold so it reads as a drawn line, not a light
const R_FRAG = /* glsl */`
uniform vec3 uColor; uniform float uProgress, uDash, uLen, uAlpha;
varying vec2 vUv;
void main() {
  if (vUv.x > uProgress) discard;
  if (uDash > 0.0 && fract(vUv.x * uLen / uDash) > 0.58) discard;
  float x = abs(vUv.y * 2.0 - 1.0);
  float px = max(fwidth(x), 1e-4);
  float w = max(0.62, px * 0.8);
  float a = (1.0 - smoothstep(w - px * 0.75, w + px * 0.75, x)) * uAlpha;
  if (a < 0.01) discard;
  gl_FragColor = vec4(uColor * 0.86, a);
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
    vertexShader: R_VERT, fragmentShader: R_FRAG, transparent: true, depthTest: false, depthWrite: false, side: THREE.DoubleSide,
  }));
  m.renderOrder = 20; m.frustumCulled = false;
  return m;
}
/** a dimension's number with its unit ("5 units") */
export const dimTag = (value) => `<div class="dim-tag">${value}<i>${t('unit.units')}</i></div>`;
const GAP = { center: [0, 0], left: [6, 0], right: [-6, 0], bottom: [0, -4], top: [0, 4] };   // px between a line's end and its number
const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
const mul = (a, k) => ({ x: a.x * k, y: a.y * k });
const unit = (a) => { const l = Math.hypot(a.x, a.y) || 1; return { x: a.x / l, y: a.y / l }; };
const lerp2 = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

/** where each dimension of a shape is drawn (plan coordinates on the ship): its strokes, and where its number sits.
    anchor: 'center' (on the point), or the side of the label that touches the point ('left': the label starts there
    and runs right; 'bottom': it sits above the point), so a number past the end of a line never covers the line or the
    ship, whatever its width in any language */
export function dimLayout(shape) {
  const v = shape.verts;
  return shape.dims.map((d, k) => {
    const segs = [];
    let labelAt, anchor = 'center';
    if (d.type === 'edge') {
      const a = v[d.i], b = v[d.j], dir = unit(sub(b, a)), n = { x: dir.y, y: -dir.x };   // outward for a counter-clockwise outline
      const off = 0.85, a2 = add(a, mul(n, off)), b2 = add(b, mul(n, off));
      segs.push([a2, b2, 0.13]);
      segs.push([add(a, mul(n, 0.25)), add(a, mul(n, off + 0.3)), 0.07]);
      segs.push([add(b, mul(n, 0.25)), add(b, mul(n, off + 0.3)), 0.07]);
      for (const [p, s] of [[a2, 1], [b2, -1]]) {
        const back = add(p, mul(dir, 0.42 * s));
        segs.push([p, add(back, mul(n, 0.2)), 0.08]); segs.push([p, add(back, mul(n, -0.2)), 0.08]);
      }
      labelAt = add(lerp2(a2, b2, 0.5), mul(n, 0.85));
    } else if (d.type === 'height') {
      const top = v[d.from], ba = v[d.base[0]], bb = v[d.base[1]], f = foot(top, ba, bb);
      segs.push([top, f, 0.12, { color: 0xffd27a, dash: 0.42 }]);
      const along = unit(sub(bb, ba)), up = unit(sub(top, f)), s = 0.5;
      const c1 = add(f, mul(along, s)), c2 = add(add(f, mul(along, s)), mul(up, s)), c3 = add(f, mul(up, s));
      segs.push([c1, c2, 0.07, { color: 0xffffff }]); segs.push([c2, c3, 0.07, { color: 0xffffff }]);
      labelAt = add(lerp2(top, f, 0.72), mul(along, 1.05));      // low beside the line: under the canopy, never on it
    } else if (d.type === 'diag') {
      // a dashed diagonal, and its number just past the end it runs to, outside the ship (on the ship, two diagonals'
      // numbers, the canopy and the side's number were crowded: the second review)
      const a = v[d.i], b = v[d.j], dir = unit(sub(b, a));
      segs.push([a, b, 0.12, { color: 0xffd27a, dash: 0.42 }]);
      labelAt = add(b, mul(dir, 0.5));
      anchor = Math.abs(dir.x) > Math.abs(dir.y) ? (dir.x > 0 ? 'left' : 'right') : (dir.y > 0 ? 'bottom' : 'top');
    }
    return { d, k, segs, labelAt, anchor };
  });
}

export class Dims {
  constructor(ship, labels, idPrefix = 'dim') {
    this.ship = ship; this.labels = labels; this.prefix = idPrefix;
    this.group = new THREE.Group(); this.group.name = 'dims'; ship.body.add(this.group);
    const y = ship.hullTop + 0.06;
    this.items = dimLayout(ship.shape).map(({ d, k, segs, labelAt, anchor }) => {
      const parts = segs.map(([a, b, w, o]) => ribbon(a, b, y, w, o));
      for (const p of parts) { p.visible = false; this.group.add(p); }
      return { d, parts, id: `${idPrefix}-${ship.shape.key}-${k}`, labelAt, anchor };
    });
  }
  _world(p) { const out = new THREE.Vector3(p.x, this.ship.hullTop + 0.06, -p.y); return this.ship.body.localToWorld(out); }
  _tag(it) { return dimTag(it.d.value); }
  _label(it) { this.labels.add(it.id, this._tag(it), { worldPos: () => this._world(it.labelAt), anchor: it.anchor, offset: GAP[it.anchor] }); }
  /** draw the k-th dimension: the line grows, then its number pops up */
  async draw(k, { dur = 0.55, sfx = null } = {}) {
    const it = this.items[k]; if (!it) return;
    for (const p of it.parts) { p.visible = true; p.material.uniforms.uProgress.value = 0; }
    if (sfx) sfx('dim.draw');
    await tweens.add({ duration: dur, ease: Ease.inOutCubic, onUpdate: (e) => { for (const p of it.parts) p.material.uniforms.uProgress.value = e; } }).promise;
    this._label(it);
    if (sfx) sfx('dim.label');
  }
  async drawAll(opts = {}, gap = 0.25, wait = (s) => tweens.delay(s).promise) {
    for (let k = 0; k < this.items.length; k++) { await this.draw(k, opts); await wait(gap); }
  }
  /** show everything at once (a dev jump, a retry) */
  showAll() {
    this.items.forEach((it) => {
      for (const p of it.parts) { p.visible = true; p.material.uniforms.uProgress.value = 1; }
      if (!this.labels.get(it.id)) this._label(it);
    });
    this._on = null; this.setShown(true, 0);
  }
  setAlpha(a) { for (const it of this.items) for (const p of it.parts) p.material.uniforms.uAlpha.value = a; }
  /** while the ship flies they step away (lines and numbers fade out fast); when it stops they come back */
  setShown(on, dur = on ? 0.3 : 0.15) {
    if (this._on === on) return;
    this._on = on;
    for (const it of this.items) this.labels.cls(it.id, 'away', !on);
    if (this._tw) this._tw.cancel();
    const from = this._k ?? 1, to = on ? 1 : 0;
    if (!dur) { this._k = to; this.setAlpha(to); return; }
    this._tw = tweens.add({ duration: dur, onUpdate: (e) => { this._k = from + (to - from) * e; this.setAlpha(this._k); } });
  }
  hide(fade = true) {
    for (const it of this.items) { this.labels.remove(it.id, fade); for (const p of it.parts) p.visible = false; }
    if (this._tw) this._tw.cancel();
    this._on = null; this._k = 1; this.setAlpha(1);
  }
  dispose() { this.hide(false); this.group.removeFromParent(); }
}
