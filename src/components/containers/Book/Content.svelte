<script>
  import { isFetching, errorMsg as errorMsgBook } from '../../../states/book'
  import {
    isLoading,
    errorMsg as errorMsgMorpheme,
  } from '../../../states/morpheme'
  import InsetAlert from '../../parts/InsetAlert/InsetAlert.svelte'
  import Playable from './Playable.svelte'
</script>

<style>
  .wrapper {
    margin: 12px 0;
    height: 100%;
  }
</style>

<div class="wrapper">
  {#if $isLoading}
    <InsetAlert
      type="alert-info"
      message="辞書データ読み込み中..."
      subMessage="初回読み込み時は約20秒～かかります。" />
  {:else if $errorMsgMorpheme}
    <InsetAlert type="alert-danger" message={$errorMsgMorpheme} />
  {:else if !isFetching}
    <InsetAlert type="alert-info" message="Peer 探索中..." />
  {:else if $errorMsgBook}
    <InsetAlert type="alert-danger" message={errorMsgBook} />
  {:else}
    <Playable />
  {/if}
</div>
