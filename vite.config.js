import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './', // Set the project root directory (or specify another path)
  build: {
    rollupOptions: {
      input: {
        main: '/src/main.jsx', // Update with the correct path
      },
    },
  },
})
