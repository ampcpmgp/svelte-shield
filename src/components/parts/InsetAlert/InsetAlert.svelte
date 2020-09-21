<script>
  export let type = ''
  export let message = ''
  export let isStrong = false
  export let isOneLine = false

  // 空白の場合は全角スペースを入れ 1lh を確保する
  $: displayMessage = message || '　'
</script>

<style>
  .inset {
    margin: 0 auto;
    width: 100%;
    max-width: 640px;
    text-align: center;
    box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff !important;
  }

  .one-line {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>

<div class="alert {type} shadow-soft inset" class:one-line={isOneLine}>
  {#if isStrong}
    <strong>{displayMessage}</strong>
  {:else}{displayMessage}{/if}
</div>
