/* ==========================================================================
 * i18n.js -- the one place the game's words are looked up
 * --------------------------------------------------------------------------
 * Every word the learner reads lives in locales-quadrilaterals.json, under
 * one key per line, in every language the game speaks (en, hi, mr, te, gu,
 * od). The language is chosen by the URL:
 *
 *     index.html?lan=hi        Hindi
 *     index.html?lan=te        Telugu
 *     index.html               the file's defaultLanguage (English)
 *
 * (`?lang=` is accepted as well.) A code the file does not have falls back
 * to the default, so a bad link never shows an empty board.
 *
 * ---- loading ----
 * The lesson runs from a web server (Live Server) AND from file://. The JSON
 * is fetched first, so an edit to it is live on a server without a build
 * step. Browsers refuse to fetch a local file from file://, and there the
 * generated locales-quadrilaterals.js (window.GAME_LOCALES) is loaded by a
 * script tag instead. Regenerate it after editing the JSON:
 *
 *     python3 build/gen_locales.py
 *
 * ---- the voice-over ----
 * script.js keys every clip by the ENGLISH line it belongs to. So every
 * translation handed out here is remembered against its English source
 * (t -> source), and the voice-over asks I18n.source(text) before it looks a
 * line up: a Hindi line finds the English clip for the same sentence, and a
 * line built from a template ("And its height is {h}.") finds it too,
 * because the English form is built alongside the translated one.
 *
 * ---- a voice of the language's own ----
 * A language may carry its own recordings, listed under "voiceOver" in the
 * JSON by the KEY of the line they say:
 *
 *     "voiceOver": { "hi": { "dir": "assets/VO-HI/", "rev": "...",
 *                            "files": { "p01Hey": "112.webm", "p20Work.0": "263.webm" } } }
 *
 * An array item is "key.index". A line built from a template is said only by
 * a recording of that filled line, named "key|placeholder=value" with the
 * value as the English text would have it, for example
 * "p04HeightIs|h=h₁" or "p25Made|whole=rectangle": a recording of the bare
 * template, with its {placeholder} in it, would say the wrong word. For
 * such a language I18n.voice(text) gives the clip for a line on screen, or
 * null for a line it has no recording of (which then types in silence);
 * every other language keeps the English clips.
 *
 * ---- static markup ----
 * index.html marks its own text with data attributes, and applyStatic()
 * fills them once the locale is in:
 *     data-i18n="key"                     textContent
 *     data-i18n-html="key"                innerHTML, with ½ drawn as the
 *                                         stacked fraction and ² as <sup>
 *     data-i18n-fmt="16 {unitCm}"         a template whose {key}s are filled,
 *                                         rendered like data-i18n-html
 *     data-i18n-attr="title:key;aria-label:key"   attributes
 * ========================================================================== */
var I18n = (function () {
  'use strict';

  var PARAM     = 'lan';                          /* ?lan=hi */
  var PARAM_ALT = 'lang';                         /* ...and ?lang=hi */
  var JSON_PATH = 'locales/locales-quadrilaterals.json';
  var JS_PATH   = 'locales/locales-quadrilaterals.js';   /* generated fallback for file:// */
  /* the file's own codes, and what the <html lang> attribute should say for
     them where the two differ (Odia is "or" to the browser) */
  var BCP47 = { od: 'or' };
  /* keys of the file that are not languages */
  var META = { defaultLanguage: 1, languageLabels: 1, supportedLanguages: 1, voiceOver: 1 };

  var _data   = null;
  var _lang   = 'en';
  var _source = Object.create(null);              /* translated line -> English line */
  var _keyOf  = Object.create(null);              /* line on screen -> its key (voice-over) */
  var _textOf = Object.create(null);              /* ...and back */

  /* ---------- which language ---------- */
  function _urlLang() {
    try {
      var p = new URLSearchParams(window.location.search);
      var v = p.get(PARAM) || p.get(PARAM_ALT) || '';
      return String(v).trim().toLowerCase();
    } catch (e) { return ''; }
  }
  function _isLang(code) {
    return !!(code && _data && !META[code] && _data[code] && typeof _data[code] === 'object');
  }
  function _pick() {
    var want = _urlLang();
    if (_isLang(want)) return want;
    var def = _data && _data.defaultLanguage;
    if (_isLang(def)) return def;
    return _isLang('en') ? 'en' : Object.keys(_data || {}).filter(_isLang)[0] || 'en';
  }

  /* ---------- loading ---------- */
  function _readJson(path, cb) {
    var xhr;
    try { xhr = new XMLHttpRequest(); xhr.open('GET', path, true); }
    catch (e) { return cb(null); }
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      /* status 0 is what file:// reports, success or not: the body decides */
      if (xhr.status !== 200 && xhr.status !== 0) return cb(null);
      try { cb(JSON.parse(xhr.responseText)); } catch (e) { cb(null); }
    };
    try { xhr.send(); } catch (e) { cb(null); }
  }
  function _readScript(path, cb) {
    if (window.GAME_LOCALES) return cb(window.GAME_LOCALES);
    var s = document.createElement('script');
    s.src = path;
    s.onload  = function () { cb(window.GAME_LOCALES || null); };
    s.onerror = function () { cb(null); };
    (document.head || document.documentElement).appendChild(s);
  }

  /* remember every line of the chosen language against its English source,
     so the voice-over can find a clip by the words on screen */
  /* a line as the voice-over compares it: spaces of every kind made one */
  function _norm(s) { return String(s).replace(/\s+/g, ' ').trim(); }
  function _noteKey(text, id) {
    var n = _norm(text);
    if (!(n in _keyOf)) _keyOf[n] = id;
    if (!(id in _textOf)) _textOf[id] = text;
  }
  function _buildSource() {
    _source = Object.create(null);
    _keyOf  = Object.create(null);
    _textOf = Object.create(null);
    var en = _data.en || {}, dict = _data[_lang] || {};
    Object.keys(dict).forEach(function (key) {
      var v = dict[key];
      if (typeof v === 'string') _noteKey(v, key);
      else if (Array.isArray(v)) v.forEach(function (item, i) {
        if (typeof item === 'string') _noteKey(item, key + '.' + i);
      });
    });
    if (_lang === 'en') return;
    Object.keys(dict).forEach(function (key) {
      var tv = dict[key], ev = en[key];
      if (typeof tv === 'string' && typeof ev === 'string') {
        if (!(tv in _source)) _source[tv] = ev;
      } else if (Array.isArray(tv) && Array.isArray(ev)) {
        tv.forEach(function (item, i) {
          if (typeof item === 'string' && typeof ev[i] === 'string' && !(item in _source)) _source[item] = ev[i];
        });
      }
    });
  }

  function _finish(data, cb) {
    _data = data || { defaultLanguage: 'en', en: {} };
    _lang = _pick();
    _buildSource();
    try { document.documentElement.lang = BCP47[_lang] || _lang; } catch (e) {}
    if (cb) cb(_lang);
  }

  /* Load the locale and call back with the language code. The JSON first,
     then the generated script for file://, and the game goes on in English
     keys if neither can be read -- never a blocked mission. */
  function load(cb) {
    var fromScript = function () {
      _readScript(JS_PATH, function (js) {
        if (!js && typeof console !== 'undefined' && console.warn) {
          console.warn('[i18n] could not read ' + JSON_PATH + ' or ' + JS_PATH + '; showing keys');
        }
        _finish(js, cb);
      });
    };
    /* a page opened from disk cannot fetch a file beside it (the browser
       logs a CORS error and hands back nothing), so it goes straight to
       the generated script rather than asking first */
    var local = false;
    try { local = window.location.protocol === 'file:'; } catch (e) {}
    if (local) return fromScript();
    _readJson(JSON_PATH, function (json) {
      if (json) return _finish(json, cb);
      fromScript();
    });
  }

  /* ---------- the lookup ---------- */
  function _sub(str, repl) {
    if (!repl) return str;
    Object.keys(repl).forEach(function (k) {
      str = str.split('{' + k + '}').join(String(repl[k]));
    });
    return str;
  }
  /* the English for a line on screen, or the line itself if it is English
     already (or was never one of ours) */
  function source(text) {
    var s = String(text);
    return (s in _source) ? _source[s] : s;
  }
  /* t(key, replacements): the line in the current language. An array key
     (a worked example) comes back as a fresh array. A missing key comes
     back as the key itself, so it can be seen and fixed. */
  function t(key, repl) {
    var dict = (_data && _data[_lang]) || {};
    var en   = (_data && _data.en) || {};
    var val  = (key in dict) ? dict[key] : ((key in en) ? en[key] : key);
    if (Array.isArray(val)) return val.slice();
    if (typeof val !== 'string') return String(key);
    if (!repl) return val;
    var out = _sub(val, repl);
    /* the same line in English, its fillings taken back to English too, so
       the voice-over finds "Join the top and bottom corners" under the
       Hindi sentence that names the corners in Hindi */
    var enTpl = (typeof en[key] === 'string') ? en[key] : val;
    var enRepl = {};
    Object.keys(repl).forEach(function (k) { enRepl[k] = source(repl[k]); });
    var enOut = _sub(enTpl, enRepl);
    if (out !== enOut && !(out in _source)) _source[out] = enOut;
    /* the filled line's own name, for a recording of it (see voice) */
    _noteKey(out, key + Object.keys(enRepl).sort().map(function (k) { return '|' + k + '=' + enRepl[k]; }).join(''));
    return out;
  }
  function has(key) {
    return !!(_data && ((_data[_lang] && key in _data[_lang]) || (_data.en && key in _data.en)));
  }
  /* "16 {unitCm}" -> "16 cm": every {key} in the template is a lookup */
  function fmt(template) {
    return String(template).replace(/\{(\w+)\}/g, function (m, k) { return has(k) ? t(k) : m; });
  }

  /* ---------- static markup ---------- */
  var FRAC_HALF = '<span class="frac"><span class="num">1</span><span class="den">2</span></span>';
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  /* a line as markup: the half as the stacked fraction the board draws
     everywhere, and a squared as a superscript */
  function html(text) {
    return esc(text).split('½').join(FRAC_HALF).split('²').join('<sup>2</sup>');
  }
  function applyStatic(root) {
    root = root || document;
    var q = function (sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); };
    q('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (has(key)) el.textContent = t(key);
    });
    q('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (has(key)) el.innerHTML = html(t(key));
    });
    q('[data-i18n-fmt]').forEach(function (el) {
      el.innerHTML = html(fmt(el.getAttribute('data-i18n-fmt')));
    });
    q('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var at = pair.indexOf(':');
        if (at < 0) return;
        var attr = pair.slice(0, at).trim(), key = pair.slice(at + 1).trim();
        if (attr && has(key)) el.setAttribute(attr, t(key));
      });
    });
    if (root === document && has('pageTitle')) document.title = t('pageTitle');
  }

  /* ---------- the voice-over ---------- */
  function _pack() {
    var vo = _data && _data.voiceOver;
    var p = vo && vo[_lang];
    return (p && p.files) ? p : null;
  }
  /* does the chosen language bring recordings of its own? */
  function hasVoice() { return !!_pack(); }
  function _url(p, file) { return (p.dir || '') + file + (p.rev ? '?v=' + p.rev : ''); }
  /* the recording of a line on screen, or null if there is none */
  function voice(text) {
    var p = _pack();
    if (!p || text == null) return null;
    var id = _keyOf[_norm(text)];
    var file = id && p.files[id];
    return file ? _url(p, file) : null;
  }
  /* every line of the language that has a recording, as it is shown --
     `only`, a pattern on the keys, narrows it (the preload wants the lines
     that are said, not the buttons) */
  function voiceTexts(only) {
    var p = _pack();
    if (!p) return [];
    return Object.keys(p.files)
      .filter(function (id) { return id in _textOf && (!only || only.test(id)); })
      .map(function (id) { return _textOf[id]; });
  }

  /* ---------- the language, read and changed ---------- */
  function getLang() { return _lang; }
  function getSupportedLanguages() {
    return (_data && _data.supportedLanguages) ? _data.supportedLanguages : {};
  }
  /* the URL is the one switch: a new language is a reload with ?lan=xx, so
     every line, ghost and clip is built for it from the first frame */
  function setLang(code) {
    code = String(code || '').toLowerCase();
    if (!_isLang(code) || code === _lang) return false;
    try {
      var url = new URL(window.location.href);
      url.searchParams.set(PARAM, code);
      url.searchParams.delete(PARAM_ALT);
      window.location.href = url.toString();
      return true;
    } catch (e) { return false; }
  }

  return {
    load: load,
    t: t,
    has: has,
    fmt: fmt,
    html: html,
    source: source,
    hasVoice: hasVoice,
    voice: voice,
    voiceTexts: voiceTexts,
    applyStatic: applyStatic,
    getLang: getLang,
    setLang: setLang,
    getSupportedLanguages: getSupportedLanguages
  };
})();
