<script>
  export let isBox = false
  export let isDisabled = false
</script>

<style>
  .wrapper {
    display: grid;
    place-items: center;
    padding: 8px;
    border-radius: 50%;
    background-color: #e6e7ee;
    box-shadow: 3px 3px 4px #b8b9be, -3px -3px 7px #ffffff;
    cursor: pointer;
  }
  .wrapper:hover {
    box-shadow: inset 3px 3px 4px #b8b9be, inset -3px -3px 7px #ffffff;
  }

  .box {
    border-radius: 20%;
  }

  .disabled {
    opacity: 0.3;
    pointer-events: none;
  }
</style>

<div class="wrapper" class:box={isBox} class:disabled={isDisabled} on:click>
  <slot />
</div>
