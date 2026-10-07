import type { ClassVideo } from '../../src/app/data/models/content.interface';
import { decodeClasses } from '../_lib/classes-codec';
import { parseKey } from '../_lib/crypto';
import { ENCRYPTED_CLASSES } from './classes.enc';

/**
 * Carga las clases descifrándolas con `CONTENT_CLASSES_KEY`.
 *
 * El texto plano NO está en el repo: `api/_private/classes.private.json` está
 * ignorado por Git y `classes.enc.ts` (generado por `npm run encrypt:classes`)
 * contiene el contenido cifrado. Si falta la clave o falla el descifrado se
 * devuelve una lista vacía y se deja constancia en los logs.
 */
function loadClasses(): ClassVideo[] {
  const key = parseKey(process.env['CONTENT_CLASSES_KEY']);
  if (!key) {
    console.error(
      'CONTENT_CLASSES_KEY no está definida o no es una clave hex de 32 bytes. No se cargan clases.',
    );
    return [];
  }

  try {
    return decodeClasses(ENCRYPTED_CLASSES, key);
  } catch (error) {
    console.error('No se pudieron descifrar las clases:', error);
    return [];
  }
}

export const CLASSES: ClassVideo[] = loadClasses();
