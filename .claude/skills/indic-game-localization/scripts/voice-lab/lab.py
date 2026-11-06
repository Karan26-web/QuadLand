#!/usr/bin/env python3
"""The voice lab: speech for Indian languages from open models that run on this Mac. No cloud API, no per-character
bill: once the models are downloaded (setup.sh), every line is rendered offline.

    .venv/bin/python lab.py voices [--lang gu]              the catalogue (voices.json): engine, gender, licence
    .venv/bin/python lab.py say gu-indic-female "સ્વાગત છે!" -o hello.m4a
    .venv/bin/python lab.py samples [--lang gu] [--voice gu-indic-male]
                                                            the showcase: a few game lines in every voice -> samples/
    .venv/bin/python lab.py render gu-indic-female --in lines.json --out DIR
                                                            a batch: [{"id", "text"}] -> DIR/<id>.m4a; prints JSON

Engines (voices.json says which voice uses which):
  indic   AI4Bharat Indic-TTS: FastPitch + HiFi-GAN, a female and a male voice per language (MIT)
  syspin  SYSPIN (IISc, ARTPARK): VITS, a female and a male voice for Hindi, Marathi, Telugu (CC-BY-4.0)
  mms     Meta MMS-TTS: VITS, one voice per language (CC-BY-NC-4.0: not for a commercial product)
  macos   the Mac's own voices (Lekha for Hindi, Geeta for Telugu): for prototypes only
  parler  AI4Bharat Indic Parler-TTS: named speakers, steered by a description (Apache-2.0). Gated: needs a free
          Hugging Face token (HF_TOKEN) and `pip install git+https://github.com/huggingface/parler-tts`

Every clip is trimmed of leading and trailing silence, levelled to the same loudness (peaks under -1 dBFS) and
encoded as AAC (.m4a, 32 kbps, mono) with macOS afconvert, the format the game already plays (32 kbps keeps speech
below 8 kHz within a decibel of 64 kbps, at half the size).
"""
import argparse, json, os, re, subprocess, sys, tempfile, time, unicodedata, warnings

HERE = os.path.dirname(os.path.abspath(__file__))
MODELS = os.path.join(HERE, 'models')
sys.path.insert(0, HERE)
from textnorm import speakable, unknown  # noqa: E402

warnings.filterwarnings('ignore')
os.environ.setdefault('TOKENIZERS_PARALLELISM', 'false')

CATALOGUE = os.path.join(HERE, 'voices.json')
SAMPLES = os.path.join(HERE, 'samples')
PUNCT = "!¡'(),-.:;¿? "


def catalogue():
    return json.load(open(CATALOGUE, encoding='utf-8'))


def voice_of(vid):
    for v in catalogue()['voices']:
        if v['id'] == vid: return v
    raise SystemExit(f'no voice {vid!r} in voices.json (try: lab.py voices)')


# ------------------------------------------------------------------ engines
class Engine:
    """speak(voice, text) -> (float32 numpy array, sample rate). charset(voice): the model's alphabet, or None.
    drops_punctuation: the model was trained without punctuation and its tokenizer removes it (MMS), so missing
    punctuation is not a problem, and a missing letter is only a warning (the tokenizer drops it too)"""
    cache = {}
    drops_punctuation = False

    @classmethod
    def get(cls, voice):
        key = (voice['engine'], voice.get('model', voice['lang']))
        if key not in cls.cache: cls.cache[key] = ENGINES[voice['engine']](voice)
        return cls.cache[key]

    def charset(self, voice): return None


class IndicTTS(Engine):
    def __init__(self, voice):
        from TTS.utils.synthesizer import Synthesizer
        root = os.path.join(MODELS, 'indic-tts', voice['model'])
        if not os.path.isdir(root): raise SystemExit(f'model missing: {root} (run setup.sh)')
        cfg = json.load(open(f'{root}/fastpitch/config.json', encoding='utf-8'))
        spk = os.path.abspath(f'{root}/fastpitch/speakers.pth')      # the config points at the trainer's own disk
        cfg['speakers_file'] = spk
        if isinstance(cfg.get('model_args'), dict): cfg['model_args']['speakers_file'] = spk
        patched = f'{root}/fastpitch/config.lab.json'
        json.dump(cfg, open(patched, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        self.chars = set(cfg['characters']['characters']) | set(cfg['characters']['punctuations'])
        self.syn = Synthesizer(tts_checkpoint=f'{root}/fastpitch/best_model.pth', tts_config_path=patched,
                               tts_speakers_file=spk, vocoder_checkpoint=f'{root}/hifigan/best_model.pth',
                               vocoder_config=f'{root}/hifigan/config.json', use_cuda=False)

    def charset(self, voice): return self.chars

    def speak(self, voice, text):
        import numpy as np
        self.syn.tts_model.length_scale = voice.get('pace', 1.0)     # < 1 speaks faster
        quiet = open(os.devnull, 'w'); old = sys.stdout; sys.stdout = quiet   # the synthesizer prints every sentence
        try: wav = self.syn.tts(text, speaker_name=voice['speaker'])
        finally: sys.stdout = old; quiet.close()
        return np.asarray(wav, dtype='float32'), self.syn.output_sample_rate


class Syspin(Engine):
    def __init__(self, voice):
        import torch
        from TTS.tts.utils.text.tokenizer import TTSTokenizer
        from TTS.tts.configs.shared_configs import CharactersConfig
        from TTS.tts.configs.vits_config import VitsConfig
        root = os.path.join(MODELS, 'syspin', voice['model'])
        pt = [f for f in os.listdir(root) if f.endswith('.pt')] if os.path.isdir(root) else []
        if not pt: raise SystemExit(f'model missing: {root} (run setup.sh)')
        letters = open(os.path.join(root, 'chars.txt'), encoding='utf-8').read().strip('\n')
        cfg = VitsConfig(text_cleaner='multilingual_cleaners', characters=CharactersConfig(
            characters_class='TTS.tts.models.vits.VitsCharacters', pad='<PAD>', eos='<EOS>', bos='<BOS>', blank='<BLNK>',
            characters=letters, punctuations=PUNCT, phonemes=None))
        self.tok, _ = TTSTokenizer.init_from_config(cfg)
        self.net = torch.jit.load(os.path.join(root, pt[0]), map_location='cpu').eval()
        self.chars = set(letters) | set(PUNCT)

    def charset(self, voice): return self.chars

    def speak(self, voice, text):
        import numpy as np, torch
        quiet = open(os.devnull, 'w'); old = sys.stdout; sys.stdout = quiet
        try: ids = self.tok.text_to_ids(text)
        finally: sys.stdout = old; quiet.close()
        with torch.no_grad(): out = self.net(torch.LongTensor([ids]))
        return out.squeeze().cpu().numpy().astype('float32'), 22050


class MMS(Engine):
    drops_punctuation = True

    def __init__(self, voice):
        from transformers import VitsModel, AutoTokenizer
        name = f"facebook/mms-tts-{voice['model']}"
        cache = os.path.join(MODELS, 'hf')
        self.tok = AutoTokenizer.from_pretrained(name, cache_dir=cache)
        self.model = VitsModel.from_pretrained(name, cache_dir=cache).eval()
        self.chars = set(self.tok.get_vocab()) | {' '}

    def charset(self, voice): return self.chars

    def speak(self, voice, text):
        import torch
        torch.manual_seed(7)                                   # VITS samples its timing: the same line, the same take
        self.model.speaking_rate = voice.get('rate', 1.0)
        with torch.no_grad(): wav = self.model(**self.tok(text, return_tensors='pt')).waveform
        return wav.squeeze().cpu().numpy().astype('float32'), self.model.config.sampling_rate


class MacSay(Engine):
    def __init__(self, voice): pass

    def speak(self, voice, text):
        import soundfile as sf
        with tempfile.TemporaryDirectory() as td:
            aiff = os.path.join(td, 'l.aiff'); wav = os.path.join(td, 'l.wav')
            subprocess.run(['say', '-v', voice['speaker'], '-r', str(voice.get('rate', 165)), '-o', aiff, text], check=True)
            subprocess.run(['afconvert', '-f', 'WAVE', '-d', 'LEI16', aiff, wav], check=True)
            x, sr = sf.read(wav, dtype='float32')
        return x, sr


class Parler(Engine):
    def __init__(self, voice):
        if not os.environ.get('HF_TOKEN'):
            raise SystemExit('Indic Parler-TTS is gated: accept its terms at https://huggingface.co/ai4bharat/indic-parler-tts, '
                             'make a read token, then run with HF_TOKEN=... (see README.md)')
        try:
            from parler_tts import ParlerTTSForConditionalGeneration
        except ImportError:
            raise SystemExit('install it first: .venv/bin/pip install git+https://github.com/huggingface/parler-tts.git')
        from transformers import AutoTokenizer
        name = 'ai4bharat/indic-parler-tts'
        cache = os.path.join(MODELS, 'hf')
        self.model = ParlerTTSForConditionalGeneration.from_pretrained(name, cache_dir=cache).eval()
        self.tok = AutoTokenizer.from_pretrained(name, cache_dir=cache)
        self.desc_tok = AutoTokenizer.from_pretrained(self.model.config.text_encoder._name_or_path, cache_dir=cache)

    def speak(self, voice, text):
        import torch
        torch.manual_seed(7)
        desc = voice.get('description') or (f"{voice['speaker']}'s voice is warm, clear and friendly, at a moderate pace, "
                                            'with very clear audio and no background noise.')
        d = self.desc_tok(desc, return_tensors='pt'); p = self.tok(text, return_tensors='pt')
        with torch.no_grad():
            out = self.model.generate(input_ids=d.input_ids, attention_mask=d.attention_mask,
                                      prompt_input_ids=p.input_ids, prompt_attention_mask=p.attention_mask)
        return out.cpu().numpy().squeeze().astype('float32'), self.model.config.sampling_rate


ENGINES = {'indic': IndicTTS, 'syspin': Syspin, 'mms': MMS, 'macos': MacSay, 'parler': Parler}


# ------------------------------------------------------------- the clip
def polish(x, sr, pad=0.08):
    """trim the silence at both ends (keeping a breath of it) and level the loudness"""
    import numpy as np
    x = np.nan_to_num(x.astype('float32'))
    if x.size == 0: return x
    hop = max(1, int(sr * 0.01))
    frames = np.sqrt(np.convolve(x ** 2, np.ones(hop) / hop, mode='same') + 1e-12)
    loud = np.where(20 * np.log10(frames) > 20 * np.log10(frames.max()) - 42)[0]
    if loud.size:
        a, b = max(0, loud[0] - int(pad * sr)), min(len(x), loud[-1] + int(pad * sr))
        x = x[a:b]
    rms = np.sqrt(np.mean(x ** 2)) + 1e-9
    x = x * (10 ** (-20 / 20) / rms)                       # about -20 dBFS RMS, like a narration track
    peak = np.abs(x).max()
    if peak > 0.89: x = x * (0.89 / peak)                   # and never over -1 dBFS
    fade = int(sr * 0.01)
    if len(x) > 2 * fade:
        x[:fade] *= np.linspace(0, 1, fade); x[-fade:] *= np.linspace(1, 0, fade)
    return x


def write(x, sr, out):
    """.wav as is; .m4a/.mp4: AAC 32 kbps mono (afconvert)"""
    import soundfile as sf
    os.makedirs(os.path.dirname(os.path.abspath(out)) or '.', exist_ok=True)
    if out.endswith('.wav'):
        sf.write(out, x, sr); return out
    with tempfile.TemporaryDirectory() as td:
        wav = os.path.join(td, 'c.wav'); sf.write(wav, x, sr, subtype='PCM_16')
        fmt = 'aac' if sr >= 22050 else 'aac@22050'               # AAC wanted at least 22 kHz at 64 kbps (MMS is 16 kHz)
        subprocess.run(['afconvert', '-f', 'm4af', '-d', fmt, '-b', '32000', '-q', '127', wav, out], check=True)
    return out


def synth(voice, text, out=None, strict=True):
    """speak one line in one voice -> (audio, sr, seconds); raises on characters the model cannot read"""
    eng = Engine.get(voice)
    chars = eng.charset(voice)
    said = speakable(text, voice['lang'], chars)
    if chars is not None:
        bad = unknown(said, chars)
        if eng.drops_punctuation:
            bad = [c for c in bad if not unicodedata.category(c).startswith(('P', 'S'))]
            if bad: print(f"  {voice['id']}: the model drops {bad} (not in its alphabet)", file=sys.stderr)
        elif bad and strict:
            raise ValueError(f"{voice['id']} cannot read {bad} in: {said}")
    x, sr = eng.speak(voice, said)
    x = polish(x, sr)
    if out: write(x, sr, out)
    return x, sr, len(x) / sr


# ------------------------------------------------------------------- commands
def cmd_voices(a):
    cat = catalogue()
    for v in cat['voices']:
        if a.lang and v['lang'] != a.lang: continue
        e = cat['engines'][v['engine']]
        print(f"{v['id']:22s} {v['lang']}  {v['gender']:6s} {e['name']:30s} {e['licence']}{'  [needs ' + v['requires'] + ']' if v.get('requires') else ''}")


def cmd_say(a):
    v = voice_of(a.voice)
    _, _, dur = synth(v, a.text, a.out, strict=not a.lenient)
    print(f'{a.out}: {dur:.2f}s')


def strings_for(lang, path):
    data = json.load(open(path, encoding='utf-8'))
    return data.get(lang) or {}


def cmd_samples(a):
    cat = catalogue()
    lines = [ln['key'] if isinstance(ln, dict) else ln for ln in cat['sample_lines']]
    out_index = os.path.join(SAMPLES, 'samples.json')
    index = json.load(open(out_index, encoding='utf-8')) if os.path.exists(out_index) else {'voices': {}}
    for v in cat['voices']:
        if v.get('requires') and not os.environ.get(v['requires']): continue
        if (a.lang and v['lang'] != a.lang) or (a.voice and v['id'] != a.voice): continue
        text = strings_for(v['lang'], a.strings)
        clips, t0 = [], time.time()
        for key in lines:
            if key not in text: continue
            rel = f"{v['lang']}/{v['id']}/{key.replace('vo.', '')}.m4a"
            try:
                _, _, dur = synth(v, text[key], os.path.join(SAMPLES, rel), strict=not a.lenient)
                clips.append({'line': key, 'text': text[key], 'file': rel, 'dur': round(dur, 2)})
            except Exception as e:
                print(f"  {v['id']}: {key} FAILED: {e}")
        index['voices'][v['id']] = {'clips': clips, 'rendered': time.strftime('%Y-%m-%d')}
        print(f"{v['id']:22s} {len(clips)} clips, {sum(c['dur'] for c in clips):5.1f}s of speech in {time.time() - t0:5.1f}s")
    json.dump(index, open(out_index, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


def cmd_render(a):
    v = voice_of(a.voice)
    items = json.load(open(a.inp, encoding='utf-8'))
    done = []
    for it in items:
        out = os.path.join(a.out, f"{it['id']}.{a.format}")
        _, _, dur = synth(v, it['text'], out, strict=not a.lenient)
        done.append({'id': it['id'], 'file': os.path.basename(out), 'dur': round(dur, 3)})
        print(f"  {it['id']:12s} {dur:5.2f}s  {it['text'][:50]}", file=sys.stderr)
    print(json.dumps(done, ensure_ascii=False))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest='cmd', required=True)
    p = sub.add_parser('voices'); p.add_argument('--lang'); p.set_defaults(fn=cmd_voices)
    p = sub.add_parser('say'); p.add_argument('voice'); p.add_argument('text'); p.add_argument('-o', '--out', default='say.m4a')
    p.add_argument('--lenient', action='store_true', help='drop characters the model cannot read instead of stopping'); p.set_defaults(fn=cmd_say)
    p = sub.add_parser('samples'); p.add_argument('--lang'); p.add_argument('--voice'); p.add_argument('--lenient', action='store_true')
    p.add_argument('--strings', default=os.path.join(HERE, '..', 'assets', 'i18n', 'strings.json'), help='where the sample lines are read')
    p.set_defaults(fn=cmd_samples)
    p = sub.add_parser('render'); p.add_argument('voice'); p.add_argument('--in', dest='inp', required=True); p.add_argument('--out', required=True)
    p.add_argument('--format', default='m4a', choices=['m4a', 'wav']); p.add_argument('--lenient', action='store_true'); p.set_defaults(fn=cmd_render)
    a = ap.parse_args()
    a.fn(a)


if __name__ == '__main__':
    main()
