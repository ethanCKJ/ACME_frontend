import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// ESM‐safe __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // only if you want to import via "@/…"
      '@': path.resolve(__dirname, 'src'),
    }
  },
  server: {
    port: 5173,
  },
  build: {
    sourcemap: true
  }
})
