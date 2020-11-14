<script>
  import Header from '../containers/Header/Header'
  import Buttons from '../containers/Book/Buttons'
  import Books from '../containers/Book/Books'
  import Footer from '../containers/Footer/Footer'
  import Frame from '../parts/Frame/Main.svelte'
</script>

<Frame>
  <div slot="header">
    <Header />
  </div>

  <div slot="content">
    <Buttons />
    <Books />
  </div>

  <div slot="footer">
    <Footer />
  </div>
</Frame>
