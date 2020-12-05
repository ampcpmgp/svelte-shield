import { get, writable } from 'svelte/store'
import { encode } from '@msgpack/msgpack'
import * as ipfs from '../../databases/ipfs'
import * as dexie from '../../databases/dexie'
import { default as BookType } from '../../const/BookType'

export const title = writable('')
export const content = writable('')
// { value: URL }
export const sources = writable([])

export function addSource() {
  const $sources = get(sources)
  $sources.push({ value: '' })
  sources.set($sources)
}

export function removeSource(i) {
  const $sources = get(sources)
  $sources.splice(i, 1)
  sources.set($sources)
}

export function reset() {
  title.set('')
  content.set('')
  sources.set([])
}

export async function save() {
  const data = {
    bookType: BookType.SELF_MADE,
    title: get(title),
    content: get(content),
    sources: get(sources),
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
