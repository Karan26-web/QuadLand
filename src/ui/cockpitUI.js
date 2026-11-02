// ---------------------------------------------------------------------------
// The cockpit (LXD Screen 2): the canopy frame and the console (SVG drawn at the
// screen's real size, until GPT's painted cockpit is installed), the instruments
// (HTML: they animate) in three modules: SPEED and THRUST, the Ship AI's screen
// and its voice waveform, ALTITUDE and the radar socket that DESCEND (hold) and
// LAUNCH rise into; the targeting reticle, the planet marker, re-entry plasma.
// ---------------------------------------------------------------------------
import { audio } from '../engine/audio.js';
import { voice } from '../engine/voice.js';
import { clamp, noise1 } from '../engine/util.js';

const $ = (id) => document.getElementById(id);

/* ------------------------------------------------------------------ the shell
   Drawn at the screen's real size, not a stretched picture: the pillars hug the screen's sides and the top beam its
   top, and the console's bezels wrap the instruments wherever the layout puts them. Proportions follow the cockpit
   reference (1672 × 941); u is one of its pixels. */
const n1 = (v) => String(Math.round(v * 10) / 10);
const path = (pts, close = false) => 'M' + pts.map(([x, y]) => `${n1(x)} ${n1(y)}`).join(' L') + (close ? ' Z' : '');

/** a convex polygon (clockwise on screen) grown outward by d */
function grow(pts, d) {
  const n = pts.length;
  const edges = pts.map((a, i) => {
    const b = pts[(i + 1) % n], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
    return [a[0] + (dy / l) * d, a[1] - (dx / l) * d, dx, dy];
  });
  return edges.map(([x2, y2, dx2, dy2], i) => {
    const [x1, y1, dx1, dy1] = edges[(i + n - 1) % n], den = dx1 * dy2 - dy1 * dx2;
    if (Math.abs(den) < 1e-9) return [x2, y2];
    const t = ((x2 - x1) * dy2 - (y2 - y1) * dx2) / den;
    return [x1 + dx1 * t, y1 + dy1 * t];
  });
}
/** a light tube: a wide faint glow, a closer one, the tube, its white-hot core */
function neon(pts, col, w) {
  const d = path(pts), s = (sw, a, c = col) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${n1(sw)}" stroke-linecap="round" stroke-linejoin="round" opacity="${a}"/>`;
  return s(w * 3.6, 0.13) + s(w * 2, 0.3) + s(w, 1) + s(w * 0.36, 0.7, '#fff');
}
/** a status light that breathes */
function led(x, y, r, col, i) {
  return `<circle cx="${n1(x)}" cy="${n1(y)}" r="${n1(r * 2.3)}" fill="${col}" opacity=".2"/><circle cx="${n1(x)}" cy="${n1(y)}" r="${n1(r)}" fill="${col}"><animate attributeName="opacity" values="1;.45;1" dur="${(1.5 + i * 0.43).toFixed(2)}s" repeatCount="indefinite"/></circle>`;
}

/* the glass: a straight top, cut corners, sides leaning out a touch, then cut again down into the console */
const GLASS = { T: 64, L: 118, c: 58, L2: 92, b: 104 };
function glassPts(W, H, u) {
  const T = GLASS.T * u, L = GLASS.L * u, c = GLASS.c * u, L2 = GLASS.L2 * u, b = GLASS.b * u;
  return [[L + c, T], [W - L - c, T], [W - L, T + c], [W - L2, H - b], [W - L2 - b * 0.62, H + 8], [L2 + b * 0.62, H + 8], [L2, H - b], [L, T + c]];
}

/** the canopy frame (W × H: the screen above the console) */
function frameSVG(W, H, u) {
  const glass = glassPts(W, H, u), rim = grow(glass, 16 * u), band = grow(glass, 46 * u), outer = grow(glass, 80 * u);
  const T = GLASS.T * u, L = GLASS.L * u, c = GLASS.c * u, cx = W / 2, all = `M0 0 H${n1(W)} V${n1(H + 8)} H0 Z`;
  const both = (f) => f((x) => x) + f((x) => W - x);          // a detail on the left pillar, then its mirror on the right
  const seam = (d) => `<path d="${d}" fill="none" stroke="#080a24" stroke-width="${n1(3 * u)}"/><path d="${d}" fill="none" stroke="#424c9f" stroke-width="${n1(1.3 * u)}" transform="translate(${n1(1.7 * u)} ${n1(1.7 * u)})"/>`;
  let s = `<defs>
    <linearGradient id="ckBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#262d6a"/><stop offset=".55" stop-color="#1a1f52"/><stop offset="1" stop-color="#11153d"/></linearGradient>
    <linearGradient id="ckShade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#03040f" stop-opacity=".6"/><stop offset=".09" stop-color="#03040f" stop-opacity="0"/><stop offset=".91" stop-color="#03040f" stop-opacity="0"/><stop offset="1" stop-color="#03040f" stop-opacity=".6"/></linearGradient>
    <linearGradient id="ckRim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8bff6"/><stop offset=".14" stop-color="#bcb9f0"/><stop offset=".6" stop-color="#a0a8e3"/><stop offset="1" stop-color="#7881c8"/></linearGradient>
  </defs>`;
  // the frame body, darker toward the screen's edges, and a soft shadow just inside the glass
  s += `<path d="${all} ${path(glass, true)}" fill="url(#ckBody)" fill-rule="evenodd"/><path d="${all} ${path(glass, true)}" fill="url(#ckShade)" fill-rule="evenodd"/>`;
  s += `<path d="${path(glass, true)}" fill="none" stroke="#02030c" stroke-width="${n1(14 * u)}" opacity=".35"/>`;
  // panel seams: two rings round the window, and cuts from its top corners up to the screen's edge
  s += seam(path(band, true)) + seam(path(outer, true));
  const mid = [(band[7][0] + band[0][0]) / 2, (band[7][1] + band[0][1]) / 2];
  s += both((X) => seam(path([[X(mid[0]), mid[1]], [X(mid[0] - mid[1]), 0]])));
  // the top beam: a recess with a long cyan light, cyan brackets either side, violet lights in the corners
  s += `<path d="${path([[cx - 196 * u, -2], [cx - 172 * u, 40 * u], [cx + 172 * u, 40 * u], [cx + 196 * u, -2]], true)}" fill="#11153c" stroke="#434da2" stroke-width="${n1(1.4 * u)}"/>`;
  s += neon([[cx - 140 * u, 21 * u], [cx + 140 * u, 21 * u]], '#5cf2ff', 8 * u);
  if (L + c + 262 * u < cx - 206 * u) s += both((X) => neon([[X(L + c + 150 * u), 2 * u], [X(L + c + 172 * u), 24 * u], [X(L + c + 262 * u), 24 * u]], '#5cf2ff', 7 * u));
  s += both((X) => neon([[X(L - 23 * u), T - 24 * u], [X(L + 20 * u), T - 62 * u]], '#c56bff', 6 * u));
  // the pillars: a screw head, a cyan light, a slot, three status lights, a second light lower down, a violet one at the foot
  const strip = (yc) => { const h = Math.min(H * 0.12, 90 * u) / 2; return [yc - h, yc + h]; };
  const [a0, a1] = strip(H * 0.287), [b0, b1] = strip(H * 0.64), yl = H * 0.467;
  s += both((X) => `<circle cx="${n1(X(70 * u))}" cy="${n1(H * 0.175)}" r="${n1(7 * u)}" fill="#2a3277" stroke="#6670c4" stroke-width="${n1(1.5 * u)}"/>`);
  s += both((X) => neon([[X(58 * u), a0], [X(58 * u), a1]], '#5cf2ff', 8 * u) + neon([[X(30 * u), b0], [X(30 * u), b1]], '#5cf2ff', 8 * u));
  s += both((X) => `<rect x="${n1(X(48 * u) - 3.5 * u)}" y="${n1(yl - 62 * u)}" width="${n1(7 * u)}" height="${n1(22 * u)}" rx="${n1(3.5 * u)}" fill="#080a22" stroke="#3b4596" stroke-width="${n1(1.2 * u)}"/>`);
  s += both((X) => ['#ff4fd8', '#45d9ff', '#ffb547'].map((col, i) => led(X((44 - i * 3) * u), yl + (i - 1) * 25 * u, 5.5 * u, col, i + (X(0) ? 3 : 0))).join(''));
  s += both((X) => neon([[X(50 * u), H * 0.905], [X(84 * u), H * 0.97]], '#c56bff', 6 * u));
  // the rim round the glass: lilac at the top, cooler down the sides, a dark lip where it meets the glass
  s += `<path d="${path(rim, true)} ${path(glass, true)}" fill="url(#ckRim)" fill-rule="evenodd"/>`;
  s += `<path d="${path(rim, true)}" fill="none" stroke="#3f4898" stroke-width="${n1(1.6 * u)}"/><path d="${path(glass, true)}" fill="none" stroke="#070920" stroke-width="${n1(3.2 * u)}"/>`;
  return s;
}

/** the console (W × Hd, drawn R higher so its hood and side consoles rise into the window); m: the modules' boxes */
function dashSVG(W, Hd, R, m, u) {
  const H = Hd + R, top = R, pad = 14 * u, ring = 9 * u;
  let s = `<defs>
    <linearGradient id="dkBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#283070"/><stop offset=".1" stop-color="#1a1f52"/><stop offset=".55" stop-color="#11153c"/><stop offset="1" stop-color="#080a22"/></linearGradient>
    <linearGradient id="dkRaised" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4396"/><stop offset=".3" stop-color="#232a66"/><stop offset="1" stop-color="#141848"/></linearGradient>
    <linearGradient id="dkFace" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d133a"/><stop offset="1" stop-color="#060924"/></linearGradient>
  </defs>`;
  // one body across the screen, its lip lit by the window
  s += `<rect x="0" y="${n1(top)}" width="${n1(W)}" height="${n1(Hd)}" fill="url(#dkBody)"/>`;
  s += `<path d="M0 ${n1(top + 1.5 * u)} H${n1(W)}" stroke="#5cf2ff" stroke-width="${n1(6 * u)}" opacity=".12"/><path d="M0 ${n1(top + 1.2 * u)} H${n1(W)}" stroke="#a0a8f0" stroke-width="${n1(2.2 * u)}" opacity=".8"/>`;
  // the side consoles out past the modules (xs: how far in from the screen's side they reach)
  const side = (X, xs) => {
    if (xs < 56 * u) return '';
    const yt = top - 24 * u, y1 = top + Hd * 0.2;
    let o = `<path d="${path([[X(-2), yt], [X(xs - 40 * u), yt], [X(xs), top + 12 * u], [X(xs), H + 2], [X(-2), H + 2]], true)}" fill="url(#dkRaised)"/>`;
    o += `<path d="${path([[X(-2), yt + u], [X(xs - 40 * u), yt + u]])}" fill="none" stroke="#a0a8f0" stroke-width="${n1(2 * u)}" opacity=".7"/>`;
    o += `<path d="${path([[X(xs - 40 * u), yt + u], [X(xs), top + 12 * u], [X(xs), H]])}" fill="none" stroke="#5a63bd" stroke-width="${n1(1.5 * u)}"/>`;
    // a long light along its brow with a groove under it
    o += neon([[X(xs * 0.2), y1 + 4 * u], [X(xs * 0.72), y1]], '#5cf2ff', 7 * u);
    o += `<path d="${path([[X(xs * 0.24), y1 + 18 * u], [X(xs * 0.7), y1 + 14 * u]])}" fill="none" stroke="#0a0d2a" stroke-width="${n1(5 * u)}" stroke-linecap="round"/>`;
    // lower down: an armrest on the outside, and a small panel of short lights next to the module
    const ya = top + Hd * 0.44, xa = Math.min(xs * 0.6, xs - 72 * u), r = 34 * u;
    if (xa > 44 * u) {
      const brim = (dy) => `M${n1(X(-2))} ${n1(ya + dy)} H${n1(X(xa - r))} Q${n1(X(xa))} ${n1(ya + dy)} ${n1(X(xa))} ${n1(ya + r)}`;
      o += `<path d="${brim(0)} V${n1(H + 2)} H${n1(X(-2))} Z" fill="url(#dkRaised)" stroke="#6a73c8" stroke-width="${n1(1.5 * u)}"/><path d="${brim(1.5 * u)}" fill="none" stroke="#a0a8f0" stroke-width="${n1(2 * u)}" opacity=".7"/>`;
    }
    const p0 = xs - 58 * u, p1 = xs - 16 * u, q0 = top + Hd * 0.5, q1 = Math.min(H - 8 * u, q0 + 84 * u);
    o += `<rect x="${n1(Math.min(X(p0), X(p1)))}" y="${n1(q0)}" width="${n1(p1 - p0)}" height="${n1(q1 - q0)}" rx="${n1(10 * u)}" fill="url(#dkFace)" stroke="#5a63bd" stroke-width="${n1(1.5 * u)}"/>`;
    for (let i = 0; i < 4; i++) { const y = q0 + 16 * u + i * 16 * u; if (y < q1 - 10 * u) o += neon([[X(p0 + 11 * u), y], [X(p1 - 11 * u), y]], '#57d8ff', 6 * u); }
    return o;
  };
  s += side((x) => x, m.l.x - pad - ring - 22 * u) + side((x) => W - x, W - (m.r.x + m.r.w + pad + ring + 22 * u));
  // the hood over the Ship AI's screen with a violet light along its brow, then the screen's bezel and lit inner rim
  const S = m.s, cx = S.x + S.w / 2, sp = 12 * u, sr = 11 * u;
  const bx = S.x - sp - sr, by = S.y - sp - sr, bw = S.w + (sp + sr) * 2, bh = S.h + (sp + sr) * 2;
  const hy = Math.min(top - 10 * u, by - 26 * u), hx0 = bx - 30 * u, hx1 = bx + bw + 30 * u;
  const brow = [[hx0, top + 14 * u], [hx0 + 26 * u, hy], [hx1 - 26 * u, hy], [hx1, top + 14 * u]];
  s += `<path d="${path([...brow, [hx1, by + bh * 0.5], [hx0, by + bh * 0.5]], true)}" fill="url(#dkRaised)"/><path d="${path(brow)}" fill="none" stroke="#a0a8f0" stroke-width="${n1(2 * u)}" opacity=".8"/>`;
  s += neon([[cx - S.w * 0.2, hy + 8 * u], [cx + S.w * 0.2, hy + 8 * u]], '#c77dff', 6 * u);
  s += `<rect x="${n1(bx)}" y="${n1(by)}" width="${n1(bw)}" height="${n1(bh)}" rx="${n1(30 * u)}" fill="url(#dkRaised)" stroke="#8790e0" stroke-width="${n1(2 * u)}"/>`;
  s += `<rect x="${n1(S.x - sp)}" y="${n1(S.y - sp)}" width="${n1(S.w + sp * 2)}" height="${n1(S.h + sp * 2)}" rx="${n1(22 * u)}" fill="#060820" stroke="#aab2f2" stroke-width="${n1(1.6 * u)}" stroke-opacity=".7"/>`;
  // short cyan lights on the bezel's flanks; under it three dots, a violet bar and a short cyan one
  s += neon([[bx - u, by + bh * 0.38], [bx - u, by + bh * 0.62]], '#5cf2ff', 5 * u) + neon([[bx + bw + u, by + bh * 0.38], [bx + bw + u, by + bh * 0.62]], '#5cf2ff', 5 * u);
  const yu = by + bh + 10 * u;
  if (yu < H - 5 * u) {
    for (let i = 0; i < 3; i++) s += `<circle cx="${n1(cx - S.w * 0.3 + i * 16 * u)}" cy="${n1(yu)}" r="${n1(4 * u)}" fill="#7fe9ff"/>`;
    s += neon([[cx - S.w * 0.16, yu], [cx + S.w * 0.16, yu]], '#b98cff', 5.5 * u) + neon([[cx + S.w * 0.22, yu], [cx + S.w * 0.31, yu]], '#5cf2ff', 5.5 * u);
  }
  // the two instrument modules: a raised bezel, a dark face, the outer top corner cut and lit cyan along the cut
  const mod = (r, cutLeft) => {
    const x = r.x - pad, y = r.y - pad, w = r.w + pad * 2, h = r.h + pad * 2, k = 30 * u, q = 14 * u;
    const shape = (g) => {
      const X0 = x - g, Y0 = y - g, X1 = x + w + g, Y1 = y + h + g, kk = k + g * 0.41, qq = q + g;
      const bottom = `V${n1(Y1 - qq)} Q${n1(X1)} ${n1(Y1)} ${n1(X1 - qq)} ${n1(Y1)} H${n1(X0 + qq)} Q${n1(X0)} ${n1(Y1)} ${n1(X0)} ${n1(Y1 - qq)}`;
      return cutLeft
        ? `M${n1(X0 + kk)} ${n1(Y0)} H${n1(X1 - qq)} Q${n1(X1)} ${n1(Y0)} ${n1(X1)} ${n1(Y0 + qq)} ${bottom} V${n1(Y0 + kk)} Z`
        : `M${n1(X0 + qq)} ${n1(Y0)} H${n1(X1 - kk)} L${n1(X1)} ${n1(Y0 + kk)} ${bottom} V${n1(Y0 + qq)} Q${n1(X0)} ${n1(Y0)} ${n1(X0 + qq)} ${n1(Y0)} Z`;
    };
    let o = `<path d="${shape(ring)}" fill="url(#dkRaised)" stroke="#8790e0" stroke-width="${n1(2 * u)}"/><path d="${shape(0)}" fill="url(#dkFace)" stroke="#06081e" stroke-width="${n1(2.5 * u)}"/>`;
    o += neon(cutLeft ? [[x, y + k + 34 * u], [x, y + k], [x + k, y], [x + k + 46 * u, y]] : [[x + w - k - 46 * u, y], [x + w - k, y], [x + w, y + k], [x + w, y + k + 34 * u]], '#5cf2ff', 3.6 * u);
    return o;
  };
  s += mod(m.l, true) + mod(m.r, false);
  return s;
}

export class CockpitUI {
  constructor(G) {
    this.G = G;
    this.el = $('cockpit'); this.shakeEl = this.el.querySelector('.ck-shake');
    this.frameSvg = this.el.querySelector('.ck-frame .ck-svg'); this.dashSvg = this.el.querySelector('.ck-dash-svg'); this.dashEl = this.el.querySelector('.ck-dash');
    this.wave = $('ckWave'); this.wctx = this.wave.getContext('2d'); this.waveK = 1;
    this.screenEl = this.el.querySelector('.ck-screen'); this.statusEl = $('ckStatus'); this.speedEl = $('ckSpeed'); this.altEl = $('ckAlt');
    this.mods = [this.el.querySelector('.ck-mod-l'), this.screenEl, this.el.querySelector('.ck-mod-r')];
    this.reticle = this.el.querySelector('.ck-reticle'); this.marker = this.el.querySelector('.ck-marker');
    this.mkBox = this.marker.querySelector('.mk-box'); this.mkArrow = this.marker.querySelector('.mk-arrow');
    this.edge = { x: 46, y: 46 };
    this.plasma = this.el.querySelector('.ck-plasma');
    this.lever = $('ckLever'); this.leverFill = this.lever.querySelector('.lv-fill'); this.leverHandle = this.lever.querySelector('.lv-handle'); this.slot = this.lever.querySelector('.lv-slot');
    this.descend = $('ckDescend'); this.launch = $('ckLaunch');
    this.leverV = 0; this.leverOn = false; this.leverDrag = null; this.held = false; this.shakeK = 0; this.t = 0;
    this._initLever(); this._initHold();
    this.unhook = null;
  }
  /** fit the shell to the screen (with GPT's painted cockpit, 02-cockpit.md, the console follows the painting's dashboard line instead) */
  layout() {
    const slot = this.G.art.slot('cockpit');
    if (this.G.art.has('cockpit')) {
      const [aw, ah] = slot.size || [2560, 1440], top = slot.dashTop ?? 0.69;
      const k = Math.max(innerWidth / aw, innerHeight / ah);
      document.documentElement.style.setProperty('--dash-h', `${Math.round((1 - top) * ah * k)}px`);
    } else document.documentElement.style.removeProperty('--dash-h');
    const W = this.el.clientWidth, Hd = this.dashEl.offsetHeight, H = this.el.clientHeight - Hd;
    if (!W || !Hd) return;                                    // hidden: nothing to measure
    const u = clamp(Math.min(W / 1672, (H + Hd) / 941), 0.36, 1.5), R = Math.round(44 * u);
    // the off-glass arrow stays on the glass, clear of the pillars and the top beam
    this.edge = { x: (GLASS.L + 16) * u + 26, y: (GLASS.T + 16) * u + 26 };
    // the waveform canvas at the size it is shown, so its lines and dots stay round and sharp
    const dpr = Math.min(devicePixelRatio || 1, 2), ww = Math.round(this.wave.offsetWidth * dpr), wh = Math.round(this.wave.offsetHeight * dpr);
    if (ww && wh && (this.wave.width !== ww || this.wave.height !== wh)) { this.wave.width = ww; this.wave.height = wh; }
    this.waveK = this.wave.height / 110;
    if (this.G.art.has('cockpit')) return;
    this.frameSvg.setAttribute('viewBox', `0 0 ${W} ${H}`); this.frameSvg.innerHTML = frameSVG(W, H, u);
    const box = (e) => ({ x: e.offsetLeft, y: e.offsetTop + R, w: e.offsetWidth, h: e.offsetHeight });
    const [l, sc, r] = this.mods.map(box);
    this.dashSvg.style.height = `${Hd + R}px`; this.dashSvg.setAttribute('viewBox', `0 0 ${W} ${Hd + R}`);
    this.dashSvg.innerHTML = dashSVG(W, Hd, R, { l, s: sc, r }, u);
  }
  show(on = true) {
    this.el.hidden = !on; document.body.classList.toggle('cockpit-on', on);
    if (on) {
      // redrawn whenever the screen or a module changes size (rotation, the compact layouts)
      if (!this._ro) { this._ro = new ResizeObserver(() => this.layout()); for (const e of [this.el, this.dashEl, ...this.mods]) this._ro.observe(e); }
      this.layout();
    }
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
      else y = Math.sin(i * 0.2 + this.t * 2.2) * (0.13 + 0.04 * Math.sin(this.t * 0.7)) + noise1(i * 0.3 + this.t * 2) * 0.03;   // cruising: a slow swell
      const env = Math.sin((i / 96) * Math.PI);
      pts.push([x, H / 2 + clamp(y, -1, 1) * env * H * 0.42]);
    }
    const k = this.waveK, line = (w, a) => { c.beginPath(); pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y))); c.lineWidth = w * k; c.strokeStyle = `rgba(92,242,255,${a})`; c.stroke(); };
    c.lineJoin = 'round'; line(10, 0.12); line(5, 0.25); line(2.2, 0.95);
    // sample dots along the trace, as on a scope
    c.fillStyle = 'rgba(190,252,255,0.95)';
    for (let i = 4; i < pts.length - 2; i += 11) { c.beginPath(); c.arc(pts[i][0], pts[i][1], 3 * k, 0, Math.PI * 2); c.fill(); }
    // the cockpit's shake, as a hand on the frame
    const q = this.shakeK + this.G.director.trauma * this.G.director.trauma * 1.2;
    if (q > 0.001) {
      const s = q * 10, r = q * 0.6;
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
    const cx = r.left + r.width / 2, cy = r.top + r.height * 0.46, px = this.edge.x, py = this.edge.y;
    let inside = front && x > r.left + px && x < r.right - px && y > r.top + py && y < r.bottom - 46;
    if (inside) {
      this.mkBox.hidden = false; this.mkArrow.hidden = true; this.marker.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    } else {
      let dx = x - cx, dy = y - cy; if (!front) { dx = -dx; dy = -dy; }
      const a = Math.atan2(dy, dx), hw = r.width / 2 - px, hh = r.height / 2 - py;
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
