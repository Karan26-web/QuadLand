# 07 · Sound effects and music (optional upgrades)

The game already has a full sound design, synthesised live by `src/engine/audio.js`: 67 cues, 8 continuous loops and a generative score with 8 moods. There are no files to load and nothing is ever missing. Every cue below can be replaced by a recording, for example from ElevenLabs Sound Effects or a library. Music can be replaced the same way (for example from Suno or Udio).

**To install a recording:**
1. Save it as `assets/sfx/<anything>.m4a` (AAC, which plays in every browser including iPad Safari), or `.mp3`.
2. Add a line to `assets/sfx/sfx.json`. For example:
   ```json
   { "cues": { "warp.jump": "warp_jump.m4a", "splash": "splash.m4a" }, "music": { "planet": "music_planet.m4a" } }
   ```
3. Reload the game. A cue with a file plays the file; every other cue stays synthesised. A music file loops for its mood.

**Specs:** 44.1 or 48 kHz, peaks under −1 dBFS, no silence at the head. Trim the tail to the sound. One-shots should be dry: the game adds its own reverb only to the synthesised cues.

The ElevenLabs connector in this workspace needs authorising (claude.ai → Settings → Connectors) before Claude can generate these for you directly.

## One-shot cues
| Cue | When it plays | Prompt (ElevenLabs Sound Effects) | Length |
|---|---|---|---|
| `ui.click` | Any button press | soft futuristic UI click, glassy, friendly | 0.1 s |
| `ui.confirm` | NEXT, confirm | bright two-note sci-fi confirm chime, rising | 0.4 s |
| `ui.hover` | Pointer over a button (desktop) | tiny soft tick, high | 0.05 s |
| `ui.pop` | A small element appears | soft bubble pop, cute | 0.1 s |
| `ui.tick` | A counter | single soft digital tick | 0.05 s |
| `ui.whoosh` | A panel slides | soft air whoosh, short | 0.4 s |
| `ui.correct` | A right practice answer | sparkly magical bell arpeggio, happy, kid-friendly | 1.2 s |
| `ui.wrong` | A wrong practice answer | gentle descending two-note "oops" tone, soft, not harsh | 0.5 s |
| `ui.hint` | A hint appears | soft curious two-bell chime | 0.6 s |
| `ui.heart` | A heart is lost | small glass crack, then a soft sad two-note tone | 0.7 s |
| `whoosh` | Camera whip pans, fast moves | fast cinematic camera whoosh, airy, stereo | 0.5 s |
| `flyby` | A ship flies past the camera | spaceship fly-by with doppler, deep hum and jet hiss passing left to right | 2 s |
| `boom` | The hyperspace snap | deep cinematic sub boom with a long tail | 2 s |
| `riser` | Before big reveals | cinematic riser, airy noise and rising tone, building | 3 s |
| `impact` | The canopy punch-in, a hard bump | punchy cinematic impact hit | 0.6 s |
| `ck.boot` | The cockpit powers up | spaceship console power-up sweep with little beeps | 1 s |
| `ck.beep` | Console blips, the ship over a zone | single soft cockpit console beep | 0.08 s |
| `ck.chatter` | The computer reacts | short burst of friendly computer chatter beeps | 0.4 s |
| `ck.lock` | The planet locked in the reticle | target lock confirmation, two pings and a soft major chord | 1 s |
| `ck.lever` | The thrust lever moves | mechanical slider notch click | 0.15 s |
| `ck.clunk` | A lever hits its end | solid mechanical clunk | 0.2 s |
| `ck.button` | A big cockpit button pressed | chunky arcade button press with a small beep | 0.25 s |
| `ck.rise` | LAUNCH or DESCEND rises into place | small servo whir, then a soft latch click | 0.8 s |
| `warp.charge` | The hyperdrive spools up | hyperdrive charging whine rising in pitch, energy building | 1.6 s |
| `warp.jump` | The jump to light speed | sci-fi jump to light speed: huge whoosh and boom, sparkling tail | 2 s |
| `warp.exit` | Out of hyperspace, the reveal | dropping out of hyperspace: reverse whoosh into a soft boom and a shimmering chime | 2.5 s |
| `atmos.break` | Bursting through the clouds | breaking through clouds, a big rushing wind, then calm | 2 s |
| `launch.prime` | Before the drone launches | servo charge-up whine, short | 0.9 s |
| `launch.fire` | The drone launches | small rocket launch: thump, a fizzing jet streaking away | 1.8 s |
| `glitch` | The cut to the drone's camera | digital video glitch stutter, bit-crushed | 0.5 s |
| `static` | The drone feed | short burst of radio static | 0.4 s |
| `scan.start` | SCAN pressed | sonar scanner power-up sweep with a ping | 1 s |
| `scan.sweep` | Each scanner pass | sonar sweep across water, swooshing tone with soft pings | 2.4 s |
| `scan.ping` | A pass ends | single deep sonar ping with long echo | 1 s |
| `lights.up` | The night lights up | magical shimmering swell, soft major chord blooming | 3 s |
| `island.rise` | A zone rises from the sea | huge stone platform rising out of water: deep rumble, grinding stone, water pouring | 3 s |
| `splash` | A zone breaks the surface; a ship falls in | big water splash with droplets | 1 s |
| `zone.pulse` | A zone pulses as the camera passes | soft glassy bell note, magical | 1 s |
| `zone.glow` | All zones glow | airy sparkle shimmer | 1.5 s |
| `wave.rumble` | The giant waves far away | distant ocean rumble, enormous waves very far away, low and slow | 5 s |
| `ship.arrive` | A quad ship flies in | small spaceship arriving: doppler jet whoosh settling into a hover hum | 2.5 s |
| `dim.draw` | A dimension line draws on | holographic laser pen drawing a line, rising shimmer | 0.5 s |
| `dim.label` | A dimension number appears | small hologram pop with a chime | 0.3 s |
| `area.pop` | A zone's area tag appears | hologram tag pop, bright | 0.3 s |
| `formula` | The formula chip appears | three-note sparkle chime | 0.5 s |
| `go.ready` | GO lights up | quick bright double ping, ready | 0.2 s |
| `go.press` | GO pressed | chunky button press with engage hum | 0.5 s |
| `lock.beam` | A corner lock beam fires (×4) | short laser zap, descending | 0.25 s |
| `lock.ok` | All four corners lock (exact) | satisfying lock-in chord, mechanical clamp then major chord | 1 s |
| `lock.fail` | The corners can't lock (a miss) | soft error buzz, two low tones, not scary | 0.5 s |
| `touchdown` | Exact landing | spaceship touchdown: soft thud, hydraulic hiss, clamp clicks | 1.2 s |
| `success` | A perfect landing | short celebratory fanfare arpeggio, bright, kid-friendly | 1.5 s |
| `confetti` | Confetti bursts | party popper pops with paper flutter | 0.6 s |
| `creak` | Too small: the ship hangs over the edge | cartoon metal creak, wobbly | 1.2 s |
| `slide` | Too small: it slides off | cartoon scraping slide | 0.9 s |
| `glug` | Too small: it sinks a little | cartoon bubbles glug glug | 0.9 s |
| `clang` | Too large: it slams onto the rock | metal clang, toy-like, ringing | 1.2 s |
| `boing` | Too large: it bounces | cartoon spring boing | 0.7 s |
| `crash` | Too large: the crash itself | small cartoon crash, crunch and rattling bits, not violent | 1 s |
| `sparks` | Too large: sparks fly | electric spark crackles | 0.7 s |
| `rescue` | The drone's tractor beam lifts the ship | sci-fi tractor beam hum rising, magical lift | 1.8 s |
| `autopilot` | Out of hearts: autopilot engages | friendly computer autopilot-engaged jingle | 0.8 s |
| `fanfare` | Mission complete | triumphant orchestral-synth fanfare, kids' adventure, 5 seconds | 5 s |
| `tile` | Unit squares appear (the lesson) | soft marimba note, short | 0.2 s |
| `cut` | The lesson's laser cut | laser cutting swish | 0.35 s |
| `move` | A lesson piece slides | soft whoosh slide | 0.6 s |
| `snap` | A lesson piece clicks in | satisfying snap click | 0.15 s |

## Moods for the music (`music.<mood>`)
Each mood should loop seamlessly, last 60 to 120 s, and stay quiet under narration (the game ducks it while the Ship AI speaks).

| Mood | Where | Prompt (Suno / Udio, instrumental) |
|---|---|---|
| `title` | Screen 1, the intro | wondrous slow space-adventure theme for kids, warm synth pads, twinkling bells, Lydian, 64 bpm, cinematic but gentle, instrumental, seamless loop |
| `cockpit` | Screen 2 | light mission-briefing theme, soft pulsing synth arpeggio, warm pads, curious and hopeful, 84 bpm, instrumental loop |
| `warp` | The hyperspace jump (short) | driving synthwave hyperspace chase, punchy kick, fast arpeggio, 128 bpm, 20 seconds |
| `planet` | Screens 3–5 | mysterious calm night ocean, deep drones, distant whale-like synth glides, sparse bells, 56 bpm, instrumental loop |
| `lesson` | Screen 6 | calm focused learning music, soft marimba and warm pad, gentle and steady, 86 bpm, low energy, instrumental loop |
| `landing` | Screens 7–12 | upbeat light space-adventure groove, plucky synth, soft percussion, hopeful, 96 bpm, instrumental loop |
| `complete` | Screen 13 | triumphant celebration theme for kids, brass-like synths, timpani, bright major key, 100 bpm, 40 seconds |

The continuous sounds (the command ship's engine, the cockpit hum, the hyperspace tunnel, re-entry plasma, the hover jets, the drone, the sea, the tractor beam) are live synthesisers whose pitch and level follow the game, for example the hover jets with the ship's speed. They stay synthesised.
