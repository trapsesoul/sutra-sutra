---
title: "什麼是 BFF？前端專屬的 API 編排層"
description: "用前端工程師容易理解的方式，說明 BFF 的角色、職責，以及有沒有 BFF 的差別。"
pubDate: 2026-04-30
tags: ["architecture", "bff", "frontend", "microservices", "api"]
---

最近在跟團隊討論 BFF（Backend For Frontend）時，我覺得有一個說法很適合前端工程師理解：

**BFF 是前端專屬的 API 編排層。**

它介於前端與後端服務之間，目的不是取代後端微服務，而是幫前端把多個後端微服務或第三方服務的資料整合起來，轉成前端畫面可以直接使用的格式。

換句話說，前端不需要知道後面到底有幾個 service，也不需要自己把一堆 API response 組成畫面需要的資料。

這件事交給 BFF 處理。

## 沒有 BFF 時

沒有 BFF 時，前端可能需要自己呼叫多個 API：

```text
Frontend
  ├─ user-service
  ├─ wallet-service
  ├─ order-service
  ├─ notification-service
  └─ third-party API
```

這會讓前端承擔很多複雜度。

例如一個首頁畫面，可能需要：

- 使用者資料
- 錢包餘額
- 最近訂單
- 未讀通知
- 活動卡片
- 第三方推薦資料

如果沒有 BFF，前端就要自己決定：

- 要打哪些 API
- API 呼叫順序是什麼
- 哪些可以 parallel，哪些有 dependency
- 某個 API 失敗時畫面要怎麼 fallback
- 多個 response 要怎麼組成 UI model
- loading / error / empty state 要怎麼協調

久了之後，前端很容易變成另一個 orchestration layer。

而且前端會越來越知道後端的 service topology：有哪些 service、哪些欄位從哪裡來、哪些服務彼此有依賴。

這通常不是好事。

## 有 BFF 時

有 BFF 時，前端只需要呼叫 BFF 提供的 API：

```text
Frontend
  ↓
BFF
  ├─ user-service
  ├─ wallet-service
  ├─ order-service
  ├─ notification-service
  └─ third-party API
```

例如前端只打一支：

```text
GET /home
```

BFF 內部負責呼叫多個後端服務與第三方 API，最後回傳前端需要的資料：

```json
{
  "userName": "Alan",
  "walletBalance": 1200,
  "recentOrders": [],
  "notifications": [],
  "campaignCards": []
}
```

這樣前端不用知道背後實際呼叫了哪些 service，也不用自己組資料。

前端只需要關心：

**這個畫面需要什麼資料，BFF 就回傳什麼 shape。**

## BFF 的主要職責

以 `frontend-bff` 這種 repo 來說，常見職責會包含：

- 提供 Web / App 好用的前端專屬 API
- 整合多個後端微服務資料
- 需要時呼叫第三方 API
- 把後端 domain data 轉成前端 UI 可直接使用的 response shape
- 集中處理靠近前端的 auth / session / permission 檢查
- 統一處理跨服務錯誤 mapping 與 fallback
- 減少前端 API 複雜度與 round trips
- 隔離前端與後端微服務拓樸，避免前端知道太多後端細節

所以 BFF 不只是單純的 proxy，也不只是 API Gateway。

API Gateway 比較偏 routing、auth、rate limit、logging。

BFF 則更貼近前端體驗，重點在於：

**編排服務、聚合資料、轉換格式，然後回傳前端好用的 response。**

## 為什麼不要讓前端直接接所有後端服務？

因為這會讓前端被迫理解太多後端細節。

短期看起來只是多打幾支 API，但長期會出現幾個問題：

- 畫面邏輯跟後端 service 拆分綁太深
- 後端服務調整欄位時，前端容易被影響
- 多個頁面重複寫類似的資料組裝邏輯
- error handling 分散在不同前端頁面裡
- mobile / web 對資料需求不同時，前端分支越來越多
- 第三方 API 的不穩定性直接外溢到前端

BFF 的價值就是把這些複雜度收斂在一層。

前端看到的是穩定、貼近畫面的 API。

後端服務則可以維持自己的 domain boundary，不需要為每一個 UI 畫面調整核心 API。

## BFF 一定要分成 Web BFF、Mobile BFF 嗎？

不一定。

BFF 不是照 client 數量拆，而是照「需求差異與變更節奏」拆。

如果 Web 和 App 的需求很接近，可以先共用一個 `frontend-bff`。

例如：

```text
Web App
Mobile App
   ↓
frontend-bff
   ↓
Backend Services
```

等到 Web 和 Mobile 的資料需求、release 節奏、auth/session 模型差異真的變大，再考慮拆成：

```text
Web App → web-bff
Mobile App → mobile-bff
```

不要為了套 pattern 一開始就拆太細。

比較務實的做法是：

**初期先用一個 frontend-bff，等需求真的互相拖累時再拆。**

## 怎麼跟前端工程師解釋 BFF？

我會這樣說：

> BFF sits between the frontend and backend services. It orchestrates calls to multiple microservices or third-party APIs, then returns a frontend-friendly response shape.

中文就是：

> BFF 介於前端和後端服務之間，負責編排多個微服務或第三方 API 的呼叫，最後回傳前端好用的資料格式。

更口語一點：

> 前端不要自己組後端資料。你跟 BFF 要「這個頁面需要的資料」，BFF 幫你去各個 service 拿、組好、轉好，再一次回給你。

## 一句話總結

**BFF 是前端專屬的 API 編排層，負責整合後端微服務與第三方服務，並處理 auth、資料聚合、格式轉換與錯誤 mapping，最後回傳前端可直接使用的資料。**
