# 01 · Branding and UI

The HUD itself (hearts, pause, GO, NEXT, the joystick, captions and subtitles) is drawn in HTML and SVG and needs no art. This file covers the two pictures that brand the game.

---

## `logo`: the title logo (Screen 1)
| | |
|---|---|
| Size | 1600 × 800 (2:1) |
| Background | **MAGENTA** |
| Where | Screen 1, centred above the loading bar and PLAY, over the live 3D shot of the command ship in the nebula. It shows about 720 px wide on a laptop and 360 px on a phone. |
| Attach | `templates/logo_safe.png` (keep the logo inside the white frame), your geometric fleet sheet |
| Stand-in | The CSS wordmark "SPACESHIP / MISSION" in a cyan-to-violet and gold-to-pink gradient |

```
The title logo for a children's space game, reading exactly "SPACESHIP MISSION" in two lines: "SPACESHIP" on top, smaller, and "MISSION" below it, about 1.4 times larger. Chunky, rounded, slightly italic sci-fi letters with a glossy 3D bevel and a thick dark navy (#141A3A) outline. "SPACESHIP" is white flowing into holo cyan (#5CF2FF) with a violet (#7B3CFF) underside. "MISSION" is warm gold (#FFD27A) flowing into orange (#FF8A3D) and magenta-pink (#FF3EA5) at its base. A small friendly spaceship with a square white hull and a cyan glass dome swoops in an arc from the lower left, round the end of "MISSION", leaving a cyan-and-pink light trail. A few four-pointed sparkles. The whole logo sits inside the central 85% of the image, centred.
```
**Accept if:** the spelling is exactly SPACESHIP MISSION; the letters are fully inside the frame; the background is pure flat magenta, including inside the letters' gaps; the text is still readable when shrunk to 360 px wide.

---

## `icon`: the app icon and favicon
| | |
|---|---|
| Size | 1024 × 1024 (installed at 512 × 512) |
| Background | Opaque (part of the art) |
| Where | Browser tab, home-screen icon, store listings |
| Attach | Your purple ringed-planet night frames |

```
A square app icon. A small friendly spaceship with a square white hull, a glowing cyan glass dome and four soft blue hover jets underneath hovers above a glowing violet night sea that sparkles with cyan light. Behind it, a large lavender ringed planet hangs low in a deep indigo starry sky. Bold, simple shapes that read at 48 pixels. The ship is centred, filling about 45% of the width. Everything important stays inside the central 80%, so rounded-corner masks never cut it. No text.
```
**Accept if:** it reads at 48 px; the subject is centred; no text appears.
