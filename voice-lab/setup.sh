#!/bin/bash
# The voice lab from nothing: a Python environment and the open speech models. About 15 GB on disk, most of it
# models; a fast connection takes 15-20 minutes. Safe to run again: it skips what is already there.
#   voice-lab/setup.sh
set -euo pipefail
cd "$(dirname "$0")"

echo "== Python environment (.venv)"
[ -x .venv/bin/python ] || python3 -m venv .venv
.venv/bin/python -m pip install -q -U pip wheel setuptools
.venv/bin/python -m pip install -q -r requirements.txt
.venv/bin/python -m pip install -q --no-deps "TTS==0.22.0"

echo "== AI4Bharat Indic-TTS: a female and a male voice per language (MIT), ~1.5 GB each"
mkdir -p models/indic-tts
for l in hi mr gu te or; do
  if [ ! -d "models/indic-tts/$l/fastpitch" ]; then
    curl -fL --retry 3 -o "models/indic-tts/$l.zip" "https://github.com/AI4Bharat/Indic-TTS/releases/download/v1-checkpoints-release/$l.zip"
    (cd models/indic-tts && unzip -q -o "$l.zip" && rm "$l.zip")
  fi
done

echo "== SYSPIN (IISc / ARTPARK): Hindi, Marathi, Telugu, female and male (CC-BY-4.0), 333 MB each"
for pair in Hindi:hi Marathi:mr Telugu:te; do
  lang=${pair%%:*}; code=${pair##*:}
  for g in Male Female; do
    gl=$(echo "$g" | tr 'A-Z' 'a-z'); d="models/syspin/${lang}${g}"; mkdir -p "$d"
    for f in chars.txt README.md "${code}_${gl}_vits_30hrs.pt"; do
      [ -s "$d/$f" ] || curl -fsL --retry 3 -o "$d/$f" "https://huggingface.co/SYSPIN/tts_vits_coquiai_${lang}${g}/resolve/main/$f"
    done
  done
done

echo "== Done. Meta MMS-TTS voices (and the MMS recogniser asr_check.py uses) download on first use into models/hf."
echo "   Try:  .venv/bin/python lab.py voices"
echo "         .venv/bin/python lab.py say hi-indic-female \"नमस्ते!\" -o hello.m4a"
