# Voices: engines, setup, choosing a narrator

Contents: the engines · setup and the errors you will meet · how a line is rendered · choosing a narrator · pace ·
numbers · Indic Parler-TTS · more languages · recorded voices

## The engines

| Engine | Voices | Size | Licence | In a product | Notes |
|---|---|---|---|---|---|
| **AI4Bharat Indic-TTS** (FastPitch + HiFi-GAN, 22 kHz) | female + male for hi, mr, gu, te, or (and as, bn, brx, kn, ml, mni, pa, raj, ta, en) | ~1.5 GB per language (zip from GitHub releases) | MIT | Yes | Studio-quality IndicTTS recordings. Has a `pace` (length scale). Best default family. |
| **SYSPIN** (IISc Bangalore + ARTPARK; VITS, 22 kHz) | female + male for hi, mr, te (and bn, kn, bho, mag, mai, hne) | 333 MB per voice (Hugging Face, TorchScript) | CC-BY-4.0 | Yes, with credit | Often the clearest; no pace control. Credit: "SYSPIN, IISc Bangalore and ARTPARK". |
| **Meta MMS-TTS** (VITS, 16 kHz) | one per language: hin, mar, guj, tel, ory (and ~1,100 more) | ~145 MB each, downloads on first use | CC-BY-NC-4.0 | **No** | Trained on Bible readings; drops punctuation; good for prototypes and as a clarity baseline. |
| **macOS voices** | Lekha (hi), Geeta (te); en_IN: Rishi, Aman, Tara | built in | macOS licence | **No** | `say -v Lekha`; prototypes only. No Gujarati, Marathi or Odia voice. |
| **AI4Bharat Indic Parler-TTS** (0.9B) | named speakers per language (below), steered by a description | ~3.7 GB | Apache-2.0 | Yes | Gated on Hugging Face (see below). The most flexible and expressive. |

What the Spaceship Mission run measured (four sample lines per voice; clarity from Meta MMS-1b-all, sentence by
sentence; pitch from the cepstrum). Use it to know what normal looks like, not as a ranking: compare voices within a
language only.

| Voice | Clarity | Pitch | | Voice | Clarity | Pitch |
|---|---|---|---|---|---|---|
| hi-indic-female | 96% | 208 Hz | | te-indic-female | 92% | 219 Hz |
| hi-indic-male | 91% | 108 Hz | | te-indic-male | 90% | 193 Hz (female range) |
| hi-syspin-female | 87% | 137 Hz (male range) | | te-syspin-female | 93% | 232 Hz |
| hi-syspin-male | 89% | 131 Hz | | te-syspin-male | 92% | 150 Hz |
| mr-indic-female | 87% | 239 Hz | | od-indic-female | 86% | 258 Hz |
| mr-indic-male | 94% | 120 Hz | | od-indic-male | 88% | 145 Hz |
| mr-syspin-female | 96% | 234 Hz | | gu-indic-female | 84% | 250 Hz |
| mr-syspin-male | 93% | 138 Hz | | gu-indic-male | 92% | 125 Hz |

MMS scored 82-90% in every language; Gujarati scores lower for every engine (the recogniser's weakness, not only the
voices').

## Setup and the errors you will meet

`voice-lab/setup.sh` does all of this and is safe to re-run. What it works around, for when something changes:

- **Python 3.9-3.11.** Coqui TTS 0.22 does not install on 3.12+. macOS ships 3.9 with the Command Line Tools.
- **Coqui TTS's own pins do not resolve** (`numpy==1.22.0`, `spacy[ja]`). Install the needed packages from
  `requirements.txt`, then `pip install --no-deps TTS==0.22.0`. Two pins matter: `bangla==0.0.2` (newer releases use
  Python 3.10 syntax and crash on import) and `pandas<2` (TTS imports it).
- **"No such file … models/v1/gu/fastpitch/speakers.pth".** AI4Bharat's configs point at the trainer's disk.
  `lab.py` writes `config.lab.json` beside each config with the real path.
- **"type object 'VitsCharacters' has no attribute 'split'"** (SYSPIN). Coqui's tokenizer wants the dotted class
  name as a string: `characters_class='TTS.tts.models.vits.VitsCharacters'`.
- **The SYSPIN file list comes back empty.** The Hugging Face API sometimes answers a burst of requests with an
  error; the files have fixed names (`hi_female_vits_30hrs.pt`, `chars.txt`), so download them by name.
- **afconvert: "Couldn't set audio converter property ('!dat')".** AAC at 64 kbps needs at least 22 kHz; MMS gives
  16 kHz. Encode as `aac@22050`.
- **Indic Parler-TTS answers 401.** It is gated (see below).
- Downloads: ~19 MB/s from GitHub took 80 s per Indic-TTS language. Models total ~14 GB; keep them out of git.

## How a line is rendered (lab.py)

1. **Speakable text** (`textnorm.speakable`): NFC; digits to words in the line's language; zero-width (non-)joiners
   removed; per-model fixes (no danda in the Hindi Indic-TTS model: use a full stop; the Odia model was trained on the
   single letters ଡ଼ U+0B5C and ଢ଼ U+0B5D, not letter + nukta).
2. **Alphabet check** against the model's characters (`config.json` for Indic-TTS, `chars.txt` for SYSPIN, the
   tokenizer's vocabulary for MMS). Anything unknown stops the render: these models drop unknown characters without a
   word, so a missing letter would silently change what is said. MMS is the exception: it was trained without
   punctuation, so missing punctuation is fine and a missing mark is only a warning.
3. **Speak** with the engine. Indic-TTS splits sentences and joins them with 0.45 s of digital silence.
4. **Polish**: trim leading and trailing silence (keeping 80 ms), level to about -20 dBFS RMS with peaks under
   -1 dBFS, 10 ms fades; encode AAC `.m4a`, 32 kbps mono (everything below 8 kHz stays within 1 dB of 64 kbps, at half the size;
   24 kbps cuts everything above 8 kHz and dulls the s sounds).

## Choosing a narrator

1. **Licence first.** For a product: Indic-TTS, SYSPIN (with credit) or Parler. Never MMS or the macOS voices.
2. **Clarity within the language.** Prefer the clearest voice that suits the character; a gap of 5+ points on the
   same lines is real, a gap of 1-2 is noise.
3. **The character.** One narrator across languages should keep the same gender and energy. Check measured pitch: two
   models here speak in the other gender's range from their label (Indic-TTS Telugu "male", SYSPIN Hindi "female").
4. **Listen.** Clarity says nothing about warmth, accent or how a 10-year-old will hear it. A person on the team who
   speaks the language picks from the showcase.
5. Record the choice in `assets/vo/voices.json` (`narrator`: language → voice id) and render with
   `python3 tools/make_vo.py --lang <code>`. A changed voice re-renders every line of that language.

## Pace

Compare characters per second only within a language (scripts pack different numbers of characters into a
syllable). Use the MMS voice of the same language as the natural-reading reference and set each Indic-TTS voice's
`pace` so it lands within ~10% of it. Measured on this project: Hindi and Telugu were already natural at 0.9;
Marathi needed 0.72 (female) and 0.77 (male), Odia 0.76 and 0.84, Gujarati 0.6 (0.75 is a gentler, clearer choice for
young learners). Lower is faster. Too fast raises the clarity error; re-check after a change.

## Numbers

Every digit in a spoken line becomes words from `NUMBERS` in `textnorm.py`. A number that is not there stops the
render with "N has no words in 'xx'". Add it for every language, and have a speaker check it. Keep case endings
attached in the strings (Telugu `5తో`): the conversion replaces only the digits.

## Indic Parler-TTS (the gated one)

Named speakers per language (the model card's recommended pair first):
Hindi: Rohit, Divya (also Aman, Rani) · Marathi: Sanjay, Sunita (also Nikhil, Radha, Varun, Isha) · Gujarati: Yash,
Neha · Telugu: Prakash, Lalitha (also Kiran) · Odia: Manas, Debjani · Bengali: Arjun, Aditi · Tamil: Jaya · Kannada:
Suresh, Anu · Malayalam: Anjali, Harish · Punjabi: Divjot, Gurpreet · English: Thoma, Mary.

The user must do the gated part themselves (never accept terms for them):
1. Sign in at huggingface.co, open https://huggingface.co/ai4bharat/indic-parler-tts and accept its terms (approval
   is automatic).
2. Settings › Access Tokens › a read token.
3. `voice-lab/.venv/bin/pip install git+https://github.com/huggingface/parler-tts.git`, then
   `HF_TOKEN=hf_… .venv/bin/python lab.py samples` renders the `*-parler-*` voices in `voices.json`.

A voice's style comes from a description, for example "Divya's voice is warm, clear and friendly, at a moderate pace,
with very clear audio and no background noise." (`description` on the voice in `voices.json`). Parler is
autoregressive and slower than the others; expect several seconds per line on a laptop.

## More languages

Add a section to `strings.json` (and its `languages` entry with `html` and `script`), a font for its script, number
words in `textnorm.py`, and voices in `voices.json`:

- Indic-TTS release zips: `as bn brx en en+hi gu hi kn ml mni mr or pa raj ta te`
  (`https://github.com/AI4Bharat/Indic-TTS/releases/download/v1-checkpoints-release/<code>.zip`).
- SYSPIN: `SYSPIN/tts_vits_coquiai_<Language><Male|Female>` for Hindi, Marathi, Telugu, Kannada, Bengali, Bhojpuri,
  Chhattisgarhi, Magahi, Maithili.
- MMS: `facebook/mms-tts-<iso639-3>` (ben, tam, kan, mal, pan, asm, …); the recogniser uses the same codes.
- Baloo has a design per script: Baloo Da 2 (Bengali), Baloo Thambi 2 (Tamil), Baloo Tamma 2 (Kannada), Baloo
  Chettan 2 (Malayalam), Baloo Paaji 2 (Gurmukhi).

## Recorded voices

A recording (a voice actor, ElevenLabs) can replace any rendered line: save it as `assets/vo/<lan>/<id>.m4a` and run
`python3 tools/make_vo.py --lang <lan> --adopt`. It is measured and kept; only `--all` overwrites it.
