# Google CLI gws / gog のセットアップ (オプション)

雄飛会の **最小運用には不要** ですが、Drive / Sheets / Forms / Gmail などを直接 API で叩きたい開発者向けの追加 CLI セットアップです。

> 💡 **基本は `/setup` のみで OK**。本 skill は「Sheet 列ヘッダーを直接読みたい」「フォーム回答を一括ダウンロードしたい」等のニーズが出てから実行してください。

## 何が入るか

| CLI | 用途 | 認証の手間 |
|---|---|---|
| **gws** (Rust, 公式) | Drive / Sheets / Gmail / Forms / Calendar 全般 | 中 (GCP プロジェクトに OAuth クライアント作成が必要) |
| **gog** (Go, OSS) | Drive 監査・読み取り業務 | 中 |

clasp は `/setup` ですでに入っているのでここでは扱いません。

## 手順

### Step 1: 現在の状態

```bash
echo "=== gws ===" && (gws --version 2>/dev/null || echo "❌ 未インストール")
echo "=== gog ===" && (gog --version 2>/dev/null || echo "❌ 未インストール")
echo "=== gcloud ===" && (gcloud --version 2>/dev/null | head -1 || echo "❌ 未インストール (gws auth setup が遅くなる)")
```

### Step 2: インストール

#### macOS

```bash
brew install googleworkspace-cli  # gws
brew install gogcli                # gog
```

または npm 経由 (cross-platform):

```bash
npm install -g @googleworkspace/cli
```

#### Windows

```powershell
.\scripts\setup-google-clis.ps1 -SkipClasp  # clasp は /setup で済んでいる
```

### Step 3: gws 認証 — 2 パターン

#### パターン A: gcloud が入っていて、雄飛会専用 GCP プロジェクトがある場合

```bash
gcloud config set project <kaiho-yuuhikai 専用プロジェクト>
gws auth setup
```

→ ブラウザで OAuth 完了 → `gws drive files list --params '{"pageSize": 3}'` で動作確認。

#### パターン B: GCP プロジェクトを新規作成する場合 (10 分作業)

OAuth クライアントを手動で作る必要があります:

1. <https://console.cloud.google.com/> でプロジェクト「kaiho-yuuhikai-cli」を作成
2. **OAuth consent screen** を設定:
   - User Type: External (個人 Google) or Internal (Workspace)
   - App name: kaiho-yuuhikai-cli
   - Support email: 自分の Google アカウント
3. **OAuth client ID** を作成:
   - Application type: **Desktop app**
   - Name: gws-cli
4. 表示された `client_secret_xxx.json` を以下に保存:
   ```bash
   ~/.config/gws/client_secret.json
   ```
5. ブラウザで OAuth 完了:
   ```bash
   gws auth login -s drive,sheets,gmail,forms,script
   ```

⚠️ External + Testing モードの場合は自分をテストユーザーに追加 (consent screen → Test users → Add)

### Step 4: gog 認証 (任意)

gws と同じ `client_secret.json` を流用:

```bash
gog auth credentials ~/.config/gws/client_secret.json
gog auth add <your-email> --services drive,sheets,gmail
```

動作確認:

```bash
gog drive ls --max 3
```

### Step 5: 雄飛会プロジェクトでの主な使い道

```bash
# 寄付スプレッドシートの列ヘッダー取得 → schema drift 検知
gws sheets spreadsheets values get \
  --params '{"spreadsheetId":"1Y5S1uw...","range":"donations!A1:K1"}'

# フォーム回答を直接取得
gws forms responses list --params '{"formId":"<id>"}'

# Drive 共有設定の監査
gog drive audit sharing --parent <folderId> --internal-domain kaiho-yuhikai.com
```

## トラブルシューティング

| 症状 | 対処 |
|---|---|
| `gws auth setup` で「OAuth client creation requires manual setup」 | Step 3 パターン B の手動 OAuth クライアント作成へ |
| `gws auth login` で 401/403 | スコープが OAuth consent screen に登録されていない / 自分がテストユーザー未登録 |
| `gog auth doctor --check` で 401 | `gog auth add <email>` を再実行 |
| 既存 `~/.config/gws/client_secret.json` が壊れている | 削除して再ダウンロード or `gws auth setup` 再実行 |

## 注意事項

- **必要に応じてだけ**: 雄飛会の通常運用 (`/site-update` / `/feature-implement` / `/lineworks-deploy`) は `/setup` の clasp だけで完結
- **GCP プロジェクトは雄飛会専用に**: 他案件 (GScale 業務等) の GCP プロジェクトと混ざらないように
- **client_secret.json は絶対にコミットしない**: `.gitignore` 済 / pre-commit hook が検知
