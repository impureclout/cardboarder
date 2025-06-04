import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cardboarder/',

  build: {
    // Vite will build into 'cardboarder/dist' because this config is in 'cardboarder/'
    // and outDir is 'dist' relative to this config file.
    outDir: 'dist',
    rollupOptions: {
      input: {
        // This path must be relative to the CWD when `npm run build` is executed.
        // Since CWD is project root, this should be 'cardboarder/index.html'.
        main: 'cardboarder/index.html'
      },
    },
    emptyOutDir: true,
  }
})
