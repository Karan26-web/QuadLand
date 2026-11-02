// ---------------------------------------------------------------------------
// Screen 6: the learning section. The LXD's brief names its span ("from the
// greeting to the last trapezium practice question"); its content is ours (see
// docs/GDD.md). No Swiftee (user, 2026-10-29): the Ship AI presents it, the same
// voice as the cockpit, its orb pulsing with the voice.
// Every rule is SHOWN before it is said:
//   square, rectangle  unit squares fill it row by row and are counted
//   parallelogram      a triangle is cut off and moved: it becomes a rectangle
//   rhombus            the rectangle round it: its four corner pieces flip onto it
//   trapezium          a copy turned upside down: together, a parallelogram
// Each ends with a practice question; a miss gets the idea of the mistake, a
// second the working, then the answer glows. A practice question cannot be failed.
// Skip lesson › (the user's brief) ends it at any point; it asks once more first.
// ---------------------------------------------------------------------------
import { V, say, fadeIn, fadeOut } from './common.js';
import { Ease, shuffle, clamp } from '../engine/util.js';
import { uiTweens } from '../engine/tween.js';
import { SHAPES, shapeIcon } from '../world/shapes.js';

const NS = 'http://www.w3.org/2000/svg';
const $ = (id) => document.getElementById(id);

/* -------------------------------------------------------- the board kit */
class Board {
  constructor(svg) { this.svg = svg; this.U = 56; this.O = { x: 500, y: 300 }; this.layer = null; this.reset(); }
  reset() {
    this.svg.innerHTML = `<defs>
      <filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <linearGradient id="fillA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7b5cff" stop-opacity=".55"/><stop offset="1" stop-color="#3a1f9a" stop-opacity=".45"/></linearGradient>
      <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ef6ff"/><stop offset="1" stop-color="#2bb8d8"/></linearGradient>
      <pattern id="hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="12" height="12" fill="#ffb547" fill-opacity=".18"/><rect width="5" height="12" fill="#ffb547" fill-opacity=".55"/></pattern>
    </defs>`;
    this.layer = this.el('g', {}, this.svg);
  }
  /** units → board px (y up) */
  frame(w, h, { U = null, cx = 500, cy = 290 } = {}) { this.U = U || Math.min(820 / w, 400 / h, 70); this.O = { x: cx - (w * this.U) / 2, y: cy + (h * this.U) / 2 }; }
  P(x, y) { return [this.O.x + x * this.U, this.O.y - y * this.U]; }
  el(tag, attrs = {}, parent = this.layer) { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; }
  pts(list) { return list.map(([x, y]) => this.P(x, y).map((v) => v.toFixed(1)).join(',')).join(' '); }
  poly(list, { fill = 'url(#fillA)', stroke = '#5cf2ff', width = 4, dash = null, glow = true, opacity = 1, parent } = {}) {
    const e = this.el('polygon', { points: this.pts(list), fill, stroke, 'stroke-width': width, 'stroke-linejoin': 'round', opacity, ...(dash ? { 'stroke-dasharray': dash } : {}), ...(glow ? { filter: 'url(#glow)' } : {}) }, parent);
    return e;
  }
  line(a, b, { stroke = '#ffd27a', width = 3.5, dash = '10 8', parent } = {}) {
    const [x1, y1] = this.P(...a), [x2, y2] = this.P(...b);
    return this.el('line', { x1, y1, x2, y2, stroke, 'stroke-width': width, 'stroke-linecap': 'round', ...(dash ? { 'stroke-dasharray': dash } : {}) }, parent);
  }
  text(x, y, s, cls = 'lbl', { anchor = 'middle', parent, size } = {}) {
    const [px, py] = this.P(x, y);
    const e = this.el('text', { x: px, y: py, class: cls, 'text-anchor': anchor, 'dominant-baseline': 'middle', ...(size ? { 'font-size': size } : {}) }, parent);
    e.textContent = s; return e;
  }
  rightAngle(at, along, up, s = 0.42) {
    const p = (k, l) => [at[0] + along[0] * k + up[0] * l, at[1] + along[1] * k + up[1] * l];
    return this.el('polyline', { points: this.pts([p(s, 0), p(s, s), p(0, s)]), fill: 'none', stroke: '#fff', 'stroke-width': 3 });
  }
  /** a dimension: a thin line beside the edge with end ticks, and the number */
  dim(a, b, label, { off = 0.55, cls = 'lbl k' } = {}) {
    const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy), nx = dy / l, ny = -dx / l;
    const A = [a[0] + nx * off, a[1] + ny * off], B = [b[0] + nx * off, b[1] + ny * off];
    const g = this.el('g', { opacity: 0 });
    this.line(A, B, { stroke: '#5cf2ff', width: 3, dash: null, parent: g });
    for (const p of [A, B]) this.line([p[0] - nx * 0.18, p[1] - ny * 0.18], [p[0] + nx * 0.18, p[1] + ny * 0.18], { stroke: '#5cf2ff', width: 3, dash: null, parent: g });
    this.text((A[0] + B[0]) / 2 + nx * 0.45, (A[1] + B[1]) / 2 + ny * 0.45, label, cls, { parent: g });
    return g;
  }
}
const anim = (dur, fn, ease = Ease.inOutCubic) => uiTweens.add({ duration: dur, ease, onUpdate: (e) => fn(e) }).promise;
const show = (el, dur = 0.35) => anim(dur, (e) => el.setAttribute('opacity', String(e)));
function drawIn(el, dur = 0.8) {
  const len = el.getTotalLength ? el.getTotalLength() : 1000;
  el.style.strokeDasharray = `${len}`; el.style.strokeDashoffset = `${len}`;
  el.setAttribute('fill-opacity', '0');
  return anim(dur, (e) => { el.style.strokeDashoffset = String(len * (1 - e)); el.setAttribute('fill-opacity', String(clamp((e - 0.6) / 0.4, 0, 1))); }).then(() => { el.style.strokeDasharray = ''; });
}

/* --------------------------------------------------------------- the run */
export async function run(s, G, flow) {
  const A = G.audio, root = $('lesson'), board = new Board($('lsSvg'));
  const steps = $('lsSteps'), title = $('lsTitle'), rule = $('lsRule');
  steps.innerHTML = SHAPES.map((sh) => `<div class="st" data-k="${sh.key}">${shapeIcon(sh, { stroke: '#8ee8ff' })}</div>`).join('');
  const setStep = (i) => [...steps.children].forEach((el, j) => { el.classList.toggle('now', j === i); el.classList.toggle('done', j < i); });
  const setTitle = (t) => { title.textContent = t; };
  const setRule = (html) => { rule.innerHTML = html || ''; rule.classList.toggle('show', !!html); if (html) A.play('formula'); };
  // the scene behind: the planet, frosted
  G.setWorld(G.planet); G.hud.show(false);
  G.post.fx.blurMix = 0.88; G.post.fx.blurDim = 0.5;
  G.director.cut({ pos: V(10, 70, 140), target: V(36, 0, -96), fov: 50 });
  G.director.orbit({ center: V(36, 0, -96), radius: 220, height: 80, from: 0, to: 40, dur: 600, ease: Ease.linear });
  clearTimeout(root._hideT); root.hidden = false; root.classList.remove('leaving'); document.body.classList.add('lesson-on');
  // ended early (Skip, Restart): the board fades away while the mission fades in behind it
  s.onKill(() => {
    root.classList.add('leaving'); document.body.classList.remove('lesson-on'); G.post.fx.blurMix = 0;
    root._hideT = setTimeout(() => { root.hidden = true; root.classList.remove('leaving'); }, 400);
  });
  A.music.play('lesson', { fade: 2 });
  const orb = orbLoop(G); s.onKill(orb);
  await fadeIn(G, 0.8);
  // the learner may skip the lesson (the user's brief); a second press confirms
  G.hud.skip(() => { flow.state.lessonSkipped = true; G.voice.stop(); s.kill(); }, { label: 'Skip lesson', confirm: 'Press again to skip', short: ['Skip', 'Sure?'] });
  const ctx = { s, G, board, A, setTitle, setRule, flow };

  /* -- what is area */
  setStep(-1); setTitle('What is area?'); board.reset(); board.frame(6, 3.4);
  const icons = SHAPES.map((sh, i) => { const g = board.el('g', { opacity: 0, transform: `translate(${170 + i * 165} 260) scale(3.2)` }); g.innerHTML = shapeIcon(sh, { stroke: '#5cf2ff', fill: 'rgba(123,92,255,.35)' }).replace(/<\/?svg[^>]*>/g, ''); return g; });
  const hello = say(s, G, 'l.hello');
  for (const [i, g] of icons.entries()) { show(g, 0.4); A.play('tile', { i: i * 2 }); await s.waitReal(0.28); }
  await hello;
  for (const g of icons) show(g, 0.3).then(() => g.remove()).catch(() => {});
  await s.waitReal(0.35);
  board.reset(); board.frame(6, 3);
  const big = board.poly([[0, 0], [6, 0], [6, 3], [0, 3]], { fill: 'url(#fillA)' });
  const p1 = say(s, G, 'l.area1');
  await s.run(drawIn(big, 1.2));
  await p1;
  const unit = board.poly([[0, 0], [1, 0], [1, 1], [0, 1]], { fill: 'url(#tile)', stroke: '#e8fdff', width: 3 }); unit.setAttribute('opacity', '0');
  const ul = board.text(0.5, -0.65, '1 square unit', 'lbl k', { size: 26 }); ul.setAttribute('opacity', '0');
  const p2 = say(s, G, 'l.area2');
  await s.run(show(unit, 0.4)); A.play('snap'); await s.run(show(ul, 0.3));
  const gridLines = board.el('g', { opacity: 0 });
  for (let x = 1; x < 6; x++) board.line([x, 0], [x, 3], { stroke: '#8ee8ff', width: 1.5, dash: '4 6', parent: gridLines });
  for (let y = 1; y < 3; y++) board.line([0, y], [6, y], { stroke: '#8ee8ff', width: 1.5, dash: '4 6', parent: gridLines });
  await s.waitReal(0.8); await s.run(show(gridLines, 0.8));
  await p2; await s.waitReal(0.4);

  await square(ctx); setStep(1);
  await rectangle(ctx); setStep(2);
  await parallelogram(ctx); setStep(3);
  await rhombus(ctx); setStep(4);
  await trapezium(ctx); setStep(5);
  setRule(''); await s.waitReal(0.5);
  await fadeOut(G, 0.9);
  root.hidden = true; document.body.classList.remove('lesson-on'); G.post.fx.blurMix = 0; orb();
}

/* ---------------------------------------------------------------- square */
async function square({ s, G, board, A, setTitle, setRule }) {
  setTitle('Area of a square'); setRule(''); board.reset(); board.frame(4, 4, { U: 66, cx: 400 });
  const sq = board.poly([[0, 0], [4, 0], [4, 4], [0, 4]]);
  const a = say(s, G, 'l.sq.1');
  await s.run(drawIn(sq, 1));
  const d1 = board.dim([0, 0], [4, 0], '4'), d2 = board.dim([0, 4], [0, 0], '4');
  await s.run(show(d1)); await s.run(show(d2));
  await a;
  const b = say(s, G, 'l.sq.2');
  await tiles(s, board, A, 4, 4, 0.11);
  await b;
  const eq = board.text(4.9, 2, '4 × 4 = 16', 'lbl n big', { anchor: 'start' }); eq.setAttribute('opacity', '0');
  const c = say(s, G, 'l.sq.3'); await s.run(show(eq, 0.4)); A.play('snap'); await c;
  setRule('<span class="k">Area of a square</span> = side × side');
  await say(s, G, 'l.sq.rule', { after: 0.5 });
  // practice
  board.reset(); board.frame(6, 6, { U: 44, cy: 270 });
  board.poly([[0, 0], [6, 0], [6, 6], [0, 6]]);
  const q1 = board.dim([0, 0], [6, 0], '6'), q2 = board.dim([0, 6], [0, 0], '6'); q1.setAttribute('opacity', 1); q2.setAttribute('opacity', 1);
  await practice({ s, G, A, board }, { line: 'l.sq.q', text: 'A square has sides of 6 units. What is its area?', options: [24, 36, 12], answer: 36,
    hints: { 24: 'l.sq.h24', 12: 'l.sq.h12' }, work: 'l.sq.w', workText: 'side × side = 6 × 6 = 36',
    showWork: async () => { await tiles(s, board, A, 6, 6, 0.03); } });
}

/* ------------------------------------------------------------- rectangle */
async function rectangle({ s, G, board, A, setTitle, setRule }) {
  setTitle('Area of a rectangle'); setRule(''); board.reset(); board.frame(5, 3, { U: 74, cx: 390 });
  const r = board.poly([[0, 0], [5, 0], [5, 3], [0, 3]]);
  const a = say(s, G, 'l.re.1');
  await s.run(drawIn(r, 1));
  const d1 = board.dim([0, 0], [5, 0], 'length 5'), d2 = board.dim([0, 3], [0, 0], 'width 3');
  await s.run(show(d1)); await s.run(show(d2));
  await a;
  const b = say(s, G, 'l.re.2'); await tiles(s, board, A, 5, 3, 0.12); await b;
  const eq = board.text(5.8, 1.5, '5 × 3 = 15', 'lbl n big', { anchor: 'start' }); eq.setAttribute('opacity', '0');
  const c = say(s, G, 'l.re.3'); await s.run(show(eq, 0.4)); A.play('snap'); await c;
  setRule('<span class="k">Area of a rectangle</span> = length × width');
  await say(s, G, 'l.re.rule', { after: 0.5 });
  board.reset(); board.frame(7, 4, { U: 58, cy: 270 });
  board.poly([[0, 0], [7, 0], [7, 4], [0, 4]]);
  board.dim([0, 0], [7, 0], 'length 7').setAttribute('opacity', 1); board.dim([0, 4], [0, 0], 'width 4').setAttribute('opacity', 1);
  await practice({ s, G, A, board }, { line: 'l.re.q', text: 'A rectangle is 7 units long and 4 units wide. What is its area?', options: [22, 28, 11], answer: 28,
    hints: { 22: 'l.re.h22', 11: 'l.re.h11' }, work: 'l.re.w', workText: 'length × width = 7 × 4 = 28', showWork: async () => { await tiles(s, board, A, 7, 4, 0.03); } });
}

/* --------------------------------------------------------- parallelogram */
async function parallelogram({ s, G, board, A, setTitle, setRule }) {
  setTitle('Area of a parallelogram'); setRule(''); board.reset(); board.frame(8, 4, { U: 62 });
  const shape = board.poly([[0, 0], [6, 0], [8, 4], [2, 4]]);
  const a = say(s, G, 'l.pa.1');
  await s.run(drawIn(shape, 1));
  const base = board.dim([0, 0], [6, 0], 'base 6'); await s.run(show(base));
  const hl = board.line([2, 4], [2, 0]); hl.setAttribute('opacity', '0'); await s.run(show(hl));
  const ra = board.rightAngle([2, 0], [1, 0], [0, 1]); const hlab = board.text(2.55, 2, 'height 4', 'lbl n', { anchor: 'start' });
  A.play('snap'); await a;
  // the slanted side is not the height
  const slant = board.line([0, 0], [2, 4], { stroke: '#ff8fa6', width: 6, dash: null }); slant.setAttribute('opacity', '0');
  const sl = board.text(-0.2, 2.4, 'slanted side', 'lbl', { anchor: 'end', size: 24 }); sl.setAttribute('opacity', '0');
  const b = say(s, G, 'l.pa.2'); await s.waitReal(1.2); await s.run(show(slant)); await s.run(show(sl)); await b;
  await s.run(show(slant, 0.3).then(() => anim(0.3, (e) => { slant.setAttribute('opacity', String(1 - e)); sl.setAttribute('opacity', String(1 - e)); })));
  // cut and move
  const c = say(s, G, 'l.pa.3');
  const tri = board.poly([[0, 0], [2, 0], [2, 4]], { fill: 'url(#hatch)', stroke: '#ffb547', width: 4 });
  tri.setAttribute('opacity', '0'); await s.run(show(tri, 0.4));
  A.play('cut');
  await s.waitReal(0.6);
  A.play('move');
  const dx = 6 * board.U;
  await s.run(anim(1.3, (e) => tri.setAttribute('transform', `translate(${(dx * e).toFixed(1)} ${(-Math.sin(e * Math.PI) * 30).toFixed(1)})`), Ease.inOutCubic));
  A.play('snap');
  shape.setAttribute('points', board.pts([[2, 0], [6, 0], [8, 0], [8, 4], [2, 4]]));
  base.remove(); ra.remove();
  await c;
  const d = say(s, G, 'l.pa.4');
  const nb = board.dim([2, 0], [8, 0], '6'); await s.run(show(nb));
  hlab.textContent = '4'; hl.setAttribute('stroke', '#5cf2ff');
  const eq = board.text(5, -1.75, '6 × 4 = 24', 'lbl n big'); eq.setAttribute('opacity', '0'); await s.waitReal(1.6); await s.run(show(eq)); A.play('snap');
  await d;
  setRule('<span class="k">Area of a parallelogram</span> = base × height');
  await say(s, G, 'l.pa.rule', { after: 0.5 });
  board.reset(); board.frame(11, 4, { U: 52, cy: 265 });
  board.poly([[0, 0], [9, 0], [12, 4], [3, 4]].map(([x, y]) => [x - 0.5, y]));
  board.dim([-0.5, 0], [8.5, 0], 'base 9').setAttribute('opacity', 1);
  board.line([2.5, 4], [2.5, 0]); board.rightAngle([2.5, 0], [1, 0], [0, 1]); board.text(3.05, 2, 'height 4', 'lbl n', { anchor: 'start' });
  board.text(0.4, 2.6, 'slanted side 5', 'lbl', { anchor: 'end', size: 24 });
  await practice({ s, G, A, board }, { line: 'l.pa.q', text: 'Base 9 units, height 4 units, slanted side 5 units. What is its area?', options: [45, 36, 28], answer: 36,
    hints: { 45: 'l.pa.h45', 28: 'l.pa.h28' }, work: 'l.pa.w', workText: 'base × height = 9 × 4 = 36' });
}

/* --------------------------------------------------------------- rhombus */
async function rhombus({ s, G, board, A, setTitle, setRule }) {
  setTitle('Area of a rhombus'); setRule(''); board.reset(); board.frame(10, 4, { U: 66 });
  const R = [[0, 2], [5, 0], [10, 2], [5, 4]];
  const shape = board.poly(R);
  const a = say(s, G, 'l.rh.1');
  await s.run(drawIn(shape, 1.1));
  // equal-side ticks
  const ticks = board.el('g', { opacity: 0 });
  for (let i = 0; i < 4; i++) { const p = R[i], q = R[(i + 1) % 4], m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy); board.line([m[0] - (dy / l) * 0.22, m[1] + (dx / l) * 0.22], [m[0] + (dy / l) * 0.22, m[1] - (dx / l) * 0.22], { stroke: '#fff', width: 3, dash: null, parent: ticks }); }
  await s.run(show(ticks)); await a;
  const b = say(s, G, 'l.rh.2');
  const d1 = board.line([0, 2], [10, 2]); const d2 = board.line([5, 0], [5, 4]);
  d1.setAttribute('opacity', 0); d2.setAttribute('opacity', 0);
  await s.run(show(d1)); board.text(7.6, 2.35, '10', 'lbl n'); A.play('snap');
  await s.run(show(d2)); board.text(5.4, 3.2, '4', 'lbl n', { anchor: 'start' }); A.play('snap');
  board.rightAngle([5, 2], [1, 0], [0, 1], 0.32);
  await b;
  const c = say(s, G, 'l.rh.3');
  const rect = board.poly([[0, 0], [10, 0], [10, 4], [0, 4]], { fill: 'none', stroke: '#ffd27a', width: 3, dash: '12 8', glow: false });
  rect.setAttribute('opacity', 0); await s.run(show(rect, 0.6));
  const r1 = board.dim([0, 0], [10, 0], '10', { cls: 'lbl n' }), r2 = board.dim([0, 4], [0, 0], '4', { cls: 'lbl n' });
  await s.run(show(r1)); await s.run(show(r2));
  await c;
  // the four corner pieces flip in onto the rhombus: it is half of the rectangle
  const d = say(s, G, 'l.rh.4');
  const corners = [[[0, 0], [5, 0], [0, 2]], [[10, 0], [10, 2], [5, 0]], [[10, 4], [5, 4], [10, 2]], [[0, 4], [0, 2], [5, 4]]];
  const pieces = corners.map((t) => { const e = board.poly(t, { fill: 'url(#hatch)', stroke: '#ffb547', width: 3 }); e.setAttribute('opacity', 0); return e; });
  for (const p of pieces) { show(p, 0.3); }
  await s.waitReal(0.9);
  for (let i = 0; i < 4; i++) {
    const t = corners[i], m = board.P((t[1][0] + t[2][0]) / 2, (t[1][1] + t[2][1]) / 2);
    A.play('move');
    await s.run(anim(0.85, (e) => pieces[i].setAttribute('transform', `rotate(${(180 * e).toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)})`)));
    A.play('snap');
  }
  await d;
  const e = say(s, G, 'l.rh.5');
  const eq = board.text(5, -1.75, '½ × 10 × 4 = 20', 'lbl n big'); eq.setAttribute('opacity', 0); await s.run(show(eq)); A.play('snap'); await e;
  setRule('<span class="k">Area of a rhombus</span> = ½ × diagonal 1 × diagonal 2');
  await say(s, G, 'l.rh.rule', { after: 0.5 });
  board.reset(); board.frame(12, 5, { U: 52, cy: 265 });
  board.poly([[0, 2.5], [6, 0], [12, 2.5], [6, 5]]);
  board.line([0, 2.5], [12, 2.5]); board.line([6, 0], [6, 5]);
  board.text(9.4, 1.9, 'diagonal 12', 'lbl n'); board.text(6.35, 3.75, 'diagonal 5', 'lbl n', { anchor: 'start' });
  await practice({ s, G, A, board }, { line: 'l.rh.q', text: 'A rhombus has diagonals of 12 units and 5 units. What is its area?', options: [60, 30, 17], answer: 30,
    hints: { 60: 'l.rh.h60', 17: 'l.rh.h17' }, work: 'l.rh.w', workText: '½ × diagonal 1 × diagonal 2 = ½ × 12 × 5 = 30' });
}

/* ------------------------------------------------------------- trapezium */
async function trapezium({ s, G, board, A, setTitle, setRule }) {
  setTitle('Area of a trapezium'); setRule(''); board.reset(); board.frame(12, 4, { U: 60 });
  const T = [[0, 0], [7, 0], [5, 4], [2, 4]];
  const shape = board.poly(T);
  const a = say(s, G, 'l.tr.1');
  await s.run(drawIn(shape, 1));
  const top = board.dim([5, 4], [2, 4], '3'), bot = board.dim([0, 0], [7, 0], '7');
  await s.run(show(top)); await s.run(show(bot));
  board.line([2, 4], [2, 0]); board.rightAngle([2, 0], [1, 0], [0, 1]); const hl = board.text(2.5, 2, 'height 4', 'lbl n', { anchor: 'start' });
  await a;
  // a copy, turned upside down, slides in beside it
  const b = say(s, G, 'l.tr.2');
  const copy = board.poly(T, { fill: 'rgba(92,242,255,.22)', stroke: '#8ef6ff', width: 4 });
  const m = board.P(6, 2);
  copy.setAttribute('transform', `translate(${4 * board.U} 0)`);
  copy.setAttribute('opacity', 0); await s.run(show(copy, 0.4));
  A.play('move');
  await s.run(anim(1.0, (e) => copy.setAttribute('transform', `translate(${(4 * board.U).toFixed(1)} ${(-e * 40).toFixed(1)}) rotate(${(180 * e).toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)})`)));
  await b;
  const c = say(s, G, 'l.tr.3');
  A.play('move');
  await s.run(anim(1.1, (e) => copy.setAttribute('transform', `translate(${(4 * board.U * (1 - e)).toFixed(1)} ${(-40 * (1 - e)).toFixed(1)}) rotate(180 ${m[0].toFixed(1)} ${m[1].toFixed(1)})`)));
  A.play('snap');
  const par = board.poly([[0, 0], [10, 0], [12, 4], [2, 4]], { fill: 'none', stroke: '#ffd27a', width: 5, glow: true });
  par.setAttribute('opacity', 0); await s.run(show(par, 0.5));
  await c;
  const d = say(s, G, 'l.tr.4');
  bot.remove();
  const nb = board.dim([0, 0], [10, 0], '3 + 7 = 10', { cls: 'lbl n' }); await s.run(show(nb));
  hl.textContent = '4';
  const eq = board.text(6, -2.0, '10 × 4 = 40', 'lbl n big'); eq.setAttribute('opacity', 0); await s.waitReal(2.0); await s.run(show(eq)); A.play('snap');
  await d;
  const e = say(s, G, 'l.tr.5');
  await s.run(anim(0.6, (k) => { copy.setAttribute('opacity', String(1 - k * 0.8)); par.setAttribute('opacity', String(1 - k)); }));
  eq.textContent = '½ × 10 × 4 = 20'; A.play('snap');
  await e;
  setRule('<span class="k">Area of a trapezium</span> = ½ × (sum of the parallel sides) × height');
  await say(s, G, 'l.tr.rule', { after: 0.5 });
  board.reset(); board.frame(9, 4, { U: 62, cy: 265 });
  board.poly([[0, 0], [9, 0], [7, 4], [2, 4]]);
  board.dim([7, 4], [2, 4], '5').setAttribute('opacity', 1); board.dim([0, 0], [9, 0], '9').setAttribute('opacity', 1);
  board.line([2, 4], [2, 0]); board.rightAngle([2, 0], [1, 0], [0, 1]); board.text(2.5, 2, 'height 4', 'lbl n', { anchor: 'start' });
  await practice({ s, G, A, board }, { line: 'l.tr.q', text: 'Parallel sides of 5 units and 9 units, height 4 units. What is its area?', options: [56, 28, 36], answer: 28,
    hints: { 56: 'l.tr.h56', 36: 'l.tr.h36' }, work: 'l.tr.w', workText: '½ × (5 + 9) × 4 = ½ × 14 × 4 = 28' });
}

/* ----------------------------------------------------------- helpers */
async function tiles(s, board, A, w, h, gap) {
  const g = board.el('g');
  let n = 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    n++;
    const t = board.poly([[x + 0.06, y + 0.06], [x + 0.94, y + 0.06], [x + 0.94, y + 0.94], [x + 0.06, y + 0.94]], { fill: 'url(#tile)', stroke: '#e8fdff', width: 1.5, glow: false, parent: g });
    t.setAttribute('opacity', '0.92');
    if (w * h <= 20) board.text(x + 0.5, y + 0.5, String(n), 'cnt', { parent: g });
    A.play('tile', { i: n % 10, minGap: 0 });
    await s.waitReal(gap);
  }
  return g;
}

let okRot = 0;
async function practice({ s, G, A }, q) {
  const box = $('lsQuestion'), qEl = $('lsQ'), opts = $('lsOpts'), hint = $('lsHint');
  $('lsRule').classList.remove('show');            // the question takes the board's foot
  box.hidden = false; hint.hidden = true; qEl.textContent = q.text; document.body.classList.add('question-on');
  s.onKill(() => { box.hidden = true; document.body.classList.remove('question-on'); });
  const order = shuffle(q.options);
  opts.innerHTML = order.map((v) => `<button class="ls-opt" data-v="${v}">${v}<small>sq units</small></button>`).join('');
  const buttons = [...opts.children];
  await say(s, G, q.line, { after: 0 });
  G.voice.hideSub(0);
  let misses = 0;
  for (;;) {
    if (G.auto) { const wrong = buttons.find((b) => +b.dataset.v !== q.answer && q.hints[+b.dataset.v]); const pickB = misses === 0 && wrong ? wrong : buttons.find((b) => +b.dataset.v === q.answer); setTimeout(() => pickB.click(), 900); }
    const pick = await s.run(new Promise((res) => {
      const on = (e) => { const b = e.target.closest('.ls-opt'); if (b && !b.disabled) { opts.removeEventListener('click', on); res(b); } };
      opts.addEventListener('click', on); s.onKill(() => opts.removeEventListener('click', on));
    }));
    const v = +pick.dataset.v;
    if (v === q.answer) {
      buttons.forEach((b) => { b.disabled = true; b.classList.remove('glow', 'wrong'); });
      pick.classList.add('right'); A.play('ui.correct');
      hint.hidden = true;
      okRot = (okRot % 5) + 1;
      await say(s, G, `l.ok${okRot}`, { after: 0.6 });
      break;
    }
    misses++;
    pick.classList.add('wrong'); A.play('ui.wrong');
    buttons.forEach((b) => (b.disabled = true));
    setTimeout(() => pick.classList.remove('wrong'), 600);
    if (misses === 1 && q.hints[v]) {
      hint.textContent = G.voice.text(q.hints[v]); hint.hidden = false; A.play('ui.hint');
      await say(s, G, q.hints[v], { after: 0 });
    } else {
      hint.textContent = q.workText; hint.hidden = false; A.play('ui.hint');
      const wp = say(s, G, q.work, { after: 0 });
      if (q.showWork) await q.showWork();
      await wp;
      const right = buttons.find((b) => +b.dataset.v === q.answer); right.classList.add('glow');
      await say(s, G, 'l.lookglow', { after: 0 });
    }
    G.voice.hideSub(0);
    buttons.forEach((b) => (b.disabled = false));
  }
  box.hidden = true; document.body.classList.remove('question-on');
}

/** the Ship AI's orb: a ring of light that swells with the voice */
function orbLoop(G) {
  const c = $('lsOrb'), g = c.getContext('2d'); let t = 0, lv = 0;
  return G.onFrame((dt, ui) => {
    t += ui; lv += (G.voice.level() - lv) * 0.3;
    g.clearRect(0, 0, 96, 96);
    const r = 22 + lv * 12 + Math.sin(t * 2) * 1.5;
    const gr = g.createRadialGradient(48, 48, 2, 48, 48, r + 16); gr.addColorStop(0, 'rgba(230,253,255,.95)'); gr.addColorStop(0.35, 'rgba(92,242,255,.75)'); gr.addColorStop(1, 'rgba(92,242,255,0)');
    g.fillStyle = gr; g.beginPath(); g.arc(48, 48, r + 16, 0, Math.PI * 2); g.fill();
    g.strokeStyle = 'rgba(139,92,255,.9)'; g.lineWidth = 3; g.beginPath();
    for (let i = 0; i <= 64; i++) { const a = (i / 64) * Math.PI * 2, rr = r + 6 + Math.sin(a * 5 + t * 6) * lv * 6; g.lineTo(48 + Math.cos(a) * rr, 48 + Math.sin(a) * rr); }
    g.closePath(); g.stroke();
  });
}
