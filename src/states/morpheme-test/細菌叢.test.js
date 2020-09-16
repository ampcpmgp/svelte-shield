import test from 'ava'
import json from './細菌叢.json'
import { composite } from '../morpheme'

test('composite/細菌叢', t => {
  const result = composite(json)

  t.deepEqual(result, [
    '生殖尿管や',
    '胃腸管では',
    '共生して',
    'いる細菌',
    '叢が病原菌と',
    '養分や繁殖',
    '場所',
    'をめぐって',
    '病原体と',
    '競争して',
    '生物学的',
    '防壁として',
    '機能する。',
  ])
})
