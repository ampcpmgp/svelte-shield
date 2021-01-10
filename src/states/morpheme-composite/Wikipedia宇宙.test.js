import test from 'ava'
import json from './Wikipedia宇宙.json'
import { composite } from '../morpheme'

// これに対し、ウィトゲンシュタインをはじめとする不可知論の立場からは、「語りえないものについては、沈黙しなければならない」との論がある。

test('composite/Wikipedia宇宙', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    'これに対し、',
    'ウィトゲンシュタインを',
    'はじめと',
    'する不可知論の',
    '立場からは、「語りえないものについては、沈黙しなければならない」との',
    '論がある。',
  ])
})
