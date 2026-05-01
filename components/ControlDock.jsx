'use client';
// components/ControlDock.jsx

function CtrlBtn({ icon, label, onClick, disabled, variant = 'default', active = false }) {
  const styles = {
    default: {
      background: active ? 'rgba(232,114,12,0.12)' : 'var(--bg3)',
      border: `1px solid ${active ? 'var(--orange)' : 'var(--border)'}`,
      color: active ? 'var(--orange)' : 'var(--white)',
    },
    danger: {
      background: 'rgba(232,64,64,0.1)',
      border: '1px solid var(--red)',
      color: 'var(--red)',
    },
    primary: {
      background: 'var(--orange)',
      border: '1px solid var(--orange)',
      color: '#000',
      fontWeight: 700,
    },
  };

  const s = styles[variant] || styles.default;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        ...s,
        padding: 'clamp(8px,1.5vw,10px) clamp(10px,2vw,16px)',
        cursor: disabled ? 'not-allowed' : 'crosshair',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 'clamp(8px,1.5vw,9px)',
        letterSpacing: '0.1em',
        transition: 'all 0.15s',
        minWidth: 'clamp(50px,8vw,64px)',
        opacity: disabled ? 0.4 : 1,
      }}
      onMouseEnter={e => {
        if (!disabled && variant === 'default') {
          e.currentTarget.style.borderColor = 'var(--orange)';
          e.currentTarget.style.color = 'var(--orange)';
          e.currentTarget.style.background = 'rgba(232,114,12,0.1)';
        }
      }}
      onMouseLeave={e => {
        if (!disabled && variant === 'default') {
          e.currentTarget.style.borderColor = active ? 'var(--orange)' : 'var(--border)';
          e.currentTarget.style.color = active ? 'var(--orange)' : 'var(--white)';
          e.currentTarget.style.background = active ? 'rgba(232,114,12,0.12)' : 'var(--bg3)';
        }
      }}
    >
      <span style={{ fontSize: 'clamp(14px,3vw,18px)', lineHeight: 1 }}>{icon}</span>
      {label}
    </button>
  );
}

export default function ControlDock({
  callActive,
  micActive,
  camActive,
  onJoin,
  onToggleMic,
  onToggleCam,
  onEnd,
  onReset,
  onFullscreen,
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(4px,1vw,8px)',
      padding: 'clamp(10px,2vw,14px) 16px',
      background: 'var(--bg2)',
      borderTop: '1px solid var(--border)',
      flexWrap: 'wrap',
    }}>
      <CtrlBtn
        icon="📞"
        label="JOIN CALL"
        onClick={onJoin}
        disabled={callActive}
        variant={callActive ? 'default' : 'primary'}
      />
      <CtrlBtn
        icon={micActive ? '🔴' : '🎙️'}
        label={micActive ? 'MUTE' : 'UNMUTE'}
        onClick={onToggleMic}
        disabled={!callActive}
        active={micActive}
        variant="default"
      />
      <CtrlBtn
        icon={camActive ? '📹' : '📷'}
        label="CAMERA"
        onClick={onToggleCam}
        active={camActive}
        variant="default"
      />
      <CtrlBtn
        icon="📵"
        label="END TEST"
        onClick={onEnd}
        disabled={!callActive}
        variant="danger"
      />
      <CtrlBtn
        icon="↺"
        label="RESET"
        onClick={onReset}
        variant="default"
      />
      <CtrlBtn
        icon="⛶"
        label="FULLSCREEN"
        onClick={onFullscreen}
        variant="default"
      />
    </div>
  );
}
