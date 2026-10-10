import { getLeetifyApiBase, getLeetifyApiKey } from './env.js';

/**
 * Cliente de la API pública de Leetify y normalización de las stats que
 * consume la pestaña "Estadísticas" de la tarjeta de jugador.
 *
 * Se consultan dos endpoints porque el perfil agregado no incluye K/D ni ADR:
 *   - `GET /v3/profile`         → perfil, rangos, ratings y stats agregadas.
 *   - `GET /v3/profile/matches` → últimas ~100 partidas, para derivar K/D y ADR.
 *
 * La extracción (`buildPlayerStats`) es pura y no hace red, para poder testearla
 * con fixtures. La descarga (`fetchPlayerStats`) sí hace red.
 */

const RETRY_BASE_MS = 500;
const RETRIABLE_STATUSES = new Set([429, 500, 502, 503, 504]);

/** Número de reintentos ante 429/5xx (configurable para tests/entornos). */
function maxRetries() {
  const value = Number(process.env['LEETIFY_MAX_RETRIES']);
  return Number.isFinite(value) && value >= 0 ? value : 3;
}

/** Devuelve un SteamID64 válido (17 dígitos) o `null`. */
export function normalizeSteam64(value) {
  const text = value === null || value === undefined ? '' : String(value).trim();
  return /^\d{17}$/.test(text) ? text : null;
}

/** Convierte a número finito o `null` (evita `NaN`/`Infinity` en la respuesta). */
function toNumber(value) {
  if (value === null || value === undefined || value === '') return null;
  const num = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(num) ? num : null;
}

/**
 * Deriva K/D y ADR de las partidas devueltas por Leetify, sumando solo las
 * stats del jugador objetivo:
 *   K/D = Σkills / Σdeaths
 *   ADR = Σtotal_damage / Σrounds_count
 * Cubre las últimas ~100 partidas, no el histórico completo. Devuelve `null`
 * en cada campo si no hay denominador.
 */
export function summarizeMatches(matches, steam64Id) {
  let kills = 0;
  let deaths = 0;
  let damage = 0;
  let rounds = 0;

  for (const match of matches) {
    const statsList = Array.isArray(match?.stats) ? match.stats : [];
    for (const stats of statsList) {
      if (stats?.steam64_id !== steam64Id) continue;
      kills += toNumber(stats.total_kills) ?? 0;
      deaths += toNumber(stats.total_deaths) ?? 0;
      damage += toNumber(stats.total_damage) ?? 0;
      rounds += toNumber(stats.rounds_count) ?? 0;
    }
  }

  return {
    kd: deaths > 0 ? kills / deaths : null,
    adr: rounds > 0 ? damage / rounds : null,
  };
}

/**
 * Mapea el perfil + partidas de Leetify al shape que consume la tarjeta.
 * Función pura: no hace red y no lanza si faltan campos (los deja en `null`).
 */
export function buildPlayerStats(profile, matches, steam64Id, syncedAt) {
  const safeProfile = profile ?? {};
  const rating = safeProfile.rating ?? {};
  const ranks = safeProfile.ranks ?? {};
  const stats = safeProfile.stats ?? {};
  const { kd, adr } = summarizeMatches(Array.isArray(matches) ? matches : [], steam64Id);

  return {
    steam64Id,
    name: typeof safeProfile.name === 'string' ? safeProfile.name : null,
    privacyMode:
      typeof safeProfile.privacy_mode === 'string' ? safeProfile.privacy_mode : 'unknown',
    syncedAt,
    premier: toNumber(ranks.premier),
    leetifyRating: toNumber(ranks.leetify),
    kd,
    winrate: toNumber(safeProfile.winrate),
    totalMatches: toNumber(safeProfile.total_matches),
    skills: {
      aim: toNumber(rating.aim),
      positioning: toNumber(rating.positioning),
      utility: toNumber(rating.utility),
    },
    highlights: {
      crosshairPlacement: toNumber(stats.preaim),
      headshotPct: toNumber(stats.accuracy_head),
      utilityOnDeath: toNumber(stats.utility_on_death_avg),
      counterStrafingPct: toNumber(stats.counter_strafing_good_shots_ratio),
      adr,
      sprayAccuracyPct: toNumber(stats.spray_accuracy),
    },
  };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Interpreta la cabecera `Retry-After` (segundos o fecha HTTP) en milisegundos. */
function parseRetryAfterMs(header) {
  if (!header) return null;
  const seconds = Number(header);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);
  const date = Date.parse(header);
  return Number.isNaN(date) ? null : Math.max(0, date - Date.now());
}

/** GET a Leetify con reintentos y backoff exponencial ante 429/5xx. */
async function fetchLeetifyJson(path, fetchImpl, attempt = 1) {
  const url = new URL(path, getLeetifyApiBase()).toString();
  const headers = { Accept: 'application/json' };
  const apiKey = getLeetifyApiKey();
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const response = await fetchImpl(url, { headers });

  if (response.ok) {
    return response.json();
  }

  if (RETRIABLE_STATUSES.has(response.status) && attempt <= maxRetries()) {
    const retryAfterMs =
      response.status === 429 ? parseRetryAfterMs(response.headers.get('retry-after')) : null;
    await sleep(retryAfterMs ?? RETRY_BASE_MS * 2 ** (attempt - 1));
    return fetchLeetifyJson(path, fetchImpl, attempt + 1);
  }

  throw new Error(`[stats] Leetify ${response.status} al pedir ${path}`);
}

/**
 * Consulta el perfil y las partidas de un jugador y devuelve las stats ya
 * normalizadas. El perfil es imprescindible; si las partidas fallan, K/D y ADR
 * quedan en `null` en lugar de tumbar toda la respuesta.
 */
export async function fetchPlayerStats(steam64Id, options = {}) {
  const fetchImpl = options.fetchImpl ?? fetch;

  const [profileResult, matchesResult] = await Promise.allSettled([
    fetchLeetifyJson(`/v3/profile?steam64_id=${steam64Id}`, fetchImpl),
    fetchLeetifyJson(`/v3/profile/matches?steam64_id=${steam64Id}`, fetchImpl),
  ]);

  if (profileResult.status === 'rejected') {
    throw profileResult.reason;
  }

  const matches =
    matchesResult.status === 'fulfilled' && Array.isArray(matchesResult.value)
      ? matchesResult.value
      : [];

  return buildPlayerStats(profileResult.value, matches, steam64Id, new Date().toISOString());
}

/**
 * Caché en memoria best-effort por instancia caliente. Evita repetir las dos
 * llamadas a Leetify en peticiones seguidas; no sustituye a la caché HTTP.
 */
const CACHE_TTL_MS = 30 * 60 * 1000;
const cache = new Map();

export async function getCachedPlayerStats(steam64Id, options = {}) {
  const now = Date.now();
  const entry = cache.get(steam64Id);
  if (entry && now - entry.at < CACHE_TTL_MS) {
    return entry.stats;
  }

  const stats = await fetchPlayerStats(steam64Id, options);
  cache.set(steam64Id, { at: now, stats });
  return stats;
}
