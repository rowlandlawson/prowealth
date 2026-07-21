"use client";

import { useState, useMemo, useEffect } from 'react';
import { Product } from '@/generated/prisma/client';
import { ProductModal } from '../components/ProductModal';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Eye, Search, X } from 'lucide-react';

type Category = 'All' | 'Perfumes' | 'Accessories' | 'Dresses' | 'Bags';

const categories: Category[] = ['All', 'Dresses', 'Perfumes', 'Bags', 'Accessories'];

interface ShopProps {
  products: Product[];
}

export default function Shop({ products }: ShopProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, products]);

  return (
    <div
      style={{
        background: '#0A0A0A',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#F5F2EC',
      }}
    >

      {/* ── Page Header ── */}
      <section
        style={{
          paddingTop: 'calc(90px + clamp(40px, 6vw, 80px))',
          paddingBottom: 'clamp(32px, 5vw, 56px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          borderBottom: '1px solid rgba(245,242,236,0.07)',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                marginBottom: '12px',
              }}
            >
              Luxury Collections
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(36px, 6vw, 72px)',
                fontWeight: 500,
                color: '#F5F2EC',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Shop The{' '}
              <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>House</em>
            </h1>
          </div>

          {/* Search */}
          <div style={{ position: 'relative', width: 'clamp(220px, 30vw, 320px)' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(245,242,236,0.35)',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(245,242,236,0.04)',
                border: '1px solid rgba(245,242,236,0.1)',
                borderRadius: '2px',
                padding: '12px 40px 12px 44px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: '#F5F2EC',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(245,242,236,0.1)')}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(245,242,236,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 0,
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Category & Search Control Bar ── */}
      <div
        style={{
          position: 'sticky',
          top: '64px',
          zIndex: 50,
          background: 'rgba(10,10,10,0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(212,175,55,0.1)',
          padding: '16px clamp(20px, 5vw, 60px)',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '32px',
            flexWrap: 'wrap',
          }}
        >
          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              background: 'rgba(245,242,236,0.03)',
              padding: '4px',
              borderRadius: '100px',
              border: '1px solid rgba(245,242,236,0.05)',
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: selectedCategory === cat ? 600 : 400,
                  color: selectedCategory === cat ? '#0A0A0A' : 'rgba(245,242,236,0.5)',
                  background: selectedCategory === cat ? '#D4AF37' : 'transparent',
                  border: 'none',
                  padding: '8px 24px',
                  borderRadius: '100px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: selectedCategory === cat ? '0 4px 12px rgba(212,175,55,0.3)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== cat) {
                    e.currentTarget.style.color = '#F5F2EC';
                    e.currentTarget.style.background = 'rgba(245,242,236,0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== cat) {
                    e.currentTarget.style.color = 'rgba(245,242,236,0.5)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Results Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: '1', justifyContent: 'flex-end', minWidth: '300px' }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: 'rgba(245,242,236,0.3)',
                textTransform: 'uppercase',
              }}
            >
              {filteredProducts.length} Results
            </span>
            
            <div style={{ position: 'relative', width: '240px' }}>
              <Search
                size={14}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(212,175,55,0.4)',
                }}
              />
              <input
                type="text"
                placeholder="Find something..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(245,242,236,0.02)',
                  border: '1px solid rgba(245,242,236,0.1)',
                  borderRadius: '100px',
                  padding: '10px 16px 10px 38px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: '#F5F2EC',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#D4AF37';
                  e.currentTarget.style.background = 'rgba(245,242,236,0.05)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(245,242,236,0.1)';
                  e.currentTarget.style.background = 'rgba(245,242,236,0.02)';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <main
        style={{
          flex: 1,
          padding: 'clamp(40px, 6vw, 72px) clamp(20px, 5vw, 60px)',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {filteredProducts.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '96px 0',
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '20px',
                  fontStyle: 'italic',
                  color: 'rgba(245,242,236,0.35)',
                  marginBottom: '20px',
                }}
              >
                No products found.
              </p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#D4AF37',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid #D4AF37',
                  paddingBottom: '4px',
                  cursor: 'pointer',
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
                gap: 'clamp(32px, 4vw, 48px) clamp(20px, 3vw, 32px)',
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => addToCart(product)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

    </div>
  );
}

// ── Extracted product card ──
function ProductCard({
  product,
  onAddToCart,
}: {
  product: any;
  onAddToCart: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {/* Image */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '3/4',
          overflow: 'hidden',
          background: '#111',
          borderRadius: '2px',
          marginBottom: '16px',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />

        {/* Action Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isMobile ? 'transparent' : 'rgba(10,9,8,0.45)',
            opacity: isMobile || hovered ? 1 : 0,
            transition: 'opacity 0.35s ease',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '12px',
            gap: '8px',
          }}
        >
          <button
            onClick={onAddToCart}
            style={{
              flex: 1,
              background: '#D4AF37',
              color: '#0A0A0A',
              border: 'none',
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
              padding: isMobile ? '12px 0' : '13px 0',
              borderRadius: '2px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transform: isMobile || hovered ? 'translateY(0)' : 'translateY(8px)',
              transition: 'transform 0.35s ease 0.05s, background 0.2s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#F5F2EC')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#D4AF37')}
          >
            <ShoppingBag size={14} />
            <span style={{ display: isMobile ? 'none' : 'inline' }}>Add to Cart</span>
            <span style={{ display: isMobile ? 'inline' : 'none' }}>Add</span>
          </button>

          <ProductModal
            product={product}
            trigger={
              <button
                style={{
                  background: isMobile ? 'rgba(10,10,10,0.8)' : 'rgba(245,242,236,0.1)',
                  border: '1px solid rgba(245,242,236,0.2)',
                  color: '#F5F2EC',
                  padding: isMobile ? '11px 12px' : '13px 14px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: isMobile || hovered ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'transform 0.35s ease 0.1s, background 0.2s ease',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = 'rgba(245,242,236,0.2)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = isMobile ? 'rgba(10,10,10,0.8)' : 'rgba(245,242,236,0.1)')
                }
              >
                <Eye size={16} />
              </button>
            }
          />
        </div>
      </div>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#D4AF37',
            }}
          >
            {product.category}
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              color: '#F5F2EC',
            }}
          >
            ₦{product.price.toLocaleString()}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(16px, 2vw, 19px)',
            fontWeight: 500,
            color: hovered ? '#D4AF37' : '#F5F2EC',
            margin: 0,
            transition: 'color 0.3s ease',
            lineHeight: 1.2,
          }}
        >
          {product.name}
        </h3>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 300,
            color: 'rgba(245,242,236,0.45)',
            lineHeight: 1.65,
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.description}
        </p>
      </div>
    </div>
  );
}