/**
 * Valida la ruta a la que volver tras el login para evitar open redirects.
 * Solo se permiten rutas internas absolutas (empiezan por `/` pero no `//`).
 * Es el equivalente en frontend de `api/_lib/return-to.ts`.
 */
export function sanitizeReturnTo(value: string | null | undefined, fallback = '/contents'): string {
  if (!value) return fallback;
  if (!value.startsWith('/') || value.startsWith('//')) return fallback;
  return value;
}
