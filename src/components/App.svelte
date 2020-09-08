<script>
  import Router from 'svelte-spa-router'
  import Header from './parts/Header/Header'
  import routes from './routes'
</script>

<style>
  .wrapper {
    margin: 10px auto;
    padding: 0 15px;
    max-width: 1240px;
  }
</style>

<div class="wrapper">
  <div class="card shadow-soft border-light">
    <div class="card-body">
      <Header />
      <Router {routes} />
    </div>
  </div>
</div>
