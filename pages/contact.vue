<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-emerald-600"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M30 0L60 30L30 60L0 30Z%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-gold mb-4">Contact</p>
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight">お問い合わせ</h1>
      </div>
    </section>

    <!-- 連絡先 -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Contact Us</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">ご連絡方法</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-16 fade-in">
          <!-- メール -->
          <div class="card-hover bg-gradient-to-br from-kaiho-green/5 to-emerald-50 rounded-2xl p-8 border border-kaiho-green/10">
            <div class="w-12 h-12 rounded-2xl bg-kaiho-green/10 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-kaiho-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="font-bold text-neutral-900 mb-2">メール</h3>
            <p class="text-sm text-neutral-600 mb-4">お問い合わせはメールにて受け付けています。</p>
            <p class="text-sm text-neutral-500">※ メールアドレスは準備中です</p>
          </div>

          <!-- SNS -->
          <div class="card-hover bg-gradient-to-br from-kaiho-blue/5 to-blue-50 rounded-2xl p-8 border border-kaiho-blue/10">
            <div class="w-12 h-12 rounded-2xl bg-kaiho-blue/10 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-kaiho-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 class="font-bold text-neutral-900 mb-2">SNS</h3>
            <p class="text-sm text-neutral-600 mb-4">Facebookページからもご連絡いただけます。</p>
            <a href="https://www.facebook.com/kaihoyuhi/"
               target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center gap-2 text-sm text-kaiho-blue font-bold hover:text-blue-700 transition-colors">
              Facebook &rarr;
            </a>
          </div>
        </div>

        <!-- フォーム系リンク -->
        <div class="mb-16 fade-in">
          <h3 class="text-lg font-bold text-neutral-900 mb-6">各種応募・申請フォーム</h3>
          <div class="space-y-4">
            <a v-for="form in forms" :key="form.title"
               :href="form.url" target="_blank" rel="noopener noreferrer"
               class="card-hover flex items-center justify-between p-6 bg-white border border-neutral-200 rounded-2xl hover:border-kaiho-green transition-all duration-200">
              <div>
                <h4 class="font-bold text-neutral-900 text-sm">{{ form.title }}</h4>
                <p class="text-xs text-neutral-500 mt-1">{{ form.description }}</p>
              </div>
              <svg class="w-5 h-5 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        <!-- 関連リンク -->
        <div class="fade-in">
          <h3 class="text-lg font-bold text-neutral-900 mb-6">関連リンク</h3>
          <div class="grid sm:grid-cols-2 gap-4">
            <a v-for="link in relatedLinks" :key="link.title"
               :href="link.url" target="_blank" rel="noopener noreferrer"
               class="card-hover flex items-center gap-4 p-4 bg-neutral-50 rounded-2xl hover:bg-kaiho-green/5 transition-colors border border-neutral-100">
              <span class="text-xl">{{ link.icon }}</span>
              <div>
                <p class="font-bold text-neutral-900 text-sm">{{ link.title }}</p>
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
    title: 'メンター登録フォーム',
    description: 'あなたの経験を後輩に伝えるメンターとして登録いただけます（サイト内フォーム）',
    url: '/mentor/registration',
    internal: true,
  },
  {
    title: '参加・支援フォーム（運営・寄付）',
    description: '雄飛会への参加（運営）や寄付・支援の申し出はこちらから',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdmpqzISxWHhyDvHzmWPMEZpfx8YUpUdfAW_4JjebFlnvWoYA/viewform?usp=dialog',
    internal: false,
  },
]

const relatedLinks = [
  { icon: '🏫', title: '開邦高校公式サイト', description: '沖縄県立開邦高等学校', url: 'https://www.kaiho-h.open.ed.jp/' },
  { icon: '📝', title: 'note マガジン', description: '雄飛会の活動レポート', url: 'https://note.com/kaihoyuuhikai/m/m20c04499fc49' },
  { icon: '📘', title: 'Facebook', description: '開邦雄飛会ページ', url: 'https://www.facebook.com/kaihoyuhi/' },
  { icon: '📷', title: 'Instagram', description: '開邦雄飛会', url: 'https://www.instagram.com/kaihoyuuhikai/' },
  { icon: '🎉', title: '第3回大同窓会サイト', description: '2025年12月開催のイベントサイト', url: 'https://kaiho-yuuhikai.jp/' },
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
