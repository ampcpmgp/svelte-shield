<script>
  import { onMount } from 'svelte'
  import { default as sleep } from '../../../utils/sleep'
  import { compositions, currentIndex } from '../../../states/morpheme'

  let wrapperElm, cardElm

  $: currentItem = $compositions[$currentIndex - 1]

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

  async function adjustHeight() {
    cardElm.style.height = `0px`
    await sleep(0)
    const height = wrapperElm.offsetHeight
    cardElm.style.height = `${height}px`
    await sleep(0)
  }
</script>

<style>
  .wrapper {
    white-space: pre-wrap;
    overflow-y: auto;
    height: 100%;
    display: grid;
  }

  .highlight {
    background-color: yellow;
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
            <span class:highlight={currentItem === item}>{item.word}</span>
          {/each}
        </li>
      {/each}
    </ul>
  </div>
</div>
