import { methodNotAllowed, sendJson } from '../_lib/http.js';
import { getCachedPlayerStats, normalizeSteam64 } from '../_lib/leetify.js';
import { getSessionUser } from '../_lib/session.js';

/**
 * GET /api/stats/:steam64
 *
 * Devuelve las estadísticas de un jugador obtenidas de Leetify, ya normalizadas
 * para la pestaña "Estadísticas" de la tarjeta. Es privado: exige sesión válida
 * (la API key de Leetify vive solo en el servidor, nunca en el cliente).
 */

// `private` porque la respuesta va detrás de sesión; evita que un CDN sirva
// datos cacheados a una petición sin autenticar. El navegador sí la reutiliza.
const CACHE_HEADER = 'private, max-age=1800, stale-while-revalidate=86400';

/** Lee el SteamID64 del parámetro dinámico, con fallback a la URL si hiciera falta. */
function readSteam64(req) {
  const fromQuery = req.query?.steam64;
  if (fromQuery) {
    return normalizeSteam64(Array.isArray(fromQuery) ? fromQuery[0] : fromQuery);
  }

  const pathname = new URL(req.url ?? '/', 'http://localhost').pathname;
  const match = /\/api\/stats\/([^/]+)\/?$/.exec(pathname);
  return normalizeSteam64(match?.[1]);
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    methodNotAllowed(res, 'GET');
    return;
  }

  const user = getSessionUser(req);
  if (!user) {
    sendJson(res, 401, { error: 'unauthorized' });
    return;
  }

  const steam64Id = readSteam64(req);
  if (!steam64Id) {
    sendJson(res, 400, { error: 'invalid_steam64' });
    return;
  }

  try {
    const stats = await getCachedPlayerStats(steam64Id);
    sendJson(res, 200, { stats }, [], { 'Cache-Control': CACHE_HEADER });
  } catch (error) {
    console.error('[stats] Error al consultar Leetify:', error);
    sendJson(res, 502, { error: 'stats_unavailable' });
  }
}
