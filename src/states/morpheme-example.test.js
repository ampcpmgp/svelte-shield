import test from 'ava'
import example from './json/example.json'
import { composite } from './morpheme'

test('composite - example', t => {
  const result = composite(example)

  t.deepEqual(result, ['これはサンプル用の', 'テスト文章', 'です。'])
})
