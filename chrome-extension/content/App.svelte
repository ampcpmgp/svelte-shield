<script>
  import { default as Settings } from "./Settings.svelte";
  import { default as Message } from "./Message.svelte";
  import { default as Controls } from "./Controls.svelte";
  import { default as Footer } from "./Footer.svelte";

  export let exit = () => {};
</script>

<div class="SVELTESHIELD-background" on:click={exit} />

<div class="SVELTESHIELD-content">
  <div class="SVELTESHIELD-settings-wrapper">
    <Settings />
  </div>

  <div class="SVELTESHIELD-message-wrapper">
    <Message />
  </div>

  <div class="SVELTESHIELD-controls-wrapper">
    <Controls {exit} />
  </div>

  <div class="SVELTESHIELD-footer-wrapper">
    <Footer />
  </div>
</div>

<style>
  :global(#svelte-shield-chrome-extension-app-1234567890abcde) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999999999999999999999999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: grid;
    place-content: center;
  }

  .SVELTESHIELD-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }

  .SVELTESHIELD-content {
    position: relative;
    width: 80vw;
    max-width: 1280px;
    height: 80vh;
    background-color: lightgoldenrodyellow;
    border-radius: 8px;
    display: grid;
    grid-row-gap: 16px;
    grid-template-rows: auto auto auto 1fr;
    place-items: center;
    font-size: 16px;
    padding: 8px;
  }

  .SVELTESHIELD-content > * {
    width: 100%;
    display: grid;
    place-items: center;
  }

  .SVELTESHIELD-footer-wrapper {
    align-self: end;
  }
</style>
