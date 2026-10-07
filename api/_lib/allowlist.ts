/**
 * Lista de emails autorizados. La comparación ignora mayúsculas y espacios.
 * Sin lista configurada no se autoriza a nadie (fail closed).
 */

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function parseAllowedEmails(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(',')
    .map((email) => normalizeEmail(email))
    .filter((email) => email.length > 0);
}

export function isEmailAllowed(email: string, raw: string | undefined): boolean {
  return parseAllowedEmails(raw).includes(normalizeEmail(email));
}
