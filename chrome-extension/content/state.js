import { writable } from "svelte/store";

export const item = writable({
  word: "",
  info: { isHeading: false, hasNewLine: false },
});

export const isPlay = writable(false);
export const isPause = writable(false);
export const isNotReady = writable(true);
