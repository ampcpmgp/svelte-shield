import test from 'ava'
import json from './Wikipedia宇宙.json'
import { composite } from '../morpheme'

test('composite/Wikipedia宇宙', t => {
  const result = composite(json)

  t.deepEqual(result, [
    'これに対し、',
    'ウィトゲンシュタインを',
    'はじめと',
    'する不可知論の',
    '立場からは、',
    '「語りえない',
    'ものについては、',
    '沈黙しなければ',
    'ならない」との',
    '論がある。',
  ])
})
