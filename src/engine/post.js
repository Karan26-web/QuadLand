// ---------------------------------------------------------------------------
// HDR post pipeline (no addons: the vendored Three.js is core only).
//   scene → HDR target (half float, MSAA) → dual-Kawase bloom chain →
//   composite: chromatic aberration, zoom blur (warp), directional blur (whip
//   pans), bloom, frosted background (the lesson), exposure, ACES, grade,
//   glitch, drone-feed scanlines, vignette, grain, fade → sRGB to the screen.
// Every effect is a uniform the camera director and the screens drive; an effect
// at 0 costs one branch.
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';

const VERT = /* glsl */`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

const PREFILTER = /* glsl */`
uniform sampler2D tSrc; uniform vec2 texel; uniform float threshold, knee;
varying vec2 vUv;
void main() {
  vec3 c = texture2D(tSrc, vUv + texel * vec2(-0.5, -0.5)).rgb + texture2D(tSrc, vUv + texel * vec2(0.5, -0.5)).rgb
         + texture2D(tSrc, vUv + texel * vec2(-0.5, 0.5)).rgb + texture2D(tSrc, vUv + texel * vec2(0.5, 0.5)).rgb;
  c *= 0.25;
  c = min(c, vec3(64.0));                       // a single hot pixel must not flood the bloom
  float br = max(c.r, max(c.g, c.b));
  float soft = clamp(br - threshold + knee, 0.0, 2.0 * knee); soft = soft * soft / (4.0 * knee + 1e-4);
  float w = max(soft, br - threshold) / max(br, 1e-4);
  gl_FragColor = vec4(c * max(w, 0.0), 1.0);
}`;

const DOWN = /* glsl */`
uniform sampler2D tSrc; uniform vec2 texel;
varying vec2 vUv;
void main() {
  vec2 h = texel;
  vec3 s = texture2D(tSrc, vUv).rgb * 4.0;
  s += texture2D(tSrc, vUv - h).rgb; s += texture2D(tSrc, vUv + h).rgb;
  s += texture2D(tSrc, vUv + vec2(h.x, -h.y)).rgb; s += texture2D(tSrc, vUv - vec2(h.x, -h.y)).rgb;
  gl_FragColor = vec4(s / 8.0, 1.0);
}`;

const UP = /* glsl */`
uniform sampler2D tSrc; uniform vec2 texel; uniform float gain;
varying vec2 vUv;
void main() {
  vec2 h = texel;
  vec3 s = texture2D(tSrc, vUv + vec2(-h.x * 2.0, 0.0)).rgb;
  s += texture2D(tSrc, vUv + vec2(-h.x, h.y)).rgb * 2.0;
  s += texture2D(tSrc, vUv + vec2(0.0, h.y * 2.0)).rgb;
  s += texture2D(tSrc, vUv + vec2(h.x, h.y)).rgb * 2.0;
  s += texture2D(tSrc, vUv + vec2(h.x * 2.0, 0.0)).rgb;
  s += texture2D(tSrc, vUv + vec2(h.x, -h.y)).rgb * 2.0;
  s += texture2D(tSrc, vUv + vec2(0.0, -h.y * 2.0)).rgb;
  s += texture2D(tSrc, vUv + vec2(-h.x, -h.y)).rgb * 2.0;
  gl_FragColor = vec4(s / 12.0 * gain, 1.0);
}`;

const COMPOSITE = /* glsl */`
uniform sampler2D tScene, tBloom, tBlur;
uniform vec2 res, zoomCenter, dirBlur;
uniform float time, exposure, bloomK, ca, zoomBlur, vign, grain, glitch, feed, fade, sat, contrast, blurMix, blurDim, flash, hasBlur;
uniform vec3 fadeColor, tint, lift, flashColor;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
vec3 aces(vec3 x) { return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }
vec3 sceneAt(vec2 uv) {
  if (ca <= 0.0001) return texture2D(tScene, uv).rgb;
  vec2 d = (uv - 0.5) * ca;
  return vec3(texture2D(tScene, uv + d).r, texture2D(tScene, uv).g, texture2D(tScene, uv - d).b);
}
void main() {
  vec2 uv = vUv;
  if (glitch > 0.001) {                           // torn rows and slipped blocks (the drone feed cutting in)
    float t = floor(time * 24.0);
    float row = floor(uv.y * 22.0);
    if (hash(vec2(row, t)) < glitch * 0.75) uv.x += (hash(vec2(row * 3.1, t)) - 0.5) * 0.18 * glitch;
    float blk = floor(uv.y * 7.0);
    if (hash(vec2(blk, t * 1.7)) < glitch * 0.3) uv.y += (hash(vec2(blk, t)) - 0.5) * 0.06 * glitch;
  }
  vec3 col;
  if (zoomBlur > 0.001) {                         // warp: everything streams out of the vanishing point
    vec2 dir = uv - zoomCenter;
    col = vec3(0.0); float tot = 0.0;
    for (int i = 0; i < 14; i++) {
      float k = float(i) / 13.0; float w = 1.0 - k * 0.55;
      col += sceneAt(uv - dir * zoomBlur * k) * w; tot += w;
    }
    col /= tot;
  } else col = sceneAt(uv);
  if (dot(dirBlur, dirBlur) > 1e-8) {             // whip pan: smear along the swing
    vec3 acc = col; float tot = 1.0;
    for (int i = 0; i < 10; i++) { float k = float(i) / 9.0 - 0.5; acc += texture2D(tScene, uv + dirBlur * k).rgb; tot += 1.0; }
    col = acc / tot;
  }
  col += texture2D(tBloom, vUv).rgb * bloomK;
  if (blurMix > 0.001 && hasBlur > 0.5) col = mix(col, texture2D(tBlur, vUv).rgb * blurDim, blurMix);
  col *= exposure * tint;
  col = aces(col);
  float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(l), col, sat);
  col = (col - 0.5) * contrast + 0.5 + lift;
  if (glitch > 0.001) {
    float t = floor(time * 30.0);
    float line = step(1.0 - glitch * 0.35, hash(vec2(floor(vUv.y * 140.0), t)));
    col = mix(col, vec3(hash(vUv * res + t)), line * 0.6);
    col.r += glitch * 0.12 * hash(vec2(t, 1.0)); col.b += glitch * 0.18 * hash(vec2(t, 2.0));
  }
  if (feed > 0.001) {                             // the drone's camera: scanlines, a little sensor noise
    float s = 0.5 + 0.5 * sin(vUv.y * res.y * 1.3 + time * 8.0);
    col *= mix(1.0, 0.86 + 0.14 * s, feed);
    col += (hash(vUv * res + fract(time) * 91.7) - 0.5) * 0.05 * feed;
  }
  vec2 q = vUv - 0.5; q.x *= res.x / res.y * 0.75;
  col *= clamp(1.0 - dot(q, q) * vign * 1.8, 0.0, 1.0);
  col += (hash(vUv * res + fract(time * 7.13) * 117.0) - 0.5) * grain;
  col = mix(col, flashColor, clamp(flash, 0.0, 1.0));
  col = mix(col, fadeColor, clamp(fade, 0.0, 1.0));
  col = clamp(col, 0.0, 1.0);
  col = mix(col * 12.92, 1.055 * pow(col, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, col));
  gl_FragColor = vec4(col, 1.0);
}`;

function rt(w, h, opts = {}) {
  return new THREE.WebGLRenderTarget(Math.max(1, w), Math.max(1, h), {
    type: THREE.HalfFloatType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
    depthBuffer: false, generateMipmaps: false, ...opts,
  });
}

export class Post {
  constructor(renderer) {
    this.r = renderer;
    const gl = renderer.getContext();
    this.webgl2 = renderer.capabilities.isWebGL2 !== false && typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext;
    this.samples = this.webgl2 ? 4 : 0;
    this.scene = rt(1, 1, { depthBuffer: true, samples: this.samples });
    this.levels = 6;
    this.mips = Array.from({ length: this.levels }, () => rt(1, 1));
    this.blurDown = [rt(1, 1), rt(1, 1), rt(1, 1)];
    this.blurUp = [rt(1, 1), rt(1, 1)];
    this.blurReady = false;

    this.cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 2, 0, 0, 2], 2));
    this.quad = new THREE.Mesh(geo, null); this.quad.frustumCulled = false;
    this.quadScene = new THREE.Scene(); this.quadScene.add(this.quad);

    const mat = (frag, uniforms) => new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: frag, uniforms, depthTest: false, depthWrite: false });
    this.mPre = mat(PREFILTER, { tSrc: { value: null }, texel: { value: new THREE.Vector2() }, threshold: { value: 1.0 }, knee: { value: 0.5 } });
    this.mDown = mat(DOWN, { tSrc: { value: null }, texel: { value: new THREE.Vector2() } });
    this.mUp = mat(UP, { tSrc: { value: null }, texel: { value: new THREE.Vector2() }, gain: { value: 1 } });
    this.mUpAdd = mat(UP, { tSrc: { value: null }, texel: { value: new THREE.Vector2() }, gain: { value: 1 } });
    this.mUpAdd.blending = THREE.AdditiveBlending; this.mUpAdd.transparent = true;

    /** The knobs. Screens and the camera director write these; nothing else needs to know a shader exists. */
    this.fx = {
      exposure: 1, bloom: 0.55, threshold: 0.9, knee: 0.6, ca: 0, zoomBlur: 0, zoomCenter: new THREE.Vector2(0.5, 0.5),
      dirBlur: new THREE.Vector2(0, 0), vignette: 0.32, grain: 0.025, glitch: 0, feed: 0, fade: 0,
      fadeColor: new THREE.Color(0, 0, 0), saturation: 1.06, contrast: 1.04, lift: new THREE.Color(0, 0, 0),
      tint: new THREE.Color(1, 1, 1), blurMix: 0, blurDim: 0.55, flash: 0, flashColor: new THREE.Color(1, 1, 1),
    };
    this.mComp = mat(COMPOSITE, {
      tScene: { value: null }, tBloom: { value: null }, tBlur: { value: null }, res: { value: new THREE.Vector2(1, 1) },
      zoomCenter: { value: this.fx.zoomCenter }, dirBlur: { value: this.fx.dirBlur }, time: { value: 0 },
      exposure: { value: 1 }, bloomK: { value: 0.5 }, ca: { value: 0 }, zoomBlur: { value: 0 }, vign: { value: 0.3 },
      grain: { value: 0.02 }, glitch: { value: 0 }, feed: { value: 0 }, fade: { value: 0 }, sat: { value: 1 },
      contrast: { value: 1 }, blurMix: { value: 0 }, blurDim: { value: 0.55 }, flash: { value: 0 }, hasBlur: { value: 0 },
      fadeColor: { value: this.fx.fadeColor }, tint: { value: this.fx.tint }, lift: { value: this.fx.lift }, flashColor: { value: this.fx.flashColor },
    });
    this.w = 1; this.h = 1;
  }

  setSize(w, h) {
    this.w = w; this.h = h;
    this.scene.setSize(w, h);
    let mw = w, mh = h;
    for (let i = 0; i < this.levels; i++) { mw = Math.max(1, mw >> 1); mh = Math.max(1, mh >> 1); this.mips[i].setSize(mw, mh); }
    this.blurDown[0].setSize(Math.max(1, w >> 2), Math.max(1, h >> 2));
    this.blurDown[1].setSize(Math.max(1, w >> 3), Math.max(1, h >> 3));
    this.blurDown[2].setSize(Math.max(1, w >> 4), Math.max(1, h >> 4));
    this.blurUp[0].setSize(Math.max(1, w >> 3), Math.max(1, h >> 3));
    this.blurUp[1].setSize(Math.max(1, w >> 2), Math.max(1, h >> 2));
    this.mComp.uniforms.res.value.set(w, h);
  }

  _pass(material, target) {
    this.quad.material = material;
    this.r.setRenderTarget(target);
    this.r.render(this.quadScene, this.cam);
  }

  render(scene, camera, time) {
    const r = this.r, fx = this.fx;
    r.setRenderTarget(this.scene);
    r.clear();
    r.render(scene, camera);

    // bloom: prefilter into the half-size mip, blur down, then add back up
    this.mPre.uniforms.tSrc.value = this.scene.texture;
    this.mPre.uniforms.texel.value.set(1 / this.w, 1 / this.h);
    this.mPre.uniforms.threshold.value = fx.threshold; this.mPre.uniforms.knee.value = fx.knee;
    this._pass(this.mPre, this.mips[0]);
    for (let i = 1; i < this.levels; i++) {
      const src = this.mips[i - 1];
      this.mDown.uniforms.tSrc.value = src.texture;
      this.mDown.uniforms.texel.value.set(1 / src.width, 1 / src.height);
      this._pass(this.mDown, this.mips[i]);
    }
    for (let i = this.levels - 2; i >= 0; i--) {
      const src = this.mips[i + 1];
      this.mUpAdd.uniforms.tSrc.value = src.texture;
      this.mUpAdd.uniforms.texel.value.set(0.5 / src.width, 0.5 / src.height);
      this.r.autoClear = false;
      this._pass(this.mUpAdd, this.mips[i]);
      this.r.autoClear = true;
    }

    // the frosted background behind the lesson's holo-board: a plain blur of the whole scene, only while it is used
    const u = this.mComp.uniforms;
    if (fx.blurMix > 0.001) {
      this.mPre.uniforms.tSrc.value = this.scene.texture; this.mPre.uniforms.threshold.value = -1; this.mPre.uniforms.knee.value = 0.0001;
      this.mPre.uniforms.texel.value.set(2 / this.w, 2 / this.h);
      this._pass(this.mPre, this.blurDown[0]);
      for (let i = 1; i < 3; i++) {
        const src = this.blurDown[i - 1];
        this.mDown.uniforms.tSrc.value = src.texture; this.mDown.uniforms.texel.value.set(1 / src.width, 1 / src.height);
        this._pass(this.mDown, this.blurDown[i]);
      }
      this.mUp.uniforms.tSrc.value = this.blurDown[2].texture; this.mUp.uniforms.texel.value.set(0.5 / this.blurDown[2].width, 0.5 / this.blurDown[2].height);
      this._pass(this.mUp, this.blurUp[0]);
      this.mUp.uniforms.tSrc.value = this.blurUp[0].texture; this.mUp.uniforms.texel.value.set(0.5 / this.blurUp[0].width, 0.5 / this.blurUp[0].height);
      this._pass(this.mUp, this.blurUp[1]);
      u.tBlur.value = this.blurUp[1].texture; u.hasBlur.value = 1;
    } else u.hasBlur.value = 0;

    u.tScene.value = this.scene.texture; u.tBloom.value = this.mips[0].texture; u.time.value = time;
    u.exposure.value = fx.exposure; u.bloomK.value = fx.bloom; u.ca.value = fx.ca; u.zoomBlur.value = fx.zoomBlur;
    u.vign.value = fx.vignette; u.grain.value = fx.grain; u.glitch.value = fx.glitch; u.feed.value = fx.feed;
    u.fade.value = fx.fade; u.sat.value = fx.saturation; u.contrast.value = fx.contrast; u.blurMix.value = fx.blurMix;
    u.blurDim.value = fx.blurDim; u.flash.value = fx.flash;
    this._pass(this.mComp, null);
  }
}
