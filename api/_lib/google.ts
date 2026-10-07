import { createRemoteJWKSet, jwtVerify } from 'jose';

const GOOGLE_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const GOOGLE_ISSUERS = ['https://accounts.google.com', 'accounts.google.com'];

/** Claves públicas de Google (con caché interna de jose) para verificar el id_token. */
const GOOGLE_JWKS = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));

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
 * Verifica firma (`JWKS`), `aud`, `iss` y devuelve los claims relevantes.
 * Devuelve `null` si el token no es válido o no trae email.
 */
export async function verifyGoogleIdToken(
  idToken: string,
  clientId: string,
): Promise<GoogleIdTokenClaims | null> {
  try {
    const { payload } = await jwtVerify(idToken, GOOGLE_JWKS, {
      issuer: GOOGLE_ISSUERS,
      audience: clientId,
    });

    const email = typeof payload['email'] === 'string' ? payload['email'] : null;
    if (!email) return null;

    const verified = payload['email_verified'];

    return {
      email,
      emailVerified: verified === true || verified === 'true',
      name: typeof payload['name'] === 'string' ? payload['name'] : undefined,
      picture: typeof payload['picture'] === 'string' ? payload['picture'] : undefined,
    };
  } catch {
    return null;
  }
}
