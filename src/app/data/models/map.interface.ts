export interface Map {
  name: string;
  type: 'competitive' | 'deathmatch' | 'competitive-only';
  image: string;
  description: string;
  attackSites: string[];
  averageRounds: number;
  winsCT: number;
  winsT: number;
}