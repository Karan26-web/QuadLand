// ---------------------------------------------------------------------------
// Screen 1: the start gate. "Spaceship Mission", the command ship under thrust,
// a loading bar that turns into PLAY. PLAY starts sound for the whole mission:
// a click, then the theme music, softly.
// ---------------------------------------------------------------------------
import { V } from './common.js';
import { Ease } from '../engine/util.js';

export async function run(s, G, flow) {
  const S = G.space;
  G.setWorld(S);
  S.command.visible = true; S.command.thrust = 1; S.fleet.forEach((f) => (f.visible = false));
  S.dust.speed = 18; S.flyDir.set(0, 0, -1);
  G.post.fx.exposure = 1;
  const d = G.director;
  d.cut({ pos: V(-30, 2, 46), target: V(0, 4, -6), fov: 36, roll: 0.06 });
  d.handheld(0.25);
  // a slow drift round the ship's tail: the engines blaze toward us
  let a = -0.62;
  d.follow((p, dt) => {
    a += dt * 0.012;
    const r = 52, h = 3 + Math.sin(a * 3) * 2;
    p.pos.set(Math.sin(a) * r, h, 6 + Math.cos(a) * r);
    p.target.set(0, 5.5, -8); p.fov = 36; p.roll = 0.05 * Math.sin(a * 2);
  }, 1.2);

  // the bar becomes PLAY
  const bar = document.getElementById('ttBar'), play = document.getElementById('btnPlay');
  await s.wait(0.35);
  bar.classList.add('morph');
  await s.waitReal(0.35);
  bar.hidden = true; play.hidden = false;
  if (G.dev || G.auto || new URLSearchParams(location.search).get('autoplay') === '1') { setTimeout(() => play.click(), 300); }
  await s.event(play, 'click');
  G.audio.unlock();
  G.audio.play('ui.click');
  G.audio.music.play('title', { fade: 3 });
  const title = document.getElementById('title'); title.classList.add('out');
  setTimeout(() => (title.hidden = true), 700);
  flow.begin('intro');
  void Ease;
}
