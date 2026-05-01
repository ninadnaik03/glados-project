'use client';
// components/SystemStatusCard.jsx
import { SYSTEM_STATUS } from '@/lib/constants';

export default function SystemStatusCard() {
  return (
    <div
      className="fade-in-5"
      style={{
        position: 'absolute',
        right: '40px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '240px',
        background: 'rgba(15,17,21,0.92)',
        border: '1px solid var(--border-bright)',
        borderTop: '2px solid var(--orange)',
        padding: '16px',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '11px',
        backdropFilter: 'blur(6px)',
        zIndex: 10,
      }}
    >
      <div style={{
        color: 'var(--orange)',
        letterSpacing: '0.2em',
        fontSize: '10px',
        marginBottom: '12px',
        paddingBottom: '8px',
        borderBottom: '1px solid var(--border)',
      }}>
        SYSTEM STATUS
      </div>

      {SYSTEM_STATUS.map((row) => (
        <div
          key={row.label}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '6px',
            color: 'var(--white-dim)',
          }}
        >
          <span>{row.label}:</span>
          <span style={{ color: row.color === 'warn' ? 'var(--orange)' : 'var(--green)' }}>
            {row.value}
          </span>
        </div>
      ))}

      <div style={{
        marginTop: '14px',
        paddingTop: '10px',
        borderTop: '1px solid var(--border)',
        color: 'var(--white-dim)',
        fontSize: '10px',
        lineHeight: '1.7',
      }}>
        All systems nominal.<br />
        Commence testing.<br />
        <span className="blink">›_</span>
      </div>
    </div>
  );
}
