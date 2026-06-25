import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard } from 'lucide-react';

const STYLES = `
  @keyframes navFadeDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes navTrackingIn {
    0% { letter-spacing: 12px; opacity: 0; filter: blur(4px); }
    100% { letter-spacing: 6px; opacity: 1; filter: blur(0px); }
  }
  @keyframes navTrackingInSub {
    0% { letter-spacing: 12px; opacity: 0; filter: blur(4px); }
    100% { letter-spacing: 7px; opacity: 1; filter: blur(0px); }
  }
`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!document.getElementById('ayesha-nav-keyframes')) {
      const tag = document.createElement('style');
      tag.id = 'ayesha-nav-keyframes';
      tag.textContent = STYLES;
      document.head.appendChild(tag);
    }
    const t = setTimeout(() => setLoaded(true), 50);

    // Read user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(t);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      transition: 'all 0.4s ease',
      backgroundColor: isScrolled ? 'rgba(250, 246, 241, 0.98)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
      boxShadow: isScrolled ? '0 4px 20px rgba(183, 110, 121, 0.04)' : 'none',
    }}>
      {/* ── Top Promo Announcement Bar ── */}
      <div style={{
        backgroundColor: 'var(--bg-dark)',
        color: 'var(--bg-cream)',
        fontSize: '0.62rem',
        fontWeight: '300',
        letterSpacing: '3px',
        textAlign: 'center',
        padding: isScrolled ? '0' : '0.5rem 0',
        textTransform: 'uppercase',
        fontFamily: "'Montserrat', sans-serif",
        transition: 'all 0.4s ease',
        height: isScrolled ? '0px' : '26px',
        opacity: isScrolled ? 0 : 1,
        overflow: 'hidden',
      }}>
        Complimentary Shipping on all Orders above PKR 5,000
      </div>

      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        padding: isScrolled ? '0.6rem 2rem' : '1rem 2rem',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '2rem',
        transition: 'all 0.4s ease',
      }}>

        {/* LEFT: Nav Links */}
        <div style={{
          display: 'flex',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          {[
            { label: 'Home', to: '/' },
            { label: 'Shop', to: '/products' },
            { label: 'Collection', to: '/products' },
          ].map((link, index) => (
            <Link
              key={link.label}
              to={link.to}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.78rem',
                fontWeight: '300',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--text-title)',
                transition: 'color 0.3s ease',
                position: 'relative',
                opacity: loaded ? 1 : 0,
                animation: loaded ? 'navFadeDown 0.8s ease ' + (0.2 + index * 0.1) + 's both' : 'none',
              }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--secondary)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--text-title)'}
            >
              {link.label}
            </Link>
          ))}

          {/* Admin Panel link — only visible when logged in as admin */}
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.78rem',
                fontWeight: '400',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--primary-dark)',
                transition: 'color 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                opacity: loaded ? 1 : 0,
                animation: loaded ? 'navFadeDown 0.8s ease 0.5s both' : 'none',
              }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--secondary)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--primary-dark)'}
            >
              <LayoutDashboard size={15} strokeWidth={1.5} />
              Admin
            </Link>
          )}
        </div>

        {/* CENTER: Brand Text Logo */}
        <div style={{ textAlign: 'center', lineHeight: 1 }}>
          <Link to="/" style={{ display: 'block' }}>
            <div style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '1.5rem',
              fontWeight: '300',
              letterSpacing: '6px',
              textTransform: 'lowercase',
              color: 'var(--text-title)',
              transition: 'all 0.3s ease',
              lineHeight: 1.1,
              opacity: loaded ? 1 : 0,
              animation: loaded ? 'navTrackingIn 1.2s cubic-bezier(0.215, 0.610, 0.355, 1.000) 0.1s both' : 'none',
            }}>
              ayesha.a
            </div>
            <div style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.52rem',
              letterSpacing: '7px',
              textTransform: 'uppercase',
              color: 'var(--secondary)',
              fontWeight: '400',
              marginTop: '4px',
              opacity: loaded ? 1 : 0,
              animation: loaded ? 'navTrackingInSub 1.2s cubic-bezier(0.215, 0.610, 0.355, 1.000) 0.3s both' : 'none',
            }}>
              collection
            </div>
          </Link>
        </div>

        {/* RIGHT: Action Link & Icons */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
          {/* Sign In / Sign Out */}
          {user ? (
            <button
              onClick={handleSignOut}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.78rem',
                fontWeight: '400',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--text-title)',
                transition: 'color 0.3s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                opacity: loaded ? 1 : 0,
                animation: loaded ? 'navFadeDown 0.8s ease 0.5s both' : 'none',
              }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--secondary)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--text-title)'}
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/signin"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.78rem',
                fontWeight: '400',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--text-title)',
                transition: 'color 0.3s ease',
                opacity: loaded ? 1 : 0,
                animation: loaded ? 'navFadeDown 0.8s ease 0.5s both' : 'none',
              }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--secondary)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--text-title)'}
            >
              Sign In
            </Link>
          )}
          <div style={{ 
            color: 'var(--text-main)', 
            cursor: 'pointer', 
            transition: 'color 0.3s ease', 
            display: 'flex',
            opacity: loaded ? 1 : 0,
            animation: loaded ? 'navFadeDown 0.8s ease 0.6s both' : 'none',
          }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--secondary)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--text-main)'}>
            <ShoppingBag size={20} strokeWidth={1.5} />
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
