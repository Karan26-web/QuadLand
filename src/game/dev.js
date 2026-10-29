// ---------------------------------------------------------------------------
// Dev views (?view=…): one world, one camera, nothing running, for screenshots.
// ---------------------------------------------------------------------------
import { V } from './common.js';
import { prepare as surveyPrepare } from './survey.js';

export function view(G, flow, name) {
  document.getElementById('title').hidden = true;
  const d = G.director, P = G.planet, S = G.space;
  if (name === 'space' || name === 'fleet') {
    G.setWorld(S); S.fleet.forEach((f) => (f.visible = true));
    if (name === 'fleet') d.cut({ pos: V(-46, 14, 40), target: V(0, 2, -2), fov: 46 });
    else d.cut({ pos: V(-30, 6, 46), target: V(0, 4, -6), fov: 40 });
  } else if (name === 'planet' || name === 'islands' || name === 'sea' || name === 'low') {
    surveyPrepare(G);
    if (name === 'islands') for (const isl of P.allIslands) isl.placeRisen();
    for (const w of P.waves) w.centre.set(36, 0, -92);
    if (name === 'sea') d.cut({ pos: V(0, 30, 120), target: V(20, 0, -200), fov: 55 });
    else if (name === 'low') d.cut({ pos: V(-90, 5, 10), target: V(-40, 2, -60), fov: 50 });
    else d.cut({ pos: V(-20, 64, 118), target: V(36, 0, -100), fov: 54 });
    const sh = P.ships[0]; sh.visible = true; sh.position.set(-62, 9, -20);
  } else if (name === 'cockpit') {
    G.setWorld(S); S.command.visible = false; G.ck.show(true); G.ck.showReticle(true); G.ck.leverEnable(true); G.ck.showDescend(true);
    d.cut({ pos: V(0, 3, -12), target: V(-300, -60, -1000), fov: 55 });
  } else if (name === 'ship') {
    surveyPrepare(G);
    const sh = P.ships[+new URLSearchParams(location.search).get('k') || 0]; sh.visible = true; sh.position.set(-62, 9, -10);
    d.cut({ pos: V(-62, 26, 6), target: V(-62, 6, -12), fov: 50 });
  }
  void flow;
}
