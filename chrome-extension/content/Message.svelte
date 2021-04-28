<script>
  import { item, isNotReady, isPlay, progress } from "./state";

  let fontSize = 16;

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
    height: 0px;
  }
</style>
