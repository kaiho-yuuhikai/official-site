# 秘匿情報の取扱いガイド

開邦雄飛会公式サイトは **public GitHub リポジトリ** です。
push されたコード・コミット履歴は誰でも閲覧でき、削除しても旧 commit は世界中の clone に残ります。
そのため、秘匿情報の取扱いは以下のルールに厳格に従ってください。

## 1. 絶対に commit してはいけないもの

| カテゴリ | 例 |
|---|---|
| 秘密鍵 | `*.pem` / `*.key` / `id_rsa` / SSH/OpenSSH 秘密鍵 |
| 認証情報 JSON | GCP Service Account / Firebase Admin SDK / OAuth client_secret |
| API トークン | GitHub PAT (`ghp_…`) / Google API Key (`AIza…`) / AWS Access Key (`AKIA…`) / Slack Token (`xoxb-…`) |
| LINE WORKS | Client Secret / Private Key (PEM) / Bot Secret / channelId（運用上の準秘匿） |
| JWT | アクセストークン全体 (`eyJ…`) |
| URL に埋め込まれた認証 | `https://user:pass@…` <!-- allow-secret:url-credentials --> |
| 個人情報 | 同窓生の個人メールアドレス・電話番号・住所 |
| 内部資料 PDF / Office | 会計決算・収支報告・内部議事資料など。配信用 PDF は `public/files/` に、参考資料は `docs/` に置く（リポ root は禁止） |

`.gitignore` で代表的なファイル名は除外していますが、最終的な責任は commit する人にあります。

## 2. 秘匿情報の保管場所

| 種類 | 保管場所 |
|---|---|
| LINE WORKS 認証情報 (6 点) | Google Apps Script の **Script Properties** (リポジトリ外) |
| GitHub Actions で使うトークン | GitHub Repository **Secrets** (Settings → Secrets and variables → Actions) |
| 開発者ローカルで使う一時値 | `.env.local` 等の gitignored ファイル / 1Password 等のパスワードマネージャ |
| 共有が必要な認証情報 | 1Password / 雄飛会の安全な共有場所（管理者: 上間さん） |

## 3. ハーネス (自動検査)

### 3-1. ローカル pre-commit フック

初回セットアップ:

```bash
npm run hooks:install
```

これで `.git/hooks/pre-commit` がインストールされ、`git commit` 実行時に `scripts/check-secrets.mjs` が staged ファイルを走査します。違反があると commit は中断されます。

### 3-2. CI による検査

`.github/workflows/secret-scan.yml` が以下のタイミングで自動実行されます:

- main ブランチへの push
- PR の作成 / 更新
- `workflow_dispatch` での手動実行

失敗するとマージできません (GitHub Branch Protection を併用すれば強制可)。

### 3-3. 検出対象パターン

`scripts/check-secrets.mjs` の `DETECTORS` 配列を参照してください。

| ID | カテゴリ | 重大度 |
|---|---|---|
| `pem-private-key` | PEM 形式の秘密鍵 | critical |
| `gcp-service-account` | GCP Service Account JSON | critical |
| `google-api-key` | Google API Key (`AIza…`) | high |
| `github-pat` | GitHub Personal Access Token | critical |
| `aws-access-key` | AWS Access Key ID | critical |
| `slack-token` | Slack Token | critical |
| `jwt` | JWT (3 セグメント) | high |
| `url-credentials` | URL 埋め込み認証 | high |
| `jp-mobile-phone` | 日本の携帯電話番号 | medium |
| `personal-email` | 個人メアド（運営ドメイン以外） | medium |
| `binary-doc-misplaced` | PDF / Office 文書 (.pdf .docx .xlsx .pptx .doc .xls .ppt) が `public/files/` または `docs/` 以外に置かれている | high |

## 4. 検出時の対処フロー

### 4-1. 誤検出だった場合

スキャナにヒットしたが実害がないケース:

- 該当行末にコメントで抑制マーカーを付けます

```js
const x = "AIzaSyXXXXXXX..." // allow-secret:google-api-key
```

```sh
TOKEN=ghp_abc...  # allow-secret:github-pat
```

```md
担当: user@somewhere.example <!-- allow-secret:personal-email -->
```

- ファイル丸ごと除外したい場合は `.secretscanignore` に glob を追加

### 4-2. **実際に秘匿情報を commit してしまった場合 (緊急)**

> ⚠️ public リポジトリでは「履歴から消す」だけでは不十分。**トークンは必ず無効化する。**

1. **即座に該当トークン / 鍵をローテーション** (発行元で revoke / regenerate)
   - GitHub PAT → Settings → Developer settings → Personal access tokens → Revoke
   - Google API Key → Cloud Console → Credentials → Delete
   - LINE WORKS Client Secret → Developer Console → Re-issue
   - GCP Service Account → Cloud Console → IAM → Delete key
2. ファイルから値を削除して新規 commit
3. (任意) 履歴 rewrite は被害拡大の可能性があるため、上記 1. のローテーションを優先。`git filter-repo` 等で実施する場合は事前に他メンバーに連絡

### 4-3. 個人情報 (メアド・電話) を誤って書いてしまった場合

- 該当行を修正して別の表現に置き換える (例: 「担当: 上間さん」「office@kaiho-yuhikai.com」)
- 既にマージ済みの場合は当事者に連絡し、必要に応じて履歴 rewrite を検討

## 5. 開発時の心構え

- ローカルで動作確認するときも、秘匿情報をスクリプトに**ハードコードしない**。`process.env.X` 経由で読む。
- LINE WORKS / GAS の認証情報は `PropertiesService.getScriptProperties()` 経由でのみ取得し、ログにフル値を出さない (`Logger.log(token)` も NG)。
- スクリーンショット / 動画を撮るときは画面に映ったトークンを必ずモザイク。
- AI コーディング支援 (Claude Code / Copilot 等) に**生のトークンを貼り付けない**。プレースホルダで質問する。

## 6. 関連ファイル

- `scripts/check-secrets.mjs` — シークレットスキャナ本体
- `scripts/git-hooks/pre-commit` — pre-commit フック
- `scripts/install-git-hooks.mjs` — フック導入スクリプト
- `tests/check-secrets.test.mjs` — スキャナのテスト (vitest)
- `.github/workflows/secret-scan.yml` — CI 設定
- `.gitignore` — 秘匿ファイルの除外設定
- `.secretscanignore` — 偽陽性のホワイトリスト
