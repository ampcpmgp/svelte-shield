import { get } from "svelte/store";
import kuromoji from "kuromoji/build/kuromoji";
import {
  init,
  rawText,
  tokenize,
  play,
  resume,
  pause,
  stop,
  currentIndex,
  compositions,
  isPause,
  isPlay,
  progress,
  currentReadingTime,
  getSleepTime,
} from "../src/states/morpheme";
import { msToTime } from "../src/utils/time";

/** @type {string} */
var tabId = "";

/** @type {import("@types/chrome")} */
chrome;

// kuromoji.js の XMLHttpRequest が background では使えないため、ハック的に解決
// https://github.com/takuyaa/kuromoji.js/blob/71ea8473bd119546977f22c61e4d52da28ac30a6/src/loader/BrowserDictionaryLoader.js
globalThis.XMLHttpRequest = function () {
  this.open = (method, url) => {
    this.url = url;
  };
  this.send = async () => {
    try {
      const response = await fetch(this.url);
      this.response = await response.arrayBuffer();
      this.status = 200;

      this.onload();
    } catch (error) {
      this.onerror(error);
    }
  };
};

globalThis.kuromoji = kuromoji;
globalThis.localStorage = {
  intervalMsPerChar: 80,
};
chrome.storage.sync.get("intervalMsPerChar", (result) => {
  if (result.intervalMsPerChar) {
    globalThis.localStorage.intervalMsPerChar = result.intervalMsPerChar;
  }
});

// svelte store subscribe
currentIndex.subscribe(sendWordToTab);
compositions.subscribe(sendWordToTab);
isPlay.subscribe((isPlay) => sendDataToTab({ isPlay }));
isPause.subscribe((isPause) => sendDataToTab({ isPause }));
progress.subscribe((progress) => sendDataToTab({ progress }));
currentReadingTime.subscribe((currentReadingTime) =>
  sendDataToTab({ currentReadingTime }),
);

// 以下エラーの対策
// Unchecked runtime.lastError: Cannot create item with duplicate id open-svelte-shield
// https://stackoverflow.com/questions/37000136/check-if-item-is-already-in-the-context-menu
chrome.contextMenus.removeAll(function () {
  chrome.contextMenus.create({
    id: "open-svelte-shield",
    title: "Svelte Shield で読む",
    type: "normal",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async function (info, tab) {
  if (info.menuItemId === "open-svelte-shield") {
    tabId = tab.id;

    sendDataToTab({ isNotReady: true });
    stop();
    await execute(tabId);
    rawText.set(info.selectionText);
    await init();
    await tokenize();
    sendDataToTab({ isNotReady: false });
  }
});

// message event from content.js
chrome.runtime.onMessage.addListener(async function (request, _, sendResponse) {
  control(request.controlType);

  // https://blog.dand.work/article/381
  sendResponse({});
  return true;
});

// chrome watch cache
chrome.storage.onChanged.addListener(function (changes) {
  if (changes.intervalMsPerChar) {
    globalThis.localStorage.intervalMsPerChar =
      changes.intervalMsPerChar.newValue ||
      globalThis.localStorage.intervalMsPerChar;
  }
});

function execute(tabId) {
  return new Promise((resolve) => {
    chrome.scripting.executeScript(
      {
        target: { tabId },
        files: ["content/content.umd.js"],
      },
      resolve,
    );
  });
}

async function control(type) {
  switch (type) {
    case "play":
      await play();
      return;
    case "resume":
      await resume();
      return;
    case "pause":
      return pause();
    case "stop":
      return stop();
    default:
      break;
  }
}

function sendWordToTab() {
  const $compositions = get(compositions);
  const $currentIndex = get(currentIndex);
  const item = $compositions[$currentIndex];
  const playingTimeMs = $compositions.reduce(
    (ms, item) =>
      ms + getSleepTime(item, globalThis.localStorage.intervalMsPerChar),
    0,
  );

  if (item) {
    sendDataToTab({ item });
  }

  if (playingTimeMs) {
    const playingTimeMsStr = msToTime(playingTimeMs);
    sendDataToTab({ playingTimeMsStr });
  }
}

function sendDataToTab(data) {
  if (tabId) {
    chrome.tabs.sendMessage(tabId, data);
  }
}
