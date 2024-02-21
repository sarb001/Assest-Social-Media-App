import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  build :{
    outDir: 'dist'
  },
  server: {
    proxy: {
      '/api': 'https://social-media-api-5d67.onrender.com/',
    },
  },
  plugins: [react()],
})
