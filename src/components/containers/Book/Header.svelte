<script>
  import { default as Modal } from '../../../const/modal'
  import { title } from '../../../states/book'
  import { default as Icon } from '../../parts/Icon/Icon.svelte'
</script>

<style>
  header {
    display: grid;
    grid-column-gap: 14px;
    grid-template-columns: auto 1fr auto auto;
  }

  .user-cog-wrapper {
    margin-right: auto;
  }

  @media (max-width: 575px) {
    header {
      grid-row-gap: 12px;
      grid-template-columns: 1fr auto auto;
      grid-template-areas:
        'a a a'
        'b b b';
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

  .title {
    justify-self: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
    <Icon><i class="fas fa-angle-left" /></Icon>
    <div class="title" title={$title}>{$title}</div>
  </div>

  <a href="https://twitter.com/am_nimitz3" target="_blank">
    <Icon><i class="fab fa-twitter-square" /></Icon>
  </a>

  <a href="https://github.com/ampcpmgp/svelte-shield" target="_blank">
    <Icon><i class="fab fa-github" /></Icon>
  </a>
</header>
