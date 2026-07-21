"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Product } from '@/generated/prisma/client';

gsap.registerPlugin(ScrollTrigger);

interface CollectionsProps {
  products: Product[];
  heading?: string;
  subheading?: string;
}

export default function Collections({ products, heading, subheading }: CollectionsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.querySelectorAll('.hdr'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    const cards = document.querySelectorAll('.col-card');
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [products]);

  // Use up to 4 featured products
  const featured = products.slice(0, 4);

  return (
    <section
      ref={sectionRef}
      id="collections"
      style={{
        background: '#0A0A0A',
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          ref={headerRef}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 'clamp(40px, 7vw, 80px)',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <p
              className="hdr"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                marginBottom: '12px',
                opacity: 0,
              }}
            >
              {subheading || "What We Offer"}
            </p>
            <h2
              className="hdr"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 500,
                color: '#F5F2EC',
                lineHeight: 1.0,
                margin: 0,
                opacity: 0,
              }}
            >
              {heading || "The Collection"}
            </h2>
          </div>
          <a
            href="/shop"
            className="hdr"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#F5F2EC',
              textDecoration: 'none',
              paddingBottom: '6px',
              borderBottom: '1px solid rgba(245,242,236,0.35)',
              transition: 'border-color 0.3s ease',
              opacity: 0,
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#D4AF37')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(245,242,236,0.35)')}
          >
            Shop All {'\u2192'}
          </a>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
            gap: 'clamp(16px, 2.5vw, 28px)',
          }}
        >
          {featured.map((item, index) => {
            const whatsAppLink = `https://wa.me/2349046319498?text=${encodeURIComponent(`Hi, I'm interested in your ${item.name}`)}`;
            
            return (
              <a
                key={item.id}
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="col-card"
                style={{ display: 'block', textDecoration: 'none', opacity: 0 }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '3/4',
                    overflow: 'hidden',
                    borderRadius: '4px',
                    background: '#111',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                    className="col-img"
                  />
                  <div
                    className="col-overlay"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(10,9,8,0.45)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '12px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#F5F2EC',
                        paddingBottom: '6px',
                        borderBottom: '1px solid rgba(245,242,236,0.6)',
                      }}
                    >
                      Enquire Now
                    </span>
                  </div>

                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '11px',
                      letterSpacing: '0.15em',
                      color: 'rgba(245,242,236,0.9)',
                      background: 'rgba(0,0,0,0.5)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    0{index + 1}
                  </span>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(18px, 2vw, 22px)',
                      fontWeight: 500,
                      color: '#F5F2EC',
                      margin: '0 0 6px 0',
                    }}
                  >
                    {item.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      fontWeight: 300,
                      color: 'rgba(245,242,236,0.55)',
                      lineHeight: 1.65,
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        <div style={{ marginTop: 'clamp(60px, 8vw, 100px)', height: '1px', background: 'rgba(245,242,236,0.08)' }} />
      </div>

      <style>{`
        .col-card:hover .col-img {
          transform: scale(1.06);
        }
        .col-card:hover .col-overlay {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}