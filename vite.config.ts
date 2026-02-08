import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Automatically find all .tsx files in components/
const componentsDir = path.resolve(__dirname, 'components');
let entries: Record<string, string> = {};

if (existsSync(componentsDir)) {
  entries = readdirSync(componentsDir)
    .filter((file: string) => file.endsWith('.tsx'))
    .reduce((acc: Record<string, string>, file: string) => {
      const name = file.replace('.tsx', '');
      acc[name] = path.resolve(componentsDir, file);
      return acc;
    }, {} as Record<string, string>);
}

export default defineConfig({
  plugins: [react()],
  base: '/interactive-learning/',
  build: {
    outDir: 'assets',
    emptyOutDir: false,
    rollupOptions: {
      input: entries,
      output: {
        entryFileNames: '[name].js',
        format: 'es',
        // Embed React in each bundle
        manualChunks: undefined,
      },
    },
  },
});
