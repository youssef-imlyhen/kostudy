import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateIcons() {
  // Create icons directory if it doesn't exist
  const iconsDir = path.join(__dirname, '..', 'public');
  try {
    await fs.access(iconsDir);
  } catch {
    await fs.mkdir(iconsDir, { recursive: true });
  }

  // Generate icons from the provided Kostudy logo in /public
  const sourcePath = path.join(iconsDir, 'kostudy.png');

  const createIconFromLogo = async (size, filename) => {
    await sharp(sourcePath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(path.join(iconsDir, filename));
    console.log(`Generated ${filename}`);
  };

  // Generate icons for different sizes
  await createIconFromLogo(192, 'icon-192x192.png');
  await createIconFromLogo(512, 'icon-512x512.png');

  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);