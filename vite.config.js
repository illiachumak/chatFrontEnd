import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sveltekit } from '@sveltejs/kit/vite';
// https://vitejs.dev/config/



/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit(), react()],
    server: {
        hmr: {
            clientPort: 5111
        }
    }
};

export default config;