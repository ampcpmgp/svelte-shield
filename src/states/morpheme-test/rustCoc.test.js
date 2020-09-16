import test from 'ava'
import json from './rustCoc.json'
import { composite } from '../morpheme'

// 参考URL: https://www.rust-lang.org/ja/policies/code-of-conduct

test('composite/rustCoc', t => {
  const result = composite(json)

  t.deepEqual(result, [
    '私たちは、',
    '経験のレベル、',
    '性同一性および',
    '表現、',
    '性的指向、',
    '障害、',
    '個人の容姿、',
    '体格、',
    '人種、',
    '民族、',
    '年齢、',
    '宗教、',
    '国籍、',
    'その他の',
    '特徴に',
    'かかわらず、',
    '友好的かつ',
    '安全ですべての',
    '人を',
    '歓迎する',
    '環境を',
    '提供する',
    'ことに',
    '尽力します。',
    '過度に',
    '性的な',
    '偽名または',
    'ニックネームを',
    '使わないで',
    'ください。',
    '友好的かつ',
    '安全ですべての',
    '人を',
    '歓迎する',
    '環境を',
    '損なうかも',
    'しれません。',
    '親切かつ',
    '丁寧に',
    '行動して',
    'ください。',
    '意地悪や',
    '無礼をする',
    '必要は',
    'ありません。',
    '人々には',
    '意見の',
    '相違が',
    'あり、',
    'すべての',
    '設計または',
    '実装の',
    '選択には',
    'トレードオフと',
    '数多のコストが',
    'かかることを',
    '尊重して',
    'ください。',
    '正解は',
    'めったに',
    'ありません。',
    '構造化されて',
    'いない批評は',
    '最小限に',
    '留めて',
    'ください。',
    '試して',
    'みたい',
    '確固たる',
    'アイデアが',
    'ある場合は、',
    'フォークを',
    '作り、',
    'どのように',
    '動作するか',
    '確認して',
    'ください。',
    '私たちは、',
    'あなたが',
    '誰かを',
    '侮辱し',
    '屈辱を',
    '与え、',
    'ハラスメントを',
    'した場合に、',
    'あなたを',
    '対話から',
    '除外します。',
    'それは',
    '歓迎的な',
    '行いでは',
    'ありません。',
    '「ハラスメント」という',
    '用語は、',
    '市民行動',
    '規範の',
    '定義を',
    '含むものと',
    '解釈します。',
    'その概念に',
    '何が含まれて',
    'いるのか',
    '明確でない',
    '場合は、',
    'その定義を',
    '読んで',
    'ください。',
    '特に、',
    '社会的に',
    '疎外',
    'された人々を',
    '排除する',
    '行動は',
    '容認',
    'しません。',
    '個人的な',
    'ハラスメントも',
    '容認',
    'されません。',
    '誰であっても、',
    'あなたが',
    'コミュニティ',
    'メンバーに',
    'ハラスメントを',
    '受けているか、',
    'または不快に',
    'させられて',
    'いると',
    '感じた場合は、',
    'ただちに',
    'チャンネル',
    '担当者または',
    'Rust',
    'モデレーションチーム',
    'のいずれかに',
    '連絡して',
    'ください。',
    'あなたが',
    '常連の',
    '寄稿者',
    'であろうと、',
    '新規参入者',
    'であろうと、',
    '私たちは',
    'このコミュニティを',
    'あなた',
    'にとって',
    '安全な',
    '場所に',
    'することに',
    '気を配って',
    'います。',
    'あなたには',
    '私たちが',
    'ついて',
    'います。',
    '同様に、',
    'いかなる',
    'スパム、',
    '荒らし行為、',
    '感情的な',
    '言動、',
    '釣り行為、',
    'その他の',
    '注意を',
    '反らす',
    '行為も',
    '歓迎される',
    'ものでは',
    'ありません。',
  ])
})
