import { writable } from "svelte/store";

export const item = writable({
  word: "",
  info: { isHeading: false, hasNewLine: false },
});
