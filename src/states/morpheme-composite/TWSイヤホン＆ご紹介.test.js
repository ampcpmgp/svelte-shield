import test from 'ava'
import json from './TWSイヤホン＆ご紹介.json'
import { composite } from '../morpheme'

/* 原文
一方で紛失しやすいのも事実で、TWSイヤホンの片方をなくしてしまい途方に暮れた……という人も多いのではないだろうか。
今回ご紹介する「Baseus Tag」は、紛失防止のトラッキング機能を備えたTWSイヤホン。海外クラウドファンディングサイトの「Kickstarter」にてプロジェクトを掲載している。
*/

test('composite/TWSイヤホン＆ご紹介', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    '一方で紛失し',
    'やすいのも',
    '事実で、',
    'TWSイヤホンの',
    '片方をなくして',
    'しまい途方に',
    '暮れた…',
    '…という',
    '人も多いのではないだろうか。',
    '\n',
    '今回ご紹介する',
    '「Baseus',
    'Tag」は、',
    '紛失防止の',
    'トラッキング機能を',
    '備えた',
    'TWSイヤホン。',
    '海外クラウドファンディングサイトの',
    '「Kickstarter」にて',
    'プロジェクトを',
    '掲載して',
    'いる。',
  ])
})
