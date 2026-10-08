/**
 * Convierte una imagen cualquiera a .webp para usarla como utilidad.
 *
 * Uso:
 *   node to-webp.cjs <entrada> <salida.webp>
 *
 * Si la entrada ya es .webp, copia el archivo tal cual (el original de una
 * utilidad se conserva sin recomprimir: es el que sirve el lightbox).
 * Para el resto de formatos (png, jpg, gif…) reencoda a webp con alta calidad.
 *
 * Usa el `sharp` que ya es dependencia del proyecto (se resuelve desde la raíz).
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const [input, output] = process.argv.slice(2);

if (!input || !output) {
  console.error('Uso: node to-webp.cjs <entrada> <salida.webp>');
  process.exit(1);
}

if (!fs.existsSync(input)) {
  console.error(`No existe el archivo de entrada: ${input}`);
  process.exit(1);
}

if (!/\.webp$/i.test(output)) {
  console.error(`La salida debe terminar en .webp: ${output}`);
  process.exit(1);
}

const report = (width, height, bytes) =>
  console.log(`OK ${path.basename(output)} ${width}x${height} ${(bytes / 1024).toFixed(0)} KB`);

try {
  fs.mkdirSync(path.dirname(output), { recursive: true });

  if (/\.webp$/i.test(input)) {
    fs.copyFileSync(input, output);
    console.log(`OK ${path.basename(output)} (copiado, ya era webp)`);
  } else {
    // Alta calidad porque este archivo es el "original" y solo se reescala a
    // variantes -640/-1280 en optimize:images; el lightbox usa el original.
    sharp(input)
      .webp({ quality: 90, effort: 6 })
      .toFile(output)
      .then((info) => report(info.width, info.height, info.size))
      .catch((err) => {
        console.error(err.message);
        process.exit(1);
      });
  }
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
