<script>
  import {
    intervalMsPerChar,
    textSize,
    speechRate,
    saveIntervalMsPerChar,
    saveTextSize,
    saveSpeechRate,
  } from "../../../states/settings";
  import { default as Modal } from "../../../const/modal";

  /**
   * "normal" | "speak"
   */
  export let mode = "normal";

  const formData = {
    intervalMsPerChar: $intervalMsPerChar,
    textSize: $textSize,
    speechRate: $speechRate,
  };

  function save() {
    saveIntervalMsPerChar(formData.intervalMsPerChar);
    saveTextSize(formData.textSize);
    saveSpeechRate(formData.speechRate);
  }

  function cancel() {
    formData.intervalMsPerChar = $intervalMsPerChar;
    formData.textSize = $textSize;
    formData.speechRate = $speechRate;
  }
</script>

<div
  class="modal fade"
  id={Modal.SETTINGS}
  tabindex="-1"
  role="dialog"
  aria-labelledby={Modal.SETTINGS}
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="h6 modal-title mb-0">設定</h2>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        {#if mode === "normal"}
          <div class="form-group">
            <label for="validationServer01"
              >１文字当たりの表示時間（ミリ秒）</label
            >
            <input
              type="number"
              class="form-control"
              id="validationServer01"
              bind:value={formData.intervalMsPerChar}
              step="20"
            />
            <small class="default">初期値 80ms</small>
          </div>
        {:else if mode === "speak"}
          <div class="form-group">
            <label for="validationServer01">読み上げスピード（～倍）</label>
            <input
              type="number"
              class="form-control"
              id="validationServer01"
              bind:value={formData.speechRate}
              step="0.2"
            />
            <small class="default">初期値 1.0</small>
          </div>
        {/if}

        <div class="form-group">
          <label for="validationServer01">文字の大きさ（ピクセル）</label>
          <input
            type="number"
            class="form-control"
            id="validationServer01"
            bind:value={formData.textSize}
            step="2"
          />
          <small class="default">初期値 16px</small>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-sm btn-primary"
          data-dismiss="modal"
          on:click={cancel}
        >
          キャンセル
        </button>
        <button
          type="button"
          class="btn btn-sm btn-primary text-secondary"
          data-dismiss="modal"
          on:click={save}
        >
          保存
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .default {
    display: grid;
    justify-content: right;
  }
</style>
