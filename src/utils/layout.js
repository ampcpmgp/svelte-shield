import { onMount, onDestroy } from "svelte";

// これを入れないと、 chrome で、 IPFS本一覧ページで本を100冊以上登録した際
// IPFS 本詳細ページに移行すると、 grid の再計算が行われず、本一覧ページの高さを
// 引き継いでしまい、ファーストビューの高さを大きく突き破って表示されてしまう。
export function adjustHeight(height) {
  onMount(() => {
    window.root.style.display = "none";
    window.root.style.height = height;

    // この timeout 処理を入れないと、上記条件で iOS Safari で高さが維持されてしまう。
    setTimeout(() => {
      window.root.style.display = "grid";
    }, 0);
  });
  onDestroy(() => {
    window.root.style.height = "initial";
  });
}
