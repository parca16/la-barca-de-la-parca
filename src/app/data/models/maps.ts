export type MapPool = 'active' | 'inactive';

export interface MapInfo {
  /** Clave de ruta, p. ej. 'dust-2'. */
  key: string;
  /** Nombre visible, p. ej. 'Dust 2'. */
  name: string;
  /** Map pool al que pertenece. */
  pool: MapPool;
  /** Imagen de la card, p. ej. '/assets/maps/Dust2.webp'. */
  cardImage: string;
  /** Imagen de cabecera, p. ej. '/assets/map-headers/Dust2_header.webp'. */
  headerImage: string;
  /** Carpeta de utilidades dentro de /assets/utilidades, p. ej. 'dust2'. */
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

export const MAPS_BY_KEY: ReadonlyMap<string, MapInfo> = new Map(
  MAPS.map(map => [map.key, map])
);

export function getMap(key: string): MapInfo | undefined {
  return MAPS_BY_KEY.get(key);
}

export function getMapsByPool(pool: MapPool): MapInfo[] {
  return MAPS.filter(map => map.pool === pool);
}

export function getHeaderImage(key: string): string {
  return getMap(key)?.headerImage ?? `/assets/map-headers/${key}_header.webp`;
}
