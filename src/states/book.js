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

export async function fetch(hash) {
  const encodedBook = await ipfs.get(hash)
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
}
