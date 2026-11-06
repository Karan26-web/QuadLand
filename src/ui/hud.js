// ---------------------------------------------------------------------------
// The HUD: hearts, pause, the instruction caption (LXD "Caption" lines and the
// hints), GO and NEXT, Skip. The LXD's review (2026-11-05) took the fleet row of
// shape icons and the formula chip off the screen: the rule is spoken, not shown.
// ---------------------------------------------------------------------------
import { audio } from '../engine/audio.js';
import { voice } from '../engine/voice.js';
import { clock } from '../engine/clock.js';

const $ = (id) => document.getElementById(id);
const HEART = '<svg viewBox="0 0 32 29"><defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8fa6"/><stop offset="1" stop-color="#e8264f"/></linearGradient></defs><path d="M16 28 3.6 15.8C.3 12.5.3 7.1 3.6 3.8s8.7-3.3 12 0l.4.4.4-.4c3.3-3.3 8.7-3.3 12 0s3.3 8.7 0 12L16 28z" fill="url(#hg)" stroke="#ffd6df" stroke-width="1.6"/><ellipse cx="9.5" cy="8" rx="3.4" ry="2.2" fill="#fff" opacity=".55" transform="rotate(-30 9.5 8)"/></svg>';
const HEART_CRACK = '<svg viewBox="0 0 32 29"><path d="M16 28 3.6 15.8C.3 12.5.3 7.1 3.6 3.8s8.7-3.3 12 0l.4.4.4-.4c3.3-3.3 8.7-3.3 12 0s3.3 8.7 0 12L16 28z" fill="#5a5070" stroke="#9a92b8" stroke-width="1.6"/><path d="M16 5 13.5 11l4 3.5-3 5 2 4" fill="none" stroke="#1b1240" stroke-width="2.2" stroke-linejoin="round"/></svg>';

export class HUD {
  constructor(G) {
    this.G = G;
    this.el = $('hud'); this.heartsEl = $('hearts');
    this.captionEl = $('caption'); this.goEl = $('btnGo'); this.nextEl = $('btnNext'); this.skipEl = $('btnSkip');
    this.hearts = 3; this.renderHearts();
    this.goHandler = null; this.nextResolve = null; this.skipHandler = null;
    this.goEl.addEventListener('click', () => this._go());
    this.nextEl.addEventListener('click', () => this._next());
    this.skipEl.addEventListener('click', () => this._skip());
    G.input.on_('confirm', () => { if (!this.nextEl.hidden) this._next(); else if (!this.goEl.disabled && this.goHandler) this._go(); });
    for (const b of document.querySelectorAll('button')) b.addEventListener('pointerenter', () => { if (matchMedia('(hover: hover)').matches && !b.disabled) audio.play('ui.hover', { minGap: 0.08 }); });

    // pause
    this.pauseEl = $('pause');
    $('btnPause').addEventListener('click', () => this.pause(true));
    $('pzResume').addEventListener('click', () => this.pause(false));
    $('pzSound').addEventListener('click', () => { audio.toggleMute(); this._pauseLabels(); });
    $('pzSubs').addEventListener('click', () => { voice.setSubs(!voice.subs); this._pauseLabels(); });
    $('pzRestart').addEventListener('click', () => { this.pause(false); G.flow.restart(); });
    G.input.on_('back', () => { if (G.flow && G.flow.started) this.pause(!clock.paused); });
    G.input.on_('mute', () => { audio.toggleMute(); this._pauseLabels(); });
    this._pauseLabels();
  }
  show(on = true) { this.el.hidden = !on; }
  /* hearts */
  setHearts(n) { this.hearts = n; this.renderHearts(); }
  renderHearts() { this.heartsEl.innerHTML = [0, 1, 2].map((i) => `<div class="heart ${i < this.hearts ? '' : 'lost'}">${i < this.hearts ? HEART : HEART_CRACK}</div>`).join(''); }
  loseHeart() {
    if (this.hearts <= 0) return 0;
    this.hearts--;
    const el = this.heartsEl.children[this.hearts];
    if (el) { el.innerHTML = HEART_CRACK; el.classList.add('breaking', 'lost'); }
    audio.play('ui.heart');
    return this.hearts;
  }
  /* the caption */
  caption(text, { cool = false } = {}) {
    if (!text) { this.captionEl.hidden = true; document.body.classList.remove('caption-on'); return; }
    this.captionEl.textContent = text; this.captionEl.classList.toggle('cool', cool); this.captionEl.hidden = false;
    this.captionEl.style.animation = 'none'; void this.captionEl.offsetWidth; this.captionEl.style.animation = '';
    document.body.classList.add('caption-on');
  }
  /* GO */
  goShow(on) { this.goEl.hidden = !on; if (!on) this.goEnable(false); }
  goEnable(on) {
    const was = !this.goEl.disabled;
    this.goEl.disabled = !on; this.goEl.classList.toggle('ready', on);
    if (on && !was) audio.play('go.ready');
  }
  onGo(fn) { this.goHandler = fn; }
  _go() { if (this.goEl.disabled || !this.goHandler) return; audio.play('go.press'); const h = this.goHandler; h(); }
  /* NEXT: resolves when pressed */
  next() {
    this.nextEl.hidden = false; this.nextEl.classList.add('pulse');
    return new Promise((r) => { this.nextResolve = r; });
  }
  _next() { if (this.nextEl.hidden) return; audio.play('ui.confirm'); this.nextEl.hidden = true; const r = this.nextResolve; this.nextResolve = null; if (r) r(true); }
  hideNext() { this.nextEl.hidden = true; if (this.nextResolve) { const r = this.nextResolve; this.nextResolve = null; r(false); } }
  /* skip: one press for a cinematic; with confirm (the lesson), the first press asks and only a second press within
     3 s skips, so a stray tap cannot throw the learning away */
  skip(fn, { label = 'Skip', confirm = null, short = [label, confirm] } = {}) {
    this.skipHandler = fn; this.skipConfirm = confirm; this.skipLabel = label; this.skipShort = short;
    this._skipLabel(false); this.skipEl.hidden = !fn;
  }
  _skipLabel(armed) {
    clearTimeout(this._skipT); this._skipArmed = armed;
    this.skipEl.classList.toggle('confirm', armed);
    // a long label and a short one for narrow screens (CSS shows one)
    const long = armed ? this.skipConfirm : this.skipLabel, short = this.skipShort[armed ? 1 : 0] || long;
    this.skipEl.innerHTML = `<b class="sk-l">${long}</b><b class="sk-s">${short}</b> <span>›</span>`;
  }
  _skip() {
    if (!this.skipHandler) return;
    if (this.skipConfirm && !this._skipArmed) {
      audio.play('ui.hint'); this._skipLabel(true);
      this._skipT = setTimeout(() => this._skipLabel(false), 3000);
      return;
    }
    audio.play('ui.click');
    const h = this.skipHandler; this.skipHandler = null; this._skipLabel(false); this.skipEl.hidden = true; h();
  }
  /* pause */
  pause(on) {
    if (on === clock.paused) return;
    clock.paused = on; audio.pause(on); this.pauseEl.hidden = !on;
    if (on) { this._pauseLabels(); $('pzResume').focus({ preventScroll: true }); }
  }
  _pauseLabels() { $('pzSound').textContent = `Sound: ${audio.muted ? 'Off' : 'On'}`; $('pzSubs').textContent = `Subtitles: ${voice.subs ? 'On' : 'Off'}`; }
}
