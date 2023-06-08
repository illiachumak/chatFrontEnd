import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    https: true,
    hmr: {
        host: "persprojchat.space",
        port: 80,
        protocol: "wss",
    },
},
  plugins: [react()],
})
