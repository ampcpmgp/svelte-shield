<script>
  import sleep from "../../src/utils/sleep";
  import { isPlay, isPause } from "./state";

  let intervalMsPerChar = 80;
  let textSize = 16;
  let intervalMsPerCharSaved = false;
  let textSizeSaved = false;

  chrome.storage.sync.get("intervalMsPerChar", (result) => {
    intervalMsPerChar = result.intervalMsPerChar || intervalMsPerChar;
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

  async function setTextSize() {
    chrome.storage.sync.set({ textSize });
    textSizeSaved = true;
    await sleep(1000);
    textSizeSaved = false;
  }
</script>

<div class="SVELTESHIELD-wrapper" class:disabled={$isPlay && !$isPause}>
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
    display: inline-grid;
    grid-auto-flow: column;
    grid-column-gap: 20px;
    margin: auto;
  }
  .SVELTESHIELD-wrapper.disabled {
    pointer-events: none;
    opacity: 0.3;
  }

  .SVELTESHIELD-success {
    border-color: lightgreen;
    background-color: lightgreen;
  }

  label {
    display: grid;
    font-size: 14px;
  }

  input {
    background-color: white;
  }

  .SVELTESHIELD-initial-value {
    justify-self: end;
    font-size: 12px;
  }
</style>
