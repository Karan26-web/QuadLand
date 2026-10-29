#!/usr/bin/env python3
"""Install a GPT picture into its slot (assets/art.json; what to paint: docs/assets/*.md).

    python3 tools/install_art.py cockpit ~/Downloads/cockpit.png
    python3 tools/install_art.py rock ~/Downloads/rock.png --no-seam      # it is already seamless
    python3 tools/install_art.py --list                                   # every slot, installed or not
    python3 tools/install_art.py --remove logo                            # back to the procedural stand-in

How each slot's `process` treats the delivery:
    magenta   flat magenta #F805F9 becomes transparent (soft edge, magenta spill removed)
    black     kept as painted on black: drawn with additive light (nebulae)
    luma      a white-on-black sprite: brightness becomes opacity, colour becomes white (smoke, splash, cloud, spark)
    opaque    as painted
    tile      a texture that repeats: the seams are blended unless --no-seam
    equirect  a planet map: the left and right edges are blended so the planet has no seam
    ring      a planet's ring strip, inner edge on the left: on black, brightness becomes opacity, colour kept
The original is copied next to the project, in ../QuadLand - art source/, so nothing a delivery replaces is lost.
"""
import argparse, json, os, shutil, sys
from PIL import Image, ImageFilter, ImageChops
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAN = os.path.join(ROOT, 'assets', 'art.json')
SRC = os.path.join(os.path.dirname(ROOT), 'QuadLand - art source')
MAGENTA = np.array([248, 5, 249], dtype=np.float32)

def key_magenta(im):
    a = np.asarray(im.convert('RGB'), dtype=np.float32)
    d = np.sqrt(((a - MAGENTA) ** 2).sum(-1))
    # "magenta-ness": strong red + blue, weak green, regardless of exact shade
    m = np.clip((np.minimum(a[..., 0], a[..., 2]) - a[..., 1] - 90) / 90, 0, 1)
    alpha = np.clip((d - 40) / 70, 0, 1) * (1 - m * (d < 160))
    # remove the magenta spill from the half-transparent edge
    spill = np.clip(np.minimum(a[..., 0], a[..., 2]) - a[..., 1], 0, None) * (1 - alpha) * 0.9
    a[..., 0] -= spill; a[..., 2] -= spill
    out = np.dstack([np.clip(a, 0, 255), alpha * 255]).astype(np.uint8)
    img = Image.fromarray(out)
    # a hairline erode on the alpha keeps the last pink pixels off the outline
    al = img.getchannel('A').filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.6))
    img.putalpha(al)
    return img

def luma_alpha(im, keep_colour=False):
    a = np.asarray(im.convert('RGB'), dtype=np.float32)
    l = a.max(-1)
    alpha = np.clip((l - 6) / 249, 0, 1) ** 0.9
    rgb = np.where(alpha[..., None] > 0, a / np.maximum(l[..., None], 1) * 255, 0) if keep_colour else np.full_like(a, 255)
    return Image.fromarray(np.dstack([rgb, alpha * 255]).astype(np.uint8))

def seam_blend(im, horizontal=True, vertical=True, k=0.18):
    """mirror-free seam fix: crossfade each edge band with the image rolled by half"""
    a = np.asarray(im.convert('RGB'), dtype=np.float32)
    h, w = a.shape[:2]
    rolled = np.roll(np.roll(a, w // 2 if horizontal else 0, axis=1), h // 2 if vertical else 0, axis=0)
    yy, xx = np.mgrid[0:h, 0:w]
    wx = np.clip(np.minimum(xx, w - 1 - xx) / (w * k), 0, 1) if horizontal else np.ones((h, w))
    wy = np.clip(np.minimum(yy, h - 1 - yy) / (h * k), 0, 1) if vertical else np.ones((h, w))
    m = (wx * wy)[..., None]
    m = m * m * (3 - 2 * m)
    return Image.fromarray((a * m + rolled * (1 - m)).astype(np.uint8))

def wrap_x(im, k=0.08):
    """the left and right edges of an equirect map must meet: blend only the horizontal seam"""
    return seam_blend(im, horizontal=True, vertical=False, k=k)

def fit(im, size, mode):
    w, h = size
    if mode in ('tile', 'equirect', 'ring', 'black', 'luma', 'opaque') or im.size[0] / im.size[1] == w / h:
        return im.resize((w, h), Image.LANCZOS)
    # keep the picture's aspect, centre it on a transparent canvas of the slot's size
    s = min(w / im.size[0], h / im.size[1]); r = im.resize((max(1, int(im.size[0] * s)), max(1, int(im.size[1] * s))), Image.LANCZOS)
    c = Image.new('RGBA', (w, h), (0, 0, 0, 0)); c.paste(r, ((w - r.size[0]) // 2, (h - r.size[1]) // 2)); return c

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('slot', nargs='?'); ap.add_argument('png', nargs='?')
    ap.add_argument('--no-seam', action='store_true'); ap.add_argument('--list', action='store_true'); ap.add_argument('--remove')
    ap.add_argument('--quality', type=int, default=88)
    a = ap.parse_args()
    man = json.load(open(MAN))
    if a.list:
        for k, s in man['slots'].items(): print(f"  {k:14s} {'INSTALLED' if s.get('installed') else '-        '}  {s['file']:24s} {s['size'][0]}x{s['size'][1]}  {s['process']:8s}  docs/assets/{s['doc']}-*.md")
        return
    if a.remove:
        man['slots'][a.remove]['installed'] = False; man['version'] = man.get('version', 1) + 1
        json.dump(man, open(MAN, 'w'), indent=1); print('removed', a.remove); return
    if a.slot not in man['slots']: sys.exit(f'unknown slot {a.slot!r}; try --list')
    spec = man['slots'][a.slot]; mode = spec['process']
    im = Image.open(os.path.expanduser(a.png))
    if mode == 'magenta': out = key_magenta(im)
    elif mode == 'luma': out = luma_alpha(im)
    elif mode == 'ring': out = luma_alpha(im, keep_colour=True)
    elif mode == 'tile': out = im.convert('RGB') if a.no_seam else seam_blend(im)
    elif mode == 'equirect': out = im.convert('RGB') if a.no_seam else wrap_x(im)
    else: out = im.convert('RGB')
    out = fit(out, spec['size'], mode)
    dst = os.path.join(ROOT, 'assets', spec['file']); os.makedirs(os.path.dirname(dst), exist_ok=True)
    os.makedirs(SRC, exist_ok=True); shutil.copy2(os.path.expanduser(a.png), os.path.join(SRC, f"{a.slot}{os.path.splitext(a.png)[1]}"))
    out.save(dst, 'WEBP', quality=a.quality, method=6, lossless=False, exact=out.mode == 'RGBA')
    spec['installed'] = True; spec['bytes'] = os.path.getsize(dst); man['version'] = man.get('version', 1) + 1
    json.dump(man, open(MAN, 'w'), indent=1)
    print(f'installed {a.slot} -> assets/{spec["file"]} ({spec["bytes"] // 1024} KB, {mode}); art version {man["version"]}')

if __name__ == '__main__':
    main()
