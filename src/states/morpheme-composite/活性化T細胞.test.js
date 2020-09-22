import test from 'ava'
import json from './活性化T細胞.json'
import { composite } from '../morpheme'

/* 原文
細胞傷害性の薬品は活性化T細胞のような分裂中の細胞を殺すような免疫応答を阻害する。しかし殺滅作用は区別できないから定常的に分裂している細胞とそれらの器官は影響を受け、これが毒性をもった副作用をもたらす。
*/

test('composite/活性化T細胞', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    '細胞傷害性の',
    '薬品は',
    '活性化T細胞の',
    'ような',
    '分裂中の',
    '細胞を殺すような',
    '免疫応答を',
    '阻害する。',
    'しかし殺滅作用は',
    '区別できないから',
    '定常的に',
    '分裂して',
    'いる細胞と',
    'それらの',
    '器官は影響を',
    '受け、',
    'これが毒性を',
    'もった副作用を',
    'もたらす。',
  ])
})
