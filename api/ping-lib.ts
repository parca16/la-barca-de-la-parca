import { sendJson, type ApiRequest, type ApiResponse } from './_lib/http';

/** Diagnóstico temporal: función que importa un módulo de `_lib`. */
export default function handler(_req: ApiRequest, res: ApiResponse): void {
  sendJson(res, 200, { ok: true, variant: 'con-import-de-lib' });
}
