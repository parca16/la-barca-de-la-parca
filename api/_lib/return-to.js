/**
 * Valida la ruta a la que volver tras el login para evitar open redirects.
 * Solo se permiten rutas internas absolutas (empiezan por `/` pero no `//`).
 */
export function sanitizeReturnTo(value, fallback = '/contents') {
  if (!value) return fallback;
  if (!value.startsWith('/') || value.startsWith('//')) return fallback;
  return value;
}
