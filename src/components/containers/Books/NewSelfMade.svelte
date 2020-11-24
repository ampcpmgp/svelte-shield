<script>
  import { default as Icon } from '../../parts/Icon/Icon.svelte'
  import { default as Modal } from '../../../const/modal'
  import { title, content, save } from '../../../states/newBook/selfMade'

  $: isSaveable = $title && $content
</script>

<style>
  /* overwrite neumorphism ui */
  .modal-dialog {
    max-width: 800px;
  }

  .modal-body {
    display: grid;
    grid-column-gap: 8px;
  }

  textarea {
    min-height: 240px;
  }

  .add-source {
    display: grid;
    justify-content: start;
    align-items: center;
    justify-items: start;
  }
</style>

<div
  class="modal fade"
  id={Modal.NEW_REGISTER_SELF_MADE_BOOK}
  tabindex="-1"
  role="dialog"
  aria-labelledby={Modal.NEW_REGISTER_SELF_MADE_BOOK}
  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="h6 modal-title mb-0">自作文を登録</h2>
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

        <div class="form-group add-source">
          <label>引用元</label>
          <Icon on:click={console.log}><i class="fas fa-plus" /></Icon>
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
          disabled={!isSaveable}
          type="button"
          class="btn btn-sm btn-primary text-secondary"
          data-dismiss="modal"
          data-mock-save
          on:click={save}>
          保存
        </button>
      </div>
    </div>
  </div>
</div>
