import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// Why: Use URL-based resolution so it works consistently in ESM/TS.
export default defineConfig({
  plugins: [tailwind(), react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // Point this to where you keep dfx-generated canister bindings
      // e.g., frontend/declarations or frontend/src/declarations
      "dfx-declarations": fileURLToPath(new URL("./src/declarations", import.meta.url)),
    },
  },
});
