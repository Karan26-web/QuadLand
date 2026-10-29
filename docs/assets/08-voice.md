# 08 · The narrator's script (Ship AI)

Every line the game speaks, with the ID that names its file. The game ships with temp narration rendered by macOS `say` (`tools/make_vo.py`). A recorded line replaces its temp file, and the game finds lines by ID, so the order and timing never change.

**Voice.** Ship AI (the narrator): warm, clear, encouraging mission-control voice; British or Indian English; age 25-35; smiling; never rushed.

**Direction.** The Ship AI talks to the Space Commander, a child aged 10 to 13, as a friendly mission partner: warm, clear and encouraging, smiling through the lines, never sing-song or babyish. Numbers and formulas must be clear: say "times" for ×, "half" for ½ and "square units" in full. Leave a beat at full stops. Outcome lines are upbeat, even the misses: the misses are funny, not failures. Questions rise at the end.

**Recording.** Record mono at 44.1 or 48 kHz, normalised to about −16 LUFS with peaks under −1 dBFS. Trim the head and tail to 0.1 s. Name each file `assets/vo/<ID>.m4a` (AAC) or `.mp3`, then run `python3 tools/make_vo.py --adopt`: it measures every recording and keeps it from then on.

**LXD** marks the LXD's own lines (`docs/spacecraft.docx`), kept word for word. Unmarked lines are additions: the trip to the planet, the lesson's content (the LXD names the lesson but does not give its script), and the hint ladder. They are open to the LXD's review.


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
| `s4.found` | ✓ | Great! The scanner found five landing zones. |
| `s4.shapes` | ✓ | Look! Each landing zone has a different shape. |

## Screen 5 · The area hook

| ID | LXD | Line |
|---|---|---|
| `s5.ships` | ✓ | Five spaceships are on their way to this planet, and each one has a different shape. |
| `s5.match` | ✓ | Each spaceship must land on the zone that matches it perfectly, not too small and not too big. |
| `s5.need` | ✓ | To find the perfect spot for every spaceship, we need to know the area of these shapes. |
| `s5.learn` | ✓ | So let's learn how to find the area of each shape! |

## Screen 6 · The lesson

| ID | LXD | Line |
|---|---|---|
| `l.hello` |  | Hello, Commander! Let's learn about area together. |
| `l.area1` |  | The area of a shape is the amount of space it covers. |
| `l.area2` |  | We measure area in square units. Each small square is one square unit. |
| `l.sq.1` |  | This square has sides of 4 units. |
| `l.sq.2` |  | Let's fill it with unit squares: 4 rows, with 4 squares in each row. |
| `l.sq.3` |  | That makes 16 square units. 4 times 4 is 16. |
| `l.sq.rule` |  | So, the area of a square is side times side. |
| `l.sq.q` |  | Your turn! A square has sides of 6 units. What is its area? |
| `l.sq.h24` |  | 24 is the distance all the way around the square. Area is the space inside it. |
| `l.sq.h12` |  | 12 is 6 plus 6. For area, multiply side times side. |
| `l.sq.w` |  | Side times side is 6 times 6, which is 36. |
| `l.re.1` |  | This rectangle is 5 units long and 3 units wide. |
| `l.re.2` |  | It has 3 rows, with 5 unit squares in each row. |
| `l.re.3` |  | 5 times 3 is 15. So its area is 15 square units. |
| `l.re.rule` |  | The area of a rectangle is length times width. |
| `l.re.q` |  | A rectangle is 7 units long and 4 units wide. What is its area? |
| `l.re.h22` |  | 22 is the distance all the way around the rectangle. For area, multiply length times width. |
| `l.re.h11` |  | 11 is 7 plus 4. For area, multiply length times width. |
| `l.re.w` |  | Length times width is 7 times 4, which is 28. |
| `l.pa.1` |  | Here is a parallelogram. Its base is 6 units, and its height is 4 units. |
| `l.pa.2` |  | The height goes straight up from the base, at a right angle. It is not the slanted side. |
| `l.pa.3` |  | Watch! Cut off this triangle, and move it to the other side. |
| `l.pa.4` |  | Now it is a rectangle, 6 units long and 4 units wide. 6 times 4 is 24 square units. |
| `l.pa.rule` |  | So, the area of a parallelogram is base times height. |
| `l.pa.q` |  | A parallelogram has a base of 9 units, a height of 4 units, and a slanted side of 5 units. What is its area? |
| `l.pa.h45` |  | 45 uses the slanted side. Use the height, which makes a right angle with the base. |
| `l.pa.h28` |  | 28 is the distance all the way around it. For area, multiply base times height. |
| `l.pa.w` |  | Base times height is 9 times 4, which is 36. |
| `l.rh.1` |  | This is a rhombus. All four of its sides are the same length. |
| `l.rh.2` |  | Its diagonals are 10 units and 4 units long. They cross at a right angle. |
| `l.rh.3` |  | Let's draw a rectangle around it, 10 units long and 4 units wide. |
| `l.rh.4` |  | Look! The four corner pieces fit exactly onto the rhombus. So the rhombus is half of the rectangle. |
| `l.rh.5` |  | Half of 10 times 4 is 20 square units. |
| `l.rh.rule` |  | So, the area of a rhombus is half times diagonal 1 times diagonal 2. |
| `l.rh.q` |  | A rhombus has diagonals of 12 units and 5 units. What is its area? |
| `l.rh.h60` |  | 60 is the whole rectangle around the rhombus. Don't forget to take half! |
| `l.rh.h17` |  | 17 is 12 plus 5. Multiply the diagonals, then take half. |
| `l.rh.w` |  | Half of 12 times 5 is half of 60, which is 30. |
| `l.tr.1` |  | This is a trapezium. Its two parallel sides are 3 units and 7 units, and its height is 4 units. |
| `l.tr.2` |  | Let's make a copy, and turn it upside down. |
| `l.tr.3` |  | Put the two together, and they make a parallelogram! |
| `l.tr.4` |  | Its base is 3 plus 7, which is 10 units, and its height is 4 units. So its area is 10 times 4, which is 40. |
| `l.tr.5` |  | One trapezium is half of that: 20 square units. |
| `l.tr.rule` |  | So, the area of a trapezium is half times the sum of the parallel sides times the height. |
| `l.tr.q` |  | A trapezium has parallel sides of 5 units and 9 units, and a height of 4 units. What is its area? |
| `l.tr.h56` |  | 56 is the whole parallelogram. One trapezium is only half of it! |
| `l.tr.h36` |  | 36 uses only one of the parallel sides. Add both parallel sides first. |
| `l.tr.w` |  | 5 plus 9 is 14. Half of 14 times 4 is 28. |
| `l.ok1` |  | That's right! Well done. |
| `l.ok2` |  | Correct! Excellent work. |
| `l.ok3` |  | Spot on, Commander! |
| `l.ok4` |  | Brilliant! You've got it. |
| `l.ok5` |  | Perfect! That's the area. |
| `l.tryagain` |  | Not quite. Try again! |
| `l.lookglow` |  | Now choose the glowing answer. |

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
