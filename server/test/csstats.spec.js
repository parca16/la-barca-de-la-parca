import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';
import { EMPTY_STATS, extractInitialState, parseCsstatsHtml } from '../csstats.js';

const fixture = (name) => readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf8');

describe('parseCsstatsHtml', () => {
  it('extrae las stats del JSON-LD', () => {
    const { stats, sources } = parseCsstatsHtml(fixture('json-ld.html'));

    expect(stats).toEqual({
      ...EMPTY_STATS,
      premierRating: 18500,
      competitiveRating: 12,
      wins: 842,
      kd: 1.12,
      headshotPct: 48.5,
    });
    expect(sources).toEqual(['json-ld']);
  });

  it('extrae todas las stats del estado inicial', () => {
    const { stats, sources } = parseCsstatsHtml(fixture('initial-state.html'));

    expect(stats).toEqual({
      premierRating: 20123,
      competitiveRating: 15,
      wins: 910,
      kd: 1.23,
      headshotPct: 51.75,
      adr: 88.4,
      kast: 72.1,
      rating: 1.18,
      matches: 640,
      wins_p1: 320,
    });
    expect(sources).toEqual(['initial-state']);
  });

  it('ignora las llaves dentro de cadenas al balancear el estado inicial', () => {
    const state = extractInitialState(fixture('initial-state.html'));

    expect(state.profile.motto).toBe('hola {mundo} \\o/');
    expect(state.profile.stats.matches).toBe(640);
  });

  it('usa el fallback por regex si no hay datos estructurados', () => {
    const { stats, sources } = parseCsstatsHtml(fixture('regex-only.html'));

    expect(stats).toEqual({
      premierRating: 15000,
      competitiveRating: 8,
      wins: 500,
      kd: 0.95,
      headshotPct: 44.2,
      adr: 75.1,
      kast: 68.9,
      rating: 1.01,
      matches: 420,
      wins_p1: 210,
    });
    expect(sources).toEqual(['regex']);
  });

  it('prioriza el estado inicial sobre el JSON-LD y el regex', () => {
    const { stats, sources } = parseCsstatsHtml(fixture('precedencia.html'));

    expect(stats.premierRating).toBe(22222);
    expect(stats.competitiveRating).toBe(2);
    expect(stats.wins).toBe(222);
    expect(stats.kd).toBe(1.22);
    expect(stats.headshotPct).toBe(22.2);
    expect(stats.adr).toBe(222.2);
    expect(sources).toEqual(['initial-state']);
  });

  it('rellena con regex los campos que faltan en las fuentes estructuradas', () => {
    const { stats, sources } = parseCsstatsHtml(fixture('partial.html'));

    expect(stats.adr).toBe(90.5);
    expect(stats.kd).toBe(1.42);
    expect(stats.wins).toBe(700);
    expect(stats.headshotPct).toBe(55.5);
    expect(sources).toEqual(['initial-state', 'regex']);
  });

  it('devuelve stats vacías y sin fuentes cuando el HTML no trae datos', () => {
    const { stats, sources } = parseCsstatsHtml(fixture('empty.html'));

    expect(stats).toEqual(EMPTY_STATS);
    expect(sources).toEqual([]);
  });

  it('no rompe si el JSON-LD está malformado', () => {
    const html = '<script type="application/ld+json">{ no es json }</script>';
    const { stats, sources } = parseCsstatsHtml(html);

    expect(stats).toEqual(EMPTY_STATS);
    expect(sources).toEqual([]);
  });
});
