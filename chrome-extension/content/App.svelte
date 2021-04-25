<script>
  import { default as Settings } from "./Settings.svelte";
  import { default as Message } from "./Message.svelte";
  import { default as Controls } from "./Controls.svelte";
  import { default as Footer } from "./Footer.svelte";

  export let removeApp = () => {};
</script>

<div class="background" on:click={removeApp} />

<div class="content">
  <div class="settings-wrapper">
    <Settings />
  </div>

  <div class="message-wrapper">
    <Message />
  </div>

  <div class="controls-wrapper">
    <Controls />
  </div>

  <div class="footer-wrapper">
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

  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }

  .content {
    position: relative;
    width: 80vw;
    max-width: 1280px;
    height: 80vh;
    background-color: lightgoldenrodyellow;
    border-radius: 8px;
    display: grid;
    grid-template-rows: auto auto auto 1fr;
    place-items: center;
    font-size: 16px;
    padding: 8px;
  }

  .footer-wrapper {
    align-self: end;
  }
</style>
