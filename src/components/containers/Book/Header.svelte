<script>
  import { link } from "svelte-spa-router";
  import { default as Modal } from "../../../const/modal";
  import { getUrlForTweet } from "../../../utils/url";
  import { title } from "../../../states/book";
  import { pause } from "../../../states/morpheme";
  import { default as Icon } from "../../parts/Icon/Icon.svelte";

  const hashTags = ["SvelteShield", "IPFS本"];
</script>

<header>
  <div
    class="user-cog-wrapper"
    data-toggle="modal"
    data-target={"#" + Modal.SETTINGS}
  >
    <Icon isBox={true}><i class="fas fa-user-cog" /></Icon>
  </div>

  <div class="title-wrapper">
    <a href="/books" use:link on:click={pause}>
      <Icon><i class="fas fa-angle-left" /></Icon>
    </a>

    <div class="title" title={$title}>{$title}</div>
  </div>

  <a
    class="btn btn-sm btn-primary twitter-button"
    href={getUrlForTweet($title, hashTags)}
    target="_blank"
  >
    <span class="fab fa-twitter" />
    <span class="sp-hidden">ツイートする </span>
  </a>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8">
  </script>
</header>

<style>
  header {
    display: grid;
    grid-column-gap: 14px;
    grid-template-columns: auto 1fr auto;
    position: relative;
  }

  .user-cog-wrapper {
    margin-right: auto;
  }

  .title-wrapper {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    grid-column-gap: 8px;
    padding: 0px 4px;
  }

  i {
    font-size: 24px;
  }

  i.fa-angle-left {
    width: 24px;
    text-align: center;
  }

  @media (min-width: 576px) {
    .title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  @media (max-width: 575px) {
    .title {
      justify-self: center;
      white-space: nowrap;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
      margin: auto;
    }
  }

  .twitter-button {
    /* twitter color */
    color: rgb(29, 161, 242);
  }

  @media (max-width: 575px) {
    .sp-hidden {
      display: none;
    }
  }
</style>
