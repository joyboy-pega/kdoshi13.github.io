import React, { useState, useEffect } from 'react';

const FULL_TEXT = 'Keval Doshi';
const CHAR_DELAY = 90; // ms per character

export const LogoBanner: React.FC = () => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    // Small initial pause before typing starts
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(FULL_TEXT.slice(0, i));
        if (i >= FULL_TEXT.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, CHAR_DELAY);
      return () => clearInterval(interval);
    }, 200);
    return () => clearTimeout(startTimer);
  }, []);

  return (
    <div
      style={{
        background: '#0d0d0d',
        padding: '8px 0 4px 0',
        userSelect: 'none',
        lineHeight: 1,
      }}
    >
      <div
        style={{
          fontFamily: "'Orbitron', monospace",
          fontWeight: 900,
          fontSize: 'clamp(28px, 6vw, 52px)',
          color: 'transparent',
          WebkitTextStroke: '1.5px #4a7ab5',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding: '0 2px',
          display: 'inline-block',
          whiteSpace: 'nowrap',
        }}
      >
        {displayed}
        {/* Blinking cursor — solid while typing, then fades out after done */}
        <span
          style={{
            display: 'inline-block',
            width: '3px',
            height: '0.75em',
            background: '#4a7ab5',
            marginLeft: '4px',
            verticalAlign: 'baseline',
            position: 'relative',
            top: '0.05em',
            animation: done ? 'cursorFadeOut 1.5s ease forwards' : 'blink 0.55s step-end infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes cursorFadeOut {
          0%   { opacity: 1; }
          60%  { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default LogoBanner;
