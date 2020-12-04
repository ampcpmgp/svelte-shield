<script>
  import { fetch, init as initBook } from '../../states/book'
  import { init as initMorpheme } from '../../states/morpheme'
  import Header from '../containers/Book/Header.svelte'
  import Settings from '../parts/Modals/Settings.svelte'
  import Frame from '../parts/Frame/Main.svelte'
  import Content from '../containers/Book/Content.svelte'

  export let params = { hash: '' }
  const { hash } = params

  async function init() {
    initBook()
    await initMorpheme()
    await fetch(hash)
  }

  init()
</script>

<Frame>
  <div slot="header">
    <Header />
  </div>

  <div slot="content">
    <Content />
  </div>
</Frame>

<!-- 各モーダル -->
<Settings />
