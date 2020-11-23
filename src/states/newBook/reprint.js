import { get, writable } from 'svelte/store'
import { encode } from '@msgpack/msgpack'
import * as ipfs from '../../databases/ipfs'
import * as db from '../../databases/dexie'

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
    title: get(title),
    url: get(url),
    license: get(license).value,
    content: get(content),
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
    console.error(error)
    alert(error)
  }
}
