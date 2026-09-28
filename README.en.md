<p align="right"><a href="README.md">繁體中文</a> · <b>English</b> · <a href="README.zh-CN.md">简体中文</a></p>

# ReelMimic — clone the style of a reference video

Drop in a video you love (a file, a phone screen recording or a YouTube link) plus one sentence about what you want.
An AI director breaks down its editing and visual language, picks the matching production skill, works out the
script / camera / assets with you, and **starts rendering only after you approve the plan**. Every character and every
shot is checked by an independent reviewer before delivery.

> Currently 2D animation (flat-vector chibi, hand-painted watercolor, motion graphics…). A 30-second video takes about
> 1–1.5 hours from plan approval to final cut (measured: 68–84 min), all running on your own machine.

---

## Features

- **Style breakdown** — measures the reference's shot count, average shot length, BPM, transitions, palette and camera
  moves, and produces a shot-by-shot style report with contact sheets.
- **Extensible style → skill routing** — one Markdown file per style (`styles/*.md`); production engines are ordinary
  agent skills. Adding a style needs no code.
- **Two AI directors** — [Claude Code](https://docs.anthropic.com/en/docs/claude-code) or
  [Codex CLI](https://github.com/openai/codex), with your own account.
- **Pre-production first** — storyboard, camera (mapped to reference shots), assets (with licenses) and style frames,
  iterated with you until you approve.
- **Multi-agent production line that reviews as it goes**:
  - characters and assets are prepared by separate agents in parallel during pre-production;
  - the cast gate (one reviewer + fixer pair per character) overlaps with shot building;
  - 6 builders work on different segments at once; **each shot is reviewed by a fresh reviewer on full-resolution
    frames as soon as it is done**, while the builder moves on to the next shot;
  - issues are graded *blocker* vs *polish*; every fix must come with before/after crops, verified by the reviewer;
  - a final independent critic looks only at what spans segments: seams, continuity, pacing.
- **A 2D character system without the "cut-out" look** (`vector_rig`) — a skeleton with a single outline, so limbs are
  always attached.
- **Things only you can provide never stall production** — lyrics, your own character designs etc. are listed in the
  plan and provided or skipped before approval; paste lyric text and it is timed against your audio automatically.
- **An AI-product UI** — see live what each agent is doing (thinking, running, which frames it looked at), a full log,
  image attachments in chat, and time-stamped notes right on the video.
- **Three UI languages** — 繁體中文 (default), English, 简体中文, switchable top right; the AI director writes its plan
  and replies in the language you choose.

## Quick start

### 1. Requirements

| Item | Version | Notes |
|---|---|---|
| Node.js | 20+ | web app and rendering |
| Python | 3.10+ | analysis, frame grabs, lyric timing (packages in `requirements.txt`) |
| FFmpeg | recent | on PATH, or set `FFMPEG_DIR` |
| Chrome / Chromium | — | headless frame rendering; set `CHROME_PATH` if not found |
| AI director (at least one) | — | `claude` (Claude Code) or `codex` (Codex CLI), installed and logged in |

Optional: Blender 4.2+ (the paused 3D track), API keys for asset libraries and voices (see Configuration).

### 2. Install

```bash
git clone <this repo> reelmimic && cd reelmimic
./install.sh            # macOS / Linux; on Windows double-click install.bat
```

The installer sets up the Python packages and the web app, builds the UI and runs an environment check
(run it again any time with `cd app && npm run doctor`).

**Connect an AI director** (at least one, with your own account):

```bash
npm i -g @anthropic-ai/claude-code && claude      # Claude Code: the first run walks you through login
npm i -g @openai/codex && codex login             # or Codex
```

Nothing else to configure: Claude Code loads the repo's `.claude/skills/` automatically, and Codex reads `AGENTS.md`.

### 3. Run

```bash
./start.sh              # macOS / Linux
start.bat               # Windows (double-click works too)
# or: cd app && npm start
```

Open <http://localhost:4318>. For UI development: `npm run server` + `npm run web`
(<http://localhost:5173>, /api is proxied to 4318).

### 4. Your first video

1. On the home page, drop a reference video or paste a YouTube link, write what you want (topic, length,
   characters…), and pick Claude Code or Codex.
2. Wait for the style breakdown and the plan (about 30 minutes). Comment in the chat on the right (screenshots
   welcome) and the AI revises the plan.
3. If the plan lists inputs only you can provide (e.g. lyrics), provide or skip them, then click
   **Approve and start**.
4. The **Production line** tab shows the cast gate and every segment with its review frames; the **Log** tab has
   the full log.
5. When the film is ready, type notes at any moment right under the video and send them all at once.

## Configuration

API keys and local paths live in **`~/.reelmimic/secrets.json`** (outside the repo, never committed) and are
loaded when the server starts. See `secrets.example.json`:

| Key | Purpose |
|---|---|
| `YATING_KEY` | Yating Taiwan-Mandarin voices for narration, <https://developer.yating.tw> |
| `PIXABAY_KEY`, `FREESOUND_KEY` | more license-safe images / music / sound effects (Openverse works without a key) |
| `FFMPEG_DIR`, `CHROME_PATH`, `BLENDER`, `CODEX_BIN`, `PYTHON` | tool locations when not on PATH |
| `BUILDERS`, `MAX_AGENTS` | parallel builders per video (default 6), agents at once across all projects (default 12) |
| `PORT` | web port (default 4318) |

## Layout

```
app/                     ReelMimic web app
  server/                  Node: REST + SSE, production state machine (jobs.mjs), per-step agent prompts (prompts.mjs), agent adapters
  web/                     React UI (Vite); i18n.js handles the interface language
  scripts/doctor.mjs       environment check
.claude/skills/
  video-clone/             core skill: workflow SKILL.md, file contract CONTRACT.md, style registry styles/, tools scripts/, character system assets/vector_rig/
  <engine>/                production engine skills (hyperframes, painted-animation…)
projects/<id>/           everything for one video (not version-controlled)
docs/                    architecture and extension guides
```

- [docs/en/ARCHITECTURE.md](docs/en/ARCHITECTURE.md) — how it works: stages, production line, file contract, agent adapters
- [docs/en/EXTENDING.md](docs/en/EXTENDING.md) — add styles, production engines, AI directors; change the pipeline
- [CONTRIBUTING.md](CONTRIBUTING.md) — development workflow

## Content and licensing principles

- From a reference we learn **technique** (rhythm, composition, transitions, how gags are built) — never its footage,
  characters, logos or assets.
- Characters are original by default; if you provide your own character designs, those are followed.
- External assets are logged with source, author and license (`assets/ASSETS.md`); unknown licenses are flagged.
- Lyrics come only from text you provide; commercial songs are never downloaded automatically.
- You are responsible for how you use the videos you generate.

## License

The code is released under the [MIT License](LICENSE). Bundled third-party skills and assets keep their own licenses —
see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
