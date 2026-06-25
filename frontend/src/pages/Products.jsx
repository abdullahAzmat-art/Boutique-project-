import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All', 'Casual Wear', 'Formal Wear', 'Summer Collection', 'Accessories'];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://boutique-project-eta.vercel.app/api/products');
        const result = await response.json();

        if (!response.ok) throw new Error(result.message || 'Failed to fetch products');
        
        const productsData = result.data || [];
        setProducts(productsData);
        setFiltered(productsData);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Unable to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleFilter = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFiltered(products);
    } else {
      setFiltered(products.filter(p =>
        (p.category || '').toLowerCase() === category.toLowerCase()
      ));
    }
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-cream)', paddingTop: '10rem', paddingBottom: '8rem' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.7rem', fontWeight: '400',
            letterSpacing: '4px', textTransform: 'uppercase',
            color: 'var(--secondary)', display: 'block', marginBottom: '0.8rem',
          }}>
            Explore
          </span>
          <h1 className="section-title" style={{ margin: 0 }}>Our Collections</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.8rem', fontFamily: "'Montserrat', sans-serif", fontWeight: '300', letterSpacing: '0.5px' }}>
            {loading ? '' : `${filtered.length} piece${filtered.length !== 1 ? 's' : ''} available`}
          </p>
        </div>

        {/* Category Filters */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.2rem',
          marginBottom: '4rem',
          flexWrap: 'wrap',
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.75rem', fontWeight: '400',
                letterSpacing: '2px', textTransform: 'uppercase',
                padding: '0.6rem 0.5rem',
                borderRadius: '0px',
                border: 'none',
                borderBottom: `2px solid ${activeCategory === cat ? 'var(--bg-dark)' : 'transparent'}`,
                background: 'transparent',
                color: activeCategory === cat ? 'var(--text-title)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={e => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.color = 'var(--text-title)';
                }
              }}
              onMouseOut={e => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.color = 'var(--text-muted)';
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              border: '3px solid var(--primary-light)',
              borderTopColor: 'var(--secondary)',
              animation: 'spin 0.8s linear infinite',
            }} />
            <p style={{ fontFamily: "'Montserrat', sans-serif", color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '300' }}>
              Loading collection…
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', fontFamily: "'Montserrat', sans-serif", fontWeight: '300' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{error}</p>
            <button className="btn-outline" onClick={() => window.location.reload()}>Try Again</button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', fontFamily: "'Montserrat', sans-serif", fontWeight: '300' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: "'Cormorant Garamond', serif", color: 'var(--text-title)' }}>No products in this category yet.</p>
            <p style={{ fontSize: '0.9rem' }}>Check back soon or browse all collections.</p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2.5rem',
          }}>
            {filtered.map(product => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
};

export default Products;
