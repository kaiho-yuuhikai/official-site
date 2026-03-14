<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center bg-kaiho-green-dark overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-kaiho-green-dark opacity-90"></div>
      <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p class="text-kaiho-gold text-sm tracking-widest mb-6">開邦高校同窓会</p>
        <h1 class="text-5xl md:text-7xl font-light text-white tracking-tight mb-6">
          雄飛会
        </h1>
        <p class="text-xl md:text-2xl text-white/80 font-light mb-4">
          邦を開き、世界に羽ばたく
        </p>
        <p class="text-white/60 text-sm md:text-base max-w-2xl mx-auto mb-12 leading-relaxed">
          沖縄県立開邦高等学校の卒業生がつくるネットワーク。<br class="hidden md:block">
          在校生支援・同窓生交流・社会貢献を3つの柱に活動しています。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/about" class="btn-white">
            雄飛会について
          </NuxtLink>
          <NuxtLink to="/contact" class="btn-outline border-white text-white hover:bg-white hover:text-kaiho-green-dark">
            お問い合わせ
          </NuxtLink>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16">
          <p class="section-label">Mission</p>
          <h2 class="section-title mb-6">活動の3つの柱</h2>
          <div class="divider mx-auto"></div>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="pillar in pillars" :key="pillar.title"
               class="text-center p-8 rounded-2xl bg-kaiho-cream/50 hover:bg-kaiho-cream transition-colors duration-300">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl"
                 :class="pillar.bgClass">
              {{ pillar.icon }}
            </div>
            <h3 class="text-lg font-medium text-neutral-900 mb-3">{{ pillar.title }}</h3>
            <p class="text-sm text-neutral-600 leading-relaxed">{{ pillar.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="py-24 bg-kaiho-cream/30">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16">
          <p class="section-label">Projects</p>
          <h2 class="section-title mb-6">注力事業</h2>
          <div class="divider mx-auto"></div>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="project in projects" :key="project.title"
               class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4"
               :class="project.borderClass">
            <span v-if="project.badge"
                  class="inline-block px-3 py-1 text-xs font-medium rounded-full mb-4"
                  :class="project.badgeClass">
              {{ project.badge }}
            </span>
            <h3 class="text-lg font-medium text-neutral-900 mb-3">{{ project.title }}</h3>
            <p class="text-sm text-neutral-600 leading-relaxed">{{ project.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- News Section -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16">
          <p class="section-label">News</p>
          <h2 class="section-title mb-6">お知らせ</h2>
          <div class="divider mx-auto"></div>
        </div>

        <div class="max-w-3xl mx-auto space-y-6">
          <p class="text-center text-neutral-500 text-sm">お知らせは準備中です。</p>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/news" class="btn-outline">
            すべてのお知らせ
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-kaiho-green-dark">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-light text-white mb-6">雄飛会に参加しませんか？</h2>
        <p class="text-white/70 text-sm md:text-base max-w-2xl mx-auto mb-12 leading-relaxed">
          開邦高校の卒業生であれば、どなたでも雄飛会の活動に参加できます。<br>
          メンター登録や運営メンバーの募集も行っています。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/contact" class="btn-white">
            お問い合わせ
          </NuxtLink>
          <a href="https://docs.google.com/forms/d/19CDuF8fZy74A3_UN62PzLLbfL-Us-DhvHSloVj8QX6M/edit"
             target="_blank" rel="noopener noreferrer"
             class="btn-outline border-white text-white hover:bg-white hover:text-kaiho-green-dark">
            運営メンバー募集
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const pillars = [
  {
    icon: '🎓',
    title: '在校生支援',
    description: '探究活動基金やメンター制度を通じて、在校生の学びと成長を支援します。',
    bgClass: 'bg-kaiho-blue/10',
  },
  {
    icon: '🤝',
    title: '同窓生ネットワーク',
    description: '世代や地域を超えた卒業生同士のつながりを築き、交流の場を提供します。',
    bgClass: 'bg-kaiho-green/10',
  },
  {
    icon: '🌍',
    title: '社会貢献',
    description: '学校・地域社会への貢献を通じて、開邦の精神を未来につなぎます。',
    bgClass: 'bg-kaiho-purple/10',
  },
]

const projects = [
  {
    title: '探究活動基金',
    description: '在校生の探究活動を資金面で支援する基金。研究費や学会参加費を助成します。',
    badge: '準備中',
    borderClass: 'border-kaiho-blue',
    badgeClass: 'bg-kaiho-blue/10 text-kaiho-blue',
  },
  {
    title: 'メンター制度',
    description: '卒業生が自身の経験を活かし、在校生のキャリア形成や学びをサポートします。',
    badge: '準備中',
    borderClass: 'border-kaiho-green',
    badgeClass: 'bg-kaiho-green/10 text-kaiho-green',
  },
  {
    title: 'キャリア・クロスロード',
    description: '在校生と卒業生が直接対話し、多様なキャリアの選択肢に触れるイベントです。',
    badge: '開催実績あり',
    borderClass: 'border-kaiho-orange',
    badgeClass: 'bg-kaiho-orange/10 text-kaiho-orange',
  },
]
</script>
