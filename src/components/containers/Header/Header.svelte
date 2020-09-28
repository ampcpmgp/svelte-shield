<script>
  import { default as Icon } from '../../parts/Icon/Icon.svelte'
</script>

<style>
  header {
    display: grid;
    justify-content: right;
    grid-column-gap: 14px;
    grid-template-columns: auto 1fr auto auto;
  }

  i {
    font-size: 24px;
  }
</style>

<header>
  <Icon isBox={true}>
    <i
      class="fas fa-user-cog"
      data-toggle="modal"
      data-target="#modal-default"
      data-mock-open-modal />
  </Icon>

  <!-- 隙間を空ける用の空タグ -->
  <div />

  <a href="https://twitter.com/am_nimitz3" target="_blank">
    <Icon>
      <i class="fab fa-twitter-square" />
    </Icon>
  </a>

  <a href="https://github.com/ampcpmgp/riot-shield" target="_blank">
    <Icon>
      <i class="fab fa-github" />
    </Icon>
  </a>
</header>
