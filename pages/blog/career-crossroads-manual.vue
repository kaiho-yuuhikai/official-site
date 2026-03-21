<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-emerald-600"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M30 0L60 30L30 60L0 30Z%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-gold mb-4">Blog / Manual</p>
        <h1 class="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">開邦キャリア・クロスロード<br>開催マニュアル</h1>
        <p class="mt-6 text-white/70 text-sm">2026年3月公開 | 第1回（2025年12月）実績ベース</p>
      </div>
    </section>

    <!-- Table of Contents -->
    <section class="py-12 bg-kaiho-cream">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="bg-white rounded-2xl shadow-sm border p-8">
          <h2 class="text-lg font-bold text-neutral-900 mb-4">目次</h2>
          <nav class="columns-1 md:columns-2 gap-8 text-sm">
            <a v-for="item in toc" :key="item.id" :href="'#' + item.id"
               class="block py-1.5 text-kaiho-green hover:text-kaiho-green-dark transition-colors">
              {{ item.label }}
            </a>
          </nav>
        </div>
      </div>
    </section>

    <!-- Article Body -->
    <article class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8 prose prose-neutral prose-lg max-w-none
                  prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pt-8 prose-h2:border-t prose-h2:border-neutral-200
                  prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
                  prose-table:text-sm prose-th:bg-neutral-50 prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2
                  prose-blockquote:border-kaiho-green prose-blockquote:bg-kaiho-cream/50 prose-blockquote:rounded-r-lg prose-blockquote:py-1
                  prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                  prose-strong:text-neutral-900
                  prose-a:text-kaiho-green prose-a:no-underline hover:prose-a:underline">

        <!-- 1. イベント概要 -->
        <h2 id="overview">1. イベント概要</h2>

        <h3>コンセプト</h3>
        <p>「キャリア・クロスロード」は、大同窓会の直前に開催する<strong>世代横断型キャリア交流イベント</strong>。単なる「進路相談会」ではなく、3つの価値を同時に実現する場として設計しています。</p>

        <table>
          <thead><tr><th>参加者層</th><th>提供する価値</th></tr></thead>
          <tbody>
            <tr><td>在校生・大学生（メンティー）</td><td><strong>未来の羅針盤</strong> — 先輩のリアルな経験から進路・キャリアのヒントを得る</td></tr>
            <tr><td>中堅・ベテラン卒業生（メンター）</td><td><strong>ビジネスチャンスの交差点</strong> — 異業種の同窓生との新たなコラボレーション</td></tr>
            <tr><td>全参加者</td><td><strong>逆メンタリング効果</strong> — 若い世代の鋭い視点から刺激と学びを得る</td></tr>
          </tbody>
        </table>

        <h3>背景にある思想</h3>
        <ul>
          <li>期を超えて同窓生同士のつながりを作り、卒業後も繋がれるネットワークを意識させる</li>
          <li>将来的にリクルーティング的なネットワークとして機能させたい</li>
          <li>同じ学校で過ごした共通体験やカルチャーが、一緒に仕事をするうえで活きる</li>
        </ul>

        <h3>イベント設計の原則:「聞く場」ではなく「話す場」をつくる</h3>
        <p>ビジネス系イベントにおいて、登壇者の話を一方的に参加者が聞くスタイルよりも、<strong>初めて会う人に自分のことを話して共感してもらったり、理解してもらうミートアップ形式のほうが、参加者の満足度が圧倒的に高い</strong>。キャリア・クロスロードの設計は、この原則に基づいています。</p>

        <p><strong>インタラクティブ性の最大化:</strong></p>
        <ul>
          <li>参加者各々が自身の経験・悩み・展望を話し、それに対して周りの人が真剣に耳を傾ける場をつくる</li>
          <li>「講演」ではなく「対話」。メンターもメンティーも全員が話し手であり聞き手</li>
          <li>セッションの時間配分（学生メンタリング20分 + 知見共有10分）も、学生が主体的に質問・発言することを前提に設計</li>
        </ul>

        <p><strong>運営側で全てを事前に決める:</strong></p>
        <ul>
          <li>アジェンダ、席のレイアウト、テーブル配置、セッションの時間配分は全て運営側で事前に確定する</li>
          <li><strong>参加者に迷いを与えないこと</strong>が最も重要。「どこに座ればいいか」「何を話せばいいか」「いつ移動するか」を参加者が考える必要がない状態をつくる</li>
          <li>初めて会う人同士で構成されるイベントだからこそ、運営側ができるだけ緻密に設計する。そうすることで、参加者は<strong>自分の話をすること、他の人の話を聞くこと</strong>に集中できる</li>
        </ul>

        <blockquote><p>運営の仕事は「当日の進行」ではなく「当日までの設計」にある。参加者が何も迷わない状態をつくれたら、当日はほぼ自走する。</p></blockquote>

        <h3>第1回実績サマリ</h3>
        <table>
          <thead><tr><th>項目</th><th>内容</th></tr></thead>
          <tbody>
            <tr><td>開催日</td><td>2025年12月28日（日）13:00〜14:30</td></tr>
            <tr><td>会場</td><td>ホテル宴会場（大同窓会本編と同施設の併設会場）</td></tr>
            <tr><td>位置づけ</td><td>第3回大同窓会の事前イベント（本編は15:00〜）</td></tr>
            <tr><td>メンター数</td><td>7テーブル × 2〜3名 = 約20名</td></tr>
            <tr><td>参加者総数</td><td>約50名（メンティー約30名 + メンター約20名）</td></tr>
            <tr><td>運営スタッフ</td><td>約14名（幅広い世代で構成）</td></tr>
            <tr><td>特別企画</td><td>中学生による探究発表（約15分）</td></tr>
          </tbody>
        </table>

        <!-- 2. 準備タイムライン -->
        <h2 id="timeline">2. 準備タイムライン</h2>

        <table>
          <thead><tr><th>フェーズ</th><th>時期</th><th>主なタスク</th></tr></thead>
          <tbody>
            <tr><td>Phase 1</td><td>3〜4ヶ月前</td><td>コンセプト策定、運営チーム編成、実行委員会承認、会場確保</td></tr>
            <tr><td>Phase 2</td><td>2〜3ヶ月前</td><td>メンター候補リスト作成、依頼メール送信、プロフィール収集、テーブル編成</td></tr>
            <tr><td>Phase 3</td><td>1〜2ヶ月前</td><td>Webページ・申込フォーム公開、学校への周知、司会者アサイン</td></tr>
            <tr><td>Phase 4</td><td>2〜3週間前</td><td>進行資料作成・送付、テーブルキャプテン依頼、会場レイアウト確定</td></tr>
          </tbody>
        </table>

        <h3>運営チーム推奨構成</h3>
        <ul>
          <li><strong>統括責任者</strong>: 1名（企画全体のディレクション）</li>
          <li><strong>メンター担当</strong>: 2〜3名（候補選定・依頼・フォロー）</li>
          <li><strong>学校連携担当</strong>: 1〜2名（教育関係者が望ましい）</li>
          <li><strong>会場・設営担当</strong>: 2〜3名</li>
          <li><strong>広報・Web担当</strong>: 1〜2名</li>
          <li><strong>当日運営</strong>: 3〜5名（受付、誘導、タイムキーパー等）</li>
        </ul>

        <!-- 3. メンター募集 -->
        <h2 id="mentor-recruitment">3. メンター募集・選定プロセス</h2>

        <h3>候補リストの作成（優先度マトリクス）</h3>
        <p>大同窓会の参加申込データをもとに、以下の優先度で候補を選定します。</p>
        <table>
          <thead><tr><th>優先度</th><th>条件</th><th>備考</th></tr></thead>
          <tbody>
            <tr><td><strong>P1（最優先）</strong></td><td>大同窓会申込済み＆特設授業等に未参加</td><td>新規の協力者を開拓</td></tr>
            <tr><td><strong>P2</strong></td><td>大同窓会申込済み＆特設授業に参加済み</td><td>母校への貢献意識が高い</td></tr>
            <tr><td><strong>P3（要打診）</strong></td><td>大同窓会未申込＆特設授業に参加済み</td><td>個別打診が必要</td></tr>
          </tbody>
        </table>

        <h3>テーブル業種カテゴリ（7〜8卓）</h3>
        <table>
          <thead><tr><th>卓</th><th>分野</th><th>メンター目安</th><th>職種例</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>医療</td><td>2〜3名</td><td>医師、歯科医師、薬剤師</td></tr>
            <tr><td>2</td><td>法曹・行政・公共</td><td>2〜3名</td><td>弁護士、公務員、議員</td></tr>
            <tr><td>3</td><td>経営・起業</td><td>2〜3名</td><td>経営者、起業家</td></tr>
            <tr><td>4</td><td>IT・テクノロジー</td><td>2〜3名</td><td>エンジニア、研究者</td></tr>
            <tr><td>5</td><td>教育・人材</td><td>2〜3名</td><td>大学教員、キャリアコンサルタント</td></tr>
            <tr><td>6</td><td>メディア・芸能</td><td>2名</td><td>アナウンサー、エンタメ</td></tr>
            <tr><td>7</td><td>芸術・クリエイティブ</td><td>2〜3名</td><td>音楽家、デザイナー</td></tr>
          </tbody>
        </table>

        <h3>プロフィール収集項目</h3>
        <p>Googleフォームで以下を収集します。</p>
        <ul>
          <li>氏名、卒業期・学科、電話番号（当日緊急連絡用）</li>
          <li>専門分野（テーブル選択）、現在の所属・役職</li>
          <li>プロフィール・経歴、プロフィール写真（URL）</li>
          <li>学生へのメッセージ（任意）</li>
          <li>個人情報取扱への同意</li>
        </ul>

        <!-- 4. 参加者募集 -->
        <h2 id="participant-recruitment">4. 参加者募集</h2>

        <h3>参加申込フォームの設計</h3>
        <p>氏名、メールアドレス、所属区分（在校生/大学生/社会人）、現在の所属、卒業期・学科に加え、以下の質問で当日のテーブルマッチングを行います。</p>

        <h3>「メンターに相談したいこと」選択肢</h3>
        <ul>
          <li>具体的な仕事内容や、やりがい・苦労について聞きたい</li>
          <li>進路や勉強法について相談したい</li>
          <li>中堅・ベテラン卒業生とネットワーキングしたい</li>
          <li>キャリアの分岐点（転職・起業など）について聞きたい</li>
          <li>生成AI時代に求められるスキルやキャリアについて不安がある</li>
          <li>高校・大学時代の過ごし方についてアドバイスが欲しい</li>
        </ul>

        <h3>学校連携</h3>
        <p>学校との連携は<strong>教頭先生を窓口</strong>に、同窓会メンバーの教育関係者が橋渡し役を担います。創立記念式典等の学校行事でのチラシ配布も有効です。中学生の探究発表など特別企画の受け入れも柔軟に検討しましょう。</p>

        <!-- 5. 当日の運営 -->
        <h2 id="event-day">5. 当日の運営</h2>

        <h3>タイムテーブル</h3>
        <table>
          <thead><tr><th>時刻</th><th>内容</th><th>場所</th></tr></thead>
          <tbody>
            <tr><td>11:30</td><td>メンター集合</td><td>ホテル内カフェ</td></tr>
            <tr><td>11:30〜12:30</td><td>ランチブリーフィング（軽食・最終共有）</td><td>ホテル内カフェ</td></tr>
            <tr><td>12:00</td><td>会場設営開始</td><td>宴会場</td></tr>
            <tr><td>12:15</td><td>中学生リハーサル（該当する場合）</td><td>宴会場</td></tr>
            <tr><td>12:30〜13:00</td><td>開場・受付</td><td>宴会場</td></tr>
            <tr><td>13:00〜13:05</td><td>オープニング（学生MCより全体案内）</td><td></td></tr>
            <tr><td>13:05〜13:20</td><td>特別企画：中学生 探究発表（約15分）</td><td></td></tr>
            <tr class="bg-kaiho-green/5"><td>13:20〜13:50</td><td><strong>Session 1（30分）</strong> — 第1希望テーブル</td><td></td></tr>
            <tr><td>13:50〜13:55</td><td>移動（5分）</td><td></td></tr>
            <tr class="bg-kaiho-green/5"><td>13:55〜14:25</td><td><strong>Session 2（30分）</strong> — 第2希望テーブル</td><td></td></tr>
            <tr><td>14:25〜14:30</td><td>クロージング（大同窓会本編への移動案内）</td><td></td></tr>
          </tbody>
        </table>

        <h3>セッション進行（30分 × 2回）</h3>
        <p>各テーブルは「<strong>学生向けメンタリング（20分）→ 卒業生知見共有（10分）</strong>」で進行します。</p>
        <table>
          <thead><tr><th>経過</th><th>フェーズ</th><th>進め方</th></tr></thead>
          <tbody>
            <tr><td>0:00〜0:02</td><td>入口</td><td>円卓で「名前だけ」自己紹介（短く）</td></tr>
            <tr><td>0:02〜0:20</td><td><strong>学生中心</strong></td><td>学生の質問・相談を優先</td></tr>
            <tr><td>0:20〜0:28</td><td><strong>知見共有</strong></td><td>経験談・業界のリアルを短めに共有</td></tr>
            <tr><td>0:28〜0:30</td><td>まとめ</td><td>ひとことまとめ → 次テーブルへ移動案内</td></tr>
          </tbody>
        </table>

        <h3>テーブルキャプテン制</h3>
        <p>各テーブルのメンター1名を「テーブルキャプテン（進行役）」に指名。負担は<strong>合図3回だけ</strong>。</p>
        <ol>
          <li><strong>開始</strong>:「前半は学生の質問・相談を優先しましょう」</li>
          <li><strong>切替（20分目安）</strong>:「後半に切り替えましょう」</li>
          <li><strong>締め（残り2分）</strong>:「まとめに入りましょう」</li>
        </ol>
        <blockquote><p>負担を「合図3回」に絞ることで、メンター本人も対話に集中できる</p></blockquote>

        <h3>質問カテゴリ（会場スライド掲示）</h3>
        <p>学生が対話を進めやすくするための8つの質問ガイドを会場スライドに掲示します。</p>
        <table>
          <thead><tr><th>No</th><th>質問カテゴリ</th><th>具体例</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>仕事のリアル</td><td>実際の1日の流れ、大変なこと、面白いこと</td></tr>
            <tr><td>2</td><td>決め方・分岐点</td><td>迷った時の軸、決め手になったこと</td></tr>
            <tr><td>3</td><td>成長のしかた</td><td>勉強・練習・習慣で効果があったこと</td></tr>
            <tr><td>4</td><td>失敗と立て直し</td><td>折れた経験、どう戻ったか</td></tr>
            <tr><td>5</td><td>向き不向き</td><td>向いている人の特徴、工夫していること</td></tr>
            <tr><td>6</td><td>今やるべき一歩</td><td>今日からできること</td></tr>
            <tr><td>7</td><td>未来・AI時代</td><td>変わること、変わらない力</td></tr>
            <tr><td>8</td><td>自由質問</td><td>自分の言葉で聞く</td></tr>
          </tbody>
        </table>

        <h3>司会者（学生MC）</h3>
        <p>大学生〜若手社会人が最適。在校生と社会人メンターの間の<strong>ブリッジ役</strong>として機能します。</p>
        <p>事前に統括責任者とオンラインMTG（1〜2回、各30〜60分）を行い、イベントの背景・目的の共有と司会としての役割の認識合わせを行います。司会用スライドの骨子は統括が作成し、司会者にレビューを依頼。当日のスライドページングは統括がPC卓で操作し、司会者は説明と場づくりに集中します。</p>

        <!-- 6. 事後フォロー -->
        <h2 id="follow-up">6. 事後フォロー</h2>
        <table>
          <thead><tr><th>時期</th><th>タスク</th><th>詳細</th></tr></thead>
          <tbody>
            <tr><td>当日〜翌日</td><td>写真共有</td><td>Googleフォトアルバムを関係者限定で共有</td></tr>
            <tr><td>1週間以内</td><td>御礼メール</td><td>メンター・学校関係者へ個別に感謝メール + フォトアルバムURL</td></tr>
            <tr><td>1週間以内</td><td>事後アンケート</td><td>Googleフォームで全参加者に配信（回答期限2〜3週間）</td></tr>
            <tr><td>2〜3週間後</td><td>振り返り</td><td>アンケート結果集計、実行委員会での振り返り、引き継ぎ資料更新</td></tr>
          </tbody>
        </table>

        <!-- 7. ICTツール活用 -->
        <h2 id="ict-strategy">7. ICTツール活用と非同期コミュニケーション戦略</h2>

        <h3>運営の基本原則:「文書で共有し、非同期で合意を取る」</h3>
        <p>本イベントの運営で最も重要な学びは、<strong>関係者全員が同時に集まるオンラインミーティングは極力避け、文書ベースの非同期コミュニケーションを主軸にする</strong>ということです。</p>

        <p><strong>なぜ非同期か:</strong></p>
        <ul>
          <li>運営メンバーは10名以上、メンターは20名以上。社会人が中心のため、同期的な日程調整は極めて困難</li>
          <li>全員が揃うのは「当日」のみ。それまでのプロセスは全て非同期で回す前提で設計する</li>
          <li>オンラインMTGが必要なのは、<strong>司会者との認識合わせ（1〜2回）</strong>と<strong>運営定例（週1回・任意参加）</strong>程度</li>
        </ul>

        <p><strong>なぜそれで回るのか:</strong></p>
        <blockquote>
          <p>開邦高校の卒業生は、目的や意義が明確に言語化されていれば賛同し、自律的に動いてくれる。逆に言えば、「なぜやるのか」「何を期待しているのか」「当日何をすればよいか」を曖昧にしたまま口頭で伝えても効果が薄い。<strong>やることを明文化して文章で共有する</strong>ことが、最も効率的かつ確実な合意形成手段。</p>
        </blockquote>

        <h3>制作物の自動化・AI活用</h3>
        <p>第1回では、以下の制作物を <strong>Google Apps Script（GAS）</strong> と <strong>AI画像生成（Gemini）</strong> を活用して制作しました。</p>
        <table>
          <thead><tr><th>制作物</th><th>作成方法</th><th>詳細</th></tr></thead>
          <tbody>
            <tr><td>参加申込フォーム</td><td>GAS + Googleフォーム</td><td>回答がスプレッドシートに自動集計。属性別の参加者数をリアルタイム把握</td></tr>
            <tr><td>メンター依頼メール</td><td>GAS（一括送信）</td><td>候補リストから宛名・業種を差し込んだ個別メールを自動生成・送信</td></tr>
            <tr><td>返信状況の追跡</td><td>GAS</td><td>返信メールを自動検知し「参加可否」を更新。未返信者へのリマインドも自動化</td></tr>
            <tr><td>事前配布マニュアル</td><td>AI（LLM）+ Google Docs</td><td>コンセプト・タイムテーブル等をAIで下書き → 人間がレビュー・調整</td></tr>
            <tr><td>当日の開催スライド</td><td>AI画像生成（Gemini）</td><td>司会用スライド・質問カテゴリパネルをAI生成。デザイナー不要</td></tr>
            <tr><td>イベントWebページ</td><td>Webサイトビルダー</td><td>メンタープロフィール、タイムテーブル、申込リンクをノーコード構築</td></tr>
          </tbody>
        </table>
        <blockquote><p>デザイナーやライターをアサインする必要がなく、統括責任者1名 + AI で制作物の大半をカバーできた</p></blockquote>

        <!-- 8. 成功のポイント -->
        <h2 id="lessons-learned">8. 成功のポイント・教訓</h2>

        <h3>やってよかったこと</h3>
        <ol>
          <li><strong>全てを文書化し、非同期で合意を取った</strong> — 関係者が多く日程調整が困難な中、依頼メール・進行資料・当日スライドの全てを文書として事前共有。目的と意義を明文化すれば、卒業生は自律的に賛同・行動してくれる</li>
          <li><strong>GASとAIで制作物を自動化</strong> — 統括1名 + AIで運営の大半をカバー。デザイナー・ライター不要で高品質なアウトプットを実現</li>
          <li><strong>「ビジネスチャンスの交差点」として訴求</strong> — メンター側のメリットを明示し、快諾率を高めた</li>
          <li><strong>テーブルキャプテン制（合図3回）</strong> — 進行役の負担を最小化</li>
          <li><strong>中学生の探究発表を柔軟に受け入れ</strong> — 世代横断の幅が拡大。逆メンタリング効果も発生</li>
          <li><strong>30分×2回のローテーション制</strong> — 学生が複数の業種のメンターと話せる</li>
          <li><strong>若手卒業生を司会に起用</strong> — 在校生と社会人のブリッジ役として機能</li>
          <li><strong>優先度マトリクスで候補を体系的に選定</strong> — P1/P2/P3の仕組みで効率的に確保</li>
        </ol>

        <h3>改善・検討事項</h3>
        <ol>
          <li><strong>周知の早期化・多チャネル化</strong> — 在校生への周知を2ヶ月前から開始、SNS活用</li>
          <li><strong>参加人数のプランB</strong> — 学生が少ない場合のメンター同士交流プランを事前に用意</li>
          <li><strong>オンライン参加枠</strong> — 県外在住メンターもリモート参加できる仕組み</li>
          <li><strong>事後アンケートの当日回収</strong> — QRコードを会場で掲示し、その場で回答を促す</li>
          <li><strong>専任カメラマン</strong> — 写真撮影体制を事前にアサイン</li>
        </ol>

        <h3>参加者の声</h3>
        <blockquote><p>「大人の皆さんが優しく相談に乗ってくれて将来の不安が軽くなった。将来こんな温かい先輩になりたい」 — 在校生</p></blockquote>
        <blockquote><p>「自分の興味がある分野以外も知ることができて、新しい学びを得られた」 — 在校生</p></blockquote>
        <blockquote><p>「中学生の探究発表の論理性に驚いた。母校の主体性の高さを誇りに思う」 — ベテラン卒業生</p></blockquote>
        <blockquote><p>「他業種との交流が刺激になった。これぞ同窓会の醍醐味」 — 中堅卒業生</p></blockquote>

        <!-- Footer note -->
        <hr>
        <p class="text-sm text-neutral-500">本マニュアルは第1回「キャリア・クロスロード」（2025年12月開催）の実績をもとに作成。個人を特定できる情報は除外し、再現可能なナレッジとして構成しています。次回開催時は、本書をベースに最新の状況に合わせて更新してください。</p>
      </div>
    </article>

    <!-- CTA -->
    <section class="py-16 bg-kaiho-cream">
      <div class="max-w-2xl mx-auto px-6 text-center">
        <h2 class="text-2xl font-bold text-neutral-900 mb-4">キャリア・クロスロードを開催しませんか？</h2>
        <p class="text-neutral-600 mb-8">本マニュアルを参考に、あなたの同窓会でも世代横断型キャリア交流イベントを企画できます。ご質問・ご相談はお気軽にどうぞ。</p>
        <NuxtLink to="/contact" class="inline-flex items-center justify-center px-8 py-4 bg-kaiho-green text-white font-bold rounded-full hover:bg-kaiho-green-dark transition-all duration-300 shadow-lg hover:shadow-xl">
          お問い合わせ
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '開邦キャリア・クロスロード 開催マニュアル | 開邦雄飛会',
  meta: [
    { name: 'description', content: '同窓会の大同窓会に併設して開催する世代横断型キャリア交流イベント「キャリア・クロスロード」の企画・運営・当日進行の完全ガイド。第1回（2025年12月）の実績をもとに作成。' },
  ],
})

const toc = [
  { id: 'overview', label: '1. イベント概要' },
  { id: 'timeline', label: '2. 準備タイムライン' },
  { id: 'mentor-recruitment', label: '3. メンター募集・選定プロセス' },
  { id: 'participant-recruitment', label: '4. 参加者募集' },
  { id: 'event-day', label: '5. 当日の運営' },
  { id: 'follow-up', label: '6. 事後フォロー' },
  { id: 'ict-strategy', label: '7. ICTツール活用と非同期コミュニケーション戦略' },
  { id: 'lessons-learned', label: '8. 成功のポイント・教訓' },
]
</script>
