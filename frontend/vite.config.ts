import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT ?? 3000),
  },
  build: {
    minify: false,
  },
  root: '',
});
