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

// issue #26: sin STEAM_API_KEY el servidor no debe enviar un placeholder a
// Steam. La clave vale null/undefined cuando no está configurada y
// fetchSteamProfile corta antes de llamar a la API.
describe('server.js: la clave de Steam no usa placeholders', () => {
  const source = readFileSync(join(dir, 'server.js'), 'utf8');

  it('no define un placeholder como valor por defecto', () => {
    expect(source).not.toMatch(/YOUR_STEAM_API_KEY_HERE/);
  });

  it('solo consulta Steam si hay clave', () => {
    expect(source).toMatch(/if \(!STEAM_API_KEY\)/);
  });
});

describe('.env.example documenta las variables', () => {
  const example = readFileSync(join(dir, '.env.example'), 'utf8');

  it('incluye STEAM_API_KEY y PORT', () => {
    expect(example).toMatch(/^STEAM_API_KEY=/m);
    expect(example).toMatch(/^PORT=/m);
  });
});

