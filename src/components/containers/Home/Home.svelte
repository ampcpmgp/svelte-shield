<script>
  import * as morpheme from "../../../states/morpheme";
  import { adjustHeight } from "../../../utils/layout";
  import Header from "../../parts/Header/Header.svelte";
  import Footer from "../../parts/Footer/Footer.svelte";
  import Settings from "../../parts/Modals/Settings.svelte";
  import Mode from "../../parts/Modals/Mode.svelte";
  import Frame from "../../parts/Frame/Main.svelte";
  import Content from "./Content.svelte";
  import { onDestroy } from "svelte";

  const { mode } = morpheme;

  /**
   * 開発時はモックがURLを変更するタイミングを待たせて、辞書データの初期化を止める。
   * メインページのこのページだけ必要。
   */
  if (process.env.NODE_ENV === "development") {
    const id = setTimeout(() => {
      init();
    }, 0);

    onDestroy(() => {
      clearTimeout(id);
    });
  } else {
    init();
  }

  adjustHeight("100vh");

  function init() {
    morpheme.init();
    morpheme.stop();
    morpheme.rawText.set("");
  }
</script>

<Frame>
  <div slot="header">
    <Header
      tweetText="様々な日本語文章を、目線移動無くサクサク読めるようにしたツール。"
    />
  </div>

  <div slot="content">
    <Content />
  </div>

  <div slot="footer">
    <Footer />
  </div>
</Frame>

<!-- 各モーダル -->
<Settings mode={$mode} />
<Mode />
