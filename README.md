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
