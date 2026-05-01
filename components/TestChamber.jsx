'use client';

import { useEffect, useRef, useState } from 'react';
import ControlDock from './ControlDock';

export default function TestChamber({
  isTalking,
  callActive,
  micActive,
  camActive,
  micStatus,
  aiStatus,
  onJoin,
  onToggleMic,
  onToggleCam,
  onEnd,
  onReset,
  onFullscreen,
  userVideoRef,
}) {
  const waveformRef = useRef(null);
  const animFrameRef = useRef(null);
  const [waveHeights, setWaveHeights] = useState([]);

  useEffect(() => {
    const count = 48;
    setWaveHeights(new Array(count).fill(3));
  }, []);

  useEffect(() => {
    if (!isTalking) {
      setWaveHeights(h => h.map(() => 3));
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let frame;
    const animate = () => {
      setWaveHeights(prev =>
        prev.map((_, i) => {
          const t = Date.now() * 0.004;
          const val =
            Math.abs(Math.sin(t + i * 0.35)) * 38 +
            Math.abs(Math.sin(t * 1.7 + i * 0.6)) * 18;
          return Math.max(3, val);
        })
      );
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    animFrameRef.current = frame;

    return () => cancelAnimationFrame(frame);
  }, [isTalking]);

  const aiDotColor =
    aiStatus === 'IDLE'
      ? 'var(--border)'
      : aiStatus === 'PROCESSING...' || aiStatus === 'SPEAKING...'
      ? 'var(--orange)'
      : 'var(--green)';

  return (
    <div
      style={{
        position: 'relative',
        background: '#050608',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
      }}
    >
      <div className="corner-tl" />
      <div className="corner-tr" />

      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: 'var(--white-dim)',
          zIndex: 5,
          lineHeight: 1.7,
        }}
      >
        CAMERA FEED
        <br />
        GLADOS CORE
      </div>

      <div
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          minHeight: 'clamp(260px, 45vw, 500px)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #080910 0%, #050608 100%)',
          }}
        />

        <video
          className="video-fill"
          autoPlay
          loop
          muted
          playsInline
          style={{
            opacity: 0.92,
            zIndex: 1,
            filter: isTalking ? 'brightness(0.95)' : 'brightness(0.78)',
            transition: 'all 0.3s ease',
          }}
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>

        {isTalking && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(232,114,12,0.03)',
              boxShadow: 'inset 0 0 60px rgba(232,114,12,0.18)',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          />
        )}

        <div
          ref={waveformRef}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '64px',
            background: 'linear-gradient(180deg, transparent, rgba(5,6,8,0.88))',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '3px',
            padding: '0 20px 8px',
            zIndex: 4,
          }}
        >
          {waveHeights.map((h, i) => (
            <div
              key={i}
              className="wave-bar"
              style={{
                height: `${h}px`,
                opacity: isTalking ? 0.4 + (h / 60) * 0.6 : 0.18,
              }}
            />
          ))}
        </div>

        {isTalking && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.15em',
              color: 'var(--orange)',
              background: 'rgba(232,114,12,0.08)',
              border: '1px solid var(--orange)',
              padding: '4px 8px',
              zIndex: 6,
            }}
          >
            ● AUDIO OUTPUT ACTIVE
          </div>
        )}
      </div>

      <div className="corner-bl" />
      <div className="corner-br" />

      <div
        style={{
          position: 'absolute',
          bottom: '128px',
          left: '12px',
          width: 'clamp(90px,12vw,120px)',
          height: 'clamp(68px,9vw,90px)',
          border: '1px solid var(--border-bright)',
          background: '#0a0b10',
          zIndex: 6,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0d0e14, #080910)',
            position: 'relative',
          }}
        >
          <video
            ref={userVideoRef}
            autoPlay
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: camActive ? 'block' : 'none',
            }}
          />
          {!camActive && (
            <span style={{ fontSize: '22px', color: 'var(--white-dim)', opacity: 0.25 }}>
              📷
            </span>
          )}

          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '8px',
              letterSpacing: '0.1em',
              color: 'var(--white-dim)',
              background: 'rgba(0,0,0,0.7)',
              padding: '2px 5px',
            }}
          >
            SUBJECT VIEW
          </div>
        </div>
      </div>

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 0 6px',
          color: 'var(--orange)',
          fontSize: '10px',
          letterSpacing: '0.35em',
          fontFamily: "'Share Tech Mono', monospace",
          borderTop: '1px solid rgba(255,255,255,0.03)',
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--orange)',
            boxShadow: '0 0 10px var(--orange)',
          }}
        />
        GLaDOS CORE ACTIVE
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '8px 16px',
          background: 'rgba(0,0,0,0.35)',
          borderTop: '1px solid var(--border)',
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '9px',
          color: 'var(--white-dim)',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)' }} />
          <span>GLADOS: ONLINE</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: micActive ? 'var(--orange)' : 'var(--border)',
            }}
          />
          <span>MIC: {micStatus}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: aiDotColor }} />
          <span>AI: {aiStatus}</span>
        </div>
      </div>

      <ControlDock
        callActive={callActive}
        micActive={micActive}
        camActive={camActive}
        onJoin={onJoin}
        onToggleMic={onToggleMic}
        onToggleCam={onToggleCam}
        onEnd={onEnd}
        onReset={onReset}
        onFullscreen={onFullscreen}
      />
    </div>
  );
}