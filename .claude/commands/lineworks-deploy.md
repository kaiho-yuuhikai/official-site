# LINE WORKS Bot を本番稼働 (Issue #20 Phase 3〜5)

寄付申込フォーム送信時に運営トークルームへ自動通知する仕組みを稼働させます。
Phase 1 (LINE WORKS Developer Console での認証情報 6 点取得) が完了済みであることが前提。

## 手順

### Step 0: 前提確認

ユーザーに以下を確認:

```
LINE WORKS の認証情報 6 点は手元にありますか?

  1. Client ID
  2. Client Secret
  3. Service Account (xxxx.serviceaccount@<domain>)
  4. Private Key (PEM 形式、改行込み)
  5. Bot ID (Bot 番号)
  6. channelId (通知先トークルーム)

  ✅ 揃っている → このまま進める
  ❌ 揃っていない → Phase 1 (Developer Console 設定) を先に完了してください
```

⚠️ **6 点が揃っていない場合は中止**。Phase 1 の手順は `docs/operations/line-works-notification-setup.md` §Phase 1 参照。

### Step 1: clasp 認証確認

```bash
clasp login --status 2>&1 || clasp login
```

⚠️ 必ず **開発者ドメイン (神谷さんの dev アカウント)** でログイン。雄飛会アカウントだと cross-domain で deploy できない。

### Step 2: コードを GAS に反映

```bash
cd scripts/gas/donations
clasp push
```

push されるファイル:
- `LineWorksNotifier.js` — Bot API 連携本体
- `Donations.js` — 既存
- `Setup.js` — `setupLineWorksProperties` / `installFormSubmitTrigger` 等
- `appsscript.json` — `script.external_request` / `script.send_mail` / `script.scriptapp` スコープ

エラーなく push できたら次へ。

### Step 3: Script Properties に 6 点を投入する案内

```
🔒 Script Properties に認証情報 6 点を投入します

⚠️ セキュリティ: 認証情報をターミナルや Claude のチャット履歴に貼り付けないでください。
   必ず GAS エディタの実行ダイアログから直接入力します。

手順:
  1. clasp open を実行して GAS エディタを開く
  2. 関数選択ドロップダウンで「setupLineWorksProperties」を選ぶ
  3. 「⚙ 引数を指定して実行」をクリック
  4. 以下のテンプレートに 6 点を差し込んで貼り付け、実行
```

提示するテンプレート (Claude は値を埋めない、ユーザーが手で埋める):

```javascript
{
  LW_CLIENT_ID: '<Phase 1 で取得した Client ID>',
  LW_CLIENT_SECRET: '<Phase 1 で取得した Client Secret>',
  LW_SERVICE_ACCOUNT: '<xxxx.serviceaccount@<domain>>',
  LW_PRIVATE_KEY: '<<PEM形式の秘密鍵テキスト (改行込み)>>',
  LW_BOT_ID: '<Bot 番号>',
  LW_CHANNEL_ID: '<channelId>',
  ADMIN_EMAIL: 'office@kaiho-yuhikai.com'
}
```

ターミナルから clasp open を実行:

```bash
cd scripts/gas/donations
clasp open
```

ユーザーが GAS エディタで投入完了したら「投入完了」と入力してもらう。

### Step 4: 疎通テスト (testNotify)

```
🧪 testNotify を実行して運営トークルームに 1 件テスト送信します

GAS エディタで:
  1. 関数選択で「testNotify」を選ぶ
  2. 「▶ 実行」をクリック
  3. 初回は権限承認ダイアログが出る → すべて「承認」
  4. 運営トークルームに「【テスト】寄付通知 Bot の疎通テスト ...」が届くか確認
```

トラブルシューティング:
- `LINE WORKS auth failed: 401` → Service Account / Client Secret 再確認
- `LINE WORKS post failed: 403` → Bot がチャンネルに招待されていない → LINE WORKS で再招待
- `Required Script Property missing` → Step 3 で投入もれ → 再投入

ユーザーが「成功」と入力したら次へ。

### Step 5: トリガー登録 (installFormSubmitTrigger)

```
🔔 installFormSubmitTrigger を実行してフォーム送信トリガーを登録します

GAS エディタで:
  1. 関数選択で「installFormSubmitTrigger」を選ぶ
  2. 「▶ 実行」をクリック
  3. 左メニュー「トリガー」を開いて「onFormSubmit」トリガーが 1 件あることを確認
```

ユーザーがトリガー登録を確認したら次へ。

### Step 6: E2E 確認

```
🎯 本番フォームから 1 件テスト申込を送って End-to-End で確認します

手順:
  1. 本番フォームを開いて「テスト太郎 / 14期 / 1口 / メッセージ:疎通テスト」で送信
  2. 数秒〜数十秒以内に運営トークルームに通知が届くことを確認
  3. スプレッドシートを開いて、テスト行の I 列を「キャンセル」に変更 (or 行削除)

テスト行を残すと HP に表示されてしまうので必ず処理してください。
```

ユーザーが「完了」と入力したら次へ。

### Step 7: 完了報告

```
🎉 LINE WORKS Bot 本番稼働完了

  ✅ Phase 2 GAS コード反映
  ✅ Phase 3 Script Properties 投入
  ✅ Phase 4 疎通テスト成功
  ✅ Phase 5 トリガー登録 + E2E 確認

これで:
  - 寄付申込があるたびに自動で運営トークルームに通知
  - 屋良さんが Sheet を能動的に開かなくても気づける
  - 翌朝 09:00 JST に HP にも自動反映

トラブルシューティング:
  - 通知が来ない → /lineworks-deploy を再実行して Step 4 から再確認
  - 緊急停止が必要 → GAS エディタで uninstallAllTriggers() を実行
```

Issue #20 にコメントで完遂を報告するか確認:

```bash
GH_TOKEN=$(gh auth token --user <対応アカウント>) gh issue comment 20 -R kaiho-yuuhikai/official-site \
  --body "LINE WORKS Bot 本番稼働完了 ($(date '+%Y-%m-%d %H:%M JST'))"
```

## 注意事項

- **秘匿情報の取扱い**: 認証情報をターミナル / Claude チャット / コミットに貼り付けないこと
- **clasp は開発者ドメインで**: 雄飛会アカウントだと redeploy 不能
- **権限承認**: 初回 testNotify 実行時に UrlFetch / MailApp / Spreadsheet の承認が必要
- **エラー時の対処**: 詳細は `docs/operations/line-works-notification-setup.md` 参照
- **緊急停止**: `uninstallAllTriggers()` でフォーム送信トリガーを全削除
