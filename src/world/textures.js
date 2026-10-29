// ---------------------------------------------------------------------------
// Procedural textures: every one is a stand-in that the GPT art (assets/img,
// see docs/assets) replaces when it is installed, so the game always plays.
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { mulberry32 } from '../engine/util.js';
import { bounds, inset } from './shapes.js';
import { art } from '../engine/assets.js';

const cache = new Map();
function canvas(w, h = w) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function tex(c, { srgb = true, repeat = false } = {}) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
  t.anisotropy = 4;
  return t;
}
const once = (key, fn) => { if (!cache.has(key)) cache.set(key, fn()); return cache.get(key); };
/** a GPT picture for this slot if one is installed (docs/assets), else the procedural stand-in */
const painted = (slot, fn, opts) => { const t = art.texture(slot, opts); return t || fn(); };

/* ------------------------------------------------------------ tileable noise */
function makeNoise(period, seed) {
  const r = mulberry32(seed), g = new Float32Array(period * period);
  for (let i = 0; i < g.length; i++) g[i] = r();
  return (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const i0 = ((xi % period) + period) % period, j0 = ((yi % period) + period) % period;
    const i1 = (i0 + 1) % period, j1 = (j0 + 1) % period;
    const a = g[j0 * period + i0], b = g[j0 * period + i1], c = g[j1 * period + i0], d = g[j1 * period + i1];
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
}
/** fbm in [0,1], seamless over the canvas: octave o has period base·2^o lattice cells across */
function fbmField(size, base, octaves, seed) {
  const out = new Float32Array(size * size), fields = [];
  for (let o = 0; o < octaves; o++) fields.push(makeNoise(base << o, seed + o * 101));
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    let s = 0, a = 0.5, n = 0;
    for (let o = 0; o < octaves; o++) { const p = base << o; s += a * fields[o]((x / size) * p, (y / size) * p); n += a; a *= 0.5; }
    out[y * size + x] = s / n;
  }
  return out;
}

export const Tex = {
  glow: () => once('glow', () => {
    const c = canvas(128), g = c.getContext('2d'), gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.18, 'rgba(255,255,255,0.75)');
    gr.addColorStop(0.45, 'rgba(255,255,255,0.18)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128); return tex(c);
  }),
  /** a four-pointed star glint (stars, beacons, the sun) */
  glint: () => once('glint', () => {
    const c = canvas(256), g = c.getContext('2d');
    const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.08, 'rgba(255,255,255,0.8)'); gr.addColorStop(0.3, 'rgba(255,255,255,0.08)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
    g.globalCompositeOperation = 'lighter';
    for (const [w, h] of [[256, 5], [5, 256]]) {
      const lg = g.createLinearGradient(128 - w / 2, 128 - h / 2, 128 + w / 2, 128 + h / 2);
      lg.addColorStop(0, 'rgba(255,255,255,0)'); lg.addColorStop(0.5, 'rgba(255,255,255,0.9)'); lg.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = lg; g.fillRect(128 - w / 2, 128 - h / 2, w, h);
    }
    return tex(c);
  }),
  softDot: () => once('dot', () => {
    const c = canvas(64), g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.5, 'rgba(255,255,255,0.5)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return tex(c);
  }),
  smoke: () => once('smoke', () => painted('smoke', () => {
    const S = 128, c = canvas(S), g = c.getContext('2d'), img = g.createImageData(S, S), f = fbmField(S, 4, 4, 7);
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const dx = (x - S / 2) / (S / 2), dy = (y - S / 2) / (S / 2), r = Math.sqrt(dx * dx + dy * dy);
      const n = f[y * S + x], a = Math.max(0, 1 - r * (1.15 - n * 0.5)) ** 1.6;
      const i = (y * S + x) * 4; img.data[i] = img.data[i + 1] = img.data[i + 2] = 200 + n * 55; img.data[i + 3] = a * 255;
    }
    g.putImageData(img, 0, 0); return tex(c);
  })),
  spark: () => once('spark', () => painted('spark', () => {
    const c = canvas(64, 16), g = c.getContext('2d'), gr = g.createLinearGradient(0, 0, 64, 0);
    gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.7, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.beginPath(); g.ellipse(32, 8, 32, 5, 0, 0, Math.PI * 2); g.fill(); return tex(c);
  })),
  /** a clump of droplets (spray, splashes) */
  splash: () => once('splash', () => painted('splash', () => {
    const S = 128, c = canvas(S), g = c.getContext('2d'), r = mulberry32(5);
    for (let i = 0; i < 26; i++) {
      const a = r() * Math.PI * 2, d = Math.pow(r(), 0.7) * 50, x = 64 + Math.cos(a) * d, y = 64 + Math.sin(a) * d, s = 3 + r() * 9 * (1 - d / 60);
      const gr = g.createRadialGradient(x, y, 0, x, y, s); gr.addColorStop(0, 'rgba(255,255,255,0.95)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = gr; g.beginPath(); g.arc(x, y, s, 0, Math.PI * 2); g.fill();
    }
    return tex(c);
  })),
  ring: () => once('ring', () => {
    const c = canvas(256), g = c.getContext('2d');
    g.strokeStyle = 'rgba(255,255,255,1)'; g.lineWidth = 10; g.shadowColor = 'white'; g.shadowBlur = 18;
    g.beginPath(); g.arc(128, 128, 108, 0, Math.PI * 2); g.stroke(); return tex(c);
  }),
  /** a seamless value-noise field (foam, clouds, plasma) */
  noise: () => once('noise', () => {
    const S = 256, c = canvas(S), g = c.getContext('2d'), img = g.createImageData(S, S);
    const a = fbmField(S, 4, 5, 11), b = fbmField(S, 8, 4, 23), d = fbmField(S, 16, 3, 37);
    for (let i = 0; i < S * S; i++) { const k = i * 4; img.data[k] = a[i] * 255; img.data[k + 1] = b[i] * 255; img.data[k + 2] = d[i] * 255; img.data[k + 3] = 255; }
    g.putImageData(img, 0, 0); return tex(c, { srgb: false, repeat: true });
  }),
  /** small ripples for the sea's surface: a sum of sines with whole periods across the tile, so it tiles */
  waterNormal: () => once('wn', () => {
    const S = 256, c = canvas(S), g = c.getContext('2d'), img = g.createImageData(S, S), r = mulberry32(99);
    const waves = Array.from({ length: 22 }, () => {
      const fx = Math.round((r() * 2 - 1) * 9), fy = Math.round((r() * 2 - 1) * 9) || 1;
      return { fx, fy, a: 1 / Math.pow(Math.hypot(fx, fy), 0.9), ph: r() * Math.PI * 2 };
    });
    const h = new Float32Array(S * S);
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      let s = 0; for (const w of waves) s += w.a * Math.sin(((x * w.fx + y * w.fy) / S) * Math.PI * 2 + w.ph);
      h[y * S + x] = s;
    }
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const l = h[y * S + ((x - 1 + S) % S)], rr = h[y * S + ((x + 1) % S)], u = h[((y - 1 + S) % S) * S + x], d = h[((y + 1) % S) * S + x];
      let nx = (l - rr) * 4.5, ny = (u - d) * 4.5, nz = 1; const m = Math.hypot(nx, ny, nz); nx /= m; ny /= m; nz /= m;
      const k = (y * S + x) * 4; img.data[k] = (nx * 0.5 + 0.5) * 255; img.data[k + 1] = (ny * 0.5 + 0.5) * 255; img.data[k + 2] = (nz * 0.5 + 0.5) * 255; img.data[k + 3] = 255;
    }
    g.putImageData(img, 0, 0); return tex(c, { srgb: false, repeat: true });
  }),
  /** violet slate with strata: the islands' sides (tileable) */
  rock: () => once('rock', () => {
    const S = 512, c = canvas(S), g = c.getContext('2d'), img = g.createImageData(S, S);
    const f = fbmField(S, 6, 5, 3), s2 = fbmField(S, 3, 3, 17);
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const i = y * S + x, n = f[i], strata = 0.5 + 0.5 * Math.sin((y / S) * Math.PI * 2 * 9 + s2[i] * 7);
      const v = 0.28 + n * 0.5 + strata * 0.12, crack = n < 0.33 ? 0.55 : 1;
      const k = i * 4;
      img.data[k] = (58 + v * 70) * crack; img.data[k + 1] = (44 + v * 50) * crack; img.data[k + 2] = (82 + v * 95) * crack; img.data[k + 3] = 255;
    }
    g.putImageData(img, 0, 0); return tex(c, { repeat: true });
  }),
  /** the alien landing plate: polished stone tiles with fine cyan inlay (tileable) */
  pad: () => once('pad', () => {
    const S = 512, c = canvas(S), g = c.getContext('2d'), img = g.createImageData(S, S), f = fbmField(S, 8, 4, 41);
    for (let i = 0; i < S * S; i++) { const v = 0.55 + f[i] * 0.35, k = i * 4; img.data[k] = 120 * v + 30; img.data[k + 1] = 112 * v + 30; img.data[k + 2] = 160 * v + 40; img.data[k + 3] = 255; }
    g.putImageData(img, 0, 0);
    g.strokeStyle = 'rgba(20, 12, 40, 0.55)'; g.lineWidth = 3;
    for (let i = 0; i <= 4; i++) { g.beginPath(); g.moveTo(0, (i * S) / 4); g.lineTo(S, (i * S) / 4); g.stroke(); g.beginPath(); g.moveTo((i * S) / 4, 0); g.lineTo((i * S) / 4, S); g.stroke(); }
    g.strokeStyle = 'rgba(120, 240, 255, 0.35)'; g.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { g.strokeRect(i * 128 + 10, j * 128 + 10, 108, 108); }
    return tex(c, { repeat: true });
  }),
  /** the top of a ship's hull, drawn to its exact polygon (accent stripe, panel lines, vents) */
  hull(shape) {
    return once('hull-' + shape.key, () => {
      const b = bounds(shape.verts), PX = 96, W = Math.ceil(b.w * PX) + 8, H = Math.ceil(b.h * PX) + 8;
      const c = canvas(W, H), g = c.getContext('2d');
      const X = (p) => (p.x - b.minX) * PX + 4, Y = (p) => (b.maxY - p.y) * PX + 4;
      const poly = (pts) => { g.beginPath(); pts.forEach((p, i) => (i ? g.lineTo(X(p), Y(p)) : g.moveTo(X(p), Y(p)))); g.closePath(); };
      g.fillStyle = '#eef2f8'; g.fillRect(0, 0, W, H);
      const grd = g.createLinearGradient(0, 0, 0, H); grd.addColorStop(0, 'rgba(255,255,255,0.6)'); grd.addColorStop(1, 'rgba(150,170,200,0.25)');
      g.fillStyle = grd; g.fillRect(0, 0, W, H);
      const acc = '#' + shape.accent.toString(16).padStart(6, '0');
      g.lineJoin = 'round';
      poly(inset(shape.verts, 0.32)); g.strokeStyle = acc; g.lineWidth = 0.16 * PX; g.stroke();
      poly(inset(shape.verts, 0.62)); g.strokeStyle = 'rgba(70, 86, 120, 0.55)'; g.lineWidth = 3; g.stroke();
      poly(inset(shape.verts, 1.25)); g.strokeStyle = 'rgba(70, 86, 120, 0.35)'; g.lineWidth = 2; g.setLineDash([18, 10]); g.stroke(); g.setLineDash([]);
      // panel seams
      g.strokeStyle = 'rgba(90, 104, 140, 0.28)'; g.lineWidth = 2;
      for (let x = Math.ceil(b.minX); x <= b.maxX; x += 1.5) { g.beginPath(); g.moveTo(X({ x }), 0); g.lineTo(X({ x }), H); g.stroke(); }
      for (let y = Math.ceil(b.minY); y <= b.maxY; y += 1.8) { g.beginPath(); g.moveTo(0, Y({ y })); g.lineTo(W, Y({ y })); g.stroke(); }
      // vents beside the canopy
      g.fillStyle = 'rgba(40, 50, 80, 0.5)';
      for (let i = 0; i < 4; i++) { g.fillRect(X({ x: -1.6 }) , Y({ y: -0.4 - i * 0.28 }), 0.5 * PX, 0.1 * PX); g.fillRect(X({ x: 1.1 }), Y({ y: -0.4 - i * 0.28 }), 0.5 * PX, 0.1 * PX); }
      const t = tex(c);
      t.repeat.set(1 / ((W / PX)), 1 / ((H / PX))); t.offset.set(-(b.minX - 4 / PX) / (W / PX), -(b.minY - 4 / PX) / (H / PX));
      return t;
    });
  },
  /** soft cloud puff (atmospheric entry, the planet's cloud deck) */
  cloud: () => once('cloud', () => painted('cloud', () => {
    const S = 256, c = canvas(S), g = c.getContext('2d'), img = g.createImageData(S, S), f = fbmField(S, 4, 5, 77);
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const dx = (x - S / 2) / (S / 2), dy = (y - S / 2) / (S / 2), r = Math.sqrt(dx * dx + dy * dy * 1.6);
      const n = f[y * S + x], a = Math.max(0, Math.min(1, (n - 0.35 + (1 - r) * 0.7) * 1.8)) * Math.max(0, 1 - r);
      const k = (y * S + x) * 4; img.data[k] = img.data[k + 1] = img.data[k + 2] = 235 + n * 20; img.data[k + 3] = a * 255;
    }
    g.putImageData(img, 0, 0); return tex(c);
  })),
};
