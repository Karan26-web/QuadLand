// ---------------------------------------------------------------------------
// A shape's sides drawn in light: a glowing strip along each side of its exact
// outline, on a ship's hull or round a landing zone's rim. The sides trace on one
// after another (one, two, three, four: a quadrilateral) with a spark drawing
// each, then hold, flash or fade. From above, the shape reads at a glance.
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { tweens } from '../engine/tween.js';
import { Ease } from '../engine/util.js';

const VERT = /* glsl */`
attribute float aSide;
varying vec2 vUv; varying float vSide;
void main() { vUv = uv; vSide = aSide; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

const FRAG = /* glsl */`
uniform vec3 uColor; uniform float uK, uTrace;
varying vec2 vUv; varying float vSide;
void main() {
  float along = uTrace - vSide - vUv.x;                   // > 0: this stretch of the side is drawn already
  float lit = clamp(along * 16.0 + 0.5, 0.0, 1.0);
  float x = abs(vUv.y * 2.0 - 1.0);                        // 0 on the side's line, 1 at the strip's edge
  float core = exp(-x * x * 11.0), halo = exp(-x * 2.6) * 0.35;
  float tip = exp(-along * along * 120.0) * step(uTrace, 3.99) * core * 2.4;   // the spark that draws it
  float a = ((core + halo) * lit + tip) * uK;
  if (a < 0.004) discard;
  gl_FragColor = vec4(uColor * a * 1.5, 1.0);
}`;

export class EdgeGlow extends THREE.Group {
  /** verts: the outline in plan coordinates (as everything else: y up the plan is -z); y: its height; width: the strip, world units */
  constructor(verts, { y = 0, width = 1.2, color = 0x5cf2ff } = {}) {
    super();
    const n = verts.length, pos = [], uv = [], side = [], idx = [];
    for (let i = 0; i < n; i++) {
      const a = verts[i], b = verts[(i + 1) % n], dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy) || 1;
      const ux = dx / L, uy = dy / L, nx = -uy, ny = ux, w = width / 2, e = w * 0.45;   // each strip runs on past its corners a little, so they join
      const quad = [[a.x - ux * e + nx * w, a.y - uy * e + ny * w, -e / L, 1], [b.x + ux * e + nx * w, b.y + uy * e + ny * w, 1 + e / L, 1],
        [a.x - ux * e - nx * w, a.y - uy * e - ny * w, -e / L, 0], [b.x + ux * e - nx * w, b.y + uy * e - ny * w, 1 + e / L, 0]];
      const base = pos.length / 3;
      for (const [x, py, u, v] of quad) { pos.push(x, y, -py); uv.push(u, v); side.push(i); }
      idx.push(base, base + 2, base + 1, base + 1, base + 2, base + 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setAttribute('aSide', new THREE.Float32BufferAttribute(side, 1));
    g.setIndex(idx);
    this.u = { uColor: { value: new THREE.Color(color) }, uK: { value: 0 }, uTrace: { value: 0 } };
    this.mesh = new THREE.Mesh(g, new THREE.ShaderMaterial({
      uniforms: this.u, vertexShader: VERT, fragmentShader: FRAG,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    }));
    this.mesh.renderOrder = 12; this.mesh.frustumCulled = false; this.mesh.visible = false;
    this.add(this.mesh);
    this.sides = n; this._tw = null;
  }
  _set(k) { this.u.uK.value = k; this.mesh.visible = k > 0.002; }
  _tween(o) { if (this._tw) this._tw.cancel(); this._tw = tweens.add(o); return this._tw.promise; }
  /** draw the sides on one after another over dur seconds, then hold */
  trace(dur = 1.2) {
    this._set(1); this.u.uTrace.value = 0;
    return this._tween({ duration: dur, ease: Ease.inOutSine, onUpdate: (e) => { this.u.uTrace.value = e * this.sides; } });
  }
  /** fade to brightness k (all sides drawn) */
  fade(k, dur = 0.5) {
    const from = this.u.uK.value; this.u.uTrace.value = this.sides;
    return this._tween({ duration: dur, ease: Ease.inOutSine, onUpdate: (e) => this._set(from + (k - from) * e) });
  }
  /** a quick bright beat, back to brightness k */
  flash(k = this.u.uK.value || 1, dur = 0.7) {
    this.u.uTrace.value = this.sides;
    return this._tween({ duration: dur, ease: Ease.outCubic, onUpdate: (e) => this._set(k + (1 - e) * 1.4) });
  }
  off() { if (this._tw) { this._tw.cancel(); this._tw = null; } this._set(0); this.u.uTrace.value = 0; }
}
