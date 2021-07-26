<script>
  import sleep from "../../src/utils/sleep";
  import { isPlay, isPause, playingMode, readingSpeed } from "./state";

  let intervalMsPerChar = 80;
  let textSize = 16;
  let intervalMsPerCharSaved = false;
  let readingSpeedSaved = false;
  let textSizeSaved = false;

  chrome.storage.sync.get("intervalMsPerChar", (result) => {
    intervalMsPerChar = result.intervalMsPerChar || intervalMsPerChar;
  });
  chrome.storage.sync.get("readingSpeed", (result) => {
    $readingSpeed = (result.readingSpeed || $readingSpeed) - 0.0;
  });
  chrome.storage.sync.get("textSize", (result) => {
    textSize = result.textSize || textSize;
  });

  async function setIntervalMsPerChar() {
    chrome.storage.sync.set({ intervalMsPerChar });
    intervalMsPerCharSaved = true;
    await sleep(1000);
    intervalMsPerCharSaved = false;
  }

  async function setReadingSpeed() {
    chrome.storage.sync.set({ readingSpeed: $readingSpeed });
    readingSpeedSaved = true;
    await sleep(1000);
    readingSpeedSaved = false;
  }

  async function setTextSize() {
    chrome.storage.sync.set({ textSize });
    textSizeSaved = true;
    await sleep(1000);
    textSizeSaved = false;
  }
</script>

<div class="SVELTESHIELD-wrapper" class:disabled={$isPlay && !$isPause}>
  {#if $playingMode === "📝"}
    <label>
      <span>１文字当たりの表示時間</span>
      <input
        type="number"
        class:SVELTESHIELD-success={intervalMsPerCharSaved}
        step="20"
        bind:value={intervalMsPerChar}
        on:change={setIntervalMsPerChar}
      />
      <span class="SVELTESHIELD-initial-value">初期値 80ms</span>
    </label>
  {:else if $playingMode === "🔊"}
    <label>
      <span>読み上げスピード</span>
      <input
        type="number"
        class:SVELTESHIELD-success={readingSpeedSaved}
        step="0.2"
        bind:value={$readingSpeed}
        on:change={setReadingSpeed}
      />
      <span class="SVELTESHIELD-initial-value">初期値 1.0倍</span>
    </label>
  {/if}

  <label>
    <span>文字の大きさ</span>
    <input
      class:SVELTESHIELD-success={textSizeSaved}
      type="number"
      step="2"
      bind:value={textSize}
      on:change={setTextSize}
    />
    <span class="SVELTESHIELD-initial-value">初期値 16px</span>
  </label>
</div>

<style>
  .SVELTESHIELD-wrapper {
    display: flex;
    flex-wrap: wrap;
    place-content: center;
    column-gap: 20px;
  }
  .SVELTESHIELD-wrapper.disabled {
    pointer-events: none;
    opacity: 0.3;
  }

  .SVELTESHIELD-success {
    border-color: lightgreen;
    background-color: lightgreen;
  }
  :global(#svelte-shield-chrome-extension-app-1234567890abcde.svelte-shield-🌙)
    .SVELTESHIELD-success {
    background-color: #666;
  }

  label {
    display: grid;
    font-size: 14px;
  }

  input {
    color: black !important;
    background-color: white !important;
  }
  :global(#svelte-shield-chrome-extension-app-1234567890abcde.svelte-shield-🌙)
    input {
    background-color: #666 !important;
    color: white !important;
  }

  .SVELTESHIELD-initial-value {
    justify-self: end;
    font-size: 12px;
  }
</style>
