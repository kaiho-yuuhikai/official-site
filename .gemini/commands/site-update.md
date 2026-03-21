# サイト更新ワークフロー

ビジネスユーザーの自然言語による要件をもとに、開邦雄飛会公式サイトを更新します。

## 手順

### Step 1: 要件の理解

ユーザーの要件: $ARGUMENTS

要件を分析し、以下を特定してください:
- 変更対象のページ・セクション
- 変更内容（テキスト、画像、レイアウト、色、リンクなど）
- 影響範囲

### Step 2: 現状の確認

変更対象のファイルを読み込み、現在の内容を確認してください。
主要なファイル構成:

| 変更内容 | 対象ファイル |
|:---|:---|
| トップページ（ヒーロー、統計、CTA） | `pages/index.vue` |
| ナビゲーション・フッター | `layouts/default.vue` |
| 理念・沿革・会則 | `pages/about.vue` |
| お問い合わせ | `pages/contact.vue` |
| 役員一覧 | `pages/officers.vue` |
| ニュース一覧 | `pages/news/index.vue` |
| プライバシーポリシー | `pages/privacy.vue` |
| 動的データ（ニュース、人物、メンター等） | `public/data/cms-data.json` |
| カラー・フォント・アニメーション | `assets/css/main.css` |
| Tailwindカスタムカラー | `tailwind.config.ts` |

### Step 3: コードの修正

要件に基づいてファイルを修正してください。

修正時のルール:
- Vue SFC は `<script setup lang="ts">` を使用
- スタイリングは Tailwind CSS ユーティリティクラスを優先
- カスタムカラーは `kaiho-green`, `kaiho-cream`, `kaiho-gold` 等を使用
- 日本語コンテンツは正確に反映すること
- レスポンシブデザイン（モバイル対応）を維持すること
- 既存のデザインシステム（ボタンスタイル、セクション区切り等）を踏襲すること

### Step 4: ローカルプレビュー

修正完了後、開発サーバーを起動してユーザーに確認を促してください。

```bash
npm run dev
```

ユーザーに以下を案内:
- ブラウザで http://localhost:3000/official-site/ を開いて確認してください
- 修正内容に問題がなければ「OK」と入力してください
- 修正が必要な場合は具体的に指示してください

### Step 5: ユーザー確認

ユーザーの確認結果に応じて:
- **OK の場合**: 「`/site-publish` で本番反映できます」と案内
- **修正指示がある場合**: Step 3 に戻って再修正

## 注意事項

- `nuxt.config.ts` の `baseURL: '/official-site/'` は変更しないこと
- `public/data/note-articles.json` は CI/CD で自動更新されるため手動編集しないこと
- 画像を追加する場合は `public/images/` に配置すること
