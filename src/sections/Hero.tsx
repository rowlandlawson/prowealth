"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  heading: string;
  subtext: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export default function Hero({ heading, subtext, image, ctaText, ctaLink }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    if (bgRef.current) {
      tl.fromTo(
        bgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.8 },
        0
      );
    }
    if (lineRef.current) {
      tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.4 }, 0.4);
    }
    if (labelRef.current) {
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.5
      );
    }
    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll('.char > span');
      tl.fromTo(
        chars,
        { yPercent: 100 },
        { yPercent: 0, duration: 1, stagger: 0.02 },
        0.6
      );
    }
    if (bodyRef.current) {
      tl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.9
      );
    }
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.1
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const headline = heading || 'Luxury Within Reach';

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        color: '#F5F2EC',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      {/* Background image */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src={image || "https://res.cloudinary.com/drpwe6wjp/image/upload/v1781541420/ChatGPT_Image_Jun_15_2026_05_21_11_PM_p6adw3.png"}
          alt="Premium background from Prowealth Fashion House"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'contrast(1.05) saturate(1.05)',
          }}
        />
        {/* Vertical gradient for top/bottom legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(10,9,8,0.55) 0%, rgba(10,9,8,0.15) 35%, rgba(10,9,8,0.25) 60%, rgba(10,9,8,0.75) 100%)',
          }}
        />
        {/* Universal dark overlay for better contrast */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
          }}
        />
      </div>

      {/* Content */}
      <div
        className="hero-content"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          minHeight: '100vh',
          padding: 'clamp(24px, 4vw, 56px)',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(245,242,236,0.7)',
          }}
        >
        </div>

        {/* Main headline block */}
        <div
          className="hero-main"
          style={{
            maxWidth: '900px',
          }}
        >
          <h1
            ref={headlineRef}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 500,
              fontSize: 'clamp(48px, 11vw, 130px)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            {headline.split(' ').map((word, wi) => (
              <span key={wi} style={{ display: 'inline-block', marginRight: '0.3em' }}>
                {word.split('').map((c, i) => (
                  <span
                    key={i}
                    className="char"
                    style={{ display: 'inline-block', overflow: 'hidden' }}
                  >
                    <span style={{ display: 'inline-block' }}>{c}</span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <div
            ref={lineRef}
          />

          <p
            ref={bodyRef}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'rgba(245,242,236,0.8)',
              marginTop: '24px',
              maxWidth: '420px',
              opacity: 0,
            }}
          >
            {subtext || "Curated bubu gowns, designer fragrances and statement pieces delivered."}
          </p>

          <a
            ref={ctaRef}
            href={ctaLink || "https://wa.me/2349046319498"}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '32px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#F5F2EC',
              textDecoration: 'none',
              paddingBottom: '8px',
              borderBottom: '1px solid rgba(245,242,236,0.4)',
              transition: 'border-color 0.3s ease, gap 0.3s ease',
              opacity: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#D9B65C';
              e.currentTarget.style.gap = '20px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(245,242,236,0.4)';
              e.currentTarget.style.gap = '12px';
            }}
          >
            {ctaText || "Shop the Collection"}
            <span aria-hidden>→</span>
          </a>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(245,242,236,0.55)',
          }}
        >
          
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hide-mobile { display: none; }
        }
        .hero-main {
          align-self: end;
        }
        @media (max-width: 768px) {
          .hero-main {
            align-self: center;
          }
          .hero-content {
            grid-template-rows: auto 1fr auto !important;
            padding-top: 100px !important;
            min-height: 100vh !important;
          }
          #hero {
            min-height: auto !important;
            height: 100vh !important;
          }
        }
      `}</style>
    </section>
  );
}