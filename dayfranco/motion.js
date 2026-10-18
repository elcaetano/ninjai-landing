(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dayMenuLinks li').forEach((li, i) => li.style.setProperty('--i', i));
    if (reduce) return;
    document.documentElement.classList.add('mv');

    const splitWords = (el) => {
      let n = 0;
      const walk = (node) => {
        [...node.childNodes].forEach((c) => {
          if (c.nodeType === 3) {
            const frag = document.createDocumentFragment();
            c.textContent.split(/(\s+)/).forEach((t) => {
              if (!t) return;
              if (/^\s+$/.test(t)) return frag.append(t);
              const w = document.createElement('span');
              w.className = 'w';
              w.style.setProperty('--n', n++);
              const i = document.createElement('i');
              i.textContent = t;
              w.append(i);
              frag.append(w);
            });
            c.replaceWith(frag);
          } else if (c.nodeType === 1 && c.tagName !== 'BR') walk(c);
        });
      };
      walk(el);
    };
    document.querySelectorAll('h1,.sectionTitle h2,.application h2,.mentor h2,.quoteGrid h2,.finalCta h2,.campaignHero figcaption p').forEach((h) => {
      splitWords(h);
      h.classList.add('rvh');
    });

    const stagger = [
      ['.signs article', 4], ['.modules article', 3], ['.badges span', 5], ['.faq details', 4],
      ['.application form label', 4], ['.application aside', 1], ['.lead', 1], ['.heroCopy .button', 1],
      ['.finalCta p', 3], ['.finalCta .button', 1], ['.quoteGrid footer', 1], ['.campaignLogo', 1], ['.campaignHero figcaption > a', 1], ['.mentor h3', 1], ['.mentor p', 3],
    ];
    stagger.forEach(([sel, max]) => document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('rv');
      el.style.setProperty('--d', i % max);
    }));

    const sw = [];
    const st = document.querySelector('.statement');
    if (st) {
      const words = st.textContent.trim().split(/\s+/);
      st.textContent = '';
      words.forEach((t, i) => {
        const s = document.createElement('span');
        s.className = 'sw';
        s.textContent = t;
        st.append(s, i < words.length - 1 ? ' ' : '');
        sw.push(s);
      });
    }

    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .2, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.rvh,.rv,.eyebrow.left,.mentorPhoto,.quoteGrid blockquote,.campaignHero').forEach((t) => io.observe(t));

    const hero = document.querySelector('.heroPhoto img');
    let tick = false;
    const frame = () => {
      tick = false;
      const vh = innerHeight;
      if (hero) {
        const r = hero.parentElement.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh) hero.style.transform = `translate3d(0,${Math.max(-28, (vh - r.top) * -.05).toFixed(1)}px,0) scale(1.12)`;
      }
      if (sw.length && st) {
        const r = st.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * .85 - r.top) / (vh * .45 + r.height * .6)));
        const k = Math.round(p * sw.length);
        sw.forEach((s, i) => s.classList.toggle('lit', i < k));
      }
    };
    addEventListener('scroll', () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(frame);
      setTimeout(() => { if (tick) frame(); }, 100);
    }, { passive: true });
    addEventListener('resize', frame);
    frame();
  });
})();
