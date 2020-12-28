import { onMount, onDestroy } from 'svelte'

// これを入れないと、 chrome でのみ、 IPFS本一覧ページで本を100冊以上登録した際
// IPFS 本詳細ページに移行すると、 grid の再計算が行われず、本一覧ページの高さを
// 引き継いでしまい、ファーストビューの高さを大きく突き破って表示されてしまう。
export function adjustHeight(height) {
  onMount(() => {
    window.root.style.height = height
  })
  onDestroy(() => {
    window.root.style.height = 'initial'
  })
}
