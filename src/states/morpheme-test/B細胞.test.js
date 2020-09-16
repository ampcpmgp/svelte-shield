import test from 'ava'
import json from './B細胞.json'
import { composite } from '../morpheme'

test('composite/B細胞', t => {
  const result = composite(json)

  t.deepEqual(result, [])
})
