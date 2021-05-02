<script>
  import { onDestroy } from "svelte";
  import { isNotReady, isPlay, isPause } from "./state";

  export let exit = () => {};

  $: playable = !$isPlay || $isPause;

  onDestroy(() => {
    window.removeEventListener("keydown", keyDown);
  });

  function play() {
    if ($isNotReady) return;
    chrome.runtime.sendMessage({ controlType: "play" });
  }
  function resume() {
    if ($isNotReady) return;
    chrome.runtime.sendMessage({ controlType: "resume" });
  }
  function pause() {
    if ($isNotReady) return;
    chrome.runtime.sendMessage({ controlType: "pause" });
  }

  function keyDown(e) {
    switch (e.code) {
      case "KeyQ":
        if (!$isPlay) {
          play();
        } else if (!$isPause) {
          pause();
        } else {
          resume();
        }
        return;
      case "Escape":
        exit();
        return;
      default:
        break;
    }
  }
</script>

<svelte:window on:keydown={keyDown} />

<div class="SVELTESHIELD-wrapper">
  {#if !$isPlay}
    <button disabled={$isNotReady} on:click={play}>再生(Q)</button>
  {:else if !$isPause}
    <button disabled={$isNotReady} on:click={pause}>一時停止(Q)</button>
  {:else}
    <button disabled={$isNotReady} on:click={resume}>再開(Q)</button>
  {/if}
</div>

<style>
  .SVELTESHIELD-wrapper {
    display: inline-grid;
    grid-auto-flow: column;
    grid-gap: 8px;
  }

  button {
    background-color: white;
    border: solid 1px black;
    padding: 4px 8px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
</style>
