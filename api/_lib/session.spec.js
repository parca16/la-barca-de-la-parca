import { signSession, verifySession } from './session.js';

const SECRET = new TextEncoder().encode('secreto-de-test-suficientemente-largo');
const OTHER_SECRET = new TextEncoder().encode('otro-secreto-de-test-suficientemente');

const USER = {
  email: 'parca@ntr.gg',
  name: 'Parca',
  picture: 'https://example.com/parca.png',
};

describe('session', () => {
  it('firma y verifica una sesión válida', () => {
    const token = signSession(USER, SECRET, 60);
    expect(token.split('.')).toHaveLength(3);
    expect(verifySession(token, SECRET)).toEqual(USER);
  });

  it('rechaza un token firmado con otro secreto', () => {
    const token = signSession(USER, SECRET, 60);
    expect(verifySession(token, OTHER_SECRET)).toBeNull();
  });

  it('rechaza un token caducado', () => {
    const token = signSession(USER, SECRET, -10);
    expect(verifySession(token, SECRET)).toBeNull();
  });

  it('rechaza un token manipulado', () => {
    const token = signSession(USER, SECRET, 60);
    const [header, , signature] = token.split('.');
    const fakePayload = Buffer.from(
      JSON.stringify({ email: 'intruso@ntr.gg', exp: 9999999999 }),
    ).toString('base64url');
    expect(verifySession(`${header}.${fakePayload}.${signature}`, SECRET)).toBeNull();
  });

  it('rechaza basura', () => {
    expect(verifySession('no-es-un-jwt', SECRET)).toBeNull();
  });
});
