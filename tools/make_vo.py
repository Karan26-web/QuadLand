#!/usr/bin/env python3
"""Render the temp narration with macOS `say` (one AAC .m4a per line) and write assets/vo/vo.json.

    python3 tools/make_vo.py                 # render lines that are new or whose text changed
    python3 tools/make_vo.py --all           # render every line again
    python3 tools/make_vo.py --voice Daniel --rate 168

A recorded line (e.g. from ElevenLabs) replaces its temp file: save it as assets/vo/<id>.m4a (or .mp3) and run
    python3 tools/make_vo.py --adopt
which measures every file already in assets/vo and keeps it (it will never be overwritten unless --all is given).
"""
import argparse, hashlib, json, os, re, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VO = os.path.join(ROOT, 'assets', 'vo')
LINES = os.path.join(VO, 'lines.json')
MANIFEST = os.path.join(VO, 'vo.json')

def spoken(text):
    # the symbols say well: ½ → half, × → times
    t = text.replace('½', 'half').replace('×', 'times').replace('—', ', ')
    return t

def duration(path):
    out = subprocess.run(['afinfo', path], capture_output=True, text=True).stdout
    m = re.search(r'estimated duration:\s*([\d.]+)', out)
    return round(float(m.group(1)), 3) if m else None

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--voice', default='Samantha')
    ap.add_argument('--rate', type=int, default=168)
    ap.add_argument('--all', action='store_true')
    ap.add_argument('--adopt', action='store_true', help='keep recorded files already in assets/vo')
    a = ap.parse_args()
    lines = json.load(open(LINES))['lines']
    man = json.load(open(MANIFEST)) if os.path.exists(MANIFEST) else {'lines': {}}
    done = 0
    for ln in lines:
        lid, text = ln['id'], ln['text']
        h = hashlib.sha1(f"{a.voice}|{a.rate}|{text}".encode()).hexdigest()[:12]
        prev = man['lines'].get(lid)
        recorded = prev and prev.get('recorded')
        for ext in ('m4a', 'mp3'):
            f = os.path.join(VO, f'{lid}.{ext}')
            if a.adopt and os.path.exists(f) and (not prev or prev.get('hash') != h):
                man['lines'][lid] = {'file': f'{lid}.{ext}', 'dur': duration(f), 'recorded': True}
                recorded = True
                break
        if recorded and not a.all:
            continue
        if prev and prev.get('hash') == h and not a.all and os.path.exists(os.path.join(VO, prev['file'])):
            continue
        with tempfile.TemporaryDirectory() as td:
            aiff = os.path.join(td, 'l.aiff')
            subprocess.run(['say', '-v', a.voice, '-r', str(a.rate), '-o', aiff, spoken(text)], check=True)
            out = os.path.join(VO, f'{lid}.m4a')
            subprocess.run(['afconvert', '-f', 'm4af', '-d', 'aac', '-b', '64000', '-q', '127', aiff, out], check=True)
        man['lines'][lid] = {'file': f'{lid}.m4a', 'dur': duration(out), 'hash': h, 'voice': a.voice}
        done += 1
        print(f'  {lid:12s} {man["lines"][lid]["dur"]:.2f}s  {text[:60]}')
    known = {ln['id'] for ln in lines}
    for lid in list(man['lines']):
        if lid not in known: del man['lines'][lid]
    man['voice'] = a.voice
    json.dump(man, open(MANIFEST, 'w'), indent=1)
    print(f'{done} rendered, {len(man["lines"])} in the manifest')

if __name__ == '__main__':
    sys.exit(main())
