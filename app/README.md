# app/ — ReelMimic 網站

安裝與啟動見根目錄 [README](../README.md)；架構見 [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md)。

```
server/   index.mjs（HTTP/SSE）· jobs.mjs（流程與生產線）· prompts.mjs（agent 指令）· agents/（Claude Code / Codex 轉接）· env.mjs（金鑰）
web/      React 前端：App.jsx（首頁）· Project.jsx（專案頁）· Chat.jsx（對話與思考過程）· ui.jsx（元件）· styles.css
scripts/  doctor.mjs（環境檢查）
```
