<script>
  import { isPlay, isPause } from "./state";

  function play() {
    chrome.runtime.sendMessage({ controlType: "resume" });
  }
  function pause() {
    chrome.runtime.sendMessage({ controlType: "pause" });
  }
</script>

<div class="SVELTESHIELD-wrapper">
  {#if !$isPlay || $isPause}
    <button on:click={play}>再生</button>
  {:else}
    <button on:click={pause}>一時停止</button>
  {/if}
</div>

<style>
  .SVELTESHIELD-wrapper {
    display: inline-grid;
    grid-auto-flow: column;
    grid-gap: 8px;
  }
</style>
