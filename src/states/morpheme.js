import kuromoji from 'kuromoji'
import { get, writable } from 'svelte/store'
import sleep from '../utils/sleep'

export const word = writable('　')
export const isLoading = writable(true)
export const isPlay = writable(false)
export const errorMsg = writable('')
export const rawText = writable('')
export const hiddenSettings = writable({
  judgeNum: 3,
})
// モック用
export const ignoreReading = writable(false)

const 漢字ひらがな漢字ひらがな = /^([\u30e0-\u9fcf]+)([\u3040-\u309f]+)([\u30e0-\u9fcf]+)([\u3040-\u309f]+)$/

const initP = init()

async function init() {
  // 初期描画が終わったあとに辞書データを読み込む。
  await sleep(0)

  return new Promise((resolve, reject) => {
    kuromoji.builder({ dicPath: './dict/' }).build(function(err, tokenizer) {
      if (get(ignoreReading)) {
        return
      }

      if (err) {
        isLoading.set(false)
        errorMsg.set('辞書取得エラー')
        reject()
        return
      }

      isLoading.set(false)
      resolve(tokenizer)
    })
  })
}

export async function tokenize() {
  const tokenizer = await initP

  const path = tokenizer.tokenize(get(rawText))

  for (const message of composite(path)) {
    if (!get(isPlay)) {
      word.set('　')
      return
    }

    word.set(message)

    await sleep(localStorage.intervalMs)
  }

  isPlay.set(false)
}

export function getWord(composition) {
  return composition.reduce((str, path) => str + path.surface_form, '').trim()
}

export function initComposition(compositions, index) {
  if (!compositions[index]) {
    compositions.push([])
  }
}

export function isPunctuation(item) {
  return item.pos_detail_1 === '句点' || item.pos_detail_1 === '読点'
}

export function isRelationalNoun(item) {
  return item.pos === '名詞' || hasStrongConnectionNoun(item)
}

export function hasStrongConnectionNoun(item) {
  return item.pos === '連体詞' || item.pos === '接頭詞'
}

export function isRelationalVerb(item) {
  return (
    item.pos === '動詞' ||
    item.pos === '助動詞' ||
    item.pos_detail_1 === '形容動詞語幹'
  )
}

export function isWeirdAtTheFront(item, lastItem) {
  const { judgeNum } = get(hiddenSettings)

  // 設定文字数を越えていない助詞で、前回の結果が句読点で無ければ結合可能
  const isConnectableParticle =
    item.pos === '助詞' &&
    item.surface_form.length <= judgeNum &&
    lastItem &&
    !isPunctuation(lastItem)

  // 今回の結果が数で、前回の結果が小数点だった場合は結合可能
  const isConnectableNum =
    item.pos_detail_1 === '数' && lastItem && lastItem.surface_form === '.'

  return (
    isPunctuation(item) ||
    item.pos_detail_1 === '括弧閉' ||
    item.pos_detail_1 === '接尾' ||
    item.surface_form === ')' ||
    item.surface_form === ']' ||
    item.surface_form === '？' ||
    item.surface_form === '・' ||
    isConnectableParticle ||
    isConnectableNum
  )
}

export function isOnlyKanji(surface_form) {
  return /^[\u30e0-\u9fcf]+$/.test(surface_form)
}

export function composite(path) {
  const compositions = []
  let currentIndex = 0
  const { judgeNum } = get(hiddenSettings)

  path.forEach((item, index) => {
    // 初期化
    initComposition(compositions, currentIndex)
    let composition = compositions[currentIndex]
    let prevComposition = compositions[currentIndex - 1]
    let prevCompositionLastItem =
      prevComposition && prevComposition[prevComposition.length - 1]
    let currentCompositionLastItem = composition[composition.length - 1]
    const word = getWord(composition)
    const nextItem = path[index + 1]

    // 事前折り返し判定。
    // 設定した判定数を超えたら繰り上げ
    if (word.length > judgeNum) {
      ++currentIndex
      // ２文字以上でかつ、今回の文字数が設定した判定数を超えていれば繰り上げ
    } else if (word.length > 1 && item.surface_form.length > judgeNum) {
      ++currentIndex
    } else if (isPunctuation(item) && composition.length > 0) {
      ++currentIndex
    } else if (/\n/.test(item.surface_form)) {
      ++currentIndex
      // 名詞以外（前回）＋名詞（今回）＋名詞（次回）の場合、名詞＋名詞を結合させるため、繰り上げ
    } else if (
      currentCompositionLastItem &&
      currentCompositionLastItem.pos !== '名詞' &&
      item.pos === '名詞' &&
      nextItem &&
      nextItem.pos === '名詞'
    ) {
      ++currentIndex
    }

    // 事前折り返し判定により再初期化
    initComposition(compositions, currentIndex)
    composition = compositions[currentIndex]
    prevComposition = compositions[currentIndex - 1]
    prevCompositionLastItem =
      prevComposition && prevComposition[prevComposition.length - 1]

    // 先頭に来ると表示がおかしく見えるもの（句読点・助詞など）は、ひとつ前に結合させる。
    if (
      composition.length === 0 &&
      prevComposition &&
      isWeirdAtTheFront(item, prevCompositionLastItem)
    ) {
      prevComposition.push(item)
      // 先頭が１文字の助動詞で、前回が名詞だった場合、ひとつ前に結合させる。
      // ※「～～なの」、と続くと、「な」は助動詞、「の」は名詞と判定されてしまうため、除外する。
    } else if (
      composition.length === 0 &&
      item.surface_form.length === 1 &&
      item.pos === '助動詞' &&
      !(item.surface_form === 'な' && nextItem.surface_form === 'の') &&
      prevCompositionLastItem &&
      prevCompositionLastItem.pos === '名詞'
    ) {
      prevComposition.push(item)

      // 名詞が先頭で、一つ前が名詞と強く関連のある品詞でかつ設定数以下の場合、取り除き結合する。
    } else if (
      composition.length === 0 &&
      item.pos === '名詞' &&
      prevCompositionLastItem &&
      hasStrongConnectionNoun(prevCompositionLastItem) &&
      prevCompositionLastItem.surface_form.length < judgeNum
    ) {
      composition.push(prevComposition.pop(), item)

      // 助動詞が先頭で、一つ前が動詞関連だった場合、取り除き結合させる
    } else if (
      composition.length === 0 &&
      item.pos === '助動詞' &&
      prevCompositionLastItem &&
      isRelationalVerb(prevCompositionLastItem)
    ) {
      composition.push(prevComposition.pop(), item)

      // 2~3前も動詞関連だった場合、さらに結合させる。
      let prevCompositionLastItem = prevComposition[prevComposition.length - 1]
      if (
        prevCompositionLastItem &&
        isRelationalVerb(prevCompositionLastItem)
      ) {
        composition.unshift(prevComposition.pop())
      }
      prevCompositionLastItem = prevComposition[prevComposition.length - 1]
      if (
        prevCompositionLastItem &&
        isRelationalVerb(prevCompositionLastItem)
      ) {
        composition.unshift(prevComposition.pop())
      }
      // 動詞始まりで、一つ前が名詞でかつ、先頭に来ても不思議ではない品詞だった場合、取り除き結合する。
    } else if (
      composition.length === 0 &&
      item.pos === '動詞' &&
      prevCompositionLastItem &&
      prevCompositionLastItem.pos === '名詞' &&
      !isWeirdAtTheFront(prevCompositionLastItem)
    ) {
      composition.push(prevComposition.pop(), item)
      // 今回が小数点でかつ、前回が数であった場合、取り除き結合する。
    } else if (
      item.surface_form === '.' &&
      prevCompositionLastItem &&
      prevCompositionLastItem.pos_detail_1 === '数'
    ) {
      composition.push(prevComposition.pop(), item)
      // それ以外は通常追加する。
    } else {
      composition.push(item)
    }
  })

  return compositions
    .reduce((result, item, index) => {
      const word = getWord(item)
      const nextComposition = compositions[index + 1]

      if (/・/.test(word)) {
        // ・の前に２文字以上の文字があるものを、・を含んで区切る
        // 本当は以下の正規表現（先読み）を使いたいが、Safariのみ対応していない。
        // const splitted = word.split(/(?<=[^・]{2,}・)/)
        // 参考: https://stackoverflow.com/questions/51568821/works-in-chrome-but-breaks-in-safari-invalid-regular-expression-invalid-group
        // 暫定対応として以下を使う。
        const splitted = word.split(/((?:[^・]{2,})・)/)

        result.push(...splitted)

        return result
        // １文字になっている単語は次のアイテムの先頭に結合させる。
      } else if (word.length === 1 && nextComposition) {
        nextComposition.unshift(...item)

        return result
        // 漢字＋ひらがな＋漢字＋ひらがなで、それぞれの漢字＋ひらがなが設定数以上あれば、分離する。
      } else if (
        word.match(漢字ひらがな漢字ひらがな) &&
        RegExp.$1.length + RegExp.$2.length >= judgeNum &&
        RegExp.$3.length + RegExp.$4.length >= judgeNum
      ) {
        result.push(RegExp.$1 + RegExp.$2, RegExp.$3 + RegExp.$4)

        return result
      } else {
        result.push(word)

        return result
      }
    }, [])
    .filter(item => item)
}
