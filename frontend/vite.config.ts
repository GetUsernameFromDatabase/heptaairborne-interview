import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression2';

export default defineConfig({
  plugins: [react(), viteCompression()],
  server: {
    port: Number(process.env.PORT ?? 3000),
    proxy: {
      '/api': {
        target: `http://${process.env.API_HOST ?? 'localhost'}:${
          process.env.API_PORT ?? '8080'
        }`,
        changeOrigin: true,
      },
    },
  },
  root: '',
});
