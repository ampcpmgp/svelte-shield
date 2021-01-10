import test from 'ava'
import json from './長めのカタカナ.json'
import { composite } from '../morpheme'

/*
2世紀ころのクラウディオス・プトレマイオスは『アルマゲスト』において、天球上における天体の動き（軌道）の数学的な分析を解説した。
こうした状況に対し、ニコラウス・コペルニクスは従来の地球を中心とする説（地球中心説）に対して、太陽中心説を唱えた。
1927年ベルギーの司祭ジョルジュ・ルメートルが「宇宙は“原始的原子”の“爆発”から始まった」とする説を提唱し、この説が後に「ビッグバン」と呼ばれるようになった。
レオナルド・ダ・ヴィンチが、それまでの優れているとはいえなかった芸術を光輝に満ちたものへと一変させた。
*/

test('composite/長めのカタカナ', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    '2世紀ころの',
    'クラウディオス・プトレマイオスは',
    '『アルマゲスト』において、',
    '天球上における',
    '天体の動き（軌道）の',
    '数学的な',
    '分析を解説した。',
    'こうした状況に対し、',
    'ニコラウス・コペルニクスは',
    '従来の地球を',
    '中心とする',
    '説（地球中心説）に対して、',
    '太陽中心説を',
    '唱えた。',
    '1927年ベルギーの',
    '司祭ジョルジュ・ルメートルが「宇宙は“原始的原子”の“爆発”から始まった」と',
    'する説を',
    '提唱し、',
    'この説が',
    '後に「ビッグバン」と',
    '呼ばれる',
    'ようになった。',
    'レオナルド・ダ・ヴィンチが、',
    'それまでの',
    '優れているとは',
    'いえなかった',
    '芸術を光輝に',
    '満ちたものへと',
    '一変させた。',
  ])
})
