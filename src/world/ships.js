// ---------------------------------------------------------------------------
// The craft, all procedural (GPT paints images, not models):
//  * QuadShip     one of the five: a bevelled slab whose footprint is EXACTLY its
//                 LXD shape, a glass canopy, two rear engines, four hover jets at the
//                 corners (blue flames while hovering), landing legs, corner beacons,
//                 and its sides in light (edges.js)
//  * CommandShip  the commander's ship (the reference frame's Stellosphere): long
//                 lathe hull, swept wings, three pods with glowing honeycomb nozzles
//  * Drone        the survey drone: a round body with one big eye
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { Tex } from './textures.js';
import { inset, threeShape, centroid, bounds, toWorld, inside } from './shapes.js';
import { EdgeGlow } from './edges.js';
import { damp, clamp } from '../engine/util.js';

/* ------------------------------------------------------------- flame + glow */
const FLAME_VERT = /* glsl */`
varying float vAlong; varying vec2 vUv; varying vec3 vN; varying vec3 vV;
void main() {
  vUv = uv; vAlong = 1.0 - uv.y;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vN = normalize(mat3(modelMatrix) * normal); vV = normalize(cameraPosition - wp.xyz);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;
const FLAME_FRAG = /* glsl */`
uniform float uTime, uPower, uSeed; uniform vec3 uCore, uMid, uTip;
varying float vAlong; varying vec2 vUv; varying vec3 vN; varying vec3 vV;
float h(float x) { return fract(sin(x) * 43758.5453); }
void main() {
  float a = vAlong;
  float flick = 0.75 + 0.25 * sin(uTime * 41.0 + uSeed * 7.0 + a * 9.0) * sin(uTime * 23.0 + uSeed);
  float stripes = 0.85 + 0.15 * sin(vUv.x * 40.0 + uTime * 30.0 + a * 12.0);
  vec3 col = mix(uCore, uMid, smoothstep(0.0, 0.35, a));
  col = mix(col, uTip, smoothstep(0.35, 1.0, a));
  float facing = pow(abs(dot(normalize(vN), normalize(vV))), 0.7);
  // max(): at the tip 1 - a can land a hair below zero, and pow() of a negative is NaN (a black hole in a white blob)
  float alpha = pow(max(1.0 - a, 0.0), 1.4) * facing * flick * stripes * uPower;
  gl_FragColor = vec4(col * alpha * 2.2, alpha);
}`;
export function flameMaterial({ core = 0xffffff, mid = 0xffb347, tip = 0xff3ea5, seed = Math.random() * 10 } = {}) {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPower: { value: 1 }, uSeed: { value: seed }, uCore: { value: new THREE.Color(core) }, uMid: { value: new THREE.Color(mid) }, uTip: { value: new THREE.Color(tip) } },
    vertexShader: FLAME_VERT, fragmentShader: FLAME_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
  });
}
/** a cone from its base (the nozzle, at the origin) to its tip along -Y; scale.y is the flame's length */
function flameCone(radius, mat) {
  const g = new THREE.CylinderGeometry(radius, radius * 0.08, 1, 16, 6, true);
  g.translate(0, -0.5, 0);
  const m = new THREE.Mesh(g, mat); m.frustumCulled = false; m.renderOrder = 5;
  return m;
}
export function glowSprite(color = 0xffffff, size = 1, opacity = 1) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: Tex.glow(), color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false }));
  s.scale.setScalar(size); s.renderOrder = 6;
  return s;
}

const HONEY_FRAG = /* glsl */`
uniform float uTime, uPower; varying vec2 vUv;
float hexDist(vec2 p) { p = abs(p); return max(dot(p, normalize(vec2(1.0, 1.732))), p.x); }
void main() {
  vec2 uv = (vUv - 0.5) * 2.0; float r = length(uv);
  vec2 p = uv * 4.2; vec2 s = vec2(1.0, 1.732);
  vec2 a = mod(p, s) - s * 0.5, b = mod(p - s * 0.5, s) - s * 0.5;
  vec2 g = dot(a, a) < dot(b, b) ? a : b;
  float edge = smoothstep(0.38, 0.5, hexDist(g));
  float pulse = 0.85 + 0.15 * sin(uTime * 9.0 + r * 6.0);
  vec3 hot = mix(vec3(1.0, 0.92, 0.7), vec3(1.0, 0.55, 0.12), smoothstep(0.0, 0.9, r));
  vec3 col = mix(hot * 1.2 * pulse, vec3(0.35, 0.08, 0.02), edge) * uPower;
  float a2 = smoothstep(1.0, 0.92, r);
  gl_FragColor = vec4(col * a2 + vec3(0.12, 0.05, 0.03) * (1.0 - uPower) * a2, 1.0);
  if (r > 1.0) discard;
}`;
function honeycombDisc(radius) {
  const m = new THREE.Mesh(new THREE.CircleGeometry(radius, 40), new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPower: { value: 1 } },
    vertexShader: /* glsl */`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: HONEY_FRAG,
  }));
  return m;
}

const WHITE = () => new THREE.MeshStandardMaterial({ color: 0xf2f5fb, roughness: 0.3, metalness: 0.2 });
const STEEL = () => new THREE.MeshStandardMaterial({ color: 0xaab6cc, roughness: 0.38, metalness: 0.55 });
const DARK = () => new THREE.MeshStandardMaterial({ color: 0x2b3350, roughness: 0.5, metalness: 0.4 });
const GLASS = () => new THREE.MeshPhysicalMaterial({ color: 0x46d9ff, roughness: 0.04, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05, emissive: 0x0a5f86, emissiveIntensity: 0.9, envMapIntensity: 1.8 });

/* ================================================================== QuadShip */
// The LXD's review (2026-11-05): from above, nothing may stick out of the ship's shape. So the jets are built into
// the hull (nozzles set into its back wall, vents glowing on its deck) instead of pods behind it, the canopy is sized
// to sit inside the outline, and the corner lights are small. Under it, the hover jets fire straight down, inside the
// outline, so the view from above never sees them.
// The second review (2026-11-06): the fire must show, though the exhaust pods stay off. So flames come out of the walls,
// lying flat so the view from above sees them: out of the back nozzles with the engines' thrust, and out of the side
// facing away from the way the ship moves (it moves right: fire from its left side; it moves up the screen: fire from
// its back, and the other way round).
const FIRE = { core: 0xfff3d0, mid: 0xff9a3c, tip: 0xff3ea5 };
const SIDE_FRAG_UNIFORMS = 'varying float vLy;\nuniform vec3 uTrim; uniform float uTrimK, uTrimY;';
export class QuadShip extends THREE.Group {
  constructor(shape) {
    super();
    this.shape = shape; this.name = 'ship-' + shape.key;
    const b = bounds(shape.verts), bevel = 0.2, depth = 0.62;
    this.size = Math.max(b.w, b.h);
    const geo = new THREE.ExtrudeGeometry(threeShape(inset(shape.verts, bevel)), { depth, bevelEnabled: true, bevelThickness: 0.22, bevelSize: bevel, bevelSegments: 4, curveSegments: 1 });
    geo.rotateX(-Math.PI / 2); geo.translate(0, 0.22, 0);
    this.hullTop = depth + 0.44;
    const accent = new THREE.Color(shape.accent);
    const top = new THREE.MeshPhysicalMaterial({ map: Tex.hull(shape), color: 0xffffff, roughness: 0.32, metalness: 0.15, clearcoat: 0.5, clearcoatRoughness: 0.25 });
    // the walls: a deep steel-violet, with one thin line of the ship's own colour running round them
    const side = new THREE.MeshStandardMaterial({ color: 0x4a527f, roughness: 0.42, metalness: 0.5 });
    this.trimU = { uTrim: { value: accent.clone() }, uTrimK: { value: 1.4 }, uTrimY: { value: 0.72 } };   // near the top of the straight wall (y 0.22 to 0.84)
    side.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, this.trimU);
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying float vLy;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvLy = position.y;');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\n' + SIDE_FRAG_UNIFORMS)
        .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += uTrim * uTrimK * smoothstep(0.045, 0.02, abs(vLy - uTrimY));');
    };
    side.customProgramCacheKey = () => 'quad-side';
    const hull = new THREE.Mesh(geo, [top, side]);
    this.hull = hull; this.body = new THREE.Group(); this.add(this.body); this.body.add(hull);
    this.materials = [top, side];
    // its four sides in light, on the exact footprint (the intro's view from above)
    this.edges = new EdgeGlow(shape.verts, { y: this.hullTop + 0.1, width: 0.6, line: 0.14 }); this.body.add(this.edges);

    // a raised spine along the middle, the way the reference fleet is built in layers
    const deckPts = inset(shape.verts, Math.min(b.w, b.h) * 0.3);
    const dgeo = new THREE.ExtrudeGeometry(threeShape(deckPts), { depth: 0.16, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.08, bevelSegments: 3 });
    dgeo.rotateX(-Math.PI / 2); dgeo.translate(0, this.hullTop - 0.02, 0);
    const deck = new THREE.Mesh(dgeo, new THREE.MeshStandardMaterial({ color: 0xdfe5f0, roughness: 0.32, metalness: 0.25 }));
    this.body.add(deck);

    // the canopy: as big and as far forward as fits inside the outline, frame and all (the rhombus narrows to a point)
    const front = Math.max(...shape.verts.map((p) => p.y));
    const fit = this._fitCanopy(shape.verts, clamp(Math.min(b.w, b.h) * 0.2, 0.7, 1.25), Math.min(front * 0.3, 1.0));
    const cR = fit.r;
    const canopy = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), GLASS());
    canopy.scale.set(cR, cR * 0.62, cR * 1.35);
    canopy.position.set(0, this.hullTop + 0.18, -fit.y);
    this.body.add(canopy);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1, 0.08, 10, 48), DARK());
    rim.rotation.x = Math.PI / 2; rim.scale.set(cR * 1.02, cR * 1.37, 1); rim.position.copy(canopy.position);
    this.body.add(rim);
    this.canopy = canopy;

    // two engines built into the back: a nozzle set into the back wall (seen from behind and the side) and a pair
    // of vents glowing on the deck above it (seen from above). Both brighten with the thrust; nothing leaves the hull.
    const back = Math.min(...shape.verts.map((p) => p.y));
    this.engines = [];
    const midY = 0.5;                                              // on the straight part of the wall (0.22 to 0.84), which is the exact outline
    for (const x of this._rearXs(shape, back)) {
      const wallY = this._rearYAt(shape.verts, x), n = this._rearNormal(shape.verts, x);
      const nozzle = honeycombDisc(0.24);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.045, 10, 32), DARK());
      const mount = new THREE.Group();
      mount.position.set(x + n.x * 0.004, midY, -(wallY + n.y * 0.004));
      mount.lookAt(mount.position.clone().add(new THREE.Vector3(n.x, 0, -n.y)));   // face out of the wall
      mount.add(nozzle, ring);
      this.body.add(mount);
      // the vents on the deck, just inside the back edge
      const vents = [];
      for (let k = 0; k < 2; k++) {
        const v = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.03, 0.09), new THREE.MeshBasicMaterial({ color: 0xffa040 }));
        v.position.set(x, this.hullTop + 0.005, -(wallY + 0.55 + k * 0.2));
        this.body.add(v); vents.push(v);
      }
      this.engines.push({ nozzle, vents });
      this._addFire(mount, 'rear', 0.4, 4.4);                      // the main fire, straight out of the nozzle
    }
    // the steering fire: out of the left, right and front walls (the back's is the engines' own)
    for (const e of this._sideVents(shape.verts)) {
      const mount = new THREE.Group();
      mount.position.set(e.at.x + e.n.x * 0.004, midY, -(e.at.y + e.n.y * 0.004));
      mount.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(e.n.x, 0, -e.n.y));
      const vent = honeycombDisc(0.15); vent.material.uniforms.uPower.value = 0.4; mount.add(vent);   // its nozzle, flush in the wall
      this.body.add(mount);
      // the flame leaves along the way it pushes (straight left, right or forward), not along a slanted wall's normal
      const dir = new THREE.Vector3(e.dir.x, 0, -e.dir.y).applyQuaternion(mount.quaternion.clone().invert());
      this._addFire(mount, e.side, 0.32, 3.4, dir, vent);
    }

    // hover jets + legs near each corner (well inside the outline); small beacons on the corners
    const c = centroid(shape.verts);
    this.jets = []; this.legs = []; this.beacons = [];
    for (const v of shape.verts) {
      const toC = { x: c.x - v.x, y: c.y - v.y }, l = Math.hypot(toC.x, toC.y);
      const jp = { x: v.x + (toC.x / l) * Math.min(1.1, l * 0.32), y: v.y + (toC.y / l) * Math.min(1.1, l * 0.32) };
      const jet = new THREE.Group(); toWorld(jp, 0.02, jet.position);
      const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.4, 0.14, 24), DARK()); jet.add(ring);
      const core = new THREE.Mesh(new THREE.CircleGeometry(0.26, 24), new THREE.MeshBasicMaterial({ color: 0x9ff3ff })); core.rotation.x = Math.PI / 2; core.position.y = -0.08; jet.add(core);
      const fl = flameCone(0.22, flameMaterial({ core: 0xffffff, mid: 0x7fe8ff, tip: 0x3b6bff })); fl.position.y = -0.08; jet.add(fl);
      const gl = glowSprite(0x7fe8ff, 0.9, 0.6); gl.position.y = -0.35; jet.add(gl);
      this.body.add(jet); this.jets.push({ jet, flame: fl, glow: gl });
      const leg = new THREE.Group(); toWorld(jp, 0.1, leg.position);
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.8, 10), STEEL()); strut.position.y = -0.4; leg.add(strut);
      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.3, 0.08, 18), DARK()); foot.position.y = -0.82; leg.add(foot);
      leg.scale.y = 0.001; leg.visible = false; this.body.add(leg); this.legs.push(leg);
      // a corner light, a little inside the corner, with a small glow (it was a big white bloom)
      const bc = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 10), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      const out = { x: v.x + (toC.x / l) * 0.22, y: v.y + (toC.y / l) * 0.22 };
      toWorld(out, this.hullTop - 0.02, bc.position);
      const bg = glowSprite(0xffffff, 0.42, 0.55); bc.add(bg);
      this.body.add(bc); this.beacons.push({ mesh: bc, glow: bg, color: new THREE.Color(0xffffff), want: new THREE.Color(0xffffff) });
    }

    this.thrust = 0.15; this.hover = 1; this.legK = 0; this._t = Math.random() * 10;
    this.vel = new THREE.Vector3(); this.tilt = new THREE.Vector2();
    this.bob = 1;
    this._q = new THREE.Quaternion(); this._lv = new THREE.Vector3();
  }
  /** a flame lying flat out of a wall mount (its +z: out of the wall), with a glow at its root. dir: the way it points,
      in the mount's frame (straight out of the wall if not given) */
  _addFire(mount, side, radius, length, dir = null, vent = null) {
    const holder = new THREE.Group();
    if (dir) holder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir.clone().normalize());
    const flame = flameCone(radius, flameMaterial(FIRE)); flame.rotation.x = -Math.PI / 2; flame.position.z = 0.04; flame.visible = false;
    const glow = glowSprite(0xff9a3c, radius * 4.6, 0); glow.position.z = 0.16;
    holder.add(flame, glow); mount.add(holder);
    (this.fires || (this.fires = [])).push({ side, flame, glow, vent, len: length, k: 0, seed: Math.random() * 10 });
  }
  /** where the steering flames leave: on the walls facing most nearly left, right and forward (two on a long straight
      wall, one on each of two equal slanted walls, as at the rhombus's points), at the middle of the wall's height */
  _sideVents(verts) {
    const n = verts.length, out = [];
    const normals = verts.map((a, i) => { const b = verts[(i + 1) % n], dx = b.x - a.x, dy = b.y - a.y, l = Math.hypot(dx, dy); return { x: dy / l, y: -dx / l }; });
    for (const [side, dir] of [['left', { x: -1, y: 0 }], ['right', { x: 1, y: 0 }], ['front', { x: 0, y: 1 }]]) {
      const dots = normals.map((m) => m.x * dir.x + m.y * dir.y), best = Math.max(...dots);
      verts.forEach((a, i) => {
        if (dots[i] < best - 0.05 || dots[i] < 0.3) return;
        const b = verts[(i + 1) % n], len = Math.hypot(b.x - a.x, b.y - a.y);
        for (const t of len > 4.2 && dots[i] > 0.9 ? [0.3, 0.7] : [0.5]) out.push({ side, dir, n: normals[i], at: { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t } });
      });
    }
    return out;
  }
  /** the largest canopy (radius r, centre y forward of the middle) whose glass and frame lie inside the outline */
  _fitCanopy(verts, r0, y0) {
    const room = inset(verts, 0.32);                           // keep it off the coloured border
    const fits = (r, y) => {
      const rx = r * 1.02 + 0.08, ry = r * 1.37 + 0.08;        // the frame's outer edge
      for (let i = 0; i < 32; i++) { const a = (i / 32) * Math.PI * 2; if (!inside(room, Math.cos(a) * rx, y + Math.sin(a) * ry)) return false; }
      return true;
    };
    for (let s = 1; s >= 0.4; s -= 0.04) for (let y = y0; y >= -0.6; y -= 0.1) if (fits(r0 * s, y)) return { r: r0 * s, y };
    return { r: r0 * 0.4, y: 0 };
  }
  _rearXs(shape, back) {
    // two engines spaced across the rear edge's own width
    const rear = shape.verts.filter((p) => p.y < back + 0.5);
    const xs = rear.map((p) => p.x), lo = Math.min(...xs), hi = Math.max(...xs);
    const w = hi - lo;
    if (w < 1.5) return [-0.9, 0.9];
    const mid = (lo + hi) / 2;
    return [mid - w * 0.26, mid + w * 0.26];
  }
  /** the lowest y of the outline at this x (where a vertical line through x leaves the hull at the back) */
  _rearYAt(verts, x) {
    let best = Infinity;
    for (let i = 0; i < verts.length; i++) {
      const a = verts[i], b = verts[(i + 1) % verts.length];
      if ((x - a.x) * (x - b.x) > 0 || a.x === b.x) continue;
      const y = a.y + ((x - a.x) / (b.x - a.x)) * (b.y - a.y);
      best = Math.min(best, y);
    }
    return isFinite(best) ? best : Math.min(...verts.map((p) => p.y));
  }
  /** the outward normal (plan) of the back wall at this x */
  _rearNormal(verts, x) {
    let best = null, by = Infinity;
    for (let i = 0; i < verts.length; i++) {
      const a = verts[i], b = verts[(i + 1) % verts.length];
      if ((x - a.x) * (x - b.x) > 0 || a.x === b.x) continue;
      const y = a.y + ((x - a.x) / (b.x - a.x)) * (b.y - a.y);
      if (y < by) { by = y; const dx = b.x - a.x, dy = b.y - a.y, l = Math.hypot(dx, dy); best = { x: dy / l, y: -dx / l }; }
    }
    return best || { x: 0, y: -1 };
  }
  /** every beacon one colour (green: locked; red: no fit) or each its own */
  setBeacons(color) { for (const b of this.beacons) b.want.set(color); }
  setBeacon(i, color) { this.beacons[i].want.set(color); }
  update(dt) {
    this._t += dt;
    for (const e of this.engines) {
      const p = this.thrust, flick = 0.9 + 0.1 * Math.sin(this._t * 31 + e.nozzle.id);
      e.nozzle.material.uniforms.uTime.value = this._t; e.nozzle.material.uniforms.uPower.value = 0.35 + p * 0.65;
      for (const v of e.vents) v.material.color.setRGB(1, 0.62, 0.25).multiplyScalar((0.25 + p * 0.85) * flick);
    }
    for (const j of this.jets) {
      j.flame.material.uniforms.uTime.value = this._t;
      const p = this.hover * (0.85 + 0.15 * Math.sin(this._t * 17 + j.jet.position.x));
      j.flame.material.uniforms.uPower.value = p; j.flame.scale.set(1, 0.3 + p * 1.5, 1);
      j.glow.material.opacity = 0.2 + p * 0.45;
    }
    // the fire: the back burns with the engines' thrust and with any push up the screen; a side burns with a push the
    // other way (the velocity in the ship's own frame: +x its right, -z its front)
    this.getWorldQuaternion(this._q); this._lv.copy(this.vel).applyQuaternion(this._q.invert());
    const sx = this._lv.x / 6, sz = this._lv.z / 6;
    const want = { left: clamp(sx, 0, 1), right: clamp(-sx, 0, 1), front: clamp(sz, 0, 1), rear: Math.max(this.thrust, clamp(-sz, 0, 1)) };
    for (const f of this.fires) {
      f.k = damp(f.k, want[f.side], 9, dt);
      const p = f.k * (0.86 + 0.14 * Math.sin(this._t * 37 + f.seed) * Math.sin(this._t * 23 + f.seed * 3));
      const u = f.flame.material.uniforms;
      f.flame.visible = p > 0.03; u.uTime.value = this._t; u.uPower.value = Math.min(1, 0.45 + p * 0.7);
      f.flame.scale.set(1, 0.35 + p * f.len, 1);
      f.glow.material.opacity = Math.min(0.6, p * 0.7);
      if (f.vent) { f.vent.material.uniforms.uTime.value = this._t; f.vent.material.uniforms.uPower.value = 0.35 + p * 0.65; }
    }
    for (const b of this.beacons) {
      b.color.lerp(b.want, 1 - Math.exp(-8 * dt));
      b.mesh.material.color.copy(b.color); b.glow.material.color.copy(b.color);
      const pulse = 0.75 + 0.25 * Math.sin(this._t * 4);
      b.glow.scale.setScalar(0.42 * pulse);
    }
    for (const l of this.legs) { l.visible = this.legK > 0.01; l.scale.y = Math.max(0.001, this.legK); }
    // a living hover: a slow bob and a lean into the way it is flying
    const bob = Math.sin(this._t * 1.7) * 0.12 * this.bob;
    this.body.position.y = damp(this.body.position.y, bob, 6, dt);
    this.tilt.x = damp(this.tilt.x, clamp(-this.vel.z * 0.035, -0.28, 0.28), 4, dt);
    this.tilt.y = damp(this.tilt.y, clamp(-this.vel.x * 0.035, -0.32, 0.32), 4, dt);
    this.body.rotation.x = this.tilt.x + Math.sin(this._t * 1.3) * 0.015 * this.bob;
    this.body.rotation.z = this.tilt.y + Math.sin(this._t * 1.1 + 1) * 0.02 * this.bob;
  }
}

/* =============================================================== CommandShip */
function hullTexture() {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 512; const g = c.getContext('2d');
  const grd = g.createLinearGradient(0, 0, 0, 512); grd.addColorStop(0, '#9aa6c2'); grd.addColorStop(1, '#7c88a6');
  g.fillStyle = grd; g.fillRect(0, 0, 1024, 512);
  g.strokeStyle = 'rgba(40,46,70,0.2)'; g.lineWidth = 2;
  for (let y = 0; y < 512; y += 46) { g.beginPath(); g.moveTo(0, y); g.lineTo(1024, y); g.stroke(); }
  for (let x = 0; x < 1024; x += 64) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 512); g.stroke(); }
  g.fillStyle = '#ff8a3d'; g.fillRect(0, 150, 1024, 10); g.fillRect(0, 352, 1024, 10);
  return c;
}
function windowTexture() {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 512; const g = c.getContext('2d');
  g.fillStyle = '#000'; g.fillRect(0, 0, 1024, 512);
  for (const u of [256, 768]) {
    for (let i = 0; i < 9; i++) { g.fillStyle = i % 3 === 1 ? '#3fa8ff' : '#2b6dff'; g.fillRect(u - 60, 170 + i * 20, 120, 12); }
  }
  for (let i = 0; i < 30; i++) { g.fillStyle = '#5cf2ff'; g.fillRect(Math.random() * 1024, 60 + Math.random() * 390, 8, 4); }
  return c;
}

export class CommandShip extends THREE.Group {
  constructor() {
    super();
    this.name = 'command-ship';
    const L = 34;
    const prof = [[0.2, 0], [2.4, 0.6], [3.4, 3], [4.6, 8], [5.1, 14], [4.9, 20], [4.3, 25], [3.3, 29], [2.0, 32], [0.6, 33.6], [0.01, 34]].map(([r, y]) => new THREE.Vector2(r, y));
    const lathe = new THREE.LatheGeometry(prof, 96);
    lathe.rotateX(-Math.PI / 2); lathe.translate(0, 0, L / 2);
    lathe.scale(1, 0.56, 1);
    const map = new THREE.CanvasTexture(hullTexture()); map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 8;
    const emissiveMap = new THREE.CanvasTexture(windowTexture()); emissiveMap.colorSpace = THREE.SRGBColorSpace; emissiveMap.anisotropy = 8;
    const hullMat = new THREE.MeshStandardMaterial({ map, emissiveMap, emissive: 0xffffff, emissiveIntensity: 1.4, roughness: 0.42, metalness: 0.28, color: 0xe6ecf8 });
    const hull = new THREE.Mesh(lathe, hullMat); this.add(hull);
    this.hull = hull;

    // the cockpit canopy on the nose (the camera flies in through it)
    const can = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2), GLASS());
    can.material = can.material.clone(); can.material.color.set(0x2d5fd6); can.material.emissive.set(0x0b2a7a);
    can.scale.set(2.2, 1.2, 4.4); can.position.set(0, 2.0, -11.2); this.add(can);
    this.canopy = can;

    // swept wings. Each tip ends inside its engine pod, short of the nozzle: it used to reach 1.6 past the pod's back
    // and cross the glowing nozzle (the LXD's second review: "the piece inside the exhaust jet")
    const wing = new THREE.Shape(); wing.moveTo(0, 0); wing.lineTo(9.5, -6.5); wing.lineTo(10.6, -7.2); wing.lineTo(1, -8.2); wing.closePath();
    const wgeo = new THREE.ExtrudeGeometry(wing, { depth: 0.5, bevelEnabled: true, bevelThickness: 0.15, bevelSize: 0.2, bevelSegments: 2 });
    wgeo.rotateX(-Math.PI / 2);
    for (const s of [-1, 1]) {
      const w = new THREE.Mesh(wgeo, STEEL()); w.scale.x = s; w.position.set(s * 3.4, -1.2, 1.5); this.add(w);
    }

    // three pods: two at the wing tips, one up on a pylon
    this.pods = [];
    const podAt = [[-12.6, -1.4, 9.5], [12.6, -1.4, 9.5], [0, 5.6, 11]];
    for (const [x, y, z] of podAt) {
      const pod = new THREE.Group(); pod.position.set(x, y, z);
      const pprof = [[0.1, 0], [1.7, 0.8], [2.1, 3], [2.1, 9], [1.9, 11.4], [1.75, 12]].map(([r, yy]) => new THREE.Vector2(r, yy));
      const pg = new THREE.LatheGeometry(pprof, 64); pg.rotateX(Math.PI / 2); pg.translate(0, 0, -12);
      const shell = new THREE.Mesh(pg, new THREE.MeshStandardMaterial({ color: 0xa4b0cc, roughness: 0.4, metalness: 0.3 }));
      pod.add(shell);
      const trim = new THREE.Mesh(new THREE.TorusGeometry(1.95, 0.18, 12, 64), new THREE.MeshStandardMaterial({ color: 0xff8a3d, roughness: 0.4, metalness: 0.3, emissive: 0x401000 }));
      trim.position.z = -0.4; pod.add(trim);
      const honey = honeycombDisc(1.7); honey.geometry.dispose(); honey.geometry = new THREE.CircleGeometry(1.7, 64); honey.position.z = 0.01; pod.add(honey);
      const fl = flameCone(1.6, flameMaterial({ core: 0xfff3d0, mid: 0xff9a3c, tip: 0xff3ea5 })); fl.rotation.x = -Math.PI / 2; fl.position.z = 0.05; pod.add(fl);
      const gl = glowSprite(0xff9a3c, 2.6, 0.5); gl.position.z = 0.6; pod.add(gl);
      this.add(pod); this.pods.push({ pod, honey, flame: fl, glow: gl });
    }
    const pylon = new THREE.Mesh(new THREE.BoxGeometry(0.7, 4.2, 7), STEEL()); pylon.position.set(0, 3.4, 7.4); pylon.rotation.x = -0.25; this.add(pylon);
    const fin = new THREE.Shape(); fin.moveTo(0, 0); fin.lineTo(5, 0); fin.lineTo(6.5, 3.2); fin.lineTo(3.4, 3.2); fin.closePath();
    const fgeo = new THREE.ExtrudeGeometry(fin, { depth: 0.3, bevelEnabled: false }); fgeo.rotateY(Math.PI / 2);
    for (const s of [-1, 1]) { const f = new THREE.Mesh(fgeo, STEEL()); f.position.set(s * 2.6, 0.6, 13.6); f.rotation.z = s * 0.5; this.add(f); }

    // navigation lights
    this.navs = [];
    for (const [x, y, z, col] of [[-12.6, -1.4, -2.6, 0xff4d6d], [12.6, -1.4, -2.6, 0x3dffa2], [0, 7.8, 0, 0xffffff]]) {
      const s = glowSprite(col, 1.3, 1); s.position.set(x, y, z); this.add(s); this.navs.push(s);
    }
    this.thrust = 1; this._t = 0;
  }
  update(dt) {
    this._t += dt;
    for (const p of this.pods) {
      p.honey.material.uniforms.uTime.value = this._t; p.honey.material.uniforms.uPower.value = 0.45 + this.thrust * 0.55;
      p.flame.material.uniforms.uTime.value = this._t; p.flame.material.uniforms.uPower.value = this.thrust;
      p.flame.scale.set(1, 1 + this.thrust * 9, 1);
      p.glow.material.opacity = 0.2 + this.thrust * 0.3; p.glow.scale.setScalar(2.2 + this.thrust * 1.3);   // a glow round the nozzle, not a white blob over it
    }
    const blink = (this._t % 1.6) < 0.12;
    this.navs.forEach((n, i) => { n.material.opacity = i === 2 ? (blink ? 1 : 0.15) : 0.7 + 0.3 * Math.sin(this._t * 3 + i); });
  }
}

/* ===================================================================== Drone */
export class Drone extends THREE.Group {
  constructor() {
    super();
    this.name = 'drone';
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.86, 0.32, 36), WHITE()); this.add(body);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.62, 32, 14, 0, Math.PI * 2, 0, Math.PI / 2), WHITE()); dome.position.y = 0.14; dome.scale.y = 0.6; this.add(dome);
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.84, 0.06, 8, 40), new THREE.MeshStandardMaterial({ color: 0xff8a3d, roughness: 0.4, emissive: 0x3a1000 }));
    band.rotation.x = Math.PI / 2; this.add(band);
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.26, 24, 16), new THREE.MeshBasicMaterial({ color: 0x5cf2ff }));
    eye.position.set(0, 0.04, -0.78); this.add(eye);
    const eg = glowSprite(0x5cf2ff, 1.4, 0.9); eg.position.copy(eye.position); this.add(eg);
    this.eye = eye; this.eyeGlow = eg;
    this.flames = [];
    for (const s of [-1, 1]) {
      const pod = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.5, 6, 12), STEEL()); pod.rotation.x = Math.PI / 2; pod.position.set(s * 0.98, -0.02, 0.1); this.add(pod);
      const fl = flameCone(0.14, flameMaterial({ core: 0xffffff, mid: 0x7fe8ff, tip: 0x3b6bff })); fl.rotation.x = -Math.PI / 2; fl.position.set(s * 0.98, -0.02, 0.45); this.add(fl);
      this.flames.push(fl);
    }
    const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5, 6), DARK()); ant.position.set(0.25, 0.55, 0.2); this.add(ant);
    this.tipLight = glowSprite(0xff4d6d, 0.5, 1); this.tipLight.position.set(0.25, 0.82, 0.2); this.add(this.tipLight);
    this.thrust = 1; this._t = 0;
  }
  update(dt) {
    this._t += dt;
    for (const f of this.flames) { f.material.uniforms.uTime.value = this._t; f.material.uniforms.uPower.value = this.thrust; f.scale.set(1, 0.4 + this.thrust * 1.6, 1); }
    this.tipLight.material.opacity = (this._t % 1.1) < 0.15 ? 1 : 0.15;
    this.eyeGlow.scale.setScalar(1.2 + 0.2 * Math.sin(this._t * 5));
  }
}
