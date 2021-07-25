<script>
  import { push, link } from "svelte-spa-router";
  import { default as Modal } from "../../../const/modal";
</script>

<div
  class="modal fade"
  id={Modal.MODE_CHANGE}
  tabindex="-1"
  role="dialog"
  aria-labelledby={Modal.MODE_CHANGE}
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content shadow-soft">
      <div class="modal-header">
        <h2 class="h6 modal-title mb-0">モード切替</h2>
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
        <div class="wrapper">
          <!--
            実際のページ遷移処理が動いているのは on:click
            use:link は href のリンク遷移先を変えて、カーソルを当てたときの
            ページ遷移先を決めている。
            on:click が無いと、 data-dismiss の影響により、ページ遷移処理が走らない。
          -->
          <a
            href="/"
            class="card bg-primary border-light shadow-soft mode"
            data-dismiss="modal"
            on:click={() => push("/")}
            use:link
          >
            <i class="fas fa-edit" />
            通常モード
          </a>
          <a
            href="/"
            class="card bg-primary border-light shadow-soft mode"
            data-dismiss="modal"
            on:click={() => push("/speak")}
            use:link
          >
            <i class="fas fa-volume-up" />
            読み上げモード
          </a>
        </div>

        <h3 class="h6 modal-title mb-0">🧪実験的機能🧪</h3>

        <div class="wrapper">
          <a
            href="/books"
            class="card bg-primary border-light shadow-soft mode"
            data-dismiss="modal"
            on:click={() => push("/books")}
            use:link
          >
            <i class="fas fa-book" />
            IPFS本モード
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .modal-dialog {
    max-width: 780px;
  }
  @media (max-width: 800px) {
    .modal-dialog {
      margin: 0.5rem;
    }
  }

  .wrapper {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, 120px);
    gap: 18px;
    align-items: center;
    margin-bottom: 30px;
  }
  @media (max-width: 575px) {
    .wrapper {
      grid-template-columns: repeat(auto-fill, 100px);
    }
  }

  h3 {
    font-weight: bold;
    font-size: 0.9rem;
  }

  .mode {
    height: 120px;
    padding: 8px;
    font-size: 14px;
    display: grid;
    place-items: center;
  }
  @media (max-width: 575px) {
    .mode {
      font-size: 12px;
      height: 100px;
    }
  }

  i {
    font-size: 50px;
  }
  @media (max-width: 575px) {
    i {
      font-size: 40px;
    }
  }
</style>
