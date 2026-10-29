// ---------------------------------------------------------------------------
// Input: the on-screen stick (touch or mouse; a press anywhere in its corner
// brings the stick under the thumb), W A S D / the arrow keys, and named key
// actions (confirm = Enter / Space, back = Esc, mute = M).
// read() → { x, y, mag }: x to the right, y up the screen, mag 0..1.
// ---------------------------------------------------------------------------
const DEAD = 0.12;
const KEYS = { KeyW: [0, 1], ArrowUp: [0, 1], KeyS: [0, -1], ArrowDown: [0, -1], KeyA: [-1, 0], ArrowLeft: [-1, 0], KeyD: [1, 0], ArrowRight: [1, 0] };
const ACTIONS = { Enter: 'confirm', NumpadEnter: 'confirm', Space: 'confirm', Escape: 'back', KeyM: 'mute', KeyP: 'back' };
const ZERO = Object.freeze({ x: 0, y: 0, mag: 0 });

export const input = {
  on: false, keys: new Set(), stick: { x: 0, y: 0, id: null }, el: null, base: null, knob: null,
  auto: null, R: 48, rest: { x: 100, y: 100 }, center: { x: 100, y: 100 }, handlers: new Map(), used: false, onFirstMove: null,

  init() {
    const el = (this.el = document.getElementById('joystick'));
    this.base = el.querySelector('.js-base'); this.knob = el.querySelector('.js-knob');
    window.addEventListener('keydown', (e) => {
      if (e.repeat && ACTIONS[e.code]) return;
      if (KEYS[e.code]) {
        if (this.on) e.preventDefault();
        this.keys.add(e.code);
        if (this.on) this._used();
      }
      const a = ACTIONS[e.code];
      if (a) { if (a === 'confirm' && document.activeElement && document.activeElement.tagName === 'BUTTON') document.activeElement.blur(); this.emit(a, e); }
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => { this.keys.clear(); this.release(); });
    el.addEventListener('pointerdown', (e) => {
      if (!this.on || this.stick.id != null) return;
      e.preventDefault(); el.setPointerCapture(e.pointerId);
      const p = this.local(e), near = Math.hypot(p.x - this.rest.x, p.y - this.rest.y) < 90;
      this.center = near ? { ...this.rest } : p;
      this.placeBase(this.center); this.stick.id = e.pointerId; el.classList.add('held'); this._used(); this.drag(p);
    });
    el.addEventListener('pointermove', (e) => { if (e.pointerId === this.stick.id) this.drag(this.local(e)); });
    const up = (e) => { if (e.pointerId === this.stick.id) this.release(); };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    window.addEventListener('resize', () => this.layout()); this.layout();
  },
  _used() { this.demo(false); if (!this.used) { this.used = true; if (this.onFirstMove) this.onFirstMove(); } },
  local(e) { const r = this.el.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; },
  drag(p) {
    let dx = p.x - this.center.x, dy = p.y - this.center.y; const m = Math.hypot(dx, dy);
    if (m > this.R) { dx *= this.R / m; dy *= this.R / m; }
    this.stick.x = dx / this.R; this.stick.y = -dy / this.R;
    this.knob.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
  },
  release() {
    this.stick.id = null; this.stick.x = this.stick.y = 0;
    if (!this.el) return;
    this.knob.style.transform = ''; this.el.classList.remove('held'); this.placeBase(this.rest);
  },
  layout() {
    if (!this.el) return;
    const h = this.el.clientHeight, s = window.innerHeight < 520 ? 18 : 30;
    this.rest = { x: s + 70, y: h - s - 70 };
    if (this.stick.id == null) this.placeBase(this.rest);
  },
  placeBase(c) { this.base.style.left = `${c.x}px`; this.base.style.top = `${c.y}px`; },
  enable(on) {
    if (this.on === on) return;
    this.on = on; this.release(); if (!on) this.demo(false);
    if (this.el) this.el.classList.toggle('on', on);
  },
  reveal({ demo = false } = {}) {
    if (!this.el) return;
    this.el.classList.remove('reveal'); void this.el.offsetWidth; this.el.classList.add('reveal');
    this.demo(demo);
  },
  demo(on) { if (this.el) this.el.classList.toggle('demo', on); },
  read() {
    if (!this.on) return ZERO;
    if (this.auto) { const m = Math.min(1, Math.hypot(this.auto.x, this.auto.y)); return m < 0.02 ? ZERO : { x: this.auto.x / Math.max(m, 1e-6) * m, y: this.auto.y / Math.max(m, 1e-6) * m, mag: m }; }
    if (this.stick.id != null) {
      const m = Math.hypot(this.stick.x, this.stick.y);
      if (m <= DEAD) return ZERO;
      const k = Math.min(1, (m - DEAD) / (1 - DEAD));
      return { x: (this.stick.x / m) * k, y: (this.stick.y / m) * k, mag: k };
    }
    let x = 0, y = 0;
    for (const c of this.keys) { const k = KEYS[c]; x += k[0]; y += k[1]; }
    const m = Math.hypot(x, y);
    return m ? { x: x / m, y: y / m, mag: 1 } : ZERO;
  },
  /** named actions: on('confirm', fn) → off() */
  on_(name, fn) { if (!this.handlers.has(name)) this.handlers.set(name, new Set()); this.handlers.get(name).add(fn); return () => this.handlers.get(name).delete(fn); },
  emit(name, e) { const set = this.handlers.get(name); if (set) for (const fn of [...set]) fn(e); },
};
