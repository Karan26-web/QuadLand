# 02 · The cockpit (Screen 2)

## `cockpit`: the cockpit interior from the pilot's seat
| | |
|---|---|
| Size | 2560 × 1440 (16:9). If your tool cannot make that, ask for the largest 16:9 it can. |
| Background | **MAGENTA** in the canopy window only. Everything else is opaque art. |
| Where | Screen 2. The game draws live 3D space through the window: drifting stars, the ocean planet, the hyperspace jump, re-entry fire, the night sea. HTML instruments sit on the dashboard in three modules: SPEED and the THRUST lever on the left, the Ship AI's voice screen in the middle, ALTITUDE and the radar socket (DESCEND and LAUNCH rise into it) on the right. |
| Fit | The picture is scaled to cover the screen and anchored to its bottom edge, so wide screens lose a little at the top and tall tablets lose the pillars at the sides. Nothing important lives on the pillars. |
| Attach | `templates/cockpit_layout.png` (the composition: window shape, dashboard edge at 69% of the height, plain instrument zones), and your cockpit reference image for the friendly stylised look |
| Stand-in | A vector cockpit in the look of the user's reference image (the frame, its light strips and status lights, the console with its hood, module bezels, side consoles and radar), drawn at the screen's real size. It already looks finished, so this painting is optional polish; once installed it replaces the vector frame and console, and the instruments stay. |

```
The inside of a friendly spaceship cockpit seen from the pilot's seat, looking straight ahead through one wide canopy window, in a stylised 3D animated look. The window has a straight top edge, cut-off (chamfered) top corners, nearly upright sides that lean out a touch, and cut-off bottom corners that run down into the dashboard, exactly where the attached layout shows it. The glass area is FLAT MAGENTA #F805F9.

Around the window: a layered frame of dark navy panels (#1A1F52 to #2B3378) with lavender-grey bevels and fine seams, and a wide lilac-grey rim (#C9C2F0, a little pinker along the top) right round the glass. The pillars are about 7% of the image width each. Glowing light strips are set into the frame: a long cyan (#5CF2FF) strip in a recess at the top centre, cyan bracket-shaped strips toward the top corners, short violet (#C56BFF) strips across the top and bottom corners, and on each pillar a vertical cyan strip high up and another lower down, a small screw head, and three small round status lights (pink, cyan, amber) in a column.

The dashboard fills the bottom 31% of the image; its top edge runs across the image at 69% of its height. It is a sculpted navy console with lavender-lit edges: a raised hood at the centre with a violet light strip along its brow, side consoles at both ends with a long cyan light and a small panel of four short stacked cyan bars, and rounded armrests in the bottom corners. Keep the three instrument zones of the layout PLAIN: no screens, no gauges, no levers, no buttons, no text. The game draws its own instruments there, so those zones must stay empty, smooth console surface.

Cool violet-cyan light comes in through the window, with soft reflections on the bevels.
```
**Accept if:**
- the window is one solid flat magenta area with clean hard edges and the layout's cut-corner shape, with no stars, planets or gradient painted inside it;
- the dashboard's top edge is close to 69% of the height (if it lands elsewhere, the `dashTop` value in `assets/art.json` can be adjusted; tell Claude);
- the instrument zones are plain, and there is no text anywhere;
- the bottom corners and the frame look finished, with no cut-off details.
