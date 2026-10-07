import { ClassVideo } from '../../data/models/content.interface';

export interface ContentFilters {
  map: string | null;
  tag: string | null;
}

/** Ordena por fecha descendente sin mutar el array original. */
export function sortClassesByDateDesc(classes: ClassVideo[]): ClassVideo[] {
  return [...classes].sort((a, b) => b.date.localeCompare(a.date));
}

/** Aplica los filtros de mapa y etiqueta (combinables). */
export function filterClasses(classes: ClassVideo[], filters: ContentFilters): ClassVideo[] {
  return classes.filter((item) => {
    const matchesMap = !filters.map || item.map === filters.map;
    const matchesTag = !filters.tag || (item.tags ?? []).includes(filters.tag);
    return matchesMap && matchesTag;
  });
}

/** Mapas presentes en el listado, ordenados alfabéticamente. */
export function collectMaps(classes: ClassVideo[]): string[] {
  const maps = new Set<string>();
  for (const item of classes) {
    if (item.map) maps.add(item.map);
  }
  return [...maps].sort((a, b) => a.localeCompare(b));
}

/** Etiquetas presentes en el listado, ordenadas alfabéticamente. */
export function collectTags(classes: ClassVideo[]): string[] {
  const tags = new Set<string>();
  for (const item of classes) {
    for (const tag of item.tags ?? []) tags.add(tag);
  }
  return [...tags].sort((a, b) => a.localeCompare(b));
}
