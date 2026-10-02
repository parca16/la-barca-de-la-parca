import { clearSessionCookie } from '../_lib/session';
import { isSecureRequest, methodNotAllowed, type ApiRequest, type ApiResponse } from '../_lib/http';

/** POST /api/auth/logout — invalida la sesión borrando la cookie. */
export default function handler(req: ApiRequest, res: ApiResponse): void {
  if (req.method !== 'POST') {
    methodNotAllowed(res, 'POST');
    return;
  }

  res.statusCode = 204;
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Set-Cookie', clearSessionCookie(isSecureRequest(req)));
  res.end();
}
