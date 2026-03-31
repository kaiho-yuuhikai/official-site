// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

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
        { name: 'description', content: '沖縄県立開邦高校の同窓会「開邦雄飛会」公式サイト。8,000名超の卒業生ネットワークで、メンター制度・奨学支援基金・キャリア支援など、在校生と同窓生をつなぐ活動を展開しています。' },
        { property: 'og:site_name', content: '開邦雄飛会' },
        { property: 'og:title', content: '開邦雄飛会｜沖縄・開邦高校同窓会の公式サイト' },
        { property: 'og:description', content: '沖縄県立開邦高校の同窓会「開邦雄飛会」公式サイト。8,000名超の卒業生ネットワークで、メンター制度・奨学支援基金・キャリア支援など、在校生と同窓生をつなぐ活動を展開しています。' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/images/og-image.png' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:image', content: '/images/og-image.png' }
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

  // GitHub Pages用の静的生成設定
  ssr: false,
  nitro: {
    preset: 'github-pages'
  }
})
