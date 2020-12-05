<script>
  import { url, license } from '../../../states/book'
  import { getUrl } from '../../../utils/licenses'
</script>

<style>
  a {
    color: blue;
    text-decoration: underline;
  }
</style>

<div>
  この記事は、
  <a
    href={getUrl($license)}
    target="_blank"
    rel="noreferrer noreferrer">{$license}</a>
  のもとで公表された
  <a href={$url} target="_blank" rel="noreferrer noreferrer">{$url}</a>
  を素材として二次利用しています。
</div>
