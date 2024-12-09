import { defineConfig } from "vite";

import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
import vercel from "vite-plugin-vercel";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vercel(), react(), TanStackRouterVite()],
  envDir: path.resolve(__dirname, "../"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
