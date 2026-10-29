// ---------------------------------------------------------------------------
// The five quadrilaterals (LXD: spacecraft.docx, screens 8–12).
// Plan coordinates: x to the right, y up the screen (= forward, -z in the world).
// Every shape is centred on its area centroid, so a ship and an island of the
// same area line up exactly, and an island of another area is the ship's shape
// scaled about that same centre.
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';

const P = (x, y) => ({ x, y });
const DX = Math.sqrt(6 * 6 - 5 * 5);   // the parallelogram's slant side 6 over height 5 leans by √11

export function polyArea(pts) {
  let a = 0;
  for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; a += p.x * q.y - q.x * p.y; }
  return a / 2;
}
export function centroid(pts) {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[(i + 1) % pts.length], c = p.x * q.y - q.x * p.y;
    a += c; cx += (p.x + q.x) * c; cy += (p.y + q.y) * c;
  }
  a /= 2; return { x: cx / (6 * a), y: cy / (6 * a) };
}
function recentre(pts) { const c = centroid(pts); return pts.map((p) => P(p.x - c.x, p.y - c.y)); }

/* dims: what is drawn onto the ship (LXD), in order.
   edge   a dimension line beside edge [i, j], drawn outside the shape
   height a dashed perpendicular from point `from` to the base line (with a right-angle mark)
   diag   a dashed diagonal between vertices [i, j] */
export const SHAPES = [
  {
    key: 'square', name: 'Square', ordinal: 'first', accent: 0xff9a3c,
    verts: recentre([P(-2.5, -2.5), P(2.5, -2.5), P(2.5, 2.5), P(-2.5, 2.5)]),
    area: 25, islands: [20, 30, 25],
    rule: 'side × side', ruleHtml: '<span class="fx-k">Area</span> = side × side', work: '5 × 5', vo: { here: 's8.here', extra: 's8.space', rule: 's8.rule', ask: 's8.calc' }, hint: 'sq',
    dims: [{ type: 'edge', i: 0, j: 1, name: 'side', value: 5 }, { type: 'edge', i: 3, j: 0, name: 'side', value: 5 }],
  },
  {
    key: 'rectangle', name: 'Rectangle', ordinal: 'second', accent: 0x5cf2ff,
    verts: recentre([P(-4, -2), P(4, -2), P(4, 2), P(-4, 2)]),
    area: 32, islands: [24, 40, 32],
    rule: 'length × width', ruleHtml: '<span class="fx-k">Area</span> = length × width', work: '8 × 4', vo: { here: 's9.here', rule: 's9.rule', ask: 's9.find', after: 's9.after' }, hint: 're',
    dims: [{ type: 'edge', i: 0, j: 1, name: 'length', value: 8 }, { type: 'edge', i: 3, j: 0, name: 'width', value: 4 }],
  },
  {
    key: 'parallelogram', name: 'Parallelogram', ordinal: 'third', accent: 0x9dff5c,
    verts: recentre([P(-3.5 - DX / 2, -2.5), P(3.5 - DX / 2, -2.5), P(3.5 + DX / 2, 2.5), P(-3.5 + DX / 2, 2.5)]),
    area: 35, islands: [26, 42, 35],
    rule: 'base × height', ruleHtml: '<span class="fx-k">Area</span> = base × height', work: '7 × 5', vo: { here: 's10.here', rule: 's10.rule', ask: 's8.calc' }, hint: 'pa',
    dims: [
      { type: 'edge', i: 0, j: 1, name: 'base', value: 7 },
      { type: 'height', from: 3, base: [0, 1], name: 'height', value: 5 },
      { type: 'edge', i: 1, j: 2, name: 'slant side', value: 6, alt: true },
    ],
  },
  {
    key: 'rhombus', name: 'Rhombus', ordinal: 'fourth', accent: 0xff5ccf,
    verts: recentre([P(0, -3), P(4, 0), P(0, 3), P(-4, 0)]),
    area: 24, islands: [20, 30, 24],
    rule: '½ × diagonal 1 × diagonal 2', ruleHtml: '<span class="fx-k">Area</span> = ½ × diagonal 1 × diagonal 2', work: '½ × 6 × 8', vo: { here: 's11.here', rule: 's11.rule', ask: 's9.find' }, hint: 'rh',
    dims: [
      { type: 'diag', i: 0, j: 2, name: 'diagonal 1', value: 6 },
      { type: 'diag', i: 3, j: 1, name: 'diagonal 2', value: 8 },
      { type: 'edge', i: 1, j: 2, name: 'side', value: 5, alt: true },
    ],
  },
  {
    key: 'trapezium', name: 'Trapezium', ordinal: 'last', accent: 0xffe45c,
    verts: recentre([P(-6, -2.5), P(6, -2.5), P(4, 2.5), P(-4, 2.5)]),
    area: 50, islands: [40, 60, 50],
    rule: '½ × (sum of the parallel sides) × height', ruleHtml: '<span class="fx-k">Area</span> = ½ × (sum of the parallel sides) × height', work: '½ × (8 + 12) × 5', vo: { here: 's12.here', rule: 's12.rule', ask: 's8.calc' }, hint: 'tr',
    dims: [
      { type: 'edge', i: 2, j: 3, name: 'parallel side', value: 8, parallel: true },
      { type: 'edge', i: 0, j: 1, name: 'parallel side', value: 12, parallel: true },
      { type: 'height', from: 3, base: [0, 1], name: 'height', value: 5 },
    ],
  },
];
export const SHAPE = Object.fromEntries(SHAPES.map((s) => [s.key, s]));

// the LXD's numbers must hold: every ship's area is the one its correct island shows
for (const s of SHAPES) {
  const a = polyArea(s.verts);
  if (Math.abs(a - s.area) > 1e-6) console.error(`[shapes] ${s.key}: area ${a} ≠ ${s.area}`);
  if (!s.islands.includes(s.area)) console.error(`[shapes] ${s.key}: no island has the ship's area`);
}

/** the shape scaled about its centroid so that its area is `area` */
export function scaledVerts(shape, area) {
  const k = Math.sqrt(area / shape.area);
  return shape.verts.map((p) => P(p.x * k, p.y * k));
}
/** plan → world (y up the screen is -z) */
export const toWorld = (p, y = 0, out = new THREE.Vector3()) => out.set(p.x, y, -p.y);
export function threeShape(verts) {
  const s = new THREE.Shape();
  verts.forEach((p, i) => (i ? s.lineTo(p.x, p.y) : s.moveTo(p.x, p.y)));
  s.closePath();
  return s;
}
/** inward offset of a convex polygon (miter joins) */
export function inset(verts, d) {
  const n = verts.length, out = [];
  for (let i = 0; i < n; i++) {
    const a = verts[(i - 1 + n) % n], b = verts[i], c = verts[(i + 1) % n];
    const e1 = norm({ x: b.x - a.x, y: b.y - a.y }), e2 = norm({ x: c.x - b.x, y: c.y - b.y });
    const n1 = { x: -e1.y, y: e1.x }, n2 = { x: -e2.y, y: e2.x };   // inward for a counter-clockwise polygon
    const m = norm({ x: n1.x + n2.x, y: n1.y + n2.y });
    const k = d / Math.max(0.2, m.x * n1.x + m.y * n1.y);
    out.push(P(b.x + m.x * k, b.y + m.y * k));
  }
  return out;
}
function norm(v) { const l = Math.hypot(v.x, v.y) || 1; return { x: v.x / l, y: v.y / l }; }
export function bounds(verts) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of verts) { minX = Math.min(minX, p.x); minY = Math.min(minY, p.y); maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y); }
  return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
}
/** the foot of the perpendicular from p onto the line through a, b */
export function foot(p, a, b) {
  const dx = b.x - a.x, dy = b.y - a.y, t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy);
  return P(a.x + dx * t, a.y + dy * t);
}
/** is the point inside the convex polygon (plan coordinates)? */
export function inside(verts, x, y) {
  for (let i = 0; i < verts.length; i++) {
    const a = verts[i], b = verts[(i + 1) % verts.length];
    if ((b.x - a.x) * (y - a.y) - (b.y - a.y) * (x - a.x) < 0) return false;
  }
  return true;
}
/** a little SVG of the shape (the HUD's fleet row, the lesson's steps) */
export function shapeIcon(shape, { fill = 'none', stroke = '#5cf2ff', width = 2.4 } = {}) {
  const b = bounds(shape.verts), s = 26 / Math.max(b.w, b.h * 1.3);
  const pts = shape.verts.map((p) => `${((p.x - b.minX - b.w / 2) * s + 17).toFixed(1)},${(-(p.y - b.minY - b.h / 2) * s + 13).toFixed(1)}`).join(' ');
  return `<svg viewBox="0 0 34 26"><polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linejoin="round"/></svg>`;
}
