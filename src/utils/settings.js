import settingsDefault from '../const/settingsDefault'

init()

function init() {
  if (!localStorage.intervalMsPerChar) {
    localStorage.intervalMsPerChar = settingsDefault.intervalMsPerChar
  }
}

export function saveIntervalMsPerChar(ms) {
  localStorage.intervalMsPerChar = ms
}
