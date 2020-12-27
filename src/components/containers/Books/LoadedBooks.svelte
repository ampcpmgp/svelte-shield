<script>
  import { link } from 'svelte-spa-router'
  import dayjs from 'dayjs'
  import { init, loadBooks, loadedBooks } from '../../../states/books'

  init()
  loadBooks(0)

  function getPercent(ratio) {
    return Math.floor(ratio * 100)
  }
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

  .book-wrapper {
    height: 160px;
    width: 100%;
    position: relative;
  }
  @media (max-width: 575px) {
    .book-wrapper {
      height: 100px;
    }
  }

  .book {
    height: 100%;
    padding: 8px;
    display: grid;
    grid-template-rows: 1fr auto;
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

  .reading-ratio {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #00ff0033;
    height: var(--height);
  }

  .square {
    position: absolute;
    bottom: -8px;
    left: -14px;
    padding-top: 8px;
    padding-right: 8px;
  }

  .square input {
    display: none;
  }
  .square label {
    padding: 6px;
    border-radius: 4px;
    border: solid 1px #ccc;
    display: grid;
    place-items: center;
    cursor: pointer;
    /* overwrite nuemorphism ui */
    margin-bottom: 0;
  }
  .square label:hover {
    border-color: #999;
  }
  .square input:checked + label {
    border-color: #999;
  }
  .square label::after {
    content: '';
    width: 20px;
    height: 20px;
    background-color: transparent;
    border: solid 1px #00cc00;
    border-radius: 2px;
  }
  .square input:checked + label::after {
    background-color: #00cc00;
  }
</style>

<div class="wrapper">
  {#each $loadedBooks as book}
    <div class="book-wrapper">
      <a
        href={`/books/${book.hash}`}
        class="book card bg-primary border-light shadow-soft"
        title={`${book.title}\n${dayjs(book.insertedDate).format('YYYY/MM/DD HH:mm:ss')}\n\n進捗割合: ${getPercent(book.readingRatio)}%`}
        use:link>
        <h3 class="title">{book.title}</h3>
        <p class="date">{dayjs(book.insertedDate).format('YYYY/MM/DD')}</p>

        <div
          class="reading-ratio"
          style="--height: {getPercent(book.readingRatio)}%" />
      </a>

      <div class="square">
        <input
          type="checkbox"
          id={`selected-${book.hash}`}
          bind:checked={book.selected} />
        <label for={`selected-${book.hash}`} />
      </div>
    </div>
  {/each}
</div>
