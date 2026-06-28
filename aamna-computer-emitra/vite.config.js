import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps asset paths relative so the build works both locally
// and when hosted in a sub-folder (e.g. GitHub Pages project sites).
export default defineConfig({
  plugins: [react()],
  base: './',
})
