import { randomBytes } from 'node:crypto';
import { getGoogleClientId } from '../_lib/env.js';
import { buildGoogleAuthUrl } from '../_lib/google.js';
import {
  getBaseUrl,
  getRequestUrl,
  isSecureRequest,
  methodNotAllowed,
  redirect,
} from '../_lib/http.js';
import { serializeCookie } from '../_lib/cookies.js';
import { encodeOAuthState, OAUTH_COOKIE, OAUTH_TTL_SECONDS } from '../_lib/oauth-state.js';
import { sanitizeReturnTo } from '../_lib/return-to.js';

/**
 * GET /api/auth/login
 * Redirige a Google guardando `state` y `returnTo` en una cookie temporal.
 */
export default function handler(req, res) {
  if (req.method !== 'GET') {
    methodNotAllowed(res, 'GET');
    return;
  }

  try {
    const clientId = getGoogleClientId();
    const returnTo = sanitizeReturnTo(getRequestUrl(req).searchParams.get('returnTo'));
    const state = randomBytes(24).toString('base64url');
    const redirectUri = `${getBaseUrl(req)}/api/auth/callback`;

    const location = buildGoogleAuthUrl({ clientId, redirectUri, state }).toString();
    const cookie = serializeCookie(OAUTH_COOKIE, encodeOAuthState({ state, returnTo }), {
      maxAge: OAUTH_TTL_SECONDS,
      secure: isSecureRequest(req),
    });

    redirect(res, location, [cookie]);
  } catch {
    redirect(res, '/login?error=config');
  }
}
