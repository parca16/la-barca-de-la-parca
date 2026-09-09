import express from 'express';
import axios from 'axios';
import { load } from 'cheerio';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const STEAM_API_KEY = process.env.STEAM_API_KEY || 'YOUR_STEAM_API_KEY_HERE';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

app.use(cors());
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

    const stats = {
      premierRating: null,
      competitiveRating: null,
      wins: 0,
      kd: 0,
      headshotPct: 0,
      adr: 0,
      kast: 0,
      rating: 0,
      matches: 0,
      wins_p1: 0,
    };

    // Load HTML with cheerio
    const $ = load(data);

    // Try to find stats from inline script data
    const scripts = $('script').toArray();
    
    for (const script of scripts) {
      const text = $(script).text();
      
      // Look for JSON-LD data
      if (text.includes('application/ld+json')) {
        try {
          // Find JSON-LD in the page
          const jsonLdScripts = $('script[type="application/ld+json"]').toArray();
          for (const jsonScript of jsonLdScripts) {
            const jsonText = $(jsonScript).text();
            try {
              const json = JSON.parse(jsonText);
              if (json?.stats) {
                if (json.stats.premierRating) stats.premierRating = json.stats.premierRating;
                if (json.stats.competitiveRating) stats.competitiveRating = json.stats.competitiveRating;
                if (json.stats.wins) stats.wins = json.stats.wins;
                if (json.stats.kd) stats.kd = json.stats.kd;
                if (json.stats.headshotPct) stats.headshotPct = json.stats.headshotPct;
              }
            } catch (e) {
              // ignore
            }
          }
        } catch (e) {
          // ignore
        }
      }
      
      // Look for window.__INITIAL_STATE__ or similar
      if (text.includes('premierRating') || text.includes('competitiveRating')) {
        try {
          const stateMatch = text.match(/(?:window\s*\.\s*)?__INITIAL_STATE__\s*=\s*(\{[\s\S]*?\});/);
          if (stateMatch) {
            // eslint-disable-next-line no-eval
            const stateData = eval(`(${stateMatch[1]})`);
            if (stateData?.profile?.stats) {
              stats.premierRating = stateData.profile.stats.premierRating || null;
              stats.competitiveRating = stateData.profile.stats.competitiveRating || null;
              stats.wins = stateData.profile.stats.wins || 0;
              stats.kd = stateData.profile.stats.kd || 0;
              stats.headshotPct = stateData.profile.stats.headshotPct || 0;
              stats.adr = stateData.profile.stats.adr || 0;
              stats.kast = stateData.profile.stats.kast || 0;
              stats.rating = stateData.profile.stats.rating || 0;
              stats.matches = stateData.profile.stats.matches || 0;
              stats.wins_p1 = stateData.profile.stats.wins_p1 || 0;
            }
          }
        } catch (e) {
          // ignore
        }
      }
    }

    // Also try direct regex matching
    try {
      const premierMatch = data.match(/"premierRating"\s*:\s*(\d+)/);
      if (premierMatch) stats.premierRating = parseInt(premierMatch[1]);
      
      const compMatch = data.match(/"competitiveRating"\s*:\s*(\d+)/);
      if (compMatch) stats.competitiveRating = parseInt(compMatch[1]);
      
      const kdMatch = data.match(/"kd"\s*:\s*([\d.]+)/);
      if (kdMatch) stats.kd = parseFloat(kdMatch[1]);
      
      const hsMatch = data.match(/"headshotPct"\s*:\s*([\d.]+)/);
      if (hsMatch) stats.headshotPct = parseFloat(hsMatch[1]);
      
      const adrMatch = data.match(/"adr"\s*:\s*([\d.]+)/);
      if (adrMatch) stats.adr = parseFloat(adrMatch[1]);
      
      const kastMatch = data.match(/"kast"\s*:\s*([\d.]+)/);
      if (kastMatch) stats.kast = parseFloat(kastMatch[1]);
      
      const ratingMatch = data.match(/"rating"\s*:\s*([\d.]+)/);
      if (ratingMatch) stats.rating = parseFloat(ratingMatch[1]);
      
      const winsMatch = data.match(/"wins"\s*:\s*(\d+)/);
      if (winsMatch) stats.wins = parseInt(winsMatch[1]);
      
      const matchesMatch = data.match(/"matches"\s*:\s*(\d+)/);
      if (matchesMatch) stats.matches = parseInt(matchesMatch[1]);
      
      const wins_p1Match = data.match(/"wins_p1"\s*:\s*(\d+)/);
      if (wins_p1Match) stats.wins_p1 = parseInt(wins_p1Match[1]);
    } catch (e) {
      // ignore regex errors
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
    stats: csstats.status === 'fulfilled' && csstats.value ? csstats.value : {
      premierRating: null,
      competitiveRating: null,
      wins: 0,
      kd: 0,
      headshotPct: 0,
      adr: 0,
      kast: 0,
      rating: 0,
      matches: 0,
      wins_p1: 0,
    },
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