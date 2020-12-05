<script>
  import { link } from 'svelte-spa-router'
  import dayjs from 'dayjs'
  import { init, loadBooks, loadedBooks } from '../../../states/books'

  init()
  loadBooks(0)
</script>

<style>
  .wrapper {
    display: grid;
    align-content: start;
    justify-content: center;
    gap: 24px;
    grid-template-columns: repeat(auto-fill, 160px);
    padding: 32px 0;
  }
  @media (max-width: 575px) {
    .wrapper {
      grid-template-columns: repeat(auto-fill, 100px);
      padding: 16px 0;
    }
  }

  .book {
    padding: 8px;
    height: 160px;
    width: 100%;
    display: grid;
    grid-template-rows: 1fr auto;
  }
  @media (max-width: 575px) {
    .book {
      height: 100px;
    }
  }

  .title {
    font-size: 14px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 6;
    -webkit-line-clamp: 6;
    overflow: hidden;
    line-height: 1.4;
  }
  @media (max-width: 575px) {
    .title {
      line-clamp: 3;
      -webkit-line-clamp: 3;
      line-height: 1.3;
    }
  }

  .date {
    font-size: 12px;
    border-top: solid 1px #999;
    /* overwrite neumorphism */
    margin-bottom: 0;
    display: grid;
    justify-content: end;
  }
</style>

<div class="wrapper">
  {#each $loadedBooks as book}
    <a
      href={`/books/${book.hash}`}
      class="card bg-primary border-light shadow-soft book"
      title={book.title}
      use:link>
      <h3 class="title">{book.title}</h3>
      <p class="date">{dayjs(book.insertedDate).format('YYYY/MM/DD')}</p>
    </a>
  {/each}
</div>
