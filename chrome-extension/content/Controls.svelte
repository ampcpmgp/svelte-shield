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
    currentIndex,
    setWordInfo,
    compositions,
    objectState,
    mode,
    playingMode,
    readingSpeed,
  } from "./state";

  $: {
    if ($playingMode === "📝") {
      mode.set("normal");
    } else if ($playingMode === "🔊") {
      mode.set("speak");
    }
  }

  export let exit = () => {};

  onDestroy(() => {
    window.removeEventListener("keydown", keyDown);
  });

  function playIfReady() {
    if ($isNotReady) return;
    stepBackward();
    objectState.executionState = { isStop: false };
    resume($intervalMsPerChar, $readingSpeed, objectState.executionState);
  }
  function resumeIfReady() {
    if ($isNotReady) return;
    objectState.executionState = { isStop: false };
    resume($intervalMsPerChar, $readingSpeed, objectState.executionState);
  }
  function pauseIfReady() {
    if ($isNotReady) return;
    objectState.executionState.isStop = true;
    pause();
  }

  function back() {
    if ($isNotReady || !$isPause) return;
    if ($currentIndex === 0) return;
    --$currentIndex;
    setWordInfo();
  }
  function next() {
    if ($isNotReady || !$isPause) return;
    if ($currentIndex === $compositions.length) return;
    ++$currentIndex;
    setWordInfo();

    void $currentIndex;
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
      case "ArrowLeft":
        back();

        return;
      case "ArrowRight":
        next();

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
    <button disabled={$isNotReady} on:click={playIfReady}
      >再生(Q)<br />
      {$playingMode}
    </button>
  {:else if !$isPause}
    <button disabled={$isNotReady} on:click={pauseIfReady}
      >一時停止(Q)<br />
      {$playingMode}</button
    >
  {:else}
    <button disabled={$isNotReady} class="SVELTESHIELD-arrow" on:click={back}
      >←</button
    >

    <button disabled={$isNotReady} on:click={resumeIfReady}
      >再開(Q)<br />
      {$playingMode}
    </button>

    <button disabled={$isNotReady} class="SVELTESHIELD-arrow" on:click={next}
      >→</button
    >
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
    color: black;
  }
  button:hover {
    opacity: 0.9;
  }
  :global(#svelte-shield-chrome-extension-app-1234567890abcde.svelte-shield-🌙)
    button {
    background-color: #666;
    color: white;
  }

  button:disabled {
    opacity: 0.3;
  }

  .SVELTESHIELD-arrow {
    padding: 3px 4px;
    font-size: 13px;
    border-radius: 4px;
    place-self: center;
    user-select: none;
  }
</style>
