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
//   * its sound under the module: the 3D world stops drawing, every loop of the
//     mission stops (the sea, and the drone, whose buzz the LXD's second review
//     heard as "the background music in the learning section looking weird"),
//     and a soft music bed made for it plays low under the module's voice. The
//     module's own Sound off button silences the bed too.
// The module speaks the game's languages with the same codes (?lan=hi mr te gu
// od), so it opens in the player's language.
// ---------------------------------------------------------------------------
import { t, i18n } from '../engine/i18n.js';
import { stopDrone } from './survey.js';

const SRC = 'learning/index.html';

export async function run(s, G, flow) {
  const root = document.getElementById('lesson'), A = G.audio;
  G.hud.show(false); G.ck.show(false);
  G.setWorld(null);                                      // nothing of the mission shows behind the module: spare the GPU
  stopDrone(G, 1.0);
  if (flow.sea) flow.sea = null;                         // Screen 7 brings the sea back
  A.stopLoops(1.5);
  A.music.play('lesson', { fade: 2.5 });
  s.onKill(() => { if (A.music.mode === 'lesson') A.music.stop(0.8); });

  clearTimeout(root._hideT);
  root.textContent = ''; root.classList.remove('leaving'); root.hidden = false;
  const frame = document.createElement('iframe');
  frame.className = 'ls-frame'; frame.src = `${SRC}?lan=${i18n.moduleCode}`; frame.title = t('lesson.title'); frame.allow = 'autoplay';
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
  G.hud.skip(() => { flow.state.lessonSkipped = true; s.kill(); }, { label: t('ui.skipLesson'), confirm: t('ui.skipConfirm'), short: [t('ui.skip'), t('ui.skipConfirmShort')] });
  // the module's Sound off (#muteBtn, aria-pressed; remembered between sittings) silences the bed under it as well
  let watch = null;
  frame.addEventListener('load', () => {
    frame.focus();
    const btn = frame.contentDocument && frame.contentDocument.getElementById('muteBtn');
    if (!btn) return;
    const sync = () => A.music.hush(btn.getAttribute('aria-pressed') === 'true');
    watch = new MutationObserver(sync); watch.observe(btn, { attributes: true, attributeFilter: ['aria-pressed'] }); sync();
  }, { once: true });
  s.onKill(() => watch && watch.disconnect());

  await s.run(finished);
  if (watch) watch.disconnect();
  A.music.stop(1.2);
  leave(false);
  await s.waitReal(0.4);
}
