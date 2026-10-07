/**
 * Acceso centralizado a las variables de entorno del backend.
 *
 * Todo lo que sea imprescindible se lee con `requireEnv`, de modo que si falta
 * una variable la función falla en vez de arrancar en un estado inseguro
 * (fail closed).
 */

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}`);
  }
  return value;
}

export function getGoogleClientId(): string {
  return requireEnv('GOOGLE_CLIENT_ID');
}

export function getGoogleClientSecret(): string {
  return requireEnv('GOOGLE_CLIENT_SECRET');
}

/**
 * Emails autorizados separados por comas. Si está vacía, no entra nadie
 * (fail closed): `isEmailAllowed` devuelve `false` para cualquier email.
 */
export function getAllowedEmails(): string {
  return process.env['AUTH_ALLOWED_EMAILS'] ?? '';
}

/** Secreto con el que se firma la cookie de sesión. */
export function getSessionSecretBytes(): Uint8Array {
  return new TextEncoder().encode(requireEnv('AUTH_SESSION_SECRET'));
}
