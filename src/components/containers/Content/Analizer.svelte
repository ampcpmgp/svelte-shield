<script>
  import {
    word,
    isPlay,
    isPause,
    tokenize,
    rawText,
    info,
    progress,
    play,
    stop,
  } from '../../../states/morpheme'
  import InsetAlert from '../../parts/InsetAlert/InsetAlert.svelte'

  function handlePlayButtonClick() {
    stop()
    tokenize()
    play()
  }

  function pause() {
    $isPause = true
  }
</script>

<style>
  .wrapper {
    display: grid;
    grid-row-gap: 16px;
    grid-template-rows: auto auto 1fr;
    height: 100%;
  }

  .button-groups {
    margin: 0 auto;
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 12px;
  }

  textarea::placeholder {
    color: #ccc;
  }
</style>

<div class="wrapper">
  <InsetAlert
    type="alert-success"
    message={$word}
    isStrong={$info.isHeading}
    progress={$progress} />

  <div class="button-groups">
    {#if !$isPlay}
      <button
        on:click={handlePlayButtonClick}
        class="btn btn-primary text-secondary"
        type="button">
        再生
      </button>
    {:else}
      <button on:click={stop} class="btn btn-primary text-danger" type="button">
        終了
      </button>

      {#if !$isPause}
        <button
          on:click={pause}
          class="btn btn-primary text-success"
          type="button">
          一時停止
        </button>
      {:else}
        <button
          on:click={play}
          class="btn btn-primary text-secondary"
          type="button">
          再開
        </button>
      {/if}
    {/if}
  </div>

  <textarea
    bind:value={$rawText}
    class="form-control"
    placeholder="テキストを入力してください" />
</div>
