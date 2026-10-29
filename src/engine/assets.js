// ---------------------------------------------------------------------------
// The GPT art. assets/art.json lists every slot (docs/assets/*.md says what to
// paint for each); tools/install_art.py processes a delivered PNG into its slot
// and marks it installed. Only installed slots are fetched, so a missing picture
// is never a 404 and never a blocker: the procedural stand-in stays.
// art.apply(G) swaps each installed picture into the worlds and the UI.
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';

const BASE = './assets/';

function loadImage(url) {
  return new Promise((res, rej) => {
    const im = new Image(); im.decoding = 'async';
    const t = setTimeout(() => rej(new Error('timeout')), 30000);
    im.onload = () => Promise.resolve(im.decode && im.decode().catch(() => {})).then(() => { clearTimeout(t); res(im); });
    im.onerror = () => { clearTimeout(t); rej(new Error('load')); };
    im.src = url;
  });
}

export const art = {
  manifest: { slots: {} }, images: new Map(), version: 1,
  async load(onProgress = () => {}) {
    try { this.manifest = await fetch(BASE + 'art.json', { cache: 'no-cache' }).then((r) => r.json()); } catch { onProgress(1); return; }
    this.version = this.manifest.version || 1;
    const slots = Object.entries(this.manifest.slots || {}).filter(([, s]) => s.installed);
    let done = 0;
    if (!slots.length) { onProgress(1); return; }
    await Promise.all(slots.map(async ([key, s]) => {
      try { this.images.set(key, await loadImage(`${BASE}${s.file}?v=${this.version}`)); } catch (e) { console.warn('[art] stand-in kept for', key, e.message); }
      onProgress(++done / slots.length);
    }));
  },
  has(key) { return this.images.has(key); },
  slot(key) { return (this.manifest.slots || {})[key] || {}; },
  url(key) { const s = this.slot(key); return s.file ? `${BASE}${s.file}?v=${this.version}` : null; },
  texture(key, { repeat = false, srgb = true } = {}) {
    const im = this.images.get(key); if (!im) return null;
    const t = new THREE.Texture(im); t.needsUpdate = true; t.anisotropy = 8;
    t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  },
  /** put every installed picture where it belongs */
  apply(G) {
    const P = G.planet, S = G.space;
    const swapMap = (mat, tex, rep) => { if (!tex) return; const r = mat.map ? mat.map.repeat.clone() : null; mat.map = tex; if (rep) tex.repeat.copy(rep); else if (r) tex.repeat.copy(r); mat.needsUpdate = true; };
    if (this.has('rock')) { const t = this.texture('rock', { repeat: true }); for (const isl of P.allIslands) swapMap(isl.rockMat, t); }
    if (this.has('pad')) { const t = this.texture('pad', { repeat: true }); for (const isl of P.allIslands) { swapMap(isl.padMat, t, new THREE.Vector2(0.26, 0.26)); isl.padMat.emissiveMap = this.has('pad_glow') ? this.texture('pad_glow', { repeat: true }) : t; isl.padMat.emissiveMap.repeat.set(0.26, 0.26); } }
    if (this.has('hull_plating')) {
      const t = this.texture('hull_plating', { repeat: true }); t.repeat.set(0.22, 0.22);
      for (const sh of [...P.ships, ...S.fleet]) { sh.materials[1].map = t; sh.materials[1].color.set(0xffffff); sh.materials[1].needsUpdate = true; }
    }
    for (let i = 1; i <= 4; i++) {
      const key = `nebula_${i}`; if (!this.has(key)) continue;
      const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.texture(key), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.85 }));
      const dirs = [[-0.6, 0.35, -1], [1, 0.6, -0.7], [-1, -0.2, 0.4], [0.3, -0.5, 1]][i - 1];
      m.position.set(...dirs).normalize().multiplyScalar(14000); m.scale.set(12000, 6600, 1); m.renderOrder = -5;
      S.scene.add(m);
    }
    if (this.has('logo')) { const img = document.querySelector('.tt-art'); img.src = this.url('logo'); img.hidden = false; document.querySelector('.tt-text').hidden = true; }
    if (this.has('cockpit')) { const img = document.querySelector('.ck-art'); img.src = this.url('cockpit'); img.hidden = false; document.body.classList.add('ck-painted'); }
  },
};
