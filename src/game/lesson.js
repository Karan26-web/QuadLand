// ---------------------------------------------------------------------------
// Screen 6: the learning section. It is an app of its own: learning/, the
// team's "spacecraft landing mission learning" module (Swiftee teaches the
// area of each quadrilateral, with its own voice-overs, practice and tools),
// framed full-screen over the mission. Its page keeps its own styles and
// scripts, so nothing of it can touch the game's, or the game's it. The game
// keeps three things:
//   * Skip lesson › at the top right (a second press confirms), which ends it
//     at any point
//   * the hand-off: when the module's last page is done it posts
//     'learning:done', and the mission carries on to Screen 7
//   * quiet behind it: the 3D world stops drawing, and the music and the sea
//     fade, while the module plays its own sound
// ---------------------------------------------------------------------------
const SRC = 'learning/index.html';

export async function run(s, G, flow) {
  const root = document.getElementById('lesson'), A = G.audio;
  G.hud.show(false); G.ck.show(false);
  G.setWorld(null);                                      // nothing of the mission shows behind the module: spare the GPU
  A.music.stop(1.5);
  if (flow.sea) { flow.sea.stop(1.5); flow.sea = null; }  // Screen 7 brings the sea back

  clearTimeout(root._hideT);
  root.textContent = ''; root.classList.remove('leaving'); root.hidden = false;
  const frame = document.createElement('iframe');
  frame.className = 'ls-frame'; frame.src = SRC; frame.title = 'Area of quadrilaterals'; frame.allow = 'autoplay';
  root.appendChild(frame);

  // the module says when its last page is done
  let done;
  const finished = new Promise((r) => { done = r; });
  const onMessage = (e) => { if (e.source === frame.contentWindow && e.data && e.data.type === 'learning:done') done(); };
  addEventListener('message', onMessage);
  // fade the frame away; taking it out of the page silences it
  const leave = (now) => {
    removeEventListener('message', onMessage);
    if (now) frame.remove();
    root.classList.add('leaving');
    root._hideT = setTimeout(() => { root.hidden = true; root.classList.remove('leaving'); root.textContent = ''; }, 400);
  };
  // ended early (Skip, Restart): cut its sound at once
  s.onKill(() => leave(true));

  // the learner may skip the lesson (the user's brief); a second press confirms
  G.hud.skip(() => { flow.state.lessonSkipped = true; s.kill(); }, { label: 'Skip lesson', confirm: 'Press again to skip', short: ['Skip', 'Sure?'] });
  frame.addEventListener('load', () => frame.focus(), { once: true });

  await s.run(finished);
  leave(false);
  await s.waitReal(0.4);
}
