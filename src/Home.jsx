import { useEffect, useState } from 'react';
import './Home.css';

const NAV = ['Work', 'Studio', 'Process', 'Journal', 'Contact'];

const PARTNERS = [
    'ArchDaily', 'Dezeen', 'Wallpaper*', 'Frame', 'Azure', 'Designboom',
];

const FEATURED = {
    title: 'Harbor Residence',
    location: 'Copenhagen, Denmark',
    year: '2024',
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
    thumbs: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80',

    ],
};

const PROJECTS = [
    {
        id: 1,
        title: 'Northlight Office',
        type: 'Commercial',
        size: 'wide',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    },
    {
        id: 2,
        title: 'Cedar Pavilion',
        type: 'Public',
        size: 'tall',
        img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80',
    },
    {
        id: 3,
        title: 'Stone Loft',
        type: 'Residential',
        size: 'standard',
        img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    },
    {
        id: 4,
        title: 'Glass Courtyard',
        type: 'Mixed-use',
        size: 'standard',
        img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    },
    {
        id: 5,
        title: 'Coastal Retreat',
        type: 'Residential',
        size: 'wide',
        img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
    },
];

const PROCESS = [
    {
        step: '01',
        title: 'Discovery',
        text: 'Site, brief, and constraints — we listen before we draw.',
        img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
    },
    {
        step: '02',
        title: 'Concept',
        text: 'Massing, light studies, and material direction.',
        img: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800',
    },
    {
        step: '03',
        title: 'Detail',
        text: 'Joinery, fixtures, and documentation for build.',
        img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
    },
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
    {
        title: 'Light as a material',
        date: 'May 2026',
        img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    },
    {
        title: 'Adaptive reuse in the city',
        date: 'Apr 2026',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR-YPjGnCjOUPWY5Rxmwy6gqduN66gl3c9ww&s',
    },
    {
        title: 'Timber structures at scale',
        date: 'Mar 2026',
        img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80',
    },
];

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

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeThumb, setActiveThumb] = useState(0);
    const [scrolled, setScrolled] = useState(false);

    useReveal();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const featuredImg = activeThumb === 0 ? FEATURED.hero : FEATURED.thumbs[activeThumb - 1];

    return (
        <div className="site">
            {/* Header */}
            <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
                <a href="#" className="logo">
                    <span className="logo__mark">AF</span>
                    <span className="logo__text">Atelier Form</span>
                </a>
                <button
                    className="menu-btn"
                    aria-label="Menu"
                    onClick={() => setMenuOpen((o) => !o)}
                >
                    <span />
                    <span />
                </button>
                <nav className={`nav ${menuOpen ? 'nav--open' : ''}`}>
                    {NAV.map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                            {item}
                        </a>
                    ))}
                </nav>
            </header>

            {/* Hero — full-bleed background image */}
            <section className="hero">
                <img
                    className="hero__bg"
                    src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=80"
                    alt="Modern architecture interior with natural light"
                />
                <div className="hero__veil" />
                <div className="hero__inner container reveal">
                    <p className="label">Architecture · Interiors · Urban</p>
                    <h1>
                        Buildings that feel<br />
                        <em>inevitable</em> in their place.
                    </h1>
                    <p className="hero__lead">
                        A studio of 24 designers crafting residential, commercial, and cultural work
                        across Europe and North America.
                    </p>
                    <div className="hero__cta">
                        <a href="#work" className="btn btn--light">Explore work</a>
                        <a href="#contact" className="btn btn--outline">Book a consultation</a>
                    </div>
                    <div className="hero__stats">
                        <div><strong>52</strong><span>Built projects</span></div>
                        <div><strong>14</strong><span>Countries</span></div>
                        <div><strong>8</strong><span>Awards 2025</span></div>
                    </div>
                </div>
                <div className="hero__scroll">Scroll</div>
            </section>

            {/* Press marquee */}
            <div className="marquee" aria-hidden="true">
                <div className="marquee__track">
                    {[...PARTNERS, ...PARTNERS].map((name, i) => (
                        <span key={i}>{name}</span>
                    ))}
                </div>
            </div>

            {/* Featured project — hero + thumbnails + picture/srcSet */}
            <section id="work" className="section">
                <div className="container">
                    <div className="section-intro reveal">
                        <p className="label">Featured</p>
                        <h2>Selected project</h2>
                    </div>
                    <div className="featured reveal">
                        <div className="featured__main">
                            <picture>
                                <source
                                    media="(min-width: 1024px)"
                                    srcSet={`${featuredImg}&w=1400 1400w`}
                                />
                                <img
                                    src={featuredImg}
                                    alt={FEATURED.title}
                                    className="featured__hero-img"
                                />
                            </picture>
                            <div className="featured__caption">
                                <h3>{FEATURED.title}</h3>
                                <p>{FEATURED.location} · {FEATURED.year}</p>
                            </div>
                        </div>
                        <div className="featured__side">
                            <button
                                className={`thumb ${activeThumb === 0 ? 'thumb--active' : ''}`}
                                onClick={() => setActiveThumb(0)}
                            >
                                <img src={FEATURED.hero} alt="" loading="lazy" />
                                <span>Overview</span>
                            </button>
                            {FEATURED.thumbs.map((src, i) => (
                                <button
                                    key={i}
                                    className={`thumb ${activeThumb === i + 1 ? 'thumb--active' : ''}`}
                                    onClick={() => setActiveThumb(i + 1)}
                                >
                                    <img src={src} alt="" loading="lazy" />
                                    <span>View {i + 1}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Portfolio grid — mixed sizes */}
            <section className="section section--dark">
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
                                style={{ transitionDelay: `${i * 80}ms` }}
                            >
                                <img src={p.img} alt={p.title} loading="lazy" />
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

            {/* Parallax image band */}
            <section className="parallax" aria-label="Architectural detail">
                <img
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=80"
                    alt="Architectural staircase detail"
                    loading="lazy"
                />
                <div className="parallax__text">
                    <p className="label label--light">Philosophy</p>
                    <blockquote>
                        “We design for the way people move through space — not just how it looks from outside.”
                    </blockquote>
                </div>
            </section>

            {/* Studio + team */}
            <section id="studio" className="section">
                <div className="container studio">
                    <div className="studio__text reveal">
                        <p className="label">Studio</p>
                        <h2>Quiet rigor, warm materiality</h2>
                        <p>
                            Founded in 2012, Atelier Form works from studios in Berlin and Montreal.
                            We partner with clients who value craft, longevity, and clarity over trend.
                        </p>
                        <ul className="pill-list">
                            <li>Residential</li>
                            <li>Commercial</li>
                            <li>Hospitality</li>
                            <li>Master planning</li>
                        </ul>
                    </div>
                    <div className="studio__visual reveal">
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80"
                            alt="Design studio workspace"
                            loading="lazy"
                        />
                    </div>
                </div>

                <div className="container team reveal">
                    {TEAM.map((person) => (
                        <figure key={person.name} className="team-card">
                            <img src={person.img} alt={person.name} loading="lazy" />
                            <figcaption>
                                <strong>{person.name}</strong>
                                <span>{person.role}</span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </section>

            {/* Process timeline with step images */}
            <section id="process" className="section section--muted">
                <div className="container">
                    <div className="section-intro reveal">
                        <p className="label">Process</p>
                        <h2>From sketch to handover</h2>
                    </div>
                    <div className="timeline">
                        {PROCESS.map((item, i) => (
                            <article key={item.step} className="timeline__item reveal">
                                <div className="timeline__media">
                                    <img src={item.img} alt={item.title} loading="lazy" />
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

            {/* Material swatches */}
            <section className="section">
                <div className="container">
                    <div className="section-intro reveal">
                        <p className="label">Materials</p>
                        <h2>Palette & finishes</h2>
                    </div>
                    <div className="materials reveal">
                        {MATERIALS.map((m) => (
                            <figure key={m.name} className="material">
                                <img src={m.img} alt={m.name} loading="lazy" />
                                <figcaption>{m.name}</figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial with client photo */}
            <section className="section section--muted">
                <div className="container testimonial reveal">
                    <img
                        className="testimonial__avatar"
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
                        alt="Client portrait"
                        loading="lazy"
                    />
                    <blockquote>
                        <p>
                            “Atelier Form translated a vague brief into a home we didn’t know we needed.
                            Every corner feels considered.”
                        </p>
                        <footer>
                            <strong>Claire Whitmore</strong>
                            <span>Harbor Residence client</span>
                        </footer>
                    </blockquote>
                </div>
            </section>

            {/* Journal cards */}
            <section id="journal" className="section">
                <div className="container">
                    <div className="section-intro reveal">
                        <p className="label">Journal</p>
                        <h2>Ideas & field notes</h2>
                    </div>
                    <div className="journal">
                        {JOURNAL.map((post) => (
                            <article key={post.title} className="journal__card reveal">
                                <div className="journal__img-wrap">
                                    <img src={post.img} alt="" loading="lazy" />
                                </div>
                                <time>{post.date}</time>
                                <h3>{post.title}</h3>
                                <a href="#" className="link-arrow">Read →</a>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer + image strip + contact */}
            <footer id="contact" className="footer">
                <div className="footer__strip">
                    {[
                        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
                        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80',
                        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80',
                        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80',
                        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80',
                        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80',
                    ].map((src, i) => (
                        <img key={i} src={src} alt="" loading="lazy" />
                    ))}
                </div>
                <div className="container footer__main">
                    <div>
                        <h2>Start a conversation</h2>
                        <p>hello@atelierform.studio</p>
                        <p>+1 (555) 012-3456 · Berlin · Montreal</p>
                    </div>
                    <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Your email" aria-label="Email" />
                        <button type="submit" className="btn btn--light">Subscribe</button>
                    </form>
                </div>
                <p className="footer__copy">© 2026 Atelier Form · Demo site with placeholder images</p>
            </footer>
        </div>
    );
}