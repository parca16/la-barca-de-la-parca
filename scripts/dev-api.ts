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

  const [login, callback, logout, me, classes] = await Promise.all([
    import('../api/auth/login.js'),
    import('../api/auth/callback.js'),
    import('../api/auth/logout.js'),
    import('../api/auth/me.js'),
    import('../api/content/classes.js'),
  ]);

  const routes: Record<string, Handler> = {
    '/api/auth/login': login.default,
    '/api/auth/callback': callback.default,
    '/api/auth/logout': logout.default,
    '/api/auth/me': me.default,
    '/api/content/classes': classes.default as unknown as Handler,
  };

  // Servidor mínimo para desarrollo local que ejecuta los mismos handlers que
  // desplegará Vercel en `/api`. Se usa junto a `npm start` (proxy de Angular).
  const server = createServer((req, res) => {
    const pathname = new URL(req.url ?? '/', `http://localhost:${port}`).pathname;
    const handler = routes[pathname];

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
    console.log('Rutas:', Object.keys(routes).join(', '));
  });
}

void main();
