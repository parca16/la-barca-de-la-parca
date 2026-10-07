import { createPublicKey, createVerify } from 'node:crypto';

type CreatePublicKeyInput = Parameters<typeof createPublicKey>[0];
type JwkInput = Extract<CreatePublicKeyInput, { format: 'jwk' }>;

/** Clave pública de Google en formato JWK. */
export type GoogleJwk = JwkInput['key'] & { kid?: string };

const GOOGLE_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const GOOGLE_JWKS_URL = 'https://www.googleapis.com/oauth2/v3/certs';
const GOOGLE_ISSUERS = ['https://accounts.google.com', 'accounts.google.com'];
const JWKS_TTL_MS = 60 * 60 * 1000;

let cachedKeys: GoogleJwk[] = [];
let cachedAt = 0;

/** Claves públicas de Google (JWKS) con una caché de una hora. */
async function getGoogleKeys(): Promise<GoogleJwk[]> {
  const now = Date.now();
  if (cachedKeys.length > 0 && now - cachedAt < JWKS_TTL_MS) return cachedKeys;

  const response = await fetch(GOOGLE_JWKS_URL);
  if (!response.ok) {
    throw new Error(`No se pudieron obtener las claves de Google (${response.status})`);
  }

  const data = (await response.json()) as { keys?: GoogleJwk[] };
  cachedKeys = Array.isArray(data.keys) ? data.keys : [];
  cachedAt = now;
  return cachedKeys;
}

export interface GoogleAuthParams {
  clientId: string;
  redirectUri: string;
  state: string;
}

/** Construye la URL de autorización de Google (OIDC, `openid email profile`). */
export function buildGoogleAuthUrl({ clientId, redirectUri, state }: GoogleAuthParams): URL {
  const url = new URL(GOOGLE_AUTH_ENDPOINT);
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'openid email profile');
  url.searchParams.set('state', state);
  url.searchParams.set('prompt', 'select_account');
  return url;
}

export interface ExchangeCodeParams {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

/** Intercambia el `code` por tokens y devuelve el `id_token`. */
export async function exchangeCodeForIdToken(params: ExchangeCodeParams): Promise<string> {
  const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code: params.code,
      client_id: params.clientId,
      client_secret: params.clientSecret,
      redirect_uri: params.redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    throw new Error(`Intercambio de token fallido (${response.status})`);
  }

  const data = (await response.json()) as { id_token?: string };
  if (!data.id_token) {
    throw new Error('Google no devolvió id_token');
  }

  return data.id_token;
}

export interface GoogleIdTokenClaims {
  email: string;
  emailVerified: boolean;
  name?: string;
  picture?: string;
}

/**
 * Verifica firma (RS256), `iss`, `aud` y caducidad de un id_token.
 * Se pasa la lista de claves para poder testearlo sin red.
 */
export function verifyIdToken(
  idToken: string,
  clientId: string,
  keys: GoogleJwk[],
): GoogleIdTokenClaims | null {
  try {
    const parts = idToken.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;

    const header = JSON.parse(Buffer.from(headerB64, 'base64url').toString('utf8')) as {
      alg?: string;
      kid?: string;
    };
    if (header.alg !== 'RS256') return null;

    const jwk = keys.find((key) => key.kid === header.kid);
    if (!jwk) return null;

    const publicKey = createPublicKey({ key: jwk, format: 'jwk' });
    const verifier = createVerify('RSA-SHA256');
    verifier.update(`${headerB64}.${payloadB64}`);
    verifier.end();
    if (!verifier.verify(publicKey, Buffer.from(signatureB64, 'base64url'))) return null;

    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8')) as Record<
      string,
      unknown
    >;

    const issuer = payload['iss'];
    if (typeof issuer !== 'string' || !GOOGLE_ISSUERS.includes(issuer)) return null;
    if (payload['aud'] !== clientId) return null;

    const exp = payload['exp'];
    if (typeof exp === 'number' && exp < Math.floor(Date.now() / 1000)) return null;

    const email = typeof payload['email'] === 'string' ? payload['email'] : null;
    if (!email) return null;

    const verified = payload['email_verified'] === true || payload['email_verified'] === 'true';

    return {
      email,
      emailVerified: verified,
      name: typeof payload['name'] === 'string' ? payload['name'] : undefined,
      picture: typeof payload['picture'] === 'string' ? payload['picture'] : undefined,
    };
  } catch {
    return null;
  }
}

/** Obtiene las claves de Google y verifica el id_token. */
export async function verifyGoogleIdToken(
  idToken: string,
  clientId: string,
): Promise<GoogleIdTokenClaims | null> {
  const keys = await getGoogleKeys();
  return verifyIdToken(idToken, clientId, keys);
}
