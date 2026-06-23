import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const srcImagesDir = './src/assets/images';
const publicImagesDir = './public/images';
const publicDir = './public';

const convertToWebp = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`Converted: ${inputPath} -> ${outputPath}`);
  } catch (err) {
    console.error(`Failed to convert ${inputPath}:`, err);
  }
};

const run = async () => {
  // Convert src images
  const srcFiles = fs.readdirSync(srcImagesDir);
  for (const file of srcFiles) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const inputPath = path.join(srcImagesDir, file);
      const webpName = file.replace(ext, '.webp');
      const outputPath = path.join(srcImagesDir, webpName);
      await convertToWebp(inputPath, outputPath);
    }
  }

  // Convert public images
  const publicFiles = fs.readdirSync(publicImagesDir);
  for (const file of publicFiles) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const inputPath = path.join(publicImagesDir, file);
      const webpName = file.replace(ext, '.webp');
      const outputPath = path.join(publicImagesDir, webpName);
      await convertToWebp(inputPath, outputPath);
    }
  }

  // Convert favicon
  const faviconJpg = path.join(publicDir, 'favicon.jpg');
  if (fs.existsSync(faviconJpg)) {
    const faviconWebp = path.join(publicDir, 'favicon.webp');
    await convertToWebp(faviconJpg, faviconWebp);
  }
};

run().then(() => console.log('Image compression finished.'));
