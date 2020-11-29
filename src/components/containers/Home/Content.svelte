<script>
  import { isLoading, errorMsg } from '../../../states/morpheme'
  import InsetAlert from '../../parts/InsetAlert/InsetAlert.svelte'
  import Analyzer from './Analyzer.svelte'
</script>

<style>
  .wrapper {
    margin: 12px 0;
    height: 100%;
  }
</style>

<div class="wrapper">
  {#if $isLoading}
    <InsetAlert type="alert-info" message="辞書データ読み込み中..." />
  {:else if $errorMsg}
    <InsetAlert type="alert-danger" message={$errorMsg} />
  {:else}
    <Analyzer />
  {/if}
</div>
