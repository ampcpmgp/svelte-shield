import test from 'ava'
import json from './コンテンツレンダリング.json'
import { composite } from '../morpheme'

// 初回起動の場合コンテンツレンダリングが遅い。

test('composite/コンテンツレンダリング', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, ['初回起動の', '場合コンテンツレンダリングが', '遅い。'])
})
