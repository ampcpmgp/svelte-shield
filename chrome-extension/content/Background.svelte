<script>
  export let exit = () => {};
</script>

<div class="SVELTESHIELD-background" on:click={exit}>
  <div class="SVELTESHIELD-button" on:click={exit}>閉じる(Esc)</div>
</div>

<style>
  .SVELTESHIELD-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }

  .SVELTESHIELD-button {
    position: absolute;
    top: 8px;
    right: 8px;
    border: solid 1px white;
    background-color: transparent;
    font-size: 16px;
    padding: 8px;
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }
</style>
