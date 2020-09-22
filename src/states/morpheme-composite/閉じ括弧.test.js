import test from 'ava'
import json from './閉じ括弧.json'
import { composite } from '../morpheme'

/*
人類の期間の分類、組成
人体の組成
70kgの体重のヒト
[7]
成分  重量
*/

test('composite/閉じ括弧', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    '人体の器官の',
    '分類、',
    '組成',
    '',
    '人体の組成',
    '',
    '70kgの',
    '体重のヒト',
    '',
    '[7]',
    '',
    '成分 \t重量',
  ])
})
