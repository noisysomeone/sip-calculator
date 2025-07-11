import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  vite: {
    build: {
      rollupOptions: {
        external: ["chart.js"],
      },
    },
  },
});
