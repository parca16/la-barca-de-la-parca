import type { ClassVideo } from '../../src/app/data/models/content.interface';

/**
 * Clases grabadas del equipo NTR.
 *
 * Este fichero vive SOLO en el servidor: no forma parte del bundle de Angular
 * ni se publica como estático. Se sirve a través de `GET /api/content/classes`,
 * que exige una sesión válida.
 *
 * Para añadir una clase, copia el ejemplo y rellena los campos:
 *
 * {
 *   id: 'utilidades-mirage-2026-09',
 *   title: 'Utilidades de Mirage',
 *   description: 'Repaso de smokes, molotovs y flashes del map pool activo.',
 *   youtubeId: 'dQw4w9WgXcQ',
 *   date: '2026-09-20',
 *   speaker: 'Parca',
 *   map: 'mirage',
 *   tags: ['utilidades'],
 *   durationMin: 42,
 * }
 */
export const CLASSES: ClassVideo[] = [];
