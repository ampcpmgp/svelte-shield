import test from 'ava'
import 長めのカタカナ from './長めのカタカナ.json'
import { composite } from '../morpheme'

test('composite/長めのカタカナ', t => {
  const result = composite(長めのカタカナ)

  t.deepEqual(result, [
    '2世紀ころの',
    'クラウディオス・',
    'プトレマイオスは',
    '『アルマゲスト』',
    'において、',
    '天球上',
    'における',
    '天体の動き',
    '（軌道）の',
    '数学的な',
    '分析を',
    '解説した。',
    'こうした',
    '状況に対し、',
    'ニコラウス・',
    'コペルニクスは',
    '従来の地球を',
    '中心とする',
    '説（地球',
    '中心説）',
    'に対して、',
    '太陽中心説を',
    '唱えた。',
    '1927年',
    'ベルギーの',
    '司祭',
    'ジョルジュ・',
    'ルメートルが',
    '「宇宙は',
    '“原始的',
    '原子”の',
    '“爆発”から',
    '始まった」と',
    'する説を',
    '提唱し、',
    'この説が',
    '後に「',
    'ビッグバン」と',
    '呼ばれる',
    'ように',
    'なった。',
    'レオナルド・',
    'ダ・ヴィンチが、',
    'それまでの',
    '優れているとは',
    'いえなかった',
    '芸術を光輝に',
    '満ちたものへと',
    '一変',
    'させた。',
  ])
})
