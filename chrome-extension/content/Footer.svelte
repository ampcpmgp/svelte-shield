<script>
  import { default as WebStorePng } from "./webstore.png";

  let darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  chrome.storage.sync.get("darkMode", (result) => {
    darkMode = result.darkMode ?? darkMode;

    reflectClass();
  });

  function reflectClass() {
    document
      .querySelector("#svelte-shield-chrome-extension-app-1234567890abcde")
      .classList.toggle("dark-mode-svelte-shield", darkMode);
  }

  function toggleDarkMode() {
    darkMode = !darkMode;
    chrome.storage.sync.set({ darkMode });
    reflectClass();
  }
</script>

<div class="SVELTESHIELD-wrapper">
  <div class="SVELTESHIELD-dark-mode-wrapper">
    <div class="SVELTESHIELD-dark-mode" on:click={toggleDarkMode}>
      {darkMode ? "🌙" : "🌞"}
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

  .SVELTESHIELD-dark-mode-wrapper {
    display: flex;
    place-items: center;
  }

  .SVELTESHIELD-dark-mode {
    font-size: 28px;
    padding: 8px;
    cursor: pointer;
  }
</style>
