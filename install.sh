#!/usr/bin/env bash
# ReelMimic — one-time setup: Python packages, web app, UI build, environment check.
set -e
cd "$(dirname "$0")"
PY="${PYTHON:-python3}"; command -v "$PY" >/dev/null || PY=python
echo "== Python packages ($PY)"; "$PY" -m pip install -r requirements.txt
echo "== Web app"; cd app && npm install && npm run build
echo "== Environment check"; node scripts/doctor.mjs || true
cat <<'MSG'

Next:
  1. Install and log in to at least one AI director:
       Claude Code:  npm i -g @anthropic-ai/claude-code   then run `claude` once to log in
       Codex:        npm i -g @openai/codex               then `codex login`
  2. Optional keys → ~/.reelmimic/secrets.json (see secrets.example.json)
  3. Start: ./start.sh   →  http://localhost:4318
MSG
