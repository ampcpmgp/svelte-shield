<script>
  export let type = ''
  export let message = ''
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

<!-- 色で分ける -->

<div class="alert {type} shadow-soft inset">
  {#if message.match(/(咀嚼|蠕動|分節|そしゃく|ぜんどう|運動)/)}
    <strong style="color: black">{message}</strong>
  {:else}{message}{/if}
</div>

<!-- alert の種類で分ける -->
<!--
{#if message.match(/(咀嚼|蠕動|分節|そしゃく|ぜんどう|運動)/)}
  <div class="alert alert-danger shadow-soft inset">
    <strong>
      {message}
    </strong>
  </div>
{:else}
  <div class="alert {type} shadow-soft inset">
    {message}
  </div>
{/if} -->
