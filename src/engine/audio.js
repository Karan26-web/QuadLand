// ---------------------------------------------------------------------------
// Spaceship Mission: procedural audio (Web Audio API). No sound files to load.
//  * buses: sfx · music · ambience · voice → master → limiter; a shared reverb
//    (a generated impulse) gives space and the sea their size
//  * play(name, opts)  one-shot cues (the SFX library below)
//  * loop(name, opts)  continuous sounds with live parameters: engines, hover jets,
//                      the hyperspace tunnel, re-entry plasma, the sea and its wind
//  * music.play(mode)  generative score, one mood per part of the mission, scheduled
//                      on the audio clock; it ducks under the narrator
// ---------------------------------------------------------------------------
const SFX = {};
const LOOPS = {};
const NOTE = (n) => 440 * Math.pow(2, (n - 69) / 12);
const rnd = (a, b) => a + Math.random() * (b - a);
function store(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch { return d; } }

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = store('ql_muted', '0') === '1';
    this.vol = { master: 0.9, sfx: 0.9, music: 0.34, amb: 0.5, vo: 1.0 };
    this.music = new Music(this);
    this.last = new Map();
    this.loops = new Set();
    this._pendingLoops = [];
  }
  ensure() {
    if (this.ctx) return this.ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    const ctx = (this.ctx = new AC({ latencyHint: 'interactive' }));
    this.master = ctx.createGain(); this.master.gain.value = this.muted ? 0 : this.vol.master;
    const lim = ctx.createDynamicsCompressor();
    lim.threshold.value = -10; lim.knee.value = 10; lim.ratio.value = 8; lim.attack.value = 0.003; lim.release.value = 0.25;
    this.master.connect(lim); lim.connect(ctx.destination);
    const bus = (v) => { const g = ctx.createGain(); g.gain.value = v; g.connect(this.master); return g; };
    this.sfxBus = bus(this.vol.sfx); this.musicBus = bus(this.vol.music); this.ambBus = bus(this.vol.amb); this.voBus = bus(this.vol.vo);
    this.duck = ctx.createGain(); this.duck.gain.value = 1; this.duck.connect(this.musicBus);
    // reverb: a 3 s stereo tail of decaying noise
    this.verb = ctx.createConvolver(); this.verb.buffer = this._impulse(3.2, 2.6);
    this.verbIn = ctx.createGain(); this.verbIn.gain.value = 1; this.verbIn.connect(this.verb);
    const vOut = ctx.createGain(); vOut.gain.value = 0.55; this.verb.connect(vOut); vOut.connect(this.master);
    const len = ctx.sampleRate * 2, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    this.noise = buf;
    const curve = new Float32Array(1024); for (let i = 0; i < 1024; i++) { const x = (i / 1023) * 2 - 1; curve[i] = Math.tanh(x * 2.5); }
    this.curve = curve;
    const wake = () => { if (!document.hidden && ctx.state !== 'running' && !this.paused) ctx.resume().catch(() => {}); };
    document.addEventListener('visibilitychange', () => { if (document.hidden) { if (ctx.state === 'running') ctx.suspend().catch(() => {}); } else wake(); });
    addEventListener('pageshow', wake);
    for (const fn of this._pendingLoops.splice(0)) fn();
    if (this.music.pending) this.music.play(this.music.pending);
    return ctx;
  }
  _impulse(seconds, decay) {
    const ctx = this.ctx, n = Math.floor(ctx.sampleRate * seconds), b = ctx.createBuffer(2, n, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, decay); }
    return b;
  }
  unlock() { const ctx = this.ensure(); if (ctx && ctx.state !== 'running') ctx.resume().catch(() => {}); return ctx; }
  get now() { return this.ctx ? this.ctx.currentTime : 0; }
  get ready() { return !!this.ctx && this.ctx.state === 'running'; }
  setMuted(m) {
    this.muted = m; try { localStorage.setItem('ql_muted', m ? '1' : '0'); } catch {}
    if (this.master) this.master.gain.setTargetAtTime(m ? 0 : this.vol.master, this.now, 0.05);
  }
  toggleMute() { this.setMuted(!this.muted); return this.muted; }
  pause(on) { this.paused = on; if (!this.ctx) return; if (on) this.ctx.suspend().catch(() => {}); else this.ctx.resume().catch(() => {}); }
  /** the narrator speaks: the music steps back */
  duckMusic(on) { if (this.duck) this.duck.gain.setTargetAtTime(on ? 0.42 : 1, this.now, on ? 0.08 : 0.6); }

  /** recorded cues and music (docs/assets/07-audio.md): assets/sfx/sfx.json maps a cue or 'music.<mode>' to a file.
   *  A cue with a file plays the file; every other cue stays synthesised. */
  async loadFiles(onProgress = () => {}) {
    this.files = new Map();
    let man; try { man = await fetch('./assets/sfx/sfx.json', { cache: 'no-cache' }).then((r) => (r.ok ? r.json() : null)); } catch { man = null; }
    const entries = man ? Object.entries({ ...(man.cues || {}), ...Object.fromEntries(Object.entries(man.music || {}).map(([k, v]) => [`music.${k}`, v])) }) : [];
    const ctx = this.ensure(); let done = 0;
    if (!ctx || !entries.length) { onProgress(1); return; }
    await Promise.all(entries.map(async ([name, file]) => {
      try { const ab = await fetch(`./assets/sfx/${file}`).then((r) => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); }); this.files.set(name, await ctx.decodeAudioData(ab)); }
      catch (e) { console.warn('[audio] kept the synthesised', name, e.message); }
      onProgress(++done / entries.length);
    }));
  }
  playFile(name, o = {}) {
    const b = this.files && this.files.get(name); if (!b) return null;
    const src = this.ctx.createBufferSource(); src.buffer = b;
    const g = this.gain(o.vol ?? 1, o.pan ? this.pan(o.pan, this.sfxBus) : this.sfxBus); src.connect(g); src.start();
    return { src, gain: g };
  }
  play(name, o = {}) {
    if (!this.ready) return null;
    const gap = o.minGap ?? 0.035, t = this.last.get(name) ?? -1;
    if (this.now - t < gap) return null;
    this.last.set(name, this.now);
    if (this.files && this.files.has(name)) return this.playFile(name, o);
    const fn = SFX[name];
    if (!fn) { console.warn('[audio] unknown sfx', name); return null; }
    try { return fn(this, o) ?? null; } catch (e) { console.warn('[audio]', name, e); return null; }
  }
  /** a continuous sound: { set(key, value, smooth), stop(fade) } (safe before the first gesture: it starts once audio does) */
  loop(name, o = {}) {
    const handle = { _impl: null, _vals: {}, _stopped: false,
      set(k, v, s = 0.1) { this._vals[k] = v; if (this._impl) this._impl.set(k, v, s); },
      stop(f = 0.6) { this._stopped = true; if (this._impl) this._impl.stop(f); engine.loops.delete(this); } };
    const engine = this;
    const start = () => {
      if (handle._stopped || !LOOPS[name]) return;
      handle._impl = LOOPS[name](this, o);
      for (const k in handle._vals) handle._impl.set(k, handle._vals[k], 0.01);
    };
    this.loops.add(handle);
    if (this.ctx) start(); else this._pendingLoops.push(start);
    return handle;
  }
  stopLoops(f = 0.5) { for (const l of [...this.loops]) l.stop(f); }

  /* ------------------------------------------------------- node helpers */
  gain(v = 1, dest) { const g = this.ctx.createGain(); g.gain.value = v; g.connect(dest || this.sfxBus); return g; }
  osc(type, freq, dest) { const o = this.ctx.createOscillator(); o.type = type; o.frequency.value = freq; if (dest) o.connect(dest); return o; }
  filter(type, freq, Q = 1, dest) { const f = this.ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = Q; if (dest) f.connect(dest); return f; }
  noiseSrc(dest) { const s = this.ctx.createBufferSource(); s.buffer = this.noise; s.loop = true; s.loopStart = Math.random(); if (dest) s.connect(dest); return s; }
  pan(p = 0, dest) { if (!this.ctx.createStereoPanner) return dest; const n = this.ctx.createStereoPanner(); n.pan.value = p; n.connect(dest); return n; }
  send(node, amount = 0.3) { const g = this.ctx.createGain(); g.gain.value = amount; node.connect(g); g.connect(this.verbIn); return g; }
  shaper(dest) { const w = this.ctx.createWaveShaper(); w.curve = this.curve; if (dest) w.connect(dest); return w; }
  env(param, t0, { a = 0.005, d = 0.1, s = 0, r = 0.1, peak = 1, hold = 0 } = {}) {
    param.cancelScheduledValues(t0); param.setValueAtTime(0.0001, t0);
    param.linearRampToValueAtTime(peak, t0 + a);
    const sus = Math.max(0.0001, peak * s);
    param.exponentialRampToValueAtTime(Math.max(0.0001, sus), t0 + a + d);
    param.setValueAtTime(sus, t0 + a + d + hold);
    param.exponentialRampToValueAtTime(0.0001, t0 + a + d + hold + r);
    return t0 + a + d + hold + r;
  }
  tone({ type = 'sine', f0 = 440, f1 = null, t0 = this.now, dur = 0.2, vol = 0.2, env = {}, dest = null, sweep = 'exp', detune = 0, pan = 0, verb = 0 }) {
    const out = pan ? this.pan(pan, dest || this.sfxBus) : (dest || this.sfxBus);
    const g = this.gain(0.0001, out); const o = this.osc(type, f0, g); o.detune.value = detune;
    if (verb) this.send(g, verb);
    if (f1 != null) { o.frequency.setValueAtTime(f0, t0); if (sweep === 'exp') o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t0 + dur); else o.frequency.linearRampToValueAtTime(f1, t0 + dur); }
    const end = this.env(g.gain, t0, { a: 0.005, d: dur * 0.5, s: 0.4, r: dur * 0.5, ...env, peak: vol });
    o.start(t0); o.stop(end + 0.05);
    return { osc: o, gain: g, end };
  }
  burst({ t0 = this.now, dur = 0.2, vol = 0.3, type = 'lowpass', f0 = 2000, f1 = null, Q = 1, env = {}, dest = null, pan = 0, verb = 0 }) {
    const out = pan ? this.pan(pan, dest || this.sfxBus) : (dest || this.sfxBus);
    const g = this.gain(0.0001, out); const f = this.filter(type, f0, Q, g); const n = this.noiseSrc(f);
    if (verb) this.send(g, verb);
    if (f1 != null) { f.frequency.setValueAtTime(f0, t0); f.frequency.exponentialRampToValueAtTime(Math.max(10, f1), t0 + dur); }
    const end = this.env(g.gain, t0, { a: 0.003, d: dur * 0.6, s: 0.3, r: dur * 0.4, ...env, peak: vol });
    n.start(t0); n.stop(end + 0.05);
    return { src: n, gain: g, filter: f, end };
  }
  seq(notes, { type = 'triangle', t0 = this.now, vol = 0.2, env = {}, verb = 0.2, dest = null } = {}) {
    for (const [midi, off, dur, v] of notes) this.tone({ type, f0: NOTE(midi), t0: t0 + off, dur, vol: (v ?? 1) * vol, verb, dest, env: { a: 0.01, d: dur * 0.3, s: 0.5, r: dur * 0.7, ...env } });
  }
  /** a bell: two slightly inharmonic sines, long ring */
  bell(midi, { t0 = this.now, vol = 0.12, dur = 1.6, verb = 0.45, pan = 0, dest = null } = {}) {
    const f = NOTE(midi);
    this.tone({ f0: f, t0, dur, vol, verb, pan, dest, env: { a: 0.004, d: dur * 0.25, s: 0.25, r: dur * 0.75 } });
    this.tone({ f0: f * 2.76, t0, dur: dur * 0.5, vol: vol * 0.28, verb, pan, dest, env: { a: 0.002, d: dur * 0.1, s: 0.1, r: dur * 0.4 } });
    this.tone({ f0: f * 5.4, t0, dur: dur * 0.2, vol: vol * 0.1, verb, pan, dest, env: { a: 0.002, d: 0.04, s: 0.05, r: dur * 0.15 } });
  }
}

/* ======================================================================= */
/* one-shots                                                               */
/* ======================================================================= */
// UI
SFX['ui.hover'] = (A) => A.tone({ f0: 1500, f1: 1800, dur: 0.05, vol: 0.02, env: { a: 0.003, d: 0.02, s: 0.2, r: 0.03 } });
SFX['ui.click'] = (A) => { A.tone({ type: 'triangle', f0: 880, f1: 520, dur: 0.08, vol: 0.12, env: { a: 0.002, d: 0.03, s: 0.2, r: 0.05 } }); A.burst({ dur: 0.03, vol: 0.1, type: 'highpass', f0: 3000 }); };
SFX['ui.confirm'] = (A) => A.seq([[76, 0, 0.1, 1], [83, 0.08, 0.22, 1]], { vol: 0.13, type: 'sine', verb: 0.3 });
SFX['ui.hint'] = (A) => { const t = A.now; A.bell(79, { t0: t, vol: 0.08 }); A.bell(86, { t0: t + 0.12, vol: 0.07 }); };
SFX['ui.heart'] = (A) => { const t = A.now; A.burst({ t0: t, dur: 0.12, vol: 0.3, type: 'highpass', f0: 1800, env: { a: 0.001, d: 0.04, s: 0.2, r: 0.07 } }); A.tone({ type: 'sine', f0: 523, f1: 392, dur: 0.3, vol: 0.12, t0: t + 0.08 }); A.tone({ type: 'sine', f0: 392, f1: 330, dur: 0.45, vol: 0.1, t0: t + 0.3 }); };

// camera + flight
SFX['whoosh'] = (A, o) => {
  const t = A.now, d = o.dur ?? 0.55, p = A.ctx.createStereoPanner ? A.ctx.createStereoPanner() : null;
  const out = p || A.sfxBus; if (p) { p.connect(A.sfxBus); p.pan.setValueAtTime(o.from ?? -0.8, t); p.pan.linearRampToValueAtTime(o.to ?? 0.8, t + d); }
  A.burst({ t0: t, dur: d, vol: (o.vol ?? 0.3), type: 'bandpass', f0: 250, f1: 2200, Q: 0.9, dest: out, verb: 0.15, env: { a: d * 0.45, d: d * 0.2, s: 0.5, r: d * 0.35 } });
  A.burst({ t0: t, dur: d, vol: (o.vol ?? 0.3) * 0.5, type: 'lowpass', f0: 180, dest: out, env: { a: d * 0.5, d: d * 0.2, s: 0.4, r: d * 0.3 } });
};
SFX['flyby'] = (A, o) => {
  const t = A.now, d = o.dur ?? 1.6, p = A.ctx.createStereoPanner ? A.ctx.createStereoPanner() : null, out = p || A.sfxBus;
  if (p) { p.connect(A.sfxBus); p.pan.setValueAtTime(o.from ?? -1, t); p.pan.linearRampToValueAtTime(o.to ?? 1, t + d); }
  const g = A.gain(0.0001, out); A.send(g, 0.25);
  const f = A.filter('lowpass', 500, 0.8, g); const n = A.noiseSrc(f);
  const s = A.osc('sawtooth', 120, A.filter('lowpass', 700, 1, g));
  s.frequency.setValueAtTime(150, t); s.frequency.linearRampToValueAtTime(150, t + d * 0.45); s.frequency.exponentialRampToValueAtTime(70, t + d);
  f.frequency.setValueAtTime(400, t); f.frequency.linearRampToValueAtTime(2600, t + d * 0.48); f.frequency.exponentialRampToValueAtTime(300, t + d);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(o.vol ?? 0.35, t + d * 0.48); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  n.start(t); s.start(t); n.stop(t + d + 0.05); s.stop(t + d + 0.05);
};
SFX['boom'] = (A, o) => { const t = A.now, v = o.vol ?? 0.7; A.tone({ f0: 90, f1: 28, dur: 1.4, vol: v, t0: t, env: { a: 0.004, d: 0.4, s: 0.3, r: 0.9 }, verb: 0.3 }); A.burst({ t0: t, dur: 1.2, vol: v * 0.6, f0: 1400, f1: 60, verb: 0.4, env: { a: 0.003, d: 0.3, s: 0.35, r: 0.8 } }); };
SFX['riser'] = (A, o) => { const t = A.now, d = o.dur ?? 2; A.burst({ t0: t, dur: d, vol: o.vol ?? 0.18, type: 'bandpass', f0: 300, f1: 5000, Q: 2, verb: 0.3, env: { a: d * 0.9, d: 0.05, s: 0.8, r: 0.1 } }); A.tone({ type: 'sawtooth', f0: 110, f1: 880, dur: d, vol: (o.vol ?? 0.18) * 0.3, t0: t, dest: A.filter('lowpass', 1800, 1, A.sfxBus), env: { a: d * 0.9, d: 0.05, s: 0.8, r: 0.1 } }); };
SFX['impact'] = (A, o) => { const t = A.now, v = o.vol ?? 0.5; A.tone({ f0: 120, f1: 40, dur: 0.5, vol: v, t0: t, env: { a: 0.002, d: 0.15, s: 0.3, r: 0.3 } }); A.burst({ t0: t, dur: 0.35, vol: v * 0.7, f0: 3000, f1: 150, env: { a: 0.001, d: 0.1, s: 0.3, r: 0.2 } }); };

// title / cockpit
SFX['ck.boot'] = (A) => { const t = A.now; A.tone({ type: 'sine', f0: 120, f1: 900, dur: 0.6, vol: 0.1, t0: t, verb: 0.2 }); for (let i = 0; i < 4; i++) A.tone({ f0: 1200 + i * 220, dur: 0.06, vol: 0.05, t0: t + 0.5 + i * 0.07 }); };
SFX['ck.beep'] = (A, o) => A.tone({ type: 'square', f0: o.f ?? rnd(900, 1500), dur: 0.06, vol: 0.035, env: { a: 0.002, d: 0.02, s: 0.4, r: 0.03 }, dest: A.filter('lowpass', 3000, 1, A.sfxBus) });
SFX['ck.chatter'] = (A) => { const t = A.now; for (let i = 0; i < 5; i++) A.tone({ type: 'square', f0: rnd(700, 1900), dur: 0.04, vol: 0.025, t0: t + i * 0.07, dest: A.filter('lowpass', 3500, 1, A.sfxBus) }); };
SFX['ck.lock'] = (A) => { const t = A.now; A.tone({ f0: 1320, dur: 0.1, vol: 0.12, t0: t }); A.tone({ f0: 1760, dur: 0.25, vol: 0.12, t0: t + 0.1, verb: 0.3 }); A.seq([[72, 0.2, 0.6, 1], [76, 0.2, 0.6, 0.8], [79, 0.2, 0.7, 0.8]], { type: 'sine', vol: 0.07, verb: 0.5 }); };
SFX['ck.lever'] = (A) => { A.burst({ dur: 0.18, vol: 0.12, type: 'bandpass', f0: 900, f1: 1800, Q: 3, env: { a: 0.02, d: 0.1, s: 0.3, r: 0.06 } }); };
SFX['ck.button'] = (A) => { const t = A.now; A.tone({ f0: 220, f1: 90, dur: 0.16, vol: 0.35, t0: t }); A.burst({ t0: t, dur: 0.05, vol: 0.2, type: 'highpass', f0: 2600 }); A.tone({ f0: 1046, dur: 0.15, vol: 0.06, t0: t + 0.05, verb: 0.3 }); };
SFX['ck.rise'] = (A) => { const t = A.now; A.burst({ t0: t, dur: 0.7, vol: 0.12, type: 'bandpass', f0: 400, f1: 1600, Q: 4, env: { a: 0.1, d: 0.4, s: 0.5, r: 0.2 } }); A.tone({ f0: 300, f1: 600, dur: 0.6, vol: 0.05, t0: t, type: 'sawtooth', dest: A.filter('lowpass', 1200, 1, A.sfxBus) }); A.tone({ f0: 150, f1: 60, dur: 0.15, vol: 0.3, t0: t + 0.62 }); };
SFX['warp.charge'] = (A, o) => { const t = A.now, d = o.dur ?? 2.2; A.tone({ type: 'sine', f0: 140, f1: 1900, dur: d, vol: 0.12, t0: t, verb: 0.3, env: { a: d * 0.85, d: 0.05, s: 0.9, r: 0.1 } }); A.tone({ type: 'sawtooth', f0: 70, f1: 140, dur: d, vol: 0.08, t0: t, dest: A.filter('lowpass', 600, 1, A.sfxBus), env: { a: d * 0.8, d: 0.1, s: 0.8, r: 0.1 } }); SFX['riser'](A, { dur: d, vol: 0.14 }); };
SFX['warp.jump'] = (A) => { const t = A.now; SFX.boom(A, { vol: 0.85 }); A.burst({ t0: t, dur: 1.6, vol: 0.5, type: 'bandpass', f0: 4000, f1: 200, Q: 0.7, verb: 0.5, env: { a: 0.005, d: 0.5, s: 0.4, r: 1 } }); A.tone({ type: 'sine', f0: 2400, f1: 300, dur: 1.2, vol: 0.12, t0: t, verb: 0.4 }); };
SFX['warp.exit'] = (A) => { const t = A.now; A.burst({ t0: t, dur: 1.3, vol: 0.4, type: 'bandpass', f0: 200, f1: 3500, Q: 0.8, verb: 0.5, env: { a: 0.6, d: 0.2, s: 0.4, r: 0.5 } }); A.tone({ f0: 60, f1: 30, dur: 1.2, vol: 0.45, t0: t + 0.6, env: { a: 0.004, d: 0.3, s: 0.3, r: 0.8 } }); A.bell(88, { t0: t + 0.7, vol: 0.08, dur: 2.4 }); A.bell(95, { t0: t + 0.8, vol: 0.06, dur: 2.6 }); };
SFX['atmos.break'] = (A) => { const t = A.now; A.burst({ t0: t, dur: 1.8, vol: 0.4, f0: 3000, f1: 200, verb: 0.4, env: { a: 0.02, d: 0.6, s: 0.4, r: 1 } }); A.tone({ f0: 80, f1: 35, dur: 1.2, vol: 0.4, t0: t }); };
SFX['launch.prime'] = (A) => { const t = A.now; A.tone({ type: 'sawtooth', f0: 200, f1: 1200, dur: 0.9, vol: 0.06, t0: t, dest: A.filter('lowpass', 2500, 2, A.sfxBus) }); A.burst({ t0: t, dur: 0.9, vol: 0.1, type: 'bandpass', f0: 600, f1: 3000, Q: 5 }); };
SFX['launch.fire'] = (A) => { const t = A.now; A.tone({ f0: 140, f1: 45, dur: 0.6, vol: 0.6, t0: t }); A.burst({ t0: t, dur: 1.8, vol: 0.45, type: 'bandpass', f0: 2600, f1: 400, Q: 0.6, verb: 0.35, env: { a: 0.01, d: 0.5, s: 0.4, r: 1.2 } }); SFX.whoosh(A, { dur: 1.1, vol: 0.35, from: 0, to: 0.2 }); };
SFX['glitch'] = (A) => { const t = A.now; for (let i = 0; i < 9; i++) { const s = t + i * 0.045 + Math.random() * 0.02; A.burst({ t0: s, dur: 0.04, vol: 0.18, type: 'bandpass', f0: rnd(400, 5000), Q: 4, env: { a: 0.001, d: 0.015, s: 0.6, r: 0.02 } }); if (i % 3 === 0) A.tone({ type: 'square', f0: rnd(80, 900), dur: 0.05, vol: 0.06, t0: s }); } };
SFX['static'] = (A, o) => A.burst({ dur: o.dur ?? 0.35, vol: o.vol ?? 0.12, type: 'highpass', f0: 1500, env: { a: 0.01, d: 0.1, s: 0.6, r: 0.15 } });

// the planet
SFX['scan.start'] = (A) => { const t = A.now; A.tone({ type: 'sine', f0: 200, f1: 1400, dur: 0.7, vol: 0.1, t0: t, verb: 0.3 }); A.bell(84, { t0: t + 0.6, vol: 0.09 }); };
SFX['scan.sweep'] = (A, o) => { const t = A.now, d = o.dur ?? 2.4; const g = A.gain(0.0001); A.send(g, 0.4); const f = A.filter('bandpass', 400, 6, g); const n = A.noiseSrc(f); f.frequency.setValueAtTime(400, t); f.frequency.exponentialRampToValueAtTime(3200, t + d * 0.5); f.frequency.exponentialRampToValueAtTime(500, t + d); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.16, t + 0.2); g.gain.setValueAtTime(0.16, t + d - 0.3); g.gain.exponentialRampToValueAtTime(0.0001, t + d); n.start(t); n.stop(t + d + 0.05); for (let i = 0; i < 4; i++) A.tone({ f0: 1700, dur: 0.18, vol: 0.06, t0: t + 0.3 + i * (d / 4.2), verb: 0.5 }); };
SFX['scan.ping'] = (A, o) => { const t = A.now; A.tone({ f0: o.f ?? 1250, dur: 0.6, vol: 0.12, t0: t, verb: 0.7, env: { a: 0.003, d: 0.12, s: 0.2, r: 0.45 } }); };
SFX['lights.up'] = (A) => { const t = A.now; A.seq([[60, 0, 3.2, 0.6], [67, 0.15, 3.0, 0.5], [71, 0.3, 2.8, 0.45], [74, 0.45, 2.6, 0.45], [79, 0.6, 2.4, 0.4]], { type: 'sine', vol: 0.08, verb: 0.7, env: { a: 0.6, d: 0.4, s: 0.6, r: 1.6 } }); A.burst({ t0: t, dur: 2.4, vol: 0.06, type: 'highpass', f0: 6000, verb: 0.7, env: { a: 1.2, d: 0.3, s: 0.5, r: 0.9 } }); };
SFX['island.rise'] = (A, o) => {
  const t = A.now, d = o.dur ?? 2.4, p = o.pan ?? 0, out = A.pan(p, A.sfxBus);
  A.tone({ type: 'sawtooth', f0: 38, f1: 52, dur: d, vol: 0.18, t0: t, dest: A.filter('lowpass', 200, 1, out), env: { a: 0.3, d: d * 0.5, s: 0.6, r: d * 0.4 } });
  const g = A.burst({ t0: t, dur: d, vol: 0.12, type: 'bandpass', f0: 500, f1: 900, Q: 2, dest: out, env: { a: 0.2, d: d * 0.5, s: 0.6, r: d * 0.3 } });
  const lfo = A.osc('sine', 11); const lg = A.gain(0.06, g.gain.gain); lfo.connect(lg); lfo.start(t); lfo.stop(t + d);
  A.burst({ t0: t, dur: d + 0.8, vol: 0.28, type: 'lowpass', f0: 900, f1: 2200, dest: out, verb: 0.35, env: { a: d * 0.4, d: d * 0.4, s: 0.5, r: 0.8 } });
  A.tone({ f0: 70, f1: 32, dur: 0.9, vol: 0.4, t0: t + d * 0.82, dest: out });
};
SFX['splash'] = (A, o) => { const t = A.now, v = o.vol ?? 0.45, out = A.pan(o.pan ?? 0, A.sfxBus); A.burst({ t0: t, dur: 0.9, vol: v, f0: 2400, f1: 300, dest: out, verb: 0.3, env: { a: 0.004, d: 0.25, s: 0.35, r: 0.6 } }); A.tone({ f0: 110, f1: 40, dur: 0.35, vol: v * 0.7, t0: t, dest: out }); for (let i = 0; i < 10; i++) A.burst({ t0: t + 0.1 + Math.random() * 0.6, dur: 0.05, vol: v * 0.2, type: 'bandpass', f0: rnd(1500, 4500), Q: 3, dest: out }); };
SFX['zone.pulse'] = (A, o) => { const scale = [72, 74, 76, 79, 81]; A.bell(scale[(o.i ?? 0) % 5] + 12, { vol: 0.09, verb: 0.6, pan: o.pan ?? 0 }); };
SFX['zone.glow'] = (A) => A.burst({ dur: 1.4, vol: 0.06, type: 'highpass', f0: 5000, verb: 0.7, env: { a: 0.5, d: 0.4, s: 0.5, r: 0.5 } });
// a shape's sides tracing on in light: one bell per side as it completes, rising, over a faint shimmer (up: transpose)
SFX['edge.trace'] = (A, o) => {
  const d = o.dur ?? 1.2, t = A.now, up = o.up ?? 0;
  [72, 76, 79, 84].forEach((n, k) => A.bell(n + up, { t0: t + (d * (k + 0.9)) / 4, vol: 0.05, verb: 0.5, pan: o.pan ?? 0 }));
  A.burst({ dur: d, vol: 0.025, type: 'bandpass', f0: 6000, Q: 2, verb: 0.5, env: { a: d * 0.4, d: d * 0.3, s: 0.4, r: d * 0.3 } });
};

// landing
SFX['ship.arrive'] = (A, o) => { SFX.flyby(A, { dur: o.dur ?? 2.2, vol: 0.4, from: o.from ?? -0.9, to: o.to ?? 0.2 }); A.tone({ type: 'sine', f0: 300, f1: 90, dur: 1.6, vol: 0.06, t0: A.now + 0.6, verb: 0.2 }); };
SFX['dim.draw'] = (A) => { A.tone({ f0: 520, f1: 1300, dur: 0.45, vol: 0.06, verb: 0.2, env: { a: 0.05, d: 0.2, s: 0.6, r: 0.15 } }); A.burst({ dur: 0.45, vol: 0.05, type: 'bandpass', f0: 3000, Q: 4, env: { a: 0.05, d: 0.2, s: 0.6, r: 0.15 } }); };
SFX['dim.label'] = (A) => { A.tone({ f0: 880, f1: 1760, dur: 0.08, vol: 0.1 }); A.bell(91, { vol: 0.05, dur: 0.8 }); };
SFX['area.pop'] = (A, o) => { const notes = [79, 83, 86]; A.tone({ f0: 500, f1: 1200, dur: 0.08, vol: 0.09 }); A.bell(notes[(o.i ?? 0) % 3], { vol: 0.08, verb: 0.4, pan: o.pan ?? 0 }); };
SFX['go.ready'] = (A) => { A.tone({ f0: 990, dur: 0.07, vol: 0.09 }); A.tone({ f0: 1480, dur: 0.12, vol: 0.09, t0: A.now + 0.07, verb: 0.3 }); };
SFX['go.press'] = (A) => { SFX['ck.button'](A); A.tone({ type: 'sawtooth', f0: 220, f1: 660, dur: 0.4, vol: 0.05, dest: A.filter('lowpass', 2000, 1, A.sfxBus) }); };
SFX['lock.beam'] = (A, o) => A.tone({ f0: 1900 + (o.i ?? 0) * 140, f1: 600, dur: 0.22, vol: 0.06, verb: 0.3, pan: o.pan ?? 0 });
SFX['lock.ok'] = (A) => { A.seq([[72, 0, 0.5, 1], [76, 0.05, 0.5, 0.9], [79, 0.1, 0.6, 0.9], [84, 0.15, 0.9, 0.8]], { type: 'triangle', vol: 0.08, verb: 0.4 }); };
SFX['lock.fail'] = (A) => { const t = A.now; A.tone({ type: 'square', f0: 220, dur: 0.18, vol: 0.06, t0: t, dest: A.filter('lowpass', 1600, 1, A.sfxBus) }); A.tone({ type: 'square', f0: 233, dur: 0.18, vol: 0.06, t0: t, dest: A.filter('lowpass', 1600, 1, A.sfxBus) }); A.tone({ type: 'square', f0: 185, dur: 0.3, vol: 0.06, t0: t + 0.2, dest: A.filter('lowpass', 1400, 1, A.sfxBus) }); };
SFX['touchdown'] = (A) => { const t = A.now; A.tone({ f0: 110, f1: 45, dur: 0.45, vol: 0.55, t0: t }); A.burst({ t0: t, dur: 1.2, vol: 0.25, f0: 4000, f1: 400, verb: 0.3, env: { a: 0.01, d: 0.4, s: 0.3, r: 0.7 } }); for (let i = 0; i < 4; i++) A.tone({ type: 'square', f0: 1800 - i * 120, dur: 0.03, vol: 0.05, t0: t + 0.25 + i * 0.07 }); };
SFX['success'] = (A) => { const t = A.now; A.seq([[67, 0, 0.18, 1], [72, 0.12, 0.18, 1], [76, 0.24, 0.18, 1], [79, 0.36, 0.5, 1], [84, 0.5, 0.9, 1]], { type: 'triangle', vol: 0.14, verb: 0.35 }); A.seq([[48, 0.36, 1, 1], [55, 0.36, 1, 0.8]], { type: 'sine', vol: 0.12, verb: 0.2 }); A.burst({ t0: t + 0.4, dur: 1.2, vol: 0.06, type: 'highpass', f0: 7000, verb: 0.6 }); };
SFX['confetti'] = (A) => { const t = A.now; for (let i = 0; i < 6; i++) A.burst({ t0: t + i * 0.06, dur: 0.06, vol: 0.18, type: 'bandpass', f0: rnd(1500, 3500), Q: 2, pan: rnd(-0.6, 0.6) }); };
SFX['creak'] = (A, o) => { const t = A.now, d = o.dur ?? 1.1; const g = A.gain(0.0001); const f = A.filter('bandpass', 420, 8, g); const s = A.osc('sawtooth', 70, f); s.frequency.setValueAtTime(60, t); s.frequency.linearRampToValueAtTime(95, t + d); const lfo = A.osc('square', 23); const lg = A.gain(18, s.frequency); lfo.connect(lg); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.3, t + 0.15); g.gain.exponentialRampToValueAtTime(0.0001, t + d); s.start(t); lfo.start(t); s.stop(t + d + 0.05); lfo.stop(t + d + 0.05); };
SFX['slide'] = (A) => A.burst({ dur: 0.9, vol: 0.18, type: 'bandpass', f0: 1200, f1: 600, Q: 3, env: { a: 0.05, d: 0.4, s: 0.6, r: 0.4 } });
SFX['glug'] = (A) => { const t = A.now; for (let i = 0; i < 7; i++) A.tone({ f0: rnd(260, 420), f1: rnd(500, 900), dur: 0.09, vol: 0.09, t0: t + i * rnd(0.08, 0.15), env: { a: 0.005, d: 0.04, s: 0.3, r: 0.04 } }); };
SFX['clang'] = (A) => { const t = A.now; for (const [f, v] of [[312, 0.22], [847, 0.12], [1491, 0.08], [2203, 0.05]]) A.tone({ f0: f, dur: 1.2, vol: v, t0: t, verb: 0.4, env: { a: 0.001, d: 0.2, s: 0.25, r: 0.9 } }); A.burst({ t0: t, dur: 0.08, vol: 0.4, type: 'highpass', f0: 2500 }); A.tone({ f0: 100, f1: 45, dur: 0.4, vol: 0.5, t0: t }); };
SFX['boing'] = (A) => { const t = A.now; const g = A.gain(0.0001); const o = A.osc('sine', 180, g); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(420, t + 0.1); o.frequency.exponentialRampToValueAtTime(160, t + 0.6); const lfo = A.osc('sine', 14); const lg = A.gain(40, o.frequency); lfo.connect(lg); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.16, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7); o.start(t); lfo.start(t); o.stop(t + 0.75); lfo.stop(t + 0.75); };
SFX['crash'] = (A) => { const t = A.now; SFX.impact(A, { vol: 0.6 }); A.burst({ t0: t, dur: 0.7, vol: 0.35, type: 'bandpass', f0: 1800, Q: 0.8, env: { a: 0.002, d: 0.2, s: 0.4, r: 0.4 } }); for (let i = 0; i < 12; i++) A.tone({ type: 'square', f0: rnd(800, 3000), dur: 0.03, vol: 0.04, t0: t + 0.1 + Math.random() * 0.7 }); };
SFX['sparks'] = (A) => { const t = A.now; for (let i = 0; i < 14; i++) A.burst({ t0: t + Math.random() * 0.6, dur: 0.03, vol: 0.12, type: 'highpass', f0: rnd(3000, 7000) }); };
SFX['rescue'] = (A) => { const t = A.now; A.tone({ type: 'sine', f0: 180, f1: 520, dur: 1.6, vol: 0.09, t0: t, verb: 0.4, env: { a: 0.3, d: 0.6, s: 0.6, r: 0.6 } }); A.tone({ type: 'sine', f0: 186, f1: 530, dur: 1.6, vol: 0.07, t0: t, verb: 0.4, env: { a: 0.3, d: 0.6, s: 0.6, r: 0.6 } }); A.bell(84, { t0: t + 1.2, vol: 0.06 }); };
SFX['autopilot'] = (A) => { const t = A.now; A.seq([[84, 0, 0.12, 1], [79, 0.12, 0.12, 1], [84, 0.24, 0.12, 1], [91, 0.36, 0.4, 1]], { type: 'square', vol: 0.05, verb: 0.3 }); };
SFX['fanfare'] = (A) => {
  const t = A.now, out = A.filter('lowpass', 2400, 0.7, A.sfxBus); A.send(out, 0.4);
  const brass = (midi, off, dur, v = 1) => { for (const det of [-6, 6]) { const g = A.gain(0.0001, out); const o = A.osc('sawtooth', NOTE(midi), g); o.detune.value = det; A.env(g.gain, t + off, { a: 0.04, d: dur * 0.3, s: 0.7, r: dur * 0.6, peak: 0.06 * v }); o.start(t + off); o.stop(t + off + dur + 0.1); } };
  [[60, 0, 0.3], [64, 0.25, 0.3], [67, 0.5, 0.3], [72, 0.75, 1.4]].forEach(([m, o, d]) => { brass(m, o, d); brass(m - 12, o, d, 0.6); });
  [[65, 2.2, 0.4], [69, 2.5, 0.4], [72, 2.8, 0.4], [77, 3.1, 1.8], [76, 3.1, 1.8, 0.7], [72, 3.1, 1.8, 0.7]].forEach(([m, o, d, v]) => brass(m, o, d, v ?? 1));
  for (const o of [0, 0.75, 2.2, 3.1]) A.tone({ f0: 90, f1: 55, dur: 0.9, vol: 0.4, t0: t + o, env: { a: 0.003, d: 0.2, s: 0.3, r: 0.6 } });
  A.burst({ t0: t + 3.1, dur: 2.5, vol: 0.12, type: 'highpass', f0: 5000, verb: 0.6, env: { a: 0.01, d: 0.8, s: 0.4, r: 1.6 } });
};


/* ======================================================================= */
/* loops                                                                   */
/* ======================================================================= */
function fadeOut(A, g, f, nodes) { const t = A.now; g.gain.cancelScheduledValues(t); g.gain.setTargetAtTime(0.0001, t, Math.max(0.01, f / 4)); for (const n of nodes) { try { n.stop(t + f + 0.2); } catch {} } }
LOOPS['engine'] = (A, o) => {   // the command ship's drive: a deep roar
  const g = A.gain(0.0001, o.bus === 'amb' ? A.ambBus : A.sfxBus), f = A.filter('lowpass', 260, 0.7, g);
  const n = A.noiseSrc(f), s1 = A.osc('sawtooth', 46, A.filter('lowpass', 180, 1, g)), s2 = A.osc('sine', 33, g);
  const lfo = A.osc('sine', 0.3); const lg = A.gain(60, f.frequency); lfo.connect(lg);
  n.start(); s1.start(); s2.start(); lfo.start();
  g.gain.setTargetAtTime(o.vol ?? 0.22, A.now, 0.6);
  return { set(k, v, s) { if (k === 'power') { f.frequency.setTargetAtTime(160 + v * 900, A.now, s); g.gain.setTargetAtTime((o.vol ?? 0.22) * (0.4 + v * 0.8), A.now, s); s1.frequency.setTargetAtTime(40 + v * 30, A.now, s); } },
    stop(fd) { fadeOut(A, g, fd, [n, s1, s2, lfo]); } };
};
LOOPS['hum'] = (A, o) => {      // the cockpit: air, electronics
  const g = A.gain(0.0001, A.ambBus), f = A.filter('bandpass', 700, 0.5, g), n = A.noiseSrc(f);
  const h = A.osc('sine', 110, A.gain(0.06, g)), h2 = A.osc('sine', 220.6, A.gain(0.02, g));
  n.start(); h.start(); h2.start(); g.gain.setTargetAtTime(o.vol ?? 0.12, A.now, 0.8);
  return { set() {}, stop(fd) { fadeOut(A, g, fd, [n, h, h2]); } };
};
LOOPS['warp'] = (A, o) => {     // the tunnel: a roaring, swirling rush
  const g = A.gain(0.0001), f = A.filter('bandpass', 900, 0.8, g), n = A.noiseSrc(f);
  const sh = A.osc('sawtooth', 55, A.filter('lowpass', 300, 1, g));
  const lfo = A.osc('sine', 5.5); const lg = A.gain(500, f.frequency); lfo.connect(lg);
  const shimmer = A.burst({ dur: 30, vol: 0.05, type: 'highpass', f0: 6000, env: { a: 1, d: 1, s: 1, r: 1 } });
  n.start(); sh.start(); lfo.start(); A.send(g, 0.3);
  g.gain.setTargetAtTime(o.vol ?? 0.3, A.now, 0.3);
  return { set(k, v, s) { if (k === 'power') { g.gain.setTargetAtTime((o.vol ?? 0.3) * v, A.now, s); f.frequency.setTargetAtTime(500 + v * 1500, A.now, s); } },
    stop(fd) { fadeOut(A, g, fd, [n, sh, lfo]); try { shimmer.gain.gain.setTargetAtTime(0.0001, A.now, 0.1); } catch {} } };
};
LOOPS['plasma'] = (A, o) => {   // re-entry: fire on the glass
  const g = A.gain(0.0001), f = A.filter('lowpass', 1400, 0.8, g), n = A.noiseSrc(f), sub = A.osc('sine', 38, g);
  const trem = A.osc('sine', 9); const tg = A.gain(0.35, g.gain); trem.connect(tg);
  n.start(); sub.start(); trem.start();
  const crack = setInterval(() => { if (A.ready) A.burst({ dur: 0.05, vol: 0.12 * (handle.p || 0.5), type: 'highpass', f0: rnd(2000, 6000), pan: rnd(-0.7, 0.7) }); }, 90);
  const handle = { p: 0.5, set(k, v, s) { if (k === 'power') { this.p = v; g.gain.setTargetAtTime((o.vol ?? 0.4) * v, A.now, s); f.frequency.setTargetAtTime(500 + v * 2500, A.now, s); } },
    stop(fd) { clearInterval(crack); fadeOut(A, g, fd, [n, sub, trem]); } };
  g.gain.setTargetAtTime((o.vol ?? 0.4) * 0.5, A.now, 0.3);
  return handle;
};
LOOPS['hover'] = (A, o) => {    // a ship's hover jets
  const out = A.pan(o.pan ?? 0, A.sfxBus), g = A.gain(0.0001, out), f = A.filter('bandpass', 1100, 0.9, g), n = A.noiseSrc(f);
  const hum = A.osc('triangle', 92, A.filter('lowpass', 400, 1, g));
  n.start(); hum.start(); g.gain.setTargetAtTime(o.vol ?? 0.09, A.now, 0.5);
  return { set(k, v, s) {
    if (k === 'power') g.gain.setTargetAtTime((o.vol ?? 0.09) * v, A.now, s);
    if (k === 'speed') { f.frequency.setTargetAtTime(900 + v * 1400, A.now, s); hum.frequency.setTargetAtTime(90 + v * 50, A.now, s); }
  }, stop(fd) { fadeOut(A, g, fd, [n, hum]); } };
};
LOOPS['drone'] = (A, o) => {
  const g = A.gain(0.0001), f = A.filter('bandpass', 2400, 2, g), n = A.noiseSrc(f), w = A.osc('sawtooth', 210, A.filter('lowpass', 900, 1, A.gain(0.15, g)));
  n.start(); w.start(); g.gain.setTargetAtTime(o.vol ?? 0.06, A.now, 0.3);
  return { set(k, v, s) { if (k === 'power') g.gain.setTargetAtTime((o.vol ?? 0.06) * v, A.now, s); }, stop(fd) { fadeOut(A, g, fd, [n, w]); } };
};
LOOPS['sea'] = (A, o) => {      // the sea: slow swells, wind, the giant waves' far-off rumble
  const g = A.gain(0.0001, A.ambBus);
  const fw = A.filter('lowpass', 500, 0.6, g), nw = A.noiseSrc(fw);
  const swell = A.osc('sine', 0.09); const sg = A.gain(350, fw.frequency); swell.connect(sg);
  const fg = A.filter('bandpass', 2600, 0.6, A.gain(0.25, g)), ng = A.noiseSrc(fg);
  const gust = A.osc('sine', 0.05); const gg = A.gain(900, fg.frequency); gust.connect(gg);
  const rum = A.osc('sawtooth', 31, A.filter('lowpass', 90, 1, A.gain(0.35, g)));
  nw.start(); swell.start(); ng.start(); gust.start(); rum.start();
  g.gain.setTargetAtTime(o.vol ?? 0.5, A.now, 1.5);
  return { set(k, v, s) { if (k === 'vol') g.gain.setTargetAtTime(v, A.now, s); }, stop(fd) { fadeOut(A, g, fd, [nw, swell, ng, gust, rum]); } };
};
LOOPS['tractor'] = (A) => {
  const g = A.gain(0.0001), o1 = A.osc('sine', 180, g), o2 = A.osc('sine', 183, g), lfo = A.osc('sine', 6); const lg = A.gain(20, o1.frequency); lfo.connect(lg);
  A.send(g, 0.4); o1.start(); o2.start(); lfo.start(); g.gain.setTargetAtTime(0.06, A.now, 0.2);
  return { set() {}, stop(fd) { fadeOut(A, g, fd, [o1, o2, lfo]); } };
};

/* ======================================================================= */
/* music: a small generative score                                         */
/* ======================================================================= */
const MODES = {
  // C Lydian, slow: wonder (the title, the intro)
  title: { bpm: 64, bars: [[48, 55, 64, 71, 74], [50, 57, 66, 69, 74], [52, 59, 67, 71, 74], [45, 52, 64, 67, 72]], pad: 0.05, bell: 0.05, arp: 'bell8', bass: 0.08, kick: 0, hat: 0 },
  cockpit: { bpm: 84, bars: [[48, 55, 64, 71], [50, 57, 66, 69], [52, 59, 67, 71], [50, 57, 66, 69]], pad: 0.04, bell: 0.04, arp: 'pulse16', bass: 0.07, kick: 0, hat: 0.012 },
  planet: { bpm: 56, bars: [[45, 52, 59, 64, 71], [41, 48, 55, 64, 67], [48, 55, 59, 64, 67], [43, 50, 55, 62, 69]], pad: 0.055, bell: 0.05, arp: 'sparse', bass: 0.07, kick: 0, hat: 0, whale: true },
  landing: { bpm: 96, bars: [[48, 55, 64, 67, 71], [45, 52, 60, 64, 67], [41, 48, 57, 60, 64], [43, 50, 59, 62, 67]], pad: 0.035, bell: 0.04, arp: 'pluck8', bass: 0.08, kick: 0.1, hat: 0.016 },
  complete: { bpm: 100, bars: [[48, 55, 64, 67, 72], [53, 60, 65, 69, 72], [55, 62, 67, 71, 74], [48, 55, 64, 67, 76]], pad: 0.05, bell: 0.06, arp: 'bell8', bass: 0.1, kick: 0.14, hat: 0.02 },
};
class Music {
  constructor(A) { this.A = A; this.mode = null; this.pending = null; this.timer = null; this.bus = null; this.step = 0; this.next = 0; }
  play(mode, { fade = 1.6 } = {}) {
    const A = this.A;
    if (!A.ctx) { this.pending = mode; return; }
    if (mode === this.mode) return;
    this.stop(fade);
    if (!mode || !MODES[mode]) return;
    this.mode = mode; this.cfg = MODES[mode];
    const bus = (this.bus = A.ctx.createGain()); bus.gain.value = 0.0001; bus.connect(A.duck);
    bus.gain.setTargetAtTime(1, A.now, fade / 3);
    const track = A.files && A.files.get(`music.${mode}`);
    if (track) { const src = A.ctx.createBufferSource(); src.buffer = track; src.loop = true; const g = A.ctx.createGain(); g.gain.value = 2.2; src.connect(g); g.connect(bus); src.start(); this.trackSrc = src; return; }
    this.verb = A.ctx.createGain(); this.verb.gain.value = 0.55; bus.connect(this.verb); this.verb.connect(A.verbIn);
    this.step = 0; this.next = A.now + 0.1;
    const tick = () => this._schedule();
    this.timer = setInterval(tick, 40); tick();
  }
  stop(fade = 1.2) {
    const A = this.A;
    if (this.timer) clearInterval(this.timer); this.timer = null;
    if (this.trackSrc) { const t = this.trackSrc; this.trackSrc = null; try { t.stop(A.now + fade + 0.3); } catch {} }
    if (this.bus && A.ctx) { const b = this.bus; b.gain.cancelScheduledValues(A.now); b.gain.setTargetAtTime(0.0001, A.now, fade / 4); setTimeout(() => { try { b.disconnect(); } catch {} }, fade * 1000 + 400); }
    this.bus = null; this.mode = null;
  }
  _schedule() {
    const A = this.A; if (!A.ctx || !this.bus) return;
    const c = this.cfg, s16 = 60 / c.bpm / 4;
    while (this.next < A.now + 0.25) { this._step(this.step, this.next, s16); this.step++; this.next += s16; }
  }
  _step(i, t, s16) {
    const A = this.A, c = this.cfg, bus = this.bus;
    const bar = Math.floor(i / 16) % c.bars.length, pos = i % 16, chord = c.bars[bar];
    if (pos === 0) {
      for (const m of chord.slice(1)) this._pad(m, t, s16 * 16 * 1.05, c.pad, bus);
      if (c.bass) this._bass(chord[0] - 12 + 12, t, s16 * 8, c.bass, bus);
      if (c.whale && Math.random() < 0.5) this._whale(t + s16 * rnd(2, 8), bus);
    }
    if (c.bass && pos === 8 && c.kick) this._bass(chord[0], t, s16 * 6, c.bass * 0.8, bus);
    if (c.kick && (pos === 0 || pos === 8 || (c.bpm > 110 && pos % 4 === 0))) this._kick(t, c.kick, bus);
    if (c.hat && pos % 2 === 0) this._hat(t, c.hat * (pos % 4 === 2 ? 1 : 0.55), bus);
    const tones = chord.slice(1);
    if (c.arp === 'bell8' && pos % 2 === 0) { const m = tones[(i / 2) % tones.length | 0] + 12; if (Math.random() < 0.8) A.bell(m, { t0: t, vol: c.bell, dur: 2.2, verb: 0, dest: bus, pan: rnd(-0.5, 0.5) }); }
    if (c.arp === 'pulse16') { const m = tones[i % tones.length] + 12; this._pluck(m, t, s16 * 0.9, c.bell * 0.7, bus, 1600); }
    if (c.arp === 'drive16') { const m = tones[(i * 3) % tones.length] + (pos >= 8 ? 24 : 12); this._pluck(m, t, s16 * 0.8, c.bell * 1.4, bus, 2600); }
    if (c.arp === 'pluck8' && pos % 2 === 0) { const pat = [0, 2, 1, 3, 2, 1, 3, 0]; const m = tones[pat[(i / 2) % 8 | 0] % tones.length] + 12; this._marimba(m, t, c.bell, bus); }
    if (c.arp === 'sparse' && pos % 4 === 0 && Math.random() < 0.42) A.bell(tones[(Math.random() * tones.length) | 0] + 24, { t0: t, vol: c.bell, dur: 3.2, verb: 0, dest: bus, pan: rnd(-0.7, 0.7) });
  }
  _pad(m, t, dur, vol, bus) {
    const A = this.A, f = A.filter('lowpass', 1300, 0.6, bus), g = A.ctx.createGain(); g.gain.value = 0.0001; g.connect(f);
    for (const det of [-9, 0, 8]) { const o = A.osc(det === 0 ? 'triangle' : 'sawtooth', NOTE(m), det === 0 ? g : A.gain(0.35, g)); o.detune.value = det; o.start(t); o.stop(t + dur + 2.5); }
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + Math.min(1.6, dur * 0.35)); g.gain.setValueAtTime(vol, t + dur * 0.8); g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 2.2);
  }
  _bass(m, t, dur, vol, bus) { const A = this.A; A.tone({ f0: NOTE(m), t0: t, dur, vol, dest: bus, env: { a: 0.02, d: dur * 0.3, s: 0.6, r: dur * 0.6 } }); A.tone({ type: 'triangle', f0: NOTE(m) * 2, t0: t, dur, vol: vol * 0.25, dest: bus, env: { a: 0.02, d: dur * 0.3, s: 0.4, r: dur * 0.6 } }); }
  _kick(t, vol, bus) { this.A.tone({ f0: 130, f1: 42, t0: t, dur: 0.32, vol, dest: bus, env: { a: 0.002, d: 0.1, s: 0.3, r: 0.18 } }); }
  _hat(t, vol, bus) { this.A.burst({ t0: t, dur: 0.05, vol, type: 'highpass', f0: 8000, dest: bus, env: { a: 0.001, d: 0.02, s: 0.2, r: 0.03 } }); }
  _pluck(m, t, dur, vol, bus, cut) { const A = this.A; A.tone({ type: 'sawtooth', f0: NOTE(m), t0: t, dur, vol, dest: A.filter('lowpass', cut, 2, bus), env: { a: 0.003, d: dur * 0.5, s: 0.2, r: dur * 0.5 } }); }
  _marimba(m, t, vol, bus) { const A = this.A, f = NOTE(m); A.tone({ f0: f, t0: t, dur: 0.5, vol, dest: bus, env: { a: 0.002, d: 0.12, s: 0.15, r: 0.35 } }); A.tone({ f0: f * 3.9, t0: t, dur: 0.12, vol: vol * 0.2, dest: bus, env: { a: 0.001, d: 0.04, s: 0.1, r: 0.06 } }); }
  _whale(t, bus) { const A = this.A, g = A.ctx.createGain(); g.gain.value = 0.0001; g.connect(bus); const o = A.osc('sine', 300, g); const f0 = rnd(220, 380); o.frequency.setValueAtTime(f0, t); o.frequency.linearRampToValueAtTime(f0 * rnd(1.2, 1.6), t + 1.2); o.frequency.linearRampToValueAtTime(f0 * 0.8, t + 3); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.025, t + 0.8); g.gain.exponentialRampToValueAtTime(0.0001, t + 3.2); o.start(t); o.stop(t + 3.3); }
}

export const audio = new AudioEngine();
