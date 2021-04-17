import { defineConfig } from "vite";
import svelte from "@sveltejs/vite-plugin-svelte";
import yaml from "@rollup/plugin-yaml";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), yaml()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        patterns: resolve(__dirname, "mock/testbed/index.html"),
        mock: resolve(__dirname, "mock/testbed/mock.html"),
      },
    },
  },
  server: {
    open: "/mock/testbed/index.html",
  },
});
