import test from 'ava'
import json from './json/閉じ括弧.json'
import { composite } from './morpheme'

test('composite/閉じ括弧', t => {
  const result = composite(json)
  t.deepEqual(result, [
    '人体の器官の',
    '分類、',
    '組成',
    '人体の組成',
    '70kgの',
    '体重のヒト',
    '[7]',
    '成分 \t重量',
  ])
})
