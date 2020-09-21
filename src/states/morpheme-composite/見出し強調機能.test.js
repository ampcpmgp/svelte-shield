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
        isHeading: true,
      },
      word: '物理的消化',
    },
    {
      info: {
        isHeading: true,
      },
      word: '',
    },
    {
      info: {
        isHeading: true,
      },
      word: '咀嚼（そしゃく）',
    },
    {
      info: {
        isHeading: false,
      },
      word: '',
    },
    {
      info: {
        isHeading: false,
      },
      word: '食物を',
    },
    {
      info: {
        isHeading: false,
      },
      word: '歯で噛み砕く',
    },
    {
      info: {
        isHeading: false,
      },
      word: '事によって',
    },
    {
      info: {
        isHeading: false,
      },
      word: '食物を',
    },
    {
      info: {
        isHeading: false,
      },
      word: '細かくする。',
    },
    {
      info: {
        isHeading: true,
      },
      word: '',
    },
    {
      info: {
        isHeading: true,
      },
      word: '蠕動（ぜんどう）',
    },
    {
      info: {
        isHeading: true,
      },
      word: '運動',
    },
    {
      info: {
        isHeading: false,
      },
      word: '',
    },
    {
      info: {
        isHeading: false,
      },
      word: '筋肉の',
    },
    {
      info: {
        isHeading: false,
      },
      word: '収縮で',
    },
    {
      info: {
        isHeading: false,
      },
      word: '波を作り、',
    },
    {
      info: {
        isHeading: false,
      },
      word: '食物を',
    },
    {
      info: {
        isHeading: false,
      },
      word: '運ぶ。',
    },
    {
      info: {
        isHeading: true,
      },
      word: '',
    },
    {
      info: {
        isHeading: true,
      },
      word: '分節運動',
    },
    {
      info: {
        isHeading: false,
      },
      word: '',
    },
    {
      info: {
        isHeading: false,
      },
      word: '筋肉の',
    },
    {
      info: {
        isHeading: false,
      },
      word: '収縮によって',
    },
    {
      info: {
        isHeading: false,
      },
      word: '消化液と',
    },
    {
      info: {
        isHeading: false,
      },
      word: '食物を',
    },
    {
      info: {
        isHeading: false,
      },
      word: '混ぜる。',
    },
  ])
})
