<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-emerald-600"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M30 0L60 30L30 60L0 30Z%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-gold mb-4">Activity</p>
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">創立記念特設授業</h1>
        <p class="text-white/70 text-lg">2011年から続く、雄飛会のメイン活動</p>
      </div>
    </section>

    <!-- Overview -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Overview</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">活動概要</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="grid md:grid-cols-2 gap-12 items-center fade-in">
          <div class="prose prose-neutral max-w-none">
            <p class="text-lg text-neutral-700 leading-relaxed mb-8">
              同窓会主催の「創立記念特設授業」は、各分野で活躍する卒業生が講師として母校を訪れ、在校生に「授業」という形でキャリアの歩みや想いを届けるプログラムです。
            </p>
            <p class="text-neutral-600 leading-relaxed mb-8">
              開邦高校時代、大学時代、働くようになって今に至るまでの歩み、心の柱としてきた思いを後輩たちに届けます。キャリア選択の参考になるようなリアルな話を、同じ学び舎を歩んだ先輩から直接聞ける貴重な機会です。
            </p>
          </div>
          <div class="flex justify-center">
            <img
              :src="`${config.app.baseURL}images/special-lecture-2025.jpeg`"
              alt="令和7年度 創立記念特設授業 告知フライヤー"
              class="w-full max-w-sm rounded-2xl shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 2025年開催概要 -->
    <section class="py-24 bg-neutral-50">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">2025</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">2025年 開催概要</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm fade-in">
          <div class="space-y-6">
            <div class="flex gap-4 items-start">
              <span class="flex-shrink-0 w-7 h-7 rounded-full bg-kaiho-green/10 text-kaiho-green flex items-center justify-center text-xs font-bold">①</span>
              <div>
                <p class="font-bold text-neutral-900 text-sm">日時</p>
                <p class="text-neutral-600 text-sm mt-1">2025年10月31日（金）14:45〜16:35（14:00 学校集合）</p>
              </div>
            </div>
            <div class="flex gap-4 items-start">
              <span class="flex-shrink-0 w-7 h-7 rounded-full bg-kaiho-green/10 text-kaiho-green flex items-center justify-center text-xs font-bold">②</span>
              <div>
                <p class="font-bold text-neutral-900 text-sm">場所</p>
                <p class="text-neutral-600 text-sm mt-1">開邦高校＆中学 新校舎（2025年7月に移転済み）</p>
              </div>
            </div>
            <div class="flex gap-4 items-start">
              <span class="flex-shrink-0 w-7 h-7 rounded-full bg-kaiho-green/10 text-kaiho-green flex items-center justify-center text-xs font-bold">③</span>
              <div>
                <p class="font-bold text-neutral-900 text-sm">内容</p>
                <p class="text-neutral-600 text-sm mt-1">講師１人当たり 50分 × 2コマ（2クラスへ講演）</p>
              </div>
            </div>
            <div class="flex gap-4 items-start">
              <span class="flex-shrink-0 w-7 h-7 rounded-full bg-kaiho-green/10 text-kaiho-green flex items-center justify-center text-xs font-bold">④</span>
              <div>
                <p class="font-bold text-neutral-900 text-sm">対象</p>
                <p class="text-neutral-600 text-sm mt-1">開邦中学1〜3年生、開邦高校1〜3年生</p>
              </div>
            </div>
            <div class="flex gap-4 items-start">
              <span class="flex-shrink-0 w-7 h-7 rounded-full bg-kaiho-green/10 text-kaiho-green flex items-center justify-center text-xs font-bold">⑤</span>
              <div>
                <p class="font-bold text-neutral-900 text-sm">その他</p>
                <div class="text-neutral-600 text-sm mt-1 space-y-1">
                  <p>17:00〜18:00　生徒との懇話会</p>
                  <p>19:00〜21:00　卒業生懇親会（任意参加）</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-8 border-t border-neutral-100 space-y-3">
            <p class="text-xs text-neutral-500 flex items-start gap-2">
              <span class="flex-shrink-0 mt-0.5">＊</span>
              <span>予算の関係上、謝金や交通費の支給は困難となっております。</span>
            </p>
            <p class="text-xs text-neutral-500 flex items-start gap-2">
              <span class="flex-shrink-0 mt-0.5">＊</span>
              <span>県外の方用にオンライン授業も実施しました。</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 詳細内容 -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Details</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">プログラム詳細</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="space-y-8 fade-in">
          <!-- 講義 -->
          <div class="bg-kaiho-green/5 rounded-2xl p-8 border border-kaiho-green/10">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-kaiho-green/10 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-kaiho-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
              </div>
              <h3 class="text-xl font-bold text-neutral-900">講義</h3>
            </div>
            <p class="text-neutral-600 leading-relaxed text-sm">
              中学または高校のいずれかの2クラス（50分 × 2クラス）を担当していただきます。クラスの割り振りは事務局が行います。
            </p>
            <div class="mt-4 bg-white rounded-xl p-5 border border-kaiho-green/10">
              <p class="text-xs font-bold text-neutral-900 mb-3">話していただく内容（例）</p>
              <ul class="space-y-2 text-sm text-neutral-600">
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-kaiho-green mt-2 flex-shrink-0"></span>
                  <span>高校時代からどのように将来を見据えて努力したか</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-kaiho-green mt-2 flex-shrink-0"></span>
                  <span>大学選択の理由や大学時代の経験</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-kaiho-green mt-2 flex-shrink-0"></span>
                  <span>社会人になってからの仕事内容とやりがい</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-kaiho-green mt-2 flex-shrink-0"></span>
                  <span>仕事と家庭の両立など、リアルな生き方の話</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 懇話会 -->
          <div class="bg-neutral-50 rounded-2xl p-8 border border-neutral-200">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-neutral-200 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <h3 class="text-xl font-bold text-neutral-900">生徒との懇話会（17:00〜18:00）</h3>
            </div>
            <p class="text-neutral-600 leading-relaxed text-sm">
              学校側が用意した教室に講師が待機し、話を聞きたい生徒が自由に訪れる形式の懇話会です。生徒が自分の関心に合った講師を選んで来訪するため、より深い対話の場となります。
            </p>
          </div>

          <!-- 懇親会 -->
          <div class="bg-neutral-50 rounded-2xl p-8 border border-neutral-200">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-neutral-200 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h3 class="text-xl font-bold text-neutral-900">卒業生懇親会（19:00〜21:00・任意参加）</h3>
            </div>
            <p class="text-neutral-600 leading-relaxed text-sm">
              授業・懇話会終了後、講師を含む卒業生で懇親会を開催します。講師同士の交流や情報交換の場としてご活用ください。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 活動実績 -->
    <section class="py-24 bg-neutral-50">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Archive</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">活動実績</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <!-- 2024年 -->
        <div class="fade-in mb-16">
          <h3 class="text-xl font-bold text-neutral-900 mb-6">2024年（令和6年）</h3>
          <div class="grid md:grid-cols-2 gap-8 items-start">
            <div class="flex justify-center">
              <img
                :src="`${config.app.baseURL}images/special-lecture-2024.jpeg`"
                alt="令和6年度 創立記念特設授業 告知フライヤー"
                class="w-full max-w-sm rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
            <div>
              <p class="text-neutral-600 text-sm leading-relaxed">2024年11月1日（金）開催。OG・OB特設授業およびキャリア相談会を実施しました。</p>
            </div>
          </div>
        </div>

        <!-- 2021年 -->
        <div class="fade-in mb-16">
          <h3 class="text-xl font-bold text-neutral-900 mb-6">2021年（令和3年）</h3>
          <div class="grid md:grid-cols-2 gap-8 items-start">
            <div class="flex justify-center">
              <img
                :src="`${config.app.baseURL}images/special-lecture-2021.jpeg`"
                alt="令和3年度 創立記念特設授業 告知フライヤー"
                class="w-full max-w-sm rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
            <div>
              <p class="text-neutral-600 text-sm leading-relaxed">2021年11月1日（月）開催。</p>
            </div>
          </div>
        </div>

        <!-- 2020年 -->
        <div class="fade-in">
          <h3 class="text-xl font-bold text-neutral-900 mb-6">2020年（令和2年）</h3>
          <div class="grid md:grid-cols-2 gap-8 items-start">
            <div class="flex justify-center">
              <img
                :src="`${config.app.baseURL}images/special-lecture-2020.jpeg`"
                alt="令和2年度 創立記念特設授業 告知フライヤー"
                class="w-full max-w-sm rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
            <div>
              <p class="text-neutral-600 text-sm leading-relaxed">2020年11月6日（金）開催。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 bg-kaiho-green">
      <div class="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-black text-white mb-4">講師として参加しませんか？</h2>
        <p class="text-white/80 mb-8 leading-relaxed">
          後輩たちへ、あなたの歩みと言葉を届けてください。<br>
          参加希望の方は下記のフォームよりお申し込みください。
        </p>
        <NuxtLink to="/mentor/registration" class="inline-flex items-center gap-2 bg-white text-kaiho-green font-bold px-8 py-4 rounded-full hover:bg-kaiho-cream transition-colors">
          メンター応募フォーム <span>&rarr;</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

useSeoMeta({
  title: '創立記念特設授業 | 開邦雄飛会',
  description: '開邦高校同窓会「開邦雄飛会」主催の創立記念特設授業。卒業生が講師として在校生にキャリアの歩みを届けます。2011年から続く雄飛会のメイン活動。',
})

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible')
    })
  }, { threshold: 0.15 })
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
})
</script>
