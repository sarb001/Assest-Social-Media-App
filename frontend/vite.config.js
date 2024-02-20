import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  build :{
    outDir: 'dist'
  },
  plugins: [react()],
  server : {
    proxy : {
      '/api' : {
        target:"https://social-media-api-5d67.onrender.com/",
        changeOrigin : true
      }
    }
  }
})
//  target:"http://localhost:4000",
