<script>
  import { afterUpdate } from 'svelte'
  import { msToTime } from '../../../utils/time'
  import { getOffsetTop } from '../../../utils/element'
  import {
    compositions,
    currentIndex,
    isPause,
    word,
  } from '../../../states/morpheme'
  import { intervalMsPerChar } from '../../../states/settings'

  export let disabled = false
  export let height = 0

  const elementsToScroll = []
  let elmCardBody

  $: currentItem = $compositions[$currentIndex]
  $: playingTimeMs = $compositions.reduce(
    (ms, item) => ms + item.word.length * $intervalMsPerChar,
    0
  )

  // 読み込み中カードの位置がウインドウの高さを超えているときは自動スクロール可能とする
  // ウインドウの高さを超えて自動スクロールをすると、表示がガクガク揺れてしまう。
  function isScollable() {
    if (!elmCardBody) return false

    const elementBottom = getOffsetTop(elmCardBody) + elmCardBody.offsetHeight

    return elementBottom < window.innerHeight
  }

  afterUpdate(() => {
    const element = elementsToScroll[$currentIndex]

    if (element && isScollable()) {
      element.scrollIntoView({ block: 'nearest' })
    }
  })

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
    opacity: 0.2;
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
    display: inline-grid;
    grid-auto-flow: column;
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

<div class="wrapper card bg-primary shadow-soft border-light">
  <div class="playing-time badge badge-md badge-info">
    <div>約{msToTime(playingTimeMs)}</div>
  </div>

  <div
    bind:this={elmCardBody}
    class="card-body"
    style="height: {height}px"
    class:disabled>
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
