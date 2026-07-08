"use client";

export default function Footer() {
  const linkStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    fontWeight: 300,
    color: '#A0A0A0',
    textDecoration: 'none',
    lineHeight: 2.2,
    display: 'block',
    transition: 'color 0.3s ease',
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    fontWeight: 400,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    letterSpacing: '0.05em',
    marginBottom: '20px',
  };

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#0A0A0A',
        borderTop: '1px solid rgba(212, 175, 55, 0.1)',
        padding: 'clamp(40px, 5vw, 60px) clamp(20px, 5vw, 40px) 0',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
          gap: 'clamp(24px, 4vw, 40px)',
        }}
      >
        {/* Column 1 - Brand */}
        <div>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '18px',
              fontWeight: 700,
              color: '#D4AF37',
              letterSpacing: '0.1em',
              margin: '0 0 16px 0',
            }}
          >
            PROWEALTH
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 300,
              color: '#A0A0A0',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Behind Jesus Evangelical Power Mission, NTA Road, Port Harcourt
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <p style={headingStyle}>Quick Links</p>
          {[
            { label: 'Home', href: '#hero' },
            { label: 'Collections', href: '#collections' },
            { label: 'Shop', href: '#categories' },
            { label: 'Contact', href: '#cta' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={linkStyle}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#A0A0A0')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Column 3 - Categories */}
        <div>
          <p style={headingStyle}>Categories</p>
          {['Dresses', 'Perfumes', 'Bags', 'Accessories'].map((item) => (
            <a
              key={item}
              href="https://wa.me/2349046319498"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#A0A0A0')}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Column 4 - Contact */}
        <div>
          <p style={headingStyle}>Contact</p>
          <a
            href="https://wa.me/2349046319498"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#A0A0A0')}
          >
            WhatsApp: 09046319498
          </a>
          <a
            href="https://instagram.com/prowealth_fashion_house"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#A0A0A0')}
          >
            Instagram: @prowealth_fashion_house
          </a>
          <a
            href="https://tiktok.com/@prowealthfashionhouse"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#A0A0A0')}
          >
            TikTok: @prowealthfashionhouse
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: '1280px',
          margin: 'clamp(24px, 4vw, 40px) auto 0',
          padding: 'clamp(16px, 2vw, 24px) 0',
          borderTop: '1px solid rgba(212, 175, 55, 0.05)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 300,
            color: '#666666',
            margin: 0,
          }}
        >
          © 2025 Prowealth Fashion House. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
