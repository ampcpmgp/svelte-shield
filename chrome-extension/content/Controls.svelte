<script>
  import { onDestroy } from "svelte";
  import {
    isNotReady,
    isPlay,
    isPause,
    stepBackward,
    pause,
    resume,
    intervalMsPerChar,
  } from "./state";

  export let exit = () => {};

  $: playable = !$isPlay || $isPause;

  onDestroy(() => {
    window.removeEventListener("keydown", keyDown);
  });

  function playIfReady() {
    if ($isNotReady) return;
    stepBackward();
    resume($intervalMsPerChar);
  }
  function resumeIfReady() {
    if ($isNotReady) return;
    resume($intervalMsPerChar);
  }
  function pauseIfReady() {
    if ($isNotReady) return;
    pause();
  }

  function keyDown(e) {
    switch (e.code) {
      case "KeyQ":
        if (!$isPlay) {
          playIfReady();
        } else if (!$isPause) {
          pauseIfReady();
        } else {
          resumeIfReady();
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
    <button disabled={$isNotReady} on:click={playIfReady}>再生(Q)</button>
  {:else if !$isPause}
    <button disabled={$isNotReady} on:click={pauseIfReady}>一時停止(Q)</button>
  {:else}
    <button disabled={$isNotReady} on:click={resumeIfReady}>再開(Q)</button>
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
    cursor: pointer;
  }
</style>
