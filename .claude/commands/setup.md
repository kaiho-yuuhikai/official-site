# 開発環境セットアップ (一発)

このプロジェクトの開発環境を一括セットアップします。
ビジネスユーザーが何も覚えずに `/setup` 1 回で完了するよう設計されています。

## やること

1. OS 判定 (macOS / Linux / Windows)
2. 必要ツールのインストール:
   - Node.js (v20+) / npm
   - Git / GitHub CLI (`gh`)
   - Homebrew (macOS) / winget (Windows)
   - **clasp** (Google Apps Script CLI、雄飛会必須)
3. プロジェクト依存パッケージ (`npm install`)
4. pre-commit secret-scan フック導入 (`npm run hooks:install`)
5. GitHub 認証確認 (`gh auth status`)
6. clasp 認証ガイド (ブラウザを開く)

## 手順

### Step 1: OS 判定 + 一括スクリプト実行

ユーザー OS に応じて以下のいずれかを実行:

#### macOS / Linux

```bash
bash scripts/setup.sh
```

→ Homebrew + Node + gh + Claude Code + Gemini CLI + Codex CLI を入れる。
続けて clasp もインストール:

```bash
npm install -g @google/clasp
```

#### Windows (PowerShell)

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\scripts\setup.ps1
npm install -g @google/clasp
```

### Step 2: プロジェクト依存

```bash
npm install
npm run hooks:install
```

### Step 3: GitHub 認証

```bash
gh auth status 2>&1 | grep "Logged in" | head -3 || gh auth login
```

未認証なら `gh auth login` をユーザーに案内 (ブラウザが開く)。

### Step 4: clasp 認証

```bash
clasp login --status 2>&1 | head -3 || clasp login
```

ブラウザが開くので **GAS プロジェクトを所有する開発者ドメインのアカウント** でログイン。
雄飛会アカウント (`office@kaiho-yuhikai.com`) ではログインしない (cross-domain redeploy 不能になる)。

### Step 5: 完了レポート

```
🎉 環境セットアップ完了

  ✅ Node.js / npm
  ✅ Git / GitHub CLI (認証済)
  ✅ Claude Code
  ✅ clasp (開発者アカウントでログイン済)
  ✅ プロジェクト依存パッケージ
  ✅ pre-commit secret-scan フック

これで使える skill:
  /system-tour          既存システムを画面で見る
  /site-update          サイトを変更する
  /feature-implement N  機能を実装する
  /lineworks-deploy     LINE WORKS Bot を稼働する

困ったら /setup-check で再診断。
```

## オプション: gws / gog も入れたい場合

雄飛会の最小運用には不要ですが、Sheet / Form / Drive を直接 API で叩きたい開発者向け:

```
/setup-google-clis
```

を別途実行。GCP プロジェクトでの OAuth クライアント手動作成が必要なため、本 skill には含めない。

## トラブルシューティング

| 症状 | 対処 |
|---|---|
| `gh auth status` で未認証 | `gh auth login` を実行 (ブラウザで承認) |
| `clasp login` で「Access blocked」 | OAuth アプリがテストモード → 自分をテストユーザーに追加 |
| `npm install` が遅い | プロキシ設定 / DNS / `npm config get registry` を確認 |
| Windows で `setup.ps1` が止まる | `Set-ExecutionPolicy` のスコープ設定が必要 |

## 注意事項

- **対話的 OAuth は手動承認が必要**: ブラウザが開いたらユーザーが手動でログインする
- **clasp は雄飛会の必須ツール**: GAS の push / deploy に使う
- **gws / gog はオプション**: 必要になったら `/setup-google-clis` で別途
