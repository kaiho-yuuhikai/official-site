import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = resolve(__dirname, '..')
const read = (relPath: string) => readFileSync(resolve(root, relPath), 'utf-8')

const FUND_NEW = '開邦雄飛応援金'

describe('Issue #2: 寄付セクションの呼称統一とフォームURL差し替え (バックエンド層)', () => {
  // pages/index.vue の検証は別 PR (フロント結合) に切り出し済み。
  // ここでは「真実の源」となる JSON / GAS / fetch スクリプトの呼称統一のみ検証する。

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
