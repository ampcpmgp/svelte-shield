import test from 'ava'
import json from './これは医学から.json'
import { composite } from '../morpheme'

/* 原文
これは医学から生まれ初期の研究は病気に対する免疫の原因についてであった。
*/

test('composite/これは医学から', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    'これは',
    '医学から',
    '生まれ',
    '初期の',
    '研究は',
    '病気',
    'に対する',
    '免疫の',
    '原因に',
    'ついて',
    'であった。',
  ])
})
