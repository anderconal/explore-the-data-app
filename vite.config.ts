/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://anderconal.github.io/explore-the-data-app/",
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./tests/setup.ts", "reflect-metadata"],
    coverage: {
      provider: "v8",
      reporter: ["cobertura"],
    },
  },
});
