import { decodeClasses } from './classes-codec.js';
import { encrypt, generateKey, parseKey } from './crypto.js';

const KEY = parseKey(generateKey());

const CLASSES = [
  {
    id: 'una-clase',
    title: 'Una clase',
    description: '',
    youtubeId: 'https://youtu.be/Fi1wOnVkt3w',
    date: '2026-10-07',
    map: 'cache',
    tags: ['mapas'],
  },
];

describe('decodeClasses', () => {
  it('descifra y devuelve la lista de clases', () => {
    const payload = encrypt(JSON.stringify(CLASSES), KEY);
    expect(decodeClasses(payload, KEY)).toEqual(CLASSES);
  });

  it('lanza si el contenido no es un array', () => {
    const payload = encrypt(JSON.stringify({ no: 'es una lista' }), KEY);
    expect(() => decodeClasses(payload, KEY)).toThrow();
  });
});
