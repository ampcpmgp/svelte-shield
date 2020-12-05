<script>
  import { link } from 'svelte-spa-router'
  import { init, loadBooks, loadedBooks } from '../../../states/books'

  init()
  loadBooks(0)
</script>

<style>
  .wrapper {
    display: grid;
    align-content: center;
    grid-template-columns: repeat(auto-fill, 140px);
    grid-template-rows: repeat(auto-fill, 160px);
    gap: 12px;
    padding: 16px;
    justify-content: center;
  }

  .book {
    padding: 6px;
  }
</style>

<div class="wrapper">
  {#each $loadedBooks as book}
    <a
      href={`/books/${book.hash}`}
      class="card bg-primary border-light shadow-soft book"
      use:link>
      {book.title}
      {book.insertedDate}
    </a>
  {/each}
</div>
