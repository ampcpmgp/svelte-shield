<script>
  import { link } from 'svelte-spa-router'
  import { default as Modal } from '../../../const/modal'
  import { title } from '../../../states/book'
  import { default as Icon } from '../../parts/Icon/Icon.svelte'

  const hashTags = ['SvelteShield', 'IPFS本']
</script>

<style>
  header {
    display: grid;
    grid-column-gap: 14px;
    grid-template-columns: auto auto 1fr;
    position: relative;
  }

  .user-cog-wrapper {
    margin-right: auto;
  }

  @media (max-width: 575px) {
    header {
      grid-row-gap: 12px;
      grid-template-columns: 1fr auto;
      grid-template-areas:
        'a a'
        'b b';
    }
  }

  .title-wrapper {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    grid-column-gap: 8px;
    padding: 0px 4px;
  }
  @media (max-width: 575px) {
    .title-wrapper {
      grid-area: b;
      padding: 8px 0;
      border-top: solid 2px #666;
      border-bottom: solid 2px #666;
    }
  }

  i {
    font-size: 24px;
  }

  i.fa-angle-left {
    width: 24px;
    text-align: center;
  }

  @media (min-width: 576px) {
    .title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  @media (max-width: 575px) {
    .title {
      justify-self: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .twitter-button {
    /* twitter color */
    color: rgb(29, 161, 242);
    margin-left: auto;
  }
</style>

<header>
  <div
    class="user-cog-wrapper"
    data-toggle="modal"
    data-target={'#' + Modal.SETTINGS}>
    <Icon isBox={true}><i class="fas fa-user-cog" /></Icon>
  </div>

  <div class="title-wrapper">
    <a href="/books" use:link>
      <Icon><i class="fas fa-angle-left" /></Icon>
    </a>

    <div class="title" title={$title}>{$title}</div>
  </div>

  <a
    class="btn btn-sm btn-primary twitter-button"
    href="https://twitter.com/share?ref_src=twsrc%5Etfw&text={`${$title}`}&hashtags={`${hashTags.join(',')}`}"
    target="_blank">
    <span class="fab fa-twitter" />
    ツイートする
  </a>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8">
  </script>
</header>
