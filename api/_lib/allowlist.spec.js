import { isEmailAllowed, normalizeEmail, parseAllowedEmails } from './allowlist.js';

describe('allowlist', () => {
  it('normaliza mayúsculas y espacios', () => {
    expect(normalizeEmail('  Parca@Gmail.COM ')).toBe('parca@gmail.com');
  });

  it('parsea la lista separada por comas ignorando vacíos', () => {
    expect(parseAllowedEmails(' A@x.com, ,b@y.com ')).toEqual(['a@x.com', 'b@y.com']);
  });

  it('sin lista configurada no autoriza a nadie (fail closed)', () => {
    expect(isEmailAllowed('a@x.com', '')).toBe(false);
    expect(isEmailAllowed('a@x.com', undefined)).toBe(false);
  });

  it('autoriza ignorando mayúsculas y espacios', () => {
    expect(isEmailAllowed(' PARCA@x.com ', 'parca@x.com')).toBe(true);
  });

  it('rechaza emails fuera de la lista', () => {
    expect(isEmailAllowed('intruso@x.com', 'parca@x.com,kevs@y.com')).toBe(false);
  });
});
