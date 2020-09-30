import test from 'ava'
import json from './単語リスト.json'
import { composite } from '../morpheme'

test('composite/単語リスト', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    '\n',
    '以下の各項目を',
    '参照。',
    '\n',
    '天動説',
    '\n',
    '地動説',
    '\n',
    '蓋天説',
    '\n',
    '渾天説',
    '\n',
    '宣夜説',
    '\n',
  ])
})
