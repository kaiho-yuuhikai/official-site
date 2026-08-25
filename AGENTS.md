# AGENTS.md - Codex (OpenAI) プロジェクト設定

## プロジェクト概要

開邦高校同窓会「雄飛会」公式サイト。Nuxt 3 + Tailwind CSS で構築された静的サイト（SPA）。
GitHub Pages にデプロイされる（baseURL: `/official-site/`）。

## 技術スタック

- **フレームワーク**: Nuxt 3 (Vue 3, TypeScript)
- **スタイリング**: Tailwind CSS + `@tailwindcss/typography`
- **フォント**: Noto Sans JP
- **ホスティング**: GitHub Pages（静的生成、SSR無効）
- **CI/CD**: GitHub Actions（`.github/workflows/deploy.yml`）
- **データ**: note.com RSS → JSON（`public/data/note-articles.json`、日次自動更新）
- **E2Eテスト**: Playwright（`e2e/site.spec.ts`）

## ディレクトリ構成

```
pages/          # ルーティング（Nuxt ファイルベースルーティング）
layouts/        # レイアウト（default.vue）
composables/    # Vue Composables（useCmsData.ts）
assets/css/     # グローバルCSS（main.css）
public/         # 静的ファイル（画像、JSONデータ）
scripts/        # ビルドスクリプト（fetch-note-rss.mjs）
e2e/            # E2Eテスト（Playwright）
docs/           # ドキュメント
```

## よく使うコマンド

```bash
npm run dev       # 開発サーバー起動
npm run build     # ビルド
npm run generate  # 静的サイト生成（GitHub Pages用）
npm run preview   # 静的生成結果のプレビュー
npm test          # E2Eテスト実行（Playwright）
```

> **プレビューが 404 になったら**（第1回で複数名に発生）
> ビルドキャッシュを引きずっているだけなので、`Control + C` で止めて `npm run dev:clean` を実行する。
> `.nuxt` / `.output` / `node_modules/.vite` を捨てて立て直す。何度実行しても壊れない。
>
> **プレビューURLにリポジトリ名を付けないこと。**
> `app.baseURL` は `/` なので、正しいURLは `http://localhost:3000/activities/special-lecture`。
> `http://localhost:3000/official-site/...` は存在しない（開発時のみ自動で振り替わるが、
> 案内するURLは必ずリポジトリ名なしにする）。
>
> **変更を元に戻す**: `git restore .`（未公開の変更を破棄）。公開済みの取り消しは人に確認する。

## テスト

コード変更後は必ず Playwright テストを実行し、全テスト通過を確認すること。
テスト未通過のコードはコミット・プッシュしないこと。

```bash
npx playwright test --grep-invert "静的ビルド"   # 画面テストのみ（高速）
npx playwright test                              # 全テスト（ビルド含む）
```

変更内容に応じて `e2e/site.spec.ts` のテストも追加・更新すること。

## コーディング規約

- 言語: 日本語（HTMLの `lang="ja"`、コメントも日本語可）
- Vue SFC: `<script setup lang="ts">` を使用
- スタイル: Tailwind CSS ユーティリティクラスを優先、カスタムCSSは `assets/css/main.css` に
- カラーパレット: `kaiho-green`, `kaiho-cream`, `kaiho-gold` 等のカスタムカラーを使用（`tailwind.config.ts` 参照）
- コンポーネント: `components/` 配下に配置（Nuxt auto-import）

## デプロイ

- `main` ブランチへの push で自動デプロイ
- 日次スケジュール（JST 9:00）で note RSS 更新 + 再デプロイ
- 手動実行も可能（workflow_dispatch）

## 注意事項

- `nuxt.config.ts` の `baseURL` は `/official-site/` に設定済み。変更しないこと
- SSR は無効（`ssr: false`）。サーバーサイドレンダリングは使用しない
- Nitro プリセットは `github-pages`
- `public/data/note-articles.json` は CI/CD で自動更新される。手動編集しないこと
