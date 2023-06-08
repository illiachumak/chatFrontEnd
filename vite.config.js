import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://backend.persprojchat.space',
        changeOrigin: true,
        ws: true,
      },
    },
  },
  plugins: [react()],
});
