# 08 · The narrator's script (Ship AI)

Every line the game speaks, with the ID that names its file. The game ships with temp narration rendered by macOS `say` (`tools/make_vo.py`). A recorded line replaces its temp file, and the game finds lines by ID, so the order and timing never change.

**Voice.** Ship AI (the narrator): warm, clear, encouraging mission-control voice; British or Indian English; age 25-35; smiling; never rushed.

**Direction.** The Ship AI talks to the Space Commander, a child aged 10 to 13, as a friendly mission partner: warm, clear and encouraging, smiling through the lines, never sing-song or babyish. Numbers and formulas must be clear: say "times" for ×, "half" for ½ and "square units" in full. Leave a beat at full stops. Outcome lines are upbeat, even the misses: the misses are funny, not failures. Questions rise at the end.

**Recording.** Record mono at 44.1 or 48 kHz, normalised to about −16 LUFS with peaks under −1 dBFS. Trim the head and tail to 0.1 s. Name each file `assets/vo/<ID>.m4a` (AAC) or `.mp3` (another language: `assets/vo/<lan>/<ID>.m4a`), then run `python3 tools/make_vo.py --adopt` (with `--lang <lan>`): it measures every recording and keeps it from then on. The words of every line in every language are in `assets/i18n/strings.json`.

**LXD** marks the LXD's own lines (`docs/spacecraft.docx` and its reviews), kept word for word. Unmarked lines are additions: the trip to the planet, the ladder's lines for the four ships after the square, and the green zone's line. They are open to the LXD's review. Screen 6, the learning section, is the team's own module (`learning/`), with its own voice-overs.


## Screen 2 · Cockpit

| ID | LXD | Line |
|---|---|---|
| `s2.welcome` | ✓ | Welcome, Space Commander! We have a new landing mission. |
| `s2.planet` |  | Our landing site is on that ocean planet. |
| `s2.align` |  | Use the joystick to turn the ship. Put the planet inside the circle. |
| `s2.locked` |  | Locked on! Now push the thrust lever all the way up. |
| `s2.arrive` |  | Wow! A planet covered in water. |
| `s2.descend` |  | Hold the DESCEND button to fly down through the clouds. |
| `s2.safe` | ✓ | We need to find a safe place for it to land. |
| `s2.drone` | ✓ | Let's send the survey drone to check the area. |
| `s2.launch` | ✓ | Click the LAUNCH button to launch the drone. |

## Screen 3 · Dark sea and scan

| ID | LXD | Line |
|---|---|---|
| `s3.dark` | ✓ | It is too dark to see the landing zones. |
| `s3.scan` | ✓ | Start the scanner to search the area. |

## Screen 4 · Five landing zones

| ID | LXD | Line |
|---|---|---|
| `s4.found` | ✓ | Great! The scanner found five sets of landing zones. *(LXD line worded for the fifteen zones in five sets, on the user's instruction)* |
| `s4.shapes` | ✓ | Look! Each set of landing zones has a different shape. *(likewise)* |

## Screen 5 · The area hook

| ID | LXD | Line |
|---|---|---|
| `s5.ships` | ✓ | Five spaceships are on their way to this planet, and each one has a different shape. |
| `s5.match` | ✓ | Each spaceship must land on the zone that matches it perfectly, not too small and not too big. |
| `s5.need` | ✓ | To find the perfect spot for every spaceship, we need to know the area of these shapes. |
| `s5.learn` | ✓ | So let's learn how to find the area of each shape! |

## Screen 7 · Back to the mission

| ID | LXD | Line |
|---|---|---|
| `s7.back` | ✓ | Welcome back, Space Commander! Now you know how to find the area of every shape. |
| `s7.land` | ✓ | Let's land the spaceships, one by one. |

## Screens 8–12 · The landings

| ID | LXD | Line |
|---|---|---|
| `s8.here` | ✓ | Here comes our first spaceship! |
| `s8.space` | ✓ | Next, we need to find how much space the spaceship needs. |
| `s8.rule` | ✓ | Its area is side times side. |
| `s8.calc` | ✓ | Calculate the area of the spaceship, and select the land with the required area. |
| `s9.here` | ✓ | Here comes our second spaceship! |
| `s9.rule` | ✓ | Its area is length times width. |
| `s9.find` | ✓ | Find the area of the spaceship, and select the suitable land. |
| `s9.after` | ✓ | Great landings, Commander! Three more spaceships are waiting. Let's bring them down! |
| `s10.here` | ✓ | Here comes our third spaceship! |
| `s10.rule` | ✓ | Its area is base times height. |
| `s11.here` | ✓ | Here comes our fourth spaceship! |
| `s11.rule` | ✓ | Its area is half times diagonal 1 times diagonal 2. |
| `s12.here` | ✓ | Here comes our last spaceship! |
| `s12.rule` | ✓ | Its area is half times the sum of the parallel sides times the height. |

## Landing outcomes

| ID | LXD | Line |
|---|---|---|
| `o.perfect` | ✓ | Perfect match! The spaceship fits exactly. |
| `o.success` | ✓ | Landing successful! Great work, Space Commander. |
| `o.small` | ✓ | This landing zone is too small. The spaceship cannot fit safely. |
| `o.large` | ✓ | This landing zone is too large. Try to find the exact match. |
| `o.exact` | ✓ | Choose the landing zone with the exact area. |
| `o.auto` | ✓ | Out of hearts! Autopilot will land on the zone that fits. |

## Landing hints: the LXD's ladder (second review, 2026-11-06)

After a miss: the feedback (`o.small` or `o.large`), the zones change places, the question again (`o.exact`), then the rung for that miss. Each rung is spoken and shown in the hint caption. The second rung is the ship's rule line (`s8.rule` … `s12.rule` above), which is no longer said before the first try.

| ID | LXD | Line |
|---|---|---|
| `h.look.sq` | ✓ | Look closely! The spacecraft is square shaped. *(1st miss)* |
| `h.look.re` |  | Look closely! The spacecraft is rectangle shaped. |
| `h.look.pa` |  | Look closely! The spacecraft is parallelogram shaped. |
| `h.look.rh` |  | Look closely! The spacecraft is rhombus shaped. |
| `h.look.tr` |  | Look closely! The spacecraft is trapezium shaped. |
| `h.calc.sq` | ✓ | Here, multiply 5 with 5. *(3rd miss)* |
| `h.calc.re` |  | Here, multiply 8 with 4. |
| `h.calc.pa` |  | Here, multiply 7 with 5. |
| `h.calc.rh` |  | Here, multiply 6 with 8, then take half. |
| `h.calc.tr` |  | Here, add 8 and 12, multiply the sum with 5, then take half. |
| `h.green` |  | The green landing zone fits exactly. Land the spaceship there! *(4th miss: the zone that fits turns green)* |

## Screen 13 · Mission complete

| ID | LXD | Line |
|---|---|---|
| `s13.done` | ✓ | All five spaceships have landed safely. Great work, Space Commander! |

## On-screen captions (text only, not spoken unless listed above)

| Where | Caption | Source |
|---|---|---|
| Cockpit, waiting at LAUNCH (6 s) | Press LAUNCH when you are ready. | LXD |
| First landing; any landing after 9 s idle | Drag the joystick to fly the spaceship. Stop over a landing zone and press GO. | LXD |
| A miss even on the green zone (no hearts left) | Out of hearts! Autopilot will land on the zone that fits. | LXD (also spoken: `o.auto`) |
| After a miss | The rung: `h.look.*`, the rule, `h.calc.*`, `h.green` | the LXD's second review (also spoken) |
| Cockpit, steering idle (7 s) | Drag the joystick to turn the ship toward the planet. | addition |
| Cockpit, lever idle (8 s) | Push the THRUST lever up. You can also tap it. | addition |
| Cockpit, DESCEND idle (4.5 s) | Hold DESCEND to fly down. | addition |
| Drone, SCAN idle (7 s) | Press SCAN to start the scanner. | addition |
