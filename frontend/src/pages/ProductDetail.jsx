import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Star } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://boutique-project-eta.vercel.app/api/products/${id}`);
        const result = await response.json();

        if (!response.ok) throw new Error(result.message || 'Product not found');
        setProduct(result.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleOrderNow = () => {
    if (product?.whatsappNumber) {
      const message = encodeURIComponent(`Hi! I'm interested in ordering the ${product.title || product.name}.`);
      window.open(`https://wa.me/${product.whatsappNumber}?text=${message}`, '_blank');
    } else {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  /* ── Loading ── */
  if (loading) return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-cream)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%',
          border: '3px solid var(--primary-light)',
          borderTopColor: 'var(--secondary)',
          animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{ fontFamily: "'Montserrat', sans-serif", color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: '1px', fontWeight: '300' }}>Loading product…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </main>
  );

  /* ── Error ── */
  if (error || !product) return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-cream)', flexDirection: 'column', gap: '1.5rem' }}>
      <p style={{ fontFamily: "'Montserrat', sans-serif", color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '300' }}>{error || 'Product not found.'}</p>
      <button className="btn-outline" style={{ borderRadius: '0px' }} onClick={() => navigate('/products')}>Back to Products</button>
    </main>
  );

  const name = product.title || product.name || 'Product';
  const imageUrl = product.picture?.url || product.image_url || product.image || '';
  const price = product.price ? `Rs. ${product.price}` : 'Price not available';
  const discountPrice = product.discountPrice ? `Rs. ${product.discountPrice}` : null;
  const description = product.description || 'A beautiful piece from our curated collection — designed with care and crafted for everyday elegance.';

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-cream)' }} className="page-top-spacing">

      {/* ── Breadcrumb ── */}
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: 0 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            fontFamily: "'Montserrat', sans-serif", fontSize: '0.78rem', fontWeight: '400',
            letterSpacing: '1px', color: 'var(--text-muted)',
            background: 'none', border: 'none', cursor: 'pointer',
            transition: 'color 0.3s ease',
            textTransform: 'uppercase'
          }}
          onMouseOver={e => e.currentTarget.style.color = 'var(--secondary)'}
          onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <ArrowLeft size={16} strokeWidth={1.8} />
          Back
        </button>
      </div>

      {/* ── Main Product Layout ── */}
      <section className="container product-detail-section" style={{ paddingTop: '3rem', paddingBottom: '8rem' }}>
        <div className="product-detail-layout">

          {/* LEFT: Image */}
          <div className="product-detail-image">
            <img
              src={imageUrl}
              alt={name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>

          {/* RIGHT: Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', paddingTop: '1rem' }}>

            {/* Category */}
            {product.category && (
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.68rem', fontWeight: '400',
                letterSpacing: '4px', textTransform: 'uppercase',
                color: 'var(--secondary)',
              }}>
                {product.category}
              </span>
            )}

            {/* Name */}
            <h1 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: '400', letterSpacing: '1px',
              color: 'var(--text-title)', lineHeight: 1.2,
              textTransform: 'uppercase',
              margin: 0,
            }}>
              {name}
            </h1>

            {/* Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={14} fill="var(--accent)" color="var(--accent)" strokeWidth={1} />
              ))}
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '0.4rem', fontWeight: '300' }}>
                (48 reviews)
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
              <p style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '1.5rem', fontWeight: '400',
                color: discountPrice ? 'var(--text-muted)' : 'var(--secondary)', 
                textDecoration: discountPrice ? 'line-through' : 'none',
                letterSpacing: '0.5px', margin: 0,
              }}>
                {price}
              </p>
              {discountPrice && (
                <p style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '1.5rem', fontWeight: '600',
                  color: 'var(--secondary)', letterSpacing: '0.5px', margin: 0,
                }}>
                  {discountPrice}
                </p>
              )}
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(183, 110, 121, 0.15)' }} />

            {/* Description */}
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.92rem', lineHeight: 1.8,
              color: 'var(--text-main)', margin: 0,
              fontWeight: '300'
            }}>
              {description}
            </p>

            {/* Details list */}
            <div style={{
              background: 'transparent',
              borderTop: '1px solid rgba(183, 110, 121, 0.15)',
              borderBottom: '1px solid rgba(183, 110, 121, 0.15)',
              padding: '1.5rem 0',
              display: 'flex', flexDirection: 'column', gap: '0.8rem',
            }}>
              {[
                { label: 'Material', value: product.material || 'Premium Fabric' },
                { label: 'Fit', value: product.fit || 'Regular Fit' },
                { label: 'Care', value: product.care || 'Machine Wash Cold' },
                { label: 'Made in', value: product.origin || 'Pakistan' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.7rem', fontWeight: '400', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    {label}
                  </span>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: '300' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Row */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                className="btn-primary"
                onClick={handleOrderNow}
                style={{
                  flex: 1, minWidth: '160px', padding: '1.1rem 2rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                  fontSize: '0.8rem', letterSpacing: '2px',
                  borderRadius: '0px',
                  background: added ? 'var(--accent)' : 'var(--bg-dark)',
                  color: 'var(--bg-cream)',
                  transition: 'background 0.3s ease, transform 0.2s ease',
                  boxShadow: 'none',
                }}
                onMouseOver={e => {
                  if (!added) e.currentTarget.style.background = 'var(--secondary)';
                }}
                onMouseOut={e => {
                  if (!added) e.currentTarget.style.background = 'var(--bg-dark)';
                }}
              >
                <ShoppingCart size={18} strokeWidth={1.8} />
                {product?.whatsappNumber ? 'Order via WhatsApp' : (added ? 'Added!' : 'Add to Cart')}
              </button>

              <button
                onClick={() => setWishlist(w => !w)}
                style={{
                  padding: '1.1rem 1.4rem',
                  border: `1px solid ${wishlist ? 'var(--primary-dark)' : 'rgba(183, 110, 121, 0.25)'}`,
                  background: wishlist ? 'var(--primary-light)' : 'transparent',
                  borderRadius: '0px', display: 'flex', alignItems: 'center',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                }}
              >
                <Heart size={20} strokeWidth={1.8} fill={wishlist ? 'var(--primary-dark)' : 'none'} color={wishlist ? 'var(--primary-dark)' : 'var(--secondary)'} />
              </button>

              <button
                style={{
                  padding: '1.1rem 1.4rem',
                  border: '1px solid rgba(183, 110, 121, 0.25)',
                  background: 'transparent', borderRadius: '0px',
                  display: 'flex', alignItems: 'center', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={e => e.currentTarget.style.borderColor = 'var(--secondary)'}
                onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(183, 110, 121, 0.25)'}
              >
                <Share2 size={20} strokeWidth={1.8} color="var(--secondary)" />
              </button>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
