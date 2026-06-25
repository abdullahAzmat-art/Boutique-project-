import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, X } from 'lucide-react';

const CATEGORIES = ['All', 'Casual Wear', 'Formal Wear', 'Summer Collection', 'Accessories'];
const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'On Sale', value: 'sale' },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter state
  const [maxPrice, setMaxPrice] = useState(50000);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('newest');
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://boutique-project-eta.vercel.app/api/products');
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Failed to fetch products');

        const productsData = result.data || [];
        setProducts(productsData);

        // Dynamically compute max price
        const prices = productsData.map(p => Number(p.price) || 0);
        const computedMax = prices.length ? Math.ceil(Math.max(...prices) / 1000) * 1000 : 50000;
        setMaxPrice(computedMax);
        setPriceRange([0, computedMax]);
      } catch (err) {
        setError('Unable to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter(p => (p.category || '').toLowerCase() === activeCategory.toLowerCase());
    }

    // Price filter
    result = result.filter(p => {
      const price = Number(p.discountPrice || p.price) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // On sale only
    if (onSaleOnly) {
      result = result.filter(p => !!p.discountPrice);
    }

    // Sort
    switch (sortBy) {
      case 'price_asc':  result.sort((a, b) => Number(a.price) - Number(b.price)); break;
      case 'price_desc': result.sort((a, b) => Number(b.price) - Number(a.price)); break;
      case 'sale':       result.sort((a, b) => (b.discountPrice ? 1 : 0) - (a.discountPrice ? 1 : 0)); break;
      case 'newest':
      default:           result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
    }

    return result;
  }, [products, activeCategory, priceRange, sortBy, onSaleOnly]);

  const resetFilters = () => {
    setActiveCategory('All');
    setPriceRange([0, maxPrice]);
    setSortBy('newest');
    setOnSaleOnly(false);
  };

  const hasActiveFilters = activeCategory !== 'All' || priceRange[0] > 0 || priceRange[1] < maxPrice || sortBy !== 'newest' || onSaleOnly;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-cream)', paddingBottom: '8rem' }} className="page-top-spacing">
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.7rem', fontWeight: '400',
            letterSpacing: '4px', textTransform: 'uppercase',
            color: 'var(--secondary)', display: 'block', marginBottom: '0.8rem',
          }}>Explore</span>
          <h1 className="section-title" style={{ margin: 0 }}>Our Collections</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.8rem', fontFamily: "'Montserrat', sans-serif", fontWeight: '300', letterSpacing: '0.5px' }}>
            {loading ? '' : `${filtered.length} piece${filtered.length !== 1 ? 's' : ''} available`}
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.75rem', fontWeight: '400',
                letterSpacing: '2px', textTransform: 'uppercase',
                padding: '0.6rem 0.5rem', borderRadius: '0px', border: 'none',
                borderBottom: `2px solid ${activeCategory === cat ? 'var(--bg-dark)' : 'transparent'}`,
                background: 'transparent',
                color: activeCategory === cat ? 'var(--text-title)' : 'var(--text-muted)',
                cursor: 'pointer', transition: 'all 0.3s ease',
              }}
            >{cat}</button>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          {/* Filter toggle button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: "'Montserrat', sans-serif", fontSize: '0.78rem',
              fontWeight: '400', letterSpacing: '1.5px', textTransform: 'uppercase',
              color: showFilters ? 'var(--primary-dark)' : 'var(--text-main)',
              background: showFilters ? 'var(--primary-light)' : 'transparent',
              border: `1px solid ${showFilters ? 'var(--primary)' : '#ddd'}`,
              padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <SlidersHorizontal size={15} />
            Filters {showFilters ? '▲' : '▼'}
          </button>

          {/* Active filter tags */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', flex: 1, justifyContent: 'center' }}>
            {hasActiveFilters && (
              <>
                {activeCategory !== 'All' && (
                  <span style={tagStyle}>
                    {activeCategory}
                    <X size={11} style={{ cursor: 'pointer' }} onClick={() => setActiveCategory('All')} />
                  </span>
                )}
                {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                  <span style={tagStyle}>
                    Rs. {priceRange[0].toLocaleString()} – Rs. {priceRange[1].toLocaleString()}
                    <X size={11} style={{ cursor: 'pointer' }} onClick={() => setPriceRange([0, maxPrice])} />
                  </span>
                )}
                {onSaleOnly && (
                  <span style={tagStyle}>
                    On Sale
                    <X size={11} style={{ cursor: 'pointer' }} onClick={() => setOnSaleOnly(false)} />
                  </span>
                )}
                <button onClick={resetFilters} style={{
                  fontFamily: "'Montserrat', sans-serif", fontSize: '0.7rem',
                  color: 'var(--text-muted)', background: 'none', border: 'none',
                  cursor: 'pointer', textDecoration: 'underline', letterSpacing: '1px',
                }}>Clear all</button>
              </>
            )}
          </div>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: '0.75rem',
              letterSpacing: '1px',
              padding: '0.5rem 1rem', border: '1px solid #ddd',
              borderRadius: '6px', background: 'var(--white)',
              color: 'var(--text-main)', cursor: 'pointer', outline: 'none',
            }}
          >
            {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        {/* Expanded Filter Panel */}
        {showFilters && (
          <div className="filter-panel-grid" style={{
            backgroundColor: 'var(--white)', borderRadius: '8px',
            padding: '2rem', marginBottom: '2.5rem',
            boxShadow: '0 2px 8px rgba(183,110,121,0.06)',
          }}>
            {/* Price Range Sliders */}
            <div>
              <p style={filterLabelStyle}>Price Range</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={filterValueStyle}>Rs. {priceRange[0].toLocaleString()}</span>
                <span style={filterValueStyle}>Rs. {priceRange[1].toLocaleString()}</span>
              </div>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '1px' }}>Min Price</p>
              <input
                type="range"
                min={0} max={maxPrice} step={500}
                value={priceRange[0]}
                onChange={e => {
                  const val = Number(e.target.value);
                  if (val < priceRange[1]) setPriceRange([val, priceRange[1]]);
                }}
                style={sliderStyle}
              />
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '1px' }}>Max Price</p>
              <input
                type="range"
                min={0} max={maxPrice} step={500}
                value={priceRange[1]}
                onChange={e => {
                  const val = Number(e.target.value);
                  if (val > priceRange[0]) setPriceRange([priceRange[0], val]);
                }}
                style={sliderStyle}
              />
            </div>

            {/* On Sale Toggle */}
            <div>
              <p style={filterLabelStyle}>Deals</p>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}>
                <div
                  onClick={() => setOnSaleOnly(!onSaleOnly)}
                  style={{
                    width: '44px', height: '24px', borderRadius: '999px',
                    backgroundColor: onSaleOnly ? 'var(--primary-dark)' : '#ddd',
                    position: 'relative', transition: 'background 0.3s ease', cursor: 'pointer',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: '3px',
                    left: onSaleOnly ? '23px' : '3px',
                    width: '18px', height: '18px', borderRadius: '50%',
                    backgroundColor: 'white', transition: 'left 0.3s ease',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                  }} />
                </div>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.82rem', color: 'var(--text-main)' }}>
                  Show only Sale items
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              border: '3px solid var(--primary-light)', borderTopColor: 'var(--secondary)',
              animation: 'spin 0.8s linear infinite',
            }} />
            <p style={{ fontFamily: "'Montserrat', sans-serif", color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '300' }}>Loading collection…</p>
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
            <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: "'Cormorant Garamond', serif", color: 'var(--text-title)' }}>No products match your filters.</p>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Try adjusting the price range or category.</p>
            <button className="btn-outline" onClick={resetFilters}>Reset Filters</button>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="products-grid-shop">
            {filtered.map(product => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
};

const tagStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  padding: '4px 10px', borderRadius: '999px',
  backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)',
  fontFamily: "'Montserrat', sans-serif", fontSize: '0.72rem',
  letterSpacing: '0.5px',
};

const filterLabelStyle = {
  fontFamily: "'Montserrat', sans-serif", fontSize: '0.72rem',
  textTransform: 'uppercase', letterSpacing: '2px',
  color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: '400',
};

const filterValueStyle = {
  fontFamily: "'Montserrat', sans-serif", fontSize: '0.8rem',
  color: 'var(--text-main)', fontWeight: '500',
};

const sliderStyle = {
  width: '100%', accentColor: 'var(--primary-dark)',
  marginBottom: '0.8rem', cursor: 'pointer',
};

export default Products;
