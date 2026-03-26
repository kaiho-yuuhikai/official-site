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

        <!-- 送信完了メッセージ -->
        <div v-if="submitted" class="mb-12 fade-in">
          <div class="bg-kaiho-green/10 border border-kaiho-green/20 rounded-2xl p-8 text-center">
            <div class="w-16 h-16 bg-kaiho-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-kaiho-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">お問い合わせを受け付けました</h3>
            <p class="text-neutral-600 text-sm">メールクライアントが開きましたら、内容をご確認の上お送りください。<br>通常3〜5営業日以内にご返信いたします。</p>
            <button @click="submitted = false" class="mt-6 text-sm text-kaiho-green hover:text-kaiho-green-dark font-medium transition-colors">
              別のお問い合わせをする →
            </button>
          </div>
        </div>

        <div v-else>
          <!-- フォームヘッダー -->
          <div class="mb-12 fade-in">
            <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Contact Form</p>
            <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">お問い合わせフォーム</h2>
            <div class="section-divider" style="margin:0"></div>
          </div>

          <!-- フォーム -->
          <form @submit.prevent="handleSubmit" class="space-y-6 fade-in">
            <!-- お名前 -->
            <div>
              <label for="name" class="block text-sm font-bold text-neutral-900 mb-2">
                お名前 <span class="text-red-500">*</span>
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="山田 太郎"
                class="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-kaiho-green/30 focus:border-kaiho-green transition-colors"
              />
            </div>

            <!-- メールアドレス -->
            <div>
              <label for="email" class="block text-sm font-bold text-neutral-900 mb-2">
                メールアドレス <span class="text-red-500">*</span>
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="example@email.com"
                class="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-kaiho-green/30 focus:border-kaiho-green transition-colors"
              />
            </div>

            <!-- お問い合わせ種別 -->
            <div>
              <label for="category" class="block text-sm font-bold text-neutral-900 mb-2">
                お問い合わせ種別 <span class="text-red-500">*</span>
              </label>
              <select
                id="category"
                v-model="form.category"
                required
                class="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-kaiho-green/30 focus:border-kaiho-green transition-colors bg-white"
              >
                <option value="" disabled>選択してください</option>
                <option value="general">一般的なお問い合わせ</option>
                <option value="mentor">メンター制度について</option>
                <option value="fund">雄飛会支援基金・寄付について</option>
                <option value="event">イベント・活動について</option>
                <option value="membership">会員・入会について</option>
                <option value="media">取材・メディア関係</option>
                <option value="other">その他</option>
              </select>
            </div>

            <!-- 件名 -->
            <div>
              <label for="subject" class="block text-sm font-bold text-neutral-900 mb-2">
                件名 <span class="text-red-500">*</span>
              </label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                required
                placeholder="お問い合わせの件名"
                class="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-kaiho-green/30 focus:border-kaiho-green transition-colors"
              />
            </div>

            <!-- メッセージ -->
            <div>
              <label for="message" class="block text-sm font-bold text-neutral-900 mb-2">
                メッセージ <span class="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="6"
                placeholder="お問い合わせ内容をご記入ください"
                class="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-kaiho-green/30 focus:border-kaiho-green transition-colors resize-none"
              ></textarea>
            </div>

            <!-- 注記 -->
            <div class="bg-neutral-50 rounded-xl p-4 text-xs text-neutral-500 leading-relaxed">
              <p>送信ボタンを押すと、メールクライアントが開きます。内容をご確認の上、お送りください。</p>
              <p class="mt-1">ご入力いただいた情報は、お問い合わせへの対応のみに利用します。詳しくは<NuxtLink to="/privacy" class="text-kaiho-green hover:underline">プライバシーポリシー</NuxtLink>をご覧ください。</p>
            </div>

            <!-- 送信ボタン -->
            <div class="flex justify-end">
              <button
                type="submit"
                class="inline-flex items-center gap-3 px-8 py-4 bg-kaiho-green text-white font-bold rounded-full hover:bg-kaiho-green-dark transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                メールで送信する
              </button>
            </div>
          </form>
        </div>

        <!-- 区切り -->
        <div class="my-20 border-t border-neutral-100"></div>

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
            <a v-for="form in forms" :key="form.title"
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
const submitted = ref(false)

const form = reactive({
  name: '',
  email: '',
  category: '',
  subject: '',
  message: '',
})

const categoryLabels: Record<string, string> = {
  general: '一般的なお問い合わせ',
  mentor: 'メンター制度について',
  fund: '雄飛会支援基金・寄付について',
  event: 'イベント・活動について',
  membership: '会員・入会について',
  media: '取材・メディア関係',
  other: 'その他',
}

const handleSubmit = () => {
  const to = 'info@kaiho-yuuhikai.jp'
  const subject = encodeURIComponent(`[雄飛会お問い合わせ] ${form.subject}`)
  const body = encodeURIComponent(
    `【お名前】${form.name}\n` +
    `【メールアドレス】${form.email}\n` +
    `【種別】${categoryLabels[form.category] || form.category}\n\n` +
    `【お問い合わせ内容】\n${form.message}\n\n` +
    `---\n開邦雄飛会公式サイト お問い合わせフォームより`
  )
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
  submitted.value = true
}

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
