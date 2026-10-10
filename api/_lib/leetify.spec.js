import {
  buildPlayerStats,
  fetchPlayerStats,
  normalizeSteam64,
  summarizeMatches,
} from './leetify.js';

const STEAM64 = '76561198143673849';

const profile = {
  name: 'Kevs',
  privacy_mode: 'public',
  winrate: 0.6333,
  total_matches: 1950,
  ranks: { leetify: 1.14, premier: 21983 },
  rating: { aim: 79.95, positioning: 66.27, utility: 60.89 },
  stats: {
    preaim: 10.27,
    accuracy_head: 23.35,
    utility_on_death_avg: 488.59,
    counter_strafing_good_shots_ratio: 81.01,
    spray_accuracy: 45.85,
  },
};

const matches = [
  {
    stats: [
      {
        steam64_id: STEAM64,
        total_kills: 20,
        total_deaths: 10,
        total_assists: 5,
        total_damage: 2000,
        rounds_count: 24,
      },
      // Stats de otro jugador: no deben contarse.
      {
        steam64_id: '76561190000000000',
        total_kills: 99,
        total_deaths: 1,
        total_assists: 99,
        total_damage: 9999,
        rounds_count: 1,
      },
    ],
  },
  {
    stats: [
      {
        steam64_id: STEAM64,
        total_kills: 10,
        total_deaths: 10,
        total_assists: 5,
        total_damage: 1000,
        rounds_count: 26,
      },
    ],
  },
];

describe('normalizeSteam64', () => {
  it('acepta un SteamID64 de 17 dígitos', () => {
    expect(normalizeSteam64(STEAM64)).toBe(STEAM64);
    expect(normalizeSteam64(`  ${STEAM64}  `)).toBe(STEAM64);
  });

  it('rechaza valores que no son 17 dígitos', () => {
    expect(normalizeSteam64('123')).toBeNull();
    expect(normalizeSteam64('7656119814367384a')).toBeNull();
    expect(normalizeSteam64(undefined)).toBeNull();
    expect(normalizeSteam64('')).toBeNull();
  });
});

describe('summarizeMatches', () => {
  it('deriva KDA y ADR solo con las stats del jugador objetivo', () => {
    const { kda, adr } = summarizeMatches(matches, STEAM64);
    // (30 kills + 10 assists) / 20 deaths = 2
    expect(kda).toBeCloseTo(2, 5);
    // 3000 daño / 50 rondas = 60
    expect(adr).toBeCloseTo(60, 5);
  });

  it('devuelve null sin denominador', () => {
    expect(summarizeMatches([], STEAM64)).toEqual({ kda: null, adr: null });
  });
});

describe('buildPlayerStats', () => {
  it('mapea perfil y derivados al shape de la tarjeta', () => {
    const stats = buildPlayerStats(profile, matches, STEAM64, '2026-10-09T00:00:00.000Z');

    expect(stats).toMatchObject({
      steam64Id: STEAM64,
      name: 'Kevs',
      privacyMode: 'public',
      premier: 21983,
      leetifyRating: 1.14,
      winrate: 0.6333,
      totalMatches: 1950,
      skills: { aim: 79.95, positioning: 66.27, utility: 60.89 },
      highlights: {
        crosshairPlacement: 10.27,
        headshotPct: 23.35,
        utilityOnDeath: 488.59,
        counterStrafingPct: 81.01,
        sprayAccuracyPct: 45.85,
      },
    });
    expect(stats.kda).toBeCloseTo(2, 5);
    expect(stats.highlights.adr).toBeCloseTo(60, 5);
  });

  it('deja en null los campos ausentes y marca perfil privado', () => {
    const stats = buildPlayerStats({ privacy_mode: 'private' }, [], STEAM64, 'now');
    expect(stats.privacyMode).toBe('private');
    expect(stats.premier).toBeNull();
    expect(stats.leetifyRating).toBeNull();
    expect(stats.kda).toBeNull();
    expect(stats.highlights.adr).toBeNull();
    expect(stats.skills).toEqual({ aim: null, positioning: null, utility: null });
  });

  it('tolera un perfil vacío sin lanzar', () => {
    expect(() => buildPlayerStats(null, null, STEAM64, 'now')).not.toThrow();
    const stats = buildPlayerStats(null, null, STEAM64, 'now');
    expect(stats.privacyMode).toBe('unknown');
  });
});

describe('fetchPlayerStats', () => {
  const jsonResponse = (body, status = 200) => ({
    ok: status >= 200 && status < 300,
    status,
    headers: { get: () => null },
    json: async () => body,
  });

  it('combina perfil y partidas de Leetify', async () => {
    const fetchImpl = async (url) =>
      url.includes('/matches') ? jsonResponse(matches) : jsonResponse(profile);

    const stats = await fetchPlayerStats(STEAM64, { fetchImpl });
    expect(stats.premier).toBe(21983);
    expect(stats.kda).toBeCloseTo(2, 5);
    expect(stats.highlights.adr).toBeCloseTo(60, 5);
  });

  it('mantiene el perfil aunque fallen las partidas', async () => {
    const previous = process.env['LEETIFY_MAX_RETRIES'];
    process.env['LEETIFY_MAX_RETRIES'] = '0';
    try {
      const fetchImpl = async (url) => {
        if (url.includes('/matches')) return jsonResponse({}, 500);
        return jsonResponse(profile);
      };

      const stats = await fetchPlayerStats(STEAM64, { fetchImpl });
      expect(stats.premier).toBe(21983);
      expect(stats.kda).toBeNull();
      expect(stats.highlights.adr).toBeNull();
    } finally {
      if (previous === undefined) delete process.env['LEETIFY_MAX_RETRIES'];
      else process.env['LEETIFY_MAX_RETRIES'] = previous;
    }
  });

  it('lanza si falla el perfil', async () => {
    const fetchImpl = async () => jsonResponse({}, 404);
    await expect(fetchPlayerStats(STEAM64, { fetchImpl })).rejects.toThrow('Leetify 404');
  });
});
