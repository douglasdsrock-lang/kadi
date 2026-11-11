/**
 * KADI · JABONERÍA ARTESANAL — JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  // Conteúdo editável vem da Central Arteli (projeto "kadi", o mesmo para as duas
  // versões). Os campos ficam em arteli-content.js; preço e checkout são escolhidos
  // pelo <body data-currency="usd|eur">. Se a Central não responder ou nada estiver
  // publicado, a página fica com os valores do próprio HTML.
  const central = {
    project: document.body.dataset.project || 'kadi',
    supabaseUrl: 'https://jqccxkzwjpgjtxubhkdt.supabase.co',
    publishableKey: 'sb_publishable_OQJWuEuJHoMSOWRlHS_lUA_kH97z7lh',
  };

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

  const setHeroVideo = (value) => {
    const container = document.getElementById('video-box');
    if (!container) return;

    try {
      const url = new URL(value);
      const vturbMatch = url.hostname === 'scripts.converteai.net'
        ? url.pathname.match(/\/players\/([a-zA-Z0-9]+)\/v\d+\/player\.js$/)
        : null;

      if (vturbMatch) {
        const playerId = vturbMatch[1];
        const smartPlayer = document.createElement('vturb-smartplayer');
        smartPlayer.id = `vid-${playerId}`;
        smartPlayer.style.cssText = 'display: block; margin: 0 auto; width: 100%;';

        const placeholder = document.createElement('div');
        placeholder.className = 'vturb-player-placeholder';
        placeholder.style.cssText = 'position: relative; width: 100%; padding: 56.25% 0 0; z-index: 0; background-color: black;';
        smartPlayer.appendChild(placeholder);

        const playerScript = document.createElement('script');
        playerScript.src = url.href;
        playerScript.async = true;

        container.replaceChildren(smartPlayer, playerScript);
        return;
      }

      const iframe = document.createElement('iframe');
      iframe.className = 'hero-iframe hero-iframe-visible';
      iframe.src = normalizeVideoUrl(value);
      iframe.title = 'Video KADI Jabonería Artesanal';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      container.replaceChildren(iframe);
    } catch {
      console.warn('O link de vídeo informado no painel não é válido. O player padrão será mantido.');
    }
  };

  const applySiteConfig = (config) => {
    if (window.ArteliKadi) window.ArteliKadi.apply(config);

    const videoUrl = config.hero && config.hero.videoUrl;
    if (typeof videoUrl === 'string' && videoUrl.trim()) {
      setHeroVideo(videoUrl.trim());
    }
  };

  fetch(`${central.supabaseUrl}/rest/v1/rpc/get_public_project_config`, {
    method: 'POST',
    headers: { apikey: central.publishableKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ project_slug: central.project }),
    signal: AbortSignal.timeout(5000),
  })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((result) => {
      if (result?.project === central.project && result.config && typeof result.config === 'object') {
        applySiteConfig(result.config);
      }
    })
    .catch((error) => {
      console.warn('Não foi possível carregar a configuração da Central Arteli. Os valores padrão serão mantidos.', error);
    });

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

  // 4. Products carousel
  const productsCarousel = document.querySelector('[data-products-carousel]');
  if (productsCarousel) {
    const viewport = productsCarousel.querySelector('[data-carousel-viewport]');
    const track = productsCarousel.querySelector('.products-carousel-track');
    const previousButton = productsCarousel.querySelector('[data-carousel-prev]');
    const nextButton = productsCarousel.querySelector('[data-carousel-next]');

    const updateCarouselButtons = () => {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      previousButton.disabled = viewport.scrollLeft <= 2;
      nextButton.disabled = viewport.scrollLeft >= maxScroll - 2;
    };

    const scrollCarousel = (direction) => {
      const firstCard = track.querySelector('.product-carousel-card');
      if (!firstCard) return;
      const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
      const distance = firstCard.getBoundingClientRect().width + gap;
      viewport.scrollBy({
        left: direction * distance,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    };

    previousButton.addEventListener('click', () => scrollCarousel(-1));
    nextButton.addEventListener('click', () => scrollCarousel(1));
    viewport.addEventListener('scroll', updateCarouselButtons, { passive: true });
    window.addEventListener('resize', updateCarouselButtons);
    updateCarouselButtons();
  }

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
