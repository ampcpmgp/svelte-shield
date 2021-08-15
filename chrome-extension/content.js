import { default as App } from "./content/App.svelte";
import {
  isNotReady,
  compositions,
  stepBackward,
  appVisible,
  stop,
  objectState,
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
  const target = document.createElement("div");
  target.id = APP_ID;
  target.setAttribute("translate", "no");
  const root = target.attachShadow({ mode: "open" });

  const app = new App({
    target: root,
    props: {
      exit() {
        objectState.executionState = { isStop: false };
        stop();
        app.$destroy();
        target.remove();
      },
    },
  });

  document.body.append(target);
}

async function start() {
  const elementApp = document.getElementById(APP_ID);

  if (!elementApp) {
    mount();
  }
}

start();
