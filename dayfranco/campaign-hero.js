document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.heroPhoto');
  if (!hero) return;

  hero.classList.add('campaignHero');
  hero.querySelector('figcaption').innerHTML = `
    <div class="campaignLogo" aria-label="Day Franco Studio Nails Academy">
      <span>Day Franco</span>
      <strong>STUDIO</strong>
      <small>NAILS ACADEMY</small>
    </div>
    <p>De nail designer estagnada<br>a profissional <em>referência</em> —<br>em <em>2 dias de mentoria<br>presencial</em></p>
    <a href="#inscricao">Quero viver essa transformação <b>→</b></a>`;
});
