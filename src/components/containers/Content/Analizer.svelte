<script>
  import { word } from '../../../states/morpheme'
  import InsetAlert from '../../parts/InsetAlert/InsetAlert.svelte'

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
    display: grid;
    grid-row-gap: 16px;
    grid-template-rows: auto auto 1fr;
    height: 100%;
  }

  button {
    margin: 0 auto;
  }

  textarea::placeholder {
    color: #ccc;
  }
</style>

<div class="wrapper">
  <InsetAlert type="alert-success" message={$word} />

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
