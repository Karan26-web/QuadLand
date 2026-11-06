#!/usr/bin/env python3
"""Build the showcase page (index.html) from the catalogue, the rendered samples and the listening check.

    .venv/bin/python build_page.py [--strings ../assets/i18n/strings.json] [--publish body.html]

It measures each voice's pitch (cepstrum: the spacing of the voice's harmonics) and draws each clip's loudness
outline, then writes index.html from page_template.html with the data inside, so the page works opened from this
folder (through any local web server) and published as it is.
"""
import json, os, sys, warnings
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
warnings.filterwarnings('ignore')


def pitch_of(paths):
    """median fundamental frequency over a voice's clips (cepstral peak, 70-400 Hz)"""
    import librosa
    f0 = []
    for p in paths:
        y, sr = librosa.load(p, sr=16000)
        n, hop, win = 2048, 256, np.hanning(2048)
        for i in range(0, len(y) - n, hop):
            fr = y[i:i + n] * win
            if np.sqrt(np.mean(fr ** 2)) < 0.02: continue
            cep = np.fft.irfft(np.log(np.abs(np.fft.rfft(fr)) + 1e-9))
            lo, hi = sr // 400, sr // 70
            q = lo + int(np.argmax(cep[lo:hi]))
            if cep[q] > 0.08: f0.append(sr / q)
    return int(round(float(np.median(f0)))) if f0 else None


def envelope(path, points=72):
    import librosa
    y, _ = librosa.load(path, sr=8000)
    chunks = np.array_split(np.abs(y), points)
    env = np.array([float(np.sqrt(np.mean(c ** 2))) if len(c) else 0 for c in chunks])
    env = env / (env.max() + 1e-9)
    return [round(float(v), 2) for v in env]


def main():
    cat = json.load(open(os.path.join(HERE, 'voices.json'), encoding='utf-8'))
    idx = json.load(open(os.path.join(HERE, 'samples', 'samples.json'), encoding='utf-8'))['voices']
    asr_path = os.path.join(HERE, 'samples', 'asr.json')
    asr = json.load(open(asr_path, encoding='utf-8'))['mean_cer'] if os.path.exists(asr_path) else {}
    sp = sys.argv[sys.argv.index('--strings') + 1] if '--strings' in sys.argv else os.path.join(HERE, '..', 'assets', 'i18n', 'strings.json')
    strings = json.load(open(sp, encoding='utf-8'))
    langs = [{'code': c, 'name': m['name'], 'native': m['native'], 'html': m['html']} for c, m in strings['languages'].items() if c != 'en']
    sample = [ln if isinstance(ln, dict) else {'key': ln, 'label': ln} for ln in cat['sample_lines']]
    lines = [{'key': ln['key'], 'label': ln['label'], 'en': strings['en'][ln['key']], 'text': {l['code']: strings[l['code']][ln['key']] for l in langs}}
             for ln in sample]
    voices, locked = [], []
    for v in cat['voices']:
        if v.get('requires'):
            locked.append({'id': v['id'], 'lang': v['lang'], 'label': v['label'], 'gender': v['gender']}); continue
        rendered = idx.get(v['id'])
        if not rendered or not rendered['clips']: continue
        paths = [os.path.join(HERE, 'samples', c['file']) for c in rendered['clips']]
        hz = pitch_of(paths)
        heard = 'female' if hz and hz >= 165 else 'male' if hz else None
        clips = {c['line']: {'file': f"samples/{c['file']}", 'dur': c['dur'], 'env': envelope(os.path.join(HERE, 'samples', c['file']))} for c in rendered['clips']}
        voices.append({'id': v['id'], 'lang': v['lang'], 'label': v['label'], 'engine': v['engine'], 'model_gender': v['gender'],
                       'pitch': hz, 'sounds': heard, 'clarity': round(1 - asr[v['id']], 3) if v['id'] in asr else None, 'clips': clips})
        print(f"{v['id']:20s} {hz} Hz ({heard}), clarity {voices[-1]['clarity']}")
    data = {'languages': langs, 'lines': lines, 'engines': cat['engines'], 'voices': voices, 'locked': locked,
            'recogniser': 'Meta MMS-1b-all', 'built': __import__('time').strftime('%Y-%m-%d')}
    tpl = open(os.path.join(HERE, 'page_template.html'), encoding='utf-8').read()
    out = (tpl.replace('/*__DATA__*/null', json.dumps(data, ensure_ascii=False, separators=(',', ':')))
              .replace('__PROJECT__', cat.get('project', 'The game')).replace('__NARRATOR__', cat.get('narrator', 'the narrator')))
    # index.html opens on its own (it needs its charset for the Indian scripts); --publish also writes the body alone
    # (a host that wraps the page in its own <head> wants just this)
    head = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n</head>\n<body>\n')
    open(os.path.join(HERE, 'index.html'), 'w', encoding='utf-8').write(head + out + '\n</body>\n</html>\n')
    if '--publish' in sys.argv:
        dest = sys.argv[sys.argv.index('--publish') + 1]
        # the same AAC clips, named .mp4 (an .m4a is an MP4 file; some hosts only serve the .mp4 name)
        open(dest, 'w', encoding='utf-8').write(out.replace('.m4a"', '.mp4"'))
    print(f'index.html: {len(voices)} voices, {sum(len(v["clips"]) for v in voices)} clips, {len(locked)} locked; {len(out) // 1024} KB')


if __name__ == '__main__':
    sys.exit(main())
