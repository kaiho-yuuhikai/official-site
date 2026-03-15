#!/usr/bin/env node
/**
 * note.com の RSS フィードを取得し、JSON ファイルに保存する
 * GitHub Actions から定期実行される
 */

const NOTE_RSS_URL = 'https://note.com/kaihoyuuhikai/rss'
const OUTPUT_PATH = 'public/data/note-articles.json'

import { writeFileSync, mkdirSync } from 'fs'
import { dirname } from 'path'

async function fetchRSS() {
  console.log(`Fetching RSS from ${NOTE_RSS_URL}...`)
  const res = await fetch(NOTE_RSS_URL)
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

    // Extract image from enclosure or description
    let image = ''
    const enclosureMatch = itemXml.match(/<enclosure[^>]+url="([^"]+)"/)
    if (enclosureMatch) {
      image = enclosureMatch[1]
    }
    if (!image) {
      // Try to find image in CDATA description
      const decoded = description.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
      const imgMatch = decoded.match(/<img[^>]+src="([^"]+)"/)
      if (imgMatch) image = imgMatch[1]
    }

    items.push({ title, link, pubDate, description: stripHtml(description), image })
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
    const xml = await fetchRSS()
    const articles = parseRSS(xml)

    if (articles.length === 0) {
      console.error('No articles found in RSS feed')
      process.exit(1)
    }

    const output = {
      fetchedAt: new Date().toISOString(),
      articles: articles.slice(0, 6), // 最新6件
    }

    mkdirSync(dirname(OUTPUT_PATH), { recursive: true })
    writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf-8')
    console.log(`Saved ${output.articles.length} articles to ${OUTPUT_PATH}`)
    console.log('Titles:')
    output.articles.forEach(a => console.log(`  - ${a.title}`))
  } catch (err) {
    console.error('Failed to fetch RSS:', err.message)
    process.exit(1)
  }
}

main()
