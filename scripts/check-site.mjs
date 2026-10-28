import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';
import vm from 'node:vm';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const pages = ['index', 'urunler', 'urun-detay', 'katalog', 'hakkimizda', 'iletisim'];
const read = path => readFileSync(path, 'utf8');
const source = read(resolve(root, 'js/script.js'));
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? walk(resolve(dir, entry.name)) : [resolve(dir, entry.name)]);
const urls = new Set();
let checks = 0;
const check = (condition, message) => { assert.ok(condition, message); checks++; };

function inspectReference(value, file) {
  if (!value || /^(https?:|data:|mailto:|tel:|javascript:|\/\/)/i.test(value)) return;
  const [pathname, fragment] = value.split('#');
  const path = decodeURIComponent(pathname.split('?')[0]);
  const target = path ? resolve(path.startsWith('/') ? dist : dirname(file), path.replace(/^\//, '')) : file;
  check(existsSync(target), `Missing file: ${relative(dist, file)} -> ${value}`);
  if (fragment && target.endsWith('.html')) check(read(target).includes(`id="${fragment}"`), `Missing anchor: ${value}`);
  if (path) urls.add('/' + relative(dist, target).replaceAll('\\', '/') + (pathname.includes('?') ? '?' + pathname.split('?')[1] : ''));
}

for (const page of pages) {
  const file = resolve(dist, page + '.html');
  check(existsSync(file), `Missing page: ${page}`);
  const html = read(file);
  check(/<html\s+lang="tr"/i.test(html), `${page}: language`);
  check((html.match(/<h1\b/gi) || []).length === 1, `${page}: one H1`);
  check(/<title>[^<]+<\/title>/.test(html), `${page}: title`);
  for (const key of ['name="description"', 'property="og:title"', 'property="og:description"']) {
    check(html.includes(key), `${page}: ${key}`);
  }
  const cssLinks = text => [...text.matchAll(/<link\b[^>]*href="(css\/[^\"]+)"[^>]*>/g)].map(match => match[1]);
  assert.deepEqual(cssLinks(html), cssLinks(read(resolve(root, page + '.html'))), `${page}: CSS order`);
  checks++;
  for (const tag of html.matchAll(/<img\b[^>]*>/g)) check(/\balt="[^"]*"/.test(tag[0]), `${page}: image alt`);
  for (const match of html.matchAll(/\b(?:href|src|poster)="([^"]*)"/g)) inspectReference(match[1], file);
  for (const tag of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    check(/rel="[^"]*noopener/.test(tag[0]), `${page}: external link protection`);
  }
}
for (const file of walk(resolve(dist, 'css'))) {
  check(read(file) === read(resolve(root, 'css', relative(resolve(dist, 'css'), file))), 'CSS changed during build');
  for (const match of read(file).matchAll(/url\(["']?([^\s)"']+)/g)) inspectReference(match[1], file);
}
check(existsSync(resolve(dist, 'robots.txt')), 'robots.txt missing');
for (const file of walk(dist)) {
  check(!/(?:^|\/)(?:\.git|\.env[^/]*|tmp|_yedekler|node_modules|scripts)(?:\/|$)|prompt|\.map$|package(?:-lock)?\.json$/i.test(relative(dist, file).replaceAll('\\', '/')), 'Development file published');
}

// Execute actual application code in a small DOM test double. This verifies
// application logic, not browser rendering, layout or native form validation.
function element() {
  return { textContent: '', content: '', innerHTML: '', children: [], events: {},
    append(...items) { this.children.push(...items); },
    addEventListener(name, handler) { this.events[name] = handler; },
  };
}
function run(search, withForm = false) {
  const nodes = Object.fromEntries(['productDetailPage', 'detailTitle', 'detailBreadcrumb', 'detailDescription', 'detailMainImage', 'detailBackHeight', 'detailDepth', 'detailSeatHeight', 'detailFabricMeters', 'detailWhatsApp', 'featuredTrack'].map(id => [id, element()]));
  const wrap = element();
  nodes.productDetailPage.querySelector = () => wrap;
  const metas = Object.fromEntries(['description', 'og:title', 'og:description'].map(key => [key, element()]));
  const callbacks = [];
  const opened = [];
  const head = element();
  if (withForm) {
    delete nodes.productDetailPage;
    nodes.contactForm = element();
    nodes.formNote = element();
    nodes.contactForm.querySelector = selector => ({ value: { '#name': '<Test & isim>', '#subject': 'Ürün Bilgisi', '#message': 'Nova Plus & Scala?' }[selector] });
  }
  const document = {
    head, title: '', querySelectorAll: () => [],
    getElementById: id => nodes[id] || null,
    querySelector: selector => metas[selector.match(/="([^"]+)"/)[1]],
    createElement: () => element(),
    addEventListener: (name, callback) => { if (name === 'DOMContentLoaded') callbacks.push(callback); },
  };
  const window = { location: { search, pathname: '/urun-detay.html', hash: '' }, open: (...args) => { opened.push(args); return null; }, addEventListener() {} };
  const context = vm.createContext({ document, window, URLSearchParams, setTimeout });
  vm.runInContext(source, context);
  callbacks.forEach(callback => callback());
  return { nodes, metas, head, document, opened, wrap, context };
}
const baseline = run('?model=scala');
const products = vm.runInContext('PRODUCTS', baseline.context);
const galleries = vm.runInContext('PRODUCT_GALLERIES', baseline.context);
check(Object.keys(products).length === 9, 'Product count changed');
for (const [slug, product] of Object.entries(products)) {
  const result = run('?model=' + slug);
  check(result.nodes.detailTitle.textContent === product.title, `${slug}: title`);
  check(result.nodes.detailMainImage.src === galleries[slug].original, `${slug}: image mapping`);
  check(result.metas.description.content === product.description, `${slug}: SEO description`);
  check(result.nodes.detailWhatsApp.href.startsWith('https://wa.me/905010951913?text='), `${slug}: WhatsApp`);
  inspectReference(galleries[slug].original, resolve(dist, 'urun-detay.html'));
  urls.add('/urun-detay.html?model=' + slug);
}
for (const search of ['', '?model=', '?model=missing', '?model=__proto__', '?model=constructor', '?model=%3Cscript%3E']) {
  const result = run(search);
  check(result.document.title.includes('Model bulunamadı'), `${search}: invalid model title`);
  check(result.wrap.innerHTML.includes('href="urunler.html"'), `${search}: return link`);
  check(result.head.children.some(node => node.content === 'noindex, follow'), `${search}: noindex`);
  check(result.nodes.detailTitle.textContent === '', `${search}: no Scala fallback`);
}
for (const file of pages.map(page => resolve(dist, page + '.html'))) {
  for (const match of read(file).matchAll(/urun-detay\.html\?model=([^"&]+)/g)) check(Object.hasOwn(products, match[1]), `Unknown product link: ${match[1]}`);
}
const form = run('', true);
form.nodes.contactForm.events.submit({ preventDefault() {} });
check(form.opened.length === 1, 'WhatsApp window not requested');
const fallback = form.nodes.formNote.children.find(child => typeof child === 'object');
check(fallback.href === form.opened[0][0], 'Fallback URL mismatch');
check(fallback.rel === 'noopener noreferrer', 'Fallback unsafe');
check(decodeURIComponent(new URL(fallback.href).searchParams.get('text')).includes('<Test & isim>'), 'User input changed');
check(!form.nodes.formNote.textContent.includes('açıldı'), 'False success message');
check(form.nodes.formNote.innerHTML === '', 'User input inserted as HTML');

if (process.argv[2]) {
  const base = process.argv[2];
  for (const url of urls) {
    const response = await fetch(new URL(url, base), { method: 'HEAD' });
    check(response.status === 200, `HTTP ${response.status}: ${url}`);
  }
  const missing = await fetch(new URL('/olmayan-sayfa.html', base));
  check(missing.status === 404, 'Unknown page must return 404');
  console.log(`HTTP preview: ${urls.size} local page/asset URLs passed; unknown page 404.`);
}
console.log(`PASS: ${checks} checks. Six pages, CSS order/content, local references, SEO, nine models, invalid models and blocked-popup fallback.`);
console.log('Not covered: real browser layout, console, external destinations, popup behavior and native validation.');
