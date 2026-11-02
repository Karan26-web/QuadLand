# 08 · The narrator's script (Ship AI)

Every line the game speaks, with the ID that names its file. The game ships with temp narration rendered by macOS `say` (`tools/make_vo.py`). A recorded line replaces its temp file, and the game finds lines by ID, so the order and timing never change.

**Voice.** Ship AI (the narrator): warm, clear, encouraging mission-control voice; British or Indian English; age 25-35; smiling; never rushed.

**Direction.** The Ship AI talks to the Space Commander, a child aged 10 to 13, as a friendly mission partner: warm, clear and encouraging, smiling through the lines, never sing-song or babyish. Numbers and formulas must be clear: say "times" for ×, "half" for ½ and "square units" in full. Leave a beat at full stops. Outcome lines are upbeat, even the misses: the misses are funny, not failures. Questions rise at the end.

**Recording.** Record mono at 44.1 or 48 kHz, normalised to about −16 LUFS with peaks under −1 dBFS. Trim the head and tail to 0.1 s. Name each file `assets/vo/<ID>.m4a` (AAC) or `.mp3`, then run `python3 tools/make_vo.py --adopt`: it measures every recording and keeps it from then on.

**LXD** marks the LXD's own lines (`docs/spacecraft.docx`), kept word for word. Unmarked lines are additions: the trip to the planet and the hint ladder. They are open to the LXD's review. Screen 6, the learning section, is the team's own module (`learning/`), with its own voice-overs.


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

## Landing hints, first miss: the idea of the mistake

| ID | LXD | Line |
|---|---|---|
| `h.sq.20` |  | 20 is the distance all the way around the ship. Area is the space it covers: side times side. |
| `h.sq.30` |  | Work out side times side: 5 times 5. |
| `h.re.24` |  | 24 is the distance all the way around the ship. For area, multiply length times width. |
| `h.re.40` |  | Check the width: it is 4 units. Length times width is 8 times 4. |
| `h.pa.26` |  | 26 is the distance all the way around the ship. Area is base times height. |
| `h.pa.42` |  | 42 uses the slanted side. Use the height: base times height. |
| `h.rh.20` |  | 20 is the distance all the way around the ship. Area is half of diagonal 1 times diagonal 2. |
| `h.rh.30` |  | Multiply the two diagonals, then take half. |
| `h.tr.40` |  | 40 uses only the shorter parallel side. Add both parallel sides first. |
| `h.tr.60` |  | 60 uses only the longer parallel side. Add both parallel sides first. |

## Landing hints, second miss: the working

| ID | LXD | Line |
|---|---|---|
| `w.sq` |  | Here's a hint. Work out 5 times 5. |
| `w.re` |  | Here's a hint. Work out 8 times 4. |
| `w.pa` |  | Here's a hint. Work out 7 times 5. |
| `w.rh` |  | Here's a hint. Work out half of 6 times 8. |
| `w.tr` |  | Here's a hint. Add 8 and 12, then multiply by 5, and take half. |

## Screen 13 · Mission complete

| ID | LXD | Line |
|---|---|---|
| `s13.done` | ✓ | All five spaceships have landed safely. Great work, Space Commander! |

## On-screen captions (text only, not spoken unless listed above)

| Where | Caption | Source |
|---|---|---|
| Cockpit, waiting at LAUNCH (6 s) | Press LAUNCH when you are ready. | LXD |
| First landing; any landing after 9 s idle | Drag the joystick to fly the spaceship. Stop over a landing zone and press GO. | LXD |
| Out of hearts | Out of hearts! Autopilot will land on the zone that fits. | LXD (also spoken: `o.auto`) |
| Cockpit, steering idle (7 s) | Drag the joystick to turn the ship toward the planet. | addition |
| Cockpit, lever idle (8 s) | Push the THRUST lever up. You can also tap it. | addition |
| Cockpit, DESCEND idle (4.5 s) | Hold DESCEND to fly down. | addition |
| Drone, SCAN idle (7 s) | Press SCAN to start the scanner. | addition |
