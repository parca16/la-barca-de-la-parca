const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const headersDir = path.join(__dirname, 'public', 'assets', 'map-headers');
const files = fs.readdirSync(headersDir);

async function optimize() {
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') continue;

    const inputPath = path.join(headersDir, file);
    const outputPath = path.join(headersDir, file.replace(/\.(jpe?g|png)$/i, '.webp'));

    console.log(`Processing: ${file}`);

    try {
      await sharp(inputPath)
        .resize({ width: 2560, height: 600, fit: 'cover', position: 'center' })
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(outputPath).size;
      const ratio = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
      console.log(`  -> ${path.basename(outputPath)} (${optimizedSize.toLocaleString()} bytes, -${ratio}%)`);
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
  }
}

optimize();