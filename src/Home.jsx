import { useEffect, useState } from 'react';
import './Home.css';

const NOW = new Date();
const SITE_YEAR = NOW.getFullYear();
const SITE_DATE = NOW.toLocaleString('en-US', { month: 'short', year: 'numeric' });

const BRAND = {
  name: 'Ars Architects',
  mark: 'AA',
  email: 'hello@arsarchitects.studio',
};

const NAV = ['Work', 'Studio', 'Process', 'Journal', 'Contact'];

const PARTNERS = [
  'ArchDaily', 'Dezeen', 'Wallpaper*', 'Frame', 'Azure', 'Designboom',
];

const FEATURED = {
  title: 'Harbor Residence',
  location: 'Copenhagen, Denmark',
  year: String(SITE_YEAR),
  hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
  thumbs: [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
  ],
};

const PROJECTS = [
  { id: 1, title: 'Northlight Office', type: 'Commercial', size: 'wide', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80' },
  { id: 2, title: 'Cedar Pavilion', type: 'Public', size: 'tall', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80' },
  { id: 3, title: 'Stone Loft', type: 'Residential', size: 'standard', img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80' },
  { id: 4, title: 'Glass Courtyard', type: 'Mixed-use', size: 'standard', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80' },
  { id: 5, title: 'Coastal Retreat', type: 'Residential', size: 'wide', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80' },
];

const PROCESS = [
  { step: '01', title: 'Discovery', text: 'Site, brief, and constraints — we listen before we draw.', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80' },
  { step: '02', title: 'Concept', text: 'Massing, light studies, and material direction.', img: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80' },
  { step: '03', title: 'Detail', text: 'Joinery, fixtures, and documentation for build.', img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80' },
];

const MATERIALS = [
  { name: 'Limestone', img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80' },
  { name: 'Oak', img: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Concrete', img: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=400&q=80' },
  { name: 'Brass', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80' },
];

const TEAM = [
  { name: 'Elena Voss', role: 'Principal', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { name: 'Marcus Chen', role: 'Design Director', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { name: 'Sofia Reyes', role: 'Interior Lead', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
  { name: 'James Okonkwo', role: 'Technical', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
];

const JOURNAL = [
  { title: 'Light as a material', date: SITE_DATE, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
  { title: 'Adaptive reuse in the city', date: SITE_DATE, img: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=400&q=80 '},
  { title: 'Timber structures at scale', date: SITE_DATE, img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80' },
];

const STUDIO_STATS = {
  builtProjects: 452,
  countries: 14,
  awards: 8,
};

function useCountUp(target, active, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return undefined;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return value;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('is-visible');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [statsActive, setStatsActive] = useState(false);

  const builtCount = useCountUp(STUDIO_STATS.builtProjects, statsActive);
  const countryCount = useCountUp(STUDIO_STATS.countries, statsActive, 1600);
  const awardCount = useCountUp(STUDIO_STATS.awards, statsActive, 1400);

  useReveal();

  useEffect(() => {
    const timer = setTimeout(() => setStatsActive(true), 900);
    return () => clearTimeout(timer);
  }, []);

  // Mobile/tablet nav: close on desktop resize, lock page scroll when open
  useEffect(() => {
    const desktopMq = window.matchMedia('(min-width: 1025px)');

    const onViewportChange = () => {
      if (desktopMq.matches) setMenuOpen(false);
    };

    onViewportChange();
    desktopMq.addEventListener('change', onViewportChange);
    return () => desktopMq.removeEventListener('change', onViewportChange);
  }, []);

  useEffect(() => {
    const mobileMq = window.matchMedia('(max-width: 1024px)');
    if (!menuOpen || !mobileMq.matches) {
      document.body.style.overflow = '';
      return undefined;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Scroll: header + progress bar
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setScrollProgress(max > 0 ? el.scrollTop / max : 0);
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Custom cursor (desktop only)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      requestAnimationFrame(loop);
    };
    loop();

    const hoverables = document.querySelectorAll(
      'a, button, .portfolio__item, .journal__card, .thumb, .material'
    );
    const enter = () => document.body.classList.add('cursor-hover');
    const leave = () => document.body.classList.remove('cursor-hover');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  // Portfolio spotlight on hover
  useEffect(() => {
    const items = document.querySelectorAll('.portfolio__item');
    items.forEach((item) => {
      const onMove = (e) => {
        const rect = item.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        item.style.setProperty('--mx', `${x}%`);
        item.style.setProperty('--my', `${y}%`);
      };
      item.addEventListener('mousemove', onMove);
    });
  }, []);

  const featuredImg =
    activeThumb === 0 ? FEATURED.hero : FEATURED.thumbs[activeThumb - 1];

  return (
    <div className="site">
      {/* Animation layers */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />
      <div className="ambient ambient--1" aria-hidden="true" />
      <div className="ambient ambient--2" aria-hidden="true" />

      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <a href="#" className="logo">
          <span className="logo__mark">{BRAND.mark}</span>
          <span className="logo__text">{BRAND.name}</span>
        </a>
        <button
          type="button"
          className={`menu-btn ${menuOpen ? 'menu-btn--open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
        <button
          type="button"
          className={`nav-backdrop ${menuOpen ? 'nav-backdrop--visible' : ''}`}
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        />
        <nav id="site-nav" className={`nav ${menuOpen ? 'nav--open' : ''}`}>
          {NAV.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero">
        <img
          className="hero__bg"
          src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=80"
          alt="Modern architecture interior with natural light"
          referrerPolicy="no-referrer"
        />
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__rays" aria-hidden="true" />
        <div className="hero__veil" />
        <div className="hero__inner container">
          <p className="label animate-in" style={{ '--delay': '0.1s' }}>
            Architecture · Interiors · Urban
          </p>
          <h1 className="animate-in" style={{ '--delay': '0.22s' }}>
            Buildings that feel<br />
            <em className="text-shimmer">inevitable</em> in their place.
          </h1>
          <p className="hero__lead animate-in" style={{ '--delay': '0.38s' }}>
            A studio of 24 designers crafting residential, commercial, and cultural work
            across Europe and North America.
          </p>
          <div className="hero__cta animate-in" style={{ '--delay': '0.52s' }}>
            <a href="#work" className="btn btn--light">Explore work</a>
            <a href="#contact" className="btn btn--outline">Book a consultation</a>
          </div>
          <div className="hero__stats animate-in" style={{ '--delay': '0.68s' }}>
            <div>
              <strong aria-label={`${STUDIO_STATS.builtProjects} built projects`}>
                {builtCount}
              </strong>
              <span>Built projects</span>
            </div>
            <div>
              <strong aria-label={`${STUDIO_STATS.countries} countries`}>
                {countryCount}
              </strong>
              <span>Countries</span>
            </div>
            <div>
              <strong aria-label={`${STUDIO_STATS.awards} awards in ${SITE_YEAR}`}>
                {awardCount}
              </strong>
              <span>Awards {SITE_YEAR}</span>
            </div>
          </div>
        </div>
        <div className="hero__scroll">Scroll</div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...PARTNERS, ...PARTNERS].map((name, i) => (
            <span key={i}>{name}</span>
          ))}
        </div>
      </div>

      <section id="work" className="section section--numbered" data-section="01">
        <div className="container">
          <div className="section-intro reveal">
            <p className="label">Featured</p>
            <h2>Selected project</h2>
          </div>
          <div className="featured reveal">
            <div className="featured__main">
              <img
                key={featuredImg}
                src={featuredImg}
                alt={FEATURED.title}
                className="featured__hero-img"
                referrerPolicy="no-referrer"
              />
              <div className="featured__caption">
                <h3>{FEATURED.title}</h3>
                <p>{FEATURED.location} · {FEATURED.year}</p>
              </div>
            </div>
            <div className="featured__side">
              <button
                type="button"
                className={`thumb ${activeThumb === 0 ? 'thumb--active' : ''}`}
                onClick={() => setActiveThumb(0)}
              >
                <img src={FEATURED.hero} alt="" loading="lazy" referrerPolicy="no-referrer" />
                <span>Overview</span>
              </button>
              {FEATURED.thumbs.map((src, i) => (
                <button
                  type="button"
                  key={i}
                  className={`thumb ${activeThumb === i + 1 ? 'thumb--active' : ''}`}
                  onClick={() => setActiveThumb(i + 1)}
                >
                  <img src={src} alt="" loading="lazy" referrerPolicy="no-referrer" />
                  <span>View {i + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark section--numbered" data-section="02">
        <div className="container">
          <div className="section-intro section-intro--light reveal">
            <p className="label">Portfolio</p>
            <h2>Recent work</h2>
          </div>
          <div className="portfolio">
            {PROJECTS.map((p, i) => (
              <article
                key={p.id}
                className={`portfolio__item portfolio__item--${p.size} reveal`}
                style={{
                  '--reveal-delay': `${i * 100}ms`,
                  '--stagger': i,
                }}
              >
                <img src={p.img} alt={p.title} loading="lazy" referrerPolicy="no-referrer" />
                <div className="portfolio__overlay">
                  <span className="tag">{p.type}</span>
                  <h3>{p.title}</h3>
                  <button type="button" className="link-arrow">View project →</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="parallax" aria-label="Architectural detail">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=80"
          alt="Architectural staircase detail"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="parallax__text reveal">
          <p className="label label--light">Philosophy</p>
          <blockquote>
            “We design for the way people move through space — not just how it looks from outside.”
          </blockquote>
        </div>
      </section>

      <section id="studio" className="section section--numbered" data-section="03">
        <div className="container studio">
          <div className="studio__text reveal reveal--left">
            <p className="label">Studio</p>
            <h2>Quiet rigor, warm materiality</h2>
            <p>
              Founded in 2012, {BRAND.name} works from studios in Berlin and Montreal.
              We partner with clients who value craft, longevity, and clarity over trend.
            </p>
            <ul className="pill-list">
              <li>Residential</li>
              <li>Commercial</li>
              <li>Hospitality</li>
              <li>Master planning</li>
            </ul>
          </div>
          <div className="studio__visual reveal reveal--right">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80"
              alt="Design studio workspace"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="container team reveal">
          {TEAM.map((person) => (
            <figure key={person.name} className="team-card">
              <img src={person.img} alt={person.name} loading="lazy" referrerPolicy="no-referrer" />
              <figcaption>
                <strong>{person.name}</strong>
                <span>{person.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="process" className="section section--muted section--numbered" data-section="04">
        <div className="container">
          <div className="section-intro reveal">
            <p className="label">Process</p>
            <h2>From sketch to handover</h2>
          </div>
          <div className="timeline">
            {PROCESS.map((item) => (
              <article key={item.step} className="timeline__item reveal">
                <div className="timeline__media">
                  <img src={item.img} alt={item.title} loading="lazy" referrerPolicy="no-referrer" />
                </div>
                <div className="timeline__body">
                  <span className="timeline__step">{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--numbered" data-section="05">
        <div className="container">
          <div className="section-intro reveal">
            <p className="label">Materials</p>
            <h2>Palette & finishes</h2>
          </div>
          <div className="materials reveal">
            {MATERIALS.map((m) => (
              <figure key={m.name} className="material">
                <img src={m.img} alt={m.name} loading="lazy" referrerPolicy="no-referrer" />
                <figcaption>{m.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container testimonial reveal">
          <img
            className="testimonial__avatar"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
            alt="Client portrait"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <blockquote>
            <p>
              “{BRAND.name} translated a vague brief into a home we didn’t know we needed.
              Every corner feels considered.”
            </p>
            <footer>
              <strong>Claire Whitmore</strong>
              <span>Harbor Residence client</span>
            </footer>
          </blockquote>
        </div>
      </section>

      <section id="journal" className="section section--numbered" data-section="06">
        <div className="container">
          <div className="section-intro reveal">
            <p className="label">Journal</p>
            <h2>Ideas & field notes</h2>
          </div>
          <div className="journal">
            {JOURNAL.map((post, i) => (
              <article
                key={post.title}
                className="journal__card reveal"
                style={{ '--reveal-delay': `${i * 120}ms` }}
              >
                <div className="journal__img-wrap">
                  <img src={post.img} alt="" loading="lazy" referrerPolicy="no-referrer" />
                </div>
                <time>{post.date}</time>
                <h3>{post.title}</h3>
                <a href="#" className="link-arrow">Read →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="footer__strip reveal">
          {[
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80',
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80',
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80',
          ].map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" referrerPolicy="no-referrer" />
          ))}
        </div>
        <div className="container footer__main reveal">
          <div>
            <h2>Start a conversation</h2>
            <p>{BRAND.email}</p>
            <p>+1 (555) 012-3456 · Berlin · Montreal</p>
          </div>
          <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" aria-label="Email" />
            <button type="submit" className="btn btn--light">Subscribe</button>
          </form>
        </div>
        <p className="footer__copy reveal">© {SITE_YEAR} {BRAND.name} · Demo site with placeholder images</p>
      </footer>
    </div>
  );
}