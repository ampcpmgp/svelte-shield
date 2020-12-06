<script>
  import { sources } from '../../../states/book'
  import * as is from '../../../utils/is'
</script>

<style>
  .sources {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 8px;
  }

  .ios {
    /* ios safari は .card-body の padding を突き抜けて置かれるため、上下に設定する */
    padding-bottom: 3rem;
  }

  a {
    color: blue;
    text-decoration: underline;
  }

  @media (prefers-color-scheme: dark) {
    a {
      color: var(--gray-500);
    }
  }
</style>

<div>引用元</div>

<div class="sources" class:ios={is.iOS()}>
  {#each $sources as source, i}
    <div>{i}.</div>
    <a
      href={source.value}
      target="_blank"
      rel="noreferrer noreferrer">{source.value}</a>
  {/each}
</div>
