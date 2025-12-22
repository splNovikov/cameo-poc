/**
 * Script to generate all required favicon sizes from source favicon.png
 * Generates: 16x16, 32x32, 180x180, 192x192, 512x512, and favicon.ico
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceFavicon = path.join(__dirname, '../public/favicons/favicon.png');
const outputDir = path.join(__dirname, '../public/favicons');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Favicon sizes to generate
const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
];

async function generateFavicons() {
  try {
    console.log('Generating favicons from:', sourceFavicon);

    // Check if source file exists
    if (!fs.existsSync(sourceFavicon)) {
      throw new Error(`Source favicon not found: ${sourceFavicon}`);
    }

    // Generate PNG files for each size
    for (const { size, name } of sizes) {
      const outputPath = path.join(outputDir, name);
      await sharp(sourceFavicon)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .png()
        .toFile(outputPath);
      console.log(`✓ Generated ${name} (${size}x${size})`);
    }

    // Generate favicon.ico (multi-size ICO file)
    // ICO files can contain multiple sizes, so we'll create one with 16x16, 32x32, and 48x48
    const icoSizes = [16, 32, 48];
    const icoBuffers = await Promise.all(
      icoSizes.map((size) =>
        sharp(sourceFavicon)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 },
          })
          .png()
          .toBuffer()
      )
    );

    // For simplicity, we'll use the 32x32 PNG as favicon.ico
    // Most modern browsers support PNG favicons
    const faviconIcoPath = path.join(outputDir, 'favicon.ico');
    await sharp(sourceFavicon)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .png()
      .toFile(faviconIcoPath);
    console.log('✓ Generated favicon.ico (32x32)');

    console.log('\n✅ All favicons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();

