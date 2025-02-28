import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/users': 'amp-csr-backend-hbklmk6t6-rayherna18s-projects.vercel.app', // Adjust this as needed, depending on where your backend is running
    },
  },
  
})
