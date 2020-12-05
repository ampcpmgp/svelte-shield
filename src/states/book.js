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
export const errMessage = writable('')

export function init() {
  bookType.set()
  title.set('')
  url.set('')
  license.set()
  sources.set([])
  morpheme.rawText.set('')

  isFetching.set(false)
  errMessage.set('')
}

export async function fetch(hash) {
  isFetching.set(true)

  let encodedBook

  try {
    encodedBook = await ipfs.get(hash)
  } catch (error) {
    isFetching.set(false)
    errMessage.set('Peer 検索時、タイムアウトエラー')

    throw new Error(error)
  }

  const book = decode(encodedBook)
  const isExistsInDb = await dexie.existsbook(hash)

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
