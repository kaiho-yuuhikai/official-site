// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'ja'
      },
      title: '開邦高校同窓会 雄飛会 | 公式サイト',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '沖縄県立開邦高等学校の同窓会「雄飛会」公式サイト。メンター制度、探究活動基金、キャリア・クロスロードなど、在校生と卒業生をつなぐ活動を展開しています。' },
        { property: 'og:site_name', content: '開邦高校同窓会 雄飛会' },
        { property: 'og:title', content: '開邦高校同窓会 雄飛会 | 公式サイト' },
        { property: 'og:description', content: '沖縄県立開邦高等学校の同窓会「雄飛会」公式サイト。在校生と卒業生をつなぐ活動を展開しています。' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/images/og-image.png' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:image', content: '/images/og-image.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/favicon.png' },
        { rel: 'apple-touch-icon', type: 'image/png', href: '/images/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
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
