<template>
  <div>
    <!-- Hero -->
    <section class="relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-kaiho-green-dark via-kaiho-green to-emerald-600"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2020/svg%22 width=%2260%22 height=%2260%22%3E%3Cpath d=%22M30 0L60 30L30 60L0 30Z%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p class="text-xs font-bold tracking-[0.3em] uppercase text-kaiho-gold mb-4">後援事業</p>
        <h1 class="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">Ⅲ concert実行委員会より<br>大切なお知らせ</h1>
        <p class="text-white/80 text-base mt-4">一部作品の演奏担当変更およびゲストピアニスト出演について</p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-24 bg-white">
      <div class="max-w-3xl mx-auto px-6 lg:px-8">

        <div class="prose prose-neutral max-w-none">
          <p class="text-neutral-700 leading-relaxed">
            このたびは、2026年10月24日（土）開催の「Ⅲ concert ～サクソフォンとピアノで彩る室内楽～」をご予約いただき、誠にありがとうございます。
          </p>
          <p class="text-neutral-700 leading-relaxed">
            本公演の一部作品の演奏担当変更についてご案内申し上げます。
          </p>
          <p class="text-neutral-700 leading-relaxed">
            ピアノの新城一大は、右手の不調により、一部作品の演奏が困難な状況となりました。この状況を踏まえ、新城、大城、日野の3名で慎重に協議を重ねた結果、ピアニストの下里豪志さんをお迎えし、一部作品でピアノを務めていただくこととなりました。
          </p>
          <p class="text-neutral-700 leading-relaxed">
            なお、曲目・日時・会場に変更はございません。演奏会を楽しみにしてくださっている皆さまには、当初のご案内から変更となりますことを、心よりお詫び申し上げます。
          </p>
          <p class="text-neutral-700 leading-relaxed">
            4名でより良い演奏会をお届けできるよう、準備を進めてまいります。何卒ご理解いただきますようお願い申し上げます。
          </p>
          <p class="text-neutral-700 leading-relaxed">
            また、誠に恐れ入りますが、本変更に伴うチケット代金の払い戻しは承っておりません。何卒ご了承くださいますようお願い申し上げます。
          </p>
        </div>

        <!-- 公演概要 -->
        <div class="mt-12 bg-neutral-50 rounded-2xl p-8 border border-neutral-100">
          <h2 class="text-xl font-black text-neutral-900 mb-6">公演概要</h2>
          <dl class="space-y-4">
            <div class="flex gap-4">
              <dt class="text-sm font-bold text-neutral-500 w-16 shrink-0">日時</dt>
              <dd class="text-sm text-neutral-700">2026年10月24日（土）<br>13:30開場 / 14:00開演</dd>
            </div>
            <div class="flex gap-4">
              <dt class="text-sm font-bold text-neutral-500 w-16 shrink-0">会場</dt>
              <dd class="text-sm text-neutral-700">テンブスホール</dd>
            </div>
            <div class="flex gap-4">
              <dt class="text-sm font-bold text-neutral-500 w-16 shrink-0">出演</dt>
              <dd class="text-sm text-neutral-700 space-y-1">
                <p>大城そのか（S.sax・A.sax）</p>
                <p>日野命子（A.sax・T.sax）</p>
                <p>新城一大（Pf）</p>
                <p>下里豪志（Pf）</p>
              </dd>
            </div>
          </dl>
        </div>

        <!-- お問い合わせ -->
        <div class="mt-8 bg-white rounded-2xl p-8 border border-neutral-100">
          <h2 class="text-lg font-bold text-neutral-900 mb-4">お問い合わせ</h2>
          <p class="text-sm font-bold text-neutral-700 mb-3">Ⅲ concert実行委員会</p>
          <dl class="space-y-2">
            <div class="flex gap-3 items-center">
              <dt class="text-xs font-bold text-neutral-500 w-14 shrink-0">E-mail</dt>
              <dd class="text-sm text-neutral-700">
                <a href="mailto:iiitrio.info@gmail.com" class="text-kaiho-green hover:underline">iiitrio.info@gmail.com</a><!-- allow-secret:personal-email 実行委員会の問い合わせ窓口として意図的に公開しているアドレス -->
              </dd>
            </div>
            <div class="flex gap-3 items-center">
              <dt class="text-xs font-bold text-neutral-500 w-14 shrink-0">TEL</dt>
              <dd class="text-sm text-neutral-700">
                <a href="tel:07056900195" class="text-kaiho-green hover:underline">070-5690-0195</a><!-- allow-secret:jp-mobile-phone 公演の予約窓口として意図的に公開している番号 -->
              </dd>
            </div>
          </dl>
        </div>

        <!-- お知らせ一覧へ戻る -->
        <div class="mt-12 text-center">
          <NuxtLink to="/news" class="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-kaiho-green transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            お知らせ一覧へ戻る
          </NuxtLink>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '【Ⅲ concert実行委員会より】一部作品の演奏担当変更およびゲストピアニスト出演について | 開邦雄飛会',
  meta: [
    { name: 'description', content: '2026年10月24日（土）開催のⅢ concert ～サクソフォンとピアノで彩る室内楽～における、一部作品の演奏担当変更およびゲストピアニスト出演についてのお知らせです。' }
  ]
})
</script>
