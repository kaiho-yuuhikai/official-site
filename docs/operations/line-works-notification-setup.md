# LINE WORKS 寄付通知 セットアップ手順 (Issue #20)

寄付申込フォームの送信を検知し、運営トークルームへ自動通知する仕組みのセットアップ手順。

> ⚠️ **秘匿情報の取扱い**
> 本手順で扱う認証情報 6 点は **絶対にコード / リポジトリ / Slack / メール本文** に貼り付けないこと。
> 必ず以下のいずれかに保管:
> - LINE WORKS Developer Console (発行元)
> - 1Password / 雄飛会の安全な共有場所
> - Apps Script の **Script Properties** (運用反映)

---

## Phase 1: LINE WORKS 側のセットアップ

担当: 管理者権限を持つ運営メンバー (例: 上間さん)

1. [LINE WORKS Developer Console](https://dev.worksmobile.com/) に管理者アカウントでログイン
2. **App** を新規作成
   - 名前: 「雄飛会 寄付通知Bot 連携」
   - スコープ: `bot` を追加
   - Client ID / Client Secret を控える
   - Service Account を発行し、Private Key (PEM) をダウンロード
3. **Bot** を新規作成 (最大10個までフリープランで作成可)
   - Bot 名: 「雄飛会 寄付通知Bot」
   - 説明: 「寄付申込フォームの新規受付を通知します」
   - Callback URL: 不要 (送信専用)
   - 作成後、**Bot No. (Bot ID)** を控える
   - 管理者画面でドメインに公開設定
4. 通知先トークルーム
   - 既存の運営チャンネルに Bot を招待
   - **channelId** を取得 (Developer Console もしくは API)
5. 取得した認証情報 6 点を 1Password / 安全な共有場所に保管

### 取得すべき 6 点

| 値 | 形式 | 例 |
|---|---|---|
| Client ID | 文字列 | `abc123xyz...` |
| Client Secret | 文字列 | `def456uvw...` |
| Service Account | `xxxx.serviceaccount@<domain>` | `100abc.serviceaccount@kaiho-yuhikai.com` |
| Private Key | PEM (改行込み) | `-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----` <!-- allow-secret:pem-private-key --> |
| Bot ID | 数値文字列 | `12345678` |
| channelId | 文字列 | `room-channel-id` |

---

## Phase 2: コード反映 (開発者作業)

```bash
cd scripts/gas/donations
clasp push
```

push されるファイル:
- `LineWorksNotifier.js` (新規)
- `Donations.js` (既存、変更なし)
- `Setup.js` (Properties セットアップ + トリガー登録ヘルパー追加)
- `appsscript.json` (`script.external_request` / `script.send_mail` / `script.scriptapp` スコープ追加)

---

## Phase 3: Script Properties 投入

> ⚠️ 認証情報をコードにハードコードしない。GAS エディタの「実行」ダイアログから引数を渡す。

### 方法 A: GAS エディタの実行ダイアログ

1. GAS エディタを開く (`clasp open`)
2. 関数選択ドロップダウンで `setupLineWorksProperties` を選ぶ
3. 「実行」ボタンの隣の「⚙ 引数を指定して実行」をクリック
4. 以下を貼り付けて実行:

```javascript
{
  LW_CLIENT_ID: 'Phase 1 で取得した Client ID',
  LW_CLIENT_SECRET: 'Phase 1 で取得した Client Secret',
  LW_SERVICE_ACCOUNT: 'xxxx.serviceaccount@<domain>',
  LW_PRIVATE_KEY: '-----BEGIN PRIVATE KEY-----\n... (改行込みで貼り付け) ...\n-----END PRIVATE KEY-----', // allow-secret:pem-private-key
  LW_BOT_ID: '12345678',
  LW_CHANNEL_ID: 'channel-id-xxx',
  ADMIN_EMAIL: 'admin@example.com'
}
```

5. 初回は権限承認ダイアログ (UrlFetch / Mail / Spreadsheet / Trigger) が表示される → 承認

### 方法 B: プロジェクト設定 → スクリプトプロパティ

GAS エディタ左メニュー > プロジェクト設定 > スクリプトプロパティ > プロパティを追加。
1 つずつ Key / Value を入力。Private Key は改行を含めて貼り付ける。

---

## Phase 4: 動作確認

### Step 1: showProperties で投入確認

GAS エディタで `showProperties` を実行。秘匿値 (LW_PRIVATE_KEY / LW_CLIENT_SECRET) は `***(length=N)` と redact されて表示される。

### Step 2: testNotify で疎通テスト

GAS エディタで `testNotify` を実行。運営トークルームに以下のメッセージが届くこと:

```
【テスト】寄付通知 Bot の疎通テスト (2026-MM-DD HH:MM)
```

エラーが出る場合は `docs/operations/line-works-notification-setup.md#トラブルシューティング` 参照。

### Step 3: installFormSubmitTrigger でトリガー登録

GAS エディタで `installFormSubmitTrigger` を実行。

確認: GAS エディタ > 左メニュー > トリガー で `onFormSubmit` トリガー (Source: Spreadsheet, Event: From form) が 1 件あること。

### Step 4: E2E 確認

本番フォームにテスト申込を送信 → 数秒〜数十秒以内に運営トークルームへ通知が届くことを確認。

通知文面例:
```
🎁 新しい寄付申込みがありました

お名前: テスト太郎（14期）
口数 : 1口（¥10,000）
HP掲載: 氏名で掲載OK
メッセージ:
  動作確認

受付: 2026-MM-DD HH:MM
※会計確認後にサイトへ反映されます。
スプレッドシート: https://docs.google.com/spreadsheets/d/.../edit
```

テスト行はスプレッドシートから「キャンセル」ステータスに変更するか、行ごと削除する。

---

## トラブルシューティング

| 症状 | 原因と対処 |
|---|---|
| `Required Script Property missing: LW_*` | Properties が未投入。`setupLineWorksProperties({...})` を再実行 |
| `LINE WORKS auth failed: 401` | Service Account / Client ID/Secret の組み合わせ不正。Developer Console で確認、必要なら rotate |
| `LINE WORKS auth failed: 400` | JWT の claim 不正 (時刻ズレ / scope 不一致)。GAS のタイムゾーンが JST か確認 |
| `LINE WORKS post failed: 403` | Bot がチャンネルに招待されていない / 送信権限なし。Bot を再招待 |
| `LINE WORKS post failed: 404` | channelId 不正。Developer Console で再確認 |
| 通知が遅延する (>1 分) | Apps Script のトリガーは数秒〜数十秒の遅延あり。1 分以上なら GAS の実行履歴を確認 |
| トリガーが二重登録された | `uninstallAllTriggers()` で全削除 → `installFormSubmitTrigger()` で再登録 |
| Private Key を誤ってコミットした | **即座に Developer Console で Service Account を rotate**。`docs/security/secret-handling.md#42-実際に秘匿情報を-commit-してしまった場合-緊急` 参照 |

---

## 認証情報のローテーション手順

セキュリティ事故時、または年次ローテーションで認証情報を更新する:

### Client Secret ローテーション

1. LINE WORKS Developer Console > App > Client Secret > Re-issue
2. 新しい Client Secret を控える
3. GAS エディタで `setupLineWorksProperties({...})` を実行し `LW_CLIENT_SECRET` のみ更新
4. `testNotify()` で疎通確認

### Private Key ローテーション

1. LINE WORKS Developer Console > App > Service Account > Private Key > Re-issue
2. 旧 Key は即座に無効化 (Re-issue で自動)
3. GAS エディタで `setupLineWorksProperties({...})` を実行し `LW_PRIVATE_KEY` を更新
4. CacheService の access token を手動でクリア:
   ```javascript
   CacheService.getScriptCache().remove('LW_ACCESS_TOKEN_V1')
   ```
5. `testNotify()` で疎通確認

### Bot 移管 (別ドメイン / 別アプリへ)

1. 新ドメインで Phase 1 全項目を再実施
2. `setupLineWorksProperties({...})` で 6 点すべてを上書き
3. `testNotify()` で疎通確認

---

## 関連

- 関連 Issue: #20, #18 (Skill 化提案)
- 関連スクリプト: `scripts/gas/donations/LineWorksNotifier.js`, `Donations.js`, `Setup.js`
- セキュリティガイド: `docs/security/secret-handling.md`
- 設計記録: `docs/donation-system-implementation-plan.md`
- LINE WORKS Developers: <https://developers.worksmobile.com/jp/docs/>
- Bot メッセージ送信 API: <https://developers.worksmobile.com/jp/docs/bot-message-send>
