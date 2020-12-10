import { writable } from 'svelte/store'
import settingsDefault from '../const/settingsDefault'

export const intervalMsPerChar = writable(
  Number(localStorage.intervalMsPerChar) || settingsDefault.intervalMsPerChar
)

export function saveIntervalMsPerChar(ms) {
  localStorage.intervalMsPerChar = ms
  intervalMsPerChar.set(ms)
}
