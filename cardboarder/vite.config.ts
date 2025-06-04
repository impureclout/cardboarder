import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cardboarder/',

  build: {
    // Vite will build into 'PROJECT_ROOT/cardboarder/dist' because config is in 'cardboarder/'
    // and input is 'cardboarder/index.html' relative to CWD.
    // Let's explicitly set outDir to be 'dist' relative to this config file.
    outDir: 'dist',
    rollupOptions: {
      input: {
        // This will result in `cardboarder/dist/cardboarder/index.html`
        // which is fine, as we will move files in the package.json script.
        main: 'index.html' // This is now relative to the vite.config.ts location
      },
    },
    emptyOutDir: true,
  }
})
