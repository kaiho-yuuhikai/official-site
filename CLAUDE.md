# CLAUDE.md - Claude Code プロジェクト設定

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
npm run dev              # 開発サーバー起動
npm run build            # ビルド
npm run generate         # 静的サイト生成（GitHub Pages用）
npm run preview          # 静的生成結果のプレビュー
npm test                 # vitest 単体テスト (secret scanner 等)
npm run test:e2e         # E2Eテスト実行（Playwright）
npm run scan:secrets     # 全 tracked ファイルの秘匿情報検査
npm run hooks:install    # pre-commit フックを導入（初回のみ）
```

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

## セキュリティ (重要)

本リポジトリは **public**。秘匿情報（API トークン・秘密鍵・個人情報）を絶対に commit しないこと。
詳細は `docs/security/secret-handling.md` を参照。

- 初回セットアップ時に `npm run hooks:install` で pre-commit フックを導入
- LINE WORKS / GAS の認証情報は **Script Properties** で管理しコードにハードコードしない
- GitHub Actions で使うトークンは **Repository Secrets** に登録
- CI (`.github/workflows/secret-scan.yml`) が PR / push 時に自動検査
