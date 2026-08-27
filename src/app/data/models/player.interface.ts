export interface PlayerStats {
  rating: number;
  kdr: number;
  headshotPct: number;
}

export interface PlayerPlay {
  map: string;
  title: string;
  description: string;
  clipUrl?: string;
}

export interface PremierSeason {
  season: string;
  year: string;
  wins: number;
  rating: number;
  bestRating: number;
}

export interface FaceitData {
  level: number;
  elo: number;
  url?: string;
}

export interface MapStats {
  map: string;
  matches: number;
  wins: number;
  winPct: number;
  kdr: number;
}

export interface PlayerGameStats {
  matches: number;
  kdr: number;
  headshotPct: number;
  winPct: number;
  mvp: number;
  maps: MapStats[];
}

export interface Player {
  name: string;
  alias: string;
  role: string;
  nationality: string;
  age: number;
  photoUrl: string;
  joined: string;
  bio: string;
  statsT?: PlayerStats;
  statsCT?: PlayerStats;
  playsT?: PlayerPlay[];
  playsCT?: PlayerPlay[];
  rating?: number;
  kdr?: number;
  headshotPct?: number;
  hsColor?: string;
  borderColor?: string;
  posicionDesc: string;
  virtudes: string[];
  defectos: string[];
  perfilPsicologico: string;
  premier?: PremierSeason[];
  faceit?: FaceitData;
  gameStats?: PlayerGameStats;
}