<script>
  import { default as Select } from 'svelte-select'
  import { push } from 'svelte-spa-router'
  import { default as Modal } from '../../../const/modal'
  import { LicenseListData, DomainInfo } from '../../../const/licenses'
  import {
    title,
    url,
    license,
    content,
    save,
  } from '../../../states/newBook/reprint'

  const listItems = LicenseListData.licenses.map(item => ({
    value: item.licenseId,
    label: item.licenseId,
  }))

  $: isSaveable = $title && $url && $license && $content

  async function handleSave() {
    try {
      const results = await save()

      push(`/books/${results.path}`)
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  function handleUrlChange() {
    const { hostname } = new URL($url)
    const domainInfo = DomainInfo[hostname]

    if (domainInfo && !$license) {
      $license = domainInfo.default
    }
  }
</script>

<style>
  /* overwrite neumorphism ui */
  .modal-dialog {
    margin: 12px;
    max-width: 1200px;
  }

  .modal-content {
    min-height: 90vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }

  .modal-body {
    display: grid;
    grid-template-areas:
      'title title'
      'url license'
      'content content';
    grid-column-gap: 8px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto 1fr;

    /* overwrite */
    flex: initial;
  }

  textarea {
    min-height: 240px;
    height: 100%;
  }

  .title-wrapper {
    grid-area: title;
  }
  .url-wrapper {
    grid-area: url;
  }
  .license-wrapper {
    grid-area: license;
  }
  .content-wrapper {
    grid-area: content;
  }

  .themed {
    --background: --primary;
    --clearSelectTop: 6px;
  }

  @media (prefers-color-scheme: dark) {
    .themed {
      --background: --darkMode;
    }
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
        <h2 class="h6 modal-title mb-0">転載して登録</h2>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div class="modal-body">
        <div class="form-group title-wrapper">
          <label for="title">タイトル</label>
          <input
            type="text"
            class="form-control"
            id="title"
            bind:value={$title} />
        </div>

        <div class="form-group url-wrapper">
          <label for="url">URL</label>
          <input
            type="text"
            class="form-control"
            id="url"
            bind:value={$url}
            on:change={handleUrlChange} />
        </div>

        <div class="form-group themed license-wrapper">
          <label for="license">ライセンス</label>
          <Select
            id="license"
            placeholder="テキスト入力で絞り込めます"
            bind:selectedValue={$license}
            items={listItems} />
        </div>

        <div class="form-group content-wrapper">
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
          data-mock="save-new-reprint"
          on:click={handleSave}>
          保存
        </button>
      </div>
    </div>
  </div>
</div>
