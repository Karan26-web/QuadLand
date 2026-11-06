# Game Design Document: Spaceship Mission (QuadLand)
*Skill: area of quadrilaterals. Square = side × side · rectangle = length × width · parallelogram = base × height · rhombus = ½ × d₁ × d₂ · trapezium = ½ × (a + b) × h*

> Written for the LXD and the production team. The game follows the LXD's integrated flow (`docs/spacecraft.docx`, 13 screens) line by line. This document says how each beat is built, what was added on the brief's request (each addition is marked), why the maths is wired the way it is, and what is still open for the LXD. The LXD's review of the build (2026-11-05) is traced line by line in §11.

## 1. The brief, and how the build answers it
| Request (2026-10-29) | In the build |
|---|---|
| A space theme: a colourful nebula in dark space | Deep space is dark first: a navy sky with a soft blue-violet galactic band and dust lanes, and four nebulae (violet with a magenta heart, teal, lilac, rose-violet), each framing a part of the sky the camera dwells on (the title, the fleet, the water planet, the ringed giant). Pink lives only in their dense hearts and the gaps between them stay dark, so colour frames the subjects and the stars always show. It is baked into an HDR cubemap that every hull reflects. About 14,000 stars are drawn live on top: crisp points, densest along the band, that twinkle on their own clocks, now and then sparkle, and a few dozen carry four-point glints. A sun, a ringed giant, the ocean planet and two moons hang in it. |
| The reference frames' style and the water planet's colour theme | A stylised 3D animated-series look. The water planet's night is the frames' purple: an indigo zenith, a violet horizon glowing toward a lavender ringed giant, and a pink nebula band over a dark violet sea. |
| Camera work "more crazy than Sector Escape" | A new camera director (`src/engine/camera.js`), described in §5. |
| Introduce everything first, with the camera work in space | The intro cinematic: an engine close-up, a banked flyby, a whip pan to each of the five quad ships, then the five line up ahead of the commander and the camera rises straight above them while each ship's four sides trace on in light (user, 2026-10-30: "show the spacecrafts from top view once so that it can clearly visible … which shapes"), a vertigo dolly zoom with the planet looming, and a punch through the canopy glass. It can be skipped. |
| An interaction inside the ship to move to a water planet | Screen 2: steer the planet into the reticle, push the thrust lever (a hyperspace jump), hold DESCEND (re-entry and the cloud deck). Each step waits for the player and hints after a pause. |
| A water planet with living waves, inspired by Interstellar's water planet | A living sea: six Gerstner waves, ripples, foam, subsurface glow, a moon-glitter path, plankton sparkles after the scan. Mountain-sized waves roll on the horizon: they read first as mountains, then you see them move. §6. |
| Land quad ships on lands that rise from the water | Screens 3–12 (§3). |
| Optional: a landing simulation like the airplane game's | Used for the trip to the planet: steer, thrust, hold to descend, in the cockpit with the airplane game's guided, unfailable rhythm. The five landings keep the LXD's joystick + GO, so a miss is always a wrong area, never a shaky thumb (§4). |
| Proper SFX and audio throughout | 56 synthesised cues, 8 live loops and a generative score with 5 moods; temp narration for all 55 lines. Recordings can replace any of them (§7). |
| Asset MD files for GPT | `docs/assets/00-README.md` to `08-voice.md`: 19 picture slots with ready-to-paste prompts and acceptance checks, an audio upgrade list and the voice script. |
| Fifteen landing zones in five sets (user, 2026-10-30) | The survey raises all fifteen zones: five sets of three, each set one shape in the LXD's three sizes, kept together in its own part of the sea. The field is compact, so the camera ends straight above it with every zone's sides traced in light (Screens 4 and 5). The LXD's Screen 4 says five zones, and Screens 8–12 raise two more islands at each landing; both are superseded. The two Screen 4 lines say "sets" (§10). |
| A skip for the learning part (user, 2026-11-01) | Skip lesson › on Screen 6, pressed twice (§3, §8). |
| The team's learning module as Screen 6 (user, 2026-11-02) | The learning section is now the team's own module, *spacecraft landing mission learning* (`learning/`). Swiftee teaches the area of each quadrilateral in it, with its own voice-overs (English and Hindi), practice and tools. The game frames it full-screen and keeps Skip lesson › above it (§3, §4.3). This replaces the Ship AI lesson the build had, and with it the earlier "no Swiftee" decision for this section; the rest of the game is still narrated by the Ship AI. |

## 2. Learning objective
Given a quadrilateral's dimensions, the learner chooses the right area rule, computes the area exactly, and understands area as the space a shape covers. A ship fits a zone only when the two areas are equal: not too small, not too big (LXD Screen 5).

## 3. The flow, screen by screen
LXD lines are spoken word for word (`assets/vo/lines.json`, `"lxd": true`). The table lists every beat. **(add.)** marks what the brief asked for or what was added for the experience.

| # | LXD | Built as | Notes |
|---|---|---|---|
| 1 | Title, a ship under thrust, loading bar → PLAY; PLAY starts sound | The command ship's honeycomb engines blaze toward a slow drifting camera; the bar follows real loading (art, 55 voice lines, two sky bakes, shader compilation) and morphs into PLAY; a click, then the theme music, softly | Nothing of the mission loads after PLAY, so nothing stalls mid-flight. The learning module loads when Screen 6 begins, behind its own loading bar. |
| — | **(add.)** Intro | §1; Skip › | No narration: picture, music, sound |
| 2 | Cockpit, stars drifting past, a voice waveform; three lines; LAUNCH rises; "Press LAUNCH when you are ready." | All of it. The waveform is the narrator's real signal. The thrust lever, DESCEND and the reticle are added (§1). LAUNCH rises with a servo whir. The caption appears after 6 s of waiting. The drone flies out with a barrel roll, then the glitch cuts to its feed. | Added lines: `s2.planet`, `s2.align`, `s2.locked`, `s2.arrive`, `s2.descend`. "Click the LAUNCH button" is kept as written (see §10). |
| 3 | The drone over a dark sea; two lines; the scanner sweeps twice; the lights come up | The drone feed (corner brackets, REC, altitude, compass, scanlines). **(add.)** A SCAN button, because the line asks the player to start the scanner. The beam is drawn on the water in two passes, with "SCANNING n%". On the second pass the night lifts and plankton wake cyan in the foam. | |
| 4 | Five zones rise one after another, each in its own part of the sea, with a ripple and a glow, all different shapes, no labels; two lines; the zones pulse as the camera glides past | **(user)** Five sets of three rise one after another. The camera whips to each set as its three zones come up a beat apart (rumble panned to its side, ripples, spray, water pouring off the edges). Then it climbs to straight above the field: every zone's four sides trace on in light, and the swell calms. "Great!…" plays there, and "Look!…" lights the sets one by one, left to right. Then a low, banked loop round the field, each set pulsing as the gaze passes it. | No labels anywhere, as the LXD asks: the shapes speak for themselves. The two lines say "sets" (§10). |
| 5 | Only the sea and the zones; four lines; each zone glows as the camera passes; fade out | A slow, high glide; each set glows as it passes; on the last line the camera rises straight above the field again and all fifteen glow; fade to black | |
| 6 | The learning section, from the greeting to the last trapezium practice question | **(user)** The team's learning module (`learning/`), framed full-screen: Swiftee's welcome and Start, then its own sections, practice and tools (§4.3). When its last page is done it hands back to the mission. Skip lesson › at the top right ends it at any point: the first press asks ("Press again to skip"), so a stray tap cannot throw the learning away, and Screen 7 then leaves out "Now you know how to find the area…". | The module is the team's own content |
| 7 | Fade back; two lines; the camera descends toward the first zone | As written | |
| 8–12 | Per landing: the camera descends; two more islands rise (three sizes); the ship flies in and hovers; the "Here comes…" line; dimension lines; the rule; each island shows its area; the ask; the caption; fly + GO | As written, with every LXD number (§4.1), except that the set's three islands are already up (they rose in the survey: §1). The ship streaks in from the sky; the camera meets it, orbits it, then looks down as the dimensions draw on ("5 units"). The rule is spoken, not shown (§11). Then the camera rises to straight above the set (§4.2) and each island's area appears one by one, written on the island. | The "Drag the joystick…" caption shows on the first landing, and on later ones after 9 s idle |
| every landing | Controls; 3 hearts; exact / too small / too large with their lines; autopilot when out of hearts; NEXT | All of it (§4.2). **(add.)** The difference made visible, a hint ladder, the drone's rescue. | |
| 9 | "Great landings, Commander!…" after landing | Spoken after the rectangle lands | |
| 13 | Deep space; five ships on their islands with their rules; "Mission complete!", fanfare, confetti; the line; RESTART → Screen 2 | The five floating dioramas in a gentle arc, a sweep along them, the rules popping up beneath; then the title, fanfare and confetti. RESTART goes to the cockpit. | |

## 4. Learning design
### 4.1 The numbers (all from the LXD)
| Ship | Drawn on it | Rule | Islands (sq units) | Wrong islands are |
|---|---|---|---|---|
| Square | side 5, side 5 | side × side | 20 · 30 · **25** | 20 = the perimeter (4 × 5) |
| Rectangle | length 8, width 4 | length × width | 24 · 40 · **32** | 24 = the perimeter; 40 = 8 × 5 |
| Parallelogram | base 7, height 5 (right-angle mark), slant side 6 | base × height | 26 · 42 · **35** | 26 = the perimeter; 42 = base × slant side |
| Rhombus | diagonals 6 and 8, side 5 | ½ × d₁ × d₂ | 20 · 30 · **24** | 20 = the perimeter |
| Trapezium | parallel sides 8 and 12, height 5 | ½ × (a + b) × h | 40 · 60 · **50** | 40 and 60 = one parallel side × h |

On screen each dimension is written as its number with its unit ("5 units", "8 units"), without the name beside it: the drawing shows which length it is (the dashed perpendicular with its right-angle mark is the height; the dashed lines across are the diagonals). The names stay in this table and in the spoken rule (§11).

The LXD's distractors are classic misconceptions, so a miss can be named (§4.2). `src/world/shapes.js` checks at load that every ship's polygon really has its area, and that its correct island exists.

### 4.2 Why the landing teaches (and can't be guessed)
- **The ship's footprint is its shape.** Each hull is built from its exact polygon. An island of another area is the same shape scaled about the same centre, so "fits exactly" is a geometric fact the learner can see after landing.
- **The playing view is straight down** (the user's request, 2026-11-01). Every island shows its true shape, and none hides another, and its area is written on it. The view holds only this set: the other sets and the ships landed on them step out of the picture, and the sea calms (little foam, no sparkle, no glitter), so nothing else draws the eye (§11). The camera's height and centre are solved each time so the three islands and the waiting ship fill, as large as they can, the part of the screen the HUD leaves free: under the hearts and pause and the tallest caption this landing can show, above the one subtitle line said in this view, clear of the stick and GO. Both are measured at the screen's real size, so no text ever covers a zone. The view holds still while the ship flies. The ship waits in clear water between the back island and the front two (each set is spaced to leave that gap). Its dimensions show only while it is still: as soon as it moves they step away, and they come back when it stops.
- **The fit can't be judged by eye before GO.**
  - The ship hovers almost 7 units above the zones. From straight above it is nearer the camera, so it looks bigger than every one of the three islands (about 1.15–1.2×, more than the step between their sizes). No zone matches it by eye; the numbers decide, and on the way down it shrinks onto its island.
  - There is no ship shadow. The ghost under the ship is a small fixed ring that shows only where it would come down.
  - The three islands are dealt into random slots each run. Which island the scanner finds first is random too, so it may be a decoy. The LXD lists the right area last every time, so without the dealing it would always be the same slot.
- **GO only in a landing window, then autopilot.** GO lights only while the ship's centre is over a zone. Pressing it centres and lowers the ship automatically, so a miss is a wrong area, never a shaky thumb.
- **Each outcome draws its mistake:**
  - *Exact*: four lock beams find the zone's corner beacons and turn green. The last metre is in slow motion, then touchdown, mist and confetti. A tag over the ship confirms the fit with the area, not a formula: "25 sq units ✓".
  - *Too small* (LXD: overhangs, tips, slides into the sea): the beams fall inside the ship's outline and the beacons turn red. In a freeze-frame, the overhang ring glows hatched warm orange, labelled "+5 sq units over the edge". Then a creak, a tip, a slide and a splash.
  - *Too large* (LXD: crashes onto the oversized rock): the beams fall short of the corners, so the ship can't lock. The empty rim glows a cool blue, edged with a dashed line, labelled "5 sq units left empty". With nothing to guide it down, the jets cut out and the ship drops: a clang, a boing, sparks and smoke.

  The two mistakes are told apart by colour, by pattern (hatched vs dashed), by their words and by their sound (creak and splash vs clang and boing), never by colour alone.
- **A heart cracks and the ship comes back.** After too small, the drone tows the dripping ship out on a tractor beam; after too large, the ship lifts off the rock, wobbling. It returns to its waiting spot in the clear water, ready for the next try.
- **The hint ladder (add.):**
  - 1st miss: the idea behind that exact mistake, spoken and shown in the hint caption (once: not again as a subtitle), without the answer. For example: "20 is the distance all the way around the ship. Area is the space it covers: side times side." The caption stays up while the learner tries again.
  - 2nd miss: the working, spoken and in the caption ("Here's a hint. Work out 5 times 5."), and the dimension tags turn amber. No formula on screen.
  - Out of hearts: the LXD's autopilot, its caption shown and spoken.
- **Three hearts per landing**, refilled on each new one (LXD).

### 4.3 The lesson (Screen 6)
The learning section is the team's module *spacecraft landing mission learning*, kept as delivered in `learning/` (its own page, styles, scripts, GSAP, voice-overs in English and Hindi, Swiftee's sprite sheets). Swiftee welcomes the learner (Start), warms up with shape names and their area formulas, then works through the quadrilateral split into two triangles, the parallelogram, the rhombus and the trapezium, each with practice. The module has its own tools along its bottom edge: a section menu, Back, Skip (one page), Sound and Replay.

How the game frames it (`src/game/lesson.js`):
- An iframe over the whole screen, created when Screen 6 begins, so the module loads only then. Its page keeps its own styles and scripts, so nothing of it can touch the game's.
- **The hand-off:** when its last page (the third trapezium practice) is done, it posts `learning:done` to the game, and the mission carries on to Screen 7. This is the one line the game adds to the module (`learning/js/script.js`).
- **Skip lesson ›** stays at the top right, above the module (two presses). Skipping takes the frame out of the page, which also silences it.
- While it plays, the 3D world stops drawing and the game's music and sea fade: the module has its own sound.
- Language: English by default; the module reads `?lan=hi` for Hindi if its page is opened with it.

## 5. The camera language
`src/engine/camera.js` composes these moves, all on real time so it can swing round a slow-motion moment:
- **Path:** a Catmull-Rom flythrough that banks into its turns.
- **Orbit:** radius, height and lens all change on the way round.
- **Dolly zoom (vertigo):** the subject holds its size while the world stretches.
- **Chase:** lag and banking behind a moving object.
- **Whip pan:** a fast swing with a directional smear (motion blur only on whips, so the blur stays special).
- **Trauma shake:** smooth noise on position *and* rotation, squared so small knocks stay small.
- **Handheld drift:** a slow breathing sway for operated shots.
- **FOV punch:** a spring kick on the lens, sub-stepped so a slow frame can never make it explode.
- **Lens shift:** frames a subject beside the HUD without turning the camera.

| Beat | Camera |
|---|---|
| Title | Slow drift round the command ship's blazing tail, long lens, handheld |
| Intro | Engine close-up → banked pull-back along the hull → banked flyby round the nose → five whip pans, ship to ship → vertigo dolly (the fleet holds; the planet looms) → accelerating punch down the spine and through the glass, with a lens kick and a flash |
| Cockpit | The pilot's eye: the view banks with the steering; the warp pulls the lens in, then snaps it wide behind zoom blur and colour fringes, a beat of silence, a flash; re-entry shakes the frame |
| Drone | Hovering handheld; when the zones rise, a whip to each, then a crane up over the field |
| Survey glides | A low banked loop through the field; then a slow, high crane glide |
| Landings | Descend to the zone; whip to the sky to meet the ship; track it in; a hero orbit; overhead for the dimensions; pull back to play; a gentle follow while flying; a low swinging landing orbit; slow motion on touchdown; a low hero orbit after an exact landing; up and over to the next zone |
| Finale | A banked sweep along the five dioramas, rising to see them all; a slow orbit |

## 6. World and rendering
- **The sea** (`src/world/ocean.js`):
  - A polar grid follows the camera: dense under it, wide at the horizon, about 33k vertices. Waves are computed in world space, so the sea never slides with the camera.
  - Six Gerstner waves, each faded where the grid is too coarse to carry it, so the horizon never shimmers.
  - Analytic normals; ripple rings when islands rise and ships touch down; foam from the waves' compression, and lace foam where zones meet the water.
  - Light through the thin crests (subsurface glow); reflections of the baked sky, sharp near the camera and blurred far away; a glitter path toward the ringed giant.
  - The scanner's beam is drawn on the water, and plankton sparkle after the scan.
  - **The giant waves** are separate 110-unit swells far out on the horizon. Each rises, rolls toward the field and sinks back long before it could reach it, so they read as mountains first and then you see them move.
- **Skies** are baked once into HDR cubemaps (deep space: the dark sky and its nebulae; the planet: the purple night with the ringed giant and a moon) and reused for reflections and PBR lighting. Deep space's stars are not baked (a baked star is a two-texel blur and cannot twinkle): `src/world/stars.js` draws them as one batch of points that rides with the camera, so planets hide them and the warp streaks them.
- **Post** (`src/engine/post.js`): HDR, MSAA, dual-Kawase bloom, chromatic aberration, zoom blur, directional blur, glitch, drone-feed scanlines, frosted background (the lesson), vignette, grain, ACES and a grade.
- **Performance and sharpness:** a locked 60 fps on the dev Mac's GPU at 1.75× resolution, in every world. The resolution never drops below the page's own pixels (1×): under that every edge goes soft, which is what the LXD saw playing in a laptop browser tab (§11). A standard laptop screen is supersampled at 1.5×; a high-DPI one starts at its own ratio, up to 1.75× (1.5× on touch devices). A GPU that can't hold the frame rate gives the extra back first, down to 1×. The film grain is light, and the cubemaps are smaller on touch devices. Every shader is compiled during loading.

## 7. Audio
`src/engine/audio.js`:
- **Buses:** SFX, music, ambience and voice, through a limiter, plus a generated reverb.
- **56 one-shot cues.** Every learner-facing event has a sound, and each outcome has its own sound family.
- **8 live loops** that follow the game: the engine with the thrust lever, the hover jets with the ship's speed, the warp tunnel, re-entry plasma, the sea, the drone, the tractor beam.
- **A generative score**, one mood per part: title, cockpit, planet, landing, complete. The learning module has its own sound, so the music fades for it.
- **The narrator ducks the music.**
- **Recorded overrides:** any cue or mood can be replaced by a recording (`docs/assets/07-audio.md`).
- **Temp narration:** all 55 lines, so every device sounds the same and the waveform is the real voice.

## 8. UX
- **Input:** a thumb stick that appears where the thumb lands, W A S D / arrows, and Enter/Space for every primary button. Every button is at least 70 px. Waiting always brings a hint: a caption, a demo hand on the stick, or a pulse on the control.
- **Nothing can be failed by the controls:** the lever can be tapped, DESCEND only pauses when released, and GO only arms inside a landing window.
- **Accessibility:** subtitles for every line (on by default; toggle in pause), except a hint or the autopilot line, which the caption already shows; instruction captions in their own style (an amber edge and an arrow for an instruction, a cyan edge and a bulb for a hint); outcomes told by colour, shape, words and sound; text on panels at 4.5:1 or better.
- **The cockpit** follows the user's cockpit reference image. A cut-corner window sits in a layered navy frame with a lilac rim, cyan and violet light strips and breathing status lights. The console holds three modules: SPEED and the THRUST lever; the Ship AI's screen with its grid and waveform; ALTITUDE and a sweeping radar socket that DESCEND and LAUNCH rise into. Frame and console are vector shapes drawn at the screen's real size (`src/ui/cockpitUI.js`), so the bezels wrap the instruments at every aspect ratio, and the painted cockpit (02-cockpit.md) can replace them.
- **Layouts:** landscape tablets first, laptops, short phones (compact cockpit, lever and keypad sizes), portrait (wider lenses; on a narrow phone the cockpit's screen sits above the lever and the socket).
- **Pause:** Esc or ⏸ (resume, sound, subtitles, restart). A hidden tab pauses the audio.
- **Skip:** on the intro (one press), and on the lesson (the user's request, 2026-11-01): press, then press again within 3 s. The landings stay fully playable after a skip: each one says its rule.

## 9. QA
`playtest/mission.py` plays the whole mission with the autoplayer on the GPU (about 9 minutes at `--fast 1.6`), screenshots every phase and fails on any page error. `?plan=` drives every landing outcome, including running out of hearts.

The last full run (2026-10-29) passed every phase, through the autopilot and RESTART, with no errors.

## 10. Open questions for the LXD
1. **The hint ladder** after a landing miss (the idea, then the working) is an addition, in the spirit of the earlier LXD reviews. Since the 2026-11-05 review, no formula is shown: the second rung says the working and shows it in the caption ("Work out 5 times 5"). Is that right?
2. **"Click the LAUNCH button"**: the game is played on tablets. Should it be "Tap"?
3. **The SCAN button**: "Start the scanner to search the area" reads as an instruction, so the learner presses SCAN. Is that intended, or should the scan start by itself?
4. **The trip to the planet** (steer, thrust, descend) adds five short lines before "We need to find a safe place for it to land" (`s2.planet` … `s2.descend`).
5. **Too large = "crashes onto the oversized rock"**: interpreted as no corner lock, so no guided landing, so a hard drop and a bounce. Does that read right for the age group?
6. **Island order**: the LXD lists the correct area last in every set. The build deals positions randomly (§4.2). Is that acceptable?
7. **Swiftee** appears in the learning section only (the team's module, §4.3); the rest of the game is narrated by the Ship AI.
8. **Fifteen zones from the start** (the user's instruction, §1): every shape's three islands rise in the survey, so Screens 8–12 no longer raise "two more islands". The two Screen 4 lines now say "Great! The scanner found five sets of landing zones." and "Look! Each set of landing zones has a different shape." Is that wording right?
9. **"Zoom out the landing zones and spacecraft, so that the user can focus more on it"** (the 2026-11-05 review) is read as *make them bigger on screen*, since its purpose is focus: the playing view now holds just the set and frames it as large as the screen allows. If "zoom out" meant showing more of the field, say so.

## 11. The LXD's review, 2026-11-05 (`spacecraftFeedbacks.pdf`)
Every line of the review, and what answers it in the build.

| Review | In the build |
|---|---|
| The design quality drops when playing in a tab | The review's screenshots are a 1366 × 768 laptop browser tab. The render resolution no longer drops below the page's own pixels, and a standard screen like that is supersampled at 1.5×, so edges stay sharp (§6). The film grain is lighter. |
| Too many distractions: remove the unnecessary things | The playing view holds only the set being landed: the other sets and the landed ships step out of the picture, and the sea calms (no foam patches, sparkle or glitter). The shape icons and the formula chip are gone (below). The zones' rims and corner lights glow less. A hint shows once, in the caption, instead of twice (caption and subtitle). |
| Write the dimensions in the correct form, with units; no "side", "length", "breadth" | Each dimension reads "5 units", "8 units" and so on, with no name beside it (§4.1). |
| The instruction overlaps and its design is not good | One card style for what to do next: dark glass with an amber edge and an arrow (an instruction) or a cyan edge and a bulb (a hint). In the landings it sits in the top bar between the hearts and pause, and the field is framed below the tallest caption it can show, so nothing overlaps. The subtitles share the style, fit one line on wide screens, and on an upright phone run the full width above the stick and GO. |
| Write the area within the landing zones (and not outside) | Each zone's area is written on its pad ("25" over "sq units"), sized to fit inside its coloured frame; it turns amber, green or red with the zone. It appears only in the landings, so the survey keeps the LXD's "no labels". |
| No need to show the area formula; remove the shapes from the top | The formula chip and the row of shape icons are gone. The rule is still spoken (the LXD's lines). The working on the second hint is spoken and in the caption; after an exact landing the tag over the ship shows the area ("25 sq units ✓"), not the formula. Screen 13 keeps each ship's rule beneath it, as the LXD's flow asks. |
| The title is hiding (the end of "SPACESHIP" and "MISSION" cut off) | The title's letters are slanted and painted through a gradient that covered only each line's box, so the overhang of the last letter was cut. The box now reaches past it; "Mission complete!" has the same fix. |
| Check the quality of the intro screens | The ships are rebuilt: deep steel walls with one thin line of each ship's colour instead of glaring pink, small corner lights instead of white blooms, a smoother canopy and finer bevels. The command ship's hull and pods are twice as smooth, its engine glows are a halo instead of a white blob, and its panel lines are subtler. With the sharper rendering above. |
| The jet exhaust should be inside the spacecraft, not outside | The quad ships' engines are built into the hull: glowing nozzles set into the back wall and vents on the deck, with no pods or flames behind it. The canopy is sized to sit inside the shape (the rhombus's poked out of its front point). From above, nothing leaves the outline. |
| The glowing sides spread too much: thin, like the side of the shape | The sides are drawn as a thin, sharp line on the exact outline with only a faint glow hugging it, never under about two pixels so they still read from high above (the survey). |
| "Zoom out the landing zones and spacecraft, so that the user can focus more on it" | Read as *make them bigger*: the playing view holds just the set and is framed as large as the free screen allows, now that the area tags and the formula chip no longer take room (§10, question 9). |
| Show the dimensions only when the ship is not moving | They step away as soon as the ship moves and come back when it stops. |
