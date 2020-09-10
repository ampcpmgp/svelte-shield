import settingsDefault from '../const/settingsDefault'

init()

function init() {
  if (!localStorage.intervalMs) {
    localStorage.intervalMs = settingsDefault.intervalMs
  }
}

export function saveIntervalMs(ms) {
  localStorage.intervalMs = ms
}
