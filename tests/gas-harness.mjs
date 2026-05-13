/**
 * GAS スクリプトを Node.js vm sandbox で実行するヘルパ
 *
 * GAS は CommonJS / ES Module ではなく独自の global scope モデル。
 * vm.runInContext で `function fn() {}` 宣言は context.globalThis に登録される。
 * `const` / `let` は script スコープに閉じるため、テスト側からは関数呼び出しでアクセスする。
 *
 * 使い方:
 *   const ctx = createGasContext({ PropertiesService: mockProps(), ... })
 *   loadGasFile(ctx, 'scripts/gas/donations/LineWorksNotifier.js')
 *   const result = callGas(ctx, 'buildNotificationText_', [row])
 */

import { readFileSync } from 'node:fs'
import vm from 'node:vm'

export function createGasContext(globals = {}) {
  const sandbox = {
    console,
    JSON,
    Date,
    Math,
    String,
    Number,
    Boolean,
    Array,
    Object,
    Error,
    RegExp,
    encodeURIComponent,
    decodeURIComponent,
    setTimeout: () => {},
    clearTimeout: () => {},
    ...globals,
  }
  return vm.createContext(sandbox)
}

export function loadGasFile(ctx, filePath) {
  const src = readFileSync(filePath, 'utf8')
  vm.runInContext(src, ctx, { filename: filePath })
}

export function callGas(ctx, fnName, args = []) {
  ctx.__args__ = args
  try {
    return vm.runInContext(`${fnName}.apply(null, __args__)`, ctx)
  } finally {
    delete ctx.__args__
  }
}

export function evalGas(ctx, code) {
  return vm.runInContext(code, ctx)
}

// ---- 標準モック工場 ----

export function makePropertiesService(initial = {}) {
  const store = { ...initial }
  const props = {
    getProperty: (k) => (k in store ? store[k] : null),
    setProperty: (k, v) => { store[k] = String(v); return props },
    deleteProperty: (k) => { delete store[k]; return props },
    getProperties: () => ({ ...store }),
    _store: store,
  }
  return {
    getScriptProperties: () => props,
    getUserProperties: () => props,
    getDocumentProperties: () => props,
  }
}

export function makeCacheService(initial = {}) {
  const store = { ...initial }
  const cache = {
    get: (k) => (k in store ? store[k] : null),
    put: (k, v, _ttl) => { store[k] = String(v) },
    remove: (k) => { delete store[k] },
    _store: store,
  }
  return {
    getScriptCache: () => cache,
    getUserCache: () => cache,
    getDocumentCache: () => cache,
  }
}

export function makeUrlFetchApp(handler) {
  // handler: (url, opts) => { code, body, headers? }
  const calls = []
  const app = {
    fetch: (url, opts = {}) => {
      calls.push({ url, opts })
      const res = handler(url, opts) || { code: 200, body: '{}' }
      return {
        getResponseCode: () => res.code,
        getContentText: () => res.body,
        getAllHeaders: () => res.headers || {},
      }
    },
    _calls: calls,
  }
  return app
}

export function makeUtilities({ sha256Sig = 'SIG_BYTES' } = {}) {
  return {
    base64Encode: (input) => {
      const buf = typeof input === 'string'
        ? Buffer.from(input, 'utf8')
        : Buffer.from(input)
      return buf.toString('base64')
    },
    base64EncodeWebSafe: (input) => {
      const buf = typeof input === 'string'
        ? Buffer.from(input, 'utf8')
        : Buffer.from(input)
      return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    },
    newBlob: (s) => ({
      getBytes: () => Buffer.from(s, 'utf8'),
    }),
    computeRsaSha256Signature: (_data, _privateKey) => {
      // バイト配列を返す (内容は決定的)
      return Buffer.from(sha256Sig, 'utf8')
    },
    getUuid: () => 'uuid-mock-1234',
    formatDate: (date, _tz, format) => {
      const d = date instanceof Date ? date : new Date(date)
      return d.toISOString().replace('T', ' ').slice(0, 16)
    },
  }
}

export function makeLogger() {
  const lines = []
  return {
    log: (m, ...rest) => {
      const s = rest.length ? [m, ...rest].join(' ') : String(m)
      lines.push(s)
    },
    _lines: lines,
  }
}

export function makeMailApp() {
  const sent = []
  return {
    sendEmail: (toOrParams, subject, body) => {
      if (typeof toOrParams === 'object') {
        sent.push(toOrParams)
      } else {
        sent.push({ to: toOrParams, subject, body })
      }
    },
    _sent: sent,
  }
}

export function makeSpreadsheetApp({ url = 'https://docs.google.com/spreadsheets/d/MOCK_ID/edit', name = 'mock', rows = [] } = {}) {
  const sheet = {
    getName: () => 'donations',
    getLastRow: () => rows.length + 1,
    getRange: (row, col, numRows, numCols) => ({
      getValues: () => {
        if (typeof row === 'number' && typeof col === 'number') {
          const r = row - 1
          if (r < 0 || r >= rows.length) return [[]]
          return [rows[r].slice(col - 1, col - 1 + (numCols || rows[r].length))]
        }
        return [rows[0] || []]
      },
      getValue: () => (rows[row - 1] || [])[col - 1],
    }),
  }
  const ss = {
    getName: () => name,
    getUrl: () => url,
    getId: () => 'MOCK_ID',
    getSheetByName: () => sheet,
    getSheets: () => [sheet],
  }
  return {
    openById: () => ss,
    getActive: () => ss,
    _ss: ss,
    _sheet: sheet,
  }
}
