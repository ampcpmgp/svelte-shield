<script>
  import Version from "../Version/Version.svelte";
  import Icon from "../Icon/Icon.svelte";
  import svgBadge from "../../../images/dummy/badge.svg";
</script>

<div class="wrapper">
  {#if import.meta.env.PROD}
    <a href="https://hits.seeyoufarm.com" target="_blank" rel="noopener">
      <img
        src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fampcpmgp.github.io%2Fsvelte-shield%2F&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=Page+View&edge_flat=false"
        alt=""
      />
    </a>
  {:else}<img src={svgBadge} alt="" />{/if}

  <div class="right-size">
    <a
      class="external-link"
      href="https://github.com/ampcpmgp/svelte-shield"
      target="_blank"
      rel="noopener"
    >
      <Icon><i class="fab fa-github" /></Icon>
    </a>

    <a
      class="external-link"
      href="https://twitter.com/am_nimitz3"
      target="_blank"
      rel="noopener"
    >
      <Icon><i class="fab fa-twitter-square" /></Icon>
    </a>

    <div class="sp-hidden">
      <Version />
    </div>
  </div>
</div>

<style>
  .wrapper {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: end;
  }

  .right-size {
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 8px;
    align-items: end;
  }

  @media (min-width: 576px) {
    .external-link {
      margin-bottom: -16px;
    }
  }

  @media (max-width: 575px) {
    .sp-hidden {
      display: none;
    }
  }
</style>
