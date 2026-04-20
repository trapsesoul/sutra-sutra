---
title: "如果你要把工作交給 AI，先把 Success Criteria 寫好"
description: "當你開始把工作交給 AI agent，真正決定交付品質的，常常不是 prompt，而是你有沒有先把 done 定義清楚。"
pubDate: 2026-04-20
tags: ["ai", "coding-agent", "workflow", "success-criteria", "engineering-management"]
---

我最近越來越明確的一個感受是：

很多團隊在導入 AI coding workflow 之後，卡住的點其實不是模型不夠強，而是任務定義太鬆。

你叫它「把這個功能做完」，它通常真的能生出一版能跑的東西。

但問題是，**能跑，不等於這件事真的完成了。**

很多時候，真正缺的不是更厲害的 prompt，而是更清楚的 done definition。

所以我現在很傾向在每個開發流程或 ticket 裡，直接放一個 **Success Criteria Block**。

原因很簡單，這會強迫大家先講清楚：到底什麼叫做做完。

## 為什麼我覺得這件事很重要

如果沒有明確 success criteria，實際上很容易變成下面這種狀況：

- 功能看起來做完了，但只驗 happy path
- 測試沒補，lint 沒跑，卻覺得應該可以 merge
- scope 一路擴，改到不該動的檔案或 contract
- performance、成本、observability 根本沒進入討論
- reviewer 看完整個 PR，還是搞不清楚這到底算不算 done

所以問題從來不是「有沒有做」，而是：

**你有沒有先把完成的定義講清楚。**

## 我推薦的 Success Criteria Block

### 1) Functional
- [ ] 必要行為 A 可正常運作（含主要 happy path）
- [ ] 邊界情境 B/C 可正確處理
- [ ] 錯誤情境 D 回傳預期錯誤碼或訊息

### 2) Quality Gates
- [ ] Unit tests 新增或更新並全數通過
- [ ] Integration / E2E（若適用）通過
- [ ] Lint / Type check 全綠
- [ ] 無新增高風險 security issue（SAST / 依賴掃描）

### 3) Compatibility & Scope Guardrail
- [ ] 不破壞既有公開介面（API schema / event contract）
- [ ] DB migration 向後相容（若不相容需明確註記）
- [ ] 僅允許修改檔案範圍：`<paths>`
- [ ] 明確禁止修改：`<paths/contracts/comments not in scope>`

### 4) Performance / Cost
- [ ] p95 latency 不高於 baseline + `<X>%`
- [ ] 記憶體 / CPU 開銷不超過 `<threshold>`
- [ ] Token / API 成本不高於 baseline + `<X>%`（若適用）

### 5) Observability
- [ ] 新增必要 log / metric / trace（可定位失敗原因）
- [ ] Dashboard / alert（若適用）已更新

### 6) Rollout & Rollback
- [ ] Feature flag：`<flag_name>`（預設 OFF / ON）
- [ ] Rollout plan：`<canary / staged / full>`
- [ ] Rollback steps 已驗證可執行

### 7) Deliverables
- [ ] PR 說明包含：Assumptions / Tradeoffs / Risks / Test Evidence
- [ ] 變更清單與驗證證據可被 reviewer 直接對照

## 這個 block 的價值，不只是拿來約束 AI

很多人看到這種東西，第一反應會是：這是不是 prompt engineering 的一部分？

我覺得不是只有這樣。

它真正有價值的地方是，它會逼整個團隊先對齊：

- 這次到底要改到哪裡
- 哪些地方不能碰
- 驗證要做到什麼程度
- 效能和風險要不要一起算進來
- 如果出事，要怎麼 rollback

換句話說，這不是單純讓 AI 更聽話而已。

這是在把原本模糊的「完成定義」，變成可以執行、可以 review、也可以驗收的規格。

## 如果你開始把工作交給 AI agent，這件事只會更重要

當任務是交給 AI agent 執行時，沒有 success criteria 的成本通常更高。

因為 agent 很容易出現這些情況：

- 自己補完你沒講清楚的假設
- 做出一個能跑但超 scope 的版本
- 忽略 rollout、rollback、observability
- 把「看起來合理」當成「已經完成」

所以我現在的感覺很直接：

**你越想讓 agent autonomous，你越要先把 success criteria 寫清楚。**

授權越大，完成標準越不能模糊。

## 我現在會用一個很簡單的標準檢查 ticket 是否夠 ready

如果一張 ticket 沒辦法明確回答下面這些問題，那通常就還不夠 ready：

- 功能怎樣算成功
- 什麼情況算失敗
- 哪些檔案能改，哪些不能改
- 要過哪些 quality gates
- 上線怎麼控風險
- reviewer 要看什麼證據

這些問題如果沒有先回答，最後通常不會消失，只會延後到 PR、review、staging，甚至 production 才一起爆出來。

## 結語

AI 不會自動讓開發流程變嚴謹。

它比較像是一個放大器，你流程裡本來模糊的地方，它會更快放大出來。

所以如果你真的想把 AI 用進開發流程，我會很建議不要只優化 prompt，而是先優化 **done definition**。

最簡單的起點，就是在每張 ticket、每個 workflow、每次 agent 任務前，放一個 Success Criteria Block。

這件事很小，但我覺得會大幅降低那種「看起來做完了，其實還沒真的做完」的成本。
