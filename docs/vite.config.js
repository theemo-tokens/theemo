import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "mermaid": "mermaid/dist/mermaid.esm.mjs"
    }
  }
});