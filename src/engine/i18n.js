// ---------------------------------------------------------------------------
// The game's words, in the player's language (assets/i18n/strings.json).
// The URL picks it, as in the team's learning module:
//     index.html?lan=hi     Hindi        ?lan=mr  Marathi    ?lan=gu  Gujarati
//     index.html?lan=te     Telugu       ?lan=od  Odia (or, ory)
//     index.html            English
// (?lang= works too.) An unknown code falls back to English, and a key a
// language lacks falls back to its English, so a bad link never shows a blank.
//   t('ui.play')                the word for a key
//   t('feed.alt', { n: 24 })    with {n} filled in
//   apply()                     fills the page's marked elements:
//       data-i18n="key"                    textContent
//       data-i18n-attr="aria-label:key"    attributes (; between several)
// <html lang> and data-script are set for the fonts and the voice; the body
// gets lang-xx. voice.js reads the spoken lines (vo.*) through here too.
// ---------------------------------------------------------------------------
const URL_PARAMS = ['lan', 'lang'];

export const i18n = {
  data: null, lang: 'en', meta: { html: 'en', script: 'latn' }, words: {}, fallback: {},

  async load(path = 'assets/i18n/strings.json') {
    try { this.data = await fetch(path).then((r) => r.json()); }
    catch (e) { console.warn('[i18n] no strings, English built in', e); this.data = null; return this; }
    const d = this.data, langs = d.languages || {};
    const q = new URLSearchParams(location.search);
    let want = (URL_PARAMS.map((p) => q.get(p)).find(Boolean) || '').trim().toLowerCase();
    want = (d.aliases || {})[want] || want;
    this.lang = langs[want] && d[want] ? want : d.defaultLanguage || 'en';
    this.meta = langs[this.lang] || this.meta;
    this.fallback = d[d.defaultLanguage || 'en'] || {};
    this.words = d[this.lang] || this.fallback;
    const html = document.documentElement;
    html.lang = this.meta.html || this.lang; html.dataset.script = this.meta.script || 'latn';
    document.body.classList.add(`lang-${this.lang}`);
    document.title = this.t('doc.title');
    return this;
  },

  /** the word for a key; {name} placeholders are filled from vars */
  t(key, vars) {
    let s = this.words[key] ?? this.fallback[key] ?? key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] ?? m));
    return s;
  },
  has(key) { return key in this.words || key in this.fallback; },

  /** fill the marked elements under root */
  apply(root = document) {
    for (const el of root.querySelectorAll('[data-i18n]')) el.textContent = this.t(el.dataset.i18n);
    for (const el of root.querySelectorAll('[data-i18n-attr]')) {
      for (const pair of el.dataset.i18nAttr.split(';')) {
        const [attr, key] = pair.split(':').map((x) => x.trim());
        if (attr && key) el.setAttribute(attr, this.t(key));
      }
    }
  },

  /** the code the team's learning module expects for this language (it uses the same codes: en hi mr te gu od) */
  get moduleCode() { return this.lang; },
};
export const t = (key, vars) => i18n.t(key, vars);
