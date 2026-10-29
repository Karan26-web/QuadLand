# Spaceship Mission: art and audio briefs

These files list every picture and sound the game can use, with a ready-to-paste prompt for each one. The game already runs on procedural stand-ins: shader skies, planets and sea, canvas textures, synthesised sound and temp narration. Every delivery replaces one stand-in. You can make the assets in any order, and the game never breaks while one is missing.

| File | What it covers | Slots |
|---|---|---|
| [01-branding-ui.md](01-branding-ui.md) | The title logo and the app icon | `logo`, `icon` |
| [02-cockpit.md](02-cockpit.md) | The cockpit interior seen from the pilot's seat (Screen 2) | `cockpit` |
| [03-space.md](03-space.md) | Nebula clouds, the ocean planet, the ringed giant and its rings, a moon | `nebula_1`…`nebula_4`, `planet_ocean`, `planet_ringed`, `ring`, `moon` |
| [04-ships.md](04-ships.md) | Hull plating for the five quad ships. The ships themselves are built in code to the LXD's exact shapes | `hull_plating` |
| [05-water-planet.md](05-water-planet.md) | The landing zones: rock sides, the landing plate, its glowing inlay | `rock`, `pad`, `pad_glow` |
| [06-fx.md](06-fx.md) | Particle sprites: cloud, smoke, splash, spark | `cloud`, `smoke`, `splash`, `spark` |
| [07-audio.md](07-audio.md) | Optional upgrades for the synthesised sound effects and music | `assets/sfx/*` |
| [08-voice.md](08-voice.md) | The narrator's full script, for recording (ElevenLabs or a voice artist) | `assets/vo/*` |

**Priority:** if you only have time for a few, do them in this order. They are the most visible on screen.
1. `cockpit`
2. `logo`
3. `planet_ocean`
4. `nebula_1`…`nebula_4`
5. `pad` + `pad_glow`
6. `rock`
7. `planet_ringed` + `ring`
8. `hull_plating`
9. The rest

## How to make one
1. Open the brief and copy its prompt. Paste the **MASTER STYLE** block below in front of it and the **DELIVERY** block after it.
2. Attach the files the brief names. These are your reference frames (the purple ringed-planet night frames, the geometric fleet sheet, the cockpit image) and, where the brief says so, a guide from `docs/assets/templates/`.
3. Check the delivery against the brief's **Accept if** list. GPT often drifts on size, flat backgrounds and seams, so ask again if it fails a check.
4. Install it:
   ```bash
   python3 tools/install_art.py <slot> ~/Downloads/<file>.png
   python3 tools/install_art.py --list          # what is installed
   python3 tools/install_art.py --remove <slot> # back to the stand-in
   ```
   The tool keys out magenta, turns black into transparency where the slot needs it, blends the seams of tiles and planet maps, and resizes the picture to its slot's size. It saves a WebP into `assets/img/`, marks the slot installed in `assets/art.json` and bumps the art version, so browsers fetch the new file. Your original is copied to `../QuadLand - art source/`.
5. Reload the game.

## MASTER STYLE (paste before every image prompt)
```
Stylised 3D animated-series look for a children's space adventure: soft rounded forms, clean glossy CG surfaces, gentle ambient occlusion, soft rim light, friendly and wondrous. Never photoreal, no film grain, no lens dirt, no text or letters unless the prompt asks for them, no logos, no people, no creatures. Mood: a purple space night. Deep indigo and violet shadows, magenta-pink and teal-cyan glows, small warm-orange accents. Palette anchors: deep space #05030F, indigo #120A3A, violet #7B3CFF, magenta #FF3EA5, holo cyan #5CF2FF, teal #19E3D2, warm orange #FF9A3C, lavender #C9A7FF, hull white #F2F5FB, steel #AAB6CC, navy #141A3A.
```

## DELIVERY (paste after every image prompt; then the line for the brief's background type)
```
One single image at exactly the size stated (or the closest size your tool offers at the same aspect ratio), full-bleed, nothing cropped at the edges, no border, no frame, no watermark, no caption, no signature.
```
Background lines (the brief says which one):
- **MAGENTA**: `The background must be one solid, flat, unbroken magenta #F805F9 with hard clean edges around the subject: no gradient, no shadow cast onto it, no glow bleeding into it, and no magenta reflected onto the subject.` (GPT paints a fake checkerboard if you ask for transparency, so never ask for it.)
- **BLACK (light)**: `Painted on pure black #000000. The black stays black. Glowing gas and light only, fading smoothly to pure black well before every edge.`
- **BLACK (sprite)**: `A single white or light-grey element on pure black #000000, centred, with soft edges that fade to black well inside the frame. No colour.`
- **TILE**: `A seamless tileable texture seen perfectly flat and straight-on: the left edge continues the right edge and the top continues the bottom. Even lighting, no vignette, no perspective, no shadows from outside the tile, and no single feature that would repeat noticeably.`
- **PLANET MAP**: `An equirectangular 2:1 planet surface map (an unwrapped globe) of flat albedo colour only: no lighting, no shading, no highlights, no space background. The left and right edges must join seamlessly, and the top and bottom 6% (the poles) stay plain and low in detail.`

## Why these choices
- **Ships and islands are built in code, not painted.** Their footprints must be the LXD's exact shapes and areas (side 5, 8 × 4, base 7 × height 5, diagonals 6 and 8, parallel sides 8 and 12 × height 5), and a picture cannot guarantee that. GPT paints only their materials (`hull_plating`, `rock`, `pad`), which the code wraps onto the exact geometry.
- **Instruments, buttons, hearts and labels are HTML and SVG.** They must animate, react and stay crisp at every screen size. The cockpit art leaves their zones plain.
- **Light is painted on black.** Nebulae are drawn as added light, so black means "nothing" and no edge ever shows.
