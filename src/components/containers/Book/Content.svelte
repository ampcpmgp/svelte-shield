<script>
  import {
    isSearchingLocal,
    isSearchingPeer,
    errorMsg as errorMsgBook,
  } from "../../../states/book";
  import {
    isLoading,
    errorMsg as errorMsgMorpheme,
  } from "../../../states/morpheme";
  import InsetAlert from "../../parts/InsetAlert/InsetAlert.svelte";
  import SearchingPeer from "./SearchingPeer.svelte";
  import Playable from "./Playable.svelte";
</script>

<div class="wrapper">
  {#if $isLoading}
    <InsetAlert
      type="alert-info"
      message="辞書データ読み込み中..."
      subMessage="初回読み込み時は約20秒、キャッシュ読み込み時は約10秒かかります。"
    />
  {:else if $errorMsgMorpheme}
    <InsetAlert type="alert-danger" message={$errorMsgMorpheme} />
  {:else if $isSearchingLocal}
    <InsetAlert type="alert-info" message="ローカルデータ探索中..." />
  {:else if $isSearchingPeer}
    <SearchingPeer />
  {:else if $errorMsgBook}
    <InsetAlert type="alert-danger" message={$errorMsgBook} />
  {:else}
    <Playable />
  {/if}
</div>

<style>
  .wrapper {
    height: 100%;
  }
</style>
