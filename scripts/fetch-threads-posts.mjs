#!/usr/bin/env node
/**
 * Threads API から最新投稿を取得し、JSON ファイルに保存する
 * GitHub Actions から定期実行される
 *
 * 必要な環境変数:
 *   THREADS_ACCESS_TOKEN  - Threads API の長期アクセストークン
 *   THREADS_USER_ID       - Threads ユーザー ID（省略時は "me" を使用）
 */

const ACCESS_TOKEN = process.env.THREADS_ACCESS_TOKEN
const USER_ID = process.env.THREADS_USER_ID || 'me'
const OUTPUT_PATH = 'public/data/threads-posts.json'
const POSTS_LIMIT = 10

import { writeFileSync, mkdirSync } from 'fs'
import { dirname } from 'path'

async function fetchThreadsPosts() {
  if (!ACCESS_TOKEN) {
    throw new Error('THREADS_ACCESS_TOKEN environment variable is not set')
  }

  const url = `https://graph.threads.net/v1.0/${USER_ID}/threads?fields=id,text,timestamp,permalink&limit=${POSTS_LIMIT}&access_token=${ACCESS_TOKEN}`
  console.log(`Fetching Threads posts for user: ${USER_ID}...`)

  const res = await fetch(url)
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`HTTP ${res.status}: ${body}`)
  }

  const data = await res.json()
  return data.data || []
}

async function main() {
  try {
    const rawPosts = await fetchThreadsPosts()

    if (rawPosts.length === 0) {
      console.warn('No posts found from Threads API')
    }

    const posts = rawPosts.map(post => ({
      text: post.text || '',
      date: post.timestamp || '',
      url: post.permalink || '',
    }))

    const output = {
      posts,
      updated_at: new Date().toISOString(),
    }

    mkdirSync(dirname(OUTPUT_PATH), { recursive: true })
    writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf-8')
    console.log(`Saved ${posts.length} posts to ${OUTPUT_PATH}`)
    posts.slice(0, 3).forEach(p => console.log(`  - ${p.text.substring(0, 60)}...`))
  } catch (err) {
    console.error('Failed to fetch Threads posts:', err.message)
    process.exit(1)
  }
}

main()
