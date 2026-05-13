import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { scanFiles, scanFilePlacements, DETECTORS } from '../scripts/check-secrets.mjs'

// GitHub Push Protection 回避: ソースに「実トークン形式の連続文字列」を含めないよう
// 必ず文字列結合でテスト fixture を組み立てる。
// (テスト実行時には正しい形式の文字列としてスキャナに渡される)
const F = {
  awsAccessKey: 'AKIA' + 'IOSFODNN7' + 'EXAMPLE',
  googleApiKey: 'AIza' + 'SyA1234567890abcdefghijklmnopqrstuvwx',
  githubPatP: 'ghp_' + 'abcdefghijklmnopqrstuvwxyzABCDEFGH12',
  githubPatS: 'ghs_' + 'abcdefghijklmnopqrstuvwxyzABCDEFGH12',
  slackBot: 'xoxb-' + '1234567890-1234567890-AbCdEfGhIjKlMnOpQrStUvWx',
  jwt: 'eyJ' + 'hbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.abcdefghijklmnopqrstuvwxyz0123',
  pemRsa: '-----BEGIN ' + 'RSA PRIVATE KEY-----\nMIIE...\n-----END RSA PRIVATE KEY-----',
  pemGeneric: '-----BEGIN ' + 'PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----',
}

function makeTmpRepo() {
  const dir = mkdtempSync(join(tmpdir(), 'secret-scan-'))
  return dir
}

function writeFile(dir, rel, content) {
  const full = join(dir, rel)
  mkdirSync(join(full, '..'), { recursive: true })
  writeFileSync(full, content)
  return full
}

describe('scanFiles - 検出パターン', () => {
  let dir
  beforeEach(() => { dir = makeTmpRepo() })
  afterEach(() => { rmSync(dir, { recursive: true, force: true }) })

  it('PEM秘密鍵を検出する (RSA)', () => {
    const f = writeFile(dir, 'a.txt', F.pemRsa + '\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.length).toBeGreaterThan(0)
    expect(findings[0].detectorId).toBe('pem-private-key')
  })

  it('PEM秘密鍵を検出する (汎用 PRIVATE KEY)', () => {
    const f = writeFile(dir, 'a.txt', F.pemGeneric + '\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.some(f => f.detectorId === 'pem-private-key')).toBe(true)
  })

  it('Google API Key を検出する', () => {
    const f = writeFile(dir, 'a.txt', 'const k = "' + F.googleApiKey + '"\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.some(f => f.detectorId === 'google-api-key')).toBe(true)
  })

  it('GCP service account JSON マーカーを検出する', () => {
    const f = writeFile(dir, 'sa.json', JSON.stringify({ type: 'service_account', project_id: 'x', private_key: F.pemGeneric }))
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.some(f => f.detectorId === 'gcp-service-account')).toBe(true)
  })

  it('GitHub PAT (ghp_) を検出する', () => {
    const f = writeFile(dir, 'a.txt', 'TOKEN=' + F.githubPatP + '\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.some(f => f.detectorId === 'github-pat')).toBe(true)
  })

  it('GitHub PAT (ghs_) を検出する', () => {
    const f = writeFile(dir, 'a.txt', F.githubPatS + '\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.some(f => f.detectorId === 'github-pat')).toBe(true)
  })

  it('AWS Access Key を検出する', () => {
    const f = writeFile(dir, 'a.txt', F.awsAccessKey + '\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.some(f => f.detectorId === 'aws-access-key')).toBe(true)
  })

  it('Slack Bot Token を検出する', () => {
    const f = writeFile(dir, 'a.txt', F.slackBot + '\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.some(f => f.detectorId === 'slack-token')).toBe(true)
  })

  it('JWT (3 セグメント) を検出する', () => {
    const f = writeFile(dir, 'a.txt', F.jwt + '\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.some(f => f.detectorId === 'jwt')).toBe(true)
  })

  it('URL に埋め込まれた credentials を検出する', () => {
    const f = writeFile(dir, 'a.txt', 'https://user:p%40ssw0rd@example.com/repo.git\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.some(f => f.detectorId === 'url-credentials')).toBe(true)
  })

  it('携帯電話番号(080-/090-/070-)を検出する', () => {
    const f = writeFile(dir, 'a.txt', '担当: 090-1234-5678\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.some(f => f.detectorId === 'jp-mobile-phone')).toBe(true)
  })

  it('LINE WORKS Bot No (botid:) 推測値は flag しない (パターン除外)', () => {
    const f = writeFile(dir, 'a.txt', 'const LW_BOT_ID = props.getProperty("LW_BOT_ID")\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.length).toBe(0)
  })
})

describe('scanFiles - 偽陽性の抑制', () => {
  let dir
  beforeEach(() => { dir = makeTmpRepo() })
  afterEach(() => { rmSync(dir, { recursive: true, force: true }) })

  it('test@example.com は許容する', () => {
    const f = writeFile(dir, 'a.txt', 'sample = "test@example.com"\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.filter(x => x.detectorId === 'personal-email').length).toBe(0)
  })

  it('既知の運営ドメインメール (kaiho-yuhikai.com / kaiho-yuuhikai.jp) は許容する', () => {
    const f = writeFile(dir, 'a.txt', 'お問い合わせ: office@kaiho-yuhikai.com\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.filter(x => x.detectorId === 'personal-email').length).toBe(0)
  })

  it('placeholder トークン (xxxx, YOUR_TOKEN_HERE) は flag しない', () => {
    const f = writeFile(dir, 'a.txt', 'TOKEN=' + 'ghp_' + 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' + '\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.length).toBe(0)
  })

  it('行末に // allow-secret:<id> があれば抑制する', () => {
    const f = writeFile(dir, 'a.txt', 'const ex = "' + F.googleApiKey + '" // allow-secret:google-api-key\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.length).toBe(0)
  })

  it('# allow-secret:<id> でも抑制する', () => {
    const f = writeFile(dir, 'a.txt', 'TOKEN=' + F.githubPatP + ' # allow-secret:github-pat\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.length).toBe(0)
  })

  it('Markdown コメント <!-- allow-secret:<id> --> も抑制する', () => {
    const f = writeFile(dir, 'a.md', '担当: another-person@somewhere.example <!-- allow-secret:personal-email -->\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.length).toBe(0)
  })

  it('allow-secret:* で全 detector を抑制する', () => {
    const f = writeFile(dir, 'a.txt', F.awsAccessKey + ' // allow-secret:*\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.length).toBe(0)
  })

  it('GScale 開発担当のメアド (george@gscale.jp) は公開ドキュメントで許容', () => {
    const f = writeFile(dir, 'a.md', '権限付与: george@gscale.jp\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.length).toBe(0)
  })

  it('バイナリ拡張子はスキップする', () => {
    const f = writeFile(dir, 'a.png', F.pemGeneric)
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.length).toBe(0)
  })

  it('public/data/*.json はスキャン対象 (note 記事 RSS 等は秘匿でないが、寄付者情報には注意)', () => {
    const f = writeFile(dir, 'public/data/donations.json', '{"donors":[{"name":"山田","period":"14期"}]}\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.length).toBe(0)
  })

  it('package-lock.json はメール/PATチェックの偽陽性を避けるためスキップ', () => {
    const f = writeFile(dir, 'package-lock.json', '"resolved":"https://registry.npmjs.org/foo/-/foo-1.0.0.tgz"\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings.length).toBe(0)
  })
})

describe('scanFiles - 出力フォーマット', () => {
  let dir
  beforeEach(() => { dir = makeTmpRepo() })
  afterEach(() => { rmSync(dir, { recursive: true, force: true }) })

  it('finding は relative path / 行番号 / detectorId を含む', () => {
    const f = writeFile(dir, 'sub/dir/secret.txt', 'line1\n' + F.awsAccessKey + '\nline3\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings[0].file).toBe('sub/dir/secret.txt')
    expect(findings[0].line).toBe(2)
    expect(findings[0].detectorId).toBe('aws-access-key')
  })

  it('finding には raw match の全体ではなく redacted snippet を含む', () => {
    const f = writeFile(dir, 'a.txt', F.awsAccessKey + '\n')
    const findings = scanFiles([f], { rootDir: dir })
    expect(findings[0].snippet).not.toContain(F.awsAccessKey)
    expect(findings[0].snippet).toMatch(/AKIA.*\*\*\*/)
  })
})

describe('scanFilePlacements - PDF/Office 配置検査', () => {
  let dir
  beforeEach(() => { dir = makeTmpRepo() })
  afterEach(() => { rmSync(dir, { recursive: true, force: true }) })

  it('リポ root の PDF を検出する (誤コミット典型)', () => {
    const f = writeFile(dir, 'soukai-shiryo.pdf', '%PDF-1.4 dummy')
    const findings = scanFilePlacements([f], { rootDir: dir })
    expect(findings.length).toBe(1)
    expect(findings[0].detectorId).toBe('binary-doc-misplaced')
    expect(findings[0].severity).toBe('high')
  })

  it('public/files/ 配下の PDF は許容する', () => {
    const f = writeFile(dir, 'public/files/handbook.pdf', '%PDF-1.4 dummy')
    const findings = scanFilePlacements([f], { rootDir: dir })
    expect(findings.length).toBe(0)
  })

  it('docs/ 配下の PDF は許容する (参考資料)', () => {
    const f = writeFile(dir, 'docs/activity.pdf', '%PDF-1.4 dummy')
    const findings = scanFilePlacements([f], { rootDir: dir })
    expect(findings.length).toBe(0)
  })

  it('Office 文書 (xlsx) もリポ root では検出する', () => {
    const f = writeFile(dir, 'budget.xlsx', 'PK dummy')
    const findings = scanFilePlacements([f], { rootDir: dir })
    expect(findings.length).toBe(1)
    expect(findings[0].detectorId).toBe('binary-doc-misplaced')
  })

  it('テキスト/コード/画像は対象外', () => {
    const files = [
      writeFile(dir, 'README.md', '# hi'),
      writeFile(dir, 'index.ts', 'export const x = 1'),
      writeFile(dir, 'logo.png', 'binary'),
    ]
    const findings = scanFilePlacements(files, { rootDir: dir })
    expect(findings.length).toBe(0)
  })

  it('node_modules / .nuxt 配下の PDF は無視する', () => {
    const f = writeFile(dir, 'node_modules/foo/sample.pdf', '%PDF-1.4 dummy')
    const findings = scanFilePlacements([f], { rootDir: dir })
    expect(findings.length).toBe(0)
  })

  it('.secretscanignore で明示的に許可された PDF は除外する', () => {
    writeFile(dir, '.secretscanignore', 'legacy-archives/*.pdf\n')
    const f = writeFile(dir, 'legacy-archives/old.pdf', '%PDF-1.4 dummy')
    const findings = scanFilePlacements([f], { rootDir: dir })
    expect(findings.length).toBe(0)
  })
})

describe('DETECTORS メタデータ', () => {
  it('全 detector に id / label / severity がある', () => {
    for (const d of DETECTORS) {
      expect(d.id).toBeTruthy()
      expect(d.label).toBeTruthy()
      expect(['critical', 'high', 'medium']).toContain(d.severity)
    }
  })

  it('id は一意', () => {
    const ids = DETECTORS.map(d => d.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
