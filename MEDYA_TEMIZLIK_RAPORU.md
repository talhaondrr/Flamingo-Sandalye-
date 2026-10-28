# Medya temizlik raporu — 28 Ekim 2026

Başlangıç Git çalışma ağacı temizdi. HTML, CSS, JavaScript ve Vite ayarları değiştirilmedi.

- Silinen görsel: 69
- Silinen video: 0
- Silinen diğer dosya: images/gallery/generated/prompts.json (eski galeri üretim metaverisi)
- Kazanılan alan: 10482402 bayt = 10.48 MB (10.00 MiB)

## Doğrulama

- Temizlik öncesi ve sonrası production build başarılı.
- npm test: 423 kontrol geçti. Altı sayfa, CSS sırası ve içeriği, yerel yollar, dokuz ürünün model/görsel eşleşmesi ve uygulama davranışları kontrol edildi.
- Gerçek galleryItems fonksiyonu dokuz model için çalıştırıldı: tümü yalnızca original katalog görselini döndürüyor. images/gallery şablon yolu mevcut yapılandırmada kullanılmıyor.
- Korunan tüm medya dosyalarının SHA-256 değerleri aynı.
- Production çıktısındaki 45 dosyanın yolları ve SHA-256 değerleri temizlik öncesiyle birebir aynı. Yayın paketinin boyutu değişmedi; silinen dosyalar zaten build dışında kalıyordu.
- Favicon, manifest, srcset, og:image ve twitter:image için mevcut özel dosya referansı bulunmadı. Yeni dosya veya referans eklenmedi. Mobil CSS arka planları korundu.
- Gerçek tarayıcıda görsel inceleme yapılmadı; çıktı dosyaları birebir karşılaştırıldı.

## Korunan belirsiz veya arşiv dosyaları

- media/uretim-sureci.mp4: mevcut HTML kullanmıyor; README_V7.md içinde belgelenmiş alternatif video.
- _yedekler/: 95 medya dosyası içeren geri yükleme/tasarım arşivi. Arşiv içi referanslar nedeniyle silinmedi; yayın kapsamı dışında.
- images/about-design-atelier-prompt.txt: kullanılan atölye görselinin kaynak bilgisi.
- images/materials/SOURCES.md: kullanılan materyal fotoğraflarının kaynak ve lisans bilgisi.

## Kopya incelemesi

Aktif kaynak medya envanterinde SHA-256 ile aynı içerikli kopya bulunmadı. Dist içindeki Vite çıktısı/katalog kopyaları statik ve dinamik yollar tarafından kullanıldığı için korundu. Yedek kopyaları arşiv olarak korundu. Görsel benzerliğine dayanarak farklı dosyalar birleştirilmedi.

## Silinen dosyalar

Eski galeri dosyaları: dinamik görünüm listesinde yok. Diğer görseller: aktif HTML/CSS/JS ve build ayarlarında referans yok. Katalog asılları korundu.

| Dosya | Bayt | SHA-256 |
|---|---:|---|
| images/about-flamingo-background.webp | 10782 | ed48dd735a15da00deebf1a18ffe3a8569b61d1ba42631a57af562d4b4626d96 |
| images/gallery/arte-back.webp | 52108 | 769f9362c64d716b5fc96a2865c06be5d93951e833b09943ad2da512635ab72c |
| images/gallery/arte-detail.webp | 76152 | 5288b0b3ce464b9f9a3e6404d405e95884f8dbfcd84377df5f5ac7a2c1d11547 |
| images/gallery/arte-front.webp | 51190 | 154b465025bbffd9df22644f253213817249e6d688f10415f1cddccb48a7f631 |
| images/gallery/arte-left.webp | 45768 | b696c8d0d08afc01bbeebb7317baba4ea3bfa1e5b7e8e5c885c61fe2931ab2ae |
| images/gallery/arte-right.webp | 44252 | 414bdf91e215070b5e47cd255bf712ce9d1710f89f2c4de08ca159de102fe7b9 |
| images/gallery/generated/angel-back.webp | 153974 | 365833999a6c9a45faec4feff16c27ec62f3b2ef5b6fe9b00765a6e84077cb02 |
| images/gallery/generated/angel-detail.webp | 139926 | 2e0442337df85d55c8c4b2c7b49cb9c4feae9a177a7dc357df23abad6b3a3945 |
| images/gallery/generated/angel-left.webp | 146432 | 163291caa0aef11e1ee4970a817053c7c13cd8dd6116789aa80ae3632180a0c4 |
| images/gallery/generated/angel-right.webp | 144186 | 33b482b15e86739bf75f9edac9b064f7bca45fe7c8d5ef8e1bd9093cedf1c935 |
| images/gallery/generated/arte-back.webp | 127508 | 79e761ddb8340fcdf58d0fb8fd86ed29d4b0f006052b126e81e3999b5d22e8d1 |
| images/gallery/generated/arte-left.webp | 119822 | bcef2eaac7857a8be8beab65102a258c9bfd14d978659e957141d4cf816a174d |
| images/gallery/generated/beny-back.webp | 173708 | 6ea61c211cdf20572ef6d2fba7d3579d944823effcfcfe3a4fe1affce9ef4d45 |
| images/gallery/generated/beny-detail.webp | 159364 | a195aed973813a2fa855c4b350c030bc56a4c7aab153ff3db40b986868969569 |
| images/gallery/generated/beny-left.webp | 178826 | ad63d46829767605b6797b334b8ac6c9617a02bad0360f53fb002395e492472d |
| images/gallery/generated/beny-right.webp | 168916 | 5a2b15c5fdc7d19ac1dd1179690cd536ac54903242d5da8a62f680b698575e65 |
| images/gallery/generated/icon-back.webp | 226486 | ae36b76d4843cc4835bc3acc38f16ef7e426a83fa2ed5513e36bfd5a7262e898 |
| images/gallery/generated/icon-detail.webp | 352846 | 0d225017c491ae87607723b28ad1a38686693ae5ab58d82ea7262e2b9015fdbc |
| images/gallery/generated/icon-left.webp | 179724 | 3ea7e500fbdbbb63c8133fa0d41e2629505384619cc6cf5a09737513b341cf80 |
| images/gallery/generated/icon-right.webp | 169710 | 1c27950bcbbd8c1480b3e3861e1dd19d030fc71b1a2da3bdf9722fafb004060b |
| images/gallery/generated/lead-back.webp | 264390 | 60564bde93799a1b4e285cd5e12d0487c76627f7cd5bf4974a9a963f93e74b51 |
| images/gallery/generated/lead-detail.webp | 271314 | 42ba517ecda67dde27ecff6f054d5ed13b8573d31417b55825015d2ccdd16f06 |
| images/gallery/generated/lead-left.webp | 248488 | a0851095965a8631c134846a45a0dcf1f4fb776b3822de3be733926b242558cf |
| images/gallery/generated/lead-right.webp | 254390 | 403172472a60580fbab1a5123d04434cf80210108f9b30dbd9a056bdc0de31c7 |
| images/gallery/generated/nova-left.webp | 136618 | dc0d96a04950a9edbcfd6d32db7185bb6ae7cae3f42b7b77bfaa2eec924de80c |
| images/gallery/generated/nova-plus-left.webp | 308920 | c74a45e05594be06fc58c45e4ee1b0cc812bf398e6e1fc8802c5c93fe6ed0ca5 |
| images/gallery/generated/tesla-back.webp | 142326 | 703f92fa16b79e7509193e50233e5e12b21d91279e462a59c8973892b258c58a |
| images/gallery/generated/tesla-detail.webp | 218776 | 1aa32bd94e2ccf8317d10574a2e39142b4b1d3ec534eaf2c6d9cd7a27c26ee75 |
| images/gallery/generated/tesla-left.webp | 138594 | 396f71b5e81fda3ef8af4fed0e5311c40cf037c8a1c8be8e715873a35c4e8f75 |
| images/gallery/generated/tesla-right.webp | 141022 | 84fdb132125c4336b29823da20d9080c095efb1b0ed615fe0b4c1e9b6d29cdd0 |
| images/gallery/golf-back.webp | 102262 | adf81aef6b43848175160e5b88d7fe023402a3cbc0c4d04b489412b9b6d0599a |
| images/gallery/golf-detail.webp | 146632 | 5beed57473ca945d86ce3a2b2b6d8b9ce0552d38fd028cf5ba2b315deca2117a |
| images/gallery/golf-front.webp | 114176 | 2fca83516c976105e0b57a61166476c07aca6d17b7d98819f0f308951f8cd20b |
| images/gallery/golf-left.webp | 89398 | 2215d74ba34b99923223938c2a5fee7e7de5860f05967ddc7287c0d9966893f3 |
| images/gallery/golf-right.webp | 86058 | 271a3ae5907ec6e11792c84ad43ad01521947d9c3f2873e0ed240f46b616c5b1 |
| images/gallery/lead-back.webp | 90476 | 7373ead3a5980e495d4ed94206ab829a366c293a01fd9e58e170865009809f42 |
| images/gallery/lead-detail.webp | 101490 | 2eb218aa463bbff3ed4f20546d2a67bd72b13165fe524c71a7fe7750374c0cd3 |
| images/gallery/lead-front.webp | 94366 | 340c4703a94886d1a568e277ec891d25ea5470ef2327f5f9dc6f18a6497fd6e8 |
| images/gallery/lead-left.webp | 75022 | 53ed530f66f37d27bbccdfa65a8c415fce1bbebdb79b61d59e701030bcff6b6d |
| images/gallery/lead-right.webp | 81652 | 9bf3d9b66bb5bc2fed5f51cb67ef7b3b7b2a4295639f530f13967326d10f52c8 |
| images/gallery/nova-back.webp | 62344 | c0f305ad39176e06b8e4df4c95508b1e3f48c45f92e305ff7676ccb32449c9f0 |
| images/gallery/nova-detail.webp | 75610 | b15df2a4945ef8cbae4b6ef248744348e848b874c58a88e862704a28fa6f61b8 |
| images/gallery/nova-front.webp | 55616 | f932cef56e58865c9650c457e58326806a26d2f5e0f20734007c2c7a67c1ef1b |
| images/gallery/nova-left.webp | 49074 | 8b3afba672d8f54587c8b1560ad27f79574158477f6059eb88b37999e7016206 |
| images/gallery/nova-plus-back.webp | 205888 | ee212c3011cc1fd5e2204173cbe3f4646494a097a509aeba33f58a77b411bf5e |
| images/gallery/nova-plus-detail.webp | 183550 | 97d57450fb2d5eeec256206fcfeea2fdb763f6223f67a06a4495ac08b7581c67 |
| images/gallery/nova-plus-front.webp | 208390 | 5192da468efef07964c96375cfd0ba53eb4d93d2a378d850643e0e5e2e00f523 |
| images/gallery/nova-plus-left.webp | 188426 | 84114ada85fce0afaf0f038b2a4a374a765e20e837561dbe3aa9a09da4ab722d |
| images/gallery/nova-plus-right.webp | 170078 | e4bb5702f0ba919bd9366a5b1737641e75ab0f675a0976f480617332ee9aa5cb |
| images/gallery/nova-right.webp | 57866 | d44c3117686a20b18349f3ac3a0ef2a4817db51e73b82f57e6fb79bbd3a13324 |
| images/gallery/scala-back.webp | 64602 | 62d0eb25c2a6897a8f13931ca965eb79b7cd91217fcc03905df37613d8c349d5 |
| images/gallery/scala-detail.webp | 44834 | a9f6c7b99465a6254794560dc9b260ab8f38104ef00acb56e5b93b2bb665e4b3 |
| images/gallery/scala-front.webp | 60984 | 1e59636d30c23e6769f017c0513661ee34c58506e91cda60faeefc3f89e24580 |
| images/gallery/scala-katalog.webp | 383500 | cdd1435de790e0834d69b39883bb01514315f052e6aa4f8ffce56aee37a1b494 |
| images/gallery/scala-left.webp | 60508 | 8054941482c27a1e2981cd8529b5ef9a5acd3ee8d1b5220508a7ddc4bd8ac8e5 |
| images/gallery/scala-right.webp | 61880 | 75e884b0fc9490bb982717e330fbb07079f35430adbc6284e3df132458d420f9 |
| images/gallery/tesla-back.webp | 62126 | 4fdcc5da44800d3d784f9bba3c1071408987ba076bb1dd5febe0d376c8611ea2 |
| images/gallery/tesla-detail.webp | 122268 | e68e36ddae69762e6d69ba4fe754d4ef7414d06b52f447b3f8e13380334184ce |
| images/gallery/tesla-front.webp | 66936 | e48468784cd4d292b7c0e09bb38baff781e6f6ad7f362c225ad06f85f0b03d4c |
| images/gallery/tesla-left.webp | 41790 | 1d224a6e63c68e0843a93f1cdcae975f22f41480f346bcd1d4c051e17445a08e |
| images/gallery/tesla-right.webp | 44986 | 9a4a10ba35f3169d5a10ca575eac48f5ded90be17fb8dc8669ef39cbb1ce21d3 |
| images/image-2.jpeg | 63593 | 6d76171607a7029332e787fef596011644bbac81077686de09a621259666e790 |
| images/image-3.jpeg | 106185 | 0b3cb42204cf0f45938f98023a77ea17e0a39a47f6d45f4aed443c70edb978f0 |
| images/image-4.jpeg | 60367 | a178cd5d97135dae8456414803d2632216eadab634bb24fbf0864fbdaaa7f3d3 |
| images/image-5.jpeg | 92897 | 2f5e93e40f3bac6cac7b799b80fbf6d13699576962a6e9e4313a24b927def472 |
| images/image-6.jpeg | 71931 | a8c0a1f946a46fcb54c0468c80065c89bda07fabff013eb450b914edbb90ce15 |
| images/materials/fabric-samples.jpg | 170300 | 13e2ae2abd4b94760d16a2b2b59beb93c7844bdb3b7414f6128b2db8c170758c |
| images/nova-plus.png | 1657118 | ba6e13e33fef81545ee44c74cac4f90abf02bf17953a733d57f535dc2d815a1c |
| images/scala.webp | 142104 | 91481df8770b6db357f24fd7ea744033a5b5bb86ab693a6dcd99260e71a699c4 |
| images/gallery/generated/prompts.json | 18601 | f7f0aef29922b68eb281cb6890b5514f51771ac0c5954fd3490c160c76229aa5 |

## Yerel HTTP testi

54 sayfa/varlık URL'si HTTP 200 döndürdü; olmayan sayfa HTTP 404 döndürdü. HTTP testi dahil toplam 478 kontrol geçti. Push veya deploy yapılmadı.

## Korunan arşiv medya dosyaları

- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/assets/ana-sayfa-video-B5-TorXw.mp4
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/assets/angel-CzwrCbTR.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/assets/arte-DvNm9LE-.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/assets/beny-BM02ybDq.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/assets/icon-4ozk2R3z.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/assets/image-1-yHRHi38H.png
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/assets/image-3-CVdoeacK.jpeg
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/assets/image-5-b8WWLyMl.jpeg
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/assets/lead-tzkoIMS-.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/assets/nova-Bm5_dlqT.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/assets/nova-plus-CDDPAdFB.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/assets/scala-DbZ_Kp5a.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/assets/scala-detail-DI7G0Ek3.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/assets/scala-right-Ca83DaU0.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/assets/tesla-Bw1n0s9Z.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/assets/uretim-poster-Cruxibis.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/about-flamingo-background.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/flamingo-transparent.png
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/image-1.png
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/image-2.jpeg
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/image-3.jpeg
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/image-4.jpeg
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/image-5.jpeg
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/image-6.jpeg
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/nova-plus.png
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/nova-plus.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/scala.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/uretim-poster.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/catalog/angel.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/catalog/arte.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/catalog/beny.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/catalog/icon.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/catalog/lead.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/catalog/nova-plus.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/catalog/nova.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/catalog/scala.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/catalog/tesla.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/arte-back.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/arte-detail.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/arte-front.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/arte-left.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/arte-right.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/golf-back.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/golf-detail.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/golf-front.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/golf-left.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/golf-right.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/lead-back.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/lead-detail.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/lead-front.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/lead-left.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/lead-right.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/nova-back.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/nova-detail.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/nova-front.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/nova-left.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/nova-plus-back.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/nova-plus-detail.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/nova-plus-front.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/nova-plus-left.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/nova-plus-right.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/nova-right.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/scala-back.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/scala-detail.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/scala-front.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/scala-katalog.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/scala-left.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/scala-right.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/tesla-back.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/tesla-detail.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/tesla-front.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/tesla-left.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/images/gallery/tesla-right.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/media/ana-sayfa-video.mp4
- _yedekler/bugunku-calismalar-2026-10-27-153554/dist/media/uretim-sureci.mp4
- _yedekler/bugunku-calismalar-2026-10-27-153554/images/nova-plus.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/images/uretim-poster.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/images/catalog/angel.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/images/catalog/arte.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/images/catalog/beny.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/images/catalog/icon.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/images/catalog/lead.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/images/catalog/nova-plus.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/images/catalog/nova.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/images/catalog/scala.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/images/catalog/tesla.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/media/ana-sayfa-video.mp4
- _yedekler/bugunku-calismalar-2026-10-27-153554/tasarim-konseptleri/assets/curve.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/tasarim-konseptleri/assets/form.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/tasarim-konseptleri/assets/line.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/tasarim-konseptleri/assets/lounge.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/tasarim-konseptleri/assets/noir.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/tasarim-konseptleri/assets/soft.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/tasarim-konseptleri/assets/texture.webp
- _yedekler/bugunku-calismalar-2026-10-27-153554/tasarim-konseptleri/assets/workshop.webp
