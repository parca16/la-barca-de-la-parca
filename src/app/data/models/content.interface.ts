/**
 * Una clase grabada del equipo.
 *
 * Los datos reales viven en `api/_private/classes.ts` (solo servidor) y se
 * sirven a través de `GET /api/content/classes`, que exige sesión. Este modelo
 * es el contrato compartido entre backend y frontend.
 */
export interface ClassVideo {
  /** Slug único, usado en la URL `/contents/:id`. */
  id: string;
  title: string;
  description: string;
  /** Solo el ID de YouTube (11 caracteres), nunca la URL completa. */
  youtubeId: string;
  /** Fecha ISO, p. ej. '2026-09-20'. */
  date: string;
  /** Quién imparte la clase. */
  speaker?: string;
  /** Clave de mapa si aplica ('mirage', 'inferno'...). */
  map?: string;
  /** Etiquetas: 'utilidades', 'comunicación', 'demo review'... */
  tags?: string[];
  durationMin?: number;
}
