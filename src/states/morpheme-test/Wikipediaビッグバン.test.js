import test from 'ava'
import json from './Wikipediaビッグバン.json'
import { composite } from '../morpheme'

test('composite/Wikipediaビッグバン', t => {
  const result = composite(json)

  t.deepEqual(result, [
    'インフレーション',
    '理論によれば、',
    '時空の',
    '指数関数的',
    '急膨張（',
    'インフレーション）後に',
    '相転移により',
    '生まれた',
    '超高温高密度の',
    'エネルギーの',
    '塊が',
    'ビッグバン',
    '膨張の開始に',
    'なる。',
    'その時刻は',
    '今から',
    '138.2',
    '億年（',
    '13.82',
    '× 109年）',
    '前と',
    '計算されて',
    'いる。',
  ])
})
