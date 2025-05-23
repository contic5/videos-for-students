import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/videos-for-students/', // match your repo name exactly
  build: {
    outDir: 'build' // Optional — only if you want `build` instead of `dist`
  },
})
