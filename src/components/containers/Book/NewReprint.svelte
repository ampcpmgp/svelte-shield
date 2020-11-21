<script>
  import { default as Select } from 'svelte-select'
  import { default as Modal } from '../../../const/modal'
  import { title, url, license, content } from '../../../states/new-book'

  function save() {}
</script>

<style>
  /* overwrite neumorphism ui */
  .modal-dialog {
    max-width: 800px;
  }

  textarea {
    min-height: 400px;
  }

  .themed {
    --border: 3px solid blue;
    --borderRadius: 10px;
    --placeholderColor: blue;
  }
</style>

<div
  class="modal fade"
  id={Modal.NEW_REGISTER_REPRINT_BOOK}
  tabindex="-1"
  role="dialog"
  aria-labelledby={Modal.NEW_REGISTER_REPRINT_BOOK}
  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="h6 modal-title mb-0" id="modal-title-default">新規登録</h2>
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
          <label for="title">タイトル</label>
          <input
            type="text"
            class="form-control"
            id="title"
            bind:value={$title} />
        </div>

        <div class="form-group">
          <label for="url">URL</label>
          <input type="text" class="form-control" id="url" bind:value={$url} />
        </div>

        <div class="form-group themed">
          <label for="license">ライセンス</label>
          <Select id="license" bind:value={$license} />
        </div>

        <div class="form-group">
          <label for="content">本文</label>
          <textarea
            id="content"
            bind:value={$content}
            class="form-control"
            placeholder="テキストを入力してください" />
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
