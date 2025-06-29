import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this 'define' block to handle 'process.env' references
  // This tells Vite to replace 'process.env' with an empty object,
  // preventing the "process is not defined" error in the browser.
  define: {
    'process.env': {} 
  }
})