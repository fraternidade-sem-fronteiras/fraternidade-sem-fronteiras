import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    adonisjs({
      entrypoints: ['resources/js/app.jsx', 'resources/css/app.css'],
      reload: ['resources/views/**/*.edge'],
    }),
    react(),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  build: { chunkSizeWarningLimit: 500 },
})
