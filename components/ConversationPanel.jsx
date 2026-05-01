'use client';
import { useEffect, useRef, useState } from 'react';

export default function ConversationPanel({ messages, isTyping, onClear, onSendMessage }) {
  const bodyRef = useRef(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendNow = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div style={{
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--panel)',
      minWidth: 0,
      height: '100%',
    }}>
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
        CONVERSATION TRANSCRIPT
        <button onClick={onClear}
          style={{
            color: 'var(--white-dim)',
            background: 'none',
            border: '1px solid var(--border)',
            padding: '3px 8px',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '9px',
            cursor: 'crosshair',
          }}>
          CLEAR
        </button>
      </div>

      <div
        ref={bodyRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Share Tech Mono', monospace", fontSize: '9px' }}>
              <span style={{
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: msg.speaker === 'GLADOS' ? 'var(--orange)' : '#6ab4ff',
              }}>
                {msg.speaker}
              </span>
              <span style={{ color: 'var(--white-dim)', opacity: 0.5 }}>{msg.time}</span>
            </div>
            <div style={{
              fontSize: '12px',
              lineHeight: 1.7,
              color: 'var(--white)',
              padding: '8px 10px',
              background: 'rgba(255,255,255,0.03)',
              borderLeft: `2px solid ${msg.speaker === 'GLADOS' ? 'var(--orange)' : '#6ab4ff'}`,
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color: 'var(--orange)' }}>
            GLADOS IS TYPING...
          </div>
        )}
      </div>

      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '10px',
        display: 'flex',
        gap: '8px',
        flexShrink: 0,
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendNow()}
          placeholder="Type to GLaDOS..."
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border)',
            color: 'white',
            padding: '10px',
            outline: 'none',
            fontSize: '12px',
          }}
        />
        <button
          onClick={sendNow}
          style={{
            background: 'var(--orange)',
            border: 'none',
            color: 'black',
            padding: '0 14px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );
}