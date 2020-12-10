import { writable } from 'svelte/store'
import settingsDefault from '../const/settingsDefault'

localStorage.intervalMsPerChar =
  localStorage.intervalMsPerChar || settingsDefault.intervalMsPerChar

export const intervalMsPerChar = writable(
  Number(localStorage.intervalMsPerChar)
)

export function saveIntervalMsPerChar(ms) {
  localStorage.intervalMsPerChar = ms
  intervalMsPerChar.set(ms)
}
