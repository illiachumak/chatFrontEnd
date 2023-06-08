import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    
    https: true,
    hmr: {
      host: 'frontend.persprojchat.space',
      port: 443,
      protocol: 'wss',
    },
  },
  plugins: [react()],
})
