<script>
  import { saveIntervalMsPerChar } from '../../../utils/settings'
  import { default as Modal } from '../../../const/modal'

  let intervalMsPerChar = localStorage.intervalMsPerChar

  function save() {
    saveIntervalMsPerChar(intervalMsPerChar)
  }
</script>

<style>
  .default {
    display: grid;
    justify-content: right;
  }
</style>

<div
  class="modal fade"
  id={Modal.SETTINGS}
  tabindex="-1"
  role="dialog"
  aria-labelledby={Modal.SETTINGS}
  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="h6 modal-title mb-0">設定</h2>
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
          <label
            for="validationServer01">１文字当たりの表示時間（ミリ秒）</label>
          <input
            type="number"
            class="form-control"
            id="validationServer01"
            bind:value={intervalMsPerChar}
            step="20" />
          <small class="default">初期値 80ms</small>
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
