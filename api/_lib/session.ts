import { SignJWT, jwtVerify } from 'jose';
import { parseCookie, clearCookie, serializeCookie } from './cookies';
import { getSessionSecretBytes } from './env';
import { getHeader, type ApiRequest } from './http';

export const SESSION_COOKIE = 'ntr_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 días

export interface SessionUser {
  email: string;
  name: string;
  picture?: string;
}

/** Firma un JWT de sesión con HS256. El secreto se inyecta para poder testear. */
export async function signSession(
  user: SessionUser,
  secret: Uint8Array,
  ttlSeconds = SESSION_TTL_SECONDS,
): Promise<string> {
  return new SignJWT({ email: user.email, name: user.name, picture: user.picture })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.email)
    .setIssuedAt()
    .setExpirationTime(`${ttlSeconds}s`)
    .sign(secret);
}

/** Verifica un JWT de sesión. Devuelve `null` si no es válido o ha caducado. */
export async function verifySession(
  token: string,
  secret: Uint8Array,
): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] });
    const email = typeof payload['email'] === 'string' ? payload['email'] : payload.sub;
    if (!email) return null;

    return {
      email,
      name: typeof payload['name'] === 'string' ? payload['name'] : email,
      picture: typeof payload['picture'] === 'string' ? payload['picture'] : undefined,
    };
  } catch {
    return null;
  }
}

export function buildSessionCookie(token: string, secure: boolean): string {
  return serializeCookie(SESSION_COOKIE, token, { maxAge: SESSION_TTL_SECONDS, secure });
}

export function clearSessionCookie(secure: boolean): string {
  return clearCookie(SESSION_COOKIE, secure);
}

/** Devuelve el usuario de la sesión o `null` si la petición no trae una válida. */
export async function getSessionUser(req: ApiRequest): Promise<SessionUser | null> {
  const token = parseCookie(getHeader(req, 'cookie'), SESSION_COOKIE);
  if (!token) return null;
  return verifySession(token, getSessionSecretBytes());
}
