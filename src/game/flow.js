// ---------------------------------------------------------------------------
// The mission, in the LXD's order (spacecraft.docx):
//   1 title → (intro cinematic) → 2 cockpit (+ the trip to the water planet) →
//   3 dark sea + scan → 4 five zones → 5 the area hook → 6 the lesson →
//   7 back to the mission → 8–12 five landings → 13 mission complete
// One script runs the mission; the intro and the lesson run as child scripts, so
// Skip ends just them and the mission carries on. Restart (Screen 13) goes back to the
// cockpit, as the LXD asks.
// ---------------------------------------------------------------------------
import { ScriptRunner, Script, Cancelled, clock } from '../engine/clock.js';
import { tweens } from '../engine/tween.js';
import * as Title from './title.js';
import * as Intro from './intro.js';
import * as Cockpit from './cockpit.js';
import * as Survey from './survey.js';
import * as Lesson from './lesson.js';
import * as Landing from './landing.js';
import * as Complete from './complete.js';
import { cleanFx } from './common.js';
import { param } from '../engine/util.js';

export const ORDER = ['intro', 'cockpit', 'survey', 'lesson', 'back', 'land0', 'land1', 'land2', 'land3', 'land4', 'complete'];
const fresh = () => ({ landed: [false, false, false, false, false], misses: [0, 0, 0, 0, 0], hearts: 3, lessonMisses: 0, lessonSkipped: false });

export class Flow {
  constructor(G) { this.G = G; this.runner = new ScriptRunner(); this.state = fresh(); this.started = false; this.phase = 'boot'; }
  title() { this.phase = 'title'; this.runner.start('title', (s) => Title.run(s, this.G, this)); }
  begin(from = 'intro') {
    this.started = true;
    const s = param('screen'); if (s && from === 'intro' && ORDER.includes(s)) from = s;
    this.runner.start('mission', (sc) => this.mission(sc, from));
  }
  async mission(s, from) {
    let i = Math.max(0, ORDER.indexOf(from));
    if (i > 0) await this.prepare(s, ORDER[i]);
    for (; i < ORDER.length; i++) {
      const step = ORDER[i]; this.phase = step;
      if (step === 'intro') await this.sub(s, 'intro', (c) => Intro.run(c, this.G, this));
      else if (step === 'cockpit') await Cockpit.run(s, this.G, this);
      else if (step === 'survey') await Survey.run(s, this.G, this);
      else if (step === 'lesson') await this.sub(s, 'lesson', (c) => Lesson.run(c, this.G, this));
      else if (step === 'back') await Landing.back(s, this.G, this);
      else if (step.startsWith('land')) await Landing.run(s, this.G, this, +step.slice(4));
      else if (step === 'complete') await Complete.run(s, this.G, this);
    }
  }
  /** a child script: killing it (Skip) ends only it; killing the mission ends it too */
  async sub(parent, name, fn) {
    const child = new Script(name); parent.onKill(() => child.kill());
    this.child = child;
    try { await fn(child); } catch (e) { if (!(e instanceof Cancelled)) throw e; if (parent.dead) throw e; }
    finally { this.child = null; this.G.hud.skip(null); }
    parent.check();
  }
  /** a jump into the middle of the mission (Restart, ?screen=): set the worlds up as they would be by then */
  async prepare(s, step) {
    const k = ORDER.indexOf(step);
    if (k > ORDER.indexOf('survey')) Survey.prepare(this.G, this);
    if (k > ORDER.indexOf('back')) Landing.prepare(this.G, this, k - ORDER.indexOf('land0'));
  }
  /** Screen 13's RESTART: back to the cockpit with a fresh mission */
  restart() {
    const G = this.G;
    this.runner.stop(); G.voice.stop(); tweens.clear(); clock.scale = 1;
    G.audio.stopLoops(0.3);
    this.state = fresh();
    G.labels.clear(); G.hud.show(false); G.hud.formula(null); G.hud.caption(null); G.hud.hideNext(); G.hud.goShow(false); G.input.enable(false);
    document.getElementById('complete').hidden = true; document.getElementById('lesson').hidden = true; document.getElementById('feed').hidden = true;
    Landing.resetWorld(G); Survey.resetWorld(G); Cockpit.resetWorld(G);
    cleanFx(G);
    this.started = true;
    this.runner.start('mission', (sc) => this.mission(sc, 'cockpit'));
  }
  devView(view) { return import('./dev.js').then((m) => m.view(this.G, this, view)); }
}
