// 強制的に作りかけデータを捨てて開発サーバーを立て直す。
// 「とにかく直したい」ときの逃げ道。Windows でも動く。
import { rmSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
for (const d of ['.nuxt', '.output', 'node_modules/.vite']) {
  try { rmSync(join(root, d), { recursive: true, force: true }) } catch {}
}
console.log('\n  作りかけデータを捨てました。開発サーバーを立て直します…\n')
const c = spawn('npx', ['nuxt', 'dev', ...process.argv.slice(2)], { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' })
c.on('exit', (code) => process.exit(code ?? 0))
