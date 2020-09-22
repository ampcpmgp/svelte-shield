import test from 'ava'
import json from './これは医学から.json'
import { composite } from '../morpheme'

/* 原文
これは医学から生まれ初期の研究は病気に対する免疫の原因についてであった。
*/

test('composite/これは医学から', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    'これは医学から',
    '生まれ初期の',
    '研究は病気に対する',
    '免疫の原因に',
    'ついてであった。',
  ])
})
