"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Testimonial } from '@/generated/prisma/client';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const maxPage = Math.ceil(testimonials.length / itemsPerPage) - 1;

  useEffect(() => {
    const header = headerRef.current;
    
    if (header) {
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
    }
    
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    // Re-animate cards when page changes
    const cards = cardsRef.current;
    if (cards) {
      gsap.fromTo(
        cards.querySelectorAll('.t-card'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [currentPage, testimonials]);

  const displayedTestimonials = testimonials.length > 3
    ? testimonials.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : testimonials;

  const handlePrev = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentPage(prev => Math.min(maxPage, prev + 1));
  };

  // If there are no testimonials at all, hide section
  if (testimonials.length === 0) return null;

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
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
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
                textAlign: 'right',
              }}
            >
              Real words from real customers across Nigeria.
            </p>
            
            {/* Arrows if > 3 */}
            {testimonials.length > 3 && (
              <div
                className="hdr"
                style={{ display: 'flex', gap: '12px', opacity: 0 }}
              >
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 0}
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: currentPage === 0 ? 'transparent' : 'rgba(245,242,236,0.05)',
                    border: '1px solid rgba(245,242,236,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                    color: currentPage === 0 ? 'rgba(245,242,236,0.2)' : '#D4AF37',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === maxPage}
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: currentPage === maxPage ? 'transparent' : 'rgba(245,242,236,0.05)',
                    border: '1px solid rgba(245,242,236,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: currentPage === maxPage ? 'not-allowed' : 'pointer',
                    color: currentPage === maxPage ? 'rgba(245,242,236,0.2)' : '#D4AF37',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
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
          {displayedTestimonials.map((t, index) => (
            <div
              key={t.id}
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
                  0{currentPage * itemsPerPage + index + 1}
                </span>
                
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[1,2,3,4,5].map(star => (
                    <span key={star} style={{ color: star <= t.rating ? '#D4AF37' : '#333', fontSize: '14px' }}>★</span>
                  ))}
                </div>

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
                  &ldquo;{t.content}&rdquo;
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
                    {t.authorName}
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