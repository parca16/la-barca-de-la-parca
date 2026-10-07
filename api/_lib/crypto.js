import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY_BYTES = 32;
const IV_BYTES = 12;
const TAG_BYTES = 16;

/**
 * Cifra un texto con AES-256-GCM y devuelve `iv || tag || ciphertext` en base64.
 * El IV es aleatorio en cada llamada.
 */
export function encrypt(plaintext, key) {
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, ciphertext]).toString('base64');
}

/** Descifra un payload generado por `encrypt`. Lanza si la clave o el dato no son válidos. */
export function decrypt(payload, key) {
  const raw = Buffer.from(payload, 'base64');
  if (raw.length <= IV_BYTES + TAG_BYTES) {
    throw new Error('Payload cifrado demasiado corto');
  }

  const iv = raw.subarray(0, IV_BYTES);
  const tag = raw.subarray(IV_BYTES, IV_BYTES + TAG_BYTES);
  const ciphertext = raw.subarray(IV_BYTES + TAG_BYTES);

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');
}

/** Convierte una clave hex de 64 caracteres en bytes. Devuelve `null` si no es válida. */
export function parseKey(value) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!/^[0-9a-fA-F]{64}$/.test(trimmed)) return null;

  const key = Buffer.from(trimmed, 'hex');
  return key.length === KEY_BYTES ? key : null;
}

/** Genera una clave nueva en formato hex (64 caracteres). */
export function generateKey() {
  return randomBytes(KEY_BYTES).toString('hex');
}
