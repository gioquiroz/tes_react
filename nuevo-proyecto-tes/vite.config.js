import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Eliminamos la configuración de PostCSS explícita aquí
  // y volvemos a depender del archivo postcss.config.js
  css: {}
})