"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BrandStoryProps {
  heading?: string;
  text?: string;
  image?: string;
}

export default function BrandStory({ heading, text, image }: BrandStoryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    const leftElements = left.querySelectorAll('.animate-in');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      leftElements,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out' }
    );
    tl.fromTo(
      right,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.5'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      style={{
        position: 'relative',
        zIndex: 2,
        background: 'rgba(10, 10, 10, 0.92)',
        padding: 'clamp(60px, 10vw, 140px) clamp(20px, 5vw, 40px)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          gap: 'clamp(32px, 5vw, 80px)',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        <div ref={leftRef} style={{ flex: '1 1 55%', minWidth: '280px' }}>
          <p
            className="animate-in"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(12px, 1.5vw, 14px)',
              fontWeight: 400,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              marginBottom: 'clamp(16px, 2vw, 24px)',
            }}
          >
            OUR STORY
          </p>
          <h2
            className="animate-in"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px, 5vw, 56px)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {heading || "Fashion that speaks confidence"}
          </h2>
          <p
            className="animate-in"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(14px, 1.6vw, 16px)',
              fontWeight: 300,
              color: '#A0A0A0',
              lineHeight: 1.75,
              marginTop: 'clamp(20px, 3vw, 32px)',
              maxWidth: '520px',
              whiteSpace: 'pre-line',
            }}
          >
            {text || "Prowealth Fashion House was born from a simple belief: every woman deserves to feel luxurious without breaking the bank. What started as a small passion project in Port Harcourt has grown into a trusted destination for ready-to-wear African fashion. We design and source the finest bubu gowns, dresses, perfumes, shoes, and accessories all curated to make you look and feel your absolute best."}
          </p>
        </div>
        <div
          ref={rightRef}
          style={{
            flex: '1 1 38%',
            minWidth: '240px',
            paddingTop: 'clamp(0px, 3vw, 40px)',
          }}
        >
          <img
            src={image || "https://res.cloudinary.com/drpwe6wjp/image/upload/v1781541418/ChatGPT_Image_Jun_15_2026_05_23_17_PM_vayosa.png"}
            alt="Prowealth Luxury Brand Story"
            style={{
              width: '100%',
              borderRadius: '4px',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              display: 'block',
            }}
          />
        </div>
      </div>
    </section>
  );
}
