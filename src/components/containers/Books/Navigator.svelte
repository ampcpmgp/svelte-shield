<script>
  import { fly } from 'svelte/transition'
  import {
    init,
    loadBooks,
    selectedBooks,
    hasSelectedBooks,
  } from '../../../states/books'
  import { removePin } from '../../../databases/ipfs'
  import { deleteBook } from '../../../databases/dexie'

  async function deleteAll() {
    for (const item of $selectedBooks) {
      await removePin(item.hash)
      await deleteBook(item.hash)
    }

    init()
    await loadBooks()
  }

  function output() {}
</script>

<style>
  .wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .inner {
    padding: 16px;
    max-width: 1214px;
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    grid-column-gap: 12px;
    margin: auto;
  }
</style>

{#if $hasSelectedBooks}
  <nav
    transition:fly={{ y: 100 }}
    class="wrapper navbar navbar-expand-lg navbar-transparent navbar-light shadow-soft navbar-theme-primary">
    <div class="inner container position-relative">
      <button class="btn btn-sm btn-primary" on:click={deleteAll}>削除</button>
      <button
        class="btn btn-sm btn-primary"
        on:click={output}
        style="display: none"
        disabled>出力(実装予定)</button>
    </div>
  </nav>
{/if}
