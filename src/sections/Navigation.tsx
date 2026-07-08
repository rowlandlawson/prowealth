"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CartDrawer } from '../components/CartDrawer';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isShopPage = pathname === '/shop';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = useCallback((id: string) => {
    setMenuOpen(false);
    if (id === 'shop') {
      router.push('/shop');
      return;
    }
    
    if (isShopPage) {
      router.push('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isShopPage, router]);

  const navItems = [
    { label: 'Collections', id: 'collections' },
    { label: 'Our Story', id: 'story' },
    { label: 'Shop', id: 'shop' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'cta' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          maxWidth: '100vw',
          height: isMobile ? '70px' : '90px',
          zIndex: 1000,
          background: scrolled || menuOpen ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.15)' : '1px solid transparent',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 16px' : '0 40px',
          overflow: 'visible',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => {
            setMenuOpen(false);
            window.scrollTo(0, 0);
          }}
          style={{
            cursor: 'pointer',
            zIndex: 1002,
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <img
            src="/logo2.png"
            alt="Prowealth Logo"
            style={{
              height: isMobile ? '50px' : '65px',
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.3))',
            }}
          />
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(16px, 1.5vw, 24px)',
              fontWeight: 800,
              color: '#FFFFFF',
              marginLeft: '12px',
              letterSpacing: '0.02em',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            Prowealth <span style={{ color: '#D4AF37' }}>Fashion</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase' as const,
                  color: '#A0A0A0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  padding: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A0A0A0')}
              >
                {item.label}
              </button>
            ))}
            <div style={{ marginLeft: '8px', borderLeft: '1px solid rgba(212,175,55,0.2)', paddingLeft: '20px' }}>
              <CartDrawer />
            </div>
          </div>
        )}

        {/* Hamburger button (mobile only) */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CartDrawer />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                zIndex: 1002,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '36px',
                height: '36px',
                position: 'relative',
              }}
            >
              {/* Top bar */}
              <span
                style={{
                  display: 'block',
                  width: '24px',
                  height: '1.5px',
                  backgroundColor: '#D4AF37',
                  position: 'absolute',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  transform: menuOpen ? 'rotate(45deg)' : 'translateY(-5px)',
                  opacity: 1,
                }}
              />
              {/* Middle bar */}
              <span
                style={{
                  display: 'block',
                  width: '24px',
                  height: '1.5px',
                  backgroundColor: '#D4AF37',
                  position: 'absolute',
                  transition: 'opacity 0.2s ease',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              {/* Bottom bar */}
              <span
                style={{
                  display: 'block',
                  width: '24px',
                  height: '1.5px',
                  backgroundColor: '#D4AF37',
                  position: 'absolute',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  transform: menuOpen ? 'rotate(-45deg)' : 'translateY(5px)',
                  opacity: 1,
                }}
              />
            </button>
          </div>
        )}
      </nav>

      {/* Full-screen mobile menu overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 1001,
          background: 'rgba(10, 10, 10, 0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px 32px 40px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        {/* Decorative gold line */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '32px',
            right: '32px',
            height: '1px',
            background: 'rgba(212, 175, 55, 0.15)',
          }}
        />

        {/* Close button at top right of overlay */}
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'none',
            border: 'none',
            color: '#D4AF37',
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px',
            opacity: menuOpen ? 1 : 0,
            transition: 'opacity 0.4s ease 0.2s',
          }}
        >
          <span>Cancel</span>
          <div style={{ position: 'relative', width: '16px', height: '16px' }}>
            <span style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '1px', background: '#D4AF37', transform: 'rotate(45deg)' }} />
            <span style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '1px', background: '#D4AF37', transform: 'rotate(-45deg)' }} />
          </div>
        </button>

        {/* Menu items */}
        <div style={{ width: '100%' }}>
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                width: '100%',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(212, 175, 55, 0.08)',
                padding: '22px 0',
                cursor: 'pointer',
                textAlign: 'left',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.4s ease ${0.1 + index * 0.06}s, transform 0.4s ease ${0.1 + index * 0.06}s`,
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: 300,
                  color: '#D4AF37',
                  letterSpacing: '0.05em',
                }}
              >
                +
              </span>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '28px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  letterSpacing: '0.02em',
                }}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom CTA in overlay */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '32px',
            width: '100%',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.4s ease 0.4s, transform 0.4s ease 0.4s',
          }}
        >
          <a
            href="https://wa.me/2349046319498"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#D4AF37',
              color: '#0A0A0A',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '14px 32px',
              borderRadius: '30px',
              textDecoration: 'none',
              transition: 'background 0.3s ease',
            }}
          >
            Shop on WhatsApp
          </a>
          <div style={{ display: 'flex', gap: '24px', marginTop: '20px' }}>
            <a
              href="https://instagram.com/prowealth_fashion_house"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 300,
                color: '#A0A0A0',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com/@prowealthfashionhouse"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 300,
                color: '#A0A0A0',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
