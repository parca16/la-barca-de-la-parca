export const OAUTH_COOKIE = 'ntr_oauth';
export const OAUTH_TTL_SECONDS = 600;

export function encodeOAuthState(value) {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

export function decodeOAuthState(raw) {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(Buffer.from(raw, 'base64url').toString('utf8'));
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      typeof parsed.state === 'string' &&
      typeof parsed.returnTo === 'string'
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}
