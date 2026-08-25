// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-gtag'
  ],

  gtag: {
    id: process.env.NUXT_PUBLIC_GA4_ID,
    enabled: !!process.env.NUXT_PUBLIC_GA4_ID
  },

  app: {
    baseURL: '/',
    head: {
      htmlAttrs: {
        lang: 'ja'
      },
      title: '開邦雄飛会｜沖縄・開邦高校同窓会の公式サイト',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '沖縄県立開邦高校の同窓会「開邦雄飛会」公式サイト。8,000名超の卒業生ネットワークで、メンター制度・キャリア支援・寄付協賛など、在校生と同窓生をつなぐ活動を展開しています。' },
        { property: 'og:site_name', content: '開邦雄飛会' },
        { property: 'og:title', content: '開邦雄飛会｜沖縄・開邦高校同窓会の公式サイト' },
        { property: 'og:description', content: '沖縄県立開邦高校の同窓会「開邦雄飛会」公式サイト。8,000名超の卒業生ネットワークで、メンター制度・キャリア支援・寄付協賛など、在校生と同窓生をつなぐ活動を展開しています。' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://kaiho-yuuhikai.jp/' },
        { property: 'og:image', content: 'https://kaiho-yuuhikai.jp/images/og-image.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:image', content: 'https://kaiho-yuuhikai.jp/images/og-image.jpg' },
        { name: 'msvalidate.01', content: 'BE0EF51F7D5AC731FBC5DE91526D7B22' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/favicon.png' },
        { rel: 'apple-touch-icon', type: 'image/png', href: '/images/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  // ssr:false（SPA）だと起動直後にアプリマニフェスト(_nuxt/builds/meta/dev.json)を
  // 取りに行き、.nuxt の生成が間に合わないと Vite が #app-manifest を解決できず
  // 「404 [GET] /_nuxt/builds/meta/dev.json」のエラー画面になる（2026-08-25 実発生）。
  // このサイトは routeRules を使っておらずマニフェスト自体が不要なため無効化する。
  experimental: { appManifest: false },

  // GitHub Pages用の静的生成設定
  ssr: false,
  nitro: {
    preset: 'github-pages'
  }
})
