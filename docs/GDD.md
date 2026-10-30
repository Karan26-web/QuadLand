# Game Design Document: Spaceship Mission (QuadLand)
*Skill: area of quadrilaterals. Square = side × side · rectangle = length × width · parallelogram = base × height · rhombus = ½ × d₁ × d₂ · trapezium = ½ × (a + b) × h*

> Written for the LXD and the production team. The game follows the LXD's integrated flow (`docs/spacecraft.docx`, 13 screens) line by line. This document says how each beat is built, what was added on the brief's request (each addition is marked), why the maths is wired the way it is, and what is still open for the LXD.

## 1. The brief, and how the build answers it
| Request (2026-10-29) | In the build |
|---|---|
| A space theme: a colourful nebula in dark space | Deep space is dark first: a navy sky with a soft blue-violet galactic band and dust lanes, and four nebulae (violet with a magenta heart, teal, lilac, rose-violet), each framing a part of the sky the camera dwells on (the title, the fleet, the water planet, the ringed giant). Pink lives only in their dense hearts and the gaps between them stay dark, so colour frames the subjects and the stars always show. It is baked into an HDR cubemap that every hull reflects. About 14,000 stars are drawn live on top: crisp points, densest along the band, that twinkle on their own clocks, now and then sparkle, and a few dozen carry four-point glints. A sun, a ringed giant, the ocean planet and two moons hang in it. |
| The reference frames' style and the water planet's colour theme | A stylised 3D animated-series look. The water planet's night is the frames' purple: an indigo zenith, a violet horizon glowing toward a lavender ringed giant, and a pink nebula band over a dark violet sea. |
| Camera work "more crazy than Sector Escape" | A new camera director (`src/engine/camera.js`), described in §5. |
| Introduce everything first, with the camera work in space | The intro cinematic: an engine close-up, a banked flyby, a whip pan to each of the five quad ships, a vertigo dolly zoom with the planet looming, and a punch through the canopy glass. It can be skipped. |
| An interaction inside the ship to move to a water planet | Screen 2: steer the planet into the reticle, push the thrust lever (a hyperspace jump), hold DESCEND (re-entry and the cloud deck). Each step waits for the player and hints after a pause. |
| A water planet with living waves, inspired by Interstellar's water planet | A living sea: six Gerstner waves, ripples, foam, subsurface glow, a moon-glitter path, plankton sparkles after the scan. Mountain-sized waves roll on the horizon: they read first as mountains, then you see them move. §6. |
| Land quad ships on lands that rise from the water | Screens 3–12 (§3). |
| Optional: a landing simulation like the airplane game's | Used for the trip to the planet: steer, thrust, hold to descend, in the cockpit with the airplane game's guided, unfailable rhythm. The five landings keep the LXD's joystick + GO, so a miss is always a wrong area, never a shaky thumb (§4). |
| Proper SFX and audio throughout | 62 synthesised cues, 8 live loops and a generative score with 6 moods; temp narration for all 110 lines. Recordings can replace any of them (§7). |
| Asset MD files for GPT | `docs/assets/00-README.md` to `08-voice.md`: 19 picture slots with ready-to-paste prompts and acceptance checks, an audio upgrade list and the voice script. |
| No Swiftee (user, mid-brief) | The Ship AI presents the lesson: the same narrator as the cockpit, shown as a pulsing orb (§4.3). The LXD's Screen 6 says Swiftee greets the learner; this is the one place the build departs from the LXD's text on the user's instruction. |

## 2. Learning objective
Given a quadrilateral's dimensions, the learner chooses the right area rule, computes the area exactly, and understands area as the space a shape covers. A ship fits a zone only when the two areas are equal: not too small, not too big (LXD Screen 5).

## 3. The flow, screen by screen
LXD lines are spoken word for word (`assets/vo/lines.json`, `"lxd": true`). The table lists every beat. **(add.)** marks what the brief asked for or what was added for the experience.

| # | LXD | Built as | Notes |
|---|---|---|---|
| 1 | Title, a ship under thrust, loading bar → PLAY; PLAY starts sound | The command ship's honeycomb engines blaze toward a slow drifting camera; the bar follows real loading (art, 110 voice lines, two sky bakes, shader compilation) and morphs into PLAY; a click, then the theme music, softly | Nothing loads after PLAY, so nothing stalls mid-mission |
| — | **(add.)** Intro | §1; Skip › | No narration: picture, music, sound |
| 2 | Cockpit, stars drifting past, a voice waveform; three lines; LAUNCH rises; "Press LAUNCH when you are ready." | All of it. The waveform is the narrator's real signal. The thrust lever, DESCEND and the reticle are added (§1). LAUNCH rises with a servo whir. The caption appears after 6 s of waiting. The drone flies out with a barrel roll, then the glitch cuts to its feed. | Added lines: `s2.planet`, `s2.align`, `s2.locked`, `s2.arrive`, `s2.descend`. "Click the LAUNCH button" is kept as written (see §10). |
| 3 | The drone over a dark sea; two lines; the scanner sweeps twice; the lights come up | The drone feed (corner brackets, REC, altitude, compass, scanlines). **(add.)** A SCAN button, because the line asks the player to start the scanner. The beam is drawn on the water in two passes, with "SCANNING n%". On the second pass the night lifts and plankton wake cyan in the foam. | |
| 4 | Five zones rise one after another, each in its own part of the sea, with a ripple and a glow, all different shapes, no labels; two lines; the zones pulse as the camera glides past | The camera whips to each zone as it rises (rumble panned to its side, ripples, spray, water pouring off the edges), then rises over all five. "Look!…" plays over a low, banked loop round the field, each zone pulsing as the gaze passes it. | No labels anywhere |
| 5 | Only the sea and the zones; four lines; each zone glows as the camera passes; fade out | A slow, high glide; each zone glows as it passes; all five glow; fade to black | |
| 6 | The learning section, from the greeting to the last trapezium practice question | §4.3. Presented by the Ship AI. | The LXD names the span, not the script: the content is ours, for review |
| 7 | Fade back; two lines; the camera descends toward the first zone | As written | |
| 8–12 | Per landing: the camera descends; two more islands rise (three sizes); the ship flies in and hovers; the "Here comes…" line; dimension lines; the rule; each island shows its area; the ask; the caption; fly + GO | As written, with every LXD number (§4.1). The ship streaks in from the sky; the camera meets it, orbits it, then looks down as the dimensions draw on. The formula chip appears with the rule, then the area tags pop up one by one. | The "Drag the joystick…" caption shows on the first landing, and on later ones after 9 s idle |
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

The LXD's distractors are classic misconceptions, so a miss can be named (§4.2). `src/world/shapes.js` checks at load that every ship's polygon really has its area, and that its correct island exists.

### 4.2 Why the landing teaches (and can't be guessed)
- **The ship's footprint is its shape.** Each hull is built from its exact polygon. An island of another area is the same shape scaled about the same centre, so "fits exactly" is a geometric fact the learner can see after landing.
- **The fit can't be judged by eye before GO.**
  - The ship hovers 5 units above the zones, so perspective makes it look bigger than a zone of equal area.
  - There is no ship shadow. The ghost under the ship is a small fixed ring that shows only where it would come down.
  - The three islands are dealt into random slots each run. Which island the scanner finds first is random too, so it may be a decoy. The LXD lists the right area last every time, so without the dealing it would always be the same slot.
- **GO only in a landing window, then autopilot.** GO lights only while the ship's centre is over a zone. Pressing it centres and lowers the ship automatically, so a miss is a wrong area, never a shaky thumb.
- **Each outcome draws its mistake:**
  - *Exact*: four lock beams find the zone's corner beacons and turn green. The last metre is in slow motion, then touchdown, mist and confetti. A hologram shows the method: "SIDE × SIDE · 5 × 5 = 25 ✓".
  - *Too small* (LXD: overhangs, tips, slides into the sea): the beams fall inside the ship's outline and the beacons turn red. In a freeze-frame, the overhang ring glows hatched warm orange, labelled "+5 sq units over the edge". Then a creak, a tip, a slide and a splash.
  - *Too large* (LXD: crashes onto the oversized rock): the beams fall short of the corners, so the ship can't lock. The empty rim glows a cool blue, edged with a dashed line, labelled "5 sq units left empty". With nothing to guide it down, the jets cut out and the ship drops: a clang, a boing, sparks and smoke.

  The two mistakes are told apart by colour, by pattern (hatched vs dashed), by their words and by their sound (creak and splash vs clang and boing), never by colour alone.
- **A heart cracks and the ship comes back.** After too small, the drone tows the dripping ship out on a tractor beam; after too large, the ship lifts off the rock, wobbling. It returns to the hover, ready for the next try.
- **The hint ladder (add.):**
  - 1st miss: the idea behind that exact mistake, spoken and shown, without the answer. For example: "20 is the distance all the way around the ship. Area is the space it covers: side times side."
  - 2nd miss: the working. The formula chip shows "Area = 5 × 5 = ?" and the dimension tags turn amber.
  - Out of hearts: the LXD's autopilot, with its caption, also spoken.
- **Three hearts per landing**, refilled on each new one (LXD).

### 4.3 The lesson (Screen 6)
Each rule is shown before it is said, on a holo-board over the frosted planet. The Ship AI's orb swells with its voice, and the step chips show the five shapes.

| Shape | Shown | Practice question (distractors) |
|---|---|---|
| What is area? | The five shapes; a 6 × 3 shape fills; one unit square, "1 square unit"; the grid | — |
| Square | A 4 × 4 square fills with 16 counted unit squares → 4 × 4 = 16 | side 6 → **36** (24 = perimeter, 12 = 6 + 6) |
| Rectangle | 5 × 3, 15 counted squares → 5 × 3 = 15 | 7 × 4 → **28** (22 = perimeter, 11 = 7 + 4) |
| Parallelogram | base 6, height 4 (right angle); "the slanted side is not the height"; a triangle is cut off and slides across, making a 6 × 4 rectangle | base 9, height 4, slant 5 → **36** (45 = base × slant, 28 = perimeter) |
| Rhombus | diagonals 10 and 4 crossing at a right angle; the 10 × 4 rectangle round it; its four corner pieces flip in onto the rhombus, so the rhombus is half → 20 | diagonals 12 and 5 → **30** (60 = forgot the half, 17 = 12 + 5) |
| Trapezium | parallel sides 3 and 7, height 4; a copy turned upside down joins it to make a parallelogram of base 3 + 7 = 10 → 40 → one is half → 20 | parallel sides 5 and 9, height 4 → **28** (56 = forgot the half, 36 = one side × h) |

The practice numbers differ from the landing numbers, so the landings test the rule, not the memory of an answer. A practice question can't be failed:
1. First miss: the hint for that exact mistake.
2. Second miss: the working is spoken (and, for the square and rectangle, drawn as tiles), and the right answer glows.

The options stay open and are never struck out, as the earlier LXD reviews asked.

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
- **Performance:** a locked 60 fps on the dev Mac's GPU at 1.5× resolution, in every world. The resolution adapts at runtime (0.6×–1.3× on touch devices) and the cubemaps are smaller on touch devices. Every shader is compiled during loading.

## 7. Audio
`src/engine/audio.js`:
- **Buses:** SFX, music, ambience and voice, through a limiter, plus a generated reverb.
- **62 one-shot cues.** Every learner-facing event has a sound, and each outcome has its own sound family.
- **8 live loops** that follow the game: the engine with the thrust lever, the hover jets with the ship's speed, the warp tunnel, re-entry plasma, the sea, the drone, the tractor beam.
- **A generative score**, one mood per part: title, cockpit, planet, lesson, landing, complete.
- **The narrator ducks the music.**
- **Recorded overrides:** any cue or mood can be replaced by a recording (`docs/assets/07-audio.md`).
- **Temp narration:** all 110 lines, so every device sounds the same and the waveform is the real voice.

## 8. UX
- **Input:** a thumb stick that appears where the thumb lands, W A S D / arrows, and Enter/Space for every primary button. Every button is at least 70 px. Waiting always brings a hint: a caption, a demo hand on the stick, or a pulse on the control.
- **Nothing can be failed by the controls:** the lever can be tapped, DESCEND only pauses when released, and GO only arms inside a landing window.
- **Accessibility:** subtitles for every line (on by default; toggle in pause); instruction captions in their own style; outcomes told by colour, shape, words and sound; text on panels at 4.5:1 or better.
- **Layouts:** landscape tablets first, laptops, short phones (compact cockpit, lever and keypad sizes), portrait (wider lenses).
- **Pause:** Esc or ⏸ (resume, sound, subtitles, restart). A hidden tab pauses the audio. Skip on the intro.

## 9. QA
`playtest/mission.py` plays the whole mission with the autoplayer on the GPU (about 9 minutes at `--fast 1.6`), screenshots every phase and fails on any page error. `?plan=` drives every landing outcome, including running out of hearts.

The last full run (2026-10-29) passed every phase, through the autopilot and RESTART, with no errors.

## 10. Open questions for the LXD
1. **The lesson script (Screen 6)** is ours (§4.3), because the brief names the section but not its content. Please review the lines (`docs/assets/08-voice.md`, lines starting `l.`) and the practice numbers.
2. **The hint ladder** after a landing miss (the idea, then the working) is an addition, in the spirit of the earlier LXD reviews. Should the second rung show the multiplication?
3. **"Click the LAUNCH button"**: the game is played on tablets. Should it be "Tap"?
4. **The SCAN button**: "Start the scanner to search the area" reads as an instruction, so the learner presses SCAN. Is that intended, or should the scan start by itself?
5. **The trip to the planet** (steer, thrust, descend) adds five short lines before "We need to find a safe place for it to land" (`s2.planet` … `s2.descend`).
6. **Too large = "crashes onto the oversized rock"**: interpreted as no corner lock, so no guided landing, so a hard drop and a bounce. Does that read right for the age group?
7. **Island order**: the LXD lists the correct area last in every set. The build deals positions randomly (§4.2). Is that acceptable?
8. **Swiftee** is not used, on the user's instruction (§1).
