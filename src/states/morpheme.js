import kuromoji from 'kuromoji'
import { get, writable } from 'svelte/store'
import sleep from '../utils/sleep'

export const word = writable('')
export const info = writable({
  isHeading: false,
})
export const isLoading = writable(true)
export const isPlay = writable(false)
export const errorMsg = writable('')
export const rawText = writable('')
export const hiddenSettings = writable({
  judgeNum: 3,
})
// モック用
export const ignoreReading = writable(false)

export const 漢字ひらがな漢字ひらがな = /^([\u30e0-\u9fcf]+)([\u3040-\u309f]+)([\u30e0-\u9fcf]+)([\u3040-\u309f]+)$/
export const カタカナ = /([ァ-ヶー]+)/

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
  const intervalMsPerChar = localStorage.intervalMsPerChar

  for (const composition of composite(path)) {
    if (!get(isPlay)) {
      word.set('')
      return
    }

    word.set(composition.word)
    info.set(composition.info)

    await sleep(
      composition.word.length * intervalMsPerChar || intervalMsPerChar * 3
    )
  }

  isPlay.set(false)
}

export function getWord(composition) {
  return composition.reduce((str, path) => str + path.surface_form, '')
}

export function initComposition(compositions, index) {
  if (!compositions[index]) {
    compositions.push([])
  }
}

export function isPunctuation(item) {
  return isJapanesePeriod(item) || item.pos_detail_1 === '読点'
}

export function isJapanesePeriod(item) {
  return item.pos_detail_1 === '句点' || /。/.test(item.surface_form)
}

export function isRelationalNoun(item) {
  return (
    item.pos === '名詞' ||
    hasStrongConnectionNoun(item) ||
    isOnlyKanji(item.surface_form)
  )
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
  // 今回の結果が数で、前回の結果が小数点だった場合は、先頭に来ないものとして扱う
  const isConnectableNum =
    item.pos_detail_1 === '数' && lastItem && lastItem.surface_form === '.'

  return (
    isPunctuation(item) ||
    item.pos === '助詞' ||
    item.pos === '助動詞' ||
    item.pos_detail_1 === '括弧閉' ||
    item.pos_detail_1 === '接尾' ||
    item.surface_form === ')' ||
    item.surface_form === ']' ||
    item.surface_form === '？' ||
    item.surface_form === '！' ||
    item.surface_form === '・' ||
    item.surface_form === '：' ||
    isConnectableNum
  )
}

// 繰り上げ文字判定
export function isLastWord(item) {
  return isPunctuation(item) || /\n/.test(item.surface_form)
}

export function isOnlyKanji(surface_form) {
  return /^[々〇〻\u3400-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]+$/.test(
    surface_form
  )
}

export function composite(path) {
  const compositions = []
  let currentIndex = 0
  const { judgeNum } = get(hiddenSettings)

  path.forEach((item, index) => {
    // 初期化
    initComposition(compositions, currentIndex)
    let composition = compositions[currentIndex]
    let currentCompositionLastItem = composition[composition.length - 1]
    const word = getWord(composition)
    const nextItem = path[index + 1]

    // 改行は前後を繰り上げて、他の判定条件を受けない
    if (/\n/.test(item.surface_form)) {
      ++currentIndex
      initComposition(compositions, currentIndex)
      composition = compositions[currentIndex]
      composition.push(item)
      ++currentIndex

      return
      // 前回が句読点であれば繰り上げて他の判定条件を受けない
    } else if (
      currentCompositionLastItem &&
      isPunctuation(currentCompositionLastItem)
    ) {
      ++currentIndex
      initComposition(compositions, currentIndex)
      composition = compositions[currentIndex]
      composition.push(item)

      return
    }

    // 事前折り返し判定。
    // 漢字が続けば折り返し判定を行わない。
    if (
      currentCompositionLastItem &&
      isRelationalNoun(currentCompositionLastItem) &&
      isRelationalNoun(item)
    ) {
      void 0

      // 先頭に来てしまうと表示がおかしく見えるもの（句読点・助詞など）は、折り返し判定を行わない。
    } else if (
      currentCompositionLastItem &&
      isWeirdAtTheFront(item, currentCompositionLastItem)
    ) {
      void 0

      // 「～～なの」、と続くものは、「な」は助動詞、「の」は名詞と判定され先頭に回るとおかしく表示されるため、折り返し判定を行わない。
    } else if (
      currentCompositionLastItem &&
      currentCompositionLastItem.pos === '助動詞' &&
      currentCompositionLastItem.surface_form === 'な' &&
      item.surface_form === 'の' &&
      item.pos === '名詞'
    ) {
      void 0

      // 今回が名詞で、一つ前が名詞と強く関連のある品詞であれば、折り返し判定を行わない。
    } else if (
      item.pos === '名詞' &&
      currentCompositionLastItem &&
      hasStrongConnectionNoun(currentCompositionLastItem)
    ) {
      void 0

      // 今回が動詞で、一つ前が名詞だった場合、折り返し判定を行わない。
    } else if (
      item.pos === '動詞' &&
      currentCompositionLastItem &&
      currentCompositionLastItem.pos === '名詞'
    ) {
      void 0

      // 今回が小数点でかつ、前回が数であった場合、折り返し判定を行わない。
    } else if (
      item.surface_form === '.' &&
      currentCompositionLastItem &&
      currentCompositionLastItem.pos_detail_1 === '数'
    ) {
      void 0

      // 設定した判定数を超えたら、繰り上げる。
    } else if (word.length > judgeNum) {
      ++currentIndex

      // 名詞関連以外（前回）＋名詞（今回）＋名詞（次回）の場合、名詞＋名詞を結合させるため、繰り上げる。
    } else if (
      currentCompositionLastItem &&
      !isRelationalNoun(currentCompositionLastItem) &&
      item.pos === '名詞' &&
      nextItem &&
      nextItem.pos === '名詞'
    ) {
      ++currentIndex
    }

    // 事前折り返し判定により再初期化
    initComposition(compositions, currentIndex)
    composition = compositions[currentIndex]

    composition.push(item)
  })

  return (
    compositions
      // 見出し強調情報
      .reduce(
        (blocks, item) => {
          const existsNewLine = !item.every(
            item => !/\n/.test(item.surface_form)
          )

          if (existsNewLine) {
            blocks.push([item])
          } else {
            blocks[blocks.length - 1].push(item)
          }

          return blocks
        },
        [[]]
      )
      .map(blocks => {
        // 見出し判定は句点が存在するかどうか。
        const isHeading = blocks.every(blockItem =>
          blockItem.every(item => !isJapanesePeriod(item))
        )

        return blocks.map(item => ({
          item,
          info: {
            isHeading,
          },
        }))
      })
      .flat()
      .reduce((result, { item, info }, index) => {
        const word = getWord(item)
        const trimmedWord = word.trim()
        const currentCompositionFirstItem = item[0]
        const prevComposition = compositions[index - 1]
        const prevCompositionLastItem =
          prevComposition && prevComposition[prevComposition.length - 1]
        const nextComposition = compositions[index + 1]

        // 改行は判定条件に加えず直接格納する。
        if (/\n/.test(word)) {
          result.push({ word, info })

          return result
          // trim して3文字未満になり、名詞関連であり、次のアイテムが改行文字で無ければ、次のアイテムの先頭に結合させる。
        } else if (
          trimmedWord.length < 3 &&
          currentCompositionFirstItem &&
          isRelationalNoun(currentCompositionFirstItem) &&
          nextComposition &&
          !/\n/.test(getWord(nextComposition))
        ) {
          nextComposition.unshift(...item)

          return result
          // trim して3文字未満になり、前のアイテムが最終文字で無ければ、前の文字に結合させる。
        } else if (
          trimmedWord.length < 3 &&
          prevComposition &&
          !isLastWord(prevCompositionLastItem)
        ) {
          const lastItem = result[result.length - 1]
          lastItem.word += word

          return result
          // 上記二つの if 文にマッチしなければ、次が改行でなければ結合させる。
        } else if (
          trimmedWord.length < 3 &&
          nextComposition &&
          !/\n/.test(getWord(nextComposition))
        ) {
          nextComposition.unshift(...item)

          return result
        } else {
          result.push({ word, info })

          return result
        }
      }, [])
      // 文字の再配置などで完全に空白になったものを除去
      .filter(item => item.word)
      // 前後の空白や改行を trim する。改行は空白として扱う。
      .map(item => ({ ...item, word: item.word.trim() }))
  )
}
