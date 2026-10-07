import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import login from '../api/auth/login';
import callback from '../api/auth/callback';
import logout from '../api/auth/logout';
import me from '../api/auth/me';
import classes from '../api/content/classes';

// Carga `.env.local` si existe (mismo formato que Vercel). Es opcional.
try {
  process.loadEnvFile('.env.local');
} catch {
  console.warn('Aviso: no hay .env.local; se usarán las variables del entorno actual.');
}

type Handler = (req: IncomingMessage, res: ServerResponse) => unknown;

const routes: Record<string, Handler> = {
  '/api/auth/login': login,
  '/api/auth/callback': callback,
  '/api/auth/logout': logout,
  '/api/auth/me': me,
  '/api/content/classes': classes as unknown as Handler,
};

const port = Number(process.env['PORT'] ?? 3000);

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
