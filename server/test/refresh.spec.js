import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// issue #33: `POST /api/refresh` dispara scraping a csstats.gg/Steam, así que
// debe exigir un token en tiempo constante, estar limitado por rate limiting y
// desaparecer (404) cuando no hay secreto configurado. Estos tests levantan el
// servidor real en un puerto efímero y lo consultan con fetch.

const { mockGet } = vi.hoisted(() => ({ mockGet: vi.fn() }));

vi.mock('axios', () => ({ default: { get: mockGet } }));

let httpServer;

/** Importa un server.js limpio, lo escucha en un puerto libre y devuelve su URL. */
async function startTestServer() {
  vi.resetModules();
  const { app } = await import('../server.js');
  const server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  httpServer = server;
  const { port } = server.address();
  return `http://127.0.0.1:${port}`;
}

const postRefresh = (base, headers) => fetch(`${base}/api/refresh`, { method: 'POST', headers });

beforeEach(() => {
  // Sin STEAM_API_KEY el servidor no consulta Steam y el mock solo sirve HTML.
  process.env.STEAM_API_KEY = '';
  process.env.REFRESH_TOKEN = 'secret-token';
  delete process.env.REFRESH_RATE_MAX;
  mockGet.mockReset();
  mockGet.mockResolvedValue({ data: '<html></html>' });
  vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(async () => {
  if (httpServer) {
    // Sin esto `close()` espera a que expiren las conexiones keep-alive de fetch.
    httpServer.closeAllConnections?.();
    await new Promise((resolve) => httpServer.close(resolve));
    httpServer = undefined;
  }
  vi.restoreAllMocks();
});

describe('POST /api/refresh', () => {
  it('rechaza la petición sin token con 401', async () => {
    const base = await startTestServer();

    const res = await postRefresh(base, {});

    expect(res.status).toBe(401);
    expect(res.headers.get('www-authenticate')).toBe('Bearer');
  });

  it('rechaza un token incorrecto con 401', async () => {
    const base = await startTestServer();

    // Token de distinta longitud: la comparación no debe lanzar ni filtrarse.
    const res = await postRefresh(base, { Authorization: 'Bearer nope' });

    expect(res.status).toBe(401);
  });

  it('acepta el token correcto y refresca la caché', async () => {
    const base = await startTestServer();

    const res = await postRefresh(base, { Authorization: 'Bearer secret-token' });

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({
      message: 'Cache refreshed',
      players: 8,
    });
  });

  it('no responde a GET (solo POST)', async () => {
    const base = await startTestServer();

    const res = await fetch(`${base}/api/refresh`);

    expect(res.status).toBe(404);
  });

  it('queda deshabilitado (404) si no hay REFRESH_TOKEN', async () => {
    delete process.env.REFRESH_TOKEN;
    const base = await startTestServer();

    const res = await postRefresh(base, { Authorization: 'Bearer secret-token' });

    expect(res.status).toBe(404);
  });

  it('limita la frecuencia de las peticiones (429)', async () => {
    process.env.REFRESH_RATE_MAX = '1';
    const base = await startTestServer();
    const headers = { Authorization: 'Bearer secret-token' };

    const first = await postRefresh(base, headers);
    const second = await postRefresh(base, headers);

    expect(first.status).toBe(200);
    expect(second.status).toBe(429);
  });
});
