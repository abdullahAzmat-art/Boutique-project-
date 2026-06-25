import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero.png';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: ''
  });
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
      const response = await fetch('https://boutique-project-eta.vercel.app/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
          role: 'admin',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMsg(result.message || 'Failed to create account.');
      } else {
        setSuccessMsg('Account created successfully! Redirecting to login...');
        setTimeout(() => navigate('/signin'), 3000);
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again later.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">

      {/* ── LEFT PANEL: Form ── */}
      <div className="auth-form-panel">
        <div style={{ width: '100%', maxWidth: '420px' }}>

          {/* Brand Text Logo */}
          <Link to="/" style={{ display: 'block', textAlign: 'center', marginBottom: '3rem' }}>
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
              Join the Circle
            </h1>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.88rem',
              color: 'var(--text-muted)',
              fontWeight: '300'
            }}>
              Create your account and discover elegant style
            </p>
          </div>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
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

            {/* Name Row */}
            <div className="form-grid-2-sm">
              <div className="form-group">
                <label className="form-label" htmlFor="firstName">First Name</label>
                <input
                  className="form-input"
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="Ayesha"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="lastName">Last Name</label>
                <input
                  className="form-input"
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Khan"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

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
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>

            {/* Terms */}
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              marginBottom: '2rem',
              lineHeight: 1.8,
              fontWeight: '300'
            }}>
              By creating an account, you agree to our{' '}
              <a href="#" style={{ color: 'var(--text-title)', borderBottom: '1.5px solid var(--text-title)', fontWeight: '400' }}>Terms of Service</a>
              {' '}and{' '}
              <a href="#" style={{ color: 'var(--text-title)', borderBottom: '1.5px solid var(--text-title)', fontWeight: '400' }}>Privacy Policy</a>.
            </p>

            {/* Submit */}
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
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          {/* Login link */}
          <p style={{
            textAlign: 'center',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            fontWeight: '300'
          }}>
            Already have an account?{' '}
            <Link
              to="/signin"
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
              Sign In
            </Link>
          </p>

        </div>
      </div>

      {/* ── RIGHT PANEL: Image ── */}
      <div className="auth-image-panel">
        <img
          src={heroImg}
          alt="Ayesha Boutique"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.85,
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(225deg, rgba(183, 110, 121, 0.22) 0%, rgba(250, 246, 241, 0.6) 100%)',
        }} />

        {/* Text over image */}
        <div style={{
          position: 'absolute',
          top: '4rem',
          right: '4rem',
          color: 'var(--text-title)',
          textAlign: 'right',
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
            "Style is a way<br />to say who you are<br />without speaking."
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

    </div>
  );
};

export default SignUp;
