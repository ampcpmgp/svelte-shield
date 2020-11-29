<script>
  import { fetch } from '../../states/book'
  import { init } from '../../states/morpheme'
  import Header from '../parts/Header/Header.svelte'
  import Settings from '../parts/Modals/Settings.svelte'
  import Frame from '../parts/Frame/Main.svelte'
  import Content from '../containers/Book/Content.svelte'

  export let params = { hash: '' }
  const { hash } = params

  fetch(hash)
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
