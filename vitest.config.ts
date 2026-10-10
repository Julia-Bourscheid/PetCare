import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    // Enables the global testing API (e.g., describe, test, expect) without explicit imports
    globals: true,
    // Simulates a browser environment using jsdom
    environment: "jsdom",
    // Configures path aliases to match your Next.js tsconfig paths (if using '@/*')
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
