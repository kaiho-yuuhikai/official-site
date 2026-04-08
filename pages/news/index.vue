<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-emerald-600"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2020/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M30 0L60 30L30 60L0 30Z%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-gold mb-4">News</p>
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight">お知らせ</h1>
      </div>
    </section>

    <!-- News List -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">

        <!-- ローディング中 -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-flex items-center gap-3 text-neutral-400">
            <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            <span class="text-sm">最新情報を読み込んでいます...</span>
          </div>
        </div>

        <div v-else class="space-y-0">
          <template v-for="(item, i) in allItems" :key="i">
            <!-- 外部リンク（note記事） -->
            <div class="border-b border-neutral-100 last:border-0">
              <a v-if="item.external"
                :href="item.link" target="_blank" rel="noopener noreferrer"
                class="group flex gap-6 items-start py-7 px-4 -mx-4 rounded-lg hover:bg-neutral-50 transition-colors">
                <time class="text-sm text-neutral-400 flex-shrink-0 w-28 mt-0.5">{{ item.date }}</time>
                <div class="flex-1 flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1.5">
                      <span class="text-[10px] bg-kaiho-green/10 text-kaiho-green px-2 py-0.5 rounded-full font-medium">{{ item.category }}</span>
                      <span v-if="item.isNew" class="text-[10px] bg-kaiho-gold text-white px-2 py-0.5 rounded-full font-bold">NEW</span>
                    </div>
                    <h3 class="text-neutral-900 font-medium group-hover:text-kaiho-green transition-colors">{{ item.title }}</h3>
                    <p v-if="item.summary" class="text-sm text-neutral-500 mt-1 leading-relaxed line-clamp-2">{{ item.summary }}</p>
                  </div>
                  <div class="flex items-center gap-1 flex-shrink-0 mt-0.5">
                    <svg class="w-3.5 h-3.5 text-neutral-300 group-hover:text-kaiho-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </div>
                </div>
              </a>

              <!-- 内部リンク -->
              <NuxtLink v-else-if="item.link"
                :to="item.link"
                class="group flex gap-6 items-start py-7 px-4 -mx-4 rounded-lg hover:bg-neutral-50 transition-colors">
                <time class="text-sm text-neutral-400 flex-shrink-0 w-28 mt-0.5">{{ item.date }}</time>
                <div class="flex-1 flex items-start justify-between gap-4">
                  <div>
                    <div class="flex items-center gap-2 mb-1.5">
                      <span class="text-[10px] bg-kaiho-green/10 text-kaiho-green px-2 py-0.5 rounded-full font-medium">{{ item.category }}</span>
                      <span v-if="item.isNew" class="text-[10px] bg-kaiho-gold text-white px-2 py-0.5 rounded-full font-bold">NEW</span>
                    </div>
                    <h3 class="text-neutral-900 font-medium group-hover:text-kaiho-green transition-colors">{{ item.title }}</h3>
                    <p v-if="item.summary" class="text-sm text-neutral-500 mt-1 leading-relaxed">{{ item.summary }}</p>
                  </div>
                  <svg class="w-5 h-5 text-neutral-300 group-hover:text-kaiho-green flex-shrink-0 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </NuxtLink>

              <!-- リンクなし -->
              <div v-else class="flex gap-6 items-start py-7 px-4 -mx-4">
                <time class="text-sm text-neutral-400 flex-shrink-0 w-28 mt-0.5">{{ item.date }}</time>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-[10px] bg-kaiho-green/10 text-kaiho-green px-2 py-0.5 rounded-full font-medium">{{ item.category }}</span>
                    <span v-if="item.isNew" class="text-[10px] bg-kaiho-gold text-white px-2 py-0.5 rounded-full font-bold">NEW</span>
                  </div>
                  <h3 class="text-neutral-900 font-medium">{{ item.title }}</h3>
                  <p v-if="item.summary" class="text-sm text-neutral-500 mt-1 leading-relaxed">{{ item.summary }}</p>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- note マガジンへのリンク -->
        <div class="text-center mt-16 pt-12 border-t border-neutral-100">
          <p class="text-sm text-neutral-400 mb-4">note.com でさらに多くの活動記録を公開しています</p>
          <a href="https://note.com/kaihoyuuhikai/m/m20c04499fc49" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-8 py-3 bg-neutral-900 text-white font-bold rounded-full hover:bg-neutral-700 transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 4.3c0-.5-.5-1-1.3-.8l-6.4 2.2L8 3.3C7.5 3 7 3 6.5 3.2L1.8 5c-.5.2-.8.5-.8 1v14.7c0 .5.5 1 1.3.8l6.4-2.2 6.3 2.2c.5.3 1 .3 1.5.1l4.7-1.8c.5-.2.8-.5.8-1V4.3z"/>
            </svg>
            note マガジンをすべて読む
          </a>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'お知らせ | 開邦雄飛会',
  meta: [
    { name: 'description', content: '開邦雄飛会からのお知らせ・イベント情報' }
  ]
})

interface NewsItem {
  date: string
  category: string
  title: string
  summary?: string | null
  link: string | null
  isNew: boolean
  external?: boolean
  sortKey: number
}

const loading = ref(true)
const baseURL = useRuntimeConfig().app.baseURL

// 手動掲載のニュース項目
const manualItems: NewsItem[] = [
  {
    date: '2026.03.30',
    category: '総会',
    title: '令和8年度 定期総会 開催予定（準備中）',
    summary: '収支報告・予算案・会則変更・新体制・新事業についてご説明します。',
    link: '/news/soukai',
    isNew: true,
    sortKey: new Date('2026-03-30').getTime(),
  },
  {
    date: '2026.03.15',
    category: 'お知らせ',
    title: '雄飛会 運営打合せを開催（若狭公民館）',
    summary: null,
    link: null,
    isNew: false,
    sortKey: new Date('2026-03-15').getTime(),
  },
  {
    date: '2026.03.08',
    category: '活動',
    title: 'PTA連携 道路ボランティア清掃を初実施',
    summary: null,
    link: null,
    isNew: false,
    sortKey: new Date('2026-03-08').getTime(),
  },
  {
    date: '2026.03.01',
    category: '活動',
    title: '開邦高校卒業式にて同窓会入会式を実施',
    summary: null,
    link: null,
    isNew: false,
    sortKey: new Date('2026-03-01').getTime(),
  },
  {
    date: '2026.02.20',
    category: 'お知らせ',
    title: '開邦雄飛会 新体制発足・運営メンバー募集開始',
    summary: null,
    link: null,
    isNew: false,
    sortKey: new Date('2026-02-20').getTime(),
  },
]

const allItems = ref<NewsItem[]>([...manualItems])

// note記事の日付を "YYYY.MM.DD" 形式に変換
function formatNoteDate(dateStr: string): string {
  const d = new Date(dateStr)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

// 30日以内の記事をNEWとみなす
function isNewArticle(dateStr: string): boolean {
  const diff = Date.now() - new Date(dateStr).getTime()
  return diff < 30 * 24 * 60 * 60 * 1000
}

// 説明文からHTMLタグを除去
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

// note記事JSONを読み込んでリストにマージ
async function loadNoteArticles() {
  try {
    const res = await fetch(baseURL + 'data/note-articles.json')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (data.articles && data.articles.length > 0) {
      const noteItems: NewsItem[] = data.articles.map((a: { title: string; link: string; pubDate: string; description?: string }) => ({
        date: formatNoteDate(a.pubDate),
        category: 'note',
        title: a.title,
        summary: a.description ? stripHtml(a.description).slice(0, 100) : null,
        link: a.link,
        isNew: isNewArticle(a.pubDate),
        external: true,
        sortKey: new Date(a.pubDate).getTime(),
      }))

      // 手動項目とnote記事を日付降順でマージ
      const merged = [...manualItems, ...noteItems]
      merged.sort((a, b) => b.sortKey - a.sortKey)
      allItems.value = merged
    }
  } catch (err) {
    console.warn('note記事の読み込みに失敗しました:', err)
    // 失敗時は手動項目のみ表示
    allItems.value = [...manualItems]
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadNoteArticles()
})
</script>
