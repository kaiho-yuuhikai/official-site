import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = resolve(__dirname, '..')
const read = (relPath: string) => readFileSync(resolve(root, relPath), 'utf-8')

const FUND_OLD = '開邦雄飛会基金'
const FUND_NEW = '開邦雄飛応援金'

const REAL_FORM_URL_PATTERN = /^https:\/\/docs\.google\.com\/forms\/d\/e\/[A-Za-z0-9_-]+\/viewform$/

describe('Issue #2: 寄付セクションの呼称統一とフォームURL差し替え', () => {
  describe('pages/index.vue (FUND / DONATION セクション)', () => {
    const source = read('pages/index.vue')
    const start = source.indexOf('<section id="fund"')
    const end = source.indexOf('</section>', start)
    const donationSection = source.slice(start, end)

    it('セクション境界が抽出できる', () => {
      expect(start).toBeGreaterThan(0)
      expect(end).toBeGreaterThan(start)
    })

    it(`旧呼称「${FUND_OLD}」が含まれない`, () => {
      expect(donationSection).not.toContain(FUND_OLD)
    })

    it(`新呼称「${FUND_NEW}」が含まれる`, () => {
      expect(donationSection).toContain(FUND_NEW)
    })

    it('donationFormUrl が実フォームの公開URLパターンに一致する', () => {
      const match = source.match(/const donationFormUrl\s*=\s*['"]([^'"]+)['"]/)
      expect(match, 'donationFormUrl の宣言が見つかりません').toBeTruthy()
      const url = match![1]
      expect(url).not.toMatch(/PLACEHOLDER/i)
      expect(url).toMatch(REAL_FORM_URL_PATTERN)
    })

    it('donations.value.fund 初期値が新呼称に統一されている', () => {
      const fundInit = source.match(/fund:\s*['"]([^'"]+)['"]/)
      expect(fundInit).toBeTruthy()
      expect(fundInit![1]).toBe(FUND_NEW)
    })
  })

  describe('public/data/donations.json', () => {
    const json = JSON.parse(read('public/data/donations.json')) as { fund: string }

    it(`fund フィールドが「${FUND_NEW}」`, () => {
      expect(json.fund).toBe(FUND_NEW)
    })
  })

  describe('scripts/gas/donations/Donations.js', () => {
    const source = read('scripts/gas/donations/Donations.js')

    it(`FUND_LABEL 定数が「${FUND_NEW}」`, () => {
      const match = source.match(/const\s+FUND_LABEL\s*=\s*['"]([^'"]+)['"]/)
      expect(match).toBeTruthy()
      expect(match![1]).toBe(FUND_NEW)
    })
  })

  describe('scripts/fetch-donations.mjs', () => {
    const source = read('scripts/fetch-donations.mjs')

    it(`フォールバックの fund 値が「${FUND_NEW}」`, () => {
      const fallbackBlock = source.match(/const FALLBACK\s*=\s*\{[\s\S]*?\}/)
      expect(fallbackBlock).toBeTruthy()
      expect(fallbackBlock![0]).toContain(`fund: '${FUND_NEW}'`)
    })
  })
})
