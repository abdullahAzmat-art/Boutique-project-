import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Hero — ayesha.a collection
 *
 * Required fonts (add to index.html <head> or your global font loader):
 *   https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Montserrat:wght@300;400;500&display=swap
 *
 * IMPORTANT: all layout-critical and button styles below are written INLINE
 * (via the style prop), not as CSS classes. This is deliberate — inline
 * styles always win the cascade, so this component can't be silently
 * broken by a global stylesheet, a CSS reset, or load-order timing.
 * The <style> tag below is ONLY used for things inline styles can't do:
 * :hover states, @keyframes, and @media breakpoints.
 *
 * Design notes:
 * - Split layout: ivory editorial panel (left) + black photo panel (right)
 * - Signature element: hairline gold ring "frame corner" on the photo,
 *   echoing the circular ring motif in the ayesha.a logo
 * - Gold is used sparingly: one rule, one word, one button edge —
 *   never as a fill or a gradient wash
 * - Swap the placeholder panel for a real <img src={heroImg} /> when art is ready
 */

const COLORS = {
  cream: '#FAF6F1',
  panelDark: '#1C1A18',
  accent: '#B76E79',
  accentLight: '#C9A27E',
  title: '#1C1A18',
  muted: '#8A7D6F',
  onDark: '#F2E9E2',
};

const STYLES = `
  @keyframes ayeshaHeroFadeUp {
    from { opacity: 0; transform: translateY(30px); filter: blur(4px); }
    to   { opacity: 1; transform: translateY(0); filter: blur(0); }
  }
  @keyframes ayeshaFocusIn {
    0% { filter: blur(12px); opacity: 0; transform: scale(1.05) translateY(20px); }
    100% { filter: blur(0px); opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes ayeshaTrackingIn {
    0% { letter-spacing: 20px; opacity: 0; filter: blur(8px); transform: translateY(20px); }
    100% { letter-spacing: 6px; opacity: 1; filter: blur(0px); transform: translateY(0); }
  }
  @keyframes ayeshaLineExpand {
    0% { transform: scaleX(0); opacity: 0; transform-origin: left; }
    100% { transform: scaleX(1); opacity: 1; transform-origin: left; }
  }
  @keyframes ayeshaButtonPulse {
    0% { box-shadow: 0 0 0 0 rgba(28, 26, 24, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(28, 26, 24, 0); }
    100% { box-shadow: 0 0 0 0 rgba(28, 26, 24, 0); }
  }
  @keyframes ayeshaHeroFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes ayeshaScrollBounce {
    0%, 100% { transform: translateY(0); opacity: 0.5; }
    50%      { transform: translateY(6px); opacity: 1; }
  }

  .ayesha-hero-cta-primary {
    animation: ayeshaButtonPulse 3s infinite 2s;
  }
  .ayesha-hero-cta-primary:hover {
    background: ${COLORS.accent} !important;
    border-color: ${COLORS.accent} !important;
    transform: translateY(-1px);
    animation: none;
  }
  .ayesha-hero-cta-outline:hover {
    border-color: ${COLORS.accent} !important;
    color: ${COLORS.accent} !important;
    transform: translateY(-1px);
  }

  @media (max-width: 880px) {
    .ayesha-hero-grid { grid-template-columns: 1fr !important; min-height: auto !important; }
    .ayesha-hero-photo-panel { min-height: 60vh !important; order: -1 !important; }
    .ayesha-hero-text-panel { padding: 3.5rem 6vw !important; }
    .ayesha-hero-scroll-indicator { display: none !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ayesha-hero-root *, .ayesha-hero-root *::before, .ayesha-hero-root *::after {
      animation: none !important;
      transition: none !important;
    }
  }
`;

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!document.getElementById('ayesha-hero-keyframes')) {
      const tag = document.createElement('style');
      tag.id = 'ayesha-hero-keyframes';
      tag.textContent = STYLES;
      document.head.appendChild(tag);
    }
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const vis = loaded ? 1 : 0;
  const fadeUp = (delay) => ({
    opacity: vis,
    animation: loaded ? `ayeshaHeroFadeUp 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) ${delay}s both` : 'none',
  });

  return (
    <section
      className="ayesha-hero-root"
      style={{ width: '100%', overflow: 'hidden', fontFamily: "'Montserrat', sans-serif" }}
    >
      <div
        className="ayesha-hero-grid"
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '92vh',
          width: '100%',
        }}
      >

        {/* ── Left: editorial text panel ── */}
        <div
          className="ayesha-hero-text-panel"
          style={{
            background: COLORS.cream,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '4rem 7vw',
            position: 'relative',
            minWidth: 0,
          }}
        >
        

          {/* Heading */}
          <h1 style={{ marginTop: "100px", lineHeight: 1 }}>
            <span
              style={{
                display: 'block',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.8rem, 5.2vw, 4.6rem)',
                fontStyle: 'italic',
                fontWeight: 600,
                color: COLORS.muted,
                letterSpacing: '-0.5px',
                opacity: vis,
                animation: loaded ? `ayeshaFocusIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both` : 'none',
              }}
            >
              Everyday
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(2.6rem, 5.6vw, 4.8rem)',
                fontWeight: 300,
                letterSpacing: '6px',
                textTransform: 'uppercase',
                color: COLORS.title,
                marginTop: '0.3rem',
                opacity: vis,
                animation: loaded ? `ayeshaTrackingIn 1.4s cubic-bezier(0.215, 0.610, 0.355, 1.000) 0.4s both` : 'none',
              }}
            >
              Elegance
            </span>
          </h1>

          {/* Gold rule + label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              marginTop: '1.5rem',
              ...fadeUp(0.46),
            }}
          >
            <span style={{ width: '44px', height: '1px', background: COLORS.accent, display: 'inline-block' }} />
            <span
              style={{
                fontSize: '0.78rem',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: COLORS.accent,
                fontWeight: 500,
              }}
            >
              Curated for you
            </span>
              <span style={{ width: '44px', height: '1px', background: COLORS.accent, display: 'inline-block' }} />
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: 'clamp(0.92rem, 1.3vw, 1.02rem)',
              maxWidth: '420px',
              marginTop: '1.8rem',
              marginBottom: '2.6rem',
              fontWeight: 300,
              letterSpacing: '0.3px',
              lineHeight: 1.85,
              color: COLORS.title,
              ...fadeUp(0.58),
            }}
          >
            A thoughtful edit of modern, feminine styles — made to help you
            feel beautiful, confident, and effortlessly chic, every single day.
          </p>

          {/* CTAs — fully inline so they always render as styled buttons,
              never as bare links, regardless of global button/anchor resets */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              ...fadeUp(0.7),
            }}
          >
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <button
                type="button"
                className="ayesha-hero-cta-primary"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.78rem',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  padding: '1rem 2.4rem',
                  cursor: 'pointer',
                  borderRadius: '0px',
                  background: COLORS.panelDark,
                  color: COLORS.cream,
                  border: `1px solid ${COLORS.panelDark}`,
                  transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.25s ease',
                  margin: 0,
                }}
              >
                View Products
              </button>
            </Link>
          </div>

          {/* Scroll indicator, anchored to this panel on desktop */}
       
        </div>


      </div>
    </section>
  );
};

export default Hero;