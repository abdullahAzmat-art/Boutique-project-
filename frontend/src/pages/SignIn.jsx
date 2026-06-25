import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero.png';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMsg(result.message || 'Login failed. Please try again.');
      } else {
        setSuccessMsg('Signed in successfully! Redirecting...');
        
        // Save token
        localStorage.setItem('token', result.data.token);

        const role = result.data.role;
        if (role) {
          sessionStorage.setItem('role', role);
        }

        setTimeout(() => {
          if (role === 'admin') {
            navigate('/add-product');
          } else {
            navigate('/');
          }
        }, 2000);
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    }}>

      {/* ── LEFT PANEL: Image ── */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-cream)',
      }}>
        <img
          src={heroImg}
          alt="ayesha.a collection"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.85,
          }}
        />
        {/* Soft overlay gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(183, 110, 121, 0.22) 0%, rgba(250, 246, 241, 0.6) 100%)',
        }} />

        {/* Brand stamp on image */}
        <div style={{
          position: 'absolute',
          bottom: '4rem',
          left: '4rem',
          color: 'var(--text-title)',
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.8rem',
            fontWeight: '400',
            fontStyle: 'italic',
            lineHeight: 1.2,
            marginBottom: '1rem',
            color: 'var(--secondary)'
          }}>
            "Confidence is the<br />best outfit."
          </div>
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--text-title)',
            fontWeight: '300'
          }}>
            — ayesha.a collection
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: Sign In Form ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5rem',
        backgroundColor: 'var(--white)',
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>

          {/* Brand Text Logo at top */}
          <Link to="/" style={{ display: 'block', textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '2rem',
              fontWeight: '300',
              letterSpacing: '6px',
              textTransform: 'lowercase',
              color: 'var(--text-title)',
              transition: 'all 0.3s ease',
              lineHeight: 1.1,
            }}>
              ayesha.a
            </div>
            <div style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.62rem',
              letterSpacing: '8px',
              textTransform: 'uppercase',
              color: 'var(--secondary)',
              fontWeight: '400',
              marginTop: '6px',
            }}>
              collection
            </div>
          </Link>

          {/* Heading */}
          <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <h1 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '1.8rem',
              fontWeight: '400',
              color: 'var(--text-title)',
              marginBottom: '0.5rem',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              lineHeight: 1.2,
            }}>
              Welcome Back
            </h1>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.88rem',
              color: 'var(--text-muted)',
              fontWeight: '300'
            }}>
              Sign in to your personal account
            </p>
          </div>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(183, 110, 121, 0.22)' }} />
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.72rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--secondary)',
              fontWeight: '400'
            }}>Your Details</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(183, 110, 121, 0.22)' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Messages */}
            {errorMsg && (
              <div style={{ color: 'red', fontSize: '0.8rem', marginBottom: '1rem', fontFamily: "'Josefin Sans', sans-serif" }}>
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div style={{ color: 'green', fontSize: '0.8rem', marginBottom: '1rem', fontFamily: "'Josefin Sans', sans-serif" }}>
                {successMsg}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                className="form-input"
                id="email"
                type="email"
                name="email"
                placeholder="ayesha@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                className="form-input"
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>

            {/* Remember + Forgot */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                cursor: 'pointer',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                fontWeight: '300'
              }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  style={{
                    accentColor: 'var(--secondary)',
                    width: '16px',
                    height: '16px',
                  }}
                />
                Remember me
              </label>
              <a
                href="#"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.78rem',
                  color: 'var(--secondary)',
                  textDecoration: 'none',
                  fontWeight: '400',
                  transition: 'opacity 0.3s',
                }}
                onMouseOver={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseOut={e => (e.currentTarget.style.opacity = '1')}
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              className="btn-primary"
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '1.5rem',
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

          </form>

          {/* Register Link */}
          <p style={{
            textAlign: 'center',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            fontWeight: '300'
          }}>
            New to ayesha.a collection?{' '}
            <Link
              to="/signup"
              style={{
                color: 'var(--secondary)',
                fontWeight: '500',
                borderBottom: '1.5px solid var(--secondary)',
                paddingBottom: '2px',
                transition: 'opacity 0.3s'
              }}
              onMouseOver={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseOut={e => (e.currentTarget.style.opacity = '1')}
            >
              Create an Account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignIn;
