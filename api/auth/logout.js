import { clearSessionCookie } from '../_lib/session.js';
import { isSecureRequest, methodNotAllowed } from '../_lib/http.js';

/** POST /api/auth/logout — invalida la sesión borrando la cookie. */
export default function handler(req, res) {
  if (req.method !== 'POST') {
    methodNotAllowed(res, 'POST');
    return;
  }

  res.statusCode = 204;
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Set-Cookie', clearSessionCookie(isSecureRequest(req)));
  res.end();
}
