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
          開邦高校同窓会「開邦雄飛会」&#8212; 5,000名を超える卒業生がつくる<br class="hidden md:inline">ネットワークで、在校生と同窓生の未来を支える。
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#about" class="inline-flex items-center justify-center px-8 py-4 bg-white text-kaiho-green font-bold rounded-full hover:bg-kaiho-gold hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
            開邦雄飛会について
          </a>
          <a href="#mentor" class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-kaiho-green transition-all duration-300">
            メンターになる
          </a>
          <a href="#fund" class="inline-flex items-center justify-center px-8 py-4 border-2 border-kaiho-gold text-kaiho-gold font-bold rounded-full hover:bg-kaiho-gold hover:text-white transition-all duration-300">
            寄付する
          </a>
        </div>

        <!-- Stats Counter -->
        <div ref="heroStatsRef" class="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-black mb-1">
              <span class="count-number" data-target="37">0</span><span class="text-kaiho-gold">期</span>
            </div>
            <div class="text-xs text-white/60 tracking-wider uppercase">History</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-black mb-1">
              <span class="count-number" data-target="5000">0</span><span class="text-kaiho-gold">+</span>
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
              探究活動基金やメンター制度で在校生の学びを支え、同窓生の活動やキャリア形成も応援します。
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

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in">
          <!-- Project 1: 探究活動基金 -->
          <div class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 group">
            <div class="h-3 bg-gradient-to-r from-kaiho-purple to-purple-400"></div>
            <div class="p-8">
              <div class="flex items-start justify-between mb-4">
                <div class="w-14 h-14 bg-kaiho-purple/10 rounded-xl flex items-center justify-center">
                  <svg class="w-7 h-7 text-kaiho-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"/></svg>
                </div>
                <span class="bg-kaiho-purple/10 text-kaiho-purple text-xs font-bold px-3 py-1 rounded-full badge-pulse">募集中</span>
              </div>
              <h3 class="text-xl font-bold mb-2 text-neutral-900">探究活動基金</h3>
              <p class="text-neutral-500 text-sm mb-6 leading-relaxed">在校生の探究活動を資金面から支援。研究費やフィールドワークの費用を助成します。</p>
              <div class="mb-4">
                <div class="flex justify-between text-xs text-neutral-500 mb-1">
                  <span>達成率</span>
                  <span class="font-bold text-kaiho-purple">78%</span>
                </div>
                <div class="w-full bg-neutral-100 rounded-full h-2.5">
                  <div class="progress-fill bg-gradient-to-r from-kaiho-purple to-purple-400 h-2.5 rounded-full" style="width: 0%" data-width="78%"></div>
                </div>
              </div>
              <a href="#fund" class="inline-flex items-center gap-2 text-kaiho-purple text-sm font-bold hover:gap-3 transition-all">
                詳しく見る <span>&rarr;</span>
              </a>
            </div>
          </div>

          <!-- Project 2: メンター制度 -->
          <div class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 group">
            <div class="h-3 bg-gradient-to-r from-kaiho-blue to-blue-400"></div>
            <div class="p-8">
              <div class="flex items-start justify-between mb-4">
                <div class="w-14 h-14 bg-kaiho-blue/10 rounded-xl flex items-center justify-center">
                  <svg class="w-7 h-7 text-kaiho-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>
                </div>
                <span class="bg-kaiho-blue/10 text-kaiho-blue text-xs font-bold px-3 py-1 rounded-full badge-pulse">登録受付中</span>
              </div>
              <h3 class="text-xl font-bold mb-2 text-neutral-900">メンター制度</h3>
              <p class="text-neutral-500 text-sm mb-6 leading-relaxed">各分野で活躍する卒業生がメンターとして、在校生の探究活動やキャリア形成をサポート。</p>
              <div class="flex items-center gap-3 mb-4">
                <div class="flex -space-x-2">
                  <div class="w-8 h-8 bg-kaiho-green rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">K</div>
                  <div class="w-8 h-8 bg-kaiho-blue rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">U</div>
                  <div class="w-8 h-8 bg-kaiho-gold rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">G</div>
                  <div class="w-8 h-8 bg-kaiho-purple rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">I</div>
                </div>
                <span class="text-xs text-neutral-500">他 <strong>20名</strong> が登録中</span>
              </div>
              <a href="#mentor" class="inline-flex items-center gap-2 text-kaiho-blue text-sm font-bold hover:gap-3 transition-all">
                メンター一覧を見る <span>&rarr;</span>
              </a>
            </div>
          </div>

          <!-- Project 3: キャリア・クロスロード -->
          <div class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 group">
            <div class="h-3 bg-gradient-to-r from-kaiho-orange to-orange-400"></div>
            <div class="p-8">
              <div class="flex items-start justify-between mb-4">
                <div class="w-14 h-14 bg-kaiho-orange/10 rounded-xl flex items-center justify-center">
                  <svg class="w-7 h-7 text-kaiho-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"/></svg>
                </div>
                <span class="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">開催報告</span>
              </div>
              <h3 class="text-xl font-bold mb-2 text-neutral-900">キャリア・クロスロード</h3>
              <p class="text-neutral-500 text-sm mb-6 leading-relaxed">40名超のメンターと学生が交わるトークセッション。2025年12月に第1回を開催しました。</p>
              <div class="bg-kaiho-orange/5 rounded-lg p-3 mb-4">
                <div class="flex items-center gap-3">
                  <span class="text-2xl font-black text-kaiho-orange">40+</span>
                  <span class="text-xs text-neutral-500">名のメンターが参加<br>22名の在校生が交流</span>
                </div>
              </div>
              <a href="#archive" class="inline-flex items-center gap-2 text-kaiho-orange text-sm font-bold hover:gap-3 transition-all">
                開催報告を見る <span>&rarr;</span>
              </a>
            </div>
          </div>

          <!-- Project 4: 同窓生交流 -->
          <div class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 group">
            <div class="h-3 bg-gradient-to-r from-kaiho-teal to-teal-400"></div>
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
          <div class="section-divider mt-6"></div>
        </div>

        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-3 mb-12 fade-in">
          <button
            v-for="cat in mentorCategories"
            :key="cat.value"
            class="mentor-tag px-4 py-2 rounded-full text-sm font-medium"
            :class="activeMentorCategory === cat.value ? 'bg-kaiho-green text-white' : 'bg-neutral-100 text-neutral-600'"
            @click="filterMentors(cat.value)"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Region Filter -->
        <div class="flex justify-center gap-2 mb-12 fade-in">
          <span class="text-xs text-neutral-400 mr-2 self-center">地域:</span>
          <button
            v-for="region in mentorRegions"
            :key="region"
            class="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
            :class="activeMentorRegion === region ? 'bg-kaiho-teal/10 text-kaiho-teal' : 'bg-neutral-50 text-neutral-500 hover:bg-kaiho-teal/10 hover:text-kaiho-teal'"
            @click="activeMentorRegion = region"
          >
            {{ region }}
          </button>
        </div>

        <!-- Mentor Cards -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 fade-in">
          <!-- Mentor 1 -->
          <div v-show="showMentor('tech')" class="card-hover bg-white rounded-2xl p-6 text-center shadow-sm border border-neutral-100">
            <div class="w-20 h-20 bg-gradient-to-br from-kaiho-blue to-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-black">
              K
            </div>
            <h4 class="font-bold text-neutral-900">神谷 乗治</h4>
            <p class="text-xs text-kaiho-green font-medium mt-1">14期</p>
            <p class="text-sm text-neutral-500 mt-2">ITエンジニア / 起業家</p>
            <div class="flex items-center justify-center gap-1 mt-2 text-xs text-neutral-400">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
              沖縄
            </div>
            <div class="flex flex-wrap justify-center gap-1 mt-3">
              <span class="text-[10px] px-2 py-0.5 bg-kaiho-blue/10 text-kaiho-blue rounded-full">IT</span>
              <span class="text-[10px] px-2 py-0.5 bg-kaiho-orange/10 text-kaiho-orange rounded-full">起業</span>
            </div>
          </div>

          <!-- Mentor 2 -->
          <div v-show="showMentor('education')" class="card-hover bg-white rounded-2xl p-6 text-center shadow-sm border border-neutral-100">
            <div class="w-20 h-20 bg-gradient-to-br from-kaiho-green to-emerald-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-black">
              U
            </div>
            <h4 class="font-bold text-neutral-900">上間 祥子</h4>
            <p class="text-xs text-kaiho-green font-medium mt-1">16期</p>
            <p class="text-sm text-neutral-500 mt-2">広報 / コーディネーター</p>
            <div class="flex items-center justify-center gap-1 mt-2 text-xs text-neutral-400">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
              沖縄
            </div>
            <div class="flex flex-wrap justify-center gap-1 mt-3">
              <span class="text-[10px] px-2 py-0.5 bg-kaiho-green/10 text-kaiho-green rounded-full">広報</span>
              <span class="text-[10px] px-2 py-0.5 bg-kaiho-purple/10 text-kaiho-purple rounded-full">教育</span>
            </div>
          </div>

          <!-- Mentor 3 -->
          <div v-show="showMentor('education')" class="card-hover bg-white rounded-2xl p-6 text-center shadow-sm border border-neutral-100">
            <div class="w-20 h-20 bg-gradient-to-br from-kaiho-gold to-amber-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-black">
              I
            </div>
            <h4 class="font-bold text-neutral-900">泉川 &#9675;&#9675;</h4>
            <p class="text-xs text-kaiho-green font-medium mt-1">18期</p>
            <p class="text-sm text-neutral-500 mt-2">教員（球陽高校）</p>
            <div class="flex items-center justify-center gap-1 mt-2 text-xs text-neutral-400">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
              沖縄
            </div>
            <div class="flex flex-wrap justify-center gap-1 mt-3">
              <span class="text-[10px] px-2 py-0.5 bg-kaiho-gold/10 text-kaiho-gold rounded-full">教育</span>
              <span class="text-[10px] px-2 py-0.5 bg-kaiho-blue/10 text-kaiho-blue rounded-full">人材育成</span>
            </div>
          </div>

          <!-- Mentor 4 (placeholder) -->
          <div class="card-hover bg-gradient-to-br from-kaiho-green/5 to-kaiho-blue/5 rounded-2xl p-6 text-center border-2 border-dashed border-kaiho-green/30 flex flex-col items-center justify-center min-h-[240px]">
            <div class="w-20 h-20 bg-kaiho-green/10 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-kaiho-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.5v15m7.5-7.5h-15"/></svg>
            </div>
            <h4 class="font-bold text-kaiho-green">メンターになる</h4>
            <p class="text-xs text-neutral-500 mt-2">あなたの経験を<br>後輩に共有しませんか？</p>
            <a href="#" class="mt-4 inline-flex items-center gap-1 text-sm font-bold text-kaiho-green hover:text-kaiho-green-dark transition-colors">
              登録する <span>&rarr;</span>
            </a>
          </div>
        </div>

        <!-- Mentor support types -->
        <div class="mt-16 bg-kaiho-blue/5 rounded-2xl p-8 md:p-12 fade-in">
          <h3 class="text-lg font-bold text-neutral-900 mb-6 text-center">メンターが提供できるサポート</h3>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white rounded-xl p-4 text-center shadow-sm">
              <div class="text-2xl mb-2">&#127908;</div>
              <h4 class="font-bold text-sm text-neutral-900">特設授業での講話</h4>
              <p class="text-xs text-neutral-500 mt-1">学校での特別講演</p>
            </div>
            <div class="bg-white rounded-xl p-4 text-center shadow-sm">
              <div class="text-2xl mb-2">&#128300;</div>
              <h4 class="font-bold text-sm text-neutral-900">探究活動アドバイス</h4>
              <p class="text-xs text-neutral-500 mt-1">研究テーマの相談</p>
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
            &yen;<span class="count-number" data-target="1250000">0</span>
          </div>
          <p class="text-sm text-neutral-400"><span class="count-number" data-target="87">0</span>名の支援者に感謝します</p>
        </div>

        <!-- Fund Cards -->
        <div class="grid md:grid-cols-2 gap-8 fade-in">
          <!-- Fund 1 -->
          <div class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100">
            <div class="h-48 bg-gradient-to-br from-kaiho-purple/20 via-purple-100 to-indigo-100 flex items-center justify-center">
              <div class="text-center">
                <div class="text-6xl mb-2">&#128300;</div>
                <span class="bg-kaiho-purple text-white text-xs font-bold px-3 py-1 rounded-full">探究活動</span>
              </div>
            </div>
            <div class="p-8">
              <h3 class="text-xl font-bold text-neutral-900 mb-2">探究活動基金</h3>
              <p class="text-neutral-500 text-sm mb-6 leading-relaxed">
                在校生の探究活動を資金面で支援します。研究費やフィールドワーク費用の助成のほか、同窓生の活動支援にも活用されます。
              </p>
              <div class="mb-4">
                <div class="flex justify-between text-sm mb-2">
                  <span class="text-neutral-500">&yen;390,000 / &yen;500,000</span>
                  <span class="font-bold text-kaiho-purple">78%</span>
                </div>
                <div class="w-full bg-neutral-100 rounded-full h-3">
                  <div class="progress-fill bg-gradient-to-r from-kaiho-purple to-purple-400 h-3 rounded-full" style="width: 0%" data-width="78%"></div>
                </div>
              </div>
              <button class="w-full py-3 bg-kaiho-purple text-white font-bold rounded-xl hover:bg-purple-700 transition-colors">
                この基金に寄付する
              </button>
            </div>
          </div>

          <!-- Fund 2 -->
          <div class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100">
            <div class="h-48 bg-gradient-to-br from-kaiho-gold/20 via-amber-100 to-yellow-100 flex items-center justify-center">
              <div class="text-center">
                <div class="text-6xl mb-2">&#127912;</div>
                <span class="bg-kaiho-gold text-white text-xs font-bold px-3 py-1 rounded-full">芸術支援</span>
              </div>
            </div>
            <div class="p-8">
              <h3 class="text-xl font-bold text-neutral-900 mb-2">芸術家応援基金</h3>
              <p class="text-neutral-500 text-sm mb-6 leading-relaxed">
                芸術科出身の同窓生アーティストを応援。展覧会開催費用、作品制作費、コンクール参加費を支援します。
              </p>
              <div class="mb-4">
                <div class="flex justify-between text-sm mb-2">
                  <span class="text-neutral-500">&yen;180,000 / &yen;300,000</span>
                  <span class="font-bold text-kaiho-gold">60%</span>
                </div>
                <div class="w-full bg-neutral-100 rounded-full h-3">
                  <div class="progress-fill bg-gradient-to-r from-kaiho-gold to-amber-400 h-3 rounded-full" style="width: 0%" data-width="60%"></div>
                </div>
              </div>
              <button class="w-full py-3 bg-kaiho-gold text-white font-bold rounded-xl hover:bg-amber-600 transition-colors">
                この基金に寄付する
              </button>
            </div>
          </div>
        </div>

        <!-- Donor benefits -->
        <div class="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 fade-in">
          <h3 class="text-lg font-bold text-neutral-900 mb-6 text-center">寄付者特典</h3>
          <div class="grid sm:grid-cols-3 gap-6">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-kaiho-purple/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-kaiho-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"/></svg>
              </div>
              <div>
                <h4 class="font-bold text-sm text-neutral-900">活動報告会への招待</h4>
                <p class="text-xs text-neutral-500 mt-1">電子チケットを配布します</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-kaiho-purple/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-kaiho-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
              </div>
              <div>
                <h4 class="font-bold text-sm text-neutral-900">年次報告書の送付</h4>
                <p class="text-xs text-neutral-500 mt-1">基金の使途を透明に報告</p>
              </div>
            </div>
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
    <!-- NOTE MAGAZINE SECTION                                         -->
    <!-- ============================================================ -->
    <section id="magazine" class="py-24 md:py-32 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16 fade-in">
          <p class="text-xs font-bold tracking-[0.3em] uppercase text-neutral-400 mb-4">Magazine</p>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-4">開邦雄飛会マガジン</h2>
          <p class="text-neutral-500 mt-4 max-w-xl mx-auto">note.com で活動の最新情報を発信中</p>
          <div class="section-divider mt-6"></div>
        </div>

        <!-- Loading state -->
        <div v-if="noteLoading" class="text-center py-12 fade-in">
          <div class="inline-flex items-center gap-3 text-neutral-400">
            <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
            <span class="text-sm">note.com から最新記事を取得中...</span>
          </div>
        </div>

        <!-- Articles container -->
        <div v-if="noteArticles.length > 0 && !noteLoading" class="grid md:grid-cols-3 gap-8 fade-in">
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
        <div v-if="noteError && !noteLoading" class="text-center py-12 fade-in">
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

        <div class="text-center mt-12 fade-in">
          <a href="https://note.com/kaihoyuuhikai/m/m20c04499fc49" target="_blank" class="inline-flex items-center gap-2 px-8 py-3 bg-neutral-900 text-white font-bold rounded-full hover:bg-neutral-700 transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4.3c0-.5-.5-1-1.3-.8l-6.4 2.2L8 3.3C7.5 3 7 3 6.5 3.2L1.8 5c-.5.2-.8.5-.8 1v14.7c0 .5.5 1 1.3.8l6.4-2.2 6.3 2.2c.5.3 1 .3 1.5.1l4.7-1.8c.5-.2.8-.5.8-1V4.3z"/></svg>
            note マガジンをすべて読む
          </a>
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

        <div class="grid md:grid-cols-3 gap-8 fade-in">
          <div class="card-hover bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 text-center">
            <div class="text-5xl mb-4">🗼</div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">東京支部</h3>
            <p class="text-neutral-500 text-sm mb-4">首都圏在住の同窓生の交流拠点</p>
            <div class="inline-flex items-center gap-2 text-sm text-kaiho-teal font-medium">
              <span class="w-2 h-2 bg-kaiho-teal rounded-full"></span>
              メンバー準備中
            </div>
          </div>

          <div class="card-hover bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 text-center">
            <div class="text-5xl mb-4">⛩️</div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">関西支部</h3>
            <p class="text-neutral-500 text-sm mb-4">関西圏在住の同窓生の交流拠点</p>
            <div class="inline-flex items-center gap-2 text-sm text-kaiho-teal font-medium">
              <span class="w-2 h-2 bg-kaiho-teal rounded-full"></span>
              メンバー準備中
            </div>
          </div>

          <div class="card-hover bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 text-center">
            <div class="text-5xl mb-4">🌏</div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">海外支部</h3>
            <p class="text-neutral-500 text-sm mb-4">世界各地で活躍する同窓生の拠点</p>
            <div class="inline-flex items-center gap-2 text-sm text-kaiho-teal font-medium">
              <span class="w-2 h-2 bg-kaiho-teal rounded-full"></span>
              メンバー準備中
            </div>
          </div>
        </div>
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
          <a v-for="(item, i) in newsItems" :key="i" href="#"
             class="group flex gap-6 items-start py-6 block hover:bg-white/5 px-4 -mx-4 rounded-lg transition-colors"
             :class="{ 'border-b border-white/20': i < newsItems.length - 1 }">
            <time class="text-sm text-white/50 flex-shrink-0 w-28">{{ item.date }}</time>
            <div class="flex-1 flex items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">{{ item.category }}</span>
                  <span v-if="item.isNew" class="text-[10px] bg-kaiho-gold text-white px-2 py-0.5 rounded-full font-bold">NEW</span>
                </div>
                <h3 class="text-white group-hover:text-kaiho-gold transition-colors font-medium">{{ item.title }}</h3>
              </div>
              <svg class="w-4 h-4 text-white/30 group-hover:text-kaiho-gold transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
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
          <a href="#" class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 block group">
            <div class="h-56 bg-gradient-to-br from-kaiho-green-dark to-kaiho-green flex items-center justify-center relative overflow-hidden">
              <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22%3E%3Ccircle cx=%2220%22 cy=%2220%22 r=%221%22 fill=%22white%22/%3E%3C/svg%3E'); background-size: 40px 40px;"></div>
              <div class="text-center relative z-10">
                <p class="text-white/60 text-sm mb-2">2025.12.28 開催</p>
                <h3 class="text-3xl font-black text-white mb-2">第3回 大同窓会</h3>
                <p class="text-kaiho-gold font-medium">創立40周年記念</p>
                <div class="mt-4 flex items-center justify-center gap-4 text-white/80 text-sm">
                  <span>参加者 <strong>537名</strong></span>
                  <span>|</span>
                  <span>協賛 <strong>25社</strong></span>
                </div>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between">
                <p class="text-neutral-500 text-sm">開催報告・登壇者・協賛企業・アンケート分析</p>
                <svg class="w-5 h-5 text-neutral-400 group-hover:text-kaiho-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </div>
            </div>
          </a>

          <!-- Career Crossroads Manual -->
          <a href="#" class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 block group">
            <div class="h-56 bg-gradient-to-br from-kaiho-orange to-orange-500 flex items-center justify-center relative overflow-hidden">
              <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22%3E%3Ccircle cx=%2220%22 cy=%2220%22 r=%221%22 fill=%22white%22/%3E%3C/svg%3E'); background-size: 40px 40px;"></div>
              <div class="text-center relative z-10">
                <div class="text-5xl mb-3">&#128203;</div>
                <h3 class="text-2xl font-black text-white mb-2">キャリア・クロスロード</h3>
                <p class="text-white/80 font-medium">運営マニュアル</p>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between">
                <p class="text-neutral-500 text-sm">準備から当日進行まで、誰でも主催できるガイド</p>
                <svg class="w-5 h-5 text-neutral-400 group-hover:text-kaiho-orange transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </div>
            </div>
          </a>
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
          <a href="#" class="card-hover block bg-gradient-to-br from-kaiho-blue to-blue-600 rounded-2xl p-8 text-white text-center">
            <div class="text-4xl mb-4">&#129309;</div>
            <h3 class="text-lg font-bold mb-2">メンター登録</h3>
            <p class="text-white/80 text-sm mb-4">あなたの経験を後輩に</p>
            <span class="inline-flex items-center gap-1 text-sm font-bold bg-white/20 px-4 py-2 rounded-full">
              登録フォーム &rarr;
            </span>
          </a>

          <!-- CTA 2 -->
          <a href="#" class="card-hover block bg-gradient-to-br from-kaiho-purple to-purple-600 rounded-2xl p-8 text-white text-center">
            <div class="text-4xl mb-4">&#128157;</div>
            <h3 class="text-lg font-bold mb-2">寄付・基金</h3>
            <p class="text-white/80 text-sm mb-4">在校生と同窓生の未来を支える</p>
            <span class="inline-flex items-center gap-1 text-sm font-bold bg-white/20 px-4 py-2 rounded-full">
              寄付する &rarr;
            </span>
          </a>

          <!-- CTA 3 -->
          <a href="https://docs.google.com/forms/d/19CDuF8fZy74A3_UN62PzLLbfL-Us-DhvHSloVj8QX6M/edit" target="_blank" class="card-hover block bg-gradient-to-br from-kaiho-green to-emerald-600 rounded-2xl p-8 text-white text-center sm:col-span-2 lg:col-span-1">
            <div class="text-4xl mb-4">&#128587;</div>
            <h3 class="text-lg font-bold mb-2">運営メンバー募集</h3>
            <p class="text-white/80 text-sm mb-4">一緒に組織を創ろう</p>
            <span class="inline-flex items-center gap-1 text-sm font-bold bg-white/20 px-4 py-2 rounded-full">
              応募する &rarr;
            </span>
          </a>
        </div>

        <!-- Proposal CTA -->
        <div class="mt-12 text-center fade-in">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdBLp8iJ515aS5wp-h0yemYyrLa9Fl5DQhfwaD9htwdIXqH2Q/viewform" target="_blank" class="inline-flex items-center gap-3 px-6 py-3 border-2 border-neutral-200 rounded-full text-neutral-600 hover:border-kaiho-green hover:text-kaiho-green transition-all text-sm font-medium">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            議案を提案する
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

// ── Mentor filter state ──
const activeMentorCategory = ref('all')
const activeMentorRegion = ref('すべて')

const mentorCategories = [
  { value: 'all', label: 'すべて' },
  { value: 'business', label: 'ビジネス・起業' },
  { value: 'research', label: '研究・学術' },
  { value: 'arts', label: '芸術・文化' },
  { value: 'tech', label: 'IT・テクノロジー' },
  { value: 'medical', label: '医療・福祉' },
  { value: 'education', label: '教育' },
]

const mentorRegions = ['すべて', '沖縄', '東京', '関西', '海外']

function filterMentors(category: string) {
  activeMentorCategory.value = category
}

function showMentor(category: string): boolean {
  return activeMentorCategory.value === 'all' || activeMentorCategory.value === category
}

// ── News items ──
const newsItems = [
  { date: '2026.03.15', category: 'お知らせ', title: '雄飛会 運営打合せを開催（若狭公民館）', isNew: true },
  { date: '2026.03.08', category: '活動', title: 'PTA連携 道路ボランティア清掃を初実施', isNew: true },
  { date: '2026.03.01', category: '活動', title: '開邦高校卒業式にて同窓会入会式を実施', isNew: false },
  { date: '2026.02.20', category: 'お知らせ', title: '開邦雄飛会 新体制発足・運営メンバー募集開始', isNew: false },
  { date: '2025.12.28', category: 'イベント', title: '第3回大同窓会 開催（参加者537名）・キャリア・クロスロード初開催', isNew: false },
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
    const res = await fetch(useRuntimeConfig().app.baseURL + 'data/note-articles.json')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (data.articles && data.articles.length > 0) {
      noteArticles.value = data.articles
    }
  } catch (err) {
    console.warn('Failed to load note articles JSON:', err)
    noteError.value = true
  } finally {
    noteLoading.value = false
  }
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

  // Cleanup
  onUnmounted(() => {
    clearInterval(particleInterval)
  })
})
</script>
