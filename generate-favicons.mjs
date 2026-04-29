import sharp from 'sharp';
import { resolve } from 'path';

const logoPath = resolve('public/assets/logo.png');
const publicDir = resolve('public');

async function generateFavicons() {
  console.log('Generating favicons from logo...');

  // Generate favicon.ico replacement (32x32 PNG)
  await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(resolve(publicDir, 'favicon-32.png'));
  console.log('✓ favicon-32.png');

  // Generate 16x16 favicon
  await sharp(logoPath)
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(resolve(publicDir, 'favicon-16.png'));
  console.log('✓ favicon-16.png');

  // Generate Apple Touch Icon (180x180)
  await sharp(logoPath)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(resolve(publicDir, 'apple-touch-icon.png'));
  console.log('✓ apple-touch-icon.png');

  // Generate 192x192 for Android/PWA
  await sharp(logoPath)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(resolve(publicDir, 'icon-192.png'));
  console.log('✓ icon-192.png');

  // Generate 512x512 for Android/PWA
  await sharp(logoPath)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(resolve(publicDir, 'icon-512.png'));
  console.log('✓ icon-512.png');

  // Generate favicon.ico (32x32 PNG used as .ico)
  await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFormat('png')
    .toFile(resolve(publicDir, 'favicon.ico'));
  console.log('✓ favicon.ico');

  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);
