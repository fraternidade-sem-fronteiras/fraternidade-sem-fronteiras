import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    adonisjs({
      entrypoints: ['resources/js/main.jsx'],
      reload: ['resources/views/**/*.edge'],
    }),
    react(),
  ],
})
