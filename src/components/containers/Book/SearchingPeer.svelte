<script>
  import InsetAlert from "../../parts/InsetAlert/InsetAlert.svelte";
  import { controller } from "../../../states/book";
</script>

<div class="wrapper">
  <InsetAlert type="alert-info" message="Peer 探索中..." />

  <div class="buttons">
    <button
      class="btn btn-sm btn-primary text-danger"
      on:click={() => $controller.abort()}>探索を終了</button
    >
  </div>
</div>

<style>
  .wrapper {
    display: grid;
    grid-row-gap: 18px;
  }

  .buttons {
    display: grid;
    place-items: center;
  }
</style>
