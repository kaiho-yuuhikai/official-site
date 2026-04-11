<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-emerald-600"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M30 0L60 30L30 60L0 30Z%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-gold mb-4">Creators</p>
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight">クリエイター一覧</h1>
        <p class="mt-6 text-white/70 text-sm leading-relaxed">
          開邦高校卒業生の中から、各分野で活躍するクリエイターを紹介します。
        </p>
      </div>
    </section>

    <!-- クリエイター一覧 -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Alumni Creators</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">同窓生クリエイター</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 fade-in">
          <div v-for="creator in creators" :key="creator.name"
               class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100">
            <!-- 写真 -->
            <div class="aspect-[3/4] overflow-hidden bg-neutral-100">
              <img v-if="creator.photo"
                   :src="baseURL + creator.photo"
                   :alt="creator.name"
                   class="w-full h-full object-cover object-top" />
              <div v-else class="w-full h-full flex items-center justify-center">
                <span class="text-6xl font-black text-neutral-200">{{ creator.initial }}</span>
              </div>
            </div>
            <!-- 情報 -->
            <div class="p-6">
              <div class="flex items-center gap-2 flex-wrap mb-1">
                <span class="text-[11px] font-bold bg-kaiho-green/10 text-kaiho-green px-2 py-0.5 rounded-full">{{ creator.generation }}</span>
                <span class="text-[11px] font-bold bg-kaiho-gold/10 text-kaiho-gold px-2 py-0.5 rounded-full">{{ creator.department }}</span>
              </div>
              <h3 class="text-xl font-black text-neutral-900 mt-2 mb-3">{{ creator.name }}</h3>
              <p class="text-sm text-neutral-600 leading-relaxed">{{ creator.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const baseURL = useRuntimeConfig().app.baseURL

const creators = [
  {
    name: '辺土 百々花',
    generation: '33期',
    department: '芸術科',
    initial: '辺',
    photo: 'images/creators/hento-momoka.jpg',
    bio: '沖縄県立芸術大学大学院修士課程1年。大学院では民族音楽学を専攻し、沖縄の愛唱歌《てぃんさぐぬ花》について研究しています。',
  },
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
