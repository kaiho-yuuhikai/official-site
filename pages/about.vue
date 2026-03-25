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
                <span>同窓会に関わる人材の裾野を広げる（ゆるやかな参加の仕組み）</span>
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

    <!-- 財務状況 -->
    <section class="py-24 bg-neutral-50 border-t border-neutral-100">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Financial Status</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">財務状況</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm fade-in">
          <div class="prose prose-neutral max-w-none mb-12">
            <p class="text-neutral-700 leading-relaxed">
              雄飛会では、次世代への円滑なバトンタッチと組織の透明性確保のため、財務状況の適正化を進めています。2026年3月時点の資産概況は以下の通りです。現在、過去6年間の収支整理を進めており、2026年度の総会にて正式に報告・承認を行う予定です。
            </p>
          </div>

          <!-- Financial Summary -->
          <div class="bg-neutral-50 rounded-2xl p-12 text-center border border-neutral-100 mb-12">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <svg class="w-10 h-10 text-kaiho-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            </div>
            <h3 class="text-2xl font-bold text-neutral-900 mb-4">財務概況は会員限定公開です</h3>
            <p class="text-neutral-500 max-w-md mx-auto leading-relaxed mb-8">
              雄飛会では、組織運営の透明性とセキュリティの両立のため、具体的な数字を含む財務報告は会員の皆様にのみ公開しております。
            </p>
            <div class="bg-white rounded-xl p-6 border border-neutral-200 inline-block text-left">
              <h4 class="font-bold text-sm text-neutral-900 mb-3 flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-kaiho-green rounded-full"></span>
                閲覧方法
              </h4>
              <ul class="text-xs text-neutral-600 space-y-2">
                <li>・年次総会での事業報告・決算報告</li>
                <li>・会員向けメーリングリストでの配布</li>
                <li>・事務局への個別お問い合わせ（本人確認後）</li>
              </ul>
            </div>
          </div>

          <div class="bg-kaiho-green/5 rounded-2xl p-8 text-center border border-kaiho-green/10">
            <p class="text-sm text-neutral-600 mb-2">現在のフェーズ</p>
            <p class="text-3xl md:text-4xl font-black text-kaiho-green">財務適正化・透明性向上</p>
            <p class="text-xs text-neutral-400 mt-4 leading-relaxed">
              ※ 2026年6月30日の決算に向けて、適正な管理・運用体制への移行を進めています。
            </p>
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
    title: '学校・先生方の負担軽減',
    description: '多忙な教職員の皆様をサポートし、学校現場の負担を減らす視点を持って活動します。',
  },
  {
    title: '在校生への教育支援・ICT活用',
    description: '特別活動基金やメンター制度、ICT活用を通じて、生徒の探究活動と成長を支援します。',
  },
  {
    title: '同窓生ネットワークの「ゆるやかな」構築',
    description: '世代や地域を越え、興味のある人がプロジェクト単位で気軽に参加できる仕組みを創ります。',
  },
  {
    title: '地域社会への貢献',
    description: '道路ボランティア清掃など、PTAや生徒と協力して地域に根ざした活動を行います。',
  },
  {
    title: '次世代リーダーの育成',
    description: 'キャリア・クロスロードなどを通じて、未来を担う人材の育成に取り組みます。',
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
    content: '役員構成の見直しを検討中です。\n\n【改定の方向性】\n・ピラミッド型からプロジェクト型組織への移行\n・役員体制の若返りを図る（実務リーダーを10期〜20期以降へ）\n・引継ぎが自然にできる仕組みにする\n\n※ 詳細は改定案を審議中です。',
  },
  {
    title: '第4章 総会',
    content: '総会のリブランディング（交流メイン）やウェブ総会の導入を検討しています。\n\n※ 詳細は改定案を審議中です。',
  },
  {
    title: '第5章 会計',
    content: '会計年度・収支報告・監査について規定します。資産の適正な引き継ぎを目指します。\n\n※ 詳細は改定案を審議中です。',
  },
]

const timeline = [
  { year: '1986年', title: '沖縄県立開邦高等学校 開校' },
  { year: '1989年', title: '開邦雄飛会 設立', description: '第1期生 卒業。初代 赤嶺太一会長 就任。' },
  { year: '2006年', title: '雄飛会 再始動', description: '「弁が岳の集い」（ななさんどー）に合わせて活動を本格再開。' },
  { year: '2010年', title: '第2代 上里直司会長 就任' },
  { year: '2011年', title: '創立記念日 特別授業 開始', description: '同窓生講師による授業。現在も続くメイン活動。' },
  { year: '2014年', title: '雄飛会 設立25周年記念パーティ 開催' },
  { year: '2015年', title: '第1回 大同窓会 開催', description: '' },
  { year: '2018年', title: '第2回 大同窓会 開催', description: '' },
  { year: '2019年7月', title: '令和元年度 雄飛会総会 開催', description: '那覇市泉崎にて開催。以降、コロナ禍により中断。' },
  { year: '2025年12月', title: '第3回 大同窓会 開催', description: '創立40周年記念。参加者537名。キャリア・クロスロード初開催。' },
  { year: '2026年3月', title: '組織再編会議・ボランティア開始', description: '若狭公民館にて活性化会議を開催。那覇市と協定を結び、PTA・生徒合同の道路ボランティア清掃を初実施。' },
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
