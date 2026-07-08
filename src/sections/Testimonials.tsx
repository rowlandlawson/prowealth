"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "I've been buying from Prowealth for over a year. The quality is unmatched and the prices are so affordable. Their bubu gowns always get me compliments!",
    name: 'Ada M.',
    location: 'Port Harcourt',
    index: '01',
  },
  {
    quote:
      'As a student, I thought luxury fashion was out of reach. Prowealth proved me wrong. I look expensive without spending a fortune.',
    name: 'Chioma O.',
    location: 'Lagos',
    index: '02',
  },
  {
    quote:
      "I ordered perfumes and a bag. They arrived the next day in perfect condition. The scent lasts all day people always ask what I'm wearing!",
    name: 'Nneka E.',
    location: 'Abuja',
    index: '03',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const cards = cardsRef.current;
    if (!header || !cards) return;

    gsap.fromTo(
      header.querySelectorAll('.hdr'),
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      cards.querySelectorAll('.t-card'),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: {
          trigger: cards,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#0E0D0C',
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header row */}
        <div
          ref={headerRef}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 'clamp(48px, 7vw, 88px)',
            flexWrap: 'wrap',
            gap: '16px',
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
              Client Stories
            </p>
            <h2
              className="hdr"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(28px, 5vw, 52px)',
                fontWeight: 500,
                color: '#F5F2EC',
                lineHeight: 1.0,
                margin: 0,
                opacity: 0,
              }}
            >
              Worn. Loved. Repeated.
            </h2>
          </div>
          <p
            className="hdr"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 300,
              color: 'rgba(245,242,236,0.45)',
              maxWidth: '260px',
              lineHeight: 1.7,
              margin: 0,
              opacity: 0,
            }}
          >
            Real words from real customers across Nigeria.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(1px, 0.1vw, 1px)',
            border: '1px solid rgba(245,242,236,0.08)',
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.index}
              className="t-card"
              style={{
                padding: 'clamp(28px, 4vw, 48px)',
                borderRight: '1px solid rgba(245,242,236,0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '32px',
                opacity: 0,
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(245,242,236,0.03)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = 'transparent';
              }}
            >
              {/* Top: index + quote */}
              <div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    color: 'rgba(212,175,55,0.6)',
                    display: 'block',
                    marginBottom: '20px',
                  }}
                >
                  {t.index}
                </span>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(16px, 2vw, 20px)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    color: '#F5F2EC',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Bottom: name + location */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '1px',
                    background: '#D4AF37',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#F5F2EC',
                      margin: '0 0 2px 0',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '12px',
                      fontWeight: 300,
                      color: 'rgba(245,242,236,0.4)',
                      margin: 0,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
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