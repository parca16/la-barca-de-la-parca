import { load } from 'cheerio';

/**
 * Scraping de csstats.gg.
 *
 * La extracción se separa de la descarga HTTP para poder testearla con fixtures.
 * Estrategias, en orden de prioridad:
 *   1. `__INITIAL_STATE__` (estado serializado de la app, el más completo).
 *   2. JSON-LD (`script[type="application/ld+json"]`).
 *   3. Regex sobre el HTML completo (fallback frágil, solo rellena huecos).
 *
 * Cada estrategia solo escribe los campos que siguen sin valor, de modo que una
 * fuente de mayor prioridad nunca es pisada por otra de menor prioridad.
 */

/** Stats por defecto cuando no se puede extraer nada. */
export const EMPTY_STATS = Object.freeze({
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
});

const ALL_FIELDS = Object.keys(EMPTY_STATS);
const INT_FIELDS = new Set(['premierRating', 'competitiveRating', 'wins', 'matches', 'wins_p1']);
const JSON_LD_FIELDS = ['premierRating', 'competitiveRating', 'wins', 'kd', 'headshotPct'];

// Fallback por regex sobre el HTML completo.
const HTML_PATTERNS = [
  ['premierRating', /"premierRating"\s*:\s*(\d+)/],
  ['competitiveRating', /"competitiveRating"\s*:\s*(\d+)/],
  ['kd', /"kd"\s*:\s*([\d.]+)/],
  ['headshotPct', /"headshotPct"\s*:\s*([\d.]+)/],
  ['adr', /"adr"\s*:\s*([\d.]+)/],
  ['kast', /"kast"\s*:\s*([\d.]+)/],
  ['rating', /"rating"\s*:\s*([\d.]+)/],
  ['wins', /"wins"\s*:\s*(\d+)/],
  ['matches', /"matches"\s*:\s*(\d+)/],
  ['wins_p1', /"wins_p1"\s*:\s*(\d+)/],
];

/** Normaliza un valor crudo al tipo esperado; devuelve null si no es numérico. */
function normalizeValue(field, raw) {
  if (raw === undefined || raw === null || raw === '') return null;
  const num = INT_FIELDS.has(field) ? parseInt(raw, 10) : parseFloat(raw);
  return Number.isFinite(num) ? num : null;
}

/**
 * Devuelve el objeto JSON balanceado que empieza en `start`, respetando las
 * llaves que aparecen dentro de cadenas. Evita el `eval` que usaba antes.
 */
function readBalancedObject(text, start) {
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < text.length; i++) {
    const char = text[i];

    if (inString) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === '"') inString = false;
      continue;
    }

    if (char === '"') {
      inString = true;
    } else if (char === '{') {
      depth++;
    } else if (char === '}') {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }

  return null;
}

/** Extrae y parsea `window.__INITIAL_STATE__` si está presente. */
export function extractInitialState(html) {
  const marker = '__INITIAL_STATE__';
  const markerIndex = html.indexOf(marker);
  if (markerIndex === -1) return null;

  const start = html.indexOf('{', markerIndex + marker.length);
  if (start === -1) return null;

  const jsonText = readBalancedObject(html, start);
  if (!jsonText) return null;

  try {
    return JSON.parse(jsonText);
  } catch {
    return null;
  }
}

/** Stats del estado inicial (`profile.stats`), o null si no existen. */
function extractInitialStateStats(html) {
  const state = extractInitialState(html);
  const stats = state?.profile?.stats;
  return stats && typeof stats === 'object' ? stats : null;
}

/** Recorre una única vez los JSON-LD y devuelve las stats que exponen. */
function extractJsonLdStats($) {
  const partial = {};

  $('script[type="application/ld+json"]').each((_, element) => {
    let json;
    try {
      json = JSON.parse($(element).text());
    } catch {
      return;
    }

    const entries = Array.isArray(json) ? json : [json];
    for (const entry of entries) {
      const stats = entry?.stats;
      if (!stats || typeof stats !== 'object') continue;

      for (const field of JSON_LD_FIELDS) {
        if (partial[field] === undefined && stats[field] !== undefined && stats[field] !== null) {
          partial[field] = stats[field];
        }
      }
    }
  });

  return partial;
}

/** Último recurso: busca cada campo con una regex sobre el HTML completo. */
function extractRegexStats(html) {
  const partial = {};

  for (const [field, pattern] of HTML_PATTERNS) {
    const match = html.match(pattern);
    if (match) partial[field] = match[1];
  }

  return partial;
}

/**
 * Parsea el HTML de un perfil de csstats.gg.
 * @param {string} html
 * @returns {{ stats: typeof EMPTY_STATS, sources: string[] }}
 */
export function parseCsstatsHtml(html) {
  const stats = { ...EMPTY_STATS };
  const filled = new Set();
  const sources = [];

  const apply = (source, partial) => {
    if (!partial) return;

    let touched = false;
    for (const field of ALL_FIELDS) {
      if (filled.has(field)) continue;

      const value = normalizeValue(field, partial[field]);
      if (value === null) continue;

      stats[field] = value;
      filled.add(field);
      touched = true;
    }

    if (touched) sources.push(source);
  };

  const $ = load(html);
  apply('initial-state', extractInitialStateStats(html));
  apply('json-ld', extractJsonLdStats($));
  apply('regex', extractRegexStats(html));

  return { stats, sources };
}
