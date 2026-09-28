<p align="right"><a href="README.md">繁體中文</a> · <a href="README.en.md">English</a> · <b>简体中文</b></p>

# ReelMimic 影摹 — 参考视频风格克隆

丢一支你喜欢的视频（文件、手机屏幕录像或 YouTube 链接）＋一句需求，AI 导演会拆解它的剪法与画面语言、选对应的制作技能、
和你一起把脚本／运镜／素材想清楚，**你核准企划后才开始生成**，每个角色、每一个镜头都由独立审查员检查过才交件。

> 目前支持 2D 动画（矢量 Q 版、手绘水彩、动态图像…）。30 秒短片从核准企划到成片约 1–1.5 小时（实测 68–84 分钟），全部在你自己的电脑上跑。

---

## 特色

- **风格拆解**：自动量测参考片的镜头数、平均镜头长度、BPM、转场、配色、运镜，产出逐镜的风格报告与总览图。
- **可扩充的风格 → 制作技能对应**：一种风格一个 Markdown 文件（`styles/*.md`），制作引擎是一般的 agent skill，加新风格不用改程序。
- **两种 AI 导演**：接 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) 或 [Codex CLI](https://github.com/openai/codex)，用你自己的账号。
- **前制企划先对焦**：分镜、运镜（逐镜对照参考片）、素材（附授权）、定调画面，来回讨论到你满意才核准。
- **多 agent 生产线、边做边审**：
  - 前制时每个角色、素材由不同 agent 同时准备；
  - 角色关（每个角色一组审查＋修正）与镜头制作重叠进行；
  - 6 个制作 agent 平行做不同段落，**每做完一镜就由全新对话的审查员看全分辨率截屏**，制作 agent 同时做下一镜；
  - 问题分「一定要修／顺手修」两级，修正要附前后对照截屏，审查员先核对才放行；
  - 最后由独立评审只看跨段的接缝、连戏、节奏。
- **不拼接的 2D 角色系统**（`vector_rig`）：骨架＋一体外轮廓，四肢永远接在身上。
- **只有你能提供的东西不会卡住流程**：歌词、自家角色设计图等列在企划里，核准前就提供或略过；歌词贴文本即可，系统用你的音频文件自动对时。
- **像 AI 产品的操作界面**：即时显示每个 agent 正在做什么（思考、运行、看了哪些影格）、完整纪录、对话可附图片、在视频时间点直接留言修改。
- **三种界面语言**：繁體中文（默认）、English、简体中文，右上角切换；AI 导演会用你选的语言写企划与回报。

## 快速开始

### 1. 需要的东西

| 项目 | 版本 | 说明 |
|---|---|---|
| Node.js | 20+ | 网站与渲染 |
| Python | 3.10+ | 视频分析、截屏、歌词对时（套件见 `requirements.txt`） |
| FFmpeg | 近期版本 | 在 PATH 上，或设 `FFMPEG_DIR` |
| Chrome / Chromium | — | 无头渲染影格；找不到时设 `CHROME_PATH` |
| AI 导演（至少一个） | — | `claude`（Claude Code）或 `codex`（Codex CLI），装好并登录 |

选配：Blender 4.2+（暂停中的 3D 赛道）、各素材库与语音 API 密钥（见下方设置）。

### 2. 安装

```bash
git clone <this repo> reelmimic && cd reelmimic
./install.sh            # macOS / Linux；Windows 双击 install.bat
```

安装脚本会装 Python 套件、网站套件、编译前端，最后跑环境检查（之后也可以随时 `cd app && npm run doctor`）。

**连上 AI 导演**（至少一个，用你自己的账号）：

```bash
npm i -g @anthropic-ai/claude-code && claude      # Claude Code：第一次运行会引导登录
npm i -g @openai/codex && codex login             # 或 Codex
```

不需要其他设置：repo 里的 `.claude/skills/` 会被 Claude Code 自动加载，Codex 则读 `AGENTS.md`。

### 3. 启动

```bash
./start.sh              # macOS / Linux
start.bat               # Windows（双击也可以）
# 或：cd app && npm start
```

打开 <http://localhost:4318>。开发前端时：`npm run server` ＋ `npm run web`（<http://localhost:5173>，/api 自动转到 4318）。

### 4. 做第一支视频

1. 首页拖入参考视频或贴 YouTube 链接，写一句你想做什么（主题、长度、角色…），选 Claude Code 或 Codex。
2. 等 AI 拆解风格、写好前制企划（约 30 分钟）。在右侧对话框提意见（可以附截屏），AI 改完再给你看。
3. 企划列出需要你提供的素材（例如歌词）时，提供或略过后按「核准并开始生成」。
4. 「生产线」分页可以看到角色关、每一段镜头的状态与审查截屏；「纪录」分页是完整 log。
5. 成片出来后，在视频下方的输入框直接针对某一秒打修改意见，一次送出多则。

## 设置

API 密钥与本机路径放在 **`~/.reelmimic/secrets.json`**（repo 外，不会被 commit），服务器启动时加载，范本见 `secrets.example.json`：

| 键 | 用途 |
|---|---|
| `YATING_KEY` | 雅婷台湾华语语音（旁白），<https://developer.yating.tw> |
| `PIXABAY_KEY`、`FREESOUND_KEY` | 更多授权安全的图片／音乐／音效（没有也能用 Openverse） |
| `FFMPEG_DIR`、`CHROME_PATH`、`BLENDER`、`CODEX_BIN`、`PYTHON` | 工具不在 PATH 上时指定位置 |
| `BUILDERS`、`MAX_AGENTS` | 每支片平行的制作 agent 数（默认 6）、所有项目同时的 agent 上限（默认 12） |
| `PORT` | 网站端口号（默认 4318） |

## 项目结构

```
app/                     ReelMimic 网站
  server/                  Node：REST + SSE、生产线状态机（jobs.mjs）、每个阶段的 agent 指令（prompts.mjs）、agent 转接层
  web/                     React 前端（Vite），i18n.js 为界面语言
  scripts/doctor.mjs       环境检查
.claude/skills/
  video-clone/             内核 skill：流程 SKILL.md、文件合约 CONTRACT.md、风格表 styles/、工具 scripts/、角色系统 assets/vector_rig/
  <engine>/                制作引擎 skill（hyperframes、painted-animation…）
projects/<id>/           每支视频的所有文件（不进版本控制）
docs/                    架构与扩充说明
```

- [docs/zh-CN/ARCHITECTURE.md](docs/zh-CN/ARCHITECTURE.md) — 系统怎么运作：阶段、生产线、文件合约、agent 转接
- [docs/zh-CN/EXTENDING.md](docs/zh-CN/EXTENDING.md) — 加新风格、新制作引擎、新 AI 导演、调整流程
- [CONTRIBUTING.md](CONTRIBUTING.md) — 开发方式与提交规范

## 内容与授权原则

- 参考片只学**手法**（节奏、构图、转场、笑点设计），不拷贝它的画面、角色、Logo 或素材。
- 角色默认原创；用户提供自家角色的设计图时照着做。
- 外部素材自动记录来源、作者与授权（`assets/ASSETS.md`），授权不明的会标示出来。
- 歌词只使用用户提供的文本；不自动下载商业歌曲。
- 你生成的视频由你负责确认可以使用的范围。

## 授权

本项目代码以 [MIT License](LICENSE) 发布。内含的第三方 skill 与素材各自保有原授权，见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
