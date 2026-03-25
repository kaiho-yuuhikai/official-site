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
          <div class="p-8 md:p-12">
            <form @submit.prevent="submitForm" class="space-y-8">
              <!-- 基本情報 -->
              <div class="space-y-6">
                <h3 class="text-lg font-bold text-neutral-900 border-l-4 border-kaiho-blue pl-4">基本情報</h3>
                
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-bold text-neutral-700 mb-2">お名前 <span class="text-red-500">*</span></label>
                    <input type="text" required v-model="form.name" class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-kaiho-blue focus:ring-2 focus:ring-kaiho-blue/20 outline-none transition-all">
                  </div>
                  <div>
                    <label class="block text-sm font-bold text-neutral-700 mb-2">卒業期 <span class="text-red-500">*</span></label>
                    <select required v-model="form.generation" class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-kaiho-blue focus:ring-2 focus:ring-kaiho-blue/20 outline-none transition-all">
                      <option value="" disabled>選択してください</option>
                      <option v-for="i in 40" :key="i" :value="i">{{ i }}期</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-bold text-neutral-700 mb-2">メールアドレス <span class="text-red-500">*</span></label>
                  <input type="email" required v-model="form.email" class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-kaiho-blue focus:ring-2 focus:ring-kaiho-blue/20 outline-none transition-all" placeholder="example@mail.com">
                </div>

                <div>
                  <label class="block text-sm font-bold text-neutral-700 mb-2">現住所（都道府県・海外など） <span class="text-red-500">*</span></label>
                  <input type="text" required v-model="form.region" class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-kaiho-blue focus:ring-2 focus:ring-kaiho-blue/20 outline-none transition-all" placeholder="例：沖縄県、東京都、アメリカ合衆国など">
                </div>
              </div>

              <!-- 専門・キャリア情報 -->
              <div class="space-y-6 pt-8 border-t border-neutral-100">
                <h3 class="text-lg font-bold text-neutral-900 border-l-4 border-kaiho-blue pl-4">専門・キャリア情報</h3>
                
                <div>
                  <label class="block text-sm font-bold text-neutral-700 mb-2">職業・肩書き <span class="text-red-500">*</span></label>
                  <input type="text" required v-model="form.title" class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-kaiho-blue focus:ring-2 focus:ring-kaiho-blue/20 outline-none transition-all" placeholder="例：ITエンジニア、医師、公務員、大学院生など">
                </div>

                <div>
                  <label class="block text-sm font-bold text-neutral-700 mb-2">専門分野（複数選択可） <span class="text-red-500">*</span></label>
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <label v-for="cat in categories" :key="cat.value" class="flex items-center gap-2 p-3 rounded-xl border border-neutral-100 hover:bg-neutral-50 cursor-pointer transition-colors">
                      <input type="checkbox" v-model="form.expertise" :value="cat.value" class="w-4 h-4 text-kaiho-blue rounded border-neutral-300 focus:ring-kaiho-blue">
                      <span class="text-sm text-neutral-700">{{ cat.label }}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-bold text-neutral-700 mb-2">キャリアや経験の概要</label>
                  <textarea v-model="form.bio" rows="4" class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-kaiho-blue focus:ring-2 focus:ring-kaiho-blue/20 outline-none transition-all" placeholder="後輩たちに伝えたい経験や、現在の活動について簡単にご記入ください。"></textarea>
                </div>
              </div>

              <!-- サポート内容 -->
              <div class="space-y-6 pt-8 border-t border-neutral-100">
                <h3 class="text-lg font-bold text-neutral-900 border-l-4 border-kaiho-blue pl-4">可能なサポート内容</h3>
                
                <div class="space-y-3">
                  <label v-for="support in supportTypes" :key="support.id" class="flex items-start gap-3 p-4 rounded-xl border border-neutral-100 hover:bg-neutral-50 cursor-pointer transition-colors">
                    <input type="checkbox" v-model="form.supports" :value="support.id" class="mt-1 w-4 h-4 text-kaiho-blue rounded border-neutral-300 focus:ring-kaiho-blue">
                    <div>
                      <span class="block text-sm font-bold text-neutral-900">{{ support.label }}</span>
                      <span class="block text-xs text-neutral-500 mt-1">{{ support.description }}</span>
                    </div>
                  </label>
                </div>
              </div>

              <div class="pt-8">
                <button type="submit" :disabled="submitting" class="w-full py-4 bg-kaiho-blue text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-3">
                  <svg v-if="submitting" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                  <span>{{ submitting ? '送信中...' : '登録内容を送信する' }}</span>
                </button>
                <p class="text-center text-xs text-neutral-400 mt-4 leading-relaxed">
                  送信された内容は雄飛会事務局にて確認し、追ってご連絡差し上げます。<br>
                  個人情報はメンター活動の目的以外には使用いたしません。
                </p>
              </div>
            </form>
          </div>
        </div>

        <!-- Success Message (hidden by default) -->
        <div v-if="submitted" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div class="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl scale-in">
            <div class="w-20 h-20 bg-kaiho-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-kaiho-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h2 class="text-2xl font-black text-neutral-900 mb-2">送信完了！</h2>
            <p class="text-neutral-500 text-sm mb-8">メンター登録へのご協力ありがとうございます。事務局より順次ご連絡を差し上げます。</p>
            <NuxtLink to="/" class="block w-full py-3 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-700 transition-colors">
              トップページに戻る
            </NuxtLink>
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
