import { default as App } from "./content/App.svelte";
import {
  item,
  isPlay,
  isPause,
  isNotReady,
  progress,
  currentReadingTime,
  playingTimeMsStr,
} from "./content/state";

/** @type {import("svelte").SvelteComponent} */
var APP_ID = "svelte-shield-chrome-extension-app-1234567890abcde";

function init() {
  chrome.runtime.onMessage.addListener(onMessage);
}

function onMessage(request) {
  if (request.item) {
    item.set(request.item);
  }

  if (typeof request.isNotReady === "boolean") {
    isNotReady.set(request.isNotReady);
  }

  if (typeof request.isPlay === "boolean") {
    isPlay.set(request.isPlay);
  }

  if (typeof request.isPause === "boolean") {
    isPause.set(request.isPause);
  }

  if (typeof request.progress === "number") {
    progress.set(request.progress);
  }

  if (typeof request.currentReadingTime === "number") {
    currentReadingTime.set(request.currentReadingTime);
  }

  if (request.playingTimeMsStr) {
    playingTimeMsStr.set(request.playingTimeMsStr);
  }
}

function mount() {
  document.body.insertAdjacentHTML("afterend", `<div id="${APP_ID}"></div>`);

  const element = document.getElementById(APP_ID);

  const app = new App({
    target: element,
    props: {
      exit() {
        chrome.runtime.sendMessage({ controlType: "stop" });
        chrome.runtime.onMessage.removeListener(onMessage);
        app.$destroy();
        element.remove();
      },
    },
  });
}

async function start() {
  const elementApp = document.getElementById(APP_ID);

  init();

  if (!elementApp) {
    mount();
  }
}

start();
