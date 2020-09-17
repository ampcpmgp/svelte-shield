import test from 'ava'
import json from './withQuestion.json'
import { composite } from '../morpheme'

test('composite/withQuestion', t => {
  const result = composite(json)

  t.deepEqual(result, [
    '「なんで',
    '結婚しないの？」',
    '「ずっと',
    '独身で',
    'いるつもり？」',
    '「早く',
    '安心させて',
    'くれ」',
  ])
})
