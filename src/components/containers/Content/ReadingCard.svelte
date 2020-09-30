<script>
  import { onMount, afterUpdate } from 'svelte'
  import { default as sleep } from '../../../utils/sleep'
  import { compositions, currentIndex } from '../../../states/morpheme'

  let wrapperElm, cardElm

  const elementsToScroll = []

  $: currentItem = $compositions[$currentIndex]

  $: recompoisitions = $compositions.reduce(
    (result, item) => {
      if (item.word === '\n') {
        result.push([])
      } else {
        const currentCompotision = result[result.length - 1]
        currentCompotision.push(item)
      }

      return result
    },
    [[]]
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
  }
</script>

<style>
  .wrapper {
    white-space: pre-wrap;
    overflow-y: auto;
    height: 100%;
    display: grid;
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
</style>

<svelte:window on:resize={adjustHeight} />

<div
  bind:this={wrapperElm}
  class="wrapper card bg-primary shadow-soft border-light">
  <div bind:this={cardElm} class="card-body">
    <ul class="list-unstyled">
      {#each recompoisitions as items}
        <li class="list-item">
          {#each items as item}
            <span
              class="word"
              on:click={() => moveReading(item)}
              bind:this={elementsToScroll[$compositions.indexOf(item)]}
              class:highlight={currentItem === item}
              class:strong={item.info.isHeading}>
              {item.word}
            </span>
          {/each}
        </li>
      {/each}
    </ul>
  </div>
</div>
