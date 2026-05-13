#!/usr/bin/env node
/**
 * .git/hooks/pre-commit に scripts/git-hooks/pre-commit を symlink で導入する。
 * npm run hooks:install から呼ばれる前提。
 *
 * 既存のフックがある場合は上書きせず、メッセージを表示して終了。
 */

import { existsSync, lstatSync, readlinkSync, symlinkSync, mkdirSync, chmodSync } from 'node:fs'
import { resolve, relative, dirname } from 'node:path'
import { execSync } from 'node:child_process'

function detectGitDir() {
  try {
    const out = execSync('git rev-parse --git-dir', { encoding: 'utf8' }).trim()
    return resolve(out)
  } catch {
    return null
  }
}

const gitDir = detectGitDir()
if (!gitDir) {
  console.error('[hooks:install] git リポジトリではありません')
  process.exit(2)
}

const hooksDir = resolve(gitDir, 'hooks')
mkdirSync(hooksDir, { recursive: true })

const hookPath = resolve(hooksDir, 'pre-commit')
const sourcePath = resolve(process.cwd(), 'scripts/git-hooks/pre-commit')

if (!existsSync(sourcePath)) {
  console.error(`[hooks:install] ソースが見つかりません: ${sourcePath}`)
  process.exit(2)
}

if (existsSync(hookPath)) {
  try {
    const st = lstatSync(hookPath)
    if (st.isSymbolicLink()) {
      const target = readlinkSync(hookPath)
      if (resolve(dirname(hookPath), target) === sourcePath) {
        console.log('[hooks:install] 既にインストール済みです')
        process.exit(0)
      }
    }
  } catch {}
  console.error(`[hooks:install] 既存の pre-commit フックがあります: ${hookPath}`)
  console.error('  上書きするなら手動で削除してから再実行してください')
  process.exit(1)
}

const relTarget = relative(hooksDir, sourcePath)
symlinkSync(relTarget, hookPath)
chmodSync(sourcePath, 0o755)
console.log(`[hooks:install] インストール完了: ${hookPath} -> ${relTarget}`)
