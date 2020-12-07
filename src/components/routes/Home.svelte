<script>
  import { init } from '../../states/morpheme'
  import Header from '../parts/Header/Header.svelte'
  import Footer from '../parts/Footer/Footer.svelte'
  import Settings from '../parts/Modals/Settings.svelte'
  import Mode from '../parts/Modals/Mode.svelte'
  import Frame from '../parts/Frame/Main.svelte'
  import Content from '../containers/Home/Content.svelte'
  import { onDestroy } from 'svelte'

  /**
   * 開発時はモックがURLを変更するタイミングを待たせて、辞書データの初期化を止める。
   * メインページのこのページだけ必要。
   */
  if (process.env.NODE_ENV === 'development') {
    const id = setTimeout(() => {
      init()
    }, 0)

    onDestroy(() => {
      clearTimeout(id)
    })
  } else {
    init()
  }
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
<Mode />
