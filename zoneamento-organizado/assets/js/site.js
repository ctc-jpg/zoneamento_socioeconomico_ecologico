// Endereço principal do site no GitHub Pages.
const siteBase =
  'https://ctc-jpg.github.io/zoneamento_socioeconomico_ecologico/zoneamento-organizado/';

// Páginas que serão abertas dentro do mesmo Embutido.
const links = {
  elaboracao: siteBase + 'paginas/elaboracao/elaboracao-zsee.html',
  metodologia: siteBase + 'paginas/metodologia/metodologia-em-elaboracao.html',
  cadernos: siteBase + 'paginas/cadernos/cadernos-zoneamento.html',
  mapas: ''
};

// Converte os links do Geodados para os HTMLs correspondentes.
function obterPaginaHTML(url) {
  const pagina = (
    url.searchParams.get('page') || ''
  ).normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/-+$/, '');

  const paginas = {
    'elaboracao-do-zsee': links.elaboracao,
    'elaboracao-do-zsee-html': links.elaboracao,
    'metodologia': links.metodologia,
    'cadernos-do-zsee': links.cadernos,
    'sobre': siteBase + 'paginas/sobre/sobre-nos.html',
    'sobre-nos': siteBase + 'paginas/sobre/sobre-nos.html',
    'oficina-de-diretrizes': siteBase + 'paginas/oficina-diretrizes/',
    'seminario-de-diretrizes': siteBase + 'paginas/seminario-diretrizes/'
  };

  if (!pagina) {
    return siteBase;
  }

  return paginas[pagina] || null;
}

// Define o destino e a forma de abertura de cada link.
function configurarLink(link) {
  const endereco = link.getAttribute('href');

  if (!endereco || endereco.startsWith('#')) {
    return;
  }

  let url;

  try {
    url = new URL(endereco, document.baseURI);
  } catch {
    return;
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    return;
  }

  if (url.hostname === 'geodados.mt.gov.br') {
    const paginaHTML = obterPaginaHTML(url);

    if (paginaHTML) {
      link.href = paginaHTML;
      link.target = '_self';
      link.removeAttribute('rel');
    } else {
      // Destinos ainda sem HTML correspondente.
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }

    return;
  }

  const enderecoDoSite = new URL(siteBase);

  const pertenceAoSite =
    url.origin === enderecoDoSite.origin &&
    url.pathname.startsWith(enderecoDoSite.pathname);

  if (pertenceAoSite) {
    link.target = '_self';
    link.removeAttribute('rel');
  } else {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
}

// Inclui os links da logo, Sobre nós e demais links do HTML.
document.querySelectorAll('a[href]').forEach(configurarLink);

// Menu de navegação.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');

function closeMenu() {
  if (!menuButton || !navigation) {
    return;
  }

  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open =
      menuButton.getAttribute('aria-expanded') !== 'true';

    navigation.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute(
      'aria-label',
      open ? 'Fechar menu' : 'Abrir menu'
    );
  });

  document.addEventListener('keydown', event => {
    if (
      event.key === 'Escape' &&
      menuButton.getAttribute('aria-expanded') === 'true'
    ) {
      closeMenu();
      menuButton.focus();
    }
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.header')) {
      closeMenu();
    }
  });

  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) {
      closeMenu();
    }
  });

  matchMedia('(min-width:761px)')
    .addEventListener('change', closeMenu);
}

// Botões da página principal.
const dialog = document.querySelector('#pending-link');

document.querySelectorAll('[data-destination]').forEach(button => {
  const address = links[button.dataset.destination];

  if (address) {
    const anchor = document.createElement('a');

    anchor.className = button.className;
    anchor.innerHTML = button.innerHTML;
    anchor.href = address;

    const label = button.getAttribute('aria-label');

    if (label) {
      anchor.setAttribute('aria-label', label);
    }

    configurarLink(anchor);
    button.replaceWith(anchor);
  } else {
    button.addEventListener('click', () => {
      const title = document.querySelector('#pending-title');

      if (title) {
        title.textContent = button.textContent.trim();
      }

      if (dialog) {
        dialog.showModal();
      }
    });
  }
});

const dialogClose = document.querySelector('.dialog-close');

if (dialogClose && dialog) {
  dialogClose.addEventListener('click', () => {
    dialog.close();
  });
}

// Preferência de movimento.
const reduced = matchMedia('(prefers-reduced-motion:reduce)');

// Cronologia.
const timeline = document.querySelector('.timeline');
const previous = document.querySelector('#previous-year');
const next = document.querySelector('#next-year');

if (timeline && previous && next) {
  const events = [...timeline.querySelectorAll('.event')];

  function step() {
    if (events.length > 1) {
      return events[1].offsetLeft - events[0].offsetLeft;
    }

    return timeline.clientWidth;
  }

  function updateTimeline() {
    const end = timeline.scrollWidth - timeline.clientWidth;

    previous.disabled = timeline.scrollLeft <= 2;
    next.disabled = timeline.scrollLeft >= end - 2;

    if (!events.length) {
      return;
    }

    const distance = step();

    const index = distance > 0
      ? Math.max(
          0,
          Math.min(
            events.length - 1,
            Math.round(timeline.scrollLeft / distance)
          )
        )
      : 0;

    const status = document.querySelector('#timeline-status');
    const year = events[index].querySelector('.year');

    if (status && year) {
      status.textContent =
        `Ano em destaque: ${year.textContent}. ` +
        `${index + 1} de ${events.length} marcos históricos.`;
    }
  }

  function move(direction) {
    timeline.scrollBy({
      left: direction * step(),
      behavior: reduced.matches ? 'instant' : 'smooth'
    });
  }

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));

  timeline.addEventListener('scroll', updateTimeline, {
    passive: true
  });

  new ResizeObserver(updateTimeline).observe(timeline);

  timeline.addEventListener('keydown', event => {
    if (event.target !== timeline) {
      return;
    }

    if (
      event.key === 'ArrowRight' ||
      event.key === 'ArrowLeft'
    ) {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();

      timeline.scrollTo({
        left: event.key === 'Home' ? 0 : timeline.scrollWidth,
        behavior: reduced.matches ? 'instant' : 'smooth'
      });
    }
  });

  updateTimeline();
}

// Vídeo de capa.
const video = document.querySelector('.hero-video');
const hero = document.querySelector('.hero');

if (video && hero) {
  const mobileScreen = matchMedia('(max-width:760px)');
  const desktopPoster = video.getAttribute('poster');

  let activeSource = '';

  function loadVideo() {
    const mobile = mobileScreen.matches;

    const poster = mobile
      ? video.dataset.mobilePoster || desktopPoster
      : desktopPoster;

    if (poster) {
      video.poster = poster;
      hero.style.backgroundImage = 'url("' + poster + '")';
    }

    if (reduced.matches) {
      video.pause();
      return;
    }

    const source = mobile
      ? video.dataset.mobileSrc
      : video.dataset.src;

    if (!source) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;

    if (source !== activeSource) {
      video.pause();
      video.src = source;
      activeSource = source;
      video.load();
    }

    video.play().catch(() => {});
  }

  mobileScreen.addEventListener('change', loadVideo);
  reduced.addEventListener('change', loadVideo);

  loadVideo();
}
