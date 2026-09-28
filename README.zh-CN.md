<div align="center">

<img src="docs/assets/logo.svg" width="76" alt="ReelMimic">

# ReelMimic

**丢一支你喜欢的视频，做一支一样风格的动画。**

[![License: MIT](https://img.shields.io/badge/license-MIT-7A6BFF)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code-supported-E86BD2)](https://docs.anthropic.com/en/docs/claude-code)
[![Codex CLI](https://img.shields.io/badge/Codex_CLI-supported-FF9D5C)](https://github.com/openai/codex)
![Node 20+](https://img.shields.io/badge/node-20%2B-5B57F0)
![Python 3.10+](https://img.shields.io/badge/python-3.10%2B-5B57F0)

[繁體中文](README.md) · [English](README.en.md) · **简体中文**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/assets/home-zh-CN-dark.png">
  <img src="docs/assets/home-zh-CN-light.png" alt="ReelMimic 首页" width="860">
</picture>

</div>

## 这是什么

看到一支很喜欢的动画短片，想做一支同样感觉、但内容是自己的？
把视频丢进来（文件、手机录像、YouTube 链接都可以），再说一句你想做什么就好。

ReelMimic 会先看懂那支片怎么剪、节奏多快、镜头怎么动，然后写一份企划给你看。你觉得 OK 才开始做。
做的时候是好几个 AI 分工，每一镜做完都会换另一个 AI 来挑毛病，改到过关才往下走。

它只学别人的手法，不会拿别人的画面或角色来用。整套都在你自己的电脑上跑，用的是你自己的 Claude Code 或 Codex 账号。

<p align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/assets/flow-zh-CN-dark.png">
  <img src="docs/assets/flow-zh-CN-light.png" alt="ReelMimic 流程" width="860">
</picture>
</p>

## 可以做到什么

- **拆解参考片**：几个镜头、每镜多长、BPM、转场、配色、运镜，都会帮你量出来。
- **先给你看企划**：分镜、角色、素材、定调画面都在里面。想改就在旁边聊，改到满意再按核准。
- **一群 AI 一起做**：最多 6 个同时做不同段落。每做完一镜就换一个新的 AI 来审，不会自己审自己。
- **说修好要拿图来看**：每个修正都附修改前后的截屏，审查的人对过才算数。
- **看得到它在干嘛**：每个 AI 正在想什么、跑了什么、看了哪几格，画面上都有，也能打开完整 log。
- **直接在视频上留言**：成片出来后，拉到哪一秒就在那一秒打字，写完一起送出。
- **加新风格不用写程序**：一种风格就是一个 Markdown 档。
- **三种语言**：繁中、英文、简中，右上角切换。

现在做的是 2D 动画，像 Q 版矢量、手绘水彩、动态图像这类。30 秒的片子，核准企划后大概一到两小时做完，看画风而定。

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
| `BUILDERS`、`MAX_AGENTS` | 一支片同时几个 AI 在做（缺省 6）、所有项目加起来最多几个（缺省 12） |
| `PORT` | 网站用的端口（缺省 4318） |

## 文档

- [架构](docs/zh-CN/ARCHITECTURE.md)：整个流程怎么跑、文件怎么放、怎么接 AI
- [扩充](docs/zh-CN/EXTENDING.md)：怎么加风格、加制作引擎、接别的 AI
- [参与开发](CONTRIBUTING.md)

## 使用原则

- 参考片只学手法，像节奏、构图、转场、笑点怎么安排；画面、角色、Logo、素材都不会拿来用。
- 角色缺省是原创的。你有自己的角色设计图，就照你的做。
- 网络上找来的素材会记下来源、作者跟授权，授权不清楚的会特别标出来。
- 歌词只用你给的文本，不会自己去下载商业歌曲。
- 做出来的视频要怎么用，请自己确认有没有权利。

## 授权

代码用 [MIT](LICENSE) 授权。里面附的第三方 skill 和素材照它们原本的授权，细节在 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
