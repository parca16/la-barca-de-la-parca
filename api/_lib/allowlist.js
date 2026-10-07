/**
 * Lista de emails autorizados. La comparación ignora mayúsculas y espacios.
 * Sin lista configurada no se autoriza a nadie (fail closed).
 */

export function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

export function parseAllowedEmails(raw) {
  if (!raw) return [];
  return raw
    .split(',')
    .map((email) => normalizeEmail(email))
    .filter((email) => email.length > 0);
}

export function isEmailAllowed(email, raw) {
  return parseAllowedEmails(raw).includes(normalizeEmail(email));
}
