export interface Player {
  name: string;
  alias: string;
  role: string;
  nationality: string;
  age: number;
  photoUrl: string;
  joined: string;
  bio: string;
  rating?: number;
  kdr?: number;
  headshotPct?: number;
  hsColor?: string;
  borderColor?: string;
}