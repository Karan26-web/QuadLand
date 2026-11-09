#!/usr/bin/env python3
"""Cut one long narration recording into the game's per-line voice clips.

A voice actor's take or an ElevenLabs export often holds every line in one file. This finds each line of the script
in it and installs it as the game's clip for that line:

  1. transcribe the recording with word timings (faster-whisper)
  2. find each script line in the transcript, wherever it was read (the order of the recording does not matter;
     lines it lacks are reported and keep their current clip, lines the script no longer has are ignored)
  3. find the line's real start and end in the audio (the speech energy round the words' times)
  4. cut it with room before and after (padding with silence where the take ran lines close together), and open up
     a pause between two sentences that is too short to breathe in
  5. level it, encode it as the game's AAC and record it in the language's vo.json as a recording, which
     tools/make_vo.py never overwrites

    python3 tools/split_vo.py 1.mp3 --lang en            # report only: what was found where, nothing written
    python3 tools/split_vo.py 1.mp3 --lang en --write    # install the clips

Needs numpy and faster-whisper (pip install faster-whisper, in any venv) and a Whisper model (small.en downloads once
into the Hugging Face cache). macOS afconvert decodes and encodes. --asr FILE reuses a saved transcript.
"""
import argparse, difflib, json, os, re, struct, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VO = os.path.join(ROOT, 'assets', 'vo')
STRINGS = os.path.join(ROOT, 'assets', 'i18n', 'strings.json')
LINES = os.path.join(VO, 'lines.json')

SR = 44100
HOP = 0.01                  # energy frames (s)
SPEECH_DB = -48             # a frame louder than this is speech, for levelling (the take's silence sits near -80 dB)
SILENT_DB = -50             # a frame quieter than this is a pause (a breath between lines counts as one)
PRE, POST = 0.12, 0.38      # room before and after the speech in every clip (s)
MIN_SENTENCE_PAUSE = 0.34   # a pause between two sentences of one line is opened up to at least this (s)
TARGET_DB, PEAK_DB = -20.0, -1.0
BITRATE = 40000             # AAC: a recorded voice keeps everything to 11 kHz at 40 kbps (32 kbps dulls the s sounds)

NUM = {'0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight',
       '9': 'nine', '10': 'ten', '12': 'twelve', '20': 'twenty', '24': 'twenty four', '25': 'twenty five', '26': 'twenty six',
       '30': 'thirty', '32': 'thirty two', '35': 'thirty five', '40': 'forty', '42': 'forty two', '50': 'fifty', '60': 'sixty'}


def tokens(text):
    out = []
    for w in re.findall(r"[A-Za-z0-9']+", text.lower()):
        w = w.replace("'", '')
        out.extend(NUM.get(w, w).split())
    return out


def read_wav(path):
    b = open(path, 'rb').read(); i = 12
    import numpy as np
    while i < len(b):
        cid, sz = b[i:i + 4], struct.unpack('<I', b[i + 4:i + 8])[0]
        if cid == b'data': return np.frombuffer(b[i + 8:i + 8 + sz], dtype=np.int16).astype(np.float32) / 32768
        i += 8 + sz + (sz & 1)
    raise ValueError('no audio in ' + path)


def write_wav(path, x):
    import numpy as np
    pcm = (np.clip(x, -1, 1) * 32767).astype('<i2').tobytes()
    with open(path, 'wb') as f:
        f.write(b'RIFF' + struct.pack('<I', 36 + len(pcm)) + b'WAVEfmt ' + struct.pack('<IHHIIHH', 16, 1, 1, SR, SR * 2, 2, 16)
                + b'data' + struct.pack('<I', len(pcm)) + pcm)


def transcribe(path, model):
    from faster_whisper import WhisperModel
    m = WhisperModel(model, device='cpu', compute_type='int8')
    segs, _ = m.transcribe(path, word_timestamps=True, beam_size=5, vad_filter=False, condition_on_previous_text=False, language='en')
    return [{'w': w.word, 's': w.start, 'e': w.end} for s in segs for w in s.words]


def main():
    import numpy as np
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('audio')
    ap.add_argument('--lang', default='en')
    ap.add_argument('--asr', help='a saved transcript (JSON list of {w, s, e}) instead of transcribing again')
    ap.add_argument('--model', default='small.en')
    ap.add_argument('--voice', default='recorded', help='who or what voiced it, for the manifest')
    ap.add_argument('--write', action='store_true', help='install the clips (else only report)')
    a = ap.parse_args()

    words = json.load(open(a.asr)) if a.asr else transcribe(a.audio, a.model)
    toks = []                                   # (token, start, end) with every word split as the script's tokens are
    for w in words:
        for t in tokens(w['w']): toks.append((t, w['s'], w['e']))
    tt = [t[0] for t in toks]

    strings = json.load(open(STRINGS, encoding='utf-8'))[a.lang]
    ids = [l['id'] for l in json.load(open(LINES, encoding='utf-8'))['lines']]

    # each line's best window in the transcript (by token similarity), then the best ones first, without overlaps
    cands = []
    for lid in ids:
        st = tokens(strings['vo.' + lid]); n = len(st); best = (0, None)
        for size in range(max(1, n - 2), n + 4):
            for i in range(0, len(tt) - size + 1):
                r = difflib.SequenceMatcher(None, st, tt[i:i + size], autojunk=False).ratio()
                if r > 0.6: r = max(r, difflib.SequenceMatcher(None, ''.join(st), ''.join(tt[i:i + size]), autojunk=False).ratio())
                if r > best[0]: best = (r, (i, i + size - 1))
        cands.append((best[0], lid, best[1]))
    taken, found = [], {}
    for r, lid, win in sorted(cands, key=lambda c: -c[0]):
        if r < 0.8 or win is None: continue
        if any(not (win[1] < t0 or win[0] > t1) for t0, t1 in taken): continue
        taken.append(win); found[lid] = (r, win)
    missing = [lid for lid in ids if lid not in found]

    # the audio, and its speech energy
    with tempfile.TemporaryDirectory() as td:
        wav = os.path.join(td, 'm.wav'); subprocess.run(['afconvert', '-f', 'WAVE', '-d', f'LEI16@{SR}', a.audio, wav], check=True)
        x = read_wav(wav)
    F = int(SR * HOP); fr = x[:len(x) // F * F].reshape(-1, F)
    db = 20 * np.log10(np.sqrt((fr ** 2).mean(1)) + 1e-9); loud = db > SPEECH_DB; nF = len(db)
    f_ = lambda s: max(0, min(nF - 1, int(round(s / HOP))))

    def runs(t0, t1, min_len):
        """the pauses (runs of quiet frames at least min_len long) between t0 and t1: [(start, end)]"""
        out, k0, k1, st = [], f_(t0), f_(t1), None
        for k in range(k0, k1 + 1):
            q = db[k] < SILENT_DB
            if q and st is None: st = k
            if (not q or k == k1) and st is not None:
                if (k - st) * HOP >= min_len: out.append((st * HOP, k * HOP))
                st = None
        return out

    def end_of(t_last_start, t_next_end):
        """where the speech of a word ends before the next one: the first real pause after it (120 ms or more, longer
        than any consonant's silent closure). A breath before the next word stays out of both"""
        r = runs(t_last_start, t_next_end, 0.12) or runs(t_last_start, t_next_end, 0.04)
        if r: return r[0][0]
        k0, k1 = f_(t_last_start), f_(t_next_end); return (k0 + int(np.argmin(db[k0:k1 + 1]))) * HOP

    def start_of(t_prev_start, t_first_end):
        """where the speech of a word starts after the previous one: the end of the last pause before it"""
        r = runs(t_prev_start, t_first_end, 0.06) or runs(t_prev_start, t_first_end, 0.03)
        if r: return r[-1][1]
        k0, k1 = f_(t_prev_start), f_(t_first_end); return (k0 + int(np.argmin(db[k0:k1 + 1]))) * HOP

    report, clips = [], {}
    for lid in ids:
        if lid not in found: continue
        r, (w0, w1) = found[lid]
        # the speech's edges from the audio: the word times can be 0.4 s out where two lines run close together
        on = start_of(toks[w0 - 1][1] if w0 > 0 else 0.0, toks[w0][2])
        off = end_of(toks[w1][1], toks[w1 + 1][2] if w1 + 1 < len(toks) else len(x) / SR)
        on = max(0.0, on - 0.03); off = min(len(x) / SR, off + 0.05)     # the soft attack and the decay of the voice
        seg = x[int(on * SR):int(off * SR)].copy()
        # a pause between two sentences of this line that is too short to breathe in is opened up
        st = strings['vo.' + lid]; ends = []
        for m in re.finditer(r'[.!?](?=\s+\S)', st):
            ends.append(len(tokens(st[:m.end()])))      # sentence ends after this many script tokens
        inserts = []
        if ends:
            sm = difflib.SequenceMatcher(None, tokens(st), tt[w0:w1 + 1], autojunk=False)
            mp = {}
            for blk in sm.get_matching_blocks():
                for q in range(blk.size): mp[blk.a + q] = w0 + blk.b + q
            for e in ends:
                if (e - 1) in mp and e in mp:
                    gs = end_of(toks[mp[e - 1]][1], toks[mp[e]][2]); ge = start_of(gs, toks[mp[e]][2])
                    gap = max(0.0, ge - gs)
                    if MIN_SENTENCE_PAUSE - gap > 0.03: inserts.append(((gs + ge) / 2 - on, MIN_SENTENCE_PAUSE - gap))
        for at, extra in sorted(inserts, reverse=True):
            k = int(at * SR); fade = int(0.006 * SR)
            seg[max(0, k - fade):k] *= np.linspace(1, 0, k - max(0, k - fade)); seg[k:k + fade] *= np.linspace(0, 1, len(seg[k:k + fade]))
            seg = np.concatenate([seg[:k], np.zeros(int(extra * SR), np.float32), seg[k:]])
        # room before and after, never taken from the neighbouring lines: silence where the take had too little
        fi, fo = int(0.008 * SR), int(0.03 * SR)
        seg[:fi] *= np.linspace(0, 1, fi); seg[-fo:] *= np.linspace(1, 0, fo)
        seg = np.concatenate([np.zeros(int(PRE * SR), np.float32), seg, np.zeros(int(POST * SR), np.float32)])
        # level: the speech (not the silence) at TARGET_DB, the peaks under PEAK_DB
        sfr = seg[:len(seg) // F * F].reshape(-1, F); e = np.sqrt((sfr ** 2).mean(1)); sp = e[20 * np.log10(e + 1e-9) > SPEECH_DB]
        g = 10 ** (TARGET_DB / 20) / max(1e-6, float(np.sqrt((sp ** 2).mean())))
        g = min(g, 10 ** (PEAK_DB / 20) / max(1e-6, float(np.abs(seg).max())))
        clips[lid] = seg * g
        report.append((lid, r, on, off, len(seg) / SR, [round(x2, 2) for _, x2 in inserts], ' '.join(t[0] for t in toks[w0:w1 + 1])))

    print(f'{len(found)} of {len(ids)} script lines found in {os.path.basename(a.audio)} ({len(x) / SR:.1f} s)')
    for lid, r, on, off, d, ins, heard in report:
        print(f'  {lid:12s} {r:4.2f}  {on:7.2f}-{off:7.2f}  clip {d:4.2f} s' + (f'  pause opened +{ins} s' if ins else '') + f'  | {heard[:70]}')
    if missing: print('not in the recording (they keep their current clip):', ', '.join(missing))
    if not a.write: return 0

    out_dir = VO if a.lang == 'en' else os.path.join(VO, a.lang)
    mp_path = os.path.join(out_dir, 'vo.json'); man = json.load(open(mp_path, encoding='utf-8'))
    with tempfile.TemporaryDirectory() as td:
        for lid, seg in clips.items():
            w = os.path.join(td, lid + '.wav'); write_wav(w, seg)
            out = os.path.join(out_dir, lid + '.m4a')
            subprocess.run(['afconvert', '-f', 'm4af', '-d', 'aac@22050', '-b', str(BITRATE), '-q', '127', '--src-complexity', 'bats', w, out], check=True)
            dur = float(re.search(r'estimated duration:\s*([\d.]+)', subprocess.run(['afinfo', out], capture_output=True, text=True).stdout).group(1))
            man['lines'][lid] = {'file': lid + '.m4a', 'dur': round(dur, 3), 'recorded': True, 'voice': a.voice, 'source': os.path.basename(a.audio)}
    json.dump(man, open(mp_path, 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
    print(f'installed {len(clips)} clips in {os.path.relpath(out_dir, ROOT)} and marked them as recordings in vo.json')
    return 0


if __name__ == '__main__':
    sys.exit(main())
