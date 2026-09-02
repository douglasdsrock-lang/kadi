/**
 * KADI · JABONERÍA ARTESANAL — JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  const sheetCsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTmaucyOK_7UGF6rzHi44R-N_REMY7Hx4pml4hGn889U2RqIxDILE5gIj_NvVsMAqm2a12KUngvOrBU/pub?output=csv';

  const parseCsvRow = (row) => {
    const fields = [];
    let field = '';
    let insideQuotes = false;

    for (let index = 0; index < row.length; index += 1) {
      const character = row[index];

      if (character === '"') {
        if (insideQuotes && row[index + 1] === '"') {
          field += '"';
          index += 1;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (character === ',' && !insideQuotes) {
        fields.push(field.trim());
        field = '';
      } else {
        field += character;
      }
    }

    fields.push(field.trim());
    return fields;
  };

  const normalizeKey = (value) => value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const normalizeVideoUrl = (value) => {
    try {
      const url = new URL(value);
      let videoId = '';

      if (url.hostname === 'youtu.be') {
        videoId = url.pathname.split('/').filter(Boolean)[0] || '';
      } else if (url.hostname.endsWith('youtube.com') || url.hostname.endsWith('youtube-nocookie.com')) {
        videoId = url.searchParams.get('v') || '';
        if (!videoId) {
          const parts = url.pathname.split('/').filter(Boolean);
          const markerIndex = parts.findIndex((part) => ['embed', 'shorts', 'live'].includes(part));
          videoId = markerIndex >= 0 ? parts[markerIndex + 1] || '' : '';
        }
      }

      return videoId
        ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`
        : value;
    } catch {
      return value;
    }
  };

  const applySiteConfig = (config) => {
    if (config.checkout) {
      document.querySelectorAll('[data-config-link="checkout"]').forEach((link) => {
        link.href = config.checkout;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      });
    }

    if (config.whatsapp) {
      const whatsappButton = document.querySelector('.whatsapp-float-btn');
      if (whatsappButton) whatsappButton.href = config.whatsapp;
    }

    if (config.video) {
      const iframe = document.getElementById('hero-iframe');
      if (iframe) iframe.dataset.src = normalizeVideoUrl(config.video);
    }

    if (config.preco) {
      const price = document.querySelector('.price-main');
      if (price) price.textContent = config.preco;
    }
  };

  fetch(`${sheetCsvUrl}&_=${Date.now()}`, { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.text();
    })
    .then((csv) => {
      const config = {};
      csv.replace(/^\uFEFF/, '').split(/\r?\n/).slice(1).forEach((row) => {
        if (!row.trim()) return;
        const [type = '', value = ''] = parseCsvRow(row);
        const key = normalizeKey(type);
        if (key && value.trim()) config[key] = value.trim();
      });
      applySiteConfig(config);
    })
    .catch((error) => {
      console.warn('Não foi possível carregar a configuração da planilha. Os valores padrão serão mantidos.', error);
    });

  // Video player
  const videoOverlay = document.getElementById('video-overlay');
  const videoBox = document.getElementById('video-box');
  const heroIframe = document.getElementById('hero-iframe');

  if (videoOverlay && videoBox && heroIframe) {
    videoOverlay.addEventListener('click', () => {
      const videoSrc = heroIframe.getAttribute('data-src');
      if (videoSrc && (!heroIframe.src || heroIframe.src === window.location.href)) {
        heroIframe.src = videoSrc;
      }
      videoBox.classList.add('playing');
    });
  }

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;
    
    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.faq-answer').inert = true;
        }
      });

      questionBtn.setAttribute('aria-expanded', String(!isOpen));
      item.querySelector('.faq-answer').inert = isOpen;

      // Toggle current item
      if (isOpen) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });

  // 5. Smooth Scroll for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 40;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
      }
    });
  });
});
