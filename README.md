# Spaceship Mission (QuadLand)

A 3D maths adventure that teaches the **area of quadrilaterals**: square, rectangle, parallelogram, rhombus and trapezium. It follows the LXD's 13-screen flow in `docs/spacecraft.docx`.

The Space Commander is cruising through a colourful nebula. Through the cockpit window, they steer toward an ocean planet and push the thrust lever into hyperspace. They hold DESCEND through the re-entry fire and the cloud deck, and come out over a dark violet sea under a ringed giant. A survey drone scans the water, and five landing zones rise out of the sea, each a different shape. The Ship AI teaches the area of each shape. Then the commander flies five quad-shaped ships with a joystick and lands each one on the island whose area matches it exactly:
- **Too small:** the overhang glows, and the ship tips into the sea.
- **Too large:** the empty rim glows, and the ship crashes onto the rock.
- **Exact:** it locks in with confetti.

Vanilla ES modules, a vendored Three.js r170 (core only), a custom HDR post pipeline, procedural Web Audio, and HTML/SVG UI. No framework, no build step, no runtime dependencies.

## Run it
The game needs an HTTP server; opening `index.html` as a file will not work.
```bash
python3 playtest/serve.py 8344      # then open http://127.0.0.1:8344/
# or: python3 -m http.server 8344
```
It plays best in landscape on a tablet or a laptop. Phones and portrait work too.

## Controls
| Action | Touch / mouse | Keyboard |
|---|---|---|
| Steer the ship (Screen 2), fly a quad ship (Screens 8–12) | The stick in the bottom-left corner. A press anywhere in that corner brings the stick under the thumb. | W A S D or the arrow keys |
| Thrust lever | Drag it up, or tap it | ↑ / W, or Space |
| DESCEND | Hold it | Hold Space or Enter |
| LAUNCH, SCAN, GO, NEXT | Tap | Enter or Space |
| Pause (sound, subtitles, restart) | ⏸ in the top-right corner (during the landings) | Esc |
| Mute | (pause menu) | M |
| Skip the intro cinematic | Skip › | — |

## The mission, screen by screen
| LXD screen | What happens | Code |
|---|---|---|
| 1 Start gate | Title, the command ship under thrust, a byte-accurate loading bar that turns into PLAY. PLAY starts all sound. | `src/main.js`, `src/game/title.js` |
| (addition) Intro | An engine close-up, a banked hull flyby, whip pans across the five ships, a dolly zoom with the planet looming, then a punch through the canopy | `src/game/intro.js` |
| 2 Cockpit | The welcome; steer the planet into the reticle; the thrust lever starts the hyperspace jump; hold DESCEND through the plasma and clouds; the LXD's lines; LAUNCH sends the drone and the feed glitches in | `src/game/cockpit.js`, `src/ui/cockpitUI.js` |
| 3–5 Dark sea, scan, five zones, the hook | The drone feed over the dark sea; SCAN makes two beam passes and the lights come up; five zones rise one by one as the camera whips to each; a low banked loop; the area hook over a high glide | `src/game/survey.js` |
| 6 Learning section | The Ship AI's holo-board, one lesson per shape, each with a practice question | `src/game/lesson.js` |
| 7 Back to the mission | Fade back; the camera descends toward the first zone | `src/game/landing.js` (`back`) |
| 8–12 Five landings | Two more islands rise; the ship flies in; its dimensions draw on; the rule is said; the areas appear; the player flies and presses GO; one of three outcomes; 3 hearts; a hint ladder; the autopilot when the hearts run out; NEXT | `src/game/landing.js` |
| 13 Mission complete | The five ships on their islands in deep space with their rules; the fanfare and confetti; RESTART returns to the cockpit | `src/game/complete.js` |

`docs/GDD.md` explains each design decision and traces every LXD line to the build.

## Dev and QA
URL parameters:
- `?screen=cockpit|survey|lesson|back|land0…land4|complete` starts there, with the world set up as it would be by then.
- `?auto=1` plays itself: it steers, pulls the lever, holds DESCEND, presses LAUNCH and SCAN, flies to an island, answers the lessons (one deliberate miss each) and presses GO.
- `?plan=sle-e-l-e-s` scripts the autoplayer's landing choices, one group per landing: `s` too small, `l` too large, `e` exact. `sss` runs out of hearts and brings the autopilot.
- `?fast=2` runs both clocks twice as fast.
- `?dpr=1` fixes the render resolution; it adapts by default.
- `?seed=7` deals the islands the same way every run.
- `?view=space|fleet|planet|islands|sea|low|cockpit|ship&k=2` shows one world, still, for screenshots.

Console: `__ql` is the game context (`__ql.flow.phase`, `__ql.planet`, `__ql.space`, `__ql.director`, `__ql.post.fx`).

Playtests (Python Playwright with Chromium; they use the Mac's GPU through ANGLE Metal, and `--soft` uses software GL):
```bash
python3 playtest/mission.py                                  # the whole mission, autoplayed, screenshots on every phase
python3 playtest/mission.py --from land0 --plan sle --to land1   # one landing through all three outcomes
python3 playtest/shot.py sea=view=sea islands=view=islands   # still views
```
Screenshots go to `playtest/screens/`.

## Project layout
```
index.html, styles/main.css     the page, its layers and the UI theme
src/main.js                     boot (renderer, post, worlds, loading), the frame loop, adaptive resolution, the game context
src/engine/
  camera.js                     the camera director: spline paths with banking, orbits, dolly zoom, chase, whip pans, trauma shake, FOV punch, lens shift, motion blur
  post.js                       the HDR pipeline: dual-Kawase bloom, chromatic aberration, warp zoom blur, whip smear, glitch, drone feed, ACES, grading
  audio.js                      procedural sound: buses, reverb, 67 cues, 8 live loops, a generative score with 8 moods; recorded files override cues
  voice.js                      the narrator: decoded lines through Web Audio (the waveform and the orb follow the real voice), subtitles, ducking
  clock.js, tween.js            game time and real time, slow motion, cancellable scripts
  input.js, labels.js, fx.js, assets.js, util.js
src/world/
  ocean.js                      the living sea: Gerstner waves on a camera-centred polar grid, ripples, foam, subsurface glow, reflections, the scanner beam, giant waves
  sky.js, planets.js            the baked skies (nebula, purple night), the ringed giant, the ocean planet, moons
  shapes.js                     the five quadrilaterals (the LXD's dimensions), area scaling, geometry helpers
  ships.js, islands.js, dims.js the craft, the landing zones, the dimension lines
  space.js, planet.js           the two worlds
  textures.js, glsl.js          procedural textures (stand-ins for the GPT art), shared GLSL
src/game/                       one file per screen + flow.js (the order) + common.js + dev.js
src/ui/hud.js, cockpitUI.js     the HUD and the cockpit's instruments
assets/vo/                      lines.json (every line, LXD-marked), vo.json and the temp narration (.m4a)
assets/art.json, assets/img/    the GPT art slots and the installed pictures
assets/sfx/                     recorded sound overrides (optional)
docs/                           the LXD flow, the GDD, the art and audio briefs (docs/assets/)
tools/                          make_vo.py, install_art.py, make_templates.py
playtest/                       serve.py, mission.py, shot.py
vendor/three.module.js          Three.js r170
```

## Art pipeline (GPT)
Every picture is optional, and the game ships with procedural stand-ins. `docs/assets/00-README.md` lists every slot, its priority and the shared prompt blocks. Each brief has a ready-to-paste prompt and an acceptance check.
```bash
python3 tools/install_art.py --list
python3 tools/install_art.py cockpit ~/Downloads/cockpit.png
```

## Narration
The game ships with temp narration rendered by macOS `say` (Samantha), one AAC file per line, so every device sounds the same and the waveform follows the real voice. To replace it with a recorded voice, follow `docs/assets/08-voice.md`: save each line as `assets/vo/<ID>.m4a`, then run `python3 tools/make_vo.py --adopt`. After editing `lines.json`, run `python3 tools/make_vo.py` again; it renders only the lines that changed.

## Deploy
It is a static site with no build step: upload the folder as it is, for example to Vercel with the "Other" preset and no build command. Keep the `vendor/` and `assets/` paths.
