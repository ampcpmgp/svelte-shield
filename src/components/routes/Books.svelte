<script>
  import Header from '../parts/Header/Header.svelte'
  import Footer from '../parts/Footer/Footer.svelte'
  import Settings from '../parts/Modals/Settings.svelte'
  import NewReprint from '../containers/Books/NewReprint.svelte'
  import NewSelfMade from '../containers/Books/NewSelfMade.svelte'
  import Frame from '../parts/Frame/Main.svelte'
  import Buttons from '../containers/Books/Buttons.svelte'
  import LoadedBooks from '../containers/Books/LoadedBooks.svelte'
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
    <LoadedBooks />
  </div>

  <div slot="footer">
    <Footer />
  </div>
</Frame>

<!-- 各モーダル -->
<Settings />
<NewReprint />
<NewSelfMade />
