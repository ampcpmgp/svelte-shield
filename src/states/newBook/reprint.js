import { get, writable } from 'svelte/store'
import { encode } from '@msgpack/msgpack'
import * as ipfs from '../../databases/ipfs'
import * as dexie from '../../databases/dexie'
import { default as BookType } from '../../const/BookType'

export const title = writable('')
export const url = writable('')
export const license = writable(undefined)
export const content = writable('')

export function reset() {
  title.set('')
  url.set('')
  license.set(undefined)
  content.set('')
}

export async function save() {
  const data = {
    bookType: BookType.REPRINT,
    title: get(title),
    url: get(url),
    license: get(license).value,
    content: get(content),
  }

  const encodedData = encode(data)
  const results = await ipfs.add(encodedData)

  const { path } = results

  const isExistsInDb = await dexie.existsBook(path)

  if (!isExistsInDb) {
    await dexie.setbook({
      hash: path,
      readingRatio: 0,
      insertedDate: new Date(),
    })
  }

  reset()

  return results
}
