# Voice Lab

Speech in Hindi, Marathi, Gujarati, Telugu and Odia for a game, made on a Mac with open speech models.
No cloud API, no account, no per-character bill: once the models are downloaded, every line renders offline in about
a second.

- **Listen and pick:** open `index.html` through any local web server (`python3 -m http.server 8344` in the
  project, then http://127.0.0.1:8344/voice-lab/index.html), or a published copy. Each language has every voice reading
  the same game lines (`sample_lines` in `voices.json`), with its licence, its measured pitch and a clarity score. Star
  one voice per language and copy the config it gives you.
- **Voice the game:** paste the config into `assets/vo/voices.json`, then run `python3 tools/make_vo.py --lang all`.
  The game picks the language from the URL: `index.html?lan=gu`.

## The voices

23 voices from four engines, plus 10 more from a fifth once it is unlocked:

| Engine | Languages (voices) | Model | Licence | In a product |
|---|---|---|---|---|
| [AI4Bharat Indic-TTS](https://github.com/AI4Bharat/Indic-TTS) | hi, mr, gu, te, od (female, male) | FastPitch + HiFi-GAN | MIT | Yes |
| [SYSPIN](https://huggingface.co/SYSPIN) (IISc, ARTPARK) | hi, mr, te (female, male) | VITS | CC-BY-4.0 | Yes, with credit |
| [Meta MMS-TTS](https://huggingface.co/facebook/mms-tts) | hi, mr, gu, te, od (one each) | VITS | CC-BY-NC-4.0 | No: non-commercial only |
| macOS voices | hi (Lekha), te (Geeta) | Apple | macOS licence | No: prototypes only |
| [Indic Parler-TTS](https://huggingface.co/ai4bharat/indic-parler-tts) | hi, mr, gu, te, od (two named speakers each) | Parler-TTS, 0.9B | Apache-2.0 | Yes |

For a game's narrator, use an engine marked Yes. A good default is Indic-TTS for every language (one consistent
family, MIT), switching a language to SYSPIN where it measures clearer. SYSPIN's licence asks for a credit, for example
in the game's credits: *Marathi voice: SYSPIN, IISc Bangalore and ARTPARK (CC-BY-4.0).*

**Indic Parler-TTS** is the most flexible: named speakers (Divya, Rohit, Sunita, Sanjay, Neha, Yash, Lalitha,
Prakash, Debjani, Manas) whose style is steered by a sentence ("a warm, friendly voice at a moderate pace"). It is open
but gated on Hugging Face: sign in, accept its terms once on the model page, make a read token, then:

```bash
.venv/bin/pip install git+https://github.com/huggingface/parler-tts.git
HF_TOKEN=hf_... .venv/bin/python lab.py samples        # renders the Parler voices too; then build_page.py
```

## What the measurements mean

- **Pitch** is measured from the audio (the spacing of the voice's harmonics). Two voices measure against their
  model's label (as of these model versions): SYSPIN's Hindi "female" voice is in the male range (about 137 Hz), and Indic-TTS's Telugu "male"
  voice is in the female range (about 193 Hz). The page shows both.
- **Clarity** is how much of each line a speech recogniser (Meta MMS-1b-all) heard exactly as written, sentence by
  sentence. It catches a mumbled word, a skipped sentence or a misread number. It cannot judge warmth, accent or
  whether a child will like the voice: a person still has to listen. Gujarati scores lower for every engine, so
  compare voices within a language, not across languages.

## Commands

```bash
voice-lab/setup.sh                                       # once: the environment and the models (~15 GB)
cd voice-lab
.venv/bin/python lab.py voices [--lang gu]               # the catalogue
.venv/bin/python lab.py say gu-indic-female "સ્વાગત છે!" -o hello.m4a
.venv/bin/python lab.py samples [--lang gu]              # the showcase clips -> samples/
.venv/bin/python asr_check.py samples                    # clarity of every voice -> samples/asr.json
.venv/bin/python asr_check.py vo ../assets/vo/gu         # clarity of the game's Gujarati narration
.venv/bin/python build_page.py                           # index.html from all of the above
```

## How a line becomes speech

1. **The words** come from `assets/i18n/strings.json` (`vo.<id>`), the same text the subtitles show.
2. **Made speakable** (`textnorm.py`): numbers become words in the line's language ("5" becomes "पाँच"), zero-width
   joiners go, and each model's quirks are handled (the Hindi model has no danda, the Odia model wants ଡ଼ and ଢ଼ as
   single letters). A character a model has never seen stops the render with an error, so nothing is dropped
   silently. A number missing from the tables is an error too: add it to `NUMBERS`, and have a speaker check it.
3. **Spoken** by the voice's engine (`lab.py`). Indic-TTS voices have a `pace` in `voices.json` (lower is faster),
   set so each speaks about as fast as natural reading in its language.
4. **Finished:** leading and trailing silence trimmed, loudness levelled to about -20 dBFS (peaks under -1 dBFS),
   encoded as AAC (`.m4a`, 32 kbps, mono) with macOS `afconvert`.

## Files

| | |
|---|---|
| `voices.json` | the catalogue: id, language, engine, speaker, pace |
| `lab.py` | the engines and the commands above |
| `textnorm.py` | numbers in words, per-model text fixes |
| `asr_check.py` | the clarity check |
| `build_page.py`, `page_template.html` | the showcase page |
| `samples/` | the showcase clips, `samples.json` (what was rendered) and `asr.json` (clarity) |
| `setup.sh`, `requirements.txt` | the environment |
| `models/`, `.venv/` | downloaded models and the environment (not in git) |
