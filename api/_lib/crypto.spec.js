import { decrypt, encrypt, generateKey, parseKey } from './crypto.js';

const KEY = parseKey(generateKey());
const OTHER_KEY = parseKey(generateKey());

describe('crypto', () => {
  it('cifra y descifra un texto', () => {
    const payload = encrypt('hola equipo NTR', KEY);
    expect(payload).not.toContain('hola');
    expect(decrypt(payload, KEY)).toBe('hola equipo NTR');
  });

  it('usa un IV distinto en cada cifrado', () => {
    expect(encrypt('mismo texto', KEY)).not.toBe(encrypt('mismo texto', KEY));
  });

  it('falla al descifrar con otra clave (autenticación GCM)', () => {
    const payload = encrypt('secreto', KEY);
    expect(() => decrypt(payload, OTHER_KEY)).toThrow();
  });

  it('falla si el payload ha sido manipulado', () => {
    const payload = encrypt('secreto', KEY);
    const tampered = payload.slice(0, -4) + 'AAAA';
    expect(() => decrypt(tampered, KEY)).toThrow();
  });

  it('parseKey valida el formato', () => {
    expect(parseKey(generateKey())).not.toBeNull();
    expect(parseKey(undefined)).toBeNull();
    expect(parseKey('no-es-hex')).toBeNull();
    expect(parseKey('a'.repeat(63))).toBeNull();
  });
});
