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

    <!-- 2-Column Layout: Sticky TOC + Article -->
    <div class="bg-white">
      <div class="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div class="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">

          <!-- Sticky TOC (Desktop) -->
          <aside class="hidden lg:block">
            <nav class="sticky top-24 space-y-1">
              <p class="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-3">目次</p>
              <a v-for="item in toc" :key="item.id" :href="'#' + item.id"
                 class="block py-1.5 text-[13px] text-neutral-500 hover:text-kaiho-green border-l-2 border-transparent hover:border-kaiho-green pl-3 transition-all leading-snug">
                {{ item.label }}
              </a>
            </nav>
          </aside>

          <!-- Mobile TOC -->
          <div class="lg:hidden mb-10">
            <details class="bg-neutral-50 rounded-xl border">
              <summary class="px-5 py-4 text-sm font-bold text-neutral-700 cursor-pointer">目次を表示</summary>
              <nav class="px-5 pb-4 space-y-1">
                <a v-for="item in toc" :key="'m-' + item.id" :href="'#' + item.id"
                   class="block py-1.5 text-sm text-kaiho-green">
                  {{ item.label }}
                </a>
              </nav>
            </details>
          </div>

          <!-- Article Body -->
          <article class="min-w-0">

            <!-- ============================================================ -->
            <!-- 1. イベント概要 -->
            <!-- ============================================================ -->
            <section id="overview" class="mb-16">
              <div class="flex items-center gap-3 mb-6">
                <span class="flex-shrink-0 w-10 h-10 rounded-xl bg-kaiho-green/10 flex items-center justify-center text-kaiho-green font-black text-sm">01</span>
                <h2 class="text-2xl font-black tracking-tight text-neutral-900">イベント概要</h2>
              </div>

              <h3 class="text-lg font-bold text-neutral-800 mt-8 mb-3">コンセプト</h3>
              <p class="text-neutral-600 leading-relaxed mb-6">「キャリア・クロスロード」は、大同窓会の直前に開催する<strong class="text-neutral-900">世代横断型キャリア交流イベント</strong>。単なる「進路相談会」ではなく、3つの価値を同時に実現する場です。</p>

              <div class="grid sm:grid-cols-3 gap-4 mb-8">
                <div class="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <p class="text-xs font-bold text-blue-600 mb-1">在校生・大学生</p>
                  <p class="text-sm font-bold text-neutral-900 mb-1">未来の羅針盤</p>
                  <p class="text-xs text-neutral-500">先輩のリアルな経験から進路・キャリアのヒントを得る</p>
                </div>
                <div class="bg-orange-50 border border-orange-100 rounded-xl p-5">
                  <p class="text-xs font-bold text-orange-600 mb-1">中堅・ベテラン卒業生</p>
                  <p class="text-sm font-bold text-neutral-900 mb-1">ビジネスの交差点</p>
                  <p class="text-xs text-neutral-500">異業種の同窓生との新たなコラボレーション</p>
                </div>
                <div class="bg-green-50 border border-green-100 rounded-xl p-5">
                  <p class="text-xs font-bold text-green-600 mb-1">全参加者</p>
                  <p class="text-sm font-bold text-neutral-900 mb-1">逆メンタリング効果</p>
                  <p class="text-xs text-neutral-500">若い世代の鋭い視点から刺激と学びを得る</p>
                </div>
              </div>

              <h3 class="text-lg font-bold text-neutral-800 mt-10 mb-3">背景にある思想</h3>
              <ul class="space-y-2 text-neutral-600 text-[15px] leading-relaxed">
                <li class="flex gap-2"><span class="text-kaiho-green mt-0.5">&#9654;</span>期を超えて同窓生同士のつながりを作り、卒業後も繋がれるネットワークを意識させる</li>
                <li class="flex gap-2"><span class="text-kaiho-green mt-0.5">&#9654;</span>将来的にリクルーティング的なネットワークとして機能させたい</li>
                <li class="flex gap-2"><span class="text-kaiho-green mt-0.5">&#9654;</span>同じ学校で過ごした共通体験やカルチャーが、一緒に仕事をするうえで活きる</li>
              </ul>

              <!-- 設計原則 Callout -->
              <div class="mt-10 bg-gradient-to-br from-kaiho-green/5 to-emerald-50 border border-kaiho-green/20 rounded-2xl p-6 md:p-8">
                <h3 class="text-lg font-bold text-neutral-900 mb-3">イベント設計の原則:「聞く場」ではなく「話す場」をつくる</h3>
                <p class="text-neutral-600 text-[15px] leading-relaxed mb-4">ビジネス系イベントにおいて、登壇者の話を一方的に参加者が聞くスタイルよりも、<strong class="text-neutral-900">初めて会う人に自分のことを話して共感してもらったり、理解してもらうミートアップ形式のほうが、参加者の満足度が圧倒的に高い</strong>。</p>
                <div class="grid sm:grid-cols-2 gap-4 mb-4">
                  <div class="bg-white rounded-xl p-4 border">
                    <p class="text-sm font-bold text-neutral-800 mb-2">インタラクティブ性の最大化</p>
                    <ul class="text-xs text-neutral-500 space-y-1.5">
                      <li>&#8226; 参加者各々が自身の経験・悩み・展望を話し、周りが真剣に耳を傾ける</li>
                      <li>&#8226; 「講演」ではなく「対話」。全員が話し手であり聞き手</li>
                      <li>&#8226; 学生が主体的に質問・発言することを前提に設計</li>
                    </ul>
                  </div>
                  <div class="bg-white rounded-xl p-4 border">
                    <p class="text-sm font-bold text-neutral-800 mb-2">運営側で全てを事前に決める</p>
                    <ul class="text-xs text-neutral-500 space-y-1.5">
                      <li>&#8226; アジェンダ、席配置、時間配分は全て運営が事前に確定</li>
                      <li>&#8226; <strong class="text-neutral-700">参加者に迷いを与えない</strong>ことが最重要</li>
                      <li>&#8226; 初対面同士だからこそ、緻密な設計で対話に集中させる</li>
                    </ul>
                  </div>
                </div>
                <div class="bg-kaiho-green text-white rounded-xl p-4 text-sm font-medium leading-relaxed">
                  運営の仕事は「当日の進行」ではなく「当日までの設計」にある。参加者が何も迷わない状態をつくれたら、当日はほぼ自走する。
                </div>
              </div>

              <h3 class="text-lg font-bold text-neutral-800 mt-10 mb-3">第1回実績サマリ</h3>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div class="bg-neutral-50 rounded-xl p-4 text-center border">
                  <p class="text-2xl font-black text-kaiho-green">50+</p>
                  <p class="text-xs text-neutral-500 mt-1">参加者総数</p>
                </div>
                <div class="bg-neutral-50 rounded-xl p-4 text-center border">
                  <p class="text-2xl font-black text-kaiho-orange">20</p>
                  <p class="text-xs text-neutral-500 mt-1">メンター数</p>
                </div>
                <div class="bg-neutral-50 rounded-xl p-4 text-center border">
                  <p class="text-2xl font-black text-kaiho-blue">7</p>
                  <p class="text-xs text-neutral-500 mt-1">テーブル数</p>
                </div>
                <div class="bg-neutral-50 rounded-xl p-4 text-center border">
                  <p class="text-2xl font-black text-kaiho-purple">14</p>
                  <p class="text-xs text-neutral-500 mt-1">運営スタッフ</p>
                </div>
              </div>
              <p class="text-xs text-neutral-400">2025年12月28日（日）13:00〜14:30 / ホテル宴会場 / 第3回大同窓会の事前イベント</p>
            </section>

            <hr class="border-neutral-100">

            <!-- ============================================================ -->
            <!-- 2. 準備タイムライン -->
            <!-- ============================================================ -->
            <section id="timeline" class="mb-16 pt-12">
              <div class="flex items-center gap-3 mb-6">
                <span class="flex-shrink-0 w-10 h-10 rounded-xl bg-kaiho-blue/10 flex items-center justify-center text-kaiho-blue font-black text-sm">02</span>
                <h2 class="text-2xl font-black tracking-tight text-neutral-900">準備タイムライン</h2>
              </div>

              <div class="space-y-4 mb-8">
                <div v-for="(phase, i) in phases" :key="i" class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" :class="phase.color">{{ i + 1 }}</div>
                    <div v-if="i < phases.length - 1" class="w-0.5 flex-1 bg-neutral-200 mt-1"></div>
                  </div>
                  <div class="pb-6">
                    <p class="text-sm font-bold text-neutral-900">{{ phase.title }}</p>
                    <p class="text-xs text-neutral-400 mb-1">{{ phase.timing }}</p>
                    <p class="text-sm text-neutral-600 leading-relaxed">{{ phase.tasks }}</p>
                  </div>
                </div>
              </div>

              <h3 class="text-lg font-bold text-neutral-800 mt-8 mb-3">運営チーム推奨構成</h3>
              <div class="grid sm:grid-cols-2 gap-3">
                <div v-for="role in roles" :key="role.name" class="flex items-start gap-3 bg-neutral-50 rounded-lg p-3 border">
                  <span class="text-kaiho-green font-bold text-sm mt-0.5">{{ role.count }}</span>
                  <div>
                    <p class="text-sm font-bold text-neutral-800">{{ role.name }}</p>
                    <p class="text-xs text-neutral-500">{{ role.desc }}</p>
                  </div>
                </div>
              </div>
            </section>

            <hr class="border-neutral-100">

            <!-- ============================================================ -->
            <!-- 3. メンター募集 -->
            <!-- ============================================================ -->
            <section id="mentor-recruitment" class="mb-16 pt-12">
              <div class="flex items-center gap-3 mb-6">
                <span class="flex-shrink-0 w-10 h-10 rounded-xl bg-kaiho-orange/10 flex items-center justify-center text-kaiho-orange font-black text-sm">03</span>
                <h2 class="text-2xl font-black tracking-tight text-neutral-900">メンター募集・選定</h2>
              </div>

              <h3 class="text-lg font-bold text-neutral-800 mb-3">優先度マトリクス</h3>
              <div class="space-y-2 mb-8">
                <div class="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-3">
                  <span class="flex-shrink-0 text-xs font-black text-green-700 bg-green-200 rounded px-2 py-0.5">P1</span>
                  <div class="text-sm"><strong class="text-neutral-800">最優先</strong> <span class="text-neutral-500">— 大同窓会申込済み＆特設授業に未参加（新規の協力者を開拓）</span></div>
                </div>
                <div class="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <span class="flex-shrink-0 text-xs font-black text-yellow-700 bg-yellow-200 rounded px-2 py-0.5">P2</span>
                  <div class="text-sm"><strong class="text-neutral-800">次点</strong> <span class="text-neutral-500">— 大同窓会申込済み＆特設授業に参加済み（貢献意識が高い）</span></div>
                </div>
                <div class="flex items-center gap-3 bg-neutral-50 border border-neutral-200 rounded-lg p-3">
                  <span class="flex-shrink-0 text-xs font-black text-neutral-600 bg-neutral-200 rounded px-2 py-0.5">P3</span>
                  <div class="text-sm"><strong class="text-neutral-800">要打診</strong> <span class="text-neutral-500">— 大同窓会未申込＆特設授業に参加済み（個別打診が必要）</span></div>
                </div>
              </div>

              <h3 class="text-lg font-bold text-neutral-800 mb-3">テーブル業種カテゴリ（7〜8卓）</h3>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
                <div v-for="cat in categories" :key="cat" class="bg-neutral-50 border rounded-lg px-3 py-2.5 text-center">
                  <p class="text-sm font-bold text-neutral-800">{{ cat }}</p>
                </div>
              </div>

              <h3 class="text-lg font-bold text-neutral-800 mb-3">プロフィール収集項目（Googleフォーム）</h3>
              <div class="bg-neutral-50 rounded-xl border p-5">
                <div class="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-neutral-600">
                  <p>&#9745; 氏名・卒業期・学科</p>
                  <p>&#9745; 電話番号（当日緊急連絡用）</p>
                  <p>&#9745; 専門分野（テーブル選択）</p>
                  <p>&#9745; 現在の所属・役職</p>
                  <p>&#9745; プロフィール・経歴</p>
                  <p>&#9745; プロフィール写真（URL）</p>
                  <p>&#9744; 学生へのメッセージ（任意）</p>
                  <p>&#9745; 個人情報取扱への同意</p>
                </div>
              </div>
            </section>

            <hr class="border-neutral-100">

            <!-- ============================================================ -->
            <!-- 4. 参加者募集 -->
            <!-- ============================================================ -->
            <section id="participant-recruitment" class="mb-16 pt-12">
              <div class="flex items-center gap-3 mb-6">
                <span class="flex-shrink-0 w-10 h-10 rounded-xl bg-kaiho-purple/10 flex items-center justify-center text-kaiho-purple font-black text-sm">04</span>
                <h2 class="text-2xl font-black tracking-tight text-neutral-900">参加者募集</h2>
              </div>

              <h3 class="text-lg font-bold text-neutral-800 mb-3">「メンターに相談したいこと」選択肢</h3>
              <div class="space-y-2 mb-8">
                <div v-for="q in consultTopics" :key="q" class="flex items-start gap-2 text-sm text-neutral-600">
                  <span class="text-kaiho-purple mt-0.5 flex-shrink-0">&#9679;</span>{{ q }}
                </div>
              </div>

              <h3 class="text-lg font-bold text-neutral-800 mb-3">学校連携</h3>
              <p class="text-[15px] text-neutral-600 leading-relaxed">学校との連携は<strong class="text-neutral-900">教頭先生を窓口</strong>に、同窓会メンバーの教育関係者が橋渡し役を担います。創立記念式典等の学校行事でのチラシ配布も有効です。中学生の探究発表など特別企画の受け入れも柔軟に検討しましょう。</p>
            </section>

            <hr class="border-neutral-100">

            <!-- ============================================================ -->
            <!-- 5. 当日の運営 -->
            <!-- ============================================================ -->
            <section id="event-day" class="mb-16 pt-12">
              <div class="flex items-center gap-3 mb-6">
                <span class="flex-shrink-0 w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 font-black text-sm">05</span>
                <h2 class="text-2xl font-black tracking-tight text-neutral-900">当日の運営</h2>
              </div>

              <h3 class="text-lg font-bold text-neutral-800 mb-3">タイムテーブル</h3>
              <div class="space-y-1.5 mb-8">
                <div v-for="t in timetable" :key="t.time"
                     class="flex gap-3 items-start rounded-lg px-3 py-2.5 text-sm"
                     :class="t.highlight ? 'bg-kaiho-green/5 border border-kaiho-green/20' : 'bg-neutral-50 border border-transparent'">
                  <span class="flex-shrink-0 w-24 font-mono text-xs text-neutral-500 mt-0.5">{{ t.time }}</span>
                  <div>
                    <p class="font-bold text-neutral-800" :class="{ 'text-kaiho-green': t.highlight }">{{ t.title }}</p>
                    <p v-if="t.note" class="text-xs text-neutral-400 mt-0.5">{{ t.note }}</p>
                  </div>
                </div>
              </div>

              <h3 class="text-lg font-bold text-neutral-800 mb-3">セッション進行（30分 x 2回）</h3>
              <p class="text-[15px] text-neutral-600 mb-4">各テーブルは「<strong class="text-neutral-900">学生向けメンタリング（20分）→ 卒業生知見共有（10分）</strong>」で進行。</p>
              <div class="flex flex-col sm:flex-row gap-2 mb-8">
                <div class="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                  <p class="text-xs text-blue-500 font-bold">0:00 - 0:02</p>
                  <p class="text-sm font-bold text-neutral-800 mt-1">自己紹介</p>
                  <p class="text-xs text-neutral-500">名前だけ、短く</p>
                </div>
                <div class="flex-[3] bg-kaiho-green/5 border border-kaiho-green/20 rounded-xl p-4 text-center">
                  <p class="text-xs text-kaiho-green font-bold">0:02 - 0:20</p>
                  <p class="text-sm font-bold text-neutral-800 mt-1">学生中心メンタリング</p>
                  <p class="text-xs text-neutral-500">学生の質問・相談を優先</p>
                </div>
                <div class="flex-[1.5] bg-orange-50 border border-orange-100 rounded-xl p-4 text-center">
                  <p class="text-xs text-orange-500 font-bold">0:20 - 0:28</p>
                  <p class="text-sm font-bold text-neutral-800 mt-1">知見共有</p>
                  <p class="text-xs text-neutral-500">経験談・業界のリアル</p>
                </div>
                <div class="flex-1 bg-neutral-50 border rounded-xl p-4 text-center">
                  <p class="text-xs text-neutral-400 font-bold">0:28 - 0:30</p>
                  <p class="text-sm font-bold text-neutral-800 mt-1">まとめ</p>
                  <p class="text-xs text-neutral-500">移動案内</p>
                </div>
              </div>

              <!-- テーブルキャプテン -->
              <div class="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
                <h3 class="text-base font-bold text-neutral-800 mb-2">テーブルキャプテン制 — 合図3回だけ</h3>
                <div class="grid sm:grid-cols-3 gap-3">
                  <div class="bg-white rounded-lg p-3 text-center border">
                    <p class="text-2xl mb-1">1&#65039;&#8419;</p>
                    <p class="text-xs font-bold text-neutral-700">開始</p>
                    <p class="text-[11px] text-neutral-500">「学生の質問を優先」</p>
                  </div>
                  <div class="bg-white rounded-lg p-3 text-center border">
                    <p class="text-2xl mb-1">2&#65039;&#8419;</p>
                    <p class="text-xs font-bold text-neutral-700">切替（20分目安）</p>
                    <p class="text-[11px] text-neutral-500">「後半に切り替え」</p>
                  </div>
                  <div class="bg-white rounded-lg p-3 text-center border">
                    <p class="text-2xl mb-1">3&#65039;&#8419;</p>
                    <p class="text-xs font-bold text-neutral-700">締め（残り2分）</p>
                    <p class="text-[11px] text-neutral-500">「まとめに入りましょう」</p>
                  </div>
                </div>
              </div>

              <!-- 質問カテゴリ -->
              <h3 class="text-lg font-bold text-neutral-800 mb-3">質問カテゴリ（会場スライド掲示）</h3>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
                <div v-for="(q, i) in questionCategories" :key="i" class="bg-neutral-50 border rounded-lg p-3">
                  <p class="text-lg font-black text-neutral-300 mb-1">{{ String(i + 1).padStart(2, '0') }}</p>
                  <p class="text-sm font-bold text-neutral-800">{{ q.name }}</p>
                  <p class="text-[11px] text-neutral-500 mt-0.5">{{ q.example }}</p>
                </div>
              </div>

              <h3 class="text-lg font-bold text-neutral-800 mb-3">司会者（学生MC）</h3>
              <p class="text-[15px] text-neutral-600 leading-relaxed">大学生〜若手社会人が最適。在校生と社会人メンターの間の<strong class="text-neutral-900">ブリッジ役</strong>として機能します。事前にオンラインMTG（1〜2回）で背景・目的を共有。司会用スライドの骨子は統括が作成し、当日のページングも統括がPC卓で操作。司会者は説明と場づくりに集中できます。</p>
            </section>

            <hr class="border-neutral-100">

            <!-- ============================================================ -->
            <!-- 6. 事後フォロー -->
            <!-- ============================================================ -->
            <section id="follow-up" class="mb-16 pt-12">
              <div class="flex items-center gap-3 mb-6">
                <span class="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600 font-black text-sm">06</span>
                <h2 class="text-2xl font-black tracking-tight text-neutral-900">事後フォロー</h2>
              </div>
              <div class="space-y-3">
                <div v-for="f in followUps" :key="f.task" class="flex gap-4 items-start bg-neutral-50 rounded-lg p-4 border">
                  <span class="flex-shrink-0 text-xs font-bold text-neutral-400 bg-neutral-200 rounded px-2 py-0.5 mt-0.5">{{ f.timing }}</span>
                  <div>
                    <p class="text-sm font-bold text-neutral-800">{{ f.task }}</p>
                    <p class="text-xs text-neutral-500">{{ f.detail }}</p>
                  </div>
                </div>
              </div>
            </section>

            <hr class="border-neutral-100">

            <!-- ============================================================ -->
            <!-- 7. ICTツール活用 -->
            <!-- ============================================================ -->
            <section id="ict-strategy" class="mb-16 pt-12">
              <div class="flex items-center gap-3 mb-6">
                <span class="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-sm">07</span>
                <h2 class="text-2xl font-black tracking-tight text-neutral-900">ICTツール活用と非同期コミュニケーション</h2>
              </div>

              <div class="bg-indigo-50 border border-indigo-200 rounded-xl p-5 md:p-6 mb-8">
                <h3 class="text-base font-bold text-neutral-900 mb-2">基本原則:「文書で共有し、非同期で合意を取る」</h3>
                <p class="text-sm text-neutral-600 leading-relaxed mb-3">関係者全員が同時に集まるMTGは極力避け、<strong class="text-neutral-800">文書ベースの非同期コミュニケーションを主軸</strong>にする。</p>
                <ul class="text-sm text-neutral-600 space-y-1.5 mb-3">
                  <li>&#8226; 運営10名+メンター20名。社会人中心で日程調整は極めて困難</li>
                  <li>&#8226; 同期MTGは<strong class="text-neutral-800">司会者との認識合わせ（1〜2回）</strong>のみ</li>
                </ul>
                <div class="bg-white border rounded-lg p-4 text-sm text-neutral-700 leading-relaxed">
                  <strong>なぜそれで回るのか:</strong> 目的や意義が明確に言語化されていれば、卒業生は自律的に賛同し動いてくれる。<strong>やることを明文化して文章で共有する</strong>ことが、最も効率的かつ確実な合意形成手段。
                </div>
              </div>

              <h3 class="text-lg font-bold text-neutral-800 mb-3">制作物の自動化・AI活用</h3>
              <div class="space-y-2 mb-4">
                <div v-for="tool in aiTools" :key="tool.name" class="flex items-start gap-3 bg-neutral-50 rounded-lg p-3 border">
                  <span class="flex-shrink-0 text-xs font-bold text-white rounded px-2 py-0.5 mt-0.5" :class="tool.badge">{{ tool.method }}</span>
                  <div>
                    <p class="text-sm font-bold text-neutral-800">{{ tool.name }}</p>
                    <p class="text-xs text-neutral-500">{{ tool.detail }}</p>
                  </div>
                </div>
              </div>
              <div class="bg-kaiho-green text-white rounded-xl p-4 text-sm font-medium leading-relaxed">
                統括責任者1名 + AI で制作物の大半をカバー。デザイナー・ライター不要で高品質なアウトプットを実現。
              </div>
            </section>

            <hr class="border-neutral-100">

            <!-- ============================================================ -->
            <!-- 8. 成功のポイント -->
            <!-- ============================================================ -->
            <section id="lessons-learned" class="mb-16 pt-12">
              <div class="flex items-center gap-3 mb-6">
                <span class="flex-shrink-0 w-10 h-10 rounded-xl bg-kaiho-gold/20 flex items-center justify-center text-kaiho-gold font-black text-sm">08</span>
                <h2 class="text-2xl font-black tracking-tight text-neutral-900">成功のポイント・教訓</h2>
              </div>

              <h3 class="text-lg font-bold text-neutral-800 mb-3">やってよかったこと</h3>
              <div class="space-y-2 mb-8">
                <div v-for="(l, i) in lessons" :key="i" class="flex gap-3 items-start">
                  <span class="flex-shrink-0 w-6 h-6 rounded-full bg-kaiho-green/10 text-kaiho-green text-xs font-bold flex items-center justify-center mt-0.5">{{ i + 1 }}</span>
                  <p class="text-sm text-neutral-600 leading-relaxed"><strong class="text-neutral-800">{{ l.title }}</strong> — {{ l.desc }}</p>
                </div>
              </div>

              <h3 class="text-lg font-bold text-neutral-800 mb-3">改善・検討事項</h3>
              <div class="space-y-2 mb-10">
                <div v-for="imp in improvements" :key="imp.title" class="flex gap-2 items-start text-sm text-neutral-600">
                  <span class="text-neutral-300 mt-0.5 flex-shrink-0">&#9679;</span>
                  <p><strong class="text-neutral-700">{{ imp.title }}</strong> — {{ imp.desc }}</p>
                </div>
              </div>

              <h3 class="text-lg font-bold text-neutral-800 mb-4">参加者の声</h3>
              <div class="grid sm:grid-cols-2 gap-3">
                <div v-for="v in voices" :key="v.text" class="bg-neutral-50 border rounded-xl p-4">
                  <p class="text-sm text-neutral-700 leading-relaxed italic mb-2">「{{ v.text }}」</p>
                  <p class="text-xs text-neutral-400 text-right">— {{ v.from }}</p>
                </div>
              </div>
            </section>

            <!-- Footer note -->
            <div class="border-t border-neutral-100 pt-8 mt-12">
              <p class="text-xs text-neutral-400 leading-relaxed">本マニュアルは第1回「キャリア・クロスロード」（2025年12月開催）の実績をもとに作成。個人を特定できる情報は除外し、再現可能なナレッジとして構成しています。次回開催時は、本書をベースに最新の状況に合わせて更新してください。</p>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <section class="py-16 bg-kaiho-cream">
      <div class="max-w-2xl mx-auto px-6 text-center">
        <h2 class="text-2xl font-bold text-neutral-900 mb-4">キャリア・クロスロードを開催しませんか？</h2>
        <p class="text-neutral-600 text-sm mb-8">本マニュアルを参考に、あなたの同窓会でも世代横断型キャリア交流イベントを企画できます。</p>
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
    { name: 'description', content: '同窓会の大同窓会に併設して開催する世代横断型キャリア交流イベント「キャリア・クロスロード」の企画・運営・当日進行の完全ガイド。' },
  ],
})

const toc = [
  { id: 'overview', label: '1. イベント概要' },
  { id: 'timeline', label: '2. 準備タイムライン' },
  { id: 'mentor-recruitment', label: '3. メンター募集・選定' },
  { id: 'participant-recruitment', label: '4. 参加者募集' },
  { id: 'event-day', label: '5. 当日の運営' },
  { id: 'follow-up', label: '6. 事後フォロー' },
  { id: 'ict-strategy', label: '7. ICTツール・非同期戦略' },
  { id: 'lessons-learned', label: '8. 成功のポイント' },
]

const phases = [
  { title: 'Phase 1: 企画設計', timing: '3〜4ヶ月前', tasks: 'コンセプト策定、運営チーム編成、実行委員会承認、会場確保、連絡用Googleグループ作成', color: 'bg-kaiho-green' },
  { title: 'Phase 2: メンター募集', timing: '2〜3ヶ月前', tasks: 'メンター候補リスト作成（P1/P2/P3）、依頼メール送信、回答回収、プロフィール収集、テーブル編成', color: 'bg-kaiho-blue' },
  { title: 'Phase 3: 参加者募集', timing: '1〜2ヶ月前', tasks: 'Webページ・申込フォーム公開、学校への周知依頼、大同窓会参加者への案内、司会者アサイン', color: 'bg-kaiho-orange' },
  { title: 'Phase 4: 直前準備', timing: '2〜3週間前', tasks: '進行資料作成・メンター送付、テーブルキャプテン依頼、会場レイアウト確定、リハーサル調整', color: 'bg-kaiho-purple' },
]

const roles = [
  { name: '統括責任者', count: '1名', desc: '企画全体のディレクション' },
  { name: 'メンター担当', count: '2〜3名', desc: '候補選定・依頼・フォロー' },
  { name: '学校連携担当', count: '1〜2名', desc: '教育関係者が望ましい' },
  { name: '会場・設営担当', count: '2〜3名', desc: 'レイアウト・機器' },
  { name: '広報・Web担当', count: '1〜2名', desc: 'LP・フォーム・SNS' },
  { name: '当日運営', count: '3〜5名', desc: '受付・誘導・タイムキーパー' },
]

const categories = ['医療', '法曹・行政', '経営・起業', 'IT・テクノロジー', '教育・人材', 'メディア・芸能', '芸術・クリエイティブ', '自由交流']

const consultTopics = [
  '具体的な仕事内容や、やりがい・苦労について聞きたい',
  '進路や勉強法について相談したい',
  '中堅・ベテラン卒業生とネットワーキングしたい',
  'キャリアの分岐点（転職・起業など）について聞きたい',
  '生成AI時代に求められるスキルやキャリアについて不安がある',
  '高校・大学時代の過ごし方についてアドバイスが欲しい',
]

const timetable = [
  { time: '11:30', title: 'メンター集合', note: 'ホテル内カフェ' },
  { time: '11:30-12:30', title: 'ランチブリーフィング', note: '軽食・最終共有' },
  { time: '12:00', title: '会場設営開始', note: '宴会場' },
  { time: '12:15', title: '中学生リハーサル', note: '該当する場合' },
  { time: '12:30-13:00', title: '開場・受付', note: null },
  { time: '13:00-13:05', title: 'オープニング', note: '学生MCより全体案内' },
  { time: '13:05-13:20', title: '特別企画：中学生 探究発表', note: '約15分' },
  { time: '13:20-13:50', title: 'Session 1（30分）', note: '第1希望テーブル', highlight: true },
  { time: '13:50-13:55', title: '移動', note: '5分' },
  { time: '13:55-14:25', title: 'Session 2（30分）', note: '第2希望テーブル', highlight: true },
  { time: '14:25-14:30', title: 'クロージング', note: '大同窓会本編への移動案内' },
]

const questionCategories = [
  { name: '仕事のリアル', example: '1日の流れ、大変なこと' },
  { name: '決め方・分岐点', example: '迷った時の軸' },
  { name: '成長のしかた', example: '効果があった習慣' },
  { name: '失敗と立て直し', example: '折れた経験' },
  { name: '向き不向き', example: '向く人の特徴' },
  { name: '今やるべき一歩', example: '今日からできること' },
  { name: '未来・AI時代', example: '変わらない力' },
  { name: '自由質問', example: '自分の言葉で聞く' },
]

const followUps = [
  { timing: '当日', task: '写真共有', detail: 'Googleフォトアルバムを関係者限定で共有' },
  { timing: '1週間', task: '御礼メール', detail: 'メンター・学校関係者へ個別に感謝メール + フォトアルバムURL' },
  { timing: '1週間', task: '事後アンケート', detail: 'Googleフォームで全参加者に配信（回答期限2〜3週間）' },
  { timing: '2〜3週間', task: '振り返り', detail: 'アンケート結果集計、実行委員会での改善点共有、引き継ぎ資料更新' },
]

const aiTools = [
  { name: '参加申込フォーム', method: 'GAS', badge: 'bg-green-600', detail: '回答がスプレッドシートに自動集計。属性別の参加者数をリアルタイム把握' },
  { name: 'メンター依頼メール', method: 'GAS', badge: 'bg-green-600', detail: '候補リストから宛名・業種を差し込んだ個別メールを一括送信' },
  { name: '返信状況の追跡', method: 'GAS', badge: 'bg-green-600', detail: '返信メールを自動検知し「参加可否」を更新。リマインドも自動化' },
  { name: '事前配布マニュアル', method: 'AI/LLM', badge: 'bg-blue-600', detail: 'コンセプト・タイムテーブル等をAIで下書き → 人間がレビュー' },
  { name: '当日の開催スライド', method: 'Gemini', badge: 'bg-purple-600', detail: '司会用スライド・質問パネルをAI画像生成。デザイナー不要' },
  { name: 'イベントWebページ', method: 'ノーコード', badge: 'bg-neutral-600', detail: 'メンタープロフィール、タイムテーブル、申込リンクを構築' },
]

const lessons = [
  { title: '全てを文書化し非同期で合意', desc: '目的と意義を明文化すれば、卒業生は自律的に賛同・行動してくれる' },
  { title: 'GASとAIで制作物を自動化', desc: '統括1名+AIで運営の大半をカバー' },
  { title: '「ビジネスの交差点」として訴求', desc: 'メンター側のメリットを明示し快諾率を高めた' },
  { title: 'テーブルキャプテン制（合図3回）', desc: '進行役の負担を最小化' },
  { title: '中学生の探究発表を柔軟に受入', desc: '世代横断の幅が拡大。逆メンタリング効果も' },
  { title: '30分×2回のローテーション制', desc: '学生が複数の業種のメンターと話せる' },
  { title: '若手卒業生を司会に起用', desc: '在校生と社会人のブリッジ役として機能' },
  { title: '優先度マトリクスで体系的に選定', desc: 'P1/P2/P3の仕組みで効率的に確保' },
]

const improvements = [
  { title: '周知の早期化', desc: '在校生への周知を2ヶ月前から、SNS活用' },
  { title: '参加人数のプランB', desc: '学生が少ない場合のメンター同士交流プランを事前に用意' },
  { title: 'オンライン参加枠', desc: '県外在住メンターもリモート参加できる仕組み' },
  { title: '事後アンケートの当日回収', desc: 'QRコードを会場で掲示' },
  { title: '専任カメラマン', desc: '写真撮影体制を事前にアサイン' },
]

const voices = [
  { text: '大人の皆さんが優しく相談に乗ってくれて将来の不安が軽くなった。将来こんな温かい先輩になりたい', from: '在校生' },
  { text: '自分の興味がある分野以外も知ることができて、新しい学びを得られた', from: '在校生' },
  { text: '中学生の探究発表の論理性に驚いた。母校の主体性の高さを誇りに思う', from: 'ベテラン卒業生' },
  { text: '他業種との交流が刺激になった。これぞ同窓会の醍醐味', from: '中堅卒業生' },
]
</script>
