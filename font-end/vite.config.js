import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ecommercebyvtit': 'http://localhost:8000',
    },
    historyApiFallback: true,
  },
});
