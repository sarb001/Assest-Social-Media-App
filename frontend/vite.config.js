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
       target:"http://localhost:4000",
       // target:"https://social-media-backend-33gv.onrender.com",
       changeOrigin : true
     }
    }
 }
})
