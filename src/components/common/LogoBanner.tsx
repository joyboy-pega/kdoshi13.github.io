import React from 'react';

/**
 * LogoBanner — wireframe outlined "Keval Doshi" heading.
 *
 * Reproduces the image: hollow outlined letters in blue (#4a7ab5)
 * on a near-black (#0d0d0d) background using CSS -webkit-text-stroke.
 * No gradients. No shadows. No emojis. Pure CSS.
 */
export const LogoBanner: React.FC = () => {
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
        }}
      >
        Keval Doshi
      </div>
    </div>
  );
};

export default LogoBanner;
