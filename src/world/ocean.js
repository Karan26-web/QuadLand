// ---------------------------------------------------------------------------
// The living sea (Interstellar's Miller's planet, at night, in violet).
//  * a polar grid under the camera: dense rings close by, wide ones at the
//    horizon; it follows the camera and the waves are computed in world space,
//    so the sea never slides with it
//  * six Gerstner waves, each faded out where the grid is too coarse to carry it
//    (no shimmer at the horizon), analytic normals
//  * ripple rings (an island rising, a splash, a touchdown)
//  * foam where the wave compresses (the Jacobian) and where ripples break
//  * light through the thin crests, sky reflections (the baked sky cubemap),
//    small ripples from a tiling normal map, a sparkle on the light's path
//  * the scanner's beam drawn on the water; bioluminescence once it has passed
//  * GiantWave: a separate ribbon for the mountain-sized waves on the horizon
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { Tex } from './textures.js';

const RINGS = 150, SEGS = 220, RING_B = 0.0415, RING_A = 6.02;

const WAVES = [
  // dir x, dir z, steepness, wavelength
  [1.0, 0.28, 0.13, 58],
  [0.66, 0.75, 0.14, 31],
  [0.17, 1.0, 0.15, 17.5],
  [-0.52, 0.82, 0.13, 10.5],
  [0.92, -0.38, 0.11, 6.2],
  [-0.81, -0.31, 0.09, 3.7],
];

const WATER_FRAG = /* glsl */`
uniform samplerCube envMap;
uniform sampler2D tNormal, tNoise;
uniform float uTime, uEnvI, uBio, uFogDensity, uDetail, uSpecK, uFoamK, uLaceK;
uniform vec3 uDeep, uShallow, uSSS, uFoam, uLightDir, uLightColor;
uniform vec4 uScan; uniform vec2 uScanFan;
uniform vec4 uIsl[16];      // each zone in the water: centre (x, z), how far its foam reaches, its strength
uniform vec4 uIslV[32];     // its four corners, two to a vec4
uniform float uIslO[16];    // how far out its rock flares at the waterline
uniform int uIslCount;
varying vec3 vWorld; varying vec3 vNormal; varying float vCrest; varying float vJ; varying float vRipFoam;

float sdSeg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h); }

void main() {
  vec3 V = cameraPosition - vWorld; float dist = length(V); V /= dist;
  // lace foam where the zones meet the water (a zone too far away to matter costs one distance)
  float contact = 0.0;
  for (int k = 0; k < 16; k++) {
    if (k >= uIslCount) break;
    vec4 c = uIsl[k];
    if (distance(vWorld.xz, c.xy) > c.z) continue;
    vec4 a = uIslV[k * 2], b = uIslV[k * 2 + 1];
    float d = min(min(sdSeg(vWorld.xz, a.xy, a.zw), sdSeg(vWorld.xz, a.zw, b.xy)), min(sdSeg(vWorld.xz, b.xy, b.zw), sdSeg(vWorld.xz, b.zw, a.xy))) - uIslO[k];
    contact = max(contact, c.w * exp(-max(d, 0.0) * 2.4));
  }
  vec2 uv1 = vWorld.xz * 0.043 + vec2(uTime * 0.011, uTime * 0.006);
  vec2 uv2 = vWorld.xz * 0.117 + vec2(-uTime * 0.016, uTime * 0.012);
  vec3 a = texture2D(tNormal, uv1).xyz * 2.0 - 1.0, b = texture2D(tNormal, uv2).xyz * 2.0 - 1.0;
  float detail = uDetail * exp(-dist * 0.0055);
  vec3 N = normalize(vNormal + vec3(a.x + b.x, 0.0, a.y + b.y) * detail);
  float NdV = max(dot(N, V), 0.0);
  float F = 0.02 + 0.66 * pow(1.0 - NdV, 5.0);
  vec3 R = reflect(-V, N); R.y = abs(R.y) + 0.02;
  // a little roughness: farther away the sea's reflection is a blur of the sky, close by it is sharp
  float rough = clamp(dist * 0.004, 0.0, 1.0) * 3.5 + 0.6;
  vec3 refl = textureLod(envMap, R, rough).rgb * uEnvI;
  float h = clamp(vCrest * 0.3 + 0.5, 0.0, 1.0);
  // stylised: the faces of the waves that look toward the ringed giant catch its light
  float facing = clamp(dot(N, normalize(uLightDir * vec3(1.0, 0.35, 1.0))), 0.0, 1.0);
  vec3 body = mix(uDeep, uShallow, h * 0.6 + (1.0 - NdV) * 0.1) + uShallow * pow(facing, 3.0) * 0.9;
  float back = pow(clamp(dot(V, -uLightDir) * 0.5 + 0.5, 0.0, 1.0), 3.0);
  float thin = smoothstep(0.1, 1.4, vCrest);
  body += uSSS * (0.12 + back * 0.8) * thin * (0.25 + 0.75 * (1.0 - NdV)) * 0.75;
  vec3 col = mix(body, refl, F);
  vec3 H = normalize(uLightDir + V); float nh = max(dot(N, H), 0.0);
  col += uLightColor * (pow(nh, 900.0) * 2.8 * exp(-dist * 0.006) + pow(nh, 170.0) * 0.06 + pow(nh, 28.0) * 0.008) * uSpecK;
  float n1 = texture2D(tNoise, vWorld.xz * 0.028 + vec2(uTime * 0.008, 0.0)).r;
  float n2 = texture2D(tNoise, vWorld.xz * 0.09 - vec2(0.0, uTime * 0.013)).g;
  float foam = smoothstep(0.86, 0.52, vJ) * smoothstep(0.32, 0.7, n1 * 0.6 + n2 * 0.5);
  foam = clamp((foam + vRipFoam * smoothstep(0.25, 0.6, n2)) * uFoamK, 0.0, 1.0);   // uFoamK: the playing view calms it all
  foam = max(foam, contact * smoothstep(0.28, 0.72, n2 * 0.9 + contact * 0.32) * 0.9 * uLaceK);
  foam *= exp(-dist * 0.0025);
  col = mix(col, uFoam, foam * 0.82);
  float spark = smoothstep(0.78, 1.0, texture2D(tNoise, vWorld.xz * 0.19 - uTime * 0.025).b) * smoothstep(0.0, 0.6, vCrest + 0.4);
  col += vec3(0.22, 0.95, 1.0) * uBio * (foam * 1.6 + spark * 0.9) * exp(-dist * 0.004);
  if (uScan.w > 0.001) {
    vec2 d = vWorld.xz - uScan.xy; float r = length(d) + 1e-3;
    float ang = atan(d.x, -d.y);
    float da = ang - uScan.z; da = mod(da + 3.14159, 6.28318) - 3.14159;
    float w = 0.45 + r * 0.012;
    float line = exp(-pow(da * r / w, 2.0)) * smoothstep(uScanFan.y, uScanFan.y * 0.55, r) * smoothstep(1.0, 5.0, r);
    float trail = smoothstep(0.0, -0.35, da) * smoothstep(-1.2, -0.35, da) * smoothstep(uScanFan.y, uScanFan.y * 0.4, r) * 0.18;
    col += vec3(0.32, 0.98, 1.0) * (line * 4.0 + trail) * uScan.w;
  }
  vec3 fogC = textureCube(envMap, normalize(vec3(-V.x, 0.035, -V.z))).rgb * uEnvI;
  float fog = 1.0 - exp(-pow(dist * uFogDensity, 1.5));
  col = mix(col, fogC, clamp(fog, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}`;

const OCEAN_VERT = /* glsl */`
uniform float uTime, uAmp;
uniform vec4 uWaves[6];
uniform vec4 uRipples[8];
uniform int uRippleCount;
varying vec3 vWorld; varying vec3 vNormal; varying float vCrest; varying float vJ; varying float vRipFoam;

void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vec2 p = wp.xz;
  float r = length(position.xz);
  float spacing = max(${RING_B.toFixed(4)} * (r + ${RING_A.toFixed(2)}), 6.2832 * r / ${SEGS.toFixed(1)}) + 0.05;
  vec3 T = vec3(1.0, 0.0, 0.0), B = vec3(0.0, 0.0, 1.0), disp = vec3(0.0);
  for (int i = 0; i < 6; i++) {
    vec4 w = uWaves[i];
    float lod = smoothstep(3.0, 7.0, w.w / spacing);
    float steep = w.z * lod * uAmp;
    float k = 6.28318 / w.w, c = sqrt(9.8 / k);
    vec2 d = normalize(w.xy);
    float f = k * (dot(d, p) - c * uTime), s = sin(f), co = cos(f), a = steep / k;
    T += vec3(-d.x * d.x * steep * s, d.x * steep * co, -d.x * d.y * steep * s);
    B += vec3(-d.x * d.y * steep * s, d.y * steep * co, -d.y * d.y * steep * s);
    disp += vec3(d.x * a * co, a * s, d.y * a * co);
  }
  float rip = 0.0, ripFoam = 0.0; vec2 g = vec2(0.0);
  for (int i = 0; i < 8; i++) {
    if (i >= uRippleCount) break;
    vec4 Rp = uRipples[i];
    float tau = uTime - Rp.z;
    if (tau < 0.0 || tau > 7.0) continue;
    vec2 dv = p - Rp.xy; float dist = length(dv) + 1e-3;
    float front = 2.5 + tau * 6.5, band = dist - front;
    float env = exp(-band * band / 14.0) * exp(-tau * 0.5) * Rp.w * smoothstep(0.0, 0.25, tau);
    float kk = 1.25, ph = kk * band;
    rip += env * sin(ph);
    float dh = env * (-2.0 * band / 14.0) * sin(ph) + env * kk * cos(ph);
    g += dh * dv / dist;
    ripFoam += env * 0.35;
  }
  disp.y += rip;
  vec3 n = normalize(cross(B, T));
  n = normalize(vec3(n.x - g.x * n.y, n.y, n.z - g.y * n.y));
  wp.xyz += disp;
  vWorld = wp.xyz; vNormal = n; vCrest = disp.y;
  vJ = T.x * B.z - T.z * B.x; vRipFoam = clamp(ripFoam, 0.0, 1.0);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;

const GIANT_VERT = /* glsl */`
uniform float uTime, uHeight, uSigF, uSigB, uHalf;
varying vec3 vWorld; varying vec3 vNormal; varying float vCrest; varying float vJ; varying float vRipFoam;
void main() {
  vec3 lp = position;                       // x along the crest, z across it (-z is the front)
  float taper = smoothstep(uHalf, uHalf * 0.35, abs(lp.x));
  float wob = 0.82 + 0.18 * sin(lp.x * 0.004 + uTime * 0.05) + 0.08 * sin(lp.x * 0.013 - uTime * 0.11);
  float H = uHeight * taper * wob;
  float sig = lp.z < 0.0 ? uSigF : uSigB;
  float h = H * exp(-(lp.z * lp.z) / (sig * sig));
  float dhdz = h * (-2.0 * lp.z / (sig * sig));
  float dhdx = h * (-0.004 * 0.18 * cos(lp.x * 0.004 + uTime * 0.05)) / max(wob, 0.01);
  float ripple = 1.2 * sin(lp.x * 0.09 + lp.z * 0.05 - uTime * 0.9) * smoothstep(0.0, 1.0, h / max(uHeight, 1.0));
  lp.y += h + ripple;
  vec3 n = normalize(vec3(-dhdx, 1.0, -dhdz));
  vec4 wp = modelMatrix * vec4(lp, 1.0);
  vWorld = wp.xyz; vNormal = normalize(mat3(modelMatrix) * n);
  vCrest = h * 0.06; vJ = 1.0 - smoothstep(0.82, 1.0, h / max(uHeight, 1.0)) * 0.7; vRipFoam = smoothstep(0.88, 1.0, h / max(uHeight, 1.0)) * 0.6;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;

function polarGrid() {
  const pos = [], idx = [];
  for (let i = 0; i <= RINGS; i++) {
    const r = RING_A * (Math.exp(RING_B * i) - 1);
    for (let j = 0; j < SEGS; j++) {
      const a = (j / SEGS) * Math.PI * 2;
      pos.push(Math.cos(a) * r, 0, Math.sin(a) * r);
    }
  }
  for (let i = 0; i < RINGS; i++) for (let j = 0; j < SEGS; j++) {
    const a = i * SEGS + j, b = i * SEGS + ((j + 1) % SEGS), c = (i + 1) * SEGS + j, d = (i + 1) * SEGS + ((j + 1) % SEGS);
    idx.push(a, b, c, b, d, c);          // counter-clockwise seen from above: the sea faces up
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e5);
  return g;
}

export class Ocean {
  constructor({ envMap }) {
    this.ripples = [];
    const shared = {
      envMap: { value: envMap }, tNormal: { value: Tex.waterNormal() }, tNoise: { value: Tex.noise() },
      uTime: { value: 0 }, uEnvI: { value: 1.0 }, uBio: { value: 0 }, uFogDensity: { value: 0.00055 }, uDetail: { value: 0.3 },
      uSpecK: { value: 1 }, uFoamK: { value: 1 }, uLaceK: { value: 1 },
      uDeep: { value: new THREE.Color(0x05030f) }, uShallow: { value: new THREE.Color(0x1a1046) },
      uSSS: { value: new THREE.Color(0x0e86a6) }, uFoam: { value: new THREE.Color(0xc9c0f2) },
      uLightDir: { value: new THREE.Vector3(-0.35, 0.42, -0.84).normalize() }, uLightColor: { value: new THREE.Color(0xffd9f0) },
      uScan: { value: new THREE.Vector4(0, 0, 0, 0) }, uScanFan: { value: new THREE.Vector2(0.9, 260) },
      uIsl: { value: Array.from({ length: 16 }, () => new THREE.Vector4()) }, uIslV: { value: Array.from({ length: 32 }, () => new THREE.Vector4()) },
      uIslO: { value: new Float32Array(16) }, uIslCount: { value: 0 },
    };
    this.u = shared;
    this.uniforms = {
      ...shared, uAmp: { value: 0.62 },
      uWaves: { value: WAVES.map((w) => new THREE.Vector4(...w)) },
      uRipples: { value: Array.from({ length: 8 }, () => new THREE.Vector4(0, 0, -100, 0)) }, uRippleCount: { value: 0 },
    };
    this.material = new THREE.ShaderMaterial({ vertexShader: OCEAN_VERT, fragmentShader: WATER_FRAG, uniforms: this.uniforms });
    this.mesh = new THREE.Mesh(polarGrid(), this.material);
    this.mesh.frustumCulled = false; this.mesh.renderOrder = -1;
  }
  /** a ring of waves spreading from (x, z) */
  ripple(x, z, strength = 0.6) {
    const t = this.uniforms.uTime.value;
    this.ripples = this.ripples.filter((r) => t - r.t < 7);
    this.ripples.push({ x, z, t, s: strength });
    if (this.ripples.length > 8) this.ripples.shift();
    const arr = this.uniforms.uRipples.value;
    this.ripples.forEach((r, i) => arr[i].set(r.x, r.z, r.t, r.s));
    this.uniforms.uRippleCount.value = this.ripples.length;
  }
  /** the foam where risen islands meet the sea: every visible island's top outline, pushed out to its waterline */
  setIslands(islands) {
    const C = this.u.uIsl.value, Vs = this.u.uIslV.value, O = this.u.uIslO.value, p = this._p || (this._p = new THREE.Vector3());
    let n = 0;
    for (const isl of islands) {
      if (n >= 16 || !isl.visible || isl.position.y < -0.5 || isl.verts.length !== 4) continue;
      const above = Math.max(0, isl.position.y), t = Math.min(1, above / 9);
      const off = 0.1 + Math.pow(t, 1.5) * 1.5;
      const strength = Math.min(1, above / 1.2) * (0.75 + 0.25 * isl.k);
      let reach = 0;
      isl.verts.forEach((a, i) => {
        p.set(a.x, 0, -a.y).applyMatrix4(isl.matrixWorld);
        const v = Vs[n * 2 + (i >> 1)];
        if (i & 1) { v.z = p.x; v.w = p.z; } else { v.x = p.x; v.y = p.z; }
        reach = Math.max(reach, Math.hypot(p.x - isl.position.x, p.z - isl.position.z));
      });
      C[n].set(isl.position.x, isl.position.z, reach + off + 2.6, strength); O[n] = off; n++;
    }
    this.u.uIslCount.value = n;
  }
  /** the sea's height at a point (CPU twin of the vertex shader, for floating things and touchdowns) */
  heightAt(x, z) {
    const t = this.uniforms.uTime.value, amp = this.uniforms.uAmp.value;
    let y = 0;
    for (const [dx, dz, st, L] of WAVES) {
      const l = Math.hypot(dx, dz), d0 = dx / l, d1 = dz / l, k = (Math.PI * 2) / L, c = Math.sqrt(9.8 / k);
      y += ((st * amp) / k) * Math.sin(k * (d0 * x + d1 * z - c * t));
    }
    return y;
  }
  update(dt, camera) {
    this.uniforms.uTime.value += dt;
    this.mesh.position.set(camera.position.x, 0, camera.position.z);
  }
}

export class GiantWave {
  constructor(ocean, { length = 2600, depth = 900, segX = 260, segZ = 90 } = {}) {
    const g = new THREE.PlaneGeometry(length, depth, segX, segZ); g.rotateX(-Math.PI / 2);
    this.uniforms = { ...ocean.u, uHeight: { value: 0 }, uSigF: { value: 60 }, uSigB: { value: 150 }, uHalf: { value: length / 2 } };
    this.material = new THREE.ShaderMaterial({ vertexShader: GIANT_VERT, fragmentShader: WATER_FRAG, uniforms: this.uniforms });
    this.mesh = new THREE.Mesh(g, this.material);
    this.mesh.frustumCulled = false;
    this.phase = 0.15; this.speed = 1 / 80; this.peak = 110; this.near = 750; this.far = 1700;
    this.dir = new THREE.Vector2(0.35, 1).normalize();   // the way it travels (toward the play area)
    this.centre = new THREE.Vector3(0, 0, 0);
    this.enabled = true;
  }
  /** it rises far away, rolls toward us, and sinks back long before it could reach anything */
  update(dt) {
    if (!this.enabled) { this.mesh.visible = false; return; }
    this.mesh.visible = true;
    this.phase = (this.phase + dt * this.speed) % 1;
    const k = this.phase, d = this.far + (this.near - this.far) * k;
    const life = Math.sin(Math.PI * Math.min(1, k * 1.05));
    this.uniforms.uHeight.value = this.peak * Math.pow(life, 0.8);
    const dx = -this.dir.x, dz = -this.dir.y;
    this.mesh.position.set(this.centre.x + dx * d, -0.6, this.centre.z + dz * d);
    this.mesh.rotation.y = Math.atan2(this.dir.x, this.dir.y) + Math.PI;
  }
}
