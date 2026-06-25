<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-emerald-600"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M30 0L60 30L30 60L0 30Z%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-gold mb-4">News</p>
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">令和8年度 開邦雄飛会<br>総会イベント（案）</h1>
        <div class="inline-flex items-center gap-2 bg-kaiho-gold/20 border border-kaiho-gold/40 rounded-full px-5 py-2 text-sm text-kaiho-gold font-bold mt-2">
          <span class="w-2 h-2 bg-kaiho-gold rounded-full animate-pulse"></span>
          2026年7月18日（土）開催
        </div>
      </div>
    </section>

    <!-- Overview -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Overview</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">開催概要</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="prose prose-neutral max-w-none fade-in">
          <p class="text-lg text-neutral-700 leading-relaxed mb-8">
            開邦雄飛会では、令和8年度の総会イベント（講演会＋総会＋懇親会）を下記の通り開催いたします。3部構成で実施します。同窓生の皆さまのご参加をお待ちしております。
          </p>
        </div>

        <!-- Schedule details -->
        <div class="space-y-6 fade-in">

          <!-- 第1部：講演会 -->
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
            <div class="flex gap-5 items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-kaiho-green/10 rounded-xl flex items-center justify-center text-kaiho-green font-black text-lg">
                1
              </div>
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-xs font-bold bg-kaiho-green/10 text-kaiho-green px-3 py-0.5 rounded-full">第1部</span>
                  <h3 class="text-xl font-bold text-neutral-900">講演会</h3>
                </div>
                <dl class="mt-3 space-y-1 text-neutral-600">
                  <div class="flex gap-3">
                    <dt class="text-sm font-bold text-neutral-500 w-14 shrink-0">時間</dt>
                    <dd class="text-sm">16:00 ～ 16:45（開場 15:30）</dd>
                  </div>
                  <div class="flex gap-3">
                    <dt class="text-sm font-bold text-neutral-500 w-14 shrink-0">場所</dt>
                    <dd class="text-sm">若狭公民館 2階 第一研修室</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <!-- 第2部：総会 -->
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
            <div class="flex gap-5 items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-kaiho-gold/10 rounded-xl flex items-center justify-center text-kaiho-gold font-black text-lg">
                2
              </div>
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-xs font-bold bg-kaiho-gold/10 text-kaiho-gold px-3 py-0.5 rounded-full">第2部</span>
                  <h3 class="text-xl font-bold text-neutral-900">総会</h3>
                </div>
                <dl class="mt-3 space-y-1 text-neutral-600">
                  <div class="flex gap-3">
                    <dt class="text-sm font-bold text-neutral-500 w-14 shrink-0">時間</dt>
                    <dd class="text-sm">17:00 ～ 17:30</dd>
                  </div>
                  <div class="flex gap-3">
                    <dt class="text-sm font-bold text-neutral-500 w-14 shrink-0">場所</dt>
                    <dd class="text-sm">若狭公民館 2階 第一研修室</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <!-- 第3部：懇親会 -->
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
            <div class="flex gap-5 items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-kaiho-teal/10 rounded-xl flex items-center justify-center text-kaiho-teal font-black text-lg">
                3
              </div>
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-xs font-bold bg-kaiho-teal/10 text-kaiho-teal px-3 py-0.5 rounded-full">第3部</span>
                  <h3 class="text-xl font-bold text-neutral-900">懇親会</h3>
                </div>
                <dl class="mt-3 space-y-1 text-neutral-600">
                  <div class="flex gap-3">
                    <dt class="text-sm font-bold text-neutral-500 w-14 shrink-0">時間</dt>
                    <dd class="text-sm">18:30 〜</dd>
                  </div>
                  <div class="flex gap-3">
                    <dt class="text-sm font-bold text-neutral-500 w-14 shrink-0">場所</dt>
                    <dd class="text-sm">バイキング居酒屋　リオ</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

        </div>

        <!-- 参加申込 -->
        <div class="mt-10 fade-in">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScSTYoGsTI_qphPQNHhy8l_Wpy3LrPf3HWBg0s1hAujbiRaHw/viewform"
            target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-kaiho-green text-white font-bold rounded-full hover:bg-kaiho-green-dark transition-all duration-300 shadow-lg text-lg">
            参加申込フォームはこちら
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Agenda -->
    <section class="py-24 bg-neutral-50">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Agenda</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">議事内容（予定）</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="space-y-6 fade-in">

          <!-- 収支報告 -->
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
            <div class="flex gap-5 items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-kaiho-green/10 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-kaiho-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>
                </svg>
              </div>
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-xs font-bold bg-kaiho-green/10 text-kaiho-green px-3 py-0.5 rounded-full">第1号議案</span>
                  <h3 class="text-xl font-bold text-neutral-900">収支報告</h3>
                </div>
                <p class="text-neutral-600 leading-relaxed">
                  前年度の収入・支出の実績を報告します。開邦雄飛応援金の運用状況を含む、同窓会全体の財務状況を透明性高く共有します。
                </p>
              </div>
            </div>
          </div>

          <!-- 予算案 -->
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
            <div class="flex gap-5 items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-kaiho-gold/10 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-kaiho-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                </svg>
              </div>
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-xs font-bold bg-kaiho-gold/10 text-kaiho-gold px-3 py-0.5 rounded-full">第2号議案</span>
                  <h3 class="text-xl font-bold text-neutral-900">予算案</h3>
                </div>
                <p class="text-neutral-600 leading-relaxed">
                  新年度（令和8年度）の活動計画に基づく予算案を審議・承認します。各事業への配分や開邦雄飛応援金の運用方針についてもご説明します。
                </p>
              </div>
            </div>
          </div>

          <!-- 会則変更 -->
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
            <div class="flex gap-5 items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-kaiho-blue/10 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-kaiho-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                </svg>
              </div>
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-xs font-bold bg-kaiho-blue/10 text-kaiho-blue px-3 py-0.5 rounded-full">第3号議案</span>
                  <h3 class="text-xl font-bold text-neutral-900">会則変更</h3>
                </div>
                <p class="text-neutral-600 leading-relaxed">
                  組織体制の整備・活動実態への対応を目的とした会則改正案を提案します。変更箇所および改正理由について詳細に説明します。
                </p>
              </div>
            </div>
          </div>

          <!-- 新体制 -->
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
            <div class="flex gap-5 items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-kaiho-purple/10 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-kaiho-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                </svg>
              </div>
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-xs font-bold bg-kaiho-purple/10 text-kaiho-purple px-3 py-0.5 rounded-full">第4号議案</span>
                  <h3 class="text-xl font-bold text-neutral-900">新体制について</h3>
                </div>
                <p class="text-neutral-600 leading-relaxed">
                  令和8年度の新役員体制を報告します。各役職の担当者・役割分担・運営方針についてご説明します。
                </p>
              </div>
            </div>
          </div>

          <!-- 新事業 -->
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
            <div class="flex gap-5 items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
                </svg>
              </div>
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-xs font-bold bg-emerald-100 text-emerald-600 px-3 py-0.5 rounded-full">第5号議案</span>
                  <h3 class="text-xl font-bold text-neutral-900">新事業について</h3>
                </div>
                <p class="text-neutral-600 leading-relaxed">
                  令和8年度に新たに取り組む事業・プロジェクトについてご説明します。在校生支援・同窓生ネットワーク・地域貢献の各領域における新たな取り組みをご紹介します。
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="py-24 bg-kaiho-green text-white">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-4xl font-black mb-6">ご参加お待ちしております</h2>
        <p class="text-white/70 mb-10 leading-relaxed">
          参加ご希望の方は、下記の参加申込フォームよりお申し込みください。<br>
          ご不明な点はお問い合わせフォームよりご連絡ください。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScSTYoGsTI_qphPQNHhy8l_Wpy3LrPf3HWBg0s1hAujbiRaHw/viewform"
            target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-kaiho-green font-bold rounded-full hover:bg-kaiho-gold hover:text-white transition-all duration-300 shadow-lg">
            参加申込フォーム
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
          <NuxtLink to="/contact"
            class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-kaiho-green transition-all duration-300">
            お問い合わせ
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '令和8年度 総会イベント | 開邦雄飛会',
  meta: [
    { name: 'description', content: '開邦雄飛会 令和8年度総会イベント（講演会＋総会＋懇親会）（案）。2026年7月18日（土）16:00〜開催。若狭公民館およびバイキング居酒屋リオにて。' }
  ]
})
</script>
