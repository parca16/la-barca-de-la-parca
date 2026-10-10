/**
 * Estadísticas de un jugador obtenidas de Leetify y ya normalizadas por
 * `GET /api/stats/:steam64`. Los campos nulos se pintan como `—`.
 */
export interface PlayerSkills {
  aim: number | null;
  positioning: number | null;
  utility: number | null;
}

export interface PlayerHighlights {
  /** Crosshair placement / preaim en grados (menos es mejor). */
  crosshairPlacement: number | null;
  headshotPct: number | null;
  /** Valor de la utilidad que el jugador llevaba sin usar al morir (menos es mejor). */
  utilityOnDeath: number | null;
  counterStrafingPct: number | null;
  /** ADR sobre las últimas ~100 partidas. */
  adr: number | null;
  sprayAccuracyPct: number | null;
}

export interface PlayerStats {
  steam64Id: string;
  name: string | null;
  privacyMode: string;
  syncedAt: string;
  premier: number | null;
  leetifyRating: number | null;
  /** K/D (kills/deaths) sobre las últimas ~100 partidas. */
  kd: number | null;
  winrate: number | null;
  totalMatches: number | null;
  skills: PlayerSkills;
  highlights: PlayerHighlights;
}
