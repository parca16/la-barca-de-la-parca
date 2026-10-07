import { CLASSES } from '../_private/classes.js';
import { getSessionUser } from '../_lib/session.js';
import { methodNotAllowed, sendJson } from '../_lib/http.js';

/**
 * GET /api/content/classes
 * Devuelve el listado de clases (ordenado por fecha descendente). Es privado:
 * sin sesión válida responde 401 y no filtra ninguna información.
 */
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

  const classes = [...CLASSES].sort((a, b) => b.date.localeCompare(a.date));
  sendJson(res, 200, { classes });
}
