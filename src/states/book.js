import { writable } from 'svelte/store'
import { decode } from '@msgpack/msgpack'
import * as ipfs from '../databases/ipfs'
import * as dexie from '../databases/dexie'
import * as morpheme from './morpheme'

export const bookType = writable()
export const title = writable('')
export const url = writable('')
export const license = writable()
// { value: URL }
export const sources = writable([])
export const isFetching = writable(false)
export const errorMsg = writable('')

export function init() {
  bookType.set()
  title.set('')
  url.set('')
  license.set()
  sources.set([])
  morpheme.rawText.set('')

  isFetching.set(false)
  errorMsg.set('')
}

export async function fetch(hash) {
  isFetching.set(true)

  let encodedBook

  try {
    encodedBook = await ipfs.get(hash)
  } catch (error) {
    isFetching.set(false)

    if (error.message === 'multihash unknown function code: 0x3e') {
      errorMsg.set('不明なハッシュです')
    } else if (error.message === 'request timed out') {
      errorMsg.set('Peer 探索タイムアウト')
    } else {
      errorMsg.set('不明なエラーです')
    }

    throw new Error(error)
  }

  ipfs.addPin(hash)

  const book = decode(encodedBook)
  const isExistsInDb = await dexie.existsBook(hash)

  if (!isExistsInDb) {
    await dexie.setbook({
      hash,
      readingRatio: 0,
      insertedDate: new Date(),
    })
  }

  bookType.set(book.bookType)
  title.set(book.title)
  url.set(book.url)
  license.set(book.license)
  sources.set(book.sources)
  morpheme.rawText.set(book.content)

  isFetching.set(false)
}
