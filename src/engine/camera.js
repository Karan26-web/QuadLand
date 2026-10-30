// ---------------------------------------------------------------------------
// The camera director.
//
// A shot is a Move that writes a base pose { pos, target, fov, roll } every frame:
//   cut(p)            jump
//   to(p, d, ease)    blend from wherever the camera is (p may be a function: a moving subject)
//   path({...})       Catmull-Rom flythrough; looks along the path, at a point, or along a
//                     second spline; banks into its turns ('bank'); FOV keys along the way
//   orbit({...})      swing round a subject: radius, height and FOV can all change on the way
//   dolly({...})      the vertigo shot: the camera travels while the lens zooms the other way,
//                     so the subject keeps its size and the world behind it stretches
//   follow(fn)        damped pursuit of a pose computed every frame
//   chase(obj, {...}) behind a moving object with lag, look-ahead and banking from its turns
//   whip(p, d)        a very fast swing with a real smear (the post's directional blur)
// Layered on top of every shot:
//   shake(trauma)     trauma² × smooth noise on position AND rotation (yaw, pitch, roll);
//                     random jitter reads as a broken camera, noise reads as a body
//   handheld(k)       a slow, breathing drift for "operated" shots
//   punch(deg)        a FOV kick that springs back (impacts, launches, the warp)
//   shift(x, y)       a lens shift (fractions of the screen): frame a subject beside a panel
//                     without rotating the camera
// The director runs on real time (clock.ui), so it can swing round a slowed moment.
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { Ease, clamp, damp, lerp, noise1, DEG } from './util.js';

const _v = new THREE.Vector3(), _w = new THREE.Vector3(), _q = new THREE.Quaternion(), _e = new THREE.Euler(0, 0, 0, 'YXZ');
const val = (x, t) => (typeof x === 'function' ? x(t) : x);
const vec = (x, t, out) => { const r = typeof x === 'function' ? x(t) : x; return out.copy(r); };
const span = (x, t) => (Array.isArray(x) ? lerp(x[0], x[1], t) : val(x, t));

export class Pose {
  constructor(pos = new THREE.Vector3(0, 5, 20), target = new THREE.Vector3(), fov = 50, roll = 0) {
    this.pos = pos.clone(); this.target = target.clone(); this.fov = fov; this.roll = roll;
  }
  copy(p) { this.pos.copy(p.pos); this.target.copy(p.target); this.fov = p.fov ?? this.fov; this.roll = p.roll ?? 0; return this; }
  clone() { return new Pose(this.pos, this.target, this.fov, this.roll); }
  lerpPoses(a, b, t) {
    this.pos.lerpVectors(a.pos, b.pos, t); this.target.lerpVectors(a.target, b.target, t);
    this.fov = lerp(a.fov, b.fov, t); this.roll = lerp(a.roll, b.roll, t); return this;
  }
}
export const pose = (pos, target, fov = 50, roll = 0) => new Pose(pos, target, fov, roll);

class Move {
  constructor(dur = 1, ease = Ease.inOutCubic) {
    this.dur = Math.max(1e-4, dur); this.ease = ease; this.t = 0; this.done = false;
    this.promise = new Promise((r) => { this._res = r; });
  }
  get k() { return this.ease(clamp(this.t / this.dur, 0, 1)); }
  step(dt) { this.t += dt; if (this.t >= this.dur && this.dur !== Infinity) { this.finish(true); } }
  finish(ok) { if (this.done) return; this.done = true; this._res(ok); }
}

export class CameraDirector {
  constructor(camera) {
    this.cam = camera;
    this.base = new Pose(new THREE.Vector3(0, 4, 30), new THREE.Vector3(0, 0, 0), 50, 0);
    this.move = null;
    this.time = 0;
    this.trauma = 0; this.traumaDecay = 0.9;
    this.shakeOffset = 0.5; this.shakeAngle = 3.2 * DEG; this.shakeFreq = 16;
    this.handheldAmt = 0; this.handheldFreq = 0.35;
    this.fovKick = 0; this.fovKickV = 0;
    this.shiftWant = new THREE.Vector2(); this.shiftNow = new THREE.Vector2();
    this.motionBlur = true; this.blurGain = 0.32; this.blurOut = new THREE.Vector2();
    this._prevQ = new THREE.Quaternion(); this._hasPrev = false;
    this._bank = 0;
    this.viewW = 1; this.viewH = 1;
  }
  get aspect() { return this.cam.aspect; }
  setView(w, h) { this.viewW = w; this.viewH = h; }

  _start(m) { if (this.move) this.move.finish(false); this.move = m; return m.promise; }
  stop() { if (this.move) this.move.finish(false); this.move = null; }
  /** the live pose (what the camera is doing now, before the shake layers) */
  current() { return this.base.clone(); }

  cut(p) { this.stop(); this.base.copy(p); this._hasPrev = false; this._bank = 0; this.apply(0); return Promise.resolve(true); }

  to(p, dur = 1.5, ease = Ease.inOutCubic) {
    const m = new Move(dur, ease), from = this.base.clone(), want = new Pose();
    m.update = (out) => { const tp = typeof p === 'function' ? p() : p; want.copy(tp); out.lerpPoses(from, want, m.k); };
    return this._start(m);
  }

  /** opts: points[], target (V3 | fn(k) | 'ahead' | points[]), fov (n | [a,b] | fn), roll (n | fn | 'bank'), bank (gain), dur, ease, blendIn (s) */
  path(o) {
    const m = new Move(o.dur ?? 3, o.ease ?? Ease.inOutSine);
    const pts = o.points.map((p) => p.clone());
    if (o.fromCurrent !== false && o.blendIn !== 0) pts.unshift(this.base.pos.clone());
    const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal', 0.5);
    const tcurve = Array.isArray(o.target) ? new THREE.CatmullRomCurve3(o.target.map((p) => p.clone()), false, 'centripetal') : null;
    const startTarget = this.base.target.clone(), startFov = this.base.fov;
    const blend = o.blendIn ?? 0.35;                  // fraction of the move over which the look blends in from the current one
    const bankGain = o.bank ?? 0.9, ahead = o.ahead ?? 0.04;
    const tgt = new THREE.Vector3(), p0 = new THREE.Vector3(), p2 = new THREE.Vector3();
    let lastYaw = null;
    m.update = (out, dt) => {
      const k = m.k;
      curve.getPointAt(k, out.pos);
      if (tcurve) tcurve.getPointAt(k, tgt);
      else if (o.target === 'ahead' || o.target == null) { curve.getPointAt(Math.min(1, k + ahead), tgt); if (k + ahead > 1) { curve.getTangentAt(1, _v); tgt.copy(out.pos).addScaledVector(_v, 10); } }
      else vec(o.target, k, tgt);
      const bk = blend > 0 ? Ease.inOutSine(clamp(k / blend, 0, 1)) : 1;
      out.target.lerpVectors(startTarget, tgt, bk);
      const f = o.fov == null ? startFov : span(o.fov, k);
      out.fov = o.fov == null ? startFov : lerp(startFov, f, bk);
      if (o.roll === 'bank') {
        // bank into the turn: the heading's rate of change times the speed (a plane banks, a camera on a crane does not)
        curve.getPointAt(clamp(k - 0.01, 0, 1), p0); curve.getPointAt(clamp(k + 0.01, 0, 1), p2);
        const yaw = Math.atan2(p2.x - p0.x, p2.z - p0.z);
        if (lastYaw != null && dt > 0) {
          let d = yaw - lastYaw; if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2;
          const want = clamp(-d / dt * 0.22 * bankGain, -0.6, 0.6);
          this._bank = damp(this._bank, want, 4, dt);
        }
        lastYaw = yaw; out.roll = this._bank;
      } else out.roll = o.roll == null ? lerp(this.base.roll, 0, bk) : span(o.roll, k);
    };
    return this._start(m);
  }

  /** opts: center (V3|fn), radius (n|[a,b]), height (n|[a,b]), from/to (deg, 0 = +Z of the centre), fov, roll, lookOffset, dur, ease */
  orbit(o) {
    const m = new Move(o.dur ?? 4, o.ease ?? Ease.inOutSine);
    const c = new THREE.Vector3(), from = this.base.clone(), blend = o.blendIn ?? 0.25;
    const want = new Pose();
    m.update = (out) => {
      const k = m.k;
      vec(o.center, k, c);
      const a = lerp(o.from ?? 0, o.to ?? 90, k) * DEG, r = span(o.radius ?? 10, k), h = span(o.height ?? 3, k);
      want.pos.set(c.x + Math.sin(a) * r, c.y + h, c.z + Math.cos(a) * r);
      want.target.copy(c); if (o.lookOffset) want.target.add(o.lookOffset);
      want.fov = o.fov == null ? from.fov : span(o.fov, k);
      want.roll = o.roll == null ? 0 : span(o.roll, k);
      const bk = blend > 0 ? Ease.inOutSine(clamp(k / blend, 0, 1)) : 1;
      out.lerpPoses(from, want, bk);
    };
    return this._start(m);
  }

  /** The vertigo shot. opts: subject (V3|fn), dir (unit, subject → camera), size (visible height at the subject),
   *  from / to (distance), roll, dur, ease, lookOffset */
  dolly(o) {
    const m = new Move(o.dur ?? 3, o.ease ?? Ease.inOutSine);
    const s = new THREE.Vector3(), dir = o.dir.clone().normalize();
    m.update = (out) => {
      const k = m.k; vec(o.subject, k, s);
      const d = lerp(o.from, o.to, k);
      out.pos.copy(s).addScaledVector(dir, d);
      out.target.copy(s); if (o.lookOffset) out.target.add(o.lookOffset);
      out.fov = clamp(2 * Math.atan(o.size / (2 * d)) / DEG, 4, 140);
      out.roll = o.roll == null ? 0 : span(o.roll, k);
    };
    return this._start(m);
  }

  /** fn(out, dt) writes the pose it wants; the camera chases it (lambda per channel). Runs until replaced. */
  follow(fn, lambda = 4, { lambdaTarget = null, lambdaFov = 3 } = {}) {
    const m = new Move(Infinity, Ease.linear), want = new Pose(this.base.pos, this.base.target, this.base.fov, this.base.roll);
    const lt = lambdaTarget ?? lambda;
    m.update = (out, dt) => {
      fn(want, dt);
      const kp = 1 - Math.exp(-lambda * dt), kt = 1 - Math.exp(-lt * dt);
      out.pos.lerp(want.pos, kp); out.target.lerp(want.target, kt);
      out.fov = damp(out.fov, want.fov, lambdaFov, dt); out.roll = damp(out.roll, want.roll ?? 0, 3, dt);
    };
    this._start(m);
    return m;
  }

  /** Behind a moving object: offset/look in the object's frame, lag, look-ahead along its velocity, bank from its turns. */
  chase(obj, { offset = new THREE.Vector3(0, 2, 8), look = new THREE.Vector3(0, 0, -6), lambda = 5, fov = 55, bank = 0.6, worldUp = true } = {}) {
    const prev = new THREE.Vector3(); let has = false, yawPrev = 0, bankNow = 0;
    return this.follow((want, dt) => {
      obj.updateMatrixWorld();
      if (worldUp) {
        // the offset turns with the object's heading only (a chase cam that also pitches and rolls with it makes children sick)
        _e.setFromQuaternion(obj.getWorldQuaternion(_q), 'YXZ');
        const yaw = _e.y;
        _v.copy(offset).applyAxisAngle(THREE.Object3D.DEFAULT_UP, yaw);
        obj.getWorldPosition(_w);
        want.pos.copy(_w).add(_v);
        _v.copy(look).applyAxisAngle(THREE.Object3D.DEFAULT_UP, yaw);
        want.target.copy(_w).add(_v);
        if (has && dt > 0) {
          let d = yaw - yawPrev; if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2;
          bankNow = damp(bankNow, clamp(d / dt * 0.25 * bank, -0.5, 0.5), 3, dt);
        }
        yawPrev = yaw; has = true;
        want.roll = bankNow;
      } else {
        want.pos.copy(offset).applyMatrix4(obj.matrixWorld);
        want.target.copy(look).applyMatrix4(obj.matrixWorld);
        want.roll = 0;
      }
      want.fov = val(fov);
      prev.copy(_w);
    }, lambda, { lambdaTarget: lambda * 1.6 });
  }

  /** a very fast swing: the post smears it (the motion blur below does the rest) */
  whip(p, dur = 0.42, ease = Ease.inOutQuart) { this.blurBoost = 3.2; return this.to(p, dur, ease).then((ok) => { this.blurBoost = 1; return ok; }); }

  /* --------------------------------------------------------------- layers */
  shake(amount = 0.4) { this.trauma = clamp(this.trauma + amount, 0, 1); }
  handheld(amount = 0.15) { this.handheldAmt = amount; }
  punch(deg = 8) { this.fovKickV += deg * 14; }
  shift(x = 0, y = 0) { this.shiftWant.set(x, y); }

  /** distance at which a sphere of this radius fills the frame (with margin) */
  fit(radius, fov = this.base.fov, margin = 1.15) {
    const vf = fov * DEG, hf = 2 * Math.atan(Math.tan(vf / 2) * this.cam.aspect);
    return (radius * margin) / Math.sin(Math.min(vf, hf) / 2);
  }

  update(dt) {
    this.time += dt;
    if (this.move) {
      this.move.update(this.base, dt);
      this.move.step(dt);
      if (this.move.done) this.move = null;
    }
    this.apply(dt);
  }

  apply(dt) {
    const cam = this.cam, b = this.base, t = this.time;
    cam.position.copy(b.pos);
    cam.up.set(0, 1, 0);
    cam.lookAt(b.target);
    if (b.roll) cam.rotateZ(b.roll);

    // trauma: squared, so small knocks stay small and big hits are violent
    if (dt > 0) this.trauma = Math.max(0, this.trauma - this.traumaDecay * dt);
    const s = this.trauma * this.trauma;
    const h = this.handheldAmt;
    if (s > 0 || h > 0) {
      const f = this.shakeFreq, hf = this.handheldFreq;
      const ox = s * this.shakeOffset * noise1(t * f + 11) + h * 0.12 * noise1(t * hf + 3);
      const oy = s * this.shakeOffset * noise1(t * f + 37) + h * 0.10 * noise1(t * hf + 7.7);
      const oz = s * this.shakeOffset * 0.5 * noise1(t * f + 59);
      cam.translateX(ox); cam.translateY(oy); cam.translateZ(oz);
      cam.rotateY(s * this.shakeAngle * noise1(t * f + 71) + h * 0.006 * noise1(t * hf + 13));
      cam.rotateX(s * this.shakeAngle * noise1(t * f + 97) + h * 0.006 * noise1(t * hf + 29));
      cam.rotateZ(s * this.shakeAngle * 1.4 * noise1(t * f + 131) + h * 0.004 * noise1(t * hf + 41));
    }

    // FOV kick: a stiff spring back to zero, integrated in small fixed steps (a stiff spring stepped once per frame
    // explodes on a slow frame: at 0.15 s a frame it swung the lens between 3° and 150°)
    if (dt > 0) {
      const kStiff = 120, kDamp = 16, h = 1 / 240;
      for (let left = Math.min(dt, 0.25); left > 1e-6; left -= h) {
        const st = Math.min(h, left);
        this.fovKickV += (-kStiff * this.fovKick - kDamp * this.fovKickV) * st;
        this.fovKick += this.fovKickV * st;
      }
      this.fovKick = clamp(this.fovKick, -40, 40);
    }
    const fov = clamp(b.fov + this.fovKick, 3, 150);
    if (Math.abs(cam.fov - fov) > 1e-3) { cam.fov = fov; cam.updateProjectionMatrix(); }

    // lens shift
    if (dt > 0) { this.shiftNow.x = damp(this.shiftNow.x, this.shiftWant.x, 4, dt); this.shiftNow.y = damp(this.shiftNow.y, this.shiftWant.y, 4, dt); }
    const sx = this.shiftNow.x, sy = this.shiftNow.y;
    if (Math.abs(sx) > 1e-4 || Math.abs(sy) > 1e-4) {
      const W = this.viewW, H = this.viewH;
      cam.setViewOffset(W, H, -sx * W, sy * H, W, H);
    } else if (cam.view && cam.view.enabled) cam.clearViewOffset();

    // motion blur from the camera's own swing (frame-to-frame rotation, in screen units)
    cam.updateMatrixWorld();
    if (this._hasPrev && dt > 0) {
      _q.copy(cam.quaternion).invert().multiply(this._prevQ);
      _v.set(0, 0, -1).applyQuaternion(_q);
      const vf = cam.fov * DEG, hfov = 2 * Math.atan(Math.tan(vf / 2) * cam.aspect);
      const dx = Math.atan2(_v.x, -_v.z) / hfov, dy = Math.atan2(_v.y, -_v.z) / vf;
      const m = Math.hypot(dx, dy), gain = this.blurGain * (this.blurBoost || 1);
      const k = m > 0.0035 ? (m - 0.0035) / m : 0;
      const cap = this.blurBoost > 1 ? 0.07 : 0.025;
      this.blurOut.set(clamp(dx * k * gain, -cap, cap), clamp(dy * k * gain, -cap, cap));
    } else this.blurOut.set(0, 0);
    if (!this.motionBlur) this.blurOut.set(0, 0);
    this._prevQ.copy(cam.quaternion); this._hasPrev = true;
  }
}
