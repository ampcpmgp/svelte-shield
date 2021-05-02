import { default as App } from "./content/App.svelte";
import { isNotReady, compositions } from "./content/state";

/** @type {import("svelte").SvelteComponent} */
var APP_ID = "svelte-shield-chrome-extension-app-1234567890abcde";

function init() {
  chrome.runtime.onMessage.addListener(onMessage);
}

function onMessage(request, _, sendResponse) {
  if (typeof request.isNotReady === "boolean") {
    isNotReady.set(request.isNotReady);
  }

  if (request.compositions) {
    compositions.set(request.compositions);
  }

  // 以下エラーの対策
  // Unchecked runtime.lastError: The message port closed before a response was received.
  // 参考: https://blog.dand.work/article/381
  sendResponse({});
  return true;
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
