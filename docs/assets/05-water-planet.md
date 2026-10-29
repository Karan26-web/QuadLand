# 05 · The water planet: the landing zones

The landing zones are ancient alien landing plates. When the drone's scanner passes over the dark sea, they rise out of the water (Screen 4): flat-topped, exactly quadrilateral, with water pouring off their edges. Each one's top is exactly its shape at its area: the LXD's 20/30/25, 24/40/32, 26/42/35, 20/30/24 and 40/60/50.

Built in code: the plate's outline, a glowing rim (cool when idle, amber under the ship, green for a fit, red for a miss), a beacon on each corner, two glowing inlay bands round the sides, and the foam where the zone meets the sea. GPT paints the three surfaces below.

The sky, the living sea and the giant waves are shaders. They need no art.

---

## `rock`: the zones' sides
| | |
|---|---|
| Size | 1024 × 1024 |
| Background | **TILE** |
| Where | Round every zone's sides, from the top edge down into the water, repeating about every 3 units |
| Attach | `templates/tile_guide.png`; your purple night frames |

```
The weathered side of an ancient alien stone platform seen flat and straight-on: dark violet-slate stone (#3A2F5C to #6A5A9A) in rough horizontal layers, with shallow carved grooves, small chips and cracks, faint glints of cyan (#5CF2FF) mineral veins, and a soft wet sheen. Stylised and clean, like cartoon rock. No moss, no plants.
```
**Accept if:** it tiles; the strata are horizontal; it isn't too dark (it should read as violet, not black).

---

## `pad`: the landing plate's top
| | |
|---|---|
| Size | 1024 × 1024 |
| Background | **TILE** |
| Where | The top of every zone. This is the surface the learner compares with the ship, so it must read as a clean, flat, landable plate at a glance. It repeats about every 4 units. |
| Attach | `templates/tile_guide.png` |

```
The top surface of an alien landing plate seen straight down: smooth, polished lavender-grey stone (#B8B0D8 to #8C84B0) cut into a 4 by 4 grid of large square tiles with thin dark seams, each tile engraved with fine geometric line patterns (concentric squares, short circuit-like lines), very slightly worn. Clean, calm, even light, no shadows.
```
**Accept if:** it tiles, with the grid seams at the edges and the quarter lines; it is light enough for the glowing rim and the ship's landing reticle to read on it. (The game draws no ship shadow on purpose: a shadow the size of the ship would let a learner match the zone by eye instead of working out the area.)

---

## `pad_glow`: the plate's glowing inlay
| | |
|---|---|
| Size | 1024 × 1024 |
| Background | **TILE**, on black: black means no glow. It is read as light. |
| Where | Lights the plate's seams and lines in cyan. It must line up with `pad`, so make it from `pad`: attach the delivered `pad` and ask for its glow mask. |

```
The glow mask of the attached landing-plate texture: everything pure black, except thin glowing holo-cyan (#5CF2FF) lines exactly along the tile seams of the 4 by 4 grid and along the engraved line patterns, with small bright dots where the seams cross. Same layout, same position, nothing else.
```
**Accept if:** the lines sit on top of `pad`'s seams (check by overlaying them at 50%); the background is pure black.
