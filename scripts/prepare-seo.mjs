import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const origin = 'https://flamingosandalye.com';
const pages = ['index', 'urunler', 'katalog', 'hakkimizda', 'iletisim', 'urun-detay'];
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const source = readFileSync(resolve(root, 'js/script.js'), 'utf8');
const products = JSON.parse(source.match(/const PRODUCTS = (\{[\s\S]*?\n\});/)[1]);
const copy = {
  index: ['Ahşap Sandalye Modelleri | Flamingo Sandalye İnegöl', 'Flamingo Sandalye ahşap sandalye modellerini keşfedin. Kafe, restoran ve otel projeleri için ahşap rengi, kumaş seçenekleri ve projeye özel teklif alın.'],
  urunler: ['Ahşap Sandalye Modelleri ve Ölçüleri | Flamingo', 'Angel, Tesla, Beny, Nova Plus, Scala, Lead, Nova, Icon ve Arte ahşap sandalye modellerini inceleyin. Ölçüler ve kumaş seçenekleri için model detaylarına ulaşın.'],
  katalog: ['Sandalye Kataloğu | Flamingo Sandalye', 'Flamingo Sandalye PDF kataloğunu inceleyin veya indirin. Ahşap sandalye modellerini karşılaştırın, projenize uygun model için bizimle iletişime geçin.'],
  hakkimizda: ['Hakkımızda | Flamingo Sandalye İnegöl', 'Flamingo Sandalye’nin tasarım, malzeme ve üretim yaklaşımını tanıyın. İnegöl’den yaşam alanlarına uzanan ahşap sandalye modellerimizi keşfedin.'],
  iletisim: ['İletişim ve Proje Teklifi | Flamingo Sandalye', 'Flamingo Sandalye İnegöl showroom adresi, telefon ve WhatsApp bilgileri. Model, adet, ahşap rengi ve kumaş tercihinizi paylaşarak projeniz için teklif alın.']
};
for (const page of pages) {
  const path = resolve(root, page + '.html');
  let html = readFileSync(path, 'utf8').replace(/\n<!-- seo:start -->[\s\S]*?<!-- seo:end -->\n/g, '\n');
  if (copy[page]) {
    const [title, description] = copy[page];
    html = html.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
      .replace(/(<meta name="description" content=")[^"]*("\s*\/?\s*>)/, `$1${description}$2`)
      .replace(/(<meta property="og:title" content=")[^"]*("\s*\/?\s*>)/, `$1${title}$2`)
      .replace(/(<meta property="og:description" content=")[^"]*("\s*\/?\s*>)/, `$1${description}$2`);
  }
  const url = origin + (page === 'index' ? '/' : '/' + page + '.html');
  const title = html.match(/<title>(.*?)<\/title>/s)[1];
  const description = html.match(/name="description" content="([^"]*)"/)[1];
  const image = origin + '/images/catalog/scala.webp';
  const schema = {
    '@context': 'https://schema.org', '@type': 'FurnitureStore',
    name: 'Flamingo Sandalye', url: origin + '/', image,
    telephone: '+90 501 042 16 16',
    address: { '@type': 'PostalAddress', streetAddress: 'Akhisar, 275. Sokak No: 2', addressLocality: 'İnegöl', addressRegion: 'Bursa', postalCode: '16400', addressCountry: 'TR' },
    sameAs: ['https://www.instagram.com/flamingosandalye/']
  };
  const tags = [
    `<link rel="canonical" href="${url}"/>`,
    `<meta property="og:url" content="${url}"/>`,
    `<meta property="og:image" content="${image}"/>`,
    '<meta property="og:image:alt" content="Flamingo Sandalye Scala ahşap sandalye modeli"/>',
    '<meta name="twitter:card" content="summary_large_image"/>',
    `<meta name="twitter:title" content="${escape(title)}"/>`,
    `<meta name="twitter:description" content="${description}"/>`,
    `<meta name="twitter:image" content="${image}"/>`,
    `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`
  ];
  html = html.replace('</head>', `<!-- seo:start -->\n${tags.join('\n')}\n<!-- seo:end -->\n</head>`);
  writeFileSync(path, html);
}
const urls = pages.filter(page => page !== 'urun-detay').map(page => origin + (page === 'index' ? '/' : '/' + page + '.html'));
urls.push(...Object.keys(products).map(slug => `${origin}/urun-detay.html?model=${slug}`));
writeFileSync(resolve(root, 'public/sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map(url => `  <url><loc>${escape(url)}</loc></url>`).join('\n') + '\n</urlset>\n');
writeFileSync(resolve(root, 'public/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`SEO prepared: ${pages.length} pages, ${urls.length} sitemap URLs.`);
