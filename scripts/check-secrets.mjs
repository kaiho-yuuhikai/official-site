#!/usr/bin/env node
/**
 * 秘匿情報リーク検出スキャナ
 *
 * Public リポジトリに秘密鍵・API トークン・個人情報を誤って commit するのを防ぐ。
 *
 * 使い方:
 *   node scripts/check-secrets.mjs --all-tracked       # git で追跡中の全ファイル
 *   node scripts/check-secrets.mjs --staged            # git staged のファイル
 *   node scripts/check-secrets.mjs --files a.js b.json # 任意ファイル
 *   node scripts/check-secrets.mjs --ref <sha>..HEAD   # 指定範囲の diff 対象
 *
 * 抑制方法:
 *   1. 行末に `// allow-secret:<detector-id>` または `# allow-secret:<detector-id>`
 *   2. .secretscanignore に glob を書く (1 行 1 パターン、# でコメント)
 *
 * 終了コード:
 *   0 = 問題なし / 1 = 違反検出 / 2 = 実行エラー
 */

import { readFileSync, statSync, existsSync } from 'node:fs'
import { resolve, relative, extname } from 'node:path'
import { execSync } from 'node:child_process'

// バイナリ・大規模生成物などスキャン対象外
const SKIP_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.svg',
  '.pdf', '.zip', '.gz', '.tar', '.tgz', '.7z',
  '.woff', '.woff2', '.ttf', '.otf', '.eot',
  '.mp3', '.mp4', '.mov', '.wav', '.webm',
])

const SKIP_FILE_BASENAMES = new Set([
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
])

const SKIP_PATH_PREFIXES = [
  'node_modules/',
  '.git/',
  '.output/',
  '.nuxt/',
  'dist/',
]

// このスキャナ自体は検出ルールの DSL を持つため、自分自身は除外
const SELF_PATHS = new Set([
  'scripts/check-secrets.mjs',
  'tests/check-secrets.test.mjs',
])

// プレースホルダ判定 (xxxx / placeholder / YOUR_xxx / changeme)
const PLACEHOLDER_PATTERNS = [
  /xxxx+/i,
  /placeholder/i,
  /your[_-]?(token|secret|key|password|api|client)/i,
  /change[_-]?me/i,
  /example[_-]?(token|key)/i,
  /\bdummy\b/i,
  /\bredacted\b/i,
]

function isPlaceholder(match) {
  return PLACEHOLDER_PATTERNS.some((p) => p.test(match))
}

// 既知の運営・公開ドメイン (これらのメアドは公開しても問題ない)
const ALLOWED_EMAIL_DOMAINS = new Set([
  'example.com',
  'example.org',
  'example.net',
  'kaiho-yuhikai.com',
  'kaiho-yuuhikai.jp',
  'kaihoyuuhikai.jp',
  'kaihoyuhi.com',
  'users.noreply.github.com',
  'noreply.github.com',
])

// 公開ドキュメント・コミット履歴に記載される個別アドレス
// (組織ドメインを丸ごと許可するのは広すぎるためピンポイント)
const ALLOWED_EMAIL_ADDRESSES = new Set([
  'kaihoyuuhikai@gmail.com',
  'george@gscale.jp',
  'jkamiya5@gmail.com',           // commit author の標準値
  'noreply@anthropic.com',        // Claude Code の Co-Authored-By 標準値
])

function isAllowedEmail(addr) {
  const lower = addr.toLowerCase()
  if (ALLOWED_EMAIL_ADDRESSES.has(lower)) return true
  for (const d of ALLOWED_EMAIL_DOMAINS) {
    if (lower.endsWith('@' + d)) return true
  }
  return false
}

export const DETECTORS = [
  {
    id: 'pem-private-key',
    label: 'PEM 形式の秘密鍵',
    severity: 'critical',
    regex: /-----BEGIN (?:RSA |EC |DSA |OPENSSH |ENCRYPTED )?PRIVATE KEY-----/g,
  },
  {
    id: 'gcp-service-account',
    label: 'GCP Service Account JSON',
    severity: 'critical',
    regex: /"type"\s*:\s*"service_account"/g,
  },
  {
    id: 'google-api-key',
    label: 'Google API Key',
    severity: 'high',
    regex: /AIza[0-9A-Za-z_-]{35}/g,
  },
  {
    id: 'github-pat',
    label: 'GitHub Personal Access Token',
    severity: 'critical',
    regex: /gh[pousr]_[A-Za-z0-9]{36,}/g,
  },
  {
    id: 'aws-access-key',
    label: 'AWS Access Key ID',
    severity: 'critical',
    regex: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g,
  },
  {
    id: 'slack-token',
    label: 'Slack Token',
    severity: 'critical',
    regex: /xox[baprs]-[0-9]+-[0-9]+-[0-9a-zA-Z-]{10,}/g,
  },
  {
    id: 'jwt',
    label: 'JWT (3 セグメント)',
    severity: 'high',
    regex: /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g,
  },
  {
    id: 'url-credentials',
    label: 'URL 埋め込みの認証情報',
    severity: 'high',
    regex: /\bhttps?:\/\/[^\s/:@]+:[^\s/@]+@/g,
  },
  {
    id: 'jp-mobile-phone',
    label: '日本の携帯電話番号',
    severity: 'medium',
    regex: /\b0[789]0[- ]?\d{4}[- ]?\d{4}\b/g,
  },
  {
    id: 'personal-email',
    label: '個人メールアドレス (運営ドメイン以外)',
    severity: 'medium',
    regex: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g,
    customFilter: (match) => !isAllowedEmail(match),
  },
]

// PDF / Office 文書を置いてよい場所。これ以外に置くと「内部資料の誤公開」リスクとして警告。
//   public/files/ — サイトから配信する PDF (大同窓会資料・アンケート集計等)
//   docs/         — リポジトリ参考資料 (HTML マニュアル・活動史等)
const ALLOWED_BINARY_DOC_PATHS = ['public/files/', 'docs/']
const BINARY_DOC_EXTENSIONS = new Set(['.pdf', '.docx', '.xlsx', '.pptx', '.doc', '.xls', '.ppt'])

/**
 * バイナリ文書 (PDF / Office) が許可された場所に配置されているかを検査する。
 * 内容スキャンができないバイナリでも「リポ root に置かれた未整理の PDF」のような
 * 典型的な誤コミットを止めるために path ベースでフィルタする。
 *
 * @param {string[]} files
 * @param {{ rootDir?: string }} opts
 * @returns {{ file: string, line: number, detectorId: string, label: string, severity: string, snippet: string }[]}
 */
export function scanFilePlacements(files, opts = {}) {
  const rootDir = resolve(opts.rootDir || process.cwd())
  const ignorePatterns = loadIgnorePatterns(rootDir)
  const findings = []
  for (const f of files) {
    const abs = resolve(rootDir, f)
    const rel = relative(rootDir, abs).split('\\').join('/')
    if (SKIP_PATH_PREFIXES.some((p) => rel.startsWith(p))) continue
    if (ignorePatterns.some((p) => matchGlob(rel, p))) continue
    const ext = extname(rel).toLowerCase()
    if (!BINARY_DOC_EXTENSIONS.has(ext)) continue
    if (ALLOWED_BINARY_DOC_PATHS.some((p) => rel.startsWith(p))) continue
    findings.push({
      file: rel,
      line: 0,
      detectorId: 'binary-doc-misplaced',
      label: 'PDF/Office 文書が許可パス外に配置されている',
      severity: 'high',
      snippet: `${rel} は ${ALLOWED_BINARY_DOC_PATHS.join(' または ')} に配置してください`,
    })
  }
  return findings
}

function shouldSkipFile(absPath, rootDir) {
  const rel = relative(rootDir, absPath).split('\\').join('/')
  if (SELF_PATHS.has(rel)) return true
  if (SKIP_FILE_BASENAMES.has(rel.split('/').pop())) return true
  if (SKIP_PATH_PREFIXES.some((p) => rel.startsWith(p))) return true
  const ext = extname(absPath).toLowerCase()
  if (SKIP_EXTENSIONS.has(ext)) return true
  try {
    const st = statSync(absPath)
    if (!st.isFile()) return true
    if (st.size > 5 * 1024 * 1024) return true // 5MB 超は skip
  } catch {
    return true
  }
  return false
}

function loadIgnorePatterns(rootDir) {
  const path = resolve(rootDir, '.secretscanignore')
  if (!existsSync(path)) return []
  return readFileSync(path, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
}

function matchGlob(rel, pattern) {
  // 単純な glob → regex
  const esc = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '<<DOUBLESTAR>>')
    .replace(/\*/g, '[^/]*')
    .replace(/<<DOUBLESTAR>>/g, '.*')
    .replace(/\?/g, '.')
  return new RegExp('^' + esc + '$').test(rel)
}

function redact(match) {
  if (match.length <= 8) return match.slice(0, 2) + '***'
  return match.slice(0, 4) + '***' + match.slice(-2)
}

function getLineNumber(content, index) {
  let line = 1
  for (let i = 0; i < index; i++) {
    if (content.charCodeAt(i) === 10) line++
  }
  return line
}

function getLineContent(content, index) {
  let start = index
  while (start > 0 && content.charCodeAt(start - 1) !== 10) start--
  let end = index
  while (end < content.length && content.charCodeAt(end) !== 10) end++
  return content.slice(start, end)
}

function hasAllowMarker(lineContent, detectorId) {
  // 行末 // または # コメント, あるいは <!-- ... --> 形式
  const m = lineContent.match(/(?:\/\/|#|<!--)\s*allow-secret:([\w,*-]+)/)
  if (!m) return false
  const ids = m[1].split(',').map((s) => s.trim())
  return ids.includes(detectorId) || ids.includes('*')
}

/**
 * @param {string[]} files - 走査対象 (絶対 or rootDir からの相対)
 * @param {{ rootDir?: string }} opts
 * @returns {{ file: string, line: number, detectorId: string, label: string, severity: string, snippet: string }[]}
 */
export function scanFiles(files, opts = {}) {
  const rootDir = resolve(opts.rootDir || process.cwd())
  const ignorePatterns = loadIgnorePatterns(rootDir)
  const findings = []

  for (const f of files) {
    const abs = resolve(rootDir, f)
    if (shouldSkipFile(abs, rootDir)) continue
    const rel = relative(rootDir, abs).split('\\').join('/')
    if (ignorePatterns.some((p) => matchGlob(rel, p))) continue

    let content
    try {
      content = readFileSync(abs, 'utf8')
    } catch {
      continue
    }
    // バイナリ判定 (NUL バイト含有)
    if (content.includes(' ')) continue

    for (const d of DETECTORS) {
      d.regex.lastIndex = 0
      let m
      while ((m = d.regex.exec(content)) !== null) {
        const match = m[0]
        if (isPlaceholder(match)) continue
        if (d.customFilter && !d.customFilter(match)) continue
        const line = getLineNumber(content, m.index)
        const lineContent = getLineContent(content, m.index)
        if (hasAllowMarker(lineContent, d.id)) continue
        findings.push({
          file: rel,
          line,
          detectorId: d.id,
          label: d.label,
          severity: d.severity,
          snippet: redact(match),
        })
      }
    }
  }
  return findings
}

// ---- CLI ----

function listAllTracked() {
  const out = execSync('git ls-files -z', { encoding: 'buffer' })
  return out.toString('utf8').split(' ').filter(Boolean)
}

function listStaged() {
  const out = execSync('git diff --cached --name-only -z --diff-filter=ACMR', { encoding: 'buffer' })
  return out.toString('utf8').split(' ').filter(Boolean)
}

function listRefDiff(range) {
  const out = execSync(`git diff --name-only -z --diff-filter=ACMR ${range}`, { encoding: 'buffer' })
  return out.toString('utf8').split(' ').filter(Boolean)
}

function severityRank(s) {
  return s === 'critical' ? 0 : s === 'high' ? 1 : 2
}

function printReport(findings) {
  if (findings.length === 0) {
    process.stdout.write('[secret-scan] OK — 違反なし\n')
    return 0
  }
  const sorted = [...findings].sort((a, b) => severityRank(a.severity) - severityRank(b.severity) || a.file.localeCompare(b.file) || a.line - b.line)
  process.stderr.write('[secret-scan] 違反検出: ' + sorted.length + ' 件\n')
  for (const f of sorted) {
    process.stderr.write(`  [${f.severity}] ${f.file}:${f.line} (${f.detectorId}) ${f.label} — ${f.snippet}\n`)
  }
  process.stderr.write('\n対処:\n')
  process.stderr.write('  - 誤検出なら: 該当行末に "// allow-secret:<detector-id>" を付ける\n')
  process.stderr.write('  - ファイル単位で除外: .secretscanignore に glob を追記\n')
  process.stderr.write('  - 実トークンなら: ファイルから削除 + 旧トークン無効化 + 履歴 rewrite を検討\n')
  return 1
}

async function main() {
  const args = process.argv.slice(2)
  let files = []
  try {
    if (args.includes('--all-tracked')) {
      files = listAllTracked()
    } else if (args.includes('--staged')) {
      files = listStaged()
    } else if (args.includes('--ref')) {
      const i = args.indexOf('--ref')
      const range = args[i + 1]
      if (!range) throw new Error('--ref には range (例: origin/main..HEAD) を指定してください')
      files = listRefDiff(range)
    } else if (args.includes('--files')) {
      const i = args.indexOf('--files')
      files = args.slice(i + 1).filter((a) => !a.startsWith('--'))
    } else {
      process.stderr.write('Usage: check-secrets.mjs [--all-tracked|--staged|--ref <range>|--files <paths...>]\n')
      process.exit(2)
    }
  } catch (e) {
    process.stderr.write(`[secret-scan] エラー: ${e.message}\n`)
    process.exit(2)
  }
  const findings = [...scanFiles(files), ...scanFilePlacements(files)]
  process.exit(printReport(findings))
}

// node entrypoint detection
const isMain = (() => {
  const arg1 = process.argv[1] || ''
  return arg1.endsWith('check-secrets.mjs')
})()

if (isMain) {
  main()
}
