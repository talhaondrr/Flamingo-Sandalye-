// ==========================================
// 1. ÜRÜN FİLTRELEME
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('#productGrid .card');

// WhatsApp numarasını ülke koduyla, boşluksuz biçimde buradan güncelleyin.
const WHATSAPP_NUMBER = '905010951913';

const PRODUCT_GALLERIES = {
  scala: { title: 'Scala', original: 'images/scala.webp', views: ['original', 'front', 'back', 'right', 'left', 'detail'] },
  nova: { title: 'Nova', original: 'images/image-2.jpeg' },
  'nova-plus': { title: 'Nova Plus', original: 'images/nova-plus.png' },
  golf: { title: 'Golf', original: 'images/image-3.jpeg' },
  arte: { title: 'Arte', original: 'images/image-4.jpeg' },
  lead: { title: 'Lead', original: 'images/image-5.jpeg' },
  tesla: { title: 'Tesla', original: 'images/image-6.jpeg' }
};

const PRODUCTS = {
  scala: {
    title: 'Scala',
    price: '₺4.490',
    description: 'Kavisli sırt yapısı ve yumuşak döşemesiyle modern yaşam alanlarına uyum sağlayan, zarif hatlı ahşap sandalye.',
    defaultWood: 'Ceviz',
    defaultFabric: 'Krem'
  },
  nova: {
    title: 'Nova',
    price: '₺3.690',
    description: 'Yumuşak formu ve sade çizgileriyle yemek alanları, kafe ve restoran projelerinde rahatlıkla kullanılabilen ahşap sandalye.',
    defaultWood: 'Doğal',
    defaultFabric: 'Krem'
  },
  'nova-plus': {
    title: 'Nova Plus',
    price: '₺4.890',
    description: 'Daha belirgin sırt formu ve güçlü duruşuyla konforu öne çıkaran, ahşap rengi ve kumaşı özelleştirilebilir model.',
    defaultWood: 'Koyu Ceviz',
    defaultFabric: 'Gri'
  },
  golf: {
    title: 'Golf',
    price: '₺4.190',
    description: 'Dengeli oranları ve karakterli ahşap gövdesiyle hem ev hem de ticari projelerde kullanılabilen zamansız sandalye.',
    defaultWood: 'Zeytin Ton',
    defaultFabric: 'Taş'
  },
  arte: {
    title: 'Arte',
    price: '₺3.850',
    description: 'Yuvarlatılmış hatları ve yalın görünümüyle çağdaş mekanlara uyum sağlayan, kumaş ve ahşap tonu seçilebilir sandalye.',
    defaultWood: 'Doğal',
    defaultFabric: 'Krem'
  },
  lead: {
    title: 'Lead',
    price: '₺3.590',
    description: 'Kompakt formu, dengeli oturumu ve ahşap detaylarıyla farklı masa gruplarına kolayca eşlik eden model.',
    defaultWood: 'Koyu Ceviz',
    defaultFabric: 'Gri'
  },
  tesla: {
    title: 'Tesla',
    price: '₺3.940',
    description: 'Modern çizgileri ve sade gövde formuyla restoran, kafe ve yaşam alanlarına uyarlanabilen ahşap sandalye.',
    defaultWood: 'Greige',
    defaultFabric: 'Taş'
  }
};

const WOOD_OPTIONS = [
  { name: 'Doğal', className: 'wood-natural' },
  { name: 'Ceviz', className: 'wood-walnut' },
  { name: 'Koyu Ceviz', className: 'wood-dark-walnut' },
  { name: 'Siyah', className: 'wood-black' },
  { name: 'Greige', className: 'wood-greige' },
  { name: 'Zeytin Ton', className: 'wood-olive' }
];

const FABRIC_OPTIONS = [
  { name: 'Krem', className: 'fabric-cream' },
  { name: 'Taş', className: 'fabric-stone' },
  { name: 'Vizon', className: 'fabric-mink' },
  { name: 'Gri', className: 'fabric-grey' },
  { name: 'Antrasit', className: 'fabric-anthracite' },
  { name: 'Kiremit', className: 'fabric-terracotta' }
];

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
      : GALLERY_VIEWS;

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
  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get('model') || 'scala';
  const slug = PRODUCTS[requestedSlug] ? requestedSlug : 'scala';
  const product = PRODUCTS[slug];
  const gallery = PRODUCT_GALLERIES[slug];

  document.title = `Flamingo Sandalye — ${product.title}`;

  const detailTitle = document.getElementById('detailTitle');
  const detailBreadcrumb = document.getElementById('detailBreadcrumb');
  const detailDescription = document.getElementById('detailDescription');
  const detailPrice = document.getElementById('detailPrice');
  const detailMainImage = document.getElementById('detailMainImage');
  const detailThumbs = document.getElementById('detailThumbs');
  const woodOptions = document.getElementById('woodOptions');
  const fabricOptions = document.getElementById('fabricOptions');
  const woodCurrent = document.getElementById('woodCurrent');
  const fabricCurrent = document.getElementById('fabricCurrent');
  const quantityInput = document.getElementById('detailQuantity');
  const summary = document.getElementById('detailSelectionSummary');
  const whatsappButton = document.getElementById('detailWhatsApp');

  let selectedWood = product.defaultWood;
  let selectedFabric = product.defaultFabric;

  detailTitle.textContent = product.title;
  detailBreadcrumb.textContent = product.title;
  detailDescription.textContent = product.description;
  detailPrice.textContent = product.price;

  function detailGalleryItems() {
    const views = gallery.views
      ? GALLERY_VIEWS.filter(view => gallery.views.includes(view.key))
      : GALLERY_VIEWS;

    return views.map(view => ({
      label: view.label,
      src: view.key === 'original' ? gallery.original : `images/gallery/${slug}-${view.key}.webp`
    }));
  }

  const galleryItems = detailGalleryItems();
  detailMainImage.src = galleryItems[0].src;
  detailMainImage.alt = `${product.title} sandalye — ${galleryItems[0].label}`;
  detailThumbs.innerHTML = galleryItems.map((item, index) => `
    <button type="button" class="detail-thumb${index === 0 ? ' active' : ''}" data-index="${index}" aria-label="${item.label} görünümünü aç">
      <img src="${item.src}" alt="" loading="lazy">
      <span>${item.label}</span>
    </button>
  `).join('');

  detailThumbs.addEventListener('click', event => {
    const button = event.target.closest('.detail-thumb');
    if (!button) return;
    const item = galleryItems[Number(button.dataset.index)];
    detailMainImage.src = item.src;
    detailMainImage.alt = `${product.title} sandalye — ${item.label}`;
    detailThumbs.querySelectorAll('.detail-thumb').forEach(thumb => thumb.classList.remove('active'));
    button.classList.add('active');
  });

  function renderOptionButtons(container, options, selectedValue, type) {
    container.innerHTML = options.map(option => `
      <button type="button" class="material-option${option.name === selectedValue ? ' selected' : ''}" data-value="${option.name}" role="radio" aria-checked="${option.name === selectedValue}">
        <span class="material-swatch ${option.className}" aria-hidden="true"></span>
        <span>${option.name}</span>
      </button>
    `).join('');

    container.addEventListener('click', event => {
      const button = event.target.closest('.material-option');
      if (!button) return;
      container.querySelectorAll('.material-option').forEach(option => {
        option.classList.remove('selected');
        option.setAttribute('aria-checked', 'false');
      });
      button.classList.add('selected');
      button.setAttribute('aria-checked', 'true');

      if (type === 'wood') {
        selectedWood = button.dataset.value;
        woodCurrent.textContent = selectedWood;
      } else {
        selectedFabric = button.dataset.value;
        fabricCurrent.textContent = selectedFabric;
      }
      updateSelectionSummary();
    });
  }

  function safeQuantity() {
    const parsed = Number.parseInt(quantityInput.value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  }

  function updateSelectionSummary() {
    const quantity = safeQuantity();
    summary.textContent = `${product.title} · ${selectedWood} · ${selectedFabric} · ${quantity} adet`;
  }

  woodCurrent.textContent = selectedWood;
  fabricCurrent.textContent = selectedFabric;
  renderOptionButtons(woodOptions, WOOD_OPTIONS, selectedWood, 'wood');
  renderOptionButtons(fabricOptions, FABRIC_OPTIONS, selectedFabric, 'fabric');
  updateSelectionSummary();

  quantityInput.addEventListener('input', updateSelectionSummary);
  quantityInput.addEventListener('change', () => {
    if (safeQuantity() !== Number.parseInt(quantityInput.value, 10)) quantityInput.value = '1';
    updateSelectionSummary();
  });

  whatsappButton.addEventListener('click', () => {
    const quantity = safeQuantity();
    openWhatsApp(
      `Merhaba, ${product.title} modeliyle ilgileniyorum.\n\n` +
      `Ahşap rengi: ${selectedWood}\n` +
      `Kumaş: ${selectedFabric}\n` +
      `Adet: ${quantity}\n\n` +
      `Bu kombinasyon için güncel fiyat, üretim süresi ve kartela bilgisi alabilir miyim?`
    );
  });
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
