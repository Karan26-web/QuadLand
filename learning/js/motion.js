/* ==========================================================================
 * motion.js -- the one motion, effect and sound system for the whole game
 * --------------------------------------------------------------------------
 * Built to the Motion & Effects Catalog. Every duration, every easing and
 * every piece of feedback in the game comes from here. Nothing else hard-codes
 * a number of milliseconds or a cubic-bezier: if a beat needs a timing this
 * file does not have, the timing is added here and used by name.
 *
 * TONE. The audience is 12 to 16. The motion is meant to read as a good
 * science app, not a cartoon: precise, fast and purposeful, ease-out for
 * almost everything, and overshoot only where a thing is meant to feel
 * physical -- POP is back.out(1.2), which is a nudge past the mark, not a
 * bounce. Nothing here wobbles, springs twice or spins.
 *
 * There is no build step and no module loader in this project -- index.html
 * loads plain <script> tags in order -- so the "export" is a single frozen
 * global, window.Motion. Load order is fixed:
 *
 *     libs/gsap.min.js  ->  libs/Flip.min.js  ->  js/motion.js  ->  script.js
 *
 * EVERY HELPER takes an optional GSAP vars object as its last argument, which
 * is merged over the helper's own vars, and EVERY HELPER returns the tween or
 * timeline it made, so a caller can chain it, await it or kill it.
 *
 * ---- how this joins the game's own pacing ----
 * The game has two rules that every beat has to obey, and GSAP has to obey
 * them too or Skip and Replay break:
 *
 *   Skip    a scene plays its whole choreography out in a handful of frames
 *           and lands in the state it would have reached anyway. So while the
 *           game's fastForward flag is up, every duration asked of this file
 *           collapses to nothing, and every animation already in the air is
 *           jumped to its end by Motion.skip().
 *
 *   Replay  the scene in play is genuinely stopped, not fast-forwarded,
 *           because the abandoned chain would carry on writing to the board
 *           underneath the fresh one. Every animation made here is tracked,
 *           so Motion.retire() can kill the lot and hand back whatever they
 *           had written inline.
 *
 * script.js hands those two flags over once, at startup, with Motion.bind().
 * ========================================================================== */

(function (global) {
  'use strict';

  var gsap = global.gsap;
  if (!gsap) {
    throw new Error('motion.js: load libs/gsap.min.js before js/motion.js');
  }
  if (global.Flip) gsap.registerPlugin(global.Flip);

  /* ======================================================================
   * 0. the constants -- the only timings and curves in the game
   * ====================================================================== */

  /* seconds, the unit GSAP works in */
  var INSTANT = 0.08;   /* under the finger: a press, a hover, a tick      */
  var FAST    = 0.15;   /* a thing arriving or leaving, felt not watched   */
  var NORMAL  = 0.25;   /* the everyday beat: a pulse, a shake, a snap     */
  var SLOW    = 0.4;    /* a deliberate move the eye is meant to follow    */
  var REVEAL  = 0.6;    /* a concept step: long enough to read            */

  /* Out for anything arriving (it lands and settles), in for anything
     leaving (it gathers speed on its way out), in-out for anything that
     travels, and the two specials: POP for a thing that lands physically,
     SNAP for a thing that is caught by something. */
  var OUT   = 'power3.out';
  var IN    = 'power2.in';
  var INOUT = 'power2.inOut';
  var POP   = 'back.out(1.2)';
  var SNAP  = 'expo.out';

  var STAGGER_UI   = 0.05;  /* a list of controls: quick, barely sequential */
  var STAGGER_STEP = 0.08;  /* the steps of an explanation: read one by one */

  /* Not zero: a zero-length tween still fires its callbacks, but a browser is
     free to skip the frame that writes the end state, and the element is left
     where it started. One thousandth of a second always paints. */
  var NEAR_ZERO = 0.001;

  /* ---------- reduced motion ----------
   * Honoured live: a learner who turns the setting on mid-lesson gets the
   * short version from the next beat onwards, without a reload. */
  var mq = global.matchMedia ? global.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduced = !!(mq && mq.matches);
  if (mq) {
    var onMQ = function (e) { reduced = e.matches; };
    if (mq.addEventListener) mq.addEventListener('change', onMQ);
    else if (mq.addListener) mq.addListener(onMQ);          /* older WebKit */
  }
  function reducedMotion() { return reduced; }

  /* ---------- the bridge to the game's pacing ---------- */
  var readToken = function () { return 0; };
  var readFast  = function () { return false; };
  function bind(hooks) {
    if (hooks && typeof hooks.token === 'function') readToken = hooks.token;
    if (hooks && typeof hooks.fast  === 'function') readFast  = hooks.fast;
  }

  /* Every duration in the game goes through here. Reduced motion and a skip
     in flight both collapse it; nothing else changes it. */
  function dur(seconds) {
    if (reduced || readFast()) return NEAR_ZERO;
    return seconds == null ? NORMAL : seconds;
  }
  /* and every stagger: a skipped or reduced group arrives all at once */
  function gap(seconds) {
    if (reduced || readFast()) return 0;
    return seconds == null ? STAGGER_STEP : seconds;
  }

  /* ======================================================================
   * 1. plumbing -- tracking, will-change, the vars override
   * ====================================================================== */

  /* Every animation this file makes is held until it finishes, so a replay
     can find it and kill it. Entries drop out as they complete, so the set
     stays the size of what is actually moving -- a handful, at most. */
  var live = new Set();

  function toArray(t) {
    if (!t) return [];
    if (typeof t === 'string') return Array.prototype.slice.call(document.querySelectorAll(t));
    if (typeof t.length === 'number' && !t.nodeType) return Array.prototype.slice.call(t);
    return [t];
  }

  /* Every helper's last argument. Shallow is right: a caller overriding
     `duration` or `ease` must not have to restate the rest.
       Two keys are read off rather than passed through to GSAP: `from`, which
     overrides the starting state of a helper that tweens from one, and any
     key listed in `lift`, which the helper handles itself. */
  function merge(base, over, lift) {
    if (!over) return base;
    for (var k in over) {
      if (!Object.prototype.hasOwnProperty.call(over, k)) continue;
      if (k === 'from' || (lift && lift.indexOf(k) >= 0)) continue;
      /* A caller naming its own duration or stagger still gets reduced motion
         and Skip, because the figure it gives is scaled on the way in. Without
         this, every override in the game would be a quiet hole in both -- the
         one mistake this design would otherwise invite. */
      if (k === 'duration' && typeof over[k] === 'number') { base[k] = dur(over[k]); continue; }
      if (k === 'stagger' && typeof over[k] === 'number') { base[k] = gap(over[k]); continue; }
      base[k] = over[k];
    }
    return base;
  }
  /* the start of a fromTo, with whatever the caller wanted changed about it */
  function startOf(base, over) {
    return merge(base, over && over.from);
  }

  /* will-change is a promise to the compositor, and an expensive one to leave
     standing: it goes on for the length of the animation and comes off the
     moment it ends, however it ends. */
  function willChange(targets, value) {
    var els = toArray(targets).filter(Boolean);
    els.forEach(function (el) { if (el.style) el.style.willChange = value || 'transform'; });
    return function () {
      els.forEach(function (el) { if (el.style) el.style.willChange = ''; });
    };
  }

  function track(anim, revert) {
    anim.__motionRevert = revert || null;
    live.add(anim);
    /* a GSAP animation is thenable: this settles when it reaches its end */
    anim.then(function () { release(anim); }, function () { release(anim); });
    return anim;
  }
  function release(anim) {
    if (!live.has(anim)) return;
    live.delete(anim);
    if (anim.__motionRevert) { anim.__motionRevert(); anim.__motionRevert = null; }
  }

  /* A scene has been retired. Everything in the air belonged to it, so kill
     the lot and hand back whatever each one had written inline -- otherwise
     an element frozen mid-pulse carries that transform into the fresh scene. */
  function retire() {
    var all = Array.from(live);            /* a Set: Array.from, never slice.call */
    live.clear();
    all.forEach(function (anim) {
      anim.kill();
      if (anim.__motionRevert) { anim.__motionRevert(); anim.__motionRevert = null; }
    });
  }

  /* A skip is in flight: everything already moving lands where it was going.
     Anything started from here on is built at NEAR_ZERO by dur(), so the rest
     of the scene plays out in a few frames.
       Endless animations are left alone -- a guide line's dash loop, the
     loading dots. There is no "end" to jump one to, and the scene they belong
     to will stop them when it is torn down. */
  function skip() {
    Array.from(live).forEach(function (anim) {
      if (anim.__motionEndless) return;       /* no end to jump one to */
      if (anim.totalProgress() < 1) anim.totalProgress(1, false);
    });
  }

  /* ---------- the factory ----------
   * A concept explanation is one timeline, built in the order the learner's
   * eye should follow. Made here, it is tracked, it carries will-change for
   * its own lifetime only, and Skip and Replay both reach it. */
  function timeline(opts) {
    var o = opts || {};
    var marked = toArray(o.willChange);
    var lift = null;
    var tl = gsap.timeline({
      paused: !!o.paused,
      defaults: o.defaults || { ease: OUT },
      onStart: function () {
        if (marked.length) lift = willChange(marked, o.willChangeValue);
        if (o.onStart) o.onStart();
      },
      onComplete: o.onComplete
    });
    /* One tidy-up, run whichever way the timeline ends -- its own last frame,
       or a replay killing it half way. Anything that has to be handed back
       goes here rather than into a clearProps on the final tween, which a
       killed timeline would never reach. */
    return track(tl, function () {
      if (lift) { lift(); lift = null; }
      if (o.revert) o.revert();
    });
  }

  /* one-off tweens, tracked the same way */
  function to(targets, vars)     { return track(gsap.to(targets, vars)); }
  function from(targets, vars)   { return track(gsap.from(targets, vars)); }
  function fromTo(targets, a, b) { return track(gsap.fromTo(targets, a, b)); }
  function set(targets, vars)    { return gsap.set(targets, vars); }

  /* ======================================================================
   * 2. buttons and controls
   * ====================================================================== */

  /* Arriving. Also the card enter of section 4 -- a card and a button arrive
     the same way, so there is one helper, and the caller says how far it
     rises and whether it grows in. */
  function enter(el, vars) {
    var els = toArray(el).filter(Boolean);
    if (!els.length) return null;
    var tl = timeline({
      willChange: els, willChangeValue: 'transform, opacity',
      revert: function () { gsap.set(els, { clearProps: 'opacity,transform' }); }
    });
    tl.fromTo(els,
      startOf({ opacity: 0, y: 8, scale: 1 }, vars),
      merge({
        opacity: 1, y: 0, scale: 1,
        duration: dur(FAST), ease: OUT, stagger: gap(STAGGER_UI)
      }, vars));
    return tl;
  }

  /* Leaving, and gone: the node is taken out of the document on the last
     frame, because a thing that has left should not still be in the tree
     catching pointer events at zero opacity. `keep: true` leaves it. */
  function exit(el, vars) {
    var els = toArray(el).filter(Boolean);
    if (!els.length) return null;
    var keep = !!(vars && vars.keep);
    /* The removal belongs to the timeline, not to the tween: an onComplete
       passed in by the caller would otherwise replace it, and the node would
       stay in the tree at zero opacity, still catching pointers. */
    var tl = timeline({
      willChange: els, willChangeValue: 'transform, opacity',
      onComplete: function () {
        if (keep) return;
        els.forEach(function (e) { if (e.parentNode) e.parentNode.removeChild(e); });
      }
    });
    tl.to(els, merge({
      opacity: 0, y: -6, scale: 0.98,
      duration: dur(FAST), ease: IN, stagger: gap(STAGGER_UI)
    }, vars, ['keep']));
    return tl;
  }

  /* A press: the thing gives a little under the finger and springs back.
     INSTANT, because anything longer is felt as lag rather than as feedback,
     and it never blocks -- whatever the press does runs alongside it. */
  function press(el, vars) {
    if (!el) return null;
    return feedback(el, function (tl) {
      tl.to(el, merge({ scale: 0.97, duration: dur(INSTANT), ease: OUT }, vars))
        .to(el, { scale: 1, duration: dur(INSTANT), ease: OUT });
    });
  }

  /* A 3D button -- a press that sinks rather than shrinks.
     The stylesheet draws the button standing on a side wall: a solid
     `0 var(--edge) 0` layer of its own box-shadow, with the ambient shadow
     spelled off --edge as well. This walks the top surface down by exactly
     the height of that wall while the wall collapses underneath it, so the
     base of the button stays planted on the page and only the surface the
     finger is on travels. Let go and it comes back up to its own height.

     The two halves have to move by the same amount in opposite directions or
     the button drifts, so `edge` here is the same number the CSS declares.

     It moves the surface with --sink rather than with a transform, and the
     stylesheet spells that into `translate`. That is the whole reason this
     works on a chip: a chip already uses transform for its reveal, its hover
     lift and its picked state, and an inline transform from here would take
     all three away. `translate` is its own property, composed before
     transform, so the two never meet. The caller's only job is to spell
     --edge into box-shadow and --sink into translate, and to keep box-shadow
     out of the element's transition -- a transition there would smear the
     wall as it collapses. The `is-3d` class added here is that rule's hook.

     INSTANT down, because a press is felt under the finger rather than
     watched, and SLOW with POP coming back, because the button returning to
     its full height is the one beat in it that is meant to read as physical:
     POP's overshoot lifts it a shade past its own height on the way back,
     wall and surface together, the way a key does.

     Bound once per element and safe to call again -- the second call is a
     no-op. Returns the function that unbinds it. */
  function button3d(el, opts) {
    if (!el || el.__button3d) return null;
    var o = opts || {};
    var edge = o.edge == null ? 5 : o.edge;      /* px -- the CSS --edge */
    var win = el.ownerDocument.defaultView || global;
    var down = false;

    el.__button3d = true;
    el.classList.add('is-3d');

    function push() {
      if (down || el.disabled) return;
      down = true;
      to(el, {
        '--sink': edge + 'px', '--edge': '0px',
        duration: dur(INSTANT), ease: OUT, overwrite: 'auto'
      });
    }
    function lift() {
      if (!down) return;
      down = false;
      to(el, {
        '--sink': '0px', '--edge': edge + 'px',
        duration: dur(SLOW), ease: POP, overwrite: 'auto',
        /* Land back on the stylesheet's own values rather than on a copy of
           them. A chip that has been docked, or cloned into a drag ghost, is
           told by CSS that it has no wall left to stand on, and an inline
           --edge sitting here would outrank that for good. */
        onComplete: function () {
          el.style.removeProperty('--sink');
          el.style.removeProperty('--edge');
        }
      });
    }
    function onKeyDown(e) { if (e.key === ' ' || e.key === 'Enter') push(); }
    function onKeyUp(e)   { if (e.key === ' ' || e.key === 'Enter') lift(); }

    el.addEventListener('pointerdown', push);
    el.addEventListener('pointerleave', lift);
    el.addEventListener('blur', lift);
    el.addEventListener('keydown', onKeyDown);
    el.addEventListener('keyup', onKeyUp);
    /* on the window, so a finger that slides off the button still lets it up */
    win.addEventListener('pointerup', lift);

    return function unbind() {
      el.removeEventListener('pointerdown', push);
      el.removeEventListener('pointerleave', lift);
      el.removeEventListener('blur', lift);
      el.removeEventListener('keydown', onKeyDown);
      el.removeEventListener('keyup', onKeyUp);
      win.removeEventListener('pointerup', lift);
      el.classList.remove('is-3d');
      el.style.removeProperty('--sink');
      el.style.removeProperty('--edge');
      el.__button3d = false;
    };
  }

  /* A control coming live. The border shift is the element's own class; this
     is the fade that says it is now yours to press. */
  function enable(el, vars) {
    var els = toArray(el).filter(Boolean);
    if (!els.length) return null;
    var tl = timeline({ willChange: els, willChangeValue: 'opacity' });
    tl.fromTo(els, { opacity: 0.4 },
      merge({ opacity: 1, duration: dur(NORMAL), ease: OUT,
              clearProps: 'opacity' }, vars));
    return tl;
  }

  /* The pill behind a segmented control, moving to the option just chosen.
     SNAP, so it arrives under the finger rather than drifting there. */
  function slideIndicator(el, x, vars) {
    if (!el) return null;
    var tl = timeline({ willChange: el });
    tl.to(el, merge({ x: x, duration: dur(NORMAL), ease: SNAP }, vars));
    return tl;
  }

  /* ======================================================================
   * 3. text and numbers
   * ====================================================================== */

  /* Lines of an explanation, arriving in the order they are meant to be read.
     However this ends -- its own last frame, or a replay cutting it short --
     the group is left plainly visible and back under its stylesheet. Killed
     half way with the fade still inline, half the group would stay
     part-transparent for the rest of the session. */
  function revealLines(target, vars) {
    /* Handed one element, its children are the lines. Handed a list, the list
       is the lines. Handed an element with nothing in it, it is the one line. */
    var els;
    if (target && target.nodeType === 1) {
      els = Array.prototype.slice.call(target.children);
      if (!els.length) els = [target];
    } else {
      els = toArray(target);
    }
    els = els.filter(Boolean);
    if (!els.length) return timeline();
    var tl = timeline({
      willChange: els, willChangeValue: 'transform, opacity',
      revert: function () { gsap.set(els, { clearProps: 'opacity,transform' }); }
    });
    tl.fromTo(els,
      startOf({ opacity: 0, y: 6, scale: 1 }, vars),
      merge({ opacity: 1, y: 0, scale: 1, duration: dur(REVEAL), ease: OUT,
              stagger: gap(STAGGER_STEP) }, vars));
    return tl;
  }

  /* A number that has changed, counted to rather than swapped. `snap` is 1
     for a whole number, 0.01 for two places. The accent tint while it runs is
     a class the element carries, not a colour written from here. */
  function countTo(el, value, vars) {
    if (!el) return null;
    var o = vars || {};
    var snap = o.snap == null ? 1 : o.snap;
    var places = snap < 1 ? String(snap).split('.')[1].length : 0;
    var box = { n: parseFloat(el.textContent.replace(/[^0-9.-]/g, '')) || 0 };
    var prefix = o.prefix || '', suffix = o.suffix || '';
    /* the accent tint while the number is moving is a class, not a colour
       written from here -- the stylesheet owns what the accent is */
    el.classList.add('mo-counting');
    var tl = timeline({ revert: function () { el.classList.remove('mo-counting'); } });
    tl.to(box, merge({
      n: value,
      duration: dur(NORMAL),
      ease: OUT,
      onUpdate: function () {
        el.textContent = prefix + (places ? box.n.toFixed(places)
                                          : String(Math.round(box.n))) + suffix;
      }
    }, o, ['snap', 'prefix', 'suffix']));
    return tl;
  }

  /* One step of a derivation: the old term goes while the new one comes in,
     in the same place, and the new one is held lit for a beat so the eye
     knows which part of the line moved. */
  function swapTerm(oldEl, newEl, vars) {
    var tl = timeline({ willChange: [oldEl, newEl], willChangeValue: 'opacity' });
    if (oldEl) tl.to(oldEl, { opacity: 0, duration: dur(FAST), ease: IN }, 0);
    if (newEl) {
      tl.fromTo(newEl, { opacity: 0 },
        merge({ opacity: 1, duration: dur(NORMAL), ease: OUT }, vars), dur(FAST) * 0.5);
      tl.add(function () { newEl.classList.add('mo-changed'); });
      tl.add(function () { newEl.classList.remove('mo-changed'); }, '+=' + dur(REVEAL));
    }
    return tl;
  }

  /* A soft band sweeping left to right behind a term. The band is a child
     scaled from its left edge -- a transform, so the sweep costs nothing and
     the text above it never moves. */
  function highlight(el, vars) {
    if (!el) return null;
    var band = el.querySelector(':scope > .mo-highlight');
    if (!band) {
      band = document.createElement('i');
      band.className = 'mo-highlight';
      band.setAttribute('aria-hidden', 'true');
      el.insertBefore(band, el.firstChild);
    }
    var tl = timeline({ willChange: band });
    tl.fromTo(band, { scaleX: 0, opacity: 1 },
      merge({ scaleX: 1, duration: dur(NORMAL), ease: OUT }, vars));
    return tl;
  }

  /* One emphasis, once. Not a heartbeat: a thing that pulses twice reads as
     a warning rather than as "look here". */
  function pulse(el, vars) {
    if (!el) return null;
    return feedback(el, function (tl) {
      tl.to(el, merge({ scale: 1.04, duration: dur(NORMAL) / 2, ease: INOUT }, vars))
        .to(el, { scale: 1, duration: dur(NORMAL) / 2, ease: INOUT });
    });
  }

  /* ======================================================================
   * 4. shapes and diagrams (SVG)
   * ====================================================================== */

  function moveTo(el, x, y, vars) {
    if (!el) return null;
    var tl = timeline({ willChange: el });
    tl.to(el, merge({ x: x, y: y, duration: dur(NORMAL), ease: OUT }, vars));
    return tl;
  }

  function scaleTo(el, sx, sy, origin, vars) {
    if (!el) return null;
    var tl = timeline({ willChange: el });
    tl.to(el, merge({
      scaleX: sx, scaleY: sy == null ? sx : sy,
      transformOrigin: origin || 'center center',
      duration: dur(NORMAL), ease: OUT
    }, vars));
    return tl;
  }

  function rotateTo(el, deg, origin, vars) {
    if (!el) return null;
    var tl = timeline({ willChange: el });
    tl.to(el, merge({
      rotation: deg, transformOrigin: origin || 'center center',
      duration: dur(SLOW), ease: INOUT
    }, vars));
    return tl;
  }

  /* ---------- drawing a stroke ----------
   * The catalog asks for DrawSVG. DrawSVG is a paid GSAP Club plugin and this
   * project ships only what is in the repo, so the same effect is done the
   * native way: the dash pattern is set to the path's own length and the
   * offset is walked to zero, which uncovers the stroke from its start.
   * Identical result, nothing to license.
   *   The pace is the pen's, not the clock's -- about 600px a second, so a
   * short line does not crawl and a long one does not race -- capped at
   * REVEAL so nothing ever outstays the step it belongs to. */
  var DRAW_SPEED = 600;                       /* px per second */

  function pathLength(el) {
    try { return el.getTotalLength ? el.getTotalLength() : 0; } catch (e) { return 0; }
  }
  function drawTime(len) {
    return Math.min(REVEAL, Math.max(FAST, len / DRAW_SPEED));
  }

  function drawPath(el, vars) {
    var els = toArray(el).filter(Boolean);
    if (!els.length) return null;
    var tl = timeline({
      revert: function () {
        els.forEach(function (p) { p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; });
      }
    });
    els.forEach(function (p, i) {
      var len = pathLength(p) || 1;
      p.style.strokeDasharray = len + ' ' + len;
      p.style.strokeDashoffset = len;
      tl.to(p, merge({
        strokeDashoffset: 0,
        duration: dur(drawTime(len)),
        ease: OUT
      }, vars), i * gap(STAGGER_STEP));
    });
    return tl;
  }

  function undrawPath(el, vars) {
    var els = toArray(el).filter(Boolean);
    if (!els.length) return null;
    var tl = timeline();
    els.forEach(function (p, i) {
      var len = pathLength(p) || 1;
      p.style.strokeDasharray = len + ' ' + len;
      tl.to(p, merge({
        strokeDashoffset: len, duration: dur(FAST), ease: IN
      }, vars), i * gap(STAGGER_UI));
    });
    return tl;
  }

  /* An area filling in the direction that explains it. The fill is revealed
     by scaling the rect of its own clip path, so this is a transform and not
     a clip-path animation -- the compositor does it, and the shape underneath
     is never re-rasterised. */
  function fillArea(el, direction, vars) {
    if (!el) return null;
    var origins = {
      left: 'left center', right: 'right center',
      up: 'center bottom', down: 'center top'
    };
    var axis = (direction === 'up' || direction === 'down') ? 'scaleY' : 'scaleX';
    var from = {}; from[axis] = 0;
    var toV = {}; toV[axis] = 1;
    toV.transformOrigin = origins[direction] || origins.left;
    toV.duration = dur(SLOW);
    toV.ease = OUT;
    var tl = timeline({ willChange: el });
    tl.fromTo(el, from, merge(toV, vars));
    return tl;
  }

  /* Items moving apart into their groups. The brackets, or whatever names the
     groups, are drawn after -- a label over something still moving is a label
     nobody reads. */
  function splitInto(items, offsets, vars) {
    var els = toArray(items).filter(Boolean);
    if (!els.length) return null;
    var tl = timeline({ willChange: els });
    els.forEach(function (el, i) {
      var off = offsets[i] || { x: 0, y: 0 };
      tl.to(el, merge({
        x: off.x || 0, y: off.y || 0, duration: dur(SLOW), ease: OUT
      }, vars), i * gap(STAGGER_STEP));
    });
    return tl;
  }

  /* The release of a drag: the thing is caught by where it belongs. SNAP and
     no overshoot -- a maths object that bounces past its grid point and comes
     back is saying something untrue about where it is. */
  function snapTo(el, x, y, vars) {
    if (!el) return null;
    var tl = timeline({ willChange: el });
    tl.to(el, merge({ x: x, y: y, duration: dur(FAST), ease: SNAP }, vars));
    return tl;
  }

  /* A construction line, still under consideration: its dashes crawl so it
     reads as provisional. Endless on purpose -- it runs until the scene stops
     it, or until guideLine.stop() confirms the line. */
  function guideLine(el, vars) {
    if (!el) return null;
    var len = pathLength(el) || 12;
    el.style.strokeDasharray = '6 6';
    var tl = timeline({
      revert: function () { el.style.strokeDasharray = ''; el.style.strokeDashoffset = ''; }
    });
    if (reduced) return tl;                    /* a crawling line is motion for its own sake */
    tl.__motionEndless = true;
    tl.fromTo(el, { strokeDashoffset: 0 },
      merge({ strokeDashoffset: -12, duration: 2, ease: 'none', repeat: -1 }, vars));
    return tl;
  }

  /* A point going onto a diagram: the dot lands, and only then is it named.
     A label that arrives with the dot is a label the eye skips. */
  function plotPoint(dot, label, vars) {
    var tl = timeline({ willChange: [dot, label] });
    if (dot) {
      tl.fromTo(dot, { scale: 0, transformOrigin: 'center center' },
        merge({ scale: 1, duration: dur(FAST), ease: POP }, vars), 0);
    }
    if (label) {
      tl.fromTo(label, { opacity: 0 },
        { opacity: 1, duration: dur(FAST), ease: OUT }, dur(FAST));
    }
    return tl;
  }

  /* ======================================================================
   * 5. panels, cross-fades and layout
   * ====================================================================== */

  function slideIn(el, side, vars) {
    if (!el) return null;
    var w = el.offsetWidth || 320, h = el.offsetHeight || 320;
    var from = { left: { x: -w }, right: { x: w }, top: { y: -h }, bottom: { y: h } };
    var tl = timeline({ willChange: el });
    tl.fromTo(el, from[side] || from.right,
      merge({ x: 0, y: 0, duration: dur(NORMAL), ease: OUT }, vars));
    return tl;
  }

  function openModal(dialog, backdrop, vars) {
    var tl = timeline({ willChange: [dialog, backdrop], willChangeValue: 'transform, opacity' });
    if (backdrop) tl.fromTo(backdrop, { opacity: 0 },
      { opacity: 1, duration: dur(FAST), ease: OUT }, 0);
    if (dialog) tl.fromTo(dialog, { opacity: 0, scale: 0.96 },
      merge({ opacity: 1, scale: 1, duration: dur(NORMAL), ease: OUT }, vars), 0);
    return tl;
  }

  /* The incoming starts before the outgoing has finished, so the eye is
     carried across rather than passed through a blank frame. */
  function crossfade(outEl, inEl, vars) {
    var tl = timeline({ willChange: [outEl, inEl], willChangeValue: 'opacity' });
    if (outEl) tl.to(outEl, { opacity: 0, duration: dur(FAST), ease: IN }, 0);
    if (inEl) tl.fromTo(inEl, { opacity: 0 },
      merge({ opacity: 1, duration: dur(NORMAL), ease: OUT }, vars), dur(FAST) * 0.5);
    return tl;
  }

  /* A layout that has genuinely changed: Flip measures both states and plays
     the difference as a transform, so no frame of the move costs a layout. */
  function relayout(targets, change, vars) {
    var Flip = global.Flip;
    if (!Flip) { change(); return null; }
    var o = vars || {};
    var state = Flip.getState(targets, o.props ? { props: o.props } : undefined);
    change();
    var lift = willChange(targets, o.willChangeValue);
    var anim = Flip.from(state, merge({
      duration: dur(NORMAL), ease: INOUT,
      absolute: !!o.absolute, nested: !!o.nested, scale: o.scale !== false
    }, o.vars));
    return track(anim, lift);
  }

  /* A placeholder giving way to the thing it stood for. */
  function resolve(skeleton, content, vars) {
    if (skeleton) skeleton.classList.remove('mo-shimmer');
    return crossfade(skeleton, content, vars);
  }

  /* ======================================================================
   * 6. feedback states
   * ====================================================================== */

  /* Feedback is transient by definition: the element is borrowed for a
     quarter of a second and must be handed back exactly as it was found.
     Most of these elements are positioned by a stylesheet rule, not by an
     inline transform, so an inline transform left behind by GSAP would
     quietly outrank the rule from then on. Hence: remember what was inline
     before (usually nothing), and put that back at the end.
       A second press on something already being shaken or pulsed takes over
     rather than fighting it -- two tweens writing the same transform is a
     visible stutter -- so the one in flight is killed and handed back first. */
  var feedbackOf = new WeakMap();

  function feedback(el, build) {
    var running = feedbackOf.get(el);
    if (running) { running.kill(); release(running); }

    var wasInline = el.style ? el.style.transform : '';
    var tl = timeline({
      willChange: el,
      revert: function () {
        gsap.set(el, { clearProps: 'transform' });
        if (wasInline && el.style) el.style.transform = wasInline;
        if (feedbackOf.get(el) === tl) feedbackOf.delete(el);
      }
    });
    feedbackOf.set(el, tl);
    build(tl);
    return tl;
  }

  /* Right. One short outward pulse, and the tick draws itself if the element
     has one. No colour written here -- the element's own class carries the
     green, because that is a state it stays in, not a movement. */
  function correct(el, vars) {
    if (!el) return null;
    /* Opt-in: an element that wants its tick drawn marks the path .mo-tick.
       Anything already drawing its own tick in the stylesheet is left alone,
       rather than having a second animation written over the first. */
    var tick = el.querySelector && el.querySelector('.mo-tick');
    if (tick) drawPath(tick, { duration: dur(FAST) });
    return feedback(el, function (tl) {
      tl.to(el, merge({ scale: 1.06, duration: dur(NORMAL) * 0.45, ease: OUT }, vars))
        .to(el, { scale: 1, duration: dur(NORMAL), ease: POP });
    });
  }

  /* Wrong. A head-shake: three cycles at four pixels, which is legible as
     "not that one" and is nowhere near a rubber band. No colour written here
     -- the element's own class carries the red, because that is a state it
     stays in for a beat, not a movement. */
  var SHAKE = [-4, 4, -4, 4, -4, 4, 0];
  function incorrect(el, vars) {
    if (!el) return null;
    return feedback(el, function (tl) {
      var each = dur(NORMAL) / SHAKE.length;
      SHAKE.forEach(function (x, i) {
        tl.to(el, merge({
          x: x, duration: each,
          ease: i === SHAKE.length - 1 ? OUT : 'none'
        }, i === 0 ? vars : null));
      });
    });
  }

  /* A hint arriving under the question, and the part of the diagram it is
     about, pulsed once so the two are tied together. */
  function showHint(el, target, vars) {
    var tl = timeline({ willChange: el, willChangeValue: 'transform, opacity' });
    if (el) tl.fromTo(el, { opacity: 0, y: -6 },
      merge({ opacity: 1, y: 0, duration: dur(NORMAL), ease: OUT }, vars), 0);
    if (target) tl.add(function () { pulse(target); }, dur(NORMAL) * 0.5);
    return tl;
  }

  /* A bar filling. Scaled, never widened: a width is a layout on every frame
     of a bar that moves for as long as the game takes to load. The element is
     full width and carries --fill, 0 to 1. */
  function progress(el, pct, vars) {
    if (!el) return null;
    var v = Math.max(0, Math.min(100, pct)) / 100;
    el.classList.toggle('mo-full', v >= 1);
    var tl = timeline();
    /* the bar is steered from three places at once while the game loads, so a
       fresh figure retargets the move rather than queueing behind it */
    tl.to(el, merge({ '--fill': v, duration: dur(SLOW), ease: OUT,
                      overwrite: 'auto' }, vars));
    return tl;
  }

  function scoreUpdate(el, value, vars) {
    var tl = timeline();
    tl.add(countTo(el, value, vars));
    tl.add(function () { pulse(el); }, dur(NORMAL));
    return tl;
  }

  /* The end of a lesson, held to one gesture: the tick draws, the summary
     lines arrive one by one, and a slow bloom passes behind them. No
     fireworks -- the work is the reward. */
  function complete(screen, vars) {
    if (!screen) return null;
    var tick  = screen.querySelector('.mo-tick, .tick path');
    var lines = screen.querySelector('.mo-summary');
    var bloom = screen.querySelector('.mo-bloom');
    var tl = timeline();
    if (tick)  tl.add(drawPath(tick, merge({ duration: dur(REVEAL) }, vars)), 0);
    if (bloom) tl.fromTo(bloom, { opacity: 0 },
      { opacity: 0.15, duration: dur(SLOW), ease: INOUT }, 0)
      .to(bloom, { opacity: 0, duration: dur(SLOW) * 2, ease: INOUT });
    if (lines) tl.add(revealLines(lines), dur(FAST));
    return tl;
  }

  /* Waiting. Three dots, and nothing that spins. */
  function loading(el, vars) {
    var dots = toArray(el && el.children).filter(Boolean);
    if (!dots.length) return null;
    if (reduced) return timeline();
    var tl = timeline({ revert: function () { gsap.set(dots, { clearProps: 'opacity' }); } });
    tl.__motionEndless = true;
    tl.to(dots, merge({
      opacity: 0.25, duration: dur(SLOW), ease: INOUT,
      stagger: { each: gap(STAGGER_UI) * 2, repeat: -1, yoyo: true }
    }, vars));
    return tl;
  }

  /* ======================================================================
   * 7. scene and background
   * ====================================================================== */

  /* One scene handing over to the next. What is shared between them -- the
     title, the progress -- is not passed in, so it never moves: the sense of
     one continuous lesson comes from what stays put. */
  function transition(fromScene, toScene, vars) {
    var tl = timeline({ willChange: [fromScene, toScene], willChangeValue: 'transform, opacity' });
    if (fromScene) tl.to(fromScene, { opacity: 0, y: -8, duration: dur(FAST), ease: IN }, 0);
    if (toScene) tl.add(enter(toScene, merge({ duration: dur(NORMAL), y: 12 }, vars)), dur(FAST));
    return tl;
  }

  /* A theme change is a set of custom properties tweened together, so the
     text colour moves with the background and the contrast never dips in the
     middle of the change. */
  function setTheme(vars, opts) {
    var o = opts || {};
    var root = o.root || document.documentElement;
    var tl = timeline();
    tl.to(root, merge(merge({ duration: dur(SLOW), ease: INOUT }, vars), o.vars));
    return tl;
  }
  function setAccent(color, opts) {
    return setTheme({ '--accent': color }, opts);
  }

  /* Everything but the thing being talked about, stood down. */
  function focus(el, others, vars) {
    var dim = toArray(others).filter(function (o) { return o && o !== el; });
    var tl = timeline();
    if (dim.length) tl.to(dim, merge({ opacity: 0.3, duration: dur(NORMAL), ease: OUT }, vars), 0);
    if (el) tl.to(el, { opacity: 1, duration: dur(NORMAL), ease: OUT }, 0);
    return tl;
  }
  function unfocus(all, vars) {
    var tl = timeline();
    tl.to(toArray(all), merge({ opacity: 1, duration: dur(NORMAL), ease: OUT,
                                clearProps: 'opacity' }, vars));
    return tl;
  }

  /* ======================================================================
   * 8. interaction
   * ====================================================================== */

  /* A thing picked up. It lifts off the board so the shadow under it says it
     is in the hand, not on the surface. */
  function liftStart(el, vars) {
    if (!el) return null;
    el.classList.add('mo-lifted');
    var tl = timeline({ willChange: el });
    tl.to(el, merge({ scale: 1.03, duration: dur(INSTANT), ease: OUT }, vars));
    return tl;
  }

  /* And put down: caught by a target, or returned to where it started. The
     two feel different on purpose -- SNAP is something taking it, OUT is it
     going back of its own accord. */
  function liftEnd(el, target, vars) {
    if (!el) return null;
    el.classList.remove('mo-lifted');
    var tl = timeline({ willChange: el });
    if (target) {
      tl.to(el, merge({ x: target.x, y: target.y, scale: 1,
                        duration: dur(FAST), ease: SNAP }, vars));
    } else {
      tl.to(el, merge({ x: 0, y: 0, scale: 1,
                        duration: dur(NORMAL), ease: OUT }, vars));
    }
    return tl;
  }

  /* A ring going out from where the finger landed. Fixed to the viewport and
     removed when it has gone, so nothing is left in the tree. */
  function tapRipple(x, y, vars) {
    var ring = document.createElement('i');
    ring.className = 'mo-ripple';
    ring.setAttribute('aria-hidden', 'true');
    ring.style.left = x + 'px';
    ring.style.top = y + 'px';
    document.body.appendChild(ring);
    var tl = timeline({
      willChange: ring, willChangeValue: 'transform, opacity',
      revert: function () { if (ring.parentNode) ring.parentNode.removeChild(ring); }
    });
    tl.fromTo(ring, { scale: 0, opacity: 0.55 },
      merge({ scale: 1, opacity: 0, duration: dur(FAST), ease: OUT }, vars));
    return tl;
  }

  /* A slider bound at one to one. Nothing here is tweened: a value that eases
     towards the finger is a value that is wrong for as long as it eases, and
     on a maths diagram that is a lie about the number. */
  function bindSlider(el, onValue, opts) {
    if (!el) return function () {};
    var o = opts || {};
    var min = o.min == null ? 0 : o.min, max = o.max == null ? 1 : o.max;
    var dragging = false;

    function read(e) {
      var r = el.getBoundingClientRect();
      if (!r.width) return min;
      var t = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      return min + t * (max - min);
    }
    function down(e) {
      dragging = true;
      el.setPointerCapture && el.setPointerCapture(e.pointerId);
      onValue(read(e), false);
      e.preventDefault();
    }
    function move(e) { if (dragging) onValue(read(e), false); }
    function up(e) {
      if (!dragging) return;
      dragging = false;
      onValue(read(e), true);                  /* true: this one is the release */
    }
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    return function unbind() {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    };
  }

  /* ======================================================================
   * 9. sound
   * Not motion, but the same rules: one place decides it, it is off when the
   * learner says so, and it never stacks.
   * ====================================================================== */

  var MUTE_KEY = 'maths.muted';
  var muted = false;
  try { muted = global.localStorage.getItem(MUTE_KEY) === '1'; } catch (e) { /* private mode */ }

  var lastPlayed = Object.create(null);
  var SOUND_GATE = 100;                        /* ms: the same cue, twice, is one cue */

  function isMuted() { return muted; }
  function setMuted(on) {
    muted = !!on;
    try { global.localStorage.setItem(MUTE_KEY, muted ? '1' : '0'); } catch (e) { /* fine */ }
    return muted;
  }
  function toggleMuted() { return setMuted(!muted); }

  /* True when this cue may sound: not muted, and not the same cue again
     inside a tenth of a second -- two chips docking together should chime
     once, not twice as loudly. */
  function mayPlay(key) {
    if (muted) return false;
    var now = (global.performance && performance.now()) || Date.now();
    if (lastPlayed[key] && now - lastPlayed[key] < SOUND_GATE) return false;
    lastPlayed[key] = now;
    return true;
  }

  global.Motion = Object.freeze({
    /* ---- durations ---- */
    INSTANT: INSTANT, FAST: FAST, NORMAL: NORMAL, SLOW: SLOW, REVEAL: REVEAL,
    NEAR_ZERO: NEAR_ZERO,
    /* ---- easings ---- */
    OUT: OUT, IN: IN, INOUT: INOUT, POP: POP, SNAP: SNAP,
    /* ---- rhythm ---- */
    STAGGER_UI: STAGGER_UI, STAGGER_STEP: STAGGER_STEP,
    /* ---- scaling ---- */
    dur: dur, gap: gap, reducedMotion: reducedMotion,
    /* ---- lifecycle ---- */
    bind: bind, retire: retire, skip: skip,
    /* ---- building blocks ---- */
    timeline: timeline, to: to, from: from, fromTo: fromTo, set: set,
    willChange: willChange,
    /* ---- 1. buttons and controls ---- */
    enter: enter, exit: exit, press: press, button3d: button3d, enable: enable,
    slideIndicator: slideIndicator,
    /* ---- 2. text and numbers ---- */
    revealLines: revealLines, countTo: countTo, swapTerm: swapTerm,
    highlight: highlight, pulse: pulse,
    /* ---- 3. shapes and diagrams ---- */
    moveTo: moveTo, scaleTo: scaleTo, rotateTo: rotateTo,
    drawPath: drawPath, undrawPath: undrawPath, fillArea: fillArea,
    splitInto: splitInto, snapTo: snapTo, guideLine: guideLine,
    plotPoint: plotPoint,
    /* ---- 4. panels, cross-fades and layout ---- */
    slideIn: slideIn, openModal: openModal, crossfade: crossfade,
    relayout: relayout, resolve: resolve,
    /* ---- 5. feedback ---- */
    correct: correct, incorrect: incorrect, showHint: showHint,
    progress: progress, scoreUpdate: scoreUpdate, complete: complete,
    loading: loading,
    /* ---- 6. scene and background ---- */
    transition: transition, setTheme: setTheme, setAccent: setAccent,
    focus: focus, unfocus: unfocus,
    /* ---- 7. interaction ---- */
    liftStart: liftStart, liftEnd: liftEnd, tapRipple: tapRipple,
    bindSlider: bindSlider,
    /* ---- 8. sound ---- */
    isMuted: isMuted, setMuted: setMuted, toggleMuted: toggleMuted,
    mayPlay: mayPlay,

    /* ---- the names the game already calls, kept pointing at the catalog's
       helpers so every existing call site keeps working ---- */
    pressFeedback: press,
    correctPulse: correct,
    wrongShake: incorrect,
    revealSequence: revealLines,
    flip: relayout,
    EASE_IN: IN, EASE_OUT: OUT, STAGGER: STAGGER_STEP
  });
})(window);
