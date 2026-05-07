<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-emerald-600"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M30 0L60 30L30 60L0 30Z%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-gold mb-4">Volunteer</p>
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">道路清掃ボランティア</h1>
        <p class="text-white/70 text-lg">鳥堀自治会と日程をあわせて交流を図る</p>
      </div>
    </section>

    <!-- Overview -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Overview</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">活動概要</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="prose prose-neutral max-w-none fade-in">
          <p class="text-lg text-neutral-700 leading-relaxed mb-6">
            開邦中高校生・PTA・同窓生が合同で、開邦周辺の道路清掃を行うボランティア活動です。
            寮〜ローソン〜裏門エリアを対象に、地域の環境整備に取り組んでいます。
          </p>
          <p class="text-neutral-600 leading-relaxed mb-6">
            毎月第二日曜日に定期実施。鳥堀自治会と日程をあわせて交流を図りながら、新入生を迎える環境づくりにも貢献しています。
            PTA評議員会で承認を受け、道路管理課との協定書も提出済みです。
          </p>

          <div class="bg-kaiho-green/5 rounded-xl p-6 mt-8">
            <h4 class="font-bold text-neutral-900 text-sm mb-3">活動について</h4>
            <ul class="space-y-2 text-sm text-neutral-600 list-none pl-0">
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-kaiho-green mt-2 flex-shrink-0"></span>
                <span><strong>実施日</strong> — 毎月第二日曜日（鳥堀自治会と日程をあわせて交流）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-kaiho-green mt-2 flex-shrink-0"></span>
                <span><strong>参加対象</strong> — 開邦中高校生・PTA・同窓生（どなたでも参加歓迎）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-kaiho-green mt-2 flex-shrink-0"></span>
                <span><strong>参加方法</strong> — 参加は自由。実施予定はHP・SNS・オープンチャットでお知らせします</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 活動実績 -->
    <section class="py-24 bg-neutral-50">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Archive</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">活動実績</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <!-- 第2回 -->
        <div class="fade-in mb-8">
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
            <div class="flex items-center gap-3 mb-4">
              <span class="bg-kaiho-green text-white text-xs font-bold px-3 py-1 rounded-full">第2回</span>
              <span class="text-neutral-500 text-sm">2026年4月12日（日）</span>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-3">開邦中高周辺ボランティア清掃</h3>
            <p class="text-neutral-600 text-sm leading-relaxed mb-4">
              高校生・PTA・同窓生が世代を超えて参加。学校横のコンビニに集合後、
              カマや竹ぼうきを使いゴミ・雑草の除去を実施しました。
            </p>
            <a
              href="https://note.com/kaihoyuuhikai/n/n2dcb08afcc8d"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 text-kaiho-green font-bold text-sm hover:underline"
            >
              活動報告記事を読む（note） <span>&rarr;</span>
            </a>
          </div>
        </div>

        <!-- 第1回 -->
        <div class="fade-in mb-12">
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
            <div class="flex items-center gap-3 mb-4">
              <span class="bg-kaiho-green/60 text-white text-xs font-bold px-3 py-1 rounded-full">第1回</span>
              <span class="text-neutral-500 text-sm">2026年3月8日（日）</span>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-3">道路ボランティア清掃</h3>
            <p class="text-neutral-600 text-sm leading-relaxed mb-4">
              予定参加者5名のところ約10名が集まり、寮〜ローソン〜裏門の道路清掃（ごみ拾い・草刈り）を実施。
              鳥堀自治会と日程をあわせて交流を図りながら、PTA・在校生・同窓生が合同で参加しました。
            </p>
            <a
              href="https://note.com/kaihoyuuhikai/n/n8e9ffec3a3ff"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 text-kaiho-green font-bold text-sm hover:underline"
            >
              活動報告記事を読む（note） <span>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '道路清掃ボランティア | 開邦雄飛会',
  meta: [
    { name: 'description', content: '開邦中高校生・PTA・同窓生が合同で毎月第二日曜日に実施する道路清掃ボランティア活動。開邦周辺の環境整備に取り組んでいます。' }
  ]
})
</script>
