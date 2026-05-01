'use client';
// components/FooterInfo.jsx
import { FOOTER_FEATURES } from '@/lib/constants';

export default function FooterInfo() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
      {/* Feature grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        borderBottom: '1px solid var(--border)',
      }}>
        {FOOTER_FEATURES.map((f, i) => (
          <div
            key={f.title}
            style={{
              padding: 'clamp(14px,2vw,20px) 16px',
              borderRight: i < FOOTER_FEATURES.length - 1 ? '1px solid var(--border)' : 'none',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: '20px', color: 'var(--orange)', flexShrink: 0, marginTop: '2px' }}>{f.icon}</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '4px' }}>{f.title}</div>
              <div style={{ fontSize: '11px', color: 'var(--white-dim)', lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 24px',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '9px',
        color: 'var(--white-dim)',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        <span>© 2025 Aperture Science Enrichment Center. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          {['TERMS OF TESTING', 'PRIVACY POLICY', 'APERTURE.COM'].map(link => (
            <a
              key={link}
              href="#"
              style={{ color: 'inherit', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--orange)'}
              onMouseLeave={e => e.currentTarget.style.color = 'inherit'}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
