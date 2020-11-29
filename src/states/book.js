import { writable } from 'svelte/store'
import { decode } from '@msgpack/msgpack'
import * as ipfs from '../databases/ipfs'
import * as db from '../databases/dexie'

export const bookType = writable()
export const title = writable('')
export const content = writable('')
export const url = writable('')
export const license = writable()
export const sources = writable([])
export const isFetching = writable(false)
export const errMessage = writable('')

export function init() {
  bookType.set()
  title.set('')
  content.set('')
  url.set('')
  license.set()
  sources.set([])

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
  const isExistsInDb = await db.existsbook(hash)

  if (!isExistsInDb)
    await db.setbook({
      hash,
      readingRatio: 0,
      insertedDate: new Date(),
    })

  bookType.set(book.bookType)
  title.set(book.title)
  url.set(book.url)
  license.set(book.license)
  content.set(book.content)
  sources.set(book.sources)

  isFetching.set(false)
}
