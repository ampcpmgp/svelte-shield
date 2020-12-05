import { writable } from 'svelte/store'
import { decode } from '@msgpack/msgpack'
import * as ipfs from '../databases/ipfs'
import * as db from '../databases/dexie'

// { hash, title, insertedDate }
export const loadedBooks = writable([])

const limit = 30

export function init() {
  loadedBooks.set([])
}

export async function loadBooks(offset) {
  const books = await db.getBooks(offset, limit)

  // ipfs.get 時に Peer が見つからない可能性があるため、ひとまず並列化しない
  books.forEach(async bookOnDb => {
    const rawData = await ipfs.get(bookOnDb.hash)
    const bookOnIpfs = decode(rawData)

    loadedBooks.update($loadedBooks => [
      ...$loadedBooks,
      {
        hash: bookOnDb.hash,
        title: bookOnIpfs.title,
        insertedDate: bookOnDb.insertedDate,
      },
    ])
  })
}
