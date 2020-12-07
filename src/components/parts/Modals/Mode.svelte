<script>
  import { default as Modal } from '../../../const/modal'
</script>

<style>
  .default {
    display: grid;
    justify-content: right;
  }
</style>

<div
  class="modal fade"
  id={Modal.MODE_CHANGE}
  tabindex="-1"
  role="dialog"
  aria-labelledby={Modal.MODE_CHANGE}
  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="h6 modal-title mb-0">モード切替</h2>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <div>通常モード</div>
        <div>IPFS本モード</div>
      </div>
    </div>
  </div>
</div>
