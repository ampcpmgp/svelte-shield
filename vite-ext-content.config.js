import { defineConfig } from "vite";
import svelte from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  publicDir: "no-public-dir",
  build: {
    target: "es2018",
    outDir: "chrome-extension/dist/content",
    lib: {
      formats: ["cjs"],
      entry: resolve(__dirname, "chrome-extension/content.js"),
      fileName: "content",
    },
  },
});
