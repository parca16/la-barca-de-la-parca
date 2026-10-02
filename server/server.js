import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import { createHash, timingSafeEqual } from 'node:crypto';
import { EMPTY_STATS, parseCsstatsHtml } from './csstats.js';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
// Sin clave no se llama a Steam: nunca se envía un placeholder a la API.
const STEAM_API_KEY = process.env.STEAM_API_KEY?.trim() || null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
// Jugadores descargados en paralelo. Un valor bajo evita saturar csstats.gg/Steam.
const REFRESH_CONCURRENCY = Number(process.env.REFRESH_CONCURRENCY) || 3;

// Secreto compartido para forzar un refresco manual vía `POST /api/refresh`.
// Si no está configurado, el endpoint queda deshabilitado (404): el refresco
// automático interno sigue funcionando y nadie de fuera puede disparar el
// scraping.
const REFRESH_TOKEN = process.env.REFRESH_TOKEN?.trim() || null;

// Límite de peticiones manuales de refresco. Aunque el token se filtre, no se
// puede martillear el scraping. Configurable para poder probarlo.
const REFRESH_RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutos
const REFRESH_RATE_MAX = Number(process.env.REFRESH_RATE_MAX) || 5;

// Orígenes permitidos para CORS. Por defecto solo producción y el dev server
// de Angular. `CORS_ORIGINS` (lista separada por comas) los sustituye, por
// ejemplo para cubrir las previsualizaciones de Vercel:
//   CORS_ORIGINS=https://labarcadelaparca.vercel.app,https://*.vercel.app,http://localhost:4200
// Cada entrada admite `*` como comodín.
const DEFAULT_CORS_ORIGINS = ['https://labarcadelaparca.vercel.app', 'http://localhost:4200'];

const CORS_ORIGIN_MATCHERS = (
  process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : DEFAULT_CORS_ORIGINS
)
  .map((origin) => origin.trim().replace(/\/$/, '').toLowerCase())
  .filter(Boolean)
  .map((pattern) => {
    if (!pattern.includes('*')) {
      return (origin) => origin === pattern;
    }
    const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`^${pattern.split('*').map(escapeRegExp).join('.*')}$`);
    return (origin) => regex.test(origin);
  });

// Las peticiones sin cabecera `Origin` (curl, health checks, mismo origen) no
// pasan por CORS, así que no hay nada que restringir.
function isOriginAllowed(origin) {
  if (!origin) return true;
  const normalized = origin.replace(/\/$/, '').toLowerCase();
  return CORS_ORIGIN_MATCHERS.some((matches) => matches(normalized));
}

app.use(
  cors({
    origin: (origin, callback) => callback(null, isOriginAllowed(origin)),
  }),
);
app.use(express.json());

// Players to track
const PLAYERS = {
  parca: '76561198301504889',
  peter: '76561198041309771',
  doda: '76561199015608983',
  kevin: '76561198143673849',
  kike: '76561198415119986',
  fede: '76561198395532972',
  porco: '76561199790384537',
  xuiz: '76561198186565967',
};

// Cache storage. `timestamp` solo se actualiza cuando los datos ya están
// listos; `startedAt` registra el inicio del refresco en curso.
let cache = {
  players: [],
  timestamp: 0,
  startedAt: null,
  lastFetch: null,
  status: 'idle',
};

// Promesa del refresco en curso, o null si no hay ninguno. Hace de guarda para
// que dos /api/refresh simultáneos no lancen ciclos en paralelo.
let refreshing = null;

// Fetch player profile + stats from csstats.gg
async function fetchCsstatsStats(steamId) {
  try {
    const { data } = await axios.get(`https://csstats.gg/player/${steamId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 15000,
    });

    const { stats, sources } = parseCsstatsHtml(data);

    if (sources.length === 0) {
      console.warn(
        `[csstats] No se pudo extraer ninguna estadística para ${steamId}: ` +
          'sin JSON-LD, sin __INITIAL_STATE__ y sin coincidencias por regex.',
      );
    } else if (sources.length === 1 && sources[0] === 'regex') {
      console.warn(
        `[csstats] ${steamId}: solo se pudo extraer mediante regex. ` +
          'Es probable que el HTML de csstats.gg haya cambiado.',
      );
    }

    return stats;
  } catch (error) {
    console.error(`Error fetching csstats for ${steamId}:`, error.message);
    return null;
  }
}

// Fetch player profile from Steam
async function fetchSteamProfile(steamId64) {
  // Si no hay clave configurada, no se consulta Steam (evita peticiones inválidas).
  if (!STEAM_API_KEY) {
    return null;
  }

  try {
    const { data } = await axios.get(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/`,
      {
        params: {
          steamids: steamId64,
          key: STEAM_API_KEY,
        },
        timeout: 15000,
      },
    );

    if (data.response?.players?.[0]) {
      const player = data.response.players[0];
      return {
        playerName: player.personaname,
        avatar: player.avatarfull,
        avatarMedium: player.avatarmedium,
        profileUrl: `https://steamcommunity.com/profiles/${steamId64}`,
        realName: player.realname,
      };
    }
  } catch (error) {
    console.error(`Error fetching Steam profile for ${steamId64}:`, error.message);
  }
  return null;
}

// Get full player stats (combined)
async function fetchPlayerData(steamId64, alias) {
  const [csstats, profile] = await Promise.allSettled([
    fetchCsstatsStats(steamId64),
    fetchSteamProfile(steamId64),
  ]);

  return {
    alias,
    playerName:
      profile.status === 'fulfilled' && profile.value?.playerName
        ? profile.value.playerName
        : alias,
    avatar: profile.status === 'fulfilled' && profile.value?.avatar ? profile.value.avatar : null,
    profileUrl:
      profile.status === 'fulfilled' && profile.value?.profileUrl ? profile.value.profileUrl : null,
    realName:
      profile.status === 'fulfilled' && profile.value?.realName ? profile.value.realName : null,
    stats: csstats.status === 'fulfilled' && csstats.value ? csstats.value : { ...EMPTY_STATS },
    source: csstats.status === 'fulfilled' && csstats.value ? 'csstats' : 'steam',
  };
}

/**
 * Ejecuta `mapper` sobre `items` con un máximo de `limit` promesas en vuelo,
 * preservando el orden de los resultados. Sustituye a la iteración en serie
 * para acelerar el refresco sin saturar csstats.gg/Steam.
 */
export async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length);
  const workerCount = Math.min(Math.max(1, Math.floor(limit) || 1), items.length);
  let nextIndex = 0;

  const workers = Array.from({ length: workerCount }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await mapper(items[index], index);
    }
  });

  await Promise.all(workers);
  return results;
}

async function runRefresh() {
  cache.status = 'loading';
  cache.startedAt = new Date().toISOString();

  const entries = Object.entries(PLAYERS);
  console.log(`[Cache] Refreshing stats for ${entries.length} players...`);

  try {
    const results = await mapWithConcurrency(
      entries,
      REFRESH_CONCURRENCY,
      async ([alias, steamId]) => {
        try {
          const player = await fetchPlayerData(steamId, alias);
          console.log(
            `[Cache] ${alias}: premier=${player.stats.premierRating}, rating=${player.stats.competitiveRating}, kd=${player.stats.kd}`,
          );
          return player;
        } catch (error) {
          console.error(`[Cache] Error fetching ${alias}:`, error.message);
          return null;
        }
      },
    );

    cache.players = results.filter(Boolean);
    // El timestamp refleja cuándo están listos los datos, no cuándo empezó el
    // refresco.
    cache.timestamp = Date.now();
    cache.lastFetch = new Date().toISOString();
    cache.status = 'ready';
    console.log(`[Cache] Refresh complete. ${cache.players.length} players loaded.`);
  } catch (error) {
    cache.status = 'error';
    console.error('[Cache] Refresh failed:', error);
    throw error;
  } finally {
    cache.startedAt = null;
  }
}

/**
 * Refresca la caché. Si ya hay un refresco en curso, devuelve esa misma promesa
 * en lugar de lanzar otro ciclo en paralelo.
 */
export function refreshCache() {
  if (refreshing) {
    console.log('[Cache] Refresh already in progress; reusing the current run.');
    return refreshing;
  }

  refreshing = runRefresh().finally(() => {
    refreshing = null;
  });

  return refreshing;
}

// Envuelve handlers async para que un rechazo llegue al middleware de errores
// en lugar de dejar la respuesta colgada.
export const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

// Rate limiting del refresco manual, aplicado antes de la autenticación para
// que ni siquiera un token válido permita disparar scraping sin freno.
const refreshLimiter = rateLimit({
  windowMs: REFRESH_RATE_WINDOW_MS,
  limit: REFRESH_RATE_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many refresh requests. Try again later.' },
});

const BEARER_PATTERN = /^Bearer\s+(.+)$/i;

/**
 * Compara dos cadenas en tiempo constante. Se hashean ambas para igualar sus
 * longitudes, porque `timingSafeEqual` exige buffers del mismo tamaño y lanzar
 * según la longitud ya filtraría información.
 */
function safeEqual(a, b) {
  const hashA = createHash('sha256').update(a).digest();
  const hashB = createHash('sha256').update(b).digest();
  return timingSafeEqual(hashA, hashB);
}

/**
 * Exige `Authorization: Bearer <REFRESH_TOKEN>` para forzar un refresco. Sin
 * secreto configurado el endpoint se comporta como inexistente.
 */
export function requireRefreshToken(req, res, next) {
  if (!REFRESH_TOKEN) {
    return res.status(404).json({ error: 'Not found' });
  }

  const header = req.headers?.authorization || '';
  const match = BEARER_PATTERN.exec(header);
  const provided = match ? match[1].trim() : '';

  if (!provided || !safeEqual(provided, REFRESH_TOKEN)) {
    res.set('WWW-Authenticate', 'Bearer');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}

// Routes
app.get('/api/players', (req, res) => {
  if (cache.status === 'loading') {
    return res.json({
      players: cache.players,
      timestamp: cache.timestamp,
      startedAt: cache.startedAt,
      status: 'refreshing',
      lastFetch: cache.lastFetch,
    });
  }

  if (cache.players.length === 0) {
    return res.json({
      players: [],
      timestamp: 0,
      status: 'needs_refresh',
      message: 'Cache is empty. Call /api/refresh to initialize.',
    });
  }

  res.json({
    players: cache.players,
    timestamp: cache.timestamp,
    status: 'ready',
    lastFetch: cache.lastFetch,
  });
});

app.get('/api/player/:alias', (req, res) => {
  const { alias } = req.params;
  const player = cache.players.find((p) => p.alias === alias);

  if (!player) {
    return res.status(404).json({ error: 'Player not found in cache' });
  }

  res.json({ player });
});

// Solo POST y autenticado: un GET público era cacheable/prefetchable y
// cualquiera podía disparar el scraping de 8 jugadores.
app.post(
  '/api/refresh',
  refreshLimiter,
  requireRefreshToken,
  asyncHandler(async (req, res) => {
    await refreshCache();
    res.json({
      message: 'Cache refreshed',
      players: cache.players.length,
      timestamp: cache.timestamp,
      lastFetch: cache.lastFetch,
    });
  }),
);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
    steamApiKey: STEAM_API_KEY ? 'configured' : 'not configured',
    cache: {
      status: cache.status,
      players: cache.players.length,
      lastFetch: cache.lastFetch,
      startedAt: cache.startedAt,
      timestamp: cache.timestamp,
    },
  });
});

// Middleware de errores global: registra el fallo y responde 500 en vez de
// dejar la petición sin contestar. Express lo reconoce por sus cuatro
// argumentos, aunque `next` no se use siempre.
export function errorHandler(err, req, res, next) {
  console.error('[Error]', err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: 'Internal server error' });
}

app.use(errorHandler);

export function getCache() {
  return cache;
}

function startServer() {
  // Carga inicial de la caché.
  refreshCache().catch((error) => {
    console.error('[Cache] Initial refresh failed:', error);
  });

  // Auto-refresh every 5 minutes
  setInterval(() => {
    refreshCache().catch((error) => {
      console.error('[Cache] Scheduled refresh failed:', error);
    });
  }, CACHE_DURATION);

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Steam API key: ${STEAM_API_KEY ? '✓ configured' : '✗ not configured'}`);
    console.log(`Cache refresh interval: ${CACHE_DURATION / 1000 / 60} minutes`);
    console.log(`Players to track: ${Object.keys(PLAYERS).length}`);
  });
}

// Solo arranca el servidor cuando el archivo se ejecuta directamente; al
// importarlo desde los tests no se abre el puerto ni se hace scraping.
if (process.argv[1] && resolve(process.argv[1]) === __filename) {
  startServer();
}

export { app, PLAYERS };
