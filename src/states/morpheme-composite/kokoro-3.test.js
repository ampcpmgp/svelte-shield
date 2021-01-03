import test from 'ava'
import json from './kokoro-3.json'
import { composite } from '../morpheme'

/* 原文
学校の授業が始まるにはまだ大分日数があるので鎌倉におってもよし、帰ってもよいという境遇にいた私は、当分元の宿に留まる覚悟をした。友達は中国のある資産家の息子で金に不自由のない男であったけれども、学校が学校なのと年が年なので、生活の程度は私とそう変りもしなかった。したがって一人ぼっちになった私は別に恰好な宿を探す面倒ももたなかったのである。
*/

test('composite/kokoro-3', t => {
  const result = composite(json).map(item => item.word)

  t.deepEqual(result, [
    '学校の授業が',
    '始まるにはまだ',
    '大分日数が',
    'あるので',
    '鎌倉におっても',
    'よし、',
    '帰っても',
    'よいという',
    '境遇にいた',
    '私は、',
    '当分元の',
    '宿に留まる覚悟を',
    'した。',
    '友達は中国のある',
    '資産家の',
    '息子で金に',
    '不自由の',
    'ない男であったけれども、',
    '学校が学校なのと',
    '年が年なので、',
    '生活の程度は',
    '私とそう',
    '変りもしなかった。',
    'したがって',
    '一人ぼっちに',
    'なった私は',
    '別に恰好な',
    '宿を探す面倒も',
    'もたなかった',
    'のである。',
  ])
})