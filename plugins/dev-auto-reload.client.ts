// プレビュー中に読み込みが壊れたとき、自分で操作しなくても直るようにする。
//
// 開発サーバーを立て直すと、ブラウザが持っている古い部品の場所が変わり、
// 「読み込めませんでした」のまま画面が止まることがある。役員の方に
// Ctrl+C や再読込を求めないよう、1回だけ自動で読み直す。
//
// 開発時のみ。無限に読み直さないよう、1回で打ち止めにする。
export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.dev) return

  const KEY = 'kaiho-dev-auto-reloaded'
  const reloadOnce = () => {
    try {
      if (sessionStorage.getItem(KEY)) return   // すでに1回やった
      sessionStorage.setItem(KEY, '1')
    } catch {
      return   // sessionStorage が使えない環境では何もしない
    }
    location.reload()
  }

  // 部品(chunk)の読み込み失敗
  nuxtApp.hook('app:chunkError', reloadOnce)
  // Vite のプリロード失敗
  window.addEventListener('vite:preloadError', reloadOnce)

  // 正常に表示できたら「1回やった」の記録を消す（次に壊れたらまた直せるように）
  nuxtApp.hook('app:suspense:resolve', () => {
    try { sessionStorage.removeItem(KEY) } catch {}
  })
})
