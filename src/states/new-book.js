import { get, writable } from 'svelte/store'
import { add } from '../databases/ipfs'

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

export async function saveByReprint() {
  const data = {
    title: get(title),
    url: get(url),
    license: get(license).value,
    content: get(content),
  }

  try {
    const results = await add(JSON.stringify(data))

    return results
  } catch (error) {
    alert(error)
    console.error(error)
  }
}
