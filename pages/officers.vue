<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-emerald-600"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M30 0L60 30L30 60L0 30Z%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-gold mb-4">Officers &amp; Members</p>
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight">役員・運営メンバー</h1>
      </div>
    </section>

    <!-- 役員一覧 -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Executive Board</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">役員</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 fade-in">
          <div v-for="officer in executives" :key="officer.name"
               class="card-hover bg-gradient-to-br from-kaiho-green/5 to-emerald-50 rounded-2xl p-8 text-center border border-kaiho-green/10">
            <div class="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center"
                 :class="officer.bgClass">
              <span class="text-3xl text-white font-black">{{ officer.initial }}</span>
            </div>
            <p class="text-xs text-kaiho-green font-bold tracking-wider mb-1">{{ officer.role }}</p>
            <h3 class="text-lg font-bold text-neutral-900">{{ officer.name }}</h3>
            <p class="text-sm text-neutral-500 mt-1">{{ officer.generation }}</p>
            <p v-if="officer.note" class="text-xs text-neutral-400 mt-2">{{ officer.note }}</p>
          </div>
        </div>

        <p class="text-center text-neutral-500 text-sm mt-12">
          ※ 役員体制は2026年3月の運営打合せにて確定予定です。
        </p>
      </div>
    </section>

    <!-- 新体制メンバー -->
    <section class="py-24 bg-neutral-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">New Team</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">新体制メンバー</h2>
          <div class="section-divider" style="margin:0"></div>
          <p class="text-neutral-500 text-sm mt-6 max-w-2xl">
            第3回大同窓会（2025年12月）を経て、雄飛会の新体制に参画しているメンバーです。
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 fade-in">
          <div v-for="member in members" :key="member.name"
               class="bg-white rounded-xl p-5 shadow-sm border border-neutral-100 flex items-center gap-4">
            <div class="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
                 :class="member.bgClass">
              {{ member.initial }}
            </div>
            <div class="min-w-0">
              <h4 class="font-bold text-neutral-900 text-sm truncate">{{ member.name }}</h4>
              <p class="text-xs text-neutral-500">{{ member.generation }}</p>
              <p v-if="member.note" class="text-[10px] text-neutral-400 truncate">{{ member.note }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 運営チーム -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Team Structure</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">運営チーム構成</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-in">
          <div v-for="team in teams" :key="team.name"
               class="card-hover bg-neutral-50 rounded-2xl p-6 shadow-sm border-t-4"
               :class="team.borderClass">
            <h3 class="font-bold text-neutral-900 mb-2">{{ team.name }}</h3>
            <p class="text-sm text-neutral-600">{{ team.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PTA連携 -->
    <section class="py-24 bg-neutral-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Collaboration</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">PTA連携</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="max-w-3xl mx-auto fade-in">
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
            <p class="text-neutral-600 text-sm leading-relaxed mb-4">
              開邦高校PTAと連携し、在校生の学習環境の改善や地域貢献活動に取り組んでいます。
            </p>
            <div class="bg-kaiho-green/5 rounded-xl p-6">
              <h4 class="font-bold text-neutral-900 text-sm mb-3">活動実績</h4>
              <ul class="space-y-2 text-sm text-neutral-600">
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-kaiho-green mt-2 flex-shrink-0"></span>
                  <span><strong>道路ボランティア清掃</strong>（2026/3/8）— 寮〜ローソン〜裏門の道路清掃。PTA・在校生・同窓生が合同で実施</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-kaiho-green mt-2 flex-shrink-0"></span>
                  <span><strong>道路ボランティア協定</strong> — PTA評議員会で承認、道路管理課との協定書を提出済み</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-kaiho-green mt-2 flex-shrink-0"></span>
                  <span>今後は土曜模試に合わせた定期実施を計画</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 募集CTA -->
    <section class="py-24 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-emerald-600">
      <div class="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-black text-white mb-6">運営メンバーを募集しています</h2>
        <p class="text-white/70 text-sm leading-relaxed mb-8">
          雄飛会の運営に興味のある方は、ぜひご応募ください。<br>
          卒業年度や居住地は問いません。
        </p>
        <a href="https://docs.google.com/forms/d/19CDuF8fZy74A3_UN62PzLLbfL-Us-DhvHSloVj8QX6M/edit"
           target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center justify-center px-8 py-4 bg-white text-kaiho-green font-bold rounded-full hover:bg-kaiho-gold hover:text-white transition-all duration-300 shadow-lg">
          応募フォームを開く
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const colorClasses = [
  'bg-gradient-to-br from-kaiho-green to-emerald-400',
  'bg-gradient-to-br from-kaiho-blue to-blue-400',
  'bg-gradient-to-br from-kaiho-gold to-amber-400',
  'bg-gradient-to-br from-kaiho-purple to-purple-400',
  'bg-gradient-to-br from-kaiho-orange to-orange-400',
  'bg-gradient-to-br from-kaiho-teal to-teal-400',
]

function getBgClass(index: number) {
  return colorClasses[index % colorClasses.length]
}

const executives = [
  { name: '上里 直司', role: '会長', generation: '3期', initial: '上', bgClass: 'bg-gradient-to-br from-kaiho-green to-emerald-400', note: '' },
  { name: '上間 祥子', role: '副会長・広報', generation: '16期', initial: '上', bgClass: 'bg-gradient-to-br from-kaiho-blue to-blue-400', note: '新事業推進・note運営' },
  { name: '我謝 直也', role: '事務局', generation: '4期', initial: '我', bgClass: 'bg-gradient-to-br from-kaiho-gold to-amber-400', note: '運営打合せ幹事' },
  { name: '神谷 乗治', role: 'IT/デジタル', generation: '14期', initial: '神', bgClass: 'bg-gradient-to-br from-kaiho-purple to-purple-400', note: '公式サイト制作・運営' },
]

const members = [
  { name: '宮城 潤', generation: '3期', initial: '宮', bgClass: getBgClass(0), note: 'Zoom環境整備' },
  { name: '宮里 治', generation: '3期', initial: '宮', bgClass: getBgClass(1), note: '' },
  { name: '喜屋武 幸容', generation: '4期', initial: '喜', bgClass: getBgClass(2), note: '' },
  { name: '喜友名 智子', generation: '7期', initial: '喜', bgClass: getBgClass(3), note: '' },
  { name: '堀之内 美耶子', generation: '12期', initial: '堀', bgClass: getBgClass(4), note: '' },
  { name: '国吉 聡志', generation: '13期', initial: '国', bgClass: getBgClass(5), note: '学校連携' },
  { name: '又吉 吟', generation: '15期', initial: '又', bgClass: getBgClass(0), note: '' },
  { name: '泉川 良基', generation: '18期', initial: '泉', bgClass: getBgClass(1), note: '教員・探究活動' },
  { name: '崎原 有希', generation: '19期', initial: '崎', bgClass: getBgClass(2), note: '' },
  { name: '砂川 佳慧', generation: '20期', initial: '砂', bgClass: getBgClass(3), note: '' },
  { name: '知念 拓', generation: '20期', initial: '知', bgClass: getBgClass(4), note: '' },
  { name: '山藤 唯美子', generation: '23期', initial: '山', bgClass: getBgClass(5), note: '' },
  { name: '瀬長 卓哉', generation: '24期', initial: '瀬', bgClass: getBgClass(0), note: '' },
  { name: '具志 日南子', generation: '26期', initial: '具', bgClass: getBgClass(1), note: '' },
  { name: '嶺井 健治', generation: '—', initial: '嶺', bgClass: getBgClass(2), note: '探究活動提案' },
  { name: '辺土 百々花', generation: '33期', initial: '辺', bgClass: getBgClass(3), note: '' },
  { name: '我喜屋 奏利', generation: '36期', initial: '我', bgClass: getBgClass(4), note: '' },
  { name: '宮城 心輝', generation: '—', initial: '宮', bgClass: getBgClass(5), note: '' },
  { name: '諌山 幸枝', generation: '—', initial: '諌', bgClass: getBgClass(0), note: '' },
  { name: '金城 安一', generation: 'PTA', initial: '金', bgClass: getBgClass(1), note: 'PTA連携・ボランティア' },
]

const teams = [
  { name: '企画チーム', description: 'イベントやプロジェクトの企画・立案を担当します。', borderClass: 'border-kaiho-blue' },
  { name: '広報チーム', description: 'note記事の執筆、SNS運用、対外的な情報発信を担います。', borderClass: 'border-kaiho-orange' },
  { name: '渉外チーム', description: 'メンター確保、学校・PTA・外部団体との連携を推進します。', borderClass: 'border-kaiho-teal' },
  { name: '財務チーム', description: '会計管理、収支報告、基金運営を担当します。', borderClass: 'border-kaiho-purple' },
  { name: 'IT/デジタルチーム', description: '公式サイト運営、データ管理、デジタルツール整備を行います。', borderClass: 'border-kaiho-green' },
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
