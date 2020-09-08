<script>
  import { word } from '../../../states/morpheme'

  let isPlay = false

  function play() {
    isPlay = true
  }

  function stop() {
    isPlay = false
  }
</script>

<style>
  .wrapper {
    margin: 12px 0;
    display: grid;
    grid-row-gap: 16px;
    grid-template-rows: auto auto 1fr;
  }

  .alert-additional {
    max-width: 640px;
    width: 100%;
    box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff !important;
    margin: 0 auto;
    text-align: center;
  }

  button {
    margin: 0 auto;
  }

  textarea::placeholder {
    color: #ccc;
  }
</style>

<div class="wrapper">
  <div class="alert alert-success shadow-soft alert-additional">{$word}</div>

  {#if !isPlay}
    <button
      on:click={play}
      class="btn btn-primary text-secondary"
      type="button">
      再生
    </button>
  {:else}
    <button on:click={stop} class="btn btn-primary text-danger" type="button">
      停止
    </button>
  {/if}

  <textarea class="form-control" placeholder="テキストを入力してください" />
</div>
