# Flamingo Sandalye yayın ve SEO notları

Alan adı: https://flamingosandalye.com

## Uygulananlar

- Altı sayfa için canonical, Open Graph, Twitter paylaşım etiketleri ve işletme yapılandırılmış verisi.
- Beş içerik sayfası ve dokuz ürün için 14 URL içeren sitemap; robots.txt içinde sitemap adresi.
- Her içerik sayfasına özgü başlık ve açıklama; iletişim meta açıklamasındaki bozuk Türkçe karakterlerin düzeltilmesi.
- Ürün seçildiğinde modele özgü başlık, açıklama, canonical ve paylaşım görseli.
- Ürün fotoğrafları ve iki tanıtım görselinde toplam 791.846 bayt küçültme. Orijinaller tmp/media-originals içinde korunur.
- Üretim videosu kullanıcı tercihiyle orijinal çözünürlük ve görüntü kalitesine döndürüldü. Yeniden kodlama yapılmadan ses kaldırılır ve MP4 faststart uygulanır; video dosya bütçesi 5 MB.
- Mobil/tablette video kullanıcı başlatana kadar indirilmez; düşük veri ve azaltılmış hareket tercihlerinde otomatik oynatma yapılmaz.
- Kullanılmayan harici ikon stil dosyası kaldırıldı. Slider mevcut ahşap, krem ve gül kurusu görsel dilini korur; telefon/tablet/masaüstünde 1/2/3 kart düzeni vardır.
- Proje teklif CTA’sı model/adet/kumaş tercihlerini isteyen hazır WhatsApp mesajına bağlandı; doğrulanmamış indirim veya kampanya vaadi eklenmedi.
- Mobil iletişim kartları tek sütuna alındı; form alanları dar ekranlarda 16 px yazı boyutuna çıkarıldı.

## Anahtar kelime ve rakip incelemesi

Bu çalışma nitel arama niyeti incelemesidir; ücretli araçlardan hacim, zorluk veya sıralama verisi alınmadı.

| Sayfa | Birincil niyet | Doğal destekleyici konular |
|---|---|---|
| Ana sayfa | ahşap sandalye, İnegöl sandalye | kafe, restoran ve otel projeleri |
| Modeller | ahşap sandalye modelleri | ürün adı, ölçüler, kumaş ve ahşap rengi |
| Ürün detayı | model adı + sandalye | sırt/oturum ölçüsü, malzeme, teklif |
| Katalog | sandalye kataloğu | PDF inceleme ve indirme |
| İletişim | sandalye proje teklifi | İnegöl showroom, model ve adet |

Rakiplerin kamuya açık sayfalarında proje teklifi, kumaş/cila seçenekleri ve kullanım alanları öne çıkıyor:
- https://legosandalye.com/
- https://eylulsandalye.com/shop.html
- https://www.goldsandalye.com/

Flamingo için fırsat: doğrulanmış ürün ölçülerini görünür tutmak, gerçek proje fotoğraflarına yer vermek ve teklif talebini model/adet bilgisiyle kolaylaştırmak. Rakip metinleri kopyalanmadı. Mevcut tüm içeriğin internet genelinde benzersiz olduğu doğrulanmadı.

## Yayında tamamlanacaklar

1. Alan adını hosting hesabına bağlayın. Sertifika sağlandıktan sonra HTTPS ve www → ana alan adı yönlendirmesini doğrulayın. HSTS başlığı tek başına SSL kurulumu değildir.
2. Search Console’da alan adı mülkü ekleyin ve Google’ın verdiği DNS TXT kaydıyla sahipliği doğrulayın. Ardından https://flamingosandalye.com/sitemap.xml adresini gönderin. DNS/Google hesabına erişim olmadan kayıt yapılmadı.
3. Yayından sonra PageSpeed Insights/Lighthouse ile mobil ve masaüstü ölçümü alın. Bu çalışmada canlı SEO puanı veya Core Web Vitals sonucu üretilmedi.
4. Hosting yanıtında Brotli/gzip Content-Encoding değerini kontrol edin. Yerel sıkıştırma raporu tahmin niteliğindedir; sunucu sıkıştırmasının etkin olduğunu göstermez.
5. Gerçek cihazlarda 320, 390, 768, 1024 ve 1440 px genişliklerde menü, ürün galerisi, PDF ve iletişim akışını doğrulayın. Bu turda görsel tarayıcı testi yapılmadı.
6. Ürün detayları sorgu parametresi ve JavaScript kullanır. Google URL denetimiyle modele özgü render edilmiş canonical ve başlıkları kontrol edin; JavaScript çalıştırmayan sosyal botlar genel detay etiketlerini görebilir.
7. Instagram bağlantısı mevcut. Yeni sosyal hesap oluşturulmadı; marka sahibinin hesap erişimi gerekir. Sektör yayınlarına tanıtım yazısı gönderilmedi ve ücretli bağlantı satın alınmadı.
8. PDF katalog yaklaşık 20,3 MB; bu turda yeniden sıkıştırılmadı. Kaynak dosyadan düşük boyutlu PDF dışa aktarılması ve okunabilirlik kontrolü gerekir.

Google kaynakları:
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/appearance/title-link
- https://search.google.com/search-console/about

## Tekrarlanabilir kontroller

`npm run build`, `npm test`, `node scripts/check-performance.mjs`.

HTTP kontrolü: preview çalışırken `node scripts/check-site.mjs http://127.0.0.1:4173`.

Medya yeniden üretimi: `npm run optimize:media`; ardından yeniden derleyin. Metin dosyalarının ham/gzip/Brotli boyutları tmp/performance-report.json dosyasına yazılır.
