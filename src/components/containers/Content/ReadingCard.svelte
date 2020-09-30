<script>
  import { onMount, afterUpdate } from 'svelte'
  import { default as sleep } from '../../../utils/sleep'
  import {
    compositions,
    currentIndex,
    isPause,
    word,
  } from '../../../states/morpheme'

  let wrapperElm, cardElm

  const elementsToScroll = []

  $: currentItem = $compositions[$currentIndex]

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
  }
</script>

<style>
  .wrapper {
    overflow-y: auto;
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

  .highlight {
    background-color: yellow;
  }

  .strong {
    font-weight: bold;
  }

  .inactive {
    pointer-events: none;
  }
</style>

<svelte:window on:resize={adjustHeight} />

<div
  bind:this={wrapperElm}
  class="wrapper card bg-primary shadow-soft border-light">
  <div bind:this={cardElm} class="card-body">
    {#each $compositions as item}
      <span
        class="word"
        on:click={() => moveReading(item)}
        bind:this={elementsToScroll[$compositions.indexOf(item)]}
        class:new-line={/\n/.test(item.word)}
        class:inactive={!$isPause}
        class:highlight={currentItem === item}
        class:strong={item.info.isHeading}>
        {item.word}
      </span>
    {/each}
  </div>
</div>
