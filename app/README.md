# app/ — the ReelMimic web app

Install and start it as described in the root [README](../README.md); how it works is in [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md).

```
server/   index.mjs (HTTP/SSE) · jobs.mjs (workflow and production line) · prompts.mjs (agent instructions) · agents/ (Claude Code / Codex adapters) · env.mjs (keys)
web/      React UI: App.jsx (home) · Project.jsx (project page) · Chat.jsx (chat and live agent steps) · ui.jsx (components) · i18n.js (languages) · styles.css
scripts/  doctor.mjs (environment check)
```
