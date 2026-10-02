import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import { EMPTY_STATS, parseCsstatsHtml } from './csstats.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const STEAM_API_KEY = process.env.STEAM_API_KEY || 'YOUR_STEAM_API_KEY_HERE';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Orígenes permitidos para CORS. Por defecto solo producción y el dev server
// de Angular. `CORS_ORIGINS` (lista separada por comas) los sustituye, por
// ejemplo para cubrir las previsualizaciones de Vercel:
//   CORS_ORIGINS=https://labarcadelaparca.vercel.app,https://*.vercel.app,http://localhost:4200
// Cada entrada admite `*` como comodín.
const DEFAULT_CORS_ORIGINS = [
  'https://labarcadelaparca.vercel.app',
  'http://localhost:4200',
];

const CORS_ORIGIN_MATCHERS = (
  process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : DEFAULT_CORS_ORIGINS
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
  })
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

// Cache storage
let cache = {
  players: [],
  timestamp: 0,
  lastFetch: null,
  status: 'idle',
};

// Fetch player profile + stats from csstats.gg
async function fetchCsstatsStats(steamId) {
  try {
    const { data } = await axios.get(`https://csstats.gg/player/${steamId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 15000,
    });

    const { stats, sources } = parseCsstatsHtml(data);

    if (sources.length === 0) {
      console.warn(
        `[csstats] No se pudo extraer ninguna estadística para ${steamId}: ` +
          'sin JSON-LD, sin __INITIAL_STATE__ y sin coincidencias por regex.'
      );
    } else if (sources.length === 1 && sources[0] === 'regex') {
      console.warn(
        `[csstats] ${steamId}: solo se pudo extraer mediante regex. ` +
          'Es probable que el HTML de csstats.gg haya cambiado.'
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
  try {
    const { data } = await axios.get(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/`,
      {
        params: {
          steamids: steamId64,
          key: STEAM_API_KEY,
        },
        timeout: 15000,
      }
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
    playerName: profile.status === 'fulfilled' && profile.value?.playerName ? profile.value.playerName : alias,
    avatar: profile.status === 'fulfilled' && profile.value?.avatar ? profile.value.avatar : null,
    profileUrl: profile.status === 'fulfilled' && profile.value?.profileUrl ? profile.value.profileUrl : null,
    realName: profile.status === 'fulfilled' && profile.value?.realName ? profile.value.realName : null,
    stats: csstats.status === 'fulfilled' && csstats.value ? csstats.value : { ...EMPTY_STATS },
    source: csstats.status === 'fulfilled' && csstats.value ? 'csstats' : 'steam',
  };
}

// Refresh cache
async function refreshCache() {
  cache.status = 'loading';
  cache.lastFetch = new Date().toISOString();
  cache.timestamp = Date.now();

  console.log(`[Cache] Refreshing stats for ${Object.keys(PLAYERS).length} players...`);

  const results = [];
  for (const [alias, steamId] of Object.entries(PLAYERS)) {
    try {
      const stats = await fetchPlayerData(steamId, alias);
      results.push(stats);
      console.log(`[Cache] ${alias}: premier=${stats.stats.premierRating}, rating=${stats.stats.competitiveRating}, kd=${stats.stats.kd}`);
    } catch (error) {
      console.error(`[Cache] Error fetching ${alias}:`, error.message);
    }
  }

  cache.players = results;
  cache.status = 'ready';
  console.log(`[Cache] Refresh complete. ${results.length} players loaded.`);
}

// Routes
app.get('/api/players', (req, res) => {
  if (cache.status === 'loading') {
    return res.json({
      players: cache.players,
      timestamp: cache.timestamp,
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

app.get('/api/refresh', async (req, res) => {
  await refreshCache();
  res.json({
    message: 'Cache refreshed',
    players: cache.players.length,
    timestamp: cache.timestamp,
    lastFetch: cache.lastFetch,
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
    steamApiKey: STEAM_API_KEY !== 'YOUR_STEAM_API_KEY_HERE' ? 'configured' : 'not configured',
    cache: {
      status: cache.status,
      players: cache.players.length,
      lastFetch: cache.lastFetch,
      timestamp: cache.timestamp,
    },
  });
});

// Start initial cache load
refreshCache();

// Auto-refresh every 5 minutes
setInterval(refreshCache, CACHE_DURATION);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Steam API key: ${STEAM_API_KEY !== 'YOUR_STEAM_API_KEY_HERE' ? '✓ configured' : '✗ not configured'}`);
  console.log(`Cache refresh interval: ${CACHE_DURATION / 1000 / 60} minutes`);
  console.log(`Players to track: ${Object.keys(PLAYERS).length}`);
});