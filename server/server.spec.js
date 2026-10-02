import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// issue #22: el HTML de csstats.gg es contenido de terceros y nunca debe
// ejecutarse como código en el servidor. Este test evita que vuelva a colarse
// una evaluación dinámica sobre ese HTML.
const source = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'server.js'),
  'utf8'
);

describe('server.js: no ejecuta código de terceros', () => {
  it('no usa eval()', () => {
    expect(source).not.toMatch(/\beval\s*\(/);
  });

  it('no usa el constructor Function', () => {
    expect(source).not.toMatch(/\bnew\s+Function\s*\(/);
    expect(source).not.toMatch(/(?<![\w.])Function\s*\(/);
  });
});
