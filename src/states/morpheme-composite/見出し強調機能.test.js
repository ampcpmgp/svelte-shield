import test from 'ava'
import json from './見出し強調機能.json'
import { composite } from '../morpheme'

/* 原文
物理的消化
咀嚼（そしゃく）
  食物を歯で噛み砕く事によって食物を細かくする。
蠕動（ぜんどう）運動
  筋肉の収縮で波を作り、食物を運ぶ。
分節運動
  筋肉の収縮によって消化液と食物を混ぜる。
*/

test('composite/見出し強調機能', t => {
  const result = composite(json)

  t.deepEqual(result, [
    {
      info: {
        hasNewLine: true,
        isHeading: true,
      },
      word: '物理的消化',
    },
    {
      info: {
        hasNewLine: true,
        isHeading: true,
      },
      word: '咀嚼（そしゃく）',
    },
    {
      info: {
        hasNewLine: false,
        isHeading: false,
      },
      word: '食物を歯で',
    },
    {
      info: {
        hasNewLine: false,
        isHeading: false,
      },
      word: '噛み砕く事によって',
    },
    {
      info: {
        hasNewLine: false,
        isHeading: false,
      },
      word: '食物を細かく',
    },
    {
      info: {
        hasNewLine: true,
        isHeading: false,
      },
      word: 'する。',
    },
    {
      info: {
        hasNewLine: true,
        isHeading: true,
      },
      word: '蠕動（ぜんどう）運動',
    },
    {
      info: {
        hasNewLine: false,
        isHeading: false,
      },
      word: '筋肉の収縮で',
    },
    {
      info: {
        hasNewLine: false,
        isHeading: false,
      },
      word: '波を作り、',
    },
    {
      info: {
        hasNewLine: true,
        isHeading: false,
      },
      word: '食物を運ぶ。',
    },
    {
      info: {
        hasNewLine: true,
        isHeading: true,
      },
      word: '分節運動',
    },
    {
      info: {
        hasNewLine: false,
        isHeading: false,
      },
      word: '筋肉の収縮によって',
    },
    {
      info: {
        hasNewLine: false,
        isHeading: false,
      },
      word: '消化液と',
    },
    {
      info: {
        hasNewLine: false,
        isHeading: false,
      },
      word: '食物を混ぜる。',
    },
  ])
})
