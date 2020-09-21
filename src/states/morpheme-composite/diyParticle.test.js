import test from 'ava'
import json from './diyParticle.json'
import { composite } from '../morpheme'

// スイスとフランスをまたぐ世界最大規模の素粒子物理学研究施設である欧州原子核研究機構(CERN)は、質量が発生する仕組みを説明する鍵となるヒッグス粒子の発見や、インターネットで幅広く利用されるHTTPの開発など、物理学のみならずさまざまな領域で多大な功績を残しています。

test('composite/diyParticle', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    'スイスと',
    'フランスを',
    'またぐ',
    '世界最大規模の',
    '素粒子物理学研究施設',
    'である',
    '欧州原子核研究機構(CERN)は、',
    '質量が',
    '発生する',
    '仕組みを',
    '説明する',
    '鍵となる',
    'ヒッグス粒子の',
    '発見や、',
    'インターネットで',
    '幅広く',
    '利用される',
    'HTTPの',
    '開発など、',
    '物理学のみ',
    'ならず',
    'さまざまな',
    '領域で',
    '多大な',
    '功績を',
    '残して',
    'います。',
  ])
})
