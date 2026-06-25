import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const name = product.title || product.name || 'Product';
  const imageUrl = product.picture?.url || product.image_url || product.image || '';
  const productId = product._id || product.id;

  const isNew = product.createdAt 
    ? (new Date() - new Date(product.createdAt)) / (1000 * 60 * 60 * 24) <= 7 
    : false;
  const hasDiscount = !!product.discountPrice;

  return (
    <Link
      to={`/product/${productId}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
    >
      <div className="product-card" style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        height: '100%',
        cursor: 'pointer',
      }}>
        <div className="product-card-container" style={{
          position: 'relative',
          aspectRatio: '3/4',
          overflow: 'hidden',
          backgroundColor: '#FAF6F1',
        }}>
          <img
            src={imageUrl}
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            className="product-card-img"
          />

          {/* Badges */}
          <div className="product-badges">
            {isNew && <span className="badge badge-new">Exclusive</span>}
            {hasDiscount && <span className="badge badge-sale">Rs. {product.discountPrice}</span>}
          </div>

          {/* Quick Add Button that transitions in on hover */}
          <button
            className="quick-add-btn"
            onClick={e => {
              e.preventDefault();
              alert(`Added ${name} to cart!`);
            }}
          >
            Quick Add
          </button>
        </div>

        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', padding: '0 0.2rem' }}>
          <p style={{
            fontSize: '0.62rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'var(--text-muted)',
            marginBottom: '0.3rem',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: '400',
          }}>{product.category}</p>

          <h3 style={{
            fontSize: '0.85rem',
            marginBottom: '0.4rem',
            color: 'var(--text-title)',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: '400',
            letterSpacing: '0.5px',
            lineHeight: '1.4',
            textTransform: 'uppercase',
          }}>{name}</h3>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
            <p style={{
              fontWeight: hasDiscount ? '400' : '500',
              color: hasDiscount ? 'var(--text-muted)' : 'var(--text-main)',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: hasDiscount ? '0.75rem' : '0.85rem',
              textDecoration: hasDiscount ? 'line-through' : 'none'
            }}>Rs. {product.price}</p>
            
            {hasDiscount && (
              <p style={{
                fontWeight: '600',
                color: 'var(--text-main)',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.85rem',
              }}>Rs. {product.discountPrice}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
