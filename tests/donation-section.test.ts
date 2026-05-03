import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = resolve(__dirname, '..')
const read = (relPath: string) => readFileSync(resolve(root, relPath), 'utf-8')

const FUND_OLD_NAMES = ['開邦雄飛会基金', '寄付協賛金']
const FUND_NEW = '開邦雄飛応援金'

const REAL_FORM_URL_PATTERN = /^https:\/\/docs\.google\.com\/forms\/d\/e\/[A-Za-z0-9_-]+\/viewform$/
const EXPECTED_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdL4SGNU3HisSJ7-h737kfsu-JgTFnYd-jZHTRIQT8l5ntIjw/viewform'

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

    for (const old of FUND_OLD_NAMES) {
      it(`旧呼称「${old}」が寄付セクション内に含まれない`, () => {
        expect(donationSection).not.toContain(old)
      })
    }

    it(`新呼称「${FUND_NEW}」が含まれる`, () => {
      expect(donationSection).toContain(FUND_NEW)
    })

    it('donationFormUrl が実フォームの公開URLパターンに一致する', () => {
      const match = source.match(/const donationFormUrl\s*=\s*['"]([^'"]+)['"]/)
      expect(match, 'donationFormUrl の宣言が見つかりません').toBeTruthy()
      const url = match![1]
      expect(url).not.toMatch(/PLACEHOLDER/i)
      expect(url).toMatch(REAL_FORM_URL_PATTERN)
      expect(url).toBe(EXPECTED_FORM_URL)
    })

    it('donations.json を読み込むロジックが存在する', () => {
      expect(source).toContain('loadDonations')
      expect(source).toContain("'data/donations.json'")
    })

    it('動的バインドで累計額・支援者数を表示する', () => {
      expect(donationSection).toContain('donationsTotalDisplay')
      expect(donationSection).toContain('donationsCountDisplay')
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
