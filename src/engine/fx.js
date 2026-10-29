// ---------------------------------------------------------------------------
// Effects, all instanced (one draw call per system):
//  * Particles  pooled camera-facing sprites: spray, splashes, sparks, smoke, glints
//  * Confetti   tumbling paper in world space (a perfect landing, the finale)
//  * Streaks    star streaks that wrap round the camera on the GPU: drifting space
//               dust when cruising, long light-speed streaks in the warp
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { rand } from './util.js';

const P_VERT = /* glsl */`
attribute vec3 iPos; attribute vec4 iColor; attribute vec2 iSR;
varying vec2 vUv; varying vec4 vColor;
void main() {
  vUv = uv; vColor = iColor;
  vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec3 up = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
  float c = cos(iSR.y), s = sin(iSR.y);
  vec2 q = vec2(position.x * c - position.y * s, position.x * s + position.y * c) * iSR.x;
  vec3 wp = iPos + right * q.x + up * q.y;
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
}`;
const P_FRAG = /* glsl */`
uniform sampler2D map; varying vec2 vUv; varying vec4 vColor;
void main() { vec4 t = texture2D(map, vUv); gl_FragColor = vec4(t.rgb * vColor.rgb, t.a * vColor.a); }`;

export class Particles {
  constructor({ max = 500, map, additive = true, renderOrder = 8 } = {}) {
    this.max = max; this.n = 0;
    const base = new THREE.PlaneGeometry(1, 1);
    const g = new THREE.InstancedBufferGeometry();
    g.index = base.index; g.attributes.position = base.attributes.position; g.attributes.uv = base.attributes.uv;
    this.aPos = new THREE.InstancedBufferAttribute(new Float32Array(max * 3), 3); this.aPos.setUsage(THREE.DynamicDrawUsage);
    this.aCol = new THREE.InstancedBufferAttribute(new Float32Array(max * 4), 4); this.aCol.setUsage(THREE.DynamicDrawUsage);
    this.aSR = new THREE.InstancedBufferAttribute(new Float32Array(max * 2), 2); this.aSR.setUsage(THREE.DynamicDrawUsage);
    g.setAttribute('iPos', this.aPos); g.setAttribute('iColor', this.aCol); g.setAttribute('iSR', this.aSR);
    g.instanceCount = 0;
    this.mat = new THREE.ShaderMaterial({
      uniforms: { map: { value: map } }, vertexShader: P_VERT, fragmentShader: P_FRAG, transparent: true, depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    this.mesh = new THREE.Mesh(g, this.mat); this.mesh.frustumCulled = false; this.mesh.renderOrder = renderOrder;
    this.geo = g;
    this.p = Array.from({ length: max }, () => ({ pos: new THREE.Vector3(), vel: new THREE.Vector3(), age: 0, life: 1, s0: 1, s1: 1, c: new THREE.Color(), a0: 1, a1: 0, drag: 0, grav: 0, rot: 0, spin: 0, floor: -Infinity }));
  }
  spawn(o) {
    if (this.n >= this.max) return null;
    const p = this.p[this.n++];
    p.pos.copy(o.pos); p.vel.copy(o.vel || new THREE.Vector3());
    p.age = 0; p.life = o.life ?? 1; p.s0 = o.size ?? 1; p.s1 = o.sizeEnd ?? p.s0;
    p.c.set(o.color ?? 0xffffff); p.a0 = o.alpha ?? 1; p.a1 = o.alphaEnd ?? 0;
    p.drag = o.drag ?? 0; p.grav = o.gravity ?? 0; p.rot = o.rot ?? Math.random() * 6.28; p.spin = o.spin ?? 0; p.floor = o.floor ?? -Infinity;
    return p;
  }
  burst(count, fn) { for (let i = 0; i < count; i++) this.spawn(fn(i)); }
  clear() { this.n = 0; this.geo.instanceCount = 0; }
  update(dt) {
    const P = this.aPos.array, C = this.aCol.array, S = this.aSR.array;
    let i = 0;
    while (i < this.n) {
      const p = this.p[i];
      p.age += dt;
      if (p.age >= p.life) { const last = this.p[this.n - 1]; this.p[this.n - 1] = p; this.p[i] = last; this.n--; continue; }
      p.vel.y -= p.grav * dt;
      if (p.drag) p.vel.multiplyScalar(Math.exp(-p.drag * dt));
      p.pos.addScaledVector(p.vel, dt);
      if (p.pos.y < p.floor) { p.pos.y = p.floor; p.vel.y *= -0.2; }
      p.rot += p.spin * dt;
      const k = p.age / p.life, a = p.a0 + (p.a1 - p.a0) * k, s = p.s0 + (p.s1 - p.s0) * k;
      P[i * 3] = p.pos.x; P[i * 3 + 1] = p.pos.y; P[i * 3 + 2] = p.pos.z;
      C[i * 4] = p.c.r; C[i * 4 + 1] = p.c.g; C[i * 4 + 2] = p.c.b; C[i * 4 + 3] = Math.max(0, a);
      S[i * 2] = s; S[i * 2 + 1] = p.rot;
      i++;
    }
    this.geo.instanceCount = this.n;
    this.aPos.needsUpdate = this.aCol.needsUpdate = this.aSR.needsUpdate = true;
  }
}

const CONFETTI_COLORS = [0xff3ea5, 0x5cf2ff, 0xffb547, 0x3dffa2, 0x8b5cff, 0xffe45c, 0xffffff];
export class Confetti {
  constructor(max = 360) {
    this.max = max; this.n = 0;
    const geo = new THREE.PlaneGeometry(0.34, 0.18);
    this.mesh = new THREE.InstancedMesh(geo, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, toneMapped: false }), max);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); this.mesh.count = 0; this.mesh.frustumCulled = false;
    this.p = Array.from({ length: max }, () => ({ pos: new THREE.Vector3(), vel: new THREE.Vector3(), q: new THREE.Quaternion(), axis: new THREE.Vector3(), w: 0, age: 0, life: 4, s: 1 }));
    this._m = new THREE.Matrix4(); this._s = new THREE.Vector3(); this._dq = new THREE.Quaternion(); this._c = new THREE.Color();
  }
  /** a burst from a point, up and outward */
  burst(at, count = 140, { speed = 9, up = 10, spread = 1, scale = 1 } = {}) {
    for (let i = 0; i < count && this.n < this.max; i++) {
      const p = this.p[this.n];
      p.pos.copy(at).add(new THREE.Vector3(rand(-0.6, 0.6), rand(0, 0.5), rand(-0.6, 0.6)).multiplyScalar(spread));
      const a = Math.random() * Math.PI * 2, s = rand(0.3, 1) * speed;
      p.vel.set(Math.cos(a) * s, rand(0.5, 1) * up, Math.sin(a) * s);
      p.q.setFromEuler(new THREE.Euler(rand(0, 6), rand(0, 6), rand(0, 6)));
      p.axis.set(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize(); p.w = rand(4, 12);
      p.age = 0; p.life = rand(3, 5.5); p.s = rand(0.7, 1.3) * scale;
      this._c.set(CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0]);
      this.mesh.setColorAt(this.n, this._c);
      this.n++;
    }
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }
  clear() { this.n = 0; this.mesh.count = 0; }
  update(dt) {
    let i = 0;
    while (i < this.n) {
      const p = this.p[i];
      p.age += dt;
      if (p.age >= p.life) {
        const j = this.n - 1; const last = this.p[j]; this.p[j] = p; this.p[i] = last;
        if (this.mesh.instanceColor) { this.mesh.getColorAt(j, this._c); this.mesh.setColorAt(i, this._c); }
        this.n--; continue;
      }
      p.vel.y -= 9 * dt; p.vel.multiplyScalar(Math.exp(-2.2 * dt));
      p.vel.x += Math.sin(p.age * 3 + i) * 2 * dt;                    // flutter
      p.pos.addScaledVector(p.vel, dt);
      this._dq.setFromAxisAngle(p.axis, p.w * dt); p.q.multiply(this._dq);
      const fade = Math.min(1, (p.life - p.age) * 2);
      this._s.setScalar(p.s * fade);
      this._m.compose(p.pos, p.q, this._s); this.mesh.setMatrixAt(i, this._m);
      i++;
    }
    this.mesh.count = this.n;
    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }
}

const S_VERT = /* glsl */`
attribute vec3 iPos; attribute float iSeed;
uniform vec3 uDir, uOffset; uniform float uLen, uWidth, uBox;
varying float vT; varying float vFade; varying float vSeed;
void main() {
  vec3 p = mod(iPos - uOffset, uBox) - uBox * 0.5 + cameraPosition;
  float len = uLen * (0.4 + iSeed);
  vec3 a = mix(p, p + uDir * len, position.y);     // the tail trails back toward where the streak came from
  vec3 view = normalize(a - cameraPosition);
  vec3 side = normalize(cross(uDir, view) + vec3(1e-4));
  float d = length(p - cameraPosition);
  a += side * position.x * uWidth * (0.6 + iSeed * 0.8) * (1.0 + d * 0.012);
  vT = position.y; vSeed = iSeed;
  vFade = smoothstep(uBox * 0.5, uBox * 0.32, d) * smoothstep(1.5, 5.0, d);
  gl_Position = projectionMatrix * viewMatrix * vec4(a, 1.0);
}`;
const S_FRAG = /* glsl */`
uniform float uIntensity; uniform vec3 uColA, uColB;
varying float vT; varying float vFade; varying float vSeed;
void main() {
  float a = (1.0 - vT) * vFade * uIntensity;
  vec3 c = mix(uColA, uColB, vSeed) * (1.2 + (1.0 - vT) * 1.5);
  gl_FragColor = vec4(c * a, a);
}`;
export class Streaks {
  constructor(count = 1400, box = 260) {
    const base = new THREE.PlaneGeometry(1, 1); base.translate(0, 0.5, 0);
    const g = new THREE.InstancedBufferGeometry();
    g.index = base.index; g.attributes.position = base.attributes.position;
    const pos = new Float32Array(count * 3), seed = new Float32Array(count);
    for (let i = 0; i < count; i++) { pos[i * 3] = Math.random() * box; pos[i * 3 + 1] = Math.random() * box; pos[i * 3 + 2] = Math.random() * box; seed[i] = Math.random(); }
    g.setAttribute('iPos', new THREE.InstancedBufferAttribute(pos, 3)); g.setAttribute('iSeed', new THREE.InstancedBufferAttribute(seed, 1));
    g.instanceCount = count;
    this.u = {
      uDir: { value: new THREE.Vector3(0, 0, -1) }, uOffset: { value: new THREE.Vector3() }, uLen: { value: 0.4 }, uWidth: { value: 0.05 },
      uBox: { value: box }, uIntensity: { value: 1 }, uColA: { value: new THREE.Color(0xbfe8ff) }, uColB: { value: new THREE.Color(0xff9ad8) },
    };
    this.mesh = new THREE.Mesh(g, new THREE.ShaderMaterial({ uniforms: this.u, vertexShader: S_VERT, fragmentShader: S_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.mesh.frustumCulled = false; this.mesh.renderOrder = 3;
    this.speed = 6;
  }
  /** dir: the way the ship flies (the streaks run the other way past the camera) */
  update(dt, dir) {
    if (dir) this.u.uDir.value.copy(dir).normalize();
    this.u.uOffset.value.addScaledVector(this.u.uDir.value, this.speed * dt);
    const b = this.u.uBox.value, o = this.u.uOffset.value;
    o.set(((o.x % b) + b) % b, ((o.y % b) + b) % b, ((o.z % b) + b) % b);
    this.u.uLen.value = 0.25 + this.speed * 0.045;
  }
}
