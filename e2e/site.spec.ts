import { test, expect } from '@playwright/test'

// ---------------------------------------------------------------------------
// 全ページ共通: ページが正常に表示され、主要要素が存在すること
// ---------------------------------------------------------------------------

const pages = [
  { path: '/', name: 'トップページ' },
  { path: '/about', name: '雄飛会について' },
  { path: '/contact', name: 'お問い合わせ' },
  { path: '/officers', name: '役員一覧' },
  { path: '/news', name: 'お知らせ' },
  { path: '/privacy', name: 'プライバシーポリシー' },
  { path: '/terms', name: '利用規約' },
  { path: '/blog/career-crossroads-manual', name: 'キャリクロ運営マニュアル' },
  { path: '/news/soukai', name: '令和8年度定期総会' },
  { path: '/activities/special-lecture', name: '創立記念特設授業' },
  { path: '/archive/daidosoukai', name: '大同窓会 過去の記録' },
]

for (const page of pages) {
  test(`${page.name}（${page.path}）が正常に表示される`, async ({ page: p }) => {
    const response = await p.goto(page.path)
    expect(response?.status()).toBeLessThan(400)
    await expect(p.locator('body')).toBeVisible()
  })
}

// ---------------------------------------------------------------------------
// トップページ: ヒーローセクション
// ---------------------------------------------------------------------------

test('トップページにヒーローセクションが表示される', async ({ page }) => {
  await page.goto('/')
  // h1 または主要な見出しが存在すること
  const heading = page.locator('h1, h2').first()
  await expect(heading).toBeVisible()
})

// ---------------------------------------------------------------------------
// トップページ: LINEオープンチャットセクション
// ---------------------------------------------------------------------------

test('トップページにLINEオープンチャットセクションが表示される', async ({ page }) => {
  await page.goto('/')
  const section = page.locator('#line-openchat')
  await expect(section).toBeVisible()
  await expect(section).toContainText('LINEオープンチャット')
  const link = section.locator('a[href*="line.me"]')
  await expect(link).toBeVisible()
})

// ---------------------------------------------------------------------------
// ナビゲーション: リンクが機能する
// ---------------------------------------------------------------------------

test.skip('ナビゲーションリンクが存在する', async ({ page }) => {
  await page.goto('/')
  // nav 要素またはそれに類する要素が存在することを確認
  const nav = page.locator('nav, header, .nav').first()
  await expect(nav).toBeVisible()
  // リンクが存在することを確認
  const links = page.locator('header a, nav a')
  expect(await links.count()).toBeGreaterThan(0)
})

// ---------------------------------------------------------------------------
// フッター
// ---------------------------------------------------------------------------

test.skip('フッターが表示される', async ({ page }) => {
  await page.goto('/')
  const footer = page.locator('footer, .footer').first()
  await expect(footer).toBeVisible()
})

// ---------------------------------------------------------------------------
// 財務状況（Financial Status）
// ---------------------------------------------------------------------------

test.skip('トップページに財務状況セクションが表示される', async ({ page }) => {
  await page.goto('/')
  const financeSection = page.locator('#finance')
  // IntersectionObserver による表示を待つ
  await expect(financeSection).toBeVisible({ timeout: 10000 })
  await expect(financeSection).toContainText('財務状況')
  await expect(financeSection).toContainText('閲覧制限中')
})

test.skip('Aboutページに制限された財務状況が表示される', async ({ page }) => {
  await page.goto('/about')
  const financeTitle = page.locator('h2', { hasText: '財務状況' })
  await expect(financeTitle).toBeVisible({ timeout: 10000 })
  
  // 制限メッセージを確認
  await expect(page.locator('body')).toContainText('会員限定公開')
  await expect(page.locator('body')).toContainText('閲覧方法')
})

// ---------------------------------------------------------------------------
// メンター登録
// ---------------------------------------------------------------------------

test.skip('メンター登録ページが表示され、登録リンクが存在する', async ({ page }) => {
  await page.goto('/mentor/registration')
  await expect(page.locator('h1')).toContainText('メンター登録')
  // Googleフォームへのリンクが存在することを確認
  const registrationLink = page.locator('a[href*="docs.google.com/forms"]')
  await expect(registrationLink).toBeVisible()
  await expect(registrationLink).toContainText('登録フォームを開く')
})

// ---------------------------------------------------------------------------
// ニュース項目のリンク解除
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// 後演コーナーセクション
// ---------------------------------------------------------------------------

test('トップページに後援コーナーセクションが表示される', async ({ page }) => {
  await page.goto('/')
  const section = page.locator('#koen')
  await expect(section).toBeVisible()
  await expect(section).toContainText('後援コーナー')
  await expect(section).toContainText('後援実施中')
  await expect(section).toContainText('後援が決定')
})

test('トップページにInstagramセクションが表示される', async ({ page }) => {
  await page.goto('/')
  const instagramSection = page.locator('#instagram')
  await expect(instagramSection).toBeVisible()
  const instagramLink = page.locator('#instagram a[href*="instagram.com"]').first()
  await expect(instagramLink).toBeVisible()
})

test('日々の活動セクションにInstagramとFacebookのリンクが横並びで表示される', async ({ page }) => {
  await page.goto('/')
  const section = page.locator('#instagram')
  await expect(section).toContainText('日々の活動')
  await expect(section.locator('a[href*="instagram.com/kaihoyuhi"]')).toBeVisible()
  await expect(section.locator('a[href*="facebook.com/kaihoyuhi"]')).toBeVisible()
})

test('トップページから支部情報セクションが削除されている', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('body')).not.toContainText('支部情報')
})

test('トップページの注力事業セクションにデジタル推進事業カードがない', async ({ page }) => {
  await page.goto('/')
  const projects = page.locator('#projects')
  await expect(projects).toBeVisible()
  await expect(projects).not.toContainText('デジタル推進事業')
})

test('トップページのお知らせ項目にリンクが含まれていない', async ({ page }) => {
  await page.goto('/')
  const newsItems = page.locator('#news .group')
  const count = await newsItems.count()
  for (let i = 0; i < count; i++) {
    const tagName = await newsItems.nth(i).evaluate(el => el.tagName)
    expect(tagName.toLowerCase()).not.toBe('a')
    // リンクがある場合は「詳細・申込」ボタンのみ許可
    const links = newsItems.nth(i).locator('a')
    const linkCount = await links.count()
    if (linkCount > 0) {
      expect(linkCount).toBe(1)
    }
  }
})

// ---------------------------------------------------------------------------
// 創立記念特設授業: 講師募集への導線
// ---------------------------------------------------------------------------

test('トップページのヒーローの特設授業ボタンが特設授業ページへ遷移する', async ({ page }) => {
  await page.goto('/')
  const link = page.locator('#hero').getByRole('link', { name: /創立記念特設授業/ })
  await expect(link).toBeVisible()
  const href = await link.getAttribute('href')
  expect(href).toContain('/activities/special-lecture')
  expect(href).not.toContain('docs.google.com')
})

test('トップページの注目イベントセクションが特設授業ページへリンクする', async ({ page }) => {
  await page.goto('/')
  const section = page.locator('#featured-event')
  await expect(section).toBeVisible()
  await expect(section).toContainText('注目イベント')
  const link = section.locator('a[href*="/activities/special-lecture"]')
  await expect(link.first()).toBeVisible()
})

test('トップページの注力事業セクションに創立記念特設授業のカードがない', async ({ page }) => {
  await page.goto('/')
  const projects = page.locator('#projects')
  await expect(projects).toBeVisible()
  await expect(projects).toContainText('職業人講話')
  await expect(projects).not.toContainText('創立記念特設授業')
})

test('特設授業ページに講師向けの説明と応募フォームへの導線がある', async ({ page }) => {
  await page.goto('/activities/special-lecture')
  await expect(page.locator('body')).toContainText('2026年 開催概要')
  await expect(page.locator('body')).toContainText('当日の流れ')
  await expect(page.locator('body')).toContainText('よくある質問')
  // 応募締切は「定員に達し次第」表記に変更（日付固定を廃止）
  await expect(page.locator('body')).toContainText('定員に達し次第、受付を終了いたします')
  await expect(page.locator('body')).not.toContainText('2026年8月31日')
  // 追加されたFAQ
  await expect(page.locator('body')).toContainText('講師経験がなくても応募できますか？')
  await expect(page.locator('body')).toContainText('子どもを連れて参加できますか？')
  const formLink = page.locator('a[href*="docs.google.com/forms"]')
  await expect(formLink.first()).toBeVisible()
  // 講師応募フォームは最新のフォームURLを指す
  const applyLink = page.getByRole('link', { name: /講師応募フォームを開く/ })
  for (const href of await applyLink.evaluateAll((els) => els.map((e) => e.getAttribute('href')))) {
    expect(href).toContain('1FAIpQLSeOZZOYwreYZRWpUFV4_LTUmZCEnxz22ASeOMoF1h1Mo9c0zg')
  }
  // 「もっと知る」の初回講師向けFAQはメール起動リンク
  const mailLink = page.locator('a[href^="mailto:tokusetu@kaihoyuhi.com"]')
  await expect(mailLink.first()).toBeVisible()
})

test('特設授業ページに当日運営スタッフ募集セクションがある', async ({ page }) => {
  await page.goto('/activities/special-lecture')
  const section = page.locator('#staff-2026')
  await expect(section).toBeVisible()
  await expect(section).toContainText('当日運営スタッフ募集')
  await expect(section).toContainText('10名程度')
  await expect(section).toContainText('当日の役割（例）')
  // スタッフ応募フォーム（Google フォーム）へのリンク
  const apply = section.getByRole('link', { name: /スタッフ応募フォームを開く/ })
  await expect(apply).toBeVisible()
  expect(await apply.getAttribute('href')).toContain('docs.google.com/forms')
  // 「もっと知る」からスタッフセクションへの導線
  const nav = page.locator('a[href="#staff-2026"]')
  await expect(nav.first()).toBeVisible()
})

// ---------------------------------------------------------------------------
// noteマガジン: クリエイター募集バナー
// ---------------------------------------------------------------------------

test('トップページにnoteマガジンのクリエイター募集バナーが表示される', async ({ page }) => {
  await page.goto('/')
  const banner = page.locator('#magazine').getByText('クリエイター募集中')
  await expect(banner).toBeVisible()
  const cta = page.locator('#magazine a[href*="docs.google.com/forms"]')
  await expect(cta).toBeVisible()
  await expect(cta).toContainText('執筆を申し込む')
})

// トップページ: 道路清掃ボランティアセクション
test('トップページに道路清掃ボランティアセクションが表示される', async ({ page }) => {
  await page.goto('/')
  const section = page.locator('h2').filter({ hasText: '地域連携事業' })
  await expect(section).toBeVisible()
  const desc = page.getByText('開邦中高校生・PTA・同窓生が合同で')
  await expect(desc).toBeVisible()
  const link = page.locator('#volunteer a[href*="note.com/kaihoyuuhikai/n/"]').first()
  await expect(link).toBeVisible()
})


// ---------------------------------------------------------------------------
// レスポンシブ: モバイル幅で表示が崩れない
// ---------------------------------------------------------------------------

test('モバイル幅で正常に表示される', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  await expect(page.locator('body')).toBeVisible()
  // 横スクロールが発生していないこと
  const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
  const viewportWidth = await page.evaluate(() => window.innerWidth)
  expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5) // 5px の余裕
})

// ---------------------------------------------------------------------------
// ビルド: nuxt generate が成功すること
// ---------------------------------------------------------------------------

test('静的ビルドが成功する', async () => {
  const { execSync } = await import('child_process')
  expect(() => {
    execSync('npm run generate', { timeout: 120_000, stdio: 'pipe' })
  }).not.toThrow()
})

// ---------------------------------------------------------------------------
// Google Analytics 4 (GA4) 埋め込み
// ---------------------------------------------------------------------------

test('開発モードでは GA4 タグが注入されない (NUXT_PUBLIC_GA4_ID 未設定)', async ({ page }) => {
  await page.goto('/')
  const gtagCount = await page.locator('script[src*="googletagmanager.com/gtag/js"]').count()
  expect(gtagCount).toBe(0)
})

test('NUXT_PUBLIC_GA4_ID を設定して generate すると gtag タグが出力される', async () => {
  const { execSync } = await import('child_process')
  const fs = await import('node:fs')
  const path = await import('node:path')

  const testId = 'G-TEST123ABC'
  execSync('npm run generate', {
    timeout: 180_000,
    stdio: 'pipe',
    env: { ...process.env, NUXT_PUBLIC_GA4_ID: testId },
  })

  const htmlPath = path.join('.output', 'public', 'index.html')
  const html = fs.readFileSync(htmlPath, 'utf-8')
  expect(html).toMatch(/googletagmanager\.com\/gtag\/js/)
  expect(html).toContain(testId)
})
