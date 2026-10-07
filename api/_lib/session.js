import { createHmac, timingSafeEqual } from 'node:crypto';
import { clearCookie, parseCookie, serializeCookie } from './cookies.js';
import { getSessionSecretBytes } from './env.js';
import { getHeader } from './http.js';

export const SESSION_COOKIE = 'ntr_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 días

/**
 * Firma de sesión con JWT HS256 implementado sobre `node:crypto`.
 * El formato es el estándar: `base64url(header).base64url(payload).base64url(firma)`.
 */

function base64UrlEncode(value) {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function signBody(body, secret) {
  return createHmac('sha256', secret).update(body).digest('base64url');
}

/** Firma un JWT de sesión. El secreto se inyecta para poder testear. */
export function signSession(user, secret, ttlSeconds = SESSION_TTL_SECONDS) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = base64UrlEncode(
    JSON.stringify({
      sub: user.email,
      email: user.email,
      name: user.name,
      picture: user.picture,
      iat: now,
      exp: now + ttlSeconds,
    }),
  );

  const body = `${header}.${payload}`;
  return `${body}.${signBody(body, secret)}`;
}

/** Verifica un JWT de sesión. Devuelve `null` si no es válido o ha caducado. */
export function verifySession(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;
    const expected = Buffer.from(signBody(`${header}.${payload}`, secret));
    const provided = Buffer.from(signature);

    if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
      return null;
    }

    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));

    const exp = claims.exp;
    if (typeof exp === 'number' && exp < Math.floor(Date.now() / 1000)) return null;

    const email = typeof claims.email === 'string' ? claims.email : claims.sub;
    if (typeof email !== 'string' || !email) return null;

    return {
      email,
      name: typeof claims.name === 'string' ? claims.name : email,
      picture: typeof claims.picture === 'string' ? claims.picture : undefined,
    };
  } catch {
    return null;
  }
}

export function buildSessionCookie(token, secure) {
  return serializeCookie(SESSION_COOKIE, token, { maxAge: SESSION_TTL_SECONDS, secure });
}

export function clearSessionCookie(secure) {
  return clearCookie(SESSION_COOKIE, secure);
}

/** Devuelve el usuario de la sesión o `null` si la petición no trae una válida. */
export function getSessionUser(req) {
  const token = parseCookie(getHeader(req, 'cookie'), SESSION_COOKIE);
  if (!token) return null;
  return verifySession(token, getSessionSecretBytes());
}
