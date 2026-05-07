<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M30 0L60 30L30 60L0 30Z%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-gold mb-4">Archive</p>
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">大同窓会 過去の記録</h1>
        <p class="text-white/70 text-lg">第1回・第2回 大同窓会のアーカイブ</p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-24 bg-neutral-50">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-neutral-400 mb-4">Past Events</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">開催記録</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="grid md:grid-cols-2 gap-8 fade-in">
          <!-- 第2回 大同窓会 -->
          <a href="https://yuhikai.amebaownd.com/" target="_blank" rel="noopener noreferrer" class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 block group">
            <div class="h-56 relative overflow-hidden">
              <img :src="`${config.app.baseURL}images/daidosoukai-2nd.jpg`" alt="第2回大同窓会" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                <div>
                  <h3 class="text-2xl font-black text-white mb-1">第2回 大同窓会<span class="block text-sm font-medium mt-0.5 text-white/80">2018・10・20 開催</span></h3>
                  <p class="text-white/80 text-sm font-medium">開邦高校同窓会</p>
                </div>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between">
                <p class="text-neutral-500 text-sm">開催報告・アーカイブ</p>
                <svg class="w-5 h-5 text-neutral-400 group-hover:text-kaiho-teal transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </div>
            </div>
          </a>

          <!-- 第1回 大同窓会 -->
          <a :href="`${config.app.baseURL}files/daidosoukai-1st-2nd-materials.pdf`" target="_blank" rel="noopener noreferrer" class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 block group">
            <div class="h-56 relative overflow-hidden">
              <img :src="`${config.app.baseURL}images/daidosoukai-1st.jpg`" alt="第1回大同窓会" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-5">
                <div>
                  <p class="text-white/70 text-xs mb-1">2015・10・3 開催</p>
                  <h3 class="text-2xl font-black text-white mb-1">第1回 大同窓会</h3>
                  <p class="text-kaiho-gold font-medium text-sm">開邦高校同窓会</p>
                </div>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between">
                <p class="text-neutral-500 text-sm">第1回・第2回 開催資料（PDF）</p>
                <svg class="w-5 h-5 text-neutral-400 group-hover:text-kaiho-green transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </div>
            </div>
          </a>
        </div>

        <!-- Back link -->
        <div class="mt-12 text-center fade-in">
          <NuxtLink to="/#archive" class="inline-flex items-center gap-2 text-neutral-500 text-sm hover:text-neutral-900 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            アーカイブに戻る
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
useHead({
  title: '大同窓会 過去の記録 | 開邦雄飛会',
  meta: [
    { name: 'description', content: '開邦雄飛会が主催した第1回（2015年）・第2回（2018年）大同窓会のアーカイブページです。' }
  ]
})
</script>
