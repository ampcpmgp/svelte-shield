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
  @media(prefers-color-scheme:dark){
    .wrapper {
      background-color: var(--darkMode);
      box-shadow: 3px 3px 4px rgba(0,0,0,0.3), -3px -3px 7px rgba(245,245,245,0.1);
    }
    .wrapper:hover {
      box-shadow: inset 3px 3px 4px rgba(5,5,5,0.51), inset -1px -1px 2px rgba(255,255,255,0.1);
    }
  }
</style>

<div class="wrapper" class:box={isBox} class:disabled={isDisabled} on:click>
  <slot />
</div>
