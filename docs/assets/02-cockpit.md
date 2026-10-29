# 02 · The cockpit (Screen 2)

## `cockpit`: the cockpit interior from the pilot's seat
| | |
|---|---|
| Size | 2560 × 1440 (16:9). If your tool cannot make that, ask for the largest 16:9 it can. |
| Background | **MAGENTA** in the canopy window only. Everything else is opaque art. |
| Where | Screen 2. The game draws live 3D space through the window: drifting stars, the ocean planet, the hyperspace jump, re-entry fire, the night sea. HTML instruments sit on the dashboard: the speed gauge, the thrust lever, the Ship AI's voice screen, DESCEND and LAUNCH, and the altitude gauge. |
| Fit | The picture is scaled to cover the screen and anchored to its bottom edge, so wide phones lose a little at the sides and tall tablets a little at the top. Keep the important frame details away from the outer 8%. |
| Attach | `templates/cockpit_layout.png` (the composition: window shape, dashboard edge at 69% of the height, plain instrument zones), and your cockpit reference image for the friendly stylised look |
| Stand-in | An SVG canopy frame and a CSS dashboard panel |

```
The inside of a friendly spaceship cockpit seen from the pilot's seat, looking straight ahead through one wide, curved canopy window, in a stylised 3D animated look. The window is a big rounded trapezoid filling the upper two-thirds of the image, exactly where the attached layout shows it, and the glass area is FLAT MAGENTA #F805F9.

Around the window: thick, rounded canopy pillars and a top frame in dark navy (#141A3A to #1F2F5C) with polished steel trims (#C9D2E0), a soft cyan edge light running along the inside of the frame, and small rows of indicator lights in green, amber and cyan on both side pillars. A short overhead console strip sits at the top centre with a few round lights. Small grab handles are on the pillars.

The dashboard fills the bottom 31% of the image; its top edge runs across the image at 69% of its height. It is a smooth, rounded console in navy with subtle panel seams and a soft cyan rim light along its top edge, lit gently from the window above. Keep the dashboard PLAIN: no screens, no gauges, no levers, no buttons, no text. The game draws its own instruments in the framed zones of the layout, so those zones must stay empty, smooth console surface.

Cool violet-cyan light comes in through the window, with soft reflections on the steel.
```
**Accept if:**
- the window is one solid flat magenta area with clean hard edges, with no stars, planets or gradient painted inside it;
- the dashboard's top edge is close to 69% of the height (if it lands elsewhere, the `dashTop` value in `assets/art.json` can be adjusted; tell Claude);
- the instrument zones are plain, and there is no text anywhere;
- the bottom corners and the frame look finished, with no cut-off details.
