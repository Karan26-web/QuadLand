// ---------------------------------------------------------------------------
// The cockpit (LXD Screen 2): the canopy frame (SVG until GPT's painted frame is
// installed), the dashboard instruments (HTML: they animate), the Ship AI's
// voice waveform, the thrust lever, the DESCEND (hold) and LAUNCH buttons, the
// targeting reticle and the planet marker, the plasma of re-entry.
// ---------------------------------------------------------------------------
import { audio } from '../engine/audio.js';
import { voice } from '../engine/voice.js';
import { clamp, noise1 } from '../engine/util.js';

const $ = (id) => document.getElementById(id);

function frameSVG() {
  // the canopy region, 1600 × 900 (anchored to its bottom edge); the window is the hole
  const win = 'M150 900 C190 640 250 330 330 150 Q345 112 395 108 L1205 108 Q1255 112 1270 150 C1350 330 1410 640 1450 900 Z';
  const rivets = [];
  for (let i = 0; i < 9; i++) { const t = i / 8; rivets.push([62 + t * 150 - t * t * 30, 880 - t * 700], [1538 - t * 150 + t * t * 30, 880 - t * 700]); }
  return `
  <defs>
    <linearGradient id="fr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2257"/><stop offset=".55" stop-color="#11163a"/><stop offset="1" stop-color="#0a0d26"/></linearGradient>
    <linearGradient id="frs" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0a0d26"/><stop offset=".5" stop-color="#232b6a"/><stop offset="1" stop-color="#0a0d26"/></linearGradient>
    <radialGradient id="glare" cx=".5" cy=".1" r=".7"><stop offset="0" stop-color="#8be9ff" stop-opacity=".18"/><stop offset="1" stop-color="#8be9ff" stop-opacity="0"/></radialGradient>
  </defs>
  <path d="M0 0 H1600 V900 H0 Z ${win}" fill="url(#fr)" fill-rule="evenodd"/>
  <path d="${win}" fill="none" stroke="#050616" stroke-width="22"/>
  <path d="${win}" fill="none" stroke="#5a6fd0" stroke-width="5" opacity=".75"/>
  <path d="${win}" fill="none" stroke="#9fd8ff" stroke-width="1.5" opacity=".6" transform="translate(0 4)"/>
  <rect x="640" y="18" width="320" height="66" rx="18" fill="#0b0f2c" stroke="#3d4ea8" stroke-width="3"/>
  <g>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<circle cx="${676 + i * 41}" cy="51" r="8" fill="${['#3dffa2', '#5cf2ff', '#ffb547', '#5cf2ff', '#ff4d6d', '#5cf2ff', '#3dffa2'][i]}"><animate attributeName="opacity" values="1;.35;1" dur="${(1.3 + i * 0.37).toFixed(2)}s" repeatCount="indefinite"/></circle>`).join('')}</g>
  <g fill="#2c3780">${rivets.map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5"/>`).join('')}</g>
  <rect x="34" y="420" width="70" height="150" rx="14" fill="#0b0f2c" stroke="#3d4ea8" stroke-width="3" transform="rotate(-9 69 495)"/>
  <rect x="1496" y="420" width="70" height="150" rx="14" fill="#0b0f2c" stroke="#3d4ea8" stroke-width="3" transform="rotate(9 1531 495)"/>
  <g>${[0, 1, 2].map((i) => `<rect x="${52}" y="${446 + i * 38}" width="34" height="18" rx="5" fill="${['#ffb547', '#5cf2ff', '#3dffa2'][i]}" opacity=".85" transform="rotate(-9 69 495)"/><rect x="${1514}" y="${446 + i * 38}" width="34" height="18" rx="5" fill="${['#5cf2ff', '#ff3ea5', '#ffb547'][i]}" opacity=".85" transform="rotate(9 1531 495)"/>`).join('')}</g>
  <path d="M330 150 Q345 112 395 108 L1205 108 Q1255 112 1270 150" fill="none" stroke="url(#glare)" stroke-width="80" opacity=".5"/>`;
}

export class CockpitUI {
  constructor(G) {
    this.G = G;
    this.el = $('cockpit'); this.shakeEl = this.el.querySelector('.ck-shake');
    this.svg = this.el.querySelector('.ck-svg'); this.svg.innerHTML = frameSVG();
    this.wave = $('ckWave'); this.wctx = this.wave.getContext('2d');
    this.screenEl = this.el.querySelector('.ck-screen'); this.statusEl = $('ckStatus'); this.speedEl = $('ckSpeed'); this.altEl = $('ckAlt');
    this.reticle = this.el.querySelector('.ck-reticle'); this.marker = this.el.querySelector('.ck-marker');
    this.mkBox = this.marker.querySelector('.mk-box'); this.mkArrow = this.marker.querySelector('.mk-arrow');
    this.plasma = this.el.querySelector('.ck-plasma');
    this.lever = $('ckLever'); this.leverFill = this.lever.querySelector('.lv-fill'); this.leverHandle = this.lever.querySelector('.lv-handle'); this.slot = this.lever.querySelector('.lv-slot');
    this.descend = $('ckDescend'); this.launch = $('ckLaunch');
    this.leverV = 0; this.leverOn = false; this.leverDrag = null; this.held = false; this.shakeK = 0; this.t = 0;
    this._initLever(); this._initHold();
    this.unhook = null;
  }
  /** with GPT's painted cockpit (02-cockpit.md) the HTML dashboard follows the painting's dashboard line at any aspect */
  layout() {
    const slot = this.G.art.slot('cockpit');
    if (!this.G.art.has('cockpit')) { document.documentElement.style.removeProperty('--dash-h'); return; }
    const [aw, ah] = slot.size || [2560, 1440], top = slot.dashTop ?? 0.69;
    const k = Math.max(innerWidth / aw, innerHeight / ah);
    document.documentElement.style.setProperty('--dash-h', `${Math.round((1 - top) * ah * k)}px`);
  }
  show(on = true) {
    if (on) { this.layout(); if (!this._lay) { this._lay = () => this.layout(); addEventListener('resize', this._lay); } }
    this.el.hidden = !on; document.body.classList.toggle('cockpit-on', on);
    if (on && !this.unhook) this.unhook = this.G.onFrame((dt, ui) => this._frame(ui));
    if (!on && this.unhook) { this.unhook(); this.unhook = null; }
  }
  status(t) { this.statusEl.textContent = t; }
  speed(v) { this.speedEl.textContent = v; }
  alt(v) { this.altEl.textContent = v; }
  plasmaK(k) { this.plasma.style.opacity = clamp(k, 0, 1).toFixed(3); this.plasma.classList.toggle('on', k > 0.02); }

  /* ------------------------------------------------ the voice waveform */
  _frame(ui) {
    this.t += ui;
    const c = this.wctx, W = this.wave.width, H = this.wave.height;
    c.clearRect(0, 0, W, H);
    const talking = voice.talking, data = talking ? voice.wave() : null;
    this.screenEl.classList.toggle('talking', talking);
    const pts = [];
    for (let i = 0; i <= 96; i++) {
      const x = (i / 96) * W;
      let y;
      if (data) { const k = Math.floor((i / 96) * (data.length - 1)); y = (data[k] - 128) / 128 * 2.4; }
      else y = Math.sin(i * 0.25 + this.t * 3) * 0.05 + noise1(i * 0.3 + this.t * 2) * 0.03;
      const env = Math.sin((i / 96) * Math.PI);
      pts.push([x, H / 2 + clamp(y, -1, 1) * env * H * 0.42]);
    }
    const line = (w, a) => { c.beginPath(); pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y))); c.lineWidth = w; c.strokeStyle = `rgba(92,242,255,${a})`; c.stroke(); };
    c.lineJoin = 'round'; line(10, 0.12); line(5, 0.25); line(2.2, 0.95);
    // the cockpit's shake, as a hand on the frame
    const k = this.shakeK + this.G.director.trauma * this.G.director.trauma * 1.2;
    if (k > 0.001) {
      const s = k * 10, r = k * 0.6;
      this.shakeEl.style.transform = `translate(${(noise1(this.t * 18) * s).toFixed(2)}px, ${(noise1(this.t * 18 + 50) * s).toFixed(2)}px) rotate(${(noise1(this.t * 14 + 9) * r).toFixed(3)}deg) scale(1.025)`;
    } else this.shakeEl.style.transform = '';
  }

  /* ------------------------------------------------- reticle + marker */
  showReticle(on) { this.reticle.hidden = !on; this.marker.hidden = !on; if (!on) this.reticle.classList.remove('locked', 'near'); }
  lockState(s) { this.reticle.classList.toggle('near', s === 'near'); this.reticle.classList.toggle('locked', s === 'locked'); }
  /** where the target is on screen (px), whether it is in front; an arrow at the canopy's edge when it is off the glass */
  placeMarker(x, y, front, show = true) {
    const r = this.el.querySelector('.ck-canopy').getBoundingClientRect();
    if (!show) { this.marker.hidden = true; return; }
    this.marker.hidden = false;
    const cx = r.left + r.width / 2, cy = r.top + r.height * 0.46, pad = 46;
    let inside = front && x > r.left + pad && x < r.right - pad && y > r.top + pad && y < r.bottom - pad;
    if (inside) {
      this.mkBox.hidden = false; this.mkArrow.hidden = true; this.marker.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    } else {
      let dx = x - cx, dy = y - cy; if (!front) { dx = -dx; dy = -dy; }
      const a = Math.atan2(dy, dx), hw = r.width / 2 - pad, hh = r.height / 2 - pad;
      const k = Math.min(hw / Math.abs(Math.cos(a) || 1e-3), hh / Math.abs(Math.sin(a) || 1e-3));
      const ex = cx + Math.cos(a) * k, ey = cy + Math.sin(a) * k;
      this.mkBox.hidden = true; this.mkArrow.hidden = false;
      this.marker.style.transform = `translate(${ex.toFixed(1)}px, ${ey.toFixed(1)}px)`;
      this.mkArrow.style.transform = `rotate(${a}rad)`;
    }
  }

  /* --------------------------------------------------------- the lever */
  _initLever() {
    const set = (v, sound = true) => {
      v = clamp(v, 0, 1);
      if (Math.floor(v * 5) !== Math.floor(this.leverV * 5) && sound) audio.play('ck.lever', { minGap: 0.05 });
      this.leverV = v;
      this.leverFill.style.height = `calc(${(v * 100).toFixed(1)}% - ${v * 12}px)`;
      this.leverHandle.style.bottom = `${(v * 100).toFixed(1)}%`;
      this.lever.setAttribute('aria-valuenow', String(Math.round(v * 100)));
      if (this.onLever) this.onLever(v);
    };
    this._setLever = set;
    const fromEvent = (e) => { const r = this.slot.getBoundingClientRect(); return 1 - (e.clientY - r.top) / r.height; };
    this.lever.addEventListener('pointerdown', (e) => {
      if (!this.leverOn) return; e.preventDefault(); this.lever.setPointerCapture(e.pointerId);
      this.leverDrag = { id: e.pointerId, start: fromEvent(e), v0: this.leverV, moved: false }; this.lever.classList.remove('ready');
    });
    this.lever.addEventListener('pointermove', (e) => { const d = this.leverDrag; if (!d || e.pointerId !== d.id) return; const v = d.v0 + (fromEvent(e) - d.start) * 1.15; if (Math.abs(v - d.v0) > 0.02) d.moved = true; set(v); });
    const up = (e) => {
      const d = this.leverDrag; if (!d || e.pointerId !== d.id) return; this.leverDrag = null;
      if (!d.moved) this._leverTap();                       // a tap pushes it the rest of the way (no child is stuck on a drag)
      else if (this.leverV < 0.97 && this.leverOn) this.lever.classList.add('ready');
    };
    this.lever.addEventListener('pointerup', up); this.lever.addEventListener('pointercancel', up);
    addEventListener('keydown', (e) => {
      if (!this.leverOn) return;
      if (e.code === 'ArrowUp' || e.code === 'KeyW') { e.preventDefault(); set(this.leverV + 0.12); this.lever.classList.remove('ready'); }
      if (e.code === 'ArrowDown' || e.code === 'KeyS') { e.preventDefault(); set(this.leverV - 0.12); }
      if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); this._leverTap(); }
    });
  }
  _leverTap() {
    if (!this.leverOn || this._tapping) return; this._tapping = true; this.lever.classList.remove('ready');
    const from = this.leverV, t0 = performance.now();
    const step = (now) => { const k = Math.min(1, (now - t0) / 650); this._setLever(from + (1 - from) * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); else this._tapping = false; };
    requestAnimationFrame(step);
  }
  leverEnable(on) { this.leverOn = on; this.lever.classList.toggle('off', !on); this.lever.classList.toggle('ready', on && this.leverV < 0.97); }
  leverReset() { this._setLever(0, false); this.lever.classList.remove('done'); }
  leverDone() { this.lever.classList.add('done'); this.lever.classList.remove('ready'); }

  /* -------------------------------------------- DESCEND (hold) + LAUNCH */
  _initHold() {
    const b = this.descend;
    const on = (e) => { if (b.hidden) return; if (e) e.preventDefault(); if (!this.held) { this.held = true; b.classList.add('held'); b.classList.remove('ready'); audio.play('ck.button'); } };
    const off = () => { if (this.held) { this.held = false; b.classList.remove('held'); } };
    b.addEventListener('pointerdown', (e) => { b.setPointerCapture(e.pointerId); on(e); });
    b.addEventListener('pointerup', off); b.addEventListener('pointercancel', off); b.addEventListener('lostpointercapture', off);
    addEventListener('keydown', (e) => { if ((e.code === 'Space' || e.code === 'Enter') && !b.hidden && !e.repeat) { e.preventDefault(); on(); } });
    addEventListener('keyup', (e) => { if (e.code === 'Space' || e.code === 'Enter') off(); });
  }
  showDescend(on) { this.descend.hidden = !on; if (on) { this.descend.classList.add('ready'); audio.play('ck.rise'); } else { this.held = false; this.descend.classList.remove('held'); } }
  /** LAUNCH rises into place; resolves when it is pressed */
  async showLaunch() {
    this.launch.hidden = false; this.launch.classList.remove('launched'); audio.play('ck.rise');
    await new Promise((r) => setTimeout(r, 700));
    this.launch.classList.add('ready');
    return new Promise((resolve) => {
      const go = (e) => { if (e) e.preventDefault(); cleanup(); this.launch.classList.remove('ready'); this.launch.classList.add('launched'); audio.play('ck.button'); resolve(true); };
      const key = (e) => { if (e.code === 'Space' || e.code === 'Enter') go(e); };
      const cleanup = () => { this.launch.removeEventListener('click', go); removeEventListener('keydown', key); };
      this.launch.addEventListener('click', go); addEventListener('keydown', key);
      this._cancelLaunch = () => { cleanup(); resolve(false); };
    });
  }
  hideLaunch() { this.launch.hidden = true; if (this._cancelLaunch) { this._cancelLaunch(); this._cancelLaunch = null; } }
  reset() { this.leverReset(); this.leverEnable(false); this.showDescend(false); this.launch.hidden = true; this.showReticle(false); this.plasmaK(0); this.status('CRUISING'); this.speed('0.4'); this.alt('——'); }
}
