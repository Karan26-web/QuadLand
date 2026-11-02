#!/usr/bin/env python3
"""Regenerate locales-quadrilaterals.js from locales-quadrilaterals.json.

    python3 build/gen_locales.py

locales-quadrilaterals.json is the single source of truth for every word the
game shows, in every language. On a web server i18n.js fetches the JSON
itself, so an edit is live at once. From file:// a browser will not hand a
page a local JSON file, so i18n.js falls back to this generated script, which
holds the same data as window.GAME_LOCALES. Re-run this after editing the
JSON, or a file:// run will show the words as they were.
"""

import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "locales" / "locales-quadrilaterals.json"
OUT = ROOT / "locales" / "locales-quadrilaterals.js"

HEADER = """/* GENERATED FILE -- do not edit by hand.
 *
 * Built from locales-quadrilaterals.json, which is the single source of truth
 * for every line the game shows. Regenerate after editing the JSON:
 *
 *   python3 build/gen_locales.py
 *
 * Only read on file://, where i18n.js cannot fetch the JSON itself.
 */
window.GAME_LOCALES = """


def main():
    data = json.loads(SRC.read_text(encoding="utf-8"))
    body = json.dumps(data, ensure_ascii=False, indent=2)
    OUT.write_text(HEADER + body + ";\n", encoding="utf-8")
    langs = [k for k, v in data.items() if isinstance(v, dict) and k not in ("languageLabels", "supportedLanguages", "voiceOver")]
    print("wrote %s -- %d languages: %s" % (OUT.name, len(langs), ", ".join(langs)))


if __name__ == "__main__":
    main()
