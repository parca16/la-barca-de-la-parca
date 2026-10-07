import { ClassVideo } from '../../data/models/content.interface';

/** Ordena por fecha descendente sin mutar el array original. */
export function sortClassesByDateDesc(classes: ClassVideo[]): ClassVideo[] {
  return [...classes].sort((a, b) => b.date.localeCompare(a.date));
}
