import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';

type Handler = (req: IncomingMessage, res: ServerResponse) => unknown;

const port = Number(process.env['PORT'] ?? 3000);

async function main(): Promise<void> {
  // Carga `.env.local` ANTES de importar las funciones: `classes.ts` y `session.ts`
  // leen variables de entorno al evaluarse.
  try {
    process.loadEnvFile('.env.local');
  } catch {
    console.warn('Aviso: no hay .env.local; se usarán las variables del entorno actual.');
  }

  const [login, callback, logout, me, classes, stats] = await Promise.all([
    import('../api/auth/login.js'),
    import('../api/auth/callback.js'),
    import('../api/auth/logout.js'),
    import('../api/auth/me.js'),
    import('../api/content/classes.js'),
    import('../api/stats/[steam64].js'),
  ]);

  const routes: Record<string, Handler> = {
    '/api/auth/login': login.default,
    '/api/auth/callback': callback.default,
    '/api/auth/logout': logout.default,
    '/api/auth/me': me.default,
    '/api/content/classes': classes.default as unknown as Handler,
  };

  // Rutas dinámicas (params). Vercel rellena `req.query`, así que el servidor de
  // desarrollo hace lo mismo para poder reutilizar los mismos handlers.
  const dynamicRoutes: Array<{ pattern: RegExp; param: string; handler: Handler; label: string }> =
    [
      {
        pattern: /^\/api\/stats\/([^/]+)\/?$/,
        param: 'steam64',
        handler: stats.default,
        label: '/api/stats/:steam64',
      },
    ];

  // Servidor mínimo para desarrollo local que ejecuta los mismos handlers que
  // desplegará Vercel en `/api`. Se usa junto a `npm start` (proxy de Angular).
  const server = createServer((req, res) => {
    const pathname = new URL(req.url ?? '/', `http://localhost:${port}`).pathname;
    let handler = routes[pathname];

    if (!handler) {
      for (const route of dynamicRoutes) {
        const match = route.pattern.exec(pathname);
        if (match) {
          (req as { query?: Record<string, string> }).query = { [route.param]: match[1] };
          handler = route.handler;
          break;
        }
      }
    }

    // Permite llamar a la API directamente desde el dev server de Angular.
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }

    if (!handler) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    Promise.resolve(handler(req, res)).catch((error: unknown) => {
      console.error(error);
      if (!res.headersSent) res.statusCode = 500;
      res.end('Internal error');
    });
  });

  server.listen(port, () => {
    console.log(`API de desarrollo en http://localhost:${port}`);
    const labels = [...Object.keys(routes), ...dynamicRoutes.map((route) => route.label)];
    console.log('Rutas:', labels.join(', '));
  });
}

void main();
