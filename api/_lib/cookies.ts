export interface CookieOptions {
  maxAge?: number;
  secure?: boolean;
  sameSite?: 'Lax' | 'Strict' | 'None';
  path?: string;
}

/** Serializa una cookie `HttpOnly` para la cabecera `Set-Cookie`. */
export function serializeCookie(name: string, value: string, options: CookieOptions = {}): string {
  const parts = [`${name}=${value}`, `Path=${options.path ?? '/'}`];

  if (options.maxAge !== undefined) {
    parts.push(`Max-Age=${options.maxAge}`);
  }

  parts.push(`SameSite=${options.sameSite ?? 'Lax'}`);

  if (options.secure) {
    parts.push('Secure');
  }

  parts.push('HttpOnly');
  return parts.join('; ');
}

/** Cookie de borrado (valor vacío y caducidad inmediata). */
export function clearCookie(name: string, secure: boolean): string {
  return serializeCookie(name, '', { maxAge: 0, secure });
}

/** Lee el valor de una cookie concreta de la cabecera `Cookie`. */
export function parseCookie(header: string | undefined, name: string): string | null {
  if (!header) return null;

  for (const part of header.split(';')) {
    const separator = part.indexOf('=');
    if (separator === -1) continue;

    const key = part.slice(0, separator).trim();
    if (key !== name) continue;

    return decodeURIComponent(part.slice(separator + 1).trim());
  }

  return null;
}
