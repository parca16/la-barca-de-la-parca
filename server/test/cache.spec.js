import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// axios se mockea para no tocar red. `vi.hoisted` permite referenciar el mock
// dentro de la fábrica de `vi.mock`, que se eleva al inicio del archivo.
const { mockGet } = vi.hoisted(() => ({ mockGet: vi.fn() }));

vi.mock('axios', () => ({ default: { get: mockGet } }));

/** Carga un módulo `server.js` limpio (sin estado compartido entre tests). */
async function loadServer() {
  vi.resetModules();
  return import('../server.js');
}

/** Deja un turno del event loop para que arranquen los workers. */
const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

/** Configura axios para que responda HTML a csstats y un perfil a Steam. */
function stubAxios(html, delayMs = 0) {
  mockGet.mockImplementation(
    (url) =>
      new Promise((resolve) =>
        setTimeout(() => {
          if (url.includes('csstats.gg')) {
            resolve({ data: html });
          } else {
            resolve({
              data: {
                response: {
                  players: [{ personaname: 'Test', avatarfull: 'a', avatarmedium: 'b' }],
                },
              },
            });
          }
        }, delayMs),
      ),
  );
}

beforeEach(() => {
  // Fijamos las variables antes de importar server.js para que el test no
  // dependa de un .env local: con clave, Steam también se consulta.
  process.env.STEAM_API_KEY = 'test-key';
  process.env.REFRESH_CONCURRENCY = '3';
  mockGet.mockReset();
  // El servidor escribe logs de progreso; no ensuciamos la salida de los tests.
  vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('mapWithConcurrency', () => {
  it('limita la concurrencia y conserva el orden', async () => {
    const { mapWithConcurrency } = await loadServer();
    let active = 0;
    let maxActive = 0;

    const result = await mapWithConcurrency([1, 2, 3, 4, 5], 2, async (n) => {
      active++;
      maxActive = Math.max(maxActive, active);
      await new Promise((resolve) => setTimeout(resolve, 10));
      active--;
      return n * 2;
    });

    expect(result).toEqual([2, 4, 6, 8, 10]);
    expect(maxActive).toBeLessThanOrEqual(2);
  });
});

describe('refreshCache', () => {
  it('solo fija timestamp cuando los datos están listos', async () => {
    const server = await loadServer();
    stubAxios('<html></html>', 25);

    const before = Date.now();
    const promise = server.refreshCache();
    const during = server.getCache();

    expect(during.status).toBe('loading');
    expect(during.timestamp).toBe(0);
    expect(during.startedAt).not.toBeNull();

    await promise;

    const after = server.getCache();
    expect(after.status).toBe('ready');
    expect(after.timestamp).toBeGreaterThanOrEqual(before);
    expect(after.players).toHaveLength(8);
    expect(after.startedAt).toBeNull();
  });

  it('reutiliza el refresco en curso en lugar de lanzar otro', async () => {
    const server = await loadServer();
    let release;
    const gate = new Promise((resolve) => {
      release = resolve;
    });
    mockGet.mockImplementation(async () => {
      await gate;
      return { data: '<html></html>' };
    });

    const first = server.refreshCache();
    const second = server.refreshCache();

    expect(second).toBe(first);
    await tick();
    // 3 workers x (csstats + Steam) = 6 peticiones. Sin la guarda, el segundo
    // /api/refresh habría duplicado la cifra.
    expect(mockGet).toHaveBeenCalledTimes(6);

    release();
    await Promise.all([first, second]);

    const cache = server.getCache();
    expect(cache.status).toBe('ready');
    expect(cache.players).toHaveLength(8);
  });
});

describe('asyncHandler', () => {
  it('reenvía el rechazo del handler a next', async () => {
    const { asyncHandler } = await loadServer();
    const error = new Error('boom');
    const next = vi.fn();
    const handler = asyncHandler(async () => {
      throw error;
    });

    await handler({}, {}, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('errorHandler', () => {
  it('responde 500 en lugar de dejar la petición colgada', async () => {
    const { errorHandler } = await loadServer();
    const res = {
      headersSent: false,
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn();

    errorHandler(new Error('boom'), {}, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    expect(next).not.toHaveBeenCalled();
  });

  it('delega en next si la respuesta ya se envió', async () => {
    const { errorHandler } = await loadServer();
    const error = new Error('boom');
    const res = { headersSent: true };
    const next = vi.fn();

    errorHandler(error, {}, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
