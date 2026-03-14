<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 bg-kaiho-green-dark flex items-center justify-center">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-kaiho-green-dark opacity-90"></div>
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="text-kaiho-gold text-sm tracking-widest mb-4">Contact</p>
        <h1 class="text-4xl md:text-5xl font-light text-white tracking-tight">お問い合わせ</h1>
      </div>
    </section>

    <!-- 連絡先 -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <p class="section-label">Contact Us</p>
          <h2 class="section-title mb-6">ご連絡方法</h2>
          <div class="divider"></div>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-16">
          <!-- メール -->
          <div class="bg-kaiho-cream/30 rounded-2xl p-8">
            <div class="w-12 h-12 rounded-full bg-kaiho-green/10 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-kaiho-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="font-medium text-neutral-900 mb-2">メール</h3>
            <p class="text-sm text-neutral-600 mb-4">お問い合わせはメールにて受け付けています。</p>
            <p class="text-sm text-neutral-500">※ メールアドレスは準備中です</p>
          </div>

          <!-- SNS -->
          <div class="bg-kaiho-cream/30 rounded-2xl p-8">
            <div class="w-12 h-12 rounded-full bg-kaiho-blue/10 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-kaiho-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 class="font-medium text-neutral-900 mb-2">SNS</h3>
            <p class="text-sm text-neutral-600 mb-4">Facebookページからもご連絡いただけます。</p>
            <a href="https://www.facebook.com/kaihoyuhi/"
               target="_blank" rel="noopener noreferrer"
               class="text-sm text-kaiho-green hover:text-kaiho-green-dark transition-colors">
              Facebook →
            </a>
          </div>
        </div>

        <!-- フォーム系リンク -->
        <div class="mb-16">
          <h3 class="text-lg font-medium text-neutral-900 mb-6">各種応募・申請フォーム</h3>
          <div class="space-y-4">
            <a v-for="form in forms" :key="form.title"
               :href="form.url" target="_blank" rel="noopener noreferrer"
               class="flex items-center justify-between p-6 bg-white border border-neutral-200 rounded-xl hover:border-kaiho-green hover:shadow-sm transition-all duration-200">
              <div>
                <h4 class="font-medium text-neutral-900 text-sm">{{ form.title }}</h4>
                <p class="text-xs text-neutral-500 mt-1">{{ form.description }}</p>
              </div>
              <svg class="w-5 h-5 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        <!-- 関連リンク -->
        <div>
          <h3 class="text-lg font-medium text-neutral-900 mb-6">関連リンク</h3>
          <div class="grid sm:grid-cols-2 gap-4">
            <a v-for="link in relatedLinks" :key="link.title"
               :href="link.url" target="_blank" rel="noopener noreferrer"
               class="flex items-center gap-4 p-4 bg-kaiho-cream/30 rounded-lg hover:bg-kaiho-cream transition-colors">
              <span class="text-xl">{{ link.icon }}</span>
              <div>
                <p class="font-medium text-neutral-900 text-sm">{{ link.title }}</p>
                <p class="text-xs text-neutral-500">{{ link.description }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const forms = [
  {
    title: '議案募集フォーム',
    description: '雄飛会の活動に関する提案を広く募集しています',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdBLp8iJ515aS5wp-h0yemYyrLa9Fl5DQhfwaD9htwdIXqH2Q/viewform',
  },
  {
    title: '運営メンバー募集フォーム',
    description: '雄飛会の運営に興味のある方はこちら',
    url: 'https://docs.google.com/forms/d/19CDuF8fZy74A3_UN62PzLLbfL-Us-DhvHSloVj8QX6M/edit',
  },
]

const relatedLinks = [
  {
    icon: '🏫',
    title: '開邦高校公式サイト',
    description: '沖縄県立開邦高等学校',
    url: 'https://www.kaiho-h.open.ed.jp/',
  },
  {
    icon: '📝',
    title: 'note マガジン',
    description: '雄飛会の活動レポート',
    url: 'https://note.com/kaihoyuuhikai/m/m20c04499fc49',
  },
  {
    icon: '📘',
    title: 'Facebook',
    description: '開邦雄飛会ページ',
    url: 'https://www.facebook.com/kaihoyuhi/',
  },
  {
    icon: '🎉',
    title: '第3回大同窓会サイト',
    description: '2025年12月開催のイベントサイト',
    url: 'https://kaiho-yuuhikai.jp/',
  },
]
</script>
