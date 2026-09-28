<div align="center">

<img src="docs/assets/logo.svg" width="76" alt="ReelMimic">

# ReelMimic

**丟一支喜歡的影片，AI 導演團隊幫你做出同樣風格的新動畫。**

[![License: MIT](https://img.shields.io/badge/license-MIT-7A6BFF)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code-supported-E86BD2)](https://docs.anthropic.com/en/docs/claude-code)
[![Codex CLI](https://img.shields.io/badge/Codex_CLI-supported-FF9D5C)](https://github.com/openai/codex)
![Node 20+](https://img.shields.io/badge/node-20%2B-5B57F0)
![Python 3.10+](https://img.shields.io/badge/python-3.10%2B-5B57F0)

**繁體中文** · [English](README.en.md) · [简体中文](README.zh-CN.md)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/assets/home-zh-TW-dark.png">
  <img src="docs/assets/home-zh-TW-light.png" alt="ReelMimic 首頁" width="860">
</picture>

</div>

## 這是什麼

給它一支參考影片（檔案、手機螢幕錄影或 YouTube 連結）和一句需求，ReelMimic 會拆解那支片的剪法、節奏、運鏡與畫面語言，
和你一起把企劃定下來，**你核准之後**才開始製作，並由一組 AI agent 分工完成、逐鏡審查，最後交出同風格的全新 2D 動畫。

參考片只學手法，不複製它的畫面、角色或素材。全部在你自己的電腦上跑，用你自己的 Claude Code 或 Codex 帳號。

<p align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/assets/flow-zh-TW-dark.png">
  <img src="docs/assets/flow-zh-TW-light.png" alt="ReelMimic 流程" width="860">
</picture>
</p>

## 特色

| 功能 | 說明 |
|---|---|
| **風格拆解** | 自動量測鏡頭數、平均鏡長、BPM、轉場、配色與運鏡，產出逐鏡風格報告 |
| **先企劃再生成** | 分鏡逐鏡對照參考片、素材附授權、定調畫面；來回討論到你滿意才開始 |
| **多 agent 生產線** | 最多 6 個製作 agent 平行，每做完一鏡就由全新的審查員看全解析度畫面，缺陷在哪產生就在哪修 |
| **修正要有證據** | 問題分「必修／順手修」兩級，每個修正都附同一秒、同一位置的前後對照 |
| **看得見 AI 在做什麼** | 即時顯示每個 agent 的思考與步驟、看過的影格、完整紀錄；對話可附圖片 |
| **直接在影片上改** | 成片出來後，在任一時間點打修改意見，一次送出 |
| **可擴充** | 一種風格一個 Markdown 檔；製作引擎就是一般的 agent skill，加新風格不用寫程式 |
| **三種介面語言** | 繁體中文、English、简体中文，右上角切換；AI 導演用你選的語言回報 |

目前支援 2D 動畫：向量 Q 版、手繪水彩、動態圖像等。30 秒短片從核准企劃到成片約 1–2 小時，依畫風而定。

## 快速開始

**需要**：Node.js 20+、Python 3.10+、FFmpeg、Chrome，以及 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) 或 [Codex CLI](https://github.com/openai/codex)（至少一個，已登入）。

```bash
git clone https://github.com/edenfunf/reelmimic.git && cd reelmimic
./install.sh      # Windows：雙擊 install.bat
./start.sh        # Windows：雙擊 start.bat
```

打開 <http://localhost:4318>。安裝腳本會裝好 Python 與網站套件、編譯前端，並檢查環境（之後可隨時 `cd app && npm run doctor`）。
repo 裡的 `.claude/skills/` 會被 Claude Code 自動載入，Codex 則讀 `AGENTS.md`，不需要其他設定。

### 做第一支影片

1. 首頁拖入參考影片或貼連結，寫下想做什麼，選 Claude Code 或 Codex。
2. 等 AI 拆解並寫好企劃，在右側對話框提意見（可以附截圖）。
3. 提供或略過企劃列出的素材（例如歌詞），按「核准並開始生成」。
4. 在「生產線」分頁看每個角色、每一段的進度與審查截圖。
5. 成片出來後，直接在影片下方針對某一秒留言修改。

## 設定

API 金鑰與本機路徑放在 `~/.reelmimic/secrets.json`（在 repo 外，不會被 commit），範本見 [`secrets.example.json`](secrets.example.json)。

| 鍵 | 用途 |
|---|---|
| `YATING_KEY` | 雅婷台灣華語語音（旁白） |
| `PIXABAY_KEY`、`FREESOUND_KEY` | 更多授權安全的圖片、音樂、音效（沒有也能用 Openverse） |
| `FFMPEG_DIR`、`CHROME_PATH`、`CODEX_BIN`、`PYTHON` | 工具不在 PATH 上時指定位置 |
| `BUILDERS`、`MAX_AGENTS` | 每支片平行的製作 agent 數（預設 6）、全部專案同時的 agent 上限（預設 12） |
| `PORT` | 網站埠號（預設 4318） |

## 文件

- [架構](docs/ARCHITECTURE.md)：流程、生產線、檔案合約、agent 轉接層
- [擴充指南](docs/EXTENDING.md)：新增風格、製作引擎、AI 導演，調整流程
- [貢獻方式](CONTRIBUTING.md)

## 內容原則

- 參考片只學手法（節奏、構圖、轉場、笑點設計），不複製畫面、角色、Logo 或素材。
- 角色預設原創；你提供自家角色的設計圖時照著做。
- 外部素材記錄來源、作者與授權（`assets/ASSETS.md`），授權不明的會標示。
- 歌詞只用你提供的文字，不自動下載商業歌曲。
- 生成的影片如何使用由你負責確認。

## 授權

程式碼以 [MIT License](LICENSE) 釋出。內含的第三方 skill 與素材保有各自的授權，見 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
