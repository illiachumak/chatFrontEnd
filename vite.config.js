import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: 'frontend.persprojchat.space',
    hmr: {
      host: 'backend.persprojchat.space',
      port: 443,
      protocol: 'wss',
    },
  },
  plugins: [react()],
})
