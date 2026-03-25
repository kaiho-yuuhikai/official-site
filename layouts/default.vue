<template>
  <div class="min-h-screen flex flex-col">
    <!-- Scroll Progress Bar -->
    <div id="scroll-progress" style="width:0%"></div>

    <!-- Header -->
    <header id="header" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            :class="scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'">
      <nav class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Logo -->
          <NuxtLink to="/" class="text-lg font-bold tracking-wide transition-colors duration-300"
                    :class="scrolled ? 'text-neutral-900' : 'text-white'">
            <span class="text-kaiho-gold">開邦雄飛会</span>
            <span class="text-sm font-normal hidden sm:inline"> | 開邦高校同窓会</span>
          </NuxtLink>

          <!-- Desktop Nav -->
          <div class="hidden lg:flex items-center space-x-8">
            <NuxtLink to="/" class="nav-link text-sm tracking-wider transition-colors"
                      :class="scrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/80 hover:text-white'">
              Home
            </NuxtLink>
            <NuxtLink to="/about" class="nav-link text-sm tracking-wider transition-colors"
                      :class="scrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/80 hover:text-white'">
              About
            </NuxtLink>
            <div class="nav-group relative">
              <a href="/#projects" class="nav-link text-sm tracking-wider transition-colors cursor-pointer"
                 :class="scrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/80 hover:text-white'">
                Projects <span class="text-[10px]">&#9660;</span>
              </a>
              <div class="nav-dropdown absolute top-full left-0 pt-2 w-48">
                <div class="bg-white rounded-lg shadow-xl py-2 border">
                  <a href="/#fund" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-kaiho-green/10 hover:text-kaiho-green">基金・寄付</a>
                  <a href="/#mentor" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-kaiho-green/10 hover:text-kaiho-green">メンター制度</a>
                  <a href="/#projects" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-kaiho-green/10 hover:text-kaiho-green">同窓生交流活動</a>
                  <a href="#" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-kaiho-green/10 hover:text-kaiho-green">イベント企画</a>
                </div>
              </div>
            </div>
            <a href="/#mentor" class="nav-link text-sm tracking-wider transition-colors"
               :class="scrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/80 hover:text-white'">
              Mentor
            </a>
            <a href="/#fund" class="nav-link text-sm tracking-wider transition-colors"
               :class="scrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/80 hover:text-white'">
              Fund
            </a>
            <a href="/#news" class="nav-link text-sm tracking-wider transition-colors"
               :class="scrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/80 hover:text-white'">
              News
            </a>
            <div class="nav-group relative">
              <a href="/#archive" class="nav-link text-sm tracking-wider transition-colors cursor-pointer"
                 :class="scrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/80 hover:text-white'">
                Archive <span class="text-[10px]">&#9660;</span>
              </a>
              <div class="nav-dropdown absolute top-full right-0 pt-2 w-56">
                <div class="bg-white rounded-lg shadow-xl py-2 border">
                  <a href="/#archive" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-kaiho-green/10 hover:text-kaiho-green">第3回大同窓会</a>
                  <NuxtLink to="/blog/career-crossroads-manual" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-kaiho-green/10 hover:text-kaiho-green">キャリクロ運営マニュアル</NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="lg:hidden p-2 transition-colors"
            :class="scrolled ? 'text-neutral-900' : 'text-white'"
            aria-label="メニュー"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div class="mobile-menu lg:hidden" :class="{ open: mobileMenuOpen }">
          <div class="bg-white rounded-b-xl shadow-xl py-4 px-4 space-y-3">
            <NuxtLink to="/" class="block text-sm text-neutral-700 hover:text-kaiho-green py-2" @click="mobileMenuOpen = false">Home</NuxtLink>
            <NuxtLink to="/about" class="block text-sm text-neutral-700 hover:text-kaiho-green py-2" @click="mobileMenuOpen = false">開邦雄飛会について</NuxtLink>
            <a href="/#projects" class="block text-sm text-neutral-700 hover:text-kaiho-green py-2" @click="mobileMenuOpen = false">事業・プロジェクト</a>
            <a href="/#mentor" class="block text-sm text-neutral-700 hover:text-kaiho-green py-2" @click="mobileMenuOpen = false">メンター制度</a>
            <a href="/#fund" class="block text-sm text-neutral-700 hover:text-kaiho-green py-2" @click="mobileMenuOpen = false">基金・寄付</a>
            <a href="/#news" class="block text-sm text-neutral-700 hover:text-kaiho-green py-2" @click="mobileMenuOpen = false">お知らせ</a>
            <NuxtLink to="/blog/career-crossroads-manual" class="block text-sm text-neutral-700 hover:text-kaiho-green py-2" @click="mobileMenuOpen = false">アーカイブ</NuxtLink>
            <NuxtLink to="/officers" class="block text-sm text-neutral-700 hover:text-kaiho-green py-2" @click="mobileMenuOpen = false">役員名簿</NuxtLink>
            <NuxtLink to="/contact" class="block text-sm text-neutral-700 hover:text-kaiho-green py-2" @click="mobileMenuOpen = false">お問い合わせ</NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-neutral-900 text-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div class="grid md:grid-cols-4 gap-12">
          <!-- Brand -->
          <div class="md:col-span-1">
            <p class="text-2xl font-black mb-2"><span class="text-kaiho-gold">開邦雄飛会</span></p>
            <p class="text-white/50 text-sm leading-relaxed">
              開邦高校同窓会<br>
              邦を開き、世界に羽ばたく
            </p>
          </div>

          <!-- About Links -->
          <div>
            <p class="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">開邦雄飛会について</p>
            <div class="space-y-2">
              <NuxtLink to="/about" class="block text-white/60 hover:text-white transition-colors text-sm">理念・方針</NuxtLink>
              <NuxtLink to="/about" class="block text-white/60 hover:text-white transition-colors text-sm">規約</NuxtLink>
              <NuxtLink to="/officers" class="block text-white/60 hover:text-white transition-colors text-sm">役員名簿</NuxtLink>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdmpqzISxWHhyDvHzmWPMEZpfx8YUpUdfAW_4JjebFlnvWoYA/viewform?usp=dialog" target="_blank" class="block text-white/60 hover:text-white transition-colors text-sm">運営メンバー募集</a>
            </div>
          </div>

          <!-- External Links -->
          <div>
            <p class="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">外部リンク</p>
            <div class="space-y-2">
              <a href="https://www.kaiho-h.open.ed.jp/" target="_blank" class="block text-white/60 hover:text-white transition-colors text-sm">開邦高校公式サイト</a>
              <a href="https://www.facebook.com/kaihoyuhi/" target="_blank" class="block text-white/60 hover:text-white transition-colors text-sm">Facebook</a>
              <a href="https://www.instagram.com/kaihoyuhi?igsh=MTRwdjVrNTNpZnpwcA%3D%3D&utm_source=qr" target="_blank" class="block text-white/60 hover:text-white transition-colors text-sm">Instagram</a>
              <a href="https://note.com/kaihoyuuhikai" target="_blank" class="block text-white/60 hover:text-white transition-colors text-sm">note マガジン</a>
            </div>
          </div>

          <!-- Branch Links -->
          <div>
            <p class="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">支部</p>
            <div class="space-y-2">
              <a href="#" class="block text-white/60 hover:text-white transition-colors text-sm">東京支部</a>
              <a href="#" class="block text-white/60 hover:text-white transition-colors text-sm">関西支部</a>
              <a href="#" class="block text-white/60 hover:text-white transition-colors text-sm">海外支部</a>
            </div>
          </div>
        </div>

        <div class="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-white/30 text-xs tracking-wider">
            &copy; {{ new Date().getFullYear() }} 開邦雄飛会 All Rights Reserved.
          </p>
          <div class="flex gap-6">
            <NuxtLink to="/terms" class="text-white/30 hover:text-white/60 text-xs transition-colors">利用規約</NuxtLink>
            <NuxtLink to="/privacy" class="text-white/30 hover:text-white/60 text-xs transition-colors">プライバシーポリシー</NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false)
const scrolled = ref(false)

onMounted(() => {
  const handleScroll = () => {
    scrolled.value = window.scrollY > 80

    // Scroll progress
    const docH = document.documentElement.scrollHeight - window.innerHeight
    const pct = (window.scrollY / docH) * 100
    const progressEl = document.getElementById('scroll-progress')
    if (progressEl) {
      progressEl.style.width = pct + '%'
    }
  }
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})
</script>
