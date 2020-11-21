import { writable } from 'svelte/store'

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
