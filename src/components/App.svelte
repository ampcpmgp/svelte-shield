<script>
  import Router from 'svelte-spa-router'
  import routes from './routes'
  import * as is from '../utils/is'
</script>

<style>
  :global(body) {
    padding: 10px 12px;
    box-sizing: border-box;
    height: 100vh;
    word-break: break-all;
  }

  :global(#app) {
    min-height: 100%;
    display: grid;
  }

  .wrapper {
    display: grid;
    min-height: 100%;
    margin: 0 auto;
    max-width: 1240px;
    width: 100%;
  }

  .card {
    min-height: 100%;
  }

  .card-body {
    min-height: 100%;
    display: grid;
  }

  .ios-wrapper {
    /* ios safari は .card-body の padding を突き抜けて置かれるため、上下に設定する */
    padding-bottom: 3rem;
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
