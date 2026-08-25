// ローカルプレビューで localhost:3000/official-site/... を開いてしまう事故を吸収する。
//
// リポジトリのフォルダ名が official-site なので、人もAIもURLに付けてしまう。
// このサイトの baseURL は '/' なので /official-site/... は存在せず 404 になり、
// 勉強会では複数人が同じところで止まった（2026-08-25 第1回）。
//
// 開発時だけ静かに正しいパスへ振り替える。本番のビルドには入らない
// （import.meta.dev は本番で false になり、ここは除去される）。
export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.dev) return
  if (!to.path.startsWith('/official-site')) return

  const fixed = to.path.replace(/^\/official-site/, '') || '/'
  return navigateTo({ path: fixed, query: to.query, hash: to.hash }, { replace: true })
})
