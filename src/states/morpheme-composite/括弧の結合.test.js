import test from 'ava'
import json from './括弧の結合.json'
import { composite } from '../morpheme'

/* 原文
新生児(0–3ヶ月) 14〜 17時間[12] 乳児 (4–11ヶ月) 12〜 15時間[12] 幼児 (1–2歳) 11〜 14時間[12] 就学前(3–5歳) 10〜 13時間[12] 学童 (6–13歳) 9〜 11時間[12] 青年 (14–17歳) 8〜 10時間[12][13] 若年者(18- 25歳)、中年者(26- 64歳) 7〜 9時間[12] 老人 (65歳以上)7 〜 8時間[12][14]
*/

test('composite/括弧の結合', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    '新生児(0–3ヶ月)',
    '14〜 17時間[12]',
    '乳児 (4–11ヶ月)',
    '12〜 15時間[12]',
    '幼児 (1–2歳)',
    '11〜 14時間[12]',
    '就学前(3–5歳)',
    '10〜 13時間[12]',
    '学童 (6–13歳)',
    '9〜 11時間[12]',
    '青年 (14–17歳)',
    '8〜 10時間[12][13]',
    '若年者(18- 25歳)、中年者(26- 64歳)',
    '7〜 9時間[12]',
    '老人 (65歳以上)7 〜 8時間[12][14]',
  ])
})
