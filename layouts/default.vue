<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            :class="scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'">
      <nav class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <NuxtLink to="/" class="text-lg font-medium tracking-wide transition-colors"
                    :class="scrolled ? 'text-neutral-900' : 'text-white'">
            雄飛会
          </NuxtLink>

          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center space-x-10">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="text-sm tracking-wider transition-colors duration-200"
              :class="scrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/80 hover:text-white'"
            >
              {{ link.label }}
            </NuxtLink>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 transition-colors"
            :class="scrolled ? 'text-neutral-900' : 'text-white'"
            aria-label="メニュー"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </nav>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t">
          <div class="px-6 py-6 space-y-4">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="block text-sm tracking-wider text-neutral-600 hover:text-neutral-900 transition-colors"
              @click="mobileMenuOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-kaiho-green-dark text-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div class="grid md:grid-cols-3 gap-12">
          <!-- 団体情報 -->
          <div>
            <p class="text-2xl font-light mb-4">開邦高校同窓会 雄飛会</p>
            <p class="text-white/70 text-sm leading-relaxed">
              沖縄県立開邦高等学校<br>
              同窓会組織
            </p>
          </div>

          <!-- サイトリンク -->
          <div>
            <p class="text-xs font-medium tracking-widest uppercase text-white/50 mb-4">サイトマップ</p>
            <div class="space-y-2">
              <NuxtLink
                v-for="link in navLinks"
                :key="link.to"
                :to="link.to"
                class="block text-white/70 hover:text-white transition-colors text-sm"
              >
                {{ link.label }}
              </NuxtLink>
            </div>
          </div>

          <!-- 外部リンク -->
          <div>
            <p class="text-xs font-medium tracking-widest uppercase text-white/50 mb-4">外部リンク</p>
            <div class="space-y-2">
              <a
                v-for="ext in externalLinks"
                :key="ext.url"
                :href="ext.url"
                target="_blank"
                rel="noopener noreferrer"
                class="block text-white/70 hover:text-white transition-colors text-sm"
              >
                {{ ext.label }}
              </a>
            </div>
          </div>
        </div>
        <div class="mt-16 pt-8 border-t border-white/20 text-center">
          <p class="text-white/50 text-xs tracking-wider">
            &copy; {{ new Date().getFullYear() }} 開邦雄飛会
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false)
const scrolled = ref(false)

const navLinks = [
  { to: '/', label: 'ホーム' },
  { to: '/about', label: '雄飛会について' },
  { to: '/officers', label: '役員名簿' },
  { to: '/news', label: 'お知らせ' },
  { to: '/contact', label: 'お問い合わせ' },
]

const externalLinks = [
  { url: 'https://www.kaiho-h.open.ed.jp/', label: '開邦高校公式サイト' },
  { url: 'https://www.facebook.com/kaihoyuhi/', label: 'Facebook' },
  { url: 'https://note.com/kaihoyuuhikai/m/m20c04499fc49', label: 'note マガジン' },
]

onMounted(() => {
  const handleScroll = () => {
    scrolled.value = window.scrollY > 50
  }
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})
</script>
