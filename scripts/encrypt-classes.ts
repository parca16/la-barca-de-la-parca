import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { encrypt, parseKey } from '../api/_lib/crypto.js';

// Carga `.env.local` para leer CONTENT_CLASSES_KEY igual que en desarrollo.
try {
  process.loadEnvFile('.env.local');
} catch {
  // Opcional: si no existe, se usará la variable del entorno actual.
}

const SOURCE = resolve('api/_private/classes.private.json');
const TARGET = resolve('api/_private/classes.enc.js');

const key = parseKey(process.env['CONTENT_CLASSES_KEY']);
if (!key) {
  console.error(
    'Falta CONTENT_CLASSES_KEY (clave hex de 64 caracteres) en .env.local o en el entorno.',
  );
  console.error(
    "Genera una con: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\"",
  );
  process.exit(1);
}

const plaintext = readFileSync(SOURCE, 'utf8');

// Valida el JSON antes de cifrar para no publicar un fichero corrupto.
JSON.parse(plaintext);

const payload = encrypt(plaintext, key);
const file = [
  '// Generado automáticamente por scripts/encrypt-classes.ts. NO EDITAR A MANO.',
  '// Regenerar con: npm run encrypt:classes',
  `export const ENCRYPTED_CLASSES = '${payload}';`,
  '',
].join('\n');

writeFileSync(TARGET, file);
console.log(`Clases cifradas correctamente en ${TARGET}`);
