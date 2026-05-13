#!/usr/bin/env node
/**
 * note.com の RSS フィードを取得し、JSON ファイルに保存する
 * GitHub Actions から定期実行される
 *
 * - articles: アカウント全体の最新記事（トップグリッド用）
 * - magazineCreators: マガジン内の記事をクリエイター別にグループ化
 */

const NOTE_ACCOUNT_RSS = 'https://note.com/kaihoyuuhikai/rss'
const NOTE_MAGAZINE_RSS = 'https://note.com/kaihoyuuhikai/m/m20c04499fc49/rss'
const OUTPUT_PATH = 'public/data/note-articles.json'

import { writeFileSync, mkdirSync } from 'fs'
import { dirname } from 'path'

async function fetchRSS(url) {
  console.log(`Fetching RSS from ${url}...`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return await res.text()
}

function parseRSS(xml) {
  const items = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1]

    const title = extract(itemXml, 'title')
    const link = extract(itemXml, 'link')
    const pubDate = extract(itemXml, 'pubDate')
    const description = extract(itemXml, 'description')

    // Extract image: media:thumbnail > enclosure > description img
    let image = ''
    const mediaThumbnailMatch = itemXml.match(/<media:thumbnail>([\s\S]*?)<\/media:thumbnail>/)
    if (mediaThumbnailMatch) {
      image = mediaThumbnailMatch[1].trim()
    }
    if (!image) {
      const mediaThumbnailUrlMatch = itemXml.match(/<media:thumbnail[^>]*url="([^"]+)"/)
      if (mediaThumbnailUrlMatch) image = mediaThumbnailUrlMatch[1]
    }
    if (!image) {
      const enclosureMatch = itemXml.match(/<enclosure[^>]+url="([^"]+)"/)
      if (enclosureMatch) image = enclosureMatch[1]
    }
    if (!image) {
      const decoded = description.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
      const imgMatch = decoded.match(/<img[^>]+src="([^"]+)"/)
      if (imgMatch) image = imgMatch[1]
    }

    // Extract note:creatorName and note:creatorImage
    const creatorNameMatch = itemXml.match(/<note:creatorName>([\s\S]*?)<\/note:creatorName>/)
    const creatorName = creatorNameMatch ? creatorNameMatch[1].trim() : ''
    const creatorImageMatch = itemXml.match(/<note:creatorImage>([\s\S]*?)<\/note:creatorImage>/)
    const creatorImage = creatorImageMatch ? creatorImageMatch[1].trim() : ''

    items.push({ title, link, pubDate, description: stripHtml(description), image, creatorName, creatorImage })
  }

  return items
}

function extract(xml, tag) {
  // Handle CDATA
  const cdataRegex = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`)
  const cdataMatch = xml.match(cdataRegex)
  if (cdataMatch) return cdataMatch[1].trim()

  const regex = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`)
  const match = xml.match(regex)
  return match ? match[1].trim() : ''
}

function stripHtml(str) {
  if (!str) return ''
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/<[^>]*>/g, '')
    .trim()
    .substring(0, 200)
}

async function main() {
  try {
    // アカウント全体の最新記事
    const accountXml = await fetchRSS(NOTE_ACCOUNT_RSS)
    const accountArticles = parseRSS(accountXml)
    if (accountArticles.length === 0) {
      console.error('No articles found in account RSS feed')
      process.exit(1)
    }

    // マガジン内の記事（クリエイター別グループ化）
    const magazineXml = await fetchRSS(NOTE_MAGAZINE_RSS)
    const magazineArticles = parseRSS(magazineXml)

    const creatorsMap = new Map()
    for (const article of magazineArticles) {
      const key = article.creatorName || '開邦雄飛会'
      if (!creatorsMap.has(key)) {
        creatorsMap.set(key, { creatorName: key, creatorImage: article.creatorImage, articles: [] })
      }
      creatorsMap.get(key).articles.push({
        title: article.title,
        link: article.link,
        pubDate: article.pubDate,
        image: article.image,
      })
    }
    const magazineCreators = Array.from(creatorsMap.values())

    const output = {
      fetchedAt: new Date().toISOString(),
      articles: accountArticles.slice(0, 6), // 最新6件
      magazineCreators,
    }

    mkdirSync(dirname(OUTPUT_PATH), { recursive: true })
    writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf-8')
    console.log(`Saved ${output.articles.length} account articles to ${OUTPUT_PATH}`)
    console.log(`Saved ${magazineCreators.length} creator groups (${magazineArticles.length} magazine articles)`)
    magazineCreators.forEach(c => console.log(`  ${c.creatorName}: ${c.articles.length}件`))
  } catch (err) {
    console.error('Failed to fetch RSS:', err.message)
    process.exit(1)
  }
}

main()
