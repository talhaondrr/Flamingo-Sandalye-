// ==========================================
// 1. ÜRÜN FİLTRELEME
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('#productGrid .card');

// WhatsApp numarasını ülke koduyla, boşluksuz biçimde buradan güncelleyin.
const WHATSAPP_NUMBER = '905010951913';

// Kaynak: Kullanıcının kataloğu. Kumaş metrajı iki adet içindir.
const PRODUCT_GALLERIES = {
  "angel": {
    "title": "Angel",
    "original": "images/catalog/angel.webp",
    "views": [
      "original"
    ]
  },
  "tesla": {
    "title": "Tesla",
    "original": "images/catalog/tesla.webp"
  },
  "beny": {
    "title": "Beny",
    "original": "images/catalog/beny.webp",
    "views": [
      "original"
    ]
  },
  "nova-plus": {
    "title": "Nova Plus",
    "original": "images/catalog/nova-plus.webp"
  },
  "scala": {
    "title": "Scala",
    "original": "images/catalog/scala.webp"
  },
  "lead": {
    "title": "Lead",
    "original": "images/catalog/lead.webp"
  },
  "nova": {
    "title": "Nova",
    "original": "images/catalog/nova.webp"
  },
  "icon": {
    "title": "Icon",
    "original": "images/catalog/icon.webp",
    "views": [
      "original"
    ]
  },
  "arte": {
    "title": "Arte",
    "original": "images/catalog/arte.webp"
  }
};
const PRODUCTS = {
  "angel": {
    "title": "Angel",
    "description": "Angel, ahşap gövde ve döşemeli oturumuyla ahşap rengi ve kumaşı seçilebilir sandalye modeli.",
    "backHeight": 88,
    "depth": 48,
    "seatHeight": 48,
    "fabricMeters": "1,60"
  },
  "tesla": {
    "title": "Tesla",
    "description": "Modern çizgileri ve sade gövde formuyla restoran, kafe ve yaşam alanlarına uyarlanabilen ahşap sandalye.",
    "backHeight": 88,
    "depth": 48,
    "seatHeight": 48,
    "fabricMeters": "1,60"
  },
  "beny": {
    "title": "Beny",
    "description": "Beny, ahşap gövde ve döşemeli oturumuyla ahşap rengi ve kumaşı seçilebilir sandalye modeli.",
    "backHeight": 85,
    "depth": 50,
    "seatHeight": 48,
    "fabricMeters": "2,50"
  },
  "nova-plus": {
    "title": "Nova Plus",
    "description": "Daha belirgin sırt formu ve güçlü duruşuyla konforu öne çıkaran, ahşap rengi ve kumaşı özelleştirilebilir model.",
    "backHeight": 85,
    "depth": 48,
    "seatHeight": 48,
    "fabricMeters": "3,40"
  },
  "scala": {
    "title": "Scala",
    "description": "Kavisli sırt yapısı ve yumuşak döşemesiyle modern yaşam alanlarına uyum sağlayan, zarif hatlı ahşap sandalye.",
    "backHeight": 85,
    "depth": 48,
    "seatHeight": 48,
    "fabricMeters": "2,50"
  },
  "lead": {
    "title": "Lead",
    "description": "Kompakt formu, dengeli oturumu ve ahşap detaylarıyla farklı masa gruplarına kolayca eşlik eden model.",
    "backHeight": 85,
    "depth": 46,
    "seatHeight": 48,
    "fabricMeters": "1,80"
  },
  "nova": {
    "title": "Nova",
    "description": "Yumuşak formu ve sade çizgileriyle yemek alanları, kafe ve restoran projelerinde rahatlıkla kullanılabilen ahşap sandalye.",
    "backHeight": 85,
    "depth": 45,
    "seatHeight": 48,
    "fabricMeters": "2,50"
  },
  "icon": {
    "title": "Icon",
    "description": "Icon, ahşap gövde ve döşemeli oturumuyla ahşap rengi ve kumaşı seçilebilir sandalye modeli.",
    "backHeight": 85,
    "depth": 46,
    "seatHeight": 48,
    "fabricMeters": "1,60"
  },
  "arte": {
    "title": "Arte",
    "description": "Yuvarlatılmış hatları ve yalın görünümüyle çağdaş mekanlara uyum sağlayan, kumaş ve ahşap tonu seçilebilir sandalye.",
    "backHeight": 85,
    "depth": 46,
    "seatHeight": 48,
    "fabricMeters": "1,60"
  }
};

const GALLERY_VIEWS = [
  { key: 'original', label: 'Ana görünüm' },
  { key: 'front', label: 'Önden' },
  { key: 'back', label: 'Arkadan' },
  { key: 'right', label: 'Sağdan' },
  { key: 'left', label: 'Soldan' },
  { key: 'detail', label: 'Detay' }
];

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

document.querySelectorAll('.product-whatsapp').forEach(container => {
  const product = container.dataset.product;
  const message = `Merhaba, ${product} sandalye modeli hakkında ahşap rengi, kumaş seçenekleri, ölçü, güncel fiyat ve sipariş bilgisi almak istiyorum.`;
  container.innerHTML = `<a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}" target="_blank" rel="noopener noreferrer" aria-label="${product} modeli için WhatsApp’tan iletişime geçiniz">WhatsApp’tan iletişime geçiniz</a>`;
});

document.querySelectorAll('.whatsapp-link').forEach(link => {
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(link.dataset.message || 'Merhaba, ürünleriniz hakkında bilgi almak istiyorum.')}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

const galleryModal = document.getElementById('galleryModal');
if (galleryModal) {
  const galleryImage = document.getElementById('galleryImage');
  const galleryTitle = document.getElementById('galleryTitle');
  const galleryCaption = document.getElementById('galleryCaption');
  const galleryThumbs = document.getElementById('galleryThumbs');
  let activeGallery = null;
  let activeIndex = 0;
  let lastFocused = null;

  function galleryItems(slug) {
    const gallery = PRODUCT_GALLERIES[slug];
    const views = gallery.views
      ? GALLERY_VIEWS.filter(view => gallery.views.includes(view.key))
      : GALLERY_VIEWS.filter(view => view.key === 'original');

    return views.map(view => ({
      label: view.label,
      src: view.key === 'original' ? gallery.original : `images/gallery/${slug}-${view.key}.webp`
    }));
  }

  function renderGallery() {
    const gallery = PRODUCT_GALLERIES[activeGallery];
    const items = galleryItems(activeGallery);
    const item = items[activeIndex];
    galleryTitle.textContent = `${gallery.title} Fotoğrafları`;
    galleryImage.src = item.src;
    galleryImage.alt = `${gallery.title} sandalye — ${item.label}`;
    galleryCaption.textContent = items.length > 1 ? `${activeIndex + 1} / ${items.length}` : `${gallery.title} — ana görünüm`;

    const prevButton = galleryModal.querySelector('.gallery-prev');
    const nextButton = galleryModal.querySelector('.gallery-next');
    const hasMultipleImages = items.length > 1;
    prevButton.style.display = hasMultipleImages ? '' : 'none';
    nextButton.style.display = hasMultipleImages ? '' : 'none';
    galleryThumbs.style.display = hasMultipleImages ? '' : 'none';

    galleryThumbs.innerHTML = items.map((thumb, index) =>
      `<button type="button" class="gallery-thumb${index === activeIndex ? ' active' : ''}" data-index="${index}" aria-label="${thumb.label} görünümünü aç"><img src="${thumb.src}" alt="" loading="lazy"></button>`
    ).join('');
  }

  function openGallery(slug, trigger) {
    activeGallery = slug;
    activeIndex = 0;
    lastFocused = trigger;
    renderGallery();
    galleryModal.classList.add('open');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    galleryModal.querySelector('.gallery-close').focus();
  }

  function closeGallery() {
    galleryModal.classList.remove('open');
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    lastFocused?.focus();
  }

  function stepGallery(direction) {
    const total = galleryItems(activeGallery).length;
    activeIndex = (activeIndex + direction + total) % total;
    renderGallery();
  }

  document.querySelectorAll('.product-open').forEach(button => {
    button.addEventListener('click', () => openGallery(button.dataset.gallery, button));
  });
  galleryModal.querySelector('.gallery-close').addEventListener('click', closeGallery);
  galleryModal.querySelector('.gallery-prev').addEventListener('click', () => stepGallery(-1));
  galleryModal.querySelector('.gallery-next').addEventListener('click', () => stepGallery(1));
  galleryThumbs.addEventListener('click', event => {
    const button = event.target.closest('.gallery-thumb');
    if (!button) return;
    activeIndex = Number(button.dataset.index);
    renderGallery();
  });
  galleryModal.addEventListener('click', event => {
    if (event.target === galleryModal) closeGallery();
  });
  document.addEventListener('keydown', event => {
    if (!galleryModal.classList.contains('open')) return;
    if (event.key === 'Escape') closeGallery();
    if (event.key === 'ArrowLeft') stepGallery(-1);
    if (event.key === 'ArrowRight') stepGallery(1);
  });
}

if (filterBtns.length > 0 && cards.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        card.classList.toggle(
          'hidden',
          filter !== 'all' && card.dataset.cat !== filter
        );
      });
    });
  });
}


// ==========================================
// ÜRÜN DETAYI VE ÖZELLEŞTİRME
// ==========================================
const productDetailPage = document.getElementById('productDetailPage');
if (productDetailPage) {
  const requestedSlug = new URLSearchParams(window.location.search).get('model') || 'scala';
  const slug = PRODUCTS[requestedSlug] ? requestedSlug : 'scala';
  const product = PRODUCTS[slug];
  const gallery = PRODUCT_GALLERIES[slug];
  document.title = 'Flamingo Sandalye - ' + product.title;
  document.getElementById('detailTitle').textContent = product.title;
  document.getElementById('detailBreadcrumb').textContent = product.title;
  document.getElementById('detailDescription').textContent = product.description;
  const image = document.getElementById('detailMainImage');
  image.src = gallery.original;
  image.alt = product.title + ' sandalye - katalog';
  document.getElementById('detailBackHeight').textContent = product.backHeight + ' cm';
  document.getElementById('detailDepth').textContent = product.depth + ' cm';
  document.getElementById('detailSeatHeight').textContent = product.seatHeight + ' cm';
  document.getElementById('detailFabricMeters').textContent = product.fabricMeters + ' m / 2 adet';
  const contact = document.getElementById('detailWhatsApp');
  contact.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent('Merhaba, ' + product.title + ' sandalye modeli ve siparişe özel kumaş / ahşap rengi seçenekleri hakkında bilgi almak istiyorum.');
}

// ==========================================
// 2. MENÜ AKTİFLİK VE NAVİGASYON YÖNETİMİ
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-links a");

  function updateActiveMenu() {
    let currentPath = window.location.pathname.split("/").pop();
    if (!currentPath || currentPath === "") {
      currentPath = "index.html";
    }
    // Ürün detay sayfasında menüde "Ürünler" bağlantısını aktif tut.
    if (currentPath === "urun-detay.html") {
      currentPath = "urunler.html";
    }
    
    const currentHash = window.location.hash;

    // Tüm menü linklerinden aria-current temizle
    navLinks.forEach((link) => link.removeAttribute("aria-current"));

    // Ana sayfada hash yoksa Ana Sayfa bağlantısını aktif tut.
    if (currentPath === "index.html" && !currentHash) {
      const homeLink = Array.from(navLinks).find(link => link.getAttribute("href") === "#anasayfa");
      if (homeLink) {
        homeLink.setAttribute("aria-current", "page");
        return;
      }
    }

    // Ana sayfadaki bölüm bağlantılarında aktif menüyü hash üzerinden belirle.
    if (currentPath === "index.html" && currentHash) {
      const sectionLink = Array.from(navLinks).find(link => {
        const href = link.getAttribute("href") || "";
        return href === currentHash || href.endsWith(currentHash);
      });
      if (sectionLink) {
        sectionLink.setAttribute("aria-current", "page");
        return;
      }
    }

    // Normal sayfa eşleşmesi (urunler.html, index.html vb.)
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      
      if (href && !href.includes("#") && href.includes(currentPath)) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  // Sayfa yüklendiğinde çalıştır
  updateActiveMenu();

  // Tıklama olaylarını dinle
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      setTimeout(updateActiveMenu, 60);
    });
  });

  // URL hash değiştiğinde çalıştır
  window.addEventListener("hashchange", updateActiveMenu);

  // Ana sayfada kaydırdıkça aktif menü öğesini güncelle.
  const homeSectionIds = ["anasayfa", "modeller", "hakkimizda", "iletisim"];
  const homeSections = homeSectionIds.map(id => document.getElementById(id)).filter(Boolean);
  if (homeSections.length > 1 && "IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => link.removeAttribute("aria-current"));
      const activeLink = Array.from(navLinks).find(link => link.getAttribute("href") === `#${visible.target.id}`);
      activeLink?.setAttribute("aria-current", "page");
    }, { rootMargin: "-28% 0px -56% 0px", threshold: [0, .15, .35] });
    homeSections.forEach(section => sectionObserver.observe(section));
  }

  // ==========================================
  // 3. İLETİŞİM FORMUNDAN WHATSAPP MESAJI OLUŞTURMA
  // ==========================================
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Sayfanın yenilenmesini engeller

      const name = contactForm.querySelector('#name')?.value.trim() || '';
      const subject = contactForm.querySelector('#subject')?.value || '';
      const message = contactForm.querySelector('#message')?.value.trim() || '';
      openWhatsApp(`Merhaba, ben ${name}.\nTalep konusu: ${subject}\n\n${message}`);

      if (formNote) formNote.textContent = "Mesajınız WhatsApp’ta açıldı. Göndermek için WhatsApp ekranından onaylayın.";
    });
  }
});

// ==========================================
// V7 — ANA SAYFA ÜRETİM VİDEOSU
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('productionVideo');
  const button = document.getElementById('productionVideoButton');
  if (!video || !button) return;

  const icon = button.querySelector('.video-btn-icon');
  const text = button.querySelector('.video-btn-text');
  let videoAvailable = true;

  function syncButton() {
    if (!videoAvailable) {
      icon.textContent = '↓';
      text.textContent = 'Üretim Aşamalarını Gör';
      return;
    }
    icon.textContent = video.paused ? '▶' : 'Ⅱ';
    text.textContent = video.paused ? 'Üretim Sürecimizi İzle' : 'Videoyu Duraklat';
  }

  video.addEventListener('playing', syncButton);
  video.addEventListener('pause', syncButton);
  video.addEventListener('error', () => {
    videoAvailable = false;
    video.style.display = 'none';
    syncButton();
  }, { once:true });

  button.addEventListener('click', async () => {
    if (!videoAvailable || video.readyState === 0) {
      document.querySelector('.production-process')?.scrollIntoView({ behavior:'smooth', block:'start' });
      return;
    }
    if (video.paused) {
      try { await video.play(); } catch (_) {}
    } else {
      video.pause();
    }
    syncButton();
  });

  // Autoplay engellenirse poster görünür ve butondan başlatılabilir.
  video.play().catch(() => syncButton());
  syncButton();
});
