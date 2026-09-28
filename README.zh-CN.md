<div align="center">

<img src="docs/assets/logo.svg" width="76" alt="ReelMimic">

# ReelMimic

**丢一支你喜欢的视频，做一支一样风格的新视频。**

[![License: MIT](https://img.shields.io/badge/license-MIT-7A6BFF)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code-supported-E86BD2)](https://docs.anthropic.com/en/docs/claude-code)
[![Codex CLI](https://img.shields.io/badge/Codex_CLI-supported-FF9D5C)](https://github.com/openai/codex)
![Node 20+](https://img.shields.io/badge/node-20%2B-5B57F0)
![Python 3.10+](https://img.shields.io/badge/python-3.10%2B-5B57F0)

[English](README.md) · [繁體中文](README.zh-TW.md) · **简体中文**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/assets/home-zh-CN-dark.png">
  <img src="docs/assets/home-zh-CN-light.png" alt="ReelMimic 首页" width="860">
</picture>

</div>

## 这是什么

看到一支很喜欢的视频，想做一支同样风格、但内容完全是自己的？

把视频丢进 ReelMimic 就好。文件、手机录屏或 YouTube 链接都可以，再告诉它你想做什么。

它会先把参考片拆开来看，像是剪辑节奏、镜头长度、转场、构图、配色和运镜，再整理成一份企划给你确认。你可以直接在旁边聊天、改设置、补素材，觉得可以了再开始做。

真正开始制作后，工作会拆给多个 AI 分工。不同段落可以同时进行，每一镜做完也会交给另一个 AI 检查，有问题就退回去改，不是生成一次就直接交差。

ReelMimic 学的是参考片的做法，不是把原本的画面、角色或素材搬过来。

整套流程都跑在你自己的电脑上，用你自己的 Claude Code 或 Codex。

<p align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/assets/flow-zh-CN-dark.png">
  <img src="docs/assets/flow-zh-CN-light.png" alt="ReelMimic 流程" width="860">
</picture>
</p>

## 可以做到什么

- **拆解参考片**：镜头数量、镜头长度、BPM、转场、配色、构图和运镜都会整理出来。
- **先给你看企划**：分镜、角色、素材、定调画面都在里面。想改就在旁边聊，改到满意再按核准。
- **多个 AI 分工**：最多 6 个同时做不同段落。每做完一镜就换一个新的 AI 来审，不会自己审自己。
- **说修好要拿图来看**：每个修正都附修改前后的截屏，审查的人对过才算数。
- **看得到它在干嘛**：每个 AI 正在想什么、跑了什么、看了哪几格，画面上都有，也能打开完整 log。
- **直接在视频上留言**：成片出来后，拉到哪一秒就在那一秒打字，写完一起送出。
- **加新风格不用写程序**：一种风格就是一个 Markdown 档。
- **三种语言**：繁中、英文、简中，右上角切换。

实际生成时间会跟视频长度、风格和复杂度有关。以 60 秒左右的短片来说，企划核准后通常需要一到两小时。

## 开始用

先装好这些：Node.js 20 以上、Python 3.10 以上、FFmpeg、Chrome，还有 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) 或 [Codex CLI](https://github.com/openai/codex) 其中一个（要先登录）。

```bash
git clone https://github.com/edenfunf/reelmimic.git && cd reelmimic
./install.sh      # Windows 直接双击 install.bat
./start.sh        # Windows 直接双击 start.bat
```

打开 <http://localhost:4318> 就能用了。安装脚本会顺便检查环境，少了什么会跟你说；之后想再检查一次，跑 `cd app && npm run doctor`。
Claude Code 会自己读到 repo 里的 skills，Codex 会读 `AGENTS.md`，不用另外设置。

### 做第一支视频

1. 在首页丢参考视频或贴链接，写你想做什么，选要用 Claude Code 还是 Codex。
2. 等它拆解完、写好企划。有意见就在右边聊天框讲，也可以贴截屏。
3. 企划里如果有要你给的东西（像歌词），给它或跳过，然后按「核准并开始生成」。
4. 「生产线」分页可以看到每个角色、每一段做到哪、审查截屏长怎样。
5. 做好之后觉得哪里不对，就直接在那一秒留言。

## 设置

密钥跟一些路径放在 `~/.reelmimic/secrets.json`。这个档在 repo 外面，不会被 commit，格式可以照 [`secrets.example.json`](secrets.example.json)。

| 键 | 用来做什么 |
|---|---|
| `YATING_KEY` | 雅婷的台湾华语语音，拿来配旁白 |
| `PIXABAY_KEY`、`FREESOUND_KEY` | 可以找到更多能合法使用的图片、音乐、音效（没有也行，会用 Openverse） |
| `FFMPEG_DIR`、`CHROME_PATH`、`CODEX_BIN`、`PYTHON` | 这些工具不在 PATH 上的话，在这里指定位置 |
| `CODEX_SANDBOX` | Codex 的沙盒模式（默认 `danger-full-access`，和 Claude Code 允许 Bash 时一样；`workspace-write` 会让 Chrome 渲染跑不起来） |
| `BUILDERS`、`MAX_AGENTS` | 一支片同时几个 AI 在做（默认 6）、所有项目加起来最多几个（默认 12） |
| `PORT` | 网站用的端口（默认 4318） |

## 文档

- [架构](docs/zh-CN/ARCHITECTURE.md)：整个流程怎么跑、文件怎么放、怎么接 AI
- [扩充](docs/zh-CN/EXTENDING.md)：怎么加风格、加制作引擎、接别的 AI
- [参与开发](CONTRIBUTING.md)

## 使用原则

- 参考片只学手法，像节奏、构图、转场、笑点怎么安排；画面、角色、Logo、素材都不会拿来用。
- 角色默认是原创的。你有自己的角色设计图，就照你的做。
- 网络上找来的素材会记下来源、作者跟授权，授权不清楚的会特别标出来。
- 歌词只用你给的文本，不会自己去下载商业歌曲。
- 做出来的视频要怎么用，请自己确认有没有权利。

## 授权

代码用 [MIT](LICENSE) 授权。里面附的第三方 skill 和素材照它们原本的授权，细节在 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
