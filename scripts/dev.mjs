// =============================================================================
// npm run dev のラッパー
//
// 2026-08-25 の勉強会で、プレビューがサイトごと 404 になる事象が複数人に出た。
// 原因は .nuxt（作りかけデータ）が前の状態のまま残っていたこと。当日は
// 「Ctrl+C で止めて、キャッシュを消すコマンドを打つ」で復旧したが、
// 役員の方に毎回それをさせない。ここで自動的に作り直す。
//
// 毎回消すと起動が遅くなるので、前回と状態が変わったときだけ消す。
// Windows でも動くよう rm -rf ではなく Node の API を使う。
// =============================================================================
import { existsSync, readFileSync, writeFileSync, rmSync, statSync } from 'node:fs'
import { execSync, spawn } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const nuxtDir = join(root, '.nuxt')
const stampFile = join(nuxtDir, '.dev-stamp')

// 「前回 dev を動かしたときと同じ状態か」を表す指紋。
// 変わっていたら .nuxt は古いので作り直す。
function fingerprint() {
  const parts = []
  try {
    parts.push(execSync('git rev-parse HEAD', { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim())
  } catch {
    parts.push('no-git')
  }
  for (const f of ['package.json', 'nuxt.config.ts', 'package-lock.json']) {
    const p = join(root, f)
    parts.push(existsSync(p) ? String(statSync(p).mtimeMs) : 'none')
  }
  return parts.join('|')
}

// .nuxt が中途半端（前回の起動が途中で落ちた）かどうか
function looksIncomplete() {
  if (!existsSync(nuxtDir)) return false
  return !existsSync(join(nuxtDir, 'nuxt.d.ts')) || !existsSync(join(nuxtDir, 'tsconfig.json'))
}

const fp = fingerprint()
let reason = null
if (looksIncomplete()) reason = '前回の作りかけが残っていました'
else if (existsSync(stampFile)) {
  try { if (readFileSync(stampFile, 'utf8').trim() !== fp) reason = '中身が変わっていました' }
  catch { reason = '状態を確認できませんでした' }
}

if (reason && existsSync(nuxtDir)) {
  console.log(`\n  ${reason}。プレビューの作りかけデータを作り直します（10〜20秒）…\n`)
  try { rmSync(nuxtDir, { recursive: true, force: true }) } catch {}
  try { rmSync(join(root, 'node_modules/.vite'), { recursive: true, force: true }) } catch {}
}

const child = spawn('npx', ['nuxt', 'dev', ...process.argv.slice(2)], { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' })

// 起動できたら指紋を残す（次回はこれと比べる）
setTimeout(() => {
  try { if (existsSync(nuxtDir)) writeFileSync(stampFile, fp) } catch {}
}, 15000)

child.on('exit', (code) => process.exit(code ?? 0))
