<script>
  import {
    word,
    isPlay,
    isPause,
    rawText,
    info,
    currentReadingTime,
    progress,
    play,
    resume,
    stop,
    pause,
    mode,
  } from "../../../states/morpheme";
  import { LongWordThreshold } from "../../../const/Time";
  import { default as Icon } from "../../parts/Icon/Icon.svelte";
  import InsetAlert from "../../parts/InsetAlert/InsetAlert.svelte";
  import ReadingCard from "../!Common/ReadingCard.svelte";

  let readingCardHeight = 0;
  let state = { isStop: false };

  $: progressTime =
    !$isPause && $word.length > LongWordThreshold ? $currentReadingTime : 0;

  function handlePlay() {
    state = { isStop: false };
    play(localStorage.intervalMsPerChar, localStorage.speechRate, state);
  }
  function handlePause() {
    state.isStop = true;
    pause();
  }
  function handleResume() {
    state = { isStop: false };
    resume(localStorage.intervalMsPerChar, localStorage.speechRate, state);
  }
</script>

<div class="wrapper">
  <InsetAlert
    type="alert-success"
    message={$word.trim()}
    isStrong={$info.isHeading}
    hasNewLine={$info.hasNewLine}
    time={progressTime}
    progress={$progress}
  />

  <div class="button-groups">
    <Icon isBox={true} on:click={stop} isDisabled={!$isPlay}>
      <i class="fas fa-stop" />
    </Icon>

    {#if !$isPlay}
      <!-- 再生 -->
      <Icon isBox={true} on:click={() => handlePlay()}
        ><i
          class="fas"
          class:fa-play={$mode === "normal"}
          class:fa-volume-up={$mode === "speak"}
        /></Icon
      >
    {:else if !$isPause}
      <!-- 一時停止 -->
      <Icon isBox={true} on:click={() => handlePause()}
        ><i
          class="fas"
          class:fa-pause={$mode === "normal"}
          class:fa-volume-mute={$mode === "speak"}
        /></Icon
      >
    {:else}
      <!-- 再開 -->
      <Icon isBox={true} on:click={() => handleResume()}
        ><i
          class="fas"
          class:fa-play={$mode === "normal"}
          class:fa-volume-up={$mode === "speak"}
        /></Icon
      >
    {/if}
  </div>

  {#if !$isPlay}
    <textarea
      rows="6"
      disabled={$isPlay}
      bind:value={$rawText}
      class="form-control"
      placeholder="テキストを入力してください"
    />
  {:else}
    <!-- ReadingCard がこの高さを超えて突き破ってしまうため、 absolute 配置で高さを調整 -->
    <div class="reading-card-wrapper">
      <div class="reading-card-inner" bind:clientHeight={readingCardHeight}>
        <ReadingCard
          disabled={!$isPause && $mode === "normal"}
          height={readingCardHeight}
        />
      </div>
    </div>
  {/if}
</div>

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
</style>
