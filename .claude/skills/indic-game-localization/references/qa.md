# QA: what to check, with commands

Run all of these before calling a language done. None of them replaces a native speaker playing the game.

## 1. The strings file

```bash
python3 tools/i18n_check.py
```

Same keys in every language, no empty values, `{placeholders}` matching the English, and no Latin letters in an
Indian-language spoken line (a voice model cannot read them).

## 2. Every language loads

```bash
python3 scripts/lang_probe.py --root . --langs ",hi,mr,gu,te,od,or,xx" \
  --ready "window.game && window.game.voiceReady" --shots playtest/screens/lang
```

Expect each code to report its own `lang`, `script` and Baloo font, `or` to load Odia, and `xx` (unknown) to fall
back to English, with no failed request (a missing `assets/vo/<lan>/vo.json` shows up here as a 404) and no page
error. The `--ready` expression is whatever the game exposes once its voice has loaded.

## 3. Every screen, every language, every size

Screenshot each screen of the game in each language at the sizes it will really be played at: the target laptop
browser tab (1366×638 is a common one), a tablet (1024×768), a phone held upright (390×844) and on its side
(844×390). If the game has an autoplayer or a scripted playtest, give it a language option (this project's
`playtest/mission.py --lan gu`) and run the whole thing per language. Look for:

- text overflowing a button, a pill or a card; a one-word English label wrapping into two lines;
- marks above or below letters cut off (titles painted with a gradient, tight line-heights);
- letters pulled apart by letter-spacing;
- canvas or 3D text in a fallback font, or shrunk to a speck by a long word;
- a caption or subtitle covering the play area (measure the real text at the real size when the layout depends on
  it);
- English left anywhere (search the screenshots, and grep the code for literals again).

## 4. Shaping: the subset against the full font

A font subset that lost OpenType features breaks conjuncts silently. Render a few hard words in the full font, the
subset and a system font, side by side, and compare (any static server, any browser):

```html
<meta charset="utf-8"><style>
@font-face{font-family:Full;src:url(BalooTammudu2[wght].ttf)} @font-face{font-family:Sub;src:url(BalooTammudu2-telu.woff2)}
td{font:800 40px/1.4 sans-serif;padding:4px 14px}</style>
<table><tr><td style="font-family:Full">అంతరిక్ష నౌక మిషన్</td><td style="font-family:Sub">అంతరిక్ష నౌక మిషన్</td>
<td style="font-family:'Kohinoor Telugu'">అంతరిక్ష నౌక మిషన్</td></tr></table>
```

Good test words: Hindi क्षेत्रफल, ढूँढ़ें; Marathi अंतराळयान, क्षेत्रफळ; Gujarati ક્ષેત્રફળ; Telugu మిషన్ (a final
virama), జాయ్‌స్టిక్‌ను (zero-width non-joiners), వైశాల్యం; Odia କ୍ଷେତ୍ରଫଳ, ଓହ୍ଲାନ୍ତୁ.

## 5. The narration

```bash
cd voice-lab
.venv/bin/python asr_check.py vo ../assets/vo/gu       # every line of one language, worst first
.venv/bin/python asr_check.py vo ../assets/vo/gu h.    # only the lines whose id starts with h. (new hints)
```

A speech recogniser (Meta MMS-1b-all) transcribes every clip sentence by sentence; clarity is the share of letters
heard as written. What normal looked like here: a whole language's narration at 6-11% character error (Hindi best,
Gujarati, Telugu and Odia around 10%), the four sample lines per voice at 4-18%.

Reading the result:

- **Look at "meant" and "heard", not only the number.** The recogniser writes standard spellings (Odia ଆମର comes back
  ଆମ୍ଭର, ଏଇ comes back ଏହି; Hindi अंतरिक्ष comes back अन्तरिक्ष), which costs points without anything being wrong.
- **Short lines are noisy.** One slipped syllable in a five-word line is 20-40%, and re-rendering or re-encoding the
  same line moved its score by ten points. Treat a flagged short line as "listen to this", not "broken".
- **A whole sentence missing** from "heard" while the audio has it means the recogniser lost the thread (it did this
  across long digital silences before the check split at them); check the sentence alone.
- **What it cannot hear:** warmth, accent, a wrong stress, an unnatural pause, or a word that is clear but wrong for
  a child. List the flagged lines for a native speaker, and have them play one full mission per language.

Exclamations (`!`) at the end of short Indic-TTS lines sometimes came back with a stray syllable after the last word.
Swapping `!` for `.` helped some lines and hurt others, so it is a line for a listener, not a rule.

## 6. The voices' labels

Model cards and catalogues can be wrong about a voice. The showcase measures each voice's median pitch (the cepstrum
of voiced frames: the spacing of the harmonics); under ~165 Hz reads as a male voice, above as a female one. Two of
23 voices here measured against their label, so show both and let people listen.

## 7. Licences and credits

Before release, check the narrator of every language against the engine table in `voices.md`: MIT (Indic-TTS),
Apache-2.0 (Parler) or CC-BY with a credit line in the game (SYSPIN). Never ship MMS or macOS voices in a product.
