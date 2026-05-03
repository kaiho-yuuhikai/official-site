# 開邦高校同窓会 雄飛会 | 公式サイト

沖縄県立開邦高等学校の同窓会「雄飛会」公式サイトです。AIエージェントを使って、誰でもかんたんにサイトを更新できます。

---

## はじめかた（セットアップ）

パソコンに特別なソフトが入っていなくても大丈夫です。下の1行をコピペするだけで、必要なものが全て自動でインストールされます。

### macOS の場合

「ターミナル」アプリを開いて（Spotlight で「ターミナル」と検索）、以下を貼り付けて Enter キーを押してください。

```bash
curl -fsSL https://raw.githubusercontent.com/kaiho-yuuhikai/official-site/main/scripts/bootstrap.sh | bash
```

### Windows の場合

「PowerShell」を開いて（スタートメニューで「PowerShell」と検索）、以下を貼り付けて Enter キーを押してください。

```powershell
irm https://raw.githubusercontent.com/kaiho-yuuhikai/official-site/main/scripts/bootstrap.ps1 | iex
```

### 実行するとこうなります

コピペして Enter を押すと、必要なソフトが自動でインストールされます。最後にお名前とメールアドレスを入力すれば完了です。

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  開邦雄飛会 公式サイト - 開発環境セットアップ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  [1/10] Homebrew ✓
  [2/10] Git ✓
  [3/10] Node.js v22.x.x ✓
  [4/10] GitHub CLI ✓
  [5/10] Claude Code ✓
  [6/10] Gemini CLI ✓
  [7/10] Codex CLI ✓
  [8/10] Installing dependencies...
  [9/10] Installing Playwright browser...
  [10/10] Git ユーザー設定...
  お名前（例: 山田太郎）: 上間祥子        ← 自分の名前を入力
  メールアドレス（例: taro@example.com）: uema@example.com  ← 自分のメールを入力
  ✓ Git ユーザーを設定しました: 上間祥子 <uema@example.com>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  セットアップ完了！
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### セットアップが終わったら

ターミナルで以下を入力して、AIエージェントを起動します。

```bash
cd ~/official-site
claude    # または gemini / codex
```

---

## サイトの更新方法

AIエージェントが起動したら、3つのコマンドだけでサイトを更新できます。

### ステップ 1: サイトを修正する

やりたいことを日本語で伝えるだけでOKです。

```
/site-update トップページのキャッチコピーを「未来をつくる同窓会」に変更して
```

### ステップ 2: ブラウザで確認する

```
/site-preview
```

ブラウザが開いて、変更後のサイトを確認できます。問題があればステップ1に戻って修正しましょう。

### ステップ 3: 公開サイトに反映する

```
/site-publish
```

これで本番サイトに反映されます。

### 実行イメージ

AIエージェント内での操作はこのような感じです。

```
$ claude

╭──────────────────────────────────────────────╮
│  Claude Code                                 │
│  /Users/uema/official-site                   │
╰──────────────────────────────────────────────╯

> /site-update お問い合わせページの電話番号を 098-XXX-XXXX に変更して

  最新の状態を確認しています...
  お問い合わせページを修正しています...
  テスト中... 11/11 通過 ✓

  修正が完了しました。
  ブラウザで http://localhost:3000/official-site/contact を開いて確認してください。
  問題なければ「OK」と入力してください。

> OK

  /site-publish で公開サイトに反映できます。

> /site-publish

  品質チェック中... 11/11 通過 ✓
  他のメンバーの変更を確認しています...
  公開サイトに反映しています...

  サイトの更新を開始しました（約2〜3分で反映されます）。
```

---

## コマンド一覧

| コマンド | 機能 | Claude Code での書き方 | Gemini / Codex での書き方 |
|:---|:---|:---|:---|
| セットアップ | 環境構築 | `/project:setup` | `/setup` |
| 環境チェック | 状態確認 | `/project:setup-check` | `/setup-check` |
| サイト更新 | コード修正 | `/project:site-update 要件` | `/site-update 要件` |
| プレビュー | ローカル確認 | `/project:site-preview` | `/site-preview` |
| 公開反映 | デプロイ | `/project:site-publish` | `/site-publish` |

---

## デプロイについて

`main` ブランチへの push で GitHub Pages に自動デプロイされます。`/site-publish` を実行すれば自動的に反映されるので、特別な操作は不要です。

## ライセンス

Private
