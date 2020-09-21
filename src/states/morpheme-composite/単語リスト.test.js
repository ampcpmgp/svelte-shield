import test from 'ava'
import json from './単語リスト.json'
import { composite } from '../morpheme'

test('composite/単語リスト', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    '',
    '以下の',
    '各項目を',
    '参照。',
    '',
    '天動説',
    '',
    '地動説',
    '',
    '蓋天説',
    '',
    '渾天説',
    '',
    '宣夜説',
    '',
  ])
})
