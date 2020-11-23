import { get, writable } from 'svelte/store'
import { add } from '../../databases/ipfs'

export const title = writable('')
export const content = writable('')

export function reset() {
  title.set('')
  content.set('')
}

export async function save() {
  const data = {
    title: get(title),
    content: get(content),
  }

  try {
    const results = await add(JSON.stringify(data))
    reset()

    return results
  } catch (error) {
    alert(error)
    console.error(error)
  }
}
