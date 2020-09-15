import test from 'ava'
import json from './example.json'
import { composite } from '../morpheme'

test('composite/example', t => {
  const result = composite(json)

  t.deepEqual(result, ['これは', 'サンプル用の', 'テスト文章', 'です。'])
})
