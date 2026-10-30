// ---------------------------------------------------------------------------
// The stars, drawn live instead of baked into the sky cube: a baked star is a blur
// two texels wide, and it cannot twinkle. One point each, crisp at any resolution,
// every one on its own clock. Three kinds:
//  * dust    thousands of faint pin-pricks that give the dark its depth
//  * stars   the ones you notice: they breathe, and now and then one sparkles
//  * bright  a few dozen with a cartoon four-point glint
// They ride with the camera at a fixed distance inside the far plane, so planets
// hide them, and the post (bloom, warp, whip blur) treats them as part of the scene.
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { mulberry32 } from '../engine/util.js';

const VERT = /* glsl */`
attribute vec4 aStar;              // brightness, twinkle depth, phase, glint (0 or 1)
attribute vec2 aSize;              // sprite size and core radius (sigma), css px
attribute vec3 aCol;
uniform float uTime, uPx;
varying vec3 vCol; varying float vHalf, vSig, vGlint;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  float depth = aStar.y, ph = aStar.z;
  // two slow sines that never line up: a star breathes, it does not blink
  float tw = 0.5 + 0.5 * sin(uTime * (1.6 + fract(ph * 7.31) * 3.4) + ph * 6.283) * sin(uTime * (0.6 + fract(ph * 3.17) * 1.6) + ph * 17.0);
  // and, once in a long while, a sharp sparkle
  float spark = pow(max(sin(uTime * (0.22 + fract(ph * 5.7) * 0.4) + ph * 40.0), 0.0), 60.0) * step(0.45, depth);
  vCol = aCol * aStar.x * mix(1.0, 0.2 + 0.8 * tw, depth) * (1.0 + spark * 2.2);
  vGlint = aStar.w * (0.6 + 0.4 * tw + spark);
  vHalf = aSize.x * uPx * (0.5 + 0.25 * spark * aStar.w);
  vSig = max(aSize.y * uPx, 0.55);
  gl_PointSize = vHalf * 2.0;
}`;

const FRAG = /* glsl */`
varying vec3 vCol; varying float vHalf, vSig, vGlint;
void main() {
  vec2 p = (gl_PointCoord - 0.5) * 2.0 * vHalf;          // device px from the centre
  float r2 = dot(p, p);
  float c = exp(-r2 / (2.0 * vSig * vSig));
  if (vGlint > 0.0) {
    // four soft spikes that thin out toward the sprite's edge, and a faint halo
    vec2 a = abs(p) / vHalf; float w = vSig * 0.5;
    float sx = exp(-p.y * p.y / (2.0 * w * w)) * pow(max(1.0 - a.x, 0.0), 2.4);
    float sy = exp(-p.x * p.x / (2.0 * w * w)) * pow(max(1.0 - a.y, 0.0), 2.4);
    float halo = exp(-r2 / (2.0 * vHalf * vHalf * 0.03));
    c += ((sx + sy) * 0.45 + halo * 0.1) * vGlint;
  }
  if (c < 0.003) discard;
  gl_FragColor = vec4(vCol * c, 1.0);
}`;

/* star colours: mostly blue-white, white and pale gold, a few warm, a few cartoon lilac and cyan */
const TINTS = [
  [0.30, [0.72, 0.82, 1.0]], [0.26, [1.0, 1.0, 1.0]], [0.2, [1.0, 0.92, 0.78]],
  [0.08, [1.0, 0.74, 0.52]], [0.09, [1.0, 0.74, 0.96]], [0.07, [0.62, 0.95, 1.0]],
];

export class Stars {
  /**
   * @param band   the pole of the galaxy: stars crowd toward the great circle around it
   */
  constructor({ dust = 9000, stars = 5000, bright = 90, seed = 7, band = new THREE.Vector3(0, 1, 0), radius = 20000 } = {}) {
    const rnd = mulberry32(seed), n = dust + stars + bright;
    const pos = new Float32Array(n * 3), star = new Float32Array(n * 4), size = new Float32Array(n * 2), col = new Float32Array(n * 3);
    const pole = band.clone().normalize(), d = new THREE.Vector3();
    const tint = () => { let r = rnd(); for (const [w, c] of TINTS) { if ((r -= w) <= 0) return c; } return TINTS[0][1]; };
    const dir = (crowd) => {
      for (;;) {
        const z = rnd() * 2 - 1, a = rnd() * Math.PI * 2, s = Math.sqrt(1 - z * z);
        d.set(s * Math.cos(a), z, s * Math.sin(a));
        const lat = d.dot(pole);
        if (rnd() < 1 - crowd + crowd * Math.exp(-lat * lat * 10)) return d;
      }
    };
    for (let i = 0; i < n; i++) {
      const kind = i < dust ? 0 : i < dust + stars ? 1 : 2;
      dir([0.7, 0.45, 0][kind]).multiplyScalar(radius).toArray(pos, i * 3);
      const m = rnd();
      let b, tw, sz, sig, gl = 0;
      if (kind === 0) { b = 0.05 + Math.pow(m, 2.2) * 0.28; tw = 0.12; sig = 0.55 + m * 0.2; sz = 6; }
      else if (kind === 1) { b = 0.3 + Math.pow(m, 3) * 1.7; tw = 0.35 + rnd() * 0.5; sig = 0.7 + Math.pow(m, 2) * 0.4; sz = 8; }
      else { b = 2.2 + m * 3.2; tw = 0.3 + rnd() * 0.3; sig = 1.05 + m * 0.35; sz = 20 + m * 14; gl = 1; }
      star.set([b, tw, rnd() * 100, gl], i * 4);
      size.set([sz, sig], i * 2);
      col.set(kind === 0 ? [0.8, 0.86, 1.0] : tint(), i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aStar', new THREE.BufferAttribute(star, 4));
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 2));
    g.setAttribute('aCol', new THREE.BufferAttribute(col, 3));
    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: { uTime: { value: 0 }, uPx: { value: 1 } },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    this.points = new THREE.Points(g, this.mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = -6;      // first of the see-through things: rings, glows and glass draw over them
  }
  update(dt, camera, pixelRatio) {
    this.points.position.copy(camera.position);
    this.mat.uniforms.uTime.value += dt;
    this.mat.uniforms.uPx.value = pixelRatio;
  }
}
