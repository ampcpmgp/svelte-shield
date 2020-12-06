<script>
  import { url, license } from '../../../states/book'
  import { getUrl } from '../../../utils/licenses'
  import * as is from '../../../utils/is'
</script>

<style>
  .ios {
    /* ios safari は .card-body の padding を突き抜けて置かれるため、上下に設定する */
    padding-bottom: 3rem;
  }

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

<div class:ios={is.iOS()}>
  この記事は、
  <a
    href={getUrl($license)}
    target="_blank"
    rel="noreferrer noreferrer">{$license}</a>
  のもとで公表された
  <a href={$url} target="_blank" rel="noreferrer noreferrer">{$url}</a>
  を素材として二次利用しています。
</div>
