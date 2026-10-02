import { signSession, verifySession, type SessionUser } from './session';

const SECRET = new TextEncoder().encode('secreto-de-test-suficientemente-largo');

const USER: SessionUser = {
  email: 'parca@ntr.gg',
  name: 'Parca',
  picture: 'https://example.com/parca.png',
};

describe('session', () => {
  it('firma y verifica una sesión válida', async () => {
    const token = await signSession(USER, SECRET, 60);
    expect(token.split('.')).toHaveLength(3);

    await expect(verifySession(token, SECRET)).resolves.toEqual(USER);
  });

  it('rechaza un token firmado con otro secreto', async () => {
    const token = await signSession(USER, SECRET, 60);
    const other = new TextEncoder().encode('otro-secreto-de-test-suficientemente');

    await expect(verifySession(token, other)).resolves.toBeNull();
  });

  it('rechaza un token caducado', async () => {
    const token = await signSession(USER, SECRET, -10);
    await expect(verifySession(token, SECRET)).resolves.toBeNull();
  });

  it('rechaza basura', async () => {
    await expect(verifySession('no-es-un-jwt', SECRET)).resolves.toBeNull();
  });
});
