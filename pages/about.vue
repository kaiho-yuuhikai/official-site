<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-emerald-600"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M30 0L60 30L30 60L0 30Z%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-gold mb-4">About</p>
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight">雄飛会について</h1>
      </div>
    </section>

    <!-- 理念・目的 -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Philosophy</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">理念・目的</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="prose prose-neutral max-w-none fade-in">
          <p class="text-lg text-neutral-700 leading-relaxed mb-8">
            「雄飛」&#8212; 大きく羽ばたくこと。開邦高校同窓会「雄飛会」は、
            卒業生と在校生、そして学校をつなぐ架け橋として活動しています。
          </p>

          <h3 class="text-xl font-bold text-neutral-900 mt-12 mb-6">活動方針</h3>
          <div class="space-y-6">
            <div v-for="(policy, i) in policies" :key="i" class="flex gap-4">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-kaiho-green/10 text-kaiho-green flex items-center justify-center text-sm font-bold">
                {{ i + 1 }}
              </span>
              <div>
                <h4 class="font-bold text-neutral-900">{{ policy.title }}</h4>
                <p class="text-sm text-neutral-600 mt-1">{{ policy.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 会則 -->
    <section class="py-24 bg-neutral-50">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Bylaws</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">会則</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm fade-in">
          <p class="text-neutral-600 text-sm leading-relaxed mb-6">
            雄飛会の会則は現在改定案を策定中です。改定の基本方針は以下のとおりです。
          </p>

          <div class="bg-kaiho-green/5 rounded-xl p-6 mb-6">
            <h4 class="font-bold text-neutral-900 text-sm mb-3">会則改定の方針</h4>
            <ul class="space-y-2 text-sm text-neutral-600">
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-kaiho-green mt-2 flex-shrink-0"></span>
                <span>現在の運営実態に即した組織体制に整理する</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-kaiho-green mt-2 flex-shrink-0"></span>
                <span>役員の負担を軽減し、継続可能な運営体制を構築する</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-kaiho-green mt-2 flex-shrink-0"></span>
                <span>事務局と事業実行体制を明確化し、事業を進めやすくする</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-kaiho-green mt-2 flex-shrink-0"></span>
                <span>同窓会に関わる人材の裾野を広げる</span>
              </li>
            </ul>
          </div>

          <div class="space-y-4">
            <div v-for="(section, i) in bylawSections" :key="i" class="border border-neutral-200 rounded-lg">
              <button
                @click="toggleBylaw(i)"
                class="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-neutral-50 transition-colors"
              >
                <span class="font-bold text-neutral-900 text-sm">{{ section.title }}</span>
                <svg
                  class="w-5 h-5 text-neutral-400 transition-transform duration-200"
                  :class="{ 'rotate-180': openBylaw === i }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="openBylaw === i" class="px-6 pb-4">
                <p class="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">{{ section.content }}</p>
              </div>
            </div>
          </div>

          <div class="mt-6 flex flex-wrap gap-3">
            <a href="https://docs.google.com/document/d/1LerLzJ6cDvyfGX6xOLf4N0BXx3LNIQKmrYi8nkHidpM/edit"
               target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center gap-2 text-sm text-kaiho-green font-bold hover:text-kaiho-green-dark transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              会則改定案（Google Docs）
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 沿革 -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">History</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">沿革</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="space-y-8 fade-in">
          <div v-for="event in timeline" :key="event.year" class="flex gap-6">
            <div class="flex-shrink-0 w-20 text-right">
              <span class="text-sm font-bold text-kaiho-green">{{ event.year }}</span>
            </div>
            <div class="flex-shrink-0 relative">
              <div class="w-3 h-3 rounded-full bg-kaiho-green mt-1"></div>
              <div class="absolute top-4 left-1.5 w-px h-full bg-neutral-200 -z-10"></div>
            </div>
            <div class="pb-8">
              <h4 class="font-bold text-neutral-900 text-sm">{{ event.title }}</h4>
              <p v-if="event.description" class="text-sm text-neutral-600 mt-1">{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const openBylaw = ref<number | null>(null)

const toggleBylaw = (index: number) => {
  openBylaw.value = openBylaw.value === index ? null : index
}

const policies = [
  {
    title: '在校生への教育支援',
    description: '探究活動基金やメンター制度を通じて、在校生の学びと成長を支援します。',
  },
  {
    title: '同窓生ネットワークの構築・維持',
    description: '世代や地域を越えたつながりを構築し、定期的な交流の場を設けます。',
  },
  {
    title: '学校・地域への貢献',
    description: '母校と沖縄の地域社会の発展に貢献する活動を行います。',
  },
  {
    title: '次世代リーダーの育成',
    description: 'キャリア・クロスロードなどを通じて、未来を担う人材の育成に取り組みます。',
  },
  {
    title: '支部を通じた全国・海外展開',
    description: '東京・関西・海外の各支部を通じて、全国的なネットワークを展開します。',
  },
]

const bylawSections = [
  {
    title: '第1章 総則（名称・所在地・目的・事業）',
    content: '第1条（名称）本会は開邦雄飛会と称する。\n第2条（所在地）本会の所在地は沖縄県立開邦高等学校内に置く。ただし、役員会の決議により変更することができる。\n第3条（目的）本会は会員相互の親睦を図るとともに、母校の発展に寄与することを目的とする。\n第4条（事業）本会は前条の目的を達成するため、必要な事業を行う。',
  },
  {
    title: '第2章 会員',
    content: '第5条（会員）本会は卒業生及び本会の目的に賛同する者をもって会員とする。\n\n※ 詳細は改定案を審議中です。',
  },
  {
    title: '第3章 役員',
    content: '役員構成の見直しを検討中です。\n\n【改定の方向性】\n・役員体制の若返りを図る\n・引継ぎが自然にできる仕組みにする\n・実態に合った、無理のない体制にする\n\n※ 詳細は改定案を審議中です。',
  },
  {
    title: '第4章 総会',
    content: '総会の開催・議決・定足数について規定します。\n\n※ 詳細は改定案を審議中です。',
  },
  {
    title: '第5章 会計',
    content: '会計年度・収支報告・監査について規定します。\n\n※ 詳細は改定案を審議中です。',
  },
]

const timeline = [
  { year: '1986年', title: '沖縄県立開邦高等学校 開校' },
  { year: '1989年', title: '第1期生 卒業' },
  { year: '2015年', title: '第1回 大同窓会 開催', description: '創立30周年記念' },
  { year: '2020年', title: '第2回 大同窓会 開催', description: '創立35周年記念' },
  { year: '2025年12月', title: '第3回 大同窓会 開催', description: '創立40周年記念。参加者537名。キャリア・クロスロード初開催（メンター40名超、在校生22名）。' },
  { year: '2026年2月', title: '雄飛会 新体制準備開始', description: '新事業アンケート実施。会則改定案の策定。27名の運営メンバーが参画。' },
  { year: '2026年3月', title: '同窓会入会式・PTA連携開始', description: '卒業式にて同窓会入会式を実施。PTA連携による道路ボランティア清掃を初実施。公式サイト開設。' },
]

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible')
    })
  }, { threshold: 0.15 })
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
})
</script>
