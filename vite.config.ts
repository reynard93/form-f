import { defineConfig } from "vite"
import path from "path"
import vue from "@vitejs/plugin-vue"
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/system.ts"),
      name: "CommonFormComponent",
      fileName: format => `system.${format}.js`
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  plugins: [vue(), vueJsx()]
})
