<script>
  import { item } from "./state";

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
  {$item.word}
</div>

<style>
  .SVELTESHIELD-wrapper {
    width: 640px;
    max-width: 100%;
    border: solid 1px red;
    display: grid;
    place-items: center;
    font-size: var(--font-size);
  }
</style>
