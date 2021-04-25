import { defineConfig } from "vite";
import svelte from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  publicDir: "chrome-extension/public",
  build: {
    target: "es2018",
    outDir: "chrome-extension/dist",
    lib: {
      formats: ["umd"],
      entry: resolve(__dirname, "chrome-extension/background.js"),
      name: "svelteShield",
      fileName: "background",
    },
  },
});
