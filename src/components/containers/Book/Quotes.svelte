<script>
  import { sources } from '../../../states/book'
</script>

<style>
  .sources {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 8px;
  }

  a {
    color: blue;
    text-decoration: underline;
  }
</style>

<div>引用元</div>

<div class="sources">
  {#each $sources as source, i}
    <div>{i}.</div>
    <a
      href={source.value}
      target="_blank"
      rel="noreferrer noreferrer">{source.value}</a>
  {/each}
</div>
