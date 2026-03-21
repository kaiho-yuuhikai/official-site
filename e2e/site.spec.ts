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
