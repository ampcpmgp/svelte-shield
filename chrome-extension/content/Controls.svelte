<script>
  import { isPlay, isPause } from "./state";

  $: playable = !$isPlay || $isPause;

  function play() {
    chrome.runtime.sendMessage({ controlType: "resume" });
  }
  function pause() {
    chrome.runtime.sendMessage({ controlType: "pause" });
  }

  function keyDown(e) {
    switch (e.code) {
      case "KeyP":
        if (playable) {
          play();
        } else {
          pause();
        }
        return;
      default:
        break;
    }
  }
</script>

<svelte:window on:keydown={keyDown} />

<div class="SVELTESHIELD-wrapper">
  {#if playable}
    <button on:click={play}>再生(P)</button>
  {:else}
    <button on:click={pause}>一時停止(P)</button>
  {/if}
</div>

<style>
  .SVELTESHIELD-wrapper {
    display: inline-grid;
    grid-auto-flow: column;
    grid-gap: 8px;
  }
</style>
