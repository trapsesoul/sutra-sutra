# blog-live-example

最小可用的 GitHub Pages 範例（可直接給 OpenClaw 維護）。

## 快速上線

1. 建 repo（建議 `public`，Pages 最穩定）
2. 把此資料夾內容 push 到 repo `main`
3. GitHub → Settings → Pages → Source: **GitHub Actions**
4. 等 workflow `Deploy static site to Pages` 跑完
5. 站點會出現在：`https://<your-user>.github.io/<repo-name>/`

## 結構

- `index.html`：首頁
- `.github/workflows/pages.yml`：自動部署

## 下一步

- 改成 Astro/Hugo（保留同樣部署流程）
- 加文章清單與 RSS
