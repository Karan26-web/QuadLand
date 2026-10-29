// ---------------------------------------------------------------------------
// Skies, baked once into HDR cubemaps (a full-screen fbm sky every frame would cost a
// tablet its frame rate; a cubemap lookup costs nothing, and the sea and the hulls
// reflect the same sky they are seen against).
//  * nebula:  deep space, colourful nebulae (magenta / violet / teal, warm knots),
//             dust lanes and three layers of stars
//  * night:   the water planet: indigo zenith, violet horizon glowing toward the
//             ringed planet, a pink nebula band, dense stars
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { NOISE } from './glsl.js';

const DOME_VERT = /* glsl */`
varying vec3 vDir;
void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

const NEBULA_FRAG = NOISE + /* glsl */`
varying vec3 vDir;
vec3 ramp(float t) {
  vec3 a = vec3(0.03, 0.01, 0.07), b = vec3(0.32, 0.06, 0.55), c = vec3(1.0, 0.2, 0.6), d = vec3(1.0, 0.6, 0.35);
  return t < 0.4 ? mix(a, b, t / 0.4) : t < 0.75 ? mix(b, c, (t - 0.4) / 0.35) : mix(c, d, (t - 0.75) / 0.25);
}
void main() {
  vec3 d = normalize(vDir);
  vec3 q = d * 1.6;
  vec3 w = vec3(fbm(q + vec3(1.3, 0.0, 2.1), 4), fbm(q + vec3(5.2, 1.3, 0.4), 4), fbm(q + vec3(2.8, 7.1, 3.3), 4));
  float n = fbm(q * 1.4 + w * 1.7, 6) * 0.5 + 0.5;
  float n2 = fbm(q * 2.6 - w * 1.2 + 4.0, 5) * 0.5 + 0.5;
  // two broad clouds in different hues, so the sky is colourful from every side
  float band = exp(-pow(dot(d, normalize(vec3(0.25, 0.85, -0.45))) * 1.9, 2.0));
  float band2 = exp(-pow(dot(d, normalize(vec3(-0.7, 0.2, 0.68))) * 2.4, 2.0));
  float cloud = smoothstep(0.42, 0.95, n) * (0.35 + band * 0.9);
  float teal = smoothstep(0.5, 0.92, n2) * (0.25 + band2 * 0.95);
  vec3 col = ramp(clamp(cloud * 1.1, 0.0, 1.0)) * cloud * 1.6;
  col += vec3(0.05, 0.75, 0.85) * teal * teal * 1.4 + vec3(0.25, 0.35, 1.0) * teal * 0.35;
  float dust = smoothstep(0.55, 0.85, fbm(q * 3.5 + w * 2.0 + 9.0, 5) * 0.5 + 0.5);
  col *= 1.0 - dust * 0.75;
  float knots = pow(smoothstep(0.78, 1.0, n), 3.0) * band;
  col += vec3(1.0, 0.75, 0.55) * knots * 2.5;
  col += vec3(0.012, 0.008, 0.03);
  col += starField(d, 0.955, 120.0, 0.012) * 0.9;
  col += starField(d.zxy, 0.985, 60.0, 0.018) * 1.6;
  col += starField(d.yzx, 0.996, 30.0, 0.02) * 3.2;
  gl_FragColor = vec4(col, 1.0);
}`;

const NIGHT_FRAG = NOISE + /* glsl */`
varying vec3 vDir;
uniform vec3 uGlowDir;
void main() {
  vec3 d = normalize(vDir);
  float e = d.y;
  vec3 zen = vec3(0.008, 0.004, 0.04), mid = vec3(0.05, 0.016, 0.14), hor = vec3(0.17, 0.05, 0.3), sea = vec3(0.025, 0.01, 0.06);
  vec3 col = e > 0.0 ? mix(hor, mid, smoothstep(0.0, 0.2, e)) : mix(hor, sea, smoothstep(0.0, 0.05, -e));
  col = e > 0.2 ? mix(mid, zen, smoothstep(0.2, 0.8, e)) : col;
  float toward = max(dot(normalize(vec3(d.x, 0.0, d.z)), normalize(vec3(uGlowDir.x, 0.0, uGlowDir.z))), 0.0);
  float glow = pow(toward, 5.0) * exp(-max(e, 0.0) * 7.0);
  col += vec3(0.55, 0.16, 0.5) * glow * 0.75 + vec3(0.95, 0.5, 0.55) * pow(toward, 18.0) * exp(-abs(e) * 18.0) * 0.55;
  if (e > -0.02) {
    vec3 q = d * 2.2;
    float n = fbm(q + vec3(fbm(q * 1.3 + 3.0, 3)), 5) * 0.5 + 0.5;
    float band = exp(-pow(dot(d, normalize(vec3(0.6, 0.55, 0.58))) * 2.2, 2.0));
    float neb = smoothstep(0.5, 0.92, n) * band * smoothstep(0.02, 0.3, e);
    col += mix(vec3(0.4, 0.1, 0.55), vec3(0.95, 0.35, 0.7), n) * neb * 0.32;
    float sf = smoothstep(-0.02, 0.2, e);
    col += starField(d, 0.95, 140.0, 0.011) * 0.8 * sf;
    col += starField(d.zxy, 0.982, 70.0, 0.016) * 1.5 * sf;
    col += starField(d.yzx, 0.996, 32.0, 0.02) * 3.0 * sf;
  }
  gl_FragColor = vec4(col, 1.0);
}`;

export function skyDome(kind, { glowDir = new THREE.Vector3(0, 0.2, -1) } = {}) {
  const mat = new THREE.ShaderMaterial({
    vertexShader: DOME_VERT, fragmentShader: kind === 'nebula' ? NEBULA_FRAG : NIGHT_FRAG,
    uniforms: { uGlowDir: { value: glowDir.clone().normalize() } }, side: THREE.BackSide, depthWrite: false,
  });
  const m = new THREE.Mesh(new THREE.SphereGeometry(100, 64, 32), mat);
  m.renderOrder = -10;          // always first: it writes no depth, so anything in the bake draws over it
  return m;
}

/** Render a scene from a point into a half-float cubemap (once). */
export function bakeCube(renderer, scene, { size = 1024, at = new THREE.Vector3(), near = 0.5, far = 20000 } = {}) {
  const rt = new THREE.WebGLCubeRenderTarget(size, { type: THREE.HalfFloatType, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter });
  const cam = new THREE.CubeCamera(near, far, rt);
  cam.position.copy(at);
  scene.add(cam);
  cam.update(renderer, scene);
  scene.remove(cam);
  return rt;
}
