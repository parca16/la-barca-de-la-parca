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

export interface Player {
  name: string;
  alias: string;
  role: string; // El rol principal se define aquí
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
}