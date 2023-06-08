import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  server: {
    host: true,
    hmr: {
      clientPort: 80,
    },
  },
  plugins: [react(), sveltekit()],
});





