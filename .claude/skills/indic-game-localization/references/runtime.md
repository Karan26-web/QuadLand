# Runtime: the strings file, the wiring, fonts

Contents: the strings file · boot · marking HTML · strings in code · captions by key · the voice loader · embedded
modules · CSS for Indian scripts · canvas text · making font subsets

## The strings file (`assets/i18n/strings.json`)

```json
{
  "about": "Every word the player sees or hears… (a note for translators; JSON has no comments)",
  "defaultLanguage": "en",
  "languages": {
    "en": { "name": "English",  "native": "English",  "html": "en", "script": "latn" },
    "hi": { "name": "Hindi",    "native": "हिन्दी",    "html": "hi", "script": "deva" },
    "mr": { "name": "Marathi",  "native": "मराठी",    "html": "mr", "script": "deva" },
    "gu": { "name": "Gujarati", "native": "ગુજરાતી",  "html": "gu", "script": "gujr" },
    "te": { "name": "Telugu",   "native": "తెలుగు",    "html": "te", "script": "telu" },
    "od": { "name": "Odia",     "native": "ଓଡ଼ିଆ",     "html": "or", "script": "orya" }
  },
  "aliases": { "or": "od", "ory": "od", "odia": "od", "oriya": "od", "hin": "hi", "mar": "mr", "guj": "gu", "tel": "te" },
  "en": { "ui.play": "PLAY", "feed.alt": "ALT {n} m", "vo.s2.welcome": "Welcome, Space Commander!" },
  "hi": { "ui.play": "खेलें", "feed.alt": "ऊँचाई {n} मी", "vo.s2.welcome": "स्वागत है, अंतरिक्ष कमांडर!" }
}
```

- One section per language with the same keys: easy to hand one language to a translator, and `i18n_check.py` finds
  gaps. (This is the layout the ConveGenius learning modules use, so the team already knows it.)
- `html`: what `<html lang>` gets (BCP-47; Odia is `or` even when the product code is `od`). `script`: the font key
  (`latn deva gujr telu orya`).
- Key prefixes by role: `doc.` `title.` `ui.` `pause.` `aria.` `cap.` (instructions) `unit.` `tag.` `shape.` `rule.`
  per screen (`ck.`, `feed.`), and `vo.<id>` for spoken lines (`<id>` = the narration file name).
- If the game keeps a narration list (`assets/vo/lines.json`: `{ "lines": [{ "id", "lxd" }] }`), its text lives only
  in the strings file. One copy of every sentence.

## Boot

```js
import { i18n, t } from './engine/i18n.js';

const SCRIPT_FONT = { deva: 'Baloo 2', gujr: 'Baloo Bhai 2', telu: 'Baloo Tammudu 2', orya: 'Baloo Bhaina 2' };

async function boot() {
  await i18n.load(); i18n.apply();                  // first: every word, then the voice, comes from it
  const fonts = ['800 32px "Exo 2"', '800 20px Nunito'];
  const indic = SCRIPT_FONT[i18n.meta.script];
  if (indic) fonts.push(`800 32px "${indic}"`, `600 20px "${indic}"`);
  await Promise.all(fonts.map((f) => document.fonts.load(f)));   // before any canvas draws text
  // … the rest of the game's loading (the voice loader reads i18n.lang) …
}
```

`i18n.load()` sets `document.title` from `doc.title`, `<html lang>`, `<html data-script>` and `body.lang-xx`.

## Marking HTML

```html
<button id="btnPlay"><span class="b-text" data-i18n="ui.play">PLAY</span></button>
<button id="btnPause" aria-label="Pause" data-i18n-attr="aria-label:aria.pause"></button>
<img class="logo" alt="Spaceship Mission" data-i18n-attr="alt:doc.title" />
<!-- two lines of a label: one span each, never a <br> inside one translated string -->
<span class="b-label"><span data-i18n="ck.hold">HOLD</span><br /><span data-i18n="ck.descend">DESCEND</span></span>
<!-- text beside a live number: only the word is translated -->
<div class="fd-scan"><span data-i18n="feed.scanning">SCANNING</span><span class="fd-pct">0%</span></div>
```

Keep the English in the markup as the fallback a reader sees in the HTML source.

## Strings in code

```js
ck.status(t('ck.targetLocked'));
altEl.textContent = t('feed.alt', { n: y.toFixed(1) });
labels.add(id, `<div class="tag"><b>+${diff}</b><small>${t('tag.over')}</small></div>`);
title.textContent = t(`shape.${shape.key}`).toUpperCase();   // toUpperCase only changes Latin; harmless for the rest
```

## Captions by key

Compare keys, never displayed text:

```js
caption(key, { cool = false } = {}) {
  if (!key) { this.captionKey = null; this.captionEl.hidden = true; return; }
  this.captionKey = key;
  this.captionEl.textContent = t(key); /* … */
}
// elsewhere
if (idle > 7 && hud.captionKey !== 'cap.steer') hud.caption('cap.steer');
```

A hint that is both shown and spoken: show it as a caption and speak it without a subtitle (`say(id, { subtitle: false })`),
so the same sentence is not on screen twice.

## The voice loader

What changes in a typical loader (decoded buffers + a manifest per folder):

```js
import { i18n } from './i18n.js';
const ROOT = './assets/vo/';

async load() {
  this.base = i18n.lang === 'en' ? ROOT : `${ROOT}${i18n.lang}/`;          // English stays where it was
  const [lines, man] = await Promise.all([
    fetch(ROOT + 'lines.json').then((r) => r.json()),
    fetch(this.base + 'vo.json').then((r) => (r.ok ? r.json() : { lines: {} })).catch(() => ({ lines: {} })),
  ]);
  // fetch(this.base + man.lines[id].file) for each line …
},
text(id) { return i18n.has(`vo.${id}`) ? i18n.t(`vo.${id}`) : id; },
canSynth() {   // the browser's own speech only if it has a voice for this language
  if (!window.speechSynthesis) return false;
  if (i18n.lang === 'en') return true;
  const want = (i18n.meta.html || i18n.lang).toLowerCase();
  return speechSynthesis.getVoices().some((v) => v.lang.toLowerCase().startsWith(want));
},
```

With no recording and no synthesizer voice, show the subtitle and wait its reading time
(`0.8 + words / 2.6` seconds), so the pacing still works.

## Embedded modules

Pass the language on with the module's own parameter and code: `` frame.src = `${SRC}?lan=${i18n.lang}` `` (the
ConveGenius modules read `?lan=` with the same codes, `od` for Odia). Translate the frame's `title` too.

## CSS for Indian scripts

```css
@font-face { font-family: 'Baloo 2'; src: url('../assets/fonts/Baloo2-deva.woff2') format('woff2'); font-weight: 400 800; font-display: block; }
@font-face { font-family: 'Baloo Bhai 2'; src: url('../assets/fonts/BalooBhai2-gujr.woff2') format('woff2'); font-weight: 400 800; font-display: block; }
@font-face { font-family: 'Baloo Tammudu 2'; src: url('../assets/fonts/BalooTammudu2-telu.woff2') format('woff2'); font-weight: 400 800; font-display: block; }
@font-face { font-family: 'Baloo Bhaina 2'; src: url('../assets/fonts/BalooBhaina2-orya.woff2') format('woff2'); font-weight: 400 800; font-display: block; }

:root[data-script="deva"] { --head: 'Baloo 2', 'Exo 2', system-ui, sans-serif; --body: 'Baloo 2', 'Nunito', system-ui, sans-serif; }
:root[data-script="gujr"] { --head: 'Baloo Bhai 2', 'Exo 2', system-ui, sans-serif; --body: 'Baloo Bhai 2', 'Nunito', system-ui, sans-serif; }
:root[data-script="telu"] { --head: 'Baloo Tammudu 2', 'Exo 2', system-ui, sans-serif; --body: 'Baloo Tammudu 2', 'Nunito', system-ui, sans-serif; }
:root[data-script="orya"] { --head: 'Baloo Bhaina 2', 'Exo 2', system-ui, sans-serif; --body: 'Baloo Bhaina 2', 'Nunito', system-ui, sans-serif; }

:root:not([data-script="latn"]) body * { letter-spacing: 0 !important; }   /* spacing breaks the joined letters */
:root:not([data-script="latn"]) .tt-text { font-style: normal; line-height: 1.12; }
:root:not([data-script="latn"]) .tt-l1, :root:not([data-script="latn"]) .tt-l2 { padding: 0.12em 0.14em 0.1em; }
:root:not([data-script="latn"]) .ck-btn .b-label { display: inline-block; max-width: 86%; line-height: 1.15; font-size: 0.86em; }
.ret-lock { white-space: nowrap; }   /* a one-word label in English is two words in Telugu */
```

The game's fonts are used through `--head` and `--body` everywhere, so switching the variables switches every
element. Only the player's script is downloaded (the browser fetches a face only when it is used).

## Canvas text

Read the same font stack the page uses, and size secondary text by the primary:

```js
const css = getComputedStyle(document.documentElement), font = (v, fb) => css.getPropertyValue(v).trim() || fb;
const NUM = `800 190px ${font('--head', '"Exo 2", sans-serif')}`, unit = t('unit.sq');
m.font = NUM; const wn = m.measureText(String(area)).width;
m.font = `800 62px ${font('--body', 'Nunito, sans-serif')}`;
// చదరపు యూనిట్లు is three times as wide as "sq units": cap the unit at 1.25× the number's width, or the whole
// label shrinks to fit and the number with it
const px = Math.max(30, Math.round(62 * Math.min(1, (1.25 * wn) / m.measureText(unit).width)));
```

## Making font subsets

The subsets in `assets/fonts/` cover each script plus Basic Latin, Latin-1, punctuation, arrows, subscripts and ✓.
To make others (fonttools and brotli are in the voice lab's environment):

```bash
LAT="U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-203A,U+2080-2089,U+2190-2193,U+2212,U+2713,U+25CC,U+200C-200D,U+20B9"
# the variable TTF from github.com/google/fonts (ofl/baloo2, ofl/baloobhai2, ofl/balootammudu2, ofl/baloobhaina2)
voice-lab/.venv/bin/pyftsubset "Baloo2[wght].ttf" --unicodes="$LAT,U+0900-097F,U+A8E0-A8FF" \
  --layout-features='*' --flavor=woff2 --no-hinting --output-file=assets/fonts/Baloo2-deva.woff2
# Gujarati U+0A80-0AFF · Telugu U+0C00-0C7F · Odia U+0B00-0B7F · Bengali U+0980-09FF · Tamil U+0B80-0BFF
```

`--layout-features='*'` is essential: Indian scripts form conjuncts and place vowel signs through OpenType features,
and a default subset can drop some of them. Check the result (`qa.md`, the shaping test).
