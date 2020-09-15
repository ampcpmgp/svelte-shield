import test from 'ava'
import json from './インフレーション理論.json'
import { composite } from '../morpheme'

/** 原文
 * この見かけの矛盾はインフレーション理論で解決される。
 */

test('composite/インフレーション理論', t => {
  const result = composite(json)

  t.deepEqual(result, [
    'この見かけの',
    '矛盾は',
    'インフレーション',
    '理論で',
    '解決される。',
  ])
})
