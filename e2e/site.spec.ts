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
  { path: '/blog/career-crossroads-manual', name: 'キャリクロ運営マニュアル' },
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
// ナビゲーション: リンクが機能する
// ---------------------------------------------------------------------------

test('ナビゲーションリンクが存在する', async ({ page }) => {
  await page.goto('/')
  const nav = page.locator('nav').first()
  await expect(nav).toBeVisible()
  // 少なくとも 1 つのリンクが存在
  const links = nav.locator('a')
  expect(await links.count()).toBeGreaterThan(0)
})

// ---------------------------------------------------------------------------
// フッター
// ---------------------------------------------------------------------------

test('フッターが表示される', async ({ page }) => {
  await page.goto('/')
  const footer = page.locator('footer')
  await expect(footer).toBeVisible()
})

// ---------------------------------------------------------------------------
// 財務状況（Financial Status）
// ---------------------------------------------------------------------------

test('トップページに財務状況セクションが表示される', async ({ page }) => {
  await page.goto('/')
  const financeSection = page.locator('#finance')
  await expect(financeSection).toBeVisible()
  await expect(financeSection).toContainText('財務状況')
  await expect(financeSection).toContainText('資産概況')
})

test('Aboutページに詳細な財務状況が表示される', async ({ page }) => {
  await page.goto('/about')
  const financeTitle = page.locator('h2', { hasText: '財務状況' })
  await expect(financeTitle).toBeVisible()
  
  // 資産概況のカードまたはテキストを確認
  await expect(page.locator('body')).toContainText('学校保管口座')
  await expect(page.locator('body')).toContainText('雄飛会手元口座')
  await expect(page.locator('body')).toContainText('資産合計')
})

// ---------------------------------------------------------------------------
// メンター登録
// ---------------------------------------------------------------------------

test('メンター登録ページが表示され、フォームが存在する', async ({ page }) => {
  await page.goto('/mentor/registration')
  await expect(page.locator('h1')).toContainText('メンター登録')
  await expect(page.locator('form')).toBeVisible()
  await expect(page.locator('input[type="text"]').first()).toBeVisible()
  await expect(page.locator('input[type="email"]')).toBeVisible()
})

// ---------------------------------------------------------------------------
// ニュース項目のリンク解除
// ---------------------------------------------------------------------------

test('トップページのお知らせ項目にリンクが含まれていない', async ({ page }) => {
  await page.goto('/')
  const newsItems = page.locator('#news .group')
  const count = await newsItems.count()
  for (let i = 0; i < count; i++) {
    const tagName = await newsItems.nth(i).evaluate(el => el.tagName)
    expect(tagName.toLowerCase()).not.toBe('a')
    const links = newsItems.nth(i).locator('a')
    expect(await links.count()).toBe(0)
  }
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
