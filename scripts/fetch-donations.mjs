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
import { toPublicDonations } from './donations-public.mjs'

const URL = process.env.DONATIONS_ENDPOINT_URL
const TOKEN = process.env.DONATIONS_ENDPOINT_TOKEN
const OUTPUT_PATH = 'public/data/donations.json'

const FALLBACK = {
  fetchedAt: null,
  fund: '開邦雄飛応援金',
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
    // 応答本文はログに出さない。途中で切れた JSON だと先頭に金額が載るため（ログは公開リポで誰でも見られる）。
    // HTML（ログイン画面・エラーページ）のときだけ原因調査用に先頭を出す
    const looksLikeJson = /^\s*[\[{]/.test(text)
    throw new Error(`Invalid JSON response (${text.length} bytes)${looksLikeJson ? '' : `: ${text.slice(0, 200)}`}`)
  }

  if (typeof data.totalAmount !== 'number' || !Array.isArray(data.donors)) {
    // 生の応答は金額・メッセージを含むのでログに出さない。キーの一覧だけを出す
    const keys = data && typeof data === 'object' ? Object.keys(data).join(',') : typeof data
    throw new Error(`Unexpected payload shape (keys: ${keys})`)
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true })
  // 金額・件数・メッセージは公開しない（公開JSONには画面で使う項目だけを書く）
  const publicData = toPublicDonations(data)
  writeFileSync(OUTPUT_PATH, JSON.stringify(publicData, null, 2) + '\n', 'utf-8')
  console.log(`[fetch-donations] Saved: ${publicData.donors.length} donors`)
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
