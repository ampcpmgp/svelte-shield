<script>
  import {
    word,
    isPlay,
    isPause,
    info,
    currentIndex,
    tokenize,
    progress,
    resume,
    stepBackward,
    pause,
    setReadingPosition,
  } from '../../../states/morpheme'
  import { hash, bookType } from '../../../states/book'
  import * as dexie from '../../../databases/dexie'
  import { default as BookType } from '../../../const/BookType'
  import { default as Icon } from '../../parts/Icon/Icon.svelte'
  import InsetAlert from '../../parts/InsetAlert/InsetAlert.svelte'
  import ReadingCard from '../!Common/ReadingCard.svelte'
  import Reprint from './Reprint.svelte'
  import Quotes from './Quotes.svelte'
  import { onMount } from 'svelte'

  let readingCardHeight = 0

  onMount(async () => {
    await tokenize()
    const data = await dexie.getBook($hash)

    setReadingPosition(data.readingRatio)
    ready()
  })

  function ready() {
    $isPlay = true
    $isPause = true
  }

  function handleStepBackward() {
    stepBackward()
    ready()
  }

  async function handleResume() {
    await resume()
    await dexie.updateBook($hash, {
      readingRatio: $progress,
    })
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

  i {
    font-size: 20px;
  }

  .reading-card-wrapper {
    position: relative;
    min-height: 40vh;
  }
  .reading-card-inner {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .additional-info {
    position: relative;
  }

  .additional-info-outer {
    position: absolute;
    top: 0;
    left: 0;
    padding-bottom: 40px;
  }
  .additional-info-inner {
    display: grid;
    padding: 30px 0;
    /* ios safari ではこれを入れないと左右上下に border が入る */
    border-width: 0;
    border-bottom: 1px solid;
    border-image-slice: 1;
    /* from meter color to twitter color */
    border-image-source: linear-gradient(
      to right,
      lime 0%,
      rgb(29, 161, 242) 100%
    );
  }
</style>

<div class="wrapper">
  <InsetAlert
    type="alert-success"
    message={$word.trim()}
    isStrong={$info.isHeading}
    hasNewLine={$info.hasNewLine}
    progress={$progress} />

  <div class="button-groups">
    <Icon
      isBox={true}
      on:click={handleStepBackward}
      isDisabled={$currentIndex === 0}>
      <i class="fas fa-step-backward" />
    </Icon>

    {#if $isPause}
      <!-- 再開 -->
      <Icon isBox={true} on:click={handleResume}>
        <i class="fas fa-play" />
      </Icon>
    {:else}
      <!-- 一時停止 -->
      <Icon isBox={true} on:click={pause} isDisabled={!$isPlay}>
        <i class="fas fa-pause" />
      </Icon>
    {/if}
  </div>

  <!-- ReadingCard がこの高さを超えて突き破ってしまうため、 absolute 配置で高さを調整 -->
  <div class="reading-card-wrapper">
    <div class="reading-card-inner" bind:clientHeight={readingCardHeight}>
      <ReadingCard disabled={$isPlay && !$isPause} height={readingCardHeight} />
    </div>
  </div>
</div>

<div class="additional-info">
  <div class="additional-info-outer">
    <div class="additional-info-inner">
      <div class="card bg-primary shadow-soft border-light">
        <div class="card-body">
          {#if $bookType === BookType.SELF_MADE}
            <Quotes />
          {/if}

          {#if $bookType === BookType.REPRINT}
            <Reprint />
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
