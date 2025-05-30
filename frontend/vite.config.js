import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { config as loadEnv } from 'dotenv';
import { resolve } from 'path';

// Load .env from monorepo root
loadEnv({ path: resolve(__dirname, '../.env') });

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
});
