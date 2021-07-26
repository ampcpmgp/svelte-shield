<script>
  import { default as WebStorePng } from "./webstore.png";
  import { playingMode } from "./state";

  let brightness = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "🌙"
    : "🌞";
  const brightnesses = ["🌞", "🌥️", "🌙"];
  const playingModes = ["📝", "🔊"];

  chrome.storage.sync.get("brightness", (result) => {
    // brightnesses[i]
    brightness = result.brightness ?? brightness;

    reflectClass();
  });

  chrome.storage.sync.get("playingMode", (result) => {
    // playingModes[i]
    $playingMode = result.playingMode ?? $playingMode;
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

    console.log(1, $playingMode);
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
</style>
