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
  /**
   * ID de YouTube (11 caracteres) o la URL completa del vídeo. El frontend
   * extrae el ID y construye él mismo la URL del reproductor, así que nunca se
   * inyecta una URL libre en el iframe.
   */
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
