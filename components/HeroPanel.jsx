'use client';

import SystemStatusCard from './SystemStatusCard';

export default function HeroPanel({ onBeginTest }) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '78vh',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
        background: '#050607'
      }}
    >
      {/* BACKGROUND VIDEO */}
      <video
        src="/video.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="video-fill"
        style={{
          opacity: 0.28,
          filter: 'brightness(0.45) contrast(1.1)',
          zIndex: 1
        }}
      />

      {/* DARK OVERLAY */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(5,6,7,0.95) 0%, rgba(5,6,7,0.78) 28%, rgba(5,6,7,0.45) 58%, rgba(5,6,7,0.8) 100%)',
          zIndex: 2
        }}
      />

      {/* GRID OVERLAY */}
      <div className="hero-grid" style={{ zIndex: 3 }} />

      {/* CONTENT */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '30px',
          alignItems: 'center',
          minHeight: '78vh',
          padding: '40px'
        }}
      >
        {/* LEFT TEXT */}
        <div style={{ maxWidth: '520px' }}>
          <div
            style={{
              color: 'var(--orange)',
              fontSize: '11px',
              letterSpacing: '0.3em',
              marginBottom: '16px',
              fontFamily: 'Share Tech Mono'
            }}
          >
            — APERTURE SCIENCE TESTING INITIATIVE
          </div>

          <h1 style={{ fontSize: '4.6rem', lineHeight: 0.92, fontFamily: 'Orbitron', fontWeight: 900 }}>
            <span style={{ color: '#dce2ef' }}>TALK WITH</span><br />
            <span className="glitch-wrap" data-text="GLaDOS," style={{ color: '#dce2ef' }}>GLaDOS,</span><br />
            <span style={{ color: 'var(--orange)' }}>HIRE NINAD</span>
          </h1>

          <p style={{ marginTop: '16px', color: '#8a8fa0', fontSize: '1.45rem', fontStyle: 'italic' }}>
            She was built to test. You were built to hire.
          </p>

          <p style={{ marginTop: '18px', color: '#7a8191', lineHeight: 1.8, maxWidth: '450px', fontSize: '1.05rem' }}>
            Enter Aperture Science&apos;s interactive testing chamber and engage in a real-time conversation with GLaDOS —
            the AI that&apos;s far too smart for her own good.
          </p>

          <button
            onClick={onBeginTest}
            className="btn-aperture"
            style={{
              marginTop: '30px',
              background: 'var(--orange)',
              color: '#111',
              border: 'none',
              padding: '16px 34px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              cursor: 'pointer',
              fontFamily: 'Orbitron',
              fontSize: '14px'
            }}
          >
            BEGIN TEST ›
          </button>

          <div style={{ marginTop: '16px', color: '#7c4a21', fontSize: '11px', letterSpacing: '0.08em' }}>
            WARNING: GLaDOS may be unreasonably sarcastic and potentially murderous.
          </div>
        </div>

        {/* RIGHT STATUS */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <SystemStatusCard />
        </div>
      </div>
    </section>
  );
}