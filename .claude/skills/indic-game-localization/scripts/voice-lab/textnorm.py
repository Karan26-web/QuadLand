"""Text a voice model can say: the subtitle text, made speakable.

Voice models for Indian languages are trained on their own script only. They cannot read the digit "5" or a Latin
letter, and some leave out marks that a page shows (a zero-width joiner, a danda). So before a line is spoken:
  * numbers become words in the line's language ("5" -> "पाँच"), from the tables below. A number that is not in its
    language's table is an error, never a silent skip: add it to the table (and have a speaker check it).
  * zero-width (non-)joiners go: they only change how letters are drawn.
  * per-model fixes: a model without the danda gets a full stop; Odia's decomposed nukta letters (ଡ଼ ଢ଼, typed as a
    letter + U+0B3C) become the single letters the Odia model was trained on.
`unknown(text, charset)` lists anything still outside a model's alphabet, so a render can refuse it.
"""
import re
import unicodedata

# Number words (cardinals) for every number this game's lines can say, plus 0-20 and the tens.
NUMBERS = {
    'hi': {0: 'शून्य', 1: 'एक', 2: 'दो', 3: 'तीन', 4: 'चार', 5: 'पाँच', 6: 'छह', 7: 'सात', 8: 'आठ', 9: 'नौ', 10: 'दस',
           11: 'ग्यारह', 12: 'बारह', 13: 'तेरह', 14: 'चौदह', 15: 'पंद्रह', 16: 'सोलह', 17: 'सत्रह', 18: 'अठारह', 19: 'उन्नीस',
           20: 'बीस', 24: 'चौबीस', 25: 'पच्चीस', 26: 'छब्बीस', 30: 'तीस', 32: 'बत्तीस', 35: 'पैंतीस', 40: 'चालीस',
           42: 'बयालीस', 50: 'पचास', 60: 'साठ', 70: 'सत्तर', 80: 'अस्सी', 90: 'नब्बे', 100: 'सौ'},
    'mr': {0: 'शून्य', 1: 'एक', 2: 'दोन', 3: 'तीन', 4: 'चार', 5: 'पाच', 6: 'सहा', 7: 'सात', 8: 'आठ', 9: 'नऊ', 10: 'दहा',
           11: 'अकरा', 12: 'बारा', 13: 'तेरा', 14: 'चौदा', 15: 'पंधरा', 16: 'सोळा', 17: 'सतरा', 18: 'अठरा', 19: 'एकोणीस',
           20: 'वीस', 24: 'चोवीस', 25: 'पंचवीस', 26: 'सव्वीस', 30: 'तीस', 32: 'बत्तीस', 35: 'पस्तीस', 40: 'चाळीस',
           42: 'बेचाळीस', 50: 'पन्नास', 60: 'साठ', 70: 'सत्तर', 80: 'ऐंशी', 90: 'नव्वद', 100: 'शंभर'},
    'gu': {0: 'શૂન્ય', 1: 'એક', 2: 'બે', 3: 'ત્રણ', 4: 'ચાર', 5: 'પાંચ', 6: 'છ', 7: 'સાત', 8: 'આઠ', 9: 'નવ', 10: 'દસ',
           11: 'અગિયાર', 12: 'બાર', 13: 'તેર', 14: 'ચૌદ', 15: 'પંદર', 16: 'સોળ', 17: 'સત્તર', 18: 'અઢાર', 19: 'ઓગણીસ',
           20: 'વીસ', 24: 'ચોવીસ', 25: 'પચ્ચીસ', 26: 'છવ્વીસ', 30: 'ત્રીસ', 32: 'બત્રીસ', 35: 'પાંત્રીસ', 40: 'ચાળીસ',
           42: 'બેતાળીસ', 50: 'પચાસ', 60: 'સાઠ', 70: 'સિત્તેર', 80: 'એંસી', 90: 'નેવું', 100: 'સો'},
    'te': {0: 'సున్నా', 1: 'ఒకటి', 2: 'రెండు', 3: 'మూడు', 4: 'నాలుగు', 5: 'ఐదు', 6: 'ఆరు', 7: 'ఏడు', 8: 'ఎనిమిది',
           9: 'తొమ్మిది', 10: 'పది', 11: 'పదకొండు', 12: 'పన్నెండు', 13: 'పదమూడు', 14: 'పద్నాలుగు', 15: 'పదిహేను',
           16: 'పదహారు', 17: 'పదిహేడు', 18: 'పద్దెనిమిది', 19: 'పందొమ్మిది', 20: 'ఇరవై', 24: 'ఇరవై నాలుగు',
           25: 'ఇరవై ఐదు', 26: 'ఇరవై ఆరు', 30: 'ముప్పై', 32: 'ముప్పై రెండు', 35: 'ముప్పై ఐదు', 40: 'నలభై',
           42: 'నలభై రెండు', 50: 'యాభై', 60: 'అరవై', 70: 'డెబ్బై', 80: 'ఎనభై', 90: 'తొంభై', 100: 'వంద'},
    'od': {0: 'ଶୂନ', 1: 'ଏକ', 2: 'ଦୁଇ', 3: 'ତିନି', 4: 'ଚାରି', 5: 'ପାଞ୍ଚ', 6: 'ଛଅ', 7: 'ସାତ', 8: 'ଆଠ', 9: 'ନଅ', 10: 'ଦଶ',
           11: 'ଏଗାର', 12: 'ବାର', 13: 'ତେର', 14: 'ଚଉଦ', 15: 'ପନ୍ଦର', 16: 'ଷୋହଳ', 17: 'ସତର', 18: 'ଅଠର', 19: 'ଊଣେଇଶି',
           20: 'କୋଡ଼ିଏ', 24: 'ଚବିଶି', 25: 'ପଚିଶି', 26: 'ଛବିଶି', 30: 'ତିରିଶି', 32: 'ବତିଶି', 35: 'ପଞ୍ଚତିରିଶି', 40: 'ଚାଳିଶି',
           42: 'ବୟାଳିଶି', 50: 'ପଚାଶ', 60: 'ଷାଠିଏ', 70: 'ସତୁରି', 80: 'ଅଶୀ', 90: 'ନବେ', 100: 'ଶହେ'},
}

DIGITS = re.compile(r'\d+')
JOINERS = re.compile('[‌‍]')
# Odia letters with a nukta: a model trained on the single letters cannot read letter + U+0B3C
ODIA_NUKTA = {'ଡ଼': 'ଡ଼', 'ଢ଼': 'ଢ଼'}


class MissingNumber(ValueError):
    pass


def number_words(n, lang):
    table = NUMBERS.get(lang)
    if table is None:
        raise MissingNumber(f'no number words for language {lang!r}')
    if n not in table:
        raise MissingNumber(f'{n} has no words in {lang!r}: add it to NUMBERS in voice-lab/textnorm.py')
    return table[n]


def speakable(text, lang, charset=None):
    """the line as the model should get it (charset: the model's alphabet, when known, for the per-model fixes)"""
    t = unicodedata.normalize('NFC', text)
    if lang != 'en':
        t = DIGITS.sub(lambda m: number_words(int(m.group()), lang), t)
    t = JOINERS.sub('', t)
    if lang == 'od' and (charset is None or '଼' not in charset):
        for a, b in ODIA_NUKTA.items(): t = t.replace(a, b)
    if charset is not None and '।' not in charset:
        t = t.replace('।', '.')
    t = t.replace('‘', "'").replace('’', "'").replace('“', '').replace('”', '')
    return re.sub(r'\s+', ' ', t).strip()


def unknown(text, charset):
    """characters of the text the model has never seen (they would be dropped without a word)"""
    return sorted({ch for ch in text if ch not in charset and not ch.isspace()})
