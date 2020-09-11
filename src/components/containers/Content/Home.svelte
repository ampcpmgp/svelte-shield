<script>
  import { isLoading, errorMsg } from '../../../states/morpheme'
  import InsetAlert from '../../parts/InsetAlert/InsetAlert.svelte'
  import Settings from '../Modals/Settings.svelte'
  import Analizer from './Analizer.svelte'
</script>

<style>
  .wrapper {
    margin: 12px 0;
  }
</style>

<div class="wrapper">
  {#if $isLoading}
    <div>
      <InsetAlert type="alert-info" message="辞書データ読み込み中..." />
    </div>
  {:else if $errorMsg}
    <div>
      <InsetAlert type="alert-danger" message={$errorMsg} />
    </div>
  {:else}
    <Analizer />
  {/if}
</div>

<Settings />
