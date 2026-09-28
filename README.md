<p align="right"><b>繁體中文</b> · <a href="README.en.md">English</a> · <a href="README.zh-CN.md">简体中文</a></p>

# ReelMimic 影摹 — 參考影片風格克隆

丟一支你喜歡的影片（檔案、手機螢幕錄影或 YouTube 連結）＋一句需求，AI 導演會拆解它的剪法與畫面語言、選對應的製作技能、
和你一起把腳本／運鏡／素材想清楚，**你核准企劃後才開始生成**，每個角色、每一個鏡頭都由獨立審查員檢查過才交件。

> 目前支援 2D 動畫（向量 Q 版、手繪水彩、動態圖像…）。30 秒短片從核准企劃到成片約 1–1.5 小時（實測 68–84 分鐘），全部在你自己的電腦上跑。

---

## 特色

- **風格拆解**：自動量測參考片的鏡頭數、平均鏡頭長度、BPM、轉場、配色、運鏡，產出逐鏡的風格報告與總覽圖。
- **可擴充的風格 → 製作技能對應**：一種風格一個 Markdown 檔（`styles/*.md`），製作引擎是一般的 agent skill，加新風格不用改程式。
- **兩種 AI 導演**：接 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) 或 [Codex CLI](https://github.com/openai/codex)，用你自己的帳號。
- **前製企劃先對焦**：分鏡、運鏡（逐鏡對照參考片）、素材（附授權）、定調畫面，來回討論到你滿意才核准。
- **多 agent 生產線、邊做邊審**：
  - 前製時每個角色、素材由不同 agent 同時準備；
  - 角色關（每個角色一組審查＋修正）與鏡頭製作重疊進行；
  - 6 個製作 agent 平行做不同段落，**每做完一鏡就由全新對話的審查員看全解析度截圖**，製作 agent 同時做下一鏡；
  - 問題分「一定要修／順手修」兩級，修正要附前後對照截圖，審查員先核對才放行；
  - 最後由獨立評審只看跨段的接縫、連戲、節奏。
- **不拼接的 2D 角色系統**（`vector_rig`）：骨架＋一體外輪廓，四肢永遠接在身上。
- **只有你能提供的東西不會卡住流程**：歌詞、自家角色設計圖等列在企劃裡，核准前就提供或略過；歌詞貼文字即可，系統用你的音檔自動對時。
- **像 AI 產品的操作介面**：即時顯示每個 agent 正在做什麼（思考、執行、看了哪些影格）、完整紀錄、對話可附圖片、在影片時間點直接留言修改。
- **三種介面語言**：繁體中文（預設）、English、简体中文，右上角切換；AI 導演會用你選的語言寫企劃與回報。

## 快速開始

### 1. 需要的東西

| 項目 | 版本 | 說明 |
|---|---|---|
| Node.js | 20+ | 網站與渲染 |
| Python | 3.10+ | 影片分析、截圖、歌詞對時（套件見 `requirements.txt`） |
| FFmpeg | 近期版本 | 在 PATH 上，或設 `FFMPEG_DIR` |
| Chrome / Chromium | — | 無頭渲染影格；找不到時設 `CHROME_PATH` |
| AI 導演（至少一個） | — | `claude`（Claude Code）或 `codex`（Codex CLI），裝好並登入 |

選配：Blender 4.2+（暫停中的 3D 賽道）、各素材庫與語音 API 金鑰（見下方設定）。

### 2. 安裝

```bash
git clone <this repo> reelmimic && cd reelmimic
./install.sh            # macOS / Linux；Windows 雙擊 install.bat
```

安裝腳本會裝 Python 套件、網站套件、編譯前端，最後跑環境檢查（之後也可以隨時 `cd app && npm run doctor`）。

**連上 AI 導演**（至少一個，用你自己的帳號）：

```bash
npm i -g @anthropic-ai/claude-code && claude      # Claude Code：第一次執行會引導登入
npm i -g @openai/codex && codex login             # 或 Codex
```

不需要其他設定：repo 裡的 `.claude/skills/` 會被 Claude Code 自動載入，Codex 則讀 `AGENTS.md`。

### 3. 啟動

```bash
./start.sh              # macOS / Linux
start.bat               # Windows（雙擊也可以）
# 或：cd app && npm start
```

打開 <http://localhost:4318>。開發前端時：`npm run server` ＋ `npm run web`（<http://localhost:5173>，/api 自動轉到 4318）。

### 4. 做第一支影片

1. 首頁拖入參考影片或貼 YouTube 連結，寫一句你想做什麼（主題、長度、角色…），選 Claude Code 或 Codex。
2. 等 AI 拆解風格、寫好前製企劃（約 30 分鐘）。在右側對話框提意見（可以附截圖），AI 改完再給你看。
3. 企劃列出需要你提供的素材（例如歌詞）時，提供或略過後按「核准並開始生成」。
4. 「生產線」分頁可以看到角色關、每一段鏡頭的狀態與審查截圖；「紀錄」分頁是完整 log。
5. 成片出來後，在影片下方的輸入框直接針對某一秒打修改意見，一次送出多則。

## 設定

API 金鑰與本機路徑放在 **`~/.reelmimic/secrets.json`**（repo 外，不會被 commit），伺服器啟動時載入，範本見 `secrets.example.json`：

| 鍵 | 用途 |
|---|---|
| `YATING_KEY` | 雅婷台灣華語語音（旁白），<https://developer.yating.tw> |
| `PIXABAY_KEY`、`FREESOUND_KEY` | 更多授權安全的圖片／音樂／音效（沒有也能用 Openverse） |
| `FFMPEG_DIR`、`CHROME_PATH`、`BLENDER`、`CODEX_BIN`、`PYTHON` | 工具不在 PATH 上時指定位置 |
| `BUILDERS`、`MAX_AGENTS` | 每支片平行的製作 agent 數（預設 6）、所有專案同時的 agent 上限（預設 12） |
| `PORT` | 網站埠號（預設 4318） |

## 專案結構

```
app/                     ReelMimic 網站
  server/                  Node：REST + SSE、生產線狀態機（jobs.mjs）、每個階段的 agent 指令（prompts.mjs）、agent 轉接層
  web/                     React 前端（Vite），i18n.js 為介面語言
  scripts/doctor.mjs       環境檢查
.claude/skills/
  video-clone/             核心 skill：流程 SKILL.md、檔案合約 CONTRACT.md、風格表 styles/、工具 scripts/、角色系統 assets/vector_rig/
  <engine>/                製作引擎 skill（hyperframes、painted-animation…）
projects/<id>/           每支影片的所有檔案（不進版本控制）
docs/                    架構與擴充說明
```

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — 系統怎麼運作：階段、生產線、檔案合約、agent 轉接
- [docs/EXTENDING.md](docs/EXTENDING.md) — 加新風格、新製作引擎、新 AI 導演、調整流程
- [CONTRIBUTING.md](CONTRIBUTING.md) — 開發方式與提交規範

## 內容與授權原則

- 參考片只學**手法**（節奏、構圖、轉場、笑點設計），不複製它的畫面、角色、Logo 或素材。
- 角色預設原創；使用者提供自家角色的設計圖時照著做。
- 外部素材自動記錄來源、作者與授權（`assets/ASSETS.md`），授權不明的會標示出來。
- 歌詞只使用使用者提供的文字；不自動下載商業歌曲。
- 你生成的影片由你負責確認可以使用的範圍。

## 授權

本專案程式碼以 [MIT License](LICENSE) 釋出。內含的第三方 skill 與素材各自保有原授權，見 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
