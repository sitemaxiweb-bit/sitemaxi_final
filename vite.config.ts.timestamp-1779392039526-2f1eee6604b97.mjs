// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { copyFileSync, readdirSync, statSync, mkdirSync, existsSync } from "fs";
import { join, resolve } from "path";
function copyDirSafe(src, dest) {
  if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
  let entries;
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
    }
  }
}
function safeCopyPublic() {
  return {
    name: "safe-copy-public",
    enforce: "post",
    writeBundle(options) {
      const outDir = options.dir || resolve("dist");
      const publicDir = resolve("public");
      copyDirSafe(publicDir, outDir);
    }
  };
}
var vite_config_default = defineConfig(({ command }) => ({
  plugins: [react(), command === "build" ? safeCopyPublic() : null].filter(Boolean),
  publicDir: command === "build" ? false : void 0,
  optimizeDeps: {
    exclude: ["lucide-react"]
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBjb3B5RmlsZVN5bmMsIHJlYWRkaXJTeW5jLCBzdGF0U3luYywgbWtkaXJTeW5jLCBleGlzdHNTeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgam9pbiwgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuXG5mdW5jdGlvbiBjb3B5RGlyU2FmZShzcmM6IHN0cmluZywgZGVzdDogc3RyaW5nKSB7XG4gIGlmICghZXhpc3RzU3luYyhkZXN0KSkgbWtkaXJTeW5jKGRlc3QsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBsZXQgZW50cmllczogc3RyaW5nW107XG4gIHRyeSB7XG4gICAgZW50cmllcyA9IHJlYWRkaXJTeW5jKHNyYyk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybjtcbiAgfVxuICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICBjb25zdCBzcmNQYXRoID0gam9pbihzcmMsIGVudHJ5KTtcbiAgICBjb25zdCBkZXN0UGF0aCA9IGpvaW4oZGVzdCwgZW50cnkpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdGF0ID0gc3RhdFN5bmMoc3JjUGF0aCk7XG4gICAgICBpZiAoc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIGNvcHlEaXJTYWZlKHNyY1BhdGgsIGRlc3RQYXRoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvcHlGaWxlU3luYyhzcmNQYXRoLCBkZXN0UGF0aCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBza2lwIGxvY2tlZC91bmF2YWlsYWJsZSBmaWxlc1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzYWZlQ29weVB1YmxpYygpOiBpbXBvcnQoJ3ZpdGUnKS5QbHVnaW4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdzYWZlLWNvcHktcHVibGljJyxcbiAgICBlbmZvcmNlOiAncG9zdCcsXG4gICAgd3JpdGVCdW5kbGUob3B0aW9ucykge1xuICAgICAgY29uc3Qgb3V0RGlyID0gb3B0aW9ucy5kaXIgfHwgcmVzb2x2ZSgnZGlzdCcpO1xuICAgICAgY29uc3QgcHVibGljRGlyID0gcmVzb2x2ZSgncHVibGljJyk7XG4gICAgICBjb3B5RGlyU2FmZShwdWJsaWNEaXIsIG91dERpcik7XG4gICAgfSxcbiAgfTtcbn1cblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kIH0pID0+ICh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBjb21tYW5kID09PSAnYnVpbGQnID8gc2FmZUNvcHlQdWJsaWMoKSA6IG51bGxdLmZpbHRlcihCb29sZWFuKSBhcyBpbXBvcnQoJ3ZpdGUnKS5QbHVnaW5bXSxcbiAgcHVibGljRGlyOiBjb21tYW5kID09PSAnYnVpbGQnID8gZmFsc2UgOiB1bmRlZmluZWQsXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsnbHVjaWRlLXJlYWN0J10sXG4gIH0sXG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixTQUFTLGNBQWMsYUFBYSxVQUFVLFdBQVcsa0JBQWtCO0FBQzNFLFNBQVMsTUFBTSxlQUFlO0FBRTlCLFNBQVMsWUFBWSxLQUFhLE1BQWM7QUFDOUMsTUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFHLFdBQVUsTUFBTSxFQUFFLFdBQVcsS0FBSyxDQUFDO0FBQzFELE1BQUk7QUFDSixNQUFJO0FBQ0YsY0FBVSxZQUFZLEdBQUc7QUFBQSxFQUMzQixRQUFRO0FBQ047QUFBQSxFQUNGO0FBQ0EsYUFBVyxTQUFTLFNBQVM7QUFDM0IsVUFBTSxVQUFVLEtBQUssS0FBSyxLQUFLO0FBQy9CLFVBQU0sV0FBVyxLQUFLLE1BQU0sS0FBSztBQUNqQyxRQUFJO0FBQ0YsWUFBTSxPQUFPLFNBQVMsT0FBTztBQUM3QixVQUFJLEtBQUssWUFBWSxHQUFHO0FBQ3RCLG9CQUFZLFNBQVMsUUFBUTtBQUFBLE1BQy9CLE9BQU87QUFDTCxxQkFBYSxTQUFTLFFBQVE7QUFBQSxNQUNoQztBQUFBLElBQ0YsUUFBUTtBQUFBLElBRVI7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxTQUFTLGlCQUF3QztBQUMvQyxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxZQUFZLFNBQVM7QUFDbkIsWUFBTSxTQUFTLFFBQVEsT0FBTyxRQUFRLE1BQU07QUFDNUMsWUFBTSxZQUFZLFFBQVEsUUFBUTtBQUNsQyxrQkFBWSxXQUFXLE1BQU07QUFBQSxJQUMvQjtBQUFBLEVBQ0Y7QUFDRjtBQUdBLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsUUFBUSxPQUFPO0FBQUEsRUFDNUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxZQUFZLFVBQVUsZUFBZSxJQUFJLElBQUksRUFBRSxPQUFPLE9BQU87QUFBQSxFQUNoRixXQUFXLFlBQVksVUFBVSxRQUFRO0FBQUEsRUFDekMsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLGNBQWM7QUFBQSxFQUMxQjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
