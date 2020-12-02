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

  .title-wrapper {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    grid-column-gap: 8px;
    padding: 0px 4px;
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
  }
</style>

<header>
  <div data-toggle="modal" data-target={'#' + Modal.SETTINGS}>
    <Icon isBox={true}><i class="fas fa-user-cog" /></Icon>
  </div>

  <div class="title-wrapper">
    <Icon><i class="fas fa-angle-left" /></Icon>
    <div class="title">{$title}</div>
  </div>

  <a href="https://twitter.com/am_nimitz3" target="_blank">
    <Icon><i class="fab fa-twitter-square" /></Icon>
  </a>

  <a href="https://github.com/ampcpmgp/svelte-shield" target="_blank">
    <Icon><i class="fab fa-github" /></Icon>
  </a>
</header>
