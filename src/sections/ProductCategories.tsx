"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    image: 'https://res.cloudinary.com/drpwe6wjp/image/upload/v1781541420/ChatGPT_Image_Jun_15_2026_05_19_58_PM_xtksu2.png',
    title: 'Dresses',
    description:
      'From elegant, flowing bubu gowns to modern tailored silhouettes. Dresses that celebrate your unique beauty.',
  },
  {
    image: 'https://res.cloudinary.com/drpwe6wjp/image/upload/v1782234538/100k_qqyldi.jpg',
    title: 'Perfumes & Accessories',
    description:
      'Designer-inspired fragrances and handpicked accessories to complete your look. Quality that speaks for itself.',
  },
  {
    image: 'https://res.cloudinary.com/drpwe6wjp/image/upload/v1782235068/bag45k-red_wlbzj9.jpg',
    title: 'Shoes & Bags',
    description:
      'From statement heels to everyday essentials. Footwear and bags that combine style with comfort.',
  },
];

export default function ProductCategories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;
    if (!section || !header || !cards) return;

    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
    headerTl.fromTo(
      header.querySelectorAll('.animate-in'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out' }
    );

    const cardEls = cards.querySelectorAll('.category-card');
    const cardsTl = gsap.timeline({
      scrollTrigger: {
        trigger: cards,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
    cardsTl.fromTo(
      cardEls,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out' }
    );

    return () => {
      headerTl.kill();
      cardsTl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="categories"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#111111',
        padding: 'clamp(60px, 10vw, 140px) clamp(16px, 5vw, 40px)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div ref={headerRef} style={{ marginBottom: 'clamp(40px, 6vw, 80px)' }}>
          <p
            className="animate-in"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(11px, 1.5vw, 14px)',
              fontWeight: 400,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              marginBottom: 'clamp(16px, 2vw, 24px)',
            }}
          >
            WHAT WE OFFER
          </p>
          <h2
            className="animate-in"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(24px, 4vw, 48px)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Everything you need to look{' '}
            <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>fabulous</em>
          </h2>
        </div>

        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: 'clamp(16px, 3vw, 32px)',
          }}
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              className="category-card"
              style={{
                background: '#0A0A0A',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid rgba(212, 175, 55, 0.1)',
                transition: 'border-color 0.4s ease, transform 0.4s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ height: 'clamp(200px, 25vw, 280px)', overflow: 'hidden' }}>
                <img
                  src={cat.image}
                  alt={cat.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <div style={{ padding: 'clamp(20px, 3vw, 32px)' }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(18px, 2.5vw, 24px)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    margin: '0 0 12px 0',
                  }}
                >
                  {cat.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(13px, 1.5vw, 14px)',
                    fontWeight: 300,
                    color: '#A0A0A0',
                    lineHeight: 1.6,
                    margin: '0 0 20px 0',
                  }}
                >
                  {cat.description}
                </p>
                <a
                  href="https://wa.me/2349046319498"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(12px, 1.4vw, 14px)',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    color: '#D4AF37',
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                    transition: 'text-decoration 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  Shop Now →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
