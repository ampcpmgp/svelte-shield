<script>
  import { default as Modal } from '../../../const/modal'
</script>

<style>
  .wrapper {
    display: grid;
    place-items: center;
    grid-auto-flow: column;
    grid-column-gap: 8px;
    margin: auto;
  }

  .all-install {
    color: royalblue;
  }

  .register {
    color: green;
  }

  .devider {
    width: 1px;
    height: 100%;
    border: solid 1px #999;
    margin: 0 8px;
  }
</style>

<div class="wrapper">
  <button
    class="btn btn-sm btn-primary all-install"
    disabled>一括取込(実装予定)</button>

  <div class="devider" />

  <div
    data-toggle="modal"
    data-target={'#' + Modal.NEW_REGISTER_SELF_MADE_BOOK}>
    <button class="btn btn-sm btn-primary register">自作文を登録</button>
  </div>
  <div data-toggle="modal" data-target={'#' + Modal.NEW_REGISTER_REPRINT_BOOK}>
    <button class="btn btn-sm btn-primary register">転載して登録</button>
  </div>
</div>
