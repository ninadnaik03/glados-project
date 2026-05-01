'use client';
// components/ResultsPanel.jsx
import { useEffect, useRef } from 'react';
import ApertureIcon from './ApertureIcon';
import { EVAL_CATEGORIES, GLADOS_QUOTE } from '@/lib/constants';

export default function ResultsPanel({ complete, score, onReset }) {
  const fillRef = useRef(null);

  useEffect(() => {
    if (complete && fillRef.current) {
      setTimeout(() => {
        if (fillRef.current) fillRef.current.style.width = score + '%';
      }, 200);
    }
  }, [complete, score]);

  return (
    <div style={{
      background: 'var(--panel)',
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px',
        letterSpacing: '0.2em',
        color: 'var(--white-dim)',
        flexShrink: 0,
      }}>
        TEST RESULTS
        <ApertureIcon size={20} />
      </div>

      {/* Body */}
      <div style={{ padding: '16px', flex: 1, overflowY: 'auto' }}>

        {/* Score */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: 'var(--white-dim)',
            marginBottom: '6px',
          }}>
            SUBJECT PERFORMANCE
          </div>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '52px',
            fontWeight: 900,
            color: 'var(--orange)',
            lineHeight: 1,
            textShadow: '0 0 30px rgba(232,114,12,0.5)',
          }}>
            {complete ? `${score}%` : '—'}
          </div>
          <div style={{
            height: '4px',
            background: 'var(--border)',
            borderRadius: '2px',
            marginTop: '10px',
            overflow: 'hidden',
          }}>
            <div
              ref={fillRef}
              className="score-fill"
              style={{ width: '0%' }}
            />
          </div>
        </div>

        {/* Eval Summary */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: 'var(--white-dim)',
            marginBottom: '10px',
          }}>
            EVALUATION SUMMARY
          </div>
          {EVAL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '7px',
                fontSize: '11px',
              }}
            >
              <span style={{ color: 'var(--green)', fontSize: '12px' }}>✓</span>
              <span style={{ color: 'var(--white-dim)', flex: 1 }}>{cat.label}:</span>
              <span style={{
                color: !complete ? 'var(--white-dim)' : cat.highlight ? 'var(--orange)' : 'var(--green)',
                fontWeight: 600,
                fontSize: '11px',
              }}>
                {complete ? cat.value : 'Pending'}
              </span>
            </div>
          ))}
        </div>

        {/* HIRE NINAD box */}
        <div style={{
          background: 'rgba(232,114,12,0.08)',
          border: '1px solid var(--orange)',
          borderTop: '2px solid var(--orange)',
          padding: '16px',
          textAlign: 'center',
          marginBottom: '16px',
        }}>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: 'var(--white-dim)',
            marginBottom: '8px',
          }}>
            SUBJECT RECOMMENDATION:
          </div>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(20px,2.5vw,28px)',
            fontWeight: 900,
            color: 'var(--orange)',
            letterSpacing: '0.1em',
            textShadow: '0 0 20px rgba(232,114,12,0.5)',
          }}>
            HIRE NINAD
          </div>
          <div style={{ marginTop: '8px' }}>
            <ApertureIcon size={16} />
          </div>
        </div>

        {/* GLaDOS quote */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border)',
          borderLeft: '2px solid var(--orange)',
          padding: '12px',
          fontSize: '11px',
          color: 'var(--white-dim)',
          lineHeight: 1.7,
          fontStyle: 'italic',
          marginBottom: '8px',
        }}>
          &ldquo;{GLADOS_QUOTE}&rdquo;
        </div>
      </div>

      {/* Footer buttons */}
      <div style={{
        display: 'flex',
        gap: '8px',
        padding: '12px 16px',
        borderTop: '1px solid var(--border)',
        flexShrink: 0,
      }}>
        <button
          onClick={onReset}
          style={{
            flex: 1,
            padding: '10px',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.15em',
            cursor: 'crosshair',
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--white-dim)',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.color = 'var(--orange)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--white-dim)'; }}
        >
          SAVE RESULTS
        </button>
        <button
          onClick={onReset}
          style={{
            flex: 1,
            padding: '10px',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.15em',
            cursor: 'crosshair',
            border: '1px solid var(--orange)',
            background: 'var(--orange)',
            color: '#000',
            fontWeight: 700,
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#ff8c1a'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--orange)'}
        >
          TEST AGAIN ›
        </button>
      </div>
    </div>
  );
}
