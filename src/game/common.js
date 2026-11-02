// ---------------------------------------------------------------------------
// Helpers every screen shares: narration inside a script, fades, world swaps.
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { tweens, uiTweens } from '../engine/tween.js';
import { Ease } from '../engine/util.js';

export const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);

/** a line of narration; the script waits for it (and stops it if the script is killed) */
export async function say(s, G, id, { after = 0.25 } = {}) {
  s.check();
  const ok = await s.run(G.voice.say(id)).catch((e) => { G.voice.stop(); throw e; });
  if (after) await s.wait(after);
  return ok;
}
/** tween a post effect knob (game time unless real) */
export function fx(G, key, to, dur = 0.6, { ease = Ease.inOutCubic, real = false } = {}) {
  const from = G.post.fx[key], mgr = real ? uiTweens : tweens;
  return mgr.add({ duration: dur, ease, onUpdate: (e) => { G.post.fx[key] = from + (to - from) * e; } }).promise;
}
export const fadeOut = (G, dur = 0.6, color = 0x000000) => { G.post.fx.fadeColor.set(color); return fx(G, 'fade', 1, dur, { real: true }); };
export const fadeIn = (G, dur = 0.8) => fx(G, 'fade', 0, dur, { real: true });

/** the camera straight down over a stretch of ground (minX…maxX, minZ…maxZ at height y), framed with room round it;
    on a portrait screen it turns a quarter, so the long side runs down the screen */
export function topView(G, { minX, maxX, minZ, maxZ, y = 0 }, { fov = 40, margin = 0.16 } = {}) {
  const aspect = G.camera.aspect, tv = Math.tan((fov * Math.PI) / 360), th = tv * aspect;
  const w = maxX - minX, dz = maxZ - minZ, turn = aspect < 1 && w > dz;
  const across = turn ? dz : w, down = turn ? w : dz;
  const h = Math.max(across / 2 / (th * (1 - margin)), down / 2 / (tv * (1 - margin)));
  const cx = (minX + maxX) / 2, cz = (minZ + maxZ) / 2;
  // a hair off vertical, so "up the screen" is well defined (away from the viewer: -z)
  return { pos: V(cx, y + h, cz + h * 0.012), target: V(cx, y, cz), fov, roll: turn ? Math.PI / 2 : 0 };
}

/** reset the post knobs a screen may have left behind */
export function cleanFx(G) {
  const f = G.post.fx;
  Object.assign(f, { zoomBlur: 0, ca: 0, glitch: 0, feed: 0, flash: 0, blurMix: 0, exposure: 1, saturation: 1.06, contrast: 1.04, bloom: 0.55, threshold: 0.9, vignette: 0.32 });
  f.tint.set(1, 1, 1); f.lift.set(0, 0, 0);
}
