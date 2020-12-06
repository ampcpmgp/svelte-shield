import test from 'ava'
import json from './英単語を含む.json'
import { composite } from '../morpheme'

test('composite/英単語を含む', t => {
  const result = composite(json).map(item => item.word)
  t.deepEqual(result, [
    'hub threads',
    'ThreadDBへの',
    '制限付きアクセスを',
    '提供します。',
  ])
})
