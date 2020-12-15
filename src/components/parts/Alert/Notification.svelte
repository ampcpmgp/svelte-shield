<script>
  import { fly } from 'svelte/transition'

  export let visible = false
  export let message = ''
  export let strongMsg = ''
  // alert-secondary, alert-success, alert-info, alert-danger
  export let type = ''
</script>

<style>
  .wrapper {
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 90vw;
    max-width: 1120px;
    margin: auto;
  }

  .alert {
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    place-items: center;
  }

  .alert-inner--text {
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 8px;
  }
</style>

{#if visible}
  <div class="wrapper" transition:fly={{ y: -50, duration: 300 }}>
    <div
      class="alert {type} alert-dismissible shadow-soft fade show"
      role="alert">
      <span class="alert-inner--icon"><span class="fas fa-fire" /></span>
      <span
        class="alert-inner--text"><strong>{strongMsg}</strong>{message}</span>
      <button
        type="button"
        class="close text-dark"
        data-dismiss="alert"
        aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
{/if}
