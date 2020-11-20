<script>
  import { init } from '../../states/morpheme'
  import Header from '../parts/Header/Header.svelte'
  import Footer from '../parts/Footer/Footer.svelte'
  import Settings from '../parts/Modals/Settings.svelte'
  import Frame from '../parts/Frame/Main.svelte'
  import Content from '../containers/Home/Content.svelte'

  init()
</script>

<Frame>
  <div slot="header">
    <Header />
  </div>

  <div slot="content">
    <Content />
  </div>

  <div slot="footer">
    <Footer />
  </div>
</Frame>

<!-- 各モーダル -->
<Settings />
