<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-emerald-600"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M30 0L60 30L30 60L0 30Z%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-gold mb-4">Recruiting</p>
        <p class="text-white/80 text-sm md:text-base font-bold tracking-[0.2em] mb-3">{{ heroYear }}</p>
        <h1 class="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
          <span class="block sm:inline">{{ heroTitle }}</span>
          <span class="block sm:inline sm:ml-4">{{ heroTitleSub }}</span>
        </h1>
        <p class="text-white/80 text-lg leading-relaxed">{{ heroLead }}</p>
        <a href="#entry" class="inline-flex items-center gap-2 mt-10 bg-white text-kaiho-green font-bold px-8 py-4 rounded-full hover:bg-kaiho-cream transition-colors">
          講師に応募する <span>&rarr;</span>
        </a>
      </div>
    </section>

    <!-- 募集の趣旨 -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">About</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">後輩たちへ、あなたの言葉を</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="prose prose-neutral max-w-none fade-in">
          <p v-for="(p, i) in intro" :key="i" class="text-neutral-700 leading-relaxed mb-6">{{ p }}</p>
        </div>

        <div class="mt-10 bg-kaiho-green/5 border border-kaiho-green/10 rounded-2xl p-8 fade-in">
          <p class="text-sm font-bold text-kaiho-green mb-2">今年度の募集人数</p>
          <p class="text-4xl font-black text-neutral-900 mb-3">約{{ recruitCount }}名</p>
          <p class="text-sm text-neutral-600 leading-relaxed">{{ recruitNote }}</p>
        </div>
      </div>
    </section>

    <!-- 募集要項 -->
    <section class="py-24 bg-neutral-50">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Outline</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">募集要項</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-sm fade-in">
          <dl class="space-y-6">
            <div v-for="item in outline" :key="item.label" class="sm:flex sm:gap-8">
              <dt class="sm:w-32 flex-shrink-0 font-bold text-neutral-900 text-sm">{{ item.label }}</dt>
              <dd class="text-neutral-600 text-sm mt-1 sm:mt-0 leading-relaxed">
                {{ item.value }}
                <span v-if="item.tbd" class="ml-2 inline-block align-middle text-[11px] font-bold text-amber-700 bg-amber-100 rounded-full px-2 py-0.5">調整中</span>
              </dd>
            </div>
          </dl>

          <div class="mt-8 pt-8 border-t border-neutral-100 space-y-3">
            <p v-for="(note, i) in outlineNotes" :key="i" class="text-xs text-neutral-500 flex items-start gap-2">
              <span class="flex-shrink-0 mt-0.5">＊</span>
              <span>{{ note }}</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 今年度からの変更点 -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">What's New</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">今年度からの変更点</h2>
          <div class="section-divider" style="margin:0"></div>
          <p class="text-neutral-600 leading-relaxed mt-8">{{ changesLead }}</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 fade-in">
          <div v-for="c in changes" :key="c.title" class="bg-kaiho-green/5 rounded-2xl p-7 border border-kaiho-green/10">
            <h3 class="text-lg font-bold text-neutral-900 mb-3">{{ c.title }}</h3>
            <p class="text-sm text-neutral-600 leading-relaxed">{{ c.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 当日の流れ -->
    <section class="py-24 bg-neutral-50">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Program</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">当日の進め方</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <ol class="space-y-4 fade-in">
          <li v-for="(step, i) in program" :key="step.title" class="bg-white rounded-2xl p-7 shadow-sm flex gap-5 items-start">
            <span class="flex-shrink-0 w-9 h-9 rounded-full bg-kaiho-green/10 text-kaiho-green flex items-center justify-center text-sm font-bold">{{ i + 1 }}</span>
            <div>
              <p class="font-bold text-neutral-900">{{ step.title }}</p>
              <p class="text-sm text-neutral-600 mt-2 leading-relaxed">{{ step.body }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- 応募からの流れ -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Flow</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">応募してからの流れ</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 fade-in">
          <div v-for="(step, i) in flow" :key="step.title" class="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
            <p class="text-xs font-bold text-kaiho-green mb-3">STEP {{ i + 1 }}</p>
            <p class="font-bold text-neutral-900 text-sm mb-2">{{ step.title }}</p>
            <p class="text-xs text-neutral-600 leading-relaxed">{{ step.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- よくある質問 -->
    <section class="py-24 bg-neutral-50">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">FAQ</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-6">よくあるご質問</h2>
          <div class="section-divider" style="margin:0"></div>
        </div>

        <div class="space-y-4 fade-in">
          <details v-for="item in faq" :key="item.q" class="bg-white rounded-2xl p-6 shadow-sm group">
            <summary class="font-bold text-neutral-900 text-sm cursor-pointer list-none flex items-start gap-3">
              <span class="text-kaiho-green flex-shrink-0">Q.</span>
              <span>{{ item.q }}</span>
            </summary>
            <p class="text-sm text-neutral-600 leading-relaxed mt-4 pl-7">{{ item.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section id="entry" class="py-24 bg-kaiho-green scroll-mt-20">
      <div class="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-black text-white mb-4">{{ ctaTitle }}</h2>
        <p class="text-white/80 mb-8 leading-relaxed">{{ ctaBody }}</p>
        <NuxtLink to="/mentor/registration" class="inline-flex items-center gap-2 bg-white text-kaiho-green font-bold px-8 py-4 rounded-full hover:bg-kaiho-cream transition-colors">
          講師応募フォームへ <span>&rarr;</span>
        </NuxtLink>
        <p class="text-white/60 text-xs mt-8 leading-relaxed">
          ご不明な点は<NuxtLink to="/contact" class="underline hover:text-white">お問い合わせ</NuxtLink>からご連絡ください。<br>
          過去の開催内容は<NuxtLink to="/activities/special-lecture" class="underline hover:text-white">創立記念特設授業のページ</NuxtLink>をご覧ください。
        </p>
      </div>
    </section>

    <!-- 更新日 -->
    <section class="py-10 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <p class="text-xs text-neutral-400 text-center">
          このページには調整中の情報が含まれます。確定しだい更新します。（最終更新: {{ lastUpdated }}）
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// ===========================================================================
// ▼▼▼ ここから下が、このページの文章です。ここだけ書き換えれば更新できます ▼▼▼
//
//  ・「'」で囲まれた部分が画面に出る文字です。日本語をそのまま書き換えてください
//  ・行の先頭の「//」から後ろはメモ書きで、画面には出ません
//  ・{ } や [ ] や , （カンマ）は消さないでください。ページが表示されなくなります
//  ・tbd: true と書いた項目には「調整中」の黄色いラベルが付きます
// ===========================================================================

// ページ最上部の見出し
const heroYear = '令和8年度'
const heroTitle = '創立記念特設授業'
const heroTitleSub = '講師募集'
const heroLead = '母校の教室で、後輩たちに「あなたの歩み」を話してくださる講師を募集しています。'

// 募集の趣旨（1行 = 1段落）
const intro = [
  '創立記念特設授業は、各分野で活躍する卒業生が講師として母校を訪れ、在校生に「授業」という形でキャリアの歩みや想いを届けるプログラムです。2011年から続く、雄飛会のメイン活動です。',
  '令和8年度は、生徒が講師を選ぶ形へと進め方を見直しました。生徒一人ひとりの興味や進路に近い話が届くように、そして「自分では選ばなかった分野」との出会いも生まれるように、学校と雄飛会で設計しています。',
  '特別な実績や肩書きは必要ありません。高校時代に考えていたこと、進路の選び方、いま働いていて感じることを、そのままの言葉で話していただければ十分です。',
]

// 募集人数
const recruitCount = '23'
const recruitNote = '9月中旬までに講師を確定し、その後、生徒への事前アンケートを実施します。学校との調整の都合上、できるだけ早めのご応募にご協力ください。'

// 募集要項（label = 項目名／value = 内容／tbd: true = 「調整中」ラベルを付ける）
const outline = [
  { label: '開催日', value: '調整中（例年11月上旬に開催しています）', tbd: true },
  { label: '会場', value: '開邦中学・開邦高校 新校舎（2025年7月移転）' },
  { label: '対象', value: '開邦中学1〜3年生、開邦高校1〜3年生' },
  { label: '担当コマ', value: '1コマ50分。担当していただくコマ数は調整中です', tbd: true },
  { label: '形式', value: '講義のほか、ワークショップやQ&Aなど参加型の形式も歓迎します' },
  { label: '募集締切', value: '9月中旬（講師が確定しだい受付を終了します）' },
  { label: '応募方法', value: '講師応募フォームからお申し込みください' },
]

// 募集要項の下に小さく出る注意書き
const outlineNotes = [
  '謝金・交通費の取り扱いは現在調整中です。決まりしだいこのページを更新します。',
  '県外にお住まいの方は、オンラインでのご登壇もご相談ください（昨年度は実施実績があります）。',
  '当日ご都合が合わない場合も、生徒との交流会やメンター制度でご協力いただける形があります。',
]

// 今年度からの変更点
const changesLead = '2026年8月の学校との打ち合わせで、次の点が決まりました。'
const changes = [
  {
    title: '「割り当て」から「生徒が選ぶ」形へ',
    body: '高校生は事前アンケートをもとに、希望や興味・進路・価値観に近い講師を選びます。1コマ目は希望に近い講師、2コマ目は自分では選ばない分野も含める設計です。',
  },
  {
    title: '中学生と高校生を分けます',
    body: '6学年を一律にせず、発達段階に合わせて分けます。中学生は、中学生への授業が可能な講師の中から選びます。',
  },
  {
    title: '学科を越えて選べます',
    body: '学術探究科・芸術科を完全には分けません。専門性は残しつつ、学科を越えて聞きたい講師を選べる形にします。',
  },
  {
    title: '講師紹介は複数のキーワードで',
    body: '職業名だけでなく「経営」「芸術」「研究」といった複数のキーワードでご紹介します。生徒が自分の関心から講師を見つけられるようにするためです。',
  },
  {
    title: '講師資料はデジタルで共有',
    body: '当日の資料は、事前・事後にデジタルで共有できます。授業を受けられなかった生徒にも届けられます。',
  },
  {
    title: 'メンター制度でフォローします',
    body: '授業や交流会に参加できなかった生徒を、メンター制度でフォローする体制を進めています。',
  },
]

// 当日の進め方
const program = [
  { title: '講師は教室で待ち、生徒が移動します', body: '講師は割り当てられた教室に留まり、生徒が教室を移動します。移動時間は10分を見込んでいます。' },
  { title: '1コマ50分の授業', body: '高校時代の過ごし方、進路の選び方、いまの仕事とやりがい、働き方や暮らしのリアルな話など、お話しいただく内容は自由です。' },
  { title: '希望の多い講師は広い教室で', body: '希望者が多い講師には、多目的教室など広い教室をご用意します。' },
  { title: '授業のあとに交流の場があります', body: '生徒との交流会を予定しています。学校からも生徒へ周知し、参加を促します。' },
]

// 応募してからの流れ
const flow = [
  { title: 'フォームから応募', body: '講師応募フォームに、入学期・お名前・ご連絡先などをご記入ください。' },
  { title: '事務局からご連絡', body: '雄飛会事務局で内容を確認し、担当からご連絡します。' },
  { title: '生徒アンケート', body: '講師が確定したのち、生徒が聞きたい講師を選ぶアンケートを実施します。' },
  { title: '当日の詳細をご案内', body: '担当クラス・教室・当日のタイムスケジュールを事前にお送りします。' },
]

// よくあるご質問
const faq = [
  {
    q: '人前で話した経験がありません。それでも大丈夫でしょうか。',
    a: '大丈夫です。上手なプレゼンよりも、実際に歩んできた道のりの話のほうが生徒には届きます。進め方に不安があれば、事務局がご相談に乗ります。',
  },
  {
    q: '県外に住んでいます。参加できますか。',
    a: 'ご相談ください。昨年度は県外の方向けにオンラインでの授業を実施した実績があります。',
  },
  {
    q: '何を話せばよいか分かりません。',
    a: '高校時代に考えていたこと、進路をどう選んだか、いまの仕事の内容とやりがい、仕事と家庭の両立など、ご自身の経験の中から話しやすいテーマをお選びください。',
  },
  {
    q: '当日は何時間くらい拘束されますか。',
    a: '当日のタイムスケジュールは調整中です。確定しだい、このページと個別のご案内でお知らせします。',
  },
  {
    q: '謝金や交通費は出ますか。',
    a: '現在調整中です。決まりしだいこのページを更新します。',
  },
]

// 最後の呼びかけ
const ctaTitle = '講師として参加しませんか？'
const ctaBody = 'あなたが開邦で過ごした時間と、その後の歩みは、いまの在校生にとって何よりの手がかりになります。'

// このページを最後に更新した日
const lastUpdated = '2026年8月25日'

// ===========================================================================
// ▲▲▲ 書き換えるのはここまでです。これより下は触らないでください ▲▲▲
// ===========================================================================

useSeoMeta({
  title: '令和8年度 創立記念特設授業 講師募集 | 開邦雄飛会',
  description: '開邦雄飛会が主催する創立記念特設授業（令和8年度）の講師を募集しています。今年度は生徒が講師を選ぶ形へ。募集要項・当日の進め方・応募の流れをご案内します。',
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
