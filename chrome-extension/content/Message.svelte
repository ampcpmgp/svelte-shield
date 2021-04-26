<script>
  import { item, isNotReady } from "./state";

  let fontSize = 16;

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
  {#if $isNotReady}
    loading...
  {:else}
    {$item.word}
  {/if}
</div>

<style>
  .SVELTESHIELD-wrapper {
    width: 640px;
    max-width: 100%;
    padding: 8px;
    border: solid 1px red;
    display: grid;
    place-items: center;
    font-size: var(--font-size);
  }
</style>
