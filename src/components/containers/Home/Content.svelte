<script>
  import { isLoading, errorMsg } from '../../../states/morpheme'
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
      message="辞書データ読み込み中...。初回起動時は、約20秒かかります。" />
  {:else if $errorMsg}
    <InsetAlert type="alert-danger" message={$errorMsg} />
  {:else}
    <Playable />
  {/if}
</div>
