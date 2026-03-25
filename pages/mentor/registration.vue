<template>
  <div>
    <!-- Hero -->
    <section class="relative py-24 md:py-32 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-blue-dark via-kaiho-blue to-indigo-600"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M30 0L60 30L30 60L0 30Z%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-gold mb-4">Registration</p>
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight">メンター登録</h1>
        <p class="text-white/80 mt-6 text-lg">あなたの経験を、母校の後輩たちの未来のために。</p>
      </div>
    </section>

    <!-- Form Section -->
    <section class="py-24 bg-white">
      <div class="max-w-3xl mx-auto px-6 lg:px-8">
        <div class="bg-white rounded-3xl shadow-xl border border-neutral-100 overflow-hidden fade-in">
          <div class="p-8 md:p-12 text-center">
            <div class="w-20 h-20 bg-kaiho-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-kaiho-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <h2 class="text-2xl font-black text-neutral-900 mb-4">Googleフォームで登録する</h2>
            <p class="text-neutral-500 mb-8 leading-relaxed">
              メンター登録（入学期の入力等）は、以下の外部Googleフォームより受け付けております。<br>
              お手数ですが、フォームに必要事項をご記入の上、送信をお願いいたします。
            </p>
            
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdBztK-V7H795yXqhakLZcqWMnH2QUE4auiE99N3cToM4eAnw/viewform?usp=publish-editor" 
               target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center justify-center px-8 py-4 bg-kaiho-blue text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl gap-3 w-full sm:w-auto">
              <span>登録フォームを開く</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>

            <p class="text-xs text-neutral-400 mt-8 leading-relaxed">
              ※ 送信された内容は雄飛会事務局にて確認し、追ってご連絡差し上げます。<br>
              個人情報はメンター活動の目的以外には使用いたしません。
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const submitting = ref(false)
const submitted = ref(false)

const form = reactive({
  name: '',
  generation: '',
  email: '',
  region: '',
  title: '',
  expertise: [],
  bio: '',
  supports: []
})

const categories = [
  { value: 'business', label: 'ビジネス・起業' },
  { value: 'research', label: '研究・学術' },
  { value: 'arts', label: '芸術・文化' },
  { value: 'tech', label: 'IT・テクノロジー' },
  { value: 'medical', label: '医療・福祉' },
  { value: 'education', label: '教育・行政' },
]

const supportTypes = [
  { id: 'lecture', label: '特設授業での講話', description: '母校でのキャリア講演や実社会の経験談' },
  { id: 'inquiry', label: '探究活動アドバイス', description: '生徒の研究テーマへの助言・フィードバック' },
  { id: 'consultation', label: 'オンライン相談', description: '進路や専門分野に関する個別・グループ相談' },
  { id: 'internship', label: 'インターン受入', description: '職場見学や短期インターンの受け入れ検討' }
]

const submitForm = async () => {
  submitting.value = true
  // 実際の実装ではここでAPIを叩く
  await new Promise(resolve => setTimeout(resolve, 1500))
  submitting.value = false
  submitted.value = true
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible')
    })
  }, { threshold: 0.15 })
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
})
</script>

<style scoped>
.scale-in {
  animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
