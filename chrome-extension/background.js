import kuromoji from "kuromoji/build/kuromoji";
import {
  init,
  rawText,
  tokenize,
  stop,
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

// svelte store subscribe
compositions.subscribe((compositions) => sendDataToTab({ compositions }));

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

function sendDataToTab(data) {
  if (tabId) {
    chrome.tabs.sendMessage(tabId, data);
  }
}
