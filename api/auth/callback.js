import {
  getAllowedEmails,
  getGoogleClientId,
  getGoogleClientSecret,
  getSessionSecretBytes,
} from '../_lib/env.js';
import { exchangeCodeForIdToken, verifyGoogleIdToken } from '../_lib/google.js';
import { normalizeEmail, isEmailAllowed } from '../_lib/allowlist.js';
import { parseCookie, clearCookie } from '../_lib/cookies.js';
import { buildSessionCookie, signSession } from '../_lib/session.js';
import {
  getBaseUrl,
  getHeader,
  getRequestUrl,
  isSecureRequest,
  methodNotAllowed,
  redirect,
} from '../_lib/http.js';
import { decodeOAuthState, OAUTH_COOKIE } from '../_lib/oauth-state.js';
import { sanitizeReturnTo } from '../_lib/return-to.js';

/**
 * GET /api/auth/callback
 * Intercambia el `code`, valida el `id_token` y crea la cookie de sesión si el
 * email está en la allowlist. Cualquier error redirige a /login con un código.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    methodNotAllowed(res, 'GET');
    return;
  }

  const secure = isSecureRequest(req);
  const clearOAuth = clearCookie(OAUTH_COOKIE, secure);

  try {
    const url = getRequestUrl(req);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (url.searchParams.has('error') || !code || !state) {
      redirect(res, '/login?error=oauth', [clearOAuth]);
      return;
    }

    const stored = decodeOAuthState(parseCookie(getHeader(req, 'cookie'), OAUTH_COOKIE));
    if (!stored || stored.state !== state) {
      redirect(res, '/login?error=state', [clearOAuth]);
      return;
    }

    const idToken = await exchangeCodeForIdToken({
      code,
      clientId: getGoogleClientId(),
      clientSecret: getGoogleClientSecret(),
      redirectUri: `${getBaseUrl(req)}/api/auth/callback`,
    });

    const claims = await verifyGoogleIdToken(idToken, getGoogleClientId());
    if (!claims || !claims.emailVerified) {
      redirect(res, '/login?error=oauth', [clearOAuth]);
      return;
    }

    if (!isEmailAllowed(claims.email, getAllowedEmails())) {
      redirect(res, '/login?error=unauthorized', [clearOAuth]);
      return;
    }

    const email = normalizeEmail(claims.email);
    const token = signSession(
      { email, name: claims.name ?? email, picture: claims.picture },
      getSessionSecretBytes(),
    );

    redirect(res, sanitizeReturnTo(stored.returnTo), [
      clearOAuth,
      buildSessionCookie(token, secure),
    ]);
  } catch {
    redirect(res, '/login?error=oauth', [clearOAuth]);
  }
}
