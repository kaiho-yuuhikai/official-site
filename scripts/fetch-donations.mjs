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

// fetch のエラー（URL の形が壊れている等）には要求先 URL がそのまま入ることがあり、URL にはトークンが含まれる。
// Actions のマスクはエンコード後のトークンには効かないので、生・エンコード後の両方を伏せる
function redactToken(message) {
  if (!TOKEN) return message
  return message.split(encodeURIComponent(TOKEN)).join('***').split(TOKEN).join('***')
}

async function main() {
  if (!URL || !TOKEN) {
    warn('DONATIONS_ENDPOINT_URL / DONATIONS_ENDPOINT_TOKEN が未設定です。コミット済みのJSONを保持します。')
    ensureFile()
    return
  }

  const endpoint = `${URL}?token=${encodeURIComponent(TOKEN)}`
  console.log(`[fetch-donations] Fetching ${URL.replace(/\/[^/]+\/exec.*/, '/.../exec')}...`)

  let res
  try {
    res = await fetch(endpoint, { redirect: 'follow' })
  } catch (err) {
    throw new Error(`Request failed: ${redactToken(String(err?.message ?? err))}`)
  }
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`)
  }
  const text = await res.text()

  let data
  try {
    data = JSON.parse(text)
  } catch (err) {
    // 応答本文はログに出さない（途中で切れた JSON や前置き付きの応答だと金額・メッセージが載る。ログは公開リポで誰でも見られる）。
    // 原因の切り分け用に、長さと HTML（ログイン画面・エラーページ）らしいかだけを出す
    const kind = /^\s*</.test(text) ? 'HTML' : 'non-JSON'
    throw new Error(`Invalid JSON response (${text.length} bytes, ${kind})`)
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

// GitHub Actions 上では警告アノテーション（実行結果の画面に黄色で出る）としても残す。デプロイは止めない
function warn(message) {
  console.warn(`[fetch-donations] ${message}`)
  if (process.env.GITHUB_ACTIONS) console.log(`::warning title=fetch-donations::${escapeAnnotation(message)}`)
}

// ワークフローコマンドの値は %・改行をエスケープしないと注釈が途中で切れる
function escapeAnnotation(value) {
  return String(value).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A')
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
  warn(`寄付データの取得に失敗しました（${err.message}）。コミット済みのJSONを表示します`)
  ensureFile()
  process.exit(0)
}
