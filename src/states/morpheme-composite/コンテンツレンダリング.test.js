import test from 'ava'
import json from './コンテンツレンダリング.json'
import { composite } from '../morpheme'

test('composite/コンテンツレンダリング', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    '',
    '初回起動の',
    '場合',
    'コンテンツレンダリングが',
    '遅い。',
    '',
  ])
})
