/**
 * Utilidades de imágenes responsivas (issue #20).
 *
 * Las variantes siguen el patrón `<nombre>-<ancho>.webp` y las genera
 * `optimize-headers.js`.
 */

/** Ruta de la variante de ancho `width` de una imagen `.webp`. */
export function imageVariant(path: string, width: number): string {
  return path.replace(/\.webp$/i, `-${width}.webp`);
}
