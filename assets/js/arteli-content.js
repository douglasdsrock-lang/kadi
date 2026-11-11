/**
 * KADI — campos editáveis pela Central Arteli (projeto "kadi").
 * As duas versões (dólar e euro) usam os MESMOS textos. Só preço e checkout
 * mudam: cada página escolhe o seu pelo <body data-currency="usd|eur">.
 *
 * Modos:
 *  text   → troca o texto do elemento
 *  rich   → texto com **negrito** e quebras de linha (Enter)
 *  tail   → troca só o texto solto, mantendo ícones/elementos dentro
 *  before → texto antes do primeiro elemento interno (ex.: antes do destaque)
 *  after  → texto depois do primeiro elemento interno
 *  href   → link
 *  none   → só aparece no painel (usado por outro código, ex.: vídeo)
 */
(() => {
  const fields = [];
  const add = (key, label, selector, mode = 'text', extra = {}) =>
    fields.push({ key, label, selector, mode, ...extra });
  const range = (count, fn) => { for (let n = 1; n <= count; n += 1) fn(n); };

  // Geral
  add('general.topBanner', 'Faixa do topo (use **asteriscos** para negrito)', '.top-banner', 'rich');
  add('general.whatsappUrl', 'Link do WhatsApp (botão flutuante)', '.whatsapp-float-btn', 'href');

  // Apresentação
  add('hero.titleBefore', 'Título — antes do destaque', '.hero-headline', 'before');
  add('hero.titleHighlight', 'Título — parte em destaque (colorida)', '.hero-headline .highlight-gradient');
  add('hero.titleAfter', 'Título — depois do destaque', '.hero-headline', 'after');
  add('hero.videoUrl', 'Link do vídeo (YouTube ou VTurb) — vazio mantém o vídeo atual', null, 'none', { type: 'url', defaultValue: '' });
  add('hero.subtitle', 'Subtítulo', '.hero-subheadline');
  add('hero.description', 'Descrição (use **asteriscos** para negrito)', '.hero-description', 'rich');
  add('hero.ctaLabel', 'Texto do botão', '.hero-cta-group .btn > span:first-child');
  range(5, (n) => add(`hero.badge${n}`, `Selo ${n} abaixo do botão`, `.hero-cta-sub > span:nth-child(${n})`));

  // Dores
  add('pain.badge', 'Etiqueta', '#identificacion .badge');
  add('pain.title', 'Título', '#identificacion .section-title');
  add('pain.subtitle', 'Subtítulo', '#identificacion .section-subtitle');
  range(5, (n) => add(`pain.item${n}`, `Dor ${n}`, `.pain-card:nth-child(${n}) p`));
  add('pain.closing', 'Frase final (use **asteriscos** para negrito)', '.pain-closing-banner p', 'rich');

  // Transformação
  add('transformation.badge', 'Etiqueta', '#transformacion .badge');
  add('transformation.title', 'Título', '#transformacion .section-title');
  add('transformation.lead', 'Frase de abertura (use **asteriscos** para negrito)', '.transform-lead', 'rich');
  range(5, (n) => add(`transformation.item${n}`, `Cartão ${n}`, `.transform-card:nth-child(${n}) h3`));
  add('transformation.journeyTitle', 'Frase do caminho', '.transform-tagline-box h3');
  [1, 3, 5].forEach((child, index) =>
    add(`transformation.step${index + 1}`, `Caminho — etapa ${index + 1}`, `.journey-steps > span:nth-child(${child})`));

  // Professoras
  add('instructors.photoTag', 'Nome sobre a foto', '.instructors-badge-tag');
  add('instructors.badge', 'Etiqueta', '#profesoras .badge');
  add('instructors.title', 'Título', '#profesoras .section-title');
  add('instructors.subtitle', 'Subtítulo', '.instructors-subtitle');
  add('instructors.bio', 'Texto sobre elas (Enter quebra a linha)', '.instructors-bio', 'rich');
  add('instructors.supportTitle', 'Quadro de suporte — título', '.support-highlight-card h4');
  add('instructors.supportText', 'Quadro de suporte — texto (use **asteriscos** para negrito)', '.support-highlight-card p', 'rich');
  add('instructors.ctaLabel', 'Texto do botão', '#profesoras .btn > span:first-child');

  // Método
  add('method.badge', 'Etiqueta', '#metodo .badge');
  add('method.title', 'Título', '#metodo .section-title');
  add('method.moduleLabel', 'Palavra acima do número (todos os módulos)', '.module-label');
  range(6, (n) => {
    add(`method.module${n}Title`, `Módulo ${n} — título`, `.module-${n} .module-title`);
    add(`method.module${n}Text`, `Módulo ${n} — descrição`, `.module-${n} .module-desc`);
  });

  // Diferencial
  add('comparison.badge', 'Etiqueta', '#diferencial .badge');
  add('comparison.title', 'Título', '#diferencial .section-title');
  add('comparison.subtitle', 'Subtítulo', '.comparison-subtitle');
  add('comparison.othersTitle', 'Coluna "outros" — título', '.col-others h3');
  range(5, (n) => add(`comparison.others${n}`, `Coluna "outros" — item ${n}`, `.comparison-list-others li:nth-child(${n})`));
  add('comparison.kadiTag', 'Coluna KADI — etiqueta', '.kadi-popular-tag');
  add('comparison.kadiTitle', 'Coluna KADI — título', '.col-kadi h3');
  range(5, (n) => add(`comparison.kadi${n}`, `Coluna KADI — item ${n}`, `.comparison-list-kadi li:nth-child(${n})`));
  add('comparison.kadiMessage', 'Coluna KADI — frase final (use **asteriscos** para negrito)', '.comparison-kadi-message', 'rich');
  add('comparison.quote', 'Citação', '.quote-box p');

  // Produtos
  add('products.eyebrow', 'Etiqueta', '#productos .eyebrow');
  add('products.title', 'Título', '#productos .section-title');
  add('products.text', 'Texto', '.products-carousel-heading p');

  // Bônus
  add('bonuses.badge', 'Etiqueta', '#bonos .badge');
  add('bonuses.title', 'Título', '#bonos .section-title');
  add('bonuses.includedLabel', 'Selo "incluído" (todos os bônus)', '.bonus-free-pill', 'tail');
  range(6, (n) => {
    add(`bonuses.bonus${n}Title`, `Bônus ${n} — título`, `.bonus-card:nth-child(${n}) .bonus-title`);
    if (n <= 3) add(`bonuses.bonus${n}Text`, `Bônus ${n} — descrição`, `.bonus-card:nth-child(${n}) .bonus-desc`);
  });
  add('bonuses.emphasis', 'Frase depois dos bônus', '.bonuses-emphasis');
  add('bonuses.specialLabel', 'Bônus especial — etiqueta', '.special-bonus-label');
  add('bonuses.specialKicker', 'Bônus especial — chamada', '.special-bonus-kicker');
  add('bonuses.specialTitle', 'Bônus especial — título', '.special-bonus-intro h3');
  add('bonuses.specialText', 'Bônus especial — texto', '.special-bonus-intro p');
  add('bonuses.specialListTitle', 'Bônus especial — título da lista', '.special-bonus-list-title');
  range(6, (n) => add(`bonuses.specialItem${n}`, `Bônus especial — item ${n}`, `.special-bonus-list li:nth-child(${n})`));
  add('bonuses.specialClosing', 'Bônus especial — frase final', '.special-bonus-closing');

  // Depoimentos
  add('testimonials.eyebrow', 'Etiqueta', '.testimonials-eyebrow');
  add('testimonials.title', 'Título', '#depoimentos .section-title');
  add('testimonials.text', 'Texto (Enter quebra a linha)', '.testimonials-heading p', 'rich');
  add('testimonials.videoLabel', 'Etiqueta dos vídeos (todos)', '.testimonial-media-label');
  add('testimonials.closing', 'Frase final', '.testimonials-closing');

  // Oferta
  add('offer.priceUsd', 'Preço — página em dólar', null, 'none', { type: 'text', defaultValue: '$37,00', required: true });
  add('offer.priceEur', 'Preço — página em euro', null, 'none', { type: 'text', defaultValue: '€37,00', required: true });
  add('offer.checkoutUsd', 'Link de checkout — página em dólar', null, 'none',
    { type: 'url', defaultValue: 'https://pay.hotmart.com/W107564814F?off=qke8zwqv', required: true });
  add('offer.checkoutEur', 'Link de checkout — página em euro', null, 'none',
    { type: 'url', defaultValue: 'https://pay.hotmart.com/W107564814F?off=7go84ori', required: true });
  add('offer.badge', 'Etiqueta do quadro', '.pricing-badge-top');
  add('offer.title', 'Título', '.pricing-header .section-title');
  range(11, (n) => add(`offer.include${n}`, `O que inclui — item ${n} (use **asteriscos** para negrito)`,
    `.pricing-includes-item:nth-child(${n}) > span`, 'rich'));
  add('offer.ctaLabel', 'Texto do botão', '.pricing-btn-wrap .btn > span:first-child');
  add('offer.guaranteeNote', 'Frase abaixo do botão', '.pricing-security-badges span');

  // Garantia
  add('guarantee.panelLabel', 'Selo — etiqueta acima', '.guarantee-panel-label');
  add('guarantee.sealKicker', 'Selo — palavra de cima', '.guarantee-seal-kicker');
  add('guarantee.sealNumber', 'Selo — número', '.guarantee-seal-number');
  add('guarantee.sealDays', 'Selo — palavra de baixo', '.guarantee-seal-days');
  add('guarantee.panelNote', 'Selo — frase abaixo', '.guarantee-panel-note');
  add('guarantee.eyebrow', 'Etiqueta', '.guarantee-eyebrow');
  add('guarantee.titleBefore', 'Título — antes do destaque', '#guarantee-title', 'before');
  add('guarantee.titleHighlight', 'Título — parte em destaque', '#guarantee-title > span');
  add('guarantee.text', 'Texto (use **asteriscos** para negrito)', '.guarantee-text > p', 'rich');
  add('guarantee.promiseNumber', 'Destaque — número', '.guarantee-promise-number');
  add('guarantee.promiseTitle', 'Destaque — título', '.guarantee-promise strong');
  add('guarantee.promiseText', 'Destaque — texto', '.guarantee-promise div > span');
  add('guarantee.linkLabel', 'Texto do link', '.guarantee-link', 'before');

  // Perguntas frequentes
  add('faq.badge', 'Etiqueta', '#faq .badge');
  add('faq.title', 'Título', '#faq .section-title');
  range(11, (n) => {
    add(`faq.q${n}`, `Pergunta ${n}`, `#faq-question-${n} > span:first-child`);
    add(`faq.a${n}`, `Resposta ${n}`, `#faq-answer-${n} p`, 'text', { type: 'textarea' });
  });

  // Chamada final
  add('closing.title', 'Título', '.closing-content h2');
  range(3, (n) => add(`closing.reassurance${n}`, `Frase ${n} (tarja)`, `.closing-reassurance span:nth-child(${n})`));
  add('closing.emphasis', 'Frase em destaque', '.closing-emphasis');
  add('closing.description', 'Texto', '.closing-description', 'text', { type: 'textarea' });
  add('closing.question', 'Pergunta', '.closing-question');
  add('closing.ctaLabel', 'Texto do botão', '.closing-btn > span:first-child');

  // Rodapé
  range(5, (n) => add(`footer.link${n}`, `Menu — link ${n}`, `.footer-links a:nth-child(${n})`));
  add('footer.copyright', 'Texto de direitos', '.footer-bottom p', 'text', { type: 'textarea' });

  // ---------------------------------------------------------------------------
  const read = (config, path) => path.split('.').reduce((value, key) =>
    (value && typeof value === 'object' && Object.hasOwn(value, key) ? value[key] : undefined), config);
  const clean = (text) => text.replace(/\s+/g, ' ').trim();
  const escapeHtml = (text) => text.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const richToHtml = (text) => escapeHtml(text.trim())
    .replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\r?\n/g, '<br>');
  const htmlToRich = (element) => {
    let out = '';
    element.childNodes.forEach((node) => {
      // Quebras do código-fonte são só espaço; quebra de verdade é <br>.
      if (node.nodeType === 3) out += node.textContent.replace(/\s+/g, ' ');
      else if (node.nodeName === 'BR') out += '\n';
      else if (['STRONG', 'B'].includes(node.nodeName)) out += `**${clean(node.textContent)}**`;
      else out += node.textContent.replace(/\s+/g, ' ');
    });
    return out.split('\n').map(clean).join('\n').trim();
  };
  const safeUrl = (value) => {
    try {
      const url = new URL(value.trim());
      return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  };
  const textAround = (element, side) => {
    const first = element.firstElementChild;
    const nodes = [...element.childNodes].filter((node) => node.nodeType === 3 && first &&
      (side === 'before'
        ? node.compareDocumentPosition(first) & Node.DOCUMENT_POSITION_FOLLOWING
        : node.compareDocumentPosition(first) & Node.DOCUMENT_POSITION_PRECEDING));
    return nodes;
  };

  const readers = {
    text: (el) => clean(el.textContent),
    rich: htmlToRich,
    tail: (el) => clean([...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(' ')),
    before: (el) => clean(textAround(el, 'before').map((n) => n.textContent).join(' ')),
    after: (el) => clean(textAround(el, 'after').map((n) => n.textContent).join(' ')),
    href: (el) => el.getAttribute('href') || '',
  };

  const writers = {
    text: (el, value) => { el.textContent = value; },
    rich: (el, value) => { el.innerHTML = richToHtml(value); },
    tail: (el, value) => {
      const nodes = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim());
      if (nodes.length) {
        nodes[0].textContent = ` ${value}`;
        nodes.slice(1).forEach((n) => { n.textContent = ''; });
      } else el.append(document.createTextNode(` ${value}`));
    },
    before: (el, value) => {
      const nodes = textAround(el, 'before');
      const text = value ? `${value} ` : '';
      if (nodes.length) { nodes[0].textContent = text; nodes.slice(1).forEach((n) => { n.textContent = ''; }); }
      else el.prepend(document.createTextNode(text));
    },
    after: (el, value) => {
      const nodes = textAround(el, 'after');
      const text = value ? ` ${value}` : '';
      if (nodes.length) { nodes[0].textContent = text; nodes.slice(1).forEach((n) => { n.textContent = ''; }); }
      else el.firstElementChild?.after(document.createTextNode(text));
    },
    href: (el, value) => { const url = safeUrl(value); if (url) el.setAttribute('href', url); },
  };

  function apply(config) {
    if (!config || typeof config !== 'object') return;
    fields.forEach((field) => {
      if (!field.selector || field.mode === 'none') return;
      const value = read(config, field.key);
      if (typeof value !== 'string') return;
      if (field.mode === 'href' && !value.trim()) return;
      document.querySelectorAll(field.selector).forEach((el) => writers[field.mode](el, value));
    });

    const eur = document.body.dataset.currency === 'eur';
    const price = read(config, eur ? 'offer.priceEur' : 'offer.priceUsd');
    if (typeof price === 'string' && price.trim()) {
      document.querySelectorAll('.price-main').forEach((el) => { el.textContent = price.trim(); });
    }
    const checkout = safeUrl(read(config, eur ? 'offer.checkoutEur' : 'offer.checkoutUsd') || '');
    if (checkout) {
      document.querySelectorAll('[data-config-link="checkout"]').forEach((link) => {
        link.href = checkout;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      });
    }
  }

  // Monta campos + valores atuais a partir da página (usado para cadastrar na Central).
  function template() {
    const config = {};
    const schema = fields.map((field) => {
      let value = field.defaultValue;
      if (value === undefined) {
        const el = document.querySelector(field.selector);
        if (!el) throw new Error(`Elemento ausente: ${field.selector}`);
        value = readers[field.mode](el);
      }
      const [group, key] = field.key.split('.');
      (config[group] ??= {})[key] = value;
      const type = field.type
        || (field.mode === 'href' ? 'url' : field.mode === 'rich' || value.length > 90 ? 'textarea' : 'text');
      return { key: field.key, label: field.label, type, ...(field.required ? { required: true } : {}) };
    });
    return { schema: { fields: schema }, config };
  }

  window.ArteliKadi = { apply, template, fields };
})();
