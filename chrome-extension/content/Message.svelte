<script>
  import { afterUpdate } from "svelte";
  import { LongWordThreshold } from "../../src/const/Time";
  import { default as sleep } from "../../src/utils/sleep";
  import {
    word,
    info,
    isNotReady,
    isPlay,
    isPause,
    progress,
    compositions,
    currentReadingTime,
    getPlayingTimeMsStr,
    intervalMsPerChar,
  } from "./state";

  let fontSize = 16;
  let meterTopElm;
  let playingTimeMsStr = "";

  $: readingTime =
    !$isPause && $word.length > LongWordThreshold ? $currentReadingTime : 0;
  $: animationDuration = `${$currentReadingTime}ms`;

  $: progressPercent = `${$progress * 100}%`;

  $: {
    void $compositions;
    playingTimeMsStr = getPlayingTimeMsStr($intervalMsPerChar);
  }

  chrome.storage.sync.get("textSize", (result) => {
    fontSize = result.textSize || fontSize;
  });

  chrome.storage.sync.get("intervalMsPerChar", (result) => {
    if (result.intervalMsPerChar) {
      $intervalMsPerChar = result.intervalMsPerChar - 0;
    }
  });

  chrome.storage.onChanged.addListener(function (changes) {
    if (changes.textSize) {
      fontSize = changes.textSize.newValue || fontSize;
    }

    if (changes.intervalMsPerChar) {
      $intervalMsPerChar = changes.intervalMsPerChar.newValue;
    }
  });

  afterUpdate(async () => {
    if (meterTopElm) {
      meterTopElm.classList.remove("SVELTESHIELD-animation");
      await sleep(0);
      meterTopElm.classList.add("SVELTESHIELD-animation");
    }
  });
</script>

<div class="SVELTESHIELD-wrapper" style="--font-size: {fontSize}px">
  {#if readingTime > 0}
    <div
      bind:this={meterTopElm}
      class="SVELTESHIELD-meter SVELTESHIELD-top SVELTESHIELD-animation"
      style="--animation-duration: {animationDuration}"
    />
  {/if}

  <div class="SVELTESHIELD-message">
    {#if $isNotReady}
      loading...
    {:else if !$isPlay && $progress === 0}
      ready!
    {:else}
      {$word}
    {/if}

    <!-- 現在 background.js の info.selectionText では改行文字が空文字扱いになる。 -->
    {#if $info.hasNewLine}⏎{/if}
  </div>

  <div
    class="SVELTESHIELD-meter SVELTESHIELD-bottom"
    style="--width-percent: {progressPercent}"
  />

  {#if playingTimeMsStr}
    <div class="SVELTESHIELD-remaining-time-wrapper">
      <div class="SVELTESHIELD-remaining-time">約{playingTimeMsStr}</div>
    </div>
  {/if}
</div>

<style>
  .SVELTESHIELD-wrapper {
    display: grid;
    width: 100%;
    max-width: 640px;
  }

  .SVELTESHIELD-message {
    width: 100%;
    padding: 8px;
    border: solid 1px red;
    display: grid;
    place-items: center;
    font-size: var(--font-size);
    line-height: calc(var(--font-size) * 1.5);
    box-sizing: border-box;
  }
  :global(#svelte-shield-chrome-extension-app-1234567890abcde.dark-mode-svelte-shield)
    .SVELTESHIELD-message {
    border-color: rgb(133 255 0 / 39%);
  }

  .SVELTESHIELD-meter {
    display: grid;
  }
  .SVELTESHIELD-meter::before {
    content: " ";
    width: var(--width-percent);
    border-bottom: 2px solid hotpink;
    opacity: 0.4;
    box-sizing: border-box;
  }
  :global(#svelte-shield-chrome-extension-app-1234567890abcde.dark-mode-svelte-shield)
    .SVELTESHIELD-meter::before {
    border-bottom-color: rgb(133 255 0 / 36%);
    border-bottom-width: 3px;
  }
  .SVELTESHIELD-meter.SVELTESHIELD-top {
    width: 100%;
    /* border の太さ分を引く */
    margin-top: -2px;
  }
  .SVELTESHIELD-meter.SVELTESHIELD-top::before {
    content: " ";
    border-bottom: 2px solid black;
    opacity: 0.4;
    box-sizing: border-box;
  }
  :global(#svelte-shield-chrome-extension-app-1234567890abcde.dark-mode-svelte-shield)
    .SVELTESHIELD-meter.SVELTESHIELD-top::before {
    border-bottom-color: white;
  }
  :global(#svelte-shield-chrome-extension-app-1234567890abcde.dark-mode-svelte-shield)
    .SVELTESHIELD-meter.SVELTESHIELD-bottom::before {
    border-bottom-style: solid;
  }

  .SVELTESHIELD-animation::before {
    animation-fill-mode: backwards;
    animation-name: scaleX;
    animation-duration: var(--animation-duration);
    animation-timing-function: linear;
  }
  @keyframes scaleX {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  .SVELTESHIELD-remaining-time-wrapper {
    position: relative;
  }

  .SVELTESHIELD-remaining-time {
    position: absolute;
    top: 2px;
    right: 0;
    font-size: 12px;
    border: solid 1px red;
    border-radius: 10px;
    padding: 0 4px;
  }
  :global(#svelte-shield-chrome-extension-app-1234567890abcde.dark-mode-svelte-shield)
    .SVELTESHIELD-remaining-time {
    border-color: rgb(133 255 0 / 39%);
  }
</style>
