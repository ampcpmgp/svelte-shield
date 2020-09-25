import test from 'ava'
import json from './！マーク.json'
import { composite } from '../morpheme'

/* 原文
答えは、JavaScriptを学ばなければTypeScriptを学べないということです！TypeScriptは構文と実行時の動作をJavaScriptと共有するため、JavaScriptについて学んだことはすべて、TypeScriptを同時に学ぶのに役立ちます。
*/

test('composite/！マーク', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    '答えは、',
    'JavaScriptを',
    '学ばなければ',
    'TypeScriptを',
    '学べないという',
    'ことです！',
    'TypeScriptは',
    '構文と',
    '実行時の',
    '動作をJavaScriptと',
    '共有する',
    'ため、',
    'JavaScriptについて',
    '学んだことは',
    'すべて、',
    'TypeScriptを',
    '同時に学ぶのに',
    '役立ちます。',
  ])
})
