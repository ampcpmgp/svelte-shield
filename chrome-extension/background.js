import { get } from "svelte/store";
import kuromoji from "kuromoji/build/kuromoji";
import {
  init,
  rawText,
  tokenize,
  play,
  pause,
  stop,
  currentIndex,
  compositions,
} from "../src/states/morpheme";

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

// svelte store subscribe
currentIndex.subscribe(sendWordToTab);
compositions.subscribe(sendWordToTab);

chrome.contextMenus.create({
  id: "open-svelte-shield",
  title: "Svelte Shield で読む",
  type: "normal",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(async function (info, tab) {
  if (info.menuItemId === "open-svelte-shield") {
    tabId = tab.id;

    await execute(tabId);
    chrome.tabs.sendMessage(tabId, { status: "reading dictionary" });
    rawText.set(info.selectionText);

    await init();
    await tokenize();
    stop();
    await play();
  }
});

// message event from content.js
chrome.runtime.onMessage.addListener(async function (request) {
  control(request.controlType);
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
      return await play();
    case "pause":
      return pause();
    case "stop":
      return stop();
    default:
      break;
  }
}

function sendWordToTab() {
  const item = get(compositions)[get(currentIndex)];

  if (item) {
    chrome.tabs.sendMessage(tabId, { item });
  }
}
