/* Area of Quadrilaterals.
 *
 * Opening, once:
 *   0. Swiftee jumps up into the middle of the landscape, greets the learner
 *      from a speech bubble ("Hey there", then "Let's do a quick warm-up!"),
 *      and jumps away off the bottom of the screen; the board fades in, and
 *      Swiftee jumps up from behind it to its place beside the heading
 *   0b. each shape draws its own outline, then the colour pours in, and the
 *      heading types "Here are a few common shapes."
 *
 * Then every round runs the same beats:
 *   1. that round's slots fade up
 *   2. that round's chips fade up
 *   3. the prompt types itself out in step with the voice-over -- Swiftee
 *      talking along with it -- while a half-transparent chip demonstrates
 *      the drag; the screen is dead to input the whole time
 *   4. the voice-over ends, the prompt stays put, play begins; a right drop
 *      is answered with "That's Correct", a wrong one with the buzzer and a
 *      shake only
 *   5. all three docked -> "Well Done!", confetti from the sky, then the next
 *      round
 *
 * Round 2 also coaches: one wrong drop labels the sides of every shape, a
 * second wrong drop concedes and flies the formulas into place itself.
 *
 *   Round 1  name the shape     Rectangle / Square / Triangle
 *   Round 2  area of the shape  Length x Breadth / (Side)^2 / 1/2 x Base x Height
 *
 * Section 2, the triangle lesson, once a Next button in the footer is pressed:
 *   1. Swiftee jumps back behind the board and the warm-up fades off it
 *   2. one triangle draws itself in the middle of the empty board
 *   3. Swiftee jumps back up: "A triangle can be of different types."
 *   4. the triangle slides left; a right-angled and an obtuse one join it
 *   5. "Let's observe their base and height." -- dotted base and height lines
 *      grow onto all three
 *   6. the area formula types itself out under them; as "Base" and then
 *      "Height" land, the matching lines on every triangle light up
 *   7. Next
 *
 * Section 3, the quadrilateral, once that Next is pressed:
 *   1. Swiftee jumps back behind the board and the lesson fades off it
 *   2. one quadrilateral draws itself in the middle of the empty board and
 *      glides to the left half of it
 *   3. three names fade up on the right half, one to tap; then Swiftee
 *      comes up from behind the board above them and asks "What shape is
 *      this?" from its box (user, 2026-09-25: the options first, then the
 *      question). Each choice is answered in the same box, with how many
 *      sides that shape has
 *   4. the quiz goes, the shape comes back to the middle, and Swiftee is up
 *      again beside it: "This is a general quadrilateral." / "Let's try and
 *      find its area!"
 *   5. Swiftee goes back behind the board -- removed after "Let's try and
 *      find its area!", not before it (user, 2026-09-25); two dots appear
 *      on the corners, and Swiftee comes up at the heading with "Join the
 *      corners to draw a diagonal.", which types while a finger traces the
 *      diagonal, left to right
 *   6. the learner draws it: the halves shade in two colours -- "Now, the
 *      quadrilateral is divided into two triangles. Let's look at each
 *      triangle." -- and the shape slides left
 *   7. one triangle at a time, in conversation (review, 2026-09-25): the
 *      half comes forward and the other steps back; "Let's say the base of
 *      this triangle is b." lights the diagonal and names it; "And its
 *      height is h₁." drops the height and names it; "So, its area will be
 *      …" writes the line beside the shape, "½ ×" typed and then the b and
 *      the h₁ floated off the drawing's own labels into their places.
 *      Next; then the same for the other triangle; Next
 *   8. the two together: the third line is the sum of the two, worked where
 *      it stands to ½ × b × (h₁ + h₂); then a copy of it peels off onto the
 *      row below and is put into words -- b becomes "Diagonal", the bracket
 *      "Sum of perpendicular heights" -- and "So this is the area of the
 *      quadrilateral!"; Next
 *   9. the same shape again, cut top to bottom: the learner draws that
 *      diagonal, the halves shade and their base and heights are named,
 *      and then -- no triangle lines this time (review, 2026-09-25) -- the
 *      rule in words is typed out, a copy of it peels off onto the row
 *      below, and in the copy "(Diagonal)" and then "(Sum of perpendicular
 *      heights)" each dissolve into a drop-down; the learner fills them in
 *      symbols -- the diagonal from b / h₁ / h₂, the sum of the heights
 *      from h₁ + h₂ / b + h₁ / b + h₂; then the celebration and Next
 *
 * Section 4: a different quadrilateral, with measurements. Its diagonal and
 * heights draw themselves; the learner picks each triangle's base and height
 * from the measurements, and the working (½ × 10 × 6 = 30 sq. cm ...) types
 * itself out, then the two are added.
 *
 * Section 5: the learner's own go. A third quadrilateral, already cut and
 * measured: the sum of the heights and the diagonal from drop-downs, then the
 * area itself.
 *
 * Between: the board goes, and Swiftee says from its speech bubble that the
 * special quadrilaterals are next.
 *
 * Section 6, the parallelogram (the first special quadrilateral):
 *   1. the board comes back and a parallelogram draws itself on it
 *   2. Swiftee jumps up to the heading: "What shape is this?" over two
 *      chips, Parallelogram and Trapezium; the wrong one steps back
 *   3. the top and bottom sides light up and are carried on past their
 *      corners -- they never meet -- and take arrow marks; the left and
 *      right do the same; Swiftee hops down beside the fact list:
 *      "Opposite sides are parallel to each other."
 *   4. a glowing copy of the top side travels down to lie exactly over the
 *      bottom, tick marks land on both; the left side onto the right;
 *      "Opposite sides are equal in length."
 *   5. Next -- the marks clear; the base is drawn under the shape and the
 *      height dropped onto it; the diagonal cuts it into two triangles and
 *      the shape moves aside for the working: ½ × b × h twice is b × h
 *   6. Next -- the shape is put back together: "Which of these is the area
 *      of the parallelogram?" over three formula chips
 *   7. Next -- the learner's own go: the labels become 8 cm and 5 cm, and
 *      the base, the height and then the area are picked from drop-downs
 *   8. Next -- the board goes and Swiftee says from its bubble that a
 *      special parallelogram is next
 *
 * Section 7, the rhombus (the special parallelogram):
 *   1. the board comes back and a second parallelogram, in a colour of its
 *      own, draws itself on it
 *   2. its two diagonals draw corner to corner; the obtuse angle at their
 *      crossing takes an arc, then the other three do, and each is labelled
 *      with its size
 *   3. Swiftee jumps up to the heading: "Drag the points to make each angle
 *      90 degrees." The top and right sides light up with a point on each;
 *      one slides the top side up and down its slant, the other the right
 *      side left and right, and the shape, its diagonals and the four angles
 *      follow every frame. The moment the sides come out equal the four arcs
 *      morph together into little squares and go gold
 *   4. the showcase: a glow runs right round the shape and leaves a tick on
 *      each side ("All four sides are equal in length!"), the squares swell
 *      ("And the diagonals meet at a right angle (90°)."), and the heading
 *      names it: a parallelogram with these properties is called a rhombus
 *   5. Swiftee hops down beside the shape: "This is the special
 *      parallelogram called Rhombus." -- and Next
 *   6. Next -- the same rhombus tilts until its long diagonal lies flat; d1
 *      draws along it -- d1 alone: d2 only appears at the end, when the two
 *      heights join up into it -- and Swiftee jumps up to the heading:
 *      "Here, is a Rhombus."
 *      (the quiz that came next -- which of two formulas is each half's
 *      area -- was cut, user 2026-09-29: this page is worked the way page 4
 *      works the quadrilateral)
 *   7. the upper half shades purple and the lower orange,
 *      and the shape moves left. A triangle at a time, a Next after each:
 *      "Area of Triangle 1 = 1/2 x base x height" is written in words; the
 *      upper half comes forward with its border drawn heavy; d1's name
 *      floats off the drawing onto "base" and becomes it, and its height
 *      drops from the crossing and h1 floats onto "height". Then the lower
 *      half, Triangle 2, with h2
 *   8. the third line, the rhombus as the two together, is taken the rest
 *      of the way where it stands, a step at a time, only the words that
 *      change crossing over: the triangles' names become
 *      1/2 x d1 x h1 + 1/2 x d1 x h2, that becomes 1/2 x d1 x (h1 + h2), and
 *      then -- a ring holding the two heights together while they give way
 *      to the short diagonal drawn solid -- 1/2 x d1 x d2. A copy of its
 *      right-hand side peels off onto a fourth row and is put into words,
 *      "= 1/2 x Product of Diagonals"; the celebration, then Swiftee leaves
 *      the heading, the shape and the working come forward a little into
 *      the room it leaves, and Next
 *   9. the numbers: the shape comes back to the middle, plain, with both
 *      diagonals; "Drag the two lengths into the formula." -- the
 *      diagonals are measured (16 cm and 12 cm) and four lengths appear
 *      under "Area = ½ × [ ] × [ ]"; the two right ones dock, the answer is
 *      said, and Next
 *  10. practice, a Next between each: "Choose the correct area." of the
 *      same rhombus; a rhombus of 240 sq. cm with one diagonal 30 cm --
 *      "Find the other diagonal."; one rhombus 24 cm by 15 cm, which draws
 *      itself on an empty board and takes its diagonals and its lengths
 *      before the board halves and Swiftee asks "What is the area of the
 *      rhombus?" from a panel beside it -- four answers under the formula,
 *      and the right one lights both diagonals and solves the working out;
 *      and a slanted shape with a base and a height -- "Which formula can
 *      you use here?"
 *  11. Next -- the board goes and Swiftee says from its bubble that the
 *      area of a rhombus is known, and another special quadrilateral is next
 *
 * Section 8, the trapezium, in two levels:
 *   1. the board comes back and a trapezium draws itself on it; "This is a
 *      [ v ]" with a drop-down (Kite / Parallelogram / Trapezium) appears
 *      under it, and Swiftee jumps in beside the sentence: "Tap here!" Each
 *      choice is answered in a banner under the sentence, and the shape
 *      takes its "parallel" marks so the answer can be checked against it
 *   2. Next -- the sentence goes and Swiftee ducks behind the board; the
 *      shape fades and six cards take its place, three of them trapeziums.
 *      Swiftee jumps up to the heading -- "Select all the trapeziums." --
 *      and ducks back, taking the line with it. Each tap is answered at
 *      once: a trapezium locks green with confetti, anything else shakes
 *      red and steps back for good
 *   3. Next -- the three other cards leave, the trapeziums line up in one
 *      row and each takes a slot under it; the three names appear below,
 *      and Swiftee jumps up: "Drag each block to the matching shape." --
 *      the warm-up's line and voice-over. Each name is dragged onto its
 *      shape, and Next
 *
 * Section 9, the area of a trapezium -- one unbroken piece, Swiftee
 * narrating every beat, played three times: for the right-angled trapezium
 * (two copies make a rectangle), then the scalene and the isosceles (two
 * copies make a parallelogram):
 *   1. the cards (or the last trapezium) go and a trapezium draws itself in
 *      the middle of the board; it slides to the left and its sides are
 *      named: a on top, b below, h up the left
 *   2. a copy of it lifts off and turns half a circle about the middle of
 *      its slanted side -- a finger pushes it round a curved arrow -- and
 *      lands beside it: the two make the whole. The copy's sides are
 *      named, the equal sides are shown equal (b and b, then a and a), and
 *      the two names along each side of the rectangle merge into a + b
 *   3. Swiftee hops down beside the working: (a + b) x h is the whole;
 *      the copy fades to a dashed outline and the trapezium is half of it,
 *      half of (a + b) x h; the copy goes, the trapezium comes back to the
 *      middle, and the rule is boxed. Confetti, Next
 *   4. practice, a Next between each: a measured trapezium draws itself
 *      and its a, b and h are found from drop-downs and dropped into
 *      A = 1/2 (a + b) x h, then the working step by step; a
 *      second trapezium's sum of parallel sides and height from drop-downs,
 *      then its area from chips; and two trapeziums to compare -- "Tap the
 *      trapezium which has the largest area." -- the working under each
 */

(function () {
  'use strict';

  /* ---------- the language ----------
   * Every word the learner reads comes from locales-quadrilaterals.json
   * through I18n (i18n.js), chosen by ?lan=xx on the URL. T() is the one
   * lookup and the keys are the file's; index.html loads this script only
   * once the locale is in, so T() is good from the first line here. The
   * voice-over stays keyed by the ENGLISH line (VO_FILE): I18n.source()
   * takes a translated line back to it, see voKey. */
  const T = (key, repl) => I18n.t(key, repl);
  /* a measurement with its unit, in the language's own unit word */
  const CM   = n => n + ' ' + T('unitCm');
  const SQCM = n => n + ' ' + T('unitSqCm');
  /* A line with holes -- "Area of {name}" -- as the segments the working is
     typed from: the words round the hole follow the language's word order
     (Hindi puts the name first), and the filling keeps its highlight class.
     `nb` sets the words' own spaces as no-break spaces, so a long line
     wraps at an operator rather than inside "Area of". */
  function segsOf(tpl, fills, nb) {
    const sp = s => nb ? s.replace(/ (?=\S)/g, '\u00a0') : s;
    const segs = [];
    String(tpl).split(/(\{\w+\})/).forEach(part => {
      if (!part) return;
      const m = /^\{(\w+)\}$/.exec(part);
      if (m && fills && fills[m[1]] != null) {
        const f = fills[m[1]];
        segs.push(typeof f === 'string' ? { t: f } : Object.assign({}, f));
      } else {
        segs.push({ t: sp(part) });
      }
    });
    return segs;
  }
  /* the segments of a keyed line; the whole line is looked up once as well,
     so the voice-over knows the sentence the segments make */
  function TS(key, fills, nb) {
    const flat = {};
    Object.keys(fills || {}).forEach(k => { flat[k] = typeof fills[k] === 'string' ? fills[k] : fills[k].t; });
    T(key, flat);
    return segsOf(T(key), fills, nb);
  }
  /* "Area of <name>", the name carrying its highlight class; and the same
     after an "=" or a "+", for the sum lines -- set in no-break spaces
     where the line asks for them (`nb`), so the long sum wraps before an
     operator rather than leaving one dangling */
  const AREA_OF      = (name, w, nb) => TS('areaOf', { name: w ? { t: name, w: w } : name }, nb);
  const EQ_AREA_OF   = (name, w, nb) => [{ t: nb ? ' =\u00a0' : ' = ' }].concat(AREA_OF(name, w, nb));
  const PLUS_AREA_OF = (name, w, nb) => [{ t: nb ? ' +\u00a0' : ' + ' }].concat(AREA_OF(name, w, nb));

  /* Every beat of the game is paced through here, which is what makes Skip
     possible: while a skip is running each wait collapses to a single turn of
     the event loop, so a scene plays its whole choreography out in a handful
     of frames and lands in exactly the state it would have reached anyway. */
  let fastForward = false;

  /* Replay has to genuinely stop the scene in play -- a fast-forward will not
     do, because the abandoned chain would carry on writing to the board
     underneath the fresh one. So every wait belongs to the scene that started
     it, and rejects with CANCELLED once that scene has been retired, which
     unwinds the whole await chain of the scene being replaced. */
  const CANCELLED = { cancelled: 'scene replaced' };
  let runToken = 0;

  /* ---------- the pace ----------
   * One dial for how fast the screen changes (user, 2026-09-25: "a little
   * too fast"). Every scene beat (wait), every Web Animation, every GSAP
   * tween and every CSS transition or keyframe animation is stretched by it,
   * together, so the choreography keeps its shape and simply breathes more.
   * The voice-over is the one clock it does not touch: a line typed against
   * its clip still lands with the narrator (see typePieces, waitRaw). */
  const PACE = 1.25;

  const waitFor = scale => ms => new Promise(function (resolve, reject) {
    const mine = runToken;
    setTimeout(function () {
      if (mine !== runToken) return reject(CANCELLED);
      resolve();
    }, fastForward ? 0 : ms * scale);
  });
  const wait    = waitFor(PACE);
  const waitRaw = waitFor(1);         /* a wait measured against the voice */

  /* the element's own animate(), and the stylesheet's, at the same pace */
  if (PACE !== 1) {
    const nativeAnimate = Element.prototype.animate;
    Element.prototype.animate = function (keyframes, opts) {
      if (typeof opts === 'number') opts = opts * PACE;
      else if (opts && typeof opts === 'object') {
        opts = Object.assign({}, opts);
        ['duration', 'delay', 'endDelay'].forEach(k => {
          if (typeof opts[k] === 'number') opts[k] *= PACE;
        });
      }
      return nativeAnimate.call(this, keyframes, opts);
    };
    const paceCss = function (e) {
      const el = e.target;
      if (!el || !el.getAnimations) return;
      el.getAnimations().forEach(function (a) {
        if (a.playbackRate !== 1 || !(a.transitionProperty || a.animationName)) return;
        a.playbackRate = 1 / PACE;
      });
    };
    document.addEventListener('transitionrun', paceCss, true);
    document.addEventListener('animationstart', paceCss, true);
    if (window.gsap) gsap.globalTimeline.timeScale(1 / PACE);
  }

  /* A retired scene unwinds through whatever await chain it was in, and some
     of those chains are deliberately awaited by nobody -- a feedback line
     typing itself out, a round finishing on a timer. Their rejection has
     nowhere to go, so it is swallowed here rather than at a dozen call sites.
     Anything that is not a cancellation is left to surface as usual. */
  window.addEventListener('unhandledrejection', function (e) {
    if (e.reason === CANCELLED) e.preventDefault();
  });
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- the motion system ----------
   * js/motion.js holds every duration and easing the game uses, and every
   * animation it makes is tracked so the two things that interrupt a scene
   * can reach it. Handing it the two flags above is the whole of the join:
   *   token   a replay bumps it, and Motion.retire() kills what belonged to
   *           the scene that has just been retired
   *   fast    a skip raises it, and every duration asked of motion.js from
   *           then on collapses to nothing, exactly as wait() does
   * Both are read live, not copied, so motion.js always sees the truth. */
  Motion.bind({
    token: function () { return runToken; },
    fast:  function () { return fastForward; }
  });

  /* ---------- press feedback, on every button in the game ----------
   * Most of the buttons the learner touches are not in index.html at all --
   * the chips of a round, the cards of a match, the options of a drop-down
   * are all built by script.js as the scene that needs them comes up, and a
   * replay builds them again. Binding each one as it is made would mean
   * remembering to, at a dozen build sites, forever. So the press is caught
   * once, here, on the way up the tree.
   *   pointerdown, not click: the give has to happen under the finger, at the
   * moment of contact, not after the browser has decided it was a tap. It
   * never blocks -- whatever the button does runs alongside it -- and a
   * button that is disabled is not pressable, so it gives nothing back. */
  document.addEventListener('pointerdown', function (e) {
    if (e.button !== undefined && e.button !== 0) return;
    const btn = e.target.closest && e.target.closest('button');
    if (!btn || btn.disabled) return;
    /* A 3D button brings its own give -- it sinks onto its wall -- and the two
       must not both run: this one scales, which means GSAP takes the element's
       transform over, and taking transform over clears `translate`, which is
       the very property the sink rides on. One give per button. */
    if (btn.classList.contains('is-3d')) return;
    Motion.press(btn);
  }, { passive: true });

  /* ---------- the two answers ----------
   * A judged answer has always been marked by a class, and the class still
   * carries the colour -- green border, red tint -- because that is a state
   * the element stays in, not a movement. What the class no longer carries is
   * the movement: a pulse and a shake are the same length and the same curve
   * wherever in the mission they happen, they honour a skip and they honour
   * reduced motion, and all three of those come from motion.js rather than
   * from a keyframe rule repeated in six places.
   *   `part` is the piece that actually moves when the class goes on
   * something larger than the thing the eye follows: a card's box, a figure's
   * art, a drop-down's button. */
  const markRight = (el, part) => { el.classList.add('correct'); Motion.correct(part || el); };
  const markWrong = (el, part) => { el.classList.add('reject');  Motion.incorrect(part || el); };

  /* A motion.js timeline, waited on the way every other beat of the game is
     waited on. Not `await tl` directly: a timeline killed by a replay never
     reaches its end, so its promise never settles and the frame awaiting it
     would sit there for the rest of the session instead of unwinding. The
     scene's own wait() is stamped with the scene's token, so a replay throws
     CANCELLED through it like any other wait, and a skip collapses it -- by
     which time the timeline was built at no length anyway. */
  const played = tl => wait(tl ? tl.totalDuration() * 1000 : 0);

  /* How a card, a chip or a slot arrives, from the catalog: it fades up,
     rises the last twelve pixels and grows the last two per cent. Named once
     here so every group in the game arrives the same way. */
  const CARD_IN = {
    from: { opacity: 0, y: 12, scale: .98 },
    duration: Motion.NORMAL,
    stagger: Motion.STAGGER_UI
  };

  /* The same arrival, taken slowly, for the slots and chips of a word round:
     each one lands on a beat of its own, so the learner sees the places to
     fill come up one by one before the names that fill them. CARD_IN's
     stagger is so short the whole group reads as one flash. */
  const ROUND_IN = {
    from: CARD_IN.from,
    duration: 0.5,
    stagger: 0.32
  };
  /* the breath between the last slot settling and the first chip rising */
  const SLOTS_TO_CHIPS = 550;

  /* A group arriving in reading order: the state class goes on at once (it is
     what makes them visible and touchable), and motion.js walks them in.
     `revealing` stands the stylesheet's own transition of the same two
     properties down for the length of it -- two animations of one opacity,
     fighting frame by frame, is how a reveal ends up looking soft. */
  async function revealGroup(els, opts) {
    if (!els.length) return;
    els.forEach(el => el.classList.add('revealing', 'reveal'));
    await played(Motion.enter(els, opts));
    els.forEach(el => el.classList.remove('revealing'));
  }

  /* ---------- the copy a drag carries ----------
   * Three parts of the mission are drag-and-drop -- the words, the lengths,
   * the measurements -- and all three carry a copy of the chip under the
   * finger. They share this.
   *   The copy is placed once, at the chip's own box, and moved from then on
   * with a transform. It used to be moved by writing left and top, which put
   * a layout and a paint of the whole board into every single pointermove:
   * the one loop in the game with a finger to keep up with, and the one that
   * cannot afford the work. A transform is composited, and costs neither.
   *   Nothing is eased while the finger is down -- a drag that lags its own
   * finger feels broken, not smooth. Only the release is animated. */
  const GHOST_LIFT = 1.03;                  /* the catalog's lift: felt, not shown */
  const ghostTransform = (dx, dy) =>
    'translate3d(' + dx + 'px, ' + dy + 'px, 0) scale(' + GHOST_LIFT + ')';

  /* A clone inherits whatever Motion.button3d() last wrote on the chip, and
     those inline values outrank the .ghost rule that zeroes them. So every
     copy that goes into the air is flattened: nothing off the page stands on
     a wall, and nothing in the hand is still half pressed. */
  function flattenGhost(ghost) {
    ghost.classList.remove('is-3d');
    ghost.style.removeProperty('--edge');
    ghost.style.removeProperty('--sink');
    return ghost;
  }

  /* the copy, and the numbers the move and the release both need */
  function liftGhost(chip, e, z) {
    const rect = chip.getBoundingClientRect();
    const ghost = flattenGhost(chip.cloneNode(true));
    ghost.classList.add('ghost');
    ghost.disabled = true;
    Object.assign(ghost.style, {
      position: 'fixed',
      left: rect.left + 'px',
      top: rect.top + 'px',
      width: rect.width + 'px',
      height: rect.height + 'px',
      margin: 0,
      pointerEvents: 'none',
      zIndex: z || 999,
      transform: ghostTransform(0, 0),
      willChange: 'transform'                /* for the length of the drag only */
    });
    /* In the hand from the first frame it exists. The scale is baked into the
       transform the drag rewrites every pointermove rather than tweened, or
       the tween and the drag would be writing the same property at once; the
       class carries the deeper shadow that says it is off the board. */
    ghost.classList.add('mo-lifted');
    document.body.appendChild(ghost);
    return {
      el: chip, ghost: ghost, box: rect,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      start: { x: e.clientX, y: e.clientY }
    };
  }

  const moveGhost = (d, x, y) => {
    d.ghost.style.transform = ghostTransform(x - d.offsetX - d.box.left,
                                             y - d.offsetY - d.box.top);
  };

  /* The release, and the only eased part of a drag: the copy springs the last
     stretch to wherever it is going -- the slot it was dropped on, or back to
     the chip it came from -- and is only taken away once it has landed, so
     the real chip never appears underneath one still in the air.
       A replay in the middle of that half second sweeps the copy with the
     rest of the stage (clearStage drops loose ghosts), and `done` is run
     regardless, so a drag is never left half finished. */
  function dropGhost(d, slot, done) {
    const g = d.ghost;
    const to = slot ? slot.getBoundingClientRect() : null;
    const dx = to ? to.left + (to.width  - d.box.width)  / 2 - d.box.left : 0;
    const dy = to ? to.top  + (to.height - d.box.height) / 2 - d.box.top  : 0;
    let landed = false;
    const land = () => {
      if (landed) return;
      landed = true;
      g.style.willChange = '';
      g.remove();
      if (done) done();
    };
    /* Caught by a slot, or handed back to where it came from. The two are
       deliberately different: SNAP is something taking it, OUT is it going
       back of its own accord. */
    const tl = Motion.liftEnd(g, slot ? { x: dx, y: dy } : null);
    if (tl) tl.eventCallback('onComplete', land); else land();
    /* a scene torn down mid-flight: the tween is killed and never completes,
       so the landing is taken at the teardown's own pace instead */
    return land;
  }

  /* ---------- the half ----------
   * Every "½" in the lesson is drawn as a stacked fraction, a 1 over a bar
   * over a 2, the way it is written on paper. Text that may carry one goes
   * through setTxt(), which falls back to plain text when there is none. */
  const FRAC_HALF = '<span class="frac"><span class="num">1</span><span class="den">2</span></span>';
  const escHTML = str => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fracHTML = str => escHTML(str).split('½').join(FRAC_HALF);
  function setTxt(el, text) {
    if (text.indexOf('½') < 0) el.textContent = text;
    else el.innerHTML = fracHTML(text);
  }

  /* ---------- word by word ----------
   * The typewriters land a word at a time rather than a letter: these are
   * the places a text is cut, after each word together with the spaces that
   * follow it. Pacing stays per character, so a long word takes longer. */
  function wordCuts(text) {
    const cuts = [];
    const re = /\S+\s*/g;
    let m;
    while ((m = re.exec(text)) !== null) cuts.push(m.index + m[0].length);
    if (!cuts.length || cuts[cuts.length - 1] !== text.length) cuts.push(text.length);
    return cuts;
  }

  /* ---------- the words ease in ----------
   * A line is laid out whole, every word in a span of its own, and the words
   * are then shown one after another, each easing in where it already sits,
   * so nothing reflows as the line arrives. Pacing is per character, as the
   * typewriter's was: a long word holds the line a little longer. */
  const WORD_IN_MS = 200;      /* the tail of a line: its last word finishing */
  /* A line laid out whole from its segments: a span per segment (classed
     for its highlight) holding a span per word. A line with more than one
     "=" is set as a small table -- what comes before the first "=" in a
     left column, and every "= ..." step on a row of its own in the right --
     so the equals signs stand under each other and no row carries two.
     Returns, per segment, its spans (to light) and its words (to reveal,
     each with its cut into the segment's text for the pacing). */
  function lineSpans(root, segs) {
    root.textContent = '';
    root.classList.remove('eqgrid');
    const tokens = [];
    segs.forEach((seg, i) => {
      let from = 0;
      wordCuts(seg.t).forEach(cut => { tokens.push({ i: i, text: seg.t.slice(from, cut), cut: cut }); from = cut; });
    });
    const isEq = tok => tok.text.trim() === '=';
    const eqCount = tokens.filter(isEq).length;
    const split = eqCount > 1;
    const parts = segs.map(seg => ({ seg: seg, els: [], words: [] }));
    let holder = root, segEl = null, segAt = -1;
    const place = (tok, text) => {
      if (tok.i !== segAt || !segEl || segEl.parentNode !== holder) {
        segEl = document.createElement('span');
        if (segs[tok.i].w) segEl.className = 'w w-' + segs[tok.i].w;
        holder.appendChild(segEl);
        parts[tok.i].els.push(segEl);
        segAt = tok.i;
      }
      const sp = document.createElement('span');
      sp.className = 'wd';
      sp.dataset.t = text;
      setTxt(sp, text);
      segEl.appendChild(sp);
      parts[tok.i].words.push({ el: sp, cut: tok.cut });
    };
    const cell = cls => { const el = document.createElement('span'); el.className = cls; root.appendChild(el); return el; };
    if (!split) {
      /* one "=": what comes before it and the "= ..." after it are wrapped
         apart, inline, so a line too long for its column can break before
         the "=" (fitEq) instead of at a word */
      if (eqCount === 1) holder = cell('lhs');
      tokens.forEach(tok => {
        if (eqCount === 1 && isEq(tok)) holder = cell('rhs');
        place(tok, tok.text);
      });
      return parts;
    }
    root.classList.add('eqgrid');
    holder = cell('lhs');
    tokens.forEach(tok => {
      if (isEq(tok)) { holder = cell('rhs'); place(tok, tok.text.replace(/^\s+/, '')); }
      else place(tok, tok.text);
    });
    return parts;
  }
  /* a plain text is a line of one segment */
  const wordSpans = (el, text) => lineSpans(el, [{ t: text }])[0].words;
  /* show the words from `due`, each when its first character would have
     been typed; `alive` may say the line has been taken over. Resolves to
     the time the line is complete. */
  async function revealWords(words, due, perChar, alive, voiced) {
    /* at the game's pace -- unless the pace is the narrator's (`voiced`) */
    if (!voiced) perChar *= PACE;
    let from = 0;
    for (const w of words) {
      if (alive && !alive()) return due;
      const left = due + from * perChar - performance.now();
      if (left > 0) await waitRaw(left);
      w.el.classList.add('in');
      from = w.cut;
    }
    return due + from * perChar;
  }
  const wordsSettle = () => wait(REDUCED ? 0 : WORD_IN_MS);

  /* ---------- a sentence at a time ----------
   * A line is never shown whole: it is cut after every "," "!" "." (and
   * "?") that has more words after it, and the pieces are shown one after
   * another in the same box, each replacing the last (user, 2026-09-25).
   * The clip is still the whole line, said once: a piece gives way to the
   * next only when the narrator has reached the end of it.
   * "sq. cm" and the like are abbreviations, not the end of anything. */
  /* the boxes Swiftee speaks from, and the bird on its way out of one --
     filled in by speaker() further down (see "the line said, the speaker
     goes"), declared up here so every box can register as it is built */
  const SPEAKERS = new Map();
  let dismissing = null;
  let headKeepUntil = 0;   /* the heading's row stays open until then */

  const CHUNK_ABBR = /(?:^|[\s(])(?:sq|e\.g|i\.e|etc|vs|approx|चौ|ચો|సెం\.మీ|చ\.సెం\.మీ|ସେ\.ମି)\.$/i;
  const CHUNK_READ_MS = 700;   /* the beat on a piece when there is no voice */
  function chunkCuts(text) {
    const cuts = [];
    const re = /[,!.?।]+['’"”)]*\s+(?=\S)/g;
    let m;
    while ((m = re.exec(text)) !== null) {
      const mark = text.slice(0, m.index + 1);
      if (m[0][0] === '.' && CHUNK_ABBR.test(mark)) continue;
      /* a lone opener -- "So," "Now," -- is not a piece of its own: it
         stays with the sentence it opens (user, 2026-09-28) */
      const from = cuts.length ? cuts[cuts.length - 1] : 0;
      if (m[0][0] === ',' && !/\s/.test(text.slice(from, m.index).trim())) continue;
      cuts.push(m.index + m[0].length);
    }
    return cuts;
  }
  /* the line's segments, regrouped into its pieces: each piece is a list of
     segments (a highlight cut in two keeps its hue on both sides), and
     carries how many characters of the whole line it stands for */
  function segChunks(segs) {
    const whole = segs.map(sg => sg.t).join('');
    const cuts = chunkCuts(whole).concat(whole.length);
    const chunks = [];
    let piece = [], at = 0, c = 0;
    segs.forEach(seg => {
      let from = 0;
      while (c < cuts.length && cuts[c] <= at + seg.t.length) {
        const to = cuts[c] - at;
        if (to > from) piece.push({ t: seg.t.slice(from, to), w: seg.w });
        from = to;
        if (cuts[c] < whole.length) { chunks.push(piece); piece = []; }
        c++;
        if (to >= seg.t.length) break;
      }
      if (from < seg.t.length) piece.push({ t: seg.t.slice(from), w: seg.w });
      at += seg.t.length;
    });
    if (piece.length) chunks.push(piece);
    return chunks
      .map(ch => {
        const len = ch.reduce((n, sg) => n + sg.t.length, 0);
        /* the spaces after a mark belong to the gap between two pieces,
           not to the end of the one on screen */
        const out = ch.map(sg => ({ t: sg.t, w: sg.w }));
        if (out.length) {
          out[0].t = out[0].t.replace(/^\s+/, '');
          out[out.length - 1].t = out[out.length - 1].t.replace(/\s+$/, '');
          /* each piece stands alone in its box, so it opens with a capital
             (user, 2026-09-25) -- a word, not a lone letter like side a */
        }
        const segs = out.filter(sg => sg.t);
        if (segs.length) segs[0].t = segs[0].t.replace(/^[a-z](?=[a-z’'])/, c => c.toUpperCase());
        return { segs: segs, len: len };
      })
      .filter(ch => ch.segs.length);
  }
  const sentenceChunks = text => segChunks([{ t: text }]).map(ch => ch.segs[0].t);
  /* the longest piece: what a box that holds one line at a time is sized to */
  const longestChunk = text => sentenceChunks(String(text))
    .reduce((a, b) => (b.length > a.length ? b : a), '');

  /* Wait for the narrator to reach `frac` of the way through the line. With
     nothing playing, the piece on screen is simply given time to be read. */
  function voiceAt(said, frac, readMs, cueAt) {
    const a = said && said.audio;
    if (!said || !said.playing || !a) return wait(readMs == null ? CHUNK_READ_MS : readMs);
    /* a clip with cues says exactly where its pieces begin (VO_CUES); one
       without is paced by the letters, `frac` of the way through */
    const at = (cueAt != null ? cueAt : said.length * frac) - 0.08;
    if (a.ended || a.paused || a.currentTime >= at) return Promise.resolve();
    return waitOrSkip(function (done) {
      let over = false;
      const end = function () {
        if (over) return;
        over = true;
        clearInterval(iv);
        clearTimeout(cap);
        a.removeEventListener('ended', end);
        a.removeEventListener('pause', end);
        done();
      };
      const iv = setInterval(function () {
        if (over || fastForward || a.ended || a.paused || a.currentTime >= at) end();
      }, 40);
      const cap = setTimeout(end, 15000);   /* never hang on a stalled clip */
      a.addEventListener('ended', end);
      a.addEventListener('pause', end);
    });
  }

  /* Type a line into a box a piece at a time. `said` is what voSay() gave
     back for the whole line; each piece is paced so its last word lands a
     little before the narrator finishes saying it, and is then held until
     they have. `pause` and `onWord` are the formula typewriter's: a beat and
     a callback each time a highlighted word completes. `alive` may say the
     box has been taken over by a newer line. Resolves false if it was. */
  async function typePieces(txt, segs, said, perChar, pause, onWord, alive) {
    const chunks = segChunks(segs);
    const total = Math.max(1, chunks.reduce((n, ch) => n + ch.len, 0));
    const a = said.playing && said.length > 0.5 ? said.audio : null;
    const cues = voCuesFor(said, chunks.length);
    let done = 0;
    for (let k = 0; k < chunks.length; k++) {
      const ch = chunks[k];
      if (k > 0) {
        await voiceAt(said, done / total, null, cues ? cues[k] : null);
        if (alive && !alive()) return false;
      }
      const chars = Math.max(1, ch.segs.reduce((n, sg) => n + sg.t.length, 0));
      const keys = ch.segs.filter(sg => sg.w).length;
      /* silent, the line keeps the game's pace (PACE); voiced, the
         narrator's position is the clock, not one of our own, so a piece
         started late still finishes with the voice */
      let pace = perChar * PACE, hold = pause * PACE;
      if (a && !a.paused && !a.ended) {
        /* with cues, the piece is typed to land at 82% of its own span */
        const target = cues
          ? cues[k] + ((k + 1 < chunks.length ? cues[k + 1] : said.length) - cues[k]) * 0.82
          : said.length * (done + ch.len * 0.82) / total;
        hold = pause;
        pace = Math.max(6, ((target - a.currentTime) * 1000 - pause * keys) / chars);
      }
      const parts = lineSpans(txt, ch.segs);
      let due = performance.now();
      for (const part of parts) {
        due = await revealWords(part.words, due, pace, alive, true);
        if (alive && !alive()) return false;
        if (part.seg.w) {
          const left = due - performance.now();
          if (left > 0) await waitRaw(left);
          part.els.forEach(el => el.classList.add('lit'));
          if (onWord) onWord(part.seg.w);
          due += hold;
        }
      }
      const left = due - performance.now();
      if (left > 0) await waitRaw(left);
      done += ch.len;
    }
    await wordsSettle();
    return !alive || alive();
  }

  /* The same for a box whose words are laid in all at once rather than
     typed -- a verdict, a nudge: each piece appears whole, and gives way to
     the next as the voice reaches it. The voice is voAlone's, so it may
     start a moment after the first piece does; `started` resolves with its
     state once it has. */
  const piecesGen = new WeakMap();
  async function showPieces(el, text, started, onPiece) {
    const g = (piecesGen.get(el) || 0) + 1;
    piecesGen.set(el, g);
    const live = () => piecesGen.get(el) === g;
    const chunks = segChunks([{ t: text }]);
    const total = Math.max(1, chunks.reduce((n, ch) => n + ch.len, 0));
    let said = null, cues = null, done = 0;
    for (let k = 0; k < chunks.length; k++) {
      if (k > 0) {
        if (!said) { said = await started; cues = voCuesFor(said, chunks.length); }
        if (!live()) return;
        await voiceAt(said, done / total, Math.max(CHUNK_READ_MS, chunks[k - 1].len * 55),
                      cues ? cues[k] : null);
        if (!live()) return;
      }
      /* a box that fits each piece is told which one is coming */
      if (onPiece) onPiece(chunks[k].segs.map(sg => sg.t).join(''));
      lineSpans(el, chunks[k].segs)[0].words.forEach(w => w.el.classList.add('in'));
      done += chunks[k].len;
    }
  }

  /* ---------- a line that solves itself ----------
   * A numerical working is one line that simplifies in place: "½ × 10 × 6"
   * becomes "5 × 6" becomes "30 sq. cm". Between steps only the words that
   * change cross-fade into their replacement while the line's width eases
   * with them, so the eye follows exactly what is being worked out. */
  const MORPH_MS = 900;             /* the .morph transitions, delay included */
  const MORPH_SLOW_MS = 1250;      /* a derivation step, taken slowly enough to follow */
  function tokensOf(text) {
    let from = 0;
    return wordCuts(text).map(cut => { const t = text.slice(from, cut); from = cut; return t; });
  }
  /* The tokens of a step. A plain string is one plain run; a step given as
     segments carries each segment's highlight into its tokens, so a word
     that names a part of the drawing keeps its colour when the line changes
     under it. */
  function stepTokens(step) {
    if (typeof step === 'string') return tokensOf(step).map(t => ({ t: t }));
    const out = [];
    step.forEach(seg => tokensOf(seg.t).forEach(t => out.push({ t: t, w: seg.w })));
    return out;
  }
  async function morphTo(el, text, whole, slow) {
    let wds = whole ? [] : Array.from(el.querySelectorAll('.wd'));
    const A = wds.map(w => (w.dataset.t || '').trim());
    const B = stepTokens(text), Bt = B.map(t => t.t.trim());
    let p = 0;
    while (p < A.length && p < Bt.length && A[p] === Bt[p]) p++;
    let q = 0;
    while (q < A.length - p && q < Bt.length - p && A[A.length - 1 - q] === Bt[Bt.length - 1 - q]) q++;
    /* `whole`: everything in the line -- drop-down boxes and all -- becomes the text */
    let oldMid = whole ? Array.from(el.children) : wds.slice(p, A.length - q);
    const newMid = whole ? B : B.slice(p, B.length - q);
    if (!oldMid.length && !newMid.length) return;
    /* The words that change must sit side by side in one parent. The spans
       they sit in -- one per segment, and a highlight is one of those -- are
       dissolved to get them there, but the two cells of a line set as
       "lhs = rhs" are left alone on the first pass: dissolving those would
       un-break a line that had broken before its "=", and the line would
       jump from two rows to one under the morph. A change that straddles
       both cells has nowhere else to go, and then they go too. */
    const isCell = w => w.classList.contains('lhs') || w.classList.contains('rhs');
    let parents = new Set(oldMid.map(w => w.parentNode));
    if (!whole && parents.size > 1) {
      const dissolve = keepCells => {
        parents.forEach(w => {
          if (w === el || (keepCells && isCell(w))) return;
          while (w.firstChild) w.parentNode.insertBefore(w.firstChild, w);
          w.remove();
        });
        wds = Array.from(el.querySelectorAll('.wd'));
        oldMid = wds.slice(p, A.length - q);
        parents = new Set(oldMid.map(w => w.parentNode));
      };
      dissolve(true);
      if (parents.size > 1) dissolve(false);
    }
    const holder = document.createElement('span');
    holder.className = 'morph' + (whole ? ' whole' : '') + (slow ? ' slow' : '');
    const at = oldMid.length ? oldMid[0] : (wds[p] || null);
    if (at) at.parentNode.insertBefore(holder, at); else el.appendChild(holder);
    const oldLayer = document.createElement('span');
    oldLayer.className = 'm-old';
    oldMid.forEach(w => oldLayer.appendChild(w));
    const newLayer = document.createElement('span');
    newLayer.className = 'm-new';
    /* a run of tokens under one highlight shares its wrapper, so the colour
       arrives as one word and not a colour per word */
    const fresh = [];
    let wrap = null;
    newMid.forEach(tok => {
      const sp = document.createElement('span');
      sp.className = 'wd in';
      sp.dataset.t = tok.t;
      setTxt(sp, tok.t);
      if (!tok.w) { wrap = null; newLayer.appendChild(sp); fresh.push(sp); return; }
      if (!wrap || wrap.dataset.w !== tok.w) {
        wrap = document.createElement('span');
        wrap.className = 'w w-' + tok.w + ' lit';
        wrap.dataset.w = tok.w;
        newLayer.appendChild(wrap);
        fresh.push(wrap);
      }
      wrap.appendChild(sp);
    });
    holder.append(oldLayer, newLayer);
    const w1 = oldLayer.getBoundingClientRect().width, w2 = newLayer.getBoundingClientRect().width;
    holder.style.width = w1 + 'px';
    void holder.offsetWidth;
    holder.classList.add('go');
    holder.style.width = w2 + 'px';
    sfx('click', .25);
    await wait(REDUCED ? 60 : (slow ? MORPH_SLOW_MS : MORPH_MS));
    fresh.forEach(sp => holder.parentNode.insertBefore(sp, holder));
    holder.remove();
  }

  /* steps[0] is laid out and eased in like any line (a string, or segments
     with highlights); every later step is a string the line becomes */
  async function solveLine(el, steps, perChar, onWord) {
    const first = steps[0];
    const parts = lineSpans(el, typeof first === 'string' ? [{ t: first }] : first);
    let due = performance.now();
    for (const part of parts) {
      due = await revealWords(part.words, due, perChar);
      if (part.seg.w) {
        const left = due - performance.now();
        if (left > 0) await wait(left);
        part.els.forEach(x => x.classList.add('lit'));
        if (onWord) onWord(part.seg.w);
        due += AREA_PAUSE;
      }
    }
    const left = due - performance.now();
    if (left > 0) await wait(left);
    for (let i = 1; i < steps.length; i++) {
      await wait(REDUCED ? 200 : 1000);
      await morphTo(el, steps[i]);
    }
    await wordsSettle();
  }

  /* ---------- pieces ---------- */
  const board       = document.getElementById('board');
  const bay         = document.getElementById('bay');
  const prompt      = document.getElementById('prompt');
  const promptGhost = document.getElementById('promptGhost');
  const promptType  = document.getElementById('promptType');
  const promptTxt   = promptType.querySelector('.txt');
  const caret       = promptType.querySelector('.caret');
  const trayArea    = document.getElementById('trayArea');
  const fx          = document.getElementById('fx');
  const inputLock   = document.getElementById('inputLock');
  const tapStart    = document.getElementById('tapStart');

  const shapes   = Array.from(document.querySelectorAll('.shape'));
  const allSlots = Array.from(document.querySelectorAll('.slot'));
  const allChips = Array.from(document.querySelectorAll('.chip'));

  /* Every chip presses like the Start button: the wall under it collapses as
     its face comes down, and it springs back to its own height on release.
     Bound once, up front -- button3d writes --edge and --sink and nothing
     else, so it can be in place long before a chip has been revealed, and it
     never touches the transform the reveal, the hover lift and the picked
     state are all already using. */
  allChips.forEach(chip => Motion.button3d(chip, { edge: 4 }));
  const trays    = { 1: document.getElementById('tray'), 2: document.getElementById('tray2') };

  /* The two warm-up briefings. Neither names a clip: the voice-over
     registry finds one by the line, as it does everywhere else. */
  const ROUNDS = {
    /* withLine: the ghost drag plays WHILE the line is said, picked up on
       "Drag" and set down on "shape", rather than after it */
    1: { text: T('p02DragNames'), withLine: true },
    /* lineFirst: Swiftee says the line to an empty tray, and the formula
       slots and chips come in after it, before the drag is shown */
    2: { text: T('p02Formulas'), lineFirst: true }
  };
  const LAST_ROUND = 2;

  /* said once the three shapes have drawn, before round 1 opens */
  const SHAPES_READY = T('p02Shapes');

  /* section 2: Swiftee's two lines in the triangle lesson */
  const LESSON = {
    types: T('p03Differ'),
    dims:  T('p03Observe')
  };

  /* The heading's ghost holds the longest line of the level from the first
     frame, so the heading -- and Swiftee standing beside it -- keeps one width
     and one place for the whole mission, lesson included. */
  promptReserve(Object.keys(ROUNDS)
    .map(n => ROUNDS[n].text)
    .concat(SHAPES_READY, LESSON.types, LESSON.dims)
    .reduce((a, b) => (b.length > a.length ? b : a), ''));

  const slotsOf = n => allSlots.filter(s => s.dataset.round === String(n));
  const chipsOf = n => allChips.filter(c => c.dataset.round === String(n));

  /* Shuffle each deck so its left-to-right order never mirrors the shapes'. */
  [1, 2].forEach(n => {
    const deck = chipsOf(n);
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    deck.forEach(c => trays[n].appendChild(c));
  });

  let round = 0;                 /* 0 until the first round opens */
  let roundSlots = [];
  let roundChips = [];
  let wrongInRound = 0;          /* drives round 2's two coaching steps */
  let autoScheduled = false;
  let roundDone = false;

  /* ---------- palette ----------
   * style.css is the only place a colour is written down, so anything the
   * script needs to paint is read back out of the custom properties rather
   * than repeated here. */
  const rootStyle = getComputedStyle(document.documentElement);
  const token = name => rootStyle.getPropertyValue(name).trim();

  const CONFETTI = [1, 2, 3, 4, 5, 6]
    .map(n => token('--confetti-' + n))
    .filter(Boolean);

  /* ---------- Swiftee ----------
   * One player driving the welcome cut-out, the intro's centre-stage bird, the
   * bird beside the board's heading and the hopper that stands in for it
   * behind the board; at most one is visible at a time, so they can share a
   * clock -- and the moment two swap (the top of the jump) they are painting
   * the very same frame.
   *
   * Every sheet is a uniform grid whose frames all pivot on the cell centre,
   * which is what lets one expression cut to another without the character
   * shifting. A frame is selected by background-position in percentages, so
   * the selection is exact at any rendered size: with background-size set to
   * cols x rows of the box, column i sits at i/(cols-1) of the width.
   *
   * Frame counts, grids and the start -> loop -> stop triads all come from
   * swiftee-sheets.js, generated from the pipeline's manifest. */
  const swiftee = (function () {
    const S = window.SWIFTEE;
    const nodes = ['mascot', 'welcomeMascot', 'introMascot', 'hopper',
                   'quizMascot', 'sideMascot', 'factMascot', 'paraMascot',
                   'rhomMascot', 'rcMascot', 'rpMascot',
                   'trapMascot', 'rtrapMascot', 'rtrapPMascot', 'tcMascot', 'flyer']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (!S || !nodes.length) {
      /* no assets, no mascot -- never a blocked mission */
      return { play() {}, hold() {}, release() {}, show() {}, ms: () => 0, preload: () => [] };
    }

    const FRAME_MS = 1000 / S.fps;
    const clipOf = name => S.clips[name];

    /* A sprite drawn bigger than its 256px cell -- Swiftee alone on the
       landscape in the intro, and the welcome cut-out -- is painted from the
       2x sheets, or it comes out soft. */
    const HI_MIN = S.cell * 1.1;
    const HI_DROP = S.cell * 0.94;      /* hysteresis, see below */
    const hiImg = img => img.replace('/1x/', '/2x/').replace('@1x', '@2x');

    /* ---------- sheets: fetched, decoded, and only then painted ----------
       Handing the compositor a url it has not finished reading paints nothing
       at all for a frame or two -- on a bird already on screen that is a blink
       out and back. decode() is the only thing that promises a paintable
       bitmap: an Image that merely reports `complete` has been downloaded, not
       decoded, and a 3584x3072 sheet is a long way from paintable at that
       point. The Image is kept alive so the decode is not thrown away again.
         `settled` means the fetch is over either way and the engine may move
       on; `ok` means there is actually a picture in it. A sheet that will not
       load is still settled, so one missing file can never freeze the bird. */
    const sheets = Object.create(null);         /* url -> { img, settled, ok } */
    function warm(url) {
      let s = sheets[url];
      if (s) return s.p;
      const img = new Image();
      s = sheets[url] = { img: img, settled: false, ok: false, p: null };
      const mark = () => { s.settled = true; s.ok = img.naturalWidth > 0; };
      const loaded = () => new Promise(res => {
        if (img.complete) return res();
        img.onload = img.onerror = res;
      });
      img.src = url;
      s.p = (img.decode ? img.decode().then(mark, () => loaded().then(mark))
                        : loaded().then(mark));
      return s.p;
    }
    const usable  = url => { const s = sheets[url]; return !!(s && s.settled && s.ok); };
    const settled = url => { const s = sheets[url]; return !!(s && s.settled); };

    /* Which sheet a sprite is drawn from is decided from the height the
       stylesheet gives it, which is readable while the sprite is still hidden
       -- offsetHeight is 0 then, and deciding off that meant every sprite was
       revealed at 1x and swapped up to 2x a beat later, in full view of the
       learner. getBoundingClientRect() is not used either: it reports the
       TRANSFORMED height, so a squash or a spring mid-jump would flip the
       sheet and back. The threshold has a dead band -- once big it stays big
       until well under -- so a sprite sitting right on the line cannot
       oscillate between the two sheets. */
    function measure(n) {
      const h = parseFloat(getComputedStyle(n).height) || n.offsetHeight || 0;
      if (!h) return;
      const hi = h > (n._hi ? HI_DROP : HI_MIN);
      if (hi !== n._hi) { n._hi = hi; n._clip = null; }   /* re-pick the sheet */
      /* A sprite that settled for the 1x sheet because the 2x one was still
         coming down keeps it until its clip changes -- and the idle blink can
         hold for minutes. So while it is off screen, and only while it is off
         screen, let it take the better sheet as soon as there is one: nobody
         can see that swap, and it is one the learner would otherwise see the
         moment the sprite is revealed. */
      if (n._hi && n._url && n._url.indexOf('@2x') < 0 && !n.offsetHeight &&
          usable(hiImg(n._url))) n._clip = null;
    }
    function measureAll() { nodes.forEach(measure); }

    /* The sheet for one sprite and one clip, or null if nothing is paintable
       yet -- in which case the caller holds the frame already on screen rather
       than blanking the box. The big sheet is only fetched for a sprite that
       is really rendered: the landscape bird is always sized for 2x, but it
       spends most of the mission behind a display:none and has no business
       pulling down a 2x sheet of every expression the board plays. */
    function pick(n, d) {
      if (n._hi) {
        const big = hiImg(d.img);
        if (usable(big)) return big;
        if (n.offsetHeight) warm(big);
      }
      warm(d.img);
      return settled(d.img) ? d.img : null;
    }

    let program = [];    /* steps still to run: { clip, repeat } */
    let step = null;
    let frame = 0;
    let pass = 0;
    let accum = 0;
    let lastT = 0;

    /* Write only what actually changed. The frame moves at 20fps but this runs
       on every animation frame, and re-assigning the sheet's url() three times
       per frame per sprite makes the engine resolve the image again 60 times a
       second: the loop stutters and drops frames instead of playing evenly.
       The position is the only property that normally moves at all.
         The sheet is chosen once per clip per sprite, never mid-clip: a url
       that changes under a bird already on screen is the whole flicker. Until
       the chosen sheet is decoded the sprite is left showing the last frame it
       painted -- a bird holding a pose for two frames is invisible next to a
       bird that vanishes for them. */
    function paint() {
      const d = clipOf(step.clip);
      const col = frame % d.cols;
      const row = (frame / d.cols) | 0;
      const px = d.cols > 1 ? (col / (d.cols - 1)) * 100 : 0;
      const py = d.rows > 1 ? (row / (d.rows - 1)) * 100 : 0;
      const size = (d.cols * 100) + '% ' + (d.rows * 100) + '%';
      const pos  = px + '% ' + py + '%';
      nodes.forEach(n => {
        if (n._clip !== step.clip) {
          const url = pick(n, d);
          if (!url) return;                 /* nothing paintable yet: hold */
          n._clip = step.clip;
          if (n._url !== url) {
            n._url = url;
            /* absolute: a relative url() inside a custom property resolves
               against the stylesheet that reads var(--sw-img) -- css/ --
               not against this page */
            n.style.setProperty('--sw-img', 'url("' + new URL(url, document.baseURI).href + '")');
          }
          /* A sprite that is held back until there is something in it (the
             welcome cut-out) is let through here and only here: the frame it
             becomes visible on is the frame a decoded sheet lands in it, so
             it is never an empty box that fills in. Asked of the element
             rather than remembered, so a teardown that puts a sprite's
             classes back the way it found them cannot leave it hidden. */
          if (!n.classList.contains('show')) n.classList.add('show');
        }
        if (n._size !== size) { n._size = size; n.style.setProperty('--sw-size', size); }
        if (n._pos !== pos)   { n._pos = pos;   n.style.setProperty('--sw-pos', pos); }
      });
    }

    function advance() {
      step = program.shift() || null;
      frame = 0;
      pass = 0;
      /* a clip boundary is the one moment a sprite may change sheet without
         it showing, so it is also the moment its size is worth re-reading */
      if (step) { measureAll(); paint(); }
    }

    let measuredT = 0;
    function tick(t) {
      requestAnimationFrame(tick);
      if (!step) return;
      /* Sizes are re-read at every clip boundary, but an idle loop can hold
         for minutes; a slow sweep catches a sprite resized or made ready in
         between. Off the hot path: a couple of layout reads a second. */
      if (t - measuredT > 500) { measuredT = t; measureAll(); }
      if (!lastT) lastT = t;
      let dt = t - lastT;
      lastT = t;
      /* a backgrounded tab hands back one enormous delta; spend one frame on
         it rather than fast-forwarding the whole animation */
      if (dt > 250) dt = FRAME_MS;
      accum += dt;

      while (step && accum >= FRAME_MS) {
        accum -= FRAME_MS;
        frame++;
        if (frame >= clipOf(step.clip).frames) {
          pass++;
          if (pass >= step.repeat) advance();
          else frame = 0;
        }
      }
      if (step) paint();
    }

    /* Play the full triad the animator drew: start once, loop `passes` times,
       stop once, then settle back to the idle blink. Cutting straight from one
       loop into another skips the transition and reads as a jerk. */
    function build(state, passes) {
      const st = S.states[state];
      const tail = { clip: S.idle, repeat: Infinity };
      if (!st) return [tail];

      const p = [];
      if (st.start) p.push({ clip: st.start, repeat: 1 });
      p.push({ clip: st.loop, repeat: passes });
      if (st.stop) p.push({ clip: st.stop, repeat: 1 });
      p.push(tail);
      return p;
    }

    /* how long a one-shot reaction takes, so a caller can wait it out */
    function ms(state, passes) {
      const st = S.states[state];
      if (!st) return 0;
      let f = st.start ? clipOf(st.start).frames : 0;
      f += clipOf(st.loop).frames * (passes === undefined ? 1 : passes);
      f += st.stop ? clipOf(st.stop).frames : 0;
      return f * FRAME_MS;
    }

    requestAnimationFrame(tick);
    window.addEventListener('resize', measureAll);
    program = build(null, 1);
    advance();

    return {
      /* a one-shot reaction that settles back to idle on its own */
      play(state, passes) {
        program = build(state, passes === undefined ? 1 : passes);
        accum = 0;
        advance();
      },
      /* an expression held open until release() -- used while a clip narrates */
      hold(state) {
        program = build(state, Infinity);
        accum = 0;
        advance();
      },
      /* let the held loop finish its current pass, then run its stop clip */
      release() {
        if (step && step.repeat === Infinity && step.clip !== S.idle) {
          step.repeat = pass + 1;
        }
      },
      /* Sprites reveal themselves on their first decoded frame (see paint);
         this is the manual override, and painting first keeps the guarantee
         that nothing is shown before there is something in it. */
      show(on) {
        if (on && step) paint();
        nodes.forEach(n => n.classList.toggle('show', !!on));
      },
      ms: ms,
      /* Fetch and decode every 1x sheet, and the 2x sheets of the clips a
         sprite is ever drawn big enough to need them for -- the welcome
         cut-out and the landscape bird only ever blink, wave and talk. The
         loader waits on these, which is what makes every later sheet change a
         swap between two bitmaps the browser already holds. */
      preload() {
        const big = [S.idle].concat(
          ['waving', 'talking'].map(k => S.states[k]).filter(Boolean)
            .map(st => [st.start, st.loop, st.stop]).reduce((a, b) => a.concat(b), []))
          .filter(Boolean).map(k => hiImg(clipOf(k).img));
        return Object.keys(S.clips).map(k => S.clips[k].img).concat(big).map(warm);
      }
    };
  })();

  /* ---------- rows that give up their room ----------
   * The heading row and each section's foot are only as tall as what they
   * show: an empty row closes and the stage above takes the room, so the
   * shape grows; the row opens again when a line, a quiz or Swiftee arrives
   * in it. The height is set in pixels and transitioned, so the change is
   * smooth. Sized from the visible occupants after every class change in
   * the board, every finished transition, and a resize. */
  const rooms = Array.from(document.querySelectorAll('.prompt-row, .quad-foot, .para-foot, .rhom-foot, .trap-foot, .rtrap-foot'));
  /* the spots a jump now in the air is leaving and bound for; empty when the
     bird is standing somewhere. Set by the jumps themselves, further down. */
  let birdTrip = [];
  function roomShown(el) {
    if (el.hidden || el.classList.contains('off')) return false;
    const cs = getComputedStyle(el);
    return cs.display !== 'none' && cs.visibility !== 'hidden';
  }
  function roomHeight(room) {
    if (room.classList.contains('prompt-row')) {
      /* Open while a line is showing, while Swiftee stands in it, or while a
         jump with this row at one end of it is in the air -- the hopper
         carries the bird behind the board, the flyer carries it across the
         board, and for those few hundred milliseconds neither spot holds it.
         Counting only the spots made the row snap shut and straight back open
         on every hop, which pumped the whole board.
           Which end the jump has matters: a bird coming down to a foot of a
         section, over a heading with nothing in it, would otherwise open this
         row for the length of its jump and shut it again on landing -- the
         board's whole contents dropping and rising under the bird in the air.
         So the room is held only for a trip this row is part of. */
      /* A scene may keep the row for its whole length whatever is standing in
         it. The warm-up does: its heading arrives after the shapes are drawn
         and clears again as the sides are named, and letting the row open and
         fold around that took the shapes 122px down the board and back up
         again (user, 2026-09-18). Held, the bay is its final size from the
         first frame and nothing in the scene ever moves. */
      if (board.classList.contains('head-held')) return room.firstElementChild.offsetHeight;
      /* a line cleared between two lines of one explanation: see speakerDone */
      if (performance.now() < headKeepUntil) return room.firstElementChild.offsetHeight;
      const txt = room.querySelector('.txt');
      const hop = document.getElementById('hopper');   /* declared further down: looked up, not closed over */
      const fly = document.getElementById('flyer');
      const bird = document.getElementById('mascot');
      const flying = (hop && hop.classList.contains('on')) || (fly && fly.classList.contains('on'));
      const here = (bird && bird.classList.contains('in')) ||
                   (flying && birdTrip.indexOf(bird) >= 0);
      return (txt && txt.childNodes.length) || here ? room.firstElementChild.offsetHeight : 0;
    }
    /* A foot may keep a row of its OWN above the cell the rest share --
       Swiftee's box in the parallelogram's sides -- and then the room is that
       row plus the cell plus the gap between them, not the taller of the two.
       Every other foot has one cell and falls through to the max. */
    let h = 0, top = 0;
    for (const child of room.children) {
      if (!roomShown(child)) continue;
      if (child.classList.contains('room-row')) top = Math.max(top, child.offsetHeight);
      else h = Math.max(h, child.offsetHeight);
    }
    if (!top) return h;
    return h ? top + h + (parseFloat(getComputedStyle(room).rowGap) || 0) : top;
  }
  /* A room opens the moment it has something to show and closes on a short
     delay. Every close is a half-second transition of the board's whole
     layout, so one taken and given back inside a few frames -- the gap
     between one animation handing over to the next -- reads as a flicker.
     Waiting a beat before closing means only a room that is really finished
     with ever moves; a room that fills again in the meantime never moved at
     all. Opening is never delayed: arrivals are what the room is for. */
  /* ---- the one place the game still animates a layout property ----
     Everything else moves on transform and opacity alone. A room cannot:
     it is an accordion, and the whole point of it is that the rows below
     move up as it folds. A transform does not move anything below it, and
     a scale would squash whatever is standing inside the room instead of
     closing the room around it -- which is why GSAP's Flip, offered a box
     that has to change size with live content in it, is not a way out here
     either. The height of these rooms is the layout; animating it IS the
     effect. The rooms are few, they are siblings on one grid, and only one
     of them moves at a time, so the reflow is bounded and predictable.
       The same reasoning covers the .slot rule in style.css, which
     transitions height, margin-top and border-width when a round changes
     the shape of its dock. */
  const ROOM_CLOSE_DELAY = 360;
  let roomsDue = 0;
  const roomClose = new Map();
  function setRoom(room, h) {
    const v = Math.round(h) + 'px';
    if (room.style.height !== v) room.style.height = v;
    room.classList.toggle('closed', !h);
  }
  function fitRooms() {
    roomsDue = 0;
    rooms.forEach(room => {
      const h = roomHeight(room);
      const pending = roomClose.get(room);
      if (h) {                                   /* occupied: open it now */
        if (pending) { clearTimeout(pending); roomClose.delete(room); }
        setRoom(room, h);
        return;
      }
      if (room.style.height === '0px' || pending) return;   /* already shut, or on its way */
      roomClose.set(room, setTimeout(() => {
        roomClose.delete(room);
        if (!roomHeight(room)) setRoom(room, 0);   /* still empty a beat later */
      }, ROOM_CLOSE_DELAY));
    });
  }
  const askRooms = () => { if (!roomsDue) roomsDue = requestAnimationFrame(fitRooms); };
  /* A room whose occupants have all gone, shut at once rather than eased
     shut: for a layout that is about to be measured with the room in it.
     The quadrilateral's glide back to the middle measures the shape's new
     place under the quiz's foot, and over a foot still closing that place
     was a squashed one -- the shape glided down to it and was then stretched
     back as the foot finished closing (user, 2026-09-29). */
  function shutRoomNow(room) {
    const pending = roomClose.get(room);
    if (pending) { clearTimeout(pending); roomClose.delete(room); }
    room.style.transition = 'none';
    setRoom(room, 0);
    void room.offsetHeight;
    room.style.transition = '';
  }
  /* ...and the other way: a room opened to what it holds at once, while the
     board is still out of sight, so the shape is first seen at the size it
     keeps rather than shrinking as the room eases open under it */
  function openRoomNow(room) {
    const pending = roomClose.get(room);
    if (pending) { clearTimeout(pending); roomClose.delete(room); }
    room.style.transition = 'none';
    setRoom(room, roomHeight(room));
    void room.offsetHeight;
    room.style.transition = '';
  }
  if (rooms.length) {
    new MutationObserver(askRooms).observe(board, { subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'hidden'] });
    /* the hopper carries the bird on and off the board from outside it, and
       the flyer carries it from spot to spot over it: both live outside the
       board, so neither is covered by the observer above */
    ['hopper', 'flyer'].forEach(id => {
      const el = document.getElementById(id);
      if (el) new MutationObserver(askRooms).observe(el, { attributes: true, attributeFilter: ['class'] });
    });
    board.addEventListener('transitionend', askRooms);
    window.addEventListener('resize', askRooms);
    fitRooms();
  }

  /* ---------- audio ---------- */
  const SRC = {
    correct:  'assets/audio/correct-answer.webm',
    wrong:    'assets/audio/incorrect-answer.webm',
    confetti: 'assets/audio/confetti-sound.webm',
    click:    'assets/audio/button-click.webm'
  };

  const bank = {};
  Object.keys(SRC).forEach(key => {
    const a = new Audio(SRC[key]);
    a.preload = 'auto';
    bank[key] = a;
  });
  /* Effects play off clones so overlapping hits never cut each other short. */
  function sfx(key, volume) {
    if (fastForward) return;         /* a skip races past; it does not chime */
    /* muted, or this same cue already sounded a breath ago -- two chips
       docking together should chime once, not twice as loudly */
    if (!Motion.mayPlay(key)) return;
    const src = bank[key];
    if (!src) return;
    try {
      const a = src.cloneNode();
      a.volume = volume === undefined ? 1 : volume;
      const p = a.play();
      if (p && p.catch) p.catch(() => {});
    } catch (e) { /* audio is a nicety, never a blocker */ }
  }

  /* Duration is needed to pace the typewriter. Resolves to 0 if the file
     cannot be read, and the caller falls back to a fixed pace. */
  function durationOf(a) {
    return new Promise(resolve => {
      if (a.readyState >= 1 && isFinite(a.duration) && a.duration > 0) {
        return resolve(a.duration);
      }
      let settled = false;
      const off = () => {
        a.removeEventListener('loadedmetadata', done);
        a.removeEventListener('error', fail);
      };
      const done = () => {
        if (settled) return;
        settled = true; off();
        resolve(isFinite(a.duration) && a.duration > 0 ? a.duration : 0);
      };
      const fail = () => {
        if (settled) return;
        settled = true; off();
        resolve(0);
      };
      a.addEventListener('loadedmetadata', done);
      a.addEventListener('error', fail);
      setTimeout(fail, 4000);
      try { a.load(); } catch (e) { fail(); }
    });
  }

  /* ---------- voice-over ----------
   * Every spoken line in the mission has a clip of its own under assets/VO,
   * cut from the master recordings and named for the page it belongs to
   * (P04-06-lets-try-and-find-its-area.webm, Opus). Pages 1-8 are cut from the
   * newer recording (voice 1-2.mp3); the rest still play the older voice
   * until they are recorded again.
   *
   * The clips are keyed by THE LINE ITSELF rather than by the call site, and
   * that is the whole of the wiring:
   *   - a line said on six pages -- "That's Correct!" -- finds its clip
   *     wherever it is typed, without six bindings,
   *   - a line built at run time -- "Try again! Join the left and right
   *     corners.", "...fit together to make a parallelogram!" -- finds its
   *     own the same way, because the built string is what is looked up,
   *   - and a scene never names a file. It types its line exactly as it
   *     always did; the voice comes with it.
   * Every box that shows a line goes through one of the typewriters below,
   * and each of those asks here first. A line with no clip types at its own
   * pace, silently, as it did before there was a recording.
   */
  const VO_DIR = 'assets/VO/';
  /* Clips are fetched by script after the page has loaded, so a reload does
     not revalidate them: a clip re-cut under its old name -- P24-02's
     stand-in, replaced by the recording on 2026-10-01 -- keeps playing from
     the browser's cache for hours. The revision rides on every clip's URL,
     and a new value fetches every clip afresh. Bump it whenever a clip is
     replaced under a name it already had. */
  const VO_REV = '?v=20261001';
  /* A language with recordings of its own (Hindi: assets/VO-HI/, listed under
     "voiceOver" in the locale file) is voiced from those, line for line:
     I18n.voice() names the clip for the words on screen, and a line it has
     none for types in silence rather than in English. Every other language
     keeps the English clips below. */
  const VO_PACK = I18n.hasVoice();

  /* The line as it is written on screen, lower-cased with its typographic
     quotes flattened -- so the map can be read against the source, and a
     line that only differs by a curly apostrophe still finds its clip. */
  function voKey(text) {
    /* a translated line is looked up by its English source (i18n.js) */
    return String(I18n.source(text))
      .replace(/ /g, ' ')
      .replace(/[‘’]/g, '\'')
      .replace(/[“”]/g, '"')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  const VO_FILE = {
    'hey there!':
      'P01-01-hey-there',
    'let\'s start with a quick warm-up!':
      'P01-02-lets-start-with-a-quick-warm-up',
    'here are a few common shapes.':
      'P02-01-here-are-a-few-common-shapes',
    'drag each name to the matching shape.':
      'P02-02-drag-each-name-to-the-matching-shape',
    'great! now let\'s recall their area formulas.':
      'P02-03-great-now-lets-recall-their-area-formulas',
    'that\'s correct':
      'FB-01-thats-correct',
    'well done!':
      'FB-03-well-done',
    'not quite!':
      'FB-04-not-quite',
    'triangles can look different. but their area depends on the base and height.':
      'P03-01-triangles-can-look-different-but-their-area-depends',
    'let\'s observe their base and height.':
      'P03-02-lets-observe-their-base-and-height',
    'what shape is this?':
      'P04-01-what-shape-is-this',
    'not quite! a triangle has 3 sides.':
      'P04-02-not-quite-a-triangle-has-3-sides',
    'not quite! a pentagon has 5 sides.':
      'P04-03-not-quite-a-pentagon-has-5-sides',
    'correct. a quadrilateral has 4 sides.':
      'P04-04-correct-a-quadrilateral-has-4-sides',
    'this is a general quadrilateral.':
      'P04-05-this-is-a-general-quadrilateral',
    'let\'s try and find its area!':
      'P04-06-lets-try-and-find-its-area',
    'join the corners to draw a diagonal.':
      'P04-07-join-the-corners-to-draw-a-diagonal',
    'try again! join the left and right corners.':
      'P04-08-try-again-join-the-left-and-right-corners',
    'now, the quadrilateral is divided into two triangles. let\'s look at each triangle.':
      'P04-09-now-the-quadrilateral-is-divided-into-two-triangles',
    'let\'s say the base of this triangle is b.':
      'P04-13-lets-say-the-base-of-this-triangle-is',
    'and its height is h₁.':
      'P04-14-and-its-height-is-h1',
    'so, its area will be …':
      'P04-15-so-its-area-will-be',
    'this triangle has the same base b.':
      'P04-16-this-triangle-has-the-same-base-b',
    /* page 10's triangle lines: cut from the tail of page 25's "Its parallel
       sides are a and b, and its height is h." on the part-2 take (2026-09-30) */
    'and its height is h.':
      'P10-05-and-its-height-is-h',
    'and its height is h₂.':
      'P04-17-and-its-height-is-h2',
    'let\'s put in each triangle\'s area.':
      'P04-10-lets-put-in-each-triangles-area',
    'both triangles share the same base b.':
      'P04-11-both-triangles-share-the-same-base-b',
    'the base b is the diagonal.':
      'P04-19-the-base-b-is-the-diagonal',
    'and h₁ + h₂ is the sum of the perpendicular heights.':
      'P04-20-and-h1-h2-is-the-sum-of-the',
    'so this is the area of the quadrilateral!':
      'P04-12-so-this-is-the-area-of-the-quadrilateral',
    'let\'s try a different way!':
      'P05-01-lets-try-a-different-way',
    'try again! join the top and bottom corners.':
      'P05-02-try-again-join-the-top-and-bottom-corners',
    'two new triangles! let\'s find their areas.':
      'P05-03-two-new-triangles-lets-find-their-areas',
    'complete the formula for the area of the quadrilateral.':
      'P05-04-complete-the-formula-for-the-area-of-the',
    'choose the diagonal of the quadrilateral.':
      'P05-05-choose-the-diagonal-of-the-quadrilateral',
    'this is the height of the orange triangle.':
      'P05-06-this-is-the-height-of-the-orange-triangle',
    'this is the height of the purple triangle.':
      'P05-07-this-is-the-height-of-the-purple-triangle',
    'choose the sum of the perpendicular heights.':
      'P05-08-choose-the-sum-of-the-perpendicular-heights',
    'we add the two heights, not the diagonal.':
      'P05-09-we-add-the-two-heights-not-the-diagonal',
    'here is a different quadrilateral.':
      'P06-01-here-is-a-different-quadrilateral',
    'let\'s look at its base and heights.':
      'P06-02-lets-look-at-its-base-and-heights',
    'choose the base and height for each triangle.':
      'P06-03-choose-the-base-and-height-for-each-triangle',
    'now it\'s your turn! find the area of this quadrilateral.':
      'P07-01-now-its-your-turn-find-the-area-of',
    'not quite! look at the measure of the heights.':
      'P07-02-not-quite-look-at-the-measure-of-the',
    'not quite! look at the measure of the diagonal.':
      'P07-03-not-quite-look-at-the-measure-of-the',
    'area of a general quadrilateral = ½ × diagonal × sum of perpendicular heights.':
      'P07-04-area-of-a-general-quadrilateral-half-x-diagonal',
    'we know how to find the area of a general quadrilateral.':
      'P08-01-we-know-how-to-find-the-area-of',
    'now, let\'s find the area of some special quadrilaterals!':
      'P08-02-now-lets-find-the-area-of-some-special',
    'correct!':
      'P09-02-thats-correct',
    'this is a parallelogram.':
      'P09-12-this-is-a-parallelogram',
    /* the same sentence as page 23's second verdict, cut on its own from
       the part-2 take (2026-09-30); the two trapezium pieces of the wrong
       verdict are still unrecorded */
    'a parallelogram has two pairs of parallel sides.':
      'P09-03-a-parallelogram-has-two-pairs-of-parallel-sides',
    'check the shape carefully.':
      'P09-13-check-the-shape-carefully',
    /* the wrong name's own two sentences (2026-10-01) */
    'this is not a trapezium.':
      'P09-14-this-is-not-a-trapezium',
    'trapezium has only one pair of parallel sides.':
      'P09-15-trapezium-has-only-one-pair-of-parallel-sides',
    'look at the top and bottom sides.':
      'P09-04-look-at-the-top-and-bottom-sides',
    'they run side by side and never meet.':
      'P09-05-they-run-side-by-side-and-never-meet',
    'the left and right sides do the same!':
      'P09-06-the-left-and-right-sides-do-the-same',
    'now let\'s compare their lengths.':
      'P09-07-now-lets-compare-their-lengths',
    'the top side fits the bottom side exactly!':
      'P09-08-the-top-side-fits-the-bottom-side-exactly',
    'and the left side fits the right side too!':
      'P09-09-and-the-left-side-fits-the-right-side',
    'opposite sides are parallel to each other.':
      'P09-10-opposite-sides-are-parallel-to-each-other',
    'opposite sides are equal in length.':
      'P09-11-opposite-sides-are-equal-in-length',
    'here is a parallelogram.':
      'P10-01-here-is-a-parallelogram',
    'this is the base of the parallelogram.':
      'P10-02-this-is-the-base-of-the-parallelogram',
    'here comes the height!':
      'P10-03-here-comes-the-height',
    'let us divide this into two triangles.':
      'P10-04-let-us-divide-this-into-two-triangles',
    /* the working's closing lines and pages 11-12's verdicts: the batch-3
       take, "chg (1).mp3" (2026-09-30) */
    'the parallelogram is made of both triangles.':
      'P10-13-the-parallelogram-is-made-of-both-triangles',
    'two halves of b × h make one whole b × h.':
      'P10-14-two-halves-of-b-x-h-make-one',
    'that is base × height!':
      'P10-15-that-is-base-x-height',
    'so this is the area of the parallelogram!':
      'P10-16-so-this-is-the-area-of-the-parallelogram',
    'which of these is the area of the parallelogram?':
      'P11-01-which-of-these-is-the-area-of-the',
    'not quite! that is the area of just one triangle.':
      'P11-03-not-quite-that-is-the-area-of-just',
    'not quite! that is twice the area of the parallelogram.':
      'P11-04-not-quite-that-is-twice-the-area-of',
    'that\'s correct! area of a parallelogram = base × height.':
      'P11-02-thats-correct-area-of-a-parallelogram-base-x',
    'now it\'s your turn! find the area of this parallelogram.':
      'P12-01-now-its-your-turn-find-the-area-of',
    'not quite! look at the measure of the base.':
      'P12-02-not-quite-look-at-the-measure-of-the',
    'that\'s correct! the base is 8 cm.':
      'P12-03-thats-correct-the-base-is-8-cm',
    'not quite! look at the measure of the height.':
      'P12-04-not-quite-look-at-the-measure-of-the',
    'that\'s correct! the height is 5 cm.':
      'P12-05-thats-correct-the-height-is-5-cm',
    'not quite! area of a parallelogram = base × height.':
      'P12-06-not-quite-area-of-a-parallelogram-base-x',
    'that\'s correct! the area is 8 × 5 = 40 sq. cm.':
      'P12-07-thats-correct-the-area-is-8-x-5',
    'we now know how to find the area of a parallelogram.':
      'P13-01-we-now-know-how-to-find-the-area',
    'let us now try finding the area of a special parallelogram.':
      'P13-02-let-us-now-try-finding-the-area-of',
    'drag the points to make each angle 90 degrees.':
      'P14-01-drag-the-points-to-make-each-angle-90',
    'all four sides are equal in length!':
      'P14-02-all-four-sides-are-equal-in-length',
    'and the diagonals meet at a right angle (90°).':
      'P14-03-and-the-diagonals-meet-at-a-right-angle',
    'a parallelogram with these properties is called a rhombus.':
      'P14-04-a-parallelogram-with-these-properties-is-called-a',
    'this is the special parallelogram called rhombus.':
      'P14-05-this-is-the-special-parallelogram-called-rhombus',
    'here, is a rhombus.':
      'P15-01-here-is-a-rhombus',
    'that\'s correct!':
      'P17-07-thats-correct',
    'let\'s find the area of the whole rhombus.':
      'P15-02-lets-find-the-area-of-the-whole-rhombus',
    'both parts have ½ × d₁ in them, so take it out.':
      'P15-10-both-parts-have-half-x-d1-in-them',
    'and h₁ and h₂ together make the whole of d₂.':
      'P15-11-and-h1-and-h2-together-make-the-whole',
    'so the area of a rhombus is ½ × d₁ × d₂.':
      'P15-13-so-the-area-of-a-rhombus-is-half',
    'drag the two lengths into the formula.':
      'P17-01-drag-the-two-lengths-into-the-formula',
    'choose the correct area.':
      'P18-01-choose-the-correct-area',
    'this rhombus has an area of 240 sq. cm. find the other diagonal.':
      'P19-01-this-rhombus-has-an-area-of-240-sq',
    'that\'s correct! ½ × 30 × d₂ = 240, so d₂ is 16 cm.':
      'P19-05-thats-correct-half-x-30-x-d2-240',
    'what is the area of the rhombus?':
      'P20-01-what-is-the-area-of-the-rhombus',
    'the diagonals are 24 cm and 15 cm.':
      'P20-02-the-diagonals-are-24-cm-and-15-cm',
    'which formula can you use here?':
      'P21-01-which-formula-can-you-use-here',
    'that\'s correct! no diagonals are given, so use base × height.':
      'P21-03-thats-correct-no-diagonals-are-given-so-use',
    'we found the area of a rhombus!':
      'P22-01-we-found-the-area-of-a-rhombus',
    'ready for the next challenge?':
      'P22-02-ready-for-the-next-challenge',
    'let\'s find the area of another special quadrilateral!':
      'P22-03-lets-find-the-area-of-another-special-quadrilateral',
    /* the "Almost!" is off the front of both lines (user, 2026-09-30); the
       takes still open with it, and want re-recording */
    'a kite has two pairs of equal sides next to each other. check the shape carefully.':
      'P23-02-a-kite-has-two-pairs-of-equal-sides',
    'a parallelogram has two pairs of parallel sides. check the shape carefully.':
      'P23-03-a-parallelogram-has-two-pairs-of-parallel-sides',
    'correct! look at the shape — it has only one pair of parallel sides.':
      'P23-04-correct-look-at-the-shape-it-has-only',
    'select all the trapeziums.':
      'P24-01-select-all-the-trapeziums',
    /* the wrong card's reason, said as it is shown in the middle: recorded
       on its own ("d fsg (1).mp3", 2026-10-01) */
    'this shape has no parallel sides. a trapezium has one pair.':
      'P24-02-this-shape-has-no-parallel-sides-a-trapezium',
    'let us try to find the area of this trapezium.':
      'P25-01-let-us-try-to-find-the-area-of',
    'its parallel sides are a and b, and its height is h.':
      'P25-02-its-parallel-sides-are-a-and-b-and',
    'let us slide it across, to make room beside it.':
      'P25-03-let-us-slide-it-across-to-make-room',
    'now let us take a copy of it.':
      'P25-04-now-let-us-take-a-copy-of-it',
    'the copy slides over and flips upside down.':
      'P25-05-the-copy-slides-over-and-flips-upside-down',
    'side a of the copy is equal to side a.':
      'P25-06-side-a-of-the-copy-is-equal-to',
    'and side b of the copy is equal to side b.':
      'P25-07-and-side-b-of-the-copy-is-equal',
    'its height is the same h too.':
      'P25-08-its-height-is-the-same-h-too',
    'the two trapeziums fit together to make a parallelogram!':
      'P25-09-the-two-trapeziums-fit-together-to-make-a',
    'so the parallelogram has base a + b and height h.':
      'P25-10-so-the-parallelogram-has-base-a-b-and',
    'the area of the whole parallelogram is:':
      'P26-01-the-area-of-the-whole-parallelogram-is',
    'our trapezium is exactly half of this parallelogram.':
      'P26-02-our-trapezium-is-exactly-half-of-this-parallelogram',
    'so, the area of the trapezium is:':
      'P26-03-so-the-area-of-the-trapezium-is',
    'this works for every trapezium!':
      'P26-04-this-works-for-every-trapezium',
    'let\'s find the area of this trapezium.':
      'P27-01-lets-find-the-area-of-this-trapezium',
    'which measurement is a, the shorter parallel side?':
      'P27-02-which-measurement-is-a-the-shorter-parallel-side',
    'look at the shorter parallel side.':
      'P27-03-look-at-the-shorter-parallel-side',
    'which measurement is b, the longer parallel side?':
      'P27-04-which-measurement-is-b-the-longer-parallel-side',
    'look at the longer parallel side.':
      'P27-05-look-at-the-longer-parallel-side',
    'what is the height?':
      'P28-06-what-is-the-height',
    'look at the perpendicular height.':
      'P27-07-look-at-the-perpendicular-height',
    'what is the area of the trapezium?':
      'P29-01-what-is-the-area-of-the-trapezium',
    'add the two parallel sides: 8 cm + 14 cm.':
      'P27-09-add-the-two-parallel-sides-8-cm-14',
    'let\'s simplify it, step by step.':
      'P27-09-lets-simplify-it-step-by-step',
    'look at the trapezium and choose the correct values.':
      'P28-01-look-at-the-trapezium-and-choose-the-correct',
    'add the two parallel sides: 13 + 20.':
      'P28-02-add-the-two-parallel-sides-13-20',
    'the parallel sides are 13 cm and 20 cm — add them.':
      'P28-03-the-parallel-sides-are-13-cm-and-20',
    '13 + 20 = 33, so the sum of the parallel sides is 33 cm.':
      'P28-04-13-20-33-so-the-sum-of-the',
    'look at the dotted perpendicular line.':
      'P28-05-look-at-the-dotted-perpendicular-line',
    'the dotted line runs straight from the top parallel side down to the bottom one.':
      'P28-06-the-dotted-line-runs-straight-from-the-top',
    'the dotted perpendicular height is the one marked 10 cm.':
      'P28-07-the-dotted-perpendicular-height-is-the-one-marked',
    'use ½ × sum of parallel sides × height.':
      'P29-02-use-half-x-sum-of-parallel-sides-x',
    'work out ½ × 33 × 10.':
      'P29-03-work-out-half-x-33-x-10',
    'half of 10 is 5, and 33 × 5 = 165 sq. cm.':
      'P29-04-half-of-10-is-5-and-33-x',
    'use ½ × (sum of the parallel sides) × height.':
      'P30-02-use-half-x-sum-of-the-parallel-sides',
    /* the part-2 re-recording (2026-09-30): the lines these pages gained
       since the first recording, cut from the new take */
    'not quite! that is 33 + 10. multiply the sum of the parallel sides by the height.':
      'P29-03-not-quite-that-is-33-10-multiply-the',
    'that\'s correct! 13 + 20 = 33. the sum of the parallel sides is 33 cm.':
      'P28-05-thats-correct-13-20-33-the-sum-of',
    'not quite! that is 16 × 12 without the half. look at the formula again.':
      'P18-02-not-quite-that-is-16-x-12-without',
    'not quite! half of 30 × 32 is 480 sq. cm. that is too much.':
      'P19-04-not-quite-half-of-30-x-32-is',
    'not quite! that is 20 + 10. add the two parallel sides: 13 + 20.':
      'P28-03-not-quite-that-is-20-10-add-the',
    'not quite! that is 13 + 10. add the two parallel sides: 13 + 20.':
      'P28-04-not-quite-that-is-13-10-add-the',
    'not quite! 13 cm is the top parallel side. look at the dotted perpendicular line.':
      'P28-07-not-quite-13-cm-is-the-top-parallel',
    'not quite! 20 cm is the bottom parallel side. look at the dotted perpendicular line.':
      'P28-08-not-quite-20-cm-is-the-bottom-parallel',
    'that\'s correct! the first diagonal is 16 cm. now drag d₂ into the formula.':
      'P17-03-thats-correct-the-first-diagonal-is-16-cm',
    'that\'s correct! the second diagonal is 12 cm. now drag d₁ into the formula.':
      'P17-04-thats-correct-the-second-diagonal-is-12-cm',
    'not quite! that is 16 + 12. the diagonals are multiplied, not added.':
      'P18-03-not-quite-that-is-16-12-the-diagonals',
    'not quite! that is 24 + 15. the diagonals are multiplied, not added.':
      'P20-03-not-quite-that-is-24-15-the-diagonals',
    'that\'s correct! half of (30 + 40) × 15 is 525 sq. cm.':
      'P30-03-thats-correct-half-of-30-40-x-15',
    'not quite! half of 30 × 8 is only 120 sq. cm.':
      'P19-03-not-quite-half-of-30-x-8-is',
    'not quite! no diagonals are given here. look at what is marked.':
      'P21-02-not-quite-no-diagonals-are-given-here-look',
    'that\'s correct! a is 8 cm. now drag b into the formula.':
      'P27-04-thats-correct-a-is-8-cm-now-drag',
    'that\'s correct! b is 14 cm. now drag h into the formula.':
      'P27-06-thats-correct-b-is-14-cm-now-drag',
    'not quite! that is 30 × 15. add both parallel sides first.':
      'P30-02-not-quite-that-is-30-x-15-add',
    'not quite! the two diagonals are written under and beside the shape.':
      'P17-02-not-quite-the-two-diagonals-are-written-under',
    'that\'s correct! half of 16 × 12 is 96 sq. cm.':
      'P18-04-thats-correct-half-of-16-x-12-is',
    'that\'s correct! half of 24 × 15 is 180 sq. cm.':
      'P20-04-thats-correct-half-of-24-x-15-is',
    'that\'s correct! half of 33 × 10 is 165 sq. cm.':
      'P29-04-thats-correct-half-of-33-x-10-is',
    'and d₁ × d₂ is the product of the diagonals.':
      'P15-12-and-d1-x-d2-is-the-product-of',
    'not quite! the length written under the shape is d₁.':
      'P17-05-not-quite-the-length-written-under-the-shape',
    'not quite! the length written beside the shape is d₂.':
      'P17-06-not-quite-the-length-written-beside-the-shape',
    'not quite! that is 24 × 15 without the half.':
      'P20-02-not-quite-that-is-24-x-15-without',
    'not quite! that is 33 × 10 without the half.':
      'P29-02-not-quite-that-is-33-x-10-without',
    'not quite! that is 70 × 15 without the half.':
      'P30-01-not-quite-that-is-70-x-15-without',
    'that\'s correct! the dotted perpendicular height is 10 cm.':
      'P28-09-thats-correct-the-dotted-perpendicular-height-is-10',
    'not quite! a is the shorter parallel side.':
      'P27-03-not-quite-a-is-the-shorter-parallel-side',
    'not quite! b is the longer parallel side.':
      'P27-05-not-quite-b-is-the-longer-parallel-side',
    'fill a first. then b and then h.':
      'P27-08-fill-a-first-then-b-and-then-h',
    'what is the sum of the parallel sides?':
      'P28-02-what-is-the-sum-of-the-parallel-sides',
    'well done! you found all the trapeziums.':
      'P24-02-well-done-you-found-all-the-trapeziums',
    'drag the three lengths into the formula.':
      'P27-02-drag-the-three-lengths-into-the-formula',
    'not quite! h is the perpendicular height.':
      'P27-07-not-quite-h-is-the-perpendicular-height',
    'now let\'s look at triangle 2.':
      'P15-06-now-lets-look-at-triangle-2',
    'its base is the diagonal d₁.':
      'P15-04-its-base-is-the-diagonal-d1',
    'it has the same base d₁.':
      'P15-07-it-has-the-same-base-d1',
    'let\'s look at triangle 1.':
      'P15-03-lets-look-at-triangle-1',
    'find the other diagonal.':
      'P19-02-find-the-other-diagonal'
  };

  /* The same line with its punctuation set aside. A comma that became a
     full stop -- "different. But" for "different, but" -- or a dropped
     exclamation mark is still the same sentence to the ear, so a line that
     misses the map on its exact words is looked up once more this way. The
     exact key is always tried first: "That's Correct" and "That's Correct!"
     keep their own clips. */
  function voLoose(key) {
    return key.replace(/[^a-z0-9½×₁₂+= ]+/g, ' ').replace(/\s+/g, ' ').trim();
  }
  const VO_LOOSE = Object.create(null);
  Object.keys(VO_FILE).forEach(function (k) {
    const l = voLoose(k);
    if (!(l in VO_LOOSE)) VO_LOOSE[l] = VO_FILE[k];
  });

  /* Where each piece of a line begins in its clip, in seconds from the
     clip's start, measured off the recording's word timings (the part-2
     re-recording, 2026-09-30). A piece then gives way to the next exactly as
     the narrator reaches it, rather than at a guess made from the letters it
     has. Piece 0 is at 0; only clips with more than one piece are listed. A
     clip whose count does not match the line's pieces is paced by the
     letters, as before (voCuesFor). */
  const VO_CUES = {
    /* the batch-3 take (2026-09-30): pages 11-12's verdicts */
    'P12-02-not-quite-look-at-the-measure-of-the': [0.0, 1.66],
    'P12-03-thats-correct-the-base-is-8-cm': [0.0, 1.51],
    'P12-04-not-quite-look-at-the-measure-of-the': [0.0, 1.73],
    'P12-05-thats-correct-the-height-is-5-cm': [0.0, 1.5],
    'P12-06-not-quite-area-of-a-parallelogram-base-x': [0.0, 1.53],
    'P12-07-thats-correct-the-area-is-8-x-5': [0.0, 1.56],
    'P11-03-not-quite-that-is-the-area-of-just': [0.0, 1.52],
    'P11-04-not-quite-that-is-twice-the-area-of': [0.0, 1.64],
    'P29-03-not-quite-that-is-33-10-multiply-the': [0.0, 1.22, 4.14],
    'P23-02-a-kite-has-two-pairs-of-equal-sides': [0.0, 3.44],
    'P28-05-thats-correct-13-20-33-the-sum-of': [0.0, 1.47, 4.97],
    'P18-02-not-quite-that-is-16-x-12-without': [0.0, 1.52, 4.94],
    'P19-04-not-quite-half-of-30-x-32-is': [0.0, 1.47, 7.25],
    'P28-03-not-quite-that-is-20-10-add-the': [0.0, 1.06, 3.6],
    'P28-04-not-quite-that-is-13-10-add-the': [0.0, 1.47, 3.75],
    'P28-07-not-quite-13-cm-is-the-top-parallel': [0.0, 1.09, 4.69],
    'P28-08-not-quite-20-cm-is-the-bottom-parallel': [0.0, 1.35, 4.79],
    'P17-03-thats-correct-the-first-diagonal-is-16-cm': [0.0, 1.61, 5.19],
    'P19-05-thats-correct-half-x-30-x-d2-240': [0.0, 1.79, 6.59],
    'P17-04-thats-correct-the-second-diagonal-is-12-cm': [0.0, 1.51, 4.77],
    'P18-03-not-quite-that-is-16-12-the-diagonals': [0.0, 1.4, 3.88, 5.58],
    'P20-03-not-quite-that-is-24-15-the-diagonals': [0.0, 1.37, 4.29, 6.21],
    'P23-04-correct-look-at-the-shape-it-has-only': [0.0, 1.01],
    'P30-03-thats-correct-half-of-30-40-x-15': [0.0, 1.23],
    'P19-01-this-rhombus-has-an-area-of-240-sq': [0.0, 5.03],
    'P15-10-both-parts-have-half-x-d1-in-them': [0.0, 2.54],
    'P19-03-not-quite-half-of-30-x-8-is': [0.0, 1.3],
    'P21-02-not-quite-no-diagonals-are-given-here-look': [0.0, 1.52, 3.56],
    'P23-03-a-parallelogram-has-two-pairs-of-parallel-sides': [0.0, 4.73],
    'P25-02-its-parallel-sides-are-a-and-b-and': [0.0, 3.69],
    'P27-04-thats-correct-a-is-8-cm-now-drag': [0.0, 1.24, 3.74],
    'P27-06-thats-correct-b-is-14-cm-now-drag': [0.0, 1.23, 3.95],
    'P30-02-not-quite-that-is-30-x-15-add': [0.0, 1.21, 3.86],
    'P17-02-not-quite-the-two-diagonals-are-written-under': [0.0, 1.55],
    'P18-04-thats-correct-half-of-16-x-12-is': [0.0, 1.73],
    'P20-04-thats-correct-half-of-24-x-15-is': [0.0, 1.59],
    'P21-03-thats-correct-no-diagonals-are-given-so-use': [0.0, 1.45, 3.01],
    'P29-04-thats-correct-half-of-33-x-10-is': [0.0, 1.49],
    'P17-05-not-quite-the-length-written-under-the-shape': [0.0, 1.27],
    'P17-06-not-quite-the-length-written-beside-the-shape': [0.0, 1.33],
    'P20-02-not-quite-that-is-24-x-15-without': [0.0, 1.34],
    'P25-03-let-us-slide-it-across-to-make-room': [0.0, 1.49],
    'P29-02-not-quite-that-is-33-x-10-without': [0.0, 1.19],
    'P30-01-not-quite-that-is-70-x-15-without': [0.0, 1.89],
    'P28-09-thats-correct-the-dotted-perpendicular-height-is-10': [0.0, 1.31],
    'P27-03-not-quite-a-is-the-shorter-parallel-side': [0.0, 1.51],
    'P27-05-not-quite-b-is-the-longer-parallel-side': [0.0, 1.16],
    'P27-08-fill-a-first-then-b-and-then-h': [0.0, 1.51],
    'P24-02-well-done-you-found-all-the-trapeziums': [0.0, 1.2],
    'P24-02-this-shape-has-no-parallel-sides-a-trapezium': [0.0, 2.92],
    'P27-07-not-quite-h-is-the-perpendicular-height': [0.0, 1.03],
    'P27-09-lets-simplify-it-step-by-step': [0.0, 1.31]
  };
  function voCues(text) {
    const stem = voStem(text);
    return (stem && VO_CUES[stem]) || null;
  }
  function voCuesFor(said, pieces) {
    const c = said && said.cues;
    return c && c.length === pieces && c.every(t => t != null) ? c : null;
  }

  /* A line with no clip is typed in silence, as it always was -- but it is
     also named once in the console, so a line whose words drift away from
     its key is found by playing the page rather than by ear. */
  const voMissed = Object.create(null);
  /* the clip a line has, if it has one -- exact words first, then loose */
  function voHas(text) {
    if (VO_PACK) return I18n.voice(text);
    const key = voKey(text);
    return VO_FILE[key] || VO_LOOSE[voLoose(key)] || null;
  }
  function voStem(text) {
    const key = voKey(text);
    const stem = voHas(text);
    if (!stem && !voMissed[key]) {
      voMissed[key] = true;
      const part = voFallback(text);
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('[VO] no clip for: ' + text + (part ? ' (saying "' + part.text + '")' : ''));
      }
    }
    return stem;
  }

  /* A line with no clip of its own whose first sentence has one -- a
     verdict that was never recorded in full, "That's Correct! The base is
     8 cm." -- is not left silent: its first sentence is said, and the rest
     of the line follows on screen once that clip has ended, at the game's
     own pace. The verdict is heard; the reason is read. The pieces the line
     will be shown in are counted here so the clip can be cued to the first
     of them alone (see voSay). */
  function voFallback(text) {
    const cuts = chunkCuts(text);
    if (!cuts.length) return null;
    const first = text.slice(0, cuts[0]).trim();
    return first && voHas(first) ? { text: first, pieces: cuts.length + 1 } : null;
  }

  /* Built on first use and kept: a line said again -- on this page or six
     pages later -- plays the element it played the first time. */
  const voBank = Object.create(null);
  let voNow = null;                    /* the one clip that may be sounding */

  function voFor(text) {
    const key = voKey(text);
    const stem = voStem(text);
    if (!stem) return null;
    /* a language's own clip is named by its whole path (I18n.voice) */
    const bankKey = VO_PACK ? stem : key;
    let a = voBank[bankKey];
    if (!a) {
      a = new Audio(VO_PACK ? stem : VO_DIR + stem + '.webm' + VO_REV);
      a.preload = 'auto';
      voBank[bankKey] = a;
    }
    return a;
  }

  /* Nothing is playing: the typewriter keeps the pace it was given. */
  const VO_SILENT = { audio: null, playing: false, length: 0 };

  /* Start the clip for a line, if this line has one and this is a moment to
     play it. Resolves to what the typewriter needs to pace itself against.
     Silence is never a failure -- muted, skipped, missing, blocked, or the
     scene torn down while the metadata was being read -- and the caller
     simply falls back to its own pace. */
  async function voSay(text) {
    if (fastForward || Motion.isMuted() || typeof text !== 'string') return VO_SILENT;
    let a = voFor(text), part = null;
    if (!a) {
      part = voFallback(text);
      if (!part) return VO_SILENT;
      a = voFor(part.text);
      if (!a) return VO_SILENT;
    }
    const mine = runToken;
    const length = await durationOf(a);
    /* a replay or a jump took the scene down while the header was read: this
       line is nobody's now, and it must not be heard over the new scene */
    if (mine !== runToken || fastForward || Motion.isMuted()) return VO_SILENT;

    silenceNow();                      /* one voice at a time */
    try {
      a.currentTime = 0;
      await a.play();
    } catch (e) {
      /* the browser is holding sound back until it has been asked for once:
         put the tap up, and carry on either way */
      if (!voGesture) return VO_SILENT;
      const got = await voGesture();
      if (mine !== runToken) return VO_SILENT;
      if (!got) return VO_SILENT;
      try { a.currentTime = 0; await a.play(); }
      catch (e2) { return VO_SILENT; }
    }
    voNow = a;
    if (part) {
      /* the clip is the first piece alone: that piece is typed across it,
         and every later piece is cued past the clip's end, so it waits for
         the clip to finish (voiceAt) and then keeps the game's pace */
      const cues = [0];
      while (cues.length < part.pieces) cues.push(length + 1);
      return { audio: a, playing: true, length: length, cues: cues };
    }
    return { audio: a, playing: true, length: length, cues: voCues(text) };
  }

  /* Hold the beat until the clip has finished, so the next line never talks
     over this one. A skip or a teardown releases it like any other wait. */
  function voHold(state) {
    const a = state.audio;
    if (!state.playing || !a || a.ended || a.paused) return Promise.resolve();
    return waitOrSkip(function (done) {
      const end = function () {
        a.removeEventListener('ended', end);
        a.removeEventListener('pause', end);
        done();
      };
      a.addEventListener('ended', end);
      /* A verdict or a nudge takes the voice over mid-sentence -- stopVoice()
         pauses this one. The beat that was waiting on it has to be let go
         here, or it would sit out the whole of the timeout below. */
      a.addEventListener('pause', end);
      setTimeout(end, 15000);          /* never hang on a stalled clip */
    });
  }

  /* A line that is shown all at once rather than typed -- a banner, a nudge,
     a verdict -- still gets its voice. It is not paced against anything, so
     unlike a typed line it can afford to wait its turn, and it does: a line
     queued behind one still being said follows it rather than talking over it.
     (A typed line still barges in: its clip has to start when its first word
     does, or the two would not be the same sentence any more.)
     The hold comes back, so the caller may wait for the line to be said or
     let it run on under whatever happens next. */
  let voQueue = Promise.resolve();
  let voRound = 0;                     /* bumped when the queue is emptied */
  function voAlone(text, onStart) {
    const mine = voRound;
    voQueue = voQueue.catch(() => {}).then(function () {
      /* the scene went down, or was skipped, while this line waited its
         turn: it belongs to nobody now and is simply dropped */
      if (mine !== voRound) { if (onStart) onStart(VO_SILENT); return; }
      return voSay(text).then(function (st) {
        if (onStart) onStart(st);        /* the pieces on screen follow it */
        return voHold(st);
      }, function () { if (onStart) onStart(VO_SILENT); });
    });
    return voQueue;
  }
  /* A line laid in whole and spoken over, a piece at a time: the words of
     each piece appear as the voice reaches them. Resolves once the line has
     been said and its last piece is on screen. */
  function sayPieces(el, text, onPiece) {
    let begin;
    const started = new Promise(res => { begin = res; });
    const said = voAlone(text, begin);
    const shown = showPieces(el, text, started, onPiece);
    return wordsSettle().then(() => Promise.all([said, shown]));
  }

  /* The clips the mission opens with: the greeting, the shapes and the two
     warm-up briefings. These four the loading bar waits for, so the first
     line is never typed against a clip that has not arrived. */
  /* in the language on screen, as every lookup is (voKey, I18n.voice) */
  const VO_OPENING = [T('p01Hey'), T('p01WarmUp'), T('p02Shapes'), T('p02DragNames')];

  /* The rest are fetched behind the mission once it is running -- a few at a
     time, so a hundred requests never queue in front of the one clip the
     scene on screen is waiting for. A clip that has not arrived by the time
     its line is typed is not a problem: durationOf() reports nothing, and
     the line types at its own pace instead. */
  function warmVoices() {
    /* a language's own clips: the lines that are said (feedback and the
       pages' lines), not the buttons and labels that were recorded too */
    const rest = VO_PACK
      ? I18n.voiceTexts(/^(fb|p\d)/).filter(t => VO_OPENING.indexOf(t) < 0)
      : Object.keys(VO_FILE).filter(k => VO_OPENING.every(t => voKey(t) !== k));
    let at = 0;
    (function next() {
      if (at >= rest.length) return;
      const batch = rest.slice(at, at + 4).map(k => voFor(k));
      at += 4;
      Promise.all(batch.map(preloadAudio)).then(next);
    })();
  }

  /* ---------- the one gesture the browser wants ----------
   * A page that has not been touched yet is not allowed to make a sound, so
   * the first clip that is refused puts up the tap and waits for it. It is
   * asked for once: if the learner does not take it, the mission plays on in
   * silence rather than standing there. */
  let voAsked = false;
  function voGesture() {
    if (voAsked) return Promise.resolve(false);
    voAsked = true;
    tapStart.hidden = false;
    return new Promise(function (resolve) {
      tapStart.querySelector('.tap-start-btn')
        .addEventListener('click', function () { tapStart.hidden = true; resolve(true); }, { once: true });
    });
  }


  /* ---------- hold the layout still ----------
   * Nothing that appears or disappears may move the shapes, so every box that
   * could otherwise resize is pinned:
   *   - the prompt reserves its final width with a hidden ghost (HTML/CSS)
   *   - both rounds' slots exist from the first frame (HTML)
   *   - round 2's deck is laid over round 1's (CSS), and the console band keeps
   *     the height of a full row even after the last chip has been docked
   *   - Swiftee is out of the flow entirely (CSS)
   */
  function lockTrayHeight() {
    if (board.classList.contains('sec2')) return;   /* the decks are gone: the band is the shapes' */
    const home = allChips.filter(c => c.parentElement === trays[1] || c.parentElement === trays[2]);
    if (!home.length) return;                 /* nothing left to measure from */
    const cs = getComputedStyle(trayArea);
    const pad = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    const tall = home.reduce((m, c) => Math.max(m, c.getBoundingClientRect().height), 0);
    if (tall) trayArea.style.minHeight = (tall + pad) + 'px';
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(lockTrayHeight, 160);
  });

  /* ---------- input lock ---------- */
  let interactive = false;

  function lockInput(on, keep) {
    interactive = !on;
    inputLock.classList.toggle('on', !!on);
    /* Unlocking is the hand-over: Swiftee has finished saying its piece and
       the board is the learner's now, so the heading stands down (see
       headingAside). `keep` is for the one unlock that is not a question --
       the Next button. */
    if (!on && !keep) headingAside();
  }
  lockInput(true);

  /* ---------- skip ----------
   * A scene is skipped by fast-forwarding it, never by abandoning it: waits
   * collapse, animations are finished frame by frame, the narration is left
   * unplayed and a round waiting on the learner is filled in. The scene
   * therefore runs its own choreography through to the end and hands over
   * exactly as it always does, so no scene needs a second, "instant" path --
   * and none of them can be left half-built by a skip.
   *
   * A skip stops at the scene's own boundary, so Skip reads as "take me to the
   * end of this bit" rather than "take me somewhere else": the learner is
   * handed the same Next button they would have reached by playing it.
   */
  const backBtn   = document.getElementById('backBtn');
  const skipBtn   = document.getElementById('skipBtn');
  const resetBtn  = document.getElementById('resetBtn');
  const muteBtn   = document.getElementById('muteBtn');
  const jump      = document.getElementById('jump');
  const jumpBtn   = document.getElementById('jumpBtn');
  const jumpMenu  = document.getElementById('jumpMenu');
  const jumpLabel = document.getElementById('jumpLabel');

  /* Bumped when a scene opens and again when one reaches its hand-off. The
     scene in play is state rather than something read off a call stack: the
     chain is driven partly by the learner, since the drop that completes a
     round carries the game into the next scene by itself. */
  let sceneSeq = 0;

  /* the Next the mission is waiting on, if it is waiting on one */
  let pendingNext = null;

  /* How to re-enter the scene in play, so Replay runs the same code that
     played it the first time rather than a second, "from the top" path. */
  let sceneAgain = null;
  let replaying = false;

  /* ---------- the mission, in order ----------
   * The scenes chain by calling one another, which says what follows what but
   * never lays the whole running order out in one place. The jump menu needs
   * exactly that, so here it is -- and the menu is built from it, so the two
   * cannot drift apart.
   *
   * The entries are function declarations, so they are all hoisted and defined
   * by the time this array is evaluated, however far down the file they sit. */
  const MISSION = [
    { entry: sceneIntro,        name: T('secWelcome') },
    { entry: sceneWarmUp,       name: T('secWarmUp') },
    { entry: sectionTwo,        name: T('secTriangles') },
    { entry: sectionThree,      name: T('secQuadOneDiagonal') },
    { entry: sectionThreeAgain, name: T('secQuadOtherDiagonal') },
    { entry: sectionFive,       name: T('secQuadYourGo') },
    { entry: specialIntro,      name: T('secAsideSpecial') },
    { entry: paraSection,       name: T('secParaSides') },
    { entry: paraArea,          name: T('secParaArea') },
    { entry: paraAreaQuestion,  name: T('secParaFormula') },
    { entry: paraCheck,         name: T('secParaYourGo') },
    { entry: paraAside,         name: T('secAsideRhombus') },
    { entry: rhombusSection,    name: T('secRhomSides') },
    /* the quiz that stood here -- which of two formulas is each half's
       area -- was cut (user, 2026-09-29): Next on the rhombus's sides goes
       straight to its area, worked the way page 4 works the quadrilateral's */
    { entry: rhombusArea,       name: T('secRhomArea') },
    { entry: rhombusNumbers,    name: T('secRhomNumbers') },
    { entry: rhombusPractice1,  name: T('secRhomPractice1') },
    { entry: rhombusPractice2,  name: T('secRhomPractice2') },
    { entry: rhombusPractice3,  name: T('secRhomPractice3') },
    { entry: rhombusPractice4,  name: T('secRhomPractice4') },
    { entry: rhombusAside,      name: T('secAsideTrapezium') },
    { entry: trapSection,       name: T('secTrapName') },
    { entry: trapSelect,        name: T('secTrapPick') },
    { entry: scalArea,          name: T('secTrapArea') },
    { entry: scalHalf,          name: T('secTrapFormula') },
    /* the step-by-step working used to be a scene of its own here
       (trapSteps); it is now the tail of the values scene, on the same
       board, so there is one entry rather than two */
    { entry: trapNumbers,       name: T('secTrapValues') },
    { entry: trapPractice1,     name: T('secTrapPractice1') },
    { entry: trapPractice2,     name: T('secTrapPractice2') },
    { entry: trapPractice3,     name: T('secTrapPractice3') }
  ];

  /* where we are in that order, and the stage every scene we have opened was
     opened on -- which is what lets one be gone back to exactly */
  let sceneIndex = -1;
  let jumping = false;
  const sceneOpened = new Map();

  /* The scenes played so far, most recent last: { entry, stage }.
     `stage` is what the board looked like as the scene opened -- which is to
     say, what the scene before it left behind. Recording it is what makes Back
     possible: a scene's own code sets up its own stage, but only some scenes
     do (section 4 inherits the quadrilateral stage from section 3 and takes it
     as given), so where a scene starts from cannot be worked out from the
     scene alone. Taking the snapshot at the door is exact for all of them. */
  const sceneHistory = [];

  const TOOLS = [backBtn, skipBtn, muteBtn, resetBtn];

  /* ---------- sound off ----------
   * motion.js holds the state and remembers it between sittings; this is only
   * the switch. It is never disabled with the other tools -- a learner who
   * wants the sound off wants it off now, including in the middle of a scene
   * that has taken the board away from them. */
  function showMute() {
    const off = Motion.isMuted();
    muteBtn.classList.toggle('muted', off);
    muteBtn.setAttribute('aria-pressed', off ? 'true' : 'false');
    const label = off ? T('soundOn') : T('soundOff');
    muteBtn.setAttribute('aria-label', label);
    muteBtn.setAttribute('title', label);
  }
  muteBtn.addEventListener('click', function () {
    Motion.toggleMuted();
    showMute();
    /* A learner who turns the sound off wants THIS sentence to stop, not the
       next one: the line being spoken is cut where it stands, and the beat
       waiting on it is let go by the pause (see voHold). */
    if (Motion.isMuted()) stopVoice();
    sfx('click', .4);        /* silent when it has just been turned off */
  });
  showMute();

  function showTools() {
    TOOLS.forEach(function (b) {
      b.hidden = false;
      void b.offsetHeight;
      b.classList.add('in');
    });
    showJump();
  }

  /* Which tools are any use right now. Replay needs somewhere to go back to
     in the scene itself; Back needs a scene behind this one. */
  function armTools() {
    resetBtn.disabled = !sceneAgain;
    backBtn.disabled = sceneHistory.length < 2;
    muteBtn.disabled = false;         /* always available, see showMute above */
  }

  /* The tools stay up from the first scene to the last, the hand-offs
     included: with a Next waiting, Skip still means "move on", Replay still
     means "play that again" and Back still means "go back", so there is
     nothing to be gained by taking them away at exactly the moment a learner
     might want one.
     `again` is the scene's own re-entry point; a scene that passes none cannot
     be replayed, and Replay stays down for it. */
  function sceneStart(again) {
    headStay = false;   /* only the warm-up holds the heading; it sets this itself */
    birdStay = false;   /* ...and the trapezium pages hold the bird wherever it stands (holdBird) */
    sceneSeq++;
    noteScene(again, stageNow());
    showTools();
    armTools();
  }

  /* Where we are, and what the board looked like when we got here.
     The history is kept as a path through the mission rather than a browser
     trail: arriving somewhere we have already been truncates back to it, so
     Back always means the section before this one. That also makes a replay a
     no-op on the history, since it finds itself already on the end. */
  function noteScene(entry, stage) {
    sceneAgain = entry || null;
    if (!entry) return;

    sceneIndex = MISSION.findIndex(function (m) { return m.entry === entry; });
    sceneOpened.set(entry, stage);

    const at = sceneHistory.findIndex(function (h) { return h.entry === entry; });
    if (at !== -1) sceneHistory.length = at + 1;
    else sceneHistory.push({ entry: entry, stage: stage });

    markJump();
  }

  /* A scene has reached its hand-off. Only the counter moves, which is what
     stops a skip that is still running; the tools stay where they are. */
  function sceneEnd() { sceneSeq++; }

  /* Waits that hang on an event rather than a clock -- so far, a voice-over
     running to its end. A skip resolves them at once. */
  const skipWaiters = new Set();

  function waitOrSkip(register) {
    return new Promise(function (resolve, reject) {
      const mine = runToken;
      /* released by a teardown rather than by what it was waiting for: the
         scene is gone, so the frame unwinds instead of running on */
      const done = function () {
        skipWaiters.delete(done);
        if (mine !== runToken) reject(CANCELLED); else resolve();
      };
      skipWaiters.add(done);
      register(done);
    });
  }

  function releaseWaiters() {
    Array.from(skipWaiters).forEach(function (done) {
      try { done(); } catch (e) { /* already gone */ }
    });
  }

  /* Web Animations run off the clock, not through wait(), so they are finished
     every frame for as long as the skip lasts -- which also catches the ones a
     scene creates while it unwinds. Endless ones (the caret's blink, a
     button's pulse) are left alone: finish() throws on them. */
  function flushAnimations() {
    /* the same for GSAP: everything motion.js has in the air lands where it
       was going, and anything started after this is built at nothing-length */
    Motion.skip();
    document.getAnimations().forEach(function (a) {
      const timing = a.effect && a.effect.getComputedTiming();
      if (!timing || timing.iterations === Infinity) return;
      try { a.finish(); } catch (e) { /* not finishable; leave it running */ }
    });
  }

  /* Stop the line that is sounding, and nothing else: this is one line
     handing the voice to the next, not the end of the talking. */
  function silenceNow() {
    if (voNow) {
      try { voNow.pause(); voNow.currentTime = 0; } catch (e) { /* nothing to stop */ }
      voNow = null;
    }
  }

  /* ...and this is the end of it: a skip, a jump, a replay or the sound
     being switched off. What is sounding stops, and the lines that were
     waiting their turn behind it are dropped rather than said later, over a
     scene that has moved on. */
  function stopVoice() {
    voRound++;
    silenceNow();
  }

  /* A scene waiting on the learner for something other than a round -- a
     drop-down, the diagonal -- leaves a way to answer it here, and a skip
     runs them all. */
  const skipFills = new Set();

  /* Waits that hang on the scene's own furniture rather than on a clock: the
     Next button, a corner join. A skip must NOT resolve these -- it stops at
     the Next button by design -- but a teardown has to, or the abandoned
     frame sits there for the rest of the session instead of unwinding at its
     next wait(). */
  const sceneWaiters = new Set();

  function waitForScene(register) {
    return new Promise(function (resolve, reject) {
      const mine = runToken;
      /* Resolving on a teardown would let the frame carry on -- past its
         Next and into the scene after, alongside the replay. Rejecting
         unwinds it instead, the way a retired wait() does. */
      const done = function () {
        sceneWaiters.delete(done);
        if (mine !== runToken) reject(CANCELLED); else resolve();
      };
      sceneWaiters.add(done);
      register(done);
    });
  }

  /* An animation's end, for a scene: a replay cancels the animation, which
     rejects .finished; that is caught here and the token decides what it
     meant. A retired scene throws CANCELLED and unwinds; a live one, whose
     animation was cancelled for its own reasons, carries on. */
  async function finished(a) {
    const mine = runToken;
    try { await a.finished; } catch (e) { /* cancelled: see below */ }
    if (mine !== runToken) throw CANCELLED;
  }
  const retired = function (mine) { if (mine !== runToken) throw CANCELLED; };

  /* A round waiting on the learner would stall a skip forever, so the answers
     go in for them -- no coaching, no confetti out of the cards, no chime. */
  const roundWaiting = function () {
    return interactive && round > 0 && !roundDone && roundSlots.length > 0;
  };

  function fillRound() {
    roundSlots.forEach(function (slot) {
      if (slot.classList.contains('filled')) return;
      const chip = roundChips.find(function (c) {
        return c.dataset.word === slot.dataset.accept && !c.disabled;
      });
      if (chip) dock(chip, slot, false);
    });
    if (roundSlots.every(function (s) { return s.classList.contains('filled'); })) {
      feedback(FEEDBACK.done);
      finishRound();
    }
  }

  async function skipScene() {
    if (fastForward) return;

    /* At a hand-off the scene is already over and the mission is waiting on
       the Next button, so there is no choreography left to race through: Skip
       means the same thing the learner means by pressing it. */
    if (pendingNext) { pendingNext.click(); return; }

    const from = sceneSeq;

    const token = runToken;

    fastForward = true;
    skipBtn.disabled = true;
    stopVoice();

    /* Never spin forever: if a scene ends up waiting on something a skip
       cannot reach, hand the game back at normal speed rather than leaving it
       stuck in fast-forward. A replay retires the token, which drops the skip
       at once rather than letting it fast-forward the fresh scene too. */
    const deadline = performance.now() + 8000;
    while (sceneSeq === from && runToken === token && performance.now() < deadline) {
      flushAnimations();
      releaseWaiters();
      if (roundWaiting()) fillRound();
      Array.from(skipFills).forEach(function (fill) { skipFills.delete(fill); fill(); });
      await new Promise(function (r) { requestAnimationFrame(r); });
    }
    flushAnimations();

    fastForward = false;
    skipBtn.disabled = false;
  }

  skipBtn.addEventListener('click', skipScene);

  /* ---------- replay ----------
   * The scene's furniture is put back to how the page was parsed, and its own
   * re-entry function is called again.
   *
   * What "put back" means is taken from the page rather than from each scene:
   * the class list and the child nodes of everything inside a scene container
   * are snapshotted at load, so restoring them undoes in one sweep every class
   * a scene turned on and removes everything it built for itself -- without
   * eight scenes each having to remember their own list, and without going
   * stale as the mission grows.
   *
   * The board itself, Swiftee and the mission chrome are left alone: Replay
   * re-enters one scene, not the whole mission.
   */
  const SCENE_ROOTS = ['bay', 'trayArea', 'lesson', 'quad', 'para', 'rhom', 'trap', 'rtrap', 'intro']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  const pristineClass = new Map();
  const bornWith = new Set();

  SCENE_ROOTS.forEach(function (root) {
    bornWith.add(root);
    root.querySelectorAll('*').forEach(function (el) {
      bornWith.add(el);
      pristineClass.set(el, el.getAttribute('class') || '');
    });
  });

  /* The inline properties the scenes park on things: hop offsets, the centred
     first triangle, a bubble mid-resize, a docked card's hidden state. Cleared
     one property at a time rather than by dropping the style attribute, so the
     sprite sheet custom properties on the mascots survive. */
  const PARKED = ['transform', 'opacity', 'width', 'height', 'left', 'top',
                  'right', 'bottom', 'max-height',
                  'visibility', 'transition', 'min-height', 'will-change'];

  function clearStage() {
    /* let go of anything blocked on the scene's own furniture, so its frame
       unwinds at its next wait() instead of waiting for a click that will
       never come */
    Array.from(sceneWaiters).forEach(function (done) {
      try { done(); } catch (e) { /* already gone */ }
    });
    sceneWaiters.clear();
    skipFills.clear();
    releaseWaiters();
    stopVoice();
    if (nextCtl) { nextCtl.abort(); nextCtl = null; }

    /* drop every animation still holding a forwards fill -- the two
       stand-ins that carry the bird between spots included, since they sit
       outside the stage and a hop cut short would leave one of them up */
    [document.querySelector('.stage'), intro, hopper, flyer].forEach(function (root) {
      if (!root || !root.getAnimations) return;
      root.getAnimations({ subtree: true }).forEach(function (a) {
        try { a.cancel(); } catch (e) { /* already done with */ }
      });
    });
    hopper.classList.remove('on');
    flyer.classList.remove('on');
    birdTrip = [];                     /* nothing is in the air any more */

    /* an expression held open for a line that will not finish */
    swiftee.release();

    /* a card taken to the middle of the board for its explanation: the layer
       it sits on is outside the scene containers, so it is put away by hand */
    closeZoom();

    /* a card mid-drag rides on a copy pinned to the body */
    Array.from(document.body.children).forEach(function (el) {
      if (el.classList && el.classList.contains('chip') && el.classList.contains('ghost')) el.remove();
    });

    SCENE_ROOTS.forEach(function (root) {
      /* whatever the scene built for itself goes away again; taking only the
         top of each built subtree, since removing it takes its children too */
      Array.from(root.querySelectorAll('*')).forEach(function (el) {
        if (!bornWith.has(el) && bornWith.has(el.parentNode)) el.remove();
      });
      Array.from(root.querySelectorAll('*')).concat(root).forEach(function (el) {
        PARKED.forEach(function (prop) { el.style.removeProperty(prop); });
      });
    });

    /* and the classes it turned on -- the containers themselves excepted,
       since whether one is on screen at all was decided by an earlier scene
       and the scene being replayed takes it as given */
    pristineClass.forEach(function (cls, el) {
      if (cls) el.setAttribute('class', cls);
      else el.removeAttribute('class');
    });

    /* the cards go home, and the round they belonged to is forgotten */
    allChips.forEach(function (chip) {
      const home = trays[chip.dataset.round];
      if (home) home.appendChild(chip);
      chip.disabled = false;
      chip.style.removeProperty('visibility');
    });
    round = 0;
    roundSlots = [];
    roundChips = [];
    wrongInRound = 0;
    autoScheduled = false;
    roundDone = false;
    drag = null;
    picked = null;
    trayArea.style.removeProperty('min-height');

    /* every typewriter on the board, the heading included */
    feedbackGen++;
    document.querySelectorAll('.type .txt').forEach(function (t) { t.textContent = ''; });
    document.querySelectorAll('.type .caret').forEach(function (c) { c.hidden = true; });

    /* and every answer left in a drop-down written in the HTML: the class
       reset above puts the slot back to empty and dashed, so a value still
       sitting in it would read as an answer the learner never gave -- and
       would hide the box's "Tap here" */
    document.querySelectorAll('.dd-value').forEach(function (v) { v.textContent = ''; });

    /* neither Next belongs to the scene being replayed */
    pendingNext = null;
    [nextBtn, nextBtnFree].forEach(function (b) {
      if (!b) return;
      b.hidden = true;
      b.classList.remove('in', 'out');
    });

    board.classList.remove('cheer');
    fx.textContent = '';                  /* confetti still on the way down */
  }

  /* Which stage is on the board: which of the scene containers are up, and
     the board's own class, which is what decides between them. */
  const MASCOT_SPOTS = Array.from(document.querySelectorAll('.mascot'));

  function stageNow() {
    return {
      /* less the cheer: a round's celebration is still on the board when a
         skip carries the mission into the next scene, and a replay of that
         scene should not bring it back to stay */
      board: (board.getAttribute('class') || '').split(/\s+/).filter(function (c) { return c && c !== 'cheer'; }).join(' '),
      roots: SCENE_ROOTS.map(function (r) {
        return { cls: r.getAttribute('class') || '', aria: r.getAttribute('aria-hidden') };
      })
    };
  }

  function restoreStage(stage) {
    board.setAttribute('class', stage.board);
    SCENE_ROOTS.forEach(function (r, i) {
      const was = stage.roots[i];
      if (was.cls) r.setAttribute('class', was.cls); else r.removeAttribute('class');
      if (was.aria === null) r.removeAttribute('aria-hidden');
      else r.setAttribute('aria-hidden', was.aria);
    });
    /* Swiftee is never handed to a scene already standing on the board: a
       re-entry empties every typewriter, the heading included, and a bird put
       back on its spot here would stand beside an empty heading until the
       scene's first line. It waits behind the board instead and comes up with
       that line, exactly as it does the first time through. */
    MASCOT_SPOTS.forEach(function (m) { m.classList.remove('in'); });
  }

  /* Re-enter a scene on the stage it originally opened on. Both tools that go
     somewhere -- Replay and Back -- are this, and only differ in which scene
     they hand it. */
  async function enterScene(entry, stage) {
    replaying = true;
    TOOLS.forEach(function (b) { b.disabled = true; });
    muteBtn.disabled = false;         /* the sound switch is never taken away */
    fastForward = false;
    lockInput(true);

    runToken++;                           /* retire the scene that is running */
    Motion.retire();                      /* and kill what it had in the air */
    clearStage();
    restoreStage(stage);
    lockTrayHeight();

    /* one turn of the loop, so the retired chain has rejected and unwound
       before the fresh one starts writing to the same board */
    await new Promise(function (r) { setTimeout(r, 0); });

    /* Unwinding is itself code: a frame let go of runs on to its next await,
       and whatever it started on the way -- a wait, an animation -- was
       stamped with the token the fresh scene was about to run under. Retire
       once more, so those belong to nobody either, and put the stage back a
       second time for anything they wrote while they had the chance. */
    runToken++;
    Motion.retire();
    clearStage();
    restoreStage(stage);

    replaying = false;
    noteScene(entry, stage);
    skipBtn.disabled = false;
    armTools();

    /* not awaited: a scene runs on past its own function, carried by the
       learner's answers, so there is nothing here to wait for */
    entry().catch(function (e) { if (e !== CANCELLED) throw e; });
  }

  async function replayScene() {
    if (replaying || !sceneHistory.length) return;
    const here = sceneHistory[sceneHistory.length - 1];
    resetBtn.classList.add('working');
    await enterScene(here.entry, here.stage);
    resetBtn.classList.remove('working');
  }

  async function backScene() {
    if (replaying || sceneHistory.length < 2) return;
    sceneHistory.pop();                   /* step out of the scene we are in */
    const prev = sceneHistory[sceneHistory.length - 1];
    backBtn.classList.add('working');
    await enterScene(prev.entry, prev.stage);
    backBtn.classList.remove('working');
  }

  resetBtn.addEventListener('click', replayScene);
  backBtn.addEventListener('click', backScene);

  /* ---------- jump to a section ----------
   * Behind us, a scene can be entered outright: it has been played, so the
   * stage it opens on was recorded on the way through.
   *
   * Ahead of us there is no such record -- and it could not simply be guessed,
   * because a scene's stage is mostly built by the scenes before it (section 4
   * inherits the quadrilateral from section 3 and takes it as given). So going
   * forward is a run of skips, one hand-off at a time: every scene in between
   * actually plays, which both leaves the board in a state its own code built
   * and records each stage on the way, so coming back afterwards is exact.
   */
  MISSION.forEach(function (m, i) {
    const opt = document.createElement('button');
    opt.type = 'button';
    opt.className = 'jump-opt';
    opt.setAttribute('role', 'option');
    opt.dataset.i = String(i);
    opt.innerHTML = '<span class="jump-n"></span><span class="jump-name"></span>';
    opt.querySelector('.jump-n').textContent = String(i + 1);
    opt.querySelector('.jump-name').textContent = m.name;
    opt.addEventListener('click', function (e) {
      e.stopPropagation();
      openJump(false);
      jumpTo(i);
    });
    jumpMenu.appendChild(opt);
  });

  const jumpOpts = Array.from(jumpMenu.querySelectorAll('.jump-opt'));

  /* the button says where we are; the list says which one that is, and which
     of them would have to be played through to reach */
  function markJump() {
    const here = MISSION[sceneIndex];
    jumpLabel.textContent = here ? here.name : T('jumpLabel');
    jumpOpts.forEach(function (opt, i) {
      opt.setAttribute('aria-selected', i === sceneIndex ? 'true' : 'false');
      opt.classList.toggle('ahead', i > sceneIndex);
    });
  }

  function openJump(on) {
    jump.classList.toggle('open', !!on);
    jumpBtn.setAttribute('aria-expanded', on ? 'true' : 'false');
    if (on) jumpOpts[Math.max(0, sceneIndex)].scrollIntoView({ block: 'nearest' });
  }

  function showJump() {
    jump.hidden = false;
    void jump.offsetHeight;
    jump.classList.add('in');
  }

  jumpBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (jumping || replaying) return;
    const was = jump.classList.contains('open');
    closeMenus();                     /* a quiz drop-down must not stay open under it */
    openJump(!was);
    sfx('click', .4);
  });

  /* anywhere else, and Escape, closes it -- the quiz drop-downs already do
     the same, on the same two events */
  document.addEventListener('click', function () { openJump(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') openJump(false);
  });

  async function jumpTo(i) {
    if (jumping || replaying || !MISSION[i]) return;
    const entry = MISSION[i].entry;

    /* the scene in play: the same thing Replay means */
    if (i === sceneIndex) return replayScene();

    /* behind us, so the stage it opens on is known */
    if (i < sceneIndex) {
      const stage = sceneOpened.get(entry);
      if (stage) return enterScene(entry, stage);
    }

    /* ahead: play through what is in between, as fast as Skip can */
    jumping = true;
    jumpBtn.disabled = true;
    jumpBtn.classList.add('working');
    TOOLS.forEach(function (b) { b.disabled = true; });
    muteBtn.disabled = false;         /* the sound switch is never taken away */

    const guard = performance.now() + 180000;
    let quiet = 0;

    while (sceneIndex < i && sceneIndex !== -1 && performance.now() < guard) {
      const atScene = sceneIndex;
      const atSeq = sceneSeq;

      /* A skip has a watchdog of its own and hands the game back if a scene is
         long, so one is not always enough to reach a hand-off -- which is why
         this keeps going rather than reading a single skip as the end of the
         road. */
      await skipScene();
      if (pendingNext) await skipScene();     /* at the hand-off: take it */

      /* Taking a hand-off only resolves the wait the scene was sitting on; the
         next scene opens a beat later, of its own accord. Give it that beat,
         or the jump reads its own success as a stall. */
      const settle = performance.now() + 3000;
      while (sceneIndex === atScene && performance.now() < settle) {
        await new Promise(function (r) { requestAnimationFrame(r); });
      }

      /* Neither the scene nor the mission moved: let a few of those pass,
         since a long scene makes no visible progress between skips, then give
         up rather than spin to the guard. */
      if (sceneIndex === atScene && sceneSeq === atSeq) {
        if (++quiet >= 6) break;
      } else {
        quiet = 0;
      }
    }

    jumping = false;
    jumpBtn.disabled = false;
    jumpBtn.classList.remove('working');
    skipBtn.disabled = false;
    armTools();
  }

  /* ---------- opening: draw each shape, then pour the colour in ---------- */
  /* `lineMs`/`fillMs` let a scene draw slower than the mission's usual pace
     -- the values scene opens on the trapezium drawing itself and nothing
     else, so it takes its time over it */
  async function revealShape(shape, lineMs, fillMs) {
    const svg     = shape.querySelector('svg');
    const outline = shape.querySelector('.shape-outline');
    const fill    = shape.querySelector('.shape-fill');
    const wipe    = shape.querySelector('.wipe');

    let len = 4000;
    try { len = outline.getTotalLength() || len; } catch (e) { /* keep guard */ }
    outline.style.strokeDasharray = len;
    outline.style.strokeDashoffset = len;

    if (REDUCED) {
      outline.style.strokeDashoffset = 0;
      fill.style.opacity = 1;
      await wait(120);
      return;
    }

    /* a replay cancels whatever a scene left running, and a cancelled
       animation rejects; the scene is being torn down either way */
    await finished(outline.animate(
      [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
      { duration: lineMs || 760, easing: 'cubic-bezier(.5,0,.2,1)', fill: 'forwards' }
    ));
    outline.style.strokeDashoffset = 0;

    /* the clip rect slides up from below the artwork, so the colour reads as
       rising into the outline rather than simply switching on */
    const h = (svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.height) || 200;
    fill.style.opacity = 1;
    await finished(wipe.animate(
      [{ transform: 'translateY(' + h + 'px)' }, { transform: 'translateY(0px)' }],
      { duration: fillMs || 560, easing: 'cubic-bezier(.35,0,.25,1)', fill: 'forwards' }
    ));
  }

  /* ---------- typewriter ----------
   * Paced against a wall clock rather than a chain of timeouts, so a slow
   * frame costs nothing: the line always lands on time. */
  async function typeInto(txt, blink, text, totalMs) {
    await speakerUp(txt);
    /* the clip starts as the first word lands, and the line is typed across
       it a piece at a time: see voSay/typePieces/voHold */
    const said = await voSay(text);
    blink.hidden = true;
    await typePieces(txt, [{ t: text }], said, totalMs / Math.max(1, text.length), 0, null, null);
    await voHold(said);
    speakerDone(txt);
  }
  const typewrite = (text, totalMs) => { promptLine(text); return typeInto(promptTxt, caret, text, totalMs); };

  /* The heading's box is the line it shows, so Swiftee -- inside the same
     box -- stands right at the left end of the words wherever they centre. */
  function promptReserve(text) {
    /* lines never wrap and the row is as tall as Swiftee: there is nothing
       to reserve any more, the ghost simply starts the scene empty */
    promptGhost.textContent = '';
  }
  /* a ghost is built the way its live line is -- a span per word -- so the
     two lay out identically; a plain run can differ by a hair and wrap */
  /* bumped each time a line is staged: a wipe ordered before the staging
     (see headingDown) sees the count has moved on and leaves it alone */
  let promptStage = 0;
  const promptLine = text => { promptStage++; wordSpans(promptGhost, longestChunk(text)); };

  /* ---------- feedback in the heading ----------
   * Swiftee's reaction to a drop is not written anywhere on the board: the
   * heading keeps its instruction, and the answer is acknowledged by the
   * bird's own expression, the sound, and the chip's landing. The texts are
   * kept for the screen reader, which is told them through the live tag. */
  /* No "Try again" (user, 2026-09-30): a wrong answer is met by the sound,
     the shake, and -- wherever the page has one -- Swiftee's own sentence
     saying what is wrong, never by a stock line spoken over it. */
  const FEEDBACK = {
    right: T('fbCorrect'),
    done:  T('fbWellDone'),
    /* the bank's "Not quite!" (FB-04) -- not "Try again" -- for a page whose
       wrong answer has no sentence of its own, said and never typed */
    wrong: T('fbNotQuite')
  };
  let feedbackGen = 0;

  const quip = document.getElementById('quip');
  async function feedback(text, silent) {
    feedbackGen++;
    caret.hidden = true;
    quip.textContent = text;          /* announced, never shown */
    /* ...and spoken. Not waited for: the next chip may be on its way
       already, and a verdict that held the board up would be in the way.
       `silent`: the caller is about to say a sentence of its own that
       carries the verdict ("That's Correct! The base is 8 cm."), and a
       typed line barges in on whatever is sounding (voSay) -- so the
       generic clip is not started, or the two would cut each other off. */
    if (!silent) voAlone(text).catch(() => {});
  }

  /* ---------- a hint waits for the learner to stall ----------
   * A hand or ghost that shows what to do is for a learner who is stuck, not
   * one who is already reaching for the answer: every nudge waits until
   * NUDGE_IDLE has passed with no input at all, and waits again before it
   * repeats (review, 2026-09-25: after 6 seconds of inactivity, not from the
   * beginning). Any pointer or key counts as activity. */
  const NUDGE_IDLE = 6000;
  let lastInput = 0;
  ['pointerdown', 'pointermove', 'keydown', 'wheel'].forEach(t =>
    window.addEventListener(t, () => { lastInput = performance.now(); }, { passive: true, capture: true }));
  async function idleFor(signal, ms) {
    ms = ms || NUDGE_IDLE;
    const start = performance.now();
    while (!signal.done && !fastForward) {
      const idle = performance.now() - Math.max(lastInput, start);
      if (idle >= ms) return;
      await wait(Math.min(250, ms - idle));
    }
  }

  /* ---------- the ghost chip that demonstrates the drag ----------
   * opts.once skips the idle wait and plays a single pass right away -- used
   * right after the round's line is said, so every learner has seen the
   * motion before ever being asked to try it themselves. Without it, the
   * loop below waits for the learner to sit idle first, the way the
   * stuck-learner nudges elsewhere in the mission do. */
  function demoDrag(signal, opts) {
    const slot = roundSlots[0];
    const chip = roundChips.find(c => c.dataset.word === slot.dataset.accept);
    if (!chip) return Promise.resolve();

    /* one pass lasts `ms` (2100 by default); every beat in it scales with it */
    const ms = (opts && opts.ms) || 2100;

    async function pass() {
      const from = chip.getBoundingClientRect();
      const to   = slot.getBoundingClientRect();
      if (!from.width || !to.width) return;

      const ghost = flattenGhost(chip.cloneNode(true));
      ghost.className = 'chip demo-ghost' + (chip.classList.contains('formula') ? ' formula' : '');
      ghost.disabled = true;
      Object.assign(ghost.style, {
        left: from.left + 'px',
        top: from.top + 'px',
        width: from.width + 'px',
        height: from.height + 'px',
        margin: '0'
      });
      fx.appendChild(ghost);

      const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
      const dy = (to.top + to.height / 2) - (from.top + from.height / 2);

      const anim = ghost.animate([
        { transform: 'translate(0,0) scale(.96)', opacity: 0 },
        { transform: 'translate(0,0) scale(1.06)', opacity: .55, offset: .14 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(1)', opacity: .55, offset: .74 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(1)', opacity: .55, offset: .88 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.96)', opacity: 0 }
      ], { duration: ms, easing: 'cubic-bezier(.35,.05,.25,1)' });

      signal.anim = anim;
      const glow = setTimeout(() => slot.classList.add('over'), ms * .69);

      const mine = runToken;
      try { await anim.finished; } catch (e) { /* cancelled */ }
      clearTimeout(glow);
      if (!slot.classList.contains('filled')) slot.classList.remove('over');
      ghost.remove();
      signal.anim = null;
      retired(mine);
    }

    if (opts && opts.once) {
      return (async () => {
        if (signal.done || fastForward) return;
        await pass();
      })();
    }

    return (async () => {
      while (!signal.done) {
        await idleFor(signal);
        if (signal.done || fastForward) break;
        await pass();
      }
    })();
  }

  /* ---------- briefing ----------
   * The prompt is the board's heading and it is never taken away: it is wiped
   * back to empty, typed out again for the new round, and then left alone. */
  async function briefing(spec, beforeDemo) {
    feedbackGen++;                  /* a feedback line still typing stops here */
    promptTxt.textContent = '';
    caret.hidden = true;
    prompt.classList.add('show');
    await wait(320);

    /* Swiftee talks along with the narrator and stops when it does -- and
       comes up from behind the board first if it is not standing there yet */
    await mascotWithLine(spec.text);
    swiftee.hold('talking');

    /* A line that shows the drag as it says it: the ghost's pass is
       stretched to the clip, so it lands in the slot (74% of the pass) as
       the last word is said. Without a clip, the typewriter's own 2400ms. */
    let demo = null;
    if (spec.withLine) {
      const clip = voFor(spec.text);
      const secs = clip ? await durationOf(clip) : 0;
      const ms = Math.max(2100, (secs ? secs * 1000 : 2400) / .74);
      demo = demoDrag({ done: false, anim: null }, { once: true, ms: ms });
    }

    /* The clip, the pace and the hold at the end of it all belong to the
       typewriter now: 2400ms is only the pace to keep when this line has no
       recording to keep. */
    await typewrite(spec.text, 2400);

    swiftee.release();
    if (demo) { await demo; return; }
    if (beforeDemo) await beforeDemo();

    /* the line is said: the ghost chip shows the drag once, low-opacity,
       right away -- every learner sees the motion before being asked to try
       it, rather than only the ones who sit idle long enough to earn it */
    await demoDrag({ done: false, anim: null }, { once: true });
  }

  /* ---------- a round ---------- */
  async function startRound(n) {
    lockInput(true);
    round = n;
    roundSlots = slotsOf(n);
    roundChips = chipsOf(n);
    wrongInRound = 0;
    autoScheduled = false;
    roundDone = false;
    headStay = true;           /* the bird stays up until the hand-over below */

    /* a prior round may have zoomed the bay up into the empty heading once
       its own line was said; this round's briefing needs that heading back */
    if (bay.classList.contains('zoomed')) unzoomBay();

    /* only the deck in play takes pointer events */
    Object.keys(trays).forEach(k => trays[k].classList.toggle('live', Number(k) === n));

    /* The slots first, then the deck that fills them: the order the learner
       needs to read them in. Both were a chain of setTimeouts, which kept a
       clock of their own -- a skip raced past the wait below and then stood
       and watched the chips trickle in afterwards, at full speed, over a
       scene that had already moved on. */
    const deal = async () => {
      await revealGroup(roundSlots, ROUND_IN);
      await wait(SLOTS_TO_CHIPS);
      await revealGroup(roundChips, ROUND_IN);
    };
    const spec = ROUNDS[n];
    if (spec.lineFirst) {
      await briefing(spec, async () => { await deal(); await wait(320); });
    } else {
      await deal();
      await briefing(spec);
    }

    /* Swiftee stays in the heading until the round's line and its drag demo
       are done; then the bird and its line leave, and the shapes grow up
       into the heading it empties. Round 2 brings it back for its own line
       (user, 2026-09-28). */
    headStay = false;
    lockInput(false);
    const gen = runToken;
    (mascotLeaving || Promise.resolve()).then(() => { if (gen === runToken) zoomBay(); });
  }

  async function finishRound() {
    if (roundDone) return;      /* a hand-placed last answer can race autoSolve */
    roundDone = true;
    lockInput(true);

    const last = round === LAST_ROUND;

    board.classList.add('cheer');
    setTimeout(() => board.classList.remove('cheer'), 1200);

    /* proud closes the mission out; a mid-game round gets the shorter cheer */
    swiftee.play(last ? 'proud' : 'celebrating', 1);

    /* the round is closed out by confetti falling across the whole screen,
       not by another volley out of the slots that were just filled */
    skyConfetti(last ? 150 : 100, last ? 3800 : 2900);
    sfx('confetti', .85);

    if (!last) { await wait(1700); return startRound(round + 1); }

    /* the last round, all formulas home: Swiftee takes its bow, then the
       sides are named on every shape (the bird steps off, the heading
       clears), and only then the Next button */
    await wait(1500);
    if (!shapes[0].classList.contains('labelled')) showLabels();

    /* FB-03: Swiftee comes back up to the heading and says it, then stays --
       through the Next button and on into the triangle lesson, which it
       carries on talking through (user, 2026-09-28) */
    headStay = true;
    unzoomBay();
    await heading(FEEDBACK.done);
    await wait(1600);

    /* the warm-up is over: hand the learner the Next button, then the lesson */
    await showNext();
    await sectionTwo();
  }

  /* ---------- round 2 coaching ---------- */

  /* first wrong drop: name the sides of every shape. The heading already
     stood down after round 2's line, and the band the names
     land in was reserved from the first frame (see .shape-stage), so the
     names simply fade up and nothing on the board moves. */
  function showLabels() {
    shapes.forEach((s, i) => setTimeout(() => s.classList.add('labelled'), i * 130));
  }

  /* ---------- a scene comes forward ----------
   * Once Swiftee has said all it has to say and left the heading, the heading
   * row is held open (head-held) but stands empty above the scene. Folding it
   * would slide the whole scene up the board; instead the scene zooms into
   * it. It scales about its bottom centre, so it grows up into the empty
   * heading and out into the board's side padding, and whatever is under it
   * -- the warm-up's tray -- is never covered. A transform, so nothing
   * reflows, and a drag still lands: every hit test reads
   * getBoundingClientRect. Used by the warm-up's bay and the triangle lesson. */
  const ZOOM_MAX = 1.25;
  const ZOOM_RIM = 20;   /* px kept clear of the board's edge either side */
  function zoomFor(el) {
    const row = document.querySelector('.prompt-row');
    const h = el.offsetHeight, w = el.offsetWidth;
    if (!h || !w) return 1;
    const up = (h + row.offsetHeight + (parseFloat(getComputedStyle(row).marginBottom) || 0)) / h;
    const across = (board.clientWidth - 2 * ZOOM_RIM) / w;
    return Math.max(1, Math.min(+el.dataset.zoomMax || ZOOM_MAX, up, across));
  }
  function zoomIn(el) {
    el.style.setProperty('--scene-zoom', zoomFor(el).toFixed(3));
    el.classList.add('zoomed');
  }
  function zoomOut(el) {
    el.classList.remove('zoomed');
    el.style.removeProperty('--scene-zoom');
  }
  const zoomBay   = () => zoomIn(bay);
  const unzoomBay = () => zoomOut(bay);
  window.addEventListener('resize', () => {
    document.querySelectorAll('.zoomed[style*="--scene-zoom"]').forEach(el =>
      el.style.setProperty('--scene-zoom', zoomFor(el).toFixed(3)));
  });

  /* second wrong drop: stop asking, and fly each formula home */
  async function autoSolve() {
    if (roundDone) return;
    lockInput(true);
    unpick();
    showLabels();
    await wait(300);

    for (const slot of roundSlots) {
      if (slot.classList.contains('filled')) continue;
      const chip = roundChips.find(c => c.dataset.word === slot.dataset.accept && !c.disabled);
      if (!chip) continue;
      await flyIntoSlot(chip, slot);
      await wait(200);
    }

    await wait(340);
    finishRound();
  }

  /* the chip lifts out of the console and settles into the slot, growing or
     shrinking into the slot's exact box on the way */
  function flyIntoSlot(chip, slot) {
    const mine = runToken;
    return new Promise((resolve, reject) => {
      const from = chip.getBoundingClientRect();
      const to   = slot.getBoundingClientRect();
      if (!from.width || !to.width || REDUCED) {
        dock(chip, slot, false);
        return resolve();
      }

      const ghost = flattenGhost(chip.cloneNode(true));
      ghost.className = 'chip ghost' + (chip.classList.contains('formula') ? ' formula' : '');
      ghost.disabled = true;
      Object.assign(ghost.style, {
        position: 'fixed',
        left: from.left + 'px',
        top: from.top + 'px',
        width: from.width + 'px',
        height: from.height + 'px',
        margin: 0,
        pointerEvents: 'none',
        zIndex: 960,
        transformOrigin: 'top left'
      });
      fx.appendChild(ghost);
      chip.style.visibility = 'hidden';

      const dx = to.left - from.left;
      const dy = to.top - from.top;
      const sx = to.width / from.width;
      const sy = to.height / from.height;

      slot.classList.add('over');
      const a = ghost.animate([
        { transform: 'translate(0px,0px) scale(1,1)' },
        { transform: 'translate(' + (dx * .5) + 'px,' + (dy * .5 - 30) + 'px) scale(' +
                     ((1 + sx) / 2) + ',' + ((1 + sy) / 2) + ')', offset: .55 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')' }
      ], { duration: 780, easing: 'cubic-bezier(.35,.05,.25,1)', fill: 'forwards' });

      const land = () => {
        ghost.remove();
        slot.classList.remove('over');
        dock(chip, slot, false);
        resolve();
      };
      a.onfinish = land;
      a.oncancel = () => {
        if (mine === runToken) return land();
        /* a replay: the copy goes, and the card is left where the teardown put it */
        ghost.remove();
        slot.classList.remove('over');
        reject(CANCELLED);
      };
    });
  }

  /* ---------- confetti ---------- */
  function confettiPiece() {
    if (!CONFETTI.length) return null;         /* no palette, no paint */
    const p = document.createElement('i');
    const w = 7 + Math.random() * 8;
    const h = 10 + Math.random() * 12;
    p.style.width  = w + 'px';
    p.style.height = h + 'px';
    p.style.background = CONFETTI[(Math.random() * CONFETTI.length) | 0];
    return p;
  }

  /* How a round is closed out: confetti rains down the whole screen rather
     than firing out of the slots that were just filled. */
  function skyConfetti(count, span) {
    if (REDUCED) return;
    const W = window.innerWidth;
    const H = window.innerHeight;

    for (let i = 0; i < count; i++) {
      const p = confettiPiece();
      if (!p) return;
      p.style.left = (Math.random() * W) + 'px';
      p.style.top = '0px';
      fx.appendChild(p);

      const from = -50 - Math.random() * 320;      /* staggered above the fold */
      const to   = H + 80;
      const sway = Math.random() * 170 - 85;       /* sideways drift as it falls */
      const spin = (Math.random() * 1440 - 720) | 0;
      const life = span * (0.66 + Math.random() * 0.5);
      const delay = Math.random() * span * 0.42;

      const step = (t, x, r) =>
        ({ transform: 'translate(' + x + 'px,' + (from + (to - from) * t) + 'px) rotate(' + r + 'deg)' });

      const a = p.animate([
        step(0, 0, 0),
        step(.33, sway * .65, spin * .33),
        step(.66, sway * -.35, spin * .66),
        step(1, sway, spin)
      ], { duration: life, delay: delay, easing: 'linear', fill: 'backwards' });

      a.onfinish = () => p.remove();
      a.oncancel = () => p.remove();
    }
  }

  function burst(el) {
    if (REDUCED) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    for (let i = 0; i < 34; i++) {
      const p = confettiPiece();
      if (!p) return;
      p.style.left = (cx - parseFloat(p.style.width) / 2) + 'px';
      p.style.top  = (cy - parseFloat(p.style.height) / 2) + 'px';
      fx.appendChild(p);

      const angle = (Math.random() * Math.PI * 2);
      const dist  = 70 + Math.random() * 190;
      const dx    = Math.cos(angle) * dist;
      const up    = Math.sin(angle) * dist - 90;      /* biased upward */
      const drop  = up + 150 + Math.random() * 190;   /* then gravity wins */
      const spin  = (Math.random() * 900 - 450) | 0;
      const life  = 900 + Math.random() * 600;

      const a = p.animate([
        { transform: 'translate(0,0) rotate(0deg) scale(1)', opacity: 1 },
        { transform: 'translate(' + dx * 0.85 + 'px,' + up + 'px) rotate(' + spin * 0.6 + 'deg) scale(1)',
          opacity: 1, offset: .55 },
        { transform: 'translate(' + dx + 'px,' + drop + 'px) rotate(' + spin + 'deg) scale(.85)',
          opacity: 0 }
      ], { duration: life, easing: 'cubic-bezier(.15,.6,.35,1)' });

      a.onfinish = () => p.remove();
      a.oncancel = () => p.remove();
    }
  }

  /* ---------- drag / drop plumbing ---------- */
  let drag = null;      // { el, ghost, offsetX, offsetY }
  let picked = null;    // click / keyboard selection

  /* only the round in play can be dropped on */
  function slotUnder(x, y) {
    return roundSlots.find(slot => {
      const r = slot.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    }) || null;
  }

  const clearOver = () => roundSlots.forEach(s => s.classList.remove('over'));

  function unpick() {
    if (picked) picked.classList.remove('picked');
    picked = null;
  }

  /* seat a chip in its slot; `earned` is false when the game placed it itself */
  function dock(chip, slot, earned) {
    slot.appendChild(chip);
    slot.classList.add('filled');
    chip.classList.remove('picked', 'dragging');
    chip.style.visibility = '';
    chip.disabled = true;
    slot.closest('.cell').classList.add('docked');

    markRight(slot);
    setTimeout(() => slot.classList.remove('correct'), 520);

    sfx('correct', earned ? 1 : .55);
    if (earned) {
      swiftee.play('happy', 1);
      sfx('confetti', .55);
      requestAnimationFrame(() => burst(chip));
    }
  }

  function place(chip, slot) {
    if (!interactive) return false;
    if (chip.dataset.round !== slot.dataset.round) return false;
    if (slot.classList.contains('filled')) return false;

    /* ---- wrong block: red shake + buzzer, the chip stays in the tray ---- */
    if (slot.dataset.accept !== chip.dataset.word) {
      sfx('wrong');
      markWrong(slot);
      markWrong(chip);
      setTimeout(() => {
        slot.classList.remove('reject');
        chip.classList.remove('reject');
      }, 430);

      /* Round 2 escalates: name the sides once, then take over. */
      wrongInRound++;
      /* encouraging, never punishing: puzzled once the learner is stuck */
      swiftee.play(wrongInRound >= 2 ? 'puzzleing' : 'confused', 1);

      if (round === LAST_ROUND) {
        if (wrongInRound === 1) {
          setTimeout(showLabels, 500);
        } else if (wrongInRound >= 2 && !autoScheduled) {
          autoScheduled = true;
          setTimeout(autoSolve, 700);
        }
      }
      return false;
    }

    /* ---- right block: dock it, chime, confetti out of the chip ---- */
    dock(chip, slot, true);

    const done = roundSlots.every(s => s.classList.contains('filled'));
    /* the warm-up's last "Well Done!" is Swiftee's to say, from the heading
       (see finishRound) */
    if (!(done && round === LAST_ROUND)) feedback(done ? FEEDBACK.done : FEEDBACK.right);
    if (done) setTimeout(finishRound, 420);
    return true;
  }

  /* ---------- pointer drag (mouse, pen and touch alike) ---------- */
  allChips.forEach(chip => chip.addEventListener('pointerdown', onDown));

  function onDown(e) {
    if (!interactive) return;
    const chip = e.currentTarget;
    if (chip.disabled || chip.dataset.round !== String(round)) return;
    if (e.button !== undefined && e.button !== 0) return;

    drag = liftGhost(chip, e);
    chip.classList.add('dragging');
    unpick();
    sfx('click', .5);

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    e.preventDefault();
  }

  function onMove(e) {
    if (!drag) return;
    moveGhost(drag, e.clientX, e.clientY);

    clearOver();
    const slot = slotUnder(e.clientX, e.clientY);
    if (slot && !slot.classList.contains('filled')) slot.classList.add('over');
  }

  function onUp(e) {
    if (!drag) return;
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);

    const d = drag;
    drag = null;
    clearOver();

    /* the copy springs home, or into the slot it was dropped on, and the
       chip only comes back out of its dragging state once it has landed */
    const slot = slotUnder(e.clientX, e.clientY);
    dropGhost(d, slot, function () {
      d.el.classList.remove('dragging');
      if (slot) place(d.el, slot);
    });
  }

  /* ---------- click / keyboard: pick a word, then choose a slot ---------- */
  allChips.forEach(chip => {
    chip.addEventListener('click', e => {
      if (!interactive || chip.disabled || chip.dataset.round !== String(round)) return;
      e.preventDefault();
      const wasPicked = picked === chip;
      unpick();
      if (!wasPicked) {
        picked = chip;
        chip.classList.add('picked');
        sfx('click', .5);
      }
    });
  });

  allSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      if (!interactive || !picked) return;
      const chip = picked;
      unpick();
      place(chip, slot);
    });
  });

  document.addEventListener('keydown', e => {
    if (!interactive) return;
    if (e.key === 'Escape') return unpick();
    if (!picked) return;
    const idx = ['1', '2', '3'].indexOf(e.key);
    if (idx === -1) return;
    const chip = picked;
    unpick();
    place(chip, roundSlots[idx]);
  });

  /* ---------- welcome screen ---------- */
  /* It covers the preload, and the tap on its button is the gesture the
     browser wants before it will let any of the voice-overs play. */
  const welcome   = document.getElementById('welcome');
  const loaderBox = document.getElementById('loader');
  const loadTrack = document.getElementById('loadTrack');
  const loadFill  = document.getElementById('loadFill');
  const loadPct   = document.getElementById('loadPct');
  const startBtn  = document.getElementById('startBtn');
  /* ?autostart: the module is framed by the Spaceship Mission game, where the learner has already pressed through
     the mission (the gesture the voice-overs need). No welcome page and no Start button there: a quiet loader on
     the plain sky while the preload runs, then straight into Swiftee's greeting. Opened on its own, the module
     still welcomes the learner as before. */
  const DIRECT = new URLSearchParams(location.search).has('autostart');
  if (DIRECT) welcome.classList.add('direct');

  /* The backdrops, warmed in the format the stylesheet paints them in: AVIF
     where its @supports test for image-set() passes, WebP otherwise. A
     browser that passes the test but cannot decode AVIF is handed the WebP by
     image-set() itself, and the preload follows it there on the error. */
  const ART = ['assets/image/bg', 'assets/image/board'];
  const ART_EXT = (window.CSS && CSS.supports &&
                   CSS.supports('background-image', 'image-set(url("x.avif") type("image/avif"))'))
    ? ['.avif', '.webp'] : ['.webp'];
  const MIN_LOAD_MS = DIRECT ? 400 : 1600;      /* the bar is never allowed to blink past */

  /* Every clip and sheet is fetched up front so the first briefing does not
     stall halfway through, and so Swiftee's first expression change is not a
     blank frame. A file that will not load resolves anyway: a missing asset is
     a nicety lost, never a blocked mission. */
  function preloadAudio(a) {
    return new Promise(resolve => {
      if (a.readyState >= 3) return resolve();
      let settled = false;
      const done = () => {
        if (settled) return;
        settled = true;
        a.removeEventListener('canplaythrough', done);
        a.removeEventListener('error', done);
        resolve();
      };
      a.addEventListener('canplaythrough', done);
      a.addEventListener('error', done);
      setTimeout(done, 8000);
      /* The element started fetching the moment it was built with
         preload="auto". Calling load() now would abort that request and open a
         second one for the same file, so it is only used to kick off an
         element that has nothing in flight. */
      if (a.networkState === a.NETWORK_EMPTY) {
        try { a.load(); } catch (e) { done(); }
      }
    });
  }

  function preloadImage(stem) {
    return new Promise(resolve => {
      const img = new Image();
      let i = 0;
      img.onload = () => resolve();
      img.onerror = () => (++i < ART_EXT.length ? (img.src = stem + ART_EXT[i]) : resolve());
      img.src = stem + ART_EXT[0];
      setTimeout(resolve, 8000);
    });
  }

  function setProgress(v) {
    const pct = Math.max(0, Math.min(100, v));
    Motion.progress(loadFill, pct);
    loadPct.textContent = Math.round(pct) + '%';
    loadTrack.setAttribute('aria-valuenow', String(Math.round(pct)));
  }

  /* Three things steer the bar, and the smallest of them wins:
       - the real tally of finished jobs
       - a slow creep, so a clip that is slow to report never freezes the bar
       - the clock, so a warm cache still walks the width instead of
         flashing 100% for a single frame
     Only the tally can carry it the last stretch to 100. */
  function runLoader() {
    const jobs = ART.map(preloadImage).concat(swiftee.preload())
      .concat(Object.keys(bank).map(k => preloadAudio(bank[k])))
      .concat(VO_OPENING.map(voFor).filter(Boolean).map(preloadAudio));
    if (document.fonts && document.fonts.ready) {
      jobs.push(document.fonts.ready.catch(() => {}));
    }

    let loaded = 0;
    let finished = false;
    jobs.forEach(p => p.then(() => { loaded++; }));
    Promise.all(jobs).then(() => { finished = true; });

    const t0 = performance.now();

    return new Promise(resolve => {
      let shown = 0;
      (function tick() {
        const elapsed = performance.now() - t0;
        const tally = loaded / jobs.length;
        const creep = Math.min(.92, elapsed / 6000);
        const target = Math.min(Math.max(tally, creep), elapsed / MIN_LOAD_MS) * 100;
        shown += (target - shown) * 0.12;
        if (finished && elapsed >= MIN_LOAD_MS && shown > 99.3) shown = 100;
        setProgress(shown);
        if (shown >= 100) return resolve();
        requestAnimationFrame(tick);
      })();
    });
  }

  async function welcomeScreen() {
    await runLoader();
    /* the mission's own voice can start arriving now: the bar is done with */
    warmVoices();
    if (DIRECT) {
      welcome.classList.add('off');
      setTimeout(() => { welcome.hidden = true; }, 620);
      return;
    }
    await wait(280);

    /* the button takes the loader's own grid cell, so nothing shifts */
    loaderBox.classList.add('out');
    startBtn.hidden = false;
    void startBtn.offsetHeight;
    startBtn.classList.add('in');
    startBtn.focus({ preventScroll: true });

    Motion.button3d(startBtn);

    /* Swiftee waves the learner in once the sheets are actually decoded */
    swiftee.show(true);
    swiftee.play('waving', 2);

    await new Promise(res =>
      startBtn.addEventListener('click', res, { once: true })
    );
    sfx('click', .6);

    /* the cover fades while Swiftee is already hopping in behind it */
    welcome.classList.add('off');
    setTimeout(() => { welcome.hidden = true; }, 620);
  }

  /* ---------- intro: Swiftee's greeting ----------
   * Swiftee jumps up into the middle of the landscape, waves, and
   * says two lines from a speech bubble, each typed out. Then the bubble pops
   * away, the bird jumps off the bottom of the screen, the board fades up, and
   * the bird jumps back in from behind the board to its place to the left of
   * the heading. */
  const intro       = document.getElementById('intro');
  const introMascot = document.getElementById('introMascot');
  const bubble      = document.getElementById('bubble');
  const bubbleGhost = document.getElementById('bubbleGhost');
  const bubbleType  = document.getElementById('bubbleType');
  const bubbleTxt   = bubbleType.querySelector('.txt');
  const bubbleCaret = bubbleType.querySelector('.caret');
  const boardMascot = document.getElementById('mascot');
  const hopper      = document.getElementById('hopper');

  const GREETING = [T('p01Hey'), T('p01WarmUp')];
  const TYPE_MS  = 72;              /* per character, no voice-over to pace against */

  /* one jump straight up into the middle of the screen: Swiftee springs up
     from below the ground line, hangs for a beat, and lands where it stands */
  function hopIn() {
    delete introMascot.dataset.away;
    if (REDUCED) {
      introMascot.style.transform = 'none';
      return wait(120);
    }
    const kf = [
      { transform: 'translate(0, 60%) scale(.9)',   opacity: 0,  offset: 0,   easing: 'cubic-bezier(.2, .7, .3, 1)' },
      { transform: 'translate(0, -12%) scale(1.04)', opacity: 1, offset: .5,  easing: 'cubic-bezier(.5, 0, .8, .4)' },
      { transform: 'translate(0, 0) scale(.97, 1.03)', opacity: 1, offset: .78, easing: 'ease-out' },
      { transform: 'translate(0, 0) scale(1)',      opacity: 1,  offset: 1 }
    ];
    const drop = Motion.willChange(introMascot, 'transform, opacity');
    const a = introMascot.animate(kf, { duration: 820, fill: 'forwards' });
    return finished(a).finally(drop).then(() => {
      /* bake the resting pose into the element so the next animation starts
         from a clean transform instead of stacking on this one. Written out
         rather than committed from the animation: commitStyles() folds in
         whatever else is animating the element, and after a section's exit
         that can be the drop off the bottom of the screen, which would leave
         the bird standing there out of sight. */
      introMascot.style.transform = 'translate(0px, 0px)';
      introMascot.style.opacity = '1';
      a.cancel();
    });
    /* cancelled by a replay or a jump: finished() throws CANCELLED and the
       scene unwinds through it, so there is no resting pose to bake in */
  }

  /* Type one line into the bubble. The bubble is sized to the whole line
     before the first character lands (the ghost holds the width), and when a
     line replaces a longer or shorter one the box glides between the two
     widths rather than snapping. */
  async function say(text) {
    bubbleTxt.textContent = '';
    bubbleCaret.hidden = true;

    const shown = bubble.classList.contains('show');
    const r0 = bubble.getBoundingClientRect();
    bubble.style.width = '';
    bubble.style.height = '';
    bubble.style.left = '';
    bubble.style.removeProperty('--bub-tail-shift');
    wordSpans(bubbleGhost, longestChunk(text));

    /* before its pop-in the box sits scaled down to a dot, so it is measured
       with the scale lifted for the instant of the measurement */
    const measure = () => {
      if (shown) return bubble.getBoundingClientRect();
      bubble.style.transition = 'none';
      bubble.style.transform = 'none';
      const r = bubble.getBoundingClientRect();
      bubble.style.transform = '';
      void bubble.offsetWidth;
      bubble.style.transition = '';
      return r;
    };
    let r1 = measure();

    /* A long line on a narrow screen: slide the box left rather than let it
       run off the edge. The box is only as wide as the room to the right of
       its left edge, so it is measured with all the room there is before the
       place is chosen, or it would be sized by the screen's edge and sit on it. */
    const vw = window.innerWidth;
    const edge = 12;
    const home = r1.left;
    if (r1.right > vw - edge) {
      bubble.style.left = edge + 'px';
      const w = measure().width;
      bubble.style.left = Math.max(edge, vw - edge - w) + 'px';
      r1 = measure();
    }
    /* Slid: the box has left the head behind, so the tail walks back along
       the bottom edge by the same distance to keep its tip there -- as far
       as the edge allows, stopping short of the far corner's curve. */
    if (bubble.style.left) {
      const fs = parseFloat(getComputedStyle(bubble).fontSize);
      const room = r1.width - 8 - fs * (.78 + .76 + .62);
      const shift = Math.min(home - r1.left, room);
      if (shift > 0) bubble.style.setProperty('--bub-tail-shift', shift + 'px');
    }

    /* The second place, and the last: the box grows or shrinks to fit the
       line about to be typed into it. A scale would stretch its 4px border
       and its corner radius with it, and the tail under the beak with them,
       so this one box is transitioned on width and height. It is absolutely
       positioned and empty at this moment -- the text types in afterwards --
       so the reflow is the bubble itself and nothing else on the screen.
         The box is only measured true once it is shown (before that it is
       scaled down to its pop-in size), so a resize is only ever a second
       line. */
    if (shown && !REDUCED && (Math.abs(r1.width - r0.width) > 1 || Math.abs(r1.height - r0.height) > 1)) {
      bubble.style.width  = r0.width + 'px';
      bubble.style.height = r0.height + 'px';
      void bubble.offsetWidth;
      bubble.style.transition = 'width .36s cubic-bezier(.2, .9, .3, 1.2), height .36s cubic-bezier(.2, .9, .3, 1.2)';
      bubble.style.width  = r1.width + 'px';
      bubble.style.height = r1.height + 'px';
      await wait(380);
      bubble.style.transition = '';
      bubble.style.width = '';
      bubble.style.height = '';
    }

    if (!bubble.classList.contains('show')) {
      bubble.classList.add('show');
      sfx('click', .35);
      await wait(REDUCED ? 200 : 460);
    }

    await typeInto(bubbleTxt, bubbleCaret, text, text.length * TYPE_MS);
  }

  /* Swiftee leaves centre stage: a crouch, a spring, and a drop straight out
     of the bottom of the frame. */
  async function introExit() {
    /* already off the bottom of the screen -- it left after its last line
       (see boardAside) -- and a second exit would start from standing */
    if (introMascot.dataset.away) return;
    introMascot.dataset.away = '1';
    const r = introMascot.getBoundingClientRect();
    if (!r.width || REDUCED) return;
    const drop = window.innerHeight - r.top + 40;      /* clear of the bottom edge */

    const layer = Motion.willChange(introMascot, 'transform, opacity');
    const a = introMascot.animate([
      { transform: 'translate(0, 0)', easing: 'ease-in' },
      { transform: 'translate(0, 5%) scale(1.06, .92)', offset: .2, easing: 'cubic-bezier(.2, .6, .35, 1)' },
      { transform: 'translate(0, -30%) scale(1)', offset: .52, easing: 'cubic-bezier(.45, 0, .85, .5)' },
      { transform: 'translate(0, ' + drop + 'px) scale(1)' }
    ], { duration: 980, fill: 'forwards' });
    try { await finished(a); } finally { layer(); }
    /* The drop is baked into the element and the animation let go. Left
       filling forwards on the hidden intro, the browser stops reporting it,
       so the aside's tidy-up could not cancel it -- and the bird would stand
       off the bottom of the screen while its bubble spoke. */
    introMascot.style.transform = 'translate(0px, ' + drop + 'px)';
    a.cancel();
  }

  async function showBoard() {
    if (board.classList.contains('show')) return;
    board.classList.add('show');
    if (REDUCED) return wait(500);
    const a = board.animate([
      { transform: 'translateY(26px) scale(.955)', opacity: 0 },
      { transform: 'none', opacity: 1 }
    ], { duration: 640, easing: 'cubic-bezier(.2, .9, .3, 1.15)' });
    await finished(a);
  }

  /* Swiftee arrives on the board by jumping up from behind it and dropping
     onto its spot to the left of the heading.
     Two sprites share the jump: the hopper, painted under the board, does the
     rising half that starts hidden behind the board's top edge, and the
     in-board sprite does the falling half over it. They swap at the top of the
     arc, where both are fully clear of the board, and since one player paints
     both, the cut is invisible. */
  async function mascotJumpIn(target) {
    await birdFree();
    const spot = target || boardMascot;         /* the heading's, unless told otherwise */
    const m = spot.getBoundingClientRect();
    const b = board.getBoundingClientRect();
    if (!m.width || REDUCED) { spot.classList.add('in'); return; }

    const apexTop = b.top - m.height * .9 - 8;         /* the whole bird above the edge */
    const hideTop = b.top + 14;                        /* tucked just under it, covered */

    /* up from behind the board to the apex... */
    birdTrip = [spot];                          /* this jump's only end on the board */
    Object.assign(hopper.style, {
      left: m.left + 'px', top: hideTop + 'px', width: m.width + 'px', height: m.height + 'px'
    });
    hopper.classList.add('on');
    const rise = hopper.animate(
      [{ transform: 'translateY(0)' }, { transform: 'translateY(' + (apexTop - hideTop) + 'px)' }],
      { duration: 380, easing: 'cubic-bezier(.2, .6, .35, 1)', fill: 'forwards' }
    );
    await finished(rise);

    /* ...hand over, and drop onto the spot with a little squash.

       The spot is measured AGAIN here rather than taken from the box read
       before the jump. The heading's row opens for the arriving bird and
       takes half a second to do it, so by the time the sprite reaches the
       apex its landing spot has slid down the board underneath it -- 55px,
       measured. Starting the fall from the stale box puts the in-board
       sprite somewhere other than where the hopper was left standing, and
       the swap paints the character in two places on consecutive frames:
       the flicker the hand-over is supposed to hide. Measured live, the two
       sprites share the same pixel and the cut is invisible again.

       The start of the fall is also written to the element before it is
       shown, so a frame painted before the animation's first sample cannot
       catch the bird sitting at its destination.

       The sideways part of the same slide is carried too: the fall starts
       at the hopper's left edge, not the spot's, and eases across on the
       way down -- the same hand-over rule hopBetween applies on landing.
       Compensating only the vertical put the sprite at the spot's NEW left
       on the swap frame: a sideways teleport right as the bird cleared the
       board. */
    const at = spot.getBoundingClientRect();
    const dx = m.left - at.left;
    const drop = apexTop - at.top;
    const from = 'translate(' + dx + 'px, ' + drop + 'px)';
    spot.style.transform = from;
    spot.classList.add('in');
    hopper.classList.remove('on');
    rise.cancel();
    const fall = spot.animate([
      { transform: from, easing: 'cubic-bezier(.45, 0, .85, .5)' },
      { transform: 'translateY(0) scale(1.06, .92)', offset: .8, easing: 'ease-out' },
      { transform: 'none' }
    ], { duration: Math.min(760, 320 - drop * .5), fill: 'forwards' });   /* longer drop, longer fall */
    /* the fill holds the last keyframe -- which is `none` -- so clearing the
       inline transform and dropping the animation changes nothing on screen */
    try { await finished(fall); } finally { spot.style.removeProperty('transform'); fall.cancel(); birdTrip = []; }
  }

  /* The way back: the flyer takes the sprite over from its spot on the very
     first frame, so the whole trip runs in screen coordinates -- the rise
     used to run on the in-board sprite, and a line cleared or a row folding
     under it mid-air dragged the bird sideways. It crouches and springs up
     to the apex over the board, hands over to the hopper there, and the
     hopper drops behind the board's top edge; the flyer is fixed to the
     screen, so it stands exactly where it was sent and no re-measure is
     needed at the swap.
     `onAirborne` fires the moment the spot is empty: the words a caller
     wants down go THEN, not before the jump, or the row re-centres and
     shoves the still-standing bird sideways first (see headingDown and
     dismissNow). It always fires, whichever way the trip ends. */
  async function mascotJumpOut(source, onAirborne) {
    const off = () => {
      const f = onAirborne; onAirborne = null;
      if (f) try { f(); } catch (e) {}
    };
    try {
      await birdFree();
      const spot = source || boardMascot;
      if (!spot.classList.contains('in')) return;      /* already gone */
      const m = spot.getBoundingClientRect();
      const b = board.getBoundingClientRect();
      if (!m.width || REDUCED) { spot.classList.remove('in'); return; }

      const apexTop = b.top - m.height * .9 - 8;
      const hideTop = b.top + 14;

      birdTrip = [spot];                          /* this jump's only end on the board */
      Object.assign(flyer.style, {
        left: m.left + 'px', top: m.top + 'px', width: m.width + 'px', height: m.height + 'px'
      });
      flyer.classList.add('on');
      spot.classList.remove('in');
      off();                       /* the spot is the flyer's now: words may go */
      const rise = flyer.animate([
        { transform: 'none', easing: 'ease-in' },
        { transform: 'translateY(6%) scale(1.06, .92)', offset: .24, easing: 'cubic-bezier(.2, .6, .35, 1)' },
        { transform: 'translateY(' + (apexTop - m.top) + 'px)' }
      ], { duration: 560, fill: 'forwards' });
      await finished(rise);

      /* hand over to the hopper at the apex, exactly where the flyer stands */
      Object.assign(hopper.style, {
        left: m.left + 'px', top: apexTop + 'px', width: m.width + 'px', height: m.height + 'px'
      });
      hopper.classList.add('on');
      flyer.classList.remove('on');
      rise.cancel();
      const fall = hopper.animate(
        [{ transform: 'translateY(0)' }, { transform: 'translateY(' + (hideTop - apexTop) + 'px)' }],
        { duration: 360, easing: 'cubic-bezier(.45, 0, .85, .5)', fill: 'forwards' }
      );
      await finished(fall);
      hopper.classList.remove('on');
      fall.cancel();
      birdTrip = [];
    } finally { off(); }
  }


  /* ---------- next button ----------
   * Pops up in the middle of the footer band and resolves on the click. The
   * pointer lock is lifted only while it is showing; by then every card of the
   * warm-up is docked and disabled, so nothing else can be touched. */
  const nextBtn = document.getElementById('nextBtn');

  const nextBtnFree = document.getElementById('nextBtnFree');

  /* the board's Next unless told otherwise; a scene with no board on screen
     passes the viewport-anchored one */
  let nextCtl = null;
  function showNext(which) {
    const b = which || nextBtn;
    /* the scene is over: a skip in flight stops here, and Skip stands down
       until the next scene opens */
    sceneEnd();
    /* the click handler belongs to this scene: a teardown takes it off, so a
       replay's own Next is not also answered by the one it replaced */
    if (nextCtl) nextCtl.abort();
    const ctl = nextCtl = new AbortController();
    return waitForScene(resolve => {
      b.hidden = false;
      void b.offsetHeight;
      b.classList.add('in');
      /* the heading stays: the scene is over, the transition that follows
         takes the bird down anyway, and folding the row for the second
         before it would only make the board jump twice */
      lockInput(false, true);
      b.focus({ preventScroll: true });
      pendingNext = b;

      b.addEventListener('click', () => {
        pendingNext = null;
        sfx('click', .6);
        lockInput(true);
        b.classList.remove('in');
        b.classList.add('out');
        setTimeout(() => {
          b.hidden = true;
          b.classList.remove('out');
        }, 320);
        resolve();
      }, { once: true, signal: ctl.signal });
    });
  }

  /* ---------- section 2: the triangle lesson ---------- */
  const lesson       = document.getElementById('lesson');
  const triRow       = document.getElementById('triRow');
  const tris         = Array.from(lesson.querySelectorAll('.tri'));
  const formulaBox   = document.getElementById('formulaBox');
  const formulaGhost = document.getElementById('formulaGhost');
  const formulaType  = document.getElementById('formulaType');
  const formulaTxt   = formulaType.querySelector('.txt');
  const formulaCaret = formulaType.querySelector('.caret');

  /* The formula in pieces: the two words the lesson is about are their own
     spans, so each can light up the moment it has finished typing. */
  const FORMULA = [
    { t: T('areaWord') + ' = ½ × ' },
    { t: T('labelBaseCap'),   w: 'base' },
    { t: ' × ' },
    { t: T('labelHeightCap'), w: 'height' }
  ];
  const FORMULA_MS    = 110;      /* per character: slower than a briefing, on purpose */
  const FORMULA_PAUSE = 720;      /* a beat after each key word, for the highlight to land */

  /* the ghost carries the whole formula from the start, so the box is sized
     before the first character lands */
  lineSpans(formulaGhost, FORMULA);

  /* The first triangle is drawn in the middle of the empty board, so before
     it draws it is carried from its own cell to the centre of the row... */
  function parkCentre(tri) {
    const row  = triRow.getBoundingClientRect();
    const cell = tri.parentElement.getBoundingClientRect();
    if (!row.width || !cell.width) return;
    const dx = (row.left + row.width / 2) - (cell.left + cell.width / 2);
    tri.style.transform = 'translateX(' + dx + 'px)';
  }

  /* ...and slides home once Swiftee has introduced it. The inline transform
     is cleared in the same task the animation starts, so there is no frame
     in which the triangle sits at either end unanimated. */
  async function slideHome(tri) {
    const from = tri.style.transform;
    tri.style.transform = '';
    if (!from || REDUCED) return wait(120);
    /* A triangle sits still for the whole of the lesson bar this one slide,
       so the compositor is asked to hold a layer for it here and told it can
       let go the moment the slide is over -- including the way over where a
       replay cancels it. */
    const drop = Motion.willChange(tri);
    const a = tri.animate(
      [{ transform: from }, { transform: 'none' }],
      { duration: 760, easing: 'cubic-bezier(.4, 0, .2, 1)' }
    );
    try { await finished(a); } finally { drop(); }
  }

  /* Grow a dashed line out from its first point. The dash pattern is anchored
     at (x1, y1), so moving the far end reveals the dashes one by one instead
     of scrolling them; a dash-offset draw would not work on a dashed stroke. */
  function growLine(line, ms) {
    if (!line) return Promise.resolve();
    const x1 = +line.getAttribute('x1'), y1 = +line.getAttribute('y1');
    const X2 = +(line.dataset.x2 || (line.dataset.x2 = line.getAttribute('x2')));
    const Y2 = +(line.dataset.y2 || (line.dataset.y2 = line.getAttribute('y2')));

    if (REDUCED) {
      line.setAttribute('x2', X2); line.setAttribute('y2', Y2);
      line.style.opacity = 1;
      return wait(80);
    }

    line.setAttribute('x2', x1); line.setAttribute('y2', y1);
    line.style.opacity = 1;
    const mine = runToken;
    return new Promise((resolve, reject) => {
      const t0 = performance.now();
      (function step(t) {
        if (mine !== runToken) return reject(CANCELLED);     /* a replay took the scene down */
        const p = fastForward ? 1 : Math.min(1, (t - t0) / ms);
        const e = 1 - Math.pow(1 - p, 3);                 /* ease-out cubic */
        line.setAttribute('x2', x1 + (X2 - x1) * e);
        line.setAttribute('y2', y1 + (Y2 - y1) * e);
        if (p < 1) requestAnimationFrame(step);
        else resolve();
      })(t0);
    });
  }

  /* Base, then height, one triangle at a time, left to right: each is
     finished -- right-angle mark and all -- and given a breath before the
     next begins, so the eye is only ever asked to follow one. They used to
     overlap, a third of a second apart, and all three read as one flash.
     The obtuse one carries its base on under the apex first. */
  const DIMS_GAP = 450;
  async function drawDims() {
    for (let i = 0; i < tris.length; i++) {
      const tri = tris[i];
      if (i) await wait(DIMS_GAP);
      await growLine(tri.querySelector('.dim-base'), 620);
      await wait(160);
      await growLine(tri.querySelector('.dim-ext'), 420);
      await growLine(tri.querySelector('.dim-height'), 620);
      tri.classList.add('marked');
    }
  }

  /* the formula's word has landed: light the matching line on each triangle,
     left to right, far enough apart that each one lights on its own */
  function lightDims(kind) {
    tris.forEach((tri, i) => setTimeout(() => tri.classList.add('lit-' + kind), i * 380));
  }

  /* The formula pops up, then types itself out on a wall clock. When a key
     word completes, it is highlighted, the lines it names light up, and the
     typing rests for a beat before going on. */
  async function showFormula() {
    const parts = lineSpans(formulaTxt, FORMULA);
    formulaCaret.hidden = true;
    formulaBox.classList.add('show');
    sfx('click', .35);
    await wait(REDUCED ? 200 : 560);

    let due = performance.now();
    for (const part of parts) {
      due = await revealWords(part.words, due, FORMULA_MS);
      if (part.seg.w) {
        const left = due - performance.now();
        if (left > 0) await wait(left);
        part.els.forEach(el => el.classList.add('lit'));
        lightDims(part.seg.w);
        due += FORMULA_PAUSE;
      }
    }
    const left = due - performance.now();
    if (left > 0) await wait(left);
    await wordsSettle();
  }

  async function sectionTwo() {
    lockInput(true);
    /* the warm-up's hold on the heading row ends with the warm-up: from here
       the row opens and folds with whatever the section puts in it. Dropped
       before the stage is noted, so a replay of this scene does not come back
       to a board still holding it. */
    board.classList.remove('head-held');
    /* page 9's closing zoom is let go with its scene: a replay, Back or the
       next scene finds the parallelogram at its own size */
    const zoomedPara = document.querySelector('.para.zoomed');
    if (zoomedPara) unzoomContent(zoomedPara);
    zoomOut(lesson);
    sceneStart(sectionTwo);
    /* Swiftee stays in the heading from "Well Done!" through both of the
       lesson's lines and the formula; only step 7 sends it away */
    headStay = true;
    /* ...and taken up again at once for the lesson's own length: Swiftee
       comes and goes from the heading three times here, and letting the row
       fold and open around each visit pumped the triangles up and down the
       board. Held, the lesson keeps one size from the first frame to the
       zoom at the end. */
    board.classList.add('head-held');

    /* 1. the warm-up clears away; Swiftee stays where it is */
    await wait(260);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    board.classList.add('sec2');
    /* the card decks are gone with the warm-up: the console band no longer
       needs the height of a row of chips, so the triangles get the room */
    trayArea.style.minHeight = '';
    await wait(520);

    /* 2. one triangle, drawn in the middle of the empty board */
    const first = tris[0];
    parkCentre(first);
    lesson.classList.add('on');
    lesson.setAttribute('aria-hidden', 'false');
    await wait(80);
    await revealShape(first);
    await wait(320);

    /* 3. Swiftee, still up from "Well Done!" (or brought back up on a
          replay), names what this is */
    await mascotWithLine(LESSON.types);
    swiftee.hold('talking');
    await typewrite(LESSON.types, LESSON.types.length * TYPE_MS);
    swiftee.release();
    await wait(700);

    /* 4. it moves aside, and two more kinds join it, one at a time */
    await slideHome(first);
    await wait(220);
    for (const tri of tris.slice(1)) {
      await revealShape(tri);
      await wait(260);
    }
    await wait(320);

    /* 5. base and height on all three */
    await mascotWithLine(LESSON.dims);
    swiftee.hold('talking');
    await typewrite(LESSON.dims, LESSON.dims.length * TYPE_MS);
    swiftee.release();
    await wait(380);
    await drawDims();
    await wait(520);

    /* 6. the formula, word by word, lighting the lines it names */
    await showFormula();
    swiftee.play('happy', 1);
    await wait(1100);

    /* 7. everything has been said: Swiftee and its line leave the heading,
          and the triangles and formula come forward into the room they
          leave. The row is held open for it, so the zoom grows into empty
          space rather than the whole lesson sliding up as the row folds. */
    board.classList.add('head-held');
    headStay = false;
    feedbackGen++;
    caret.hidden = true;
    /* the line goes once the bird is off its spot (onAirborne), not before:
       cleared first, the centred row shoved the still-standing bird sideways */
    if (boardMascot.classList.contains('in')) {
      await mascotJumpOut(boardMascot, () => { promptTxt.textContent = ''; });
    } else promptTxt.textContent = '';
    await wait(220);
    zoomIn(lesson);

    /* 8. the zoom, and two seconds to take it in, then on */
    await wait(900 + 2000);
    await showNext();
    await sectionThree();
  }

  /* ---------- section 3 onward: quadrilaterals ----------
   * One board section serves every quadrilateral scene from here. Its svg is
   * rebuilt per scene from four corners and a chosen diagonal: the two
   * triangles that diagonal makes, each with its perpendicular height, foot
   * mark and label, are all worked out here rather than drawn by hand. The
   * triangles are told apart by colour -- never by lettered corners. */
  const quad       = document.getElementById('quad');
  const quadShape  = document.getElementById('quadShape');
  const quadSvg    = document.getElementById('quadSvg');
  const quadArt    = quadSvg.querySelector('.art');
  const quadRings  = quadSvg.querySelector('.qrings');
  const quadNames  = quadSvg.querySelector('.tnames');
  const quadDims   = quadSvg.querySelector('.dims');
  const quadDots   = document.getElementById('dots');
  const joinLine   = document.getElementById('joinLine');
  const demoG      = document.getElementById('demoJoin');
  const demoLine   = document.getElementById('demoLine');
  const demoHand   = document.getElementById('demoHand');
  const quizBlock  = document.getElementById('quizBlock');
  const quizMascot = document.getElementById('quizMascot');
  const quizChips  = Array.from(document.querySelectorAll('#quizTray .chip'));
  const quizBubble = document.getElementById('quizNote');
  const noteGhost  = document.getElementById('noteGhost');
  const noteType   = document.getElementById('noteType');
  const noteTxt    = noteType.querySelector('.txt');
  const noteCaret  = noteType.querySelector('.caret');
  const sayRow     = document.getElementById('sayRow');
  const sideMascot = document.getElementById('sideMascot');
  const sayGhost   = document.getElementById('sayGhost');
  const sayType    = document.getElementById('sayType');
  const sayTxt     = sayType.querySelector('.txt');
  const sayCaret   = sayType.querySelector('.caret');
  const areaLinesEl = document.getElementById('areaLines');
  const flyer      = document.getElementById('flyer');

  let quadFill = null;         /* the whole-shape fill of the quadrilateral on the board */
  let quadCorners = null;      /* its four corners, clockwise from the top (ORDER) */
  let corners  = [];           /* the corner groups of the shape on the board */
  let CORNERS  = {};           /* corner key -> { x, y }, in the svg's units */
  const HIT  = 24;             /* how near a corner a release counts, in svg units */
  const NAME = { T: T('cornerTop'), R: T('cornerRight'), B: T('cornerBottom'), L: T('cornerLeft') };

  /* ---- the shapes ----
   * Corners are keyed by where they sit (top, right, bottom, left), which is
   * how Swiftee refers to them. A spec names the diagonal, and for each of
   * the two triangles it makes: the corner it reaches, its colour, and what
   * its height is labelled. */
  const PTS_A = { T: { x: 165, y: 10 }, R: { x: 323, y: 151 }, B: { x: 73,  y: 262 }, L: { x: 10,  y: 151 } };
  const PTS_C = { T: { x: 106, y: 49 }, R: { x: 322, y: 190 }, B: { x: 221, y: 226 }, L: { x: 12,  y: 140 } };
  const ORDER = ['T', 'R', 'B', 'L'];

  /* section 3: the first quadrilateral, cut left to right... */
  const SPEC_A = {
    pts: PTS_A, diag: ['L', 'R'], base: T('labelBase'),
    tris: [{ apex: 'T', color: 'purple', label: T('labelHeight') }, { apex: 'B', color: 'green', label: T('labelHeight') }],
    /* the short names the labels take after their two-second look */
    short: { base: 'b', h: ['h₁', 'h₂'] },
    /* The names the working calls the two halves by, written in the empty
       corner each half leaves inside the frame -- `at` is where the name
       sits, `from` the point on its edge the curve leaves, `to` the point
       inside the half it arrives at, and `bow` how far the curve bulges.
       Given per scene rather than worked out, because where a name will fit
       is a matter of the shape it is drawn beside. */
    names: [
      { text: T('triangle1'), at: { x: 52, y: 30 },   from: { x: 74, y: 42 },   to: { x: 124, y: 92 },  bow: 16 },
      { text: T('triangle2'), at: { x: 256, y: 242 }, from: { x: 230, y: 232 }, to: { x: 182, y: 196 }, bow: 16 }
    ]
  };
  /* ...and then the same one, cut top to bottom */
  const SPEC_A2 = {
    pts: PTS_A, diag: ['T', 'B'], base: T('labelBase'),
    tris: [{ apex: 'L', color: 'green', label: T('labelHeight') }, { apex: 'R', color: 'purple', label: T('labelHeight') }],
    /* the heights are h₁ and h₂ again: this is a fresh pair of triangles,
       and the working beside it is read the same way as the first cut's */
    short: { base: 'b', h: ['h₁', 'h₂'] }
  };
  /* section 5: the one the learner works out alone */
  const SPEC_C = {
    pts: PTS_C, diag: ['L', 'R'], base: CM(18),
    tris: [{ apex: 'T', color: 'green', label: CM(6) }, { apex: 'B', color: 'purple', label: CM(3) }]
  };

  /* ---- Swiftee's lines ---- */
  const QUAD = {
    /* the bird asks from its box; the box under the sentence says "Tap here"
       and the hand beside it points at the arrow, so the line itself does
       not have to */
    ask:     T('p04WhatShape'),
    answer:  'quadrilateral',
    /* every remark carries the reason -- how many sides that shape has --
       so a choice is answered with the thing being taught, not with praise */
    notes: {
      triangle:      T('p04NotTriangle'),
      pentagon:      T('p04NotPentagon'),
      quadrilateral: T('p04IsQuad')
    },
    general: T('p04General'),
    area:    T('p04FindArea'),
    join:    T('p04Join'),
    divided: T('p04Divided'),
    /* one triangle at a time: its base, its height, and then its area */
    base1:   T('p04Base1'),
    base2:   T('p04Base2'),
    height:  h => T('p04HeightIs', { h: h }),
    /* not `area`: that key is the aside beside the shape, "Let's try and
       find its area!", and a second `area` here silently replaced it */
    areaIs:  T('p04AreaIs'),
    /* the rule put into words, a part at a time */
    words1:  T('p04Words1'),
    words2:  T('p04Words2'),
    /* the third line of the working, taken the rest of the way */
    swap:    T('p04PutIn'),
    share:   T('p04Share'),
    rule:    T('p04Rule'),
    another: T('p05Another'),
    twoNew:  T('p05TwoNew'),
    complete: T('p05Complete'),
    /* the two boxes are asked one at a time (user, 2026-09-28): the part
       wanted is named, and a wrong choice is answered with what it really is.
       The "green" triangle draws orange, so that is what the learner is told. */
    chooseDiag: T('p05ChooseDiag'),
    chooseSum:  T('p05ChooseSum'),
    notDiag: { 'h-green': T('p05NotDiagOrange'),
               'h-purple': T('p05NotDiagPurple') },
    notSum:  T('p05NotSum'),
    joinWrong: (a, b) => T('p04JoinWrong', { a: NAME[a], b: NAME[b] })
  };
  /* only .pick survives (in the heading-ghost list below): the rest of
     page 6, "Quadrilateral · with measurements", was cut (user, 2026-09-25) */
  const FOUR = {
    pick: T('p06Pick')
  };
  const FIVE = {
    turn: T('p07Turn'),
    /* a wrong answer to each of the three questions: the mascot points back at
       the measurement it is asking about, and the figure glows gold there
       (user, 2026-09-28) */
    wrongHeights: T('p07WrongHeights'),
    wrongDiag:    T('p07WrongDiag'),
    wrongArea:    T('p07WrongArea')
  };

  /* The working under (later, beside) the shape, in pieces: every word that
     names a part of the drawing is its own span, so it can light up -- and
     light the part it names -- the moment it has finished typing. */
  const LINES_A = [
    /* `fly`: the part is not typed but floated in, a copy of the drawing's
       own label for it (floatLine) */
    [...AREA_OF(T('triangle1'), 'purple'), { t: ' = ½ × ' }, { t: 'b', w: 'base', fly: 'base' }, { t: ' × ' }, { t: 'h₁', w: 'h-purple', fly: 'h' }],
    [...AREA_OF(T('triangle2'), 'green'),  { t: ' = ½ × ' }, { t: 'b', w: 'base', fly: 'base' }, { t: ' × ' }, { t: 'h₂', w: 'h-green', fly: 'h' }],
    /* the no-break spaces keep "= Area of" and "+ Area of" whole, so the long
       line wraps before an operator rather than leaving one dangling */
    [...AREA_OF(T('shapeQuadrilateral'), 'quad'), ...EQ_AREA_OF(T('triangle1'), 'purple', true), ...PLUS_AREA_OF(T('triangle2'), 'green', true)]
  ];
  /* The third line does not stop at the sum: it goes on being worked, in
     place, on the row it was written on -- the two areas put in, then the
     base they share taken out of both. Only what changes moves; "Area of
     Quadrilateral = ½ × b ×" is written once and stays put. */
  const QUAD_STEPS = [
    LINES_A[2],
    [...AREA_OF(T('shapeQuadrilateral'), 'quad'), { t: ' = ½ × ' }, { t: 'b', w: 'base' }, { t: ' × ' }, { t: 'h₁', w: 'h-purple' },
     { t: ' + ½ × ' }, { t: 'b', w: 'base' }, { t: ' × ' }, { t: 'h₂', w: 'h-green' }],
    [...AREA_OF(T('shapeQuadrilateral'), 'quad'), { t: ' = ½ × ' }, { t: 'b', w: 'base' }, { t: ' × (' }, { t: 'h₁', w: 'h-purple' },
     { t: ' + ' }, { t: 'h₂', w: 'h-green' }, { t: ')' }]
  ];
  /* The rule again in words, on a row of its own under the working (review,
     2026-09-25): a copy of the last step above, whose b becomes "Diagonal"
     and whose bracket becomes "Sum of perpendicular heights", one and then
     the other. The bracket's sum keeps the height's blue. */
  const WORDS_A = [
    [...AREA_OF(T('shapeQuadrilateral'), 'quad'), { t: ' = ½ × ' }, { t: T('wordDiagonal'), w: 'base' }, { t: ' × (' }, { t: 'h₁', w: 'h-purple' },
     { t: ' + ' }, { t: 'h₂', w: 'h-green' }, { t: ')' }],
    [...AREA_OF(T('shapeQuadrilateral'), 'quad'), { t: ' = ½ × ' }, { t: T('wordDiagonal'), w: 'base' }, { t: ' × (' }, { t: T('wordSumOfHeights'), w: 'height' }, { t: ')' }]
  ];

  /* what the drop-downs in a formula offer: the parts of the drawing by
     name in section 3, and the measurements in section 4 */
  /* the second cut's rule (review, 2026-09-25): the diagonal from the
     drawing's three names, and the sum of the heights from three sums --
     the other two each take the base for a height. (h₁ is the orange
     triangle's, the first of that cut.) */
  const NOTATION = [{ v: 'base', t: 'b' }, { v: 'h-green', t: 'h₁' }, { v: 'h-purple', t: 'h₂' }];
  const SUMS = [{ v: 'heights', t: 'h₁ + h₂' }, { v: 'b-h1', t: 'b + h₁' }, { v: 'b-h2', t: 'b + h₂' }];
  /* the rule in words, typed out and then copied for the boxes to come out
     of: each bracketed part is one piece, brackets and all, since it is the
     whole of it that becomes a box (ruleToBoxes) */
  const RULE_IN_WORDS = [...AREA_OF(T('shapeQuadrilateral'), 'quad'), { t: ' = ½ × ' }, { t: '(' + T('wordDiagonal') + ')', w: 'base' },
    { t: ' × ' }, { t: '(' + T('wordSumOfHeights') + ')', w: 'height' }];

  const AREA_MS    = 64;       /* per character */
  const AREA_PAUSE = 560;      /* a beat after each key word, for the highlight to land */

  const longest = list => list.reduce((a, b) => (b.length > a.length ? b : a), '');

  /* A box that wraps its line is as wide as its widest row, not as wide as
     the room it was offered: a wrapped block keeps the whole of the width it
     broke at, so a two-row line stood in a box with a blank margin down
     either side (user, 2026-09-28). The ghost is measured row by row and
     pinned to the widest; a transform on the board is divided back out. */
  function snug(ghost) {
    ghost.style.width = '';
    if (!ghost.textContent) return;
    const range = document.createRange();
    range.selectNodeContents(ghost);
    const rows = Array.from(range.getClientRects());
    if (!rows.length) return;
    const k = ghost.offsetWidth ? ghost.getBoundingClientRect().width / ghost.offsetWidth : 1;
    const w = Math.max.apply(null, rows.map(r => r.right)) - Math.min.apply(null, rows.map(r => r.left));
    /* a few px of slack: the live words, laid out a span per word, run a
       hair wider than the plain ghost and would otherwise wrap inside it */
    const slack = parseFloat(getComputedStyle(ghost).fontSize) * .15;
    ghost.style.width = Math.ceil(w / (k || 1) + slack) + 'px';
  }
  /* A line said a piece at a time shows one piece at once, each replacing
     the last (showPieces), so the box is refitted to every piece as it
     comes: "Not quite!" gets a box its own size, not the size of the
     sentence after it (user, 2026-09-28). */
  function fitTo(ghost, text) {
    ghost.textContent = text;
    snug(ghost);
  }
  window.addEventListener('resize', () => snug(noteGhost));

  /* every ghost holds its longest line from the first frame, so no box under
     the shape changes size once it is on screen. Swiftee's box wraps its
     lines, so its ghost is plain text rather than words -- the trapezium's
     name quiz, which shares the box, does the same */
  noteGhost.textContent = longest([QUAD.ask].concat(Object.keys(QUAD.notes).map(k => QUAD.notes[k])));
  wordSpans(sayGhost, longest([QUAD.general, QUAD.area]));

  /* ---------- building a quadrilateral ---------- */
  const fmt = n => Math.round(n * 10) / 10;

  /* ---------- a length written ON its arrow ----------
   * The number used to be ringed in board colour so the arrow would not run
   * through it. The ring reads as a white border round the number, so the
   * ARROW is parted instead: its stroke is given a gap in the middle, as
   * wide as the number is. Returns '' for a label that already sits clear
   * of the line -- most of them do, and those arrows stay unbroken. */
  function arrowDash(a, b, label, size, at) {
    const L = Math.hypot(b.x - a.x, b.y - a.y);
    if (!L) return '';
    size = size || 17;
    const M = at || { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    /* how far off the line the label sits, and whether it sits along it */
    const off = Math.abs((b.x - a.x) * (a.y - M.y) - (a.x - M.x) * (b.y - a.y)) / L;
    const along = ((M.x - a.x) * (b.x - a.x) + (M.y - a.y) * (b.y - a.y)) / L;
    if (off > size * .5 || along < L * .15 || along > L * .85) return '';
    const gap = Math.min(String(label).length * size * .58 + 9, L * .82);
    const side = (L - gap) / 2;
    return fmt(side) + ' ' + fmt(gap) + ' ' + fmt(side);
  }
  const dashAttr = d => (d ? ' stroke-dasharray="' + d + '"' : '');
  const pt  = p => fmt(p.x) + ',' + fmt(p.y);

  /* ---- denoting a part ----
   * The working names a line: THAT LINE lights up where it stands, its name
   * with it -- a glow in its own hue swells round it, holds while the eye
   * finds it, and settles back (user, 2026-09-17: point at the line, not a
   * circle round it). Nothing moves and no stroke swells, so a part can be
   * denoted as often as the working names it without the picture
   * flickering. `hold` is how long the light stays on; a part asked for
   * again simply starts over. */
  let denoteSeq = 0;
  async function lineDenote(els, hold) {
    const parts = (Array.isArray(els) ? els : [els]).filter(Boolean);
    if (!parts.length) return;
    const mine = String(++denoteSeq);
    parts.forEach(el => { el.dataset.seq = mine; el.classList.add('denote'); });
    await wait(REDUCED ? 160 : (hold == null ? 900 : hold + 300));
    parts.forEach(el => { if (el.dataset.seq === mine) el.classList.remove('denote'); });
    await wait(REDUCED ? 60 : 340);
  }
  /* the quadrilateral's base is the diagonal it is measured along; a
     triangle's part is its height. Each goes lit with its own name. */
  const denoteQuad = (part, hold) => lineDenote(part === 'base'
    ? [joinLine, quadDims.querySelector('.lbl-base')]
    : [quadSvg.querySelector('.h-' + part), quadDims.querySelector('.lbl-' + part)], hold);

  /* ---- naming a half of the shape ----
   * The working calls the two halves "Triangle 1" and "Triangle 2". Each
   * name is written in the empty corner beside its half, and a dashed curve
   * loops from the name into the half, ending in a small arrow head -- so
   * the name in the formula and the colour on the board are tied together
   * without writing anything over the drawing. The curve is a quadratic
   * Bezier; its control point is the straight line's midpoint pushed out
   * sideways by `bow`, which is what gives it its loop.
   *
   * `triNames` keeps each one's three points, so the curve can be grown out
   * from the name a piece at a time when the formula gets there. */
  let triNames = {};
  const lerpPt = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
  /* the first `t` of a quadratic, exactly: de Casteljau's two lerps give the
     shorter curve's own control point and end */
  function curveTo(P0, K, P2, t) {
    const A = lerpPt(P0, K, t), B = lerpPt(K, P2, t), E = lerpPt(A, B, t);
    return 'M' + fmt(P0.x) + ' ' + fmt(P0.y) + ' Q' + fmt(A.x) + ' ' + fmt(A.y) + ' ' + fmt(E.x) + ' ' + fmt(E.y);
  }
  /* The quadrilateral's names by default. The rhombus's area page writes its
     own two the same way (user, 2026-09-30): `store` is where the curves'
     points are kept for showTriName, and `k` scales the lettering and the
     arrow head to a drawing whose units are smaller on screen. */
  function triNameArt(spec, store, k) {
    if (!store) store = triNames = {};
    k = k || 1;
    if (!spec.names) return '';
    return spec.names.map((n, i) => {
      const t = spec.tris[i];
      const d = { x: n.to.x - n.from.x, y: n.to.y - n.from.y };
      const L = Math.hypot(d.x, d.y) || 1;
      const bow = n.bow == null ? 16 : n.bow;
      /* the control point: out to one side of the straight run between them */
      const K = { x: (n.from.x + n.to.x) / 2 - d.y / L * bow, y: (n.from.y + n.to.y) / 2 + d.x / L * bow };
      store[t.color] = { P0: n.from, K: K, P2: n.to };
      /* the head sits on the curve's own last direction, not the chord's */
      const h = { x: n.to.x - K.x, y: n.to.y - K.y };
      const hl = Math.hypot(h.x, h.y) || 1;
      const u = { x: h.x / hl, y: h.y / hl }, v = { x: -u.y, y: u.x };
      const back = { x: n.to.x - u.x * 9 * k, y: n.to.y - u.y * 9 * k };
      const w = 5 * k;
      return '<g class="tname tname-' + t.color + '">' +
        '<path class="tname-curve" d="M' + fmt(n.from.x) + ' ' + fmt(n.from.y) + '" />' +
        '<path class="tname-head" d="M' + fmt(back.x + v.x * w) + ' ' + fmt(back.y + v.y * w) +
          ' L' + fmt(n.to.x) + ' ' + fmt(n.to.y) +
          ' L' + fmt(back.x - v.x * w) + ' ' + fmt(back.y - v.y * w) + '" />' +
        '<text class="tname-text" x="' + fmt(n.at.x) + '" y="' + fmt(n.at.y) + '" font-size="' + fmt(14 * k) + '" ' +
          'text-anchor="middle" dominant-baseline="middle">' + n.text + '</text>' +
      '</g>';
    }).join('');
  }

  /* the formula names a half: its name comes up beside the shape and the
     curve draws itself in, once per scene. `root` and `store` are the
     rhombus's own, where it is the rhombus being named (see triNameArt) */
  async function showTriName(color, root, store) {
    const g = (store || triNames)[color];
    const grp = (root || quadNames).querySelector('.tname-' + color);
    if (!g || !grp || grp.classList.contains('on')) return;
    grp.classList.add('on');
    await wait(REDUCED ? 60 : 260);
    await tween(REDUCED ? 0 : 620, e => {
      grp.querySelector('.tname-curve').setAttribute('d', curveTo(g.P0, g.K, g.P2, e));
    }, easeInOut);
    grp.classList.add('done');
  }

  /* A name written beside the line it belongs to, upright.
     Every label on the quadrilateral used to be turned to run along its
     line, which read as a different kind of mark from the working it is
     being checked against -- and put h₁ on its side. They are all
     straight now, and kept off the drawing by being ANCHORED away from it
     rather than merely offset: `away` is the direction the label was pushed
     in, so however long the word, it grows into the clear. */
  function labelAt(M, away) {
    const anchor = Math.abs(away.x) < .35 ? 'middle' : (away.x > 0 ? 'start' : 'end');
    const base   = Math.abs(away.y) < .35 ? 'middle' : (away.y > 0 ? 'hanging' : 'auto');
    return 'x="' + fmt(M.x) + '" y="' + fmt(M.y) + '" font-size="13" ' +
           'text-anchor="' + anchor + '" dominant-baseline="' + base + '"';
  }

  function buildQuad(spec) {
    const P = spec.pts;
    const [d1, d2] = spec.diag;
    const A = P[d1], B = P[d2];
    const dx = B.x - A.x, dy = B.y - A.y;
    const L2 = dx * dx + dy * dy, len = Math.sqrt(L2);

    /* the shape: one fill, the two halves, the outline that draws itself */
    let art = '<polygon class="shape-fill" clip-path="url(#wipeQuad)" points="' + ORDER.map(k => pt(P[k])).join(' ') + '" />';
    spec.tris.forEach(t => {
      art += '<polygon class="tri-fill c-' + t.color + '" points="' + pt(A) + ' ' + pt(P[t.apex]) + ' ' + pt(B) + '" />';
    });
    art += '<path class="shape-outline" d="M' + ORDER.map(k => fmt(P[k].x) + ' ' + fmt(P[k].y)).join(' L') + ' Z" fill="none" stroke-width="5" />';
    /* each triangle's own two outer sides, stacked on the path just drawn --
       see .tri-outline: normally invisible, and only shown (in the focused
       half's colour, the other's dimmed) once a half is in focus */
    {
      const iA = ORDER.indexOf(d1), iB = ORDER.indexOf(d2);
      const arcKeys = (from, to) => {
        const out = [];
        for (let i = from; ; i = (i + 1) % ORDER.length) {
          out.push(ORDER[i]);
          if (i === to) break;
        }
        return out;
      };
      const arcs = [arcKeys(iA, iB), arcKeys(iB, iA)];
      spec.tris.forEach(t => {
        const arc = arcs.find(a => a.indexOf(t.apex) >= 0);
        /* `ol-<color>`, not `c-<color>` -- that class also drives the
           fill's pulse-on-focus animation, whose transform-box/origin are
           set up for a polygon, not this path */
        art += '<path class="tri-outline ol-' + t.color + '" d="M' +
          arc.map(k => fmt(P[k].x) + ' ' + fmt(P[k].y)).join(' L') + '" fill="none" stroke-width="5" />';
      });
    }
    quadArt.innerHTML = art;
    quadFill = quadArt.querySelector('.shape-fill');
    quadCorners = ORDER.map(k => P[k]);

    /* each height: from the triangle's far corner straight down onto the
       diagonal, a right-angle mark at its foot, and its name written
       upright beside it. The three are one group per triangle, so a scene
       writing one triangle's area can step the other's height back without
       reaching past the inline opacity the line's own draw leaves on it. */
    let dims = '';
    spec.tris.forEach(t => {
      const X = P[t.apex];
      const tt = ((X.x - A.x) * dx + (X.y - A.y) * dy) / L2;
      const F = { x: A.x + dx * tt, y: A.y + dy * tt };
      const side = tt < .5 ? 1 : -1;                        /* toward the farther end */
      const u = { x: dx / len * side, y: dy / len * side };
      const hv = { x: X.x - F.x, y: X.y - F.y };
      const hl = Math.hypot(hv.x, hv.y);
      const v = { x: hv.x / hl, y: hv.y / hl };
      t.foot = tt;
      const s = 11;
      const M = { x: (X.x + F.x) / 2 + u.x * 11, y: (X.y + F.y) / 2 + u.y * 11 };
      dims += '<g class="hgrp hgrp-' + t.color + '">' +
              '<line class="dim h-' + t.color + '" x1="' + fmt(X.x) + '" y1="' + fmt(X.y) + '" x2="' + fmt(F.x) + '" y2="' + fmt(F.y) + '" />' +
              '<path class="dim-mark mark-' + t.color + '" d="M' + fmt(F.x + u.x * s) + ' ' + fmt(F.y + u.y * s) +
              ' L' + fmt(F.x + u.x * s + v.x * s) + ' ' + fmt(F.y + u.y * s + v.y * s) +
              ' L' + fmt(F.x + v.x * s) + ' ' + fmt(F.y + v.y * s) + '" />' +
              '<text class="dim-label lbl-h lbl-' + t.color + '" ' + labelAt(M, u) + '>' + t.label + '</text>' +
              '</g>';
    });
    /* the base label: under the MIDDLE of the diagonal, on the side of the
       triangle whose height comes down farthest from that middle -- so the
       name and a right-angle mark never land on the same spot */
    {
      const clear = spec.tris.reduce((a, b) => (Math.abs(b.foot - .5) > Math.abs(a.foot - .5) ? b : a));
      const X = P[clear.apex];
      const mid = { x: A.x + dx * .5, y: A.y + dy * .5 };
      let n = { x: -dy / len, y: dx / len };
      if ((X.x - mid.x) * n.x + (X.y - mid.y) * n.y < 0) n = { x: -n.x, y: -n.y };
      const M = { x: mid.x + n.x * 13, y: mid.y + n.y * 13 };
      dims += '<text class="dim-label lbl-base" ' + labelAt(M, n) + '>' + spec.base + '</text>';
    }
    quadDims.innerHTML = dims;
    quadRings.innerHTML = '';                 /* the rings went: the line itself lights now */
    quadNames.innerHTML = triNameArt(spec);

    /* the corners; the hit circle is bigger than the dot it serves */
    quadDots.innerHTML = ORDER.map(k =>
      '<g class="corner" data-corner="' + k + '"><circle class="dot" cx="' + P[k].x + '" cy="' + P[k].y + '" r="4.5" />' +
      '<circle class="dot-hit" cx="' + P[k].x + '" cy="' + P[k].y + '" r="22" /></g>').join('');
    corners = Array.from(quadDots.querySelectorAll('.corner'));
    corners.forEach(c => c.addEventListener('pointerdown', onCornerDown));
    CORNERS = {};
    ORDER.forEach(k => { CORNERS[k] = P[k]; });

    /* a clean slate: no split, no lights, no lines, one column -- neither
       the quiz's half-and-half nor the working's two fifths */
    quadShape.className = 'quad-shape';
    quad.classList.remove('wide', 'ask', 'own');
    setLine(joinLine, A, A);
    joinLine.classList.remove('live', 'bad', 'done');
    demoG.classList.remove('on');
    areaLinesEl.textContent = '';
  }


  /* A typewriter bound to one box. A line that comes in while an earlier one
     is still typing takes the box over from it, as feedback() does above. */
  function typer(txt, blink, perChar) {
    let gen = 0;
    return async function (text) {
      const g = ++gen;
      await speakerUp(txt);
      if (g !== gen) return;
      const said = await voSay(text);
      if (g !== gen) return;
      blink.hidden = true;
      const whole = await typePieces(txt, [{ t: text }], said, perChar, 0, null, () => g === gen);
      if (!whole || g !== gen) return;
      await voHold(said);
      if (g === gen) speakerDone(txt);
    };
  }
  const aside = typer(sayTxt, sayCaret, TYPE_MS);     /* Swiftee's line beside itself */

  /* ---------- Swiftee's box in the name quiz ----------
   * The question and every answer to a choice are spoken from the box beside
   * the bird, not typed under the sentence: the box pops out of its own tail
   * the first time and then simply changes what it holds, green for the
   * right name and red for a wrong one.
   * The words are laid out whole and eased in together, as the trapezium's
   * are, so the learner reads one sentence rather than watching it arrive --
   * and they are laid in BEFORE the box opens, so a second try never shows
   * the last try's line for the frame before its own is written. */
  async function quizSay(text, tone, onPiece) {
    /* the box fits the line it is saying: a ghost holding the longest line
       kept a one-line question in a two-line box, mostly empty (review,
       2026-09-25). It is reserved BEFORE the bird is brought up -- the same
       rule as the heading's (see mascotWithLine): sized after the jump, the
       box takes its width under a bird that has already landed and shoves
       it sideways a beat after it arrives. */
    /* the first piece is fitted before the bird comes up (see above) */
    fitTo(noteGhost, segChunks([{ t: text }])[0].segs.map(sg => sg.t).join(''));
    await speakerUp(noteTxt);
    quizBubble.classList.remove('ok', 'bad');
    if (tone) quizBubble.classList.add(tone);
    noteCaret.hidden = true;
    /* the words of each piece are all there at once, so the voice is not
       paced against them -- it is simply said over them, a piece at a time,
       and the beat lasts as long as it takes to say */
    const said = sayPieces(noteTxt, text, piece => {
      fitTo(noteGhost, piece);
      if (onPiece) onPiece(piece);
    });
    quizBubble.classList.add('show');
    await said;
    /* no speakerDone: the question has to stay on screen, with the bird
       beside it, while the learner picks a name. The scene takes both down
       itself once the quiz is over. */
  }

  /* ---------- counting the sides ----------
   * "A quadrilateral has 4 sides." -- said over the shape it is about, each
   * side is traced in green in turn, clockwise from the top, with its count
   * (1, 2, 3, 4) popping up beside it, so the learner sees the four being
   * counted as they hear it (user, 2026-09-28). The four are spread across
   * `ms`, the time the sentence takes to say; they hold a moment together,
   * then fade. */
  function countSides(ms) {
    if (fastForward || !quadCorners) return;
    const NS = 'http://www.w3.org/2000/svg';
    const pts = quadCorners;
    const cx = pts.reduce((n, p) => n + p.x, 0) / pts.length;
    const cy = pts.reduce((n, p) => n + p.y, 0) / pts.length;
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'side-count');
    quadArt.appendChild(g);
    const lead = ms * .12;
    const step = ms * .78 / pts.length;
    const mine = runToken;
    pts.forEach((a, i) => {
      const b = pts[(i + 1) % pts.length];
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('class', 'side-lit');
      line.setAttribute('x1', fmt(a.x)); line.setAttribute('y1', fmt(a.y));
      line.setAttribute('x2', fmt(b.x)); line.setAttribute('y2', fmt(b.y));
      line.style.strokeDasharray = len;
      line.style.strokeDashoffset = len;
      g.appendChild(line);
      line.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
        { duration: step * .85, delay: lead + i * step, easing: 'ease-out', fill: 'both' });

      /* the count, just outside the side's middle */
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      const ox = mx - cx, oy = my - cy, ol = Math.hypot(ox, oy) || 1;
      const bx = mx + ox / ol * 17, by = my + oy / ol * 17;
      const badge = document.createElementNS(NS, 'g');
      badge.setAttribute('class', 'side-n');
      badge.setAttribute('transform', 'translate(' + fmt(bx) + ' ' + fmt(by) + ')');
      badge.innerHTML = '<g class="pop"><circle r="11" /><text dy=".35em">' + (i + 1) + '</text></g>';
      g.appendChild(badge);
      badge.firstChild.animate([
        { transform: 'scale(0)', opacity: 0 },
        { transform: 'scale(1.25)', opacity: 1, offset: .6 },
        { transform: 'scale(1)', opacity: 1 }
      ], { duration: 320, delay: lead + i * step + step * .45, easing: 'ease-out', fill: 'both' });
    });
    /* all four together once the last is in, then gone */
    setTimeout(() => {
      if (mine !== runToken || !g.isConnected) return;
      g.classList.add('all');
      g.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, delay: 1300, fill: 'forwards' })
        .finished.then(() => g.remove(), () => g.remove());
    }, lead + pts.length * step);
  }

  /* ---------- the bird arrives with its line ----------
   * Swiftee is never left standing beside an empty heading: it waits behind
   * the board until there is something to say, comes up as the line is about
   * to start, and the words follow one beat later. Every line typed into the
   * heading goes through here, so the rule holds wherever a scene puts its
   * text -- and a scene that used to bring the bird up early simply leaves it
   * to this.
   *
   * The line's width is reserved before the jump is measured. The heading is
   * a centred row and the bird stands at the left end of it, so its spot
   * moves as soon as the ghost takes the line's width: reserving first means
   * the bird lands where the line will actually put it, instead of landing in
   * the middle of an empty row and being shoved sideways a beat later. */
  const MASCOT_LEAD = 200;
  let mascotArriving = null;
  function mascotWithLine(text) {
    /* one arrival at a time: some scenes start a line without waiting on it
       and then start the next, and two jumps running together would show as
       the bird flickering in twice */
    if (mascotArriving) return mascotArriving;
    /* somebody is already on the board -- at the heading, or down at a banner
       the scene has deliberately sent the bird to -- or the bird is already in
       the air between two spots; either way it does not jump again for this
       line. A bird on its way BACK behind the board is the exception: that
       trip was the hand-over to the learner, and it has been answered. */
    cancelDismiss();
    if (!mascotLeaving && !dismissing &&
        (board.querySelector('.mascot.in') ||
         hopper.classList.contains('on') ||
         flyer.classList.contains('on'))) return Promise.resolve();
    if (typeof text === 'string') promptLine(text);
    mascotArriving = (async () => {
      try {
        /* An answer given while the bird was still dropping out of sight:
           let it land before calling it back up, or the jump in would start
           from a sprite that is halfway through leaving -- and the line
           would type with nobody beside it. */
        if (mascotLeaving) await mascotLeaving;
        if (dismissing) await dismissing;
        if (board.querySelector('.mascot.in')) return;
        await mascotJumpIn();
        await wait(MASCOT_LEAD);
      } finally { mascotArriving = null; }
    })();
    return mascotArriving;
  }

  /* ---------- the heading stands down ----------
   * Swiftee explains from the heading; when it has finished and the board
   * becomes the learner's, the bird jumps back behind the board and takes
   * its line with it, so the row folds and the shape has the whole of the
   * board to itself while the learner works (user, 2026-09-21).
   *
   * Only at the hand-over, never between two lines of the same explanation:
   * the trapezium's derivation says ten lines from the heading one after
   * another, and a hop out and back between each would pump the board the
   * length of the page. The hand-over is lockInput(false) -- the one moment
   * the mission says "your turn" -- and by then the line's clip has already
   * finished, because every heading line is awaited through voHold.
   *
   * The row folding is roomHeight()'s doing, not this function's: with the
   * line gone and the bird away, the room measures zero and fitRooms closes
   * it. The close is delayed, so an answer given straight away never moves
   * the board at all.
   */
  let mascotLeaving = null;
  let leaveSeq = 0;
  function headingAside() {
    /* a scene holding the bird in the heading through its explanation keeps
       it -- and its line -- at the hand-over too (see headStay) */
    if (headStay) return;
    /* the hand-over folds the row at once: nothing is coming back to it */
    headKeepUntil = 0;
    cancelDismiss(promptTxt);
    headingDown();
  }
  /* The line goes, and the bird with it if it is standing by the heading.
     The warm-up's row is held open whatever stands in it, so there the words
     and the bird simply leave and nothing on the board moves. */
  function headingDown() {
    feedbackGen++;                     /* a feedback line still typing stops */
    caret.hidden = true;
    /* The words go once the bird is off its spot, not before: the heading
       centres its line with the bird at the left end of it, so a line
       cleared while the bird still stands there re-centres the row and
       shoves the sprite sideways just as it leaves. A line staged for the
       NEXT heading while this trip gets under way is not ours to wipe
       (promptStage). */
    const staged = promptStage;
    const wipe = () => {
      if (staged !== promptStage) return;
      promptTxt.textContent = '';
      promptGhost.textContent = '';
    };
    if (!boardMascot.classList.contains('in')) { wipe(); return; }   /* not ours to move */
    const mine = ++leaveSeq;
    mascotLeaving = mascotJumpOut(boardMascot, wipe).catch(() => {}).then(() => {
      if (mine === leaveSeq) mascotLeaving = null;   /* the latest trip landed */
    });
  }

  /* ---------- the line said, the speaker goes ----------
   * Once Swiftee has said a line and its voice-over has finished, the line
   * leaves the screen and the bird goes with it -- wherever it was said
   * from: the heading, the quiz bubble, a box beside the shape (user,
   * 2026-09-25). A short grace keeps the bird for a line that follows
   * straight on from the last, so one explanation said in two lines does not
   * send it away and back between them; a line said after the grace brings
   * it back up (see speakerUp and mascotWithLine).
   *
   * Every typewriter reports here when its line is done, keyed by the box
   * it typed into, and only a box registered with speaker() has a bird to
   * send away. A scene that moves the bird itself -- a hop, a jump, a drop
   * -- cancels whatever is pending: the scene knows where it wants it.
   *
   * A heading cleared mid-explanation keeps its row a little longer, so the
   * board does not fold up and open again between two lines of the same
   * explanation; the hand-over folds it at once (headingAside). */
  const DISMISS_GRACE = 650;
  /* the warm-up keeps the heading's bird up between its lines, until round
     2's line has been said (see startRound) */
  var headStay = false;
  /* The trapezium pages (22 to 29) keep the bird up WHEREVER it is standing
     -- the heading, or a spot beside the working -- until the scene is over:
     a bird that hopped away after every line and back in for the next read
     as flickering (user, 2026-09-29). Set by the scene, cleared by the next
     sceneStart. */
  var birdStay = false;
  function holdBird() { headStay = true; birdStay = true; }
  const HEAD_KEEP_MS = 2600;
  function speaker(txt, spot, clear) {
    SPEAKERS.set(txt, { spot: spot, clear: clear || null, gone: false, timer: 0 });
  }
  /* one box's pending dismissal, or every one */
  function cancelDismiss(txt) {
    SPEAKERS.forEach(function (sp, key) {
      if (txt && key !== txt) return;
      if (sp.timer) { clearTimeout(sp.timer); sp.timer = 0; }
    });
  }
  function speakerDone(txt) {
    const sp = SPEAKERS.get(txt);
    if (!sp) return;
    if (birdStay) return;
    if (headStay && sp.spot === boardMascot) return;
    if (sp.timer) clearTimeout(sp.timer);
    const mine = runToken;
    sp.timer = setTimeout(function () {
      sp.timer = 0;
      if (mine !== runToken) return;   /* the scene went down meanwhile */
      dismissNow(txt, sp);
    }, fastForward ? 0 : DISMISS_GRACE);
  }
  function dismissNow(txt, sp) {
    if (sp.spot === boardMascot) {
      if (!txt.childNodes.length && !boardMascot.classList.contains('in')) return;
      headKeepUntil = performance.now() + HEAD_KEEP_MS;
      setTimeout(askRooms, HEAD_KEEP_MS + 40);
      headingDown();
      return;
    }
    /* the line and its box go once the bird is off the spot, not before:
       cleared while it still stands there, the row re-centres and shoves
       the sprite sideways just as it leaves (same rule as headingDown) */
    const off = () => {
      if (sp.clear) sp.clear();
      txt.textContent = '';
    };
    if (!sp.spot.classList.contains('in')) { off(); return; }
    sp.gone = true;
    const p = mascotJumpOut(sp.spot, off).catch(() => {}).then(() => {
      if (dismissing === p) dismissing = null;
    });
    dismissing = p;
  }
  /* A line is about to be said in this box. Anything pending waits for the
     line to be done instead; a bird sent away from here comes back up first
     -- unless it is standing somewhere else on the board, where the scene
     has put it. The heading's bird is mascotWithLine's to bring. */
  async function speakerUp(txt) {
    cancelDismiss();
    const sp = SPEAKERS.get(txt);
    if (!sp) return;
    if (sp.spot === boardMascot) return mascotWithLine(null);
    if (dismissing) await dismissing;
    if (!sp.gone) return;
    sp.gone = false;
    if (sp.spot.classList.contains('in') || board.querySelector('.mascot.in') ||
        hopper.classList.contains('on') || flyer.classList.contains('on')) return;
    await mascotJumpIn(sp.spot);
    await wait(MASCOT_LEAD);
  }
  /* A scene moving the bird itself: a line's pending send-off is dropped,
     and a trip already under way lands before the next one starts, so two
     jumps never share the hopper. */
  async function birdFree() {
    cancelDismiss();
    if (dismissing) await dismissing;
    if (mascotLeaving) await mascotLeaving;
  }
  speaker(promptTxt, boardMascot);
  speaker(noteTxt, quizMascot, () => quizBubble.classList.remove('show', 'ok', 'bad'));
  speaker(sayTxt, sideMascot);

  /* Between scenes the bird STAYS where it is: a rebuild that sent it behind
     the board every time reads as blinking, whatever the heading is doing.
     Only the section transitions that always took it down still do. */

  /* Swiftee says a line from its place by the heading */
  async function heading(text) {
    feedbackGen++;
    await mascotWithLine(text);
    swiftee.hold('talking');
    await typewrite(text, text.length * TYPE_MS);
    swiftee.release();
  }

  /* the formula typewriter, generalised: a line in segments, with a pause
     and a callback each time a key word completes */
  async function typeSegments(txt, blink, segs, perChar, pause, onWord) {
    /* the whole line, as it will read on screen, is what the clip is found
       by -- a line in pieces is still one sentence to the ear */
    await speakerUp(txt);
    const whole = segs.map(sg => sg.t).join('');
    const said = await voSay(whole);
    blink.hidden = true;
    /* a piece at a time, every word of the piece in place before the first
       shows; the clip covers the pauses between the key words as well as
       the words themselves (see typePieces) */
    await typePieces(txt, segs, said, perChar, pause, onWord, null);
    await voHold(said);
    speakerDone(txt);
  }

  /* an eased 0 -> 1 over ms, driven by the frame clock; a skip lands it at 1.
     Ease-out cubic unless told otherwise. */
  const easeOut   = p => 1 - Math.pow(1 - p, 3);
  const easeInOut = p => (p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
  function tween(ms, step, ease) {
    const fn = ease || easeOut;
    const mine = runToken;
    if (REDUCED || fastForward) { step(1); return wait(0); }
    return new Promise((resolve, reject) => {
      const t0 = performance.now();
      (function f(t) {
        if (mine !== runToken) return reject(CANCELLED);     /* a replay took the scene down */
        const p = fastForward ? 1 : Math.min(1, (t - t0) / ms);
        step(fn(p));
        if (p < 1) requestAnimationFrame(f);
        else resolve();
      })(t0);
    });
  }

  function setLine(line, a, b) {
    line.setAttribute('x1', a.x); line.setAttribute('y1', a.y);
    line.setAttribute('x2', b.x); line.setAttribute('y2', b.y);
  }
  function setEnd(line, b) {
    line.setAttribute('x2', b.x); line.setAttribute('y2', b.y);
  }
  /* a screen position in the svg's units */
  function svgPoint(x, y) {
    const p = quadSvg.createSVGPoint();
    p.x = x; p.y = y;
    const m = quadSvg.getScreenCTM();
    return m ? p.matrixTransform(m.inverse()) : p;
  }
  function nearCorner(p, except) {
    let best = null, bd = HIT;
    Object.keys(CORNERS).forEach(k => {
      if (k === except) return;
      const el = cornerEl(k);
      if (el && el.classList.contains('spare')) return;   /* hidden: see onlyCorners */
      const c = CORNERS[k];
      const d = Math.hypot(c.x - p.x, c.y - p.y);
      if (d < bd) { bd = d; best = k; }
    });
    return best;
  }
  const cornerEl = k => corners.find(c => c.dataset.corner === k);

  /* ---------- a hop from one spot on the board to another ----------
   * Over the board this time, so the flyer carries the sprite: it takes over
   * at the first spot, flies the arc, and hands back at the second. All the
   * spots are the same size, so the box is simply moved. The arc is a
   * parabola on a linear clock -- the way a real jump moves -- with the
   * height of the spring scaled to how far it has to go. */
  async function hopBetween(fromEl, toEl, between) {
    /* The bird is not standing where the hop was meant to start: the board
       was handed over to the learner and it went home behind the board (see
       headingAside). A hop from an empty spot would run the whole
       choreography on an invisible sprite and then pop the bird in at the
       far end, so it comes up from behind the board instead -- which is
       where it actually is. The same if it has just been sent away after
       its line (see speakerDone): the trip down is let finish first. */
    await birdFree();
    if (!fromEl.classList.contains('in')) {
      if (between) await between();
      return mascotJumpIn(toEl);
    }
    const a = fromEl.getBoundingClientRect();
    let b = toEl.getBoundingClientRect();
    /* `between` changes the board under the bird once it has left the
       ground -- a layout the landing spot only exists in -- so it runs
       with the flyer carrying the sprite, and the landing is measured
       after it */
    if (!a.width || REDUCED) {
      fromEl.classList.remove('in');
      if (between) await between();
      toEl.classList.add('in');
      return;
    }

    /* a crouch before the spring */
    const crouch = fromEl.animate(
      [{ transform: 'none' }, { transform: 'translateY(5%) scale(1.06, .92)' }],
      { duration: 150, easing: 'ease-in', fill: 'forwards' }
    );
    await finished(crouch);

    /* the crouch is held by its fill, so this is the sprite's own last
       painted box: the flyer takes over from there. Measured -- and handed
       over -- before the crouch is let go, or the box read here is the
       sprite standing up straight while the pixels on screen are still
       crouched, and the character pops 8% taller on the hand-over frame.
       The same order as the hopper's hand-over further up. */
    const at0 = fromEl.getBoundingClientRect();
    birdTrip = [fromEl, toEl];                  /* both ends hold their room */
    Object.assign(flyer.style, {
      left: at0.left + 'px', top: at0.top + 'px', width: at0.width + 'px', height: at0.height + 'px'
    });
    flyer.classList.add('on');
    fromEl.classList.remove('in');
    crouch.cancel();
    if (between) { await between(); b = toEl.getBoundingClientRect(); }

    const dx = b.left - at0.left;
    const dy = b.top - at0.top;
    const arc = Math.min(170, Math.max(70, Math.abs(dx) * .3 + Math.max(0, -dy) * .2));
    /* The spots down beside a shape are a size larger than the heading's
       (style.css), so the sprite grows or shrinks in the air to arrive at
       the size of where it lands -- in the landing's squash, which is the
       pose the landing below starts from. Scaled from its top-left corner,
       so the translation still carries that corner onto the spot's. */
    const sx = b.width * 1.06 / at0.width, sy = b.height * .92 / at0.height;
    flyer.style.transformOrigin = '0 0';
    const N = 18;
    const kf = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      kf.push({ transform: 'translate(' + (dx * t) + 'px, ' + (dy * t - arc * 4 * t * (1 - t)) + 'px)' +
                ' scale(' + (1 + (sx - 1) * t) + ', ' + (1 + (sy - 1) * t) + ')' });
    }
    const fly = flyer.animate(kf, {
      duration: Math.min(900, 480 + Math.hypot(dx, dy) * .35), easing: 'linear', fill: 'forwards'
    });
    await finished(fly);

    /* and the same hand-over rule on the way down: the destination is
       measured again, so if a row opened or closed while the bird was in the
       air it appears where the flyer left it and eases across to the spot,
       instead of being cut there in a single frame */
    const at1 = toEl.getBoundingClientRect();
    const ox = (at0.left + dx) - at1.left;
    const oy = (at0.top + dy) - at1.top;
    const from = 'translate(' + ox + 'px, ' + oy + 'px) scale(1.06, .92)';
    toEl.style.transform = from;
    toEl.classList.add('in');
    flyer.classList.remove('on');
    fly.cancel();
    flyer.style.removeProperty('transform-origin');
    const land = toEl.animate(
      [{ transform: from }, { transform: 'none' }],
      { duration: 220, easing: 'ease-out', fill: 'forwards' }
    );
    try { await finished(land); } finally { toEl.style.removeProperty('transform'); land.cancel(); birdTrip = []; }
  }

  /* ---------- drop-downs ----------
   * Custom ones, so the box can be a slot, shake, go green and open with a
   * pop: a native select can do none of that. makeDD builds one; ddController
   * runs one -- the quiz's, written in the HTML, and every one built here. */
  /* `hint` is a faint word shown in the box until a value is chosen -- what
     the box is asking for, so a numerical question guides the choice */
  function makeDD(opts, small, hint) {
    const root = document.createElement('div');
    root.className = 'dd' + (small ? ' dd-small' : '');
    root.innerHTML =
      '<button class="dd-btn" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="' + (hint ? T('ddChooseThe', { hint: hint }) : T('ddChooseAnswer')) + '">' +
        '<span class="dd-value"' + (hint ? ' data-hint="' + hint + '"' : '') + '></span>' +
        '<svg class="dd-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16l-8 10z" /></svg>' +
      '</button><div class="dd-menu" role="listbox"></div>';
    const menu = root.querySelector('.dd-menu');
    opts.forEach(o => {
      const b = document.createElement('button');
      b.className = 'dd-opt';
      b.type = 'button';
      b.setAttribute('role', 'option');
      b.dataset.value = o.v;
      setTxt(b, o.t);
      menu.appendChild(b);
    });
    return root;
  }

  function closeMenus() {
    document.querySelectorAll('.dd.open').forEach(d => {
      d.classList.remove('open');
      const b = d.querySelector('.dd-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
  document.addEventListener('click', closeMenus);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenus(); });

  function ddController(root) {
    const btn   = root.querySelector('.dd-btn');
    const value = root.querySelector('.dd-value');
    const opts  = Array.from(root.querySelectorAll('.dd-opt'));
    let live = false, check = null, onRight = null, onWrong = null, resolve = null, resetT = null, fill = null, quiet = false;

    function open(on) {
      root.classList.toggle('open', !!on);
      btn.setAttribute('aria-expanded', on ? 'true' : 'false');
    }
    btn.addEventListener('click', e => {
      if (!interactive || !live) return;
      e.stopPropagation();
      const was = root.classList.contains('open');
      closeMenus();
      open(!was);
      /* the tap has landed: the nudge has done its job and goes */
      root.classList.remove('hint');
      sfx('click', .5);
    });
    opts.forEach(o => o.addEventListener('click', e => {
      if (!interactive || !live) return;
      e.stopPropagation();
      choose(o, false);
    }));

    /* an answer goes in; `auto` is true when a skip put it there */
    function choose(opt, auto) {
      if (!live || !opt) return;
      open(false);
      clearTimeout(resetT);
      const v = opt.dataset.value;
      value.textContent = opt.textContent;
      root.classList.remove('hint', 'reject');
      root.classList.add('chosen');
      sfx('click', .5);

      /* ---- wrong: red shake, and the box empties again after a beat ---- */
      if (!check(v)) {
        sfx('wrong');
        swiftee.play('confused', 1);
        /* no reflow needed to restart it: motion.js takes over a shake
           already in flight rather than waiting for the old one to end */
        markWrong(root, btn);
        setTimeout(() => root.classList.remove('reject'), 430);
        if (onWrong) onWrong(v);
        resetT = setTimeout(() => {
          if (!live) return;
          value.textContent = '';
          root.classList.remove('chosen');
        }, 1500);
        return;
      }

      /* ---- right: the slot closes up green, confetti out of it ---- */
      live = false;
      skipFills.delete(fill);
      markRight(root, btn);
      sfx('correct', auto ? .55 : 1);
      if (!auto) {
        swiftee.play('happy', 1);
        /* `quiet`: the green box, the chime and the bird are the whole
           reaction -- for a scene that is saving its confetti for the end */
        if (!quiet) {
          sfx('confetti', .55);
          requestAnimationFrame(() => burst(btn));
        }
      }
      if (onRight) onRight(v);
      if (resolve) resolve(v);
    }

    return {
      root: root,
      /* resolves with the value once a right answer is in; a skip picks the
         first right one itself */
      ask(isRight, right, wrong, how) {
        return new Promise(res => {
          check = isRight; onRight = right || null; onWrong = wrong || null; resolve = res;
          quiet = !!(how && how.quiet);
          live = true;
          root.classList.add('hint');
          fill = () => choose(opts.find(o => isRight(o.dataset.value)), true);
          skipFills.add(fill);
        });
      }
    };
  }

  /* ---------- joining the corners ----------
   * Drag from one corner to another, or tap one and then the other. Only the
   * diagonal the scene is built around counts; the other pair is turned down
   * gently and the learner pointed back at it. */
  let joinLive = false;
  let joinResolve = null;
  let joinSignal = null;
  let joinPair = ['L', 'R'];
  let jdrag = null;            /* { from, start } while a corner is being dragged from */
  let armed = null;            /* a corner tapped once, waiting for its partner */
  const fillJoin = () => completeJoin(true);

  function setArmed(k) {
    corners.forEach(c => c.classList.toggle('armed', c.dataset.corner === k));
    armed = k;
  }
  function setHot(k) {
    corners.forEach(c => c.classList.toggle('hot', c.dataset.corner === k));
  }
  function hideDemo() { demoG.classList.remove('on'); }

  function onCornerDown(e) {
    if (!interactive || !joinLive) return;
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    const k = e.currentTarget.dataset.corner;

    /* the learner has taken hold: the hint has done its job */
    if (joinSignal) joinSignal.done = true;
    hideDemo();

    if (armed && armed !== k) {
      const from = armed;
      setArmed(null);
      return tryPair(from, k);
    }
    setArmed(null);

    const p = CORNERS[k];
    jdrag = { from: k, start: svgPoint(e.clientX, e.clientY) };
    setLine(joinLine, p, p);
    joinLine.classList.remove('bad', 'done');
    joinLine.classList.add('live');
    sfx('click', .5);

    window.addEventListener('pointermove', onJoinMove);
    window.addEventListener('pointerup', onJoinUp);
    window.addEventListener('pointercancel', onJoinUp);
  }

  function onJoinMove(e) {
    if (!jdrag) return;
    const q = svgPoint(e.clientX, e.clientY);
    setEnd(joinLine, q);
    setHot(nearCorner(q, jdrag.from));
  }

  async function onJoinUp(e) {
    if (!jdrag) return;
    window.removeEventListener('pointermove', onJoinMove);
    window.removeEventListener('pointerup', onJoinUp);
    window.removeEventListener('pointercancel', onJoinUp);

    const { from, start } = jdrag;
    jdrag = null;
    setHot(null);

    const q = svgPoint(e.clientX, e.clientY);
    const to = nearCorner(q, from);
    if (to) return tryPair(from, to);

    /* a tap, not a drag: the corner waits for its partner */
    if (Math.hypot(q.x - start.x, q.y - start.y) < 6) {
      joinLine.classList.remove('live');
      setArmed(from);
      return;
    }

    /* let go in the open: the line runs back into its corner */
    const a = CORNERS[from];
    const x = +joinLine.getAttribute('x2'), y = +joinLine.getAttribute('y2');
    await tween(260, p => setEnd(joinLine, { x: x + (a.x - x) * p, y: y + (a.y - y) * p }));
    if (!jdrag) joinLine.classList.remove('live');
  }

  function tryPair(a, b) {
    const ok = (a === joinPair[0] && b === joinPair[1]) || (a === joinPair[1] && b === joinPair[0]);
    if (ok) return completeJoin(false, a);
    return wrongJoin(a, b);
  }

  /* the other diagonal: shown red for a beat, then drawn back in */
  async function wrongJoin(a, b) {
    const A = CORNERS[a], B = CORNERS[b];
    setLine(joinLine, A, B);
    joinLine.classList.remove('live');
    joinLine.classList.add('bad');
    sfx('wrong');
    swiftee.play('confused', 1);
    feedback(QUAD.joinWrong(joinPair[0], joinPair[1]));
    [cornerEl(a), cornerEl(b)].forEach(c => c && c.classList.add('hot'));
    await wait(520);
    [cornerEl(a), cornerEl(b)].forEach(c => c && c.classList.remove('hot'));
    if (!joinLive || jdrag) return;        /* completed, or a new drag has begun */
    await tween(260, p => setEnd(joinLine, { x: B.x + (A.x - B.x) * p, y: B.y + (A.y - B.y) * p }));
    if (!jdrag) joinLine.classList.remove('bad');
  }

  /* the diagonal draws itself, corner to corner */
  async function drawJoin(a, b) {
    const A = CORNERS[a], B = CORNERS[b];
    setLine(joinLine, A, A);
    joinLine.classList.remove('bad', 'done');
    joinLine.classList.add('live');
    await tween(620, p => setEnd(joinLine, { x: A.x + (B.x - A.x) * p, y: A.y + (B.y - A.y) * p }));
    joinLine.classList.remove('live');
    joinLine.classList.add('done');
    quadShape.classList.add('joined');
  }

  /* the diagonal is in; `auto` is true when a skip drew it */
  async function completeJoin(auto, from) {
    if (!joinLive) return;
    joinLive = false;
    skipFills.delete(fillJoin);
    lockInput(true);
    if (joinSignal) joinSignal.done = true;
    hideDemo();
    setArmed(null);
    setHot(null);
    quadShape.classList.remove('live');

    const a = from || joinPair[0];
    const b = a === joinPair[0] ? joinPair[1] : joinPair[0];
    joinLine.classList.remove('bad');
    if (auto) {
      await drawJoin(a, b);
    } else {
      setLine(joinLine, CORNERS[a], CORNERS[b]);
      joinLine.classList.remove('live');
      joinLine.classList.add('done');
      quadShape.classList.add('joined');
    }
    sfx('correct', auto ? .55 : 1);
    if (!auto) swiftee.play('happy', 1);
    if (joinResolve) joinResolve();
  }

  function awaitJoin(signal, pair) {
    return waitForScene(resolve => {
      joinResolve = resolve;
      joinSignal = signal;
      joinPair = pair;
      joinLive = true;
      quadShape.classList.add('live');
      lockInput(false);
      skipFills.add(fillJoin);
    });
  }

  /* ---------- the hint under the instruction ----------
   * A dotted line grows from one corner of the pair to the other with a
   * finger riding its tip, again and again, until the learner takes hold of
   * a corner -- the way the ghost chip demonstrates a drag in the warm-up. */
  /* opts.withLine: the length of the line that asks for the join, in ms.
     The first pass then plays at once, faint, WITH the line -- the finger
     setting off on "Join" and reaching the far corner as "diagonal" is said
     (user, 2026-09-28) -- and the stuck-learner passes follow as before. */
  function demoJoin(signal, pair, opts) {
    const A = CORNERS[pair[0]], B = CORNERS[pair[1]];
    const S = 1.7;                 /* the hand glyph's scale; its fingertip is at (11.5, 3) */
    const handAt = (x, y) => demoHand.setAttribute('transform',
      'translate(' + (x - 11.5 * S) + ' ' + (y - 3 * S) + ') scale(' + S + ')');

    if (REDUCED) {
      /* no motion: the whole line, held, until the learner starts */
      return (async () => {
        await idleFor(signal);
        if (signal.done || fastForward) return;
        setLine(demoLine, A, B); handAt(B.x, B.y);
        demoG.classList.add('on');
        while (!signal.done && !fastForward) await wait(200);
        demoG.classList.remove('on');
      })();
    }

    async function pass(ms, soft) {
      ms = ms || 1300;
      setLine(demoLine, A, A); handAt(A.x, A.y);
      demoG.classList.toggle('soft', !!soft);
      demoG.classList.add('on');
      await wait(200);
      const mine = runToken;
      await new Promise((resolve, reject) => {
        const t0 = performance.now();
        (function f(t) {
          if (mine !== runToken) return reject(CANCELLED);
          if (signal.done || fastForward) return resolve();
          const p = Math.min(1, (t - t0) / ms);
          const e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;   /* ease-in-out */
          const x = A.x + (B.x - A.x) * e, y = A.y + (B.y - A.y) * e;
          setEnd(demoLine, { x: x, y: y }); handAt(x, y);
          if (p < 1) requestAnimationFrame(f);
          else resolve();
        })(t0);
      });
      if (signal.done) return;
      await wait(soft ? 700 : 380);
      demoG.classList.remove('on');
      await wait(300);
      demoG.classList.remove('soft');
    }

    return (async () => {
      if (opts && opts.withLine && !signal.done && !fastForward) {
        /* the fade-in and the hold at the far end come out of the line's
           length, so the finger arrives with its last word */
        await pass(Math.max(900, opts.withLine * .88 - 200), true);
      }
      while (!signal.done && !fastForward) {
        await idleFor(signal);
        if (signal.done || fastForward) break;
        await pass();
      }
      demoG.classList.remove('on');
    })();
  }

  /* ---------- the working ---------- */

  /* The board's middle cell goes from one column to two: the shape to the
     left two fifths, the working to the right three fifths. A grid cannot
     animate that change, so the shape's box is measured before and after and
     the move is played back as a transform from the old place to the new. */
  /* The shape floats from the middle into the left column -- always 40% of
     the board, the working taking the other 60% (CSS) -- sliding from where
     it was to where it now sits; if it has to fit the column it eases to
     that size on the way, in the same move. */
  /* where the drawing itself is on screen: the svg's box is the whole cell,
     the drawing sits centred in it at the viewBox's aspect */
  function drawnRect(svg) {
    const box = svg.getBoundingClientRect();
    const vb = svg.viewBox && svg.viewBox.baseVal;
    if (!vb || !vb.width || !box.width || !box.height) return { left: box.left, top: box.top, width: box.width, height: box.height, box: box };
    const k = Math.min(box.width / vb.width, box.height / vb.height);
    const w = vb.width * k, h = vb.height * k;
    return { left: box.left + (box.width - w) / 2, top: box.top + (box.height - h) / 2, width: w, height: h, box: box };
  }
  /* A drawing held at a size of its own, whatever the layout around it
     does: the svg is set exactly over the drawing, in px of its (unscaled)
     room. `size` is a drawn rect to take the size AND the height on screen
     of: the drawing is centred across where the layout would draw it, but
     stays at that rect's height -- never above the top of its room, so it
     cannot ride up over the heading. Without one, the drawing is held just
     as and where it is on screen now. (Only the across is read off the
     layout: the rooms under a stage ease to their new height over half a
     second, so the layout's up-and-down is not yet where it will settle.) */
  const PIN_PROPS = ['left', 'top', 'right', 'bottom', 'width', 'height', 'max-height'];
  function pinDrawn(svg, size) {
    const room = svg.parentNode;
    const cb = room.getBoundingClientRect();
    const k = room.offsetWidth ? cb.width / room.offsetWidth : 1;
    const now = drawnRect(svg);
    if (!now.width || !cb.width) return;
    const w = size ? size.width : now.width, h = size ? size.height : now.height;
    const x = size ? now.left + now.width / 2 - w / 2 : now.left;
    const y = size ? Math.max(size.top, cb.top) : now.top;
    Object.assign(svg.style, {
      left: (x - cb.left) / k + 'px', top: (y - cb.top) / k + 'px',
      width: w / k + 'px', height: h / k + 'px',
      right: 'auto', bottom: 'auto', maxHeight: 'none'
    });
    svg.dataset.pinned = '1';
  }
  function unpinDrawn(svg) {
    PIN_PROPS.forEach(p => svg.style.removeProperty(p));
    delete svg.dataset.pinned;
  }
  /* A held drawing kept at the height it is on screen now while the rows
     around its room open or close -- the heading opening under a hop moves
     the room down, and would take the drawing with it -- and only pushed
     down if the room's top comes past it. Returns the function that lets
     it go. */
  function holdHeight(svg) {
    const at = drawnRect(svg).top;
    let on = true;
    (function f() {
      if (!on || !svg.dataset.pinned) return;
      const room = svg.parentNode;
      const cb = room.getBoundingClientRect();
      const k = room.offsetWidth ? cb.width / room.offsetWidth : 1;
      svg.style.top = Math.max(0, (at - cb.top) / k) + 'px';
      requestAnimationFrame(f);
    })();
    return () => { on = false; };
  }
  /* a held drawing is let go if the window changes under it: its px were
     measured for the old size */
  window.addEventListener('resize', () => {
    document.querySelectorAll('svg[data-pinned]').forEach(unpinDrawn);
  });

  /* `keep`: the drawing glides to its new place at the size it already has,
     rather than easing to the size the new layout would give it -- it is
     held there at that size (pinDrawn) until a later layoutWide lets it go */
  async function layoutWide(sec, svg, on, cls, keep) {
    sec = sec || quad;
    svg = svg || quadSvg;
    const before = drawnRect(svg);
    /* `cls`: which two-column layout to glide into -- the working layout
       unless a scene has one of its own (the values scene's 50/50 split) */
    sec.classList.toggle(cls || 'wide', on !== false);
    /* the new layout's own place, measured with any hold let go */
    if (svg.dataset.pinned) unpinDrawn(svg);
    if (keep) pinDrawn(svg, before);
    const after = drawnRect(svg);
    if (REDUCED || !before.width || !after.width) return wait(120);

    const dx = before.left - after.left;
    const dy = before.top - after.top;
    const s  = before.width / after.width;          /* 1 while the size is kept */
    /* the transform turns about the drawing's own corner, not the box's */
    svg.style.transformOrigin = (after.left - after.box.left) + 'px ' + (after.top - after.box.top) + 'px';
    const a = svg.animate(
      [{ transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + s + ')' }, { transform: 'none' }],
      { duration: 900, easing: 'cubic-bezier(.45, 0, .15, 1)' }
    );
    const mine = runToken;
    try { await a.finished; } catch (e) {}
    svg.style.transformOrigin = '';
    retired(mine);
  }

  /* the whole-shape fill gives way to the two coloured halves */
  function splitShape() {
    if (quadFill) quadFill.style.opacity = '';
    quadShape.classList.add('split');
  }

  /* the perpendicular drops from the far corner to the base, then its
     right-angle mark appears at the foot. Nothing flares as it lands: the
     line is simply there, in its triangle's colour, and it is the working
     that points at it later. */
  async function dropHeight(color) {
    await growLine(quadSvg.querySelector('.h-' + color), 640);
    quadShape.classList.add('marked-' + color);
    await wait(260);
  }

  /* Once the shape is cut, its parts are named ONE AT A TIME, in the order
     the formula will need them.
     The base goes first and slowly: a ring sweeps round the diagonal, its
     full name is written under the middle of it, and then -- if the spec
     gives short names -- that name dissolves into b. Only then does each
     height drop onto the base, one after the other, each with its
     right-angle mark, its full name, and its own dissolve into h₁ and h₂
     (the next cut names its own pair h₁ and h₂ in the same way).
     Naming them together made the drawing arrive all at once; a part at a
     time, each one is read before the next appears. It all happens with the
     shape still in the middle of the board; only afterwards does it move
     aside for the working. */
  async function relabel(el, text) {
    if (!el) return;
    const out = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, fill: 'forwards' });
    await finished(out);
    el.textContent = text;
    out.cancel();
    await finished(el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320 }));
  }

  async function revealDims(spec, rename) {
    rename = rename !== false && !!spec.short;
    /* the slow look is for the scenes that go on to rename: elsewhere the
       base carries a measurement, there is nothing to dissolve into, and
       the drawing should not be held up over it */
    const slow = rename;

    /* 1. the base, on its own: the ring sweeps round the diagonal and the
          name settles under the middle of it, then becomes b */
    quadShape.classList.add('lit-base');
    await denoteQuad('base', REDUCED ? 200 : (slow ? 1000 : 480));
    await wait(REDUCED ? 120 : (slow ? 620 : 280));
    if (rename) {
      await relabel(quadDims.querySelector('.lbl-base'), spec.short.base);
      await wait(REDUCED ? 120 : 480);
    }

    /* 2. then a height at a time, each with its right-angle mark */
    for (let i = 0; i < spec.tris.length; i++) {
      const t = spec.tris[i];
      await dropHeight(t.color);
      quadShape.classList.add('lit-' + t.color);
      await wait(REDUCED ? 100 : 380);
      if (rename) {
        await relabel(quadDims.querySelector('.lbl-' + t.color), spec.short.h[i]);
        await wait(REDUCED ? 100 : 280);
      }
    }
  }

  /* ---- one half at a time ----
   * While a triangle's area is being written the OTHER half steps back --
   * its colour, its height, its right-angle mark, its name. Both halves
   * shaded alike meant the line being typed and the drawing beside it were
   * about different things; with one dimmed, the formula and the shape are
   * pointing at each other. Cleared once the working is about the two
   * together.
   *
   * The quadrilateral asks for this first; the parallelogram, cut into the
   * same two hues, asks for exactly the same thing, so the shape it is done
   * to is an argument rather than the one this was written for. */
  function focusTri(color, shape) {
    const el = shape || quadShape;
    el.classList.remove('focus-green', 'focus-purple');
    if (color) el.classList.add('focus-' + color);
    /* the quadrilateral's outline splits into its two halves' own sides
       while a half is focused, so the other one's border can dim along
       with the rest of it -- see .tri-outline. The parallelogram's and the
       rhombus's do the same, the focused half's drawn heavy. */
    if (el === quadShape || el === paraShape || el === rhomShape) el.classList.toggle('outline-split', !!color);
  }

  /* a key word has landed in the working: light the part of the drawing it
     names -- a triangle swells once, a line stays lit */
  function pulseTri(shape, color) {
    const cls = 'pulse-' + color;
    shape.classList.remove(cls);
    void shape.offsetWidth;
    shape.classList.add(cls);
    setTimeout(() => shape.classList.remove(cls), 700);
  }

  /* A key word lands in the working: point at what it names. A half swells
     once and puts its name up beside the shape; a line has a ring swept
     round it. Either way the drawing is left exactly as it was afterwards --
     the ring runs on its own clock, so the line carries on being read. */
  function onAreaWord(w) {
    if (w === 'green' || w === 'purple') { pulseTri(quadShape, w); showTriName(w); return; }
    const part = w.replace(/^h-/, '');
    /* the class carries the part's name and colour, not a highlight */
    quadShape.classList.add('lit-' + part);
    if (part === 'base' || part === 'green' || part === 'purple') denoteQuad(part);
  }

  /* A line too long for its column breaks before its "=": the "= ..." part
     drops to a second row, indented, rather than the sentence wrapping at a
     word. Judged from the ghost's words before the line is shown. */
  function fitEq(line) {
    const ghost = line.querySelector('.type-ghost');
    /* the room is the column the lines sit in, not the block of lines */
    const box = line.closest('.quad-foot, .para-foot, .rhom-foot, .rtrap-foot, .fig-work') || line.parentNode;
    line.classList.remove('eqbreak');
    if (!ghost || !box || !ghost.querySelector('.rhs')) return;
    /* offsetWidth: the line is still scaled down before it shows, and a
       transformed rect would under-measure it */
    const need = Array.from(ghost.querySelectorAll('.wd')).reduce((a, w) => a + w.offsetWidth, 0);
    const pad = parseFloat(getComputedStyle(box).paddingLeft) + parseFloat(getComputedStyle(box).paddingRight) || 0;
    if (need > box.clientWidth - pad + 1) line.classList.add('eqbreak');
  }

  /* into the quadrilateral's working unless told otherwise */
  function showLine(line, root) {
    (root || areaLinesEl).appendChild(line);
    void line.offsetWidth;
    line.classList.add('show');
    sfx('click', .3);
    return wait(REDUCED ? 160 : 460);
  }

  /* a line of working that types itself out, lighting what it names */
  async function showTypedLine(segs, root, onWord) {
    const line = document.createElement('div');
    line.className = 'area-line';
    line.innerHTML = '<span class="type-wrap"><span class="type-ghost"></span>' +
      '<span class="type"><span class="txt"></span><i class="caret" aria-hidden="true"></i></span></span>';
    /* the ghost carries the whole line, so the box is sized before the first
       character lands */
    lineSpans(line.querySelector('.type-ghost'), segs);
    (root || areaLinesEl).appendChild(line);
    fitEq(line);
    await showLine(line, root);
    await typeSegments(line.querySelector('.txt'), line.querySelector('.caret'), segs, AREA_MS, AREA_PAUSE, onWord || onAreaWord);
    return line;
  }

  /* The glow on the figure follows what is being said (user, 2026-09-28): the
     part the learner just picked pulses where it is drawn, so the line in the
     box and the line on the shape are read as one. One part at a time.
       'base' -> the diagonal        'h1' -> the orange triangle's height
       'h2'   -> the purple height   'sum' -> both heights together */
  function figGlow(which) {
    quadShape.classList.remove('glow-base', 'glow-h1', 'glow-h2', 'glow-sum');
    if (which) quadShape.classList.add('glow-' + which);
  }

  /* The two boxes are filled one at a time, guided (user, 2026-09-28):
   * Swiftee names the part wanted, THAT box alone glows and is live while its
   * partner is dimmed and held off. Every pick lights the thing it names on
   * the figure: pick the orange triangle's height and that height glows, pick
   * the diagonal and the diagonal glows -- so a wrong choice is shown, in the
   * feedback and on the drawing, to be a different part. A box may also set an
   * `escalate` for a second wrong (the sum box glows and thickens both
   * heights, the answer it is after). */
  async function askBox(dd, cfg) {
    figGlow(null);                       /* clear the last box's glow */
    dd.root.classList.add('asking');
    await heading(cfg.prompt);
    holdHeading();
    lockInput(false);
    let wrongs = 0;
    await dd.ask(cfg.isRight,
      v => { figGlow(cfg.glow(v)); cfg.onRight(v); },
      v => {
        wrongs++;
        figGlow(cfg.glow(v));
        /* the mascot's line becomes the hint; not awaited -- the box is already
           resetting, and a new wrong simply retypes over it (feedbackGen) */
        heading(cfg.wrongText(v)).catch(() => {});
        holdHeading();
        if (wrongs >= 2 && cfg.escalate) cfg.escalate();
      });
    lockInput(true);
    dd.root.classList.remove('asking');
    quadShape.classList.remove('thick-h');
  }

  async function askFormula(f) {
    const [ddDiag, ddSum] = f.dds;
    /* the sum box waits, dimmed, until the diagonal is in */
    ddSum.root.classList.add('off');
    await askBox(ddDiag, {
      prompt: QUAD.chooseDiag,
      isRight: v => v === 'base',
      /* base glows the diagonal; a height glows its own triangle's height */
      glow: v => ({ base: 'base', 'h-green': 'h1', 'h-purple': 'h2' })[v] || null,
      onRight: () => feedback(FEEDBACK.right),
      wrongText: v => QUAD.notDiag[v] || QUAD.chooseDiag
    });
    ddSum.root.classList.remove('off');
    await wait(REDUCED ? 200 : 600);
    await askBox(ddSum, {
      prompt: QUAD.chooseSum,
      isRight: v => v === 'heights',
      /* the right answer glows both heights; the wrong "b + h" choices name no
         single part, so they glow nothing -- the feedback carries them */
      glow: v => v === 'heights' ? 'sum' : null,
      onRight: () => feedback(FEEDBACK.right),
      wrongText: () => QUAD.notSum,
      /* a second wrong glows both heights (the answer) and thickens them */
      escalate: () => { figGlow('sum'); quadShape.classList.add('thick-h'); }
    });
    await wait(REDUCED ? 150 : 700);
    figGlow(null);
  }

  /* "The sum of the perpendicular heights is [ v ]": a label card with a
     drop-down slot on its end, as the name quiz was */
  function questionLine(label, opts) {
    const line = document.createElement('div');
    line.className = 'area-line q-line';
    const lab = document.createElement('span');
    lab.className = 'quiz-label';
    lab.textContent = label;
    const d = makeDD(opts, false);
    line.append(lab, d);
    return { line: line, dd: ddController(d) };
  }

  /* the last line of a scene is in: "Well Done!", the halves swell together,
     Swiftee is proud, and confetti falls */
  function celebrate() {
    feedback(FEEDBACK.done);
    onAreaWord('green');
    onAreaWord('purple');
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
  }

  /* ---------- one triangle, in conversation ----------
   * Swiftee talks the learner through a half of the cut shape (review,
   * 2026-09-25: conversational, and in step with the drawing). The half
   * comes forward and the other steps back; "Let's say the base of this
   * triangle is b." lights the diagonal and names it; "And its height is
   * h₁." drops the height and names it; "So, its area will be …" writes
   * the line beside the shape -- "½ ×" typed, and then the b and the h
   * lifted off the drawing's own labels and set down in their places in
   * the line (`talk.line`). Every line is Swiftee's, from the heading,
   * and the bird stays for all of them: each line's send-off
   * is cancelled as it ends (holdHeading). Each label gets its look at the
   * full word first, exactly as it does in revealDims, and only then
   * dissolves into its short name (relabel) -- before the formula ever
   * reaches for it (user, 2026-09-25). The base only gets that look once:
   * the second triangle finds it already short. */
  const holdHeading = () => cancelDismiss(promptTxt);
  async function triangleTalk(spec, i, talk) {
    const t = spec.tris[i];
    const baseLbl = quadDims.querySelector('.lbl-base');
    const hLbl    = quadDims.querySelector('.lbl-' + t.color);

    /* the base reads thicker than the rest of the outline for as long as
       it is being derived from -- workSum takes it back down once the two
       triangles are put together */
    quadShape.classList.add('thick-base');

    /* this half comes forward, by name */
    focusTri(t.color);
    pulseTri(quadShape, t.color);
    showTriName(t.color);
    await wait(REDUCED ? 200 : 800);

    /* its base: the diagonal, lit and named as the line says so */
    const base = (async () => {
      await wait(REDUCED ? 100 : 600);
      quadShape.classList.add('lit-base');
      if (baseLbl.textContent !== spec.short.base) {
        await wait(REDUCED ? 80 : 460);
        await relabel(baseLbl, spec.short.base);
      }
      await denoteQuad('base', REDUCED ? 200 : 900);
    })();
    await heading(talk.base);
    holdHeading();
    await base;
    await wait(REDUCED ? 100 : 300);

    /* its height: dropped and named as the line says so */
    const height = (async () => {
      await wait(REDUCED ? 100 : 500);
      await dropHeight(t.color);
      quadShape.classList.add('lit-' + t.color);
      await wait(REDUCED ? 80 : 460);
      await relabel(hLbl, spec.short.h[i]);
      await denoteQuad(t.color, REDUCED ? 200 : 700);
    })();
    await heading(QUAD.height(spec.short.h[i]));
    holdHeading();
    await height;
    await wait(REDUCED ? 100 : 300);

    /* its area, written beside the shape */
    await heading(QUAD.areaIs);
    holdHeading();
    await wait(REDUCED ? 100 : 400);
    await floatLine(talk.line, { base: baseLbl, h: hLbl });
    await wait(REDUCED ? 200 : 600);
  }

  /* The area line, its parts lifted off the drawing: the words up to "½ ×"
     type themselves, and then each part the line names -- the b, the h --
     is a copy of the drawing's own label that floats across into its
     place, the label glowing as it leaves. `from` gives the label for each
     segment's `fly` key. The whole line is laid out at once, unseen, so
     every word has its place before the first shows and a flying copy has
     somewhere to land. */
  /* `opts` lets another scene use it on its own working (the
     parallelogram's): `root` is the lines' box, `onWord` what a key word
     lights, and `beforeFly(key)`, if given, is awaited as each part is about
     to leave the drawing -- to start Swiftee's line for that part. A segment's `word` is the
     word it is written as first, where the part's key alone does not say. */
  async function floatLine(segs, from, opts) {
    opts = opts || {};
    const onWord = opts.onWord || onAreaWord;
    const root = opts.root || areaLinesEl;
    /* The line is written out in words first -- "Area of Triangle 1 = ½ ×
       base × height" -- and only then does each part come off the drawing:
       the label floats across onto its word, and the word turns into it,
       "base" into b and "height" into h₁ (user, 2026-09-28). */
    const WORD = { base: T('labelBase'), h: T('labelHeight') };
    const worded = segs.map(sg => sg.fly ? { t: sg.word || WORD[sg.fly] || sg.t, w: sg.w, fly: sg.fly } : sg);
    const line = document.createElement('div');
    line.className = 'area-line';
    line.innerHTML = '<span class="type-wrap"><span class="type-ghost"></span>' +
      '<span class="type"><span class="txt"></span><i class="caret" aria-hidden="true"></i></span></span>';
    lineSpans(line.querySelector('.type-ghost'), worded);
    root.appendChild(line);
    fitEq(line);
    await showLine(line, root);
    line.querySelector('.caret').hidden = true;
    const txt = line.querySelector('.txt');

    /* 1. the sentence in words, each part lit as it is named */
    const parts = lineSpans(txt, worded);
    let due = performance.now();
    for (const part of parts) {
      due = await revealWords(part.words, due, AREA_MS);
      if (part.seg.w) {
        const left = due - performance.now();
        if (left > 0) await waitRaw(left);
        part.els.forEach(el => el.classList.add('lit'));
        if (!part.seg.fly) onWord(part.seg.w);
        due += AREA_PAUSE * PACE;
      }
    }
    const left = due - performance.now();
    if (left > 0) await waitRaw(left);
    await wordsSettle();
    await wait(REDUCED ? 150 : 500);

    /* 2. one part at a time: its label flies onto its word, and the word
          becomes the label */
    const now = worded.slice();
    for (let k = 0; k < segs.length; k++) {
      const sg = segs[k];
      const src = sg.fly && from[sg.fly];
      if (!sg.fly) continue;
      /* awaited: Swiftee's line for the part has started before it leaves */
      if (opts.beforeFly) await opts.beforeFly(sg.fly);
      const word = Array.from(txt.querySelectorAll('.wd')).find(w => (w.dataset.t || '').trim() === now[k].t);
      if (src && word) await flyLabel(src, word, sg.t);
      now[k] = { t: sg.t, w: sg.w };
      onWord(sg.w);
      await morphTo(txt, now, false, false);
      await wait(REDUCED ? 100 : 380);
    }
    return line;
  }

  /* A copy of a drawing's label, flown from the label onto a word in a line
     of working, at the word's own type and hue (floatLine) */
  async function flyLabel(src, target, text) {
    const from = src.getBoundingClientRect();
    const to   = target.getBoundingClientRect();
    if (!from.width || !to.width || REDUCED || fastForward) return;
    const cs = getComputedStyle(target);
    const ghost = document.createElement('span');
    ghost.className = 'float-word';
    ghost.textContent = text;
    Object.assign(ghost.style, {
      fontFamily: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight,
      letterSpacing: cs.letterSpacing, lineHeight: cs.lineHeight, color: cs.color,
      left: to.left + 'px', top: to.top + 'px'
    });
    fx.appendChild(ghost);
    const s = from.height / to.height;
    const dx = (from.left + from.width / 2) - (to.left + ghost.offsetWidth * s / 2);
    const dy = (from.top + from.height / 2) - (to.top + to.height * s / 2);
    lineDenote([src], 500).catch(() => {});
    const a = ghost.animate([
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')', opacity: 0 },
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')', opacity: 1, offset: .12 },
      { transform: 'translate(' + (dx * .45) + 'px,' + (dy * .45 - 28) + 'px) scale(' + ((1 + s) / 2) + ')', opacity: 1, offset: .6 },
      { transform: 'none', opacity: 1 }
    ], { duration: 1100, easing: 'cubic-bezier(.35, .05, .25, 1)', fill: 'forwards' });
    sfx('click', .3);
    try { await finished(a); } finally { ghost.remove(); }
  }


  /* The rule again, in words (review, 2026-09-25): a copy of the line peels
     off it onto the row below -- fades up over it and slides down -- and
     there its b becomes "Diagonal" and its bracket "Sum of perpendicular
     heights", each as Swiftee says it (workSum). The copy's ghost holds
     the longest form it will take, so the row is its final size from the
     start and nothing under it moves as the words grow. */
  /* the part of a line from its "=" on: the row under a line that has
     already said "Area of Quadrilateral" carries only the right-hand side,
     set under the line's own "=" (user, 2026-09-28) */
  function rhsOf(segs) {
    const at = segs.findIndex(sg => sg.t.indexOf('=') >= 0);
    if (at < 0) return segs;
    const head = segs[at].t.slice(segs[at].t.indexOf('='));
    return [Object.assign({}, segs[at], { t: head })].concat(segs.slice(at + 1));
  }
  /* where the first "=" of a line is drawn: the character itself */
  function eqGlyph(line) {
    /* a typed line carries its words in `.txt` (with a `.type-ghost` copy
       overlaid); a words-line -- the rule opened into boxes -- has them bare.
       Read the overlay's "=" where there is one, else the bare words' */
    const wds = line.querySelector('.txt .wd') ? line.querySelectorAll('.txt .wd') : line.querySelectorAll('.wd');
    const w = Array.from(wds).find(x => (x.textContent || '').indexOf('=') >= 0);
    if (!w) return null;
    const walker = document.createTreeWalker(w, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) {
      const i = n.data.indexOf('=');
      if (i < 0) continue;
      const r = document.createRange();
      r.setStart(n, i); r.setEnd(n, i + 1);
      return r.getBoundingClientRect();
    }
    return null;
  }
  /* ...and where it sits in the lines' own column, untransformed: a line
     not yet shown is still scaled down (.area-line), so its glyph is read
     against its own box and divided back out of that box's scale */
  function eqAt(line) {
    const g = eqGlyph(line);
    if (!g) return null;
    const r = line.getBoundingClientRect();
    const kx = line.offsetWidth ? r.width / line.offsetWidth : 1;
    const ky = line.offsetHeight ? r.height / line.offsetHeight : 1;
    return { x: line.offsetLeft + (g.left - r.left) / (kx || 1),
             y: line.offsetTop + (g.top - r.top) / (ky || 1) };
  }
  async function copyLine(from, segs, widest, root) {
    const host = root || areaLinesEl;
    /* a block of lines centred as one (fit-lines): a copy wider than the
       line it comes off re-centres the block, and the line above is eased
       across to its new place rather than cut there */
    const centred = host.classList.contains('fit-lines');
    const was = centred ? from.getBoundingClientRect() : null;
    const line = document.createElement('div');
    line.className = 'area-line rhs-only';
    line.innerHTML = '<span class="type-wrap"><span class="type-ghost"></span>' +
      '<span class="type"><span class="txt"></span><i class="caret" aria-hidden="true"></i></span></span>';
    lineSpans(line.querySelector('.type-ghost'), widest);
    lineSpans(line.querySelector('.txt'), segs).forEach(part => {
      if (part.seg.w) part.els.forEach(el => el.classList.add('lit'));
      part.words.forEach(w => w.el.classList.add('in', 'landed'));
    });
    line.querySelector('.caret').hidden = true;
    host.appendChild(line);
    fitEq(line);
    /* indented so its "=" stands exactly under the "=" of the line it comes
       off -- the glyphs themselves are measured, not the words, which carry
       the space in front of the sign -- and it slides down from that row */
    /* the copy is read at its full size: not yet shown, it stands scaled
       down, and a glyph read through the scale came out a few px off (user,
       2026-09-30) */
    const plain = fn => {
      line.style.transition = 'none';
      line.style.transform = 'none';
      const out = fn();
      line.style.transform = '';
      void line.offsetWidth;
      line.style.transition = '';
      return out;
    };
    let at1 = eqAt(from), at2 = plain(() => eqAt(line));
    let dy = null;
    const eases = [];
    if (at1 && at2) {
      /* ...unless the column has no room for the indent and the line
         together: then it starts at the left edge rather than wrap inside
         its own box (the trapezium's rule in words, user, 2026-09-30) */
      const ghost = line.querySelector('.type-ghost');
      /* the live words run a hair wider than the ghost (see snug): a
         little slack, or the last of them folds under at the edge */
      const slack = () => ghost.offsetWidth + parseFloat(getComputedStyle(line).fontSize) * .6;
      let indent = Math.max(0, at1.x - at2.x), need = slack();
      if (host.clientWidth && ghost.offsetWidth && indent + need > host.clientWidth) {
        if (centred) {
          /* the trapezium's working (user, 2026-09-30): the lines close up
             together instead, the one above with its copy, so the "=" stays
             exactly under the "=". The new size is set outright and the
             glyphs measured again at it (the lines' own font-size transition
             held off, or they would be read mid-ease); the line above is
             then eased down to it over the same half second. */
          const fs = parseFloat(getComputedStyle(host).fontSize);
          const k = Math.max(.7, host.clientWidth / (indent + need));
          from.style.transition = 'none';
          host.style.fontSize = fmt(fs * k) + 'px';
          void host.offsetWidth;
          at1 = eqAt(from) || at1; at2 = plain(() => eqAt(line)) || at2;
          indent = Math.max(0, at1.x - at2.x);
          need = slack();
          from.style.transition = '';
          eases.push(() => from.animate([{ fontSize: fmt(fs) + 'px' }, { fontSize: fmt(fs * k) + 'px' }],
            { duration: 500, easing: 'ease' }));
        }
        if (indent + need > host.clientWidth) indent = Math.max(0, host.clientWidth - need);
      }
      line.style.paddingLeft = fmt(indent) + 'px';
      dy = at1.y - at2.y;
      /* ...and then read on screen and put right: a block that re-centres
         round the copy (fit-lines) settles a pass late, and the indent
         worked out above lands a few px off; the two glyphs are compared
         where they are drawn -- the copy still unshown -- until they meet */
      for (let i = 0; i < 3; i++) {
        const d = plain(() => {
          const g1 = eqGlyph(from), g2 = eqGlyph(line);
          return g1 && g2 ? g1.left - g2.left : 0;
        });
        if (Math.abs(d) < .25) break;
        line.style.paddingLeft = fmt(Math.max(0, (parseFloat(line.style.paddingLeft) || 0) + d)) + 'px';
      }
    }
    if (was) {
      const now = from.getBoundingClientRect();
      const dx = was.left - now.left;
      if (Math.abs(dx) > .5) eases.push(() => from.animate(
        [{ transform: 'translateX(' + fmt(dx) + 'px)' }, { transform: 'none' }],
        { duration: 700, easing: 'cubic-bezier(.33, 0, .15, 1)' }));
    }
    if (!REDUCED && !fastForward) eases.forEach(f => f());
    await peelOff(from, line, dy);
    return line;
  }

  /* a copy of a line, already in the row under it, fades up over the
     line and slides down into its own row */
  async function peelOff(from, line, rowDy) {
    /* the rows share one grid, so their offsets are the distance to slide --
       unless the caller measured the row the copy comes off exactly */
    const dy = rowDy != null ? rowDy : from.offsetTop - line.offsetTop;
    line.classList.add('show');
    if (REDUCED || fastForward) return;
    /* one unbroken glide: it fades up in place, then eases down without
       a stop, slowing gently into its row */
    const a = line.animate([
      { transform: 'translateY(' + dy + 'px)', opacity: 0 },
      { transform: 'translateY(' + (dy * .92) + 'px)', opacity: 1, offset: .3 },
      { transform: 'none', opacity: 1 }
    ], { duration: 1700, easing: 'cubic-bezier(.33, 0, .15, 1)' });
    sfx('click', .3);
    await finished(a);
  }

  /* ---------- the rule, copied and opened up ----------
   * The second cut's question is the first cut's rule itself (review,
   * 2026-09-25): the line in words is typed out, a copy of it peels off
   * onto the row below, and in the copy "(Diagonal)" and then "(Sum of
   * perpendicular heights)" each dissolve into a drop-down asking for that
   * part in symbols -- so the boxes are seen to come out of the words they
   * stand for, and each box's placeholder is those words. Slow enough to
   * follow: a box takes longer than a derivation step does.
   * The copy is plain spans rather than a typed line's ghost and overlay:
   * a box is taller than the words it replaces, and the row has to grow
   * with it.
   * The line above it has already said "Area of Quadrilateral", so the copy
   * carries only the right-hand side, set under the line's own "=" (user,
   * 2026-09-28) -- the same rule as copyLine. */
  async function ruleToBoxes(from, segs) {
    const line = document.createElement('div');
    line.className = 'area-line words-line rhs-only';
    lineSpans(line, rhsOf(segs)).forEach(part => {
      if (part.seg.w) part.els.forEach(el => el.classList.add('lit'));
      part.words.forEach(w => w.el.classList.add('in', 'landed'));
    });
    areaLinesEl.appendChild(line);
    /* indented so its "=" stands under the "=" of the line it comes off --
       the glyphs themselves are measured, not the words -- and it slides
       down from that row (same as copyLine) */
    const at1 = eqAt(from), at2 = eqAt(line);
    let dy = null;
    if (at1 && at2) {
      line.style.paddingLeft = Math.max(0, at1.x - at2.x) + 'px';
      dy = at1.y - at2.y;
    }
    await peelOff(from, line, dy);
    await wait(REDUCED ? 200 : 1000);

    const dd1 = makeDD(NOTATION, true, T('hintDiagonal'));
    await wordToBox(line, 'base', dd1);
    await wait(REDUCED ? 200 : 1000);
    const dd2 = makeDD(SUMS, true, T('hintSumOfHeights'));
    await wordToBox(line, 'height', dd2);
    return { line: line, dds: [ddController(dd1), ddController(dd2)] };
  }

  /* A part of the line dissolves into a box: the same crossing morphTo
     makes between two texts -- the words lift and fade, the box rises into
     their place, the width easing between the two -- but slower still. The
     box then keeps the width its placeholder gave it, so an answer going
     in, or a wrong one going out again, moves nothing along the line. */
  const BOX_MS = 1500;
  async function wordToBox(line, w, dd) {
    const word = line.querySelector('.w.w-' + w);
    const holder = document.createElement('span');
    holder.className = 'morph slow box';
    word.parentNode.insertBefore(holder, word);
    const oldLayer = document.createElement('span');
    oldLayer.className = 'm-old';
    oldLayer.appendChild(word);
    const newLayer = document.createElement('span');
    newLayer.className = 'm-new';
    newLayer.appendChild(dd);
    holder.append(oldLayer, newLayer);
    const w1 = oldLayer.getBoundingClientRect().width, w2 = newLayer.getBoundingClientRect().width;
    holder.style.width = w1 + 'px';
    void holder.offsetWidth;
    holder.classList.add('go');
    holder.style.width = w2 + 'px';
    sfx('click', .25);
    await wait(REDUCED ? 60 : BOX_MS);
    holder.parentNode.insertBefore(dd, holder);
    holder.remove();
    const value = dd.querySelector('.dd-value');
    value.style.minWidth = value.getBoundingClientRect().width + 'px';
  }

  /* The formula answered, a box settles back into plain text: the reverse of
     wordToBox -- the drop-down lifts and fades, the symbol it holds rises in
     its place -- so the line is left reading "= ½ × b × (h₁ + h₂)" with
     nothing left to tap (user, 2026-09-28). The symbol keeps the part's own
     highlight, as the word it stood for had. */
  async function boxToWord(dd, seg) {
    const holder = document.createElement('span');
    holder.className = 'morph slow box';
    dd.parentNode.insertBefore(holder, dd);
    const oldLayer = document.createElement('span');
    oldLayer.className = 'm-old';
    oldLayer.appendChild(dd);
    const newLayer = document.createElement('span');
    newLayer.className = 'm-new';
    const word = document.createElement('span');
    word.className = 'w w-' + seg.w + ' lit';
    setTxt(word, seg.t);
    newLayer.appendChild(word);
    holder.append(oldLayer, newLayer);
    const w1 = oldLayer.getBoundingClientRect().width, w2 = newLayer.getBoundingClientRect().width;
    holder.style.width = w1 + 'px';
    void holder.offsetWidth;
    holder.classList.add('go');
    holder.style.width = w2 + 'px';
    sfx('click', .25);
    await wait(REDUCED ? 60 : BOX_MS);
    holder.parentNode.insertBefore(word, holder);
    holder.remove();
    return word;
  }

  /* both boxes settle at once: base to b, the sum to (h₁ + h₂) */
  function boxesToText(f) {
    return Promise.all([
      boxToWord(f.dds[0].root, { t: 'b', w: 'base' }),
      boxToWord(f.dds[1].root, { t: '(h₁ + h₂)', w: 'height' })
    ]);
  }

  /* ---------- the two halves together ----------
   * The third line is written as the sum of the two above it, and then
   * carries on being worked where it stands: each triangle's area put in,
   * and the base both of them share taken outside the bracket. One line,
   * one flow -- only the part after the "=" changes, slowly enough to be
   * followed, and each step is said before it is made. Then the rule again
   * in words on a row of its own, the celebration, and Next. */
  async function workSum(steps, words) {
    /* the sum is about both halves: neither is held back for it, and the
       base's own line drops back to the rest of the outline's weight --
       see .thick-base */
    focusTri(null);
    quadShape.classList.remove('thick-base');
    const sum = await showTypedLine(steps[0]);
    const sumTxt = sum.querySelector('.txt');
    await wait(REDUCED ? 300 : 1300);

    await heading(QUAD.swap);
    holdHeading();
    await wait(REDUCED ? 200 : 700);

    /* the line comes forward a step for as long as it is being worked on --
       enough to take the eye back to it, and settled at its new size before
       anything in it moves, since a morph measures the width it is easing to */
    sum.classList.add('solving');
    await wait(REDUCED ? 100 : 620);

    await morphTo(sumTxt, steps[1], false, true);
    await wait(REDUCED ? 300 : 1400);

    await heading(QUAD.share);
    holdHeading();
    await denoteQuad('base', 700);
    await morphTo(sumTxt, steps[2], false, true);
    await wait(REDUCED ? 300 : 1100);

    /* worked out: the line settles back to the size of the two above it */
    sum.classList.remove('solving');
    await wait(REDUCED ? 100 : 620);

    /* the rule in words: the copy comes off the line, and then each part
       becomes its name as Swiftee says it */
    words = words.map(rhsOf);
    const rule = await copyLine(sum, rhsOf(steps[2]), words[1]);
    const ruleTxt = rule.querySelector('.txt');
    await wait(REDUCED ? 200 : 500);
    const diag = (async () => {
      await wait(REDUCED ? 100 : 700);
      await morphTo(ruleTxt, words[0], false, true);
    })();
    await heading(QUAD.words1);
    holdHeading();
    await diag;
    await wait(REDUCED ? 200 : 500);
    const heights = (async () => {
      await wait(REDUCED ? 100 : 900);
      await morphTo(ruleTxt, words[1], false, true);
    })();
    await heading(QUAD.words2);
    holdHeading();
    await heights;
    await wait(REDUCED ? 200 : 700);

    await heading(QUAD.rule);
    await wait(REDUCED ? 150 : 350);
    celebrate();
    await wait(REDUCED ? 400 : 1800);

    /* the formula is complete: Swiftee and its line leave the heading, and
       the shape and the working come forward into the room it leaves --
       held open, so nothing slides up as the bird goes -- and only then
       the Next button (user, 2026-09-28) */
    board.classList.add('head-held');
    headStay = false;
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    if (boardMascot.classList.contains('in')) await mascotJumpOut();
    await wait(REDUCED ? 60 : 220);
    zoomContent(quad, [drawnRect(quadSvg)].concat(
      Array.from(areaLinesEl.querySelectorAll('.area-line .type-wrap')).map(el => el.getBoundingClientRect())));
    await wait(REDUCED ? 300 : 900 + 1500);
    await showNext();
  }

  /* A scene comes forward into the board once the heading is empty: the
     scale is worked out from what is actually drawn in it (`rects`, on
     screen), not from its box, so a scene as wide as the board still grows
     -- up into the heading and out to the board's sides, about the bottom
     middle of its content, never down over the footer. */
  function zoomContent(sec, rects, max) {
    rects = rects.filter(r => r && r.width && r.height)
      .map(r => ({ left: r.left, top: r.top, right: r.left + r.width, bottom: r.top + r.height }));
    if (!rects.length) return;
    const U = {
      left:   Math.min.apply(null, rects.map(r => r.left)),
      right:  Math.max.apply(null, rects.map(r => r.right)),
      top:    Math.min.apply(null, rects.map(r => r.top)),
      bottom: Math.max.apply(null, rects.map(r => r.bottom))
    };
    const b = board.getBoundingClientRect();
    const row = document.querySelector('.prompt-row').getBoundingClientRect();
    const W = U.right - U.left, H = U.bottom - U.top;
    const cx = (U.left + U.right) / 2;
    /* the room: from the top of the emptied heading down to where the
       content already ends, the board's width less its rim either side.
       Centred across it and in it top to bottom, the content grows as far
       as that room allows -- and when it is as wide as the board already,
       it still comes forward: it rises into the middle of the room the
       heading left (user, 2026-09-28) */
    const roomH = U.bottom - row.top;
    const k = Math.max(1, Math.min(max || ZOOM_MAX, roomH / H, (b.width - 2 * ZOOM_RIM) / W));
    const tx = (b.left + b.width / 2) - cx;
    const ty = -(roomH - H * k) / 2;
    const box = sec.getBoundingClientRect();
    sec.style.transformOrigin = (cx - box.left) + 'px ' + (U.bottom - box.top) + 'px';
    if (max) sec.dataset.zoomMax = max; else delete sec.dataset.zoomMax;
    sec.style.setProperty('--scene-zoom', k.toFixed(3));
    sec.style.setProperty('--scene-tx', tx.toFixed(1) + 'px');
    sec.style.setProperty('--scene-ty', ty.toFixed(1) + 'px');
    sec.classList.add('zoomed');
  }
  function unzoomContent(sec) {
    zoomOut(sec);
    sec.style.transformOrigin = '';
    sec.style.removeProperty('--scene-tx');
    sec.style.removeProperty('--scene-ty');
  }

  /* the box a working line actually fills, for the closing zoom to take in:
     a typed line's content sits in its `.type-wrap`; a words-line (the rule
     opened into boxes) is a full-width block, so its text is measured from
     its own spans rather than the empty column around them */
  function lineBox(el) {
    const inner = el.querySelector('.type-wrap');
    if (inner) return inner.getBoundingClientRect();
    const kids = Array.from(el.children).map(k => k.getBoundingClientRect()).filter(r => r.width);
    if (!kids.length) return el.getBoundingClientRect();
    const left = Math.min.apply(null, kids.map(r => r.left));
    const top = Math.min.apply(null, kids.map(r => r.top));
    return { left: left, top: top,
      width: Math.max.apply(null, kids.map(r => r.right)) - left,
      height: Math.max.apply(null, kids.map(r => r.bottom)) - top };
  }

  /* Between quadrilaterals the board goes blank: Swiftee ducks behind it,
     the old shape fades, and the new one is built and drawn. Swiftee stays
     behind the board -- the scene's first line brings it back up. */
  async function nextQuad(spec) {
    const out = mascotJumpOut();
    await wait(260);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    quad.classList.add('off');
    await out;
    await wait(520);
    /* the last cut's closing zoom and held heading, let go while the board
       is faded out so the shape does not visibly shrink back first */
    unzoomContent(quad);
    board.classList.remove('head-held');
    await freshQuad(spec);
  }

  /* the shape is rebuilt while the section is faded out, then drawn again */
  async function freshQuad(spec) {
    buildQuad(spec);
    quad.style.transition = 'none';
    quad.classList.remove('off');
    void quad.offsetWidth;
    quad.style.transition = '';
    await wait(80);
    await revealShape(quadShape);
    await wait(300);
  }

  /* Only the two corners the diagonal joins are marked: the other pair is
     not part of the step, and dots on it only split the eye (review,
     2026-09-25). Their tap targets go with them, so the only join left to
     make is the right one. A rebuild of the shape starts with all four. */
  function onlyCorners(pair) {
    corners.forEach(c => c.classList.toggle('spare', pair.indexOf(c.dataset.corner) < 0));
  }

  /* the diagonal, the two colours, and both heights with their labels */
  async function showSplit(pair, spec) {
    onlyCorners(pair);
    quadShape.classList.add('dots');
    await wait(500);
    await drawJoin(pair[0], pair[1]);
    await wait(300);
    splitShape();
    await wait(700);
    await revealDims(spec, false);
    await layoutWide();
    await wait(300);
  }

  async function sectionThree() {
    lockInput(true);
    sceneStart(sectionThree);
    unzoomContent(quad);       /* a replay comes back to the closing zoom */

    /* 1. Swiftee ducks back behind the board, and the lesson clears away
          while it is mid-air; the empty footer band draws in too */
    const out = mascotJumpOut();
    await wait(260);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    board.classList.add('sec3');
    trayArea.style.minHeight = '';
    await out;
    /* The heading's room is held for the whole of this page, from before
       the shape is drawn: the row opening under Swiftee as it came up to
       the heading, and folding again as it left, resized the shape each
       time (user, 2026-09-28: the shape changes size too often). Held, the
       shape draws once at its final height and keeps it. Set while the
       board is blank, so the row opens with nothing on screen. */
    board.classList.add('head-held');
    await wait(520);

    /* the heading's ghost takes the longest line of the quadrilateral
       scenes; the board is blank, so the row can re-measure with nothing on
       it to move */
    promptReserve(longest([QUAD.join, QUAD.divided, QUAD.twoNew, QUAD.swap, QUAD.share, QUAD.rule,
                           FOUR.pick, FIVE.turn, QUAD.joinWrong('bottom', 'right')]));

    /* 2. the quadrilateral: outline first, then the colour, drawn full width
          in the middle of the board */
    buildQuad(SPEC_A);
    quad.classList.add('on');
    quad.setAttribute('aria-hidden', 'false');
    await wait(80);
    await revealShape(quadShape);
    /* seen whole, and still, before it makes room */
    await wait(REDUCED ? 200 : 900);

    /* 2b. it glides over to the left half, opening the right half for the
           name quiz. It comes back to the middle for the lines about it and
           the diagonal, and goes aside again for the working: three moves,
           each for a reason, and nothing else ever resizes it (user,
           2026-09-29) */
    await layoutWide(quad, quadSvg, true, 'ask');
    await wait(REDUCED ? 120 : 340);

    /* 3. Swiftee comes up from behind the board and asks what the shape is
          first; the three names then fade up on the right half, one to tap
          (user, 2026-09-25: the question first, then the options). The
          names are inert until dealt -- askChips is what takes their taps. */
    quizBubble.classList.remove('show', 'ok', 'bad');
    quizBlock.classList.remove('off');
    quizBlock.classList.add('show');
    await wait(REDUCED ? 200 : 440);
    await mascotJumpIn(quizMascot);
    await wait(REDUCED ? 100 : 260);
    swiftee.hold('talking');
    await quizSay(QUAD.ask);
    swiftee.release();
    await wait(REDUCED ? 100 : 320);
    await dealChips(quizChips);
    await askChips(quizChips, QUAD.answer,
      chip => quizSay(QUAD.notes[chip.dataset.answer] || QUAD.notes.triangle, 'bad'));
    /* the right answer counts the sides on the shape as it is said: its
       second piece, "A quadrilateral has 4 sides.", runs for its share of
       the clip */
    {
      const right = QUAD.notes[QUAD.answer];
      const clip = voFor(right);
      const secs = clip && !Motion.isMuted() ? await durationOf(clip) : 0;
      await quizSay(right, 'ok', piece => {
        if (!/\d sides/.test(piece)) return;
        countSides(secs ? secs * 1000 * piece.length / right.length
                        : Math.max(1600, piece.length * 55));
      });
    }
    /* a moment for the count to land, then straight on -- no Next, and no
       trip behind the board: the explanation runs as one conversation
       (user, 2026-09-28) */
    await wait(REDUCED ? 300 : 1400);

    /* 4. the names and the box go; Swiftee hops from the quiz up to the
          heading -- where it stays for the rest of the page, hand-overs
          included (headStay) -- and the shape glides back to the middle of
          the board as it goes (user, 2026-09-29) */
    quizBubble.classList.remove('show');
    quizBlock.classList.add('done');
    await wait(REDUCED ? 150 : 380);
    noteTxt.textContent = '';
    headStay = true;
    let toMid = null;
    await hopBetween(quizMascot, boardMascot, () => {
      /* the quiz is gone -- `off`, so its fade does not count as a room
         still occupied -- and its foot under the shape is shut at once, so
         the shape's new place is measured with the whole height it will
         have (shutRoomNow) */
      quizBlock.classList.remove('show', 'done');
      quizBlock.classList.add('off');
      shutRoomNow(quad.querySelector('.quad-foot'));
      toMid = layoutWide(quad, quadSvg, false, 'ask');
    });
    if (toMid) await toMid;
    await wait(REDUCED ? 100 : 300);

    /* the shape named from the heading, and the way in to its area */
    await heading(QUAD.general);
    holdHeading();
    await wait(REDUCED ? 300 : 900);
    await heading(QUAD.area);
    holdHeading();
    await wait(REDUCED ? 200 : 700);

    /* 5. the corners light up, and the instruction, a finger tracing the
          line as it is said */
    onlyCorners(['L', 'R']);
    quadShape.classList.add('dots');
    await wait(560);
    const signal = { done: false };
    const joinClip = voFor(QUAD.join);
    const joinSecs = joinClip && !Motion.isMuted() ? await durationOf(joinClip) : 0;
    const demo = demoJoin(signal, ['L', 'R'],
      { withLine: joinSecs ? joinSecs * 1000 : QUAD.join.length * TYPE_MS });
    await heading(QUAD.join);
    await awaitJoin(signal, ['L', 'R']);
    await demo;

    /* 6. joined: the two colours, and the shape glides aside to make room
          on the right for the working; then the line that says so */
    await wait(360);
    splitShape();
    await wait(REDUCED ? 300 : 700);
    await layoutWide();
    await wait(REDUCED ? 100 : 300);
    await heading(QUAD.divided);
    holdHeading();
    await wait(REDUCED ? 200 : 500);

    /* 7. one triangle at a time, in conversation, with a Next after each */
    await triangleTalk(SPEC_A, 0, { base: QUAD.base1, line: LINES_A[0] });
    await showNext();
    await triangleTalk(SPEC_A, 1, { base: QUAD.base2, line: LINES_A[1] });
    await showNext();

    /* 8. the two together: the sum, worked and then put into words */
    await workSum(QUAD_STEPS, WORDS_A);
    await sectionThreeAgain();
  }

  /* ---- the other way: the same shape, cut top to bottom ----
     Its own function so that it, like every other scene, has a re-entry point
     Replay can call. */
  async function sectionThreeAgain() {
    lockInput(true);
    sceneStart(sectionThreeAgain);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    quad.classList.add('off');
    await wait(480);
    /* the last scene's closing zoom and held heading, let go while the
       board is blank */
    unzoomContent(quad);
    board.classList.remove('head-held');
    await freshQuad(SPEC_A2);
    /* Swiftee comes up at the heading with the first line and stays there for
       the whole of this cut -- the join, the two new triangles, the rule and
       the boxes -- rather than leaving and coming back between lines
       (user, 2026-09-28). It is sent off once the formula is complete, below. */
    headStay = true;

    /* the corners for the other diagonal are marked first, then a faint
       dashed guide traces them -- a finger riding its tip -- WHILE Swiftee
       says "Let's try a different way!", the finger setting off with the
       line and reaching the far corner as it ends, synced to the clip
       (user, 2026-09-28); the stuck-learner passes follow if the join is
       not yet made. The same demo-with-line as the first cut's join. */
    onlyCorners(['T', 'B']);
    quadShape.classList.add('dots');
    /* the bird comes up while the corner dots settle, so it is already at the
       heading when the guide and the line set off together -- otherwise the
       line would wait on the jump-in and the finger run ahead of the words */
    const up = mascotWithLine(null);
    await wait(560);
    await up;
    const signal2 = { done: false };
    const anotherClip = voFor(QUAD.another);
    const anotherSecs = anotherClip && !Motion.isMuted() ? await durationOf(anotherClip) : 0;
    const demo2 = demoJoin(signal2, ['T', 'B'],
      { withLine: anotherSecs ? anotherSecs * 1000 : QUAD.another.length * TYPE_MS });
    await heading(QUAD.another);
    await awaitJoin(signal2, ['T', 'B']);
    await demo2;

    /* two new colours; the base and both heights named, in full for a
       look and then as b, h₁ and h₂; then the shape moves aside */
    await wait(360);
    splitShape();
    await wait(700);
    await heading(QUAD.twoNew);
    holdHeading();
    await revealDims(SPEC_A2, true);
    await layoutWide();
    await wait(400);

    /* the rule in words, as the first cut ended on it, typed out -- the
       diagonal and both heights lighting up as they are named -- and then,
       once Swiftee has asked, a copy of it comes down and opens up into
       the boxes the learner fills in symbols (review, 2026-09-25): no
       triangle lines this time. Each right answer lights what it names. */
    const rule = await showTypedLine(RULE_IN_WORDS, null, w => {
      if (w === 'height') { onAreaWord('h-green'); onAreaWord('h-purple'); }
      else onAreaWord(w);
    });
    await wait(REDUCED ? 300 : 900);
    await heading(QUAD.complete);
    holdHeading();
    await wait(REDUCED ? 200 : 500);
    const f = await ruleToBoxes(rule, RULE_IN_WORDS);
    await wait(REDUCED ? 200 : 500);
    /* the boxes are asked one at a time: the diagonal first, then the sum --
       each named, glowing and live while the other waits (user, 2026-09-28) */
    await askFormula(f);
    await wait(REDUCED ? 300 : 700);

    /* answered: the two drop-downs settle back into plain symbols, so the
       line is left reading "= ½ × b × (h₁ + h₂)" with nothing to tap */
    await boxesToText(f);
    await wait(REDUCED ? 200 : 700);

    await heading(QUAD.rule);
    await wait(REDUCED ? 150 : 350);
    celebrate();
    await wait(REDUCED ? 400 : 1800);

    /* the formula is complete: Swiftee and its line leave the heading, and
       the shape and the working come forward into the room it leaves --
       held open, so nothing slides up as the bird goes -- and only then
       the Next button (user, 2026-09-28), the same close as the first cut's */
    board.classList.add('head-held');
    headStay = false;
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    if (boardMascot.classList.contains('in')) await mascotJumpOut();
    await wait(REDUCED ? 60 : 220);
    zoomContent(quad, [drawnRect(quadSvg)].concat(
      Array.from(areaLinesEl.querySelectorAll('.area-line')).map(lineBox)));
    await wait(REDUCED ? 300 : 900 + 1500);
    await showNext();
    await sectionFive();
  }

  /* ---------- section 5: the learner's own go ---------- */
  async function sectionFive() {
    lockInput(true);
    sceneStart(sectionFive);

    await nextQuad(SPEC_C);
    /* this scene's board is half and half (user, 2026-09-18): the shape is
       what the three questions are about, so it keeps as much of the width
       as they do. Set before the move, so layoutWide measures the column the
       shape is actually easing into. buildQuad above has just cleared it. */
    quad.classList.add('own');
    await heading(FIVE.turn);
    /* Swiftee stays at the heading for the whole quiz -- the three questions
       and their feedback -- rather than leaving between them (user,
       2026-09-28); it is let go before the aside that follows */
    headStay = true;
    await wait(300);
    await showSplit(['L', 'R'], SPEC_C);

    /* a wrong answer points back at the measurement the question is about: the
       mascot names it and the figure glows gold there, held until the next
       try (user, 2026-09-28). 'heights' glows both perpendicular heights,
       'diag' the diagonal; cleared once the question is answered. */
    const goldGlow = which => {
      quadShape.classList.remove('gold-heights', 'gold-diag');
      if (which) quadShape.classList.add('gold-' + which);
    };
    const sayHint = text => { heading(text).catch(() => {}); holdHeading(); };

    /* three questions, one at a time -- each appears once the one before it
       is answered: the heights added, then the diagonal, then the area */
    const right = () => feedback(FEEDBACK.right);
    /* `show` runs once the answer is in: a ring sweeps round the part the
       question was about, so the number in the box and the thing on the
       drawing are read as one. The parts are pointed at ONE AT A TIME --
       the two heights in turn for the sum, then the diagonal -- and the
       drawing is left exactly as the ring found it. `onWrong` is the mascot's
       reply to a wrong pick (feedback line + gold glow). */
    const askOne = async (label, opts, answer, show, onWrong) => {
      const q = questionLine(label, opts);
      await showLine(q.line);
      lockInput(false);
      await q.dd.ask(v => v === answer, right, onWrong || (() => {}));
      lockInput(true);
      goldGlow(null);                    /* answered: the gold hint goes */
      if (show) await show();
      await wait(700);
    };
    await askOne(T('p07QSum'),
      [{ v: '24', t: CM(24) }, { v: '9', t: CM(9) }, { v: '21', t: CM(21) }], '9',
      async () => { await denoteQuad('green', 380); await denoteQuad('purple', 380); },
      () => { sayHint(FIVE.wrongHeights); goldGlow('heights'); });
    await askOne(T('p07QDiag'),
      [{ v: '6', t: CM(6) }, { v: '3', t: CM(3) }, { v: '18', t: CM(18) }], '18',
      () => denoteQuad('base', 520),
      () => { sayHint(FIVE.wrongDiag); goldGlow('diag'); });
    await askOne(T('p07QArea'),
      [{ v: '81', t: SQCM(81) }, { v: '162', t: SQCM(162) }, { v: '182', t: SQCM(182) }], '81',
      null,
      () => sayHint(FIVE.wrongArea));
    celebrate();
    headStay = false;
    await wait(2600);
    await showNext();
    await specialIntro();
  }

  /* ---------- between sections: on to the special quadrilaterals ----------
   * Swiftee ducks behind the board, the board itself fades off the
   * landscape, and Swiftee hops up a little left of centre to say two lines
   * from its speech bubble -- the intro's own stage, brought back. */
  const SPECIAL = [
    T('p08Know'),
    T('p08Special')
  ];

  /* Swiftee ducks behind the board, the board fades off the landscape, and
     Swiftee hops up on the intro's stage to say the lines from its bubble.
     `again` is the calling scene's own re-entry point, for Replay. The scene
     that follows takes the stage down again (see paraSection). */
  async function boardAside(lines, again) {
    lockInput(true);
    sceneStart(again);

    const out = mascotJumpOut();
    await wait(260);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    await out;
    await wait(200);
    board.classList.remove('show');
    await wait(620);

    /* the intro's stage again, tidied of how the intro left it: the bird is
       still off the bottom of the frame from its exit, the bubble popped out */
    introMascot.getAnimations().forEach(a => { try { a.cancel(); } catch (e) {} });
    introMascot.style.transform = '';
    introMascot.style.opacity = '';
    bubble.classList.remove('out', 'show');
    bubbleTxt.textContent = '';
    intro.classList.add('on', 'aside');
    await wait(140);

    await hopIn();
    await wait(240);
    for (let i = 0; i < lines.length; i++) {
      swiftee.hold('talking');
      await say(lines[i]);
      swiftee.release();
      await wait(i < lines.length - 1 ? 1500 : 700);
    }

    /* said: the bubble pops away and Swiftee drops out of the frame before
       the Next button, rather than standing there with its line (user,
       2026-09-25). The scene after Next finds it already gone. */
    bubble.classList.add('out');
    bubble.classList.remove('show');
    await wait(300);
    await introExit();

    await showNext(nextBtnFree);
  }

  async function specialIntro() {
    await boardAside(SPECIAL, specialIntro);
    await paraSection();
  }

  /* ---------- section 4: the parallelogram ----------
   * The first of the special quadrilaterals. Swiftee's aside is over: the
   * bird drops out of the frame, the board comes back blank, and a
   * parallelogram draws itself in the middle of it -- outline first, then
   * the colour. Swiftee jumps up from behind the board to the heading, two
   * names appear under the shape, and it asks "What shape is this?": the
   * wrong name is shaken off and steps back, the right one goes green.
   *
   * Then the two facts, each shown on the shape before it is said:
   *   1. parallel -- the top and bottom sides light up, are carried on past
   *      their corners in dotted lines that never meet, and take an arrow
   *      mark each; the left and right pair do the same in their own hue.
   *      Swiftee hops down beside the fact list and states it.
   *   2. equal -- the marks step back; a glowing copy of the top side lifts
   *      off and travels down to lie exactly over the bottom side, and tick
   *      marks land on both; the left side does the same onto the right.
   *      Swiftee hops down and states the second fact.
   * Back up to the heading, and Next. */
  const para       = document.getElementById('para');
  const paraShape  = document.getElementById('paraShape');
  const paraSvg    = document.getElementById('paraSvg');
  const paraArt    = paraSvg.querySelector('.art');
  const paraEx     = document.getElementById('paraEx');
  const paraDims   = document.getElementById('paraDims');
  const paraTray   = document.getElementById('paraTray');
  const paraChips  = Array.from(paraTray.querySelectorAll('.chip'));
  const paraSay    = document.getElementById('paraSay');
  const paraMascot = document.getElementById('paraMascot');
  const paraText   = document.getElementById('paraText');
  const paraTxt    = paraText.querySelector('.txt');
  const paraCaret  = paraText.querySelector('.caret');
  speaker(paraTxt, paraMascot, () => paraText.classList.remove('ok', 'bad'));
  const areaTray   = document.getElementById('areaTray');
  const areaChips  = Array.from(areaTray.querySelectorAll('.chip'));
  const paraLines  = document.getElementById('paraLines');
  const facts      = document.getElementById('facts');
  let paraFill = null;         /* the whole-shape fill, once built */
  const factMascot = document.getElementById('factMascot');
  const factEls    = { par: document.getElementById('factA'), eq: document.getElementById('factB') };

  /* the corners, clockwise from the top left: the top runs parallel to the
     bottom and the left to the right, and each pair is the same length --
     which is the whole lesson */
  const PARA_PTS   = { TL: { x: 74, y: 6 }, TR: { x: 358, y: 6 }, BR: { x: 290, y: 198 }, BL: { x: 6, y: 198 } };
  const PARA_ORDER = ['TL', 'TR', 'BR', 'BL'];

  /* the two pairs of opposite sides. Each side is named by its corners,
     walked the same way round as its partner, so a copy of one slides onto
     the other corner for corner. The tick count is the usual notation: one
     tick on the first pair, two on the second. */
  const PAIRS = {
    a: { sides: [['TL', 'TR'], ['BL', 'BR']], ticks: 1 },      /* top and bottom */
    b: { sides: [['TL', 'BL'], ['TR', 'BR']], ticks: 2 }       /* left and right */
  };
  const EXT = 44;              /* how far a side is carried on past each corner */

  const PARA = {
    ask:     T('p04WhatShape'),
    /* the verdict is said a sentence at a time (user, 2026-09-28): the cheer,
       then what the shape is, then the property that names it */
    right:   [T('fbCorrectShort'), T('p09IsPara'), T('p09TwoPairs')],
    look1:   T('p09TopBottom'),
    never:   T('p09NeverMeet'),
    look2:   T('p09LeftRight'),
    measure: T('p09Compare'),
    fit1:    T('p09TopFits'),
    fit2:    T('p09LeftFits'),
    /* a wrong name is turned down a sentence at a time too, for the same
       reason the right one is (user, 2026-09-28) */
    /* the original wording, back now that its two sentences are recorded
       ("newww voice filmie.mp3", 2026-10-01); for a day they were replaced
       by "A parallelogram has two pairs of parallel sides. Check the shape
       carefully.", which had clips (P09-03, P09-13) */
    hint:    [T('fbNotQuite'), T('p09NotTrap'), T('p09TrapOnePair')],
    facts: {
      par: TS('p09FactParallel', { parallel: { t: T('wordParallel'), w: 'par' } }),
      eq:  TS('p09FactEqual',    { equal:    { t: T('wordEqualInLength'), w: 'eq' } })
    }
  };
  const PARA_ANSWER = 'parallelogram';

  /* the second half: base, height, the cut, the working, and the quiz */
  const PARA2 = {
    here:   T('p10Here'),
    base:   T('p10Base'),
    height: T('p10Height'),
    divide: T('p10Divide'),
    /* the working, a triangle at a time, each part said as it floats off
       the drawing into its line (user, 2026-09-29: page 4's way) */
    tri1: {
      look: T('p10Tri1'),
      area: T('p04AreaIs'),
      /* page 4's sentences, which have clips; "Its base is b." and "And the
         same height h." were never recorded (user, 2026-09-30) */
      b:    T('p04Base1'),
      h:    T('p04HeightIs', { h: 'h' })
    },
    tri2: {
      look: T('p10Tri2'),
      area: T('p04AreaIs'),
      b:    T('p04Base2'),
      h:    T('p04HeightIs', { h: 'h' })
    },
    whole:  T('p10Made'),
    /* page 4's own line, and its clip (P04-10) */
    swap:   T('p04PutIn'),
    half:   T('p10TwoHalves'),
    words:  T('p10BaseHeight'),
    rule:   T('p10Rule'),
    which:  T('p11Which'),
    right:  T('p11Right')
  };
  const AREA_ANSWER = 'bh';
  /* a wrong formula is turned down in Swiftee's box with what it is instead,
     as page 4 says how many sides a wrong name has */
  const AREA_WRONG = {
    half:   T('p11NotHalf'),
    double: T('p11NotDouble')
  };

  /* the learner's own go: the same shape with measurements on it */
  const PARA3 = {
    turn:   T('p12Turn'),
    base:   CM(8),
    height: CM(5),
    /* every answer to the three questions gets a line from the mascot, as
       page 6's do (user, 2026-09-29): a right one says what was found, a
       wrong one points back at the measurement the question is about, and
       the drawing glows gold there until the next try */
    rightBase:   T('p12RightBase'),
    rightHeight: T('p12RightHeight'),
    /* one "=" only: a line with two is laid out as a derivation, a row per
       step (lineSpans), and this is a sentence */
    rightArea:   T('p12RightArea'),
    wrongBase:   T('p12WrongBase'),
    wrongHeight: T('p12WrongHeight'),
    wrongArea:   T('p12WrongArea')
  };
  /* and Swiftee's aside once it is done */
  const PARA_ASIDE = [
    T('p13Know'),
    T('p13Special')
  ];

  /* the two triangles are told apart by colour: purple on top of the cut,
     green under it. Each has the same base b and the same height h. */
  /* `fly`: the part is written as its `word` first, and then a copy of the
     drawing's own label for it floats onto that word and the word becomes
     it (floatLine). Triangle 1's b and h are the top base and the right
     height; Triangle 2's the pair the whole shape was given. */
  const PB = k => ({ t: 'b', w: 'b', fly: k, word: T('labelBase') });
  const PH = k => ({ t: 'h', w: 'h', fly: k, word: T('labelHeight') });
  const PARA_LINES = [
    [...AREA_OF(T('triangle1'), 'purple'), { t: ' = ½ × ' }, PB('b'), { t: ' × ' }, PH('h')],
    [...AREA_OF(T('triangle2'), 'green'),  { t: ' = ½ × ' }, PB('b'), { t: ' × ' }, PH('h')],
    [...AREA_OF(T('shapeParallelogram'), 'para'), ...EQ_AREA_OF(T('triangle1'), 'purple'),
     ...PLUS_AREA_OF(T('triangle2'), 'green')]
  ];
  /* The third line does not stop at the sum: it is worked in place, on the
     row it was written on, as the quadrilateral's is (QUAD_STEPS) -- each
     triangle's name giving way to that triangle's area, one and then the
     other (user, 2026-09-29). */
  const PARA_SUM = [
    [...AREA_OF(T('shapeParallelogram'), 'para'), { t: ' = ½ × ' }, { t: 'b', w: 'b' }, { t: ' × ' }, { t: 'h', w: 'h' },
     ...PLUS_AREA_OF(T('triangle2'), 'green')],
    [...AREA_OF(T('shapeParallelogram'), 'para'), { t: ' = ½ × ' }, { t: 'b', w: 'b' }, { t: ' × ' }, { t: 'h', w: 'h' },
     { t: ' + ½ × ' }, { t: 'b', w: 'b' }, { t: ' × ' }, { t: 'h', w: 'h' }]
  ];
  /* The fourth line is a copy of the third as it is left, under its "="
     and carrying only its right-hand side (copyLine), worked in place too:
     "= ½ × b × h + ½ × b × h" -> "= b × h" -> "= base × height" */
  const PARA_STEPS = [
    PARA_SUM[1],
    [...AREA_OF(T('shapeParallelogram'), 'para'), { t: ' = ' }, { t: 'b', w: 'b' }, { t: ' × ' }, { t: 'h', w: 'h' }],
    /* the words keep the hues of the letters they replace: base in the
       base's colour, height in the height's (user, 2026-09-29) */
    [...AREA_OF(T('shapeParallelogram'), 'para'), { t: ' = ' }, { t: T('labelBase'), w: 'b' }, { t: ' × ' }, { t: T('labelHeight'), w: 'h' }]
  ];

  /* each fact's ghost holds its whole line from the first frame, so the list
     is sized before a character lands */
  Object.keys(PARA.facts).forEach(k => {
    const segs = PARA.facts[k];
    lineSpans(factEls[k].querySelector('.type-ghost'), segs);
  });

  /* ---------- building the parallelogram ----------
   * The shape, and over it everything the explanation will need: for every
   * side, a glowing copy to grow along it, two dotted carry-ons past its
   * corners, an arrow mark and its tick marks; and for each pair, the
   * measuring copy of its first side. Every mark is inked in the pair's hue
   * over a pale halo, so it reads on the lit side, the fill and the board
   * alike. */
  function buildPara() {
    const P = PARA_PTS;
    const ln = (cls, a, b) => '<line class="' + cls + '" x1="' + fmt(a.x) + '" y1="' + fmt(a.y) + '" x2="' + fmt(b.x) + '" y2="' + fmt(b.y) + '" />';
    const at = (o, u, s, n, t) => ({ x: o.x + u.x * s + n.x * t, y: o.y + u.y * s + n.y * t });

    /* the shape, the two triangles the diagonal will make (purple above the
       cut, green below), and the outline that draws itself */
    paraArt.innerHTML =
      '<polygon class="shape-fill" clip-path="url(#wipePara)" points="' + PARA_ORDER.map(k => pt(P[k])).join(' ') + '" />' +
      '<polygon class="tri-fill c-purple" points="' + pt(P.TL) + ' ' + pt(P.TR) + ' ' + pt(P.BR) + '" />' +
      '<polygon class="tri-fill c-green" points="' + pt(P.TL) + ' ' + pt(P.BR) + ' ' + pt(P.BL) + '" />' +
      '<path class="shape-outline" d="M' + PARA_ORDER.map(k => fmt(P[k].x) + ' ' + fmt(P[k].y)).join(' L') + ' Z" fill="none" stroke-width="5" />' +
      /* each triangle's own two outer sides, stacked on the outline and
         unseen until a half is in focus -- then the focused one is drawn
         heavier and the other's fades (see .tri-outline, focusTri) */
      '<path class="tri-outline ol-purple" d="M' + ['TL', 'TR', 'BR'].map(k => fmt(P[k].x) + ' ' + fmt(P[k].y)).join(' L') + '" fill="none" />' +
      '<path class="tri-outline ol-green" d="M' + ['BR', 'BL', 'TL'].map(k => fmt(P[k].x) + ' ' + fmt(P[k].y)).join(' L') + '" fill="none" />';
    paraFill = paraArt.querySelector('.shape-fill');

    /* the dimensions. A base is a two-headed arrow a little off its side,
       with its label beyond; a height is dropped from a corner straight onto
       the opposite side, with a right-angle mark at its foot and its label
       alongside. The bottom base and the left height come first; the
       diagonal, the top base and the right height arrive with the cut. */
    const GAP = 20, HEAD = 6;   /* small heads: the arrow is a helper (user, 2026-09-28) */
    const arrow = (cls, a, b, ly, label, sym) => {
      const y = a.y + GAP * (ly > 0 ? 1 : -1);
      const A = { x: a.x, y: y }, B = { x: b.x, y: y };
      return '<g class="d-group d-base ' + cls + '">' +
        ln('d-arrow', A, B) +
        '<path class="d-head" d="M' + fmt(A.x + HEAD) + ' ' + fmt(y - HEAD * .65) + ' L' + fmt(A.x) + ' ' + fmt(y) + ' L' + fmt(A.x + HEAD) + ' ' + fmt(y + HEAD * .65) + '" />' +
        '<path class="d-head" d="M' + fmt(B.x - HEAD) + ' ' + fmt(y - HEAD * .65) + ' L' + fmt(B.x) + ' ' + fmt(y) + ' L' + fmt(B.x - HEAD) + ' ' + fmt(y + HEAD * .65) + '" />' +
        '<text class="d-label" x="' + fmt((A.x + B.x) / 2) + '" y="' + fmt(y + (ly > 0 ? 22 : -11)) + '" font-size="' + (sym ? 17 : 14) + '" text-anchor="middle">' +
          label + (sym ? '<tspan class="d-sym">' + sym + '</tspan>' : '') + '</text>' +
      '</g>';
    };
    const height = (cls, top, foot, side, label, sym) => {
      /* side: which way the mark and the label sit, +1 to the right */
      const M = 12, up = foot.y > top.y ? -1 : 1;    /* the mark stands off the foot, toward the top */
      const mark = 'M' + fmt(foot.x) + ' ' + fmt(foot.y + up * M) + ' H' + fmt(foot.x + side * M) + ' V' + fmt(foot.y);
      /* a two-headed arrow too, like the base: the tip sits exactly at each
         end, its wings drawn back along the (always upright) line */
      const s = -up;
      return '<g class="d-group d-h ' + cls + '">' +
        ln('d-height', top, foot) +
        '<path class="d-head" d="M' + fmt(top.x - HEAD * .65) + ' ' + fmt(top.y + s * HEAD) + ' L' + fmt(top.x) + ' ' + fmt(top.y) + ' L' + fmt(top.x + HEAD * .65) + ' ' + fmt(top.y + s * HEAD) + '" />' +
        '<path class="d-head" d="M' + fmt(foot.x - HEAD * .65) + ' ' + fmt(foot.y - s * HEAD) + ' L' + fmt(foot.x) + ' ' + fmt(foot.y) + ' L' + fmt(foot.x + HEAD * .65) + ' ' + fmt(foot.y - s * HEAD) + '" />' +
        '<path class="d-mark" d="' + mark + '" />' +
        '<text class="d-label" x="' + fmt(foot.x + side * 9) + '" y="' + fmt((top.y + foot.y) / 2) + '" font-size="' + (sym ? 17 : 14) + '" text-anchor="' + (side > 0 ? 'start' : 'end') + '" dominant-baseline="middle">' +
          label + (sym ? '<tspan class="d-sym">' + sym + '</tspan>' : '') + '</text>' +
      '</g>';
    };
    paraDims.innerHTML =
      arrow('d-bottom', P.BL, P.BR, 1, T('labelBaseCap'), ' (b)') +
      height('d-left', P.TL, { x: P.TL.x, y: P.BL.y }, 1, T('labelHeightCap'), ' (h)') +
      '<g class="split-dims">' +
        ln('join-line', P.TL, P.BR) +
        arrow('d-top', P.TL, P.TR, -1, 'b', '') +
        height('d-right', P.BR, { x: P.BR.x, y: P.TR.y }, -1, 'h', '') +
      '</g>';

    let ex = '';
    Object.keys(PAIRS).forEach(k => {
      const pair = PAIRS[k];
      ex += '<g class="pair pair-' + k + '" data-pair="' + k + '">';
      pair.sides.forEach(side => {
        const A = P[side[0]], B = P[side[1]];
        const dx = B.x - A.x, dy = B.y - A.y, len = Math.hypot(dx, dy);
        const u = { x: dx / len, y: dy / len };                  /* along the side */
        const n = { x: -u.y, y: u.x };                           /* across it */

        /* carried on past both corners, each drawn outward from its corner */
        ex += ln('ext', A, at(A, u, -EXT, n, 0));
        ex += ln('ext', B, at(B, u, EXT, n, 0));
        /* the glowing copy, grown from the first corner */
        ex += ln('side-hl', A, B);

        /* "parallel": arrowheads most of the way along, pointing the way the
           side runs -- one on the first pair and two on the second, the same
           count as the ticks. Both pairs' marks are on the shape at the same
           time by the end of the scene, and a single arrow on all four sides
           would say all four run the same way. They sit well past the middle
           so they never crowd the ticks that land there. */
        const M = at(A, u, len * .74, n, 0), s = 9, astep = 8;
        let chev = '';
        for (let j = 0; j < pair.ticks; j++) {
          const T = at(M, u, (j - (pair.ticks - 1) / 2) * astep, n, 0);
          chev += 'M' + fmt(T.x - u.x * s + n.x * s) + ' ' + fmt(T.y - u.y * s + n.y * s) +
                 ' L' + fmt(T.x) + ' ' + fmt(T.y) +
                 ' L' + fmt(T.x - u.x * s - n.x * s) + ' ' + fmt(T.y - u.y * s - n.y * s) + ' ';
        }
        ex += '<g class="par-mark"><path class="halo" d="' + chev + '" /><path class="ink" d="' + chev + '" /></g>';

        /* "equal": one or two ticks across the middle */
        const C = at(A, u, len / 2, n, 0), t = 10, gap = 8;
        let ticks = '';
        for (let j = 0; j < pair.ticks; j++) {
          const off = (j - (pair.ticks - 1) / 2) * gap;
          ticks += 'M' + fmt(C.x + u.x * off + n.x * t) + ' ' + fmt(C.y + u.y * off + n.y * t) +
                  ' L' + fmt(C.x + u.x * off - n.x * t) + ' ' + fmt(C.y + u.y * off - n.y * t) + ' ';
        }
        ex += '<g class="eq-mark"><path class="halo" d="' + ticks + '" /><path class="ink" d="' + ticks + '" /></g>';
      });
      /* the measuring copy: the pair's first side, to be slid onto the second */
      ex += ln('ghost-side', P[pair.sides[0][0]], P[pair.sides[0][1]]);
      ex += '</g>';
    });
    paraEx.innerHTML = ex;
  }

  const pairEl = k => paraEx.querySelector('.pair-' + k);

  /* ---------- tap the right chip ----------
   * A row of chips under the shape. The right one goes green with a burst; a
   * wrong one is shaken off, turned down in the heading, and steps back. A
   * skip taps the right one.
   *
   * `onWrong`, if a question has one, is told which chip was tapped, so the
   * question can say why that name is wrong as well as that it is. */
  function askChips(chips, answer, onWrong) {
    return new Promise(resolve => {
      let over = false;
      const finish = (chip, auto) => {
        if (over) return;
        over = true;
        skipFills.delete(fill);
        sceneWaiters.delete(teardown);
        lockInput(true);
        chips.forEach(c => c.removeEventListener('click', onTap));
        feedbackGen++;                       /* a wrong answer's line still typing stops here */
        markRight(chip);
        if (!auto) {
          sfx('correct', .7);
          burst(chip);
          swiftee.play('happy', 1);
        }
        resolve();
      };
      const onTap = e => {
        const chip = e.currentTarget;
        if (!interactive || chip.classList.contains('spent')) return;
        if (chip.dataset.answer === answer) { finish(chip, false); return; }
        sfx('wrong', .6);
        if (onWrong) onWrong(chip);
        swiftee.play('confused', 1);
        markWrong(chip);
        setTimeout(() => {
          chip.classList.remove('reject');
          chip.classList.add('spent');
        }, 440);
      };
      const fill = () => finish(chips.find(c => c.dataset.answer === answer), true);
      /* A replay retires the scene while the question is open. The chips
         stay on the page, so the listeners must come off them here -- left
         on, the retired question would answer the fresh one's tap first and
         lock the input under it. The promise is simply never settled. */
      const teardown = () => {
        sceneWaiters.delete(teardown);
        over = true;
        skipFills.delete(fill);
        chips.forEach(c => c.removeEventListener('click', onTap));
      };
      sceneWaiters.add(teardown);
      skipFills.add(fill);
      chips.forEach(c => c.addEventListener('click', onTap));
      lockInput(false);
    });
  }

  /* ---- why the wrong name is wrong ----
   * A shaken chip says only that the name was wrong. This says what to look
   * at instead, under the chips, in the room the half-board leaves below
   * them. It is not typed: the line is laid out whole and every word eases
   * in together, so the learner reads one sentence rather than watching it
   * arrive -- the same voice the trapezium's quiz answers in. The same box
   * holds every try, and the ghost carries the line from the first frame. */

  /* And each fact's box is its whole line from the first frame. The live
     text is laid over its ghost rather than in the flow, so without this the
     lines have no width of their own: they hang out of the right of their
     box, and the column they stand in is sized by nothing at all. */
  Object.keys(PARA.facts).forEach(k => {
    factEls[k].querySelector('.type-ghost').textContent =
      PARA.facts[k].map(seg => seg.t).join('');
  });
  /* Every line of this scene, said from Swiftee's own spot at the top of the
     right half rather than from the board's heading (user, 2026-09-18): the
     question, the reason a wrong name is wrong, the answer, and the lines
     about the sides.
     `tone` is the verdict on a choice, and it is what draws the message box:
     a question or a remark is simply the words, and only 'ok' or 'bad' puts
     the line in a box -- green or red -- the way every other spot where the
     bird stands beside its line does (user, 2026-09-18). */
  /* Size the box to the line it is about to hold (user, 2026-09-28). The ghost
     is cut to this line, and `width: max-content` in the CSS then hugs the box
     to it (capped by the max-width) -- so a short line sits in a small bubble
     and a long one opens the box out, rather than every line standing in a box
     stretched to the longest of the scene. Sizing the ghost before the words
     are laid in keeps the box from resizing under them as they arrive.
     A line too long for one row is pulled snug round the rows it breaks
     into (snug), so a two-row verdict has no blank margin down either side
     (user, 2026-10-01). */
  function paraBoxTo(text) {
    const ghost = paraText.querySelector('.type-ghost');
    lineSpans(ghost, [{ t: longestChunk(text) }]);
    snug(ghost);
  }
  async function sayPara(text, tone) {
    feedbackGen++;
    paraBoxTo(text);
    /* the line lands as whole words at once, the way the name quiz's lines do
       just above (user, 2026-09-28): a slow character-by-character crawl left
       the shape's mark already drawn while the words were still arriving -- so
       the two read as out of step -- and the box half empty for most of the
       line. Landing the words together puts the sentence and its animation on
       screen together and fills the bubble at once. */
    paraText.classList.remove('ok', 'bad');
    if (tone) paraText.classList.add(tone);
    paraCaret.hidden = true;
    await speakerUp(paraTxt);
    swiftee.hold('talking');
    await sayPieces(paraTxt, text);
    /* the lines about the sides are one explanation: the bird and its last
       line stay up between them, the next line replacing it, rather than the
       bird leaving and jumping back in after every sentence (user,
       2026-09-25). The next scene takes it down. */
    cancelDismiss(paraTxt);
    swiftee.release();
  }
  /* The name quiz's lines, said page 4's way (user, 2026-09-25): the box fits
     the line, the words come all at once, and nothing takes them down -- the
     question stays up with the bird while the learner picks a name, and the
     verdict stays until Next. */
  async function paraQuizSay(text, tone) {
    /* built the way the live words are, a span per word, so the box and the
       words inside it wrap at the same place. Sized BEFORE the bird is
       brought up (same rule as the heading's, see mascotWithLine): sized
       after the jump, the box takes its width under a bird that has already
       landed and shoves it sideways a beat after it arrives. */
    paraBoxTo(text);
    await speakerUp(paraTxt);
    feedbackGen++;
    paraText.classList.remove('ok', 'bad');
    if (tone) paraText.classList.add(tone);
    paraCaret.hidden = true;
    swiftee.hold('talking');
    await sayPieces(paraTxt, text);
    swiftee.release();
  }
  /* Page 10's box refits every piece it says, as page 4's does (user,
     2026-09-29): a line said a piece at a time shows one piece at once, so
     "That's Correct!" gets a box its own size rather than the size of the
     rule after it, and a piece that wraps has the box pulled snug round its
     rows (snug). The first piece is fitted before the bird comes up, for
     the reason paraQuizSay gives. */
  const paraGhost = paraText.querySelector('.type-ghost');
  const firstPiece = text => segChunks([{ t: text }])[0].segs.map(sg => sg.t).join('');
  async function paraFitSay(text, tone) {
    fitTo(paraGhost, firstPiece(text));
    await speakerUp(paraTxt);
    feedbackGen++;
    paraText.classList.remove('ok', 'bad');
    if (tone) paraText.classList.add(tone);
    paraCaret.hidden = true;
    swiftee.hold('talking');
    await sayPieces(paraTxt, text, piece => fitTo(paraGhost, piece));
    swiftee.release();
  }
  /* ...but the row the box stands in is held at the height of the tallest
     piece it will hold, so the bird and the formulas under it never move as
     the box changes size: the box grows upward from over the bird's head
     (see .para.sides .para-text). Page 8's names and lines are held the same
     way (user, 2026-10-01). Measured with the half laid out. */
  let paraRowLines = null;
  function reserveParaRow(lines) {
    paraRowLines = lines;
    paraSay.style.minHeight = '';
    let h = 0;
    lines.forEach(line => segChunks([{ t: line }]).forEach(ch => {
      fitTo(paraGhost, ch.segs.map(sg => sg.t).join(''));
      h = Math.max(h, paraSay.offsetHeight);
    }));
    paraSay.style.minHeight = h + 'px';
  }
  window.addEventListener('resize', () => {
    if (!para.classList.contains('sides') || !paraRowLines) return;
    const now = paraTxt.textContent;
    reserveParaRow(paraRowLines);
    if (para.classList.contains('formula')) fitTo(paraGhost, now);
    else paraBoxTo(now);
  });
  /* the verdict on a name is a few short sentences, shown one at a time in the
     one box: each replaces the last, with a beat between them to read
     (user, 2026-09-28). A string on its own still works as a single line.
     A newer verdict cancels an older one that is still running, so a wrong
     name's reasons stop the moment the right name is tapped rather than
     fighting the answer for the box. */
  let paraVerdictGen = 0;
  async function paraQuizSeq(lines, tone) {
    const seq = Array.isArray(lines) ? lines : [lines];
    const gen = ++paraVerdictGen;
    for (let i = 0; i < seq.length; i++) {
      if (gen !== paraVerdictGen) return;
      await paraQuizSay(seq[i], tone);
      if (i < seq.length - 1) await wait(REDUCED ? 500 : 1200);
    }
  }
  /* a replay finds the row as the last run left it: empty, and up. The held
     height goes with the words -- every caller clears the row only once the
     bird has left it, so letting the row close moves nobody. */
  function clearParaSay() {
    paraSay.classList.remove('off', 'quiet');
    paraText.classList.remove('ok', 'bad');
    paraTxt.textContent = '';
    paraCaret.hidden = true;
    paraSay.style.minHeight = '';
    paraRowLines = null;
  }

  /* the chips fade up one after another */
  async function dealChips(chips) {
    for (const chip of chips) {
      chip.classList.add('reveal');
      await wait(150);
    }
    sfx('click', .3);
  }

  /* ---------- showing the two facts ---------- */

  /* the pair's two sides light up, one after the other */
  async function lightPair(k) {
    const pair = pairEl(k);
    pair.classList.add('lit');
    const sides = pair.querySelectorAll('.side-hl');
    await growLine(sides[0], 620);
    await wait(140);
    await growLine(sides[1], 620);
  }

  /* both sides are carried on past their corners, all four ends at once, and
     the arrow marks land: two lines that keep their distance never meet */
  async function extendPair(k) {
    const pair = pairEl(k);
    await Promise.all(Array.from(pair.querySelectorAll('.ext')).map(l => growLine(l, 760)));
    await wait(200);
    pair.classList.add('show-par');
    sfx('click', .35);
    await wait(REDUCED ? 160 : 480);
  }

  /* the point is made: the carry-ons leave and the sides dim to a trace, but
     the arrow marks stay -- they are what the shape is marked with from here
     to the end of the scene, and the ticks come to join them rather than to
     replace them. The lines were lit inline by growLine, so that is lifted
     first and the classes take over the fade. */
  function quietPair(k) {
    const pair = pairEl(k);
    pair.querySelectorAll('.ext, .side-hl').forEach(l => { l.style.opacity = ''; });
    pair.classList.add('quiet');
  }

  /* a glowing copy of the pair's first side lifts off it, glides across the
     shape and lands exactly over the second; the tick marks land on both, and
     the copy fades away */
  async function measurePair(k) {
    const pair = pairEl(k);
    const ghost = pair.querySelector('.ghost-side');
    const [s1, s2] = PAIRS[k].sides;
    const A = PARA_PTS[s1[0]], C = PARA_PTS[s2[0]];
    const dx = C.x - A.x, dy = C.y - A.y;

    ghost.setAttribute('transform', 'translate(0 0)');
    ghost.classList.add('show');
    await wait(REDUCED ? 120 : 420);
    await tween(1150, e => {
      ghost.setAttribute('transform', 'translate(' + fmt(dx * e) + ' ' + fmt(dy * e) + ')');
    }, easeInOut);
    /* it fits: one pulse, and the ticks go on */
    sfx('click', .45);
    ghost.classList.add('land');
    await wait(180);
    pair.classList.add('show-eq');
    await wait(REDUCED ? 160 : 520);
    ghost.classList.remove('land');
    await wait(420);
    ghost.classList.remove('show');
    await wait(320);
  }

  /* Swiftee hops down beside the list and states a fact: the line types out
     beside it, its key words lighting up in the pair's hue, and the ring
     fills with a tick once it has landed */
  /* Swiftee does not hop down to the list any more (user, 2026-09-18): it is
     already standing in its box at the top of this half, and the fact types
     itself out in the cell underneath. */
  async function stateFact(k) {
    const el = factEls[k];
    feedbackGen++;
    await wait(200);
    el.classList.add('show');
    await wait(REDUCED ? 160 : 420);
    swiftee.hold('talking');
    await typeSegments(el.querySelector('.txt'), el.querySelector('.caret'), PARA.facts[k], TYPE_MS, 420, null);
    swiftee.release();
    el.classList.add('done');
    Motion.correctPulse(el.querySelector('.fact-check'));
    sfx('correct', .45);
  }

  async function paraSection() {
    lockInput(true);
    sceneStart(paraSection);
    /* the section's root keeps its own class list through a teardown, so a
       replay can find the last run's columns still on it: the shape is
       revealed in the middle of the board and moves aside afterwards */
    para.classList.remove('sides', 'wide');
    clearParaSay();

    /* 1. the aside ends: the bubble pops away and Swiftee drops out of the
          frame, as it did before the board first arrived */
    bubble.classList.add('out');
    bubble.classList.remove('show');
    await wait(300);
    await introExit();
    intro.classList.remove('on', 'aside');

    /* the board comes back blank: the quadrilateral scenes are cleared off
       it while it is still invisible, and the heading's ghost takes the
       longest line of this scene while there is nothing on the board to move */
    board.classList.add('sec4');
    promptReserve(longest([PARA.look1, PARA.never, PARA.look2, PARA.measure, PARA.fit1, PARA.fit2]
      .concat(Object.keys(PARA2).reduce((all, k) => all.concat(typeof PARA2[k] === 'string'
        ? PARA2[k] : Object.keys(PARA2[k]).map(j => PARA2[k][j])), []), PARA3.turn)));
    buildPara();
    await wait(200);
    await showBoard();
    await wait(300);

    /* 2. the parallelogram: outline first, then the colour */
    para.classList.add('on');
    para.setAttribute('aria-hidden', 'false');
    await wait(120);
    await revealShape(paraShape);
    await wait(380);

    /* 2b. it glides over to the left half. Everything this scene has to say
           -- the two names, then the two facts -- is a short line, and beside
           the shape rather than under it they leave the parallelogram the
           whole height of the board instead of a strip of it, and no flank
           of the board standing empty. */
    await layoutWide(para, paraSvg, true, 'sides');
    await wait(300);

    /* 3. Swiftee jumps up into its box at the top of the right half and
          stays there for the rest of the scene: the question, the reason a
          wrong name is wrong and the answer are all said from the one spot.
          The box fits each line it says, and the row it stands in is held
          at the height of the tallest line of the whole scene, so nothing
          under it moves as the lines change over (user, 2026-10-01). The
          first line is fitted before the bird comes up. */
    reserveParaRow([PARA.ask, PARA.look1, PARA.never, PARA.look2, PARA.measure, PARA.fit1, PARA.fit2]
      .concat(PARA.hint, PARA.right));
    paraBoxTo(PARA.ask);
    await mascotJumpIn(paraMascot);
    await wait(REDUCED ? 80 : 260);
    await paraQuizSay(PARA.ask);
    await dealChips(paraChips);
    await wait(200);
    await askChips(paraChips, PARA_ANSWER, () => paraQuizSeq(PARA.hint, 'bad'));
    await paraQuizSeq(PARA.right, 'ok');
    /* the learner reads the answer for as long as they like and moves on
       with Next, as page 4 does */
    await wait(REDUCED ? 200 : 600);
    await showNext();

    /* 4. the names go and the fact list takes the cell under the box; the
          box goes back to holding the longest of the lines still to come */
    lineSpans(paraText.querySelector('.type-ghost'),
      [{ t: longest([PARA.look1, PARA.never, PARA.look2, PARA.measure, PARA.fit1, PARA.fit2]) }]);
    paraTray.classList.add('off');
    await wait(460);
    facts.classList.add('show');
    await wait(200);

    /* 5. parallel: the top and bottom light up as Swiftee points at them,
          are carried on and never meet; then the left and right */
    let said = sayPara(PARA.look1);
    await lightPair('a');
    await said;
    await wait(500);
    said = sayPara(PARA.never);
    await extendPair('a');
    await said;
    await wait(900);
    said = sayPara(PARA.look2);
    await lightPair('b');
    await extendPair('b');
    await said;
    await wait(800);

    /* Swiftee hops down and states the first fact */
    await stateFact('par');

    /* 6. equal: the carry-ons step back and the shape is left standing under
          its parallel marks alone. Two seconds of that -- long enough to read
          the marking as the marking, not as a passing highlight -- and the
          equal marks arrive beside them, a copy of each first side laid over
          its partner. The bird has not moved, so the two seconds belong to
          the marks alone. */
    quietPair('a');
    quietPair('b');
    await wait(2000);
    /* the sentence and the length it names arrive together (user, 2026-09-28):
       "compare their lengths" is the spoken cue, and then each "... fits ...
       exactly" is said AS its own copy slides onto its partner and the equal
       marks land -- P09-08 with the top-and-bottom measure, P09-09 with the
       left-and-right one -- so the words and the figure make the same point at
       the same moment, rather than the copy sliding a sentence early or a
       sentence landing on a figure that has already stopped moving. */
    await sayPara(PARA.measure);
    await wait(REDUCED ? 200 : 500);
    let measured = sayPara(PARA.fit1);
    await measurePair('a');
    await measured;
    await wait(700);
    measured = sayPara(PARA.fit2);
    await measurePair('b');
    await measured;
    await wait(700);

    /* Swiftee hops down and states the second fact, and is proud of it */
    await stateFact('eq');
    swiftee.play('proud', 1);
    skyConfetti(90, 2800);
    sfx('confetti', .7);
    await wait(2200);

    /* 7. and Next. Swiftee stays in its box with the last thing it said,
          beside the two facts it has just made: the trip back up to the
          heading belongs to the next scene, which is where the shape comes
          back to the middle of the board (user, 2026-09-18), so nothing
          moves while the learner is reading and deciding to go on. */
    await wait(300);
    await showNext();
    await paraArea();
  }

  /* ---------- the area of the parallelogram ----------
   * The marks and the facts clear, leaving Swiftee and the shape. The base
   * is drawn under it and the height dropped onto it, each named as it
   * comes; the diagonal cuts the shape into two triangles, the second base
   * and height appear, and the shape moves aside for the working: half of
   * b times h, twice over, is b times h. Then the shape is put back together
   * in the middle for the quiz: which of three formulas is its area. */

  /* a key word of the working lands: light what it names */
  function onParaWord(w) {
    if (w === 'green' || w === 'purple') { pulseTri(paraShape, w); return; }
    if (w === 'b' || w === 'h') { paraShape.classList.add('lit-' + w); return; }
    /* the whole shape: both halves swell and the outline glows */
    pulseTri(paraShape, 'purple');
    pulseTri(paraShape, 'green');
    paraShape.classList.remove('lit-quad');
    void paraShape.offsetWidth;
    paraShape.classList.add('lit-quad');
  }

  const dimGroup = cls => paraDims.querySelector('.' + cls);

  /* the arrow grows from its left end, then the heads and the label come on */
  async function drawBase(cls) {
    const g = dimGroup(cls);
    await growLine(g.querySelector('.d-arrow'), 720);
    g.classList.add('on');
    sfx('click', .35);
    await wait(REDUCED ? 160 : 520);
  }

  /* the dotted height drops from the corner, then the heads, the mark and
     the label */
  async function drawHeight(cls) {
    const g = dimGroup(cls);
    await growLine(g.querySelector('.d-height'), 640);
    g.classList.add('on');
    sfx('click', .35);
    await wait(REDUCED ? 160 : 520);
  }

  /* The diagonal draws, and the two halves come out of it one at a time:
     the top triangle shades in and takes its own base and height, and only
     once it is whole does the bottom one shade in under it -- which already
     has the base and the height the parallelogram was given. Both at once
     was a single event the eye had to unpick afterwards; one after the other
     is the cut being made, then each piece being measured. */
  async function dividePara() {
    paraShape.classList.add('divided');
    const diag = paraDims.querySelector('.join-line');
    await growLine(diag, 700);
    diag.classList.add('done');
    await wait(300);
    if (paraFill) paraFill.style.opacity = '';
    /* the fill gives way to the top half alone */
    paraShape.classList.add('cut-top', 'split');
    await wait(REDUCED ? 300 : 800);
    await drawBase('d-top');
    await drawHeight('d-right');
    await wait(REDUCED ? 200 : 600);
    /* and the bottom half takes the rest of the shape */
    paraShape.classList.remove('cut-top');
    await wait(REDUCED ? 300 : 800);
  }

  /* the shape is put back together: the working leaves, the cut and the
     second pair fade, the colour comes back */
  /* The parallelogram as the first scene leaves it, without the choreography
     -- and, if asked, with the base and the height already named on it, as
     the area scene leaves it. A replay of (or a jump into) a scene that
     inherits the shape finds the board bare, since the teardown takes off
     everything a scene built for itself; this puts back what it was given. */
  function ensurePara(dims) {
    let built = false;
    if (!paraArt.firstChild) {
      buildPara();
      const outline = paraArt.querySelector('.shape-outline');
      outline.style.strokeDasharray = 'none';
      outline.style.strokeDashoffset = '0';
      paraFill.style.opacity = 1;
      paraTray.classList.add('off');            /* the names went with the first scene */
      built = true;
    }
    if (dims && !dimGroup('d-bottom').classList.contains('on')) {
      ['d-bottom', 'd-left'].forEach(cls => {
        const g = dimGroup(cls);
        g.querySelectorAll('.d-arrow, .d-height').forEach(l => { l.style.opacity = 1; });
        g.classList.add('on');
      });
      paraShape.classList.add('syms');
    }
    return built;
  }

  /* ...where it stands: it stays in the left half for the quiz (user,
     2026-09-29), so only the working and page 9's closing zoom go. The zoom
     class goes first and its origin only once the scale is back to 1 --
     cleared together, the origin jumps while the transform is still easing. */
  async function mendPara() {
    paraLines.classList.add('off');
    await wait(450);
    const zoomed = para.classList.contains('zoomed');
    zoomOut(para);
    paraShape.classList.remove('split', 'divided', 'cut-top', 'lit-b', 'lit-h',
                               'lit-quad', 'focus-purple', 'focus-green', 'outline-split');
    if (paraFill) paraFill.style.opacity = 1;
    await wait(zoomed && !REDUCED ? 900 : 600);
    unzoomContent(para);
    paraLines.textContent = '';
    paraLines.classList.remove('off');
  }

  /* a line of Swiftee's at the heading that stays up until the next one --
     the bird stays for the whole working (headStay) */
  const paraSay2 = t => heading(t).then(holdHeading);
  const dimLabel = cls => dimGroup(cls).querySelector('.d-label');

  /* One triangle's area, in conversation: the half comes forward, the line
     is written in words while Swiftee says it, and then its b and its h
     float off that half's own labels onto their words, each as it is named. */
  async function paraTriangle(color, segs, talkLines, from) {
    paraShape.classList.remove('lit-b', 'lit-h');
    focusTri(color, paraShape);
    pulseTri(paraShape, color);
    await wait(REDUCED ? 200 : 600);
    await paraSay2(talkLines.look);
    await wait(REDUCED ? 150 : 500);
    let talk = paraSay2(talkLines.area);
    await wait(REDUCED ? 100 : 300);
    await floatLine(segs, from, {
      root: paraLines, onWord: onParaWord,
      beforeFly: async key => {
        await talk;
        talk = paraSay2(talkLines[key]);
        await wait(REDUCED ? 100 : 500);
      }
    });
    await talk;
    await wait(REDUCED ? 200 : 700);
  }

  async function paraArea() {
    lockInput(true);
    sceneStart(paraArea);

    /* 1. the marks and the facts clear: Swiftee and the shape alone */
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    ensurePara(false);
    paraEx.classList.add('gone');
    facts.classList.remove('show');
    paraSay.classList.add('quiet');
    await wait(560);

    /* Next has been pressed (user, 2026-09-18): Swiftee jumps out of its box
       in the right half and up to the heading, and the shape comes back to
       the middle of the board it is about to be measured on. The hop goes
       first -- the box is still standing, so the bird has somewhere to leave
       from -- and only then is the row taken down with the column.
         A replay or a jump lands here with the bird behind the board and the
       box already down, and then there is nothing to hop: it comes up to the
       heading with the first line, as it does everywhere else. */
    /* The shape keeps the size and the height on screen page 8 gave it,
       and only slides across to the middle (user, 2026-09-29): it is held as
       it stands before the hop -- kept at its height while the heading row
       opens under the bird, moved down only as far as it must to stay clear
       of the heading -- and then glides sideways into the middle, where it
       stays that size for the base, the height and the cut. The move aside
       for the working lets it go (layoutWide). */
    let letGo = null;
    if (para.classList.contains('sides')) {
      pinDrawn(paraSvg);
      letGo = holdHeight(paraSvg);
    }
    if (paraMascot.classList.contains('in')) await hopBetween(paraMascot, boardMascot);
    clearParaSay();
    if (para.classList.contains('sides')) await layoutWide(para, paraSvg, false, 'sides', true);
    if (letGo) letGo();
    /* Swiftee stays at the heading for the whole explanation -- the shape,
       the base, the height and the cut -- and through the working, rather
       than leaving and coming back between lines; the row is held open with
       it, so the shape keeps one size. It is sent off once the working is
       complete, below (user, 2026-09-28). */
    headStay = true;
    board.classList.add('head-held');
    await heading(PARA2.here);
    await wait(1000);

    /* 2. the base, named as it is drawn */
    let said = heading(PARA2.base);
    await wait(500);
    await drawBase('d-bottom');
    await said;
    await wait(700);

    /* 3. the height, dropped from the corner; then both take their letters */
    said = heading(PARA2.height);
    await wait(400);
    await drawHeight('d-left');
    await said;
    await wait(300);
    paraShape.classList.add('syms');
    await wait(900);

    /* 4. the cut */
    await heading(PARA2.divide);
    await wait(300);
    await dividePara();
    await wait(500);

    /* 5. the shape moves to the left, and the working follows on the right:
          each triangle, their sum, and what that comes to */
    await layoutWide(para, paraSvg);
    await wait(300);
    /* each triangle's area is written with that triangle alone lit: the
       other half, its border and the base and height that belong to it step
       back, and its own border is drawn heavier, so the b and the h in the
       line have exactly one pair on the drawing to come from. The line is
       written in words, and each part then floats off the drawing onto its
       word as Swiftee names it -- page 4's way -- with a Next after each
       triangle (user, 2026-09-29). */
    await paraTriangle('purple', PARA_LINES[0], PARA2.tri1,
      { b: dimLabel('d-top'), h: dimLabel('d-right') });
    await showNext();
    await paraTriangle('green', PARA_LINES[1], PARA2.tri2,
      { b: dimLabel('d-bottom'), h: dimLabel('d-left') });
    await showNext();

    /* the sum is about both halves: neither is held back while it is
       written, "Area of Triangle 1 + Area of Triangle 2", each name lighting
       its half as it lands. Then it is worked where it stands: the line
       comes forward a step, and each name gives way to that triangle's area
       -- "½ × b × h" -- with that half alone in focus as it does, first one
       and then the other; the line settles back once both are in. */
    paraShape.classList.remove('lit-b', 'lit-h');
    focusTri(null, paraShape);
    await wait(REDUCED ? 160 : 420);
    let talk = paraSay2(PARA2.whole);
    await wait(REDUCED ? 100 : 300);
    const sum = await showTypedLine(PARA_LINES[2], paraLines, onParaWord);
    const sumTxt = sum.querySelector('.txt');
    await talk;
    await wait(REDUCED ? 300 : 1100);

    talk = paraSay2(PARA2.swap);
    await wait(REDUCED ? 200 : 700);
    sum.classList.add('solving');
    await wait(REDUCED ? 100 : 620);
    for (const [k, color] of [[0, 'purple'], [1, 'green']]) {
      focusTri(color, paraShape);
      pulseTri(paraShape, color);
      await wait(REDUCED ? 150 : 500);
      await morphTo(sumTxt, PARA_SUM[k], false, true);
      await wait(REDUCED ? 200 : 700);
    }
    await talk;
    focusTri(null, paraShape);
    sum.classList.remove('solving');
    await wait(REDUCED ? 300 : 1000);

    /* the fourth line: a copy of the third, as it is now, peels off under
       its "=", and is worked down to b × h and then put into words, each
       step as it is said */
    const rhs = PARA_STEPS.map(rhsOf);
    const work = await copyLine(sum, rhs[0], rhs[0], paraLines);
    const workTxt = work.querySelector('.txt');
    await wait(REDUCED ? 200 : 500);
    work.classList.add('solving');
    await wait(REDUCED ? 100 : 620);
    let step = (async () => {
      await wait(REDUCED ? 100 : 800);
      onParaWord('para');
      await morphTo(workTxt, rhs[1], false, true);
    })();
    await paraSay2(PARA2.half);
    await step;
    await wait(REDUCED ? 200 : 700);
    step = (async () => {
      await wait(REDUCED ? 100 : 600);
      await morphTo(workTxt, rhs[2], false, true);
    })();
    await paraSay2(PARA2.words);
    await step;
    work.classList.remove('solving');
    await wait(REDUCED ? 100 : 620);
    await heading(PARA2.rule);
    await wait(REDUCED ? 150 : 350);
    feedback(FEEDBACK.done);
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
    await wait(2600);

    /* 6. the formula is complete: Swiftee and its line leave the heading,
          and the shape and the working come forward into the room it
          leaves -- the quadrilateral's close -- and only then Next */
    headStay = false;
    feedbackGen++;
    caret.hidden = true;
    if (boardMascot.classList.contains('in')) {
      await mascotJumpOut(boardMascot, () => { promptTxt.textContent = ''; });
    } else promptTxt.textContent = '';
    await wait(REDUCED ? 60 : 220);
    zoomContent(para, [drawnRect(paraSvg)].concat(
      Array.from(paraLines.querySelectorAll('.area-line')).map(lineBox)),
      1.08);   /* only a little forward (user, 2026-09-28) */
    await wait(REDUCED ? 300 : 900 + 1500);
    await showNext();
    await paraAreaQuestion();
  }

  /* ---- the question the whole section was building to ----
     Its own function so that it, like every other scene, has a re-entry point
     Replay can call. */
  async function paraAreaQuestion() {
    lockInput(true);
    sceneStart(paraAreaQuestion);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    ensurePara(true);
    paraEx.classList.add('gone');
    clearParaSay();

    /* 1. the working goes and the shape is put back together, still in the
          left half */
    await mendPara();

    /* 2. page 4's name quiz, carried over (user, 2026-09-29): the board is
          halved exactly, the shape keeping the left half and the right half
          Swiftee's -- its box at the top, the three formulas under it. The
          working's layout is half and half too, with no gutter, and its
          lines are gone, so the shape already stands exactly where the quiz
          wants it: the layouts are traded without a glide. From the middle
          it glides across. `formula` does nothing without `sides`. */
    para.classList.add('formula');
    if (para.classList.contains('wide')) {
      para.classList.remove('wide');
      para.classList.add('sides');
    } else await layoutWide(para, paraSvg, true, 'sides');
    await wait(REDUCED ? 100 : 300);

    /* 3. Swiftee comes up into its box and asks first; then the formulas
          rise in under it one at a time. They are inert until askChips
          takes their taps, and every answer is said from the same box,
          which fits each piece as it comes. */
    reserveParaRow([PARA2.which, PARA2.right].concat(Object.keys(AREA_WRONG).map(k => AREA_WRONG[k])));
    await mascotJumpIn(paraMascot);
    await wait(REDUCED ? 80 : 260);
    await paraFitSay(PARA2.which);
    await wait(REDUCED ? 100 : 320);
    await revealGroup(areaChips, ROUND_IN);
    sfx('click', .3);
    await askChips(areaChips, AREA_ANSWER,
      chip => paraFitSay(AREA_WRONG[chip.dataset.answer], 'bad'));
    await paraFitSay(PARA2.right, 'ok');

    /* 4. Swiftee stays with its answer, beside the formulas, until the
          learner moves on: the formulas, the box and the trip up to the
          heading all belong to the next scene (user, 2026-09-29) */
    await wait(REDUCED ? 200 : 600);
    await showNext();
    await paraCheck();
  }

  /* ---------- the learner's own go ----------
   * The formula chips leave and the labels on the shape swap their letters
   * for measurements. The shape moves aside, as the quadrilateral did, and
   * the learner reads the base and the height off it from drop-downs -- both
   * live at once -- then works out the area. Then Swiftee's aside. */

  /* "Base (b)" and "Height (h)" become "8 cm" and "5 cm": each label fades,
     is re-lettered, and fades back in */
  async function measurePara() {
    const swaps = [['d-bottom', PARA3.base], ['d-left', PARA3.height]];
    const labels = swaps.map(([cls]) => dimGroup(cls).querySelector('.d-label'));
    labels.forEach(l => l.classList.add('swap'));
    paraShape.classList.remove('syms');
    await wait(REDUCED ? 100 : 460);
    labels.forEach((l, i) => { l.textContent = swaps[i][1]; l.classList.remove('swap'); });
    await wait(REDUCED ? 100 : 560);
  }

  async function paraCheck() {
    lockInput(true);
    sceneStart(paraCheck);

    /* Next has been pressed (user, 2026-09-29): the formulas drop away
       with Swiftee's answer, and then the bird hops out of its box up to
       the heading. The tray is only taken out of the room once the bird has
       left: taken out first, the foot closed up under a bird still standing
       in it and walked it down the half. A replay or a jump lands here with
       the bird behind the board, and the heading's first line brings it up. */
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    ensurePara(true);
    paraShape.classList.remove('gold-b', 'gold-h');   /* a replay mid-hint */
    paraEx.classList.add('gone');
    const shown = areaChips.filter(c => c.classList.contains('reveal'));
    const gone = played(shown.length ? Motion.exit(shown, { keep: true, y: 10, duration: .32, stagger: .08 }) : null);
    paraSay.classList.add('quiet');
    await gone;
    await wait(REDUCED ? 60 : 240);
    if (paraMascot.classList.contains('in')) await hopBetween(paraMascot, boardMascot);
    clearParaSay();
    paraSay.style.minHeight = '';
    areaTray.classList.add('off');
    await wait(REDUCED ? 100 : 300);

    /* and the shape is measured. Swiftee stays at the heading from here
       through the three questions and their feedback (see below). */
    await measurePara();
    headStay = true;
    await heading(PARA3.turn);
    await wait(300);

    /* aside for the questions. From the quiz's halves the shape already
       stands where the working's layout puts it, so the two are traded
       without a glide (see paraAreaQuestion). */
    if (para.classList.contains('sides')) {
      para.classList.remove('sides', 'formula');
      para.classList.add('wide');
    } else await layoutWide(para, paraSvg);
    await wait(300);

    /* the questions, one at a time: each appears once the one before it has
       been got right. The base and the height are read off the shape, and
       the part named lights up as it is answered; then the area itself.
       Swiftee stays at the heading for the three and says a line on every
       answer (user, 2026-09-29, after page 6): a wrong one names the
       measurement to look at and the drawing glows gold there, held until
       the next try; a right one says what was found, and the gold goes. */
    const goldGlow = (...parts) => {
      paraShape.classList.remove('gold-b', 'gold-h');
      parts.forEach(p => paraShape.classList.add('gold-' + p));
    };
    const sayLine = text => { heading(text).catch(() => {}); holdHeading(); };
    const right = (text, lit) => () => {
      /* every right answer here has a sentence of its own that opens with
         the verdict (rightBase, rightHeight, rightArea), so the generic
         clip is only announced, never sounded: started as well, it raced
         the sentence and one of the two was cut short */
      feedback(FEEDBACK.right, true);
      goldGlow();
      if (lit) paraShape.classList.add(lit);
      if (text) sayLine(text);
    };
    const wrong = (text, ...parts) => () => { sayLine(text); goldGlow(...parts); };
    const ask = async (label, opts, answer, onRight, onWrong) => {
      const q = questionLine(label, opts);
      await showLine(q.line, paraLines);
      lockInput(false);
      await q.dd.ask(v => v === answer, onRight, onWrong);
      lockInput(true);
    };
    await ask(T('p12QBase'),
      [{ v: '8', t: CM(8) }, { v: '5', t: CM(5) }, { v: '13', t: CM(13) }], '8',
      right(PARA3.rightBase, 'lit-b'), wrong(PARA3.wrongBase, 'b'));
    await wait(700);
    await ask(T('p12QHeight'),
      [{ v: '5', t: CM(5) }, { v: '8', t: CM(8) }, { v: '3', t: CM(3) }], '5',
      right(PARA3.rightHeight, 'lit-h'), wrong(PARA3.wrongHeight, 'h'));
    await wait(700);
    /* the area takes both measurements, so a wrong one glows both. Its right
       line is waited for: the celebration's "Well Done!" would stop it
       mid-type and send the bird off with half of it on screen. */
    await ask(T('p12QArea'),
      [{ v: '40', t: SQCM(40) }, { v: '13', t: SQCM(13) }, { v: '20', t: SQCM(20) }], '40',
      right(null), wrong(PARA3.wrongArea, 'b', 'h'));
    await heading(PARA3.rightArea);
    headStay = false;
    feedback(FEEDBACK.done);
    onParaWord('para');
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
    await wait(2600);
    await showNext();
    await paraAside();
  }

  /* the board goes, and Swiftee looks ahead from its bubble. Its own scene,
     so Replay can re-enter it. */
  async function paraAside() {
    await boardAside(PARA_ASIDE, paraAside);
    await rhombusSection();
  }

  /* ---------- section 7: the rhombus ----------
   * The special parallelogram. Swiftee's aside is over: the bird drops out
   * of the frame, the board comes back blank, and a second parallelogram --
   * sky blue, so it cannot be taken for the amber one -- draws itself in the
   * middle of it. Its two diagonals draw corner to corner and the four
   * angles at their crossing are marked: the obtuse one first, as the
   * lesson is about angles, then the other three, each with its size.
   *
   * Then the learner takes over. The shape is pinned at its bottom-left
   * corner: the bottom runs to the right and the left side up a fixed slant,
   * so two lengths describe it -- a, the top and bottom, and b, the left and
   * right. The point on the top-right corner slides the top side up and
   * down the slant (changing b); the point on the bottom-right corner slides
   * the right side left and right (changing a). Everything is redrawn from a
   * and b every frame: the shape, the diagonals, the four angle marks and
   * their labels. The diagonals of a parallelogram are perpendicular exactly
   * when its sides are all equal, so the moment a and b come within a whisker
   * of each other they lock together and the arcs morph into squares, all
   * four at once, and go gold; drag away and they unlock and morph back.
   *
   * Once the learner lets go with them locked: a glow runs right round the
   * shape and leaves a tick on each side, the squares swell, the heading
   * names the shape, and Swiftee hops down to say so. Then Next. */
  const rhom       = document.getElementById('rhom');
  const rhomShape  = document.getElementById('rhomShape');
  const rhomSvg    = document.getElementById('rhomSvg');
  const rhomArt    = rhomSvg.querySelector('.art');
  const rhomLiveG  = document.getElementById('rhomLive');
  const rhomDiagG  = document.getElementById('rhomDiag');
  const rhomMarks  = document.getElementById('rhomMarks');
  const rhomEx     = document.getElementById('rhomEx');
  const rhomHands  = document.getElementById('rhomHandles');
  const rhomHint   = document.getElementById('rhomHint');
  const rhomSay    = document.getElementById('rhomSay');
  const rhomArea   = document.getElementById('rhomArea');
  const rhomLines  = document.getElementById('rhomLines');
  const rhomQuiz   = document.getElementById('rhomQuiz');
  const rhomFormula = document.getElementById('rhomFormula');
  const rhomSlots  = Array.from(rhomFormula.querySelectorAll('.fslot'));
  const rhomTray3  = document.getElementById('rhomTray3');
  const rhomChips3 = Array.from(rhomTray3.querySelectorAll('.chip'));
  const rhomPractice = document.getElementById('rhomPractice');
  const figRow     = document.getElementById('figRow');
  const practiceTray = document.getElementById('practiceTray');
  /* the halved board of page 21: the rhombus keeps the left of it and this
     panel the right */
  const rcPanel    = document.getElementById('rcPanel');
  const rcMascot   = document.getElementById('rcMascot');
  const rcText     = document.getElementById('rcText');
  const rcFormula  = document.getElementById('rcFormula');
  const rcTray     = document.getElementById('rcTray');
  const rcHintEl   = document.getElementById('rcHint');
  const rcWork     = document.getElementById('rcWork');
  const rcTxt      = rcText.querySelector('.txt');
  const rcCaret    = rcText.querySelector('.caret');
  const rhomMascot = document.getElementById('rhomMascot');
  const rhomText   = document.getElementById('rhomText');
  const rhomTxt    = rhomText.querySelector('.txt');
  const rhomCaret  = rhomText.querySelector('.caret');
  speaker(rcTxt, rcMascot);
  speaker(rhomTxt, rhomMascot);
  /* page 16's panel: Swiftee's box over the answers */
  const rpPanel  = document.getElementById('rpPanel');
  const rpMascot = document.getElementById('rpMascot');
  const rpNote   = document.getElementById('rpNote');
  const rpGhost  = rpNote.querySelector('.type-ghost');
  const rpTxt    = rpNote.querySelector('.txt');
  const rpCaret  = rpNote.querySelector('.caret');
  const rpTray   = document.getElementById('rpTray');
  speaker(rpTxt, rpMascot, () => rpNote.classList.remove('show', 'ok', 'bad'));

  const RHOM = {
    drag:  T('p14Drag'),
    sides: T('p14Equal'),
    right: T('p14Right'),
    named: T('p14Named'),
    final: TS('p14Final', { rhombus: { t: T('shapeRhombus'), w: 'rhom' } })
  };

  /* the say line's ghost holds its whole line from the first frame */
  lineSpans(rhomText.querySelector('.type-ghost'), RHOM.final);

  /* the geometry, in the svg's units: the pinned corner, the slant of the
     left side as a unit vector, the two lengths the shape opens with, how
     far each may be dragged, and how close they must come to lock */
  const RH_BL    = { x: 30, y: 262 };
  const RH_V     = (() => { const l = Math.hypot(60, 150); return { x: 60 / l, y: -150 / l }; })();
  const RH_A0    = 250, RH_B0 = 170;
  const RH_RANGE = { a: [100, 290], b: [100, 258] };
  const RH_SNAP  = 7;
  /* the angle marks: the arc's radius, the square's side (its far corner
     lands about where the arc was) and how many points draw each */
  const ARC_R = 27, SQ_S = 18, ARC_N = 12;
  /* the four angles, each named by the two corners it opens toward,
     clockwise round the crossing */
  const ANGLES = { top: ['TL', 'TR'], right: ['TR', 'BR'], bottom: ['BR', 'BL'], left: ['BL', 'TL'] };
  const ANGLE_KEYS = ['top', 'right', 'bottom', 'left'];
  const RH_ORDER = ['TL', 'TR', 'BR', 'BL'];

  /* what the shape is right now: the two lengths, how far the marks have
     morphed from arc (0) to square (1), and whether the lengths are locked.
     `pose` is null while the shape stands as drawn; the area lesson gives it
     one -- a turn about the crossing of the diagonals, a scale, and where
     the crossing is put -- and everything is drawn through it. */
  let rh = { a: RH_A0, b: RH_B0, morph: 0, snapped: false, pose: null };
  let rhomEls = null;          /* the built pieces, looked up once per build */
  let rhomLive = false;        /* the points can be dragged */
  let rhomDone = null;         /* how the activity is finished, while it is live */
  let rdrag = null;            /* { key, g, off } while a point is held */
  let hintSignal = null;       /* the hint stops when this is marked done */
  let morphGen = 0;

  const rhLerp = (p, q, t) => ({ x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t });
  const rhUnit = (p, o) => { const l = Math.hypot(p.x - o.x, p.y - o.y) || 1; return { x: (p.x - o.x) / l, y: (p.y - o.y) / l }; };
  const rhClamp = (v, r) => Math.min(r[1], Math.max(r[0], v));

  /* the four corners and the crossing of the diagonals, from a and b */
  function rhomPts() {
    const BL = RH_BL;
    const BR = { x: BL.x + rh.a, y: BL.y };
    const TL = { x: BL.x + RH_V.x * rh.b, y: BL.y + RH_V.y * rh.b };
    const TR = { x: TL.x + rh.a, y: TL.y };
    const O = { x: (TL.x + BR.x) / 2, y: (TL.y + BR.y) / 2 };
    if (!rh.pose) return { TL: TL, TR: TR, BR: BR, BL: BL, O: O };
    const q = rh.pose, c = Math.cos(q.rot), s = Math.sin(q.rot);
    const tf = p => ({
      x: q.cx + ((p.x - O.x) * c - (p.y - O.y) * s) * q.scale,
      y: q.cy + ((p.x - O.x) * s + (p.y - O.y) * c) * q.scale
    });
    return { TL: tf(TL), TR: tf(TR), BR: tf(BR), BL: tf(BL), O: { x: q.cx, y: q.cy } };
  }

  /* One angle at the crossing, as a run of points: along an arc between the
     two diagonals when morph is 0, along two sides of a small square when it
     is 1, and part way between for anything else. The same number of points
     draw both, so one becomes the other point for point. Also hands back the
     angle's size and the direction of its middle, for the label. */
  function anglePoints(P, key, morph) {
    const O = P.O;
    const d1 = rhUnit(P[ANGLES[key][0]], O), d2 = rhUnit(P[ANGLES[key][1]], O);
    const f1 = Math.atan2(d1.y, d1.x);
    let delta = Math.atan2(d2.y, d2.x) - f1;
    while (delta > Math.PI) delta -= 2 * Math.PI;
    while (delta < -Math.PI) delta += 2 * Math.PI;
    const P1 = { x: O.x + d1.x * SQ_S, y: O.y + d1.y * SQ_S };
    const P2 = { x: O.x + d2.x * SQ_S, y: O.y + d2.y * SQ_S };
    const C  = { x: O.x + (d1.x + d2.x) * SQ_S, y: O.y + (d1.y + d2.y) * SQ_S };
    const pts = [];
    for (let i = 0; i <= ARC_N; i++) {
      const t = i / ARC_N;
      const f = f1 + delta * t;
      const arc = { x: O.x + Math.cos(f) * ARC_R, y: O.y + Math.sin(f) * ARC_R };
      const sq = t < .5 ? rhLerp(P1, C, t * 2) : rhLerp(C, P2, (t - .5) * 2);
      pts.push(rhLerp(arc, sq, morph));
    }
    return {
      pts: pts,
      deg: Math.abs(delta) * 180 / Math.PI,
      bis: { x: Math.cos(f1 + delta / 2), y: Math.sin(f1 + delta / 2) }
    };
  }

  /* everything on the board that depends on a and b, redrawn */
  function renderRhom() {
    if (!rhomEls) return;
    const P = rhomPts();
    const E = rhomEls;
    E.fill.setAttribute('points', RH_ORDER.map(k => pt(P[k])).join(' '));
    E.outline.setAttribute('d', 'M' + RH_ORDER.map(k => fmt(P[k].x) + ' ' + fmt(P[k].y)).join(' L') + ' Z');
    setLine(E.liveTop, P.TL, P.TR);
    setLine(E.liveRight, P.TR, P.BR);
    setLine(E.diag1, P.BL, P.TR);
    setLine(E.diag2, P.TL, P.BR);
    ANGLE_KEYS.forEach(k => {
      const m = anglePoints(P, k, rh.morph);
      const run = m.pts.map(q => fmt(q.x) + ' ' + fmt(q.y)).join(' L');
      E.ang[k].stroke.setAttribute('d', 'M' + run);
      E.ang[k].fill.setAttribute('d', 'M' + fmt(P.O.x) + ' ' + fmt(P.O.y) + ' L' + run + ' Z');
      const L = { x: P.O.x + m.bis.x * (ARC_R + 16), y: P.O.y + m.bis.y * (ARC_R + 16) };
      E.ang[k].lbl.setAttribute('x', fmt(L.x));
      E.ang[k].lbl.setAttribute('y', fmt(L.y));
      E.ang[k].lbl.textContent = Math.round(m.deg) + '°';
    });
    E.handles.TR.setAttribute('transform', 'translate(' + fmt(P.TR.x) + ' ' + fmt(P.TR.y) + ')');
    E.handles.BR.setAttribute('transform', 'translate(' + fmt(P.BR.x) + ' ' + fmt(P.BR.y) + ')');
  }

  /* the shape and everything drawn over it, from the opening lengths -- or,
     with `keep`, from the lengths the learner left it with */
  function buildRhom(keep) {
    rh = keep ? { a: rh.a, b: rh.b, morph: rh.morph, snapped: rh.snapped, pose: null }
              : { a: RH_A0, b: RH_B0, morph: 0, snapped: false, pose: null };
    rhomLive = false;
    rhomDone = null;
    rdrag = null;
    morphGen++;

    rhomArt.innerHTML =
      '<polygon class="shape-fill" clip-path="url(#wipeRhom)" points="" />' +
      '<path class="shape-outline" d="" fill="none" stroke-width="5" />';
    rhomLiveG.innerHTML = '<line class="live-side" /><line class="live-side" />';
    rhomDiagG.innerHTML = '<line class="rhom-diag-line" /><line class="rhom-diag-line" />';
    rhomMarks.innerHTML = ANGLE_KEYS.map(k =>
      '<g class="ang ang-' + k + '" data-angle="' + k + '">' +
        '<path class="ang-fill" /><path class="ang-stroke" />' +
        '<text class="ang-lbl" font-size="12" text-anchor="middle" dominant-baseline="middle"></text>' +
      '</g>').join('');
    rhomEx.innerHTML = '';
    rhomArea.innerHTML = '';
    /* the hit circle is bigger than the dot it serves */
    rhomHands.innerHTML = ['TR', 'BR'].map(k =>
      '<g class="handle" data-h="' + k + '"><circle class="h-ring" r="11" /><circle class="h-dot" r="5.5" /><circle class="h-hit" r="26" /></g>').join('');
    rhomHint.classList.remove('on');

    const live = rhomLiveG.querySelectorAll('.live-side');
    const diag = rhomDiagG.querySelectorAll('.rhom-diag-line');
    const ang = {};
    ANGLE_KEYS.forEach(k => {
      const g = rhomMarks.querySelector('.ang-' + k);
      ang[k] = { g: g, fill: g.querySelector('.ang-fill'), stroke: g.querySelector('.ang-stroke'), lbl: g.querySelector('.ang-lbl') };
    });
    rhomEls = {
      fill: rhomArt.querySelector('.shape-fill'),
      outline: rhomArt.querySelector('.shape-outline'),
      liveTop: live[0], liveRight: live[1],
      diag1: diag[0], diag2: diag[1],
      ang: ang,
      handles: { TR: rhomHands.querySelector('[data-h="TR"]'), BR: rhomHands.querySelector('[data-h="BR"]') }
    };
    renderRhom();
    rhomShape.className = 'rhom-shape';
  }

  /* a screen position in the rhombus svg's units */
  function rhomPoint(x, y) {
    const p = rhomSvg.createSVGPoint();
    p.x = x; p.y = y;
    const m = rhomSvg.getScreenCTM();
    return m ? p.matrixTransform(m.inverse()) : p;
  }

  /* the lengths lock or unlock: the marks morph between arc and square, all
     four together, and take or lose their gold */
  function setSnapped(on) {
    if (rh.snapped === on) return;
    rh.snapped = on;
    rhomShape.classList.toggle('square', on);
    if (on) sfx('click', .5);
    const g = ++morphGen;
    const from = rh.morph, to = on ? 1 : 0;
    tween(380, e => {
      if (g !== morphGen) return;
      rh.morph = from + (to - from) * e;
      renderRhom();
    }, easeInOut);
  }

  /* one of the two lengths has been set by a drag: lock it to the other if
     it is close enough, and redraw */
  function settle(key) {
    if (Math.abs(rh.a - rh.b) < RH_SNAP) {
      if (key === 'a') rh.a = rh.b; else rh.b = rh.a;
      setSnapped(true);
    } else {
      setSnapped(false);
    }
    renderRhom();
  }

  function onHandleDown(e) {
    if (!interactive || !rhomLive || rdrag) return;
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    const g = e.currentTarget;
    const key = g.dataset.h;
    const P = rhomPts();
    const q = rhomPoint(e.clientX, e.clientY);
    /* the point is held where it was touched, not by its centre */
    rdrag = { key: key, g: g, off: { x: q.x - P[key].x, y: q.y - P[key].y } };
    g.classList.add('grab');
    /* the learner has taken hold: the hint has done its job */
    if (hintSignal) hintSignal.done = true;
    rhomHint.classList.remove('on');
    sfx('click', .4);
    window.addEventListener('pointermove', onHandleMove);
    window.addEventListener('pointerup', onHandleUp);
    window.addEventListener('pointercancel', onHandleUp);
  }

  function onHandleMove(e) {
    if (!rdrag) return;
    const q = rhomPoint(e.clientX, e.clientY);
    const x = q.x - rdrag.off.x, y = q.y - rdrag.off.y;
    if (rdrag.key === 'BR') {
      /* the right side slides left and right: the top and bottom change length */
      rh.a = rhClamp(x - RH_BL.x, RH_RANGE.a);
      settle('a');
    } else {
      /* the top side slides up and down its slant: the left and right change length */
      const P = rhomPts();
      const t = (x - P.BR.x) * RH_V.x + (y - P.BR.y) * RH_V.y;
      rh.b = rhClamp(t, RH_RANGE.b);
      settle('b');
    }
  }

  function onHandleUp() {
    if (!rdrag) return;
    window.removeEventListener('pointermove', onHandleMove);
    window.removeEventListener('pointerup', onHandleUp);
    window.removeEventListener('pointercancel', onHandleUp);
    rdrag.g.classList.remove('grab');
    rdrag = null;
    /* let go with the lengths locked: the shape is a rhombus */
    if (rh.snapped && rhomDone) rhomDone(false);
  }

  /* the hint: a finger takes hold of the right-hand point and nudges it to
     the left and back, twice, unless the learner takes hold first. Given
     `lead` -- the line Swiftee is saying -- it first shows the move once,
     faintly, as the line is said (user, 2026-09-29), and waits for a stall
     only once the line is done and the turn is the learner's. */
  async function hintRhom(signal, lead) {
    const S = 1.5;                                  /* the hand's scale */
    const at = (x, y) => rhomHint.setAttribute('transform',
      'translate(' + fmt(x - 11.5 * S) + ' ' + fmt(y - 3 * S) + ') scale(' + S + ')');
    const nudge = async () => {
      const P = rhomPts();
      const x0 = P.BR.x, y0 = P.BR.y + 4;           /* the fingertip on the point */
      at(x0, y0);
      rhomHint.classList.add('on');
      await wait(320);
      if (signal.done) return;
      await tween(1100, e => at(x0 - 48 * Math.sin(e * Math.PI), y0), easeInOut);
      await wait(200);
    };
    if (lead) {
      if (!signal.done && !fastForward) {
        rhomHint.classList.add('soft');
        await nudge();
        rhomHint.classList.remove('on');
        await wait(300);                            /* faded out before it is full again */
        rhomHint.classList.remove('soft');
      }
      await lead;
    }
    await idleFor(signal);
    for (let pass = 0; pass < 2 && !signal.done && !fastForward; pass++) await nudge();
    rhomHint.classList.remove('on');
  }

  /* The drag activity. Resolves once the learner lets go with the lengths
     locked; a skip slides the right side across itself. Registered with the
     scene's own waiters, so a replay can let go of it. */
  function awaitRhombus() {
    return waitForScene(resolve => {
      const handles = Array.from(rhomHands.querySelectorAll('.handle'));
      const finish = auto => {
        if (!rhomLive) return;
        rhomLive = false;
        rhomDone = null;
        skipFills.delete(fill);
        lockInput(true);
        if (hintSignal) hintSignal.done = true;
        rhomHint.classList.remove('on');
        handles.forEach(h => h.removeEventListener('pointerdown', onHandleDown));
        rhomShape.classList.remove('live');
        rhomShape.classList.add('done');
        sfx('correct', auto ? .55 : 1);
        if (!auto) swiftee.play('happy', 1);
        resolve();
      };
      const fill = async () => {
        if (!rhomLive) return;
        if (rdrag) onHandleUp();
        const from = rh.a, to = rh.b;
        await tween(700, e => { rh.a = from + (to - from) * e; renderRhom(); }, easeInOut);
        setSnapped(true);
        finish(true);
      };
      rhomLive = true;
      rhomDone = finish;
      skipFills.add(fill);
      handles.forEach(h => h.addEventListener('pointerdown', onHandleDown));
      lockInput(false);
    });
  }

  /* the sides are shown equal: a glow runs right round the shape from the
     pinned corner, and as it passes the middle of each side a tick lands
     there; then the outline glows as a whole and the glow fades */
  async function sweepSides() {
    const P = rhomPts();
    const order = ['BL', 'TL', 'TR', 'BR'];
    let ex = '<path class="rhom-sweep" d="M' + order.map(k => fmt(P[k].x) + ' ' + fmt(P[k].y)).join(' L') + ' Z" />';
    order.forEach((k, i) => {
      const A = P[k], B = P[order[(i + 1) % 4]];
      const u = rhUnit(B, A), n = { x: -u.y, y: u.x };
      const C = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 }, t = 10;
      const d = 'M' + fmt(C.x + n.x * t) + ' ' + fmt(C.y + n.y * t) + ' L' + fmt(C.x - n.x * t) + ' ' + fmt(C.y - n.y * t);
      ex += '<g class="eq-mark"><path class="halo" d="' + d + '" /><path class="ink" d="' + d + '" /></g>';
    });
    rhomEx.innerHTML = ex;
    const sweep = rhomEx.querySelector('.rhom-sweep');
    const ticks = Array.from(rhomEx.querySelectorAll('.eq-mark'));
    let total = 1000;
    try { total = sweep.getTotalLength() || total; } catch (e) { /* keep guard */ }
    sweep.style.strokeDasharray = total;
    sweep.style.strokeDashoffset = total;
    sweep.classList.add('on');
    let landed = 0;
    await tween(2200, e => {
      sweep.style.strokeDashoffset = total * (1 - e);
      while (landed < ticks.length && e >= (landed + .5) / ticks.length) {
        ticks[landed].classList.add('on');
        sfx('click', .3);
        landed++;
      }
    }, easeInOut);
    ticks.forEach(t => t.classList.add('on'));
    rhomShape.classList.add('equal');
    await wait(REDUCED ? 200 : 700);
    sweep.classList.remove('on');
    await wait(500);
  }

  async function rhombusSection() {
    lockInput(true);
    sceneStart(rhombusSection);
    const mine = runToken;

    /* 1. the aside ends: the bubble pops away and Swiftee drops out of the
          frame, as it did before the board first arrived */
    bubble.classList.add('out');
    bubble.classList.remove('show');
    await wait(300);
    await introExit();
    intro.classList.remove('on', 'aside');

    /* the board comes back blank: the parallelogram scenes are cleared off
       it while it is still invisible, and the heading's ghost takes the
       longest line of this scene while there is nothing on the board to move */
    board.classList.add('sec5');
    promptReserve(longest([RHOM.drag, RHOM.sides, RHOM.right, RHOM.named]));
    buildRhom();
    /* The shape keeps one size for the whole page (user, 2026-09-29): the
       foot opening under it -- first for the trays as the section came in,
       then for Swiftee's line at the end -- shrank it twice. The line's row
       is held from here, before the board is seen, and let go on the next
       page (rhombusArea). Swiftee stays at the heading for the whole page
       too, the learner's turn included, until it hops down in step 7. */
    rhomSay.classList.add('held');
    openRoomNow(rhomSay.parentElement);
    headStay = true;
    await wait(200);
    await showBoard();
    await wait(300);

    /* 2. the parallelogram: outline first, then the colour. The outline is
          about to change shape under the learner's hand, so the dash the
          reveal drew it with is lifted -- a dash sized to the old perimeter
          would open a gap in the new one. */
    rhom.classList.add('on');
    rhom.setAttribute('aria-hidden', 'false');
    await wait(120);
    await revealShape(rhomShape);
    rhomEls.outline.style.strokeDasharray = 'none';
    rhomEls.outline.style.strokeDashoffset = '0';
    await wait(500);

    /* 3. the diagonals, corner to corner; then the obtuse angle takes its
          arc, then the other three, and each is labelled with its size */
    await growLine(rhomEls.diag1, 720);
    await wait(140);
    await growLine(rhomEls.diag2, 720);
    await wait(420);
    rhomEls.ang.top.g.classList.add('show');
    sfx('click', .4);
    await wait(REDUCED ? 300 : 1000);
    for (const k of ['right', 'bottom', 'left']) {
      rhomEls.ang[k].g.classList.add('show');
      sfx('click', .3);
      await wait(180);
    }
    await wait(420);
    rhomShape.classList.add('degrees');
    await wait(REDUCED ? 300 : 900);

    /* 4. Swiftee jumps up from behind the board to the heading; the two
          sides light up with their points, and the learner is asked to
          make the angles right angles. A finger shows the first nudge. */
    rhomShape.classList.add('live');
    await wait(300);
    await mascotWithLine(RHOM.drag);   /* the bird comes up with this line */
    /* the finger shows the nudge faintly as the line is said, again in full
       if the learner then stalls, and stands down the moment they take hold
       themselves */
    hintSignal = { done: false };
    const said = heading(RHOM.drag);
    hintRhom(hintSignal, said);
    await said;
    await awaitRhombus();
    /* A replay (or Back) lets go of the wait above too, having already
       retired this run of the scene -- so a wait() from here on would take
       the fresh token as its own and carry on. The retired frame unwinds
       here instead, before it can start the celebration on the fresh scene. */
    if (mine !== runToken) throw CANCELLED;

    /* 5. a rhombus: "Well Done!", confetti, and Swiftee is proud */
    feedback(FEEDBACK.done);
    swiftee.play('proud', 1);
    skyConfetti(100, 3000);
    sfx('confetti', .7);
    await wait(2200);

    /* 6. the showcase: the rhombus settles to one size in the middle of
          the board, whichever point made it; then the sides are shown
          equal, the right angles are pointed at, and the shape is named */
    feedbackGen++;
    rhomShape.classList.add('clean');
    await wait(300);
    await poseTo(settledPose(0), 1100);
    await wait(300);
    let say = heading(RHOM.sides);
    await wait(300);
    await sweepSides();
    await say;
    await wait(700);
    say = heading(RHOM.right);
    await wait(500);
    rhomShape.classList.remove('pulse-sq');
    void rhomShape.offsetWidth;
    rhomShape.classList.add('pulse-sq');
    sfx('click', .45);
    await say;
    await wait(1100);
    await heading(RHOM.named);
    await wait(1400);

    /* 7. Swiftee hops down beside the shape and says so. The heading's line
          is cleared once the hop has handed the sprite to the flyer, not
          before: cleared first, the centred row shoved the still-standing
          bird sideways before it moved. The heading's hold on the bird
          ends here: the conversation is over and the hop takes it down. */
    headStay = false;
    feedbackGen++;
    caret.hidden = true;
    rhomSay.classList.add('show');
    const hop = hopBetween(boardMascot, rhomMascot);
    await wait(260);
    promptTxt.textContent = '';
    await hop;
    await wait(240);
    swiftee.hold('talking');
    await typeSegments(rhomTxt, rhomCaret, RHOM.final, TYPE_MS, 320, null);
    /* the bird and its line stay up beside the shape until Next is
       pressed (user, 2026-09-29); the next scene takes them down */
    cancelDismiss(rhomTxt);
    swiftee.release();
    await wait(300);
    swiftee.play('happy', 1);
    await wait(1400);

    /* 8. the activity is complete: Next */
    await showNext();
    await rhombusArea();
  }

  /* ---------- the area of the rhombus ----------
   * The same rhombus the learner made, carried on with, and worked the way
   * page 4 works the quadrilateral (user, 2026-09-29). The quiz that used to
   * come first -- which of two formulas is each half's area -- is gone: Next
   * on the rhombus's sides comes straight here. One conversation from the
   * heading, Swiftee staying up for all of it:
   *   1. Swiftee ducks behind the board from beside the shape and the shape
   *      turns about the crossing of its diagonals until the long one lies
   *      flat, growing or shrinking to one size on the way, so whatever
   *      rhombus was made the lesson is laid out the same. d1 draws along
   *      the long diagonal -- d1 alone, d2 comes at the end -- and Swiftee
   *      jumps up to the heading: "Here, is a Rhombus."
   *   2. the halves d1 cuts it into shade -- purple above, orange below --
   *      and the shape moves left for the working
   *   3. a triangle at a time, a Next after each: "Area of Triangle 1 = ½ ×
   *      base × height" is written in words; then the upper half comes
   *      forward, its border drawn heavy, and d1's name floats off the
   *      drawing onto "base" and becomes it; its height drops from the
   *      crossing and h1 floats onto "height" the same way. Then the lower
   *      half, with h2
   *   4. the third line, the rhombus as the two together, worked where it
   *      stands to ½ × d1 × d2 -- the two heights, end to end along the short
   *      diagonal, becoming it -- and then a copy of its right-hand side
   *      peels off onto a fourth row and is put into words:
   *      "= ½ × Product of Diagonals"
   *   5. the rule and the celebration; then Swiftee leaves the heading, the
   *      shape and the working come forward a little into the room it
   *      leaves, and only then Next -- page 4's close */
  const RHOM2 = {
    here:  T('p15Here'),
    whole: T('p15Whole'),
    /* a triangle at a time, each part said as it floats off the drawing
       into its line. The heights are page 4's own lines, and clips (P04-14,
       P04-17); the look lines are the parallelogram's (P10-05, P10-09) */
    tri1: {
      look: T('p10Tri1'),
      base: T('p15BaseD1'),
      h:    T('p04HeightIs', { h: 'h₁' })
    },
    tri2: {
      look: T('p10Tri2'),
      base: T('p15SameD1'),
      h:    T('p04HeightIs', { h: 'h₂' })
    },
    /* page 4's own line, and its clip (P04-10) */
    swap:  T('p04PutIn'),
    share: T('p15TakeOut'),
    join:  T('p15Together'),
    words: T('p15Product'),
    rule:  T('p15Rule')
  };
  /* every line above, for the heading's ghost */
  const RHOM2_ALL = [].concat.apply([], Object.keys(RHOM2).map(k =>
    typeof RHOM2[k] === 'string' ? [RHOM2[k]] : Object.keys(RHOM2[k]).map(j => RHOM2[k][j])));
  /* how far the page comes forward once Swiftee has gone: a little, as the
     parallelogram's does (user, 2026-09-29: a light zoom) */
  const RHOM_ZOOM = 1.1;
  const RHOM_D1 = 330;                    /* how long the long diagonal is shown, once settled */
  const RHOM_CENTRE = { x: 220, y: 148 }; /* where the crossing is put: the middle of the viewBox */

  /* the long diagonal (bottom-left to top-right) as the shape stands, before
     any pose */
  function rawDiag() {
    return { dx: rh.a + RH_V.x * rh.b, dy: RH_V.y * rh.b };
  }

  /* the pose that shows the shape at one size in the middle of the board,
     turned by `rot` */
  function settledPose(rot) {
    const d = rawDiag();
    return { rot: rot || 0, scale: RHOM_D1 / Math.hypot(d.dx, d.dy), cx: RHOM_CENTRE.x, cy: RHOM_CENTRE.y };
  }

  /* glide from the pose the shape has to another */
  async function poseTo(target, ms) {
    let from = rh.pose;
    if (!from) { const O = rhomPts().O; from = { rot: 0, scale: 1, cx: O.x, cy: O.y }; }
    await tween(ms, e => {
      rh.pose = {
        rot:   from.rot   + (target.rot   - from.rot)   * e,
        scale: from.scale + (target.scale - from.scale) * e,
        cx:    from.cx    + (target.cx    - from.cx)    * e,
        cy:    from.cy    + (target.cy    - from.cy)    * e
      };
      renderRhom();
    }, easeInOut);
  }

  /* the working: every word that names a part of the drawing is its own
     span, so it lights up -- and denotes the part it names -- as it lands.
     Triangle 1 is the upper half, in purple, and Triangle 2 the lower, in
     orange (the "green" hue draws orange, as page 4's does), so the names,
     the colours and h1 and h2 run the same way as page 4's working.
     `fly`: the part is written as a word first -- "base", "height" -- and
     then floated in, a copy of the drawing's own label for it (floatLine) */
  const RHOM_LINES = [
    [...AREA_OF(T('triangle1'), 'purple'), { t: ' = ½ × ' }, { t: 'd₁', w: 'd1', fly: 'base' }, { t: ' × ' }, { t: 'h₁', w: 'h1', fly: 'h' }],
    [...AREA_OF(T('triangle2'), 'green'),  { t: ' = ½ × ' }, { t: 'd₁', w: 'd1', fly: 'base' }, { t: ' × ' }, { t: 'h₂', w: 'h2', fly: 'h' }]
  ];
  /* and the third line, which is not four lines but one: it is typed out as
     the first of these and then changes into each of the others where it
     stands, only the words that differ crossing over. The head is shared, so
     the morph leaves "Area of Rhombus =" alone every time. The no-break
     spaces keep "= Area of" and "+ Area of" whole, as page 4's do, so the
     long first step wraps before an operator rather than leaving one
     dangling. */
  const RHOM_HEAD = [...AREA_OF(T('shapeRhombus'), 'rhom')];
  const RHOM_STEPS = [
    RHOM_HEAD.concat([...EQ_AREA_OF(T('triangle1'), 'purple', true), ...PLUS_AREA_OF(T('triangle2'), 'green', true)]),
    RHOM_HEAD.concat([{ t: ' = ½ × ' }, { t: 'd₁', w: 'd1' }, { t: ' × ' }, { t: 'h₁', w: 'h1' }, { t: ' + ½ × ' }, { t: 'd₁', w: 'd1' }, { t: ' × ' }, { t: 'h₂', w: 'h2' }]),
    RHOM_HEAD.concat([{ t: ' = ½ × ' }, { t: 'd₁', w: 'd1' }, { t: ' × (' }, { t: 'h₁', w: 'h1' }, { t: ' + ' }, { t: 'h₂', w: 'h2' }, { t: ')' }]),
    RHOM_HEAD.concat([{ t: ' = ½ × ' }, { t: 'd₁', w: 'd1' }, { t: ' × ' }, { t: 'd₂', w: 'd2' }])
  ];
  /* The rule again in words, on a fourth row (page 4's way): a copy of the
     third line's right-hand side, set under its "=" (copyLine), whose
     d1 × d2 becomes "Product of Diagonals" */
  const RHOM_WORDS = RHOM_HEAD.concat([{ t: ' = ½ × ' }, { t: T('wordProductOfDiagonals'), w: 'diags' }]);

  const areaEl = cls => rhomArea.querySelector('.' + cls);

  /* the lesson's marks come off the shape, and the halves and the
     triangles' own borders with them (buildRhomArea puts them back) */
  function clearRhomArea() {
    rhomArea.innerHTML = '';
    rhomArt.querySelectorAll('.tri-fill, .tri-outline').forEach(el => el.remove());
  }

  /* the lesson's marks, laid over the tilted shape: the diagonals with their
     names, a right angle in the upper-right corner of the crossing and one in
     the lower-right, and the two heights with theirs -- h₁ up to the top
     corner, Triangle 1's, and h₂ down to the bottom one, Triangle 2's. The
     halves of the shape go into the art, under the outline, and each
     triangle's two outer sides over it: invisible until a half is in focus,
     when they take over from the outline so one can be drawn heavy and the
     other stepped back (see .tri-outline, focusTri).
     d₁ is written OVER the left half of its own diagonal (user, 2026-09-17),
     clear of the crossing: the upright lines run through the middle of d₁,
     and a name sitting there had to be cut out of them to be read. Out to
     the left it is on empty board, so the three lines are drawn whole; above
     the diagonal rather than below it, it reads off the purple half the way
     d₂ reads off its own. */
  const D1_AT = { x: -62, y: -18 };  /* where d₁'s name sits, from the crossing */
  /* The working's names for the two halves, written in the empty corners
     beside them the way page 4 writes its own (user, 2026-09-30): "Triangle
     1" up to the left of the upper half, "Triangle 2" down to the right of
     the lower one, each with a dashed curve looping in to its colour. Each
     point is a fraction of the half-diagonals from the crossing -- d₁ lies
     flat by now, so across is along d₁ and up is along d₂ -- which puts the
     names in the corners the shape leaves empty and the arrows' tips well
     inside their halves, clear of d₁, h₁ and h₂ and their names. The
     lettering is a step up from page 4's, since this drawing's units are
     smaller on screen. */
  const RHOM_NAMES = [
    { text: T('triangle1'), at: [-.79, -.81], from: [-.655, -.68], to: [-.29, -.45] },
    { text: T('triangle2'), at: [.85, .88],   from: [.69, .77],    to: [.42, .38] }
  ];
  const RHOM_NAME_K = 1.3;
  let rhomNameStore = {};
  const rhomNames = () => rhomArea.querySelector('.tnames');
  const showRhomName = color => showTriName(color, rhomNames() || rhomArea, rhomNameStore);
  function buildRhomArea() {
    const P = rhomPts();
    const O = P.O, M = 12;
    /* the half-diagonals, for the names' places */
    const hw = Math.hypot(P.TR.x - O.x, P.TR.y - O.y), hh = Math.hypot(P.TL.x - O.x, P.TL.y - O.y);
    const at = f => ({ x: O.x + f[0] * hw, y: O.y + f[1] * hh });
    rhomNameStore = {};
    const names = triNameArt({
      names: RHOM_NAMES.map(n => ({ text: n.text, at: at(n.at), from: at(n.from), to: at(n.to), bow: 20 })),
      tris: [{ color: 'purple' }, { color: 'green' }]
    }, rhomNameStore, RHOM_NAME_K);
    const ln = (cls, a, b) => '<line class="' + cls + '" x1="' + fmt(a.x) + '" y1="' + fmt(a.y) + '" x2="' + fmt(b.x) + '" y2="' + fmt(b.y) + '" />';
    const lbl = (cls, x, y, anchor, text) => '<text class="rd-lbl ' + cls + '" x="' + fmt(x) + '" y="' + fmt(y) + '" font-size="17" text-anchor="' + anchor + '" dominant-baseline="middle">' + text + '</text>';
    rhomArea.innerHTML =
      ln('rd rd-d1', P.BL, P.TR) +
      ln('rd rd-d2', P.BR, P.TL) +
      ln('rd rd-h rd-h1', O, P.TL) +
      ln('rd rd-h rd-h2', O, P.BR) +
      '<path class="rmark mark-up" d="M' + fmt(O.x) + ' ' + fmt(O.y - M) + ' H' + fmt(O.x + M) + ' V' + fmt(O.y) + '" />' +
      '<path class="rmark mark-down" d="M' + fmt(O.x) + ' ' + fmt(O.y + M) + ' H' + fmt(O.x + M) + ' V' + fmt(O.y) + '" />' +
      lbl('lbl-d1', O.x + D1_AT.x, O.y + D1_AT.y, 'middle', 'd₁') +
      lbl('lbl-d2', O.x + 14, (O.y + P.TL.y) / 2, 'start', 'd₂') +
      lbl('lbl-h lbl-h1', O.x + 14, (O.y + P.TL.y) / 2, 'start', 'h₁') +
      lbl('lbl-h lbl-h2', O.x + 14, (O.y + P.BR.y) / 2, 'start', 'h₂') +
      '<g class="tnames">' + names + '</g>';

    const SVG_NS = 'http://www.w3.org/2000/svg';
    const outline = rhomEls.outline;
    const half = (cls, a, b, c) => {
      const el = document.createElementNS(SVG_NS, 'polygon');
      el.setAttribute('class', 'tri-fill ' + cls);
      el.setAttribute('points', pt(a) + ' ' + pt(b) + ' ' + pt(c));
      outline.parentNode.insertBefore(el, outline);
    };
    half('c-green rt-green',   P.BL, P.BR, P.TR);
    half('c-purple rt-purple', P.BL, P.TL, P.TR);
    /* each triangle's outer sides, corner to corner round the far one: the
       third side is d₁, which is drawn on its own */
    const sides = (cls, a, b, c) => {
      const el = document.createElementNS(SVG_NS, 'path');
      el.setAttribute('class', 'tri-outline ' + cls);
      el.setAttribute('d', 'M' + [a, b, c].map(p => fmt(p.x) + ' ' + fmt(p.y)).join(' L'));
      el.setAttribute('fill', 'none');
      outline.parentNode.appendChild(el);
    };
    sides('ol-purple', P.BL, P.TL, P.TR);
    sides('ol-green',  P.BL, P.BR, P.TR);
  }

  /* the diagonal, or a height, grows along its line and takes its name */
  async function drawDiag(cls, label, ms) {
    await growLine(areaEl(cls), ms || 700);
    /* `label` is optional: the numbers scene draws its diagonals bare, since
       the measurements name them there */
    if (label) areaEl(label).classList.add('on');
    sfx('click', .35);
    await wait(REDUCED ? 160 : 480);
  }

  /* the rhombus lights its lines by the same hand as the quadrilateral: the
     line and the name it carries, together */
  const denote = (part, hold) => lineDenote([areaEl('rd-' + part), areaEl('lbl-' + part)], hold);

  /* a key word of the working lands: denote what it names. The ring runs on
     its own clock -- the line carries on being read while it sweeps */
  function onRhomWord(w) {
    /* a half is named: it swells once and its name comes up beside it with
       its arrow, as page 4's do (once; the sum's line finds it there) */
    if (w === 'green' || w === 'purple') { pulseTri(rhomShape, w); showRhomName(w); return; }
    if (w === 'd1' || w === 'd2' || w === 'h1' || w === 'h2') { denote(w); return; }
    /* the product of the diagonals: both of them, lit together */
    if (w === 'diags') { lineDenote(['rd-d1', 'lbl-d1', 'rd-d2', 'lbl-d2'].map(areaEl)); return; }
    /* the whole shape: both halves swell and the outline glows */
    pulseTri(rhomShape, 'purple');
    pulseTri(rhomShape, 'green');
    rhomShape.classList.remove('lit-quad');
    void rhomShape.offsetWidth;
    rhomShape.classList.add('lit-quad');
  }

  /* the shape turns about the crossing of its diagonals until the long one
     lies flat, is brought to one size, and is put in the middle */
  async function tiltRhom() {
    const d = rawDiag();
    await poseTo(settledPose(-Math.atan2(d.dy, d.dx)), 1600);
  }

  /* a line of Swiftee's at the heading that stays up until the next one --
     the bird stays for the whole page (headStay) */
  const rhomSays = t => heading(t).then(holdHeading);

  /* The halves d₁ cuts the shape into take its colour: purple above,
     orange below, one and then the other. Once both are in, the whole
     shape's own fill under them is let go -- unseen, since the two halves
     cover it exactly -- so a half stepped back while the other is in focus
     fades onto the board, not onto the lavender. rhombusNumbers puts it
     back as the halves go. */
  async function splitRhom() {
    rhomShape.classList.add('fill-purple');
    pulseTri(rhomShape, 'purple');
    await wait(REDUCED ? 150 : 520);
    rhomShape.classList.add('fill-green');
    pulseTri(rhomShape, 'green');
    await wait(REDUCED ? 100 : 760);
    rhomEls.fill.style.opacity = '0';
  }

  /* One triangle's area, in conversation -- page 4's triangleTalk, as the
     parallelogram has it: the line is written in words while Swiftee says
     which triangle it is about; then that half comes forward, its own
     border drawn heavy and d₁ with it, while the other half steps back; and
     d₁'s name floats off the drawing onto "base" and becomes it, then the
     height drops from the crossing and its name floats onto "height", each
     as Swiftee names it. `i` is 0 for the upper half, 1 for the lower. */
  async function rhomTriangle(i) {
    const color = i ? 'green' : 'purple';
    const h = i ? 'h2' : 'h1';
    const mark = i ? 'mark-down' : 'mark-up';
    const talkLines = i ? RHOM2.tri2 : RHOM2.tri1;
    /* the last triangle's focus lets go while this one's line is written,
       so the new name and its arrow come up at full strength, not dimmed
       with the half that was stepped back; the line then brings its own
       half forward */
    focusTri(null, rhomShape);
    let talk = rhomSays(talkLines.look);
    await wait(REDUCED ? 100 : 300);
    await floatLine(RHOM_LINES[i], { base: areaEl('lbl-d1'), h: areaEl('lbl-' + h) }, {
      root: rhomLines, onWord: onRhomWord,
      beforeFly: async key => {
        await talk;
        if (key === 'base') {
          /* the line is written: now the triangle it is about comes
             forward, with a heavy border (user, 2026-09-29) */
          focusTri(color, rhomShape);
          pulseTri(rhomShape, color);
          await wait(REDUCED ? 200 : 900);
        }
        talk = rhomSays(talkLines[key]);
        if (key === 'h') {
          /* the height drops from the crossing as it is named, with its
             right angle, and it is its name that floats */
          await wait(REDUCED ? 100 : 400);
          await drawDiag('rd-' + h, 'lbl-' + h, 560);
          areaEl(mark).classList.add('on');
          await wait(REDUCED ? 60 : 200);
        } else {
          await wait(REDUCED ? 100 : 500);
        }
      }
    });
    await talk;
    await wait(REDUCED ? 200 : 700);
  }

  async function rhombusArea() {
    lockInput(true);
    sceneStart(rhombusArea);
    promptReserve(longest(RHOM2_ALL));
    /* From here to the end of the rhombus section Swiftee stays at the
       heading once it is up -- the questions, the answers and the Next
       button included -- rather than leaving after each line and jumping
       back for the next (user, 2026-09-29). Each scene sets it for itself,
       as sceneStart drops it. This page lets it go at its very end, once
       the formula is complete (page 4's close). */
    headStay = true;

    /* 1. the last scene clears: Swiftee ducks behind the board from beside
          the shape, its line goes, and the shape stands alone */
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    unzoomContent(rhom);          /* a replay comes back to the closing zoom */
    rhom.classList.remove('wide', 'numbers');
    rhomLines.textContent = '';
    rhomLines.classList.remove('off');
    /* a replay has taken the built shape away: it is built again from the
       lengths the learner left it with, already revealed */
    if (!rhomEls || !rhomArt.contains(rhomEls.outline)) {
      buildRhom(true);
      rhomEls.outline.style.strokeDasharray = 'none';
      rhomEls.outline.style.strokeDashoffset = '0';
      rhomEls.diag1.style.opacity = 1;
      rhomEls.diag2.style.opacity = 1;
      rhomShape.classList.add('square', 'done', 'clean');
      ANGLE_KEYS.forEach(k => rhomEls.ang[k].g.classList.add('show'));
      rh.pose = settledPose(0);
    } else {
      clearRhomArea();
    }
    rhomEls.fill.style.opacity = 1;
    renderRhom();
    if (rhomMascot.classList.contains('in')) await mascotJumpOut(rhomMascot);
    /* The heading's room is held for the rest of the page from here, as
       page 4's is: the row under the shape that held Swiftee's line lets
       go as the heading's opens, so the shape changes size this once, while
       the board is still, and keeps it -- through every line from the
       heading, Swiftee leaving it at the end, and the zoom into the room it
       leaves. rhombusNumbers lets go once the bird is back up. The foot is
       eased shut in the same frame the heading starts to open, rather than
       a beat later (ROOM_CLOSE_DELAY), so the two moves are one. */
    rhomSay.classList.remove('show', 'held');
    board.classList.add('head-held');
    setRoom(rhomSay.parentElement, 0);
    await wait(500);

    /* 2. the tilt: the marks of the last scene fade as the shape turns */
    rhomShape.classList.add('tilt');
    rhomEls.diag1.style.opacity = '';
    rhomEls.diag2.style.opacity = '';
    await wait(200);
    await tiltRhom();
    await wait(400);

    /* 3. d1 along the flat diagonal, and only d1 (user, 2026-09-29): d2 is
          not drawn yet -- it first appears at the end of the working, where
          the two heights join up into it; Swiftee jumps up and names the
          shape */
    buildRhomArea();
    await drawDiag('rd-d1', 'lbl-d1', 760);
    await wait(REDUCED ? 200 : 700);
    await rhomSays(RHOM2.here);
    await wait(REDUCED ? 300 : 900);

    /* 4. the whole of it is what is wanted: as Swiftee says so, the two
          halves d1 cuts the shape into take their colours */
    let talk = rhomSays(RHOM2.whole);
    await wait(REDUCED ? 250 : 960);
    await splitRhom();
    await talk;
    await wait(REDUCED ? 100 : 400);

    /* 5. the shape moves to the left, and the working follows on the right */
    await layoutWide(rhom, rhomSvg);
    await wait(REDUCED ? 100 : 300);

    /* 6. one triangle at a time, in conversation, with a Next after each */
    await rhomTriangle(0);
    await showNext();
    await rhomTriangle(1);
    await showNext();

    /* 7. the two together: the sum, worked and then put into words */
    await rhomSum();
    await rhombusNumbers();
  }

  /* ---- the two halves together, and the rule it becomes ----
     Page 4's workSum, on the rhombus. The third line is written as the sum
     of the two above it and then carries on being worked where it stands,
     one step at a time, Swiftee saying what is being done and the part on
     the drawing each step is about pointed at:

       Area of Rhombus = Area of Triangle 1 + Area of Triangle 2
                       = ½ × d₁ × h₁ + ½ × d₁ × h₂
                       = ½ × d₁ × (h₁ + h₂)
                       = ½ × d₁ × d₂

     and at the last step the two heights, which already lie end to end
     along the short diagonal, become it: one ring holds them together while
     the dashed halves give way to d₂ drawn solid. Then a copy of that
     line's right-hand side peels off onto the row below and is put into
     words -- "= ½ × Product of Diagonals" -- the rule, the celebration, and
     page 4's close. */
  async function rhomSum() {
    /* the sum is about both halves: neither is held back for it, and the
       triangles' heavy borders give way to the whole outline again */
    focusTri(null, rhomShape);
    await wait(REDUCED ? 160 : 420);
    const sum = await showTypedLine(RHOM_STEPS[0], rhomLines, onRhomWord);
    const txt = sum.querySelector('.txt');
    await wait(REDUCED ? 300 : 1300);

    /* each triangle's area put in: the line comes forward a step for as
       long as it is being worked on, settled at its new size before
       anything in it moves, since a morph measures the width it eases to */
    await rhomSays(RHOM2.swap);
    await wait(REDUCED ? 200 : 500);
    sum.classList.add('solving');
    await wait(REDUCED ? 100 : 620);
    await denote('h1', 340);
    await denote('h2', 340);
    await morphTo(txt, RHOM_STEPS[1], false, true);
    await wait(REDUCED ? 300 : 1400);

    /* ½ × d₁, in both, taken out */
    await rhomSays(RHOM2.share);
    await denote('d1', 700);
    await morphTo(txt, RHOM_STEPS[2], false, true);
    await wait(REDUCED ? 300 : 1400);

    /* and the two heights become the short diagonal */
    await rhomSays(RHOM2.join);
    await wait(REDUCED ? 150 : 400);
    await joinHeights();
    await morphTo(txt, RHOM_STEPS[3], false, true);
    await wait(REDUCED ? 300 : 1100);

    /* worked out: the line settles back to the size of the two above it.
       It has been carrying the break its FIRST step needed -- "= Area of
       Triangle 1 + Area of Triangle 2" did not fit its column, so the "="
       dropped to a second row -- and it is far shorter now: the ghost is
       re-cut to what the line says and re-fitted, so the break goes and it
       closes up onto one row (.rule holds it there), before the copy below
       measures where its "=" is */
    sum.classList.remove('solving');
    await wait(REDUCED ? 100 : 620);
    lineSpans(sum.querySelector('.type-ghost'), RHOM_STEPS[3]);
    fitEq(sum);
    sum.classList.add('rule');
    await wait(REDUCED ? 100 : 500);

    /* the fourth line: the copy comes off the third, and d₁ × d₂ becomes
       its name as Swiftee says it */
    const words = rhsOf(RHOM_WORDS);
    const rule = await copyLine(sum, rhsOf(RHOM_STEPS[3]), words, rhomLines);
    const ruleTxt = rule.querySelector('.txt');
    await wait(REDUCED ? 200 : 500);
    const named = (async () => {
      await wait(REDUCED ? 100 : 900);
      onRhomWord('diags');
      await morphTo(ruleTxt, words, false, true);
    })();
    await rhomSays(RHOM2.words);
    await named;
    await wait(REDUCED ? 200 : 700);

    /* the rule the whole section was built for */
    await heading(RHOM2.rule);
    await wait(REDUCED ? 150 : 350);
    feedback(FEEDBACK.done);
    onRhomWord('rhom');
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
    await wait(REDUCED ? 400 : 1800);

    /* the formula is complete: Swiftee and its line leave the heading, and
       the shape and the working come forward a little into the room it
       leaves -- held open, so nothing slides up as the bird goes -- and only
       then the Next button (page 4's close, user 2026-09-29) */
    headStay = false;
    feedbackGen++;
    caret.hidden = true;
    if (boardMascot.classList.contains('in')) {
      await mascotJumpOut(boardMascot, () => { promptTxt.textContent = ''; });
    } else promptTxt.textContent = '';
    await wait(REDUCED ? 60 : 220);
    zoomContent(rhom, [drawnRect(rhomSvg)].concat(
      Array.from(rhomLines.querySelectorAll('.area-line')).map(lineBox)), RHOM_ZOOM);
    await wait(REDUCED ? 300 : 900 + 1500);
    await showNext();
  }

  /* h₁ and h₂ already lie end to end along the short diagonal, so nothing
     has to be moved to join them: the two are lit together and held lit,
     and while they are the two dashed halves give way to the whole diagonal
     drawn solid, their two names gathering into its one. */
  async function joinHeights() {
    const h1 = areaEl('rd-h1'), h2 = areaEl('rd-h2');
    const l1 = areaEl('lbl-h1'), l2 = areaEl('lbl-h2');
    const d2 = areaEl('rd-d2'), ld2 = areaEl('lbl-d2');
    const lit = [h1, h2, l1, l2];
    const mine = String(++denoteSeq);
    lit.forEach(el => { el.dataset.seq = mine; el.classList.add('denote'); });
    await wait(REDUCED ? 140 : 900);

    /* held together, the two become one. h₁ is already written where d₂'s
       name goes, up the top half; h₂'s travels up to it */
    const dy = (+ld2.getAttribute('y')) - (+l2.getAttribute('y'));
    d2.style.opacity = 1;
    h1.style.opacity = '';
    h2.style.opacity = '';
    sfx('click', .35);
    /* the two names fade out well before h₂'s finishes its travel, so they
       are never both sitting on the same spot */
    await tween(700, e => {
      const gone = Math.max(0, 1 - e * 2.1);
      l2.style.transform = 'translateY(' + fmt(dy * e) + 'px)';
      l1.style.opacity = gone;
      l2.style.opacity = gone;
    }, easeInOut);
    [l1, l2].forEach(el => {
      el.classList.remove('on');
      el.style.transform = '';
      el.style.opacity = '';
    });
    ld2.classList.add('on');
    areaEl('mark-up').classList.add('on');
    /* the light passes to the diagonal the pair has become */
    lit.forEach(el => el.classList.remove('denote'));
    [d2, ld2].forEach(el => { el.dataset.seq = mine; el.classList.add('denote'); });
    await wait(REDUCED ? 140 : 700);
    [d2, ld2].forEach(el => { if (el.dataset.seq === mine) el.classList.remove('denote'); });
    await wait(REDUCED ? 60 : 420);
  }

  /* The tilted rhombus with d1 drawn along it, put back if a replay has
     taken it away. Returns true when it had to be rebuilt, so the scene can
     add whatever else it had on the shape at its hand-off. */
  function ensureTilted() {
    if (rhomEls && rhomArt.contains(rhomEls.outline) && rhomArea.firstChild) return false;
    if (!rhomEls || !rhomArt.contains(rhomEls.outline)) {
      buildRhom(true);
      rhomEls.fill.style.opacity = 1;
      rhomEls.outline.style.strokeDasharray = 'none';
      rhomEls.outline.style.strokeDashoffset = '0';
    }
    const d = rawDiag();
    rh.pose = settledPose(-Math.atan2(d.dy, d.dx));
    renderRhom();
    rhomShape.classList.add('tilt', 'done', 'clean');
    buildRhomArea();
    areaEl('rd-d1').style.opacity = 1;
    areaEl('lbl-d1').classList.add('on');
    return true;
  }

  /* ---------- the numbers ----------
   * The working leaves and the shape comes back to the middle, plain again
   * with both diagonals and the right angle between them. Swiftee asks for
   * the two lengths to be dragged into the formula; the diagonals are
   * measured off the shape -- a two-headed arrow under d1 reading 16 cm, one
   * up the right of d2 reading 12 cm -- and the formula appears under the
   * shape with two empty slots and four lengths to choose from. Either
   * length may go in either slot; a wrong one is shaken off. Both in, the
   * answer is said in the heading, and Next. */
  const NUM = {
    drag:  T('p17Drag'),
    /* the verdict on each drop is said in a sentence in the heading (user,
       2026-09-29): a wrong length is told where a right one is written --
       the one still missing, once the other is in -- and the first right
       one is named and the other asked for. Either diagonal may go in
       either slot (user, 2026-09-30): d₁ × d₂ is d₂ × d₁. */
    wrong:  T('p17WrongBoth'),
    wrong1: T('p17WrongD1'),
    right1: T('p17RightD1'),
    wrong2: T('p17WrongD2'),
    right2: T('p17RightD2'),
    /* the working the learner has just built IS the answer; saying it again
       at the top would also give away the question the next page asks */
    right: T('fbCorrectBang')
  };
  const NUM_D1 = CM(16), NUM_D2 = CM(12);
  const NUM_NEED = ['16', '12'];

  const dimEl = cls => rhomArea.querySelector('.' + cls);

  /* the two measurements, laid over the settled shape: for each, a dotted
     line out from each end of the diagonal, a two-headed arrow between them
     and the length written on it */
  function buildRhomDims() {
    const P = rhomPts();
    const H = 6;                 /* the arrowheads, a size down (user, 2026-09-29) */
    const ln = (cls, a, b, dash) => '<line class="' + cls + '" x1="' + fmt(a.x) + '" y1="' + fmt(a.y) + '" x2="' + fmt(b.x) + '" y2="' + fmt(b.y) + '"' + dashAttr(dash) + ' />';
    /* an arrowhead at `tip`, pointing along (dx, dy) */
    const head = (tip, dx, dy) => {
      const nx = -dy, ny = dx;
      return '<path class="d-head" d="M' + fmt(tip.x - dx * H + nx * H * .65) + ' ' + fmt(tip.y - dy * H + ny * H * .65) +
             ' L' + fmt(tip.x) + ' ' + fmt(tip.y) +
             ' L' + fmt(tip.x - dx * H - nx * H * .65) + ' ' + fmt(tip.y - dy * H - ny * H * .65) + '" />';
    };
    /* d1: under the shape */
    const y = P.BR.y + 16;
    const A = { x: P.BL.x, y: y }, B = { x: P.TR.x, y: y };
    let g = '<g class="d-group d-d1">' +
      ln('d-ext', P.BL, A) + ln('d-ext', P.TR, B) +
      ln('d-arrow', A, B, arrowDash(A, B, NUM_D1, 19)) + head(A, -1, 0) + head(B, 1, 0) +
      '<text class="d-label" x="' + fmt((A.x + B.x) / 2) + '" y="' + fmt(y) + '" font-size="19" text-anchor="middle" dominant-baseline="middle">' + NUM_D1 + '</text>' +
    '</g>';
    /* d2: up the right of the shape, its length written along the arrow */
    const x = P.TR.x + 24;
    const C = { x: x, y: P.TL.y }, D = { x: x, y: P.BR.y };
    const my = (C.y + D.y) / 2;
    g += '<g class="d-group d-d2">' +
      ln('d-ext', P.TL, C) + ln('d-ext', P.BR, D) +
      ln('d-arrow', C, D, arrowDash(C, D, NUM_D2, 19)) + head(C, 0, -1) + head(D, 0, 1) +
      '<text class="d-label" x="' + fmt(x) + '" y="' + fmt(my) + '" font-size="19" text-anchor="middle" dominant-baseline="middle" ' +
        'transform="rotate(-90 ' + fmt(x) + ' ' + fmt(my) + ')">' + NUM_D2 + '</text>' +
    '</g>';
    rhomArea.insertAdjacentHTML('beforeend', g);
  }

  /* a measurement comes on: the dotted lines run out from the corners, the
     arrow grows between them, and the heads and the length appear */
  async function showDim(cls) { await showDimGroup(dimEl(cls)); }
  async function showDimGroup(g) {
    const ext = Array.from(g.querySelectorAll('.d-ext'));
    await Promise.all(ext.map(l => growLine(l, 380)));
    ext.forEach(l => { l.style.opacity = .7; });
    await growLine(g.querySelector('.d-arrow'), 720);
    g.classList.add('on');
    sfx('click', .35);
    await wait(REDUCED ? 160 : 520);
  }

  /* the lengths back in the tray and both slots empty and open: the state
     the page starts in */
  function resetLenSlots() {
    rhomTray3.classList.remove('off');
    rhomChips3.forEach(c => {
      rhomTray3.appendChild(c);
      c.disabled = false;
      c.classList.remove('picked', 'dragging', 'reject');
    });
    rhomSlots.forEach(s => {
      s.classList.remove('filled', 'over', 'correct', 'reject', 'locked');
      s.removeAttribute('aria-disabled');
    });
  }

  /* The drag. Its own small plumbing, on the warm-up's pattern: a copy of
     the chip follows the pointer, the slot under it lights, and a release
     over a slot is judged. A chip may also be tapped and then a slot tapped.
     Either slot takes either diagonal (user, 2026-09-30): the product is the
     same whichever way round, so 12 cm may go first and 16 cm second. Any
     other length is shaken off and stays in the tray, and each drop is
     answered in a sentence in the heading. A skip docks the two itself; a
     replay takes the listeners off. */
  function dragLengths() {
    return waitForScene(resolve => {
      let ldrag = null, lpicked = null, over = false;
      const filled = () => rhomSlots.filter(s => s.classList.contains('filled'));
      const open   = s => !s.classList.contains('filled');
      /* the right lengths not yet in a slot */
      const missing = () => NUM_NEED.filter(v => !filled().some(s => {
        const c = s.querySelector('.chip');
        return c && c.dataset.len === v;
      }));
      const slotAt = (x, y) => rhomSlots.find(s => {
        const r = s.getBoundingClientRect();
        return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
      }) || null;
      const clearOver = () => rhomSlots.forEach(s => s.classList.remove('over'));
      const unpick = () => { if (lpicked) lpicked.classList.remove('picked'); lpicked = null; };
      /* Swiftee's sentence on a drop: not awaited, the chip is already on
         its way back or settling, and the next drop simply retypes over it
         (feedbackGen) */
      const say = text => { heading(text).catch(() => {}); };

      const dockLen = (chip, slot, earned) => {
        slot.appendChild(chip);
        slot.classList.add('filled');
        chip.classList.remove('picked', 'dragging');
        chip.disabled = true;
        markRight(slot);
        setTimeout(() => slot.classList.remove('correct'), 520);
        rhomShape.classList.add(chip.dataset.len === '16' ? 'lit-d1' : 'lit-d2');
        sfx('correct', earned ? 1 : .55);
        if (earned) {
          swiftee.play('happy', 1);
          sfx('confetti', .55);
          requestAnimationFrame(() => burst(chip));
        }
      };

      const tryPlace = (chip, slot) => {
        if (!slot || slot.classList.contains('filled')) return;
        const left = missing();
        /* either diagonal, in either slot; anything else goes home, with a
           pointer to where a right length is written -- the one still
           missing once the other is in */
        if (left.indexOf(chip.dataset.len) < 0) {
          sfx('wrong');
          swiftee.play('confused', 1);
          markWrong(slot);
          markWrong(chip);
          setTimeout(() => { slot.classList.remove('reject'); chip.classList.remove('reject'); }, 430);
          say(left.length > 1 ? NUM.wrong : (left[0] === NUM_NEED[0] ? NUM.wrong1 : NUM.wrong2));
          return;
        }
        dockLen(chip, slot, true);
        if (filled().length === rhomSlots.length) { finish(false); return; }
        say(chip.dataset.len === NUM_NEED[0] ? NUM.right1 : NUM.right2);
      };

      const onDownL = e => {
        if (!interactive || over) return;
        const chip = e.currentTarget;
        if (chip.disabled) return;
        if (e.button !== undefined && e.button !== 0) return;
        ldrag = liftGhost(chip, e);
        chip.classList.add('dragging');
        unpick();
        sfx('click', .5);
        window.addEventListener('pointermove', onMoveL);
        window.addEventListener('pointerup', onUpL);
        window.addEventListener('pointercancel', onUpL);
        e.preventDefault();
      };
      const onMoveL = e => {
        if (!ldrag) return;
        moveGhost(ldrag, e.clientX, e.clientY);
        clearOver();
        const slot = slotAt(e.clientX, e.clientY);
        if (slot && open(slot)) slot.classList.add('over');
      };
      const onUpL = e => {
        if (!ldrag) return;
        window.removeEventListener('pointermove', onMoveL);
        window.removeEventListener('pointerup', onUpL);
        window.removeEventListener('pointercancel', onUpL);
        const d = ldrag;
        ldrag = null;
        clearOver();
        const slot = slotAt(e.clientX, e.clientY);
        dropGhost(d, slot, function () {
          d.el.classList.remove('dragging');
          if (slot) return tryPlace(d.el, slot);
          /* a tap, not a drag: the chip waits for a slot to be tapped */
          if (Math.hypot(e.clientX - d.start.x, e.clientY - d.start.y) < 6) {
            lpicked = d.el;
            d.el.classList.add('picked');
          }
        });
      };
      const onSlotTap = e => {
        if (!interactive || !lpicked) return;
        const chip = lpicked;
        unpick();
        tryPlace(chip, e.currentTarget);
      };

      const cleanup = () => {
        rhomChips3.forEach(c => c.removeEventListener('pointerdown', onDownL));
        rhomSlots.forEach(s => s.removeEventListener('click', onSlotTap));
        window.removeEventListener('pointermove', onMoveL);
        window.removeEventListener('pointerup', onUpL);
        window.removeEventListener('pointercancel', onUpL);
        if (ldrag) { ldrag.ghost.remove(); ldrag.el.classList.remove('dragging'); ldrag = null; }
        clearOver();
        unpick();
        skipFills.delete(fill);
        sceneWaiters.delete(teardown);
      };
      const finish = auto => {
        if (over) return;
        over = true;
        cleanup();
        lockInput(true);
        resolve();
      };
      /* a skip: the right lengths still in the tray go into the slots still
         empty by themselves, in the order the formula reads */
      const fill = () => {
        if (over) return;
        const left = missing();
        rhomSlots.filter(open).forEach(slot => {
          const v = left.shift();
          const chip = v && rhomChips3.find(c => c.dataset.len === v && !c.disabled);
          if (chip) dockLen(chip, slot, false);
        });
        finish(true);
      };
      /* a replay retires the scene while the drag is open */
      const teardown = () => { over = true; cleanup(); };

      rhomChips3.forEach(c => c.addEventListener('pointerdown', onDownL));
      rhomSlots.forEach(s => s.addEventListener('click', onSlotTap));
      sceneWaiters.add(teardown);
      skipFills.add(fill);
      lockInput(false);
    });
  }

  async function rhombusNumbers() {
    lockInput(true);
    sceneStart(rhombusNumbers);
    headStay = true;             /* Swiftee stays at the heading: see rhombusArea */
    const mine = runToken;
    promptReserve(longest([NUM.drag, NUM.wrong, NUM.wrong1, NUM.right1, NUM.wrong2, NUM.right2, NUM.right]));
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;

    /* a replay comes back to a bare shape, and to lengths still sitting in
       the slots they were dropped in: the shape is put back, the lengths
       go home, and the slots are emptied and locked in order again */
    const rebuilt = ensureTilted();
    resetLenSlots();
    /* a Back from page 16 finds the bird down in that page's panel: up to
       the heading first, then the panel goes */
    if (rpMascot.classList.contains('in')) {
      await hopBetween(rpMascot, boardMascot);
      await wait(REDUCED ? 60 : 240);
    }
    rhom.classList.remove('ask');
    rpClear();
    rhomArea.querySelectorAll('.d-group').forEach(g => g.remove());

    /* 1. the working leaves, and the area page's closing zoom with it -- the
          zoom class first and its origin only once the scale is back to 1,
          as the parallelogram's is let go (mendPara); the shape keeps the
          left two fifths and the right three fifths are cleared for the
          formula */
    rhomLines.classList.add('off');
    await wait(450);
    if (rhom.classList.contains('zoomed')) {
      zoomOut(rhom);
      await wait(REDUCED ? 100 : 900);
    }
    unzoomContent(rhom);
    rhom.classList.add('numbers');
    await layoutWide(rhom, rhomSvg, true);
    rhomLines.textContent = '';
    rhomLines.classList.remove('off');

    /* 2. the halves and their heights leave, and d₁'s and d₂'s names go with
          them (user, 2026-09-18): this page measures the diagonals, and the
          two lengths that arrive in a moment name them better than the
          letters do -- the letters are left to the pages that reason about
          them. d2 comes back, so the shape stands plain with both diagonals
          and the right angle between them. The whole shape's own fill,
          let go under the halves on the area page (splitRhom), is put back
          first -- unseen under them -- so the colour stays as they go. */
    rhomEls.fill.style.opacity = 1;
    focusTri(null, rhomShape);
    rhomShape.classList.remove('fill-green', 'fill-purple', 'lit-d1', 'lit-d2', 'lit-quad');
    /* the halves' names go with them, and for good: the pages after this
       carry on with the same drawing */
    const names = rhomNames();
    if (names) names.classList.add('gone');
    ['rd-h1', 'rd-h2'].forEach(c => { areaEl(c).style.opacity = ''; });
    ['lbl-h1', 'lbl-h2', 'lbl-d1', 'lbl-d2', 'mark-down'].forEach(c => areaEl(c).classList.remove('on'));
    await wait(600);
    if (names) names.remove();
    /* the rule scene hands d2 over already drawn -- the two heights became
       it -- so it is only redrawn when it is not there to begin with */
    if (rebuilt || +areaEl('rd-d2').style.opacity === 1) {
      areaEl('rd-d2').style.opacity = 1;
    } else {
      await drawDiag('rd-d2', null, 620);
    }
    areaEl('mark-up').classList.add('on');
    await wait(400);

    /* 3. Swiftee asks. The area page left the heading's room held open,
          empty, for its zoom; with the bird back up in it, the hold is let
          go -- the row stays open for as long as Swiftee stands there, so
          nothing moves. */
    await heading(NUM.drag);
    board.classList.remove('head-held');
    await wait(300);

    /* 4. the diagonals are measured */
    buildRhomDims();
    await showDim('d-d1');
    await showDim('d-d2');
    await wait(200);

    /* 5. the formula, then the lengths, then the drag */
    rhomQuiz.classList.add('show');
    await wait(200);
    rhomFormula.classList.add('show');
    sfx('click', .3);
    await wait(REDUCED ? 160 : 520);
    await dealChips(rhomChips3);
    await dragLengths();
    if (mine !== runToken) throw CANCELLED;

    /* 6. both lengths are in: the lengths left over go (user, 2026-09-30),
          then the answer, and on */
    rhomTray3.classList.add('off');
    feedback(FEEDBACK.done);
    onRhomWord('rhom');
    await wait(900);
    await heading(NUM.right);
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
    await wait(2400);
    await showNext();
    await rhombusPractice1();
  }

  /* ---------- practice ----------
   * Four questions, a Next between each. The first is asked of the measured
   * rhombus itself. For the rest the rhombus fades and figures built for
   * the question draw themselves in its place. Answers are chips under the
   * shape, as before, except for the third, which halves the board and asks
   * from a panel of its own beside the figure. */
  const PRACTICE = {
    area:     T('p18Choose'),
    areaOk:   T('fbCorrectBang'),
    find:     T('p19FindFull'),
    findOk:   T('p19Right'),
    which:    T('p21Which'),
    whichOk:  T('p21Right')
  };
  const PRACTICE_GHOST = [PRACTICE.area, PRACTICE.areaOk, PRACTICE.find, PRACTICE.findOk, PRACTICE.which, PRACTICE.whichOk];

  /* ---- page 16: the area of the measured rhombus ----
   * Asked from the box beside the bird, page 4's way (user, 2026-09-30),
   * and every answer is met with a sentence in the same box: a wrong area
   * is told what it is instead -- the product without the half, or the sum
   * -- and the right one is worked out in a line. */
  const RP = {
    ask:   T('p18Choose'),
    opts:  [{ v: '96', t: SQCM(96) }, { v: '192', t: SQCM(192) }, { v: '28', t: SQCM(28) }],
    right: '96',
    notes: {
      '192': T('p18Wrong192'),
      '28':  T('p18Wrong28'),
      '96':  T('p18Right')
    }
  };
  /* the box fits the piece it is saying, and is fitted before the bird is
     brought up, for the reason quizSay gives. The ghost is set the way the
     live line is (setTxt): a "½" in it is drawn as a stacked fraction, and
     a ghost holding the plain glyph measured narrower than the line and
     wrapped it. */
  const rpFit = text => { setTxt(rpGhost, text); snug(rpGhost); };
  async function rpSay(text, tone) {
    rpFit(firstPiece(text));
    await speakerUp(rpTxt);
    feedbackGen++;
    rpNote.classList.remove('ok', 'bad');
    if (tone) rpNote.classList.add(tone);
    rpCaret.hidden = true;
    swiftee.hold('talking');
    const said = sayPieces(rpTxt, text, piece => rpFit(piece));
    rpNote.classList.add('show');
    await said;
    swiftee.release();
  }
  /* the panel as another scene must find it: empty and unpainted */
  function rpClear() {
    rpPanel.classList.remove('show', 'off', 'done');
    rpNote.classList.remove('show', 'ok', 'bad');
    rpTxt.textContent = '';
    rpGhost.textContent = '';
    rpCaret.hidden = true;
    rpTray.innerHTML = '';
  }
  /* the answers come up one at a time, each with its own click */
  async function dealOneByOne(chips) {
    for (const chip of chips) {
      chip.classList.add('reveal');
      sfx('click', .25);
      await wait(REDUCED ? 80 : 420);
    }
  }

  /* the answers to a question: chips built fresh each time */
  function practiceChips(list, tray) {
    tray = tray || practiceTray;
    tray.classList.remove('off');
    tray.innerHTML = list.map(c =>
      '<button class="chip' + (c.formula ? ' formula' : '') + '" type="button" data-answer="' + c.v + '"><span>' + fracHTML(c.t) + '</span></button>').join('');
    return Array.from(tray.querySelectorAll('.chip'));
  }

  /* ---- the figures ----
   * Each is its own little shape, in a 360 x 260 box: a fill behind a wipe,
   * an outline that draws itself, and the lesson's marks over it. */
  const FIG_W = 360, FIG_H = 260;
  const figLine = (cls, a, b, dash) => '<line class="' + cls + '" x1="' + fmt(a.x) + '" y1="' + fmt(a.y) + '" x2="' + fmt(b.x) + '" y2="' + fmt(b.y) + '"' + dashAttr(dash) + ' />';
  const figHead = (tip, dx, dy, H) => {
    H = H || 9;
    const nx = -dy, ny = dx;
    return '<path class="d-head" d="M' + fmt(tip.x - dx * H + nx * H * .65) + ' ' + fmt(tip.y - dy * H + ny * H * .65) +
           ' L' + fmt(tip.x) + ' ' + fmt(tip.y) +
           ' L' + fmt(tip.x - dx * H - nx * H * .65) + ' ' + fmt(tip.y - dy * H - ny * H * .65) + '" />';
  };
  /* a two-headed arrow between a and b with its length written on it;
     `ext` are the corners it measures from */
  function figMeasure(cls, a, b, label, ext, rotate, size) {
    const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    const u = rhUnit(b, a);
    const font = (size && size.font) || 17, head = (size && size.head) || 9;
    return '<g class="d-group ' + cls + '">' +
      ext.map(e => figLine('d-ext', e.from, e.to)).join('') +
      figLine('d-arrow', a, b, arrowDash(a, b, label, font)) + figHead(a, -u.x, -u.y, head) + figHead(b, u.x, u.y, head) +
      '<text class="d-label" x="' + fmt(mid.x) + '" y="' + fmt(mid.y) + '" font-size="' + font + '" text-anchor="middle" dominant-baseline="middle"' +
        (rotate ? ' transform="rotate(-90 ' + fmt(mid.x) + ' ' + fmt(mid.y) + ')"' : '') + '>' + label + '</text>' +
    '</g>';
  }
  function figShell(key, name, art, over, h, w) {
    h = h || FIG_H;
    w = w || FIG_W;
    return '<div class="fig" data-fig="' + key + '" tabindex="-1">' +
      '<div class="fig-art"><svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
        '<defs><clipPath id="wipeFig' + key + '"><rect class="wipe" x="0" y="0" width="' + w + '" height="' + h + '" /></clipPath></defs>' +
        '<g class="art">' + art + '</g>' +
        '<g class="fig-over" style="--pair: var(--heading)">' + over + '</g>' +
      '</svg></div>' +
      (name ? '<button class="chip formula fig-chip" type="button" tabindex="-1" data-answer="' + key + '"><span>' + name + '</span></button>' : '') +
      '<div class="fig-work"><span class="type-wrap"><span class="type-ghost"></span>' +
        '<span class="type"><span class="txt"></span><i class="caret" hidden aria-hidden="true"></i></span></span></div>' +
    '</div>';
  }

  const figEl = (key, row) => (row || figRow).querySelector('.fig[data-fig="' + key + '"]');

  /* ---- the practice figures, in page 16's own scale (user, 2026-09-30) ----
   * Every figure asked about on pages 17 to 19 is drawn in the same
   * 440-wide box the measured rhombus of page 16 has (its viewBox), with
   * its lengths written at the same size (19) and its arrowheads the same
   * (6), so the four pages read as one set: an outline, a diagonal, a
   * length line or a label is the same weight on every one of them. The
   * second diagonal's length stands up the RIGHT of the shape, as page
   * 16's does. */
  const PF_W = 440, PF_H = 250, PF = { font: 19, head: 6 };
  function pFigRhombus(key, d1, d2, labD1, labD2, unknown) {
    /* the drawing is centred in its box, the length up the right side
       counted: without one the rhombus itself stands in the middle */
    const cx = (labD2 && !unknown) ? 200 : 220, cy = 118;
    const L = { x: cx - d1 / 2, y: cy }, R = { x: cx + d1 / 2, y: cy };
    const T = { x: cx, y: cy - d2 / 2 }, B = { x: cx, y: cy + d2 / 2 };
    const O = { x: cx, y: cy }, M = 12;
    const art =
      '<polygon class="shape-fill" clip-path="url(#wipeFig' + key + ')" points="' + [L, T, R, B].map(pt).join(' ') + '" />' +
      '<path class="shape-outline" d="M' + [L, T, R, B].map(p => fmt(p.x) + ' ' + fmt(p.y)).join(' L') + ' Z" fill="none" stroke-width="5" />';
    let over =
      figLine('rd rd-d1', L, R) +
      figLine('rd rd-d2' + (unknown ? ' dashed' : ''), T, B) +
      '<path class="rmark mark-up" d="M' + fmt(O.x) + ' ' + fmt(O.y - M) + ' H' + fmt(O.x + M) + ' V' + fmt(O.y) + '" />';
    if (unknown) {
      over += '<text class="rd-lbl lbl-d2 lbl-q" x="' + fmt(cx + 14) + '" y="' + fmt(cy - d2 / 4) + '" font-size="26" text-anchor="start" dominant-baseline="middle">?</text>';
    }
    const y = B.y + 16;
    over += figMeasure('d-d1', { x: L.x, y: y }, { x: R.x, y: y }, labD1,
      [{ from: L, to: { x: L.x, y: y } }, { from: R, to: { x: R.x, y: y } }], false, PF);
    if (labD2 && !unknown) {
      const x = R.x + 24;
      over += figMeasure('d-d2', { x: x, y: T.y }, { x: x, y: B.y }, labD2,
        [{ from: T, to: { x: x, y: T.y } }, { from: B, to: { x: x, y: B.y } }], true, PF);
    }
    return figShell(key, '', art, over, PF_H, PF_W);
  }
  /* the slanted shape with four equal sides, given by its base and its
     height only: a base of 214 and a height of 128 (10 : 6), the slant
     chosen so the side comes out the length of the base */
  function pFigSlant(key) {
    const BL = { x: 28, y: 200 }, BR = { x: 242, y: 200 }, TL = { x: 199, y: 72 }, TR = { x: 413, y: 72 };
    const F = { x: TL.x, y: BL.y };
    const art =
      '<polygon class="shape-fill" clip-path="url(#wipeFig' + key + ')" points="' + [BL, TL, TR, BR].map(pt).join(' ') + '" />' +
      '<path class="shape-outline" d="M' + [BL, TL, TR, BR].map(p => fmt(p.x) + ' ' + fmt(p.y)).join(' L') + ' Z" fill="none" stroke-width="5" />';
    let over = '';
    [[BL, TL], [TL, TR], [TR, BR], [BR, BL]].forEach(([a, b]) => {
      const u = rhUnit(b, a), n = { x: -u.y, y: u.x }, C = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, t = 11;
      const d = 'M' + fmt(C.x + n.x * t) + ' ' + fmt(C.y + n.y * t) + ' L' + fmt(C.x - n.x * t) + ' ' + fmt(C.y - n.y * t);
      over += '<g class="eq-mark"><path class="halo" d="' + d + '" /><path class="ink" d="' + d + '" /></g>';
    });
    const M = 12, hv = rhUnit(F, TL);
    over += '<g class="d-group d-hgt">' +
      figLine('d-height', TL, F) + figHead(TL, -hv.x, -hv.y, PF.head) + figHead(F, hv.x, hv.y, PF.head) +
      '<path class="d-mark" d="M' + fmt(F.x) + ' ' + fmt(F.y - M) + ' H' + fmt(F.x + M) + ' V' + fmt(F.y) + '" />' +
      '<text class="d-label" x="' + fmt(F.x + 10) + '" y="' + fmt((TL.y + F.y) / 2) + '" font-size="' + PF.font + '" text-anchor="start" dominant-baseline="middle">' + CM(6) + '</text>' +
    '</g>';
    const y = BL.y + 20;
    over += figMeasure('d-d1', { x: BL.x, y: y }, { x: BR.x, y: y }, CM(10),
      [{ from: BL, to: { x: BL.x, y: y } }, { from: BR, to: { x: BR.x, y: y } }], false, PF);
    return figShell(key, '', art, over, PF_H, PF_W);
  }

  /* the marks a practice figure takes once it is drawn, at page 16's pace:
     the diagonals one after the other, the right angle between them, the
     "?" on a diagonal that is asked for, a height, the equal-side ticks,
     and each length on its own arrow, its line pulsing once as the number
     lands */
  async function pMarks(f) {
    const d1 = f.querySelector('.rd-d1'), d2 = f.querySelector('.rd-d2');
    if (d1) { await growLine(d1, REDUCED ? 120 : 900); await wait(REDUCED ? 100 : 420); }
    if (d2) { await growLine(d2, REDUCED ? 120 : 760); await wait(REDUCED ? 100 : 320); }
    const mark = f.querySelector('.rmark');
    if (mark) { mark.classList.add('on'); sfx('click', .35); await wait(REDUCED ? 120 : 620); }
    const q = f.querySelector('.lbl-q');
    if (q) { q.classList.add('on'); sfx('click', .35); await wait(REDUCED ? 120 : 520); }
    const hgt = f.querySelector('.d-hgt');
    if (hgt) {
      await growLine(hgt.querySelector('.d-height'), REDUCED ? 120 : 760);
      hgt.classList.add('on');
      sfx('click', .35);
      await wait(REDUCED ? 120 : 620);
    }
    f.querySelectorAll('.eq-mark').forEach(m => m.classList.add('on'));
    for (const g of Array.from(f.querySelectorAll('.d-group:not(.d-hgt)'))) {
      await showDimGroup(g);
      const cls = g.classList.contains('d-d1') ? 'd1' : g.classList.contains('d-d2') ? 'd2' : null;
      if (cls && f.querySelector('.rd-' + cls)) rcFlash(f, cls);
      await wait(REDUCED ? 140 : 820);
    }
  }

  /* ---- leaving a practice page (user, 2026-09-30) ----
   * Next: the answers and the box fade, the shape goes, and the bird jumps
   * back behind the board, so the next question opens on a blank board
   * with nothing on it to move as its layout is set. A replay of any of
   * them lands here too, whatever the last run left standing. */
  async function practiceLeave() {
    rpPanel.classList.add('done');          /* the answers fade */
    rpNote.classList.remove('show');        /* the box shuts */
    rhomShape.classList.add('away');        /* page 16's rhombus */
    const cleared = clearFigures();         /* a practice figure */
    const spot = [rpMascot, rcMascot, boardMascot].find(m => m.classList.contains('in'));
    await wait(REDUCED ? 80 : 260);
    const ducking = spot ? mascotJumpOut(spot) : Promise.resolve();
    await wait(REDUCED ? 60 : 200);
    rpPanel.classList.add('off');
    await cleared;
    await ducking;
    /* the board is blank: the layout can change with nothing on it to move */
    rpClear();
    rcClear();
    practiceTray.classList.add('off');
    rhomPractice.classList.remove('on');
    board.classList.remove('head-held');
    rhom.classList.remove('wide', 'cfu', 'ask', 'numbers');
    rhomLines.textContent = '';
    await wait(REDUCED ? 100 : 320);
  }

  /* ---- one practice question, page 16's way (user, 2026-09-30) ----
   *   1. the last page leaves (practiceLeave)
   *   2. the figure draws itself in the middle of the empty board, slowly,
   *      and takes its marks -- nothing to read but the shape
   *   3. it glides to the left half; the panel is painted on the right,
   *      empty, with the answers built and the box fitted, so the bird's
   *      spot is laid out before it arrives
   *   4. Swiftee comes up from behind the board into the panel and asks
   *      from its box, and the answers come up one by one
   *   5. a wrong answer is met with a sentence in red in the box, the
   *      right one in green with the working, and confetti; then Next
   */
  async function practiceAsk(entry, q) {
    const mine = practiceOpen(entry);
    await practiceLeave();

    /* 2. the figure, drawn slowly on an empty board */
    figRow.innerHTML = q.fig;
    fitFigArt(figRow);
    figRow.classList.remove('off', 'stepped', 'working');
    figRow.classList.add('single');
    const f = figEl(q.key);
    f.classList.add('p-fig');
    /* a line of what is given, over the shape: in the column from the first
       frame, unseen, so its arrival moves nothing */
    if (q.fact) {
      f.insertAdjacentHTML('afterbegin', '<p class="fig-fact"><span class="type-wrap"><span class="type-ghost"></span>' +
        '<span class="type"><span class="txt"></span><i class="caret" hidden aria-hidden="true"></i></span></span></p>');
      wordSpans(f.querySelector('.fig-fact .type-ghost'), q.fact);
    }
    rhomPractice.classList.add('on');
    await wait(REDUCED ? 120 : 420);
    await revealShape(f, REDUCED ? 120 : 1500, REDUCED ? 80 : 820);
    await wait(REDUCED ? 120 : 560);
    await pMarks(f);
    /* what is given is written over the shape, a word at a time */
    const fact = q.fact ? f.querySelector('.fig-fact') : null;
    if (fact) {
      fact.classList.add('show');
      sfx('click', .3);
      await wait(REDUCED ? 120 : 380);
      await typer(fact.querySelector('.txt'), fact.querySelector('.caret'), TYPE_MS)(q.fact);
      await wait(REDUCED ? 200 : 900);
    }
    await wait(REDUCED ? 100 : 420);

    /* 3. the board halves: the figure keeps the left and the panel takes
          the right, painted empty first */
    rhom.classList.add('ask');
    const chips = practiceChips(q.opts, rpTray);
    rpFit(firstPiece(q.ask));
    rpPanel.classList.add('show');
    askRooms();
    /* the shape glides (layoutWide moves its svg); the line over it is
       carried along by the same move, measured the same way, so the two
       travel as one */
    const fb = fact && fact.getBoundingClientRect();
    const glide = layoutWide(rhom, f.querySelector('svg'), true);
    if (fact && !REDUCED && fb.width) {
      const fa = fact.getBoundingClientRect();
      const dx = (fb.left + fb.width / 2) - (fa.left + fa.width / 2), dy = fb.top - fa.top;
      if (dx || dy) fact.animate(
        [{ transform: 'translate(' + dx + 'px, ' + dy + 'px)' }, { transform: 'none' }],
        { duration: 900, easing: 'cubic-bezier(.45, 0, .15, 1)' });
    }
    await glide;
    await wait(REDUCED ? 120 : 620);

    /* 4. Swiftee comes up into the panel and asks; the answers follow one
          by one */
    holdBird();                            /* the bird stays beside its box until Next */
    await mascotJumpIn(rpMascot);
    await wait(REDUCED ? 100 : 260);
    await rpSay(q.ask);
    await wait(REDUCED ? 100 : 320);
    await dealOneByOne(chips);
    await wait(REDUCED ? 80 : 200);

    /* 5. the verdicts, in the box */
    await askChips(chips, q.right, chip => { rpSay(q.notes[chip.dataset.answer] || q.notes[q.wrongDefault], 'bad').catch(() => {}); });
    if (mine !== runToken) throw CANCELLED;
    if (q.onRight) await q.onRight(f);
    await rpSay(q.notes[q.right], 'ok');
    if (mine !== runToken) throw CANCELLED;
    swiftee.play('proud', 1);
    skyConfetti(90, 2800);
    sfx('confetti', .7);
    await wait(REDUCED ? 300 : 1800);
    await showNext();
  }

  /* the figures are put up in place of the rhombus and draw themselves,
     one a beat after the other; then each takes its marks */
  /* Each figure is drawn in a 360-wide box that is taller than some of them
     need. The box is the drawing's room, and with the drawing standing at the
     top of its room (--art-gap in style.css) an unused band inside the viewBox
     would open under the heading just as a centred drawing used to. So the
     viewBox is fitted once, as the figures go up, to what the svg actually
     holds -- the marks that are shown later are already in the DOM, hidden, so
     they are measured too. The width, and with it the scale every figure in
     the row shares, is left exactly as built. */
  function fitFigArt(row) {
    row.querySelectorAll('.fig-art > svg').forEach(svg => {
      const vb = (svg.getAttribute('viewBox') || '').split(' ').filter(Boolean).map(Number);
      if (vb.length !== 4) return;
      let bb;
      try { bb = svg.getBBox(); } catch (e) { return; }
      if (!bb || !bb.height) return;
      const M = 7;                                  /* a hair, for the strokes */
      const top = Math.max(vb[1], Math.floor(bb.y - M));
      const bot = Math.min(vb[1] + vb[3], Math.ceil(bb.y + bb.height + M));
      if (bot - top >= vb[3] || bot - top < 40) return;
      svg.setAttribute('viewBox', vb[0] + ' ' + top + ' ' + vb[2] + ' ' + (bot - top));
    });
  }


  /* the old figures leave */
  async function clearFigures(row) {
    row = row || figRow;
    if (!row.children.length) return;
    row.classList.add('off');
    await wait(450);
    row.innerHTML = '';
    row.classList.remove('stepped', 'working');
  }



  /* a line of working that solves itself, put up where the typed lines go:
     the ghost holds the first step, the widest, so the box never moves */
  const asSegs = step => (typeof step === 'string' ? [{ t: step }] : step);
  async function showSolveLine(root, steps, onWord, ghost) {
    const line = document.createElement('div');
    line.className = 'area-line';
    line.innerHTML = '<span class="type-wrap"><span class="type-ghost"></span>' +
      '<span class="type"><span class="txt"></span><i class="caret" aria-hidden="true"></i></span></span>';
    /* the ghost holds the first step, which is normally the widest; a
       working that GROWS as it solves says which step to size it for */
    lineSpans(line.querySelector('.type-ghost'), asSegs(ghost || steps[0]));
    (root || areaLinesEl).appendChild(line);
    fitEq(line);
    await showLine(line, root);
    await solveLine(line.querySelector('.txt'), steps, AREA_MS, onWord);
    return line;
  }




  /* the measured rhombus, put back if a replay has taken it away: tilted,
     both diagonals, the right angle, and the two lengths on it */
  function ensureMeasured() {
    const rebuilt = ensureTilted();
    if (rebuilt) {
      areaEl('rd-d2').style.opacity = 1;
      ['lbl-d2', 'mark-up'].forEach(c => areaEl(c).classList.add('on'));
    }
    if (!rhomArea.querySelector('.d-group')) {
      buildRhomDims();
      rhomArea.querySelectorAll('.d-group').forEach(g => {
        g.querySelectorAll('.d-ext').forEach(l => { l.style.opacity = .7; });
        g.querySelector('.d-arrow').style.opacity = 1;
        g.classList.add('on');
      });
    }
    return rebuilt;
  }

  /* the common opening of a practice question: the heading clears, and
     whatever the question before left is tidied. The halved board's panel
     is emptied but its layout class is left alone -- the question that
     halved the board may still have the bird standing in it, and dropping
     the class here would snap the board back under its feet. */
  function practiceOpen(again) {
    lockInput(true);
    sceneStart(again);
    headStay = true;             /* Swiftee stays at the heading: see rhombusArea */
    promptReserve(longest(PRACTICE_GHOST));
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    rhom.classList.remove('numbers');
    rhomQuiz.classList.remove('show');
    resetLenSlots();
    rcClear();
    return runToken;
  }

  /* ---------- page 21: the area of one rhombus ----------
   * The figure and the question never share a half of the board. The
   * rhombus draws itself in the middle, takes its diagonals and then its
   * two lengths, and only when all of that is standing does the board halve
   * and the panel arrive on the right with Swiftee, the formula and the
   * four answers. Nothing that could be read as the answer is on the board
   * until the learner has given one. */
  const RC = {
    ask:  T('p20Ask'),
    opts: [{ v: '180', t: SQCM(180) }, { v: '360', t: SQCM(360) },
           { v: '90', t: SQCM(90) }, { v: '39', t: SQCM(39) }],
    right: '180',
    /* the halving first, then the multiplying: the two steps the formula is,
       in the order it is read in */
    work: T('p20Work'),
    /* the first miss puts the formula up -- in words, not in letters -- and
       the second the lengths it wants, pointed at on the figure as well.
       Neither is the arithmetic: a nudge that worked it out would answer
       the question. */
    hint: T('p20Hint')
  };
  function rcHint(text) { showHint(rcHintEl, text); }

  /* the panel as a scene that is not this one must find it: empty,
     unpainted, and holding nothing that could size a row it is out of */
  function rcClear() {
    rcPanel.classList.remove('show');
    rcFormula.classList.remove('show');
    rcTray.innerHTML = '';
    rcTray.classList.add('off');
    rcTxt.textContent = '';
    rcCaret.hidden = true;
    rcWork.textContent = '';
    rcWork.classList.remove('win');
    rcHintEl.textContent = '';
    rcHintEl.classList.remove('show');
  }


  /* a diagonal pulses once as its length lands beside it */
  function rcFlash(f, cls) {
    const lines = Array.from(f.querySelectorAll('.rd-' + cls));
    lines.forEach(l => l.classList.remove('flash'));
    void f.offsetWidth;                     /* a reflow, so the run restarts */
    lines.forEach(l => l.classList.add('flash'));
  }
  /* a diagonal and the measurement beside it light up, and stay lit */
  function rcLight(f, cls, on) {
    f.querySelectorAll('.rd-' + cls).forEach(l => l.classList.toggle('lit', on !== false));
    f.querySelectorAll('.d-' + cls).forEach(g => g.classList.toggle('lit', on !== false));
  }

  /* 1. the area of the measured rhombus */
  async function rhombusPractice1() {
    const mine = practiceOpen(rhombusPractice1);
    rhom.classList.remove('cfu');
    rhomPractice.classList.remove('on');
    figRow.innerHTML = '';                 /* a Back from page 17 leaves its figure */
    rhomShape.classList.remove('away', 'lit-d1', 'lit-d2', 'lit-quad');
    ensureMeasured();
    /* a replay lands with the bird down in the panel from the last run: it
       goes back up to the heading first, so the panel is not pulled out
       from under its feet, and the panel is emptied */
    if (rpMascot.classList.contains('in')) {
      await hopBetween(rpMascot, boardMascot);
      await wait(REDUCED ? 60 : 240);
    }
    rhom.classList.remove('ask');
    rpClear();
    await wait(460);

    /* 1. the shape keeps the left half it had for the numbers (user,
          2026-09-30); a way in from anywhere else glides it there. The
          panel is painted first, empty, so the bird's spot is laid out
          before it arrives. */
    if (!rhom.classList.contains('wide')) {
      await layoutWide(rhom, rhomSvg, true);
    }
    rhom.classList.add('ask');
    /* The heading's room is held open while the bird leaves it for the
       panel, so the spot it is jumping to stays put under it; it is let go
       once the bird has landed (below), and the fold is what carries the
       section up to the middle of the board (user, 2026-09-30). */
    board.classList.add('head-held');
    /* the answers are built now, unrevealed, so the tray holds its room
       under the bird from the first frame: dealt into an empty tray they
       opened it under a bird that had already landed and shoved it up
       (user, 2026-09-30) */
    const chips = practiceChips(RP.opts, rpTray);
    /* ...and the box is fitted to the question before the panel is shown,
       for the same reason: the foot's room is measured from the panel as
       it comes on (fitRooms), and a box with nothing in it yet measured a
       row short, which the chips' arrival then opened under the bird */
    rpFit(firstPiece(RP.ask));
    rpPanel.classList.add('show');
    askRooms();
    /* the foot opens to the panel's height over half a second (setRoom):
       the bird waits for it, so it lands in a room that has stopped moving */
    await wait(620);

    /* 2. Swiftee hops down from the heading into the right half and asks
          from its box, which is already its size */
    holdBird();                            /* the bird stays beside its box until Next */
    await hopBetween(boardMascot, rpMascot);
    /* landed: the heading's room, empty now, is let go, and the row folds
       over half a second -- the shape, the panel and the bird glide up
       together to the middle of the board, and the question waits for
       them to settle (user, 2026-09-30) */
    board.classList.remove('head-held');
    await wait(REDUCED ? 240 : 980);
    await rpSay(RP.ask);
    await wait(REDUCED ? 100 : 320);

    /* 3. the three areas come up one by one under the box */
    await dealOneByOne(chips);
    await wait(REDUCED ? 80 : 200);

    /* 4. a wrong area is answered in red in the box, with what that number
          is instead; the right one in green, with the working */
    await askChips(chips, RP.right, chip => { rpSay(RP.notes[chip.dataset.answer] || RP.notes['192'], 'bad').catch(() => {}); });
    if (mine !== runToken) throw CANCELLED;
    onRhomWord('rhom');
    await rpSay(RP.notes[RP.right], 'ok');
    if (mine !== runToken) throw CANCELLED;
    swiftee.play('proud', 1);
    skyConfetti(90, 2800);
    sfx('confetti', .7);
    await wait(REDUCED ? 300 : 1800);
    await showNext();
    await rhombusPractice2();
  }

  /* 2. a rhombus of 240 sq. cm with one diagonal known: find the other.
        A wrong length is told what area it would give; the right one turns
        the dashed diagonal solid and writes its length on it. */
  const P2 = {
    key:  'a',
    fig:  pFigRhombus('a', 300, 180, CM(30), '', true),
    /* what is given is written over the shape (user, 2026-09-30), and the
       box asks only for what is wanted */
    fact: T('p19Fact'),
    ask:  T('p19Find'),
    opts: [{ v: '8', t: CM(8) }, { v: '16', t: CM(16) }, { v: '32', t: CM(32) }],
    right: '16', wrongDefault: '8',
    notes: {
      '8':  T('p19Wrong8'),
      '32': T('p19Wrong32'),
      '16': PRACTICE.findOk
    },
    onRight: async f => {
      f.querySelector('.rd-d2').classList.remove('dashed');
      f.querySelector('.lbl-q').textContent = CM(16);
      rcLight(f, 'd2');
      sfx('click', .35);
      await wait(REDUCED ? 100 : 420);
    }
  };
  async function rhombusPractice2() {
    await practiceAsk(rhombusPractice2, P2);
    await rhombusPractice3();
  }

  /* 3. one rhombus, measured on the board: what is its area? A wrong
        area is told what it is instead -- the product without the half,
        the half taken twice, or the sum -- and the right one lights both
        diagonals before the shape takes its glow. */
  const P3 = {
    key:  'q',
    fig:  pFigRhombus('q', 300, 190, CM(24), CM(15)),
    ask:  RC.ask,
    /* three answers (user, 2026-09-30): the right one, the product without
       the half, and the sum */
    opts: [{ v: '180', t: SQCM(180) }, { v: '360', t: SQCM(360) }, { v: '39', t: SQCM(39) }],
    right: '180', wrongDefault: '360',
    notes: {
      '360': T('p20Wrong360'),
      '39':  T('p20Wrong39'),
      '180': T('p20Right')
    },
    onRight: async f => {
      rcLight(f, 'd1');
      await wait(REDUCED ? 140 : 560);
      rcLight(f, 'd2');
      await wait(REDUCED ? 140 : 560);
      f.classList.add('win');
      sfx('correct', .5);
    }
  };
  async function rhombusPractice3() {
    await practiceAsk(rhombusPractice3, P3);
    await rhombusPractice4();
  }

  /* 4. a shape with a base and a height, and no diagonal in sight: which
        formula? */
  const P4 = {
    key:  's',
    fig:  pFigSlant('s'),
    ask:  PRACTICE.which,
    opts: [{ v: 'diag', t: T('formulaHalfProductDiagonals'), formula: true }, { v: 'bh', t: T('formulaBaseHeight'), formula: true }],
    right: 'bh', wrongDefault: 'diag',
    notes: {
      'diag': T('p21WrongDiag'),
      'bh':   PRACTICE.whichOk
    }
  };
  async function rhombusPractice4() {
    await practiceAsk(rhombusPractice4, P4);
    await rhombusAside();
  }

  /* the board goes, and Swiftee looks ahead from its bubble. Its own scene,
     so Replay can re-enter it. */
  const RHOM_ASIDE = [
    T('p22Found'),
    T('p22Ready'),
    T('p22Another')
  ];
  async function rhombusAside() {
    /* the bird is down in page 19's panel: it goes behind the board from
       there, since the aside only knows to send it from the heading */
    if (rpMascot.classList.contains('in')) {
      await mascotJumpOut(rpMascot);
      await wait(REDUCED ? 60 : 200);
    }
    await boardAside(RHOM_ASIDE, rhombusAside);
    await trapSection();
  }

  /* ---------- section 8: the trapezium ----------
   * The third special quadrilateral, in two levels.
   *
   * Level 1. Swiftee's aside is over: the bird drops out of the frame, the
   * board comes back blank and a trapezium draws itself in the middle of it,
   * then glides to the left half. Swiftee jumps up into the right half and
   * asks "What shape is this?" from its box; three names fade up under it
   * -- Kite, Parallelogram, Trapezium -- one to tap, page 4's way (user,
   * 2026-09-29). Each choice is answered in the same box, red for a wrong
   * name with what that shape has instead, green for the right one, and
   * either way the shape takes its "parallel" marks, so the answer can be
   * checked against the shape itself. The bird stays beside its verdict
   * until Next.
   *
   * Level 2. The sentence goes and Swiftee ducks behind the board; the
   * trapezium fades and six cards take its place, three of them trapeziums
   * (isosceles, scalene and right-angled) and three not. Swiftee jumps up to
   * the heading, says "Select all the trapeziums.", and ducks back down,
   * taking the line with it. Each tap is answered at once: a trapezium
   * locks green with confetti out of the card, anything else shakes red and
   * steps back for good. All three found: confetti and Next. Then the other three leave, the trapeziums glide
   * into one row and each takes a slot under it; the three names appear
   * below, and Swiftee jumps up to say "Drag each block to the matching
   * shape." -- the warm-up's line, with the warm-up's voice-over. Each name
   * is dragged (or tapped, then its slot tapped) onto its shape. */
  const trap       = document.getElementById('trap');
  const trapShape  = document.getElementById('trapShape');
  const trapSvg    = document.getElementById('trapSvg');
  const trapArt    = trapSvg.querySelector('.art');
  const trapMarksG = document.getElementById('trapMarks');
  const trapCards  = document.getElementById('trapCards');
  const cardGrid   = document.getElementById('cardGrid');
  const trapQuiz   = document.getElementById('trapQuiz');
  const trapNames  = Array.from(document.querySelectorAll('#trapNames .chip'));
  const trapNote   = document.getElementById('trapNote');
  const trapNoteTxt   = trapNote.querySelector('.txt');
  const trapNoteCaret = trapNote.querySelector('.caret');
  const trapMascot = document.getElementById('trapMascot');
  const trapTray   = document.getElementById('trapTray');
  const trapChips  = Array.from(trapTray.querySelectorAll('.chip'));

  const TRAP = {
    ask:    T('p04WhatShape'),
    answer: 'trapezium',
    notes: {
      kite:          T('p23Kite'),
      parallelogram: T('p23Para'),
      trapezium:     T('p23Right')
    },
    select: T('p24Select'),
    /* all three found: said from the heading before Next (user, 2026-09-30) */
    found:  T('p24Found'),
    /* why a wrong card is wrong: said, never typed, while the card is out
       in the middle with its pairs marked (user, 2026-10-01) */
    noPair: T('p24NoParallel'),
    match:  T('p24DragNames')
  };
  const TRAP_GHOST = [TRAP.select, TRAP.found, TRAP.match, FEEDBACK.done];

  /* ---- Swiftee's box ----
   * The question and every verdict are spoken from the box beside the bird,
   * page 4's way (quizSay): the box is fitted to the piece it is saying, the
   * words come all at once, green for the right name and red for a wrong
   * one -- and nothing takes the bird down between them. */
  const trapGhost = trapNote.querySelector('.type-ghost');
  speaker(trapNoteTxt, trapMascot, () => trapNote.classList.remove('show', 'ok', 'bad'));
  async function trapQuizSay(text, tone) {
    /* fitted before the bird is brought up, for the reason quizSay gives:
       sized after the jump, the box shoves a bird that has already landed */
    fitTo(trapGhost, firstPiece(text));
    await speakerUp(trapNoteTxt);
    feedbackGen++;
    trapNote.classList.remove('ok', 'bad');
    if (tone) trapNote.classList.add(tone);
    trapNoteCaret.hidden = true;
    swiftee.hold('talking');
    const said = sayPieces(trapNoteTxt, text, piece => fitTo(trapGhost, piece));
    trapNote.classList.add('show');
    await said;
    swiftee.release();
  }

  /* the trapezium's corners, clockwise from the top left, in the svg's units */
  const TRAP_PTS = [{ x: 62, y: 8 }, { x: 358, y: 8 }, { x: 412, y: 252 }, { x: 8, y: 252 }];

  /* the "parallel" mark: two chevrons astride the middle of a side, pointing
     the way the side runs, with a halo so they read over the outline */
  function parMark(a, b, single) {
    const u = rhUnit(b, a), n = { x: -u.y, y: u.x };
    const M = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    const s = 8;
    let d = '';
    /* `single`: one chevron per side rather than two -- a pair of sides
       matched by one mark each, which is all the values scene is saying */
    (single ? [0] : [-6, 6]).forEach(off => {
      const C = { x: M.x + u.x * off, y: M.y + u.y * off };
      d += 'M' + fmt(C.x - u.x * s + n.x * s) + ' ' + fmt(C.y - u.y * s + n.y * s) +
           ' L' + fmt(C.x) + ' ' + fmt(C.y) +
           ' L' + fmt(C.x - u.x * s - n.x * s) + ' ' + fmt(C.y - u.y * s - n.y * s);
    });
    return '<g class="par-mark"><path class="halo" d="' + d + '" /><path class="ink" d="' + d + '" /></g>';
  }

  function buildTrap() {
    const P = TRAP_PTS;
    trapArt.innerHTML =
      '<polygon class="shape-fill" clip-path="url(#wipeTrap)" points="' + P.map(pt).join(' ') + '" />' +
      '<path class="shape-outline" d="M' + P.map(p => fmt(p.x) + ' ' + fmt(p.y)).join(' L') + ' Z" fill="none" stroke-width="5" />';
    /* the marks, and under them the two parallel sides themselves, traced
       over the outline when the right name is given (trapLight) */
    trapMarksG.innerHTML = parMark(P[0], P[1]) + parMark(P[3], P[2]) +
      figLine('par-side', P[0], P[1]) + figLine('par-side', P[3], P[2]);
    trapShape.classList.remove('marked', 'away', 'lit');
  }

  /* the right name (user, 2026-09-30): the parallel pair is shown on the
     shape itself -- each side traced in the marks' own blue, top then
     bottom -- and the outline glows green round both */
  async function trapLight() {
    trapShape.classList.add('lit');
    for (const side of Array.from(trapMarksG.querySelectorAll('.par-side'))) {
      await growLine(side, REDUCED ? 100 : 720);
      sfx('click', .3);
      await wait(REDUCED ? 60 : 240);
    }
  }

  /* the quiz is over, by an answer or by a replay: the box shuts, the names
     go back to untouched, and the bird -- if it is still standing beside the
     box -- is put back behind the board for the scene to bring up again */
  function resetTrapSay() {
    feedbackGen++;
    trapNote.classList.remove('show', 'ok', 'bad');
    trapNoteTxt.textContent = '';
    trapNoteCaret.hidden = true;
    trapMascot.classList.remove('in', 'dropping');
    trapNames.forEach(c => {
      c.classList.remove('reveal', 'correct', 'reject', 'spent');
      c.disabled = false;
    });
  }

  /* the names go home between scenes: a replay may find them docked in a
     card that the teardown has just taken away */
  function homeTrapChips() {
    trapChips.forEach(c => { trapTray.appendChild(c); c.disabled = false; });
  }

  /* Swiftee says a line from its place by the heading. This is heading()
     under another name now that the typewriter carries the voice itself; it
     is kept because the scene reads better for it. */
  async function voiced(text) {
    await heading(text);
  }

  /* ---- level 1: name the shape ---- */
  async function trapSection() {
    lockInput(true);
    sceneStart(trapSection);
    const mine = runToken;
    homeTrapChips();
    /* the bird is behind the board for the whole of level 1 (it jumps in
       beside the sentence, not the heading), and the drop-down is empty: a
       Back into this scene may find both otherwise */
    boardMascot.classList.remove('in');
    resetTrapSay();
    holdBird();                            /* the bird stays beside its box until Next */

    /* 1. the aside ends: the bubble pops away and Swiftee drops out of the
          frame, as it did before the board first arrived */
    bubble.classList.add('out');
    bubble.classList.remove('show');
    await wait(300);
    await introExit();
    intro.classList.remove('on', 'aside');

    /* the board comes back blank: the rhombus scenes are cleared off it
       while it is still invisible, and the heading's ghost takes the longest
       line of these scenes while there is nothing on the board to move */
    board.classList.add('sec6');
    promptReserve(longest(TRAP_GHOST));
    buildTrap();
    await wait(200);
    await showBoard();
    await wait(300);

    /* 2. the trapezium: outline first, then the colour, drawn full width
          in the middle */
    trap.classList.add('on');
    trap.setAttribute('aria-hidden', 'false');
    await wait(120);
    await revealShape(trapShape);
    await wait(380);

    /* 2b. it glides over to the left half, opening the right half for the
           name quiz */
    await layoutWide(trap, trapSvg, true);
    await wait(300);

    /* 3. Swiftee comes up from behind the board into the right half and
          asks what the shape is first; the three names then fade up under
          it, one to tap (page 4's way, user, 2026-09-29). The names are
          inert until dealt -- askChips is what takes their taps. */
    trapNote.classList.remove('show', 'ok', 'bad');
    trapQuiz.classList.remove('off', 'done');
    trapQuiz.classList.add('show');
    await wait(REDUCED ? 200 : 440);
    await mascotJumpIn(trapMascot);
    await wait(REDUCED ? 100 : 260);
    await trapQuizSay(TRAP.ask);
    await wait(REDUCED ? 100 : 320);
    await dealChips(trapNames);
    /* the shape takes its parallel marks on the first answer, whichever it
       is, so the answer can be checked against the shape itself */
    const mark = () => {
      if (trapShape.classList.contains('marked')) return;
      trapShape.classList.add('marked');
      sfx('click', .35);
    };
    /* a wrong name is turned down in the box, in red, with what that shape
       has instead; the right one is confirmed in green */
    await askChips(trapNames, TRAP.answer, chip => {
      mark();
      trapQuizSay(TRAP.notes[chip.dataset.answer] || TRAP.notes.parallelogram, 'bad');
    });
    /* a replay lets go of the wait above too, having already retired this
       run of the scene: unwind here rather than carry on into the fresh one */
    if (mine !== runToken) throw CANCELLED;
    mark();
    /* the right name: the parallel sides light up along the shape as the
       verdict is given (user, 2026-09-30) */
    const lit = trapLight().catch(() => {});
    await trapQuizSay(TRAP.notes[TRAP.answer], 'ok');
    await lit;
    if (mine !== runToken) throw CANCELLED;
    /* the verdict stays up, and the bird with it, until Next: nothing pops
       away the moment it has been said (user, 2026-09-29) */
    await wait(REDUCED ? 300 : 1200);

    /* 4. named: Next */
    await showNext();
    await trapSelect();
  }

  /* ---- the cards ----
   * Each is a rounded card with one shape outlined on it, in a 320 x 200
   * box; the shapes are drawn in a 200 x 130 space and set in the middle.
   * `trap` says whether the shape is a trapezium -- exactly one pair of
   * parallel sides -- and the three that are not have none. */
  const CARDS = {
    iso:     { trap: true,  pts: '50,25 150,25 175,105 25,105' },
    q1:      { trap: false, pts: '30,20 110,45 170,105 30,105' },
    scalene: { trap: true,  pts: '40,25 140,25 180,105 20,105' },
    q2:      { trap: false, pts: '45,30 130,20 165,105 25,95' },
    right:   { trap: true,  pts: '25,25 130,25 175,105 25,105' },
    q3:      { trap: false, pts: '70,20 150,40 175,105 25,105' }
  };
  const CARD_ORDER  = ['iso', 'q1', 'scalene', 'q2', 'right', 'q3'];   /* as dealt: left to right, top to bottom */
  const MATCH_ORDER = ['iso', 'right', 'scalene'];                     /* as lined up for the names */

  const cardsNow   = () => Array.from(cardGrid.querySelectorAll('.card'));
  const isTrapCard = c => c.dataset.trap === '1';

  /* ---------- a card, taken to the middle of the board ----------
   * A tapped card lifts off the grid and comes to the middle of the screen,
   * blown up over a darkened board, where the shape on it shows what was
   * asked of it -- and then glides back to its place. Nothing is said in
   * words, and nothing travels across the shape: the two sides being talked
   * about are lit up where they are, and then carried on from their own
   * corners to the edges of the card. What the two lines do on the way out
   * is the whole answer -- hold their distance, and they are parallel; lean
   * in on one another, and they are not.
   *
   * A trapezium is shown the one pair of its four sides that is parallel,
   * and the arrow marks land on them. Anything else is shown both of its
   * pairs in turn, and both lean -- the second a shade quicker than the
   * first, since by then the test is familiar.
   */
  const cardZoom    = document.getElementById('cardZoom');
  const cardZoomBox = document.getElementById('cardZoomBox');

  /* The six shapes are drawn in a 200 x 130 space, and all of them sit
     between (20, 20) and (180, 105); this sets that block in the middle of
     the 320 x 200 card and blows it up to fill the room the card has. The
     grid card and the blown-up copy are both drawn through it, so the flight
     between the two is a plain change of size and nothing on the card moves
     against anything else on the way. */
  const CARD_W = 320, CARD_H = 200;          /* the card's own drawing box */
  const SHAPE_MID   = { x: 100, y: 62.5 };
  const SHAPE_SCALE = 1.42;
  const SHAPE_FIT   = 'translate(' + (CARD_W / 2) + ' ' + (CARD_H / 2) + ') ' +
                      'scale(' + SHAPE_SCALE + ') ' +
                      'translate(' + -SHAPE_MID.x + ' ' + -SHAPE_MID.y + ')';
  /* the rounded rectangle every card is drawn on, on the grid and blown up
     in the middle of the board alike -- one shape, so the flight between the
     two is a plain change of size */
  const CARD_RECT = '<rect class="card-bg" x="2" y="2" width="' + (CARD_W - 4) +
                    '" height="' + (CARD_H - 4) + '" rx="30" />';

  /* A carry-on runs from its corner to the edge of the card and stops there:
     the card is what the learner is looking at, and a line that ran on past
     it would be drawn over the board and over the other cards behind. This
     is the card's own inner box put back into the shape's units -- inset far
     enough to clear the rim and the rounded corners -- and a ray is cut at
     whichever of its sides the ray reaches first. */
  const CARD_INSET = 16;
  const toShape = (X, Y) => ({ x: SHAPE_MID.x + (X - CARD_W / 2) / SHAPE_SCALE,
                               y: SHAPE_MID.y + (Y - CARD_H / 2) / SHAPE_SCALE });
  const CARD_ROOM = (function () {
    const a = toShape(CARD_INSET, CARD_INSET);
    const b = toShape(CARD_W - CARD_INSET, CARD_H - CARD_INSET);
    return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
  })();

  function safeRun(o, u) {
    let s = 1e4;
    const cut = (at, d, lo, hi) => {
      if (Math.abs(d) < 1e-6) return;                /* runs parallel to this pair of sides */
      s = Math.min(s, ((d > 0 ? hi : lo) - at) / d);
    };
    cut(o.x, u.x, CARD_ROOM.x1, CARD_ROOM.x2);
    cut(o.y, u.y, CARD_ROOM.y1, CARD_ROOM.y2);
    return Math.max(0, s);
  }

  /* ---- the two pairs of opposite sides ----
   * The sides run round the outline, so the second of a pair runs against
   * the first: `w` is that side turned about, which is the direction the
   * first has to be compared with. Two sides are parallel when there is no
   * angle at all between those two directions. */
  function cardPairs(pts) {
    const v = pts.trim().split(/\s+/).map(function (p) {
      const n = p.split(',');
      return { x: +n[0], y: +n[1] };
    });
    const unit = (a, b) => {
      const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy);
      return { x: dx / len, y: dy / len, len: len };
    };
    const pair = (i, j) => {
      const A = v[i], B = v[(i + 1) % 4], C = v[j], D = v[(j + 1) % 4];
      const u = unit(A, B), w = unit(D, C);
      const cross = u.x * w.y - u.y * w.x;      /* the sine of the angle between them */
      return { a: A, b: B, c: C, d: D, u: u, w: w, parallel: Math.abs(cross) < 1e-6 };
    };
    return [pair(0, 2), pair(1, 3)];
  }

  /* Everything the explanation will need, drawn over the shape and invisible
     until it is called for: for each pair, both sides carried on past their
     four corners, a glowing copy of each side, the arrow marks that say
     "parallel", the arc that marks the angle a pair sits at when it is not,
     and the measuring copy that slides from the one side to the other. */
  function buildZoomEx(pairs) {
    const CHEV = 5;                        /* the arm of the arrowhead */
    const ln = (cls, a, b) => '<line class="' + cls + '" x1="' + fmt(a.x) + '" y1="' + fmt(a.y) +
                              '" x2="' + fmt(b.x) + '" y2="' + fmt(b.y) + '" />';
    const off = (o, u, s) => ({ x: o.x + u.x * s, y: o.y + u.y * s });
    const back = u => ({ x: -u.x, y: -u.y });
    /* a corner's carry-on: out along the side's own direction, as far as the
       card allows */
    const carry = (o, u) => ln('zx-ext', o, off(o, u, safeRun(o, u)));
    /* an arrowhead a little past the middle of a side, pointing the way it
       runs -- inked over a pale halo so it reads on the fill and off it */
    const chev = (o, u) => {
      const n = { x: -u.y, y: u.x };
      return 'M' + fmt(o.x - u.x * CHEV + n.x * CHEV) + ' ' + fmt(o.y - u.y * CHEV + n.y * CHEV) +
            ' L' + fmt(o.x) + ' ' + fmt(o.y) +
            ' L' + fmt(o.x - u.x * CHEV - n.x * CHEV) + ' ' + fmt(o.y - u.y * CHEV - n.y * CHEV);
    };
    const marked = (cls, d) => '<g class="' + cls + '"><path class="zx-halo" d="' + d + '" />' +
                               '<path class="zx-ink" d="' + d + '" /></g>';

    return pairs.map(function (p, i) {
      let g = '<g class="zx-pair ' + (i ? 'zx-b' : 'zx-a') + '">';
      /* both sides carried on past both of their corners, every ray drawn
         outward from its own corner so it grows away from the shape */
      g += carry(p.a, back(p.u)) + carry(p.b, p.u);
      g += carry(p.d, back(p.w)) + carry(p.c, p.w);
      /* the sides themselves, each grown from its first corner */
      g += ln('zx-side', p.a, p.b);
      g += ln('zx-side', p.d, p.c);
      /* "parallel": one arrowhead on each side */
      g += marked('zx-par', chev(off(p.a, p.u, p.u.len * .62), p.u));
      g += marked('zx-par', chev(off(p.d, p.w, p.w.len * .62), p.w));
      return g + '</g>';
    }).join('');
  }

  /* One pair, shown for what it is. `k` paces the whole thing: the second
     pair a wrong card is shown runs at a little under full speed, since by
     then the learner has watched the test once already. */
  async function zoomPair(g, p, k) {
    const T     = ms => Math.round(ms * k);
    const sides = g.querySelectorAll('.zx-side');
    const exts  = Array.from(g.querySelectorAll('.zx-ext'));
    /* growLine lights a line inline; that is lifted as soon as it has grown,
       so the classes have the say over what is showing */
    const settle = l => l.style.removeProperty('opacity');

    /* 1. the two sides light up where they are, one after the other */
    g.classList.add('lit');
    await growLine(sides[0], T(600));
    settle(sides[0]);
    await wait(T(240));
    await growLine(sides[1], T(600));
    settle(sides[1]);
    await wait(T(440));

    /* 2. and both run on out of their corners to the edges of the card */
    await Promise.all(exts.map(l => growLine(l, T(860))));
    exts.forEach(settle);
    g.classList.add('on-ext');
    await wait(T(560));

    /* 3a. they held their distance the whole way out: parallel, and the
           arrow marks land on both sides to say so */
    if (p.parallel) {
      sfx('correct', .5);
      g.classList.add('show-par');
      await wait(T(1400));
      return;
    }

    /* 3b. they leaned in on one another instead: not parallel, and there is
           nothing to mark -- the two lines closing is the whole of it */
    sfx('wrong', .4);
    await wait(T(1100));
  }

  /* a pair that has had its say steps back rather than leaving: its sides
     stay as a trace, so the shape the next pair is drawn on is quiet */
  function hushZoomPair(g) { g.classList.add('hush'); }

  /* and everything goes before the card flies home */
  function clearZoomEx() {
    Array.from(cardZoomBox.querySelectorAll('.zx-pair')).forEach(function (g) {
      g.querySelectorAll('.zx-side, .zx-ext').forEach(l => l.style.removeProperty('opacity'));
      g.classList.remove('lit', 'on-ext', 'show-par', 'hush');
    });
  }

  /* Which card is out in the middle of the board, and which visit put it
     there. A visit takes the sequence it started with and gives the layer up
     the moment it is no longer the one showing. */
  let zoomFrom = null, zoomSeq = 0;

  /* the layer is no longer this visit's to drive: a skip or a replay has
     already put it away, so the frame stops where it is rather than driving
     nodes that are no longer on the page. A replay unwinds a visit through
     CANCELLED as well; a skip does not -- it leaves the scene running and
     races it to its end -- so this is the check that catches a skip. */
  const zoomGone = mine => mine !== zoomSeq;

  /* The middle of the board is given up again: whatever was showing there
     goes, and the card it was lifted from is put back on the grid. Safe to
     call at any moment -- the end of the visit, a skip and a replay all come
     through here -- and the bumped sequence tells a visit that is still
     unwinding that the layer is no longer its to clear. */
  function closeZoom() {
    zoomSeq++;
    if (zoomFrom) { zoomFrom.style.removeProperty('visibility'); zoomFrom = null; }
    cardZoom.classList.remove('on', 'shade', 'ex', 'right', 'wrong');
    cardZoom.removeAttribute('data-kind');
    cardZoomBox.getAnimations().forEach(function (a) {
      try { a.cancel(); } catch (e) { /* already done with */ }
    });
    cardZoomBox.textContent = '';
  }

  /* The flight between the grid and the middle. The blown-up card is always
     laid where it is going and then carried there from where the grid card
     stands -- both measured off the drawn rounded rectangle, which each svg
     centres, so the two never differ by a pixel at the moment one is swapped
     for the other. The card keeps its proportions, so a uniform scale is
     exact. */
  function zoomFlight(box, out) {
    const ga = box.querySelector('.card-bg'), gb = cardZoomBox.querySelector('.card-bg');
    if (!ga || !gb) return null;                /* the layer has been put away */
    const a = ga.getBoundingClientRect();
    const b = gb.getBoundingClientRect();
    const away = 'translate(' + fmt((a.left + a.width / 2) - (b.left + b.width / 2)) + 'px, ' +
                                fmt((a.top + a.height / 2) - (b.top + b.height / 2)) + 'px) ' +
                 'scale(' + (a.width / b.width) + ')';
    const kf = out ? [{ transform: away }, { transform: 'none' }]
                   : [{ transform: 'none' }, { transform: away }];
    return cardZoomBox.animate(kf, {
      duration: REDUCED ? 220 : (out ? 780 : 720),
      easing: out ? 'cubic-bezier(.34, .9, .32, 1)' : 'cubic-bezier(.4, 0, .2, 1)',
      fill: 'both'
    });
  }

  /* the whole visit: out of the grid, the shape taken apart, and home again */
  async function zoomCard(card) {
    const kind  = card.dataset.kind;
    const pts   = CARDS[kind].pts;
    const pairs = cardPairs(pts);
    const box   = card.querySelector('.card-box');
    const good  = isTrapCard(card);

    closeZoom();                        /* nothing of any previous visit left */
    const mine = zoomSeq;
    cardZoomBox.setAttribute('viewBox', '0 0 ' + CARD_W + ' ' + CARD_H);
    cardZoomBox.innerHTML =
      CARD_RECT +
      '<g transform="' + SHAPE_FIT + '">' +
        '<polygon class="card-shape" points="' + pts + '" />' +
        buildZoomEx(pairs) +
      '</g>';
    cardZoom.dataset.kind = kind;       /* the shape's own colours, as on the grid */
    cardZoom.classList.add('on', good ? 'right' : 'wrong');

    /* out it comes, and the board goes quiet behind it */
    zoomFrom = box;
    box.style.visibility = 'hidden';
    cardZoom.classList.add('shade');
    const out = zoomFlight(box, true);
    if (out) await finished(out);
    if (zoomGone(mine)) return;
    cardZoomBox.getAnimations().forEach(a => a.cancel());
    cardZoom.classList.add('ex');       /* the outline steps back for the marks */
    await wait(REDUCED ? 160 : 440);

    /* a trapezium is shown its one parallel pair; anything else both of
       them, since what it is missing is a pair that holds */
    const groups = Array.from(cardZoomBox.querySelectorAll('.zx-pair'));
    const show = [0, 1].filter(i => !good || pairs[i].parallel);
    for (let n = 0; n < show.length; n++) {
      if (zoomGone(mine)) return;
      if (n) { hushZoomPair(groups[show[n - 1]]); await wait(REDUCED ? 140 : 420); }
      await zoomPair(groups[show[n]], pairs[show[n]], n ? .72 : 1);
    }
    if (zoomGone(mine)) return;
    await wait(REDUCED ? 200 : 620);

    /* the marks go first, so the card is itself again before it travels */
    clearZoomEx();
    cardZoom.classList.remove('ex');
    await wait(REDUCED ? 140 : 460);

    /* and home: the grid is measured afresh, since the board may have moved
       under the card while it was away */
    if (zoomGone(mine)) return;
    cardZoom.classList.remove('shade');
    const home = zoomFlight(box, false);
    if (home) await finished(home);
    if (!zoomGone(mine)) closeZoom();
  }

  /* the isosceles and right-angled cards carry their own tell, drawn once
     here in the shape's own units so the wrapping SHAPE_FIT lands them on
     the corners exactly: a tick across the middle of each equal leg, or a
     small square in each of the two corners a right angle actually sits in.
     Hidden until the three line up in a row (style.css), so they add
     nothing to look at while the six are still being picked apart. */
  function cardMarks(k) {
    const P = CARDS[k].pts.trim().split(/\s+/).map(function (p) {
      const n = p.split(',');
      return { x: +n[0], y: +n[1] };
    });
    const TL = P[0], TR = P[1], BR = P[2], BL = P[3];
    if (k === 'iso') {
      const tick = (a, b) => {
        const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy);
        const ux = dx / len, uy = dy / len, nx = -uy, ny = ux, t = 6;
        const cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2;
        const d = 'M' + fmt(cx + nx * t) + ' ' + fmt(cy + ny * t) + ' L' + fmt(cx - nx * t) + ' ' + fmt(cy - ny * t);
        return '<path class="halo" d="' + d + '" /><path class="ink" d="' + d + '" />';
      };
      return '<g class="card-mark eq">' + tick(TL, BL) + tick(TR, BR) + '</g>';
    }
    if (k === 'right') {
      const S = 10;
      return '<g class="card-mark ra">' +
        '<path d="M' + fmt(TL.x) + ' ' + fmt(TL.y + S) + ' h' + S + ' v' + (-S) + '" />' +
        '<path d="M' + fmt(BL.x) + ' ' + fmt(BL.y - S) + ' h' + S + ' v' + S + '" />' +
      '</g>';
    }
    return '';
  }

  function buildCards(keys) {
    cardGrid.innerHTML = keys.map((k, i) => {
      const c = CARDS[k];
      return '<div class="card" data-kind="' + k + '" data-trap="' + (c.trap ? 1 : 0) + '" role="button" tabindex="-1" ' +
                  'aria-pressed="false" aria-label="' + T('ariaCard', { n: i + 1 }) + '">' +
        '<svg class="card-box" viewBox="0 0 ' + CARD_W + ' ' + CARD_H + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
          CARD_RECT +
          /* the outer g carries the fixed SHAPE_FIT placement as an SVG
             attribute; the inner one is CSS's alone to grow in the match
             row, so the two transforms never fight over the same element */
          '<g transform="' + SHAPE_FIT + '">' +
            '<g class="card-fit">' +
              '<polygon class="card-shape" points="' + c.pts + '" />' +
              cardMarks(k) +
            '</g>' +
          '</g>' +
        '</svg>' +
        (c.trap ? '<div class="slot card-slot" data-accept="' + k + '" aria-label="' + T('ariaCardSlot') + '"></div>' : '') +
      '</div>';
    }).join('');
    return cardsNow();
  }

  /* Tap a card, and it is answered at once: a trapezium locks green with
     confetti out of it; anything else shakes red and steps back, and takes
     no more taps. Resolves once all three trapeziums are found. A skip
     finds them itself; a replay lets go. */
  function selectCards() {
    return waitForScene(resolve => {
      const cards = cardsNow();
      let over = false, busy = false;

      /* A tap is answered on the card itself -- green and a burst, or a red
         shake -- and then the card goes to the middle of the board to show
         why. The board takes no taps for as long as it is away: the answer
         is being explained, and the next one is asked for when it is back. */
      const onTap = async e => {
        if (!interactive || over || busy) return;
        const c = e.currentTarget;
        if (c.classList.contains('correct') || c.classList.contains('spent')) return;
        const mine = runToken;
        const good = isTrapCard(c);
        busy = true;
        lockInput(true);

        if (good) {
          /* ---- a trapezium: it locks green, confetti out of the card ---- */
          markRight(c, c.querySelector('.card-box'));
          c.setAttribute('aria-pressed', 'true');
          sfx('correct', .85);
          sfx('confetti', .5);
          swiftee.play('happy', 1);
          requestAnimationFrame(() => burst(c.querySelector('.card-box')));
        } else {
          /* ---- not a trapezium: red shake, and it will step back for good ---- */
          sfx('wrong');
          /* ...and "Not quite!" said over it, then why -- the reason runs
             on under the card's trip to the middle and the marks on it
             (2026-10-01): nothing is typed, the trip is the picture */
          voAlone(FEEDBACK.wrong).catch(() => {});
          voAlone(TRAP.noPair).catch(() => {});
          swiftee.play('confused', 1);
          markWrong(c, c.querySelector('.card-box'));
          c.setAttribute('aria-disabled', 'true');
        }

        /* the visit to the middle, and everything after it, belongs to this
           run of the scene: a replay throws CANCELLED through the whole of
           it, and the frame unwinds here rather than answering over the top
           of the fresh board. A right pick needs no explaining -- it stays
           where it is, its green glow and confetti the whole answer -- only
           a wrong one is carried to the middle to be shown why. */
        try {
          await wait(good ? 620 : 560);
          if (good) await wait(REDUCED ? 160 : 500);
          else {
            c.classList.remove('reject');
            await zoomCard(c);
          }
        } catch (err) {
          if (err !== CANCELLED) throw err;
          return;
        }
        if (mine !== runToken || over) return;

        /* a wrong card dims as it settles back into the grid */
        if (!good) c.classList.add('spent');
        busy = false;
        if (cards.filter(isTrapCard).every(k => k.classList.contains('correct'))) finish(false);
        else lockInput(false);
      };

      const cleanup = () => {
        cards.forEach(c => { c.removeEventListener('click', onTap); c.classList.remove('pick'); });
        /* a skip can land here with a card still out in the middle of the
           board: it comes home at once rather than over the scene after */
        closeZoom();
        skipFills.delete(fill);
        sceneWaiters.delete(teardown);
      };
      const finish = auto => {
        if (over) return;
        over = true;
        cleanup();
        lockInput(true);
        cards.forEach(c => {
          if (!isTrapCard(c)) return;
          markRight(c, c.querySelector('.card-box'));
          c.setAttribute('aria-pressed', 'true');
        });
        if (!auto) {
          swiftee.play('proud', 1);
          skyConfetti(90, 2800);
          sfx('confetti', .7);
        }
        resolve();
      };
      const fill = () => finish(true);
      /* a replay retires the scene while the question is open: the cards go
         with it, so there is only the bookkeeping to undo */
      const teardown = () => { over = true; cleanup(); };

      cards.forEach(c => { c.classList.add('pick'); c.addEventListener('click', onTap); });
      sceneWaiters.add(teardown);
      skipFills.add(fill);
      lockInput(false);
    });
  }

  /* ---- level 2, first half: pick the trapeziums out ---- */
  async function trapSelect() {
    lockInput(true);
    sceneStart(trapSelect);
    const mine = runToken;
    homeTrapChips();
    holdBird();                            /* the bird stays at the heading for the whole page */
    promptReserve(longest(TRAP_GHOST));
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;

    /* 1. the verdict and the names go, and the bird hops from beside the
          shape up to the heading -- the trapezium fading and the halves
          closing while it is mid-air -- rather than vanishing where it
          stood and jumping in again from behind the board (user,
          2026-09-29). A Back or a jump into this scene finds the bird
          wherever the last scene left it, and the hop brings it up from
          there. */
    trapNote.classList.remove('show');
    trapQuiz.classList.add('off');
    await wait(260);
    const shut = () => {
      trapShape.classList.add('away');
      trapQuiz.classList.remove('show', 'off');
      trapNote.classList.remove('ok', 'bad');
      trapNoteTxt.textContent = '';
      trap.classList.remove('wide');       /* the halves close back into one */
      trap.classList.add('lvl2');          /* the names' row gives up its room */
    };
    if (trapMascot.classList.contains('in')) await hopBetween(trapMascot, boardMascot, shut);
    else shut();
    await wait(REDUCED ? 200 : 480);

    /* 2. the six cards, dealt one after another */
    const cards = buildCards(CARD_ORDER);
    cardGrid.classList.remove('row');
    trapCards.classList.remove('match');
    trapCards.classList.add('on');
    await wait(120);
    for (const c of cards) {
      c.classList.add('reveal');
      sfx('click', .22);
      await wait(130);
    }
    await wait(500);

    /* 3. Swiftee says what to do from the heading, and stays there with
          the line while the learner picks: it is the instruction, and the
          bird is not sent away and brought back around it (user,
          2026-09-29) */
    await heading(TRAP.select);
    await wait(REDUCED ? 200 : 600);

    /* 4. the learner picks the trapeziums out, each tap answered at once */
    await selectCards();
    if (mine !== runToken) throw CANCELLED;
    await wait(REDUCED ? 300 : 900);

    /* 5. all three found: Swiftee says so from the heading, and then the
          line and the bird go -- the heading's room held open under them,
          so the cards stay put -- and only then Next (user, 2026-09-30).
          The next page draws its shape before the bird comes back up. */
    await heading(TRAP.found);
    if (mine !== runToken) throw CANCELLED;
    await wait(REDUCED ? 300 : 1500);
    board.classList.add('head-held');
    headStay = false;
    feedbackGen++;
    const wipe = () => { promptTxt.textContent = ''; caret.hidden = true; };
    if (boardMascot.classList.contains('in')) await mascotJumpOut(boardMascot, wipe);
    else wipe();
    await wait(REDUCED ? 100 : 360);

    /* 6. Next -- straight on into the scalene trapezium's area, the
          naming-the-kinds step skipped */
    await showNext();
    await scalArea();
  }

  /* the three trapeziums, lined up: put back if a replay has taken the
     cards down. True if they had to be rebuilt. */
  function ensureCards() {
    if (cardGrid.children.length) return false;
    buildCards(MATCH_ORDER).forEach(c => c.classList.add('reveal'));
    cardGrid.classList.add('row');
    trapCards.classList.add('on', 'match');
    trapShape.classList.add('away');
    return true;
  }

  /* The cards that stay glide from where they were to their new places:
     measured before and after the change, then each is animated from the
     one to the other. A card keeps its proportions, so a uniform scale is
     exact -- the box is measured by its drawn rounded rectangle, which the
     svg centres, so the svg's own centre is the right origin. */
  async function flipCards(cards, mutate) {
    const boxes = cards.map(c => c.querySelector('.card-box'));
    const bgs   = cards.map(c => c.querySelector('.card-bg'));
    const before = bgs.map(b => b.getBoundingClientRect());
    mutate();
    if (REDUCED) return wait(120);
    const after = bgs.map(b => b.getBoundingClientRect());
    const anims = [];
    boxes.forEach((box, i) => {
      const a = before[i], b = after[i];
      if (!a.width || !b.width) return;
      const dx = (a.left + a.width / 2) - (b.left + b.width / 2);
      const dy = (a.top + a.height / 2) - (b.top + b.height / 2);
      const s  = a.width / b.width;
      anims.push(box.animate(
        [{ transform: 'translate(' + fmt(dx) + 'px, ' + fmt(dy) + 'px) scale(' + s + ')' }, { transform: 'none' }],
        { duration: 860, delay: i * 90, easing: 'cubic-bezier(.4, 0, .2, 1)', fill: 'backwards' }
      ));
    });
    const mine = runToken;
    await Promise.all(anims.map(a => a.finished.catch(() => {})));
    retired(mine);
  }

  /* Drag a chip onto a slot -- or tap the chip, then the slot. `fits` says
     whether a chip belongs in a slot; a wrong drop shakes both and the chip
     stays where it was; a right one docks, and `onDock` is told. Resolves
     once every slot is filled -- so a scene that asks for one box at a time
     passes that one slot. A skip fills them; a replay lets go.
       `how.quiet` keeps the confetti back (a scene saving it for its last
     answer) and `how.onWrong` is told about a drop that did not fit, for a
     scene that puts a reason on the board. */
  function dragMatch(chips, slots, fits, onDock, how) {
    how = how || {};
    return waitForScene(resolve => {
      let mdrag = null, mpicked = null, over = false;
      const free = () => slots.filter(s => !s.classList.contains('filled'));
      const slotAt = (x, y) => free().find(s => {
        const r = s.getBoundingClientRect();
        return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
      }) || null;
      const clearOver = () => slots.forEach(s => s.classList.remove('over'));
      const unpick = () => { if (mpicked) mpicked.classList.remove('picked'); mpicked = null; };

      const dockIn = (chip, slot, earned) => {
        slot.appendChild(chip);
        slot.classList.add('filled');
        chip.classList.remove('picked', 'dragging');
        chip.disabled = true;
        markRight(slot);
        setTimeout(() => slot.classList.remove('correct'), 520);
        if (onDock) onDock(chip, slot);
        sfx('correct', earned ? 1 : .55);
        if (earned) {
          swiftee.play('happy', 1);
          if (!how.quiet) {
            sfx('confetti', .55);
            requestAnimationFrame(() => burst(chip));
          }
        }
      };
      const tryPlace = (chip, slot) => {
        if (!slot || slot.classList.contains('filled')) return;
        if (!fits(chip, slot)) {
          sfx('wrong');
          swiftee.play('confused', 1);
          markWrong(slot);
          markWrong(chip);
          setTimeout(() => { slot.classList.remove('reject'); chip.classList.remove('reject'); }, 430);
          if (how.onWrong) how.onWrong(chip, slot);
          return;
        }
        dockIn(chip, slot, true);
        if (!free().length) finish(false);
        else feedback(FEEDBACK.right);
      };

      const onDownM = e => {
        if (!interactive || over) return;
        const chip = e.currentTarget;
        if (chip.disabled) return;
        if (e.button !== undefined && e.button !== 0) return;
        mdrag = liftGhost(chip, e);
        chip.classList.add('dragging');
        unpick();
        sfx('click', .5);
        window.addEventListener('pointermove', onMoveM);
        window.addEventListener('pointerup', onUpM);
        window.addEventListener('pointercancel', onUpM);
        e.preventDefault();
      };
      const onMoveM = e => {
        if (!mdrag) return;
        moveGhost(mdrag, e.clientX, e.clientY);
        clearOver();
        const slot = slotAt(e.clientX, e.clientY);
        if (slot) slot.classList.add('over');
      };
      const onUpM = e => {
        if (!mdrag) return;
        window.removeEventListener('pointermove', onMoveM);
        window.removeEventListener('pointerup', onUpM);
        window.removeEventListener('pointercancel', onUpM);
        const d = mdrag;
        mdrag = null;
        clearOver();
        const slot = slotAt(e.clientX, e.clientY);
        dropGhost(d, slot, function () {
          d.el.classList.remove('dragging');
          if (slot) return tryPlace(d.el, slot);
          /* a tap, not a drag: the chip waits for a slot to be tapped */
          if (Math.hypot(e.clientX - d.start.x, e.clientY - d.start.y) < 6) {
            mpicked = d.el;
            d.el.classList.add('picked');
          }
        });
      };
      const onSlotTap = e => {
        if (!interactive || !mpicked) return;
        const chip = mpicked;
        unpick();
        tryPlace(chip, e.currentTarget);
      };

      const cleanup = () => {
        chips.forEach(c => c.removeEventListener('pointerdown', onDownM));
        slots.forEach(s => s.removeEventListener('click', onSlotTap));
        window.removeEventListener('pointermove', onMoveM);
        window.removeEventListener('pointerup', onUpM);
        window.removeEventListener('pointercancel', onUpM);
        if (mdrag) { mdrag.ghost.remove(); mdrag.el.classList.remove('dragging'); mdrag = null; }
        clearOver();
        unpick();
        skipFills.delete(fill);
        sceneWaiters.delete(teardown);
      };
      const finish = auto => {
        if (over) return;
        over = true;
        cleanup();
        lockInput(true);
        resolve();
      };
      /* a skip: each name goes onto its own shape by itself */
      const fill = () => {
        if (over) return;
        free().forEach(slot => {
          const chip = chips.find(c => !c.disabled && fits(c, slot));
          if (chip) dockIn(chip, slot, false);
        });
        finish(true);
      };
      /* a replay retires the scene while the drag is open */
      const teardown = () => { over = true; cleanup(); };

      chips.forEach(c => c.addEventListener('pointerdown', onDownM));
      slots.forEach(s => s.addEventListener('click', onSlotTap));
      sceneWaiters.add(teardown);
      skipFills.add(fill);
      lockInput(false);
    });
  }

  /* ---- level 2, second half: name the three ---- */
  async function trapMatch() {
    lockInput(true);
    sceneStart(trapMatch);
    const mine = runToken;
    homeTrapChips();
    boardMascot.classList.remove('in');    /* it jumps in from behind the board below */
    promptReserve(longest(TRAP_GHOST));
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    trap.classList.add('lvl2');

    const rebuilt = ensureCards();
    const traps  = cardsNow().filter(isTrapCard);
    const others = cardsNow().filter(c => !isTrapCard(c));

    if (!rebuilt) {
      /* 1. the three that are not trapeziums leave */
      await wait(300);
      others.forEach(c => c.classList.add('gone'));
      await wait(REDUCED ? 150 : 460);

      /* 2. the trapeziums glide into one row, in the order the names will
            be asked, and the green rings from the last question come off */
      await flipCards(traps, () => {
        others.forEach(c => { c.hidden = true; });
        traps.forEach(c => {
          c.classList.remove('correct');
          c.style.order = String(MATCH_ORDER.indexOf(c.dataset.kind));
        });
        cardGrid.classList.add('row');
        trapCards.classList.add('match');
      });
    }
    await wait(260);

    /* 3. a slot under each, left to right; then the three names, shuffled
          so their order never mirrors the shapes' */
    const slots = MATCH_ORDER.map(k => cardGrid.querySelector('.card[data-kind="' + k + '"] .card-slot'));
    for (const s of slots) {
      s.classList.add('reveal');
      sfx('click', .3);
      await wait(150);
    }
    await wait(300);
    const deck = trapChips.slice();
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    deck.forEach(c => trapTray.appendChild(c));
    trapTray.classList.add('show');
    await wait(120);
    await dealChips(deck);
    await wait(300);

    /* 4. Swiftee jumps up from behind the board and says what to do, with
          the warm-up's voice-over for the same line */
    await voiced(TRAP.match);

    /* 5. the names go onto the shapes */
    await dragMatch(deck, slots,
      (chip, slot) => chip.dataset.kind === slot.dataset.accept,
      (chip, slot) => {
        const card = slot.closest('.card');
        card.classList.add('named');
        Motion.correctPulse(card.querySelector('.card-box'));
      });
    if (mine !== runToken) throw CANCELLED;

    /* 6. all three named: Well Done, and Next */
    feedback(FEEDBACK.done);
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
    await wait(2600);
    await showNext();
    await rtrapArea();
  }

  /* ---------- section 9: the area of a trapezium, three times ----------
   * One continuous derivation -- no Next until the formula is in -- with
   * Swiftee narrating every beat, from the heading first and then from
   * beside the working. It is played three times, once for each kind of
   * trapezium the learner has just named: right-angled (two copies make a
   * rectangle), then scalene and isosceles (two copies make a
   * parallelogram). The choreography is one piece of code; the kind only
   * changes the corners and the words. Each kind has two entry points, so
   * Replay and the jump menu can land on the rectangle as well as on the
   * start.
   *
   *   1. the last drawing goes (or, the first time, the cards) and a
   *      trapezium draws itself in the MIDDLE of the board; the
   *      right-angled one has its two right angles marked: "Let us try to
   *      find the area of this ... trapezium."
   *   2. its sides are named there, on arrows: a along the top, b along the
   *      bottom, h up the left -- with the height itself dotted in when the
   *      left side is slanted
   *   3. the board opens out to the right and the trapezium slides across
   *      into the left half of it, leaving a whole half free beside it
   *   4. a copy pops out of the trapezium -- in the trapezium's own colours,
   *      so one shape is seen to become two -- takes a colour of its own,
   *      slides across into the free half and flips upside down there: two
   *      shapes now, half the stage each
   *   5. the trapezium's names are carried across to the copy one at a time,
   *      each starting on the side it was measured from and landing on the
   *      side of the copy that is the same, the two glowing green together:
   *      a, then b, then h
   *   6. the copy closes on the trapezium's right side -- the two make one
   *      rectangle or parallelogram -- and the two names along the top merge
   *      into one, a + b, and so do the two along the bottom
   *   7. the drawing moves to the left half of the board and Swiftee hops
   *      down to the right half, beside the working: Total area = length ×
   *      breadth (or base × height) = (a + b) × h, lighting what it names
   *   8. the copy fades to a dashed outline -- the trapezium is exactly
   *      half: Area of Trapezium = Half of total area = ½ × (a + b) × h
   *   9. the copy goes, the trapezium comes back to the middle with a, b
   *      and h and its parallel marks, and the rule is boxed: Area of
   *      Trapezium = ½ × (sum of parallel sides) × height. Confetti, Next. */
  const rtrap       = document.getElementById('rtrap');
  const rtrapShape  = document.getElementById('rtrapShape');
  const rtrapSvg    = document.getElementById('rtrapSvg');
  const rtScene     = document.getElementById('rtScene');
  const rtArt       = document.getElementById('rtArt');
  const rtCopy      = document.getElementById('rtCopy');
  const rtDims      = document.getElementById('rtDims');
  const rtrapSay    = document.getElementById('rtrapSay');
  const rtrapMascot = document.getElementById('rtrapMascot');
  const rtrapText   = document.getElementById('rtrapText');
  const rtrapLines  = document.getElementById('rtrapLines');

  /* the geometry every kind shares, in the svg's units: the parallel sides
     a (top) and b (bottom) and the height h. A kind is told by how far its
     top side is set in from the left, x0: none for the right-angled
     trapezium, whose left side stands square; half of b - a for the
     isosceles, so both slants match; something else for the scalene. */
  const RT_A = 200, RT_B = 300, RT_H = 160;
  /* the middle of the viewBox, where the drawing is centred */
  const RT_MID = 260;

  function rtKind(key, name, x0, whole, dims) {
    const P = { TL: { x: x0, y: 0 }, TR: { x: x0 + RT_A, y: 0 }, BR: { x: RT_B, y: RT_H }, BL: { x: 0, y: RT_H } };
    /* the copy is the shape turned half a circle about M, the middle of the
       RIGHT-hand side: it comes to rest against that side, on the right, and
       the two make one whole */
    const M = { x: (P.TR.x + P.BR.x) / 2, y: RT_H / 2 };
    const rot = p => ({ x: 2 * M.x - p.x, y: 2 * M.y - p.y });
    const right = Math.max(P.TR.x, P.BR.x);          /* the trapezium's own right edge */
    /* which corners are square: the side that stands upright, if either
       does, is where the right-angle marks go -- and a slanted left side is
       what calls for the dotted height inside the shape */
    const sqL = P.TL.x === P.BL.x, sqR = P.TR.x === P.BR.x;
    /* the copy turns about its own middle and is carried into place, so the
       turn plays the same wherever along the way it is played */
    const C = { x: right / 2, y: RT_H / 2 };
    const join  = 2 * M.x - right;                    /* where the copy comes to rest */
    const split = right + 76;                         /* and where it waits, a gap apart */
    /* how far the drawing reaches past the shape on each side: a name hangs
       its arrow, its gap and its letter out there */
    const OUT = 58, END = 8;
    const shortName = name === 'Right-angled' ? name : name.toLowerCase();
    /* the whole the two make, in the language's own word */
    const wholeName = T(whole === 'rectangle' ? 'wordRectangle' : 'wordParallelogram');
    const home = RT_MID - right / 2;
    const pair = RT_MID - ((0 - OUT) + (join + right + END)) / 2;
    return {
      key: key, name: name, x0: x0, P: P, C: C, rot: rot, whole: whole,
      sqL: sqL, sqR: sqR, join: join, split: split,
      /* where the drawing sits: alone, the trapezium is centred; with the
         copy, the pair is */
      home: home,
      pair: pair,
      /* the drawing's window once the trapezium stands alone: close round
         it and its names, so it fills its column */
      alone: fmt(home - 92) + ' -60 ' + fmt(right + 184) + ' 280',
      /* and the window round the pair once it shares the board with the
         working: no more margin than its names need */
      pairBox: fmt(pair - OUT - 8) + ' -56 ' + fmt(join + right + END + OUT + 16) + ' 270',
      /* the wide stage the two stand apart on: the trapezium holds the left
         half of it and the copy the right, each with its own h hanging off
         its outer side */
      stageBox: fmt(home - OUT - 24) + ' -70 ' + fmt(split + right + 2 * OUT + 48) + ' 300',
      say: {
        here:  T('p25Here'),
        sides: T('p25Sides'),
        room:  T('p25Room'),
        copy:  T('p25Copy'),
        flip:  T('p25Flip'),
        made:  T('p25Made', { whole: wholeName }),
        eqA:   T('p25EqA'),
        eqB:   T('p25EqB'),
        eqH:   T('p25EqH'),
        sum:   whole === 'rectangle' ? T('p25SumRect')
                                     : T('p25SumPara'),
        /* from beside the working */
        area:  T('p26Area', { whole: wholeName }),
        half:  T('p26Half', { whole: wholeName }),
        so:    T('p26So'),
        rule:  T('p26Rule')
      },
      /* the working, page 4's way (user, 2026-09-30): a line is typed, and
         a copy of its right-hand side peels off under its "=" and is worked
         there a word at a time. So the forms after `total` and after
         `final` are what the copy passes through, not lines of their own,
         and never say the left-hand side again. */
      lines: {
        total:  [{ t: T('totalArea') + ' = ' }, { t: dims[0], w: 'ab' }, { t: ' × ' }, { t: dims[1], w: 'h' }],
        totalA: [{ t: '= ' }, { t: '(a + b)', w: 'ab' }, { t: ' × ' }, { t: dims[1], w: 'h' }],
        totalB: [{ t: '= ' }, { t: '(a + b)', w: 'ab' }, { t: ' × ' }, { t: 'h', w: 'h' }],
        final:  [...AREA_OF(T('shapeTrapezium'), 'trap'), { t: ' = ½ × ' }, { t: '(a + b)', w: 'ab' }, { t: ' × ' }, { t: 'h', w: 'h' }],
        ruleA:  [{ t: '= ½ × ' }, { t: '(' + T('wordSumOfParallelSides') + ')', w: 'ab' }, { t: ' × ' }, { t: 'h', w: 'h' }],
        ruleB:  [{ t: '= ½ × ' }, { t: '(' + T('wordSumOfParallelSides') + ')', w: 'ab' }, { t: ' × ' }, { t: T('labelHeight'), w: 'h' }]
      },
      shortName: shortName
    };
  }
  /* the right-angled one stands its upright side on the LEFT, so the copy
     that turns about its right side completes it into a rectangle */
  const RT_KINDS = {
    right:   rtKind('right',   'Right-angled', 0,                    'rectangle',     [T('labelLength'), T('labelBreadth')]),
    scalene: rtKind('scalene', 'Scalene',      70,                   'parallelogram', [T('labelBase'), T('labelHeight')]),
    iso:     rtKind('iso',     'Isosceles',    (RT_B - RT_A) / 2,    'parallelogram', [T('labelBase'), T('labelHeight')])
  };
  const rtHeadLines = k => [k.say.here, k.say.sides, k.say.room, k.say.copy, k.say.flip,
                            k.say.eqA, k.say.eqB, k.say.eqH, k.say.made, k.say.sum];

  /* the kind on the board right now, and where its drawing sits */
  let rk = RT_KINDS.right;
  let rtX = rk.home;

  /* Swiftee's box beside the working (user, 2026-09-30): page 4's box,
     fitted to each piece it says rather than held at the page's longest
     line. The ghost is set the way the live line is (setTxt), as rpFit is. */
  const rtNoteGhost = rtrapText.querySelector('.type-ghost');
  const rtNoteTxt   = rtrapText.querySelector('.txt');
  const rtNoteCaret = rtrapText.querySelector('.caret');
  const rtFit = text => { setTxt(rtNoteGhost, text); snug(rtNoteGhost); };
  speaker(rtNoteTxt, rtrapMascot, () => rtrapText.classList.remove('show'));
  /* the box as another scene must find it: shut and empty */
  function rtNoteClear() {
    rtrapText.classList.remove('show');
    rtNoteTxt.textContent = '';
    rtNoteGhost.textContent = '';
    rtNoteCaret.hidden = true;
    rtrapLines.style.fontSize = '';           /* a pair that closed up to fit (copyLine) */
  }

  const rtDim  = cls => rtDims.querySelector('.' + cls);
  const rtLine = (cls, a, b, dash) => '<line class="' + cls + '" x1="' + fmt(a.x) + '" y1="' + fmt(a.y) + '" x2="' + fmt(b.x) + '" y2="' + fmt(b.y) + '"' + dashAttr(dash) + ' />';

  /* a two-headed arrow from a to b, with its letter set at (lx, ly): the
     parallelogram's dimension language, so the same classes style it.
     `extra` is anything else the group carries, drawn after the arrow. */
  function rtArrow(cls, a, b, label, lx, ly, anchor, extra) {
    /* the heads a size down from the parallelogram's (user, 2026-09-30) */
    const u = rhUnit(b, a), HEAD = 7;
    const head = (tip, d) => {
      const n = { x: -d.y, y: d.x };
      return '<path class="d-head" d="M' + fmt(tip.x - d.x * HEAD + n.x * HEAD * .65) + ' ' + fmt(tip.y - d.y * HEAD + n.y * HEAD * .65) +
        ' L' + fmt(tip.x) + ' ' + fmt(tip.y) +
        ' L' + fmt(tip.x - d.x * HEAD - n.x * HEAD * .65) + ' ' + fmt(tip.y - d.y * HEAD - n.y * HEAD * .65) + '" />';
    };
    return '<g class="d-group ' + cls + '">' +
      rtLine('d-arrow', a, b, arrowDash(a, b, label, 21, { x: lx, y: ly })) +
      head(a, { x: -u.x, y: -u.y }) + head(b, u) +
      (extra || '') +
      '<text class="d-label" x="' + fmt(lx) + '" y="' + fmt(ly) + '" font-size="21" text-anchor="' + anchor + '" dominant-baseline="middle">' + label + '</text>' +
    '</g>';
  }

  /* the whole drawing for one kind, put back to its first frame */
  const RT_VB = '-80 -60 680 280';
  /* the drawing's window eases from the box it shows to another */
  function rtZoom(box, ms) {
    const from = (rtrapSvg.getAttribute('viewBox') || RT_VB).split(/\s+/).map(Number);
    const to = box.split(/\s+/).map(Number);
    return tween(ms || 900, p => {
      rtrapSvg.setAttribute('viewBox', from.map((v, i) => fmt(v + (to[i] - v) * p)).join(' '));
    }, easeInOut);
  }

  /* The pair glides from the middle of the whole board into the left half
     of it, the window closing round it as it goes (user, 2026-09-30): where
     the pair is drawn is measured before and after -- the box it will fill
     read off the old window and the new -- and the svg is carried from the
     one to the other as one move. The glide and the zoom used to run as two
     motions over each other. */
  async function rtGlide(box) {
    const at = () => {
      const d = drawnRect(rtrapSvg), vb = rtrapSvg.viewBox.baseVal;
      const k = vb.width ? d.width / vb.width : 1;
      const b = box.split(/\s+/).map(Number);
      return { left: d.left + (b[0] - vb.x) * k, top: d.top + (b[1] - vb.y) * k,
               width: b[2] * k, height: b[3] * k, box: d.box };
    };
    const before = at();
    rtrap.classList.add('wide');
    rtrapSvg.setAttribute('viewBox', box);
    const after = at();
    if (REDUCED || !before.width || !after.width) return wait(120);
    const dx = before.left - after.left, dy = before.top - after.top, s = before.width / after.width;
    rtrapSvg.style.transformOrigin = (after.left - after.box.left) + 'px ' + (after.top - after.box.top) + 'px';
    const a = rtrapSvg.animate(
      [{ transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + s + ')' }, { transform: 'none' }],
      { duration: 1100, easing: 'cubic-bezier(.45, 0, .15, 1)' }
    );
    const mine = runToken;
    try { await a.finished; } catch (e) {}
    rtrapSvg.style.transformOrigin = '';
    retired(mine);
  }

  function buildRtrap(kind) {
    rk = kind || rk;
    rtrapSvg.setAttribute('viewBox', RT_VB);
    const P = rk.P, rot = rk.rot;
    const pts = [P.TL, P.TR, P.BR, P.BL];
    const path = 'M' + pts.map(p => fmt(p.x) + ' ' + fmt(p.y)).join(' L') + ' Z';
    const S = 16;                                  /* the right-angle marks' side */
    /* a square in a corner that is one: the upright side's two, whichever
       side it is that stands upright */
    const sq = (c, dx) =>
      '<path class="rt-mark" d="M' + fmt(c.x) + ' ' + fmt(c.y === 0 ? S : RT_H - S) +
      ' h' + fmt(dx) + ' v' + fmt(c.y === 0 ? -S : S) + '" />';
    rtArt.innerHTML =
      '<polygon class="shape-fill" clip-path="url(#wipeRtrap)" points="' + pts.map(pt).join(' ') + '" />' +
      '<path class="shape-outline" d="' + path + '" fill="none" stroke-width="5" />' +
      (rk.sqL ? sq(P.TL, S) + sq(P.BL, S) : '') +
      (rk.sqR ? sq(P.TR, -S) + sq(P.BR, -S) : '');

    /* the copy: the same corners, carried and turned by its transform */
    rtCopy.innerHTML =
      '<polygon class="rt-cfill" points="' + pts.map(pt).join(' ') + '" />' +
      '<path class="rt-cline" d="' + path + '" />' +
      '<path class="rt-cdash" d="' + path + '" />';
    rtCopyAt(0, 0);
    rtCopy.classList.remove('show', 'flying', 'fresh');
    rtScene.insertBefore(rtCopy, rtArt);           /* under the trapezium until it lifts */

    /* the names: a and b along the trapezium's top and bottom and h up its
       left; b and a along the copy's, with an h of its own down the copy's
       right side -- which the join squeezes out, the trapezium's own being
       the whole's; and a + b along the whole of the top and of the bottom.
       When the left side is slanted, the height is also dotted in from the
       top-left corner straight down to the base, with a right angle at its
       foot, so h is seen to be the distance between the parallel sides and
       not the slanted side. */
    const G = 26, LAB = 17, yT = -G, yB = RT_H + G, MK = 12;
    const top = (cls, x1, x2, lab) => rtArrow(cls + ' rt-len', { x: x1, y: yT }, { x: x2, y: yT }, lab, (x1 + x2) / 2, yT - LAB, 'middle');
    const bot = (cls, x1, x2, lab) => rtArrow(cls + ' rt-len', { x: x1, y: yB }, { x: x2, y: yB }, lab, (x1 + x2) / 2, yB + LAB + 1, 'middle');
    /* a height stands outside the shape it measures, its letter further out
       still: the trapezium's own off its left side, the copy's off its
       right, so neither of them falls in the gap between the two */
    const hgt = (cls, x, extra, out) => rtArrow(cls + ' rt-hgt', { x: x, y: 0 }, { x: x, y: RT_H }, 'h',
      x + (out ? LAB : -LAB), RT_H / 2, out ? 'start' : 'end', extra);
    const inner = rk.sqL ? '' :
      rtLine('d-height', P.TL, { x: P.TL.x, y: RT_H }) +
      '<path class="d-mark" d="M' + fmt(P.TL.x) + ' ' + fmt(RT_H - MK) + ' H' + fmt(P.TL.x + MK) + ' V' + fmt(RT_H) + '" />';
    /* the copy carries the same dotted height, turned round with it: down
       from its own slanted corner, the right angle at the top. It is held
       back until the name has landed on the copy -- while the name is still
       travelling its group sits on the trapezium, where the dotted line
       would fall outside the drawing altogether. */
    const cx = rot(P.TL).x;
    const cinner = rk.sqL ? '' : '<g class="rt-cin">' +
      rtLine('d-height', { x: cx, y: 0 }, { x: cx, y: RT_H }) +
      '<path class="d-mark" d="M' + fmt(cx) + ' ' + fmt(MK) + ' H' + fmt(cx - MK) + ' V0" />' + '</g>';
    rtDims.innerHTML =
      top('top-a', P.TL.x, P.TR.x, 'a') +
      bot('bot-b', P.BL.x, P.BR.x, 'b') +
      hgt('left-h', -G, inner) +
      top('top-b', rot(P.BR).x, rot(P.BL).x, 'b') +
      bot('bot-a', rot(P.TR).x, rot(P.TL).x, 'a') +
      hgt('copy-h', rk.join + Math.max(P.TR.x, P.BR.x) + G, cinner, 1) +
      top('top-ab', P.TL.x, rot(P.BL).x, 'a + b') +
      bot('bot-ab', P.BL.x, rot(P.TL).x, 'a + b') +
      '<g class="rt-par">' + parMark(P.TL, P.TR) + parMark(P.BL, P.BR) + '</g>';
    rtCopyShift(0);

    rtX = rk.home;
    rtScene.setAttribute('transform', 'translate(' + fmt(rtX) + ' 0)');
    rtrapShape.classList.remove('marked', 'parallel', 'ghost', 'alone', 'lit-rect', 'pulse');
  }

  /* the drawing slides from where it is to x */
  function rtSlide(x, ms) {
    const from = rtX;
    rtX = x;
    return tween(ms || 1000, p => {
      rtScene.setAttribute('transform', 'translate(' + fmt(from + (x - from) * p) + ' 0)');
    }, easeInOut);
  }

  /* ---------- the copy, carried and turned ----------
   * The copy is popped out of the trapezium, takes a colour of its own, is
   * carried out into the right half of the stage and flipped upside down
   * there; its own names are then brought across to it one at a time; and it
   * is carried back until it rests against the trapezium's right side, the
   * two making one whole.
   *
   * It is always drawn turned about its OWN middle and carried by a
   * translation, so wherever along the way it is, it is one translation from
   * where it is going -- which is what lets the journey be played as a
   * single tween. `lift` and `swell` are the turn's little arc through the
   * air, nothing more. */
  function rtCopyAt(tx, deg, lift, swell) {
    const C = rk.C;
    rtCopy.setAttribute('transform',
      'translate(' + fmt(tx) + ' ' + fmt(-(lift || 0)) + ') ' +
      'rotate(' + fmt(deg) + ' ' + fmt(C.x) + ' ' + fmt(C.y) + ')' +
      (swell ? ' translate(' + fmt(C.x) + ' ' + fmt(C.y) + ') scale(' + fmt(1 + swell) + ') translate(' + fmt(-C.x) + ' ' + fmt(-C.y) + ')' : ''));
  }

  /* the copy part-way through its flip: it is squashed about its own middle
     until it stands edge-on and opens out again mirrored, which at the end
     of the turn is scale(-1, -1) -- exactly the half turn rtCopyAt draws.
     The mirror is taken at the halfway point, where the shape is a line and
     nothing of it can be seen to jump. */
  function rtCopyFlip(tx, p, lift) {
    const C = rk.C, n = v => Math.round(v * 1000) / 1000;
    const sy = Math.cos(Math.PI * p), sx = p < .5 ? 1 : -1;
    rtCopy.setAttribute('transform',
      'translate(' + fmt(tx) + ' ' + fmt(-(lift || 0)) + ') ' +
      'translate(' + fmt(C.x) + ' ' + fmt(C.y) + ') ' +
      'scale(' + n(sx) + ' ' + n(sy) + ') ' +
      'translate(' + fmt(-C.x) + ' ' + fmt(-C.y) + ')');
  }

  /* the copy's own names are drawn where the copy comes to rest, and ride
     with it for as long as it stands apart */
  const RT_COPY_NAMES = ['top-b', 'bot-a', 'copy-h'];
  function rtCopyShift(dx) {
    RT_COPY_NAMES.forEach(c => {
      const g = rtDim(c);
      if (!g) return;
      if (dx) g.setAttribute('transform', 'translate(' + fmt(dx) + ' 0)');
      else g.removeAttribute('transform');
    });
  }

  /* where a name's arrow sits, its group's own offset counted in: two names
     of the same length are one translation apart, which is the journey the
     one makes to the other */
  function rtNameAt(g) {
    const l = g.querySelector('.d-arrow');
    const t = /translate\(\s*(-?[\d.]+)/.exec(g.getAttribute('transform') || '');
    return {
      x: (t ? +t[1] : 0) + (l.x1.baseVal.value + l.x2.baseVal.value) / 2,
      y: (l.y1.baseVal.value + l.y2.baseVal.value) / 2
    };
  }

  /* 1. a copy is taken off the trapezium: it is laid on it exactly, in the
        trapezium's own colours, and lifts -- a deeper shadow under it, the
        shape itself never moving */
  async function rtMakeCopy() {
    rtCopyAt(0, 0);
    rtCopy.classList.add('fresh');
    rtScene.insertBefore(rtCopy, rtDims);          /* over the trapezium while it is apart */
    rtCopy.classList.add('show');
    sfx('click', .3);
    await wait(REDUCED ? 100 : 520);
    rtCopy.classList.add('flying');                /* lifted off, a shadow under it */
    await wait(REDUCED ? 120 : 620);
  }

  /* 2. it takes a colour of its own and slides across into the half of the
        stage the trapezium has just left free */
  async function rtSplitCopy() {
    rtCopy.classList.remove('fresh');              /* the colour eases over as it goes */
    await wait(REDUCED ? 80 : 620);
    rtCopyShift(rk.split - rk.join);               /* its names, laid where it is going */
    await tween(REDUCED ? 200 : 1500, p => rtCopyAt(rk.split * p, 0), easeInOut);
    await wait(REDUCED ? 80 : 380);
  }

  /* 3. where it flips over: it squashes down to a line and opens out upside
        down again, which lands it exactly half a turn round -- the one turn
        that makes the two fit together */
  async function rtFlipCopy() {
    sfx('click', .3);
    await tween(REDUCED ? 220 : 1500, p => rtCopyFlip(rk.split, p, 26 * Math.sin(Math.PI * p)), easeInOut);
    rtCopyAt(rk.split, 180);                       /* landed: the half turn, exactly */
    await wait(REDUCED ? 80 : 460);
  }

  /* 4. a name is carried across: the copy's own name starts on the
        trapezium's, over the side it is the same as, and travels to its
        place on the copy; both go green as it lands */
  async function rtCarry(srcCls, dstCls) {
    const src = rtDim(srcCls), dst = rtDim(dstCls);
    const home = rk.split - rk.join;               /* where the copy's names ride */
    const a = rtNameAt(src), b = rtNameAt(dst);
    const dx = a.x - b.x, dy = a.y - b.y;
    const paint = p => dst.setAttribute('transform',
      'translate(' + fmt(home + dx * (1 - p)) + ' ' + fmt(dy * (1 - p)) + ')');
    paint(0);
    rtSet(dstCls);
    await wait(REDUCED ? 80 : 420);
    await tween(REDUCED ? 200 : 1200, paint, easeInOut);
    dst.classList.add('landed');                   /* its own dotted height, if it has one */
    sfx('click', .3);
    [srcCls, dstCls].forEach(c => rtDim(c).classList.add('eq'));
    await wait(REDUCED ? 200 : 1150);
    [srcCls, dstCls].forEach(c => rtDim(c).classList.remove('eq'));
    await wait(REDUCED ? 80 : 320);
  }

  /* 5. and the copy is carried home: it closes on the trapezium's right
        side, the board closing round the two of them, and the copy's own h
        is squeezed out of the join -- the trapezium's is the whole's now */
  async function rtJoinCopy() {
    const vb0 = (rtrapSvg.getAttribute('viewBox') || RT_VB).split(/\s+/).map(Number);
    const vb1 = RT_VB.split(/\s+/).map(Number);
    const from = rk.split, to = rk.join, x0 = rtX, x1 = rk.pair;
    rtDim('copy-h').classList.add('gone');
    rtX = x1;
    await tween(REDUCED ? 220 : 1450, p => {
      const tx = from + (to - from) * p;
      rtCopyAt(tx, 180);
      rtCopyShift(tx - to);
      rtScene.setAttribute('transform', 'translate(' + fmt(x0 + (x1 - x0) * p) + ' 0)');
      rtrapSvg.setAttribute('viewBox', vb0.map((v, i) => fmt(v + (vb1[i] - v) * p)).join(' '));
    }, easeInOut);
    rtCopy.classList.remove('flying');
    rtScene.insertBefore(rtCopy, rtArt);           /* landed: under the trapezium */
    rtGlow();
    sfx('correct', .45);
  }

  /* a name arrives: its arrow grows along the side (and the dotted height
     with it, where there is one), then the heads and the letter come on */
  async function rtDraw(cls, ms) {
    const g = rtDim(cls);
    await Promise.all(Array.from(g.querySelectorAll('.d-arrow, .d-height')).map(l => growLine(l, ms || 950)));
    g.classList.add('on');
    sfx('click', .3);
    await wait(REDUCED ? 80 : 340);
  }

  /* a name already in place, without the choreography */
  function rtSet(cls, gone) {
    const g = rtDim(cls);
    g.querySelectorAll('.d-arrow, .d-height').forEach(l => { l.style.opacity = 1; });
    g.classList.add('on');
    g.classList.toggle('gone', !!gone);
  }

  /* the outline of the whole glows, as one */
  function rtGlow() {
    rtrapShape.classList.remove('lit-rect');
    void rtrapShape.offsetWidth;
    rtrapShape.classList.add('lit-rect');
  }

  /* the two names along the top become one, a + b -- and the bottom's too */
  async function rtMerge() {
    ['top-a', 'top-b', 'bot-b', 'bot-a'].forEach(c => rtDim(c).classList.add('gone'));
    await wait(REDUCED ? 60 : 280);
    await Promise.all([rtDraw('top-ab', 1000), rtDraw('bot-ab', 1000)]);
  }

  /* a length is named in the working -- typed, or a word of a copy becoming
     it -- and its arrows flare once over the top where they stand, lit or
     not: the whole's a + b and h while the pair stands, the trapezium's own
     a, b and h once it stands alone (user, 2026-09-30) */
  function rtFlash(w) {
    const alone = rtrapShape.classList.contains('alone');
    const cls = w === 'h' ? ['left-h'] : alone ? ['top-a', 'bot-b'] : ['top-ab', 'bot-ab'];
    cls.forEach(c => {
      const g = rtDim(c);
      if (!g) return;
      g.classList.remove('flash');
      void g.getBoundingClientRect();           /* a reflow, so the run restarts */
      g.classList.add('flash');
    });
  }

  /* a key word has landed in the working: light what it names */
  function onRtWord(w) {
    if (w === 'ab') {
      ['top-a', 'bot-b', 'top-b', 'bot-a', 'top-ab', 'bot-ab'].forEach(c => rtDim(c).classList.add('lit'));
      rtFlash('ab');
      return;
    }
    if (w === 'h') { ['left-h', 'copy-h'].forEach(c => rtDim(c).classList.add('lit')); rtFlash('h'); return; }
    /* the trapezium itself: it swells once */
    rtrapShape.classList.remove('pulse');
    void rtrapShape.offsetWidth;
    rtrapShape.classList.add('pulse');
    setTimeout(() => rtrapShape.classList.remove('pulse'), 700);
  }

  /* Swiftee's line from its box beside the working, a piece at a time, the
     box refitted to each (rpSay's way) -- and fitted before the bird is
     brought up, for the reason quizSay gives */
  async function rtTalk(text) {
    rtFit(firstPiece(text));
    await speakerUp(rtNoteTxt);
    feedbackGen++;
    rtNoteCaret.hidden = true;
    swiftee.hold('talking');
    const said = sayPieces(rtNoteTxt, text, piece => rtFit(piece));
    rtrapText.classList.add('show');
    await said;
    swiftee.release();
  }

  /* a copy of a line's right-hand side peels off under its "=" (copyLine),
     into this working */
  const rtCopyLine = (from, segs, widest) => copyLine(from, segs, widest, rtrapLines);
  /* one step of the copy: the length the changing word names flares on the
     drawing, and the line eases to its next form */
  async function rtStep(txt, segs, w) {
    rtFlash(w);
    await wait(REDUCED ? 60 : 260);
    await morphTo(txt, rhsOf(segs), false, true);
    await wait(REDUCED ? 200 : 900);
  }

  /* a line of working, said along with */
  async function rtWork(segs) {
    swiftee.hold('talking');
    const line = await showTypedLine(segs, rtrapLines, onRtWord);
    swiftee.release();
    return line;
  }

  /* the lines of working step back together */
  async function rtClear() {
    const lines = Array.from(rtrapLines.children);
    if (!lines.length) { rtrapLines.style.fontSize = ''; return; }
    lines.forEach(l => l.classList.add('off'));
    await wait(REDUCED ? 100 : 420);
    lines.forEach(l => l.remove());
    rtrapLines.style.fontSize = '';           /* a pair that closed up to fit (copyLine) */
  }

  /* the whole as the first scene leaves it, without the choreography: for
     a replay of, or a jump into, the second scene */
  function rtWhole(kind) {
    buildRtrap(kind);
    const outline = rtArt.querySelector('.shape-outline');
    outline.style.strokeDasharray = 'none';
    outline.style.strokeDashoffset = '0';
    rtArt.querySelector('.shape-fill').style.opacity = 1;
    rtrapShape.classList.add('marked');
    rtX = rk.pair;
    rtScene.setAttribute('transform', 'translate(' + fmt(rtX) + ' 0)');
    rtCopy.classList.add('show');
    rtCopyAt(rk.join, 180);
    rtCopyShift(0);
    rtScene.insertBefore(rtCopy, rtArt);
    /* the copy's own h went into the join; the trapezium's is the whole's */
    ['top-a', 'top-b', 'bot-b', 'bot-a', 'copy-h'].forEach(c => rtSet(c, true));
    ['left-h', 'top-ab', 'bot-ab'].forEach(c => rtSet(c, false));
  }

  /* ---- the whole: the trapezium, and a copy that completes it ---- */
  async function rtArea(kind, entry) {
    lockInput(true);
    sceneStart(entry);
    holdBird();                  /* Swiftee stays at the heading for the whole derivation */
    promptReserve(longest(rtHeadLines(kind)));
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    board.classList.add('sec7');

    /* 1. the board is cleared for the trapezium. The first time the cards
          fade under it; after that the last kind's drawing and working fade
          and Swiftee hops back up to the heading */
    const wasOn = rtrap.classList.contains('on') && !!rtArt.firstChild;
    /* The shape draws itself first and Swiftee comes up to the heading after
       it (user, 2026-09-30): a bird standing anywhere on the board goes
       behind it now, and the heading's room is held open, empty, so the
       drawing is not moved down when the bird arrives in it. */
    board.classList.add('head-held');
    const wipe = () => { promptTxt.textContent = ''; caret.hidden = true; };
    if (wasOn) {
      const clearing = rtClear();
      rtNoteClear();
      rtrapSay.classList.remove('show');
      rtrapShape.classList.add('away');
      const spot = [rtrapMascot, boardMascot].find(m => m.classList.contains('in'));
      if (spot) await mascotJumpOut(spot, wipe);
      await clearing;
      await wait(REDUCED ? 100 : 360);
    } else if (boardMascot.classList.contains('in')) {
      await mascotJumpOut(boardMascot, wipe);
    }
    rtrap.classList.remove('wide');              /* the drawing has the whole width until the working */
    rtrapSay.classList.remove('show');
    rtrapLines.textContent = '';
    rtrapLines.classList.remove('rule');
    buildRtrap(kind);
    rtrapShape.classList.remove('away');
    rtrap.classList.add('deriv');            /* the derivation's board again */
    if (!wasOn) {
      await wait(REDUCED ? 150 : 480);
      rtrap.classList.add('on');
      rtrap.setAttribute('aria-hidden', 'false');
      await wait(120);
    }
    await revealShape(rtrapShape);
    await wait(200);
    rtrapShape.classList.add('marked');
    if (rk.sqL || rk.sqR) sfx('click', .35);
    await wait(360);
    await heading(rk.say.here);
    board.classList.remove('head-held');     /* the bird holds the row now */
    await wait(1100);

    /* 2. its sides are named where it stands, in the middle of the board, as
          Swiftee says them: a along the top, b along the bottom, h up the
          left */
    let said = heading(rk.say.sides);
    await wait(400);
    await rtDraw('top-a');
    await rtDraw('bot-b');
    await rtDraw('left-h');
    await said;
    await wait(1000);

    /* 3. and then it moves aside: the window opens out to the right, which
          carries the trapezium, standing still in the drawing, across into
          the left half of the board -- a whole half free beside it */
    said = heading(rk.say.room);
    await rtZoom(rk.stageBox, 1500);
    await said;
    await wait(700);

    /* 4. a copy is popped out of it, takes a colour of its own, slides
          across into the free half and flips upside down there: two of the
          same shape now, half the board each */
    said = heading(rk.say.copy);
    await rtMakeCopy();
    await said;
    await wait(420);
    said = heading(rk.say.flip);
    await rtSplitCopy();
    await rtFlipCopy();
    await said;
    await wait(700);

    /* 5. and the copy is given the trapezium's own lengths, one at a time:
          each name starts on the side it was measured from and travels
          across to the side of the copy that is the same */
    said = heading(rk.say.eqA);
    await rtCarry('top-a', 'bot-a');
    await said;
    await wait(200);
    said = heading(rk.say.eqB);
    await rtCarry('bot-b', 'top-b');
    await said;
    await wait(200);
    said = heading(rk.say.eqH);
    await rtCarry('left-h', 'copy-h');
    await said;
    await wait(700);

    /* 6. the two are put together: the copy closes on the trapezium's right
          side and the whole is a rectangle or a parallelogram -- and the two
          names along each of its sides become one, a + b */
    said = heading(rk.say.made);
    await rtJoinCopy();
    await said;
    await wait(1100);

    said = heading(rk.say.sum);
    await wait(400);
    await rtMerge();
    await said;
    await wait(1200);
  }

  /* ---- the half ----
     A fresh entry (Replay, or the jump menu) finds the first scene's
     drawing gone and puts the whole back as it was left. */
  async function rtHalf(kind, entry) {
    lockInput(true);
    sceneStart(entry);
    holdBird();                  /* ...and beside the working, once it has hopped down */
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    board.classList.add('sec7');
    rtrap.classList.add('on');
    /* the derivation's own board: its drawing is the widest thing in the
       mission -- the pair of trapeziums is two and a half times as wide as
       it is tall -- so it takes half the width rather than the working
       layout's two fifths (see `.rtrap.wide.deriv`). The practice scenes
       share `.wide` and clear this again: their working runs to the longest
       lines in the section and keeps the wider column. */
    rtrap.classList.add('deriv');
    rtrap.setAttribute('aria-hidden', 'false');
    if (rk !== kind || !rtArt.firstChild || !rtCopy.classList.contains('show')) rtWhole(kind);
    rtrapLines.textContent = '';
    rtrapLines.classList.remove('rule');
    /* the last kind's closing line must not show while the row comes back */
    rtNoteClear();
    const mine = runToken;

    /* 7. the pair glides into the left half of the board, the window closing
          round it as it goes, in one move; Swiftee hops down to the right
          half beside its box -- fitted to its first line before the bird
          lands -- and says what is being worked out (user, 2026-09-30) */
    rtrapSay.classList.add('show');
    if (rtrap.classList.contains('wide')) { rtrapSvg.setAttribute('viewBox', rk.pairBox); await wait(120); }
    else await rtGlide(rk.pairBox);
    await wait(REDUCED ? 100 : 360);
    rtFit(firstPiece(rk.say.area));
    if (boardMascot.classList.contains('in')) await hopBetween(boardMascot, rtrapMascot);
    else if (!rtrapMascot.classList.contains('in')) await mascotJumpIn(rtrapMascot);
    await wait(REDUCED ? 100 : 320);
    await rtTalk(rk.say.area);
    await wait(REDUCED ? 100 : 360);

    /* the whole's area from the two lengths it has just named, each lit on
       the drawing as it is typed; then a copy of the line's right-hand side
       peels off under its "=" and is worked there, page 4's way: base
       becomes (a + b), then height becomes h, each length flaring on the
       drawing as its word lands. The "=" of the copy stands under the "="
       of the line it came off, and the left-hand side is not said again. */
    const total = await rtWork(rk.lines.total);
    await wait(REDUCED ? 200 : 900);
    const work = await rtCopyLine(total, rhsOf(rk.lines.total), rhsOf(rk.lines.total));
    const workTxt = work.querySelector('.txt');
    await wait(REDUCED ? 200 : 700);
    await rtStep(workTxt, rk.lines.totalA, 'ab');
    await rtStep(workTxt, rk.lines.totalB, 'h');
    rtGlow();
    await wait(REDUCED ? 300 : 1400);
    await showNext();
    if (mine !== runToken) throw CANCELLED;

    /* 8. the copy fades to a dashed outline: the trapezium is exactly half
          of the whole, and swells once as it is named */
    await rtClear();
    rtDims.querySelectorAll('.d-group').forEach(g => g.classList.remove('lit'));
    rtrapShape.classList.add('ghost');
    await wait(REDUCED ? 100 : 420);
    const half = rtTalk(rk.say.half);
    await wait(REDUCED ? 100 : 600);
    onRtWord('trap');
    await half;
    await wait(REDUCED ? 300 : 1400);

    /* 9. straight on (user, 2026-09-30): the copy goes; the trapezium comes
          back to the middle of its half with its own names and its parallel
          marks, and its area is written: half of the whole's, each part lit
          on the drawing as it is typed -- and the rule in words follows,
          one flow from "exactly half" to the one Next at the end */
    rtrapShape.classList.add('alone');
    /* the copy's h went into the join; the trapezium's own is already back */
    ['top-ab', 'bot-ab', 'copy-h'].forEach(c => rtDim(c).classList.add('gone'));
    await wait(REDUCED ? 100 : 500);
    ['top-a', 'bot-b', 'left-h'].forEach(c => rtDim(c).classList.remove('gone'));
    /* back to the middle of its column, and the window closes round it so
       it fills the column instead of sitting small in the pair's box */
    await Promise.all([rtSlide(rk.home), rtZoom(rk.alone, 820)]);
    rtrapShape.classList.add('parallel');
    sfx('click', .3);
    await wait(REDUCED ? 100 : 400);
    rtrapLines.classList.add('rule');
    await rtTalk(rk.say.so);
    await wait(REDUCED ? 100 : 360);
    const fin = await rtWork(rk.lines.final);
    await wait(REDUCED ? 300 : 1100);

    /* 10. the rule in words: a copy of the line peels off under its "=",
           and there (a + b) becomes the sum of the parallel sides and h the
           height, each flaring on the drawing as it is said */
    const said = rtTalk(rk.say.rule);
    await wait(REDUCED ? 100 : 500);
    const rule = await rtCopyLine(fin, rhsOf(rk.lines.final), rk.lines.ruleB);
    const ruleTxt = rule.querySelector('.txt');
    await wait(REDUCED ? 200 : 700);
    await rtStep(ruleTxt, rk.lines.ruleA, 'ab');
    await rtStep(ruleTxt, rk.lines.ruleB, 'h');
    await said;
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
    await wait(REDUCED ? 400 : 2600);
    await showNext();
  }

  /* Only the scalene derivation is played now (trapMatch, the right-angled
     pair and the isosceles pair are out of the mission -- rtArea/rtHalf stay
     generic over every kind in RT_KINDS regardless, so re-adding one later
     is a MISSION entry and a wrapper away): the whole, straight on into the
     half (no Next between them -- the derivation is one piece), then Next
     and on to the numbers. Its own function, so Replay and the jump menu
     can still re-enter it on its own. The right-angled and isosceles
     wrappers stay defined, unused, for the same reason. */
  async function rtrapArea() { await rtArea(RT_KINDS.right, rtrapArea); await rtrapHalf(); }
  async function rtrapHalf() { await rtHalf(RT_KINDS.right, rtrapHalf); await scalArea(); }
  async function scalArea()  { await rtArea(RT_KINDS.scalene, scalArea);  await scalHalf(); }
  async function scalHalf()  { await rtHalf(RT_KINDS.scalene, scalHalf);  await trapNumbers(); }
  async function isoArea()   { await rtArea(RT_KINDS.iso, isoArea);       await isoHalf(); }
  async function isoHalf()   { await rtHalf(RT_KINDS.iso, isoHalf);         await trapNumbers(); }

  /* ---------- section 9, the practice: the trapezium's area in use ----------
   * Four questions on what the derivation built, a Next between each, on
   * the rhombus practice's pattern (user, 2026-09-30): the derivation's
   * drawing fades, and a figure built for each question draws itself in
   * the middle of the empty board, slowly, takes its height, its parallel
   * marks and its three measurements before a word is said, and then
   * glides into the left half of the board while the right half is given
   * to the question.
   *
   *   1. page 25, the values (trapNumbers), page 15's way: Swiftee stays at
   *      the heading, the formula builds itself in the right half with a, b
   *      and h as empty boxes, and the three measurements are dragged into
   *      them in order -- every drop answered in a sentence in the heading
   *      -- then the area is chosen from three, answered the same way, and
   *      the working simplifies itself under the formula
   *   2. page 26 (trapPractice1), page 16's way: the bird hops down into
   *      the right half and asks from its box -- the sum of the parallel
   *      sides, then the height -- three answers to each, one by one, and
   *      every verdict a sentence in the box
   *   3. page 27 (trapPractice2), on the board page 26 left standing: the
   *      area, from the same box, and the working under the answers
   *   4. page 28 (trapPractice3), the check for understanding: one
   *      trapezium, one question, three answers, and the working held back
   *      until the learner has answered
   *
   * All three figures are drawn in page 16's scale -- the 440-wide box of
   * pFigRhombus, lengths at 19, arrowheads at 6, an outline of 5 -- and
   * all three stand the same height, so a line, an arrow or a label is the
   * same weight on every page and the shape is the same size on each. */
  const rtrapPractice = document.getElementById('rtrapPractice');
  const rtFigRow      = document.getElementById('rtFigRow');
  const rtrapQuiz     = document.getElementById('rtrapQuiz');
  const rtrapFormula  = document.getElementById('rtrapFormula');
  const tpSlots       = Array.from(rtrapFormula.querySelectorAll('.fslot'));
  const rtrapTray     = document.getElementById('rtrapTray');
  const tpChips       = Array.from(rtrapTray.querySelectorAll('.chip'));
  const rtrapQs       = document.getElementById('rtrapQs');
  const rtrapPTray    = document.getElementById('rtrapPTray');
  const rtrapPSay     = document.getElementById('rtrapPSay');
  const rtrapPMascot  = document.getElementById('rtrapPMascot');
  const rtrapPText    = document.getElementById('rtrapPText');

  const TP = {
    steps:   T('p27Steps'),
    read:    T('p28Look'),
    area:    T('p29Ask'),
    areaOk:  T('fbCorrectBang')
  };
  const TP_GHOST = [TP.read, TP.area, TP.areaOk];
  const TP_STEPS = [
    [{ t: T('areaAbbrev') + ' = ½ × ' }, { t: '(' + T('wordSumOfParallelSides') + ')', w: 'ab' }, { t: ' × ' }, { t: T('wordPerpHeight'), w: 'h' }],
    [{ t: T('areaAbbrev') + ' = ½ × ' }, { t: '(8 + 14)', w: 'ab' }, { t: ' × ' }, { t: '6', w: 'h' }],
    [{ t: T('p27WorkShort')[0] }],
    [{ t: T('p27WorkShort')[1] }],
    [{ t: T('areaAbbrev') + ' = ' }, { t: SQCM(66), w: 'trap' }]
  ];

  /* ---- the figures ----
   * A trapezium in page 16's 440 x 250 box, from its four corners: the two
   * parallel sides measured on arrows above and below, the height dotted
   * in from one corner to the opposite parallel side with a right angle at
   * its foot, and one chevron on each parallel side. `hgt` says which
   * corner the height drops from and which way its label and mark sit. */
  function figTrap(key, name, P, labels, hgt, single) {
    const pts = [P.TL, P.TR, P.BR, P.BL];
    const art =
      '<polygon class="shape-fill" clip-path="url(#wipeFig' + key + ')" points="' + pts.map(pt).join(' ') + '" />' +
      '<path class="shape-outline" d="M' + pts.map(p => fmt(p.x) + ' ' + fmt(p.y)).join(' L') + ' Z" fill="none" stroke-width="5" />';
    const yT = P.TL.y - 24, yB = P.BL.y + 24;
    let over =
      figMeasure('d-top rt-len', { x: P.TL.x, y: yT }, { x: P.TR.x, y: yT }, labels.a, [], false, PF) +
      figMeasure('d-bot rt-len', { x: P.BL.x, y: yB }, { x: P.BR.x, y: yB }, labels.b, [], false, PF);
    /* The height: straight down from the parallel side `hgt.from` sits on
       to the other one. It starts at that corner, unless `hgt.x` names a
       point along the side to start from instead -- on a trapezium whose
       slanted side leans only a little, a height dropped from the corner
       runs alongside that side the whole way down and the two read as one
       line, so it is set in far enough to be plainly its own. */
    const corner = P[hgt.from];
    const from = { x: hgt.x == null ? corner.x : hgt.x, y: corner.y };
    const foot = { x: from.x, y: hgt.from.charAt(0) === 'T' ? P.BL.y : P.TL.y };
    const M = 12, up = foot.y > from.y ? -1 : 1, side = hgt.side, hv = rhUnit(foot, from);
    over += '<g class="d-group d-hgt">' +
      figLine('d-height', from, foot) + figHead(from, -hv.x, -hv.y, PF.head) + figHead(foot, hv.x, hv.y, PF.head) +
      '<path class="d-mark" d="M' + fmt(foot.x) + ' ' + fmt(foot.y + up * M) + ' H' + fmt(foot.x + side * M) + ' V' + fmt(foot.y) + '" />' +
      '<text class="d-label" x="' + fmt(foot.x + side * 10) + '" y="' + fmt((from.y + foot.y) / 2) + '" font-size="' + PF.font + '" text-anchor="' + (side > 0 ? 'start' : 'end') + '" dominant-baseline="middle">' + labels.h + '</text>' +
    '</g>';
    over += '<g class="rt-par">' + parMark(P.TL, P.TR, single) + parMark(P.BL, P.BR, single) + '</g>';
    return figShell(key, name, art, over, PF_H, PF_W);
  }
  /* The three figures, in the box's units. Every one stands 150 tall, from
     y = 50 to y = 200, and is centred in the box, so the three take the
     same room and their labels sit at the same heights; the widths are to
     each figure's own scale. */
  const TP_FIGS = {
    /* 8, 14 and 6 at 25 units to the centimetre: the bottom 350 wide, the
       top 200 and set in */
    n:  { P: { TL: { x: 109, y: 50 }, TR: { x: 309, y: 50 }, BR: { x: 395, y: 200 }, BL: { x: 45, y: 200 } },
          labels: { a: CM(8), b: CM(14), h: CM(6) }, hgt: { from: 'TL', side: 1 } },
    /* 13, 20 and 10 at 15 units to the centimetre: the bottom 300, the top
       195 */
    p:  { P: { TL: { x: 120, y: 50 }, TR: { x: 315, y: 50 }, BR: { x: 400, y: 200 }, BL: { x: 100, y: 200 } },
          labels: { a: CM(13), b: CM(20), h: CM(10) },
          /* its left side leans only 20 units over the whole drop, so the
             height is set in from the corner (user, 2026-09-18): dropped
             from the corner itself the two lines start at the same point
             and stay a hair apart all the way down, and a learner reads
             them as one */
          hgt: { from: 'TL', side: 1, x: 170 } },
    /* the check for understanding, 30, 40 and 15 at 10 units to the
       centimetre: 300 on top, 400 below, its right side square, so the
       height is plainly the distance between the two parallel sides and
       not one of the slanted ones */
    c:  { P: { TL: { x: 120, y: 50 }, TR: { x: 420, y: 50 }, BR: { x: 420, y: 200 }, BL: { x: 20, y: 200 } },
          labels: { a: CM(30), b: CM(40), h: CM(15) }, hgt: { from: 'TL', side: 1 } }
  };
  /* one chevron to a parallel side, the same mark on each, which is all
     "parallel" needs said */
  const tpFig = (key, name) => figTrap(key, name || '', TP_FIGS[key].P, TP_FIGS[key].labels, TP_FIGS[key].hgt, true);
  const tpFigEl = key => figEl(key, rtFigRow);

  /* a figure put up in the row, unseen yet: in page 16's scale and at the
     size it will keep (p-fig), so the glide into the left half is a slide
     and never a resize */
  function tpPutFig(html) {
    rtFigRow.innerHTML = html;
    fitFigArt(rtFigRow);
    rtFigRow.classList.remove('off', 'stepped', 'working');
    rtFigRow.classList.add('single');
    const f = rtFigRow.querySelector('.fig');
    f.classList.add('p-fig');
    rtrapPractice.classList.add('on');
    return f;
  }

  /* a figure already drawn, with all its marks, without the choreography:
     for a replay of, or a jump into, a question that inherits its figure */
  function tpEnsureFig(key, html) {
    if (tpFigEl(key)) return false;
    const f = tpPutFig(html || tpFig(key));
    const outline = f.querySelector('.shape-outline');
    outline.style.strokeDasharray = 'none';
    outline.style.strokeDashoffset = '0';
    f.querySelector('.shape-fill').style.opacity = 1;
    f.querySelectorAll('.d-arrow, .d-height').forEach(l => { l.style.opacity = 1; });
    f.querySelectorAll('.d-group').forEach(g => g.classList.add('on', 'marked'));
    f.querySelectorAll('.par-mark').forEach(m => m.classList.add('on'));
    return true;
  }

  /* ---- a figure draws itself on the empty board (pages 25, 26 and 28) ----
   *   1. the trapezium, slowly, and with no instruction anywhere: there is
   *      nothing to read but the shape, and Swiftee waits behind the board
   *   2. the perpendicular height drops in dotted and squares off at its
   *      foot; then one chevron lands on the top parallel side and the same
   *      one on the bottom -- the pair is named before it is measured
   *   3. the three measurements arrive in turn -- above, below, beside the
   *      height -- each popping in on its own arrow, and its line glowing
   *      for a moment as the number lands */
  async function tpDrawFig(html) {
    const fig = tpPutFig(html);
    await wait(REDUCED ? 120 : 420);
    await revealShape(fig, REDUCED ? 120 : 1200, REDUCED ? 80 : 760);
    await wait(REDUCED ? 120 : 560);

    const hgt = fig.querySelector('.d-hgt');
    await growLine(hgt.querySelector('.d-height'), REDUCED ? 120 : 1000);
    hgt.classList.add('marked');
    sfx('click', .35);
    await wait(REDUCED ? 120 : 620);

    for (const m of Array.from(fig.querySelectorAll('.par-mark'))) {
      m.classList.add('on');
      sfx('click', .28);
      await wait(REDUCED ? 60 : 460);
    }
    await wait(REDUCED ? 100 : 420);

    for (const sel of ['.d-top', '.d-bot', '.d-hgt']) {
      const g = fig.querySelector(sel);
      /* the pop belongs to the label's arrival, so it is armed here and
         fires when the group comes on (CSS) rather than now */
      g.querySelector('.d-label').classList.add('pop');
      if (g.classList.contains('d-hgt')) {
        /* its line is already drawn: only the measurement is due */
        g.classList.add('on');
        sfx('click', .35);
        await wait(REDUCED ? 120 : 520);
      } else {
        await showDimGroup(g);
      }
      await tnFlash(fig, sel);
      await wait(REDUCED ? 100 : 320);
    }
    await wait(REDUCED ? 100 : 420);
    return fig;
  }

  /* a value lands in the working or the formula: the part of the figure it
     names lights up */
  function tpLight(key, what) {
    const f = tpFigEl(key);
    if (!f) return;
    const cls = { a: '.d-top', b: '.d-bot', ab: '.d-top, .d-bot', h: '.d-hgt' }[what];
    if (cls) f.querySelectorAll(cls).forEach(g => g.classList.add('lit'));
  }
  /* a key word has landed in a figure's working: a length lights the
     measurement it names, the result swells the figure once */
  function tpWordLighter(key) {
    return function (w) {
      if (w === 'ab' || w === 'h') { tpLight(key, w); return; }
      const f = tpFigEl(key);
      if (!f) return;
      f.classList.remove('pulse');
      void f.offsetWidth;
      f.classList.add('pulse');
      setTimeout(() => f.classList.remove('pulse'), 700);
    };
  }
  const onTpWord = tpWordLighter('n');

  /* the values go home between scenes: a replay may find them docked */
  function homeTpChips() {
    tpChips.forEach(c => { rtrapTray.appendChild(c); c.disabled = false; c.classList.remove('reveal', 'picked', 'dragging', 'reject'); });
    tpSlots.forEach(s => s.classList.remove('filled', 'over', 'correct', 'reject'));
  }

  /* ---- the common opening of a practice question, page 16's way ----
   * Whatever the last page left fades where it stands -- the panel's words
   * and answers, the figure, the derivation's lines -- and the bird goes
   * behind the board; only then, with nothing on the board to move, does
   * the layout change. The question that follows opens on a blank board
   * (user, 2026-09-30). `duck` is the only way in now: every question
   * draws its shape alone first. */
  async function tpOpen(again, duck) {
    lockInput(true);
    sceneStart(again);
    const mine = runToken;
    promptReserve(longest(TP_GHOST));
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    board.classList.add('sec7');
    rtrap.classList.add('on');
    rtrap.setAttribute('aria-hidden', 'false');
    rtrapShape.classList.add('away');
    rtrapLines.classList.remove('rule', 'steps');
    homeTpChips();
    rtrapQuiz.classList.remove('show');
    rtrapFormula.classList.remove('show');
    rtrapQs.classList.remove('show');
    rtrapQs.textContent = '';
    rtrapPTray.classList.add('off');

    /* 1. everything fades where it stands, and the bird leaves */
    tnPanel.classList.remove('show');
    tcPanel.classList.add('done');
    tcNote.classList.remove('show');
    rtrapSay.classList.remove('show');
    rtrapPSay.classList.remove('show');
    const cleared = clearFigures(rtFigRow);
    const clearing = rtClear();
    const spot = rtrapMascot.classList.contains('in') ? rtrapMascot
               : rtrapPMascot.classList.contains('in') ? rtrapPMascot
               : tcMascot.classList.contains('in') ? tcMascot : null;
    await wait(REDUCED ? 80 : 260);
    if (duck) await mascotJumpOut(spot || boardMascot);
    else if (spot) await hopBetween(spot, boardMascot);
    tcPanel.classList.add('off');
    await cleared;
    await clearing;

    /* 2. the board is blank: the layout can change with nothing on it to move */
    rtrap.classList.remove('wide', 'deriv', 'solve', 'cfu');
    tnClear();
    tcClear();
    rtrapLines.textContent = '';
    rtNoteClear();
    await wait(REDUCED ? 100 : 320);
    return mine;
  }

  /* ---------- 1. the values, found and then used (page 25) ----------
   * Page 15's flow (user, 2026-09-30): the learner carries the three
   * measurements into the formula before it is used, and every drop is
   * answered in a sentence from the heading, where Swiftee stays for the
   * whole page.
   *
   *   1. the trapezium draws itself on the empty board and takes its marks
   *      and its three measurements (tpDrawFig)
   *   2. Swiftee comes up beside the heading: "Let's find the area of this
   *      trapezium." The board halves -- the shape glides into the left
   *      half, the panel takes the right -- and the formula builds itself
   *      there a piece at a time, "Area = ½ × ( a + b ) × h", with a, b and
   *      h as empty boxes; the three lengths are dealt into the tray under
   *      it
   *   3. "Drag the three lengths into the formula." The boxes go in order:
   *      a first, then b, then h, each locked until the one before it is
   *      right. A wrong length is shaken off and told what the box wants;
   *      a right one lights the measurement it came from and the heading
   *      names it and asks for the next
   *   4. all three in: "That's Correct!" -- and straight on to the working,
   *      in the row the lengths have left (user, 2026-09-30): "Let's
   *      simplify it, step by step." -- "Area = ½ × ( 8 + 14 ) × 6"
   *      simplifies itself to "Area = 66 sq. cm", each step flaring the
   *      measurement on the drawing that it is about, and the shape
   *      swelling once at the answer; confetti, and Next */
  const tnPanel   = document.getElementById('tnPanel');
  const tnFormula = document.getElementById('tnFormula');
  const tnTray    = document.getElementById('tnTray');
  const tnWork    = document.getElementById('tnWork');

  const TN = {
    say:   T('p27Find'),
    drag:  T('p27Drag'),
    /* the verdict on each drop, page 15's way: a wrong length is told what
       the box wants, and each right one is named and the next asked for */
    wrong: {
      a: T('p27WrongA'),
      b: T('p27WrongB'),
      h: T('p27WrongH')
    },
    right: {
      a: T('p27RightA'),
      b: T('p27RightB')
    },
    first: T('p27FillFirst'),
    done:  T('fbCorrectBang'),
    solve: T('p27Simplify')
  };
  const TN_KEYS = ['a', 'b', 'h'];
  const TN_NEED = ['8', '14', '6'];
  const TN_GHOST = [TN.say, TN.drag, TN.wrong.a, TN.wrong.b, TN.wrong.h, TN.right.a, TN.right.b, TN.first, TN.done, TN.solve];
  /* the working the answer solves itself through, and the measurement each
     step is about: the step is simplified, then the side it came from flares
     on the shape, so the number on the board and the line on the drawing are
     never more than a beat apart */
  const TN_SOLVE = [
    { t: T('p27Work')[0], lit: '.d-top, .d-bot' },
    { t: T('p27Work')[1], lit: '.d-top, .d-bot' },
    { t: T('p27Work')[2], lit: '.d-hgt' },
    { t: T('p27Work')[3], lit: null }
  ];
  /* the formula, in the pieces it is revealed in; a piece with a `k` is one
     of the three boxes the values go into */
  const TN_FORMULA = [
    { t: T('areaWord') }, { t: '=' }, { t: '½' }, { t: '×' }, { t: '(' },
    { k: 'a', t: 'a' }, { t: '+' }, { k: 'b', t: 'b' }, { t: ')' },
    { t: '×' }, { k: 'h', t: 'h' }
  ];
  const TN_NAMES = { a: T('p27NameA'), b: T('p27NameB'), h: T('p27NameH') };
  /* the three measurements to carry into the formula, in an order that is
     not the formula's: reading them off the drawing is the question */
  const TN_CHIPS = [{ v: '14', t: CM(14) }, { v: '6', t: CM(6) }, { v: '8', t: CM(8) }];
  let tnChips = [];

  /* the panel as a scene that is not this one must find it: empty, unpainted */
  function tnClear() {
    tnPanel.classList.remove('show');
    tnFormula.textContent = '';
    tnWork.textContent = '';
    tnTray.textContent = '';
    tnTray.classList.remove('off');
    tnChips = [];
  }

  /* ---- page 25: the box in the formula IS the question ----
   * a, b and h are not letters with a question parked in the row under
   * them: each letter is a DROP SLOT standing in the formula, and the three
   * measurements sit in a tray beneath it. The learner reads a length off
   * the drawing and carries it to the letter it belongs to -- which is a
   * truer action than picking it out of a list -- and the answer lands
   * exactly where it will be read. The whole formula is built before any of
   * it shows, so the panel is its final size from the first frame. */
  function tnBuildLive() {
    tnClear();
    TN_FORMULA.forEach(part => {
      if (!part.k) {
        const el = document.createElement('span');
        el.className = 'tn-part';
        setTxt(el, part.t);
        tnFormula.appendChild(el);
        return;
      }
      const el = document.createElement('span');
      el.className = 'fslot tn-drop';
      el.dataset.k = part.k;
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '-1');
      el.setAttribute('aria-label', TN_NAMES[part.k]);
      const letter = document.createElement('i');
      letter.className = 'hint';
      setTxt(letter, part.t);                      /* the letter it stands for */
      el.appendChild(letter);
      tnFormula.appendChild(el);
    });
    /* and the values to carry into them */
    tnTray.innerHTML = TN_CHIPS.map(c =>
      '<button class="chip" type="button" data-len="' + c.v + '"><span>' + c.t + '</span></button>').join('');
    tnChips = Array.from(tnTray.querySelectorAll('.chip'));
  }
  const tnDrop = k => tnFormula.querySelector('.tn-drop[data-k="' + k + '"]');
  /* the boxes in the order they are filled: the first open and lit, the
     rest locked until the one before each is right (page 15's rule) */
  function tnArm() {
    TN_KEYS.forEach((k, i) => {
      const s = tnDrop(k);
      s.classList.toggle('locked', i > 0);
      s.classList.toggle('live', i === 0);
      if (i > 0) s.setAttribute('aria-disabled', 'true');
      else s.removeAttribute('aria-disabled');
    });
  }

  async function tnReveal() {
    for (const el of Array.from(tnFormula.children)) {
      el.classList.add('in');
      sfx('click', el.classList.contains('tn-part') ? .18 : .3);
      await wait(REDUCED ? 30 : 170);
    }
  }

  /* a measurement is pointed at for a moment, then left alone again: long
     enough to tie the number to its line, short enough not to stay */
  async function tnFlash(f, sel) {
    const gs = Array.from(f.querySelectorAll(sel));
    gs.forEach(g => g.classList.add('lit'));
    await wait(REDUCED ? 160 : 900);
    gs.forEach(g => g.classList.remove('lit'));
  }

  /* A flare OVER whatever is already lit, for the working: by the time the
     steps run, all three measurements are lit for good -- they are the
     values in the formula -- so a step cannot point at one by lighting it.
     It flares instead, and the shape is left exactly as it was. */
  function tnFlare(f, sel) {
    if (!sel) return;
    const gs = Array.from(f.querySelectorAll(sel));
    gs.forEach(g => {
      g.classList.remove('flash');
      void g.getBoundingClientRect();          /* restart it, even mid-flare */
      g.classList.add('flash');
    });
    setTimeout(() => gs.forEach(g => g.classList.remove('flash')), 1100);
  }
  /* and the whole shape swells once, for the answer */
  function tnPulse(f) {
    f.classList.remove('pulse');
    void f.offsetWidth;
    f.classList.add('pulse');
    setTimeout(() => f.classList.remove('pulse'), 700);
  }

  /* ---- the drag, page 15's way (dragLengths, generalised) ----
   * A copy of the chip follows the pointer, the slot under it lights, and a
   * release over a slot is judged. A chip may also be tapped and then a
   * slot tapped. The slots go in order: only the first open one takes a
   * drop, the rest are locked until it is right; a wrong length is shaken
   * off and stays in the tray, and each drop is answered in a sentence in
   * the heading (`say.first` for a locked slot, `say.wrong[i]` for the
   * wrong length, `say.right[i]` for a right one with more to come). A
   * skip docks them all itself; a replay takes the listeners off. */
  function dragOrdered(chips, slots, need, say, onDock) {
    return waitForScene(resolve => {
      let ldrag = null, lpicked = null, over = false;
      const filled = () => slots.filter(s => s.classList.contains('filled'));
      const locked = s => s.classList.contains('locked');
      const open   = s => !s.classList.contains('filled') && !locked(s);
      const slotAt = (x, y) => slots.find(s => {
        const r = s.getBoundingClientRect();
        return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
      }) || null;
      const clearOver = () => slots.forEach(s => s.classList.remove('over'));
      const unpick = () => { if (lpicked) lpicked.classList.remove('picked'); lpicked = null; };
      const unlock = s => { if (!s) return; s.classList.remove('locked'); s.classList.add('live'); s.removeAttribute('aria-disabled'); };
      /* Swiftee's sentence on a drop: not awaited, the chip is already on
         its way back or settling, and the next drop simply retypes over it
         (feedbackGen) */
      const tell = text => { if (text) heading(text).catch(() => {}); };

      const dock = (chip, slot, earned) => {
        slot.appendChild(chip);
        slot.classList.add('filled');
        slot.classList.remove('live');
        chip.classList.remove('picked', 'dragging');
        chip.disabled = true;
        markRight(slot);
        setTimeout(() => slot.classList.remove('correct'), 520);
        if (onDock) onDock(chip, slot, slots.indexOf(slot));
        sfx('correct', earned ? 1 : .55);
        if (earned) {
          swiftee.play('happy', 1);
          sfx('confetti', .55);
          requestAnimationFrame(() => burst(chip));
        }
      };

      const tryPlace = (chip, slot) => {
        if (!slot || slot.classList.contains('filled')) return;
        const i = slots.indexOf(slot);
        /* a later slot before the one that is open: the chip goes home,
           and the order is said */
        if (locked(slot)) {
          sfx('wrong');
          swiftee.play('confused', 1);
          markWrong(chip);
          setTimeout(() => chip.classList.remove('reject'), 430);
          tell(say.first);
          return;
        }
        if (chip.dataset.len !== need[i]) {
          sfx('wrong');
          swiftee.play('confused', 1);
          markWrong(slot);
          markWrong(chip);
          setTimeout(() => { slot.classList.remove('reject'); chip.classList.remove('reject'); }, 430);
          tell(say.wrong[i]);
          return;
        }
        dock(chip, slot, true);
        if (filled().length === slots.length) { finish(false); return; }
        unlock(slots[i + 1]);
        tell(say.right[i]);
      };

      const onDownL = e => {
        if (!interactive || over) return;
        const chip = e.currentTarget;
        if (chip.disabled) return;
        if (e.button !== undefined && e.button !== 0) return;
        ldrag = liftGhost(chip, e);
        chip.classList.add('dragging');
        unpick();
        sfx('click', .5);
        window.addEventListener('pointermove', onMoveL);
        window.addEventListener('pointerup', onUpL);
        window.addEventListener('pointercancel', onUpL);
        e.preventDefault();
      };
      const onMoveL = e => {
        if (!ldrag) return;
        moveGhost(ldrag, e.clientX, e.clientY);
        clearOver();
        const slot = slotAt(e.clientX, e.clientY);
        if (slot && open(slot)) slot.classList.add('over');
      };
      const onUpL = e => {
        if (!ldrag) return;
        window.removeEventListener('pointermove', onMoveL);
        window.removeEventListener('pointerup', onUpL);
        window.removeEventListener('pointercancel', onUpL);
        const d = ldrag;
        ldrag = null;
        clearOver();
        const slot = slotAt(e.clientX, e.clientY);
        dropGhost(d, slot, function () {
          d.el.classList.remove('dragging');
          if (slot) return tryPlace(d.el, slot);
          /* a tap, not a drag: the chip waits for a slot to be tapped */
          if (Math.hypot(e.clientX - d.start.x, e.clientY - d.start.y) < 6) {
            lpicked = d.el;
            d.el.classList.add('picked');
          }
        });
      };
      const onSlotTap = e => {
        if (!interactive || !lpicked) return;
        const chip = lpicked;
        unpick();
        tryPlace(chip, e.currentTarget);
      };

      const cleanup = () => {
        chips.forEach(c => c.removeEventListener('pointerdown', onDownL));
        slots.forEach(s => s.removeEventListener('click', onSlotTap));
        window.removeEventListener('pointermove', onMoveL);
        window.removeEventListener('pointerup', onUpL);
        window.removeEventListener('pointercancel', onUpL);
        if (ldrag) { ldrag.ghost.remove(); ldrag.el.classList.remove('dragging'); ldrag = null; }
        clearOver();
        unpick();
        skipFills.delete(fill);
        sceneWaiters.delete(teardown);
      };
      const finish = auto => {
        if (over) return;
        over = true;
        cleanup();
        lockInput(true);
        resolve();
      };
      /* a skip: the right lengths go in by themselves, each in its own slot */
      const fill = () => {
        if (over) return;
        need.forEach((v, i) => {
          const slot = slots[i];
          unlock(slot);
          if (slot.classList.contains('filled')) return;
          const chip = chips.find(c => c.dataset.len === v && !c.disabled);
          if (chip) dock(chip, slot, false);
        });
        finish(true);
      };
      /* a replay retires the scene while the drag is open */
      const teardown = () => { over = true; cleanup(); };

      chips.forEach(c => c.addEventListener('pointerdown', onDownL));
      slots.forEach(s => s.addEventListener('click', onSlotTap));
      sceneWaiters.add(teardown);
      skipFills.add(fill);
      lockInput(false);
    });
  }

  /* the practice trapezium, marked the way this scene wants it */
  const tnFig = () => tpFig('n');

  async function trapNumbers() {
    /* the bird goes behind the board: the shape draws itself alone */
    const mine = await tpOpen(trapNumbers, true);
    holdBird();                  /* up with its first line, and there for the whole page */
    promptReserve(longest(TN_GHOST));

    /* ---- 1. the trapezium draws itself, and takes its measurements ---- */
    const fig = await tpDrawFig(tnFig());

    /* ---- 2. Swiftee comes up beside the heading and says what this is for ---- */
    await heading(TN.say);
    await wait(REDUCED ? 120 : 520);

    /* ---- 3. the board halves: the shape left, the formula's panel right,
         built whole and unseen first so its room is right from the first
         frame ---- */
    tnBuildLive();
    tnPanel.classList.add('show');
    await layoutWide(rtrap, fig.querySelector('svg'), true, 'solve');

    /* ---- 4. a moment with the line, then the formula builds, and the
         three lengths are dealt under it ---- */
    await wait(REDUCED ? 200 : 1200);
    await tnReveal();
    await wait(REDUCED ? 120 : 460);
    await dealChips(tnChips);
    await wait(REDUCED ? 100 : 420);

    /* ---- 5. the drag, page 15's way: a, then b, then h, each drop answered
         in a sentence from the heading, and each right length lighting the
         measurement it came from ---- */
    tnArm();
    await heading(TN.drag);
    await wait(REDUCED ? 80 : 300);
    await dragOrdered(tnChips, TN_KEYS.map(tnDrop), TN_NEED,
      { first: TN.first, wrong: TN_KEYS.map(k => TN.wrong[k]), right: [TN.right.a, TN.right.b] },
      (chip, slot, i) => tpLight('n', TN_KEYS[i]));
    if (mine !== runToken) throw CANCELLED;

    /* ---- 6. all three in ---- */
    await wait(REDUCED ? 200 : 700);
    await heading(TN.done);
    swiftee.play('happy', 1);
    await wait(REDUCED ? 200 : 1100);

    /* ---- 7. and straight on to the working, in the row the lengths have
         left: the line simplifies itself a step at a time, each step
         flaring the measurement it is about, until only the answer is
         left ---- */
    await heading(TN.solve);
    await wait(REDUCED ? 120 : 420);
    const line = await showTypedLine([{ t: TN_SOLVE[0].t }], tnWork, null);
    tnFlare(fig, TN_SOLVE[0].lit);
    await wait(REDUCED ? 200 : 1100);
    const txt = line.querySelector('.txt');
    for (let i = 1; i < TN_SOLVE.length; i++) {
      const step = TN_SOLVE[i];
      await morphTo(txt, step.t, false);
      if (step.lit) tnFlare(fig, step.lit);
      else tnPulse(fig);
      await wait(REDUCED ? 200 : (i === TN_SOLVE.length - 1 ? 400 : 1100));
    }
    await wordsSettle();
    feedback(FEEDBACK.done);
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
    await wait(2600);
    await showNext();
    await trapPractice1();
  }

  /* 2. step by step to the answer -- SUPERSEDED, and out of MISSION: the
     working it played is now the tail of trapNumbers, on the board the
     learner found the values on. Kept, unplayed, the way the right-angled
     and isosceles derivations are: re-adding it is a MISSION entry and a
     hand-off away. */
  async function trapSteps() {
    lockInput(true);
    sceneStart(trapSteps);
    promptReserve(longest(TP_GHOST));
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    board.classList.add('sec7');
    rtrap.classList.add('on');
    rtrap.setAttribute('aria-hidden', 'false');
    rtrapShape.classList.add('away');
    rtrapPSay.classList.remove('show');
    rtrapQs.classList.remove('show');
    rtrapPTray.classList.add('off');
    /* the halved board of the values scene or of the check goes; the
       working layout is next */
    rtrap.classList.remove('deriv', 'solve', 'cfu');
    tnClear();
    tcClear();
    tpEnsureFig('n');
    const fig = tpFigEl('n');
    fig.querySelectorAll('.d-group').forEach(g => g.classList.remove('lit'));
    rtrapLines.textContent = '';
    rtrapLines.classList.remove('rule');
    rtrapLines.classList.add('steps');
    rtNoteClear();

    /* the formula and the values leave; the figure moves to the left half
       and Swiftee hops down to the right half */
    rtrapQuiz.classList.remove('show');
    await wait(REDUCED ? 100 : 460);
    rtrapSay.classList.add('show');
    await layoutWide(rtrap, fig.querySelector('svg'));
    await wait(REDUCED ? 100 : 260);
    if (boardMascot.classList.contains('in')) await hopBetween(boardMascot, rtrapMascot);
    else if (!rtrapMascot.classList.contains('in')) await mascotJumpIn(rtrapMascot);
    await wait(260);
    await rtTalk(TP.steps);
    await wait(300);

    /* the working, a line at a time, lighting the figure as it goes */
    swiftee.hold('talking');
    await showTypedLine(TP_STEPS[0], rtrapLines, onTpWord);
    swiftee.release();
    await wait(520);
    swiftee.hold('talking');
    await showSolveLine(rtrapLines, [TP_STEPS[1]].concat(T('p27WorkShort')), onTpWord);
    swiftee.release();
    await wait(300);
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
    await wait(2600);
    await showNext();
    await trapPractice1();
  }

  /* ---------- the question panel of pages 26 to 28 ----------
   * Page 16's panel over again (user, 2026-09-30): the board halves 50/50,
   * the trapezium keeps the left half, and Swiftee hops down into the
   * right half -- the bird at the left end of the answers, its box up over
   * its head and refitted to every line it says. The question is asked
   * from the box, the answers come up one by one under it, and every
   * verdict is said in the same box: red for a wrong pick, with what that
   * number is instead, green for the right one, with the working. The
   * working the right answer solves itself into goes under the answers.
   * Nothing is ever said over the drawing. */
  const tcPanel  = document.getElementById('tcPanel');
  const tcMascot = document.getElementById('tcMascot');
  const tcNote   = document.getElementById('tcNote');
  const tcGhost  = tcNote.querySelector('.type-ghost');
  const tcTxt    = tcNote.querySelector('.txt');
  const tcCaret  = tcNote.querySelector('.caret');
  const tcTray   = document.getElementById('tcTray');
  const tcWork   = document.getElementById('tcWork');
  speaker(tcTxt, tcMascot, () => tcNote.classList.remove('show', 'ok', 'bad'));

  /* the box fits the piece it is saying, and is fitted before the bird is
     brought up, for the reason quizSay gives (rpFit's way) */
  const tcFit = text => { setTxt(tcGhost, text); snug(tcGhost); };
  async function tcSay(text, tone) {
    tcFit(firstPiece(text));
    await speakerUp(tcTxt);
    feedbackGen++;
    tcNote.classList.remove('ok', 'bad');
    if (tone) tcNote.classList.add(tone);
    tcCaret.hidden = true;
    swiftee.hold('talking');
    const said = sayPieces(tcTxt, text, piece => tcFit(piece));
    tcNote.classList.add('show');
    await said;
    swiftee.release();
  }
  /* the panel as a scene that is not this one must find it: empty and
     unpainted. `data-page` names the page that last painted it, so the page
     that continues on another's board can tell whether it is there. */
  function tcClear() {
    tcPanel.classList.remove('show', 'off', 'done');
    tcNote.classList.remove('show', 'ok', 'bad');
    tcTxt.textContent = '';
    tcGhost.textContent = '';
    tcCaret.hidden = true;
    tcTray.innerHTML = '';
    tcTray.classList.remove('off');
    tcWork.textContent = '';
    tcWork.classList.remove('win');
    delete tcPanel.dataset.page;
  }
  /* the answers to a question that has been answered leave, so the next
     question's can take their room */
  async function tcRetire() {
    if (!tcTray.children.length) return;
    tcTray.classList.add('off');
    await wait(REDUCED ? 100 : 420);
    tcTray.innerHTML = '';
    tcTray.classList.remove('off');
  }
  /* one question from the box, over answers already built under it:
       - the question, then the answers one by one
       - a wrong answer is met with a sentence in red in the box
       - the right one: the other answers go, `onRight` lights what the
         answer was read off, and the verdict is said in green */
  async function tcAsk(q, chips, mine, onRight) {
    await tcSay(q.ask);
    await wait(REDUCED ? 100 : 320);
    await dealOneByOne(chips);
    await wait(REDUCED ? 80 : 200);
    await askChips(chips, q.right, chip => {
      tcSay(q.notes[chip.dataset.answer] || q.notes[q.wrongDefault], 'bad').catch(() => {});
    });
    if (mine !== runToken) throw CANCELLED;
    chips.filter(c => c.dataset.answer !== q.right).forEach(c => c.classList.add('gone'));
    if (onRight) await onRight();
    await tcSay(q.notes[q.right], 'ok');
    if (mine !== runToken) throw CANCELLED;
  }
  /* the board halves for the question: the panel is painted first, empty,
     with the first answers built unrevealed and the box fitted to the first
     line, so the bird's spot and the tray's room are laid out before it
     arrives (page 16's rule); then the shape glides into the left half, and
     Swiftee comes up from behind the board into the right */
  async function tcOpenPanel(fig, page, first, opts) {
    tcClear();
    tcPanel.dataset.page = page;
    const chips = practiceChips(opts, tcTray);
    tcFit(firstPiece(first));
    tcPanel.classList.add('show');
    await layoutWide(rtrap, fig.querySelector('svg'), true, 'cfu');
    await wait(REDUCED ? 120 : 620);
    await mascotJumpIn(tcMascot);
    await wait(REDUCED ? 100 : 260);
    return chips;
  }

  /* ---------- 3 and 4: the values read off a trapezium, and its area ----------
   * (pages 26 and 27)
   *
   * One unbroken piece across the Next that divides them: the same
   * trapezium, the same halved board, the same bird in the same panel, and
   * every value the learner names carried straight into the next thing it
   * is wanted for.
   *
   *   page 26
   *     1. the trapezium draws itself on the empty board and takes its marks
   *        and its three measurements (tpDrawFig)
   *     2. the board halves and Swiftee comes up into the right half: "Look
   *        at the trapezium and choose the correct values."
   *     3. "What is the sum of the parallel sides?" -- three answers, one by
   *        one. The right one lights both parallel sides and is worked out
   *        in the box; the other two go
   *     4. "What is the height?", with the dotted height lit from the moment
   *        the question is asked: the dotted line IS the question
   *
   *   page 27, on the board page 26 left, both values still lit on it
   *     5. "What is the area of the trapezium?" -- three answers; the right
   *        one is worked out in the box, then the answers go and the
   *        working solves itself in their place, from the formula down to
   *        165 sq. cm */
  const TV = {
    say: TP.read,
    qs: [
      { k: 'ab', ask: T('p28QSum'),
        opts: [{ v: '30', t: CM(30) }, { v: '33', t: CM(33) }, { v: '23', t: CM(23) }],
        right: '33', wrongDefault: '30',
        notes: {
          '30': T('p28Wrong30'),
          '23': T('p28Wrong23'),
          '33': T('p28RightSum')
        } },
      { k: 'h', ask: T('p28QHeight'), early: true,
        opts: [{ v: '13', t: CM(13) }, { v: '10', t: CM(10) }, { v: '20', t: CM(20) }],
        right: '10', wrongDefault: '13',
        notes: {
          '13': T('p28Wrong13'),
          '20': T('p28Wrong20'),
          '10': T('p28RightHeight')
        } }
    ]
  };
  const TA = {
    ask: TP.area,
    /* the right one, the product without the half, and the sum */
    opts: [{ v: '330', t: SQCM(330) }, { v: '165', t: SQCM(165) }, { v: '43', t: SQCM(43) }],
    right: '165', wrongDefault: '330',
    notes: {
      '330': T('p29Wrong330'),
      '43':  T('p29Wrong43'),
      '165': T('p29Right')
    },
    work: T('p29Work')
  };
  /* the practice trapezium of both pages */
  const tvFig = () => tpFig('p');
  const tvEnsureFig = () => tpEnsureFig('p', tvFig());

  /* 3. the sum of the parallel sides and the height, read off the figure */
  async function trapPractice1() {
    /* the bird goes behind the board: the shape draws itself alone */
    const mine = await tpOpen(trapPractice1, true);
    holdBird();                  /* the bird stays beside its box until Next */

    /* ---- 1. the trapezium draws itself, and takes its measurements ---- */
    const fig = await tpDrawFig(tvFig());

    /* ---- 2. the board halves, Swiftee comes up into the right half and
         says what this is for ---- */
    const chips = await tcOpenPanel(fig, 'tv', TV.say, TV.qs[0].opts);
    await tcSay(TV.say);
    await wait(REDUCED ? 200 : 900);

    /* ---- 3 and 4. one value at a time, each from the box ---- */
    for (let i = 0; i < TV.qs.length; i++) {
      const q = TV.qs[i];
      const cs = i === 0 ? chips : practiceChips(q.opts, tcTray);
      /* the height is lit as its question opens: the dotted line IS the
         question. The sum is not -- lighting both sides would answer it. */
      if (q.early) tpLight('p', q.k);
      await tcAsk(q, cs, mine, () => { tpLight('p', q.k); });
      if (i < TV.qs.length - 1) {
        await wait(REDUCED ? 200 : 1400);
        await tcRetire();
        await wait(REDUCED ? 80 : 240);
      }
    }

    await wait(REDUCED ? 200 : 1200);
    await showNext();
    await trapPractice2();
  }

  /* Page 27 opens on the board page 26 left standing rather than clearing
     it: the same trapezium, still measured and lit, still in the left half,
     and the bird still in the panel beside its box. That is what this has
     instead of tpOpen -- which would take all of it down. */
  async function tvOpen(again) {
    lockInput(true);
    sceneStart(again);
    const mine = runToken;
    promptReserve(longest(TP_GHOST));
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    board.classList.add('sec7');
    rtrap.classList.add('on');
    rtrap.setAttribute('aria-hidden', 'false');
    rtrapShape.classList.add('away');
    rtrapLines.classList.remove('rule', 'steps');
    rtrapLines.textContent = '';
    rtNoteClear();
    rtrapSay.classList.remove('show');
    rtrapPSay.classList.remove('show');
    homeTpChips();
    rtrapQuiz.classList.remove('show');
    rtrapFormula.classList.remove('show');
    rtrapQs.classList.remove('show');
    rtrapQs.textContent = '';
    rtrapPTray.classList.add('off');
    rtrap.classList.remove('wide', 'deriv', 'solve');
    tnClear();
    /* the bird is in the panel from page 26, and stays; anywhere else on
       the board -- a way in from a page whose bird stood by the working, or
       at the heading -- it goes behind the board first */
    for (const spot of [rtrapMascot, rtrapPMascot, boardMascot]) {
      if (spot.classList.contains('in')) await mascotJumpOut(spot);
    }
    return mine;
  }

  /* 4. the area of the same trapezium, out of the two values just found */
  async function trapPractice2() {
    const mine = await tvOpen(trapPractice2);
    holdBird();                  /* the bird stays beside its box until Next */

    /* whatever page 26 left is taken as given; a replay or a jump that has
       landed here without it -- or with the check's figure and panel, on a
       Back from page 28 -- builds it outright */
    const kept = tcPanel.dataset.page === 'tv' && !!tpFigEl('p');
    if (!kept) {
      if (tcMascot.classList.contains('in')) await mascotJumpOut(tcMascot);
      tcClear();
      if (!tpFigEl('p')) await clearFigures(rtFigRow);
      tvEnsureFig();
    }
    ['ab', 'h'].forEach(w => tpLight('p', w));
    rtrap.classList.add('cfu');
    tcPanel.dataset.page = 'tv';
    if (kept) {
      /* the height's answers go, and the area's take their room */
      await tcRetire();
    } else {
      tcFit(firstPiece(TA.ask));
      tcPanel.classList.add('show');
      await wait(REDUCED ? 120 : 620);
    }
    if (!tcMascot.classList.contains('in')) {
      await mascotJumpIn(tcMascot);
    }
    await wait(REDUCED ? 100 : 320);

    /* ---- 5. the area, from the box; then the working under the answers ---- */
    const chips = practiceChips(TA.opts, tcTray);
    await tcAsk(TA, chips, mine);
    /* the answers go, and the working takes their row (user, 2026-09-30) */
    await wait(REDUCED ? 200 : 900);
    await tcRetire();
    await wait(REDUCED ? 80 : 240);
    await showSolveLine(tcWork, TA.work);
    tcWork.classList.add('win');
    sfx('correct', .5);
    swiftee.play('proud', 1);
    skyConfetti(90, 2800);
    sfx('confetti', .7);
    feedback(FEEDBACK.done);
    await wait(REDUCED ? 300 : 2400);
    await showNext();
    await trapPractice3();
  }

  /* ---------- 5. the check for understanding (page 28) ----------
   * One trapezium, one question, and the two halves of the board given to
   * the two halves of the job: the figure is READ on the left, the question
   * is ANSWERED on the right, and neither ever stands on the other. This is
   * the assessment the section ends on, so nothing of the calculation is on
   * the board before the learner has answered: a formula shown before the
   * answer is half the answer.
   *
   *   1. the trapezium draws itself on the empty board and takes its marks
   *      and its three measurements (tpDrawFig)
   *   2. the board halves and Swiftee comes up into the right half: "What is
   *      the area of the trapezium?" -- three answers, one by one
   *   3. a wrong pick is told what that number is instead, in red in the
   *      box; the right one lights the two parallel sides and then the
   *      height on the figure -- the answer is read back off the
   *      measurements first -- and is worked out in green
   *   4. and only then do the answers go and the working solve itself in
   *      their place: 30 and 40 make 70, and half of 70 fifteens is 525
   *      sq. cm, which glows once */
  const TC = {
    ask: TP.area,
    /* the right one, the product without the half, and one side only */
    opts: [{ v: '525', t: SQCM(525) }, { v: '1050', t: SQCM(1050) }, { v: '450', t: SQCM(450) }],
    right: '525', wrongDefault: '1050',
    notes: {
      '1050': T('p30Wrong1050'),
      '450':  T('p30Wrong450'),
      '525':  T('p30Right')
    },
    /* the sum of the parallel sides first, then the halving: the two steps
       the formula is, in the order it is read in */
    work: T('p30Work')
  };
  const tcFig = () => tpFig('c');

  async function trapPractice3() {
    /* the bird goes behind the board: the shape draws itself alone */
    const mine = await tpOpen(trapPractice3, true);
    holdBird();                  /* the question's bird stays beside it while the learner solves */

    /* ---- 1. the trapezium draws itself, and takes its measurements ---- */
    const fig = await tpDrawFig(tcFig());

    /* ---- 2. the board halves and Swiftee comes up into the right half ---- */
    const chips = await tcOpenPanel(fig, 'tc', TC.ask, TC.opts);

    /* ---- 3. the question, the answers, and the verdicts, from the box:
         the right answer is read back off the figure before it is worked
         out -- the two parallel sides, then the height ---- */
    await tcAsk(TC, chips, mine, async () => {
      tpLight('c', 'ab');
      await wait(REDUCED ? 140 : 620);
      tpLight('c', 'h');
      await wait(REDUCED ? 140 : 520);
    });
    /* the answers go, and the working takes their row (user, 2026-09-30) */
    await wait(REDUCED ? 200 : 900);
    await tcRetire();
    await wait(REDUCED ? 80 : 240);

    /* ---- 4. and only now the working, which solves itself. One glow on
         the line it lands in -- the celebration points at the result rather
         than away from it ---- */
    await showSolveLine(tcWork, TC.work);
    tcWork.classList.add('win');
    sfx('correct', .5);
    swiftee.play('proud', 1);
    skyConfetti(90, 2800);
    sfx('confetti', .7);
    feedback(FEEDBACK.done);
    await wait(REDUCED ? 300 : 2600);
    await showNext();
    /* the next section continues from here: in QuadLand, the game this page is framed in carries on to its landings */
    if (window.parent !== window) window.parent.postMessage({ type: 'learning:done' }, location.origin);
  }

  async function introScene() {
    intro.classList.add('on');
    await wait(140);

    await hopIn();
    await wait(160);

    /* wave hello while the first line types out */
    swiftee.play('waving', 1);
    const wave = swiftee.ms('waving', 1);
    const t0 = performance.now();
    await say(GREETING[0]);
    const left = wave - (performance.now() - t0);
    if (left > 0) await wait(left);
    await wait(420);

    /* and talk along with the second */
    swiftee.hold('talking');
    await say(GREETING[1]);
    swiftee.release();
    await wait(900);

    bubble.classList.add('out');
    bubble.classList.remove('show');
    await wait(300);

    await introExit();
    intro.classList.remove('on');

    /* The board arrives. Swiftee stays behind it: the shapes draw themselves
       on an empty board, and the bird comes up with the line that names them
       (sceneWarmUp), not four seconds ahead of it. The heading's room is
       reserved before the board is seen -- the warm-up holds it either way,
       and taking it a moment later would open it under the first shape as it
       was being drawn. */
    board.classList.add('head-held');
    await showBoard();
    await wait(160);
  }

  /* ---------- go ---------- */
  async function boot() {
    lockInput(true);

    /* the loader has already waited on the webfont, so the console height
       measured here is the final one */
    await welcomeScreen();
    lockTrayHeight();

    sceneStart(sceneIntro);
    await sceneIntro();
  }

  /* Swiftee's greeting, and the board arriving behind it. Replaying it starts
     from a bare landscape again, so the board has to be taken back down: the
     one bit of undoing that belongs to a scene rather than to the generic
     teardown, since showBoard() is a no-op once the board is already up. */
  async function sceneIntro() {
    board.classList.remove('show');
    boardMascot.classList.remove('in');
    await introScene();

    /* The hand-off belongs to the scene, not to whoever called it: a replay
       re-enters this function directly, so anything sequenced by an enclosing
       function would be lost the moment the replay retired it. Every other
       scene chains to the next the same way. */
    sceneStart(sceneWarmUp);
    await sceneWarmUp();
  }

  /* The warm-up: the three shapes draw themselves, Swiftee names what they
     are, and round 1 opens. */
  async function sceneWarmUp() {
    lockInput(true);
    /* The heading's room is the scene's, from before the first shape is drawn
       until section 2 takes the board over: held open, so the bay is its final
       size for the whole warm-up and the shapes neither move nor resize when
       the line arrives or clears (see roomHeight). */
    board.classList.add('head-held');
    headStay = true;
    /* a replay comes back to shapes that may still carry their side names,
       zoomed in to where Swiftee's heading was */
    shapes.forEach(s => s.classList.remove('labelled'));
    unzoomBay();

    for (const shape of shapes) {
      await revealShape(shape);
      await wait(200);
    }
    await wait(180);

    /* the shapes are on the board: Swiftee jumps up from behind it and names
       what the learner is looking at, then the round takes the heading over
       with its own instruction */
    prompt.classList.add('show');
    await mascotWithLine(SHAPES_READY);
    swiftee.hold('talking');
    await typewrite(SHAPES_READY, SHAPES_READY.length * TYPE_MS);
    swiftee.release();
    await wait(1600);

    await startRound(1);
  }

  /* index.html loads this script once the locale is in, which can be after
     the window's load event has fired: then boot at once */
  if (document.readyState === 'complete') boot();
  else window.addEventListener('load', () => { boot(); }, { once: true });
})();
