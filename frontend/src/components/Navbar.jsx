import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard, Menu, X } from 'lucide-react';

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

const linkStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '0.78rem',
  fontWeight: '300',
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: 'var(--text-title)',
  transition: 'color 0.3s ease',
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!document.getElementById('ayesha-nav-keyframes')) {
      const tag = document.createElement('style');
      tag.id = 'ayesha-nav-keyframes';
      tag.textContent = STYLES;
      document.head.appendChild(tag);
    }
    const t = setTimeout(() => setLoaded(true), 50);

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

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/products' },
    { label: 'Collection', to: '/products' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      transition: 'all 0.4s ease',
      backgroundColor: isScrolled || mobileMenuOpen ? 'rgba(250, 246, 241, 0.98)' : 'transparent',
      backdropFilter: isScrolled || mobileMenuOpen ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: isScrolled || mobileMenuOpen ? 'blur(20px)' : 'none',
      boxShadow: isScrolled ? '0 4px 20px rgba(183, 110, 121, 0.04)' : 'none',
    }}>
      {/* Promo bar */}
      <div
        className="nav-promo-bar"
        style={{
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
          height: isScrolled ? '0px' : 'auto',
          minHeight: isScrolled ? '0px' : '26px',
          opacity: isScrolled ? 0 : 1,
          overflow: 'hidden',
        }}
      >
        Complimentary Shipping on all Orders above PKR 5,000
      </div>

      <div className={`nav-inner ${isScrolled ? 'nav-inner-scrolled' : ''}`}>

        {/* Mobile: hamburger */}
        <button
          className="nav-mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-title)',
            padding: '0.25rem',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>

        {/* Desktop: left nav links */}
        <div className="nav-desktop-only" style={{ gap: '2.5rem', alignItems: 'center' }}>
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              to={link.to}
              style={{
                ...linkStyle,
                position: 'relative',
                opacity: loaded ? 1 : 0,
                animation: loaded ? `navFadeDown 0.8s ease ${0.2 + index * 0.1}s both` : 'none',
              }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--secondary)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--text-title)'}
            >
              {link.label}
            </Link>
          ))}

          {user?.role === 'admin' && (
            <Link
              to="/admin"
              style={{
                ...linkStyle,
                fontWeight: '400',
                color: 'var(--primary-dark)',
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

        {/* Brand logo — center */}
        <div className="nav-brand-center" style={{ textAlign: 'center', lineHeight: 1 }}>
          <Link to="/" style={{ display: 'block' }} onClick={closeMenu}>
            <div
              className="nav-brand-title"
              style={{
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
              }}
            >
              ayesha.a
            </div>
            <div
              className="nav-brand-sub"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.52rem',
                letterSpacing: '7px',
                textTransform: 'uppercase',
                color: 'var(--secondary)',
                fontWeight: '400',
                marginTop: '4px',
                opacity: loaded ? 1 : 0,
                animation: loaded ? 'navTrackingInSub 1.2s cubic-bezier(0.215, 0.610, 0.355, 1.000) 0.3s both' : 'none',
              }}
            >
              collection
            </div>
          </Link>
        </div>

        {/* Desktop: right actions */}
        <div className="nav-desktop-only" style={{ gap: '2rem', alignItems: 'center', justifyContent: 'flex-end' }}>
          {user ? (
            <button
              onClick={handleSignOut}
              style={{
                ...linkStyle,
                fontWeight: '400',
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
                ...linkStyle,
                fontWeight: '400',
                opacity: loaded ? 1 : 0,
                animation: loaded ? 'navFadeDown 0.8s ease 0.5s both' : 'none',
              }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--secondary)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--text-title)'}
            >
              Sign In
            </Link>
          )}
          <div
            style={{
              color: 'var(--text-main)',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              display: 'flex',
              opacity: loaded ? 1 : 0,
              animation: loaded ? 'navFadeDown 0.8s ease 0.6s both' : 'none',
            }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--secondary)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--text-main)'}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
          </div>
        </div>

        {/* Mobile: bag icon */}
        <div
          className="nav-mobile-only"
          style={{
            color: 'var(--text-main)',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <ShoppingBag size={20} strokeWidth={1.5} />
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`nav-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <Link
            key={link.label}
            to={link.to}
            className="nav-mobile-link"
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}

        {user?.role === 'admin' && (
          <Link to="/admin" className="nav-mobile-link" onClick={closeMenu} style={{ color: 'var(--primary-dark)' }}>
            Admin Panel
          </Link>
        )}

        {user ? (
          <button
            onClick={handleSignOut}
            className="nav-mobile-link"
            style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', width: '100%' }}
          >
            Sign Out
          </button>
        ) : (
          <Link to="/signin" className="nav-mobile-link" onClick={closeMenu}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
