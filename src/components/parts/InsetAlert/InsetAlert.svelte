<script>
  import { beforeUpdate, afterUpdate } from 'svelte'

  import { textSize } from '../../../states/settings'

  // alert-secondary, alert-success, alert-info, alert-danger
  // https://themesberg.com/docs/neumorphism-ui/components/alerts/
  export let type = ''
  export let message = ''
  export let isStrong = false
  export let hasNewLine = false
  export let isOneLine = false
  export let progress = 0.0
  export let subMessage = ''
  export let time = 0

  $: displayMessage = message || '　'
  $: progressPercent = `${progress * 100}%`
  $: animationDuration = `${time}ms`

  let meterTopElm

  // animation 再描画
  beforeUpdate(() => {
    if (meterTopElm) {
      meterTopElm.classList.remove('animation')
    }
  })

  afterUpdate(() => {
    if (meterTopElm) {
      meterTopElm.classList.add('animation')
    }
  })
</script>

<style>
  .wrapper {
    margin: 0 auto;
    width: 100%;
    max-width: 640px;
    position: relative;
  }

  .alert {
    font-size: var(--text-size);
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    place-items: end;
    grid-column-gap: 8px;
  }

  .new-line {
    width: var(--text-size);
    height: auto;
  }

  .inset {
    text-align: center;
  }

  .one-line {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .meter {
    margin: -1rem auto 0 auto;
    padding: 0 8px;
    display: grid;
  }
  .meter::before {
    content: ' ';
    height: 1px;
    background-color: lime;
    width: var(--width-percent);
    box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
  }
  .meter.top::before {
    width: 0;
    background-color: #555;
  }
  .meter.top.animation::before {
    animation-name: scaleX;
    animation-duration: var(--animation-duration);
    animation-timing-function: linear;
  }

  @keyframes scaleX {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @media (prefers-color-scheme: light) {
    .inset {
      box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff !important;
    }
  }
  @media (prefers-color-scheme: dark) {
    .inset {
      box-shadow: inset 3px 3px 4px rgba(155, 155, 155, 0.25),
        inset -3px -3px 7px rgba(5, 5, 5, 0.5) !important;
    }
  }

  .sub-message {
    position: absolute;
    top: 100%;
    right: 0;
    max-width: 80%;
    word-break: break-all;
    /* neumorphism の style を上書き */
    white-space: initial;
    text-align: initial;
    line-height: 1.2;
  }
  @media (prefers-color-scheme: dark) {
    .sub-message {
      color: var(--darkModeAccent);
      box-shadow: inset 3px 3px 4px rgba(155, 155, 155, 0.25),
        inset -3px -3px 7px rgba(5, 5, 5, 0.5) !important;
      border: none;
    }
  }
</style>

<div class="wrapper" style="--text-size: {$textSize}px">
  {#if time > 0}
    <div
      bind:this={meterTopElm}
      class="meter top animation"
      style="--animation-duration: {animationDuration}" />
  {/if}

  <div class="alert {type} shadow-soft inset" class:one-line={isOneLine}>
    {#if isStrong}<strong>{displayMessage}</strong>{:else}{displayMessage}{/if}

    {#if hasNewLine}⏎{/if}
  </div>

  <div class="meter" style="--width-percent: {progressPercent}" />

  {#if subMessage}
    <div class="sub-message badge badge-md badge-secondary">{subMessage}</div>
  {/if}
</div>
