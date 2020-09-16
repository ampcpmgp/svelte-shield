import test from 'ava'
import json from './longWord.json'
import { composite } from '../morpheme'

test('composite/longWord', t => {
  const result = composite(json)
  t.deepEqual(result, [
    '最近',
    'イライラ',
    'してしまいがち、',
    'という人は',
    '睡眠不足',
    'なのかも？',
  ])
})
