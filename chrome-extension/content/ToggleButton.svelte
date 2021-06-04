<script>
  import { appVisible } from "./state";

  const rootElm = document.querySelector(
    "#svelte-shield-chrome-extension-app-1234567890abcde",
  );

  function toggle() {
    $appVisible = !$appVisible;
  }

  $: {
    rootElm.classList.toggle("hidden", !$appVisible);
  }

  function keyDown(e) {
    switch (e.code) {
      case "KeyZ":
        toggle();

        return;
      default:
        break;
    }
  }
</script>

<svelte:window on:keydown={keyDown} />
<div class="SVELTESHIELD-toggle-button" on:click={toggle}>切り替える(Z)</div>

<style>
  .SVELTESHIELD-toggle-button {
    position: absolute;
    top: 8px;
    left: 8px;
    border: solid 2px white;
    background-color: transparent;
    font-size: 16px;
    padding: 8px;
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
    white-space: pre;
  }
</style>
