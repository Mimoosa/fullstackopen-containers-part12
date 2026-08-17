import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./testSetup.js",
  },
  server: {
    allowedHosts: ["app", "localhost"],
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
