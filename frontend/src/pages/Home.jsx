import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import FloralDivider from '../components/FloralDivider';
import product1 from '../assets/product1.png';
import cat1Img from '../assets/cat-1.jpg';
import cat2Img from '../assets/cat-2.png';
import cat3Img from '../assets/cat-3.jpg';
import { ArrowRight, Star } from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products?limit=4');
        const result = await response.json();
        
        if (!response.ok) throw new Error(result.message || 'Failed to fetch');
        
        if (result.data && result.data.length > 0) {
          setFeaturedProducts(result.data);
        } else {
          setFeaturedProducts([
            { id: 1, title: 'Blush Midi Dress', price: '129', category: 'Casual Wear', image: product1 },
            { id: 2, title: 'Linen Summer Co-ord', price: '89', category: 'Summer Collection', image: product1 },
            { id: 3, title: 'Silk Wrap Blouse', price: '110', category: 'Formal Wear', image: product1 },
            { id: 4, title: 'Pleated Trousers', price: '95', category: 'Casual Wear', image: product1 },
          ]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setFeaturedProducts([
          { id: 1, title: 'Blush Midi Dress', price: '129', category: 'Casual Wear', image: product1 },
          { id: 2, title: 'Linen Summer Co-ord', price: '89', category: 'Summer Collection', image: product1 },
          { id: 3, title: 'Silk Wrap Blouse', price: '110', category: 'Formal Wear', image: product1 },
          { id: 4, title: 'Pleated Trousers', price: '95', category: 'Casual Wear', image: product1 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main style={{ backgroundColor: 'var(--bg-cream)' }}>
      <Hero />
      
      {/* Categories Section */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>Shop by Category</h2>
            <p style={{ color: 'var(--text-muted)' }}>Find your perfect look for any occasion.</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem'
          }}>
            {[
              { name: '3-Piece Suits', img: cat1Img },
              { name: 'Formal Dress', img: cat2Img },
              { name: '2-Piece Suits', img: cat3Img }
            ].map((cat, idx) => (
              <div key={idx} style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseOver={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.03)'}
              onMouseOut={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}>
                <div style={{ overflow: 'hidden', height: '480px' }}>
                  <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} />
                </div>
                <div style={{ padding: '1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(183, 110, 121, 0.2)' }}>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.9rem', fontWeight: '400', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-title)' }}>
                    {cat.name}
                  </h3>
                  <div style={{ color: 'var(--text-title)' }}>
                    <ArrowRight size={20} strokeWidth={1} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FloralDivider />

      {/* Featured Products */}
      <section style={{ padding: '4rem 0 8rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>Our Favorites</h2>
            <p style={{ color: 'var(--text-muted)' }}>Handpicked styles we know you'll love.</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
          }}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button className="btn-outline">Shop All Pieces</button>
          </div>
        </div>
      </section>

      {/* About Boutique */}
      <section style={{ 
        backgroundColor: 'var(--primary-light)', 
        padding: '8rem 0',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px' }} className="fade-in">
            <h2 className="font-serif" style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--secondary)' }}>
              A Story of <br /> Grace & Style
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '2.5rem', lineHeight: '1.9' }}>
              ayesha.a collection was born out of a desire to create a warm, inviting space for women to discover clothes that feel like a second skin. 
              We believe in simple elegance, soft fabrics, and timeless silhouettes that empower you in your daily life.
            </p>
            <button className="btn-primary">
              Read Our Story
            </button>
          </div>
          <div style={{ flex: 1, position: 'relative', height: '450px', minWidth: '300px' }}>
             <div className="card-modern" style={{
               width: '100%',
               height: '100%',
               background: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaaJMWvXX-N_vVrYCvZxDIRYOkCOSrCimZ580jLHWjPw&s=10)`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
             }}>
              
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">Loved by You</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem'
          }}>
            {[
              { name: "Sara Ahmad", text: "The quality is absolutely wonderful! My new dress fits perfectly and feels so soft." },
              { name: "Fozia Khan", text: "I've never felt so welcome shopping online. The pieces are beautiful and the packaging was so thoughtful." },
              { name: "Nadia Khan", text: "ayesha.a collection is my new go-to. Their casual wear is elevated yet so comfortable." }
            ].map((review, idx) => (
              <div key={idx} className="card-modern" style={{ padding: '2.5rem', textAlign: 'center', backgroundColor: 'var(--white)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '1.5rem', color: 'var(--accent)' }}>
                  <Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} />
                </div>
                <p style={{ fontStyle: 'italic', color: 'var(--text-main)', marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '0.95rem' }}>"{review.text}"</p>
                <h4 style={{ 
                  fontFamily: "'Montserrat', sans-serif", 
                  fontWeight: '300', 
                  letterSpacing: '2px', 
                  fontSize: '0.8rem', 
                  textTransform: 'uppercase', 
                  color: 'var(--text-title)' 
                }}>{review.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FloralDivider />

      {/* Instagram Gallery */}
      <section style={{ padding: '0 0 8rem' }}>
        <div className="container" style={{ padding: '0' }}>
           <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Join Us on Instagram</h2>
            <p style={{ color: 'var(--text-muted)', fontFamily: "'Montserrat', sans-serif", letterSpacing: '2px' }}>@ayesha.a collection</p>
          </div>
          <div style={{ display: 'flex', width: '100%', overflow: 'hidden', gap: '1rem' }}>
            {[1,2,3,4,5].map((img, idx) => (
              <div key={idx} style={{ flex: 1, aspectRatio: '1/1', overflow: 'hidden', borderRadius: '0px' }}>
                 <img src={product1} alt="Instagram" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
