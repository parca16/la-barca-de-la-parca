/**
 * Optimización de imágenes con sharp (issue #20).
 *
 * Recorre `public/assets` y:
 *   - Heroes (`map-headers/`, `headers/`): reescribe el original a un ancho
 *     máximo de 1920 px y genera una variante `-960.webp` para móvil/tablet.
 *   - Utilidades (`utilidades/*`): genera variantes `-640.webp` (tarjetas) y
 *     `-1280.webp` (retina/móvil de alta densidad); el original se conserva
 *     intacto y solo se sirve en el lightbox, así que no se degrada.
 *   - Plays (`plays/`): genera una variante `-480.webp` para los minimapas.
 *
 * Las variantes siguen el patrón `<nombre>-<ancho>.webp` y son las que
 * referencian los `srcset` de las plantillas. El script es incremental: si
 * todas las variantes de un archivo existen y son más recientes que el
 * original, se salta. Usa `--force` para regenerarlas todas.
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ASSETS_DIR = path.join(__dirname, 'public', 'assets');
const FORCE = process.argv.includes('--force');
const WEBP = { effort: 6 };

/** Grupos de assets a procesar. `maxWidth: null` deja el original intacto. */
const GROUPS = [
  {
    dir: 'map-headers',
    label: 'Heroes de mapa',
    maxWidth: 1920,
    quality: 68,
    variants: [{ width: 960, quality: 72 }],
  },
  {
    dir: 'headers',
    label: 'Heroes de sección',
    maxWidth: 1920,
    quality: 68,
    variants: [{ width: 960, quality: 72 }],
  },
  {
    dir: 'utilidades',
    label: 'Utilidades',
    // El original se conserva: solo se usa en el lightbox. Las tarjetas cargan
    // la variante -640 y las pantallas retina/móvil la -1280.
    maxWidth: null,
    variants: [
      { width: 640, quality: 72 },
      { width: 1280, quality: 76 },
    ],
  },
  {
    dir: 'plays',
    label: 'Minimapas',
    maxWidth: null,
    variants: [{ width: 480, quality: 78 }],
  },
];

const IMAGE_EXT = /\.webp$/i;
/** Excluye variantes ya generadas (`nombre-960.webp`) para no reprocesarlas. */
const VARIANT_SUFFIX = /-\d{3,4}\.webp$/i;

function* walkImages(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkImages(full);
    } else if (IMAGE_EXT.test(entry.name) && !VARIANT_SUFFIX.test(entry.name)) {
      yield full;
    }
  }
}

function variantPath(file, width) {
  return file.replace(IMAGE_EXT, `-${width}.webp`);
}

function isFresh(source, variant) {
  return fs.existsSync(variant) && fs.statSync(variant).mtimeMs >= fs.statSync(source).mtimeMs;
}

async function optimizeOriginal(file, maxWidth, quality) {
  // Leemos a buffer para que sharp no retenga el archivo y bloquee la
  // reescritura en Windows.
  const input = fs.readFileSync(file);
  const optimized = await sharp(input)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality, ...WEBP })
    .toBuffer();
  fs.writeFileSync(file, optimized);
}

async function generateVariant(file, width, quality) {
  await sharp(file)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, ...WEBP })
    .toFile(variantPath(file, width));
}

async function processGroup({ dir, label, maxWidth, quality, variants }) {
  const baseDir = path.join(ASSETS_DIR, dir);
  let processed = 0;
  let skipped = 0;
  let bytesBefore = 0;
  let bytesAfter = 0;

  for (const file of walkImages(baseDir)) {
    const fresh = variants.every((v) => isFresh(file, variantPath(file, v.width)));
    if (fresh && !FORCE) {
      skipped++;
      continue;
    }

    bytesBefore += fs.statSync(file).size;
    if (maxWidth) {
      await optimizeOriginal(file, maxWidth, quality);
    }
    for (const variant of variants) {
      await generateVariant(file, variant.width, variant.quality);
    }
    bytesAfter +=
      fs.statSync(file).size +
      variants.reduce((sum, v) => sum + fs.statSync(variantPath(file, v.width)).size, 0);
    processed++;
  }

  const saved = bytesBefore - bytesAfter;
  console.log(
    `${label.padEnd(20)} ${String(processed).padStart(3)} procesadas, ` +
      `${String(skipped).padStart(3)} saltadas | ` +
      `${kb(bytesBefore)} -> ${kb(bytesAfter)} (${saved >= 0 ? '-' : '+'}${kb(Math.abs(saved))})`,
  );

  return { processed, skipped, bytesBefore, bytesAfter };
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

async function optimize() {
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error(
      `No se encontró el directorio de assets: ${ASSETS_DIR}\n` +
        'Ejecuta el script desde la raíz del proyecto.',
    );
    process.exitCode = 1;
    return;
  }

  console.log(`Optimizando imágenes${FORCE ? ' (--force)' : ''}...\n`);

  const totals = { processed: 0, skipped: 0, bytesBefore: 0, bytesAfter: 0 };
  for (const group of GROUPS) {
    const result = await processGroup(group);
    totals.processed += result.processed;
    totals.skipped += result.skipped;
    totals.bytesBefore += result.bytesBefore;
    totals.bytesAfter += result.bytesAfter;
  }

  const saved = totals.bytesBefore - totals.bytesAfter;
  console.log(
    `\nTotal                ${String(totals.processed).padStart(3)} procesadas, ` +
      `${String(totals.skipped).padStart(3)} saltadas | ` +
      `${kb(totals.bytesBefore)} -> ${kb(totals.bytesAfter)} ` +
      `(${saved >= 0 ? '-' : '+'}${kb(Math.abs(saved))})`,
  );
  console.log('\nListo.');
}

optimize().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
