import { defineConfig } from "vite";
import svelte from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  root: resolve(__dirname, "chrome-extension"),
  publicDir: "no-public-dir",
  build: {
    target: "es2018",
    outDir: "dist/tab",
  },
});
