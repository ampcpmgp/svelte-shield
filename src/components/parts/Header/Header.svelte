<script>
  import { default as Modal } from '../../../const/modal'
  import { default as Icon } from '../../parts/Icon/Icon.svelte'

  export let tweetText = ''
  export let additionalHashTags = []

  $: hashTags = ['SvelteShield', ...additionalHashTags]
</script>

<style>
  header {
    display: grid;
    grid-column-gap: 14px;
    grid-auto-flow: column;
    justify-content: space-between;
    place-items: center;
    position: relative;
  }
  @media (max-width: 575px) {
    header {
      grid-column-gap: 8px;
    }
  }

  i {
    font-size: 24px;
  }

  .fa-shield-alt {
    font-size: 30px;
    cursor: pointer;
    text-shadow: 2px 2px 4px gray;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .fa-shield-alt:hover {
    opacity: 0.5;
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

<header>
  <div data-toggle="modal" data-target={'#' + Modal.SETTINGS}>
    <Icon isBox={true}><i class="fas fa-user-cog" /></Icon>
  </div>

  <i
    class="fas fa-shield-alt"
    data-toggle="modal"
    data-target={'#' + Modal.MODE_CHANGE} />

  <a
    class="btn btn-sm btn-primary twitter-button sp-hidden"
    href="https://twitter.com/share?ref_src=twsrc%5Etfw&text={`${tweetText}`}&hashtags={`${hashTags.join(',')}`}"
    target="_blank">
    <span class="fab fa-twitter" />
    <span class="">ツイートする</span>
  </a>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8">
  </script>
</header>
