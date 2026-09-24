export interface MapInfo {
  /** Route key, e.g. 'dust-2'. */
  key: string;
  /** Display name, e.g. 'Dust 2'. */
  name: string;
  /** Competitive pool the map belongs to. */
  pool: 'active' | 'inactive';
  /** Card image shown in the map grids. */
  cardImage: string;
  /** Header image used by the page heroes. */
  headerImage: string;
  /** Folder under `assets/utilidades` that holds the utility images. */
  utilitiesFolder: string;
}

export const MAPS: MapInfo[] = [
  {
    key: 'dust-2',
    name: 'Dust 2',
    pool: 'active',
    cardImage: '/assets/maps/Dust2.webp',
    headerImage: '/assets/map-headers/Dust2_header.webp',
    utilitiesFolder: 'dust2',
  },
  {
    key: 'mirage',
    name: 'Mirage',
    pool: 'active',
    cardImage: '/assets/maps/Mirage.webp',
    headerImage: '/assets/map-headers/Mirage_header.webp',
    utilitiesFolder: 'mirage',
  },
  {
    key: 'inferno',
    name: 'Inferno',
    pool: 'active',
    cardImage: '/assets/maps/Inferno.webp',
    headerImage: '/assets/map-headers/Inferno_header.webp',
    utilitiesFolder: 'inferno',
  },
  {
    key: 'nuke',
    name: 'Nuke',
    pool: 'active',
    cardImage: '/assets/maps/Nuke.webp',
    headerImage: '/assets/map-headers/Nuke_header.webp',
    utilitiesFolder: 'nuke',
  },
  {
    key: 'ancient',
    name: 'Ancient',
    pool: 'active',
    cardImage: '/assets/maps/Ancient.webp',
    headerImage: '/assets/map-headers/Ancient_header.webp',
    utilitiesFolder: 'ancient',
  },
  {
    key: 'anubis',
    name: 'Anubis',
    pool: 'active',
    cardImage: '/assets/maps/Anubis.webp',
    headerImage: '/assets/map-headers/Anubis_header.webp',
    utilitiesFolder: 'anubis',
  },
  {
    key: 'cache',
    name: 'Cache',
    pool: 'active',
    cardImage: '/assets/maps/Cache.webp',
    headerImage: '/assets/map-headers/Cache_header.webp',
    utilitiesFolder: 'cache',
  },
  {
    key: 'overpass',
    name: 'Overpass',
    pool: 'inactive',
    cardImage: '/assets/maps/Overpass.webp',
    headerImage: '/assets/map-headers/Overpass_header.webp',
    utilitiesFolder: 'overpass',
  },
  {
    key: 'vertigo',
    name: 'Vertigo',
    pool: 'inactive',
    cardImage: '/assets/maps/Vertigo.webp',
    headerImage: '/assets/map-headers/Vertigo_header.webp',
    utilitiesFolder: 'vertigo',
  },
  {
    key: 'train',
    name: 'Train',
    pool: 'inactive',
    cardImage: '/assets/maps/Train.webp',
    headerImage: '/assets/map-headers/Train_header.webp',
    utilitiesFolder: 'train',
  },
];

export const MAPS_BY_KEY = new Map<string, MapInfo>(MAPS.map((map) => [map.key, map]));

export function getMapInfo(key: string): MapInfo | undefined {
  return MAPS_BY_KEY.get(key);
}

/** Header image for a map key, with a defensive fallback for unknown keys. */
export function getMapHeaderImage(key: string): string {
  return getMapInfo(key)?.headerImage ?? `/assets/map-headers/${key}_header.webp`;
}

/** Folder under `assets/utilidades` for a map key, with a fallback for unknown keys. */
export function getMapUtilitiesFolder(key: string): string {
  return getMapInfo(key)?.utilitiesFolder ?? key;
}
