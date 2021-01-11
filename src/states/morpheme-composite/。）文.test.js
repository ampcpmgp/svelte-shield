import test from 'ava'
import json from './。）文.json'
import { composite } from '../morpheme'

/* 原文
私の医師としての専門は加齢や老化を扱う「老年医学」なのです。
（現在、東京大学医学部附属病院の老年病科に所属しています。）
脳や人工知能もアツいですが、加齢や老化についての最近の研究も激アツです。
*/

test('composite/。）文', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    '私の医師としての',
    '専門は',
    '加齢や老化を',
    '扱う「老年医学」なのです。',
    '（現在、東京大学医学部附属病院の老年病科に所属しています。）',
    '脳や人工知能も',
    'アツいですが、',
    '加齢や老化についての',
    '最近の研究も',
    '激アツです。',
  ])
})
