# Ship AI Voice Script (English)

Every line the Ship AI (the narrator) speaks in Spaceship Mission, in the order players hear it, for recording in ElevenLabs.

## Quick facts

- **51 lines**, about 2 min 41 s of speech.
- **37 lines are the LXD's own words** (marked **LXD**): keep them exactly.
- **One voice** for every line.
- **English only.** The five Indian languages keep their current voices. Swiftee's lines in the learning section belong to the team's module and are not part of this script.

## Recorded: all 51 lines

The ElevenLabs take of 2026-11-09 (`voice-lab/recordings/en-karan-2026-11-09.mp3`, 4 min 32 s) holds **all 51 lines** and every one of them is installed, the 11 hint lines included. `tools/split_vo.py` found each line in the take, cut it at the pauses in the audio with room before and after, left out the breaths taken for the next line, and installed it as the game's clip. Each clip was then transcribed again on its own, and all 51 match their script word for word.

The take also read the old hint lines of an earlier script ("20 is the distance all the way around the ship…", "Here's a hint. Work out 5 times 5.", …). The game no longer uses them, so they were left out.

To re-record a line, read it with the same voice and settings into one file, keep it in `voice-lab/recordings/`, and run `python3 tools/split_vo.py <file> --lang en --write`: it installs every line it finds and leaves the others as they are.

## The voice

- **Who:** the Ship AI, a friendly mission partner talking to the Space Commander, a child aged 10 to 13.
- **Sound:** warm, clear, encouraging mission control.
- **Accent and age:** British or Indian English, age 25 to 35.
- **Manner:** smiling, never rushed, never sing-song or babyish.
- **Misses are funny, not failures:** the "too small" and "too large" lines stay light.
- **Hints are slower and kinder** than instructions.
- **Numbers and rules must be clear:** every "times" and "half" distinct.

## ElevenLabs settings

- Use **the same voice and the same settings** for all 51 lines, so they sound like one person.
- A good starting point: **Eleven Multilingual v2**, stability about **50%**, similarity about **75%**, style low (**0–20%**), speaker boost **on**.
- Generate **each line separately**, so each line is its own file.
- **Paste each line exactly** as written below.
- If a word comes out wrong, **regenerate** rather than rewording, so the subtitles still match.
- Want to reword a line that is not marked LXD? Tell me first, so the subtitles and the other five languages stay in step.

## Pronunciation

- **rhombus:** ROM-bus
- **trapezium:** truh-PEE-zee-um
- **parallelogram:** pa-ruh-LEL-uh-gram
- **diagonal 1, diagonal 2:** say "diagonal one", "diagonal two"
- **DESCEND, LAUNCH:** button names, say them with a little stress

## Naming and sending the files

1. Download each line as **MP3** (ElevenLabs' default is fine).
2. Name each file **exactly** as shown below, for example `s2.welcome.mp3`.
3. Put all 51 files in **one folder**.
4. Either **zip the folder and send it**, or put it in the project at **`assets/vo/elevenlabs/`**.
5. I will then trim the silence, level the volume, convert the files to the game's format, and install them as recordings (the temporary voice will never overwrite them). The subtitles follow the new timings automatically.

## The lines

### Screen 2 · The cockpit (9 lines)

1. **`s2.welcome.mp3`**  · **LXD**
   - **Line:** Welcome, Space Commander! We have a new landing mission.
   - **Plays:** The mission's first line, in the cockpit
   - **Say it:** Warm, bright welcome. Smile through it.

2. **`s2.planet.mp3`**
   - **Line:** Our landing site is on that ocean planet.
   - **Plays:** The ocean planet comes into view
   - **Say it:** Calm, pointing it out.

3. **`s2.align.mp3`**
   - **Line:** Use the joystick to turn the ship. Put the planet inside the circle.
   - **Plays:** Before the player steers
   - **Say it:** Clear instruction, unhurried.

4. **`s2.locked.mp3`**
   - **Line:** Locked on! Now push the thrust lever all the way up.
   - **Plays:** The planet locks into the circle
   - **Say it:** Quick and pleased on "Locked on!", then the instruction.

5. **`s2.arrive.mp3`**
   - **Line:** Wow! A planet covered in water.
   - **Plays:** Out of hyperspace, the water planet fills the window
   - **Say it:** Real wonder. A small breath before "A planet…".

6. **`s2.descend.mp3`**
   - **Line:** Hold the DESCEND button to fly down through the clouds.
   - **Plays:** The DESCEND button appears
   - **Say it:** Clear. Lean on "DESCEND": it is the button's name.

7. **`s2.safe.mp3`**  · **LXD**
   - **Line:** We need to find a safe place for it to land.
   - **Plays:** Hovering over the sea
   - **Say it:** Thoughtful, mission tone.

8. **`s2.drone.mp3`**  · **LXD**
   - **Line:** Let's send the survey drone to check the area.
   - **Plays:** Before the drone launch
   - **Say it:** Upbeat: a plan.

9. **`s2.launch.mp3`**  · **LXD**
   - **Line:** Click the LAUNCH button to launch the drone.
   - **Plays:** The LAUNCH button rises
   - **Say it:** Clear. Lean on "LAUNCH".

### Screen 3 · The dark sea (2 lines)

10. **`s3.dark.mp3`**  · **LXD**
   - **Line:** It is too dark to see the landing zones.
   - **Plays:** The drone's camera over a dark sea
   - **Say it:** Hushed, a little mysterious.

11. **`s3.scan.mp3`**  · **LXD**
   - **Line:** Start the scanner to search the area.
   - **Plays:** The SCAN button appears
   - **Say it:** Clear instruction.

### Screen 4 · The zones rise (2 lines)

12. **`s4.found.mp3`**  · **LXD**
   - **Line:** Great! The scanner found five sets of landing zones.
   - **Plays:** The landing zones rise out of the sea
   - **Say it:** Excited.

13. **`s4.shapes.mp3`**  · **LXD**
   - **Line:** Look! Each set of landing zones has a different shape.
   - **Plays:** Each set of zones lights up in turn
   - **Say it:** Curious, pointing out.

### Screen 5 · Why area matters (4 lines)

14. **`s5.ships.mp3`**  · **LXD**
   - **Line:** Five spaceships are on their way to this planet, and each one has a different shape.
   - **Plays:** A slow glide over the field
   - **Say it:** Storytelling, building up.

15. **`s5.match.mp3`**  · **LXD**
   - **Line:** Each spaceship must land on the zone that matches it perfectly, not too small and not too big.
   - **Plays:** The same glide
   - **Say it:** Clear. Stress "perfectly" and "not too small and not too big".

16. **`s5.need.mp3`**  · **LXD**
   - **Line:** To find the perfect spot for every spaceship, we need to know the area of these shapes.
   - **Plays:** The same glide
   - **Say it:** Thoughtful, leading into the lesson.

17. **`s5.learn.mp3`**  · **LXD**
   - **Line:** So let's learn how to find the area of each shape!
   - **Plays:** Just before the lesson
   - **Say it:** Enthusiastic hand-off.

### Screen 7 · Back to the mission (2 lines)

18. **`s7.back.mp3`**  · **LXD**
   - **Line:** Welcome back, Space Commander! Now you know how to find the area of every shape.
   - **Plays:** Back from the lesson
   - **Say it:** Warm and proud of the learner.

19. **`s7.land.mp3`**  · **LXD**
   - **Line:** Let's land the spaceships, one by one.
   - **Plays:** The camera dives toward the first zone
   - **Say it:** Upbeat, determined.

### Screens 8–12 · The five landings (14 lines)

20. **`s8.here.mp3`**  · **LXD**
   - **Line:** Here comes our first spaceship!
   - **Plays:** The first ship streaks in (square)
   - **Say it:** Excited. Stress "first".

21. **`s8.space.mp3`**  · **LXD**
   - **Line:** Next, we need to find how much space the spaceship needs.
   - **Plays:** The camera circles the first ship
   - **Say it:** Calm explanation.

22. **`s8.rule.mp3`**  · **LXD**
   - **Line:** Its area is side times side.
   - **Plays:** Second hint, after a second wrong landing on the square
   - **Say it:** Slow, clear, teacherly: every "times" distinct.

23. **`s8.calc.mp3`**  · **LXD**
   - **Line:** Calculate the area of the spaceship, and select the land with the required area.
   - **Plays:** Above the zones, before flying (ships 1, 3 and 5)
   - **Say it:** Clear instruction.

24. **`s9.here.mp3`**  · **LXD**
   - **Line:** Here comes our second spaceship!
   - **Plays:** The second ship streaks in (rectangle)
   - **Say it:** Excited. Stress "second".

25. **`s9.rule.mp3`**  · **LXD**
   - **Line:** Its area is length times width.
   - **Plays:** Second hint, after a second wrong landing on the rectangle
   - **Say it:** Slow, clear, teacherly: every "times" distinct.

26. **`s9.find.mp3`**  · **LXD**
   - **Line:** Find the area of the spaceship, and select the suitable land.
   - **Plays:** Above the zones, before flying (ships 2 and 4)
   - **Say it:** Clear instruction.

27. **`s9.after.mp3`**  · **LXD**
   - **Line:** Great landings, Commander! Three more spaceships are waiting. Let's bring them down!
   - **Plays:** After the second ship lands
   - **Say it:** Cheerful, rallying.

28. **`s10.here.mp3`**  · **LXD**
   - **Line:** Here comes our third spaceship!
   - **Plays:** The third ship streaks in (parallelogram)
   - **Say it:** Excited. Stress "third".

29. **`s10.rule.mp3`**  · **LXD**
   - **Line:** Its area is base times height.
   - **Plays:** Second hint, after a second wrong landing on the parallelogram
   - **Say it:** Slow, clear, teacherly: every "times" distinct.

30. **`s11.here.mp3`**  · **LXD**
   - **Line:** Here comes our fourth spaceship!
   - **Plays:** The fourth ship streaks in (rhombus)
   - **Say it:** Excited. Stress "fourth".

31. **`s11.rule.mp3`**  · **LXD**
   - **Line:** Its area is half times diagonal 1 times diagonal 2.
   - **Plays:** Second hint, after a second wrong landing on the rhombus
   - **Say it:** Slow, clear, teacherly: every "times" distinct. Say "diagonal one" and "diagonal two".

32. **`s12.here.mp3`**  · **LXD**
   - **Line:** Here comes our last spaceship!
   - **Plays:** The last ship streaks in (trapezium)
   - **Say it:** Excited. Stress "last".

33. **`s12.rule.mp3`**  · **LXD**
   - **Line:** Its area is half times the sum of the parallel sides times the height.
   - **Plays:** Second hint, after a second wrong landing on the trapezium
   - **Say it:** Slow, clear, teacherly: every "times" distinct. One breath if you can.

### After a landing (6 lines)

34. **`o.perfect.mp3`**  · **LXD**
   - **Line:** Perfect match! The spaceship fits exactly.
   - **Plays:** A ship lands on the zone that fits
   - **Say it:** Celebration!

35. **`o.success.mp3`**  · **LXD**
   - **Line:** Landing successful! Great work, Space Commander.
   - **Plays:** Right after "Perfect match"
   - **Say it:** Proud and warm.

36. **`o.small.mp3`**  · **LXD**
   - **Line:** This landing zone is too small. The spaceship cannot fit safely.
   - **Plays:** A ship tips off a zone that is too small
   - **Say it:** Sympathetic and light: a miss is funny, never a failure.

37. **`o.large.mp3`**  · **LXD**
   - **Line:** This landing zone is too large. Try to find the exact match.
   - **Plays:** A ship crashes onto a zone that is too big
   - **Say it:** Sympathetic and light, same as above.

38. **`o.exact.mp3`**  · **LXD**
   - **Line:** Choose the landing zone with the exact area.
   - **Plays:** After a miss, once the zones have changed places
   - **Say it:** Encouraging: a fresh try.

39. **`o.auto.mp3`**  · **LXD**
   - **Line:** Out of hearts! Autopilot will land on the zone that fits.
   - **Plays:** Even the green zone was missed: the autopilot takes over
   - **Say it:** Reassuring, never disappointed.

### Hints after a wrong landing (11 lines)

40. **`h.look.sq.mp3`**  · **LXD**
   - **Line:** Look closely! The spacecraft is square shaped.
   - **Plays:** First hint, after a first wrong landing on the square
   - **Say it:** A friendly nudge. Stress "square".

41. **`h.look.re.mp3`**
   - **Line:** Look closely! The spacecraft is rectangle shaped.
   - **Plays:** First hint, after a first wrong landing on the rectangle
   - **Say it:** A friendly nudge. Stress "rectangle".

42. **`h.look.pa.mp3`**
   - **Line:** Look closely! The spacecraft is parallelogram shaped.
   - **Plays:** First hint, after a first wrong landing on the parallelogram
   - **Say it:** A friendly nudge. Stress "parallelogram". Say "parallelogram" as pa-ruh-LEL-uh-gram.

43. **`h.look.rh.mp3`**
   - **Line:** Look closely! The spacecraft is rhombus shaped.
   - **Plays:** First hint, after a first wrong landing on the rhombus
   - **Say it:** A friendly nudge. Stress "rhombus". Say "rhombus" as ROM-bus.

44. **`h.look.tr.mp3`**
   - **Line:** Look closely! The spacecraft is trapezium shaped.
   - **Plays:** First hint, after a first wrong landing on the trapezium
   - **Say it:** A friendly nudge. Stress "trapezium". Say "trapezium" as truh-PEE-zee-um.

45. **`h.calc.sq.mp3`**  · **LXD**
   - **Line:** Here, multiply 5 with 5.
   - **Plays:** Third hint, after a third wrong landing on the square
   - **Say it:** Slow and clear with the numbers.

46. **`h.calc.re.mp3`**
   - **Line:** Here, multiply 8 with 4.
   - **Plays:** Third hint, after a third wrong landing on the rectangle
   - **Say it:** Slow and clear with the numbers.

47. **`h.calc.pa.mp3`**
   - **Line:** Here, multiply 7 with 5.
   - **Plays:** Third hint, after a third wrong landing on the parallelogram
   - **Say it:** Slow and clear with the numbers.

48. **`h.calc.rh.mp3`**
   - **Line:** Here, multiply 6 with 8, then take half.
   - **Plays:** Third hint, after a third wrong landing on the rhombus
   - **Say it:** Slow and clear with the numbers.

49. **`h.calc.tr.mp3`**
   - **Line:** Here, add 8 and 12, multiply the sum with 5, then take half.
   - **Plays:** Third hint, after a third wrong landing on the trapezium
   - **Say it:** Slow and clear with the numbers.

50. **`h.green.mp3`**
   - **Line:** The green landing zone fits exactly. Land the spaceship there!
   - **Plays:** Fourth hint: the zone that fits turns green
   - **Say it:** Helpful, pointing the way.

### Screen 13 · Mission complete (1 line)

51. **`s13.done.mp3`**  · **LXD**
   - **Line:** All five spaceships have landed safely. Great work, Space Commander!
   - **Plays:** Mission complete, with the fanfare and confetti
   - **Say it:** Triumphant and warm.

## All lines at a glance (file name, then line)

- `s2.welcome.mp3` · Welcome, Space Commander! We have a new landing mission.
- `s2.planet.mp3` · Our landing site is on that ocean planet.
- `s2.align.mp3` · Use the joystick to turn the ship. Put the planet inside the circle.
- `s2.locked.mp3` · Locked on! Now push the thrust lever all the way up.
- `s2.arrive.mp3` · Wow! A planet covered in water.
- `s2.descend.mp3` · Hold the DESCEND button to fly down through the clouds.
- `s2.safe.mp3` · We need to find a safe place for it to land.
- `s2.drone.mp3` · Let's send the survey drone to check the area.
- `s2.launch.mp3` · Click the LAUNCH button to launch the drone.
- `s3.dark.mp3` · It is too dark to see the landing zones.
- `s3.scan.mp3` · Start the scanner to search the area.
- `s4.found.mp3` · Great! The scanner found five sets of landing zones.
- `s4.shapes.mp3` · Look! Each set of landing zones has a different shape.
- `s5.ships.mp3` · Five spaceships are on their way to this planet, and each one has a different shape.
- `s5.match.mp3` · Each spaceship must land on the zone that matches it perfectly, not too small and not too big.
- `s5.need.mp3` · To find the perfect spot for every spaceship, we need to know the area of these shapes.
- `s5.learn.mp3` · So let's learn how to find the area of each shape!
- `s7.back.mp3` · Welcome back, Space Commander! Now you know how to find the area of every shape.
- `s7.land.mp3` · Let's land the spaceships, one by one.
- `s8.here.mp3` · Here comes our first spaceship!
- `s8.space.mp3` · Next, we need to find how much space the spaceship needs.
- `s8.rule.mp3` · Its area is side times side.
- `s8.calc.mp3` · Calculate the area of the spaceship, and select the land with the required area.
- `s9.here.mp3` · Here comes our second spaceship!
- `s9.rule.mp3` · Its area is length times width.
- `s9.find.mp3` · Find the area of the spaceship, and select the suitable land.
- `s9.after.mp3` · Great landings, Commander! Three more spaceships are waiting. Let's bring them down!
- `s10.here.mp3` · Here comes our third spaceship!
- `s10.rule.mp3` · Its area is base times height.
- `s11.here.mp3` · Here comes our fourth spaceship!
- `s11.rule.mp3` · Its area is half times diagonal 1 times diagonal 2.
- `s12.here.mp3` · Here comes our last spaceship!
- `s12.rule.mp3` · Its area is half times the sum of the parallel sides times the height.
- `o.perfect.mp3` · Perfect match! The spaceship fits exactly.
- `o.success.mp3` · Landing successful! Great work, Space Commander.
- `o.small.mp3` · This landing zone is too small. The spaceship cannot fit safely.
- `o.large.mp3` · This landing zone is too large. Try to find the exact match.
- `o.exact.mp3` · Choose the landing zone with the exact area.
- `o.auto.mp3` · Out of hearts! Autopilot will land on the zone that fits.
- `h.look.sq.mp3` · Look closely! The spacecraft is square shaped.
- `h.look.re.mp3` · Look closely! The spacecraft is rectangle shaped.
- `h.look.pa.mp3` · Look closely! The spacecraft is parallelogram shaped.
- `h.look.rh.mp3` · Look closely! The spacecraft is rhombus shaped.
- `h.look.tr.mp3` · Look closely! The spacecraft is trapezium shaped.
- `h.calc.sq.mp3` · Here, multiply 5 with 5.
- `h.calc.re.mp3` · Here, multiply 8 with 4.
- `h.calc.pa.mp3` · Here, multiply 7 with 5.
- `h.calc.rh.mp3` · Here, multiply 6 with 8, then take half.
- `h.calc.tr.mp3` · Here, add 8 and 12, multiply the sum with 5, then take half.
- `h.green.mp3` · The green landing zone fits exactly. Land the spaceship there!
- `s13.done.mp3` · All five spaceships have landed safely. Great work, Space Commander!

## Checklist

- [ ] `s2.welcome.mp3`
- [ ] `s2.planet.mp3`
- [ ] `s2.align.mp3`
- [ ] `s2.locked.mp3`
- [ ] `s2.arrive.mp3`
- [ ] `s2.descend.mp3`
- [ ] `s2.safe.mp3`
- [ ] `s2.drone.mp3`
- [ ] `s2.launch.mp3`
- [ ] `s3.dark.mp3`
- [ ] `s3.scan.mp3`
- [ ] `s4.found.mp3`
- [ ] `s4.shapes.mp3`
- [ ] `s5.ships.mp3`
- [ ] `s5.match.mp3`
- [ ] `s5.need.mp3`
- [ ] `s5.learn.mp3`
- [ ] `s7.back.mp3`
- [ ] `s7.land.mp3`
- [ ] `s8.here.mp3`
- [ ] `s8.space.mp3`
- [ ] `s8.rule.mp3`
- [ ] `s8.calc.mp3`
- [ ] `s9.here.mp3`
- [ ] `s9.rule.mp3`
- [ ] `s9.find.mp3`
- [ ] `s9.after.mp3`
- [ ] `s10.here.mp3`
- [ ] `s10.rule.mp3`
- [ ] `s11.here.mp3`
- [ ] `s11.rule.mp3`
- [ ] `s12.here.mp3`
- [ ] `s12.rule.mp3`
- [ ] `o.perfect.mp3`
- [ ] `o.success.mp3`
- [ ] `o.small.mp3`
- [ ] `o.large.mp3`
- [ ] `o.exact.mp3`
- [ ] `o.auto.mp3`
- [ ] `h.look.sq.mp3`
- [ ] `h.look.re.mp3`
- [ ] `h.look.pa.mp3`
- [ ] `h.look.rh.mp3`
- [ ] `h.look.tr.mp3`
- [ ] `h.calc.sq.mp3`
- [ ] `h.calc.re.mp3`
- [ ] `h.calc.pa.mp3`
- [ ] `h.calc.rh.mp3`
- [ ] `h.calc.tr.mp3`
- [ ] `h.green.mp3`
- [ ] `s13.done.mp3`
