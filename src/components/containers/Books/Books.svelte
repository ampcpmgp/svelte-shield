<script>
  import { link } from 'svelte-spa-router'
  import { init, loadBooks, loadedBooks } from '../../../states/books'

  init()
  loadBooks(0)
</script>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, 160px);
    align-content: start;
    justify-content: center;
    gap: 16px;
    padding: 32px 0;
  }
  @media (max-width: 575px) {
    .wrapper {
      grid-template-columns: repeat(auto-fill, 100px);
    }
  }

  .book {
    padding: 6px;
    height: 180px;
  }
  @media (max-width: 575px) {
    .book {
      height: 110px;
    }
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
