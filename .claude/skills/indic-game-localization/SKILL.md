---
name: indic-game-localization
description: Localize a browser game, lesson or interactive (HTML/JS, canvas, WebGL/Three.js) into Indian languages (Hindi, Marathi, Gujarati, Telugu, Odia, alongside English) and voice it with open-source speech models running locally instead of paid APIs like ElevenLabs. Covers pulling every on-screen string into one strings JSON, translating it with consistent maths/subject vocabulary, switching language with a ?lan=xx URL parameter, Indic fonts that shape correctly (Baloo family), and an offline "voice lab" (AI4Bharat Indic-TTS, SYSPIN, Meta MMS, Indic Parler-TTS) that renders every narration line, lets a team compare voices in a showcase page, and checks clarity with a speech recogniser. Use this whenever someone wants a game, quiz or learning module in Hindi/Marathi/Gujarati/Telugu/Odia (or another Indian language), asks to translate a game's text or add a language switcher or ?lan= parameter, wants narration, voice-over or subtitles in Indian languages, wants to compare or pick TTS voices, or wants to avoid ElevenLabs or cloud TTS costs, even if they never say "localization".
---

# Indian-language localization and voice for browser games

This skill turns an English-only browser game into one that plays in English, Hindi, Marathi, Gujarati, Telugu and
Odia: every word on screen and every spoken line, switched by the URL (`index.html?lan=gu`). The voice comes from
open speech models run on the developer's own machine, so there is no per-character bill and no account to manage.

It was built while localizing *Spaceship Mission* (a Three.js maths game teaching the area of quadrilaterals), and
every pitfall listed below actually happened there. The scripts in `scripts/` are that project's working tools,
generalized.

**What you produce:**

| Output | Where (the layout the scripts expect) |
|---|---|
| Every string, every language | `assets/i18n/strings.json` |
| The runtime that picks the language | `src/…/i18n.js` (from `scripts/i18n.js`) |
| Fonts for the four Indian scripts | `assets/fonts/Baloo*.woff2` (from `assets/fonts/`) |
| A local voice lab with ~23 voices | `voice-lab/` (from `scripts/voice-lab/`) |
| A showcase page to compare voices | `voice-lab/index.html` (publish it for the team) |
| Narration per language | `assets/vo/<lan>/<id>.m4a` + `vo.json` (English stays in `assets/vo/`) |
| Checks | `tools/i18n_check.py`, `voice-lab/asr_check.py`, screenshots per language |

## Settle these first

Ask, or read the project, before writing anything. Each one changes the work:

1. **Language codes and the URL contract.** Default `en hi mr gu te od`, chosen by `?lan=` (and `?lang=`). If the
   team already ships modules with a language parameter, match their codes exactly: the team behind this skill uses
   `od` for Odia although ISO 639-1 says `or`, so accept both (`aliases` in the strings file) and pass the team's code
   on to any embedded module.
2. **An existing glossary.** A learning module, a textbook or an older locale file in the same subject fixes the words
   (वर्ग or चौकोर for "square"?). Reuse it so a child meets one word for one idea across products. If there is
   none, use `references/glossary.md`.
3. **What is spoken.** List the narration lines and how the game plays them (a voice manager, `<audio>` tags, Web
   Audio). Lines that are both captions and speech should be shown once, not twice.
4. **Commercial use.** If the game will be sold or deployed by a company, only some voice engines qualify (MIT,
   Apache-2.0, CC-BY with credit). Meta MMS (CC-BY-NC) and the macOS voices are for prototypes only.

## The work, in order

### 1. Find every string

Text hides in more places than the HTML. Search all of these and list each string with where it is used:

- static HTML text, `title`, `alt`, `aria-label`, `placeholder`, the `<title>` element;
- string literals assigned to `textContent`, `innerHTML`, template literals that build labels, and `alert`/toasts;
- **status words** set from code (`status('CRUISING')`), units (`km`, `m`, `sq units`), and numbers with words
  (`ALT ${n} m`);
- **text drawn into a canvas or a WebGL texture** (scores, labels painted on 3D objects). These need the language's
  font loaded before drawing, and their layout must survive much longer words;
- the narration script and subtitles;
- **words painted into pictures** (title art, logos, a welcome screen, a sticker on a 3D model). The strings file
  cannot reach them: list each for the art team (one picture per language, or a text layer over a word-free picture).
  Look inside embedded modules too; the lesson here translated every button but kept an English title in its art;
- text the code **compares**: `caption.textContent.startsWith('Drag')` silently breaks once translated. Refactor these
  to compare keys (`hud.captionKey === 'cap.steer'`).

`grep -nE "textContent|innerHTML|innerText|fillText|aria-label|'[A-Z][A-Za-z ,.!?']{3,}'" src` is a good start.

### 2. One strings file

Put every string in `assets/i18n/strings.json`, one section per language, the same keys in each:

```json
{
  "defaultLanguage": "en",
  "languages": { "en": { "name": "English", "native": "English", "html": "en", "script": "latn" },
                 "od": { "name": "Odia", "native": "ଓଡ଼ିଆ", "html": "or", "script": "orya" } },
  "aliases": { "or": "od", "ory": "od" },
  "en": { "ui.play": "PLAY", "feed.alt": "ALT {n} m", "vo.welcome": "Welcome, Commander!" },
  "od": { "ui.play": "ଖେଳନ୍ତୁ", "feed.alt": "ଉଚ୍ଚତା {n} ମି", "vo.welcome": "ସ୍ୱାଗତ, କମାଣ୍ଡର!" }
}
```

- Keys name the role, grouped by a prefix: `ui.`, `cap.` (instructions), `ck.` (a screen), `unit.`, `vo.` (spoken
  lines, whose ids match the narration manifest).
- `{n}` placeholders are filled by code; word order differs by language, so never build sentences by joining pieces.
- `html` is the BCP-47 code for `<html lang>` (Odia is `or` to the browser); `script` picks the font.
- Run `python3 tools/i18n_check.py` after every edit: same keys everywhere, matching placeholders, no Latin letters
  in a spoken Indian-language line.

`references/runtime.md` has the full schema notes.

### 3. Translate

Translate yourself, carefully, then say plainly that a native speaker who knows the subject should review it,
especially for children. Rules that matter:

- **Register:** match the product's. For Indian edtech the polite form is usual (हिन्दी आप/करें, मराठी तुम्ही/करा,
  ગુજરાતી તમે/કરો, తెలుగు మీరు/చేయండి, ଓଡ଼ିଆ ଆପଣ/କରନ୍ତୁ).
- **Vocabulary:** from the project's glossary ("Settle these first"), else `references/glossary.md`. Keep each term
  identical across UI, subtitles and narration.
- **Digits:** keep Western digits (0-9) on screen in every language: NCERT books use them, and numbers stay identical
  across the UI, 3D labels and subtitles. Some state boards print native digits (Marathi-medium Balbharati, for one);
  if a client wants that, convert at display time, never in the strings. The voice tool says digits as words.
- **Formulas:** symbols (`½ × d₁ × d₂`) can stay as they are; spoken lines should say the idea in words in natural
  phrasing ("half the product of the two diagonals"), not read symbols aloud.
- **Buttons:** short imperatives that fit the button (GO → उतारें, NEXT → अगला). Check the longest language
  (usually Telugu) in the real UI.
- **Names of buttons inside sentences** must use the translated label the player sees.

### 4. Wire the runtime

Copy `scripts/i18n.js` into the game. It reads the strings file, picks the language from `?lan=`/`?lang=` (with
aliases; unknown codes fall back to English), sets `<html lang>`, `data-script` and a `lang-xx` body class, and gives
`t(key, vars)` and `apply()` (fills `data-i18n="key"` text and `data-i18n-attr="aria-label:key"` attributes).

- Load it **first** in boot, before anything draws text: `await i18n.load(); i18n.apply();`.
- Replace every literal from step 1 with `t('key')`. Watch for a local variable named `t` (a timer, a tween value)
  shadowing the import: calling it then throws "t is not a function".
- Captions and prompts: pass keys, remember the current key, compare keys.
- An embedded module (an iframe lesson) gets the language passed on: `src = lesson.html?lan=${i18n.lang}`.
- The voice loader reads lines through `t('vo.' + id)` and recordings from `assets/vo/<lan>/vo.json`
  (`references/runtime.md` shows the loader changes). A language without recordings keeps subtitles; the browser's
  own speech is only a fallback when it has a voice for that language, because an English voice reading Gujarati
  script is worse than silence.

### 5. Fonts and layout

Latin-only game fonts do not contain Indian scripts. Use the Baloo family (Ek Type, OFL): rounded and friendly, one
design per script, all weights in one variable font. `assets/fonts/` has ready subsets (script + Latin + punctuation,
all OpenType shaping features kept, ~120-150 KB each): Baloo 2 (Devanagari: hi, mr), Baloo Bhai 2 (Gujarati), Baloo
Tammudu 2 (Telugu), Baloo Bhaina 2 (Odia). CSS:

```css
@font-face { font-family: 'Baloo 2'; src: url('../assets/fonts/Baloo2-deva.woff2') format('woff2'); font-weight: 400 800; font-display: block; }
:root[data-script="deva"] { --head: 'Baloo 2', 'Exo 2', system-ui, sans-serif; --body: 'Baloo 2', 'Nunito', system-ui, sans-serif; }
/* joined scripts: letter-spacing breaks the joins (and Devanagari's headline); slanted titles are a Latin habit */
:root:not([data-script="latn"]) body * { letter-spacing: 0 !important; }
:root:not([data-script="latn"]) .title { font-style: normal; line-height: 1.12; }
```

- Give text that is painted with `background-clip: text` some padding, or marks above and below the letters (and
  italic overhangs) are cut off.
- Canvas text: `await document.fonts.load('800 32px "Baloo 2"')` before the first draw, and read the font stack from
  the CSS variables so the canvas uses the same font.
- Expect strings 1.5-3× longer (Telugu, Odia). Let labels wrap or shrink, keep one-word labels on one line
  (`white-space: nowrap`), and size secondary text by the primary (a unit under a number) so a long unit word does not
  shrink the number.
- To make new subsets (another weight range or script), see `references/runtime.md`. Always compare the subset with
  the full font after subsetting (`references/qa.md`): a subset that drops shaping features breaks conjuncts silently.

### 6. Voices

Read `references/voices.md` before this step: it has the engines, licences, download sizes, every setup error we hit
and how to choose. In short:

1. Copy `scripts/voice-lab/` to `voice-lab/` in the project, `scripts/make_vo.py` to `tools/`, and run
   `voice-lab/setup.sh` (Python 3.9-3.11, ~15 GB, 15-20 minutes on a fast connection). Add `voice-lab/.venv/` and
   `voice-lab/models/` to `.gitignore`.
2. Set `project`, `narrator` and `sample_lines` in `voice-lab/voices.json` (3-4 typical lines from the strings file: a
   greeting, one with subject words, one with numbers, one excited).
3. Make the lines speakable: every number the lines use needs its words in `voice-lab/textnorm.py` (`NUMBERS`). A
   missing number stops the render instead of being skipped. Add what the game needs and have a speaker check them.
4. `cd voice-lab && .venv/bin/python lab.py samples`: every voice reads the sample lines (about a second per line).
5. `.venv/bin/python asr_check.py samples`: a speech recogniser transcribes each clip; clarity = how much came back
   exactly as written.
6. `.venv/bin/python build_page.py --publish page.html`: the showcase (`index.html`), and a body-only copy to
   publish. Publish it for the team (an artifact, an internal page) with the clips (renamed `.mp4` where a host does
   not serve `.m4a`).
7. Choose a narrator per language in `assets/vo/voices.json` and run `python3 tools/make_vo.py --lang all`. Then
   `asr_check.py vo ../assets/vo/<lan>` for every language, and fix any line over ~25%.
8. **When the script changes later** (a reviewer adds hints, rewords a line, drops one): edit the line in every
   language of the strings file and in `assets/vo/lines.json`, run `tools/i18n_check.py`, then `make_vo.py --lang all`
   again. It renders only the lines whose words changed and deletes the clips of lines taken out of the script (never
   a human recording). Check just the new lines with `asr_check.py vo ../assets/vo/<lan> <id prefix>`. Keep the voice
   lab installed until the script settles: removing `.venv/` and `models/` saves ~15 GB but a re-render then needs
   `setup.sh` again.

Be honest with the user about what this is: Claude does not synthesize speech itself; it sets up and runs open models
on their machine. Clarity scores catch broken audio, not warmth or accent, so a person has to listen before release.

### 7. Check it

`references/qa.md` has the commands. At least:

- `python3 tools/i18n_check.py` passes.
- A screenshot of every screen in every language, at the target screen sizes (the real device sizes, including a
  laptop browser tab like 1366×638 and a phone held upright). Look for overflow, clipped marks, letter spacing,
  buttons whose labels do not fit, and canvas text in the wrong font.
- A shaping check: render a few words per script with the full font, the subset and a system font side by side.
- Every `?lan=` value, the aliases and an unknown code load without errors and decode every clip
  (`scripts/lang_probe.py`).
- Clarity of every narration line; measured pitch against each voice's gender label.

## Pitfalls we hit

| What happened | Fix |
|---|---|
| An idle-caption check compared English text and fired every frame once translated | Compare keys, not text |
| A local `let t = 0` shadowed the imported `t()` | Rename the local; grep for `const t`/`let t` in every file you touch |
| Letter-spacing on headings pulled Devanagari and Telugu letters apart | `letter-spacing: 0` for every non-Latin script |
| Gradient-filled titles lost the tops of letters | Padding on the painted element; taller line-height for Indian scripts |
| The area number on a 3D label shrank to a speck in Telugu | Size the unit line by the number's width, not the reverse |
| Indic TTS read nothing for "5"; English words vanished | Numbers to words per language; keep spoken lines in their own script |
| The Hindi model has no danda (।); Telugu text had zero-width non-joiners; Odia ଡ଼/ଢ଼ arrived decomposed | `textnorm.speakable()` normalizes per model and refuses unknown characters |
| AI4Bharat configs point at the trainer's disk (`models/v1/…/speakers.pth`) | `lab.py` writes a patched `config.lab.json` |
| Coqui TTS 0.22 pins numpy 1.22 and spaCy that do not resolve on a current Mac | Install it `--no-deps` with `requirements.txt`; `bangla==0.0.2`, `pandas<2` |
| `characters_class` passed as a class broke the SYSPIN tokenizer | Pass the dotted string `'TTS.tts.models.vits.VitsCharacters'` |
| MMS outputs 16 kHz, which AAC at 64 kbps refuses | Encode as `aac@22050` |
| Five languages of narration at 64 kbps quadrupled the game's own size | 32 kbps AAC mono: speech below 8 kHz within 1 dB of 64 kbps, half the bytes; a player downloads only their language |
| The Gujarati Indic-TTS voice spoke at two-thirds of natural speed | Calibrate `pace` per voice against MMS in the same language |
| A speech recogniser "lost" whole sentences across the synthesizer's digital silence | Transcribe sentence by sentence (split at silences) |
| Two models' gender labels disagree with their measured pitch | Show measured pitch beside the label; let people listen |
| Indic Parler-TTS returned 401 | It is gated: the user accepts its terms on Hugging Face and sets `HF_TOKEN` |
| A one-take ElevenLabs recording: the recogniser's word times were 0.4 s out where lines ran close, and the take was read from an older script | `split_vo.py` finds each line by its words wherever it was read, cuts at the pauses found in the audio, reports lines missing from the take |
| Where a take ran two lines close, the breath taken for the next line (after a dip too short to count as a pause) stuck to the end of the clip before it | A breath is 0.1 s or more of quiet (under -36 dB), pitchless, dull noise (centre under 5.5 kHz): clips end before it. The last "th" of "width" is as quiet and pitchless but centres near 8.7 kHz, so it stays |

## Files in this skill

- `scripts/i18n.js`: the runtime (`t`, `apply`, `?lan=`).
- `scripts/i18n_check.py`: checks the strings file (and `assets/vo/lines.json` if the game has one).
- `scripts/make_vo.py`: renders each language's narration from the strings file into `assets/vo/<lan>/`.
- `scripts/split_vo.py`: cuts a recording that holds many lines in one file (a voice actor's take, an ElevenLabs export) into the per-line clips, with breathing room, and marks them as recordings.
- `scripts/lang_probe.py`: opens the game once per `?lan=` value and reports what loaded (and screenshots it).
- `scripts/voice-lab/`: `lab.py` (engines, `samples`, `render`, `say`), `textnorm.py`, `asr_check.py`,
  `build_page.py` + `page_template.html` (the showcase), `voices.json` (the catalogue, with calibrated paces),
  `setup.sh`, `requirements.txt`, `README.md`.
- `assets/fonts/`: Baloo subsets for Devanagari, Gujarati, Telugu and Odia, and their licence.
- `references/runtime.md`: the strings schema, the runtime and voice-loader changes, CSS, font subsetting.
- `references/voices.md`: engines, licences, setup, quirks, choosing a narrator, Indic Parler-TTS.
- `references/glossary.md`: maths and UI vocabulary in all five languages, number words, register.
- `references/qa.md`: the checks, with commands.
