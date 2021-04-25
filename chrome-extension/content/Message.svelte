<script>
  import { item } from "./state";
</script>

<div class="SVELTESHIELD-wrapper">{$item.word}</div>

<style>
  .SVELTESHIELD-wrapper {
    width: 640px;
    max-width: 100%;
    border: solid 1px red;
    display: grid;
    place-items: center;
  }
</style>
