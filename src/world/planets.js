// ---------------------------------------------------------------------------
// Planets: the ringed giant (the reference frames' violet ringed planet; also the
// water planet's sky companion), the ocean planet seen from space, small moons.
// All procedural (fbm in the fragment shader: one object each, cheap enough).
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { NOISE } from './glsl.js';
import { art } from '../engine/assets.js';

/** a painted equirect map for this slot, if installed (docs/assets/03-space.md) */
const map = (slot) => art.texture(slot);

const COMMON_VERT = /* glsl */`
varying vec3 vN; varying vec3 vWN; varying vec3 vWP; varying vec2 vUv;
void main() {
  vN = normal; vWN = normalize(mat3(modelMatrix) * normal); vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0); vWP = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;

export function ringedPlanet({ radius = 400, sunDir = new THREE.Vector3(1, 0.3, 0.4), tilt = 0.42, hue = 'violet' } = {}) {
  const g = new THREE.Group();
  const pal = hue === 'violet'
    ? { c1: new THREE.Color(0x8a5cd6), c2: new THREE.Color(0xd9b8ff), c3: new THREE.Color(0xffb08a), atm: new THREE.Color(0xc79bff) }
    : { c1: new THREE.Color(0xd08a5c), c2: new THREE.Color(0xffe1b8), c3: new THREE.Color(0x8a6cff), atm: new THREE.Color(0xffc79b) };
  const uniforms = {
    uSun: { value: sunDir.clone().normalize() }, uC1: { value: pal.c1 }, uC2: { value: pal.c2 }, uC3: { value: pal.c3 }, uAtm: { value: pal.atm },
    uTime: { value: 0 }, uLight: { value: 1.6 },
    tMap: { value: map('planet_ringed') }, uMapK: { value: map('planet_ringed') ? 1 : 0 },
    tRing: { value: map('ring') }, uRingK: { value: map('ring') ? 1 : 0 },
  };
  const body = new THREE.Mesh(new THREE.SphereGeometry(radius, 96, 64), new THREE.ShaderMaterial({
    uniforms, vertexShader: COMMON_VERT,
    fragmentShader: NOISE + /* glsl */`
      uniform vec3 uSun, uC1, uC2, uC3, uAtm; uniform float uTime, uLight, uMapK; uniform sampler2D tMap;
      varying vec3 vN; varying vec3 vWN; varying vec3 vWP; varying vec2 vUv;
      void main() {
        vec3 n = normalize(vN);
        float lat = n.y;
        float warp = fbm(n * 2.5 + vec3(0.0, 0.0, uTime * 0.004), 4);
        float b = sin(lat * 22.0 + warp * 4.0) * 0.5 + 0.5;
        float b2 = sin(lat * 61.0 + warp * 9.0) * 0.5 + 0.5;
        vec3 col = mix(uC1, uC2, smoothstep(0.15, 0.85, b));
        col = mix(col, uC3, smoothstep(0.55, 0.95, b2) * 0.35 * (1.0 - abs(lat)));
        col *= 0.85 + 0.25 * fbm(n * 9.0, 3);
        if (uMapK > 0.5) col = texture2D(tMap, vUv).rgb;
        vec3 N = normalize(vWN), V = normalize(cameraPosition - vWP);
        float d = dot(N, uSun);
        float lit = smoothstep(-0.18, 0.55, d);
        float rim = pow(1.0 - max(dot(N, V), 0.0), 2.6);
        vec3 c = col * (0.035 + lit * uLight) + uAtm * rim * (0.25 + lit * 1.3);
        gl_FragColor = vec4(c, 1.0);
      }`,
  }));
  g.add(body);

  // the rings: concentric bands, lit from either side, dark where the planet's shadow falls on them
  const ringGeo = new THREE.RingGeometry(radius * 1.35, radius * 2.35, 256, 1);
  const ringMat = new THREE.ShaderMaterial({
    uniforms: { ...uniforms, uIn: { value: radius * 1.35 }, uOut: { value: radius * 2.35 }, uR: { value: radius }, uCenter: { value: new THREE.Vector3() } },
    vertexShader: /* glsl */`varying vec3 vL; varying vec3 vWP; void main() { vL = position; vec4 wp = modelMatrix * vec4(position, 1.0); vWP = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }`,
    fragmentShader: NOISE + /* glsl */`
      uniform vec3 uSun, uC1, uC2, uC3, uCenter; uniform float uIn, uOut, uR, uLight, uRingK; uniform sampler2D tRing;
      varying vec3 vL; varying vec3 vWP;
      void main() {
        float r = (length(vL.xy) - uIn) / (uOut - uIn);
        float bands = 0.5 + 0.5 * sin(r * 70.0) * sin(r * 23.0 + 1.3);
        float gaps = smoothstep(0.02, 0.05, abs(r - 0.42)) * smoothstep(0.01, 0.03, abs(r - 0.71));
        float a = (0.35 + 0.65 * bands) * gaps * smoothstep(0.0, 0.06, r) * smoothstep(1.0, 0.86, r);
        vec3 col = mix(uC2, uC1, r) * (0.75 + 0.5 * bands);
        if (uRingK > 0.5) { vec4 t = texture2D(tRing, vec2(clamp(r, 0.0, 1.0), 0.5)); col = t.rgb; a = t.a; }
        // the planet's shadow: march from this point toward the sun, see if the sphere is hit
        vec3 o = vWP - uCenter; float bq = dot(o, uSun); float cq = dot(o, o) - uR * uR;
        float shadow = (bq < 0.0 && bq * bq - cq > 0.0) ? 0.12 : 1.0;
        gl_FragColor = vec4(col * (0.08 + uLight * 0.9 * shadow), a * 0.92);
      }`,
    transparent: true, side: THREE.DoubleSide, depthWrite: false,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2 - tilt; ring.rotation.y = 0.25;
  g.add(ring);
  g.userData = { body, ring, uniforms, ringMat };
  g.update = (dt) => { uniforms.uTime.value += dt; g.getWorldPosition(ringMat.uniforms.uCenter.value); };
  return g;
}

export function oceanPlanet({ radius = 500, sunDir = new THREE.Vector3(1, 0.2, 0.3) } = {}) {
  const g = new THREE.Group();
  const uniforms = { uSun: { value: sunDir.clone().normalize() }, uTime: { value: 0 }, uLight: { value: 1.5 }, uSpin: { value: 0 }, tMap: { value: map('planet_ocean') }, uMapK: { value: map('planet_ocean') ? 1 : 0 } };
  const body = new THREE.Mesh(new THREE.SphereGeometry(radius, 128, 96), new THREE.ShaderMaterial({
    uniforms, vertexShader: COMMON_VERT,
    fragmentShader: NOISE + /* glsl */`
      uniform vec3 uSun; uniform float uTime, uLight, uSpin, uMapK; uniform sampler2D tMap;
      varying vec3 vN; varying vec3 vWN; varying vec3 vWP; varying vec2 vUv;
      void main() {
        vec3 n = normalize(vN);
        float cs = cos(uSpin), sn = sin(uSpin);
        vec3 q = vec3(cs * n.x - sn * n.z, n.y, sn * n.x + cs * n.z);
        float depth = fbm(q * 3.0, 4) * 0.5 + 0.5;
        vec3 sea = mix(vec3(0.03, 0.02, 0.16), vec3(0.16, 0.11, 0.52), depth);
        sea = mix(sea, vec3(0.08, 0.36, 0.62), smoothstep(0.62, 0.9, depth) * 0.6);
        vec3 w = vec3(fbm(q * 1.6 + vec3(0.0, uTime * 0.01, 0.0), 3), fbm(q * 1.6 + vec3(5.2, 1.3, uTime * 0.01), 3), 0.0);
        float cl = fbm(q * 3.4 + w * 1.8 + vec3(0.0, 0.0, uTime * 0.006), 5);
        float clouds = smoothstep(0.05, 0.55, cl) * (0.55 + 0.45 * smoothstep(-0.2, 0.6, fbm(q * 9.0, 3)));
        vec3 N = normalize(vWN), V = normalize(cameraPosition - vWP);
        float d = dot(N, uSun), lit = smoothstep(-0.12, 0.45, d);
        vec3 H = normalize(uSun + V);
        float spec = pow(max(dot(N, H), 0.0), 60.0) * (1.0 - clouds) * lit;
        vec3 cloudCol = mix(vec3(0.78, 0.74, 1.0), vec3(1.0), clouds);
        vec3 surf = mix(sea, cloudCol, clouds * 0.9);
        if (uMapK > 0.5) { surf = texture2D(tMap, vec2(fract(vUv.x - uSpin / 6.28318), vUv.y)).rgb; clouds = smoothstep(0.55, 0.9, dot(surf, vec3(0.33))); }
        vec3 col = surf * (0.03 + lit * uLight);
        col += vec3(1.0, 0.85, 0.95) * spec * 1.4;
        float glowNight = (1.0 - lit) * smoothstep(0.62, 0.9, fbm(q * 7.0 + 3.0, 3)) * (1.0 - clouds);
        col += vec3(0.1, 0.85, 1.0) * glowNight * 0.35;                       // bioluminescent seas on the dark side
        float rim = pow(1.0 - max(dot(N, V), 0.0), 3.0);
        col += vec3(0.45, 0.75, 1.0) * rim * (0.15 + lit * 1.4);
        gl_FragColor = vec4(col, 1.0);
      }`,
  }));
  g.add(body);
  const atm = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.07, 96, 64), new THREE.ShaderMaterial({
    uniforms, side: THREE.BackSide, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: COMMON_VERT,
    fragmentShader: /* glsl */`
      uniform vec3 uSun; varying vec3 vWN; varying vec3 vWP; varying vec3 vN;
      void main() {
        vec3 N = normalize(vWN), V = normalize(cameraPosition - vWP);
        float f = pow(clamp(1.0 + dot(N, V) * 1.15, 0.0, 1.0), 2.2);   // brightest at the limb
        float lit = smoothstep(-0.4, 0.6, dot(-N, uSun));
        gl_FragColor = vec4(vec3(0.42, 0.62, 1.0) * f * (0.1 + lit * 1.3) + vec3(0.8, 0.4, 1.0) * f * 0.12, 1.0);
      }`,
  }));
  g.add(atm);
  g.userData = { body, atm, uniforms };
  g.update = (dt) => { uniforms.uTime.value += dt; uniforms.uSpin.value += dt * 0.004; };
  return g;
}

export function moon({ radius = 60, sunDir = new THREE.Vector3(1, 0.2, 0.3), tint = 0xb8a8d8 } = {}) {
  const uniforms = { uSun: { value: sunDir.clone().normalize() }, uTint: { value: new THREE.Color(tint) }, tMap: { value: map('moon') }, uMapK: { value: map('moon') ? 1 : 0 } };
  const m = new THREE.Mesh(new THREE.SphereGeometry(radius, 48, 32), new THREE.ShaderMaterial({
    uniforms, vertexShader: COMMON_VERT,
    fragmentShader: NOISE + /* glsl */`
      uniform vec3 uSun, uTint; uniform float uMapK; uniform sampler2D tMap; varying vec3 vN; varying vec3 vWN; varying vec3 vWP; varying vec2 vUv;
      void main() {
        vec3 n = normalize(vN);
        float h = fbm(n * 4.0, 5);
        float craters = smoothstep(0.55, 0.62, abs(snoise(n * 7.0))) * 0.25;
        vec3 col = uTint * (0.6 + h * 0.4 - craters);
        if (uMapK > 0.5) col = texture2D(tMap, vUv).rgb * mix(vec3(1.0), uTint, 0.35);
        float lit = smoothstep(-0.05, 0.5, dot(normalize(vWN), uSun));
        gl_FragColor = vec4(col * (0.02 + lit * 1.3), 1.0);
      }`,
  }));
  m.update = () => {};
  return m;
}
