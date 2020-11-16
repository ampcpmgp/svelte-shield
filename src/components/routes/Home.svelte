<script>
  import { init } from '../../states/morpheme'
  import Header from '../containers/Header/Header'
  import Content from '../containers/Home/Content'
  import Footer from '../containers/Footer/Footer'
  import Frame from '../parts/Frame/Main.svelte'

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
