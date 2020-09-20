<script>
  export let type = ''
  export let message = ''
  export let isStrong = false
</script>

<style>
  .inset {
    margin: 0 auto;
    width: 100%;
    max-width: 640px;
    text-align: center;
    box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff !important;
  }
</style>

<div class="alert {type} shadow-soft inset">
  {#if isStrong}
    <strong>{message}</strong>
  {:else}{message}{/if}
</div>
