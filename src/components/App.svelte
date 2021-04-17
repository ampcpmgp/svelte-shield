<script>
  import Router from "svelte-spa-router";
  import routes from "./routes";
</script>

<div id="root">
  <div class="card shadow-soft border-light">
    <div class="card-body">
      <Router {routes} />
    </div>
  </div>
</div>

<style>
  #root {
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
