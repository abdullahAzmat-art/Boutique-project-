import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--bg-cream)', padding: '6rem 0 2rem' }}>
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div style={{ gridColumn: 'span 1' }}>
            <h3 style={{ 
              fontFamily: "'Montserrat', sans-serif", 
              fontSize: '1.45rem', 
              fontWeight: '300',
              letterSpacing: '5px',
              textTransform: 'lowercase',
              marginBottom: '0.4rem', 
              color: 'var(--bg-cream)' 
            }}>ayesha.a</h3>
            <div style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.52rem',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              color: 'var(--secondary)',
              fontWeight: '400',
              marginBottom: '1.6rem',
            }}>
              collection
            </div>
            <p style={{ 
              color: 'rgba(250, 246, 241, 0.7)', 
              fontSize: '0.92rem', 
              marginBottom: '2rem', 
              lineHeight: '1.8',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: '300'
            }}>
              Curated feminine styles for the modern, confident woman. Warmth and elegance in every stitch.
            </p>
            <div style={{ display: 'flex', gap: '1.2rem' }}>
              <a href="#" style={{ color: 'var(--secondary)', transition: 'transform 0.3s' }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-3px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}><Instagram size={22} strokeWidth={1.5} /></a>
              <a href="#" style={{ color: 'var(--secondary)', transition: 'transform 0.3s' }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-3px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}><Facebook size={22} strokeWidth={1.5} /></a>
              <a href="#" style={{ color: 'var(--secondary)', transition: 'transform 0.3s' }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-3px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}><Twitter size={22} strokeWidth={1.5} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ 
              marginBottom: '1.5rem', 
              fontSize: '0.8rem', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              color: 'var(--bg-cream)',
              fontWeight: '400',
              fontFamily: "'Montserrat', sans-serif"
            }}>Shop</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><Link to="/products" style={{ color: 'rgba(250, 246, 241, 0.7)', fontSize: '0.92rem', transition: 'color 0.3s' }} onMouseOver={e=>e.currentTarget.style.color='var(--secondary)'} onMouseOut={e=>e.currentTarget.style.color='rgba(250, 246, 241, 0.7)'}>New Arrivals</Link></li>
              <li><Link to="/products" style={{ color: 'rgba(250, 246, 241, 0.7)', fontSize: '0.92rem', transition: 'color 0.3s' }} onMouseOver={e=>e.currentTarget.style.color='var(--secondary)'} onMouseOut={e=>e.currentTarget.style.color='rgba(250, 246, 241, 0.7)'}>Summer Collection</Link></li>
              <li><Link to="/products" style={{ color: 'rgba(250, 246, 241, 0.7)', fontSize: '0.92rem', transition: 'color 0.3s' }} onMouseOver={e=>e.currentTarget.style.color='var(--secondary)'} onMouseOut={e=>e.currentTarget.style.color='rgba(250, 246, 241, 0.7)'}>Casual Wear</Link></li>
              <li><Link to="/products" style={{ color: 'rgba(250, 246, 241, 0.7)', fontSize: '0.92rem', transition: 'color 0.3s' }} onMouseOver={e=>e.currentTarget.style.color='var(--secondary)'} onMouseOut={e=>e.currentTarget.style.color='rgba(250, 246, 241, 0.7)'}>Formal Wear</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ 
              marginBottom: '1.5rem', 
              fontSize: '0.8rem', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              color: 'var(--bg-cream)',
              fontWeight: '400',
              fontFamily: "'Montserrat', sans-serif"
            }}>About Us</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><Link to="/about" style={{ color: 'rgba(250, 246, 241, 0.7)', fontSize: '0.92rem', transition: 'color 0.3s' }} onMouseOver={e=>e.currentTarget.style.color='var(--secondary)'} onMouseOut={e=>e.currentTarget.style.color='rgba(250, 246, 241, 0.7)'}>Our Story</Link></li>
              <li><Link to="/contact" style={{ color: 'rgba(250, 246, 241, 0.7)', fontSize: '0.92rem', transition: 'color 0.3s' }} onMouseOver={e=>e.currentTarget.style.color='var(--secondary)'} onMouseOut={e=>e.currentTarget.style.color='rgba(250, 246, 241, 0.7)'}>Contact</Link></li>
              <li><Link to="/faq" style={{ color: 'rgba(250, 246, 241, 0.7)', fontSize: '0.92rem', transition: 'color 0.3s' }} onMouseOver={e=>e.currentTarget.style.color='var(--secondary)'} onMouseOut={e=>e.currentTarget.style.color='rgba(250, 246, 241, 0.7)'}>FAQ</Link></li>
              <li><Link to="/returns" style={{ color: 'rgba(250, 246, 241, 0.7)', fontSize: '0.92rem', transition: 'color 0.3s' }} onMouseOver={e=>e.currentTarget.style.color='var(--secondary)'} onMouseOut={e=>e.currentTarget.style.color='rgba(250, 246, 241, 0.7)'}>Returns</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ 
              marginBottom: '1.5rem', 
              fontSize: '0.8rem', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              color: 'var(--bg-cream)',
              fontWeight: '400',
              fontFamily: "'Montserrat', sans-serif"
            }}>Newsletter</h4>
            <p style={{ color: 'rgba(250, 246, 241, 0.7)', fontSize: '0.92rem', marginBottom: '1.2rem', fontFamily: "'Montserrat', sans-serif", fontWeight: '300' }}>
              Join our list for exclusive offers and styling tips.
            </p>
            <div style={{ position: 'relative', borderBottom: '1.5px solid rgba(183, 110, 121, 0.4)', paddingBottom: '0.5rem' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--bg-cream)', 
                  fontSize: '0.95rem', 
                  width: '100%', 
                  outline: 'none',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: '300'
                }} 
              />
              <button style={{ position: 'absolute', right: 0, color: 'var(--secondary)', bottom: '0.5rem' }}>
                <ArrowRight size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: '300' }}>&copy; {new Date().getFullYear()} ayesha.a collection. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ transition: 'color 0.3s' }} onMouseOver={e=>e.currentTarget.style.color='var(--secondary)'} onMouseOut={e=>e.currentTarget.style.color='rgba(250, 246, 241, 0.5)'}>Privacy</a>
            <a href="#" style={{ transition: 'color 0.3s' }} onMouseOver={e=>e.currentTarget.style.color='var(--secondary)'} onMouseOut={e=>e.currentTarget.style.color='rgba(250, 246, 241, 0.5)'}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
