<script>
  import { onMount, afterUpdate } from 'svelte'
  import { default as sleep } from '../../../utils/sleep'
  import { msToTime } from '../../../utils/time'
  import {
    compositions,
    currentIndex,
    isPause,
    word,
  } from '../../../states/morpheme'
  import { intervalMsPerChar } from '../../../states/settings'

  export let disabled = false

  let wrapperElm, cardElm

  const elementsToScroll = []

  $: currentItem = $compositions[$currentIndex]
  $: playingTimeMs = $compositions.reduce(
    (ms, item) => ms + item.word.length * $intervalMsPerChar,
    0
  )

  onMount(() => {
    adjustHeight()
  })

  afterUpdate(() => {
    const element = elementsToScroll[$currentIndex]

    if (element) {
      element.scrollIntoView({ block: 'nearest' })
    }
  })

  async function adjustHeight() {
    cardElm.style.height = `0px`
    await sleep(0)
    const height = wrapperElm.offsetHeight
    cardElm.style.height = `${height}px`
    await sleep(0)
  }

  async function moveReading(item) {
    $currentIndex = $compositions.indexOf(item)
    $word = item.word

    void $word
  }
</script>

<style>
  .wrapper {
    height: 100%;
    display: grid;
    position: relative;
  }

  .new-line {
    display: block;
    height: 4px;
  }

  .word {
    cursor: pointer;
  }
  .word.disabled {
    pointer-events: none;
  }

  .highlight {
    background-color: yellow;
  }

  .strong {
    font-weight: bold;
  }

  .inactive {
    pointer-events: none;
  }

  .card-body {
    overflow-y: auto;
  }
  .card-body.disabled {
    opacity: 0.3;
  }

  .playing-time {
    position: absolute;
    bottom: 100%;
    right: 0;
    word-break: break-all;
    /* neumorphism の style を上書き */
    white-space: initial;
    text-align: initial;
    line-height: 1.2;
  }
  @media (prefers-color-scheme: dark) {
    .playing-time {
      color: var(--darkModeAccent);
      box-shadow: inset 3px 3px 4px rgba(155, 155, 155, 0.25),
        inset -3px -3px 7px rgba(5, 5, 5, 0.5) !important;
      border: none;
    }
  }
</style>

<svelte:window on:resize={adjustHeight} />

<div
  bind:this={wrapperElm}
  class="wrapper card bg-primary shadow-soft border-light">
  <div class="playing-time badge badge-md badge-info">
    再生時間：{msToTime(playingTimeMs)}
  </div>

  <div bind:this={cardElm} class="card-body" class:disabled>
    {#each $compositions as item}
      <span
        class="word"
        class:disabled
        on:click={() => moveReading(item)}
        bind:this={elementsToScroll[$compositions.indexOf(item)]}
        class:new-line={/\n/.test(item.word)}
        class:inactive={!$isPause}
        class:highlight={currentItem === item}
        class:strong={item.info.isHeading}>{item.word}</span>
    {/each}
  </div>
</div>
