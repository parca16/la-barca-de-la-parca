/**
 * Acceso centralizado a las variables de entorno del backend.
 * Todo lo imprescindible se lee con `requireEnv` (fail closed).
 */

export function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}`);
  }
  return value;
}

export function getGoogleClientId() {
  return requireEnv('GOOGLE_CLIENT_ID');
}

export function getGoogleClientSecret() {
  return requireEnv('GOOGLE_CLIENT_SECRET');
}

/**
 * Emails autorizados separados por comas. Si está vacía, no entra nadie:
 * `isEmailAllowed` devuelve `false` para cualquier email.
 */
export function getAllowedEmails() {
  return process.env['AUTH_ALLOWED_EMAILS'] ?? '';
}

/** Secreto con el que se firma la cookie de sesión. */
export function getSessionSecretBytes() {
  return new TextEncoder().encode(requireEnv('AUTH_SESSION_SECRET'));
}
