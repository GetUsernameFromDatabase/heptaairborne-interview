import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import compression from 'compression';
import serveStatic from 'serve-static';

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer(isProd = process.env.NODE_ENV === 'production') {
  const app = express();

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: isTest ? 'error' : 'info',
  });

  app.use(vite.middlewares);

  if (isProd) {
    app.use(compression());
    app.use(
      serveStatic(path.resolve(__dirname, 'dist/client'), {
        index: false,
      })
    );
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(
          __dirname,
          isProd ? 'dist/client/index.html' : 'index.html'
        ),
        'utf-8'
      );
      template = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule(
        isProd ? '/dist/server/entry-server.js' : '/src/client/entry-server.tsx'
      );
      const appHtml = await render(url);

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (exception) {
      if (exception instanceof Error) {
        console.log(exception.stack);
        vite.ssrFixStacktrace(exception);
      }
      next(exception);
    }
  });

  const port = process.env.PORT ?? 3000;
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`App is listening on http://localhost:${port}`);
  });
}

createServer();
