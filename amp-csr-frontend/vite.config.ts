import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: process.env.NODE_ENV === 'development' ? {
      '/users': 'http://localhost:3000',
    } : {},
  },
  
})
