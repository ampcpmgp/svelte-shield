<script>
  import { appVisible, objectState, pause } from "./state";

  function toggle() {
    $appVisible = !$appVisible;
  }

  $: {
    if (!$appVisible) {
      objectState.executionState.isStop = false;
      pause();
    }
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
