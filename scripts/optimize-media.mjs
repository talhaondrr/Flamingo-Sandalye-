import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';
import { readFileSync, writeFileSync, readdirSync, mkdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
mkdirSync(resolve(root, 'tmp/media-originals'), { recursive: true });
let saved = 0;
const files = readdirSync(resolve(root, 'images/catalog')).filter(file => file.endsWith('.webp')).map(file => 'images/catalog/' + file);
files.push('images/about-design-atelier.webp', 'images/restoran-proje-konsept.webp');
for (const file of files) {
  const path = resolve(root, file);
  const backup = resolve(root, 'tmp/media-originals', file.replaceAll('/', '_'));
  let input;
  try { input = readFileSync(backup); } catch (error) { if (error.code !== 'ENOENT') throw error; input = readFileSync(path); }
  const output = await sharp(input).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toBuffer();
  if (output.length >= input.length) continue;
  try { writeFileSync(backup, input, { flag: 'wx' }); } catch (error) { if (error.code !== 'EEXIST') throw error; }
  writeFileSync(path, output);
  saved += input.length - output.length;
}
const video = resolve(root, 'media/flamingo-sandalye-video.mp4');
const output = resolve(root, 'media/flamingo-sandalye-web.mp4');
// Preserve the original resolution and video quality; only remove audio and
// move MP4 metadata to the front for progressive web playback.
execFileSync(ffmpeg, ['-y', '-i', video, '-map', '0:v:0', '-an', '-c:v', 'copy', '-movflags', '+faststart', output], { stdio: 'pipe' });
console.log(JSON.stringify({ imageBytesSaved: saved, originalVideo: statSync(video).size, webVideo: statSync(output).size }));
