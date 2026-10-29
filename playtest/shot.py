#!/usr/bin/env python3
"""Screenshot dev views / screens: python3 playtest/shot.py name=query [name=query ...] [--wait 4000] [--size 1280x800]"""
import sys, os, time, subprocess, socket, argparse
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'playtest', 'screens')

def free_port():
    s = socket.socket(); s.bind(('127.0.0.1', 0)); p = s.getsockname()[1]; s.close(); return p

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('shots', nargs='+')
    ap.add_argument('--wait', type=int, default=3500)
    ap.add_argument('--size', default='1280x800')
    ap.add_argument('--soft', action='store_true')
    a = ap.parse_args()
    w, h = map(int, a.size.split('x'))
    port = free_port()
    srv = subprocess.Popen([sys.executable, os.path.join(ROOT, 'playtest', 'serve.py'), str(port), ROOT], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(0.6)
    os.makedirs(OUT, exist_ok=True)
    try:
        with sync_playwright() as p:
            args = ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] if a.soft else ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist']
            b = p.chromium.launch(headless=True, args=args)
            for spec in a.shots:
                name, q = spec.split('=', 1)
                pg = b.new_page(viewport={'width': w, 'height': h})
                logs = []
                pg.on('console', lambda m: logs.append(f'[{m.type}] {m.text}'))
                pg.on('pageerror', lambda e: logs.append(f'[pageerror] {e}'))
                t0 = time.time()
                pg.goto(f'http://127.0.0.1:{port}/index.html?{q}')
                try:
                    pg.wait_for_function('window.__ql && window.__ql.flow', timeout=90000)
                except Exception as e:
                    logs.append(f'[timeout] {e}')
                pg.wait_for_timeout(a.wait)
                path = os.path.join(OUT, f'{name}.png')
                pg.screenshot(path=path)
                print(f'== {name} ({time.time()-t0:.1f}s) -> {path}')
                for l in logs:
                    if 'GPU stall' in l or 'Automatic fallback' in l: continue
                    print('   ', l[:400])
                pg.close()
            b.close()
    finally:
        srv.terminate()

if __name__ == '__main__':
    main()
