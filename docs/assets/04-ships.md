# 04 · The ships

## Why the ships are built in code
The five quad ships must have the LXD's exact footprints, because their areas decide every landing:

| Ship | Dimensions drawn on it (LXD) | Area |
|---|---|---|
| Square | side 5, side 5 | 25 |
| Rectangle | length 8, width 4 | 32 |
| Parallelogram | base 7, height 5, slant side 6 | 35 |
| Rhombus | diagonals 6 and 8, side 5 | 24 |
| Trapezium | parallel sides 8 and 12, height 5 | 50 |

A painted ship cannot hold exact proportions, so `src/world/ships.js` builds each one from its polygon. Each has a bevelled white hull with a line of its accent colour round its walls, a raised spine, a cyan glass canopy, two engines built into the hull (glowing nozzles set into the back wall and vents on the deck), four blue hover jets underneath, landing legs and a small light on every corner. Seen from above, nothing sticks out of the shape: the canopy is sized to fit inside it and no flame leaves the hull (the LXD's review, 2026-11-05). The style follows your geometric fleet sheet: white hulls and cyan canopies.

The survey drone and the commander's ship are also built in code. The commander's ship follows your sleek mothership frame: a long grey hull with blue window strips and three engine pods with glowing orange honeycomb nozzles.

GPT's part is the material.

---

## `hull_plating`: hull panels for the five quad ships
| | |
|---|---|
| Size | 1024 × 1024 |
| Background | **TILE** |
| Where | Wrapped round the hull sides of all five quad ships, repeating about every 4.5 units. The ship tops keep their code-drawn plates, which are fitted to each exact shape. |
| Attach | `templates/tile_guide.png`; your geometric fleet sheet (the white-hull look) |

```
Clean white and very light grey (#F2F5FB to #D9E0EC) sci-fi hull plating seen flat and straight-on: rectangular panels of a few different sizes separated by thin soft seams, a handful of small rounded vents and rows of tiny rivets, a couple of thin steel-blue (#AAB6CC) access-hatch outlines, and very slight friendly wear. Bright, clean, toy-like. No text, numbers, logos or stripes.
```
**Accept if:** it tiles (no visible edge when repeated 2 × 2); it is bright, not grey; there is no text or numbers.

---

## Optional references (not loaded by the game)
If you want painted concept art for the GDD, a poster or the LXD deck, GPT can make it. The game never loads it.

```
A concept sheet of five friendly toy-like spaceships seen from straight above, on a dark navy blueprint grid, each one exactly one flat geometric shape: a square, a long rectangle (twice as long as it is wide), a slanted parallelogram, a diamond-shaped rhombus, and a trapezium whose narrow side faces forward. White hulls with a thin coloured accent stripe (orange, cyan, lime, pink, yellow), a cyan glass dome near the front that stays inside the shape, two glowing orange engine vents built into the back of the hull (no flames or engines sticking out of the shape) and four round blue hover jets near the corners. No labels.
```
