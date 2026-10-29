// ---------------------------------------------------------------------------
// Spaceship Mission: boot, the frame loop and the shared game context.
//   index.html → boot(): renderer, post, the two worlds (sky bakes), fonts, the
//   voice lines → the title (Screen 1) → PLAY → flow.js runs the mission.
// ---------------------------------------------------------------------------
import * as THREE from '../vendor/three.module.js';
import { Post } from './engine/post.js';
import { CameraDirector, pose } from './engine/camera.js';
import { LabelLayer } from './engine/labels.js';
import { input } from './engine/input.js';
import { clock } from './engine/clock.js';
import { tweens, uiTweens } from './engine/tween.js';
import { param, isTouch, clamp, nextFrame } from './engine/util.js';
import { audio } from './engine/audio.js';
import { voice } from './engine/voice.js';
import { art } from './engine/assets.js';
import { SpaceWorld } from './world/space.js';
import { PlanetWorld } from './world/planet.js';
import { HUD } from './ui/hud.js';
import { CockpitUI } from './ui/cockpitUI.js';
import { Flow } from './game/flow.js';

const touch = isTouch();
const canvas = document.getElementById('gl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, stencil: false, powerPreference: 'high-performance' });
renderer.toneMapping = THREE.NoToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0x05030f, 1);
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 30000);
const post = new Post(renderer);
const director = new CameraDirector(camera);
const labels = new LabelLayer(document.getElementById('labels'), camera);

/** The shared context every screen works through. */
export const G = {
  THREE, renderer, camera, post, director, labels, input, audio, voice, art, clock,
  space: null, planet: null, world: null, hud: null, ck: null, flow: null,
  frameHooks: new Set(), touch, dev: param('dev') === '1', auto: param('auto') === '1', plan: (param('plan') || '').split('-'),
  /** switch the world being drawn (space ↔ the water planet) */
  setWorld(w) { this.world = w; },
  onFrame(fn) { this.frameHooks.add(fn); return () => this.frameHooks.delete(fn); },
};
window.__ql = G;

/* --------------------------------------------------------------- sizing */
const QUALITY = { cap: touch ? 1.3 : 1.75, min: 0.6, cube: touch ? 512 : 1024 };
let dpr = clamp(+param('dpr', Math.min(devicePixelRatio || 1, QUALITY.cap)), 0.5, 3);
function resize() {
  const w = innerWidth, h = innerHeight;
  renderer.setPixelRatio(dpr); renderer.setSize(w, h, false);
  const bw = Math.round(w * dpr), bh = Math.round(h * dpr);
  post.setSize(bw, bh);
  camera.aspect = w / h; camera.updateProjectionMatrix();
  director.setView(w, h);
  document.documentElement.style.setProperty('--vh', `${h / 100}px`);
}
addEventListener('resize', resize);
resize();

/* ------------------------------------------------- adaptive resolution */
const perf = { acc: 0, n: 0, slow: 0, fast: 0, locked: param('dpr') != null };
function adapt(raw) {
  if (perf.locked || document.hidden) return;
  perf.acc += raw; perf.n++;
  if (perf.acc < 1) return;
  const avg = perf.acc / perf.n; perf.acc = 0; perf.n = 0;
  if (avg > 1 / 42) { perf.slow++; perf.fast = 0; } else if (avg < 1 / 58) { perf.fast++; perf.slow = 0; } else { perf.slow = perf.fast = 0; }
  if (perf.slow >= 2 && dpr > QUALITY.min) { dpr = Math.max(QUALITY.min, dpr - 0.15); perf.slow = 0; resize(); }
  else if (perf.fast >= 4 && dpr < QUALITY.cap) { dpr = Math.min(QUALITY.cap, dpr + 0.1); perf.fast = 0; resize(); }
}

/* ------------------------------------------------------------ the loop */
let last = performance.now(), running = false;
const FAST = clamp(+param('fast', 1), 0.25, 8);
function frame(now) {
  const raw = Math.min(0.05, Math.max(0, (now - last) / 1000)) * FAST; last = now;
  const { dt, ui } = clock.tick(raw);
  tweens.update(dt); uiTweens.update(ui);
  if (G.world) G.world.update(dt, camera);
  for (const fn of G.frameHooks) { try { fn(dt, ui); } catch (e) { console.error('[frame hook]', e); } }
  director.update(ui);
  post.fx.dirBlur.copy(director.blurOut);
  labels.update();
  if (G.world) post.render(G.world.scene, camera, clock.realTime);
  adapt(raw);
  requestAnimationFrame(frame);
}

/* ----------------------------------------------------------------- boot */
const bar = document.getElementById('ttFill'), pct = document.getElementById('ttPct');
let shown = 0;
function progress(p) {
  p = clamp(p, 0, 1); if (p < shown) return; shown = p;
  bar.style.width = `${(p * 100).toFixed(1)}%`; pct.textContent = `${Math.round(p * 100)}%`;
}

async function boot() {
  progress(0.02);
  const steps = [];
  // fonts and the GPT art (optional files; procedural stand-ins otherwise)
  steps.push(document.fonts ? Promise.all([document.fonts.load('800 32px "Exo 2"'), document.fonts.load('800 20px Nunito')]).catch(() => {}) : Promise.resolve());
  const artP = art.load((p) => progress(0.05 + p * 0.25));
  const voP = Promise.all([voice.load((p) => progress(0.3 + p * 0.25)), audio.loadFiles()]);
  await Promise.all([...steps, artP]);
  progress(0.32);
  await nextFrame();
  G.space = new SpaceWorld(renderer, { cubeSize: QUALITY.cube });
  progress(0.6); await nextFrame();
  G.planet = new PlanetWorld(renderer, { cubeSize: QUALITY.cube, seed: +param('seed', (Math.random() * 1e9) | 0) });
  progress(0.78); await nextFrame();
  art.apply(G);
  await voP;
  // compile every shader now, so the first warp or splash never hitches
  G.setWorld(G.planet); renderer.compile(G.planet.scene, camera);
  G.setWorld(G.space); renderer.compile(G.space.scene, camera);
  progress(0.92); await nextFrame();

  G.hud = new HUD(G);
  G.ck = new CockpitUI(G);
  input.init();
  G.flow = new Flow(G);
  progress(1);

  if (!running) { running = true; requestAnimationFrame((t) => { last = t; frame(t); }); }
  const view = param('view');
  if (view) { G.flow.devView(view); return; }
  G.flow.title();
}

boot().catch((e) => {
  console.error(e);
  const p = document.getElementById('ttPct'); if (p) p.textContent = 'error';
  const d = document.getElementById('dev'); if (d) { d.hidden = false; d.textContent = String(e && e.stack || e); d.style.cssText = 'position:fixed;left:8px;bottom:8px;right:8px;color:#ff9;font:12px monospace;white-space:pre-wrap;z-index:999'; }
});

export { pose };
