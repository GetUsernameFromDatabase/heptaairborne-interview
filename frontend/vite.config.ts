import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: `http://${process.env.API_HOST ?? 'localhost'}:${
          process.env.API_PORT ?? '8080'
        }`,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  build: {
    minify: false,
  },
  root: '',
});
