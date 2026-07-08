"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const line = lineRef.current;
    if (!content || !line) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: content,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'expo.out' })
      .fromTo(
        content.querySelectorAll('.cta-in'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#0A0A0A',
        padding: 'clamp(60px, 10vw, 140px) clamp(20px, 5vw, 60px)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Top divider line */}
        <div
          ref={lineRef}
          style={{
            height: '1px',
            background: 'rgba(245,242,236,0.1)',
            marginBottom: 'clamp(48px, 7vw, 88px)',
            transformOrigin: 'left',
          }}
        />

        <div
          ref={contentRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(32px, 5vw, 56px)',
          }}
        >
          {/* Label */}
          <p
            className="cta-in"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              margin: 0,
              opacity: 0,
            }}
          >
            Get in Touch
          </p>

          {/* Headline */}
          <h2
            className="cta-in"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(36px, 7vw, 88px)',
              fontWeight: 500,
              color: '#F5F2EC',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              margin: 0,
              opacity: 0,
              maxWidth: '800px',
            }}
          >
            Your next favourite
            <br />
            outfit is one{' '}
            <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>message</em> away.
          </h2>

          {/* Bottom row: body + CTAs */}
          <div
            className="cta-in"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '32px',
              opacity: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                maxWidth: '400px',
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  fontWeight: 300,
                  color: 'rgba(245,242,236,0.55)',
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                Shop our ready-to-wear collection or <strong>book a session</strong> for professional measurements and custom sewing.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D4AF37' }}></span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#F5F2EC', letterSpacing: '0.05em' }}>Custom Sowing & Measurement Bookings</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              
              <a
                href="https://wa.me/2349046319498"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#D4AF37',
                  color: '#0A0A0A',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '14px 32px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  transition: 'background 0.3s ease, color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F5F2EC';
                  e.currentTarget.style.color = '#0A0A0A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#D4AF37';
                  e.currentTarget.style.color = '#0A0A0A';
                }}
              >
                Book a Session or Shop
                <span aria-hidden>{'\u2192'}</span>
              </a>

              <div
                style={{
                  display: 'flex',
                  gap: '24px',
                }}
              >
                
                <a
                  href="https://instagram.com/prowealth_fashion_house"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    fontWeight: 300,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,242,236,0.45)',
                    textDecoration: 'none',
                    paddingBottom: '4px',
                    borderBottom: '1px solid transparent',
                    transition: 'color 0.3s ease, border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F5F2EC';
                    e.currentTarget.style.borderColor = '#D4AF37';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(245,242,236,0.45)';
                    e.currentTarget.style.borderColor = 'transparent';
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
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,242,236,0.45)',
                    textDecoration: 'none',
                    paddingBottom: '4px',
                    borderBottom: '1px solid transparent',
                    transition: 'color 0.3s ease, border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F5F2EC';
                    e.currentTarget.style.borderColor = '#D4AF37';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(245,242,236,0.45)';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div
          style={{
            marginTop: 'clamp(48px, 7vw, 88px)',
            height: '1px',
            background: 'rgba(245,242,236,0.08)',
          }}
        />
      </div>
    </section>
  );
}