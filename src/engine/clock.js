// ---------------------------------------------------------------------------
// Clocks and scripts.
//  * clock.scale  slow motion for the world (0.2 = a touchdown in slow motion);
//                 the camera keeps real time, so it can swing round a slowed moment
//  * clock.paused stops both
//  * Script       a cancellable story beat: every wait throws Cancelled once the
//                 script is killed (Skip, Restart, a dev jump), so a screen is
//                 written as plain linear async code and can never run on behind
//                 the next one.
// ---------------------------------------------------------------------------
import { tweens, uiTweens } from './tween.js';

export const clock = {
  scale: 1, paused: false, time: 0, realTime: 0, dt: 0,
  /** world seconds since boot (slowed by scale, stopped by pause) */
  tick(rawDt) {
    const dt = this.paused ? 0 : rawDt * this.scale;
    const ui = this.paused ? 0 : rawDt;
    this.time += dt; this.realTime += ui; this.dt = dt;
    return { dt, ui };
  },
};

export class Cancelled extends Error { constructor() { super('cancelled'); this.name = 'Cancelled'; } }

export class Script {
  constructor(name = 'script') { this.name = name; this.dead = false; this._kills = new Set(); this._cleanups = []; }
  kill() {
    if (this.dead) return;
    this.dead = true;
    for (const k of this._kills) k();
    this._kills.clear();
    for (const fn of this._cleanups.splice(0)) { try { fn(); } catch (e) { console.warn('[script cleanup]', e); } }
  }
  get alive() { return !this.dead; }
  check() { if (this.dead) throw new Cancelled(); }
  /** run fn when the script is killed (stop a loop sound, remove a listener) */
  onKill(fn) { if (this.dead) fn(); else this._cleanups.push(fn); }
  /** Await a promise unless the script is killed first (then throw Cancelled). */
  async run(p) {
    this.check();
    let kill;
    const killed = new Promise((_, rej) => { kill = () => rej(new Cancelled()); this._kills.add(kill); });
    try { return await Promise.race([p, killed]); }
    finally { this._kills.delete(kill); }
  }
  /** game-time wait */
  wait(s) { return this.run(tweens.delay(s).promise); }
  /** real-time wait (through slow motion) */
  waitReal(s) { return this.run(uiTweens.delay(s).promise); }
  /** resolve once pred(dt) is true (checked every frame, given that frame's world seconds: never assume 60 frames a
      second, a tablet may draw 30); timeout in real seconds */
  until(pred, timeout = Infinity) {
    const t0 = performance.now();
    return this.run(new Promise((res) => {
      const step = () => {
        if (this.dead) return;
        let ok = false; try { ok = pred(clock.dt); } catch { ok = false; }
        if (ok || (performance.now() - t0) / 1000 > timeout) { res(ok); return; }
        requestAnimationFrame(step);
      };
      step();
    }));
  }
  /** resolve on the first matching event of an EventTarget */
  event(target, type, filter = null) {
    return this.run(new Promise((res) => {
      const h = (e) => { if (filter && !filter(e)) return; target.removeEventListener(type, h); res(e); };
      target.addEventListener(type, h);
      this.onKill(() => target.removeEventListener(type, h));
    }));
  }
}

/** a Script runner that only lets one script live: start() kills the previous one */
export class ScriptRunner {
  constructor() { this.current = null; }
  start(name, fn) {
    if (this.current) this.current.kill();
    const s = (this.current = new Script(name));
    const done = (async () => {
      try { await fn(s); return true; }
      catch (e) { if (e instanceof Cancelled) return false; console.error(`[${name}]`, e); return false; }
    })();
    return { script: s, done };
  }
  stop() { if (this.current) this.current.kill(); this.current = null; }
}
