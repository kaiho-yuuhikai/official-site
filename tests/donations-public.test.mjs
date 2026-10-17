import { describe, it, expect } from 'vitest'
import { readFileSync, mkdtempSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawnSync } from 'node:child_process'
import { toPublicDonations } from '../scripts/donations-public.mjs'

const gasResponse = {
  fetchedAt: '2026-10-01T00:00:00.000Z',
  fund: '開邦雄飛応援金',
  totalAmount: 123456,
  donorCount: 2,
  donors: [
    { name: '山田 太郎', period: '14期', amount: 30000, message: '応援しています', confirmedAt: '2026-09-30T00:00:00.000Z' },
    { name: '佐藤 花子', period: '', amount: 5000, message: '', confirmedAt: '2026-09-29T00:00:00.000Z' },
  ],
}

describe('公開用の寄付データ', () => {
  it('累計額・件数・寄付者ごとの金額とメッセージを含まない', () => {
    const out = toPublicDonations(gasResponse)
    expect(out).not.toHaveProperty('totalAmount')
    expect(out).not.toHaveProperty('donorCount')
    for (const d of out.donors) {
      expect(d).not.toHaveProperty('amount')
      expect(d).not.toHaveProperty('message')
    }
    const json = JSON.stringify(out)
    expect(json).not.toMatch(/123456|30000|5000|応援しています/)
  })

  it('画面で使う項目（fund / name / period / confirmedAt）は残る', () => {
    const out = toPublicDonations(gasResponse)
    expect(out.fund).toBe('開邦雄飛応援金')
    expect(out.donors).toEqual([
      { name: '山田 太郎', period: '14期', confirmedAt: '2026-09-30T00:00:00.000Z' },
      { name: '佐藤 花子', period: '', confirmedAt: '2026-09-29T00:00:00.000Z' },
    ])
  })

  it('コミット済みの public/data/donations.json に金額系の項目がない', () => {
    const data = JSON.parse(readFileSync(resolve(process.cwd(), 'public/data/donations.json'), 'utf-8'))
    expect(data).not.toHaveProperty('totalAmount')
    expect(data).not.toHaveProperty('donorCount')
    for (const d of data.donors) {
      expect(d).not.toHaveProperty('amount')
      expect(d).not.toHaveProperty('message')
    }
  })

  it('fetch-donations.mjs は GAS 応答をそのまま書き出さず toPublicDonations を通す', () => {
    const src = readFileSync(resolve(process.cwd(), 'scripts/fetch-donations.mjs'), 'utf-8')
    expect(src).toContain('toPublicDonations(data)')
    expect(src).not.toMatch(/writeFileSync\(OUTPUT_PATH, JSON\.stringify\(data\b/)
    expect(src).not.toMatch(/totalAmount\s*:/)
  })

  it('fetch-donations.mjs はエラーメッセージに GAS の生応答を埋め込まない', () => {
    const src = readFileSync(resolve(process.cwd(), 'scripts/fetch-donations.mjs'), 'utf-8')
    expect(src).not.toMatch(/JSON\.stringify\(data\)/)
    expect(src).not.toMatch(/text\.slice\(/)
  })

  it('fetch-donations.mjs は要求失敗のログにトークンを出さない', () => {
    const token = 'secret/token+value'
    const out = spawnSync(process.execPath, [resolve(process.cwd(), 'scripts/fetch-donations.mjs')], {
      cwd: mkdtempSync(join(tmpdir(), 'fetch-donations-')),
      env: { ...process.env, GITHUB_ACTIONS: 'true', DONATIONS_ENDPOINT_URL: 'http://[invalid', DONATIONS_ENDPOINT_TOKEN: token },
      encoding: 'utf-8',
    })
    const log = out.stdout + out.stderr
    expect(log).toContain('Request failed')
    expect(log).not.toContain(token)
    expect(log).not.toContain(encodeURIComponent(token))
  })
})
