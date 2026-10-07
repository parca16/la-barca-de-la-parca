import { clearCookie, parseCookie, serializeCookie } from './cookies';
import { decodeOAuthState, encodeOAuthState } from './oauth-state';
import { sanitizeReturnTo } from './return-to';

describe('sanitizeReturnTo', () => {
  it('acepta rutas internas', () => {
    expect(sanitizeReturnTo('/contents/video-1')).toBe('/contents/video-1');
  });

  it('rechaza URLs externas y protocol-relative', () => {
    expect(sanitizeReturnTo('https://evil.example')).toBe('/contents');
    expect(sanitizeReturnTo('//evil.example')).toBe('/contents');
  });

  it('usa el fallback cuando no hay valor', () => {
    expect(sanitizeReturnTo(null)).toBe('/contents');
    expect(sanitizeReturnTo(null, '/login')).toBe('/login');
  });
});

describe('cookies', () => {
  it('serializa una cookie HttpOnly con SameSite por defecto', () => {
    const cookie = serializeCookie('ntr', 'abc', { maxAge: 60, secure: true });
    expect(cookie).toContain('ntr=abc');
    expect(cookie).toContain('Path=/');
    expect(cookie).toContain('Max-Age=60');
    expect(cookie).toContain('SameSite=Lax');
    expect(cookie).toContain('Secure');
    expect(cookie).toContain('HttpOnly');
  });

  it('parsea el valor de una cookie entre varias', () => {
    const header = 'a=1; ntr_session=token-123; b=2';
    expect(parseCookie(header, 'ntr_session')).toBe('token-123');
  });

  it('devuelve null si no está o no hay cabecera', () => {
    expect(parseCookie('a=1', 'ntr_session')).toBeNull();
    expect(parseCookie(undefined, 'ntr_session')).toBeNull();
  });

  it('borra con Max-Age=0', () => {
    expect(clearCookie('ntr_session', false)).toContain('Max-Age=0');
  });
});

describe('oauth-state', () => {
  it('codifica y decodifica el estado', () => {
    const value = { state: 'abc', returnTo: '/contents' };
    expect(decodeOAuthState(encodeOAuthState(value))).toEqual(value);
  });

  it('devuelve null para valores inválidos', () => {
    expect(decodeOAuthState(null)).toBeNull();
    expect(decodeOAuthState('no-es-base64-json')).toBeNull();
  });
});
