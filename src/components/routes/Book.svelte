<script>
  import Header from '../containers/Header/Header'
  import Buttons from '../containers/Book/Buttons'
  import Books from '../containers/Book/Books'
  import Footer from '../containers/Footer/Footer'
  import Settings from '../containers/Modals/Settings.svelte'
  import Frame from '../parts/Frame/Main.svelte'
</script>

<style>
  .content {
    display: grid;
    grid-template-rows: auto 1fr;
  }
</style>

<Frame>
  <div slot="header">
    <Header />
  </div>

  <div class="content" slot="content">
    <Buttons />
    <Books />
  </div>

  <div slot="footer">
    <Footer />
  </div>
</Frame>

<!-- 各モーダル -->
<Settings />
