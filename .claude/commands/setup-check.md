# 環境チェック

開発環境が正しくセットアップされているか確認します。

## 手順

以下のコマンドを実行して、全ツールの状態を確認してください:

```bash
echo "=== Node.js ===" && node --version 2>/dev/null || echo "❌ 未インストール"
echo "=== npm ===" && npm --version 2>/dev/null || echo "❌ 未インストール"
echo "=== GitHub CLI ===" && gh --version 2>/dev/null || echo "❌ 未インストール"
echo "=== gh 認証 ===" && gh auth status 2>&1 || echo "❌ 未認証"
echo "=== Claude Code ===" && claude --version 2>/dev/null || echo "❌ 未インストール"
echo "=== Gemini CLI ===" && gemini --version 2>/dev/null || echo "❌ 未インストール"
echo "=== Codex CLI ===" && codex --version 2>/dev/null || echo "❌ 未インストール"
echo "=== node_modules ===" && ([ -d node_modules ] && echo "✅ インストール済み" || echo "❌ npm install が必要")
echo "=== Git ===" && git status --short 2>/dev/null || echo "❌ Git リポジトリではありません"
```

結果を以下の形式で表示してください:

```
🔍 環境チェック結果
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Node.js        v22.x.x
✅ npm            10.x.x
✅ GitHub CLI     2.x.x
✅ GitHub 認証     ログイン済み
✅ Claude Code    2.x.x
✅ Gemini CLI     0.x.x
✅ Codex CLI      0.x.x
✅ 依存パッケージ   インストール済み
✅ Git            クリーン / 変更あり
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

❌ がある場合は:
- 問題の内容を日本語で説明
- `/project:setup` を実行すれば自動で修正できることを案内
