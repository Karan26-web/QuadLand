#!/usr/bin/env python3
"""A static server for the game and the playtests: threaded, with a deep listen queue (Chrome's parallel module and
voice fetches overflow http.server's default backlog of 5, and a reset module request stops the whole game loading)."""
import sys, http.server, socketserver, functools, os

class Server(http.server.ThreadingHTTPServer):
    request_queue_size = 128
    daemon_threads = True

class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map, '.js': 'text/javascript', '.m4a': 'audio/mp4', '.webp': 'image/webp', '.woff2': 'font/woff2'}
    def log_message(self, *a): pass
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8344
    root = sys.argv[2] if len(sys.argv) > 2 else os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    Server(('127.0.0.1', port), functools.partial(Handler, directory=root)).serve_forever()
