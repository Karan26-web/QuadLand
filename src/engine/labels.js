// ---------------------------------------------------------------------------
// World-anchored HTML labels: island areas, the ship's dimensions, the rules in
// the finale. HTML stays crisp at any size and is styled with the rest of the UI.
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';

export class LabelLayer {
  constructor(container, camera) {
    this.container = container; this.camera = camera; this.items = new Map(); this._v = new THREE.Vector3();
  }
  /** worldPos: Vector3 or () => Vector3. offset: px. anchor: 'center' | 'bottom' (the label sits above its point) */
  add(id, html, { className = '', worldPos, offset = [0, 0], anchor = 'center', clamp = false } = {}) {
    this.remove(id);
    const el = document.createElement('div');
    el.className = 'wlabel ' + className; el.innerHTML = html;
    this.container.appendChild(el);
    this.items.set(id, { el, worldPos, offset, anchor, clamp });
    requestAnimationFrame(() => el.classList.add('in'));
    this._place(this.items.get(id));
    return el;
  }
  get(id) { const it = this.items.get(id); return it ? it.el : null; }
  set(id, html) { const el = this.get(id); if (el) el.innerHTML = html; }
  cls(id, name, on) { const el = this.get(id); if (el) el.firstElementChild ? el.firstElementChild.classList.toggle(name, on) : el.classList.toggle(name, on); }
  remove(id, fade = false) {
    const it = this.items.get(id); if (!it) return;
    this.items.delete(id);
    if (fade) { it.el.classList.remove('in'); it.el.classList.add('out'); setTimeout(() => it.el.remove(), 400); } else it.el.remove();
  }
  clear(fade = false) { for (const id of [...this.items.keys()]) this.remove(id, fade); }
  _place(it) {
    const w = this.container.clientWidth || innerWidth, h = this.container.clientHeight || innerHeight;
    const p = typeof it.worldPos === 'function' ? it.worldPos() : it.worldPos;
    this._v.copy(p).project(this.camera);
    const behind = this._v.z > 1 || this._v.z < -1;
    let x = (this._v.x * 0.5 + 0.5) * w + it.offset[0], y = (-this._v.y * 0.5 + 0.5) * h + it.offset[1];
    if (it.clamp) { const ew = it.el.offsetWidth / 2 + 8, eh = it.el.offsetHeight / 2 + 8; x = Math.max(ew, Math.min(w - ew, x)); y = Math.max(eh + 60, Math.min(h - eh, y)); }
    const ty = it.anchor === 'bottom' ? '-100%' : '-50%';
    it.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, ${ty})`;
    it.el.style.visibility = behind ? 'hidden' : 'visible';
  }
  update() { for (const it of this.items.values()) this._place(it); }
}
