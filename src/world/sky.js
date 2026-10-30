// ---------------------------------------------------------------------------
// Skies, baked once into HDR cubemaps (a full-screen fbm sky every frame would cost a
// tablet its frame rate; a cubemap lookup costs nothing, and the sea and the hulls
// reflect the same sky they are seen against).
//  * nebula:  deep space: a dark navy with a soft galactic band, and four nebulae
//             (violet-magenta, teal, lilac, rose) framing the views, dark between.
//             No stars: those are drawn live (stars.js), crisp and twinkling.
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
uniform vec3 uBand;
/* a three-stop colour ramp by gas density: the thin edge of a cloud is dark, only its heart is bright */
vec3 ramp3(float t, vec3 a, vec3 b, vec3 c) { return t < 0.6 ? mix(a, b, t / 0.6) : mix(b, c, (t - 0.6) / 0.4); }
/* how thick a cloud centred on c (radius r, radians) is here: a soft cap that the gas breaks up */
float cloud(vec3 d, vec3 c, float r, float n) {
  float a = acos(clamp(dot(d, normalize(c)), -1.0, 1.0)) / r;
  float k = exp(-a * a * 1.8);
  return k * smoothstep(0.56 - 0.3 * k, 0.95, n);
}
void main() {
  vec3 d = normalize(vDir);
  vec3 q = d * 1.25;
  vec3 w = vec3(fbm(q + vec3(1.3, 0.0, 2.1), 3), fbm(q + vec3(5.2, 1.3, 0.4), 3), fbm(q + vec3(2.8, 7.1, 3.3), 3));
  float n1 = fbm(q * 1.6 + w * 1.3, 4) * 0.5 + 0.5;          // four octaves: soft gas, not smoke
  float n2 = fbm(q * 1.9 - w * 1.1 + 4.0, 4) * 0.5 + 0.5;
  float n3 = fbm(q * 1.4 + w * 1.6 + 11.0, 4) * 0.5 + 0.5;
  float lane = smoothstep(0.52, 0.8, fbm(q * 3.4 + w * 2.0 + 9.0, 4) * 0.5 + 0.5);    // dark dust

  // deep space: a navy that is never quite black, a shade lighter along the galaxy's band
  float lat = dot(d, normalize(uBand));
  float band = exp(-lat * lat * 9.0), spine = exp(-lat * lat * 46.0);
  vec3 col = mix(vec3(0.003, 0.004, 0.011), vec3(0.006, 0.008, 0.02), d.y * 0.5 + 0.5);
  col += (vec3(0.02, 0.026, 0.07) * band * (0.35 + 0.65 * n1) + vec3(0.022, 0.024, 0.05) * spine * n2) * (1.0 - lane * 0.85);
  col += vec3(0.07, 0.035, 0.14) * band * smoothstep(0.52, 0.86, n3) * 0.5 * (1.0 - lane);        // violet haze along it

  // four nebulae, each framing a part of the sky the camera dwells on; the gaps between them stay dark
  float m1 = cloud(d, vec3(0.8, -0.28, -0.53), 0.78, n1);     // violet, magenta heart: low on the title's right
  float m2 = cloud(d, vec3(-0.72, 0.38, 0.58), 0.62, n2);     // teal: behind the fleet
  float m3 = cloud(d, vec3(-0.62, 0.26, -0.74), 0.62, n3);    // lilac: beyond the water planet
  float m4 = cloud(d, vec3(0.48, 0.52, -0.7), 0.5, n2);       // rose-violet: above the ringed giant
  vec3 neb = ramp3(m1, vec3(0.04, 0.025, 0.13), vec3(0.2, 0.06, 0.42), vec3(0.7, 0.16, 0.45)) * m1 * 0.85;
  neb += ramp3(m2, vec3(0.015, 0.04, 0.12), vec3(0.03, 0.22, 0.32), vec3(0.3, 0.72, 0.78)) * m2 * 0.6;
  neb += ramp3(m3, vec3(0.04, 0.03, 0.14), vec3(0.16, 0.1, 0.38), vec3(0.45, 0.32, 0.75)) * m3 * 0.6;
  neb += ramp3(m4, vec3(0.04, 0.02, 0.12), vec3(0.22, 0.07, 0.42), vec3(0.62, 0.22, 0.52)) * m4 * 0.55;
  // bright filaments where a cloud thins out, and a warm knot or two in the big one
  float m = m1 + m2 + m3 + m4;
  float fil = pow(1.0 - abs(snoise(q * 2.6 + w * 2.0)), 12.0) * smoothstep(0.06, 0.3, m) * (1.0 - smoothstep(0.5, 0.9, m));
  neb += (vec3(0.5, 0.25, 0.7) * m1 + vec3(0.2, 0.6, 0.7) * m2 + vec3(0.4, 0.35, 0.8) * m3 + vec3(0.6, 0.3, 0.7) * m4) / max(m, 1e-3) * fil * 0.1;
  neb += vec3(1.0, 0.68, 0.5) * pow(smoothstep(0.78, 1.0, n1), 3.0) * smoothstep(0.3, 0.7, m1) * 0.6;
  col += neb * (1.0 - lane * 0.7);
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

/** the pole of deep space's galaxy: its band of faint light (and the most stars) runs round the sky square to this */
export const GALAXY_POLE = new THREE.Vector3(0.38, 0.89, 0.24).normalize();

export function skyDome(kind, { glowDir = new THREE.Vector3(0, 0.2, -1) } = {}) {
  const mat = new THREE.ShaderMaterial({
    vertexShader: DOME_VERT, fragmentShader: kind === 'nebula' ? NEBULA_FRAG : NIGHT_FRAG,
    uniforms: { uGlowDir: { value: glowDir.clone().normalize() }, uBand: { value: GALAXY_POLE } }, side: THREE.BackSide, depthWrite: false,
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
