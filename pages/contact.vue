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
        <p class="text-white/70 mt-4 text-sm">ご質問・ご意見・ご要望はお気軽にどうぞ</p>
      </div>
    </section>

    <!-- お問い合わせフォーム -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">

        <!-- フォームヘッダー -->
        <div class="mb-12 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Contact Form</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">お問い合わせフォーム</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <!-- Google フォームカード -->
        <div class="bg-white rounded-3xl shadow-xl border border-neutral-100 overflow-hidden fade-in mb-12">
          <div class="p-8 md:p-12 text-center">
            <div class="w-20 h-20 bg-kaiho-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-kaiho-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <h2 class="text-2xl font-black text-neutral-900 mb-4">Googleフォームでお問い合わせ</h2>
            <p class="text-neutral-500 mb-8 leading-relaxed">
              お問い合わせは、以下の外部Googleフォームより受け付けております。<br>
              お手数ですが、フォームに必要事項をご記入の上、送信をお願いいたします。
            </p>

            <a href="https://docs.google.com/forms/d/e/1FAIpQLSc2JB1aFBpvBEyMy8TCoN9LBoTn9BB3B9udw4gOLuJo8YQWiQ/viewform?usp=dialog"
               target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center justify-center px-8 py-4 bg-kaiho-green text-white font-bold rounded-xl hover:bg-kaiho-green-dark transition-all shadow-lg hover:shadow-xl gap-3 w-full sm:w-auto">
              <span>お問い合わせフォームを開く</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>

            <p class="text-xs text-neutral-400 mt-8 leading-relaxed">
              ※ 送信された内容は雄飛会事務局にて確認し、追ってご連絡差し上げます。<br>
              個人情報はお問い合わせへの対応以外には使用いたしません。詳しくは<NuxtLink to="/privacy" class="text-kaiho-green hover:underline">プライバシーポリシー</NuxtLink>をご覧ください。
            </p>
          </div>
        </div>

        <!-- SNS連絡先 -->
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Other Ways</p>
          <h2 class="text-3xl font-black tracking-tight mb-6">その他のご連絡方法</h2>
          <div class="section-divider" style="margin:0 0 2rem"></div>

          <div class="grid md:grid-cols-2 gap-8">
            <!-- SNS -->
            <div class="card-hover bg-gradient-to-br from-kaiho-blue/5 to-blue-50 rounded-2xl p-8 border border-kaiho-blue/10">
              <div class="w-12 h-12 rounded-2xl bg-kaiho-blue/10 flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-kaiho-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 class="font-bold text-neutral-900 mb-2">SNS</h3>
              <p class="text-sm text-neutral-600 mb-4">FacebookページのDMやコメントからもご連絡いただけます。</p>
              <a href="https://www.facebook.com/kaihoyuhi/"
                 target="_blank" rel="noopener noreferrer"
                 class="inline-flex items-center gap-2 text-sm text-kaiho-blue font-bold hover:text-blue-700 transition-colors">
                Facebook ↗
              </a>
            </div>

            <!-- 応募フォーム -->
            <div class="card-hover bg-gradient-to-br from-kaiho-green/5 to-emerald-50 rounded-2xl p-8 border border-kaiho-green/10">
              <div class="w-12 h-12 rounded-2xl bg-kaiho-green/10 flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-kaiho-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 class="font-bold text-neutral-900 mb-2">参加・支援フォーム</h3>
              <p class="text-sm text-neutral-600 mb-4">運営メンバー参加・寄付・支援の申し出はこちらから。</p>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdmpqzISxWHhyDvHzmWPMEZpfx8YUpUdfAW_4JjebFlnvWoYA/viewform?usp=dialog"
                 target="_blank" rel="noopener noreferrer"
                 class="inline-flex items-center gap-2 text-sm text-kaiho-green font-bold hover:text-kaiho-green-dark transition-colors">
                フォームを開く ↗
              </a>
            </div>
          </div>
        </div>

        <!-- フォーム系リンク -->
        <div class="mb-16 fade-in">
          <h3 class="text-lg font-bold text-neutral-900 mb-6">各種応募・申請フォーム</h3>
          <div class="space-y-4">
            <!-- 通常フォーム -->
            <a v-for="form in forms.filter(f => !f.comingSoon)" :key="form.title"
               :href="form.url" :target="form.internal ? undefined : '_blank'" :rel="form.internal ? undefined : 'noopener noreferrer'"
               class="card-hover flex items-center justify-between p-6 bg-white border border-neutral-200 rounded-2xl hover:border-kaiho-green transition-all duration-200">
              <div>
                <h4 class="font-bold text-neutral-900 text-sm">{{ form.title }}</h4>
                <p class="text-xs text-neutral-500 mt-1">{{ form.description }}</p>
              </div>
              <svg class="w-5 h-5 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <!-- 準備中フォーム -->
            <div v-for="form in forms.filter(f => f.comingSoon)" :key="form.title"
               class="flex items-center justify-between p-6 bg-neutral-50 border border-neutral-200 rounded-2xl opacity-60 cursor-not-allowed">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <h4 class="font-bold text-neutral-500 text-sm">{{ form.title }}</h4>
                  <span class="text-xs bg-neutral-200 text-neutral-500 px-2 py-0.5 rounded-full font-bold">準備中</span>
                </div>
                <p class="text-xs text-neutral-400">{{ form.description }}</p>
              </div>
              <svg class="w-5 h-5 text-neutral-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
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
    title: 'お問い合わせフォーム',
    description: '雄飛会へのご質問・ご意見・ご要望はこちらから',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSc2JB1aFBpvBEyMy8TCoN9LBoTn9BB3B9udw4gOLuJo8YQWiQ/viewform?usp=dialog',
    internal: false,
    comingSoon: false,
  },
  {
    title: 'メンター登録フォーム',
    description: 'あなたの経験を後輩に伝えるメンターとして登録いただけます（サイト内フォーム）',
    url: '/mentor/registration',
    internal: true,
    comingSoon: false,
  },
  {
    title: '運営メンバー参加フォーム',
    description: '雄飛会の運営・活動に参加したい方はこちらから',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdmpqzISxWHhyDvHzmWPMEZpfx8YUpUdfAW_4JjebFlnvWoYA/viewform?usp=dialog',
    internal: false,
    comingSoon: false,
  },
  {
    title: '寄付・支援フォーム',
    description: '雄飛会支援基金への寄付・支援の申し出はこちら（受付準備中）',
    url: '',
    internal: false,
    comingSoon: true,
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
