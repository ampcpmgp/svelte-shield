import { writable } from "svelte/store";
import settingsDefault from "../const/settingsDefault";

localStorage.intervalMsPerChar =
  localStorage.intervalMsPerChar || settingsDefault.intervalMsPerChar;
localStorage.textSize = localStorage.textSize || settingsDefault.textSize;
localStorage.speechRate = localStorage.speechRate || settingsDefault.speechRate;

export const intervalMsPerChar = writable(
  Number(localStorage.intervalMsPerChar),
);

export const textSize = writable(Number(localStorage.textSize));
export const speechRate = writable(Number(localStorage.speechRate));

export function saveIntervalMsPerChar(ms) {
  localStorage.intervalMsPerChar = ms;
  intervalMsPerChar.set(ms);
}

export function saveTextSize(size) {
  localStorage.textSize = size;
  textSize.set(size);
}

export function saveSpeechRate(rate) {
  localStorage.speechRate = rate;
  speechRate.set(rate);
}
