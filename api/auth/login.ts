import { randomBytes } from 'node:crypto';
import { getGoogleClientId } from '../_lib/env';
import { buildGoogleAuthUrl } from '../_lib/google';
import {
  getBaseUrl,
  getRequestUrl,
  isSecureRequest,
  methodNotAllowed,
  redirect,
  type ApiRequest,
  type ApiResponse,
} from '../_lib/http';
import { serializeCookie } from '../_lib/cookies';
import { encodeOAuthState, OAUTH_COOKIE, OAUTH_TTL_SECONDS } from '../_lib/oauth-state';
import { sanitizeReturnTo } from '../_lib/return-to';

/**
 * GET /api/auth/login
 * Redirige a Google guardando `state` y `returnTo` en una cookie temporal.
 */
export default function handler(req: ApiRequest, res: ApiResponse): void {
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
