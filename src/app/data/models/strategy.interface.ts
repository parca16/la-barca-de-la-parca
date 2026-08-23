export interface Strategy {
  id: string;
  map: string;
  side: 'CT' | 'T';
  round: string;
  name: string;
  description: string;
  roles: {
    player: string;
    role: string;
    utility: string;
  }[];
  timing: {
    action: string;
    seconds: number;
  }[];
}