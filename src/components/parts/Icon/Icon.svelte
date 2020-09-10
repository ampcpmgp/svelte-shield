<script>
  export let isBox = false
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
</style>

<div class="wrapper" class:box={isBox}>
  <slot />
</div>
