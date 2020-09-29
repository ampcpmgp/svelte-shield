<script>
  import Router from 'svelte-spa-router'
  import Header from './containers/Header/Header'
  import Footer from './containers/Footer/Footer'
  import routes from './routes'
</script>

<style>
  :global(body) {
    padding: 10px 12px;
    box-sizing: border-box;
    height: 100vh;
  }

  :global(#app) {
    height: 100%;
  }

  .wrapper {
    height: 100%;
    margin: 0 auto;
    max-width: 1240px;
  }

  .card {
    height: 100%;
  }

  .card-body {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
  }
</style>

<div class="wrapper">
  <div class="card shadow-soft border-light">
    <div class="card-body">
      <Header />
      <Router {routes} />
      <Footer />
    </div>
  </div>
</div>
