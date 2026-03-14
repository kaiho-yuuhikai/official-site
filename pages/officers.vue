<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 bg-kaiho-green-dark flex items-center justify-center">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-kaiho-green-dark opacity-90"></div>
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="text-kaiho-gold text-sm tracking-widest mb-4">Officers</p>
        <h1 class="text-4xl md:text-5xl font-light text-white tracking-tight">役員名簿</h1>
      </div>
    </section>

    <!-- 役員一覧 -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <p class="section-label">Executive Board</p>
          <h2 class="section-title mb-6">現役員</h2>
          <div class="divider"></div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="officer in officers" :key="officer.name"
               class="bg-kaiho-cream/30 rounded-2xl p-8 text-center hover:shadow-md transition-shadow duration-300">
            <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-kaiho-green/10 flex items-center justify-center">
              <span class="text-3xl text-kaiho-green/60">{{ officer.name.charAt(0) }}</span>
            </div>
            <p class="text-xs text-kaiho-green font-medium tracking-wider mb-1">{{ officer.role }}</p>
            <h3 class="text-lg font-medium text-neutral-900">{{ officer.name }}</h3>
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
    <section class="py-24 bg-kaiho-cream/30">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <p class="section-label">Team Structure</p>
          <h2 class="section-title mb-6">運営チーム構成</h2>
          <div class="divider"></div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="team in teams" :key="team.name"
               class="bg-white rounded-xl p-6 border-l-4"
               :class="team.borderClass">
            <h3 class="font-medium text-neutral-900 mb-2">{{ team.name }}</h3>
            <p class="text-sm text-neutral-600">{{ team.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 募集CTA -->
    <section class="py-24 bg-kaiho-green-dark">
      <div class="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-light text-white mb-6">運営メンバーを募集しています</h2>
        <p class="text-white/70 text-sm leading-relaxed mb-8">
          雄飛会の運営に興味のある方は、ぜひご応募ください。<br>
          卒業年度や居住地は問いません。
        </p>
        <a href="https://docs.google.com/forms/d/19CDuF8fZy74A3_UN62PzLLbfL-Us-DhvHSloVj8QX6M/edit"
           target="_blank" rel="noopener noreferrer"
           class="btn-white">
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
  {
    name: '企画チーム',
    description: 'イベントやプロジェクトの企画・立案を担当します。',
    borderClass: 'border-kaiho-blue',
  },
  {
    name: '広報チーム',
    description: 'note記事の執筆、SNS運用、対外的な情報発信を担います。',
    borderClass: 'border-kaiho-orange',
  },
  {
    name: '渉外チーム',
    description: 'メンター確保、学校・外部団体との連携を推進します。',
    borderClass: 'border-kaiho-teal',
  },
  {
    name: '財務チーム',
    description: '会計管理、収支報告、基金運営を担当します。',
    borderClass: 'border-kaiho-purple',
  },
  {
    name: 'IT/デジタルチーム',
    description: '公式サイト運営、データ管理、デジタルツール整備を行います。',
    borderClass: 'border-kaiho-green',
  },
]
</script>
