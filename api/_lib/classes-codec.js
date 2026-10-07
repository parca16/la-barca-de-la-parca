import { decrypt } from './crypto.js';

/**
 * Decodifica el JSON de clases a partir del payload cifrado y la clave.
 * Es una función pura para poder testearla con claves temporales.
 */
export function decodeClasses(payload, key) {
  const parsed = JSON.parse(decrypt(payload, key));
  if (!Array.isArray(parsed)) {
    throw new Error('El contenido descifrado no es una lista de clases');
  }
  return parsed;
}
