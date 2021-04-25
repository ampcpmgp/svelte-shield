<script>
  import { test } from "./state";

  export let removeApp = () => {};
</script>

<div class="background" on:click={removeApp} />

<div class="content">{$test}</div>

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

  .content {
    position: relative;
    width: 80vw;
    max-width: 1280px;
    height: 80vh;
    background-color: lightyellow;
  }

  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
</style>
