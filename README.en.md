<div align="center">

<img src="docs/assets/logo.svg" width="76" alt="ReelMimic">

# ReelMimic

**Show it a video you love. Get an animation in the same style.**

[![License: MIT](https://img.shields.io/badge/license-MIT-7A6BFF)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code-supported-E86BD2)](https://docs.anthropic.com/en/docs/claude-code)
[![Codex CLI](https://img.shields.io/badge/Codex_CLI-supported-FF9D5C)](https://github.com/openai/codex)
![Node 20+](https://img.shields.io/badge/node-20%2B-5B57F0)
![Python 3.10+](https://img.shields.io/badge/python-3.10%2B-5B57F0)

[繁體中文](README.md) · **English** · [简体中文](README.zh-CN.md)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/assets/home-en-dark.png">
  <img src="docs/assets/home-en-light.png" alt="ReelMimic home page" width="860">
</picture>

</div>

## What is this?

Ever watched a short animation and thought "I want one like that, but about my thing"?
Drop the video in (a file, a phone recording, or a YouTube link) and tell it what you want to make.

ReelMimic works out how the video is cut, how fast it moves and what the camera does, then writes up a plan for you.
Nothing gets made until you say it's good. After that, several AI agents split up the work, and every shot gets
checked by a different agent before it moves on.

It copies the technique, not the footage or the characters. Everything runs on your own computer, with your own
Claude Code or Codex account.

<p align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/assets/flow-en-dark.png">
  <img src="docs/assets/flow-en-light.png" alt="How ReelMimic works" width="860">
</picture>
</p>

## What it does

- **Breaks down the reference.** Number of shots, how long each one is, BPM, transitions, colors, camera moves.
- **Shows you the plan first.** Storyboard, characters, assets and a few style frames. Chat about it until you like it, then approve.
- **Lots of agents at once.** Up to 6 work on different parts of the video. Each finished shot goes to a new agent for review, so nobody grades their own work.
- **Fixes need proof.** Every fix comes with before and after screenshots, and the reviewer checks them.
- **You can see what it's doing.** What each agent is thinking, what it ran, which frames it looked at. The full log is there too.
- **Comment right on the video.** When it's done, scrub to any second and type a note. Send them all at once.
- **New styles are just Markdown.** One file per style, no code.
- **Three languages.** 繁體中文, English and 简体中文, switch in the top right.

Right now it makes 2D animation: flat vector characters, watercolor, motion graphics and so on. A 30-second video takes
about one to two hours after you approve the plan, depending on the style.

## Getting started

You'll need Node.js 20+, Python 3.10+, FFmpeg, Chrome, and either
[Claude Code](https://docs.anthropic.com/en/docs/claude-code) or [Codex CLI](https://github.com/openai/codex) (logged in).

```bash
git clone https://github.com/edenfunf/reelmimic.git && cd reelmimic
./install.sh      # on Windows, double-click install.bat
./start.sh        # on Windows, double-click start.bat
```

Then open <http://localhost:4318>. The install script checks your setup and tells you if anything's missing. You can run
the check again any time with `cd app && npm run doctor`. Claude Code picks up the skills in this repo on its own, and
Codex reads `AGENTS.md`, so there's nothing else to set up.

### Your first video

1. On the home page, drop in a reference video or paste a link, say what you want, and pick Claude Code or Codex.
2. Wait for the breakdown and the plan. If you want changes, say so in the chat on the right. Screenshots work too.
3. If the plan asks you for something (lyrics, say), add it or skip it, then hit **Approve and start**.
4. The **Production line** tab shows where each character and each part of the video is, with the review screenshots.
5. When it's done, leave a note at whatever second looks off.

## Settings

API keys and a few paths go in `~/.reelmimic/secrets.json`. That file lives outside the repo, so it never gets
committed. See [`secrets.example.json`](secrets.example.json) for the format.

| Key | What it's for |
|---|---|
| `YATING_KEY` | Yating's Taiwanese Mandarin voices, for narration |
| `PIXABAY_KEY`, `FREESOUND_KEY` | More images, music and sound effects you're allowed to use (optional, Openverse works without a key) |
| `FFMPEG_DIR`, `CHROME_PATH`, `CODEX_BIN`, `PYTHON` | Where to find these tools if they're not on your PATH |
| `BUILDERS`, `MAX_AGENTS` | How many agents work on one video at once (default 6), and the limit across all projects (default 12) |
| `PORT` | Web port (default 4318) |

## Docs

- [Architecture](docs/en/ARCHITECTURE.md): how the whole thing runs, where files go, how the AI plugs in
- [Extending](docs/en/EXTENDING.md): adding styles, rendering engines, or another AI
- [Contributing](CONTRIBUTING.md)

## Ground rules

- It learns technique from the reference (pacing, framing, transitions, how the jokes land). It never reuses the
  footage, characters, logos or assets.
- Characters are original unless you bring your own designs, in which case it follows yours.
- Anything it finds online gets logged with its source, author and license. Unclear licenses are flagged.
- Lyrics only come from text you give it. It won't download commercial songs.
- What you do with the videos is up to you, so make sure you have the rights.

## License

The code is [MIT](LICENSE). Third-party skills and assets bundled here keep their own licenses, listed in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
