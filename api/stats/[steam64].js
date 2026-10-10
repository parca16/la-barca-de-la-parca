import { methodNotAllowed, sendJson } from '../_lib/http.js';
import { getCachedPlayerStats, normalizeSteam64 } from '../_lib/leetify.js';

/**
 * GET /api/stats/:steam64
 *
 * Devuelve las estadísticas de un jugador obtenidas de Leetify, ya normalizadas
 * para la pestaña "Estadísticas" de la tarjeta.
 *
 * Es público: el dato ya lo es en Leetify (según `privacy_mode`) y la página del
 * roster no requiere sesión. Se cachea en el CDN 30 min para no castigar el rate
 * limit de Leetify. La API key, si existe, vive solo en el servidor.
 */

// `s-maxage` delega la caché en el CDN; como la URL incluye el SteamID64, cada
// jugador tiene su propia entrada.
const CACHE_HEADER = 'public, s-maxage=1800, stale-while-revalidate=86400';

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
