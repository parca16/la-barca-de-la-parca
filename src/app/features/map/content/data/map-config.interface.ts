export interface MapConfig {
  key: string;
  title: string;
  ideas: {
    heading: string;
    text: string;
  }[];
  calloutsImage: string;
  strategies: {
    side: 'T' | 'CT';
    name: string;
    description: string;
    minimaps: string[];
    timing?: { action: string; seconds: number }[];
    roles: {
      player: string;
      role: string;
      utility: string;
    }[];
  }[];
}