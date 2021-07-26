import { writable } from "svelte/store";
export {
  isPlay,
  isPause,
  progress,
  currentReadingTime,
  currentIndex,
  compositions,
  getPlayingTimeMs,
  getPlayingTimeMsStr,
  play,
  pause,
  resume,
  stepBackward,
  stop,
  word,
  info,
  setWordInfo,
  mode,
} from "../../src/states/morpheme";

export const isNotReady = writable(true);
export const isSaving = writable(false);
export const intervalMsPerChar = writable(80);
export const readingSpeed = writable(1.0);
export const appVisible = writable(true);
/** 📝 | 🔊 */
export const playingMode = writable("📝");

export const objectState = { executionState: { isStop: false } };
