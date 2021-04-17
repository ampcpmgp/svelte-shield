import "modern-css-reset/dist/reset.min.css";
import "../src/css/neumorphism.css";
import "../src/css/neumorphism-extends.css";
import "../src/css/neumorphism-dark-mode.css";
import "../src/main.css";
import "bootstrap/dist/js/bootstrap.js";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "gray",
    values: [
      { name: "gray", value: "gray" },
      { name: "lightgreen", value: "lightgreen" },
    ],
  },
};
