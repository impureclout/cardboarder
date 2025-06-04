import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// ESM equivalent for __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cardboarder/',

  // Set Vite's root to the 'cardboarder' directory (where this config file is)
  root: __dirname,

  build: {
    // Output directly to the project root's 'docs' folder
    outDir: path.resolve(__dirname, '../docs'),
    rollupOptions: {
      input: {
        // Since 'root' is 'cardboarder/', 'index.html' correctly refers to 'cardboarder/index.html'
        // The output will be 'docs/index.html'
        main: 'index.html'
      },
    },
    emptyOutDir: true,
  }
})
