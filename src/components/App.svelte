<script>
  import Router from 'svelte-spa-router'
  import routes from './routes'
  import * as is from '../utils/is'
</script>

<style>
  :global(body) {
    box-sizing: border-box;
    word-break: break-all;
  }

  .wrapper {
    display: grid;
    width: 100%;
    min-height: 100vh;
    max-width: 1240px;
    margin: 0 auto;
    padding: 10px 12px;
  }

  .card {
    min-height: 100%;
  }

  .card-body {
    min-height: 100%;
    display: grid;
  }
</style>

<div class="wrapper">
  <div class="card shadow-soft border-light">
    <div class="card-body">
      {#if is.iOS()}
        <div class="ios-wrapper">
          <Router {routes} />
        </div>
      {:else}
        <Router {routes} />
      {/if}
    </div>
  </div>
</div>
