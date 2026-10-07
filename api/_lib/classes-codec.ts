import type { ClassVideo } from '../../src/app/data/models/content.interface';
import { decrypt } from './crypto';

/**
 * Decodifica el JSON de clases a partir del payload cifrado y la clave.
 * Es una función pura para poder testearla con claves temporales.
 */
export function decodeClasses(payload: string, key: Uint8Array): ClassVideo[] {
  const parsed = JSON.parse(decrypt(payload, key)) as unknown;
  if (!Array.isArray(parsed)) {
    throw new Error('El contenido descifrado no es una lista de clases');
  }
  return parsed as ClassVideo[];
}
