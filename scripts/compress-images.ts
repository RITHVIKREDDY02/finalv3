import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function compressImages() {
  const inputDir = './client/public/images';
  const outputDir = './client/public/images';

  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace('.png', '.webp'));
    
    const stats = fs.statSync(inputPath);
    console.log(`Processing ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
    
    await sharp(inputPath)
      .resize(800, 450, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    console.log(`  -> ${file.replace('.png', '.webp')} (${(newStats.size / 1024).toFixed(0)} KB)`);
  }

  console.log('\nDone! Images compressed successfully.');
}

compressImages();
