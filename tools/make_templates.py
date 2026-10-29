#!/usr/bin/env python3
"""Draw the composition guides that docs/assets/*.md attach to GPT prompts (docs/assets/templates/)."""
import os
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'docs', 'assets', 'templates'); os.makedirs(OUT, exist_ok=True)
MAG = (248, 5, 249)
def font(sz):
    for f in ['/System/Library/Fonts/Supplemental/Arial Bold.ttf', '/System/Library/Fonts/Helvetica.ttc']:
        try: return ImageFont.truetype(f, sz)
        except Exception: pass
    return ImageFont.load_default()

# cockpit: the canopy window (magenta) above, the dashboard band below with the instrument zones kept plain
W, H = 2560, 1440; im = Image.new('RGB', (W, H), (22, 28, 70)); d = ImageDraw.Draw(im)
dash = int(H * 0.69)
win = [(240, dash), (300, 900), (420, 420), (560, 190), (680, 160), (1880, 160), (2000, 190), (2140, 420), (2260, 900), (2320, dash)]
d.polygon(win, fill=MAG)
d.rectangle((0, dash, W, H), fill=(14, 18, 48)); d.line((0, dash, W, dash), fill=(120, 150, 255), width=6)
zones = [(420, 'SPEED'), (720, 'LEVER'), (1280, 'AI SCREEN'), (1840, 'BUTTON'), (2140, 'ALT')]
for x, t in zones:
    w = 520 if t == 'AI SCREEN' else 220
    d.rounded_rectangle((x - w // 2, dash + 70, x + w // 2, H - 60), radius=28, outline=(255, 255, 255), width=4)
    d.text((x, dash + 40), t, fill=(255, 255, 255), font=font(30), anchor='mm')
d.text((W // 2, 520), 'CANOPY WINDOW = FLAT MAGENTA #F805F9', fill=(255, 255, 255), font=font(64), anchor='mm')
d.text((W // 2, 610), 'the 3D view of space / the planet shows through here', fill=(255, 255, 255), font=font(40), anchor='mm')
d.text((W // 2, dash - 40), 'dashboard top edge at 69% of the height; keep the framed zones below PLAIN (the game draws its instruments there)', fill=(255, 255, 255), font=font(30), anchor='mm')
im.save(os.path.join(OUT, 'cockpit_layout.png'))

# equirect planet map: the seam and the poles
W, H = 2048, 1024; im = Image.new('RGB', (W, H), (30, 30, 50)); d = ImageDraw.Draw(im)
for i in range(1, 8): d.line((i * W // 8, 0, i * W // 8, H), fill=(70, 70, 110), width=2)
for j in range(1, 4): d.line((0, j * H // 4, W, j * H // 4), fill=(70, 70, 110), width=2)
d.rectangle((0, 0, 40, H), fill=(200, 60, 60)); d.rectangle((W - 40, 0, W, H), fill=(200, 60, 60))
d.rectangle((0, 0, W, 60), fill=(60, 120, 200)); d.rectangle((0, H - 60, W, H), fill=(60, 120, 200))
d.text((W // 2, H // 2 - 40), 'EQUIRECTANGULAR 2:1 PLANET MAP', fill=(255, 255, 255), font=font(64), anchor='mm')
d.text((W // 2, H // 2 + 40), 'red edges must match each other (they meet on the sphere); blue bands are the poles: keep them plain, no detail', fill=(255, 255, 255), font=font(30), anchor='mm')
im.save(os.path.join(OUT, 'equirect_guide.png'))

# the ring strip: inner edge on the left, outer on the right
W, H = 2048, 256; im = Image.new('RGB', (W, H), (0, 0, 0)); d = ImageDraw.Draw(im)
d.text((20, H // 2), 'INNER EDGE (near the planet)', fill=(255, 255, 255), font=font(34), anchor='lm')
d.text((W - 20, H // 2), 'OUTER EDGE', fill=(255, 255, 255), font=font(34), anchor='rm')
d.line((0, H - 30, W, H - 30), fill=(255, 255, 255), width=3)
im.save(os.path.join(OUT, 'ring_guide.png'))

# logo safe area
W, H = 1600, 800; im = Image.new('RGB', (W, H), MAG); d = ImageDraw.Draw(im)
d.rectangle((120, 90, W - 120, H - 90), outline=(255, 255, 255), width=6)
d.text((W // 2, H // 2), 'LOGO INSIDE THE WHITE FRAME', fill=(255, 255, 255), font=font(60), anchor='mm')
im.save(os.path.join(OUT, 'logo_safe.png'))

# a tile: what "seamless" means
W, H = 1024, 1024; im = Image.new('RGB', (W, H), (60, 50, 90)); d = ImageDraw.Draw(im)
for e in [(0, 0, W, 24), (0, H - 24, W, H), (0, 0, 24, H), (W - 24, 0, W, H)]: d.rectangle(e, fill=(200, 60, 60))
d.text((W // 2, H // 2), 'SEAMLESS TILE\nopposite edges continue each other', fill=(255, 255, 255), font=font(48), anchor='mm', align='center')
im.save(os.path.join(OUT, 'tile_guide.png'))
print('templates ->', OUT, sorted(os.listdir(OUT)))
