'use client';

import { useState, useEffect, useCallback } from 'react';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
] as const;

type NavHref = typeof NAV_LINKS[number]['href'];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavHref | null>(null);

  // Show navbar when hero scrolls out of view
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '0px' }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  // Track active section
  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) => ({
      href,
      el: document.getElementById(href.replace('#', '')),
    })).filter((s): s is { href: NavHref; el: HTMLElement } => !!s.el);

    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the section with greatest intersection ratio
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length) {
          const id = `#${visible[0].target.id}` as NavHref;
          setActiveSection(id);
        }
      },
      { threshold: [0.2, 0.5], rootMargin: '-60px 0px -30% 0px' }
    );

    sections.forEach(({ el }) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Close drawer on escape
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setDrawerOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <nav
        className="navbar-root"
        aria-label="Main navigation"
        data-visible={visible}
      >
        <div className="navbar-inner">
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
            className="navbar-logo"
            aria-label="Scroll to top"
          >
            SH
          </a>

          {/* Desktop links */}
          <div className="navbar-links">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`navbar-link${activeSection === link.href ? ' navbar-link--active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className="navbar-hamburger"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-expanded={drawerOpen}
            aria-controls="navbar-drawer"
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <line
                x1="3" y1="6" x2="17" y2="6"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                className="navbar-hamburger-top"
                style={{
                  transform: drawerOpen ? 'translateY(4px) rotate(45deg)' : 'none',
                  transformOrigin: 'center',
                }}
              />
              <line
                x1="3" y1="14" x2="17" y2="14"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                className="navbar-hamburger-bottom"
                style={{
                  transform: drawerOpen ? 'translateY(-4px) rotate(-45deg)' : 'none',
                  transformOrigin: 'center',
                }}
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="navbar-drawer"
        className="navbar-drawer"
        data-open={drawerOpen}
        aria-hidden={!drawerOpen}
      >
        <div className="navbar-drawer-content">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`navbar-drawer-link${activeSection === link.href ? ' navbar-link--active' : ''}`}
              tabIndex={drawerOpen ? 0 : -1}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
