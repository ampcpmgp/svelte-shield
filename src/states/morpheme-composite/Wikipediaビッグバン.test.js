import test from 'ava'
import json from './Wikipediaビッグバン.json'
import { composite } from '../morpheme'

test('composite/Wikipediaビッグバン', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    '',
    'インフレーション理論に',
    'よれば、',
    '時空の',
    '指数関数的急膨張',
    '（インフレーション）後に',
    '相転移により',
    '生まれた',
    '超高温高密度の',
    'エネルギーの',
    '塊がビッグバン膨張の',
    '開始になる。',
    'その時刻は',
    '今から',
    '138.2億年（',
    '13.82 ×',
    '109年）',
    '前と計算されて',
    'いる。',
    '',
  ])
})
