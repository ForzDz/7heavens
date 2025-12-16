import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = path.join(__dirname, 'src', 'assets', 'pates-cover-temp.png');
const output = path.join(__dirname, 'src', 'assets', 'pates-cover.webp');

sharp(input)
  .webp({ quality: 85 })
  .toFile(output)
  .then(() => console.log('Conversion successful'))
  .catch(err => console.error(err));
