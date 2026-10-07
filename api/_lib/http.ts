import type { IncomingMessage, ServerResponse } from 'node:http';

export type ApiRequest = IncomingMessage;
export type ApiResponse = ServerResponse;

/** Lee una cabecera (case-insensitive) y normaliza el valor a string. */
export function getHeader(req: ApiRequest, name: string): string | undefined {
  const value = req.headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

/** URL de la petición resolviendo el host real detrás del proxy de Vercel. */
export function getRequestUrl(req: ApiRequest): URL {
  const host = getHeader(req, 'x-forwarded-host') ?? getHeader(req, 'host') ?? 'localhost:4200';
  return new URL(req.url ?? '/', `http://${host}`);
}

export function isSecureRequest(req: ApiRequest): boolean {
  return (getHeader(req, 'x-forwarded-proto') ?? '').split(',')[0]?.trim() === 'https';
}

/**
 * URL base pública de la app. Se prioriza `AUTH_BASE_URL` (útil para previews)
 * y, si no está definida, se reconstruye a partir de las cabeceras.
 */
export function getBaseUrl(req: ApiRequest): string {
  const configured = process.env['AUTH_BASE_URL']?.replace(/\/+$/, '');
  if (configured) return configured;

  const proto = getHeader(req, 'x-forwarded-proto')?.split(',')[0]?.trim() || 'http';
  const host = getHeader(req, 'x-forwarded-host') ?? getHeader(req, 'host') ?? 'localhost:4200';
  return `${proto}://${host}`;
}

export function sendJson(
  res: ApiResponse,
  status: number,
  body: unknown,
  cookies: string[] = [],
): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (cookies.length > 0) res.setHeader('Set-Cookie', cookies);
  res.end(JSON.stringify(body));
}

export function redirect(res: ApiResponse, location: string, cookies: string[] = []): void {
  res.statusCode = 302;
  res.setHeader('Location', location);
  res.setHeader('Cache-Control', 'no-store');
  if (cookies.length > 0) res.setHeader('Set-Cookie', cookies);
  res.end();
}

export function methodNotAllowed(res: ApiResponse, allow: string): void {
  res.statusCode = 405;
  res.setHeader('Allow', allow);
  sendJson(res, 405, { error: 'method_not_allowed' });
}
