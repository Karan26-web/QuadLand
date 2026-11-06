#!/usr/bin/env python3
"""Render the narrator's lines (one AAC .m4a per line) and write each language's manifest (vo.json).

    python3 tools/make_vo.py                      # English: macOS `say` (temp narration), into assets/vo/
    python3 tools/make_vo.py --lang hi            # Hindi: the voice chosen in assets/vo/voices.json, into assets/vo/hi/
    python3 tools/make_vo.py --lang all           # every language the game has
    python3 tools/make_vo.py --lang gu --voice gu-indic-male     # another voice from the voice lab (voice-lab/voices.json)
    python3 tools/make_vo.py --lang te --all      # render every line again, not only new or changed ones

The words come from assets/i18n/strings.json (vo.<id>); the list of lines and which are the LXD's from
assets/vo/lines.json. Languages other than English are spoken by open models running on this Mac (voice-lab/: run
voice-lab/setup.sh once). A line is rendered again only when its words or its voice changed.

A recorded line (a voice actor, ElevenLabs) replaces its rendered file: save it as assets/vo/<lan>/<id>.m4a (English:
assets/vo/<id>.m4a) and run with --adopt; it is measured and kept, never overwritten unless --all is given.
"""
import argparse, hashlib, json, os, re, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VO = os.path.join(ROOT, 'assets', 'vo')
LINES = os.path.join(VO, 'lines.json')
CHOICE = os.path.join(VO, 'voices.json')
STRINGS = os.path.join(ROOT, 'assets', 'i18n', 'strings.json')
LAB = os.path.join(ROOT, 'voice-lab')
LAB_PY = os.path.join(LAB, '.venv', 'bin', 'python')


def spoken_en(text):
    # what macOS says well: ½ -> half, × -> times
    return text.replace('½', 'half').replace('×', 'times').replace('—', ', ')


def duration(path):
    out = subprocess.run(['afinfo', path], capture_output=True, text=True).stdout
    m = re.search(r'estimated duration:\s*([\d.]+)', out)
    return round(float(m.group(1)), 3) if m else None


def lab_voice(vid):
    for v in json.load(open(os.path.join(LAB, 'voices.json'), encoding='utf-8'))['voices']:
        if v['id'] == vid: return v
    sys.exit(f'no voice {vid!r} in voice-lab/voices.json')


def render_lang(lang, words, lines, voice_id, a):
    out_dir = VO if lang == 'en' else os.path.join(VO, lang)
    os.makedirs(out_dir, exist_ok=True)
    manifest_path = os.path.join(out_dir, 'vo.json')
    man = json.load(open(manifest_path, encoding='utf-8')) if os.path.exists(manifest_path) else {'lines': {}}
    voice = {'id': voice_id, 'engine': 'macos-say', 'rate': a.rate} if lang == 'en' else lab_voice(voice_id)
    todo = []
    for ln in lines:
        lid, text = ln['id'], words[f"vo.{ln['id']}"]
        key = f'{voice_id}|{a.rate}|{text}' if lang == 'en' else json.dumps([voice, text], ensure_ascii=False, sort_keys=True)
        h = hashlib.sha1(key.encode()).hexdigest()[:12]
        prev = man['lines'].get(lid)
        recorded = prev and prev.get('recorded')
        for ext in ('m4a', 'mp3'):
            f = os.path.join(out_dir, f'{lid}.{ext}')
            if a.adopt and os.path.exists(f) and (not prev or prev.get('hash') != h):
                man['lines'][lid] = {'file': f'{lid}.{ext}', 'dur': duration(f), 'recorded': True}
                recorded = True
                break
        if recorded and not a.all: continue
        if prev and prev.get('hash') == h and not a.all and os.path.exists(os.path.join(out_dir, prev['file'])): continue
        todo.append({'id': lid, 'text': text, 'hash': h})
    if lang == 'en':
        for it in todo:
            with tempfile.TemporaryDirectory() as td:
                aiff = os.path.join(td, 'l.aiff'); out = os.path.join(out_dir, f"{it['id']}.m4a")
                subprocess.run(['say', '-v', voice_id, '-r', str(a.rate), '-o', aiff, spoken_en(it['text'])], check=True)
                subprocess.run(['afconvert', '-f', 'm4af', '-d', 'aac', '-b', '32000', '-q', '127', aiff, out], check=True)
            man['lines'][it['id']] = {'file': f"{it['id']}.m4a", 'dur': duration(out), 'hash': it['hash'], 'voice': voice_id}
            print(f"  {it['id']:12s} {man['lines'][it['id']]['dur']:.2f}s  {it['text'][:60]}")
    elif todo:
        if not os.path.exists(LAB_PY): sys.exit('the voice lab is not set up: run voice-lab/setup.sh once')
        with tempfile.TemporaryDirectory() as td:
            batch = os.path.join(td, 'lines.json')
            json.dump([{'id': it['id'], 'text': it['text']} for it in todo], open(batch, 'w', encoding='utf-8'), ensure_ascii=False)
            res = subprocess.run([LAB_PY, '-I', os.path.join(LAB, 'lab.py'), 'render', voice_id, '--in', batch, '--out', out_dir],
                                 capture_output=True, text=True)
            if res.returncode != 0: sys.exit(f'the voice lab failed:\n{res.stderr[-3000:]}')
            done = {r['id']: r for r in json.loads(res.stdout.strip().splitlines()[-1])}
        for it in todo:
            r = done[it['id']]
            man['lines'][it['id']] = {'file': r['file'], 'dur': r['dur'], 'hash': it['hash'], 'voice': voice_id}
            print(f"  {it['id']:12s} {r['dur']:.2f}s  {it['text'][:60]}")
    known = {ln['id'] for ln in lines}
    for lid in list(man['lines']):
        if lid in known: continue
        gone = man['lines'].pop(lid)
        f = os.path.join(out_dir, gone.get('file', ''))
        if not gone.get('recorded') and os.path.isfile(f):   # a line taken out of the script: its rendered clip goes too
            os.remove(f); print(f'  {lid:12s} removed (no longer in the script)')
    man['voice'] = voice_id; man['language'] = lang
    json.dump(man, open(manifest_path, 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
    print(f'{lang}: {len(todo)} rendered, {len(man["lines"])} in {os.path.relpath(manifest_path, ROOT)} ({voice_id})')


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--lang', default='en', help="a language code from strings.json, or 'all'")
    ap.add_argument('--voice', help='a voice to use instead of the one chosen in assets/vo/voices.json')
    ap.add_argument('--rate', type=int, default=168, help='English: the macOS speaking rate')
    ap.add_argument('--all', action='store_true', help='render every line again')
    ap.add_argument('--adopt', action='store_true', help='keep recorded files already in the folder')
    a = ap.parse_args()
    strings = json.load(open(STRINGS, encoding='utf-8'))
    lines = json.load(open(LINES, encoding='utf-8'))['lines']
    choice = json.load(open(CHOICE, encoding='utf-8'))['narrator']
    langs = list(strings['languages']) if a.lang == 'all' else [a.lang]
    for lang in langs:
        if lang not in strings: sys.exit(f'no language {lang!r} in strings.json')
        voice_id = a.voice if a.voice and len(langs) == 1 else choice.get(lang)
        if not voice_id: sys.exit(f'no narrator chosen for {lang!r} in assets/vo/voices.json')
        render_lang(lang, strings[lang], lines, voice_id, a)


if __name__ == '__main__':
    sys.exit(main())
