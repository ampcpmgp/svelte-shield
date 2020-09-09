import kuromoji from 'kuromoji'
import { get, writable } from 'svelte/store'
import sleep from '../utils/sleep'

export const word = writable('　')
export const isLoading = writable(true)
export const isPlay = writable(false)
export const errorMsg = writable('')
export const rawText = writable('')
export const settings = writable({
  intervalMs: 300,
})
// モック用
export const ignoreReading = writable(false)

const initP = init()

async function init() {
  // 初期描画が終わったあとに辞書データを読み込む。
  await sleep(0)

  return new Promise((resolve, reject) => {
    kuromoji
      .builder({ dicPath: 'https://unpkg.com/kuromoji@0.1.2/dict/' })
      .build(function(err, tokenizer) {
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
  console.table(path)

  for (const item of path) {
    if (!get(isPlay)) {
      word.set('　')
      return
    }

    word.set(item.surface_form)
    await sleep(get(settings).intervalMs)
  }
}
