<script>
  import { push } from 'svelte-spa-router'
  import { default as Icon } from '../../parts/Icon/Icon.svelte'
  import { default as Modal } from '../../../const/modal'
  import {
    title,
    content,
    sources,
    save,
    removeSource,
    addSource,
  } from '../../../states/newBook/selfMade'

  $: isSaveable = $title && $content && $sources.every(item => item.value)

  async function handleSave() {
    try {
      const results = await save()

      push(`/books/${results.path}`)
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }
</script>

<style>
  /* overwrite neumorphism ui */
  .modal-dialog {
    max-width: 800px;
  }

  .modal-content {
    min-height: 90vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }

  .modal-body {
    display: grid;
    grid-column-gap: 8px;
    grid-template-rows: auto auto 1fr;

    /* overwrite */
    flex: initial;
  }

  textarea {
    min-height: 240px;
    height: 100%;
  }

  .add-source {
    display: grid;
    justify-content: start;
    align-items: center;
    justify-items: start;
  }

  .sources {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    grid-column-gap: 8px;
  }

  .sources label {
    /* overwrite neumorphism ui */
    margin-bottom: 0;
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

          {#each $sources as source, i}
            <div class="form-group sources">
              <label for={`sourceId-${i}`}>{i}.</label>
              <input
                type="text"
                class="form-control"
                id={`sourceId-${i}`}
                bind:value={source.value} />
              <Icon on:click={() => removeSource(i)}>
                <i class="fas fa-minus" />
              </Icon>
            </div>
          {/each}
          <Icon on:click={addSource}><i class="fas fa-plus" /></Icon>
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
          data-mock="save-new-self-made"
          on:click={handleSave}>
          保存
        </button>
      </div>
    </div>
  </div>
</div>
