import { default as App } from "./content/App.svelte";
import {
  isNotReady,
  compositions,
  stepBackward,
  appVisible,
} from "./content/state";

/** @type {import("svelte").SvelteComponent} */
var APP_ID = "svelte-shield-chrome-extension-app-1234567890abcde";

chrome.storage.onChanged.addListener(function (changes) {
  if (changes.isNotReady) {
    isNotReady.set(changes.isNotReady.newValue);
  }

  if (changes.compositions) {
    compositions.set(changes.compositions.newValue);
    stepBackward();
    appVisible.set(true);
  }
});

function mount() {
  document.body.insertAdjacentHTML(
    "afterend",
    `<div id="${APP_ID}" translate="no"></div>`,
  );

  const element = document.getElementById(APP_ID);

  const app = new App({
    target: element,
    props: {
      exit() {
        app.$destroy();
        element.remove();
      },
    },
  });
}

async function start() {
  const elementApp = document.getElementById(APP_ID);

  if (!elementApp) {
    mount();
  }
}

start();
