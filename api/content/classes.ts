import { CLASSES } from '../_private/classes';
import { getSessionUser } from '../_lib/session';
import { methodNotAllowed, sendJson, type ApiRequest, type ApiResponse } from '../_lib/http';

/**
 * GET /api/content/classes
 * Devuelve el listado de clases (ordenado por fecha descendente). Es privado:
 * sin sesión válida responde 401 y no filtra ninguna información.
 */
export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  if (req.method !== 'GET') {
    methodNotAllowed(res, 'GET');
    return;
  }

  const user = await getSessionUser(req);
  if (!user) {
    sendJson(res, 401, { error: 'unauthorized' });
    return;
  }

  const classes = [...CLASSES].sort((a, b) => b.date.localeCompare(a.date));
  sendJson(res, 200, { classes });
}
