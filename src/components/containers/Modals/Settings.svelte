<script>
  import { saveIntervalMs } from '../../../utils/settings'

  let intervalMs = localStorage.intervalMs

  function save() {
    saveIntervalMs(intervalMs)
  }
</script>

<div
  class="modal fade"
  id="modal-default"
  tabindex="-1"
  role="dialog"
  aria-labelledby="modal-default"
  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="h6 modal-title mb-0" id="modal-title-default">設定</h2>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="validationServer01">表示秒数 - Default 300ms</label>
          <input
            type="number"
            class="form-control"
            id="validationServer01"
            bind:value={intervalMs}
            step="100" />
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-sm btn-primary"
          data-dismiss="modal">
          キャンセル
        </button>
        <button
          type="button"
          class="btn btn-sm btn-primary text-secondary"
          data-dismiss="modal"
          on:click={save}>
          保存
        </button>
      </div>
    </div>
  </div>
</div>
