# 03 · Deep space: nebulae and planets

Deep space appears on the title, in the intro, through the cockpit canopy, in the hyperspace jump and in the finale. Today its sky is a procedural nebula baked into a cubemap, and its planets are shaders. The pictures below are layered on top of the shaders, which keep their own lighting, day/night terminator and atmosphere rim.

---

## `nebula_1` … `nebula_4`: four nebula clouds
| | |
|---|---|
| Size | 1536 × 1024 each |
| Background | **BLACK (light)** |
| Where | Four huge glowing billboards placed around the sky, drawn as added light over the procedural nebula: ahead and up, right, behind-left, below |
| Attach | Your purple ringed-planet night frames for the colours |

Use one prompt each:
```
nebula_1: A vast soft nebula of glowing gas in magenta-pink (#FF3EA5) and violet (#7B3CFF), billowing like smoke in water, with one warm-orange (#FF9A3C) star-forming knot glowing near its centre and fine darker dust lanes winding through it. Painterly and soft, very few or no stars.
nebula_2: A soft nebula of teal-cyan (#19E3D2) and electric blue wisps, long flowing filaments sweeping diagonally, faint lavender highlights at the tips, and a gentle inner glow. Painterly and soft, very few or no stars.
nebula_3: A dim, velvety violet and lavender (#C9A7FF) nebula cloud with dark dust lanes and a few bright rims where hidden light catches its edges. Painterly and soft, very few or no stars.
nebula_4: A glowing pink and peach cloud, like sunset light inside gas: rose (#FF7AB8), peach (#FFB38A) and touches of violet in the shadows. Round and puffy. Painterly and soft, very few or no stars.
```
**Accept if:** everything fades to pure black well before every edge, with no hard rectangle visible; there is no planet, ship or text; the colours match the prompt.

---

## `planet_ocean`: the water planet seen from space
| | |
|---|---|
| Size | 2048 × 1024 |
| Background | **PLANET MAP** |
| Where | The planet the commander steers toward and descends to (cockpit, intro, finale). It turns slowly. |
| Attach | `templates/equirect_guide.png`; your purple night frames |

```
The surface map of a world covered entirely by ocean, with no land at all. Deep violet-blue seas (#120A3A to #2B1D6E) with lighter teal (#1FA8C8) patterns where the water is shallow, marbled like currents; soft white-lilac cloud bands swirling across it, including two big spiral cyclones (one in the north, one in the south) and many thin streaky clouds. Gentle and painterly, like a cartoon planet.
```
**Accept if:** there is no land; the left and right edges match (the installer blends a seam band, but large mismatched shapes still show); there is no lighting or shading baked in; the poles are plain.

---

## `planet_ringed`: the ringed giant
| | |
|---|---|
| Size | 2048 × 1024 |
| Background | **PLANET MAP** |
| Where | The ringed giant in deep space, and the one that hangs over the water planet's night sky (also reflected in its sea) |
| Attach | `templates/equirect_guide.png`; your ringed-planet frames (the violet ringed planet is the look) |

```
The surface map of a friendly gas giant: smooth horizontal bands running all the way round in lavender (#C9A7FF), lilac, cream, soft violet and a few peach (#FFB38A) stripes. Gentle wavy edges and a few small oval storms along the bands. A wide calm band at the equator. Soft, cartoon-clean, no harsh detail.
```
**Accept if:** the bands are horizontal and continuous across the left and right edges; there is no baked lighting.

---

## `ring`: the giant's rings
| | |
|---|---|
| Size | 2048 × 64 (a thin strip) |
| Background | **BLACK (light)**: black means "no ring here" (the installer turns brightness into opacity and keeps the colour) |
| Where | Read across the ring from its inner edge (the left of the strip) to its outer edge (the right) |
| Attach | `templates/ring_guide.png` |

```
A thin horizontal strip that is the cross-section of a planet's ring system, read from the inner edge (left) to the outer edge (right), painted as vertical stripes of different brightness on black: pale lavender and cream bands of many widths, a clear dark gap at about 42% across, another thin gap at about 71%, the brightest bands around 55% to 65%, fading softly to black at both ends. No texture along the strip's height; every column is one colour.
```
**Accept if:** each column is one colour from top to bottom; the strip shows the two gaps; both ends fade to black.

---

## `moon`: a small moon
| | |
|---|---|
| Size | 1024 × 512 |
| Background | **PLANET MAP** |
| Where | Two small moons in deep space, and one in the water planet's sky |

```
The surface map of a small, pale lilac-grey (#C9B8FF to #8A80A8) rocky moon: soft rounded craters of many sizes, gentle highlands and smooth darker plains, a few bright ray craters. Soft and cartoon-clean.
```
**Accept if:** the edges match; there is no baked lighting.
