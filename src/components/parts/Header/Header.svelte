<script>
  import { default as Modal } from '../../../const/modal'
  import { default as Icon } from '../../parts/Icon/Icon.svelte'
</script>

<style>
  header {
    display: grid;
    grid-column-gap: 14px;
    grid-template-columns: auto 1fr auto auto;
  }

  i {
    font-size: 24px;
  }
</style>

<header>
  <div data-toggle="modal" data-target={'#' + Modal.SETTINGS}>
    <Icon isBox={true}><i class="fas fa-user-cog" /></Icon>
  </div>

  <!-- 隙間を空ける用の空タグ -->
  <div />

  <a href="https://twitter.com/am_nimitz3" target="_blank">
    <Icon><i class="fab fa-twitter-square" /></Icon>
  </a>

  <a href="https://github.com/ampcpmgp/svelte-shield" target="_blank">
    <Icon><i class="fab fa-github" /></Icon>
  </a>
</header>
