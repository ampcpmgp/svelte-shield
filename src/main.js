import "modern-css-reset/dist/reset.min.css";
import "./css/neumorphism.css";
import "./css/neumorphism-extends.css";
import "./css/neumorphism-dark-mode.css";
import "./main.css";
import "bootstrap/dist/js/bootstrap.js";
import App from "./components/App.svelte";

new App({
  target: document.getElementById("app"),
});
