import { writable, derived } from 'svelte/store'

export const name = writable('world')

export const word = derived(name, $name => `Hello ${$name}!`)
