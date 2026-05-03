#!/usr/bin/env node
/**
 * 開邦雄飛会基金 寄付集計データを Apps Script Web アプリから取得し、
 * public/data/donations.json に保存する。GitHub Actions から定期実行。
 *
 * 必須環境変数:
 *   DONATIONS_ENDPOINT_URL    Apps Script の Web アプリ URL
 *   DONATIONS_ENDPOINT_TOKEN  GAS 側 TOKEN と一致する文字列
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs'
import { dirname } from 'path'

const URL = process.env.DONATIONS_ENDPOINT_URL
const TOKEN = process.env.DONATIONS_ENDPOINT_TOKEN
const OUTPUT_PATH = 'public/data/donations.json'

const FALLBACK = {
  fetchedAt: null,
  fund: '開邦雄飛応援金',
  totalAmount: 0,
  donorCount: 0,
  donors: [],
}

async function main() {
  if (!URL || !TOKEN) {
    console.warn('[fetch-donations] DONATIONS_ENDPOINT_URL / DONATIONS_ENDPOINT_TOKEN が未設定です。既存JSONを保持します。')
    ensureFile()
    return
  }

  const endpoint = `${URL}?token=${encodeURIComponent(TOKEN)}`
  console.log(`[fetch-donations] Fetching ${URL.replace(/\/[^/]+\/exec.*/, '/.../exec')}...`)

  const res = await fetch(endpoint, { redirect: 'follow' })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`)
  }
  const text = await res.text()

  let data
  try {
    data = JSON.parse(text)
  } catch (err) {
    throw new Error(`Invalid JSON response: ${text.slice(0, 200)}`)
  }

  if (typeof data.totalAmount !== 'number' || !Array.isArray(data.donors)) {
    throw new Error(`Unexpected payload shape: ${JSON.stringify(data).slice(0, 200)}`)
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true })
  writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2) + '\n', 'utf-8')
  console.log(`[fetch-donations] Saved: total ¥${data.totalAmount.toLocaleString()} / ${data.donorCount} donors`)
}

function ensureFile() {
  if (existsSync(OUTPUT_PATH)) return
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true })
  writeFileSync(OUTPUT_PATH, JSON.stringify(FALLBACK, null, 2) + '\n', 'utf-8')
  console.log(`[fetch-donations] Initialized empty ${OUTPUT_PATH}`)
}

try {
  await main()
} catch (err) {
  console.error('[fetch-donations] Failed:', err.message)
  ensureFile()
  process.exit(0)
}
