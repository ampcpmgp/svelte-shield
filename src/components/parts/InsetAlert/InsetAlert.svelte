<script>
  export let type = ''
  export let message = ''
  export let isStrong = false
  export let isOneLine = false
  export let progress = 0.0

  // 空白の場合は全角スペースを入れ 1lh を確保する
  $: progressPercent = `${progress * 100}%`
</script>

<style>
  .wrapper {
    margin: 0 auto;
    width: 100%;
    max-width: 640px;
  }

  .inset {
    text-align: center;
  }

  .one-line {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .meter {
    margin: -1rem auto 0 auto;
    padding: 0 8px;
    display: grid;
  }

  .meter::before {
    content: ' ';
    height: 1px;
    background: lime;
    width: var(--width-percent);
    box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
  }
  @media (prefers-color-scheme: light) {
    .inset {
      box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff !important;
    }
  }
  @media (prefers-color-scheme: dark) {
    .inset {
      box-shadow: inset 3px 3px 4px rgba(155, 155, 155, 0.25),
        inset -3px -3px 7px rgba(5, 5, 5, 0.5) !important;
    }
  }
</style>

<div class="wrapper">
  <div class="alert {type} shadow-soft inset" class:one-line={isOneLine}>
    {#if isStrong}<strong>{message}</strong>{:else}{message}{/if}
  </div>

  <div class="meter" style="--width-percent: {progressPercent}" />
</div>
