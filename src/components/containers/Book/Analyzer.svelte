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
    pause,
  } from '../../../states/morpheme'
  import { default as Icon } from '../../parts/Icon/Icon.svelte'
  import InsetAlert from '../../parts/InsetAlert/InsetAlert.svelte'
  import ReadingCard from '../!Common/ReadingCard.svelte'
  import Reprint from './Reprint.svelte'
  import Quotes from './Quotes.svelte'

  async function handlePlayButtonClick() {
    stop()
    await tokenize()
    play()
  }
</script>

<style>
  .wrapper {
    display: grid;
    grid-row-gap: 16px;
    grid-template-rows: auto auto 1fr auto;
    height: 100%;
  }

  .button-groups {
    margin: 0 auto;
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 12px;
  }

  i {
    font-size: 20px;
  }
</style>

<div class="wrapper">
  <InsetAlert
    type="alert-success"
    message={$word.trim() || '　'}
    isStrong={$info.isHeading}
    progress={$progress} />

  <div class="button-groups">
    <Icon isBox={true} on:click={stop} isDisabled={!$isPlay}>
      <i class="fas fa-stop" />
    </Icon>

    {#if !$isPlay}
      <!-- 再生 -->
      <Icon isBox={true} on:click={handlePlayButtonClick}>
        <i class="fas fa-play" />
      </Icon>
    {:else if !$isPause}
      <!-- 一時停止 -->
      <Icon isBox={true} on:click={pause}><i class="fas fa-pause" /></Icon>
    {:else}
      <!-- 再開 -->
      <Icon isBox={true} on:click={play}><i class="fas fa-play" /></Icon>
    {/if}
  </div>

  {#if !$isPause}
    <textarea
      disabled={$isPlay}
      bind:value={$rawText}
      class="form-control"
      placeholder="テキストを入力してください" />
  {:else}
    <ReadingCard />
  {/if}

  <Reprint />
  <Quotes />
</div>
