import { writable } from "svelte/store";
import {
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
} from "../../src/states/morpheme";

export const isNotReady = writable(true);
export const isSaving = writable(false);
export const intervalMsPerChar = writable(80);
export const appVisible = writable(true);

export const objectState = { executionState: { isStop: false } };

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
  stop,
  pause,
  resume,
  stepBackward,
  word,
  info,
  setWordInfo,
};
