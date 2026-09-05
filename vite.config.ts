import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function servePublicHtmlPlugin(): Plugin {
  return {
    name: 'serve-public-html',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.url || '/';
        const urlPath = rawUrl.split('?')[0];

        // If path is a folder without trailing slash, redirect to trailing slash if index.html exists
        if (!urlPath.endsWith('/') && !path.extname(urlPath)) {
          const dirIndex = path.join(__dirname, 'public', urlPath, 'index.html');
          if (fs.existsSync(dirIndex)) {
            const query = rawUrl.includes('?') ? '?' + rawUrl.split('?')[1] : '';
            res.writeHead(301, { Location: urlPath + '/' + query });
            return res.end();
          }
        }

        // If path has trailing slash, check public/<urlPath>/index.html
        if (urlPath.endsWith('/') && urlPath !== '/') {
          const targetFile = path.join(__dirname, 'public', urlPath, 'index.html');
          if (fs.existsSync(targetFile)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.end(fs.readFileSync(targetFile, 'utf-8'));
          }
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), servePublicHtmlPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
