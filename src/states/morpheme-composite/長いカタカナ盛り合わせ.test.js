import test from 'ava'
import json from './長いカタカナ盛り合わせ.json'
import { composite } from '../morpheme'

/* 原文
クラウドファンディングサイトで新しいエキストラホイップモカカプチーノ開発のスペシャルオファーがウィトゲンシュタインから届いた。
*/

test('composite/長いカタカナ盛り合わせ', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    'クラウドファンディングサイトで',
    '新しい',
    'エキストラホイップモカカプチーノ開発の',
    'スペシャルオファーが',
    'ウィトゲンシュタインから',
    '届いた。',
  ])
})
