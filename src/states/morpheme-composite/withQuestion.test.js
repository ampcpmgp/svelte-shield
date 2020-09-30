import test from 'ava'
import json from './withQuestion.json'
import { composite } from '../morpheme'

test('composite/withQuestion', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    '「なんで',
    '結婚しないの？」',
    '\n',
    '「ずっと',
    '独身でいる',
    'つもり？」',
    '\n',
    '「早く安心させて',
    'くれ」',
  ])
})
