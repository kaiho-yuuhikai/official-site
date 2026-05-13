# Google CLI 三種セットアップ

雄飛会プロジェクトで Google サービスを操作するために 3 つの CLI を入れます。
インストールから初回 OAuth まで対話的に案内します。

## 3 つの CLI の使い分け

| CLI | 何のため | 推奨度 |
|---|---|---|
| **clasp** | GAS スクリプト (Apps Script) を push / deploy する公式 CLI | **必須** (寄付システムの GAS 更新に使う) |
| **gws** | Drive / Sheets / Gmail / Forms / Calendar など Workspace API 全般を 1 コマンドで操作 (Rust, Discovery API ベース) | **推奨** (drift 検知・データ取得・運用業務) |
| **gog** | Drive 監査・読み取り業務に強い CLI (Go) | 任意 (大量データ監査が必要なときのみ) |

## 手順

### Step 0: 現在の状態を確認

```bash
echo "=== clasp ===" && (clasp --version 2>/dev/null || echo "❌ 未インストール")
echo "=== gws ==="   && (gws --version 2>/dev/null   || echo "❌ 未インストール")
echo "=== gog ==="   && (gog --version 2>/dev/null   || echo "❌ 未インストール")
```

3 つの状態を表示。

### Step 1: 一括インストール (OS 別)

#### macOS / Linux

```bash
bash scripts/setup-google-clis.sh
```

#### Windows (PowerShell)

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\scripts\setup-google-clis.ps1
```

部分インストールしたい場合:
- `--skip-clasp` / `--skip-gws` / `--skip-gog` (bash 版)
- `-SkipClasp` / `-SkipGws` / `-SkipGog` (PowerShell 版)

### Step 2: clasp の初回認証

```bash
clasp login
```

ブラウザが開く → **開発者アカウント (dev ドメイン)** でログイン。
雄飛会アカウントでログインしないこと (cross-domain redeploy 不能になる)。

動作確認:
```bash
cd scripts/gas/donations
clasp status
```

### Step 3: gws の初回認証

```bash
# gcloud がインストールされている場合 (最も簡単)
gws auth setup

# gcloud がない場合は手動 OAuth 設定
# 1. Google Cloud Console (https://console.cloud.google.com/) でプロジェクト作成
# 2. OAuth クライアント (Desktop app) を作成
# 3. client_secret.json を ~/.config/gws/client_secret.json に配置
gws auth login -s drive,sheets,gmail,forms,script
```

⚠️ **OAuth アプリが External + Testing の場合**:
- ユーザー自身をテストユーザーに追加 (OAuth consent screen → Test users → Add)
- スコープは 25 個以内 (必要分だけ選ぶ)

動作確認:
```bash
gws drive files list --params '{"pageSize": 5}'
```

### Step 4: gog の初回認証 (任意)

`gog` を入れた場合のみ:

```bash
# Step 3 で作った client_secret.json を流用可能
gog auth credentials ~/.config/gws/client_secret.json
gog auth add you@gmail.com --services drive,sheets,gmail
```

動作確認:
```bash
gog drive tree --parent <folderId> --depth 2
```

### Step 5: ユーザーに結果報告

```
🎉 Google CLI 三種セットアップ完了

  ✅ clasp <version>   — 開発者アカウント (xxx@dev-domain.com) でログイン済
  ✅ gws <version>     — yyy@gmail.com で OAuth 認証済
  ✅ gog <version>     — (任意) yyy@gmail.com で OAuth 認証済

次にやれること:
  - /feature-implement <番号>            機能実装 (clasp 自動利用)
  - gws sheets values get ...            スプレッドシートを直接読む
  - gws forms responses list ...         フォーム回答を直接取る
  - clasp push                           GAS コード反映
```

## 雄飛会プロジェクトでの主な使い道

### clasp
- `scripts/gas/donations/` の GAS コードを push (LINE WORKS 通知 / 寄付集計)
- `clasp deploy` で新バージョン公開

### gws
- 寄付スプレッドシートの列ヘッダーを取得 → `/feature-implement` の schema drift 検知
  ```bash
  gws sheets spreadsheets values get \
    --params '{"spreadsheetId":"1Y5S1uw...","range":"donations!A1:K1"}'
  ```
- フォーム回答の確認
  ```bash
  gws forms responses list --params '{"formId":"<id>"}'
  ```
- Drive の共有設定 (秘匿性チェック)
  ```bash
  gws drive files get --params '{"fileId":"<id>","fields":"permissions,owners"}'
  ```

### gog
- Drive フォルダの監査
  ```bash
  gog drive audit sharing --parent <folderId> --internal-domain kaiho-yuhikai.com
  ```
- 寄付関連シートのバックアップ
  ```bash
  gog backup push --services drive,sheets
  ```

## 秘匿情報の取扱い

- `client_secret_*.json` / OAuth refresh token / `credentials.json` は **絶対にコミットしない** (`.gitignore` 済)
- `pre-commit` フック (`scripts/check-secrets.mjs`) が誤コミットを検知
- 認証情報の保管は OS keyring (macOS Keychain / Windows Credential Manager) を推奨

## トラブルシューティング

| 症状 | 対処 |
|---|---|
| `clasp login` で「Access blocked」 | OAuth アプリがテストモード → 自分をテストユーザーに追加 |
| `gws auth setup` で gcloud がないと言われる | gcloud をインストール or 手動 OAuth 設定で代替 |
| `gws drive files list` で `accessNotConfigured` | エラーメッセージの `enable_url` にアクセス → API 有効化 |
| `gog drive` で 401 | `gog auth doctor --check` で確認 → 必要なら `gog auth add` をやり直す |
| Windows で gog 動かない | Docker 経由 (`docker run --rm ghcr.io/openclaw/gogcli:latest`) を推奨 |

## 注意事項

- **Windows でも動作**: PowerShell 版スクリプト `scripts/setup-google-clis.ps1` を用意
- **必要分だけインストールでも OK**: 雄飛会の最小構成は `clasp` のみ (寄付システム GAS 更新だけなら)
- **OAuth スコープは必要最小限**: `drive,sheets,gmail,forms,script` をデフォルトとし、追加が必要になったら拡張
- **OAuth クライアントは共用可**: `gws` で作った client_secret.json を `gog` でも流用できる (同一 GCP プロジェクト)
