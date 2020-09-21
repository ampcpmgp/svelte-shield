import test from 'ava'
import json from './longWord.json'
import { composite } from '../morpheme'

test('composite/longWord', t => {
  const result = composite(json).map(item => item.word)
  t.deepEqual(result, [
    '最近',
    'イライラ',
    'してしまいがち、',
    'という',
    '人は',
    '睡眠不足',
    'なのかも？',
  ])
})
