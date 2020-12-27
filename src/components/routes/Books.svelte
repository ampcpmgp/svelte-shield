<script>
  import Header from '../parts/Header/Header.svelte'
  import Footer from '../parts/Footer/Footer.svelte'
  import Settings from '../parts/Modals/Settings.svelte'
  import Mode from '../parts/Modals/Mode.svelte'
  import NewReprint from '../containers/Books/NewReprint.svelte'
  import NewSelfMade from '../containers/Books/NewSelfMade.svelte'
  import Frame from '../parts/Frame/Main.svelte'
  import Buttons from '../containers/Books/Buttons.svelte'
  import LoadedBooks from '../containers/Books/LoadedBooks.svelte'
  import Navigator from '../containers/Books/Navigator.svelte'
  import '../../databases/ipfs'
</script>

<style>
  .content {
    display: grid;
    grid-template-rows: auto 1fr;
  }
</style>

<Frame>
  <div slot="header">
    <Header
      tweetText="IPFS と連携し、他者と共有可能な本アプリ。"
      additionalHashTags={['IPFS本']} />
  </div>

  <div class="content" slot="content">
    <Buttons />
    <LoadedBooks />
  </div>

  <div slot="footer">
    <Footer />
  </div>
</Frame>

<!-- 固定フッター -->
<Navigator />

<!-- 各モーダル -->
<Settings />
<Mode />
<NewReprint />
<NewSelfMade />
