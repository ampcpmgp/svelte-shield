import test from 'ava'
import json from './ダブルクォーテーション.json'
import { composite } from '../morpheme'

/* 原文
空でない文字列の場合は、 RFC 6455で定義されている “WebSocket Subprotocol Name Registry “に登録されているプロトコルを指定します。 “あいう えお“ や“柿くけ子もあります。ただし、“ アルファベット版の "double quotation" も考慮する必要があるでしょう。
*/

test('composite/ダブルクォーテーション', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [

  ])
})
