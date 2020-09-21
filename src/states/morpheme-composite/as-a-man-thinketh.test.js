import test from 'ava'
import json from './as-a-man-thinketh.json'
import { composite } from '../morpheme'

// あなたが見ている世界は万華鏡であり、その様々な色の組み合わせは、その瞬間ごとのあなた自身の絶えず動き続ける思考によって、絶妙に調整されたものです。

test('composite/as-a-man-thinketh', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    'あなたが',
    '見ている',
    '世界は',
    '万華鏡',
    'であり、',
    'その様々な',
    '色の組み合わせは、',
    'その瞬間ごとの',
    'あなた自身の',
    '動き続ける',
    '思考によって、',
    '絶妙に',
    '調整',
    'されたもの',
    'です。',
  ])
})
