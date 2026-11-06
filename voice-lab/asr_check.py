#!/usr/bin/env python3
"""Listen back: transcribe rendered speech with a speech recogniser and compare it with the words it was meant to say.

A voice that mumbles, skips a word, misreads a number or breaks on a letter shows up as a high character error rate
(CER). It is a robot's ear, not a native speaker's (accent, tone and naturalness still need a person), but it catches
broken audio before anyone has to listen to it.

    .venv/bin/python asr_check.py samples [VOICE…]   the showcase (samples/samples.json), or just some voices
    .venv/bin/python asr_check.py vo ../assets/vo/hi  a game language (its vo.json; the words from strings.json)
    .venv/bin/python asr_check.py vo ../assets/vo/hi h.   …only the lines whose id starts with h.

Recogniser: Meta MMS-1b-all (wav2vec2 + one adapter per language; CC-BY-NC-4.0, used here only to check).
"""
import json, os, re, sys, unicodedata, warnings
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from textnorm import speakable  # noqa: E402

warnings.filterwarnings('ignore')
ASR_LANG = {'hi': 'hin', 'mr': 'mar', 'gu': 'guj', 'te': 'tel', 'od': 'ory', 'en': 'eng'}
STRINGS = os.path.join(HERE, '..', 'assets', 'i18n', 'strings.json')
_asr = {}


def model():
    if 'm' not in _asr:
        from transformers import Wav2Vec2ForCTC, AutoProcessor
        cache = os.path.join(HERE, 'models', 'hf')
        _asr['p'] = AutoProcessor.from_pretrained('facebook/mms-1b-all', cache_dir=cache)
        _asr['m'] = Wav2Vec2ForCTC.from_pretrained('facebook/mms-1b-all', cache_dir=cache).eval()
        _asr['lang'] = None
    return _asr['p'], _asr['m']


def transcribe(path, lang):
    import torch, librosa
    p, m = model()
    code = ASR_LANG[lang]
    if _asr['lang'] != code:
        p.tokenizer.set_target_lang(code); m.load_adapter(code); _asr['lang'] = code
    y, _ = librosa.load(path, sr=16000)
    # one sentence at a time: the recogniser loses whole sentences across the stretch of digital silence a synthesizer
    # puts between them (each sentence alone comes back right), so split at every silence of 0.2 s or more
    quiet = np.abs(y) < 2e-4
    parts, start, run = [], 0, 0
    for i, q in enumerate(quiet):
        run = run + 1 if q else 0
        if run == int(0.2 * 16000): parts.append(y[start:i - run + 1]); start = i
    parts.append(y[start:])
    words = []
    for seg in parts:
        if len(seg) < 1600 or np.abs(seg).max() < 1e-3: continue
        with torch.no_grad():
            logits = m(**p(seg, sampling_rate=16000, return_tensors='pt')).logits
        words.append(p.decode(torch.argmax(logits, dim=-1)[0]))
    return ' '.join(w for w in words if w)


def norm(s):
    """letters only: no punctuation, spaces, joiners or case, so only the spoken sounds are compared"""
    s = unicodedata.normalize('NFC', s).lower()
    s = s.replace('ଡ଼', 'ଡ଼').replace('ଢ଼', 'ଢ଼')
    return ''.join(ch for ch in s if unicodedata.category(ch)[0] in 'LM')


def cer(ref, hyp):
    r, h = norm(ref), norm(hyp)
    if not r: return 0.0
    prev = list(range(len(h) + 1))
    for i, a in enumerate(r, 1):
        cur = [i]
        for j, b in enumerate(h, 1):
            cur.append(min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a != b)))
        prev = cur
    return prev[-1] / len(r)


def check(items, label):
    """items: [(lang, path, meant)] -> per-item CER, printed with the worst first"""
    rows = []
    for lang, path, meant in items:
        heard = transcribe(path, lang)
        rows.append((cer(speakable(meant, lang), heard), lang, os.path.relpath(path), meant, heard))
    rows.sort(reverse=True)
    mean = sum(r[0] for r in rows) / max(1, len(rows))
    print(f'{label}: {len(rows)} clips, mean CER {mean:.1%}')
    for r in rows[:5]:
        print(f'   {r[0]:5.1%}  {r[2]}\n          meant: {r[3]}\n          heard: {r[4]}')
    return rows, mean


def main():
    what = sys.argv[1] if len(sys.argv) > 1 else 'samples'
    if what == 'samples':
        idx = json.load(open(os.path.join(HERE, 'samples', 'samples.json'), encoding='utf-8'))['voices']
        only = set(sys.argv[2:])                               # optional: just these voice ids
        out = os.path.join(HERE, 'samples', 'asr.json')
        summary = json.load(open(out))['mean_cer'] if only and os.path.exists(out) else {}
        for vid, v in idx.items():
            if only and vid not in only: continue
            lang = vid.split('-')[0]
            items = [(lang, os.path.join(HERE, 'samples', c['file']), c['text']) for c in v['clips']]
            if items: summary[vid] = round(check(items, vid)[1], 4)
        json.dump({'recogniser': 'facebook/mms-1b-all', 'mean_cer': summary}, open(out, 'w'), indent=1)
        print('\nmean CER by voice (lower is clearer):')
        for vid, c in sorted(summary.items(), key=lambda kv: kv[1]): print(f'   {vid:20s} {c:6.1%}')
    else:
        d = sys.argv[2]; lang = os.path.basename(os.path.normpath(d))
        man = json.load(open(os.path.join(d, 'vo.json'), encoding='utf-8'))['lines']
        words = json.load(open(STRINGS, encoding='utf-8'))[lang]
        pick = sys.argv[3:]                                   # optional: only lines whose id starts with one of these
        items = [(lang, os.path.join(d, m['file']), words[f'vo.{i}']) for i, m in man.items() if not pick or i.startswith(tuple(pick))]
        rows, mean = check(items, f'{lang} narration')
        bad = [r for r in rows if r[0] > 0.25]
        print(f'{len(bad)} line(s) over 25% CER' if bad else 'no line over 25% CER')


if __name__ == '__main__':
    main()
