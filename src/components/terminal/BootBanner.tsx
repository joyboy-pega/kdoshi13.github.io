import React from 'react';

export const BootBanner: React.FC = () => {
  return (
    <div className="font-mono text-xs" style={{ color: '#c8c8c8' }}>
      {/* Top rule */}
      <div style={{ color: '#3a3a3a' }}>
        {'┌' + '─'.repeat(60) + '┐'}
      </div>

      {/* System info block */}
      <div style={{ borderLeft: '1px solid #3a3a3a', borderRight: '1px solid #3a3a3a' }}>
        <div className="px-2 py-1" style={{ borderBottom: '1px solid #3a3a3a' }}>
          <span style={{ color: '#9ece6a' }}>kevalos</span>
          <span style={{ color: '#5a5a5a' }}>@</span>
          <span style={{ color: '#7aa2f7' }}>portfolio</span>
          <span style={{ color: '#5a5a5a' }}>  v1.2  </span>
          <span style={{ color: '#3a3a3a' }}>─────────────────────────────────</span>
        </div>

        <div className="px-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px 16px', padding: '6px 8px' }}>
          <div><span style={{ color: '#5a5a5a' }}>OS      </span><span>KevalOS 1.2 (BrowserVFS)</span></div>
          <div><span style={{ color: '#5a5a5a' }}>Status  </span><span style={{ color: '#9ece6a' }}>OPEN TO HIRE</span></div>
          <div><span style={{ color: '#5a5a5a' }}>Role    </span><span>Test Engineer</span></div>
          <div><span style={{ color: '#5a5a5a' }}>Domain  </span><span>QA / Automation</span></div>
          <div><span style={{ color: '#5a5a5a' }}>Shell   </span><span>bash 5.2</span></div>
          <div><span style={{ color: '#5a5a5a' }}>Theme   </span><span>Tokyo Night (TUI)</span></div>
          <div><span style={{ color: '#5a5a5a' }}>Kernel  </span><span>React 19 + TypeScript</span></div>
          <div><span style={{ color: '#5a5a5a' }}>Build   </span><span>Vite 6 + Tailwind v4</span></div>
        </div>

        <div className="px-2" style={{ borderTop: '1px solid #3a3a3a', padding: '4px 8px' }}>
          <span style={{ color: '#5a5a5a' }}>Palette </span>
          {(['#0d0d0d','#f7768e','#9ece6a','#e0af68','#7aa2f7','#bb9af7','#7dcfff','#c8c8c8'] as const).map((c, i) => (
            <span key={i} style={{ background: c, color: c, marginRight: '2px' }}>{'  '}</span>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div style={{ color: '#3a3a3a' }}>
        {'└' + '─'.repeat(60) + '┘'}
      </div>
    </div>
  );
};

export default BootBanner;
