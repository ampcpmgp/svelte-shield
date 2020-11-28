<script>
  import { init } from '../../states/morpheme'
  import Header from '../parts/Header/Header.svelte'
  import Settings from '../parts/Modals/Settings.svelte'
  import Frame from '../parts/Frame/Main.svelte'
  import Content from '../containers/Book/Content.svelte'

  export let params = { hash: '' }
  const { hash } = params

  init()
</script>

<Frame>
  <div slot="header">
    <Header />
  </div>

  <div slot="content">
    <Content {hash} />
  </div>
</Frame>

<!-- 各モーダル -->
<Settings />
