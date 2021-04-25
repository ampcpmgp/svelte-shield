import { default as App } from "./content/App.svelte";
import { item } from "./content/state";

/** @type {import("svelte").SvelteComponent} */
var ELEMENT_ID = "svelte-shield-chrome-extension-app-1234567890abcde";

function init() {
  chrome.runtime.onMessage.addListener(function (request) {
    if (request.item) {
      item.set(request.item);
    }
  });
}

function mount() {
  document.body.insertAdjacentHTML(
    "afterend",
    `<div id="${ELEMENT_ID}"></div>`,
  );

  const element = document.getElementById(ELEMENT_ID);

  new App({
    target: element,
    props: {
      removeApp() {
        chrome.runtime.sendMessage({ controlType: "stop" });
        element.remove();
      },
    },
  });
}

async function start() {
  const element = document.getElementById(ELEMENT_ID);

  if (!element) {
    mount();
  }
}

init();
start();
