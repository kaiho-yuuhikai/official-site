<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-emerald-600"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M30 0L60 30L30 60L0 30Z%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-gold mb-4">Officers &amp; Members</p>
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight">役員・運営メンバー</h1>
      </div>
    </section>

    <!-- 運営メンバー一覧 -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Members</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">運営メンバー</h2>
          <div class="section-divider" style="margin:0"></div>
          <p class="text-neutral-500 text-sm mt-6 max-w-2xl">
            現在、2026年度の新体制構築に向けて準備を進めています。世代を超えた多様なメンバーが雄飛会の運営に参画しています。
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 fade-in">
          <div v-for="member in members" :key="member.name"
               class="bg-white rounded-xl p-5 shadow-sm border border-neutral-100 flex items-start gap-4"
               :class="member.comment ? 'flex-col' : ''">
            <div class="flex items-center gap-4 w-full">
              <div class="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center text-white font-bold text-sm"
                   :class="!member.photo ? member.bgClass : ''">
                <img v-if="member.photo" :src="baseURL + member.photo" :alt="member.name" class="w-full h-full object-cover" />
                <span v-else>{{ member.initial }}</span>
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <h4 class="font-bold text-neutral-900 text-sm truncate">{{ member.name }}</h4>
                  <span v-if="member.branch" class="text-[10px] font-bold bg-kaiho-teal/10 text-kaiho-teal px-1.5 py-0.5 rounded-full">{{ member.branch }}</span>
                </div>
                <p class="text-xs text-neutral-500">{{ member.generation }}</p>
                <p v-if="member.note" class="text-[10px] text-neutral-400 truncate">{{ member.note }}</p>
              </div>
            </div>
            <p v-if="member.comment" class="text-[11px] text-neutral-500 leading-relaxed italic border-l-2 border-kaiho-green/30 pl-3">{{ member.comment }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 運営チーム -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Team Structure</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">運営チーム構成</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-in">
          <div v-for="team in teams" :key="team.name"
               class="card-hover bg-neutral-50 rounded-2xl p-6 shadow-sm border-t-4"
               :class="team.borderClass">
            <div class="flex items-start justify-between mb-3">
              <div>
                <span class="text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block" :class="team.badgeClass">{{ team.number }}</span>
                <h3 class="font-bold text-neutral-900 text-base">{{ team.name }}</h3>
                <p class="text-xs text-neutral-500">{{ team.subtitle }}</p>
              </div>
            </div>
            <p class="text-sm text-neutral-600 mb-4">{{ team.description }}</p>
            <div class="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-neutral-100">
              <svg class="w-4 h-4 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              <span class="text-xs text-neutral-500">プロジェクトリーダー</span>
            </div>
          </div>
        </div>

        <!-- プロジェクトリーダーの役割 -->
        <div class="mt-12 bg-neutral-50 rounded-2xl p-6 border border-neutral-200 fade-in">
          <div class="flex items-center gap-3 mb-4">
            <svg class="w-5 h-5 text-neutral-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <p class="font-bold text-neutral-900 text-sm">プロジェクトリーダーの役割</p>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div v-for="role in projectLeaderRoles" :key="role" class="flex items-center gap-2 text-sm text-neutral-600">
              <span class="w-1.5 h-1.5 rounded-full bg-kaiho-green flex-shrink-0"></span>
              {{ role }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PTA連携 -->
    <section class="py-24 bg-neutral-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Collaboration</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">PTA連携</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="max-w-3xl mx-auto fade-in">
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
            <p class="text-neutral-600 text-sm leading-relaxed mb-4">
              開邦高校PTAと連携し、在校生の学習環境の改善や地域貢献活動に取り組んでいます。
            </p>
            <!-- PTA連携者 -->
            <div class="mb-4 flex items-center gap-3 bg-neutral-50 rounded-xl px-5 py-3">
              <div class="w-8 h-8 rounded-full bg-kaiho-green/10 flex items-center justify-center flex-shrink-0">
                <span class="text-kaiho-green text-xs font-bold">金</span>
              </div>
              <div>
                <p class="font-bold text-neutral-900 text-sm">金城 安一</p>
                <p class="text-neutral-500 text-xs">PTA連携・道路ボランティア主導</p>
              </div>
            </div>
            <div class="bg-kaiho-green/5 rounded-xl p-6">
              <h4 class="font-bold text-neutral-900 text-sm mb-3">活動実績</h4>
              <ul class="space-y-2 text-sm text-neutral-600">
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-kaiho-green mt-2 flex-shrink-0"></span>
                  <span><strong>道路ボランティア清掃</strong>（2026/3/8）— 寮〜ローソン〜裏門の道路清掃。PTA・在校生・同窓生が合同で実施</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-kaiho-green mt-2 flex-shrink-0"></span>
                  <span><strong>道路ボランティア協定</strong> — PTA評議員会で承認、道路管理課との協定書を提出済み</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-kaiho-green mt-2 flex-shrink-0"></span>
                  <span>毎月第二日曜日に鳥堀自治会と合同実施（学校と地域のつながりを深める取り組み）</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 募集CTA -->
    <section class="py-24 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-emerald-600">
      <div class="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-black text-white mb-6">運営メンバーを募集しています</h2>
        <p class="text-white/70 text-sm leading-relaxed mb-8">
          雄飛会の運営に興味のある方は、ぜひご応募ください。<br>
          卒業年度や居住地は問いません。
        </p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdmpqzISxWHhyDvHzmWPMEZpfx8YUpUdfAW_4JjebFlnvWoYA/viewform?usp=dialog"
           target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center justify-center px-8 py-4 bg-white text-kaiho-green font-bold rounded-full hover:bg-kaiho-gold hover:text-white transition-all duration-300 shadow-lg">
          応募フォームを開く
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const baseURL = useRuntimeConfig().app.baseURL

const colorClasses = [
  'bg-gradient-to-br from-kaiho-green to-emerald-400',
  'bg-gradient-to-br from-kaiho-blue to-blue-400',
  'bg-gradient-to-br from-kaiho-gold to-amber-400',
  'bg-gradient-to-br from-kaiho-purple to-purple-400',
  'bg-gradient-to-br from-kaiho-orange to-orange-400',
  'bg-gradient-to-br from-kaiho-teal to-teal-400',
]

function getBgClass(index: number) {
  return colorClasses[index % colorClasses.length]
}

const members = [
  { name: 'じょーじ', generation: '13期・14期 理数科', initial: 'じ', bgClass: getBgClass(0), note: 'GScale 代表取締役 | Google Developer Expert', photo: 'images/members/george.png', comment: 'システムやデータ分析を手伝います' },
  { name: 'うえま', generation: '16期 理数科', initial: 'う', bgClass: getBgClass(1), note: '薬剤師 | 広報コーディネーター', photo: 'images/members/uema.png', comment: 'サークル活動のようなワクワク感を大切に、同窓会組織を活性化していきます。' },
  { name: 'かえ', generation: '20期 英語科', initial: 'か', bgClass: getBgClass(2), note: '経営 | バレエ講師', photo: 'images/members/kae.jpg', comment: '楽しいことが大好きです！同窓会を盛り上げて行きましょう♪' },
  { name: 'みねけん', generation: '18期 理数科', initial: 'み', bgClass: getBgClass(3), note: '元カメラマン | 探究活動事務局', photo: 'images/members/mineken.png', comment: '総合型選抜専門塾GALに在籍しています。主に探究学習の設計や支援を仕事にしていて、『マイプロジェクト』の沖縄事務局も兼任しています。' },
  { name: 'よしき', generation: '18期 理数科', initial: 'よ', bgClass: getBgClass(4), note: '教諭・沖縄県立球陽高等学校', photo: '', comment: '開邦高校と開邦生の可能性を広げたい。海外連携部署に異動しましたが、できる限り関わっていきます。' },
  { name: 'ひなこ', generation: '26期 理数科', initial: 'ひ', bgClass: getBgClass(5), note: '会社員（ゲームアプリ開発・運営）', photo: '', comment: '在校生のキャリア選択のお手伝いや、同窓生に対する発信を行っていきたいです。', branch: '東京支部' },
  { name: 'ヤスイチ', generation: '33期・38期 保護者', initial: 'ヤ', bgClass: getBgClass(2), note: '会社員 | PTA', photo: 'images/members/yasuichi.jpg', comment: '地域と学校のつながりづくりに挑戦中。孤高のPTAです、よろしくお願いいたします。' },
]

const teams = [
  { number: '①', name: '教育支援事業', subtitle: 'メンター制度・特設授業', description: 'メンター制度の運営および創立記念特設授業を通じて、在校生のキャリア形成を支援します。', borderClass: 'border-kaiho-blue', badgeClass: 'bg-kaiho-blue/10 text-kaiho-blue' },
  { number: '②', name: '若手芸術家育成事業', subtitle: '後援・活動支援', description: '同窓生の若手芸術家の活動を後援し、発表の場づくりや情報発信を通じて活動を支援します。', borderClass: 'border-kaiho-green', badgeClass: 'bg-kaiho-green/10 text-kaiho-green' },
  { number: '③', name: '地域連携事業', subtitle: 'ボランティア', description: 'PTA・在校生・地域と連携した道路清掃ボランティアなど、地域に根ざした活動を推進します。', borderClass: 'border-kaiho-orange', badgeClass: 'bg-kaiho-orange/10 text-kaiho-orange' },
  { number: '④', name: 'デジタル推進事業', subtitle: 'HP・システム化', description: '公式ホームページの運営・改善および会員管理・会計のデジタル化・システム化を推進します。', borderClass: 'border-kaiho-purple', badgeClass: 'bg-kaiho-purple/10 text-kaiho-purple' },
  { number: '⑤', name: '会員交流促進事業', subtitle: '総会懇親会', description: '定期総会や懇親会の企画・運営を通じて、会員同士の交流と組織の活性化を図ります。', borderClass: 'border-kaiho-teal', badgeClass: 'bg-kaiho-teal/10 text-kaiho-teal' },
]

const projectLeaderRoles = [
  '事業計画の立案・実行',
  'メンバーの連携・調整',
  '進捗管理・報告',
  '成果の可視化',
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
