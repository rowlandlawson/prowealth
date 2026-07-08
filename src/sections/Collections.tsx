"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    id: 1,
    name: 'Dresses',
    tag: '01',
    description: 'From flowing bubu gowns to elegant tailored silhouettes. Versatile pieces for the modern woman.',
    image: 'https://res.cloudinary.com/drpwe6wjp/image/upload/v1781541425/ChatGPT_Image_Jun_15_2026_05_18_42_PM_a9cwgz.png',
    whatsapp: 'https://wa.me/2349046319498?text=Hi%2C%20I%27m%20interested%20in%20your%20Dresses',
  },
  {
    id: 2,
    name: 'Designer Perfumes',
    tag: '02',
    description: 'Luxury fragrances that leave a lasting impression. Curated from the finest houses.',
    image: 'https://res.cloudinary.com/drpwe6wjp/image/upload/v1782234539/45k_vd7bsz.jpg',
    whatsapp: 'https://wa.me/2349046319498?text=Hi%2C%20I%27m%20interested%20in%20your%20Designer%20Perfumes',
  },
  {
    id: 3,
    name: 'Designer Bags',
    tag: '03',
    description: 'Premium structured totes and chic crossbody bags. The ultimate statement accessory.',
    image: 'https://res.cloudinary.com/drpwe6wjp/image/upload/v1782235068/bag45k_xogy9b.jpg',
    whatsapp: 'https://wa.me/2349046319498?text=Hi%2C%20I%27m%20interested%20in%20your%20Bags',
  },
  {
    id: 4,
    name: 'Accessories',
    tag: '04',
    description: 'The finishing touch. Handpicked jewelry and statement pieces to complete any look.',
    image: 'https://res.cloudinary.com/drpwe6wjp/image/upload/v1781541419/ChatGPT_Image_Jun_15_2026_05_22_35_PM_ypwikf.png',
    whatsapp: 'https://wa.me/2349046319498?text=Hi%2C%20I%27m%20interested%20in%20your%20Accessories',
  },
];

export default function Collections() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animation
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

    // Each card animates in as it enters
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
  }, []);

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

        {/* Section header */}
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
              What We Offer
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
              The Collection
            </h2>
          </div>
          <a
            href="https://wa.me/2349046319498"
            target="_blank"
            rel="noopener noreferrer"
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

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
            gap: 'clamp(16px, 2.5vw, 28px)',
          }}
        >
          {collections.map((item) => (
            <a
              key={item.id}
              href={item.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="col-card"
              style={{
                display: 'block',
                textDecoration: 'none',
                opacity: 0,
              }}
            >
              {/* Image */}
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
                {/* Overlay on hover */}
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

                {/* Tag number */}
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    color: 'rgba(245,242,236,0.6)',
                  }}
                >
                  {item.tag}
                </span>
              </div>

              {/* Text below card */}
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
                  }}
                >
                  {item.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            marginTop: 'clamp(60px, 8vw, 100px)',
            height: '1px',
            background: 'rgba(245,242,236,0.08)',
          }}
        />
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