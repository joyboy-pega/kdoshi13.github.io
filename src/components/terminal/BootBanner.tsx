import React from 'react';

interface InfoRow {
  label: string;
  value: React.ReactNode;
  valueColor?: string;
}

const rows: InfoRow[] = [
  { label: 'OS',      value: 'KevalOS 1.2 (BrowserVFS)' },
  { label: 'Status',  value: 'OPEN TO HIRE', valueColor: '#9ece6a' },
  { label: 'Role',    value: 'Test Engineer' },
  { label: 'Domain',  value: 'QA / Automation' },
  { label: 'Shell',   value: 'bash 5.2' },
  { label: 'Theme',   value: 'Tokyo Night (TUI)' },
  { label: 'Kernel',  value: 'React 19 + TypeScript' },
  { label: 'Build',   value: 'Vite 6 + Tailwind v4' },
];

const PALETTE = ['#0d0d0d','#f7768e','#9ece6a','#e0af68','#7aa2f7','#bb9af7','#7dcfff','#c8c8c8'];

// Each row fades in with a staggered delay (80ms per row)
const ROW_DELAY_MS = 80;

export const BootBanner: React.FC = () => {
  return (
    <div className="font-mono text-xs" style={{ color: '#c8c8c8' }}>
      <style>{`
        @keyframes rowReveal {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Top border */}
      <div style={{ color: '#3a3a3a' }}>{'┌' + '─'.repeat(60) + '┐'}</div>

      <div style={{ borderLeft: '1px solid #3a3a3a', borderRight: '1px solid #3a3a3a' }}>
        {/* Header row */}
        <div
          className="px-2 py-1"
          style={{
            borderBottom: '1px solid #3a3a3a',
            opacity: 0,
            animation: `rowReveal 0.25s ease forwards`,
            animationDelay: `0ms`,
          }}
        >
          <span style={{ color: '#9ece6a' }}>kevalos</span>
          <span style={{ color: '#5a5a5a' }}>@</span>
          <span style={{ color: '#7aa2f7' }}>portfolio</span>
          <span style={{ color: '#5a5a5a' }}>  v1.2  </span>
          <span style={{ color: '#3a3a3a' }}>{'─'.repeat(33)}</span>
        </div>

        {/* Info grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0px 16px',
            padding: '6px 8px',
          }}
        >
          {rows.map((row, i) => (
            <div
              key={row.label}
              style={{
                opacity: 0,
                animation: `rowReveal 0.2s ease forwards`,
                animationDelay: `${(i + 1) * ROW_DELAY_MS}ms`,
              }}
            >
              <span style={{ color: '#5a5a5a' }}>{row.label.padEnd(8)}</span>
              <span style={{ color: row.valueColor || '#c8c8c8' }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Palette row */}
        <div
          className="px-2"
          style={{
            borderTop: '1px solid #3a3a3a',
            padding: '4px 8px',
            opacity: 0,
            animation: `rowReveal 0.2s ease forwards`,
            animationDelay: `${(rows.length + 1) * ROW_DELAY_MS}ms`,
          }}
        >
          <span style={{ color: '#5a5a5a' }}>Palette </span>
          {PALETTE.map((c, i) => (
            <span key={i} style={{ background: c, color: c, marginRight: '2px' }}>{'  '}</span>
          ))}
        </div>
      </div>

      {/* Bottom border */}
      <div style={{ color: '#3a3a3a' }}>{'└' + '─'.repeat(60) + '┘'}</div>
    </div>
  );
};

export default BootBanner;
