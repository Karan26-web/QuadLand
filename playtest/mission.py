#!/usr/bin/env python3
"""Play the whole mission headless with the autoplayer and screenshot it.
    python3 playtest/mission.py                       # intro → … → complete
    python3 playtest/mission.py --from land0 --plan sle-e-e-e-e --every 6
    python3 playtest/mission.py --lan gu                # the whole mission in Gujarati (hi mr gu te od)
The learning section (Screen 6) is its own app (learning/), played by hand: the autoplayer checks that it loads
(its loader clears and the lesson begins inside the frame), then presses Skip lesson twice, as a player would.
Screenshots: playtest/screens/m_<n>_<phase>.png. Exit code 1 if a page error happened."""
import sys, os, time, subprocess, socket, argparse
from playwright.sync_api import sync_playwright
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'playtest', 'screens')

def free_port():
    s = socket.socket(); s.bind(('127.0.0.1', 0)); p = s.getsockname()[1]; s.close(); return p

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--from', dest='frm', default='intro')
    ap.add_argument('--to', default='complete')
    ap.add_argument('--plan', default='sle-e-l-e-s')
    ap.add_argument('--fast', default='3')
    ap.add_argument('--every', type=float, default=8)
    ap.add_argument('--timeout', type=float, default=1500)
    ap.add_argument('--size', default='1280x800')
    ap.add_argument('--dpr', default='1')
    ap.add_argument('--tag', default='m')
    ap.add_argument('--lan', default='', help='a language: hi mr gu te od (the game reads ?lan=)')
    ap.add_argument('--soft', action='store_true', help='software GL (no GPU)')
    a = ap.parse_args()
    w, h = map(int, a.size.split('x'))
    port = free_port()
    srv = subprocess.Popen([sys.executable, os.path.join(ROOT, 'playtest', 'serve.py'), str(port), ROOT], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(0.6); os.makedirs(OUT, exist_ok=True)
    errors = []
    try:
        with sync_playwright() as p:
            gpu = ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] if not a.soft else ['--use-angle=swiftshader', '--enable-unsafe-swiftshader']
            b = p.chromium.launch(headless=True, args=gpu + ['--autoplay-policy=no-user-gesture-required'])
            pg = b.new_page(viewport={'width': w, 'height': h})
            pg.on('console', lambda m: (m.type in ('error', 'warning')) and print(f'   [{m.type}] {m.text[:300]}'))
            pg.on('pageerror', lambda e: (errors.append(str(e)), print(f'   [PAGEERROR] {e}')))
            q = f'auto=1&fast={a.fast}&dpr={a.dpr}&plan={a.plan}&screen={a.frm}&seed=7' + (f'&lan={a.lan}' if a.lan else '')
            pg.goto(f'http://127.0.0.1:{port}/index.html?{q}')
            pg.wait_for_function('window.__ql && window.__ql.flow', timeout=120000)
            t0 = time.time(); last_phase = None; last_shot = 0; n = 0; skipped = False
            while time.time() - t0 < a.timeout:
                st = pg.evaluate("() => ({ phase: __ql.flow.phase, sub: document.getElementById('subLine').textContent, cap: document.getElementById('caption').hidden ? '' : document.getElementById('caption').textContent })")
                now = time.time() - t0
                if st['phase'] != last_phase or now - last_shot > a.every:
                    n += 1
                    path = os.path.join(OUT, f"{a.tag}_{n:02d}_{st['phase']}.png")
                    pg.screenshot(path=path); last_shot = now
                    if st['phase'] != last_phase: print(f"[{now:6.1f}s] phase -> {st['phase']}")
                    print(f"           shot {n:02d}  sub: {st['sub'][:70]!r}  cap: {st['cap'][:50]!r}")
                    last_phase = st['phase']
                if not skipped and st['phase'] == 'lesson':
                    pg.frame_locator('#lesson iframe').locator('#welcome.off').wait_for(state='attached', timeout=60000)   # loaded, no welcome page: the lesson has begun
                    pg.wait_for_timeout(800)
                    pg.screenshot(path=os.path.join(OUT, f'{a.tag}_lesson_module.png'))
                    print(f"[{time.time() - t0:6.1f}s] the learning module is up and has begun (no welcome page)")
                    pg.click('#btnSkip'); pg.wait_for_timeout(400)
                    pg.screenshot(path=os.path.join(OUT, f'{a.tag}_skip_confirm.png'))
                    label = pg.evaluate("() => document.getElementById('btnSkip').innerText")
                    print(f"[{time.time() - t0:6.1f}s] Skip pressed once: {label!r}")
                    pg.click('#btnSkip'); skipped = True
                if st['phase'] == a.to and a.to != 'complete': break
                if st['phase'] == 'complete' and pg.evaluate("() => !document.getElementById('btnRestart').hidden"):
                    pg.screenshot(path=os.path.join(OUT, f'{a.tag}_end.png')); print(f'[{now:6.1f}s] RESTART is showing: done'); break
                time.sleep(1.0)
            b.close()
    finally:
        srv.terminate()
    print('errors:', len(errors))
    sys.exit(1 if errors else 0)

if __name__ == '__main__':
    main()
