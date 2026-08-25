import express from 'express';
import axios from 'axios';
import { load } from 'cheerio';
import cors from 'cors';

const app = express();
const PORT = 3000;
const STEAM_API_KEY = 'C311BD66DEE2C26397D08B40E10C84D4';

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
};

// csstats.gg profile scraping
async function fetchCsstatsProfile(steamId) {
  try {
    const { data } = await axios.get(`https://csstats.gg/player/${steamId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 15000,
    });

    const $ = load(data);
    const profileData = {
      playerName: null,
      avatar: null,
      premier: null,
      competitive: null,
    };

    // Try to find player name
    const playerNameSelector = $('.player-name, #player-name, h1.player-name, .profile-name');
    if (playerNameSelector.length) {
      profileData.playerName = playerNameSelector.text().trim();
    }

    // Try to find avatar
    const avatarSelector = $('.player-avatar img, #player-avatar img, .profile-avatar img');
    if (avatarSelector.length) {
      profileData.avatar = avatarSelector.attr('src');
    }

    // Parse stats from JSON-LD or script tags
    const scripts = $('script[type="application/ld+json"]').toArray();
    for (const script of scripts) {
      const text = $(script).text();
      try {
        const json = JSON.parse(text);
        if (json['@type'] === 'Person' && json.name) {
          profileData.playerName = json.name;
        }
        if (json.stats) {
          profileData.stats = json.stats;
        }
      } catch {
        // ignore
      }
    }

    // Parse inline script data
    $('script').each((i, el) => {
      const text = $(el).text();
      if (text.includes('kpd') || text.includes('rating')) {
        try {
          const statsMatch = text.match(/stats\s*=\s*(\{.*?\});/s);
          if (statsMatch) {
            // eslint-disable-next-line no-eval
            const statsData = eval(`(${statsMatch[1]})`);
            if (statsData.overall || statsData.premier) {
              profileData.stats = { ...statsData };
            }
          }
        } catch {
          // ignore parse errors
        }
      }
    });

    return profileData;
  } catch (error) {
    console.error(`Error fetching csstats for ${steamId}:`, error.message);
    return null;
  }
}

// Steam API wrapper - competitive matches only
async function fetchSteamMatches(steamId64) {
  try {
    // Convert 64-bit SteamID to account ID
    const accountId = (BigInt(steamId64) - BigInt(76561197960265728)).toString();

    const { data } = await axios.get(
      `https://api.steampowered.com/IEconItems_730/GetGameMatchHistory/v1`,
      {
        params: {
          account_id: accountId,
          game_build: '1572490',
          key: STEAM_API_KEY,
          limit: 50,
        },
        timeout: 15000,
      }
    );

    return data.matches || [];
  } catch (error) {
    console.error(`Error fetching Steam matches for ${steamId64}:`, error.message);
    return [];
  }
}

// Parse stats from Steam match history
function computeFromSteamMatches(steamId64, matches) {
  if (!matches.length) {
    return {
      totalMatches: 0,
      avgKills: 0,
      avgDeaths: 0,
      avgAssists: 0,
      avgKd: 0,
      avgHeadshotPct: 0,
      avgRating: 0,
    };
  }

  let totalKills = 0;
  let totalDeaths = 0;
  let totalAssists = 0;
  let totalHS = 0;
  let matchCount = 0;
  const AVG_ROUNDS = 35;
  let totalRounds = 0;

  for (const match of matches) {
    if (!match.ranking || !Array.isArray(match.ranking)) continue;

    const playerStats = match.ranking.find(
      (r) => r.steamid === steamId64
    );

    if (!playerStats?.stats) continue;

    matchCount++;
    totalKills += playerStats.stats.kills || 0;
    totalDeaths += playerStats.stats.deaths || 0;
    totalAssists += playerStats.stats.assists || 0;
    totalHS += playerStats.stats.headshot_percentage || 0;
    totalRounds += AVG_ROUNDS;
  }

  if (matchCount === 0) {
    return {
      totalMatches: 0,
      avgKills: 0,
      avgDeaths: 0,
      avgAssists: 0,
      avgKd: 0,
      avgHeadshotPct: 0,
      avgRating: 0,
    };
  }

  return {
    totalMatches: matchCount,
    avgKills: parseFloat((totalKills / matchCount).toFixed(2)),
    avgDeaths: parseFloat((totalDeaths / matchCount).toFixed(2)),
    avgAssists: parseFloat((totalAssists / matchCount).toFixed(2)),
    avgKd: totalDeaths > 0 ? parseFloat((totalKills / totalDeaths).toFixed(2)) : totalKills,
    avgHeadshotPct: parseFloat((totalHS / matchCount).toFixed(1)),
    avgRating: parseFloat(
      Math.max(0.01, Math.min(2.0, (totalKills - totalDeaths) / totalRounds + 0.5)).toFixed(2)
    ),
  };
}

// Get full player stats (combined)
async function getPlayerStats(steamId64, alias) {
  // Try csstats.gg first
  const csstats = await fetchCsstatsProfile(steamId64);

  // Always fetch Steam API for competitive data
  const matches = await fetchSteamMatches(steamId64);
  const steamStats = computeFromSteamMatches(steamId64, matches);

  return {
    alias,
    playerName: csstats?.playerName || alias,
    avatar: csstats?.avatar,
    stats: steamStats,
    source: steamStats.totalMatches > 0 ? 'steam' : 'mock',
  };
}

// Routes
app.get('/api/players', async (req, res) => {
  const results = [];

  for (const [alias, steamId] of Object.entries(PLAYERS)) {
    const stats = await getPlayerStats(steamId, alias);
    results.push(stats);
  }

  res.json({ players: results, timestamp: Date.now() });
});

app.get('/api/player/:alias', async (req, res) => {
  const { alias } = req.params;
  const steamId = PLAYERS[alias];

  if (!steamId) {
    return res.status(404).json({ error: 'Player not found' });
  }

  const stats = await getPlayerStats(steamId, alias);
  res.json({ player: stats });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
    steamApiKey: STEAM_API_KEY !== 'YOUR_STEAM_API_KEY_HERE' ? 'configured' : 'not configured',
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Steam API key: ${STEAM_API_KEY !== 'YOUR_STEAM_API_KEY_HERE' ? '✓ configured' : '✗ not configured'}`);
});