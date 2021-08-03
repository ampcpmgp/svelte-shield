<script>
  import { default as WebStorePng } from "./webstore.png";
  import { playingMode, hiddenSettings, objectState } from "./state";

  let brightness = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "🌙"
    : "🌞";
  const brightnesses = ["🌞", "🌥️", "🌙"];
  const playingModes = ["📝", "🔊"];
  let judgeNum = 0;

  chrome.storage.sync.get("brightness", (result) => {
    // brightnesses[i]
    brightness = result.brightness ?? brightness;

    reflectClass();
  });

  chrome.storage.sync.get("playingMode", (result) => {
    // playingModes[i]
    $playingMode = result.playingMode ?? $playingMode;
  });

  chrome.storage.sync.get("judgeNum", (result) => {
    judgeNum = result.judgeNum ?? $hiddenSettings.judgeNum;
  });

  function reflectClass() {
    const $lement = document.querySelector(
      "#svelte-shield-chrome-extension-app-1234567890abcde",
    );
    $lement.classList.toggle(`svelte-shield-🌙`, brightness === "🌙");
    $lement.classList.toggle(`svelte-shield-🌥️`, brightness === "🌥️");
  }

  function changeBrightMode() {
    const currentIndex = brightnesses.indexOf(brightness);
    const nextIndex = (currentIndex + 1) % brightnesses.length;
    brightness = brightnesses[nextIndex];
    chrome.storage.sync.set({ brightness });
    reflectClass();
  }

  function changePlayingMode() {
    const currentIndex = playingModes.indexOf($playingMode);
    const nextIndex = (currentIndex + 1) % playingModes.length;
    $playingMode = playingModes[nextIndex];
    chrome.storage.sync.set({ playingMode: $playingMode });
  }

  function updateJudgeNum() {
    objectState.executionState = { isStop: false };
    chrome.storage.sync.set({ judgeNum });
  }
</script>

<div class="SVELTESHIELD-wrapper">
  <div class="SVELTESHIELD-mode-wrapper">
    <div class="SVELTESHIELD-mode" on:click={changeBrightMode}>
      {brightness}
    </div>

    <div class="SVELTESHIELD-mode" on:click={changePlayingMode}>
      {$playingMode}
    </div>

    <label class="SVELTESHIELD-judgeNum">
      <span style="font-weight: bold;">高度な設定</span>
      <span>連結可能文字数</span>
      <input type="number" bind:value={judgeNum} />
      <span style="font-size: 0.6em;">初期値 4</span>
      <button on:click={updateJudgeNum}>再実行</button>
    </label>
  </div>

  <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://chrome.google.com/webstore/detail/svelte-shield-%E6%8B%A1%E5%BC%B5%E6%A9%9F%E8%83%BD/ogdlcilfgiojgaoglhhilbhnghchnceo"
  >
    <img src={WebStorePng} alt="Chrome Web Store" />
  </a>
</div>

<style>
  .SVELTESHIELD-wrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .SVELTESHIELD-mode-wrapper {
    display: flex;
    place-items: center;
  }

  .SVELTESHIELD-mode {
    font-size: 28px;
    padding: 8px;
    cursor: pointer;
  }

  .SVELTESHIELD-judgeNum {
    margin-left: 20px;
    display: grid;
    place-items: center;
    border: solid 1px #333;
    gap: 2px;
    padding: 0px 4px;
  }

  :global(#svelte-shield-chrome-extension-app-1234567890abcde.svelte-shield-🌙)
    .SVELTESHIELD-judgeNum {
    border-color: rgb(230, 231, 238);
  }

  .SVELTESHIELD-judgeNum span {
    font-size: 0.8em;
  }

  .SVELTESHIELD-judgeNum input[type="number"] {
    width: 60px;
  }

  button {
    background-color: white;
    border: solid 1px black;
    cursor: pointer;
    color: black;
    padding: 2px;
    font-size: 0.8em;
  }
  button:hover {
    opacity: 0.9;
  }

  :global(#svelte-shield-chrome-extension-app-1234567890abcde.svelte-shield-🌙)
    button {
    background-color: #666;
    color: white;
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

</style>
