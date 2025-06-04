import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cardboarder/',
  build: {
    outDir: 'cardboarder/dist',
    rollupOptions: {
      input: {
        main: 'cardboarder/index.html'
      }
    },
  }
})
