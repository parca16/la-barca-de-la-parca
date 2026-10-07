import { getSessionUser } from '../_lib/session.js';
import { methodNotAllowed, sendJson } from '../_lib/http.js';

/** GET /api/auth/me — devuelve el usuario de la sesión o 401. */
export default function handler(req, res) {
  if (req.method !== 'GET') {
    methodNotAllowed(res, 'GET');
    return;
  }

  const user = getSessionUser(req);
  if (!user) {
    sendJson(res, 401, { error: 'unauthorized' });
    return;
  }

  sendJson(res, 200, { user });
}
