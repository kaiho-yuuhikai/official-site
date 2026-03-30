<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-emerald-600"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2020/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M30 0L60 30L30 60L0 30Z%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-gold mb-4">News</p>
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight">お知らせ</h1>
      </div>
    </section>

    <!-- News List -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">

        <div class="space-y-0">
          <div v-for="(item, i) in newsItems" :key="i"
            class="border-b border-neutral-100 last:border-0">
            <NuxtLink v-if="item.link" :to="item.link"
              class="group flex gap-6 items-start py-7 px-4 -mx-4 rounded-lg hover:bg-neutral-50 transition-colors">
              <time class="text-sm text-neutral-400 flex-shrink-0 w-28 mt-0.5">{{ item.date }}</time>
              <div class="flex-1 flex items-start justify-between gap-4">
                <div>
                  <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-[10px] bg-kaiho-green/10 text-kaiho-green px-2 py-0.5 rounded-full font-medium">{{ item.category }}</span>
                    <span v-if="item.isNew" class="text-[10px] bg-kaiho-gold text-white px-2 py-0.5 rounded-full font-bold">NEW</span>
                  </div>
                  <h3 class="text-neutral-900 font-medium group-hover:text-kaiho-green transition-colors">{{ item.title }}</h3>
                  <p v-if="item.summary" class="text-sm text-neutral-500 mt-1 leading-relaxed">{{ item.summary }}</p>
                </div>
                <svg class="w-5 h-5 text-neutral-300 group-hover:text-kaiho-green flex-shrink-0 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </NuxtLink>

            <div v-else class="flex gap-6 items-start py-7 px-4 -mx-4">
              <time class="text-sm text-neutral-400 flex-shrink-0 w-28 mt-0.5">{{ item.date }}</time>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="text-[10px] bg-kaiho-green/10 text-kaiho-green px-2 py-0.5 rounded-full font-medium">{{ item.category }}</span>
                  <span v-if="item.isNew" class="text-[10px] bg-kaiho-gold text-white px-2 py-0.5 rounded-full font-bold">NEW</span>
                </div>
                <h3 class="text-neutral-900 font-medium">{{ item.title }}</h3>
                <p v-if="item.summary" class="text-sm text-neutral-500 mt-1 leading-relaxed">{{ item.summary }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'お知らせ | 開邦雄飛会',
  meta: [
    { name: 'description', content: '開邦雄飛会からのお知らせ・イベント情報' }
  ]
})

const newsItems = [
  {
    date: '2026.03.30',
    category: '総会',
    title: '令和8年度 定期総会 開催予定（準備中）',
    summary: '収支報告・予算案・会則変更・新体制・新事業についてご説明します。',
    link: '/news/soukai',
    isNew: true,
  },
  {
    date: '2026.03.15',
    category: 'お知らせ',
    title: '雄飛会 運営打合せを開催（若狭公民館）',
    summary: null,
    link: null,
    isNew: false,
  },
  {
    date: '2026.03.08',
    category: '活動',
    title: 'PTA連携 道路ボランティア清掃を初実施',
    summary: null,
    link: null,
    isNew: false,
  },
  {
    date: '2026.03.01',
    category: '活動',
    title: '開邦高校卒業式にて同窓会入会式を実施',
    summary: null,
    link: null,
    isNew: false,
  },
  {
    date: '2026.02.20',
    category: 'お知らせ',
    title: '開邦雄飛会 新体制発足・運営メンバー募集開始',
    summary: null,
    link: null,
    isNew: false,
  },
]
</script>
