<script>
  import { isLoading, errorMsg } from "../../../states/morpheme";
  import InsetAlert from "../../parts/InsetAlert/InsetAlert.svelte";
  import Playable from "./Playable.svelte";
</script>

<div class="wrapper">
  {#if $isLoading}
    <InsetAlert
      type="alert-info"
      message="辞書データ読み込み中..."
      subMessage="初回読み込み時は約20秒、キャッシュ読み込み時は約10秒かかります。"
    />
  {:else if $errorMsg}
    <InsetAlert type="alert-danger" message={$errorMsg} />
  {:else}
    <Playable />
  {/if}
</div>

<style>
  .wrapper {
    height: 100%;
  }
</style>
