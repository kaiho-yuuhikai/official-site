<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-emerald-600"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M30 0L60 30L30 60L0 30Z%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-gold mb-4">Privacy Policy</p>
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight">プライバシーポリシー</h1>
      </div>
    </section>

    <!-- Content -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8 prose prose-neutral max-w-none">
        <h2>1. 個人情報の収集について</h2>
        <p>開邦高校同窓会 雄飛会（以下「当会」）は、メンター登録、運営メンバー応募、お問い合わせ等の際に、必要な範囲で個人情報を収集することがあります。</p>

        <h2>2. 個人情報の利用目的</h2>
        <p>収集した個人情報は、以下の目的にのみ利用いたします。</p>
        <ul>
          <li>会の運営及び活動に関する連絡</li>
          <li>イベント・事業のご案内</li>
          <li>お問い合わせへの対応</li>
          <li>メンター制度の運営</li>
        </ul>

        <h2>3. 個人情報の第三者提供</h2>
        <p>当会は、法令に基づく場合を除き、本人の同意なく個人情報を第三者に提供することはありません。</p>

        <h2>4. 個人情報の管理</h2>
        <p>当会は、収集した個人情報の漏洩、滅失又はき損の防止その他個人情報の安全管理のために必要な措置を講じます。</p>

        <h2>5. お問い合わせ</h2>
        <p>個人情報の取り扱いに関するお問い合わせは、<NuxtLink to="/contact" class="text-kaiho-green hover:text-kaiho-green-dark">お問い合わせページ</NuxtLink>よりご連絡ください。</p>
      </div>
    </section>
  </div>
</template>
