'use client';

import { useState, useEffect, useCallback } from 'react';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
] as const;

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const threshold = window.innerHeight * 0.85;

    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
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
                className="navbar-link"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Available badge */}
          <div className="navbar-status">
            <span className="navbar-status-dot" />
            <span className="navbar-status-text">Available for work</span>
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
              className="navbar-drawer-link"
              tabIndex={drawerOpen ? 0 : -1}
            >
              {link.label}
            </a>
          ))}
          <div className="navbar-drawer-status">
            <span className="navbar-status-dot" />
            <span className="navbar-status-text">Available for work</span>
          </div>
        </div>
      </div>
    </>
  );
}
