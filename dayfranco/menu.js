document.addEventListener('DOMContentLoaded', () => {
  const sections = [
    ['01', 'Início', '.hero'],
    ['02', 'Sucesso', '.campaignHero'],
    ['03', 'Inscrição', '.application'],
    ['04', 'Para você', '.recognition'],
    ['05', 'História real', '.recognition .statement'],
    ['06', 'A mentoria', '.program'],
    ['07', 'Day Franco', '.mentor'],
    ['08', 'Dúvidas', '.faq'],
  ];

  const button = document.createElement('button');
  button.className = 'dayMenuButton';
  button.type = 'button';
  button.setAttribute('aria-label', 'Abrir menu');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', 'day-menu');
  button.innerHTML = '<span></span><span></span><span></span><span></span>';

  const menu = document.createElement('nav');
  menu.className = 'dayMenu';
  menu.id = 'day-menu';
  menu.setAttribute('aria-label', 'Seções da página');
  menu.innerHTML = `
    <div class="dayMenuIntro"><small>Mentoria presencial</small><strong>Cada escolha<br>abre um novo<br>caminho.</strong></div>
    <ol class="dayMenuLinks">${sections.map(([number, label, selector]) => `<li><a href="${selector}" data-section="${selector}"><small>${number}</small><span>${label}</span><i>→</i></a></li>`).join('')}</ol>`;

  document.body.append(button, menu);

  const setOpen = (open) => {
    menu.classList.toggle('open', open);
    document.body.classList.toggle('menuOpen', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    if (open) menu.querySelector('a')?.focus();
  };

  button.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
      setOpen(false);
      button.focus();
    }
  });

  menu.querySelectorAll('[data-section]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = document.querySelector(link.dataset.section);
      setOpen(false);
      window.setTimeout(() => {
        if (!target) return;
        if (window.innerWidth > 800 && link.dataset.section === '.recognition') {
          const sectionTop = target.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: sectionTop + 84, behavior: 'smooth' });
          return;
        }
        const fitsViewport = target.getBoundingClientRect().height <= window.innerHeight * .9;
        const keepsContext = link.dataset.section === '.recognition .statement';
        target.scrollIntoView({
          behavior: 'smooth',
          block: window.innerWidth > 800 && fitsViewport && !keepsContext ? 'center' : 'start',
        });
      }, 120);
    });
  });
});
