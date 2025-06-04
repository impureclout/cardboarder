import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cardboarder/',
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        index: 'cardboarder/index.html'
      }
    },
    emptyOutDir: true,
  }
})
