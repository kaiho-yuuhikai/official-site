# 雄飛会公式サイト 開発・運用ハンドブック (スキトラ用)

このドキュメントは、開邦雄飛会公式サイトの **開発・運用を引き継ぐビジネスチームメンバー (上間さん)** に向けた手順書です。
フォーム改修・データ取得・HP 反映までの全フローを 1 人で回せることを目指します。

**作成**: 2026-05-13 / 神谷 → 上間さんスキトラ会用

---

## 0. このシステムでできること

| やりたいこと | 仕組み |
|---|---|
| 寄付の申し出をフォームで受ける | Google フォーム |
| 入金確認をスプレッドシートで管理 | Google スプレッドシート |
| HP に「累計寄付額」「寄付者一覧」を表示 | GAS + GitHub Actions + GitHub Pages |
| フォーム送信時に運営トークルームに通知 | GAS + LINE WORKS Bot (Issue #20, PR #22) |

> 💡 すべて **無料枠** で運用しています。月額コスト ¥0。

---

## 1. 全体像 (アーキテクチャ)

```
   👤 寄付者
     │
     │ 1. フォーム送信
     ▼
┌─────────────────┐
│  Google フォーム   │  ← 上間さんが項目を編集
│  (雄飛会アカウント)│
└────────┬────────┘
         │ 2. 自動連携
         ▼
┌─────────────────┐
│ スプレッドシート   │  ← 屋良さん/上間さんが「確認済」を入力
│  (雄飛会アカウント)│
└────────┬────────┘
         │ 3. JSON 配信 (毎日朝9時)
         ▼
┌─────────────────┐
│  Apps Script (GAS) │  ← 神谷が clasp で更新
│  (開発者アカウント)│
└────────┬────────┘
         │ 4. JSON 取得 + コミット
         ▼
┌─────────────────┐
│ GitHub Actions     │  ← 毎日 09:00 JST 自動実行
└────────┬────────┘
         │ 5. デプロイ
         ▼
┌─────────────────┐
│ GitHub Pages       │  ← https://kaiho-yuuhikai.jp/
│ (HP 公開)          │
└─────────────────┘
```

## 2. 各構成要素の説明

### 2.1 Google フォーム

- **誰の物**: 雄飛会アカウント (`office@kaiho-yuhikai.com`)
- **誰が触る**: 上間さん (項目編集)
- **触り方**: ブラウザでフォームを開いて編集
- **注意**: 列順を変更すると HP の集計がずれる可能性 (神谷に連絡)

**やりがちなこと**:
- 「寄付金額」の選択肢を「10,000 円 / その他」に増やした
- → 神谷に伝えて GAS の `COL_*` 定数を更新してもらう

### 2.2 Google スプレッドシート (Sheet)

- **誰の物**: 雄飛会アカウント
- **誰が触る**: 上間さん / 屋良さん (承認列の入力)
- **触り方**: ブラウザで Sheet を開く
- **構造**:

| 列 | 内容 | 編集 |
|---|---|---|
| A | タイムスタンプ | フォーム自動 |
| B | メールアドレス | フォーム自動 |
| C | お名前 | フォーム自動 |
| D | 入学期 | フォーム自動 |
| E | 寄付先基金 | フォーム自動 |
| F | 寄付口数 | フォーム自動 |
| G | メッセージ | フォーム自動 |
| H | HP掲載可否 | フォーム自動 |
| **I** | **振込確認ステータス** | **手動** (未確認 / 確認済 / キャンセル) |
| **J** | **確認日** | **手動** (yyyy-mm-dd) |
| **K** | **確認者** | **手動** |

**業務フロー**:
1. 寄付申込みがフォームから入る → 自動で行追加 + LINE WORKS 通知
2. 申込者から指定口座に振込がある (会計確認)
3. 屋良さんが I 列を「確認済」に変更、J/K に確認日・確認者を入力
4. 翌朝 09:00 の GitHub Actions で HP に反映 (約 5 分後にサイト表示更新)

### 2.3 Apps Script (GAS)

- **誰の物**: **開発者アカウント** (神谷の dev ドメイン) ← 重要
- **誰が触る**: 神谷 (将来は上間さんも触れる)
- **触り方**: ブラウザで Apps Script エディタを開く
- **役割**:
  - スプレッドシートのデータを集計して JSON で返す (`doGet`)
  - フォーム送信時に LINE WORKS Bot で通知 (`onFormSubmit`)
  - 認証情報は **Script Properties** に保管 (コードには書かない)

**なぜ別アカウント?**
- 雄飛会アカウントで作ると、開発者から「再デプロイ」できなくなる (Workspace ポリシー)
- Sheet は雄飛会、GAS は開発者 — の役割分担が正解

### 2.4 GitHub Actions

- **役割**: 毎日 09:00 JST に自動実行 (cron)
  1. note.com の RSS を取得
  2. Threads の最新投稿を取得
  3. Apps Script から寄付集計 JSON を取得
  4. データ更新があれば commit + push
  5. サイトをビルドして GitHub Pages にデプロイ
- **手動実行**: GitHub の Actions タブから「Run workflow」で即時起動可能
- **失敗時**: 神谷宛にメール通知 (今後セットアップ予定)

### 2.5 GitHub Pages

- **公開URL**: <https://kaiho-yuuhikai.jp/>
- **ソース**: `kaiho-yuuhikai/official-site` リポジトリの main ブランチ
- **更新タイミング**: main にコミットが入ると数分で反映

---

## 3. 日常運用フロー

### A. 寄付申込みが来たとき (自動)

```
寄付者がフォーム送信
   ↓
Sheet に行追加 (自動)
   ↓
運営トークルームに LINE WORKS 通知 (自動)
   ↓
[受信] 屋良さん / 上間さんが内容確認
```

### B. 入金確認したとき (手動)

```
振込確認後、Sheet を開く
   ↓
該当行の I 列「振込確認ステータス」プルダウンから「確認済」を選択
   ↓
J 列「確認日」に日付を入力 (yyyy-mm-dd)
   ↓
K 列「確認者」に名前を入力
   ↓
翌朝 09:00 に HP 反映
```

### C. 急いで HP に反映したいとき

GitHub Actions タブで `Deploy to GitHub Pages` ワークフローを「Run workflow」で手動実行。
神谷に連絡してもらう (上間さんの GitHub アカウントに権限が付与されてからは自分で実行可)。

---

## 4. 開発フロー — Claude Code を使った新機能追加

### 4.1 Issue を立てる

1. <https://github.com/kaiho-yuuhikai/official-site/issues/new> を開く
2. 困りごと / やりたいことを書く
   - 例: 「フォームに『紹介者』項目を追加して、HP の寄付者一覧にも表示したい」
3. 「Submit」

### 4.2 Claude Code に依頼する

ターミナルで:
```bash
cd ~/kaiho-yuuhikai-official-site
claude

# 例:
> Issue #25 を実装してください
```

Claude Code が:
- 仕様を理解
- TDD で実装 (テストを先に書く → 実装)
- PR を作成
- CI を確認

### 4.3 PR レビューしてマージ

1. Claude Code が PR を作成すると GitHub からメール通知
2. PR を開いて変更内容を確認 (Files changed タブ)
3. 問題なければ「Merge pull request」ボタン
4. 自動でデプロイされる

### 4.4 困ったとき

- Claude Code に「ここで詰まった、どうすれば?」と聞く
- Issue にコメントを残す (神谷も後から見られる)
- 神谷に Slack / LINE WORKS で連絡

---

## 5. よくあるトラブルと対処

### 5.1 HP に反映されない

| 確認すること | やり方 |
|---|---|
| Sheet の I 列が「確認済」になっているか | Sheet を開く |
| GitHub Actions が動いたか | Actions タブ > 直近の run を確認 |
| ブラウザキャッシュを更新 | Ctrl+Shift+R (Mac は Cmd+Shift+R) |
| データ JSON が更新されたか | `public/data/donations.json` の `fetchedAt` を見る |

### 5.2 LINE WORKS 通知が来ない

| 確認すること | やり方 |
|---|---|
| Bot がトークルームに招待されているか | LINE WORKS 上で確認 |
| Apps Script の `testNotify()` を実行 | エラー内容で原因切り分け |
| Script Properties が全て入っているか | `showProperties()` を実行 |

### 5.3 フォームを直したい

1. ブラウザで Google フォームを開いて編集
2. 列が増減した場合は **必ず神谷に連絡** (GAS の集計コードがずれる可能性)
3. 列増減なし (項目テキスト変更のみ) なら影響なし

### 5.4 秘密情報を誤って GitHub にコミットしてしまった

⚠️ 緊急対応 (`docs/security/secret-handling.md` 参照):

1. **即座に該当トークン / 鍵を発行元で無効化** (これが最優先)
2. 神谷に連絡
3. ファイルから値を削除して新規 commit

スキャナ (PR #21) が pre-commit で検査しているため、通常は防げます。

---

## 6. 用語集

| 用語 | 意味 |
|---|---|
| **GAS** | Google Apps Script の略。Google のサービス間連携を書ける JavaScript 環境 |
| **doGet** | GAS の関数。HTTP GET リクエストを受けて JSON 等を返すエンドポイント |
| **トリガー** | GAS の自動実行設定。フォーム送信時 / 時間指定 等 |
| **clasp** | GAS をローカルから push できる CLI ツール |
| **Script Properties** | GAS のキー・バリュー保管庫。トークン等の機密情報を入れる |
| **GitHub Actions** | GitHub のリポジトリで定時実行 / CI/CD を行う仕組み |
| **GitHub Pages** | GitHub の無料静的サイトホスティング |
| **PR** | Pull Request の略。コード変更の提案 |
| **CI** | Continuous Integration の略。自動テスト・チェック |
| **Issue** | GitHub の課題管理。バグ・機能要望を書く |
| **secret scan** | 秘密情報の誤コミットを検出する仕組み |

---

## 7. 参考リンク

| カテゴリ | リンク |
|---|---|
| 雄飛会リポジトリ | <https://github.com/kaiho-yuuhikai/official-site> |
| 雄飛会 HP | <https://kaiho-yuuhikai.jp/> |
| 開発計画 | `docs/donation-system-implementation-plan.md` |
| 寄付承認手順 | `docs/operations/donation-confirmation.md` |
| LINE WORKS 連携 | `docs/operations/line-works-notification-setup.md` |
| セキュリティ | `docs/security/secret-handling.md` |
| LINE WORKS Developers | <https://developers.worksmobile.com/jp/docs/> |
| GAS リファレンス | <https://developers.google.com/apps-script/reference> |
| GitHub Pages | <https://pages.github.com/> |

---

## 8. スキトラデモのチェックリスト (今日の会で確認)

- [ ] Google フォームを開いて項目を見る
- [ ] スプレッドシートを開いて承認列のプルダウンを操作してみる
- [ ] GitHub の Actions タブで日次 run の履歴を見る
- [ ] GitHub Pages の HP を開いて「寄付者一覧」セクションを確認
- [ ] LINE WORKS の運営トークルームで Bot 通知を確認
- [ ] Apps Script エディタを開いて Script Properties の場所を見る
- [ ] (Pro プランで) Claude Code を起動して "Issue #20 を見て" と話しかける
- [ ] Issue を新規作成してみる (テスト用)
- [ ] 質疑応答

---

🎓 **次のステップ**: このドキュメントを見ながら、上間さんが 1 人で操作できる箇所を増やしていきましょう。
わからないことは GitHub Issue or Slack で気軽に質問してください。
