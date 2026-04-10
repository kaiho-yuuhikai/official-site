<template>
  <div>
    <!-- ============================================================ -->
    <!-- HERO SECTION                                                  -->
    <!-- ============================================================ -->
    <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-emerald-600"></div>
      <!-- Pattern overlay -->
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M30 0L60 30L30 60L0 30Z%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
      <!-- Particles container -->
      <div ref="particlesRef" class="absolute inset-0 overflow-hidden"></div>
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black/20"></div>

      <!-- Content -->
      <div class="relative z-10 text-center text-white px-6 max-w-5xl">
        <div class="mb-6 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2 text-sm">
          <span class="w-2 h-2 bg-kaiho-gold rounded-full badge-pulse"></span>
          新体制で活動開始
        </div>

        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight tracking-tight">
          <span class="block">邦を開き、</span>
          <span class="block text-kaiho-gold">世界に羽ばたく。</span>
        </h1>

        <p class="text-lg md:text-xl font-light text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          開邦高校同窓会「開邦雄飛会」&#8212; 8,000名を超える卒業生がつくる<br class="hidden md:inline">ネットワークで、在校生と同窓生の未来を支える。
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#about" class="inline-flex items-center justify-center px-8 py-4 bg-white text-kaiho-green font-bold rounded-full hover:bg-kaiho-gold hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
            開邦雄飛会について
          </a>
          <NuxtLink to="/mentor/registration" class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-kaiho-green transition-all duration-300">
            メンターに登録
          </NuxtLink>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdmpqzISxWHhyDvHzmWPMEZpfx8YUpUdfAW_4JjebFlnvWoYA/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-kaiho-green transition-all duration-300">
            運営メンバーに参加
          </a>
          <span class="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white/40 font-bold rounded-full cursor-not-allowed">
            寄付・支援をする（準備中）
          </span>
        </div>

        <!-- Stats Counter -->
        <div ref="heroStatsRef" class="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-black mb-1">
              <span class="count-number" data-target="38">0</span><span class="text-kaiho-gold">期</span>
            </div>
            <div class="text-xs text-white/60 tracking-wider uppercase">History</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-black mb-1">
              <span class="count-number" data-target="8000">0</span><span class="text-kaiho-gold">+</span>
            </div>
            <div class="text-xs text-white/60 tracking-wider uppercase">Alumni</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-black mb-1">
              <span class="count-number" data-target="3">0</span><span class="text-kaiho-gold">支部</span>
            </div>
            <div class="text-xs text-white/60 tracking-wider uppercase">Branches</div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div class="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div class="w-1.5 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- MISSION SECTION                                               -->
    <!-- ============================================================ -->
    <section id="about" class="py-24 md:py-32 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Mission</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-4">
            <span class="gradient-text">開邦雄飛</span>の理念
          </h2>
          <div class="section-divider mt-6"></div>
        </div>

        <div class="max-w-3xl mx-auto text-center mb-20 fade-in">
          <p class="text-lg text-neutral-600 leading-relaxed">
            「開邦雄飛」&#8212; 邦を開き、世界に羽ばたく人材の育成。<br>
            開邦高校の校訓を受け継ぎ、同窓会「開邦雄飛会」は<br class="hidden md:inline">
            卒業生と在校生をつなぎ、同窓生同士の交流を深める架け橋として活動しています。
          </p>
        </div>

        <!-- 3 Pillars -->
        <div class="grid md:grid-cols-3 gap-8 fade-in">
          <!-- Pillar 1 -->
          <div class="card-hover bg-gradient-to-br from-kaiho-green/5 to-emerald-50 rounded-2xl p-8 text-center border border-kaiho-green/10">
            <div class="w-20 h-20 bg-kaiho-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-kaiho-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/></svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-neutral-900">在校生・同窓生支援</h3>
            <p class="text-neutral-600 text-sm leading-relaxed">
              雄飛会支援基金やメンター制度で在校生の学びを支え、同窓生の活動やキャリア形成も応援します。
            </p>
          </div>

          <!-- Pillar 2 -->
          <div class="card-hover bg-gradient-to-br from-kaiho-gold/5 to-amber-50 rounded-2xl p-8 text-center border border-kaiho-gold/10">
            <div class="w-20 h-20 bg-kaiho-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-kaiho-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/></svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-neutral-900">同窓生ネットワーク</h3>
            <p class="text-neutral-600 text-sm leading-relaxed">
              大同窓会や各支部の活動を通じて、世代を超えた交流・協力・ビジネス連携の場を創ります。
            </p>
          </div>

          <!-- Pillar 3 -->
          <div class="card-hover bg-gradient-to-br from-kaiho-blue/5 to-blue-50 rounded-2xl p-8 text-center border border-kaiho-blue/10">
            <div class="w-20 h-20 bg-kaiho-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-kaiho-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/></svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-neutral-900">社会貢献</h3>
            <p class="text-neutral-600 text-sm leading-relaxed">
              チャリティイベントや地域への貢献活動で、開邦の力を社会に還元します。
            </p>
          </div>
        </div>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- FEATURED PROJECTS                                             -->
    <!-- ============================================================ -->
    <section id="projects" class="py-24 md:py-32 bg-neutral-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Projects</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-4">注力事業</h2>
          <p class="text-neutral-500 mt-4 max-w-xl mx-auto">同窓生の専門性を活かし、在校生と同窓生の未来を拓くプロジェクト</p>
          <div class="section-divider mt-6"></div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in">
          <!-- Project 1: 雄飛会支援基金 -->
          <div class="card-hover bg-white rounded-2xl overflow-hidden shadow-md border border-neutral-200 group">
            <div class="h-36 relative overflow-hidden">
              <img :src="`${baseURL}images/kaiho-van.jpg`" alt="開邦高校 学校車" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-black/20"></div>
            </div>
            <div class="p-8">
              <div class="flex items-start justify-between mb-4">
                <div class="w-14 h-14 bg-kaiho-purple/10 rounded-xl flex items-center justify-center">
                  <svg class="w-7 h-7 text-kaiho-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"/></svg>
                </div>
                <span class="bg-kaiho-purple/10 text-kaiho-purple text-xs font-bold px-3 py-1 rounded-full badge-pulse">募集中</span>
              </div>
              <h3 class="text-xl font-bold mb-2 text-neutral-900">雄飛会支援基金</h3>
              <p class="text-neutral-500 text-sm mb-6 leading-relaxed">在校生の探究活動・部活動および芸術科アーティストの活動を資金面から支援・助成します。</p>
              <div class="mb-4">
                <div class="flex justify-between text-xs text-neutral-500 mb-1">
                  <span>達成率（目標¥1,000万）</span>
                  <span class="font-bold text-kaiho-purple">16.1%</span>
                </div>
                <div class="w-full bg-neutral-100 rounded-full h-2.5">
                  <div class="progress-fill bg-gradient-to-r from-kaiho-purple to-purple-400 h-2.5 rounded-full" style="width: 0%" data-width="16.1%"></div>
                </div>
              </div>
              <a href="#fund" class="inline-flex items-center gap-2 text-kaiho-purple text-sm font-bold hover:gap-3 transition-all">
                詳しく見る <span>&rarr;</span>
              </a>
            </div>
          </div>

          <!-- Project 2: メンター制度 -->
          <div class="card-hover bg-white rounded-2xl overflow-hidden shadow-md border border-neutral-200 group">
            <div class="h-3 bg-gradient-to-r from-kaiho-blue to-blue-400"></div>
            <div class="p-8">
              <div class="flex items-start justify-between mb-4">
                <div class="w-14 h-14 bg-kaiho-blue/10 rounded-xl flex items-center justify-center">
                  <svg class="w-7 h-7 text-kaiho-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>
                </div>
                <div class="flex flex-col items-end gap-1">
                  <span class="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide">NEW</span>
                  <span class="bg-kaiho-blue/10 text-kaiho-blue text-[10px] font-bold px-2 py-0.5 rounded-full">2026年度 開始予定</span>
                </div>
              </div>
              <h3 class="text-xl font-bold mb-2 text-neutral-900">メンター制度</h3>
              <p class="text-neutral-500 text-sm mb-6 leading-relaxed">在校生の探究活動や進路選択を支援する。</p>
              <div class="flex items-center gap-3 mb-4">
                <div class="flex -space-x-2">
                  <div class="w-8 h-8 bg-kaiho-green rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">K</div>
                  <div class="w-8 h-8 bg-kaiho-blue rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">U</div>
                  <div class="w-8 h-8 bg-kaiho-gold rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">G</div>
                  <div class="w-8 h-8 bg-kaiho-purple rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">I</div>
                </div>
                <span class="text-xs text-neutral-500"><strong>{{ mentors.length }}名</strong> が登録中</span>
              </div>
              <a href="#mentor" class="inline-flex items-center gap-2 text-kaiho-blue text-sm font-bold hover:gap-3 transition-all">
                メンター一覧を見る <span>&rarr;</span>
              </a>
            </div>
          </div>

          <!-- Project 4: 同窓生交流 -->
          <div class="card-hover bg-white rounded-2xl overflow-hidden shadow-md border border-neutral-200 group">
            <div class="h-40 relative overflow-hidden">
              <img :src="`${baseURL}images/alumni-exchange.jpeg`" alt="同窓生交流活動" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-black/30"></div>
            </div>
            <div class="p-8">
              <div class="flex items-start justify-between mb-4">
                <div class="w-14 h-14 bg-kaiho-teal/10 rounded-xl flex items-center justify-center">
                  <svg class="w-7 h-7 text-kaiho-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
                </div>
                <span class="bg-kaiho-teal/10 text-kaiho-teal text-xs font-bold px-3 py-1 rounded-full badge-pulse">企画中</span>
              </div>
              <h3 class="text-xl font-bold mb-2 text-neutral-900">同窓生交流活動</h3>
              <p class="text-neutral-500 text-sm mb-6 leading-relaxed">大同窓会やチャリティイベントなど、同窓生同士が世代を超えてつながる交流の場を企画。</p>
              <div class="bg-kaiho-teal/5 rounded-lg p-3 mb-4">
                <div class="flex items-center gap-3">
                  <span class="text-2xl font-black text-kaiho-teal">537</span>
                  <span class="text-xs text-neutral-500">名が前回の<br>大同窓会に参加</span>
                </div>
              </div>
              <a href="#archive" class="inline-flex items-center gap-2 text-kaiho-teal text-sm font-bold hover:gap-3 transition-all">
                過去の開催を見る <span>&rarr;</span>
              </a>
            </div>
          </div>

          <!-- Project 5: 創立記念特設授業 -->
          <div class="card-hover bg-white rounded-2xl overflow-hidden shadow-md border border-neutral-200 group">
            <div class="h-40 relative overflow-hidden">
              <img :src="`${baseURL}images/special-lecture-classroom.jpeg`" alt="創立記念特設授業" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-black/30"></div>
            </div>
            <div class="p-8">
              <div class="flex items-start justify-between mb-4">
                <div class="w-14 h-14 bg-kaiho-green/10 rounded-xl flex items-center justify-center">
                  <svg class="w-7 h-7 text-kaiho-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                </div>
                <span class="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">開催報告</span>
              </div>
              <h3 class="text-xl font-bold mb-2 text-neutral-900">創立記念特設授業</h3>
              <p class="text-neutral-500 text-sm mb-6 leading-relaxed">卒業生講師が母校を訪れ、キャリアの歩みを在校生に届ける授業。2011年から続くメイン活動。</p>
              <div class="bg-kaiho-green/5 rounded-lg p-3 mb-4">
                <div class="flex items-center gap-2 flex-wrap gap-y-1">
                  <span class="text-xs text-neutral-500">2025年10月31日 新校舎にて開催</span>
                </div>
                <p class="text-xs text-neutral-500 mt-1">中高生 50分 × 2クラス講演</p>
              </div>
              <NuxtLink to="/activities/special-lecture" class="inline-flex items-center gap-2 text-kaiho-green text-sm font-bold hover:gap-3 transition-all">
                詳しく見る <span>&rarr;</span>
              </NuxtLink>
            </div>
          </div>
        </div>



      </div>
    </section>


    <!-- ============================================================ -->
    <!-- FUND / DONATION SECTION                                       -->
    <!-- ============================================================ -->
    <section id="fund" class="py-24 md:py-32 bg-gradient-to-br from-kaiho-purple/5 via-white to-purple-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-purple mb-4">Fund</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-4">基金・寄付</h2>
          <p class="text-neutral-500 mt-4 max-w-xl mx-auto">あなたの支援が、在校生と同窓生の活動を支える</p>
          <div class="section-divider mt-6"></div>
        </div>

        <!-- Total counter -->
        <div class="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-2xl mx-auto mb-16 text-center border border-kaiho-purple/10 fade-in">
          <p class="text-sm text-neutral-500 mb-2">累計寄付額</p>
          <div class="text-5xl md:text-6xl font-black text-kaiho-purple mb-2">
            &yen;<span class="count-number" data-target="1613018">0</span>
          </div>
          <p class="text-sm text-neutral-400">第3回大同窓会での寄付金を含みます</p>
        </div>

        <!-- Fund Cards -->
        <div class="max-w-2xl mx-auto fade-in">
          <!-- Fund 1 -->
          <div class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100">
            <div class="h-48 bg-gradient-to-br from-kaiho-purple/20 via-purple-100 to-indigo-100 flex items-center justify-center">
              <div class="text-center">
                <div class="text-6xl mb-2">&#128300;</div>
                <span class="bg-kaiho-purple text-white text-xs font-bold px-3 py-1 rounded-full">総合支援</span>
              </div>
            </div>
            <div class="p-8">
              <h3 class="text-xl font-bold text-neutral-900 mb-2">雄飛会 支援基金</h3>
              <p class="text-neutral-500 text-sm mb-6 leading-relaxed">
                在校生の探究活動・部活動および芸術科アーティストの活動を幅広く支援します。寄付金は、開邦雄飛会が責任を持って各支援事業に適切に配分いたします。
              </p>
              <div class="mb-4">
                <div class="flex justify-between text-sm mb-2">
                  <span class="text-neutral-500">&yen;1,613,018 / &yen;10,000,000</span>
                  <span class="font-bold text-kaiho-purple">16.1%</span>
                </div>
                <div class="w-full bg-neutral-100 rounded-full h-3">
                  <div class="progress-fill bg-gradient-to-r from-kaiho-purple to-purple-400 h-3 rounded-full" style="width: 0%" data-width="16.1%"></div>
                </div>
              </div>
              <div class="w-full py-3 bg-neutral-100 text-neutral-400 font-bold rounded-xl text-center text-sm cursor-not-allowed">
                寄付フォーム 準備中
              </div>
            </div>
          </div>
        </div>

        <!-- Donor benefits -->
        <div class="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 fade-in">
          <h3 class="text-lg font-bold text-neutral-900 mb-6 text-center">寄付者特典</h3>
          <div class="flex justify-center">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-kaiho-purple/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-kaiho-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>
              </div>
              <div>
                <h4 class="font-bold text-sm text-neutral-900">サイトへの掲載</h4>
                <p class="text-xs text-neutral-500 mt-1">ご希望の方のみ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- FINANCE SECTION                                               -->
    <!-- ============================================================ -->
    <section id="finance" class="py-24 md:py-32 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Finance</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-4">財務状況</h2>
          <p class="text-neutral-500 mt-4 max-w-xl mx-auto">雄飛会の活動を支える資産概況を公開しています</p>
          <div class="section-divider mt-6"></div>
        </div>

        <div class="max-w-4xl mx-auto fade-in">
          <div class="bg-neutral-50 rounded-2xl p-8 border border-neutral-100">
            <h3 class="text-xl font-bold text-neutral-900 mb-8 flex items-center gap-2">
              <svg class="w-6 h-6 text-kaiho-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
              資産概況サマリー（2026年3月時点）
            </h3>

            <div class="py-12 text-center">
              <div class="w-16 h-16 bg-kaiho-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-kaiho-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <h4 class="text-lg font-bold text-neutral-900 mb-2">閲覧制限中</h4>
              <p class="text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
                財務状況の詳細は、雄飛会会員（卒業生・教職員）のみに公開しております。適正な組織運営のため、ご理解のほどよろしくお願いいたします。
              </p>
            </div>

            <div class="mt-8 pt-8 border-t border-neutral-200 text-center">
              <NuxtLink to="/about" class="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-700 transition-colors text-sm">
                財務適正化方針を見る
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- MENTOR SECTION                                                -->
    <!-- ============================================================ -->
    <section id="mentor" class="py-24 md:py-32 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-blue mb-4">Mentor</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-4">メンター制度</h2>
          <p class="text-neutral-500 mt-4 max-w-xl mx-auto">あなたの経験が、後輩の未来を拓く</p>
          <div class="inline-flex items-center gap-2 mt-5 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
            <span class="text-emerald-700 text-xs font-bold">2026年度より開始予定の新規事業</span>
          </div>
          <div class="section-divider mt-6"></div>
        </div>

        <!-- Mentor support types -->
        <div class="bg-kaiho-blue/5 rounded-2xl p-8 md:p-12 fade-in">
          <h3 class="text-lg font-bold text-neutral-900 mb-6 text-center">メンターが提供できるサポート</h3>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white rounded-xl p-4 text-center shadow-sm">
              <div class="text-2xl mb-2">&#127908;</div>
              <h4 class="font-bold text-sm text-neutral-900">特設授業での講話</h4>
              <p class="text-xs text-neutral-500 mt-1">学校での特別講演</p>
            </div>
            <div class="bg-white rounded-xl p-4 text-center shadow-sm">
              <div class="text-2xl mb-2">&#128300;</div>
              <h4 class="font-bold text-sm text-neutral-900">探究活動や進路の伴走支援</h4>
              <p class="text-xs text-neutral-500 mt-1"></p>
            </div>
            <div class="bg-white rounded-xl p-4 text-center shadow-sm">
              <div class="text-2xl mb-2">&#128187;</div>
              <h4 class="font-bold text-sm text-neutral-900">オンライン相談</h4>
              <p class="text-xs text-neutral-500 mt-1">遠方でもサポート</p>
            </div>
            <div class="bg-white rounded-xl p-4 text-center shadow-sm">
              <div class="text-2xl mb-2">&#127970;</div>
              <h4 class="font-bold text-sm text-neutral-900">インターン受入</h4>
              <p class="text-xs text-neutral-500 mt-1">実務体験の機会</p>
              <p class="text-xs text-neutral-400 mt-1">※対応できない場合もあります</p>
            </div>
          </div>
        </div>

        <!-- Mentor Grid -->
        <div class="mt-16 mb-6 text-center fade-in">
          <h3 class="text-xl font-black text-neutral-900">メンター登録者</h3>
        </div>
        <div class="fade-in">
          <div class="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div v-for="mentor in mentors" :key="mentor.name + mentor.generation"
                 class="bg-white rounded-2xl shadow-md border border-neutral-100 overflow-hidden">
              <div class="h-1.5 bg-gradient-to-r from-kaiho-blue to-blue-400"></div>
              <div class="p-5 md:p-6">
                <div class="flex items-center gap-4 mb-4">
                  <div class="w-14 h-14 rounded-full flex-shrink-0 overflow-hidden">
                    <img v-if="mentor.image" :src="`${baseURL}${mentor.image}`" :alt="mentor.name" class="w-full h-full object-cover">
                    <div v-else class="w-full h-full bg-gradient-to-br from-kaiho-blue to-blue-500 flex items-center justify-center text-white text-xl font-black">
                      {{ mentor.name.charAt(0) }}
                    </div>
                  </div>
                  <div>
                    <p class="text-xs text-neutral-400 tracking-widest mb-0.5">{{ mentor.furigana }}</p>
                    <h3 class="text-lg font-black text-neutral-900">{{ mentor.name }}</h3>
                    <div class="flex flex-wrap items-center gap-1.5 mt-1">
                      <span class="text-xs font-bold bg-kaiho-blue/10 text-kaiho-blue px-2 py-0.5 rounded-full">{{ mentor.generation }}</span>
                      <span class="text-xs text-neutral-500">{{ mentor.course }}</span>
                      <span class="text-xs text-neutral-400">📍 {{ mentor.region }}</span>
                    </div>
                  </div>
                </div>
                <div class="bg-neutral-50 rounded-xl p-4 mb-4">
                  <p class="text-neutral-700 leading-relaxed text-xs">{{ mentor.profile }}</p>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="tag in mentor.tags" :key="tag"
                        class="text-xs px-2.5 py-0.5 rounded-full font-medium"
                        :class="mentor.tagClass">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- メンター登録 -->
          <div class="mt-10 flex justify-center">
            <NuxtLink to="/mentor/registration"
              class="group inline-flex flex-col items-center gap-3 bg-gradient-to-br from-kaiho-green to-emerald-500 rounded-2xl px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div class="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15"/></svg>
              </div>
              <div class="text-center">
                <p class="text-white font-black text-lg leading-tight">メンターになる</p>
                <p class="text-white/80 text-xs mt-1">あなたの経験を後輩に共有しませんか？</p>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- 注意書き -->
        <p class="text-xs text-neutral-400 text-center mt-8 fade-in leading-relaxed">
          メンターが提供できるサポート内容に関しては、無理のない範囲で安心して活動いただけるように個別に調整いたします。
        </p>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- NEWS SECTION                                                  -->
    <!-- ============================================================ -->
    <section id="news" class="py-24 md:py-32 bg-kaiho-green text-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-white/50 mb-4">News</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">お知らせ</h2>
        </div>

        <div class="max-w-2xl mx-auto space-y-0 fade-in">
          <div v-for="(item, i) in newsItems" :key="i"
             class="group flex gap-6 items-start py-6 px-4 -mx-4 rounded-lg transition-colors"
             :class="{ 'border-b border-white/20': i < newsItems.length - 1 }">
            <time class="text-sm text-white/50 flex-shrink-0 w-28">{{ item.date }}</time>
            <div class="flex-1 flex items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">{{ item.category }}</span>
                  <span v-if="item.isNew" class="text-[10px] bg-kaiho-gold text-white px-2 py-0.5 rounded-full font-bold">NEW</span>
                </div>
                <h3 class="text-white font-medium">{{ item.title }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- NOTE MAGAZINE SECTION                                         -->
    <!-- ============================================================ -->
    <section id="magazine" class="py-24 md:py-32 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-neutral-400 mb-4">Magazine</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-4">開邦雄飛会マガジン</h2>
          <p class="text-neutral-500 mt-4 max-w-xl mx-auto">note.com で活動の最新情報を発信中</p>
          <div class="section-divider mt-6"></div>
        </div>

        <!-- Loading state -->
        <div v-if="noteLoading" class="text-center py-12">
          <div class="inline-flex items-center gap-3 text-neutral-400">
            <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
            <span class="text-sm">note.com から最新記事を取得中...</span>
          </div>
        </div>

        <!-- Articles container -->
        <div v-if="noteArticles.length > 0 && !noteLoading" class="grid md:grid-cols-3 gap-8">
          <a v-for="article in noteArticles" :key="article.link"
             :href="article.link" target="_blank" rel="noopener noreferrer"
             class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 block group">
            <div class="h-48 bg-neutral-100 overflow-hidden">
              <img v-if="article.image" :src="article.image" :alt="article.title"
                   class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy"
                   @error="($event.target as HTMLImageElement).parentElement!.innerHTML = noteFallbackImageHtml">
              <div v-else class="h-full bg-gradient-to-br from-kaiho-green/20 to-emerald-100 flex items-center justify-center">
                <svg class="w-12 h-12 text-kaiho-green/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs text-neutral-400">{{ formatNoteDate(article.pubDate) }}</span>
                <span v-if="isNewArticle(article.pubDate)" class="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">NEW</span>
                <span class="text-[10px] bg-kaiho-green/10 text-kaiho-green px-2 py-0.5 rounded-full font-medium">note</span>
              </div>
              <h3 class="font-bold text-neutral-900 group-hover:text-kaiho-green transition-colors mb-2 line-clamp-2">{{ article.title }}</h3>
              <p v-if="article.description" class="text-neutral-500 text-sm line-clamp-2">{{ truncateText(stripHtmlTags(article.description), 80) }}</p>
              <div class="mt-3 inline-flex items-center gap-1 text-xs font-bold text-kaiho-green">
                noteで読む <span>&rarr;</span>
              </div>
            </div>
          </a>
        </div>

        <!-- Error / fallback state -->
        <div v-if="noteError && !noteLoading" class="text-center py-12">
          <div class="inline-flex flex-col items-center gap-4">
            <div class="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>
            </div>
            <p class="text-neutral-500 text-sm">記事の取得に失敗しました。直接 note をご覧ください。</p>
            <a href="https://note.com/kaihoyuuhikai" target="_blank" class="inline-flex items-center gap-2 px-6 py-2 bg-kaiho-green text-white font-bold rounded-full text-sm hover:bg-kaiho-green-dark transition-colors">
              note.com で読む &rarr;
            </a>
          </div>
        </div>

        <div class="text-center mt-12">
          <a href="https://note.com/kaihoyuuhikai/m/m20c04499fc49" target="_blank" class="inline-flex items-center gap-2 px-8 py-3 bg-neutral-900 text-white font-bold rounded-full hover:bg-neutral-700 transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4.3c0-.5-.5-1-1.3-.8l-6.4 2.2L8 3.3C7.5 3 7 3 6.5 3.2L1.8 5c-.5.2-.8.5-.8 1v14.7c0 .5.5 1 1.3.8l6.4-2.2 6.3 2.2c.5.3 1 .3 1.5.1l4.7-1.8c.5-.2.8-.5.8-1V4.3z"/></svg>
            note マガジンをすべて読む
          </a>
        </div>

        <!-- Creator Recruitment Banner -->
        <div class="mt-16 bg-gradient-to-br from-kaiho-green/5 to-emerald-50 border border-kaiho-green/20 rounded-3xl p-8 md:p-12">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="flex-shrink-0 w-20 h-20 bg-kaiho-green/10 rounded-2xl flex items-center justify-center">
              <svg class="w-10 h-10 text-kaiho-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
              </svg>
            </div>
            <div class="flex-1 text-center md:text-left">
              <div class="inline-flex items-center gap-2 bg-kaiho-green text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                <span>RECRUIT</span>
              </div>
              <h3 class="text-2xl md:text-3xl font-black tracking-tight text-neutral-900 mb-3">
                クリエイター募集中
              </h3>
              <p class="text-neutral-600 leading-relaxed max-w-xl">
                同窓生・在校生のためになる記事を書いてみませんか？<br class="hidden md:inline">
                キャリア・進路・留学・研究・地域活動など、あなたの経験や知識を発信しましょう。
              </p>
              <ul class="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                <li class="text-xs bg-white border border-kaiho-green/20 text-kaiho-green font-medium px-3 py-1 rounded-full">大学・進学体験</li>
                <li class="text-xs bg-white border border-kaiho-green/20 text-kaiho-green font-medium px-3 py-1 rounded-full">留学・海外経験</li>
                <li class="text-xs bg-white border border-kaiho-green/20 text-kaiho-green font-medium px-3 py-1 rounded-full">研究・専門知識</li>
                <li class="text-xs bg-white border border-kaiho-green/20 text-kaiho-green font-medium px-3 py-1 rounded-full">地域・社会活動</li>
              </ul>
            </div>
            <div class="flex-shrink-0">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdmpqzISxWHhyDvHzmWPMEZpfx8YUpUdfAW_4JjebFlnvWoYA/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-8 py-4 bg-kaiho-green text-white font-bold rounded-full hover:bg-kaiho-green-dark transition-colors shadow-md shadow-kaiho-green/20 whitespace-nowrap">
                執筆を申し込む
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- BRANCHES SECTION                                              -->
    <!-- ============================================================ -->
    <section class="py-24 md:py-32 bg-gradient-to-br from-kaiho-teal/5 via-white to-teal-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-teal mb-4">Branches</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-4">支部情報</h2>
          <p class="text-neutral-500 mt-4 max-w-xl mx-auto">全国・海外に広がる開邦ネットワーク</p>
          <div class="section-divider mt-6"></div>
        </div>

        <!-- 参加方法の流れ -->
        <div class="max-w-2xl mx-auto mb-10 fade-in">
          <div class="bg-kaiho-teal/5 rounded-2xl px-6 py-5">
            <p class="text-xs font-bold text-kaiho-teal text-center mb-4">開邦雄飛会Facebookの各支部グループ参加方法</p>
            <div class="flex flex-col items-center gap-1">
              <div class="flex items-center gap-3 w-44">
                <span class="w-6 h-6 rounded-full bg-kaiho-teal text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                <span class="text-sm text-neutral-700">リンクをクリック</span>
              </div>
              <span class="text-kaiho-teal/40 text-sm leading-none">↓</span>
              <div class="flex items-center gap-3 w-44">
                <span class="w-6 h-6 rounded-full bg-kaiho-teal text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                <span class="text-sm text-neutral-700">参加リクエストを送信</span>
              </div>
              <span class="text-kaiho-teal/40 text-sm leading-none">↓</span>
              <div class="flex items-center gap-3 w-44">
                <span class="w-6 h-6 rounded-full bg-kaiho-teal text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                <span class="text-sm text-neutral-700">管理者が承認</span>
              </div>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-8 fade-in">
          <div class="card-hover bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 text-center">
            <div class="text-5xl mb-4">🗼</div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">東京支部</h3>
            <p class="text-neutral-500 text-sm mb-4">首都圏在住の同窓生の交流拠点</p>
            <a href="https://www.facebook.com/groups/2423519921418763/" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#1877F2] px-4 py-2 rounded-full hover:bg-[#166FE5] transition-colors">
              <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebookグループへ
            </a>
          </div>

          <div class="card-hover bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 text-center">
            <div class="text-5xl mb-4">⛩️</div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">関西支部</h3>
            <p class="text-neutral-500 text-sm mb-4">関西圏在住の同窓生の交流拠点</p>
            <a href="https://www.facebook.com/groups/1208559580721409/" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#1877F2] px-4 py-2 rounded-full hover:bg-[#166FE5] transition-colors">
              <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebookグループへ
            </a>
          </div>

          <div class="card-hover bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 text-center">
            <div class="text-5xl mb-4">🌏</div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">海外支部</h3>
            <p class="text-neutral-500 text-sm mb-4">世界各地で活躍する同窓生の拠点</p>
            <a href="https://www.facebook.com/groups/911574427886649/" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#1877F2] px-4 py-2 rounded-full hover:bg-[#166FE5] transition-colors">
              <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebookグループへ
            </a>
          </div>
        </div>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- LINE OPENCHAT SECTION                                         -->
    <!-- ============================================================ -->
    <section id="line-openchat" class="py-24 md:py-32 bg-neutral-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-3xl mx-auto fade-in">
          <div class="bg-gradient-to-br from-[#00B900] to-[#009900] rounded-3xl p-10 text-white text-center shadow-xl">
            <div class="w-16 h-16 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-10 h-10 text-[#00B900]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
            </div>
            <p class="text-xs font-bold tracking-[0.3em] uppercase text-white/60 mb-3">Community</p>
            <h2 class="text-3xl md:text-4xl font-black mb-4">LINEオープンチャット</h2>
            <p class="text-white/90 text-lg font-medium mb-3">開邦雄飛会の公式コミュニティ</p>
            <p class="text-white/75 text-sm mb-8 max-w-lg mx-auto leading-relaxed">
              同窓生・在校生・保護者・開邦に関わる全ての方が参加できるオープンチャットです。<br class="hidden md:inline">
              <strong class="text-white">参加者は誰でも自由に投稿・交流できます。</strong>お気軽にご参加ください！
            </p>
            <a href="https://line.me/ti/g2/FvOXR7Kr0WdVAGjiHdKocaz2_GL8ijFc0vBIJw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
               target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center gap-3 bg-white text-[#00B900] font-bold px-10 py-4 rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl text-base">
              <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
              LINEで参加する
            </a>
          </div>
        </div>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- THREADS SECTION                                               -->
    <!-- ============================================================ -->
    <section id="threads" class="py-24 md:py-32 bg-neutral-900 text-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-12 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-white/30 mb-4">Daily Activities</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">日々の活動</h2>
          <p class="text-white/60 mt-4 max-w-xl mx-auto">Threadsで開邦雄飛会の最新活動・日常の様子を発信しています</p>
          <div class="w-12 h-0.5 bg-white/20 mx-auto mt-6"></div>
        </div>

        <!-- Threadsアイコン＋リンク -->
        <div class="flex flex-col items-center gap-6 fade-in">
          <a href="https://www.threads.com/@kaihoyuhi" target="_blank" rel="noopener noreferrer"
             class="group flex flex-col items-center gap-4 transition-transform duration-300 hover:-translate-y-1">
            <div class="w-24 h-24 rounded-2xl bg-white flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <svg class="w-14 h-14 text-neutral-900" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.851 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.378-.887h-.018c-.852 0-1.668.228-2.27.644-.508.355-.816.814-.878 1.317l-2.043-.256c.217-1.557 1.048-2.848 2.352-3.637C11.011 7.208 12.162 6.9 13.39 6.9h.028c1.673.006 3.013.538 3.979 1.579 1.137 1.228 1.643 3.03 1.466 5.072-.018.217-.043.43-.075.637.654.418 1.209.914 1.655 1.48 1.186 1.512 1.604 3.533.876 5.547-.81 2.22-2.6 3.784-5.195 4.573-.988.3-2.046.462-3.157.462z"/>
              </svg>
            </div>
            <div class="text-center">
              <p class="text-white font-bold text-base">@kaihoyuhi</p>
              <p class="text-white/60 text-xs mt-1">Threads でフォロー</p>
            </div>
          </a>
        </div>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- ARCHIVE SECTION                                               -->
    <!-- ============================================================ -->
    <section id="archive" class="py-24 md:py-32 bg-neutral-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-neutral-400 mb-4">Archive</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-4">アーカイブ</h2>
          <p class="text-neutral-500 mt-4 max-w-xl mx-auto">これまでの活動記録</p>
          <div class="section-divider mt-6"></div>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto fade-in">
          <!-- 大同窓会 Archive -->
          <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100">
            <div class="h-56 relative overflow-hidden">
              <img :src="`${baseURL}images/daidosoukai-3rd.jpg`" alt="第3回大同窓会 集合写真" class="w-full h-full object-cover object-top">
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-5">
                <div>
                  <p class="text-white/70 text-xs mb-1">2025.12.28 開催</p>
                  <h3 class="text-2xl font-black text-white mb-1">第3回 大同窓会</h3>
                  <p class="text-kaiho-gold font-medium text-sm">創立40周年記念</p>
                  <div class="mt-1 flex items-center gap-3 text-white/80 text-xs">
                    <span>参加者 <strong>537名</strong></span>
                    <span>|</span>
                    <span>協賛 <strong>25社</strong></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-6 space-y-3">
              <a href="https://www.facebook.com/reel/1521567145808218" target="_blank" rel="noopener noreferrer" class="group flex items-center justify-between hover:bg-neutral-50 -mx-2 px-2 py-2 rounded-xl transition-colors">
                <p class="text-neutral-500 text-sm">ダイジェスト動画（Facebook リール）</p>
                <svg class="w-5 h-5 text-neutral-400 group-hover:text-kaiho-green transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              </a>
              <a href="https://kaiho-yuuhikai.github.io/" target="_blank" rel="noopener noreferrer" class="group flex items-center justify-between hover:bg-neutral-50 -mx-2 px-2 py-2 rounded-xl transition-colors">
                <p class="text-neutral-500 text-sm">開催報告・登壇者・協賛企業・アンケート分析</p>
                <svg class="w-5 h-5 text-neutral-400 group-hover:text-kaiho-green transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </a>
              <a :href="`${baseURL}files/special-lecture-2024-questionnaire.pdf`" target="_blank" rel="noopener noreferrer" class="group flex items-center justify-between hover:bg-neutral-50 -mx-2 px-2 py-2 rounded-xl transition-colors">
                <p class="text-neutral-500 text-sm">事後アンケート回答結果（PDF）</p>
                <svg class="w-5 h-5 text-neutral-400 group-hover:text-kaiho-green transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </a>
              <a :href="`${baseURL}files/daidosoukai-3rd-slides.pdf`" target="_blank" rel="noopener noreferrer" class="group flex items-center justify-between hover:bg-neutral-50 -mx-2 px-2 py-2 rounded-xl transition-colors">
                <p class="text-neutral-500 text-sm">大同窓会スライド（PDF）</p>
                <svg class="w-5 h-5 text-neutral-400 group-hover:text-kaiho-green transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </a>
            </div>
          </div>

          <!-- 第2回 大同窓会 Archive -->
          <a href="https://yuhikai.amebaownd.com/" target="_blank" rel="noopener noreferrer" class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 block group">
            <div class="h-56 relative overflow-hidden">
              <img :src="`${baseURL}images/daidosoukai-2nd.jpg`" alt="第2回大同窓会" class="w-full h-full object-cover">
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

          <!-- 第1回 大同窓会 Archive -->
          <a :href="`${baseURL}files/daidosoukai-1st-2nd-materials.pdf`" target="_blank" rel="noopener noreferrer" class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 block group">
            <div class="h-56 relative overflow-hidden">
              <img :src="`${baseURL}images/daidosoukai-1st.jpg`" alt="第1回大同窓会" class="w-full h-full object-cover">
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

          <!-- Career Crossroads Manual -->
          <NuxtLink to="/blog/career-crossroads-manual" class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 block group">
            <div class="h-56 relative overflow-hidden">
              <img :src="`${baseURL}images/career-crossroads.jpeg`" alt="キャリア・クロスロード" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                <div>
                  <h3 class="text-2xl font-black text-white mb-1">キャリア・クロスロード</h3>
                  <p class="text-white/80 text-sm font-medium">運営マニュアル</p>
                </div>
              </div>
            </div>
            <div class="p-6">
              <p class="text-xs text-kaiho-orange font-bold mb-1">2025・12・28 大同窓会の事前イベントで開催</p>
              <div class="flex items-center justify-between">
                <p class="text-neutral-500 text-sm">準備から当日進行まで、誰でも主催できるガイド</p>
                <svg class="w-5 h-5 text-neutral-400 group-hover:text-kaiho-orange transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- MEMBERS SECTION                                               -->
    <!-- ============================================================ -->
    <section class="py-24 md:py-32 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Members</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-4">運営メンバー紹介</h2>
          <p class="text-neutral-500 mt-4 max-w-xl mx-auto">開邦雄飛会を支えるメンバーたち</p>
          <p class="text-neutral-500 text-sm mt-3 max-w-xl mx-auto">現在、2026年度の新体制に向けて準備を進めています。世代を超えた多様なメンバーが開邦雄飛会の運営に参画しています。</p>
          <div class="section-divider mt-6"></div>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 fade-in">
          <div v-for="member in members" :key="member.name"
               class="bg-white rounded-2xl p-5 shadow-md border border-neutral-200 flex flex-col gap-4">
            <!-- 写真 + 吹き出しコメント -->
            <div class="flex items-start gap-3">
              <div class="w-14 h-14 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center text-white font-bold text-lg"
                   :class="!member.photo ? member.bgClass : ''">
                <img v-if="member.photo" :src="`${baseURL}${member.photo}`" :alt="member.name" class="w-full h-full object-cover" />
                <span v-else>{{ member.initial }}</span>
              </div>
              <div v-if="member.comment" class="speech-bubble flex-1 text-xs text-neutral-600 leading-relaxed">
                {{ member.comment }}
              </div>
            </div>
            <!-- 名前・期・役職 -->
            <div class="text-center">
              <div class="flex items-center justify-center gap-1.5 flex-wrap mb-1">
                <h4 class="font-bold text-neutral-900">{{ member.name }}</h4>
                <span v-if="member.branch" class="text-[10px] font-bold bg-kaiho-teal/10 text-kaiho-teal px-1.5 py-0.5 rounded-full">{{ member.branch }}</span>
              </div>
              <p class="text-xs text-neutral-400 mb-1">{{ member.generation }}</p>
              <p v-if="member.note" class="text-xs text-neutral-600 leading-snug">{{ member.note }}</p>
            </div>
          </div>
        </div>
        <div class="text-center mt-10">
          <NuxtLink to="/officers" class="inline-flex items-center gap-2 text-kaiho-green font-bold text-sm hover:underline">
            役員・メンバー詳細ページへ <span>&rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </section>


    <!-- ============================================================ -->
    <!-- CTA SECTION                                                   -->
    <!-- ============================================================ -->
    <section class="py-24 md:py-32 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-green mb-4">Join Us</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-4">一緒に「開邦雄飛」を実現しませんか？</h2>
          <p class="text-neutral-500 mt-4 max-w-xl mx-auto">あなたの参加が、開邦の未来をつくります</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto fade-in">
          <!-- CTA 1 -->
          <NuxtLink to="/mentor/registration" class="card-hover block bg-gradient-to-br from-kaiho-blue to-blue-600 rounded-2xl p-8 text-white text-center">
            <div class="text-4xl mb-4">&#129309;</div>
            <h3 class="text-lg font-bold mb-2">メンター登録</h3>
            <p class="text-white/80 text-sm mb-4">あなたの経験を後輩に</p>
            <span class="inline-flex items-center gap-1 text-sm font-bold bg-white/20 px-4 py-2 rounded-full">
              登録フォーム &rarr;
            </span>
          </NuxtLink>

          <!-- CTA 2 -->
          <div class="block bg-gradient-to-br from-kaiho-purple/50 to-purple-600/50 rounded-2xl p-8 text-white text-center opacity-70">
            <div class="text-4xl mb-4">&#128157;</div>
            <h3 class="text-lg font-bold mb-2">寄付・基金</h3>
            <p class="text-white/80 text-sm mb-4">在校生と同窓生の未来を支える</p>
            <span class="inline-flex items-center gap-1 text-sm font-bold bg-white/20 px-4 py-2 rounded-full cursor-not-allowed">
              準備中
            </span>
          </div>

          <!-- CTA 3 -->
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdmpqzISxWHhyDvHzmWPMEZpfx8YUpUdfAW_4JjebFlnvWoYA/viewform?usp=dialog" target="_blank" class="card-hover block bg-gradient-to-br from-kaiho-green to-emerald-600 rounded-2xl p-8 text-white text-center">
            <div class="text-4xl mb-4">&#128587;</div>
            <h3 class="text-lg font-bold mb-2">運営メンバー募集</h3>
            <p class="text-white/80 text-sm mb-4">一緒に組織を創ろう</p>
            <span class="inline-flex items-center gap-1 text-sm font-bold bg-white/20 px-4 py-2 rounded-full">
              応募する &rarr;
            </span>
          </a>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// ── Refs ──
const particlesRef = ref<HTMLElement | null>(null)
const heroStatsRef = ref<HTMLElement | null>(null)

// ── Mentor data ──
interface Mentor {
  name: string
  furigana: string
  generation: string
  course: string
  region: string
  category: string
  tagClass: string
  tags: string[]
  profile: string
  image?: string
}

const mentors: Mentor[] = [
  {
    name: '岸本克巳',
    furigana: 'キシモトカツミ',
    generation: '7期',
    course: '理数科',
    region: '沖縄県',
    category: 'tech',
    tagClass: 'bg-kaiho-blue/10 text-kaiho-blue',
    tags: ['IT', 'ネットワーク'],
    profile: '三井情報株式会社でネットワークエンジニアとして沖縄営業所に在籍。在地方初のスペシャリスト職として、県外のプロジェクトにも参画してます。',
    image: 'images/mentors/kishimoto-katsumi.jpg',
  },
  {
    name: '宮城光男',
    furigana: 'ミヤギミツオ',
    generation: '7期',
    course: '芸術科',
    region: '沖縄県',
    category: 'art',
    tagClass: 'bg-kaiho-gold/20 text-amber-700',
    tags: ['芸術', 'シーサー', '陶芸'],
    profile: '沖縄 那覇市の壺屋の工房・ギャラリーと、恩納村のアトリエにて、シーサーを中心に制作活動してる藝術家です。2019年に火災により消失した平成首里城の瓦礫を使いシーサーとして復活させています。夢・目標はこの世界遺産・平成首里城の瓦礫を素材に、世界一の巨大シーサーを沖縄に作ることです。',
    image: 'images/mentors/miyagi-mitsuo.jpg',
  },
  {
    name: '具志 日南子',
    furigana: 'グシ ヒナコ',
    generation: '26期',
    course: '理数科',
    region: '沖縄県（7月末から埼玉）',
    category: 'tech',
    tagClass: 'bg-kaiho-blue/10 text-kaiho-blue',
    tags: ['ゲームアプリ', '開発', '運営'],
    profile: 'ゲームアプリの開発・運営を行っています。珍しい話を提供できるのではないかと思います。色んな業界があることを知っていただけたら幸いです。',
  },
  {
    name: '我喜屋奏利',
    furigana: 'ガキヤカナト',
    generation: '36期',
    course: '学術探究科',
    region: '東京都',
    category: 'education',
    tagClass: 'bg-kaiho-green/10 text-kaiho-green',
    tags: ['東京大学', '工学部', 'ALOHA'],
    profile: '現役の東大工学部生です。東大進学を中心に多様な進路を応援するALOHAという団体の副代表もしています。',
    image: 'images/mentors/gakiya-kanato.jpg',
  },
]

const currentMentorSlide = ref(0)
function prevMentorSlide() {
  currentMentorSlide.value = (currentMentorSlide.value - 1 + mentors.length) % mentors.length
}
function nextMentorSlide() {
  currentMentorSlide.value = (currentMentorSlide.value + 1) % mentors.length
}

// ── Members ──
const memberColorClasses = [
  'bg-gradient-to-br from-kaiho-green to-emerald-400',
  'bg-gradient-to-br from-kaiho-blue to-blue-400',
  'bg-gradient-to-br from-kaiho-gold to-amber-400',
  'bg-gradient-to-br from-kaiho-purple to-purple-400',
  'bg-gradient-to-br from-kaiho-orange to-orange-400',
  'bg-gradient-to-br from-kaiho-teal to-teal-400',
]
function getMemberBgClass(index: number) {
  return memberColorClasses[index % memberColorClasses.length]
}
const members = [
  { name: 'じょーじ', generation: '13期・14期 理数科', initial: 'じ', bgClass: getMemberBgClass(0), note: 'GScale 代表取締役 | Google Developer Expert', photo: 'images/members/george.png', branch: '', comment: 'システムやデータ分析を手伝います' },
  { name: 'うえま', generation: '16期 理数科', initial: 'う', bgClass: getMemberBgClass(1), note: '薬剤師 | 広報コーディネーター', photo: 'images/members/uema.png', branch: '', comment: 'サークル活動のようなワクワク感を大切に、同窓会組織を活性化していきます。' },
  { name: 'かえ', generation: '20期 英語科', initial: 'か', bgClass: getMemberBgClass(2), note: '経営 | バレエ講師', photo: 'images/members/kae.jpg', branch: '', comment: '楽しいことが大好きです！同窓会を盛り上げて行きましょう♪' },
  { name: 'みねけん', generation: '18期 理数科', initial: 'み', bgClass: getMemberBgClass(3), note: '元カメラマン | 探究活動事務局', photo: 'images/members/mineken.png', branch: '', comment: '総合型選抜専門塾GALに在籍しています。主に探究学習の設計や支援を仕事にしていて、『マイプロジェクト』の沖縄事務局も兼任しています。' },
  { name: 'よしき', generation: '18期 理数科', initial: 'よ', bgClass: getMemberBgClass(4), note: '教諭・沖縄県立球陽高等学校', photo: '', branch: '', comment: '開邦高校と開邦生の可能性を広げたい。海外連携部署に異動しましたが、できる限り関わっていきます。' },
  { name: 'ひなこ', generation: '26期 理数科', initial: 'ひ', bgClass: getMemberBgClass(5), note: '会社員（ゲームアプリ開発・運営）', photo: '', branch: '東京支部', comment: '在校生のキャリア選択のお手伝いや、同窓生に対する発信を行っていきたいです。' },
  { name: 'ヤスイチ', generation: '33期・38期 保護者', initial: 'ヤ', bgClass: getMemberBgClass(2), note: '会社員 | PTA', photo: 'images/members/yasuichi.jpg', branch: '', comment: '地域と学校のつながりづくりに挑戦中。孤高のPTAです、よろしくお願いいたします。' },
]

// ── News items ──
const newsItems = [
  { date: '2026.04.01', category: 'お知らせ', title: '開邦雄飛会公式ホームページ稼働開始', link: null, isNew: true },
  { date: '2026.03.30', category: '総会', title: '令和8年度 定期総会 開催予定（準備中）— 収支報告・予算案・会則変更・新体制・新事業', link: null, isNew: true },
  { date: '2026.03.15', category: 'お知らせ', title: '雄飛会 運営打合せを開催（若狭公民館）', link: 'https://note.com/kaihoyuuhikai/m/m20c04499fc49', isNew: false },
  { date: '2026.03.08', category: '活動', title: 'PTA連携 道路ボランティア清掃を初実施', link: 'https://note.com/kaihoyuuhikai/m/m20c04499fc49', isNew: true },
  { date: '2026.03.01', category: '活動', title: '開邦高校卒業式にて同窓会入会式を実施', link: 'https://note.com/kaihoyuuhikai/m/m20c04499fc49', isNew: false },
  { date: '2026.02.20', category: 'お知らせ', title: '開邦雄飛会 新体制発足・運営メンバー募集開始', link: 'https://note.com/kaihoyuuhikai/m/m20c04499fc49', isNew: false },
  { date: '2025.12.28', category: 'イベント', title: '第3回大同窓会 開催（参加者537名）・キャリア・クロスロード初開催', link: 'https://note.com/kaihoyuuhikai/m/m20c04499fc49', isNew: false },
]

// ── Note Magazine ──
interface NoteArticle {
  title: string
  link: string
  pubDate: string
  description: string
  image: string
}

const noteLoading = ref(true)
const noteError = ref(false)
const noteArticles = ref<NoteArticle[]>([])

// ── Threads posts ──
interface ThreadsPost {
  text: string
  date: string
  url: string
}

const threadsLoading = ref(true)
const threadsPosts = ref<ThreadsPost[]>([])
const baseURL = useRuntimeConfig().app.baseURL

const noteFallbackImageHtml = '<div class="h-full bg-gradient-to-br from-kaiho-green/20 to-emerald-100 flex items-center justify-center"><svg class="w-12 h-12 text-kaiho-green/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg></div>'

function formatNoteDate(dateStr: string): string {
  const d = new Date(dateStr)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

function isNewArticle(dateStr: string): boolean {
  const d = new Date(dateStr)
  const now = new Date()
  const diffDays = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
  return diffDays <= 7
}

function stripHtmlTags(str: string): string {
  if (!str) return ''
  return str.replace(/<[^>]*>/g, '').trim()
}

function truncateText(text: string, maxLen: number): string {
  if (!text || text.length <= maxLen) return text || ''
  return text.substring(0, maxLen) + '...'
}

async function loadNoteArticles() {
  try {
    const res = await fetch(baseURL + 'data/note-articles.json')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (data.articles && data.articles.length > 0) {
      // 最新記事を3件のみ表示
      noteArticles.value = data.articles.slice(0, 3)
    }
  } catch (err) {
    console.warn('Failed to load note articles JSON:', err)
    noteError.value = true
  } finally {
    noteLoading.value = false
  }
}

async function loadThreadsPosts() {
  try {
    const res = await fetch(baseURL + 'data/threads-posts.json')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (data.posts && data.posts.length > 0) {
      threadsPosts.value = data.posts.slice(0, 3)
    }
  } catch (err) {
    console.warn('Failed to load threads posts JSON:', err)
  } finally {
    threadsLoading.value = false
  }
}

function formatThreadsDate(dateStr: string): string {
  const d = new Date(dateStr)
  const m = d.getMonth() + 1
  const day = d.getDate()
  return `${m}月${day}日`
}

// ── Count-up animation ──
function animateCount(el: HTMLElement) {
  const target = parseInt(el.dataset.target || '0')
  const duration = 2000
  const start = performance.now()

  function update(now: number) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    const current = Math.round(eased * target)
    el.textContent = current.toLocaleString()
    if (progress < 1) requestAnimationFrame(update)
    else el.classList.add('active')
  }
  requestAnimationFrame(update)
}

// ── Particles ──
function createParticle() {
  const container = particlesRef.value
  if (!container) return
  const p = document.createElement('div')
  p.classList.add('particle')
  const size = Math.random() * 6 + 2
  const x = Math.random() * 100
  const dur = Math.random() * 8 + 6
  const delay = Math.random() * 4
  p.style.cssText = `
    width: ${size}px; height: ${size}px;
    left: ${x}%; bottom: -10px;
    background: rgba(212,160,23, ${Math.random() * 0.5 + 0.2});
    animation-duration: ${dur}s;
    animation-delay: ${delay}s;
  `
  container.appendChild(p)
  setTimeout(() => p.remove(), (dur + delay) * 1000)
}

// ── Lifecycle ──
onMounted(() => {
  // Fade-in observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')

        // Trigger count-up
        entry.target.querySelectorAll('.count-number[data-target]').forEach(el => {
          const htmlEl = el as HTMLElement
          if (!htmlEl.dataset.counted) {
            htmlEl.dataset.counted = 'true'
            animateCount(htmlEl)
          }
        })

        // Trigger progress bars
        entry.target.querySelectorAll('.progress-fill[data-width]').forEach(bar => {
          const htmlBar = bar as HTMLElement
          if (!htmlBar.dataset.filled) {
            htmlBar.dataset.filled = 'true'
            setTimeout(() => { htmlBar.style.width = htmlBar.dataset.width || '0%' }, 200)
          }
        })
      }
    })
  }, { threshold: 0.15 })

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))

  // Hero stats observer
  const heroSection = document.getElementById('hero')
  if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.count-number[data-target]').forEach(el => {
            const htmlEl = el as HTMLElement
            if (!htmlEl.dataset.counted) {
              htmlEl.dataset.counted = 'true'
              setTimeout(() => animateCount(htmlEl), 500)
            }
          })
        }
      })
    }, { threshold: 0.5 })
    heroObserver.observe(heroSection)
  }

  // Particles
  const particleInterval = setInterval(createParticle, 400)
  for (let i = 0; i < 15; i++) createParticle()

  // Load note articles from static JSON
  loadNoteArticles()
  loadThreadsPosts()

  // Cleanup
  onUnmounted(() => {
    clearInterval(particleInterval)
  })
})
</script>
