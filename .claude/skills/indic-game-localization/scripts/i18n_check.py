#!/usr/bin/env python3
"""Check assets/i18n/strings.json: every language has every key (and no others), placeholders like {n} match the
English, the English of every spoken line (vo.*) is the voice script's, and a spoken line in an Indian language holds
no Latin letters (a voice model trained on its own script cannot read them; numbers are fine: the voice tool says
them in words).

    python3 tools/i18n_check.py            # exit code 1 on any problem
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STRINGS = os.path.join(ROOT, 'assets', 'i18n', 'strings.json')
LINES = os.path.join(ROOT, 'assets', 'vo', 'lines.json')
PLACEHOLDER = re.compile(r'\{(\w+)\}')
LATIN = re.compile(r'[A-Za-z]')


def main():
    data = json.load(open(STRINGS, encoding='utf-8'))
    langs = list(data['languages'])
    default = data['defaultLanguage']
    base = data[default]
    problems = []
    for lang in langs:
        sec = data.get(lang)
        if not isinstance(sec, dict):
            problems.append(f'{lang}: no section'); continue
        missing = [k for k in base if k not in sec]
        extra = [k for k in sec if k not in base]
        empty = [k for k, v in sec.items() if not str(v).strip()]
        if missing: problems.append(f'{lang}: missing {missing}')
        if extra: problems.append(f'{lang}: keys the {default} section lacks {extra}')
        if empty: problems.append(f'{lang}: empty {empty}')
        for k, v in sec.items():
            if k in base and sorted(PLACEHOLDER.findall(v)) != sorted(PLACEHOLDER.findall(base[k])):
                problems.append(f'{lang}: {k} placeholders {PLACEHOLDER.findall(v)} != {PLACEHOLDER.findall(base[k])}')
            if lang != 'en' and k.startswith('vo.') and LATIN.search(v):
                problems.append(f'{lang}: {k} has Latin letters (a voice model cannot read them): {v}')
    # the voice script (if the game has one): every line it lists has its words here, and the English is the script's
    script = json.load(open(LINES, encoding='utf-8'))['lines'] if os.path.exists(LINES) else []
    ids = {ln['id'] for ln in script}
    for ln in script:
        if f"vo.{ln['id']}" not in base: problems.append(f"lines.json: {ln['id']} has no vo.{ln['id']} in strings.json")
        elif 'text' in ln and ln['text'] != base[f"vo.{ln['id']}"]: problems.append(f"lines.json: {ln['id']} text differs from strings.json")
    for k in base:
        if script and k.startswith('vo.') and k[3:] not in ids: problems.append(f'strings.json: {k} is not in lines.json (it would never be spoken)')
    n = len(base)
    print(f'{len(langs)} languages ({", ".join(langs)}), {n} keys each ({sum(1 for k in base if k.startswith("vo."))} spoken lines)')
    for p in problems: print('  PROBLEM', p)
    print('OK' if not problems else f'{len(problems)} problem(s)')
    return 1 if problems else 0


if __name__ == '__main__':
    sys.exit(main())
