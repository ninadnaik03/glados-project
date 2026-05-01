'use client';
// components/FeatureStrip.jsx

const FEATURES = [
  { icon: '⬡', label: 'REAL-TIME VOICE CONVERSATION' },
  { icon: '◈', label: 'AI-POWERED DIALOGUE' },
  { icon: '◎', label: 'APERTURE SCIENCE CERTIFIED' },
];

export default function FeatureStrip() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg2)',
      flexWrap: 'wrap',
    }}>
      {FEATURES.map((f, i) => (
        <div
          key={f.label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: 'clamp(12px,2vw,16px) clamp(16px,3vw,28px)',
            borderRight: i < FEATURES.length - 1 ? '1px solid var(--border)' : 'none',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 'clamp(9px,2vw,11px)',
            letterSpacing: '0.15em',
            color: 'var(--white-dim)',
          }}
        >
          <span style={{ color: 'var(--orange)', fontSize: '14px' }}>{f.icon}</span>
          {f.label}
        </div>
      ))}
    </div>
  );
}
