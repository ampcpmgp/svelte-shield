<script>
  import Header from '../parts/Header/Header.svelte'
  import Footer from '../parts/Footer/Footer.svelte'
  import Settings from '../parts/Modals/Settings.svelte'
  import NewReprint from '../containers/Book/NewReprint.svelte'
  import Frame from '../parts/Frame/Main.svelte'
  import Buttons from '../containers/Book/Buttons.svelte'
  import Books from '../containers/Book/Books.svelte'
  import { init } from '../../databases/ipfs'

  init()
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
<NewReprint />
