import kuromoji from 'kuromoji'
import { get, writable } from 'svelte/store'

export const word = writable('　')
export const isLoading = writable(true)
export const errorMsg = writable('')
// モック用
export const ignoreReading = writable(false)

export function init() {
  kuromoji
    .builder({ dicPath: 'https://unpkg.com/kuromoji@0.1.2/dict/' })
    .build(function(err, tokenizer) {
      if (get(ignoreReading)) {
        return
      }

      if (err) {
        isLoading.set(false)
        errorMsg.set('辞書取得エラー')
        return
      }

      // tokenizer is ready
      var path = tokenizer.tokenize('すもももももももものうち')
      console.log(path)
      isLoading.set(false)
    })
}
