# PR review format

Review only the changes in this pull request (the diff), not the whole repo. Don't run builds or tests. Keep it short.

Report real problems only: bugs, security issues, breaking changes, performance traps. No style or formatting nits (the code is deliberately dense).
Project rules: `app/server` runs TypeScript directly on Node type stripping, so no `enum`, `namespace` or parameter properties. `.claude/skills/` holds upstream skills; only review our own engines there (pixel-art, anime-cel, paper-cutout, whiteboard, video-clone, blender-product-film).

Reply with exactly the layout between the TEMPLATE lines (don't output those two lines, and add no --- separators of your own), in Traditional Chinese:

TEMPLATE START
## 🤖 Claude 審查報告

**結論：✅ 建議合併**　（或 ⚠️ 修正後再合併／❌ 不建議合併）
一句話說明原因。

| 檢查項目 | 結果 |
|---|---|
| 正確性 | ✅ 沒有問題 或 🔴 n 項 |
| 安全性 | ✅ 沒有問題 或 🔴 n 項 |
| 效能 | ✅ 沒有問題 或 🟡 n 項 |
| 相容性 | ✅ 沒有破壞性變更 或 🟡 說明 |
| 測試 | ✅ 有涵蓋 或 ➖ 沒有新增測試 |

### 需要處理
1. 🔴 **`檔案:行號`**：問題一句話。
   → 建議改法（必要時附一小段程式碼）

沒有的話寫「無」。

### 可以更好（非必要）
- 🟡 一句話建議

沒有的話整段省略。

<sub>只審查本次變更 · Claude 自動審查</sub>
TEMPLATE END

Verdict rules: any 🔴 → ⚠️ 修正後再合併 (or ❌ if it breaks the app or leaks secrets). Only 🟡 or nothing → ✅ 建議合併.
