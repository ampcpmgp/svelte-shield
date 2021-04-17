<script>
  import { url, license } from "../../../states/book";
  import { getUrl } from "../../../utils/licenses";
</script>

<div>
  この記事は、
  <a href={getUrl($license)} target="_blank" rel="noreferrer noreferrer"
    >{$license}</a
  >
  のもとで公表された
  <a href={$url} target="_blank" rel="noreferrer noreferrer">{$url}</a>
  を素材として二次利用しています。
</div>

<style>
  a {
    color: blue;
    text-decoration: underline;
  }
  @media (prefers-color-scheme: dark) {
    a {
      color: var(--gray-500);
    }
  }
</style>
