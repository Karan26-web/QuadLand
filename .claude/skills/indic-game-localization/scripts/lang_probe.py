#!/usr/bin/env python3
"""Open the game once per language and report what loaded: <html lang>, the script, the body font, the page title,
any failed request (a missing narration manifest, a font) and any page error. Optionally screenshot each.

    python3 lang_probe.py --root . --page index.html --langs en,hi,mr,gu,te,od,or,xx --shots playtest/screens/lang
    python3 lang_probe.py --ready "window.game && window.game.ready"     # wait for the game's own ready signal

Needs Python Playwright with Chromium (pip install playwright && playwright install chromium). The server is threaded
with a deep listen queue: Chrome's parallel module and audio fetches overflow http.server's default backlog of 5, and a
reset module request leaves the page silently unbooted.
"""
import argparse, functools, http.server, os, socket, sys, threading


class Server(http.server.ThreadingHTTPServer):
    request_queue_size = 128
    daemon_threads = True


class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map, '.js': 'text/javascript', '.m4a': 'audio/mp4',
                      '.woff2': 'font/woff2', '.json': 'application/json'}
    def log_message(self, *a): pass


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--root', default='.')
    ap.add_argument('--page', default='index.html')
    ap.add_argument('--langs', default='en,hi,mr,gu,te,od,or,xx', help='values for ?lan= (xx: an unknown code)')
    ap.add_argument('--param', default='lan')
    ap.add_argument('--ready', default='document.documentElement.dataset.script', help='a JS expression that is truthy once the page is ready')
    ap.add_argument('--wait', type=int, default=1500, help='extra ms after ready')
    ap.add_argument('--size', default='1366x638')
    ap.add_argument('--shots', help='a folder for one screenshot per language')
    a = ap.parse_args()
    from playwright.sync_api import sync_playwright
    s = socket.socket(); s.bind(('127.0.0.1', 0)); port = s.getsockname()[1]; s.close()
    srv = Server(('127.0.0.1', port), functools.partial(Handler, directory=os.path.abspath(a.root)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    w, h = map(int, a.size.split('x'))
    if a.shots: os.makedirs(a.shots, exist_ok=True)
    failed_any = False
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True, args=['--autoplay-policy=no-user-gesture-required'])
        for lan in a.langs.split(','):
            pg = b.new_page(viewport={'width': w, 'height': h})
            bad = []
            pg.on('pageerror', lambda e: bad.append(f'page error: {e}'))
            pg.on('response', lambda r: r.status >= 400 and bad.append(f'{r.status} {r.url.split(str(port), 1)[-1]}'))
            q = f'?{a.param}={lan}' if lan else ''
            pg.goto(f'http://127.0.0.1:{port}/{a.page}{q}')
            try: pg.wait_for_function(f'() => !!({a.ready})', timeout=60000)
            except Exception as e: bad.append(f'never ready: {e}'.splitlines()[0])
            pg.wait_for_timeout(a.wait)
            r = pg.evaluate("""() => ({ lang: document.documentElement.lang, script: document.documentElement.dataset.script || '-',
                title: document.title, font: getComputedStyle(document.body).fontFamily.split(',')[0] })""")
            print(f"{q or '(none)':12s} lang={r['lang']:3s} script={r['script']:5s} font={r['font']:20s} title={r['title']}")
            for x in bad: print('     ', x); failed_any = True
            if a.shots: pg.screenshot(path=os.path.join(a.shots, f'lang-{lan or "none"}.png'))
            pg.close()
        b.close()
    srv.shutdown()
    return 1 if failed_any else 0


if __name__ == '__main__':
    sys.exit(main())
