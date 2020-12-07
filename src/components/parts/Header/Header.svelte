<script>
  import { default as Modal } from '../../../const/modal'
  import { default as Icon } from '../../parts/Icon/Icon.svelte'
</script>

<style>
  header {
    display: grid;
    grid-column-gap: 14px;
    grid-template-columns: 46px 34px 1fr 40px 40px;
    place-items: center;
  }
  @media (max-width: 575px) {
    header {
      grid-column-gap: 8px;
    }
  }

  i {
    font-size: 24px;
  }

  .fa-shield-alt {
    font-size: 30px;
    cursor: pointer;
    text-shadow: 2px 2px 4px gray;
  }
  .fa-shield-alt:hover {
    opacity: 0.7;
  }
</style>

<header>
  <div data-toggle="modal" data-target={'#' + Modal.SETTINGS}>
    <Icon isBox={true}><i class="fas fa-user-cog" /></Icon>
  </div>

  <!-- 隙間を空ける用の空タグ -->
  <div />

  <i
    class="fas fa-shield-alt"
    data-toggle="modal"
    data-target={'#' + Modal.MODE_CHANGE} />

  <a href="https://twitter.com/am_nimitz3" target="_blank">
    <Icon><i class="fab fa-twitter-square" /></Icon>
  </a>

  <a href="https://github.com/ampcpmgp/svelte-shield" target="_blank">
    <Icon><i class="fab fa-github" /></Icon>
  </a>
</header>
