export const OAUTH_COOKIE = 'ntr_oauth';
export const OAUTH_TTL_SECONDS = 600;

export interface OAuthState {
  state: string;
  returnTo: string;
}

export function encodeOAuthState(value: OAuthState): string {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

export function decodeOAuthState(raw: string | null): OAuthState | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(Buffer.from(raw, 'base64url').toString('utf8')) as unknown;
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      typeof (parsed as OAuthState).state === 'string' &&
      typeof (parsed as OAuthState).returnTo === 'string'
    ) {
      return parsed as OAuthState;
    }
    return null;
  } catch {
    return null;
  }
}
