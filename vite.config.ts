import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';

function copyDirSafe(src: string, dest: string) {
  if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
  let entries: string[];
  try {
    entries = readdirSync(src);
  } catch {
    return;
  }
  for (const entry of entries) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    try {
      const stat = statSync(srcPath);
      if (stat.isDirectory()) {
        copyDirSafe(srcPath, destPath);
      } else {
        copyFileSync(srcPath, destPath);
      }
    } catch {
      // skip locked/unavailable files
    }
  }
}

function safeCopyPublic(): import('vite').Plugin {
  return {
    name: 'safe-copy-public',
    enforce: 'post',
    writeBundle(options) {
      const outDir = options.dir || resolve('dist');
      const publicDir = resolve('public');
      copyDirSafe(publicDir, outDir);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), command === 'build' ? safeCopyPublic() : null].filter(Boolean) as import('vite').Plugin[],
  publicDir: command === 'build' ? false : undefined,
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
}));
