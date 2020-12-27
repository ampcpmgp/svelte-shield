import test from 'ava'
import json from './rustCoc.json'
import { composite } from '../morpheme'

// 参考URL: https://www.rust-lang.org/ja/policies/code-of-conduct

test('composite/rustCoc', t => {
  const result = composite(json).map(item => item.word)

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
    '特徴にかかわらず、',
    '友好的かつ',
    '安全ですべての',
    '人を歓迎する',
    '環境を提供する',
    'ことに尽力します。',
    '過度に性的な',
    '偽名または',
    'ニックネームを',
    '使わないで',
    'ください。',
    '友好的かつ',
    '安全ですべての',
    '人を歓迎する',
    '環境を損なうかも',
    'しれません。',
    '親切かつ',
    '丁寧に行動して',
    'ください。',
    '意地悪や',
    '無礼をする',
    '必要はありません。',
    '人々には',
    '意見の相違が',
    'あり、',
    'すべての',
    '設計または',
    '実装の選択には',
    'トレードオフと',
    '数多のコストが',
    'かかることを',
    '尊重して',
    'ください。',
    '正解はめったに',
    'ありません。',
    '構造化されて',
    'いない批評は',
    '最小限に',
    '留めてください。',
    '試してみたい',
    '確固たるアイデアが',
    'ある場合は、',
    'フォークを',
    '作り、',
    'どのように',
    '動作するか',
    '確認して',
    'ください。',
    '私たちは、',
    'あなたが',
    '誰かを侮辱し',
    '屈辱を与え、',
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
    '市民行動規範の',
    '定義を含むものと',
    '解釈します。',
    'その概念に',
    '何が含まれて',
    'いるのか',
    '明確でない',
    '場合は、',
    'その定義を',
    '読んでください。',
    '特に、',
    '社会的に',
    '疎外された',
    '人々を排除する',
    '行動は容認しません。',
    '個人的な',
    'ハラスメントも',
    '容認されません。',
    '誰であっても、',
    'あなたが',
    'コミュニティメンバーに',
    'ハラスメントを',
    '受けているか、',
    'または不快に',
    'させられて',
    'いると感じた',
    '場合は、',
    'ただちに',
    'チャンネル担当者',
    'または Rustモデレーションチーム',
    'のいずれかに',
    '連絡して',
    'ください。',
    'あなたが',
    '常連の',
    '寄稿者であろうと、',
    '新規参入者であろうと、',
    '私たちは',
    'このコミュニティを',
    'あなたにとって',
    '安全な場所に',
    'することに',
    '気を配って',
    'います。',
    'あなたには',
    '私たちが',
    'ついています。',
    '同様に、',
    'いかなるスパム、',
    '荒らし行為、',
    '感情的な',
    '言動、',
    '釣り行為、',
    'その他の',
    '注意を反らす行為も',
    '歓迎される',
    'ものでは',
    'ありません。',
  ])
})