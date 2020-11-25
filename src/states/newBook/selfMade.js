import { get, writable } from 'svelte/store'
import { encode } from '@msgpack/msgpack'
import * as ipfs from '../../databases/ipfs'
import * as db from '../../databases/dexie'

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
    title: get(title),
    content: get(content),
    sources: get(sources),
  }

  try {
    const encodedData = encode(data)
    const results = await ipfs.add(encodedData)

    const { path } = results

    const isExistsDb = await db.existsbook(path)

    if (!isExistsDb)
      await db.setbook({
        hash: path,
        ...data,
      })

    reset()

    return results
  } catch (error) {
    alert(error)
    console.error(error)
  }
}
