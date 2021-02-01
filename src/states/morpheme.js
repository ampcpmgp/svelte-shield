import kuromoji from 'kuromoji'
import { get, writable, derived } from 'svelte/store'
import sleep from '../utils/sleep'

export const word = writable('')
export const info = writable({
  isHeading: false,
  hasNewLine: false,
})
export const isLoading = writable(true)
export const isPlay = writable(false)
export const isPause = writable(false)
export const currentIndex = writable(0)
export const currentReadingTime = writable(0)
export const errorMsg = writable('')
export const rawText = writable('')
export const compositions = writable([])
export const progress = derived(
  currentIndex,
  $currentIndex => $currentIndex / get(compositions).length || 0
)
export const hiddenSettings = writable({
  judgeNum: 3,
})
// モック用
export const ignoreReading = writable(false)

export const 漢字ひらがな漢字ひらがな = /^([\u30e0-\u9fcf]+)([\u3040-\u309f]+)([\u30e0-\u9fcf]+)([\u3040-\u309f]+)$/
export const カタカナ = /([ァ-ヶー]+)/

// 括弧内や見出しなどをひとまとめに出来る最大インデックス数。
const MAX_MERGABLE_INDEX = 30

let tokenizer

async function getTokenizer() {
  if (tokenizer) return tokenizer
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

export async function init() {
  tokenizer = await getTokenizer()
}

export async function tokenize() {
  const tokenizer = await getTokenizer()

  const path = tokenizer.tokenize(get(rawText))
  compositions.set(composite(path))
}

export async function play() {
  stop()
  await tokenize()
  resume()
}

export function getSleepTime(composition, intervalMsPerChar) {
  const wordTime = composition.word.length * intervalMsPerChar
  const newLineTime = composition.info.hasNewLine ? intervalMsPerChar : 0

  return wordTime + newLineTime
}

export async function resume() {
  isPlay.set(true)
  isPause.set(false)
  const intervalMsPerChar = localStorage.intervalMsPerChar
  const playingCompositions = get(compositions).slice(get(currentIndex))

  for (const composition of playingCompositions) {
    setWordInfo()

    const sleepTime = getSleepTime(composition, intervalMsPerChar)

    await sleep(sleepTime)

    if (!get(isPlay)) {
      word.set('')
      currentIndex.set(0)
      return
    }

    if (get(isPause)) {
      return
    }

    currentIndex.update($index => ++$index)
  }

  isPlay.set(false)
}

export function stop() {
  isPlay.set(false)
  isPause.set(false)
  word.set('')
  compositions.set([])
  currentIndex.set(0)
}

export function pause() {
  isPause.set(true)
}

export function stepBackward() {
  currentIndex.set(0)
  setWordInfo()
}

export function setWordInfo() {
  const composition = get(compositions)[get(currentIndex)]

  if (composition) {
    const readingTime = getSleepTime(
      composition,
      localStorage.intervalMsPerChar
    )

    word.set(composition.word)
    info.set(composition.info)
    currentReadingTime.set(readingTime)
  }
}

export function setReadingPosition(readingRatio) {
  const $compositions = get(compositions)
  const index = Math.round($compositions.length * readingRatio)

  currentIndex.set(index)
  setWordInfo()
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
  if (!item) return false

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

export function isWeirdAtTheLast(item) {
  return (
    item.pos_detail_1 === '括弧開' ||
    item.pos_detail_1 === '数' ||
    item.surface_form === '・' ||
    item.surface_form === '(' ||
    item.surface_form === '[' ||
    item.surface_form === '~' ||
    item.surface_form === '～' ||
    item.surface_form === '〜' ||
    item.surface_form === '-' ||
    item.surface_form === ' ' ||
    item.surface_form === '　'
  )
}

export function isWeirdAtTheFront(item, lastItem, nextItem) {
  // 今回の結果が数で、前回の結果が小数点記号などだった場合は、先頭に来ないものとして扱う
  const isConnectableNum =
    item.pos_detail_1 === '数' &&
    lastItem &&
    (lastItem.surface_form === '.' || lastItem.surface_form === ',')

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
    (item.pos_detail_1 === '空白' &&
      nextItem &&
      hasStartedParentheses(nextItem.surface_form)) ||
    isConnectableNum
  )
}

export function hasStartedParentheses(word) {
  return (
    word.indexOf('(') > -1 ||
    word.indexOf('（') > -1 ||
    word.indexOf('[') > -1 ||
    word.indexOf('「') > -1 ||
    word.indexOf('『') > -1
  )
}

export function hasEndedParentheses(word) {
  return (
    word.indexOf(')') > -1 ||
    word.indexOf('）') > -1 ||
    word.indexOf(']') > -1 ||
    word.indexOf('」') > -1 ||
    word.indexOf('』') > -1
  )
}

export function getCountParentheses(item) {
  return item.surface_form.split('').reduce((sum, word) => {
    if (hasStartedParentheses(word)) {
      return sum + 1
    }

    if (hasEndedParentheses(word)) {
      return sum - 1
    }

    return sum
  }, 0)
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

export function isValidClosure({ parenthesesNum, path, index }) {
  const maxIndex = index + MAX_MERGABLE_INDEX

  for (; index < maxIndex; index++) {
    const item = path[index]

    if (!item) return false

    parenthesesNum += getCountParentheses(item)

    if (parenthesesNum < 1) return true
  }

  return false
}

export function composite(path) {
  const compositions = []
  let currentIndex = 0
  const { judgeNum } = get(hiddenSettings)

  let parenthesesNum = 0

  path.forEach((item, index) => {
    // 初期化
    initComposition(compositions, currentIndex)
    let composition = compositions[currentIndex]
    let currentCompositionLastItem = composition[composition.length - 1]
    const word = getWord(composition)
    const nextIndex = index + 1
    const nextItem = path[nextIndex]

    const prevParenthesesNum = parenthesesNum

    parenthesesNum += getCountParentheses(item)

    const isInClosure = parenthesesNum > 0
    const isItemValidClosure =
      isInClosure && isValidClosure({ parenthesesNum, path, index: nextIndex })
    const isFirstValidClosure = isItemValidClosure && prevParenthesesNum === 0

    // 閉じ括弧が先に来てしまう場合は0に戻す
    if (parenthesesNum < 0) {
      parenthesesNum = 0
    }

    // 有効ではないクロージャ内にいた場合、 parenthesesNum を 0 に戻す
    if (!isItemValidClosure && parenthesesNum > 0) {
      parenthesesNum = 0
    }

    // 括弧内にいてかつ、最初のクロージャで無ければ、事前繰り上げ条件の判定に入れない
    if (isItemValidClosure && !isFirstValidClosure) {
      void 0
    }
    // 改行は前後を繰り上げて、他の判定条件を受けない
    else if (/\n/.test(item.surface_form)) {
      ++currentIndex
      initComposition(compositions, currentIndex)
      composition = compositions[currentIndex]
      composition.push(item)
      ++currentIndex

      return
      // 前回が句読点でかつ、今回が括弧閉じで無ければ、繰り上げて他の判定条件を受けない
    } else if (
      currentCompositionLastItem &&
      isPunctuation(currentCompositionLastItem) &&
      !hasEndedParentheses(item.surface_form)
    ) {
      ++currentIndex
      initComposition(compositions, currentIndex)
      composition = compositions[currentIndex]
      composition.push(item)

      return
    }

    // 事前折り返し判定。

    // 括弧が始まった場合は折り返ししない
    if (isItemValidClosure) {
      void 0

      // 漢字が続けば折り返し判定を行わない。
    } else if (
      currentCompositionLastItem &&
      isRelationalNoun(currentCompositionLastItem) &&
      isRelationalNoun(item)
    ) {
      void 0

      // 先頭に来てしまうと表示がおかしく見えるもの（句読点・助詞など）は、折り返し判定を行わない。
    } else if (
      currentCompositionLastItem &&
      isWeirdAtTheFront(item, currentCompositionLastItem, nextItem)
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

      // 前回の文字が、折り返すと不自然であるものは文字は折り返さない
    } else if (
      currentCompositionLastItem &&
      isWeirdAtTheLast(currentCompositionLastItem)
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

  // test 時にハマれば中間確認。
  // console.log(compositions.map(item => item.map(i2 => i2.surface_form)))

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
      .map(items => {
        let blocks = items

        // 見出し判定は句点が存在するかどうか。
        const isHeading = blocks.every(blockItem =>
          blockItem.every(item => !isJapanesePeriod(item))
        )

        const blockSum = blocks.reduce((sum, item) => sum + item.length - 1, 0)

        if (isHeading && blockSum < MAX_MERGABLE_INDEX) {
          blocks = [blocks.flat()]
        }

        return blocks.map(item => ({
          item,
          info: {
            isHeading,
            hasNewLine: false,
          },
        }))
      })
      .flat()
      .reduce((result, { item, info }, index, compositions) => {
        const word = getWord(item)
        const trimmedWord = word.trim()
        const currentCompositionFirstItem = item[0]
        const prevComposition =
          compositions[index - 1] && compositions[index - 1].item
        const prevCompositionLastItem =
          prevComposition && prevComposition[prevComposition.length - 1]
        const nextComposition =
          compositions[index + 1] && compositions[index + 1].item

        // 改行は判定条件に加えず直接格納する。
        if (/\n/.test(word)) {
          result.push({ word, info })

          return result
          // trim して3文字以上であれば格納する。
        } else if (trimmedWord.length >= 3) {
          result.push({ word, info })

          return result

          // 名詞関連であり、次のアイテムが改行文字で無ければ、次のアイテムの先頭に結合させる。
        } else if (
          currentCompositionFirstItem &&
          isRelationalNoun(currentCompositionFirstItem) &&
          nextComposition &&
          !/\n/.test(getWord(nextComposition))
        ) {
          nextComposition.unshift(...item)
          return result
          // 前のアイテムが最終文字で無ければ、前の文字に結合させる。
        } else if (prevComposition && !isLastWord(prevCompositionLastItem)) {
          const lastItem = result[result.length - 1]
          lastItem.word += word

          return result
          // 次が改行でなければ結合させる。
        } else if (nextComposition && !/\n/.test(getWord(nextComposition))) {
          nextComposition.unshift(...item)

          return result
        } else {
          result.push({ word, info })

          return result
        }
      }, [])
      // 文字の再配置などで完全に空白になったものを除去
      .filter(item => item.word)
      // 前後の空白や改行を trim する。空白となったものは空文字にして、ひとつ前を改行表示とする。
      .map((item, index, results) => {
        const trimmed = item.word.trim()
        const startedNewLine = /^\n/.test(item.word)
        const prevItem = results[index - 1]

        if (startedNewLine && prevItem) {
          prevItem.info.hasNewLine = true
        }

        return { ...item, word: trimmed }
      })
      // 改行由来の空白文字も除去する
      .filter(item => item.word)
  )
}

function logCompositions(items) {
  console.log(items.map(item => item.surface_form))
}

void logCompositions
