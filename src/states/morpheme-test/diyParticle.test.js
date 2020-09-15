import test from 'ava'
import json from './diyParticle.json'
import { composite } from '../morpheme'

test('composite/diyParticle', t => {
  const result = composite(json)

  t.deepEqual(result, [
    'スイスと',
    'フランスを',
    'またぐ世界',
    '最大規模の',
    '素粒子物理学',
    '研究施設',
    'である欧州',
    '原子核研究',
    '機構(',
    'CERN)は、',
    '質量が',
    '発生する',
    '仕組みを',
    '説明する',
    '鍵となる',
    'ヒッグス',
    '粒子の発見や、',
    'インターネットで',
    '幅広く',
    '利用される',
    'HTTPの',
    '開発など、',
    '物理学のみ',
    'ならず',
    'さまざまな',
    '領域で',
    '多大な功績を',
    '残して',
    'います。',
  ])
})
