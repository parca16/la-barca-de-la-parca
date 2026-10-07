import { createSign, generateKeyPairSync } from 'node:crypto';
import { verifyIdToken } from './google.js';

const CLIENT_ID = 'test-client-id.apps.googleusercontent.com';
const KID = 'test-key-1';

const { publicKey, privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const JWK = { ...publicKey.export({ format: 'jwk' }), kid: KID };

function makeToken(claims, key = privateKey, kid = KID) {
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT', kid })).toString(
    'base64url',
  );
  const payload = Buffer.from(
    JSON.stringify({
      iss: 'https://accounts.google.com',
      aud: CLIENT_ID,
      exp: Math.floor(Date.now() / 1000) + 60,
      email: 'parca@ntr.gg',
      email_verified: true,
      name: 'Parca',
      ...claims,
    }),
  ).toString('base64url');

  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${payload}`);
  signer.end();
  const signature = signer.sign(key).toString('base64url');

  return `${header}.${payload}.${signature}`;
}

describe('verifyIdToken', () => {
  it('acepta un token válido de Google', () => {
    expect(verifyIdToken(makeToken({}), CLIENT_ID, [JWK])).toEqual({
      email: 'parca@ntr.gg',
      emailVerified: true,
      name: 'Parca',
      picture: undefined,
    });
  });

  it('rechaza si el audience no coincide', () => {
    expect(verifyIdToken(makeToken({}), 'otro-client', [JWK])).toBeNull();
  });

  it('rechaza si el issuer no es de Google', () => {
    expect(verifyIdToken(makeToken({ iss: 'https://evil.example' }), CLIENT_ID, [JWK])).toBeNull();
  });

  it('rechaza un token caducado', () => {
    const expired = Math.floor(Date.now() / 1000) - 10;
    expect(verifyIdToken(makeToken({ exp: expired }), CLIENT_ID, [JWK])).toBeNull();
  });

  it('rechaza si falta el kid en las claves', () => {
    expect(verifyIdToken(makeToken({}), CLIENT_ID, [{ ...JWK, kid: 'otro-kid' }])).toBeNull();
  });

  it('rechaza una firma que no corresponde', () => {
    const { privateKey: otherKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
    expect(verifyIdToken(makeToken({}, otherKey), CLIENT_ID, [JWK])).toBeNull();
  });

  it('marca emailVerified=false cuando Google lo indica', () => {
    const claims = verifyIdToken(makeToken({ email_verified: false }), CLIENT_ID, [JWK]);
    expect(claims?.emailVerified).toBe(false);
  });
});
