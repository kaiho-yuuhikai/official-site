import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import vm from 'node:vm'
import { describe, expect, it, beforeAll } from 'vitest'

interface ProjectsApi {
  formatProjectId(n: number): string
  parseProjectIdNumber(id: string | null | undefined): number | null
  nextProjectId(existingIds: Array<string | null | undefined>): string
  composeNotificationEmail(projectId: string, projectName?: string): { subject: string; body: string }
  onFormSubmit(e: unknown): void
}

let api: ProjectsApi
let lastSentMail: { to: string; subject: string; body: string } | null = null
let recordedAssignments: Array<{ row: number; col: number; value: string }> = []

beforeAll(() => {
  const src = readFileSync(
    resolve(__dirname, '..', 'scripts/gas/projects/Projects.js'),
    'utf-8',
  )
  const ctx = makeContext()
  vm.createContext(ctx)
  vm.runInContext(src, ctx)
  api = {
    formatProjectId: ctx.formatProjectId,
    parseProjectIdNumber: ctx.parseProjectIdNumber,
    nextProjectId: ctx.nextProjectId,
    composeNotificationEmail: ctx.composeNotificationEmail,
    onFormSubmit: ctx.onFormSubmit,
  }
})

function makeContext() {
  return {
    SpreadsheetApp: {},
    MailApp: {
      sendEmail(opts: { to: string; subject: string; body: string }) {
        lastSentMail = { to: opts.to, subject: opts.subject, body: opts.body }
      },
    },
    Logger: { log: () => {} },
    console,
  } as Record<string, unknown>
}

describe('Issue #8: 事業ID自動採番ロジック', () => {
  describe('formatProjectId', () => {
    it('1 を「①-001」に整形する', () => {
      expect(api.formatProjectId(1)).toBe('①-001')
    })

    it('123 を「①-123」に整形する', () => {
      expect(api.formatProjectId(123)).toBe('①-123')
    })

    it('1000 以上はゼロ埋めしない', () => {
      expect(api.formatProjectId(1000)).toBe('①-1000')
    })
  })

  describe('parseProjectIdNumber', () => {
    it('「①-005」から 5 を抽出する', () => {
      expect(api.parseProjectIdNumber('①-005')).toBe(5)
    })

    it('null を渡すと null を返す', () => {
      expect(api.parseProjectIdNumber(null)).toBeNull()
    })

    it('規則外の文字列は null を返す', () => {
      expect(api.parseProjectIdNumber('②-001')).toBeNull()
      expect(api.parseProjectIdNumber('hello')).toBeNull()
      expect(api.parseProjectIdNumber('')).toBeNull()
    })
  })

  describe('nextProjectId', () => {
    it('空配列のときは「①-001」', () => {
      expect(api.nextProjectId([])).toBe('①-001')
    })

    it('既存IDの最大値+1 を返す', () => {
      expect(api.nextProjectId(['①-001', '①-002'])).toBe('①-003')
    })

    it('順不同・歯抜けでも最大値+1 を返す（採番は単調）', () => {
      expect(api.nextProjectId(['①-001', '①-005', '①-002'])).toBe('①-006')
    })

    it('規則外の値は無視する', () => {
      expect(api.nextProjectId(['hello', null, '①-003', undefined, '②-100'])).toBe('①-004')
    })
  })

  describe('composeNotificationEmail', () => {
    it('subject に事業IDを含む', () => {
      const mail = api.composeNotificationEmail('①-007', '総会2026')
      expect(mail.subject).toContain('①-007')
    })

    it('body に事業IDと事業名を含む', () => {
      const mail = api.composeNotificationEmail('①-007', '総会2026')
      expect(mail.body).toContain('①-007')
      expect(mail.body).toContain('総会2026')
    })

    it('事業名が未指定でも body は組み立てられる', () => {
      const mail = api.composeNotificationEmail('①-001')
      expect(mail.subject).toContain('①-001')
      expect(mail.body).toContain('①-001')
    })

    it('body にフォーム②でIDを入力する案内が含まれる', () => {
      const mail = api.composeNotificationEmail('①-001', 'X')
      expect(mail.body).toMatch(/フォーム.*ID|ID.*フォーム|報告フォーム/)
    })
  })
})

describe('Issue #8: onFormSubmit 統合（モック）', () => {
  it('既存ID 2 件のシートで、新しい行に「①-003」を書き込み、申請者にメール送信する', () => {
    lastSentMail = null
    recordedAssignments = []

    const COL_TIMESTAMP = 1
    const COL_EMAIL = 2
    const COL_PROJECT_ID = 3
    const COL_PROJECT_NAME = 4

    const sheetData = [
      ['Timestamp', 'メールアドレス', '事業ID', '事業名'],
      [new Date(), 'a@example.com', '①-001', '事業A'],
      [new Date(), 'b@example.com', '①-002', '事業B'],
      [new Date(), 'new@example.com', '', '新規事業C'],
    ]
    const newRowIndex = 4

    const sheet = {
      getLastRow: () => sheetData.length,
      getRange: (row: number, col: number) => ({
        getValues: () => {
          if (row === 2 && col === COL_PROJECT_ID) {
            return sheetData.slice(1).map((r) => [r[COL_PROJECT_ID - 1]])
          }
          throw new Error(`Unexpected getRange call: row=${row} col=${col}`)
        },
        setValue: (v: string) => {
          recordedAssignments.push({ row, col, value: v })
          sheetData[row - 1][col - 1] = v
        },
      }),
    }

    const event = {
      range: {
        getSheet: () => sheet,
        getRow: () => newRowIndex,
      },
      values: [sheetData[newRowIndex - 1][0], 'new@example.com', '', '新規事業C'],
      namedValues: {
        'メールアドレス': ['new@example.com'],
        '事業名': ['新規事業C'],
      },
    }

    api.onFormSubmit(event)

    expect(recordedAssignments.length).toBeGreaterThan(0)
    const idAssignment = recordedAssignments.find((a) => a.col === COL_PROJECT_ID && a.row === newRowIndex)
    expect(idAssignment, '事業ID列に値を書き込む必要がある').toBeTruthy()
    expect(idAssignment!.value).toBe('①-003')

    expect(lastSentMail, 'メールが送信される必要がある').toBeTruthy()
    expect(lastSentMail!.to).toBe('new@example.com')
    expect(lastSentMail!.subject).toContain('①-003')
    expect(lastSentMail!.body).toContain('新規事業C')
  })
})
