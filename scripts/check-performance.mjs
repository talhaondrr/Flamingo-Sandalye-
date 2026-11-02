import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { gzipSync, brotliCompressSync } from 'node:zlib';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(item => item.isDirectory() ? walk(resolve(dir, item.name)) : [resolve(dir, item.name)]);
const files = walk(dist);
const text = files.filter(path => /\.(html|css|js|xml|txt)$/.test(path));
const sizes = text.map(path => {
  const data = readFileSync(path);
  return { file: relative(dist, path), bytes: data.length, gzip: gzipSync(data).length, brotli: brotliCompressSync(data).length };
});
for (const path of files.filter(path => /\.(webp|png|jpe?g)$/.test(path))) assert.ok(statSync(path).size < 800_000, `Image budget exceeded: ${path}`);
for (const path of files.filter(path => /\.mp4$/.test(path))) assert.ok(statSync(path).size < 5_000_000, `Video budget exceeded: ${path}`);
const sitemap = readFileSync(resolve(dist, 'sitemap.xml'), 'utf8');
assert.equal((sitemap.match(/<loc>/g) || []).length, 14);
for (const path of files.filter(path => path.endsWith('.html'))) {
  const html = readFileSync(path, 'utf8');
  for (const token of ['rel="canonical"', 'property="og:image"', 'name="twitter:card"', 'application/ld+json']) assert.ok(html.includes(token), `Missing ${token}: ${path}`);
  assert.ok(!html.includes('font-awesome'), 'Unused icon stylesheet remains');
}
mkdirSync(resolve(root, 'tmp'), { recursive: true });
const totals = sizes.reduce((sum, item) => ({ bytes: sum.bytes + item.bytes, gzip: sum.gzip + item.gzip, brotli: sum.brotli + item.brotli }), { bytes: 0, gzip: 0, brotli: 0 });
writeFileSync(resolve(root, 'tmp/performance-report.json'), JSON.stringify({ note: 'Local file budgets and compression estimates; not Lighthouse, network timing or live server compression verification.', totals, files: sizes }, null, 2));
console.log('PASS: media budgets, 14 sitemap URLs, canonical/social/schema tags. Text compression estimates:', totals);
