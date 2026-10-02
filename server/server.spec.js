import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// issue #22: el HTML de csstats.gg es contenido de terceros y nunca debe
// ejecutarse como código en el servidor. Este test evita que vuelva a colarse
// una evaluación dinámica sobre ese HTML. Se revisan tanto server.js como
// csstats.js, donde ahora vive el parseo del HTML.
const dir = dirname(fileURLToPath(import.meta.url));
const sources = ['server.js', 'csstats.js'].map((file) => ({
  file,
  source: readFileSync(join(dir, file), 'utf8'),
}));

describe.each(sources)('$file: no ejecuta código de terceros', ({ source }) => {
  it('no usa eval()', () => {
    expect(source).not.toMatch(/\beval\s*\(/);
  });

  it('no usa el constructor Function', () => {
    expect(source).not.toMatch(/\bnew\s+Function\s*\(/);
    expect(source).not.toMatch(/(?<![\w.])Function\s*\(/);
  });
});
