<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-emerald-600"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M30 0L60 30L30 60L0 30Z%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-gold mb-4">Officers</p>
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight">役員名簿</h1>
      </div>
    </section>

    <!-- 役員一覧 -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Executive Board</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">現役員</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 fade-in">
          <div v-for="officer in officers" :key="officer.name"
               class="card-hover bg-gradient-to-br from-kaiho-green/5 to-emerald-50 rounded-2xl p-8 text-center border border-kaiho-green/10">
            <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-kaiho-green to-emerald-400 flex items-center justify-center">
              <span class="text-3xl text-white font-black">{{ officer.name.charAt(0) }}</span>
            </div>
            <p class="text-xs text-kaiho-green font-bold tracking-wider mb-1">{{ officer.role }}</p>
            <h3 class="text-lg font-bold text-neutral-900">{{ officer.name }}</h3>
            <p class="text-sm text-neutral-500 mt-1">{{ officer.generation }}</p>
            <p v-if="officer.department" class="text-xs text-neutral-400 mt-1">{{ officer.department }}</p>
          </div>
        </div>

        <p class="text-center text-neutral-500 text-sm mt-12">
          ※ 役員名簿は現在整備中です。確定次第、更新いたします。
        </p>
      </div>
    </section>

    <!-- 運営チーム -->
    <section class="py-24 bg-neutral-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Team Structure</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">運営チーム構成</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-in">
          <div v-for="team in teams" :key="team.name"
               class="card-hover bg-white rounded-2xl p-6 shadow-sm border-t-4"
               :class="team.borderClass">
            <h3 class="font-bold text-neutral-900 mb-2">{{ team.name }}</h3>
            <p class="text-sm text-neutral-600">{{ team.description }}</p>
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
const officers = [
  { name: '（会長）', role: '会長', generation: '―', department: '' },
  { name: '上間 祥子', role: '副会長', generation: '16期', department: '' },
  { name: '神谷 乗治', role: 'IT/デジタル', generation: '14期', department: '' },
]

const teams = [
  { name: '企画チーム', description: 'イベントやプロジェクトの企画・立案を担当します。', borderClass: 'border-kaiho-blue' },
  { name: '広報チーム', description: 'note記事の執筆、SNS運用、対外的な情報発信を担います。', borderClass: 'border-kaiho-orange' },
  { name: '渉外チーム', description: 'メンター確保、学校・外部団体との連携を推進します。', borderClass: 'border-kaiho-teal' },
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
