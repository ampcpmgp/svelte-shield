<script>
  import {
    item,
    isNotReady,
    isPlay,
    isPause,
    progress,
    currentReadingTime,
    playingTimeMsStr,
  } from "./state";

  let fontSize = 16;
  let meterTopElm;

  $: readingTime =
    !$isPause && $item.word.length > 50 ? $currentReadingTime : 0;
  $: animationDuration = `${$currentReadingTime}ms`;

  $: progressPercent = `${$progress * 100}%`;
  chrome.storage.sync.get("textSize", (result) => {
    fontSize = result.textSize || fontSize;
  });

  chrome.storage.onChanged.addListener(function (changes) {
    if (changes.textSize) {
      fontSize = changes.textSize.newValue || fontSize;
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
      {$item.word}
    {/if}
  </div>

  <div class="SVELTESHIELD-meter" style="--width-percent: {progressPercent}" />

  {#if $playingTimeMsStr}
    <div class="SVELTESHIELD-remaining-time-wrapper">
      <div class="SVELTESHIELD-remaining-time">約{$playingTimeMsStr}</div>
    </div>
  {/if}
</div>

<style>
  .SVELTESHIELD-wrapper {
    display: grid;
  }

  .SVELTESHIELD-message {
    width: 640px;
    max-width: 100%;
    padding: 8px;
    border: solid 1px red;
    display: grid;
    place-items: center;
    font-size: var(--font-size);
  }

  .SVELTESHIELD-meter {
    display: grid;
  }
  .SVELTESHIELD-meter::before {
    content: " ";
    width: var(--width-percent);
    border-bottom: 2px solid hotpink;
    opacity: 0.3;
  }
  .SVELTESHIELD-meter.SVELTESHIELD-top {
    width: 100%;
  }
  .SVELTESHIELD-meter.SVELTESHIELD-top::before {
    content: " ";
    border-bottom: 2px solid aqua;
    opacity: 0.5;
  }
  .SVELTESHIELD-animation::before {
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
</style>
