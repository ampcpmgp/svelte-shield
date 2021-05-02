<script>
  import { afterUpdate } from "svelte";
  import {
    compositions,
    currentIndex,
    isPause,
    setWordInfo,
  } from "../../src/states/morpheme";

  export let disabled = false;

  const elementsToScroll = [];

  $: currentItem = $compositions[$currentIndex];

  afterUpdate(() => {
    const element = elementsToScroll[$currentIndex];

    if (element) {
      element.scrollIntoView({ block: "nearest" });
    }
  });

  async function moveReading(item) {
    $currentIndex = $compositions.indexOf(item);
    setWordInfo();
  }
</script>

<div class="wrapper card bg-primary shadow-soft border-light">
  <div class:SVELTESHIELD-disabled={disabled}>
    {#each $compositions as item}
      <span
        class="word"
        on:click={() => moveReading(item)}
        bind:this={elementsToScroll[$compositions.indexOf(item)]}
        class:new-line={/\n/.test(item.word)}
        class:inactive={!$isPause}
        class:highlight={currentItem === item}
        class:strong={false}
      >
        {item.word}</span
      >{#if item.info.hasNewLine}<br />{/if}
    {/each}
  </div>
</div>

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
    margin: 0 2px;
  }
  .SVELTESHIELD-disabled {
    opacity: 0.3;
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
</style>
