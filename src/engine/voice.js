// ---------------------------------------------------------------------------
// The narrator (the Ship AI). Every line is a decoded buffer played through Web
// Audio, so the dashboard's waveform and the lesson's orb follow the real voice.
// Rules (each one keeps a beat from hanging):
//  * one line at a time: say() stops whatever is talking
//  * say() ALWAYS resolves: when the line ends, is stopped, is muted (it still
//    holds for its length, so the pacing never changes), or has no file (speech
//    synthesis, or the reading time)
//  * a hard deadline backs every line up
// ---------------------------------------------------------------------------
import { audio } from './audio.js';
import { uiTweens } from './tween.js';

const BASE = './assets/vo/';
const sub = () => document.getElementById('subLine');

export const voice = {
  lines: {}, man: {}, buffers: new Map(), current: null, analyser: null, data: null, subs: true, _hideT: 0,
  async load(onProgress = () => {}) {
    try {
      const [l, m] = await Promise.all([fetch(BASE + 'lines.json').then((r) => r.json()), fetch(BASE + 'vo.json').then((r) => (r.ok ? r.json() : { lines: {} })).catch(() => ({ lines: {} }))]);
      for (const ln of l.lines) this.lines[ln.id] = ln;
      this.man = m.lines || {};
    } catch (e) { console.warn('[voice] no script', e); return; }
    try { this.subs = localStorage.getItem('ql_subs') !== '0'; } catch {}
    document.body.classList.toggle('no-subs', !this.subs);
    const ctx = audio.ensure();
    if (!ctx) return;
    this.analyser = ctx.createAnalyser(); this.analyser.fftSize = 1024; this.analyser.smoothingTimeConstant = 0.6;
    this.analyser.connect(audio.voBus);
    this.data = new Uint8Array(this.analyser.fftSize);
    const ids = Object.keys(this.man);
    let done = 0;
    const one = async (id) => {
      try {
        const buf = await fetch(BASE + this.man[id].file).then((r) => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); });
        const ab = await new Promise((res, rej) => { const p = ctx.decodeAudioData(buf, res, rej); if (p && p.catch) p.catch(rej); });
        this.buffers.set(id, ab);
      } catch (e) { /* the line falls back to speech synthesis */ }
      onProgress(++done / Math.max(1, ids.length));
    };
    const queue = ids.slice();
    await Promise.all(Array.from({ length: 6 }, async () => { while (queue.length) await one(queue.shift()); }));
  },
  text(id) { return this.lines[id] ? this.lines[id].text : id; },
  dur(id) { const b = this.buffers.get(id); if (b) return b.duration; const m = this.man[id]; if (m && m.dur) return m.dur; return this.readTime(this.text(id)); },
  readTime(t) { return 0.8 + t.split(/\s+/).length / 2.6; },
  setSubs(on) { this.subs = on; document.body.classList.toggle('no-subs', !on); try { localStorage.setItem('ql_subs', on ? '1' : '0'); } catch {} },

  /** speak a line (id from lines.json). Resolves true when it finished, false if it was stopped. */
  say(id, { subtitle = true, text = null } = {}) {
    this.stop();
    const line = text ?? this.text(id);
    if (subtitle) this.showSub(line);
    audio.duckMusic(true);
    let resolve; const p = new Promise((r) => { resolve = r; });
    const cur = (this.current = { id, done: false, src: null, utt: null, deadline: null, finish: null });
    const finish = (ok) => {
      if (cur.done) return; cur.done = true;
      if (cur.deadline) cur.deadline.cancel();
      if (this.current === cur) { this.current = null; audio.duckMusic(false); this.hideSub(0.35); }
      resolve(ok);
    };
    cur.finish = finish;
    const buf = this.buffers.get(id);
    const len = buf ? buf.duration : this.readTime(line);
    cur.deadline = uiTweens.add({ duration: len + 2.5, onComplete: () => finish(true) });
    if (buf && audio.ctx) {
      const src = audio.ctx.createBufferSource(); src.buffer = buf;
      const g = audio.ctx.createGain(); g.gain.value = 1; src.connect(g); g.connect(this.analyser);
      src.onended = () => finish(true);
      cur.src = src;
      if (audio.ctx.state === 'running') src.start(); else { cur.deadline.cancel(); cur.deadline = uiTweens.add({ duration: len + 0.4, onComplete: () => finish(true) }); }
    } else if (window.speechSynthesis && !audio.muted && audio.ready) {
      try {
        const u = new SpeechSynthesisUtterance(line); u.rate = 0.98; u.pitch = 1.05;
        u.onend = () => finish(true); u.onerror = () => finish(true);
        speechSynthesis.cancel(); speechSynthesis.speak(u); cur.utt = u;
      } catch { /* the deadline carries it */ }
    }
    return p;
  },
  stop() {
    const cur = this.current; if (!cur) return;
    try { if (cur.src) { cur.src.onended = null; cur.src.stop(); } } catch {}
    try { if (cur.utt) speechSynthesis.cancel(); } catch {}
    cur.finish(false);
  },
  get talking() { return !!this.current; },
  /** the voice's loudness now, 0..1 (the orb, the dashboard screen) */
  level() {
    if (!this.analyser || !this.current) return 0;
    this.analyser.getByteTimeDomainData(this.data);
    let s = 0; for (let i = 0; i < this.data.length; i += 4) { const v = (this.data[i] - 128) / 128; s += v * v; }
    return Math.min(1, Math.sqrt(s / (this.data.length / 4)) * 3.2);
  },
  wave() { if (this.analyser) this.analyser.getByteTimeDomainData(this.data); return this.data; },
  showSub(t) { const el = sub(); if (!el) return; clearTimeout(this._hideT); el.textContent = t; el.classList.add('show'); },
  hideSub(after = 0) { const el = sub(); if (!el) return; clearTimeout(this._hideT); this._hideT = setTimeout(() => el.classList.remove('show'), after * 1000); },
};
